import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateEmail = (email: string, maxLength: number = 18): string => {
    if (email.length <= maxLength) {
        return email;
    }
    const parts = email.split('@');
    if (parts.length === 2) {
        const username = parts[0];
        const domain = parts[1];
        
        const maxUsernameLength = maxLength - domain.length - 3;
        if (maxUsernameLength > 0) {
            return `${username.substring(0, maxUsernameLength)}...@${domain}`;
        }
    }
    return email.substring(0, maxLength - 3) + '...';
};
export const copyToClipboard = async (text: string, title: string) => {
    if (!navigator.clipboard) {
        alert("La copie au presse-papiers n'est pas supportée par votre navigateur.");
        return false;
    }
    try {
        await navigator.clipboard.writeText(text);
        alert(`✅ Le prompt complet pour "${title}" a été copié dans le presse-papiers !`);
        return true;
    } catch (err) {
        console.error('Erreur lors de la copie: ', err);
        alert("❌ Échec de la copie. Veuillez réessayer.");
        return false;
    }
};

// Nouvelle fonction pour partager
export const sharePrompt = async (promptTitle: string, promptUrl: string) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: `Prompt IA : ${promptTitle}`,
                text: `Découvrez ce prompt IA premium sur AI-Stock : ${promptTitle}`,
                url: promptUrl,
            });
            return true;
        } catch (error) {
            console.error('Erreur lors du partage Web:', error);
            // L'annulation n'est pas une erreur
            return false;
        }
    } else {
        // Fallback si Web Share n'est pas supporté (ex: Desktop non sécurisé)
        copyToClipboard(promptUrl, `Lien de ${promptTitle}`);
        return false;
    }
};