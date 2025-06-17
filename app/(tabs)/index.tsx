import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, CardBody, Button, Progress, Chip, Avatar } from '@heroui/react';
import { Thermometer, Lightbulb, Shield, Wifi, Battery, Sun, Moon, Power, Zap, Chrome as HomeIcon, Activity, TrendingUp, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface QuickAction {
  id: string;
  name: string;
  icon: any;
  status: string;
  color: string;
  isActive: boolean;
  protocol: string;
}

interface Room {
  id: string;
  name: string;
  devices: number;
  active: number;
  temperature: number;
  humidity: number;
  energyUsage: number;
}

interface SystemStatus {
  networkHealth: number;
  deviceConnectivity: number;
  energyEfficiency: number;
  securityStatus: 'secure' | 'warning' | 'alert';
}

export default function HomeScreen() {
  const [greeting, setGreeting] = useState('Good Evening');
  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    { 
      id: '1', 
      name: 'Smart Lights', 
      icon: Lightbulb, 
      status: '12 On', 
      color: '#F59E0B', 
      isActive: true,
      protocol: 'Zigbee 3.0'
    },
    { 
      id: '2', 
      name: 'Security', 
      icon: Shield, 
      status: 'Armed', 
      color: '#10B981', 
      isActive: true,
      protocol: 'Z-Wave Plus'
    },
    { 
      id: '3', 
      name: 'Climate', 
      icon: Thermometer, 
      status: '22°C', 
      color: '#3182CE', 
      isActive: true,
      protocol: 'Matter/Thread'
    },
    { 
      id: '4', 
      name: 'Energy', 
      icon: Zap, 
      status: '2.4kW', 
      color: '#8B5CF6', 
      isActive: false,
      protocol: 'WiFi 6'
    },
  ]);

  const [roomStatus] = useState<Room[]>([
    { id: '1', name: 'Living Room', devices: 12, active: 8, temperature: 22, humidity: 45, energyUsage: 850 },
    { id: '2', name: 'Kitchen', devices: 8, active: 5, temperature: 24, humidity: 50, energyUsage: 1200 },
    { id: '3', name: 'Master Bedroom', devices: 6, active: 2, temperature: 20, humidity: 42, energyUsage: 320 },
    { id: '4', name: 'Home Office', devices: 9, active: 6, temperature: 23, humidity: 48, energyUsage: 680 },
  ]);

  const [systemStatus] = useState<SystemStatus>({
    networkHealth: 98,
    deviceConnectivity: 94,
    energyEfficiency: 87,
    securityStatus: 'secure'
  });

  const [recentActivity] = useState([
    { id: '1', action: 'Motion detected in Living Room', time: '2 min ago', icon: Activity, color: '#3182CE' },
    { id: '2', action: 'Kitchen lights automated off', time: '15 min ago', icon: Lightbulb, color: '#F59E0B' },
    { id: '3', action: 'Security system armed', time: '1 hour ago', icon: Shield, color: '#10B981' },
    { id: '4', action: 'Energy usage optimized', time: '2 hours ago', icon: TrendingUp, color: '#8B5CF6' },
  ]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const toggleQuickAction = (id: string) => {
    triggerHaptic();
    setQuickActions(prev => 
      prev.map(action => 
        action.id === id 
          ? { ...action, isActive: !action.isActive }
          : action
      )
    );
  };

  const totalEnergyUsage = roomStatus.reduce((sum, room) => sum + room.energyUsage, 0);
  const averageTemperature = Math.round(roomStatus.reduce((sum, room) => sum + room.temperature, 0) / roomStatus.length);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4">
          <View>
            <Text className="text-3xl font-bold text-foreground">{greeting}</Text>
            <Text className="text-lg text-default-500 mt-1">Your smart home is running smoothly</Text>
          </View>
          <Avatar 
            size="lg"
            name="JD"
            className="bg-primary text-primary-foreground"
          />
        </View>

        {/* System Overview */}
        <Card className="mx-6 mb-6 bg-content1">
          <CardBody className="p-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <HomeIcon size={24} color="#3182CE" />
                <Text className="text-xl font-bold text-foreground ml-3">System Overview</Text>
              </View>
              <Chip 
                color={systemStatus.securityStatus === 'secure' ? 'success' : 'warning'}
                variant="flat"
                size="sm"
              >
                {systemStatus.securityStatus.toUpperCase()}
              </Chip>
            </View>
            
            <View className="space-y-4">
              <View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-default-600">Network Health</Text>
                  <Text className="text-sm font-semibold text-foreground">{systemStatus.networkHealth}%</Text>
                </View>
                <Progress 
                  value={systemStatus.networkHealth} 
                  color="primary"
                  className="h-2"
                />
              </View>
              
              <View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-default-600">Device Connectivity</Text>
                  <Text className="text-sm font-semibold text-foreground">{systemStatus.deviceConnectivity}%</Text>
                </View>
                <Progress 
                  value={systemStatus.deviceConnectivity} 
                  color="success"
                  className="h-2"
                />
              </View>
              
              <View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-default-600">Energy Efficiency</Text>
                  <Text className="text-sm font-semibold text-foreground">{systemStatus.energyEfficiency}%</Text>
                </View>
                <Progress 
                  value={systemStatus.energyEfficiency} 
                  color="warning"
                  className="h-2"
                />
              </View>
            </View>

            <View className="flex-row justify-between mt-6 pt-4 border-t border-divider">
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">{totalEnergyUsage}W</Text>
                <Text className="text-xs text-default-500">Total Usage</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-success">{averageTemperature}°C</Text>
                <Text className="text-xs text-default-500">Avg Temp</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-warning">47</Text>
                <Text className="text-xs text-default-500">Devices</Text>
              </View>
            </View>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground px-6 mb-4">Quick Actions</Text>
          <View className="flex-row flex-wrap px-6" style={{ gap: 12 }}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={() => toggleQuickAction(action.id)}
                style={{ width: (width - 60) / 2 }}
              >
                <Card className={`${action.isActive ? 'bg-primary/10 border-primary' : 'bg-content1'} border-2`}>
                  <CardBody className="p-5 items-center">
                    <View 
                      className="w-14 h-14 rounded-full items-center justify-center mb-3"
                      style={{ backgroundColor: action.isActive ? action.color : '#374151' }}
                    >
                      <action.icon size={24} color="#FFFFFF" />
                    </View>
                    <Text className="text-base font-semibold text-foreground text-center mb-1">
                      {action.name}
                    </Text>
                    <Text className="text-sm text-default-500 text-center mb-2">
                      {action.status}
                    </Text>
                    <Chip size="sm" variant="flat" color="default">
                      {action.protocol}
                    </Chip>
                  </CardBody>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Room Status */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-foreground px-6 mb-4">Room Status</Text>
          <View className="px-6 space-y-3">
            {roomStatus.map((room) => (
              <Card key={room.id} className="bg-content1">
                <CardBody className="p-5">
                  <View className="flex-row justify-between items-center mb-3">
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-foreground">{room.name}</Text>
                      <Text className="text-sm text-default-500">
                        {room.active}/{room.devices} devices active
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-lg font-bold text-primary">{room.temperature}°C</Text>
                      <Text className="text-xs text-default-500">{room.humidity}% humidity</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-between items-center">
                    <View className="flex-1 mr-4">
                      <Progress 
                        value={(room.active / room.devices) * 100} 
                        color="primary"
                        className="h-2"
                      />
                    </View>
                    <View className="items-end">
                      <Text className="text-sm font-semibold text-warning">{room.energyUsage}W</Text>
                      <Text className="text-xs text-default-500">Energy</Text>
                    </View>
                  </View>
                </CardBody>
              </Card>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-foreground px-6 mb-4">Recent Activity</Text>
          <Card className="mx-6 bg-content1">
            <CardBody className="p-0">
              {recentActivity.map((activity, index) => (
                <View 
                  key={activity.id} 
                  className={`flex-row items-center p-4 ${index !== recentActivity.length - 1 ? 'border-b border-divider' : ''}`}
                >
                  <View 
                    className="w-10 h-10 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: `${activity.color}20` }}
                  >
                    <activity.icon size={18} color={activity.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base text-foreground font-medium">{activity.action}</Text>
                    <Text className="text-sm text-default-500">{activity.time}</Text>
                  </View>
                </View>
              ))}
            </CardBody>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}