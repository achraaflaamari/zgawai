import React, { useState, useEffect, useRef } from 'react';
import { generateSafetyTip } from '@/services/geminiService';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const SafetyNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const timerRef = useRef(null);
  const { toast } = useToast();
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const generateNotification = async () => {
    if (!apiKey) {
      setApiError('Clé API manquante. Veuillez définir NEXT_PUBLIC_GEMINI_API_KEY dans .env.local');
      return;
    }

    setIsLoading(true);
    try {
      const tip = await generateSafetyTip(apiKey);

      const isDuplicate = notifications.some(n => n.message === tip);
      if (!isDuplicate) {
        
        const newNotification = {
          id: Date.now().toString(),
          message: tip,
          timestamp: new Date(),
          isNew: true,
        };

        setNotifications(prev => {
          const updated = [newNotification, ...prev].slice(0, 5);
          return updated;
        });

        // Afficher une notification prominente
        toast({
          title: "Nouveau Rappel de Sécurité",
          description: tip,
          duration: 5000,
          className: 'bg-gradient-to-r from-blue-50 to-orange-50 border-blue-200 text-blue-800 shadow-lg rounded-lg p-4',
        });

        setTimeout(() => {
          setNotifications(prev =>
            prev.map(n =>
              n.id === newNotification.id ? { ...n, isNew: false } : n
            )
          );
        }, 30000);
      } else {
        console.log("Notification dupliquée détectée, nouvelle tentative...");
        generateNotification();
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
          className: 'bg-red-50 border-red-200 text-red-800 shadow-lg rounded-lg p-4',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (apiKey) {
      generateNotification();
      timerRef.current = setInterval(generateNotification, 1 * 60 * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [apiKey]);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="h-full flex flex-col max-h-10 ">
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-4 text-white">
        <h3 className="text-lg font-semibold">Safety Reminder</h3>
      </div>
      <div className="flex-1 p-4 h-1/2">
        {apiError ? (
          <div className="flex items-start gap-3 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200 shadow-sm">
            <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Erreur API</p>
              <p>{apiError}</p>
            </div>
          </div>
        ) : isLoading && notifications.length === 0 ? (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            <p className="text-sm">Aucune notification de sécurité pour l'instant</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-120px)] lg:h-[calc(100vh-80px)]">
            <div className="space-y-4">
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "rounded-lg border p-4 transition-all duration-300 shadow-sm",
                      notification.isNew
                        ? "border-blue-300 bg-blue-50 animate-slide-in shadow-md"
                        : "border-gray-200 bg-white hover:shadow-md"
                    )}
                  >
                    <p className="text-sm text-gray-800 leading-relaxed">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatTime(notification.timestamp)}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        )}
      </div>
      <div className="absolute bottom-0 w-full h-15 bg-black z-50 ">
      </div>
    </div>
  );
};

export default SafetyNotifications;