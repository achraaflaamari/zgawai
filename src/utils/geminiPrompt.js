// /utils/geminiPrompt.js - Prompt amélioré
export const safetyCheckPrompt = `
Analyser l'image fournie pour vérifier le respect des équipements de sécurité obligatoires sur un chantier.

TÂCHE PRÉCISE:
Identifier chaque personne visible dans l'image et vérifier les équipements de sécurité suivants:
1. Casque de sécurité/protection de la tête
2. Veste/gilet de sécurité haute visibilité 
3. Chaussures de sécurité

GESTION DES VUES PARTIELLES:
- Si certaines parties du corps ne sont pas visibles dans l'image, déterminer clairement ce qui est visible et ce qui ne l'est pas
- Pour les parties non visibles, indiquer "NON_VISIBLE" au lieu de confirmer l'absence d'équipement
- Ne jamais présumer qu'un équipement est absent s'il n'est pas visible dans l'image
- Si le visage/tête est visible mais sans casque: considérer comme "NON_CONFORME"
- Si le torse est visible mais sans veste de sécurité: considérer comme "NON_CONFORME"
- Si les pieds sont visibles mais sans chaussures de sécurité: considérer comme "NON_CONFORME"

RÉPONSE ATTENDUE:
Format JSON brut uniquement, sans balises markdown ni explications supplémentaires.
Structure exacte attendue:
{
  "personnes_detectees": [nombre entier],
  "equipements_conformes": [true/false/null],
  "status_verification": ["COMPLET", "PARTIEL", "INSUFFISANT"],
  "parties_visibles": {
    "tete": [true/false],
    "torse": [true/false],
    "pieds": [true/false]
  },
  "equipements": {
    "casque": ["PRESENT", "ABSENT", "NON_VISIBLE"],
    "veste": ["PRESENT", "ABSENT", "NON_VISIBLE"],
    "chaussures": ["PRESENT", "ABSENT", "NON_VISIBLE"]
  },
  "problemes": [liste des problèmes détectés],
  "fiabilite_analyse": [pourcentage entre 0 et 100],
  "recommandation": [texte court indiquant si recapturer l'image]
}

RÈGLES D'ÉVALUATION:
- "status_verification" doit être:
  * "COMPLET" si toutes les parties du corps sont visibles
  * "PARTIEL" si certaines parties sont visibles, permettant une analyse partielle
  * "INSUFFISANT" si trop peu d'éléments sont visibles pour une analyse fiable
- "equipements_conformes" doit être:
  * true: uniquement si tous les équipements visibles sont présents et conformes
  * false: si au moins un équipement visible est absent
  * null: si l'analyse est trop incomplète pour conclure
- "fiabilite_analyse" doit refléter la confiance dans l'analyse (basée sur la visibilité et la qualité)
- "recommandation" doit suggérer des actions comme recapturer l'image si nécessaire

EXEMPLES DE DÉCISION:
- Si seule la tête est visible avec un casque: status="PARTIEL", equipements_conformes=true pour cette partie
- Si seule la tête est visible sans casque: status="PARTIEL", equipements_conformes=false
- Si l'image ne montre que l'environnement sans personne identifiable: personnes_detectees=0, status="INSUFFISANT"

IMPORTANT:
- Ne PAS encadrer la réponse dans des balises markdown
- Retourner uniquement l'objet JSON brut
- Être précis et honnête sur les limites de l'analyse basée sur ce qui est visible
`;