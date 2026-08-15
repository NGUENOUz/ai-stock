"use client";

import { X, Check, Minus } from "lucide-react";

interface ComparisonModalProps {
  tools: any[];
  onClose: () => void;
}

export default function ComparisonModal({ tools, onClose }: ComparisonModalProps) {
  // Normalisation des données
  const normalizedTools = tools.map((t) => {
    let featuresObj = {};
    
    if (Array.isArray(t.features)) {
      // Si c'est un tableau : ['feature1', 'feature2'] -> { feature1: true, feature2: true }
      featuresObj = t.features.reduce((acc, feat) => ({ ...acc, [feat]: true }), {});
    } else if (typeof t.features === 'object' && t.features !== null) {
      // Si c'est déjà un objet : { feature1: true, feature2: false }
      featuresObj = t.features;
    }
    
    return {
      ...t,
      featuresObj
    };
  });

  // Extraction de toutes les fonctionnalités uniques (on prend toutes les clés, même si valeur = false)
  const allFeatures = Array.from(
    new Set(normalizedTools.flatMap((t) => Object.keys(t.featuresObj || {})))
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <h2 className="text-xl font-black">Comparaison</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-6 text-[10px] uppercase tracking-widest text-slate-400">
                  Critères
                </th>
                {tools.map((t) => (
                  <th key={t.id} className="pb-6 text-center px-4">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden border border-slate-200">
                      <img
                        src={t.logo_url}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-black">{t.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Ligne Prix */}
              <tr>
                <td className="py-4 text-sm font-bold text-slate-900">Modèle Prix</td>
                {tools.map((t) => (
                  <td key={t.id} className="py-4 text-center text-sm font-bold text-primary">
                    {t.pricing || "N/A"}
                  </td>
                ))}
              </tr>

              {/* Lignes Features dynamiques */}
              {allFeatures.length > 0 ? (
                allFeatures.map((feat) => (
                  <tr key={feat}>
                    <td className="py-4 text-sm font-medium text-slate-600">
                      {feat}
                    </td>
                    {normalizedTools.map((t) => (
                      <td key={t.id} className="py-4 text-center">
                        {t.featuresObj[feat] ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <Minus className="w-5 h-5 text-slate-300 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={tools.length + 1} className="py-8 text-center text-slate-400 text-sm">
                    Aucune fonctionnalité détaillée disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}