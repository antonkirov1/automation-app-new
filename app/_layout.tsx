import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { HeroUIProvider } from '@heroui/react';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import './global.css';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <HeroUIProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </HeroUIProvider>
  );
}