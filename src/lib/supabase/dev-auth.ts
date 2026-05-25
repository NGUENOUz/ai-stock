// Mode développement - bypass Supabase
export const DEV_MODE = process.env.NODE_ENV === 'development';

// Comptes de test prédéfinis
const TEST_ACCOUNTS = {
  'admin@test.com': { password: 'admin123', role: 'admin', userName: 'Admin Test' },
  'user@test.com': { password: 'user123', role: 'user', userName: 'User Test' },
  'contributor@test.com': { password: 'contrib123', role: 'contributor', userName: 'Contributor Test' }
};

export const mockSignUp = async (email: string, password: string, userData: any) => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simuler un utilisateur créé
  return {
    data: {
      user: {
        id: `mock-${Date.now()}`,
        email,
        user_metadata: userData
      }
    },
    error: null
  };
};

export const mockSignIn = async (email: string, password: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Vérifier les comptes de test
  const testAccount = TEST_ACCOUNTS[email as keyof typeof TEST_ACCOUNTS];
  
  if (testAccount && testAccount.password === password) {
    return {
      data: {
        user: {
          id: `mock-${email}`,
          email,
          user_metadata: { role: testAccount.role, user_name: testAccount.userName }
        }
      },
      error: null
    };
  }
  
  // Accepter n'importe quel email/mot de passe en dev
  return {
    data: {
      user: {
        id: `mock-${Date.now()}`,
        email
      }
    },
    error: null
  };
};