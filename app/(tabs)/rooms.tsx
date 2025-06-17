import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sofa, ChefHat, Bed, Monitor, Plus, Thermometer, Lightbulb, Tv, AirVent } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function RoomsScreen() {
  const [selectedRoom, setSelectedRoom] = useState('living');

  const rooms = [
    {
      id: 'living',
      name: 'Living Room',
      icon: Sofa,
      devices: 8,
      temperature: 22,
      color: '#3B82F6',
      devices_list: [
        { id: 1, name: 'Main Lights', type: 'light', status: true, icon: Lightbulb },
        { id: 2, name: 'Smart TV', type: 'tv', status: false, icon: Tv },
        { id: 3, name: 'AC Unit', type: 'climate', status: true, temperature: 22, icon: AirVent },
      ]
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      icon: ChefHat,
      devices: 6,
      temperature: 24,
      color: '#10B981',
      devices_list: [
        { id: 4, name: 'Under Cabinet Lights', type: 'light', status: true, icon: Lightbulb },
        { id: 5, name: 'Smart Oven', type: 'appliance', status: false, icon: ChefHat },
      ]
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      icon: Bed,
      devices: 4,
      temperature: 20,
      color: '#8B5CF6',
      devices_list: [
        { id: 6, name: 'Bedside Lamps', type: 'light', status: false, icon: Lightbulb },
        { id: 7, name: 'AC Unit', type: 'climate', status: true, temperature: 20, icon: AirVent },
      ]
    },
    {
      id: 'office',
      name: 'Office',
      icon: Monitor,
      devices: 5,
      temperature: 23,
      color: '#F59E0B',
      devices_list: [
        { id: 8, name: 'Desk Lamp', type: 'light', status: true, icon: Lightbulb },
        { id: 9, name: 'Monitor', type: 'electronics', status: true, icon: Monitor },
      ]
    },
  ];

  const currentRoom = rooms.find(room => room.id === selectedRoom);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rooms</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Room Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roomSelector}>
        {rooms.map((room) => (
          <TouchableOpacity
            key={room.id}
            style={[
              styles.roomSelectorItem,
              selectedRoom === room.id && styles.roomSelectorItemActive
            ]}
            onPress={() => setSelectedRoom(room.id)}
          >
            <View style={[styles.roomIconContainer, { backgroundColor: room.color }]}>
              <room.icon size={24} color="#FFFFFF" />
            </View>
            <Text style={[
              styles.roomSelectorText,
              selectedRoom === room.id && styles.roomSelectorTextActive
            ]}>
              {room.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Room Details */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentRoom && (
          <>
            {/* Room Overview */}
            <View style={styles.roomOverview}>
              <View style={styles.roomHeader}>
                <View style={[styles.roomIconLarge, { backgroundColor: currentRoom.color }]}>
                  <currentRoom.icon size={32} color="#FFFFFF" />
                </View>
                <View style={styles.roomHeaderInfo}>
                  <Text style={styles.roomName}>{currentRoom.name}</Text>
                  <Text style={styles.roomStats}>
                    {currentRoom.devices} devices • {currentRoom.temperature}°C
                  </Text>
                </View>
              </View>

              {/* Climate Control */}
              <View style={styles.climateCard}>
                <View style={styles.climateHeader}>
                  <Thermometer size={20} color="#3B82F6" />
                  <Text style={styles.climateTitle}>Climate</Text>
                </View>
                <View style={styles.climateControls}>
                  <TouchableOpacity style={styles.tempButton}>
                    <Text style={styles.tempButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.temperature}>{currentRoom.temperature}°C</Text>
                  <TouchableOpacity style={styles.tempButton}>
                    <Text style={styles.tempButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Devices */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Devices</Text>
              {currentRoom.devices_list.map((device) => (
                <TouchableOpacity key={device.id} style={styles.deviceCard}>
                  <View style={styles.deviceInfo}>
                    <View style={[
                      styles.deviceIcon,
                      { backgroundColor: device.status ? currentRoom.color : '#374151' }
                    ]}>
                      <device.icon size={20} color="#FFFFFF" />
                    </View>
                    <View style={styles.deviceDetails}>
                      <Text style={styles.deviceName}>{device.name}</Text>
                      <Text style={styles.deviceType}>
                        {device.type} • {device.status ? 'On' : 'Off'}
                        {device.temperature && ` • ${device.temperature}°C`}
                      </Text>
                    </View>
                  </View>
                  <View style={[
                    styles.deviceToggle,
                    device.status && styles.deviceToggleActive
                  ]}>
                    <View style={[
                      styles.deviceToggleSlider,
                      device.status && styles.deviceToggleSliderActive
                    ]} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Scene Shortcuts */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Scene Shortcuts</Text>
              <View style={styles.sceneGrid}>
                <TouchableOpacity style={styles.sceneCard}>
                  <Text style={styles.sceneEmoji}>🌅</Text>
                  <Text style={styles.sceneName}>Morning</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sceneCard}>
                  <Text style={styles.sceneEmoji}>🌙</Text>
                  <Text style={styles.sceneName}>Night</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sceneCard}>
                  <Text style={styles.sceneEmoji}>📺</Text>
                  <Text style={styles.sceneName}>Movie</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sceneCard}>
                  <Text style={styles.sceneEmoji}>🎵</Text>
                  <Text style={styles.sceneName}>Party</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomSelector: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  roomSelectorItem: {
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 8,
  },
  roomSelectorItemActive: {
    opacity: 1,
  },
  roomIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  roomSelectorText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  roomSelectorTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  roomOverview: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  roomIconLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roomHeaderInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  roomStats: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  climateCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
  },
  climateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  climateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  climateControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  tempButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  deviceCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  deviceType: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  deviceToggle: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#374151',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  deviceToggleActive: {
    backgroundColor: '#3B82F6',
  },
  deviceToggleSlider: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  deviceToggleSliderActive: {
    alignSelf: 'flex-end',
  },
  sceneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sceneCard: {
    backgroundColor: '#1F2937',
    width: (width - 56) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  sceneEmoji: {
    fontSize: 32,
  },
  sceneName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});