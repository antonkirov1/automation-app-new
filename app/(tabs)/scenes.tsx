import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Play, CreditCard as Edit3, Sun, Moon, Tv, Coffee, Bed, Music, Shield, Chrome as Home } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ScenesScreen() {
  const [activeScene, setActiveScene] = useState(null);

  const scenes = [
    {
      id: 1,
      name: 'Good Morning',
      description: 'Start your day right',
      icon: Sun,
      color: '#F59E0B',
      devices: 8,
      actions: [
        'Turn on bedroom lights (30%)',
        'Set thermostat to 22°C',
        'Start coffee maker',
        'Open blinds'
      ]
    },
    {
      id: 2,
      name: 'Movie Night',
      description: 'Perfect cinema atmosphere',
      icon: Tv,
      color: '#8B5CF6',
      devices: 5,
      actions: [
        'Dim living room lights (10%)',
        'Turn on TV',
        'Close blinds',
        'Set AC to 20°C'
      ]
    },
    {
      id: 3,
      name: 'Good Night',
      description: 'Wind down for sleep',
      icon: Moon,
      color: '#6366F1',
      devices: 12,
      actions: [
        'Turn off all lights',
        'Lock all doors',
        'Set thermostat to 18°C',
        'Enable security system'
      ]
    },
    {
      id: 4,
      name: 'Away Mode',
      description: 'Secure your home',
      icon: Shield,
      color: '#EF4444',
      devices: 15,
      actions: [
        'Turn off all lights',
        'Lock all doors',
        'Enable security cameras',
        'Set thermostat to eco mode'
      ]
    },
    {
      id: 5,
      name: 'Party Mode',
      description: 'Get the party started',
      icon: Music,
      color: '#EC4899',
      devices: 10,
      actions: [
        'Turn on all lights (100%)',
        'Start music system',
        'Set colorful lighting',
        'Disable door locks'
      ]
    },
    {
      id: 6,
      name: 'Welcome Home',
      description: 'Perfect arrival setup',
      icon: Home,
      color: '#10B981',
      devices: 7,
      actions: [
        'Turn on entrance lights',
        'Unlock front door',
        'Set comfortable temperature',
        'Turn on living room lights'
      ]
    },
  ];

  const runScene = (sceneId) => {
    setActiveScene(sceneId);
    setTimeout(() => setActiveScene(null), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scenes</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Quick Access */}
      <View style={styles.quickAccess}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.quickAccessGrid}>
            {scenes.slice(0, 4).map((scene) => (
              <TouchableOpacity
                key={scene.id}
                style={[
                  styles.quickAccessCard,
                  activeScene === scene.id && styles.activeSceneCard
                ]}
                onPress={() => runScene(scene.id)}
              >
                <View style={[styles.sceneIcon, { backgroundColor: scene.color }]}>
                  <scene.icon size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.quickAccessName}>{scene.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* All Scenes */}
      <ScrollView style={styles.scenesList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>All Scenes</Text>
        {scenes.map((scene) => (
          <View key={scene.id} style={styles.sceneCard}>
            <View style={styles.sceneHeader}>
              <View style={styles.sceneInfo}>
                <View style={[styles.sceneIconLarge, { backgroundColor: scene.color }]}>
                  <scene.icon size={28} color="#FFFFFF" />
                </View>
                <View style={styles.sceneDetails}>
                  <Text style={styles.sceneName}>{scene.name}</Text>
                  <Text style={styles.sceneDescription}>{scene.description}</Text>
                  <Text style={styles.sceneDevices}>{scene.devices} devices</Text>
                </View>
              </View>
              <View style={styles.sceneActions}>
                <TouchableOpacity style={styles.editButton}>
                  <Edit3 size={16} color="#9CA3AF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.playButton,
                    { backgroundColor: scene.color },
                    activeScene === scene.id && styles.activePlayButton
                  ]}
                  onPress={() => runScene(scene.id)}
                >
                  <Play size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Scene Actions */}
            <View style={styles.sceneActionsList}>
              {scene.actions.map((action, index) => (
                <View key={index} style={styles.actionItem}>
                  <View style={styles.actionDot} />
                  <Text style={styles.actionText}>{action}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Create New Scene */}
        <TouchableOpacity style={styles.createSceneCard}>
          <View style={styles.createSceneIcon}>
            <Plus size={24} color="#3B82F6" />
          </View>
          <View style={styles.createSceneText}>
            <Text style={styles.createSceneTitle}>Create New Scene</Text>
            <Text style={styles.createSceneDescription}>
              Automate multiple devices with one tap
            </Text>
          </View>
        </TouchableOpacity>
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
  quickAccess: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  quickAccessCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    minWidth: 120,
  },
  activeSceneCard: {
    backgroundColor: '#2563EB',
  },
  sceneIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAccessName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scenesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sceneCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sceneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sceneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sceneIconLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sceneDetails: {
    flex: 1,
  },
  sceneName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sceneDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  sceneDevices: {
    fontSize: 12,
    color: '#6B7280',
  },
  sceneActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePlayButton: {
    transform: [{ scale: 0.9 }],
  },
  sceneActionsList: {
    gap: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280',
  },
  actionText: {
    fontSize: 14,
    color: '#D1D5DB',
  },
  createSceneCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#374151',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  createSceneIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  createSceneText: {
    flex: 1,
  },
  createSceneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  createSceneDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});