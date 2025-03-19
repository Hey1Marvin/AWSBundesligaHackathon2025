import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Bundesliga from '@/assets/images/icons/Bundesliga';
import Spiele from '@/assets/images/icons/Spiele';
import Videos from '@/assets/images/icons/Videos';
import Tabelle from '@/assets/images/icons/Tabelle';
import Statistiken from '@/assets/images/icons/Statistiken';
import AIChat from '@/assets/images/icons/AIChat';
import Ball from '@/assets/images/icons/Ball';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height:70,
          backgroundColor: Colors[colorScheme ?? 'light'].eleColor,
          position: "absolute",
          bottom: 0, // Tab Bar an der unteren Seite fixieren
          marginBottom: 0, // Verschiebt die Tab Bar um 2 Pixel nach oben
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bundesliga',
          tabBarIcon: () => <Bundesliga width= {24} height = {24} color={Colors[colorScheme ?? 'light'].icon }/>,
        }}
      />
      <Tabs.Screen
        name="spiele"
        options={{
          title: 'Spiele',
          tabBarIcon: () => <Spiele color={Colors[colorScheme ?? 'light'].icon}/>,
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: 'Videos',
          tabBarIcon: () => <Videos color={Colors[colorScheme ?? 'light'].icon}/>,
        }}
      />
      <Tabs.Screen
        name="tabelle"
        options={{
          title: 'Tabelle',
          tabBarIcon: () => <Tabelle color={Colors[colorScheme ?? 'light'].icon}/>,
        }}
      />
      <Tabs.Screen
        name="statistiken"
        options={{
          title: 'Statistiken',
          tabBarIcon: () => <Statistiken color={Colors[colorScheme ?? 'light'].icon}/>,
        }}
      />
      <Tabs.Screen
        name="aichat"
        options={{
          title: 'AI-Chat',
          tabBarIcon: () => <AIChat color={Colors[colorScheme ?? 'light'].icon}/>,
        }}
      />
    </Tabs>
  );
}
