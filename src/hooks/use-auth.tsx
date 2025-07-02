// hooks/use-auth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'USER';
  // các field khác tùy bạn
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (user) return; // đã có user → không làm gì

      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch('http://localhost:8080/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Token invalid');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    };

    checkUser();
  }, [user, router]);

  return { user };
}
