import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Shield, Wifi, Smartphone, Mic, Chrome as Home, CircleHelp as HelpCircle, LogOut, ChevronRight, Moon, Vibrate, Lock, Eye, Zap } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);
  const [hapticFeedback, setHapticFeedback] = React.useState(true);
  const [biometricAuth, setBiometricAuth] = React.useState(false);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { id: 'profile', label: 'Profile Settings', icon: User, hasToggle: false },
        { id: 'notifications', label: 'Notifications', icon: Bell, hasToggle: true, value: notificationsEnabled, onToggle: setNotificationsEnabled },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield, hasToggle: false },
      ]
    },
    {
      title: 'Integrations',
      items: [
        { id: 'alexa', label: 'Amazon Alexa', icon: Mic, hasToggle: false, subtitle: 'Connected' },
        { id: 'google', label: 'Google Home', icon: Home, hasToggle: false, subtitle: 'Connected' },
        { id: 'apple', label: 'Apple HomeKit', icon: Smartphone, hasToggle: false, subtitle: 'Not connected' },
        { id: 'network', label: 'Network Settings', icon: Wifi, hasToggle: false },
      ]
    },
    {
      title: 'Device Management',
      items: [
        { id: 'sonoff', label: 'Sonoff Devices', icon: Zap, hasToggle: false, subtitle: '12 devices' },
        { id: 'philips', label: 'Philips Hue', icon: Eye, hasToggle: false, subtitle: '8 lights' },
        { id: 'discovery', label: 'Device Discovery', icon: Wifi, hasToggle: false },
      ]
    },
    {
      title: 'App Settings',
      items: [
        { id: 'theme', label: 'Dark Mode', icon: Moon, hasToggle: true, value: darkModeEnabled, onToggle: setDarkModeEnabled },
        { id: 'haptic', label: 'Haptic Feedback', icon: Vibrate, hasToggle: true, value: hapticFeedback, onToggle: setHapticFeedback },
        { id: 'biometric', label: 'Biometric Authentication', icon: Lock, hasToggle: true, value: biometricAuth, onToggle: setBiometricAuth },
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', label: 'Help & Support', icon: HelpCircle, hasToggle: false },
        { id: 'logout', label: 'Sign Out', icon: LogOut, hasToggle: false, isDestructive: true },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
            <Text style={styles.profilePlan}>Premium Plan</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.settingsList} showsVerticalScrollIndicator={false}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupItems}>
              {group.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingsItem,
                    itemIndex === group.items.length - 1 && styles.lastItem
                  ]}
                >
                  <View style={styles.itemLeft}>
                    <View style={[
                      styles.itemIcon,
                      item.isDestructive && styles.destructiveIcon
                    ]}>
                      <item.icon 
                        size={20} 
                        color={item.isDestructive ? "#EF4444" : "#9CA3AF"} 
                      />
                    </View>
                    <View style={styles.itemText}>
                      <Text style={[
                        styles.itemLabel,
                        item.isDestructive && styles.destructiveText
                      ]}>
                        {item.label}
                      </Text>
                      {item.subtitle && (
                        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.itemRight}>
                    {item.hasToggle ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#374151', true: '#3B82F6' }}
                        thumbColor="#FFFFFF"
                      />
                    ) : (
                      <ChevronRight size={16} color="#6B7280" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Smart Home App</Text>
          <Text style={styles.appInfoText}>Version 1.0.0</Text>
          <Text style={styles.appInfoText}>Build 2024.1</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  profilePlan: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  editProfileButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  settingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  settingsGroup: {
    marginBottom: 32,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupItems: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  destructiveIcon: {
    backgroundColor: '#FEE2E2',
  },
  itemText: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  destructiveText: {
    color: '#EF4444',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  itemRight: {
    marginLeft: 12,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 4,
  },
  appInfoText: {
    fontSize: 12,
    color: '#6B7280',
  },
});