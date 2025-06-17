import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Card, 
  CardBody, 
  Button, 
  Input, 
  Chip, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Switch,
  Progress,
  Divider
} from '@heroui/react';
import { 
  Search, 
  Plus, 
  Filter, 
  Lightbulb, 
  Thermometer, 
  Shield, 
  Wifi, 
  Tv, 
  Microwave, 
  AirVent, 
  WashingMachine,
  Smartphone,
  Router,
  Camera,
  Speaker,
  Zap,
  Settings,
  Info,
  Battery,
  Signal
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface Device {
  id: string;
  name: string;
  category: string;
  brand: string;
  room: string;
  status: boolean;
  icon: any;
  color: string;
  battery?: number;
  temperature?: number;
  protocol: string;
  ipAddress?: string;
  signalStrength: number;
  firmwareVersion: string;
  lastSeen: string;
  energyUsage?: number;
}

interface DeviceCategory {
  id: string;
  name: string;
  count: number;
  protocol: string;
}

export default function DevicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScanning, setIsScanning] = useState(false);

  const categories: DeviceCategory[] = [
    { id: 'all', name: 'All Devices', count: 47, protocol: 'Mixed' },
    { id: 'lights', name: 'Lighting', count: 18, protocol: 'Zigbee 3.0' },
    { id: 'climate', name: 'Climate', count: 8, protocol: 'Matter/Thread' },
    { id: 'security', name: 'Security', count: 12, protocol: 'Z-Wave Plus' },
    { id: 'appliances', name: 'Appliances', count: 9, protocol: 'WiFi 6' },
  ];

  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Living Room Ceiling Lights',
      category: 'lights',
      brand: 'Philips Hue',
      room: 'Living Room',
      status: true,
      icon: Lightbulb,
      color: '#F59E0B',
      protocol: 'Zigbee 3.0',
      ipAddress: '192.168.1.45',
      signalStrength: 95,
      firmwareVersion: '1.50.2',
      lastSeen: '2 min ago',
      energyUsage: 45
    },
    {
      id: '2',
      name: 'Kitchen Under Cabinet LEDs',
      category: 'lights',
      brand: 'LIFX',
      room: 'Kitchen',
      status: false,
      icon: Lightbulb,
      color: '#F59E0B',
      protocol: 'WiFi 6',
      ipAddress: '192.168.1.67',
      signalStrength: 88,
      firmwareVersion: '3.70',
      lastSeen: '5 min ago',
      energyUsage: 0
    },
    {
      id: '3',
      name: 'Smart Thermostat Pro',
      category: 'climate',
      brand: 'Nest',
      room: 'Hallway',
      status: true,
      icon: Thermometer,
      color: '#3182CE',
      temperature: 22,
      protocol: 'Matter/Thread',
      ipAddress: '192.168.1.89',
      signalStrength: 92,
      firmwareVersion: '6.2.1',
      lastSeen: '1 min ago',
      energyUsage: 12
    },
    {
      id: '4',
      name: 'Front Door Security Camera',
      category: 'security',
      brand: 'Ring',
      room: 'Entrance',
      status: true,
      icon: Camera,
      color: '#EF4444',
      battery: 85,
      protocol: 'Z-Wave Plus',
      signalStrength: 78,
      firmwareVersion: '2.1.4',
      lastSeen: '30 sec ago',
      energyUsage: 8
    },
    {
      id: '5',
      name: '75" QLED Smart TV',
      category: 'appliances',
      brand: 'Samsung',
      room: 'Living Room',
      status: false,
      icon: Tv,
      color: '#8B5CF6',
      protocol: 'WiFi 6',
      ipAddress: '192.168.1.123',
      signalStrength: 96,
      firmwareVersion: '1402.3',
      lastSeen: '1 hour ago',
      energyUsage: 0
    },
    {
      id: '6',
      name: 'Smart Convection Microwave',
      category: 'appliances',
      brand: 'LG',
      room: 'Kitchen',
      status: false,
      icon: Microwave,
      color: '#10B981',
      protocol: 'WiFi 6',
      ipAddress: '192.168.1.156',
      signalStrength: 84,
      firmwareVersion: '4.1.2',
      lastSeen: '3 hours ago',
      energyUsage: 0
    },
    {
      id: '7',
      name: 'Bedroom Climate Control',
      category: 'climate',
      brand: 'Daikin',
      room: 'Master Bedroom',
      status: true,
      icon: AirVent,
      color: '#3182CE',
      temperature: 20,
      protocol: 'Matter/Thread',
      signalStrength: 89,
      firmwareVersion: '2.3.1',
      lastSeen: '2 min ago',
      energyUsage: 1200
    },
    {
      id: '8',
      name: 'Smart Washing Machine',
      category: 'appliances',
      brand: 'Bosch',
      room: 'Laundry Room',
      status: false,
      icon: WashingMachine,
      color: '#10B981',
      protocol: 'WiFi 6',
      ipAddress: '192.168.1.178',
      signalStrength: 72,
      firmwareVersion: '1.8.3',
      lastSeen: '15 min ago',
      energyUsage: 0
    },
  ]);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const toggleDevice = (deviceId: string) => {
    triggerHaptic();
    setDevices(prev => 
      prev.map(device => 
        device.id === deviceId 
          ? { 
              ...device, 
              status: !device.status,
              energyUsage: !device.status ? (device.energyUsage || 0) : 0,
              lastSeen: 'Just now'
            }
          : device
      )
    );
  };

  const scanForDevices = async () => {
    setIsScanning(true);
    triggerHaptic();
    
    // Simulate device discovery
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert(
        'Device Scan Complete',
        'Found 3 new devices ready to pair:\n• Sonoff Basic R4\n• TP-Link Kasa Smart Plug\n• Xiaomi Motion Sensor',
        [{ text: 'OK' }]
      );
    }, 3000);
  };

  const openDeviceDetails = (device: Device) => {
    setSelectedDevice(device);
    onOpen();
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || device.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSignalColor = (strength: number) => {
    if (strength >= 80) return '#10B981';
    if (strength >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row justify-between items-center px-6 py-4">
        <Text className="text-3xl font-bold text-foreground">Devices</Text>
        <View className="flex-row space-x-3">
          <Button
            isIconOnly
            variant="flat"
            onPress={scanForDevices}
            isLoading={isScanning}
            className="bg-content2"
          >
            <Search size={20} />
          </Button>
          <Button
            isIconOnly
            color="primary"
            onPress={() => Alert.alert('Add Device', 'Device pairing wizard will be implemented')}
          >
            <Plus size={20} />
          </Button>
        </View>
      </View>

      {/* Search */}
      <View className="px-6 mb-4">
        <Input
          placeholder="Search devices, brands, or rooms..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          startContent={<Search size={20} className="text-default-400" />}
          className="bg-content1"
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 mb-6">
        <View className="flex-row space-x-3">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Chip
                variant={selectedCategory === category.id ? "solid" : "flat"}
                color={selectedCategory === category.id ? "primary" : "default"}
                className="px-4 py-2"
              >
                {category.name} ({category.count})
              </Chip>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Device List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="space-y-3">
          {filteredDevices.map((device) => (
            <Card key={device.id} className="bg-content1">
              <CardBody className="p-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View 
                      className="w-12 h-12 rounded-full items-center justify-center mr-4"
                      style={{ backgroundColor: device.status ? device.color : '#374151' }}
                    >
                      <device.icon size={20} color="#FFFFFF" />
                    </View>
                    
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{device.name}</Text>
                      <Text className="text-sm text-default-500 mb-1">
                        {device.brand} • {device.room}
                      </Text>
                      
                      <View className="flex-row items-center space-x-4">
                        <View className="flex-row items-center">
                          <View 
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: device.status ? '#10B981' : '#6B7280' }}
                          />
                          <Text className="text-xs text-default-500">
                            {device.status ? 'Online' : 'Offline'}
                          </Text>
                        </View>
                        
                        <View className="flex-row items-center">
                          <Signal size={12} color={getSignalColor(device.signalStrength)} />
                          <Text className="text-xs text-default-500 ml-1">
                            {device.signalStrength}%
                          </Text>
                        </View>
                        
                        {device.battery && (
                          <View className="flex-row items-center">
                            <Battery size={12} color="#10B981" />
                            <Text className="text-xs text-default-500 ml-1">
                              {device.battery}%
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  
                  <View className="flex-row items-center space-x-3">
                    <TouchableOpacity onPress={() => openDeviceDetails(device)}>
                      <Info size={18} color="#7D8590" />
                    </TouchableOpacity>
                    
                    <Switch
                      isSelected={device.status}
                      onValueChange={() => toggleDevice(device.id)}
                      color="primary"
                      size="sm"
                    />
                  </View>
                </View>
                
                {device.status && (
                  <View className="mt-3 pt-3 border-t border-divider">
                    <View className="flex-row justify-between items-center">
                      <Chip size="sm" variant="flat" color="default">
                        {device.protocol}
                      </Chip>
                      
                      {device.energyUsage !== undefined && (
                        <Text className="text-xs text-warning font-semibold">
                          {device.energyUsage}W
                        </Text>
                      )}
                      
                      {device.temperature && (
                        <Text className="text-xs text-primary font-semibold">
                          {device.temperature}°C
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </CardBody>
            </Card>
          ))}
        </View>

        {/* Device Discovery Card */}
        <Card className="mt-6 mb-8 bg-content1 border-2 border-dashed border-default-300">
          <CardBody className="p-6 items-center">
            <View className="w-16 h-16 rounded-full bg-primary/10 items-center justify-center mb-4">
              <Zap size={28} color="#3182CE" />
            </View>
            <Text className="text-lg font-bold text-foreground mb-2">Discover New Devices</Text>
            <Text className="text-sm text-default-500 text-center mb-4">
              Automatically find and connect compatible smart home devices on your network
            </Text>
            <Button 
              color="primary" 
              onPress={scanForDevices}
              isLoading={isScanning}
              className="w-full"
            >
              {isScanning ? 'Scanning Network...' : 'Start Device Scan'}
            </Button>
          </CardBody>
        </Card>
      </ScrollView>

      {/* Device Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {selectedDevice && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <View className="flex-row items-center">
                  <View 
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: selectedDevice.color }}
                  >
                    <selectedDevice.icon size={20} color="#FFFFFF" />
                  </View>
                  <View>
                    <Text className="text-lg font-bold">{selectedDevice.name}</Text>
                    <Text className="text-sm text-default-500">{selectedDevice.brand}</Text>
                  </View>
                </View>
              </ModalHeader>
              <ModalBody>
                <View className="space-y-4">
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Status</Text>
                    <Chip 
                      color={selectedDevice.status ? "success" : "default"}
                      size="sm"
                      variant="flat"
                    >
                      {selectedDevice.status ? 'Online' : 'Offline'}
                    </Chip>
                  </View>
                  
                  <Divider />
                  
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Protocol</Text>
                    <Text className="text-sm font-medium">{selectedDevice.protocol}</Text>
                  </View>
                  
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">IP Address</Text>
                    <Text className="text-sm font-medium">{selectedDevice.ipAddress || 'N/A'}</Text>
                  </View>
                  
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Signal Strength</Text>
                    <View className="flex-row items-center">
                      <Progress 
                        value={selectedDevice.signalStrength} 
                        color={selectedDevice.signalStrength >= 80 ? "success" : selectedDevice.signalStrength >= 60 ? "warning" : "danger"}
                        className="w-20 mr-2"
                        size="sm"
                      />
                      <Text className="text-sm font-medium">{selectedDevice.signalStrength}%</Text>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Firmware</Text>
                    <Text className="text-sm font-medium">{selectedDevice.firmwareVersion}</Text>
                  </View>
                  
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Last Seen</Text>
                    <Text className="text-sm font-medium">{selectedDevice.lastSeen}</Text>
                  </View>
                  
                  {selectedDevice.energyUsage !== undefined && (
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-default-600">Power Usage</Text>
                      <Text className="text-sm font-medium text-warning">{selectedDevice.energyUsage}W</Text>
                    </View>
                  )}
                </View>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" startContent={<Settings size={16} />}>
                  Configure
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
}