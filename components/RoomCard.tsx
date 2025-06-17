import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video as LucideIcon } from 'lucide-react-native';

interface RoomCardProps {
  name: string;
  deviceCount: number;
  activeDevices: number;
  temperature: number;
  icon: LucideIcon;
  color: string;
  onPress: () => void;
}

export default function RoomCard({ 
  name, 
  deviceCount, 
  activeDevices, 
  temperature, 
  icon: Icon, 
  color, 
  onPress 
}: RoomCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.icon, { backgroundColor: color }]}>
          <Icon size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.temperature}>{temperature}°C</Text>
      </View>
      
      <Text style={styles.name}>{name}</Text>
      
      <Text style={styles.devices}>
        {activeDevices}/{deviceCount} devices active
      </Text>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { 
              width: `${(activeDevices / deviceCount) * 100}%`,
              backgroundColor: color 
            }
          ]} 
        />
      </View>
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
  temperature: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  devices: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});