'use client';
import { useAuth } from '@/hooks/use-auth';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>; // chờ kiểm tra user xong
  }

  return <>{children}</>;
}
