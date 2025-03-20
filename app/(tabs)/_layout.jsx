import React from 'react';
import { View, StyleSheet, Platform, Dimensions, Pressable, Text } from 'react-native';
import { Tabs, useRouter, usePathname } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import Bundesliga from '@/assets/images/icons/Bundesliga';
import Spiele from '@/assets/images/icons/Spiele';
import Videos from '@/assets/images/icons/Videos';
import Tabelle from '@/assets/images/icons/Tabelle';
import Statistiken from '@/assets/images/icons/Statistiken';
import AIChat from '@/assets/images/icons/AIChat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TabBarBackground from '@/components/ui/TabBarBackground';


const ROUTES = [
  { name: 'index', title: 'Bundesliga', icon: Bundesliga },
  { name: 'spiele', title: 'Spiele', icon: Spiele },
  { name: 'videos', title: 'Videos', icon: Videos },
  { name: 'tabelle', title: 'Tabelle', icon: Tabelle },
  { name: 'statistiken', title: 'Statistiken', icon: Statistiken },
  { name: 'aichat', title: 'AI-Chat', icon: AIChat },
];

// Bundesliga colors
const BL_COLORS = {
  red: '#d20515',
  darkGrey: '#292c33',
  lightGrey: '#9a9a9a',
  backgroundGrey: '#f4f4f4',
  white: '#ffffff',
};

const SidebarButton = ({ title, route, icon: Icon, isActive, onPress }) => {
  const colorScheme = useColorScheme();
  const activeColor = BL_COLORS.red;
  const inactiveColor = BL_COLORS.lightGrey;
  
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.sidebarButton,
        pressed && { opacity: 0.7 }
      ]} 
      onPress={() => onPress(route)}
    >
      <View style={styles.iconContainer}>
        <Icon 
          color={isActive ? activeColor : inactiveColor} 
          width={24} 
          height={24} 
        />
      </View>
      <Text 
        style={[
          styles.sidebarButtonText, 
          { color: isActive ? activeColor : inactiveColor }
        ]}
      >
        {title}
      </Text>
      {isActive && <View style={[styles.activeIndicator, { backgroundColor: BL_COLORS.red }]} />}
    </Pressable>
  );
};

const TabBarIcon = ({ icon: Icon, isActive }) => {
  const iconColor = isActive ? BL_COLORS.red : BL_COLORS.lightGrey;
  
  return (
    <View style={styles.tabIconContainer}>
      <Icon color={iconColor} width={22} height={22} />
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const currentRoute = usePathname();
  const insets = useSafeAreaInsets();
  const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width > 768;
  const isDarkMode = colorScheme === 'dark';

  const handleNavigation = (route) => {
    router.push(route === 'index' ? '/' : route);
  };
  

  // Desktop: sidebar layout
  if (isDesktop) {
    return (
      <View style={styles.desktopContainer}>
        <View 
          style={[
            styles.sidebar, 
            { 
              backgroundColor: BL_COLORS.darkGrey,
              paddingTop: Math.max(20, insets.top)
            }
          ]}
        >
          <View style={styles.sidebarButtonsContainer}>
            {ROUTES.map((route) => (
              <SidebarButton
                key={route.name}
                title={route.title}
                route={route.name}
                icon={route.icon}
                isActive={currentRoute === `/${route.name}` || (currentRoute === '/' && route.name === 'index')}
                onPress={handleNavigation}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.content}>
          <StatusBar style={isDarkMode ? 'light' : 'dark'} />
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' },
            }}
          >
            {ROUTES.map((route) => (
              <Tabs.Screen 
                key={route.name}
                name={route.name} 
                options={{ title: route.title }} 
              />
            ))}
          </Tabs>
        </View>
      </View>
    );
  }

  // Mobile: subtle tab bar at bottom
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: BL_COLORS.red,
          tabBarInactiveTintColor: BL_COLORS.lightGrey,
          tabBarShowLabel: true,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarBackground: TabBarBackground,
          tabBarIcon: ({ focused }) => {
            const routeConfig = ROUTES.find(r => r.name === route.name);
            return routeConfig ? (
              <TabBarIcon 
                icon={routeConfig.icon} 
                isActive={focused}
              />
            ) : null;
          },
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].eleColor,
            borderTopWidth: 1,
            borderTopColor: BL_COLORS.backgroundGrey,
            height: 60 + (insets.bottom > 0 ? insets.bottom : 0),
            paddingBottom: insets.bottom > 0 ? insets.bottom : 5,
            paddingTop: 5,
          },
          tabBarItemStyle: {
            height: 50,
          },
        })}
      >
        {ROUTES.map((route) => (
          <Tabs.Screen 
            key={route.name}
            name={route.name} 
            options={{ 
              title: route.title,
            }}
          />
        ))}
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 80,
    alignItems: 'center',
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    backgroundColor: BL_COLORS.backgroundGrey,
  },
  sidebarButtonsContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  sidebarButton: {
    alignItems: 'center',
    marginVertical: 15,
    position: 'relative',
    width: '100%',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarButtonText: {
    fontSize: 10,
    marginTop: 6,
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: '20%',
    height: '60%',
    width: 3,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  tabIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 0,
  },
});