const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replacements for Dark Mode
const replacements = [
  // Backgrounds
  ['bg-slate-50', 'bg-slate-50 dark:bg-[#0B1120]'],
  ['bg-white', 'bg-white dark:bg-[#0F172A]'],
  ['hover:bg-slate-50', 'hover:bg-slate-50 dark:hover:bg-slate-800'],
  ['bg-slate-100', 'bg-slate-100 dark:bg-slate-800'],
  ['bg-slate-200', 'bg-slate-200 dark:bg-slate-800'],
  
  // Texts
  ['text-slate-900', 'text-slate-900 dark:text-white'],
  ['text-slate-700', 'text-slate-700 dark:text-slate-200'],
  ['text-slate-600', 'text-slate-600 dark:text-slate-300'],
  ['text-slate-500', 'text-slate-500 dark:text-slate-400'],
  ['text-slate-400', 'text-slate-400 dark:text-slate-500'],
  
  // Borders
  ['border-slate-200', 'border-slate-200 dark:border-slate-800'],
  ['border-slate-100', 'border-slate-100 dark:border-slate-800'],
  
  // Shadows
  ['shadow-slate-200/50', 'shadow-slate-200/50 dark:shadow-none'],

  // Special components backgrounds (like tool tags, etc.)
  ['bg-blue-50', 'bg-blue-50 dark:bg-blue-900/30'],
  ['bg-indigo-50', 'bg-indigo-50 dark:bg-indigo-900/30'],
  ['bg-emerald-50', 'bg-emerald-50 dark:bg-emerald-900/30'],
  ['bg-purple-50', 'bg-purple-50 dark:bg-purple-900/30'],
  ['bg-orange-50', 'bg-orange-50 dark:bg-orange-900/30'],
  ['bg-amber-100', 'bg-amber-100 dark:bg-amber-900/30'],
  ['bg-orange-100', 'bg-orange-100 dark:bg-orange-900/30'],
];

replacements.forEach(([from, to]) => {
  // Be careful to not replace already replaced strings if the script is run multiple times
  // We'll use a regex that ensures it doesn't already have the dark: variant right after
  const escapedFrom = from.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escapedFrom + '(?![\\\\s]*dark:)', 'g');
  content = content.replace(regex, to);
});

// Fix Hero Centering
content = content.replace('max-w-2xl pt-4 lg:pt-6', 'max-w-2xl flex flex-col justify-center');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Modifications completed.');
