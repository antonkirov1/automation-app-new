import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface DeviceCardProps {
  name: string;
  status: boolean;
  icon: LucideIcon;
  color: string;
  onToggle: () => void;
  temperature?: number;
  battery?: number;
}

export default function DeviceCard({ 
  name, 
  status, 
  icon: Icon, 
  color, 
  onToggle, 
  temperature, 
  battery 
}: DeviceCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <View style={styles.header}>
        <View style={[
          styles.icon,
          { backgroundColor: status ? color : '#374151' }
        ]}>
          <Icon size={24} color="#FFFFFF" />
        </View>
        <View style={[
          styles.toggle,
          status && styles.toggleActive
        ]}>
          <View style={[
            styles.toggleSlider,
            status && styles.toggleSliderActive
          ]} />
        </View>
      </View>
      
      <Text style={styles.name}>{name}</Text>
      
      <View style={styles.status}>
        <View style={[
          styles.statusDot,
          { backgroundColor: status ? '#10B981' : '#6B7280' }
        ]} />
        <Text style={styles.statusText}>
          {status ? 'Online' : 'Offline'}
        </Text>
      </View>
      
      {temperature && (
        <Text style={styles.temperature}>{temperature}°C</Text>
      )}
      
      {battery && (
        <Text style={styles.battery}>Battery: {battery}%</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggle: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#374151',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#3B82F6',
  },
  toggleSlider: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleSliderActive: {
    alignSelf: 'flex-end',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  temperature: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  battery: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});