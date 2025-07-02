'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import { ActiveThemeProvider } from '@/components/active-theme';
import { LoadingProvider } from '@/hooks/use-loading';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  // Dù resolvedTheme không còn dùng, bạn vẫn có thể giữ nếu muốn
  useTheme(); // optional

  return (
    <ActiveThemeProvider initialTheme={activeThemeValue}>
      <LoadingProvider>
        {children}
      </LoadingProvider>
      
    </ActiveThemeProvider>
  );
}
