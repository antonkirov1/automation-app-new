import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Card, 
  CardBody, 
  Button, 
  Progress, 
  Chip, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Input,
  Switch,
  Divider
} from '@heroui/react';
import { Wifi, Router, Smartphone, Laptop, Tv, Speaker, Shield, Activity, Settings, RefreshCw, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Globe, Lock, Zap, Signal, Eye, EyeOff } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface NetworkDevice {
  id: string;
  name: string;
  type: 'router' | 'smartphone' | 'laptop' | 'smart_tv' | 'speaker' | 'smart_device';
  icon: any;
  ipAddress: string;
  macAddress: string;
  status: 'online' | 'offline';
  signalStrength: number;
  bandwidth: number;
  lastSeen: string;
  isSecure: boolean;
}

interface NetworkStats {
  totalDevices: number;
  onlineDevices: number;
  totalBandwidth: number;
  usedBandwidth: number;
  securityScore: number;
  uptime: string;
}

interface WifiNetwork {
  ssid: string;
  security: string;
  signalStrength: number;
  frequency: string;
  isConnected: boolean;
  isSecure: boolean;
}

export default function NetworkScreen() {
  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    totalDevices: 47,
    onlineDevices: 44,
    totalBandwidth: 1000,
    usedBandwidth: 340,
    securityScore: 94,
    uptime: '15 days, 8 hours'
  });

  const [networkDevices, setNetworkDevices] = useState<NetworkDevice[]>([
    {
      id: '1',
      name: 'ASUS AX6000 Router',
      type: 'router',
      icon: Router,
      ipAddress: '192.168.1.1',
      macAddress: '00:1A:2B:3C:4D:5E',
      status: 'online',
      signalStrength: 100,
      bandwidth: 0,
      lastSeen: 'Now',
      isSecure: true
    },
    {
      id: '2',
      name: 'iPhone 15 Pro',
      type: 'smartphone',
      icon: Smartphone,
      ipAddress: '192.168.1.45',
      macAddress: '00:1A:2B:3C:4D:5F',
      status: 'online',
      signalStrength: 95,
      bandwidth: 25,
      lastSeen: '2 min ago',
      isSecure: true
    },
    {
      id: '3',
      name: 'MacBook Pro M3',
      type: 'laptop',
      icon: Laptop,
      ipAddress: '192.168.1.67',
      macAddress: '00:1A:2B:3C:4D:60',
      status: 'online',
      signalStrength: 88,
      bandwidth: 120,
      lastSeen: '1 min ago',
      isSecure: true
    },
    {
      id: '4',
      name: 'Samsung QLED TV',
      type: 'smart_tv',
      icon: Tv,
      ipAddress: '192.168.1.123',
      macAddress: '00:1A:2B:3C:4D:61',
      status: 'online',
      signalStrength: 92,
      bandwidth: 85,
      lastSeen: '5 min ago',
      isSecure: true
    },
    {
      id: '5',
      name: 'Sonos Arc',
      type: 'speaker',
      icon: Speaker,
      ipAddress: '192.168.1.156',
      macAddress: '00:1A:2B:3C:4D:62',
      status: 'online',
      signalStrength: 78,
      bandwidth: 15,
      lastSeen: '3 min ago',
      isSecure: true
    }
  ]);

  const [availableNetworks, setAvailableNetworks] = useState<WifiNetwork[]>([
    {
      ssid: 'SmartHome_5G',
      security: 'WPA3',
      signalStrength: 95,
      frequency: '5GHz',
      isConnected: true,
      isSecure: true
    },
    {
      ssid: 'SmartHome_2.4G',
      security: 'WPA3',
      signalStrength: 88,
      frequency: '2.4GHz',
      isConnected: false,
      isSecure: true
    },
    {
      ssid: 'Neighbor_WiFi',
      security: 'WPA2',
      signalStrength: 45,
      frequency: '2.4GHz',
      isConnected: false,
      isSecure: true
    },
    {
      ssid: 'Public_WiFi',
      security: 'Open',
      signalStrength: 32,
      frequency: '2.4GHz',
      isConnected: false,
      isSecure: false
    }
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPasswords, setShowPasswords] = useState(false);

  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const scanNetwork = async () => {
    setIsScanning(true);
    triggerHaptic();
    
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert(
        'Network Scan Complete',
        'Found 2 new devices:\n• Unknown Device (192.168.1.201)\n• Smart Doorbell (192.168.1.202)',
        [{ text: 'OK' }]
      );
    }, 3000);
  };

  const openDeviceDetails = (device: NetworkDevice) => {
    setSelectedDevice(device);
    onOpen();
  };

  const getDeviceTypeColor = (type: string) => {
    switch (type) {
      case 'router': return '#3182CE';
      case 'smartphone': return '#10B981';
      case 'laptop': return '#8B5CF6';
      case 'smart_tv': return '#F59E0B';
      case 'speaker': return '#EC4899';
      default: return '#6B7280';
    }
  };

  const getSignalColor = (strength: number) => {
    if (strength >= 80) return '#10B981';
    if (strength >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getSecurityColor = (security: string) => {
    switch (security) {
      case 'WPA3': return '#10B981';
      case 'WPA2': return '#F59E0B';
      case 'WEP': return '#EF4444';
      case 'Open': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row justify-between items-center px-6 py-4">
        <Text className="text-3xl font-bold text-foreground">Network</Text>
        <View className="flex-row space-x-3">
          <Button
            isIconOnly
            variant="flat"
            onPress={scanNetwork}
            isLoading={isScanning}
            className="bg-content2"
          >
            <RefreshCw size={20} />
          </Button>
          <Button
            isIconOnly
            color="primary"
            onPress={() => Alert.alert('Network Settings', 'Advanced network configuration')}
          >
            <Settings size={20} />
          </Button>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Network Overview */}
        <Card className="mx-6 mb-6 bg-content1">
          <CardBody className="p-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Wifi size={24} color="#3182CE" />
                <Text className="text-xl font-bold text-foreground ml-3">Network Overview</Text>
              </View>
              <Chip 
                color="success"
                variant="flat"
                size="sm"
                startContent={<CheckCircle size={14} />}
              >
                HEALTHY
              </Chip>
            </View>
            
            <View className="space-y-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-default-600">Connected Devices</Text>
                <Text className="text-lg font-bold text-foreground">
                  {networkStats.onlineDevices}/{networkStats.totalDevices}
                </Text>
              </View>
              
              <View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-default-600">Bandwidth Usage</Text>
                  <Text className="text-sm font-semibold text-foreground">
                    {networkStats.usedBandwidth}/{networkStats.totalBandwidth} Mbps
                  </Text>
                </View>
                <Progress 
                  value={(networkStats.usedBandwidth / networkStats.totalBandwidth) * 100} 
                  color="primary"
                  className="h-2"
                />
              </View>
              
              <View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-sm text-default-600">Security Score</Text>
                  <Text className="text-sm font-semibold text-success">{networkStats.securityScore}%</Text>
                </View>
                <Progress 
                  value={networkStats.securityScore} 
                  color="success"
                  className="h-2"
                />
              </View>
              
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-default-600">Uptime</Text>
                <Text className="text-sm font-semibold text-foreground">{networkStats.uptime}</Text>
              </View>
            </View>
          </CardBody>
        </Card>

        {/* Available Networks */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold text-foreground mb-4">Available Networks</Text>
          <Card className="bg-content1">
            <CardBody className="p-0">
              {availableNetworks.map((network, index) => (
                <View key={network.ssid}>
                  <TouchableOpacity className="p-4">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center flex-1">
                        <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center mr-3">
                          <Wifi size={18} color="#3182CE" />
                        </View>
                        <View className="flex-1">
                          <View className="flex-row items-center">
                            <Text className="text-base font-semibold text-foreground mr-2">
                              {network.ssid}
                            </Text>
                            {network.isConnected && (
                              <Chip size="sm" color="success" variant="flat">
                                Connected
                              </Chip>
                            )}
                          </View>
                          <View className="flex-row items-center space-x-3 mt-1">
                            <Text className="text-xs text-default-500">{network.frequency}</Text>
                            <Chip 
                              size="sm" 
                              variant="flat"
                              color={getSecurityColor(network.security) === '#10B981' ? 'success' : 
                                     getSecurityColor(network.security) === '#F59E0B' ? 'warning' : 'danger'}
                            >
                              {network.security}
                            </Chip>
                          </View>
                        </View>
                      </View>
                      <View className="flex-row items-center space-x-2">
                        <Signal size={16} color={getSignalColor(network.signalStrength)} />
                        <Text className="text-xs text-default-500">{network.signalStrength}%</Text>
                        {!network.isSecure && (
                          <AlertTriangle size={16} color="#EF4444" />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                  {index < availableNetworks.length - 1 && <Divider />}
                </View>
              ))}
            </CardBody>
          </Card>
        </View>

        {/* Connected Devices */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-foreground">Connected Devices</Text>
            <Button
              size="sm"
              variant="flat"
              onPress={scanNetwork}
              isLoading={isScanning}
              startContent={<Activity size={16} />}
            >
              {isScanning ? 'Scanning...' : 'Scan'}
            </Button>
          </View>
          
          <View className="space-y-3">
            {networkDevices.map((device) => (
              <Card key={device.id} className="bg-content1">
                <CardBody className="p-4">
                  <TouchableOpacity onPress={() => openDeviceDetails(device)}>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center flex-1">
                        <View 
                          className="w-12 h-12 rounded-full items-center justify-center mr-4"
                          style={{ backgroundColor: `${getDeviceTypeColor(device.type)}20` }}
                        >
                          <device.icon size={20} color={getDeviceTypeColor(device.type)} />
                        </View>
                        
                        <View className="flex-1">
                          <Text className="text-base font-semibold text-foreground">{device.name}</Text>
                          <Text className="text-sm text-default-500 mb-1">{device.ipAddress}</Text>
                          
                          <View className="flex-row items-center space-x-4">
                            <View className="flex-row items-center">
                              <View 
                                className="w-2 h-2 rounded-full mr-2"
                                style={{ backgroundColor: device.status === 'online' ? '#10B981' : '#6B7280' }}
                              />
                              <Text className="text-xs text-default-500 capitalize">{device.status}</Text>
                            </View>
                            
                            <View className="flex-row items-center">
                              <Signal size={12} color={getSignalColor(device.signalStrength)} />
                              <Text className="text-xs text-default-500 ml-1">{device.signalStrength}%</Text>
                            </View>
                            
                            {device.isSecure && (
                              <View className="flex-row items-center">
                                <Shield size={12} color="#10B981" />
                                <Text className="text-xs text-success ml-1">Secure</Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                      
                      <View className="items-end">
                        {device.bandwidth > 0 && (
                          <Text className="text-sm font-semibold text-primary">{device.bandwidth} Mbps</Text>
                        )}
                        <Text className="text-xs text-default-500">{device.lastSeen}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </CardBody>
              </Card>
            ))}
          </View>
        </View>

        {/* Network Security */}
        <Card className="mx-6 mb-8 bg-content1">
          <CardBody className="p-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Shield size={24} color="#10B981" />
                <Text className="text-xl font-bold text-foreground ml-3">Network Security</Text>
              </View>
              <Switch
                isSelected={showPasswords}
                onValueChange={setShowPasswords}
                size="sm"
                startContent={<Eye size={14} />}
                endContent={<EyeOff size={14} />}
              />
            </View>
            
            <View className="space-y-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-default-600">Firewall Status</Text>
                <Chip color="success" size="sm" variant="flat">
                  Active
                </Chip>
              </View>
              
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-default-600">WPA3 Encryption</Text>
                <Chip color="success" size="sm" variant="flat">
                  Enabled
                </Chip>
              </View>
              
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-default-600">Guest Network</Text>
                <Chip color="warning" size="sm" variant="flat">
                  Disabled
                </Chip>
              </View>
              
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-default-600">VPN Server</Text>
                <Chip color="success" size="sm" variant="flat">
                  Running
                </Chip>
              </View>
              
              {showPasswords && (
                <View className="mt-4 p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <Text className="text-sm font-semibold text-warning mb-2">Network Credentials</Text>
                  <Text className="text-xs text-default-600">WiFi Password: SmartHome2024!</Text>
                  <Text className="text-xs text-default-600">Admin Password: ••••••••••</Text>
                </View>
              )}
            </View>
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
                    style={{ backgroundColor: `${getDeviceTypeColor(selectedDevice.type)}20` }}
                  >
                    <selectedDevice.icon size={20} color={getDeviceTypeColor(selectedDevice.type)} />
                  </View>
                  <View>
                    <Text className="text-lg font-bold">{selectedDevice.name}</Text>
                    <Text className="text-sm text-default-500 capitalize">{selectedDevice.type.replace('_', ' ')}</Text>
                  </View>
                </View>
              </ModalHeader>
              <ModalBody>
                <View className="space-y-4">
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Status</Text>
                    <Chip 
                      color={selectedDevice.status === 'online' ? "success" : "default"}
                      size="sm"
                      variant="flat"
                    >
                      {selectedDevice.status.toUpperCase()}
                    </Chip>
                  </View>
                  
                  <Divider />
                  
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">IP Address</Text>
                    <Text className="text-sm font-medium">{selectedDevice.ipAddress}</Text>
                  </View>
                  
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">MAC Address</Text>
                    <Text className="text-sm font-medium">{selectedDevice.macAddress}</Text>
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
                    <Text className="text-sm text-default-600">Bandwidth Usage</Text>
                    <Text className="text-sm font-medium">{selectedDevice.bandwidth} Mbps</Text>
                  </View>
                  
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Last Seen</Text>
                    <Text className="text-sm font-medium">{selectedDevice.lastSeen}</Text>
                  </View>
                  
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Security</Text>
                    <Chip 
                      color={selectedDevice.isSecure ? "success" : "danger"}
                      size="sm"
                      variant="flat"
                    >
                      {selectedDevice.isSecure ? 'Secure' : 'Unsecured'}
                    </Chip>
                  </View>
                </View>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" startContent={<Settings size={16} />}>
                  Manage Device
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
}