import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Card,
  CardBody,
  Chip,
  Progress,
  Divider
} from '@heroui/react';
import { Wifi, Smartphone, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Info, Zap, Shield } from 'lucide-react-native';
import { generateSetupGuide, getProtocolInfo, DEVICE_BRANDS } from '@/services/DeviceProtocols';

interface DeviceSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
  deviceName: string;
  brand: string;
  category: string;
  protocol: string;
}

export default function DeviceSetupWizard({
  isOpen,
  onClose,
  deviceName,
  brand,
  category,
  protocol
}: DeviceSetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const setupSteps = [
    'Prepare Device',
    'Download App',
    'Connect to Network',
    'Pair Device',
    'Test & Configure'
  ];
  
  const setupGuide = generateSetupGuide(deviceName, brand, category);
  const protocolInfo = getProtocolInfo(protocol);
  const brandInfo = DEVICE_BRANDS[brand.toLowerCase().replace(/\s+/g, '_')];

  const handleNext = () => {
    if (currentStep < setupSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const simulateConnection = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      handleNext();
    }, 3000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-foreground">Prepare Your Device</Text>
            <Card className="bg-content2">
              <CardBody className="p-4">
                <View className="flex-row items-center mb-3">
                  <Info size={20} color="#3182CE" />
                  <Text className="text-base font-medium text-foreground ml-2">Device Information</Text>
                </View>
                <View className="space-y-2">
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Brand:</Text>
                    <Text className="text-sm font-medium text-foreground">{brand}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Protocol:</Text>
                    <Chip size="sm" color="primary" variant="flat">{protocol}</Chip>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-default-600">Category:</Text>
                    <Text className="text-sm font-medium text-foreground capitalize">{category}</Text>
                  </View>
                </View>
              </CardBody>
            </Card>
            
            <View className="space-y-3">
              <Text className="text-base font-medium text-foreground">Before you start:</Text>
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <CheckCircle size={16} color="#10B981" />
                  <Text className="text-sm text-default-600 ml-2">Ensure device is powered on</Text>
                </View>
                <View className="flex-row items-center">
                  <CheckCircle size={16} color="#10B981" />
                  <Text className="text-sm text-default-600 ml-2">Have WiFi password ready</Text>
                </View>
                <View className="flex-row items-center">
                  <CheckCircle size={16} color="#10B981" />
                  <Text className="text-sm text-default-600 ml-2">Phone connected to same network</Text>
                </View>
              </View>
            </View>
          </View>
        );
        
      case 1:
        return (
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-foreground">Download Required App</Text>
            {brandInfo && (
              <Card className="bg-content2">
                <CardBody className="p-4">
                  <View className="flex-row items-center mb-3">
                    <Smartphone size={20} color="#3182CE" />
                    <Text className="text-base font-medium text-foreground ml-2">{brand} App</Text>
                  </View>
                  <Text className="text-sm text-default-600 mb-3">
                    Download the official {brand} app from your device's app store.
                  </Text>
                  <View className="space-y-2">
                    {brandInfo.setupGuide.slice(0, 2).map((step, index) => (
                      <View key={index} className="flex-row items-start">
                        <Text className="text-sm text-primary font-medium mr-2">{index + 1}.</Text>
                        <Text className="text-sm text-default-600 flex-1">{step}</Text>
                      </View>
                    ))}
                  </View>
                </CardBody>
              </Card>
            )}
          </View>
        );
        
      case 2:
        return (
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-foreground">Connect to Network</Text>
            {protocolInfo && (
              <Card className="bg-content2">
                <CardBody className="p-4">
                  <View className="flex-row items-center mb-3">
                    <Wifi size={20} color="#3182CE" />
                    <Text className="text-base font-medium text-foreground ml-2">{protocolInfo.name}</Text>
                  </View>
                  <View className="space-y-2">
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-default-600">Frequency:</Text>
                      <Text className="text-sm font-medium text-foreground">{protocolInfo.frequency}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-default-600">Range:</Text>
                      <Text className="text-sm font-medium text-foreground">{protocolInfo.range}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-default-600">Security:</Text>
                      <Chip size="sm" color="success" variant="flat">{protocolInfo.security}</Chip>
                    </View>
                  </View>
                </CardBody>
              </Card>
            )}
            
            <View className="space-y-2">
              {protocolInfo?.setupInstructions.map((instruction, index) => (
                <View key={index} className="flex-row items-start">
                  <Text className="text-sm text-primary font-medium mr-2">{index + 1}.</Text>
                  <Text className="text-sm text-default-600 flex-1">{instruction}</Text>
                </View>
              ))}
            </View>
          </View>
        );
        
      case 3:
        return (
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-foreground">Pair Device</Text>
            <Card className="bg-content2">
              <CardBody className="p-4 items-center">
                <Zap size={48} color="#3182CE" className="mb-4" />
                <Text className="text-base font-medium text-foreground mb-2">Ready to Connect</Text>
                <Text className="text-sm text-default-600 text-center mb-4">
                  Press the button below to start the pairing process
                </Text>
                <Button
                  color="primary"
                  onPress={simulateConnection}
                  isLoading={isConnecting}
                  className="w-full"
                >
                  {isConnecting ? 'Connecting...' : 'Start Pairing'}
                </Button>
              </CardBody>
            </Card>
            
            {isConnecting && (
              <Card className="bg-warning/10 border border-warning/20">
                <CardBody className="p-4">
                  <View className="flex-row items-center">
                    <AlertCircle size={20} color="#F59E0B" />
                    <Text className="text-sm text-warning ml-2 font-medium">Pairing in progress...</Text>
                  </View>
                  <Text className="text-xs text-default-600 mt-2">
                    Make sure your device is in pairing mode and close to your phone.
                  </Text>
                </CardBody>
              </Card>
            )}
          </View>
        );
        
      case 4:
        return (
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-foreground">Setup Complete!</Text>
            <Card className="bg-success/10 border border-success/20">
              <CardBody className="p-4 items-center">
                <CheckCircle size={48} color="#10B981" className="mb-4" />
                <Text className="text-base font-medium text-success mb-2">Device Connected Successfully</Text>
                <Text className="text-sm text-default-600 text-center">
                  Your {deviceName} is now connected and ready to use.
                </Text>
              </CardBody>
            </Card>
            
            <View className="space-y-3">
              <Text className="text-base font-medium text-foreground">Next Steps:</Text>
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <CheckCircle size={16} color="#10B981" />
                  <Text className="text-sm text-default-600 ml-2">Test device functionality</Text>
                </View>
                <View className="flex-row items-center">
                  <CheckCircle size={16} color="#10B981" />
                  <Text className="text-sm text-default-600 ml-2">Set up automations</Text>
                </View>
                <View className="flex-row items-center">
                  <CheckCircle size={16} color="#10B981" />
                  <Text className="text-sm text-default-600 ml-2">Configure voice control</Text>
                </View>
              </View>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <Text className="text-xl font-bold">Device Setup Wizard</Text>
          <Text className="text-sm text-default-500">{deviceName}</Text>
        </ModalHeader>
        
        <ModalBody>
          {/* Progress Indicator */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm text-default-600">Step {currentStep + 1} of {setupSteps.length}</Text>
              <Text className="text-sm font-medium text-foreground">{setupSteps[currentStep]}</Text>
            </View>
            <Progress 
              value={((currentStep + 1) / setupSteps.length) * 100} 
              color="primary"
              className="h-2"
            />
          </View>
          
          <Divider className="mb-4" />
          
          {/* Step Content */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderStepContent()}
          </ScrollView>
        </ModalBody>
        
        <ModalFooter>
          <Button 
            variant="light" 
            onPress={handlePrevious}
            isDisabled={currentStep === 0}
          >
            Previous
          </Button>
          
          {currentStep === setupSteps.length - 1 ? (
            <Button color="success" onPress={onClose}>
              Finish
            </Button>
          ) : (
            <Button 
              color="primary" 
              onPress={handleNext}
              isDisabled={isConnecting}
            >
              Next
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}