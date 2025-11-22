// const DropdownMenu = ({ label, options, selected, onSelect, icon: Icon }: DropdownMenuProps) => {
//     const [isOpen, setIsOpen] = useState(false);
    
//     const selectedOption = options.find(opt => opt.key === selected) || { label: 'Toutes' };

//     return (
//         // ⭐️ Retrait de z-10 ici (le z-index est géré par la sheet)
//         <div className="relative flex-shrink-0 w-full md:w-auto">
//             <button
//                 // ... (inchangé)
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="
//                     flex items-center justify-between h-[55px] px-5 py-2 rounded-xl font-semibold w-full
//                     bg-white/10 dark:bg-neutral-900/20 backdrop-blur-md
//                     border border-white/20 dark:border-white/10
//                     text-gray-200 hover:bg-white/20
//                     transition-all duration-300
//                     hover:shadow-[0_0_15px_rgba(255,215,120,0.2)]
//                 "
//                 aria-expanded={isOpen}
//             >
//                 <div className="flex items-center">
//                     <Icon className="w-5 h-5 mr-3 text-[#FFD86A]" />
//                     {label} : <span className="font-extrabold ml-2 text-white">{selectedOption.label}</span>
//                 </div>
//                 <ChevronDown className={`w-4 h-4 ml-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//             </button>
//             {/* ⭐️ MODIFICATION ICI : Remplacement de 'absolute top-full' par un bloc statique 
//             Utilisation d'une simple transition de hauteur pour l'effet "déroulant" */}
//             <div
//                 className={cn(
//                     "overflow-hidden transition-all duration-300 ease-out",
//                     isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
//                 )}
//             >
//                 {isOpen && ( // Rendu conditionnel pour optimiser et s'assurer que le contenu est là quand la hauteur est > 0
//                     <div 
//                         className="
//                             w-full 
//                             bg-neutral-900/95 border border-[#FFD86A]/30 rounded-xl shadow-2xl
//                             backdrop-blur-xl
//                             py-1
//                         "
//                     >
//                         {options.map((option) => (
//                             <button
//                                 key={option.key}
//                                 onClick={() => { onSelect(option.key); setIsOpen(false); }}
//                                 className={cn(
//                                     'block w-full text-left px-5 py-3 text-sm transition rounded-xl',
//                                     selected === option.key 
//                                         ? 'bg-[#FFD86A]/20 text-[#FFD86A] font-bold' 
//                                         : 'text-gray-300 hover:bg-neutral-800/70',
//                                     'first:rounded-t-xl last:rounded-b-xl'
//                                 )}
//                             >
//                                 {option.label}
//                             </button>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };