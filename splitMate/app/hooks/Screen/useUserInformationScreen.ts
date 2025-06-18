import { useEffect, useState } from 'react';
import { UserService } from '~/core/User/UserService';
import { TUser } from '~/types/TUser';

export function useUserInformationScreen() {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // vamos deixar o user ID hardcoded enquanto não temos autenticação
        const userData = await UserService.getById('1');
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar usuario:', error);
      }
    };

    loadUser();
  }, []);

  const totalDebt = user?.debts.reduce((total, debt) => total + debt.amount, 0) || 0;

  return {
    userName: user?.name || '',
    userEmail: user?.email || '',
    userDebt: `R$ ${totalDebt.toFixed(2)}`,
  };
}
  