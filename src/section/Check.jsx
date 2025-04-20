import { useState, useRef, useEffect } from "react";
import Alert from '../components/Alert';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { safetyCheckPrompt } from '../utils/geminiPrompt';

function Check() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [permissionState, setPermissionState] = useState("prompt"); 
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [alert, setAlert] = useState({ visible: false, message: '', type: 'danger' });

  // Track whether the video element is mounted
  const [isVideoMounted, setIsVideoMounted] = useState(false);

  const analyzeImageWithGemini = async (imageData) => {
    // Extraction du contenu base64 (suppression du préfixe data:image/...)
    const base64Content = imageData.split(',')[1];

    // Configuration de l'API Gemini
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Création de la partie de l'image pour la requête
    const imagePart = {
      inlineData: {
        data: base64Content,
        mimeType: "image/jpeg"
      }
    };

    // Préparation du contenu avec le prompt et l'image
    const result = await model.generateContent([safetyCheckPrompt, imagePart]);
    const response = await result.response;
    return response.text();
  };

  const onCapture = async (imageData) => {
    try {
      setAnalyzing(true);
      
      const textResult = await analyzeImageWithGemini(imageData);
      
      // Extraire le JSON de la réponse
      let jsonString = textResult;

      
      // Si la réponse contient un bloc de code JSON formaté en markdown
      if (textResult.includes('```json')) {
        // Extraire le contenu entre les balises ```json et ```
        const match = textResult.match(/```json\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
          jsonString = match[1].trim();
        }
      }
      
      // Tenter de parser le résultat comme JSON
      try {
        const jsonResult = JSON.parse(jsonString);
        setResult(jsonResult);
  
        // Gestion des alertes en fonction des nouveaux critères
        if (jsonResult.personnes_detectees === 0) {
          // Aucune personne détectée
          setAlert({
            visible: true,
            message: "Aucune personne détectée dans l'image",
            type: "warning"
          });
        } else if (jsonResult.status_verification === "INSUFFISANT") {
          // Données insuffisantes pour l'analyse
          setAlert({
            visible: true,
            message: "Données insuffisantes pour l'analyse. Veuillez recapturer l'image",
            type: "warning"
          });
        } else if (jsonResult.equipements_conformes === false) {
          // Non-conformité détectée
          setAlert({
            visible: true,
            message:" ALERTE: Équipements non conformes détectés",
            type: "danger"
          });
        } else if (jsonResult.equipements_conformes === null) {
          // État indéterminé
          setAlert({
            visible: true,
            message: "Analyse partielle : certains équipements ne sont pas visibles",
            type: "warning"
          });
        } else {
          // Tout est conforme
          setAlert({
            visible: true,
            message: "Équipements de sécurité conformes",
            type: "success"
          });
        }
      } catch (error) {
        console.error('Erreur de parsing JSON:', error);
        setAlert({
          visible: true,
          message: 'Erreur lors de l\'analyse de la réponse',
          type: 'danger'
        });
        // Affichage de la réponse brute pour debug
        console.log('Réponse brute:', textResult);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setAlert({
        visible: true,
        message: 'Erreur lors de l\'analyse de l\'image',
        type: 'danger'
      });
    } finally {
      setAnalyzing(false);
    }
  };

  // Query Permissions API on mount
  useEffect(() => {
    let permissionResult;
    if (navigator.permissions) {
      navigator.permissions.query({ name: "camera" }).then((result) => {
        permissionResult = result;
        setPermissionState(result.state);
        result.onchange = () => {
          setPermissionState(result.state);
          if (result.state === "denied") {
            stopCamera();
          }
        };
      });
    }

    return () => {
      if (permissionResult) {
        permissionResult.onchange = null;
      }
      stopCamera();
    };
  }, []);

  // Set isVideoMounted when the video element is mounted
  useEffect(() => {
    if (videoRef.current) {
      setIsVideoMounted(true);
    }
  }, [videoRef.current]);



  const startCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      } else {
        stream.getTracks().forEach((track) => track.stop());
        console.warn("Video element not mounted, camera not started");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setPermissionState("denied");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    // Obtenir l'image en base64
    const imageData = canvas.toDataURL('image/jpeg');
    onCapture(imageData);

    if (ctx) {
      
      const imageData = canvas.toDataURL("image/jpeg");
      setCapturedImage(imageData);
      stopCamera();

      // Simulate AI analysis
      setAnalyzing(true);
      
    }
  };

  const resetCheck = () => {
    setCapturedImage(null);
    setResult(null);
    if (permissionState === "granted" ) {
      startCamera();
    }
  };

  return (
    <div id='Live Check' className="py-20 grid  bg-white">
      <div className="max-w-full grid justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-[#1A365D]">
            Live Safety Check
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Capture and analyze safety compliance in seconds
          </p>
        </div>

        <div className="w-[90vw]   grid ">
          {!capturedImage ? (
            <div className="bg-[#F5F7FA] h-full rounded-lg shadow-lg overflow-hidden">
             

              <div className="  min-h-52  relative">
                {cameraActive && permissionState === "granted" ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className=" object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {permissionState === "denied" ? (
                      <>
                        <i className="fas fa-exclamation-triangle text-[#FF7F27] text-5xl mb-4"></i>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          Camera Access Denied
                        </h4>
                        <p className="text-gray-600 mb-6">
                          Please enable camera access in your browser settings to
                          use this feature.
                        </p>
                        <button
                          onClick={startCamera}
                          className="bg-[#4299E1] hover:bg-[#3182ce] text-white py-2 px-6 rounded-button shadow-md whitespace-nowrap"
                        >
                          Try Again
                        </button>
                      </>
                    ) : (
                      <div className="">
                        <i className="fas fa-camera text-gray-400 text-5xl mb-4"></i>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          Camera Access Required
                        </h4>
                        <p className="text-gray-600 mb-6">
                          Click below to enable your camera and start the safety
                          check.
                        </p>
                        <button
                          onClick={startCamera}
                          className="bg-[#4299E1] hover:bg-[#3182ce] hover:cursor-none text-white py-2 px-6  shadow-md whitespace-nowrap "
                        >
                          Enable Camera
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-6 flex justify-between items-center">
                {cameraActive && permissionState === "granted" && (
                  <>
                    <button
                      onClick={stopCamera}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 hover:cursor-none whitespace-nowrap "
                    >
                      Cancel
                    </button>
                    <button
                      onClick={captureImage}
                      className="bg-[#FF7F27] hover:bg-[#e06c1c] text-white py-2 px-6 hover:cursor-none flex items-center whitespace-nowrap "
                    >
                      <i className="fas fa-camera mr-2"></i>
                      Capture Image
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#F5F7FA] rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-[#1A365D] text-white">
                <h3 className="text-xl font-semibold">
                  Safety Analysis Results
                </h3>
                {analyzing ? (
                  <p className="text-gray-300">Analyzing image...</p>
                ) : (
                  <p className="text-gray-300">
                    Review the safety compliance results
                  </p>
                )}
              </div>

              <div className="md:flex">
                <div className="md:w-1/2 p-6">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <img
                      src={capturedImage}
                      alt="Captured safety image"
                      className="w-full h-auto"
                    />

                    
                  </div>
                </div>

                <div className="md:w-1/2 p-6">
                  {analyzing ? (
                    <div className="h-full flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#4299E1]"></div>
                      <p className="mt-4 text-black text-lg">
                        Analyzing safety compliance...
                      </p>
                    </div>
                  ) : result ? (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2 text-black">Résultats de l'analyse</h2>
                        
                        {result.personnes_detectees > 0 ? (
                          <>
                            <p className="mb-1 text-black">Personnes détectées: {result.personnes_detectees}</p>
                            
                            <div className="mb-3 p-2 rounded" style={{backgroundColor: 
                              result.status_verification === "COMPLET" ? "#e6f4ea" : 
                              result.status_verification === "PARTIEL" ? "#fef6e0" : "#fce8e6"}}>
                              <p className="font-medium text-black">
                                Statut de vérification: {result.status_verification}
                                {result.status_verification !== "COMPLET" && (
                                  <span className="text-orange-600 ml-2 text-sm">
                                    (Certaines parties du corps ne sont pas visibles dans l'image)
                                  </span>
                                )}
                              </p>
                              <p className="text-sm mt-1 text-black">Fiabilité de l'analyse: {result.fiabilite_analyse}%</p>
                            </div>
                            
                            <div className="mb-3">
                              <p className="font-medium mb-1">Parties visibles dans l'image:</p>
                              <div className="grid grid-cols-3 gap-2">
                                <div className={`p-2 rounded ${result.parties_visibles?.tete ? "bg-green-100 text-black" : "bg-gray-200 text-black"}`}>
                                  Tête: {result.parties_visibles?.tete ? "Visible" : "Non visible"}
                                </div>
                                <div className={`p-2 rounded ${result.parties_visibles?.torse ? "bg-green-100 text-black" : "bg-gray-200 text-black"}`}>
                                  Torse: {result.parties_visibles?.torse ? "Visible" : "Non visible"}
                                </div>
                                <div className={`p-2 rounded ${result.parties_visibles?.pieds ? "bg-green-100 text-black" : "bg-gray-200 text-black"}`}>
                                  Pieds: {result.parties_visibles?.pieds ? "Visible" : "Non visible"}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <p className="font-medium mb-1 text-black">État des équipements:</p>
                              <div className="grid grid-cols-3 gap-2">
                                <div className={`p-2 rounded text-black ${
                                  result.equipements?.casque === "PRESENT" ? "bg-green-100" : 
                                  result.equipements?.casque === "ABSENT" ? "bg-red-100" : "bg-gray-200"
                                }`}>
                                  Casque: {result.equipements?.casque}
                                </div>
                                <div className={`p-2 rounded text-black ${
                                  result.equipements?.veste === "PRESENT" ? "bg-green-100" : 
                                  result.equipements?.veste === "ABSENT" ? "bg-red-100" : "bg-gray-200"
                                }`}>
                                  Veste: {result.equipements?.veste}
                                </div>
                                <div className={`p-2 rounded text-black ${
                                  result.equipements?.chaussures === "PRESENT" ? "bg-green-100" : 
                                  result.equipements?.chaussures === "ABSENT" ? "bg-red-100" : "bg-gray-200"
                                }`}>
                                  Chaussures: {result.equipements?.chaussures}
                                </div>
                              </div>
                            </div>
                            
                            <p className="mb-1 text-black">
                              Conformité: 
                              <span className={
                                result.equipements_conformes === true ? "text-green-500 font-bold ml-2" : 
                                result.equipements_conformes === false ? "text-red-500 font-bold ml-2" : 
                                "text-orange-500 font-bold ml-2"
                              }>
                                {result.equipements_conformes === true ? "CONFORME" : 
                                 result.equipements_conformes === false ? "NON CONFORME" : 
                                 "ANALYSE INCOMPLÈTE"}
                              </span>
                            </p>
                            
                            {result.problemes && result.problemes.length > 0 && (
                              <div className="mt-2">
                                <p className="font-medium text-black">Problèmes détectés:</p>
                                <ul className="list-disc list-inside">
                                  {result.problemes.map((probleme, index) => (
                                    <li key={index} className="text-red-600">{probleme}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {result.recommandation && (
                              <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                                <p className="font-medium text-black">Recommandation:</p>
                                <p className="text-black">{result.recommandation}</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <p className="text-amber-600 ">Aucune personne détectée dans l'image. Veuillez capturer une autre image.</p>
                        )}
                         {(result.status_verification !== "COMPLET" || result.personnes_detectees === 0) && (
                          <div className="mt-4 text-center">
                            
                          </div>
                        )}
                      </div>
                  ) : null}
                </div>
              </div>

              <div className="p-6 flex justify-between items-center border-t border-gray-200">
                <button
                  onClick={resetCheck}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 hover:cursor-none whitespace-nowrap "
                >
                  New Check
                </button>

                
              </div>
            </div>
          )}
        </div>
      </div>
      <Alert 
        message={alert.message}
        isVisible={alert.visible}
        type={alert.type}
      />
    </div>
  );
}

export default Check;