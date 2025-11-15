// src/components/TrainingFilters.tsx
import React from "react";

interface Filters {
  category: string;
  language: string;
  price: string;
  duration: string;
}

interface TrainingFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  allCategories: string[];
  allLanguages: string[];
}

export const TrainingFilters: React.FC<TrainingFiltersProps> = ({
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  allCategories,
  allLanguages,
}) => {
  const priceOptions = [
    { value: "all", label: "Tous les prix" },
    { value: "0", label: "Gratuit" },
    { value: "premium", label: "Premium" },
  ];

  const durationOptions = [
    { value: "all", label: "Toutes les durées" },
    { value: "0-60", label: "Moins d'1 heure" },
    { value: "60-180", label: "1h - 3h" },
    { value: "180+", label: "Plus de 3 heures" },
  ];

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters({ ...filters, [name]: value });
  };

  // INPUT SELECT PREMIUM
  const SelectInput: React.FC<{
    name: keyof Filters;
    label: string;
    options: { value: string; label: string }[];
  }> = ({ name, label, options }) => (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 tracking-wide">
        {label}
      </label>

      <div
        className="
          relative rounded-xl overflow-hidden
          bg-white/10 dark:bg-neutral-900/20 
          border border-white/20 dark:border-white/10
          backdrop-blur-xl
          transition-all duration-500
          hover:shadow-[0_0_25px_rgba(255,215,120,0.35)]
        "
      >
        <select
          value={filters[name]}
          onChange={(e) => handleFilterChange(name, e.target.value)}
          className="
            w-full p-3 bg-transparent outline-none 
            text-gray-900 dark:text-gray-200 
            appearance-none cursor-pointer
          "
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-black">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Petite icône flèche stylée */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="text-yellow-400 opacity-80"
          >
            <path
              fill="currentColor"
              d="M7 10l5 5l5-5H7z"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="
        p-6 rounded-3xl sticky top-6
        bg-white/15 dark:bg-neutral-900/25 
        backdrop-blur-3xl 
        border border-white/20 dark:border-white/10
        shadow-[0_8px_35px_rgba(0,0,0,0.25)]
        transition-all duration-700
      "
    >
      <h3
        className="
          text-xl font-bold mb-6 
          text-gray-900 dark:text-gray-100
          tracking-wide
        "
      >
        Filtrer & Rechercher
      </h3>

      {/* Barre de recherche premium */}
      <div
        className="
          rounded-2xl overflow-hidden mb-8
          bg-white/10 dark:bg-neutral-900/20 
          border border-white/20 dark:border-white/10
          backdrop-blur-xl 
          focus-within:shadow-[0_0_25px_rgba(255,215,120,0.4)]
          transition-all duration-500
        "
      >
        <input
          type="text"
          placeholder="Rechercher une formation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full px-4 py-3 bg-transparent outline-none 
            text-gray-900 dark:text-gray-200 placeholder-gray-500 
          "
        />
      </div>

      <div className="space-y-5">
        <SelectInput
          name="category"
          label="Catégorie"
          options={[
            { value: "", label: "Toutes les catégories" },
            ...allCategories.map((c) => ({ value: c, label: c })),
          ]}
        />

        <SelectInput
          name="language"
          label="Langue"
          options={[
            { value: "", label: "Toutes les langues" },
            ...allLanguages.map((l) => ({ value: l, label: l })),
          ]}
        />

        <SelectInput name="price" label="Prix" options={priceOptions} />
        <SelectInput name="duration" label="Durée" options={durationOptions} />
      </div>

      {/* Bouton reset premium */}
      <button
        onClick={() => {
          setFilters({
            category: "",
            language: "",
            price: "all",
            duration: "all",
          });
          setSearchTerm("");
        }}
        className="
          w-full mt-8 py-3 rounded-xl font-semibold
          bg-gradient-to-br from-[#FFF4C9] via-[#F5D98A] to-[#C89C36]
          text-black shadow-[0_4px_20px_rgba(255,215,120,0.45)]
          hover:shadow-[0_6px_25px_rgba(255,225,150,0.7)]
          transition-all duration-500
        "
      >
        Réinitialiser les filtres
      </button>
    </div>
  );
};
