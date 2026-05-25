"use client";

import { useState } from "react";
import { X, Sparkles, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

interface ContributorRequestModalProps {
  onClose: () => void;
}

export default function ContributorRequestModal({ onClose }: ContributorRequestModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    motivation: "",
    experience: "",
    portfolio: "",
    speciality: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { requestContributor } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi de la demande
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    requestContributor();
    setStep(2);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {step === 1 ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Sparkles size={20} className="text-violet-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Devenir contributeur</h2>
                  <p className="text-sm text-gray-500">Partagez vos créations avec la communauté</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pourquoi voulez-vous devenir contributeur ?
                </label>
                <textarea
                  required
                  value={formData.motivation}
                  onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
                  placeholder="Décrivez votre motivation..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre expérience avec l'IA
                </label>
                <textarea
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="Décrivez votre expérience..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spécialité (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.speciality}
                  onChange={(e) => setFormData(prev => ({ ...prev, speciality: e.target.value }))}
                  placeholder="Ex: Prompts Midjourney, Formations ChatGPT..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/Liens (optionnel)
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    "Envoyer ma demande"
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* Success */}
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Demande envoyée !</h2>
              <p className="text-gray-600 mb-6">
                Votre demande de contributeur a été envoyée avec succès. 
                Notre équipe l'examinera dans les 48h.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Parfait !
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}