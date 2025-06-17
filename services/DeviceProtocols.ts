/**
 * Smart Home Device Protocols and Integration Guide
 * 
 * This service handles various smart home protocols and provides
 * connection methods for different device types and brands.
 */

export interface DeviceProtocol {
  name: string;
  description: string;
  frequency?: string;
  range: string;
  powerConsumption: 'low' | 'medium' | 'high';
  security: 'basic' | 'standard' | 'high';
  compatibility: string[];
  setupInstructions: string[];
}

export interface DeviceBrand {
  name: string;
  protocols: string[];
  setupGuide: string[];
  commonIssues: string[];
  supportedDevices: string[];
}

// Smart Home Protocols
export const PROTOCOLS: Record<string, DeviceProtocol> = {
  'zigbee3': {
    name: 'Zigbee 3.0',
    description: 'Low-power mesh networking protocol for smart home devices',
    frequency: '2.4GHz',
    range: '10-100m',
    powerConsumption: 'low',
    security: 'high',
    compatibility: ['Philips Hue', 'IKEA TRÅDFRI', 'Samsung SmartThings', 'Amazon Echo Plus'],
    setupInstructions: [
      '1. Ensure your hub supports Zigbee 3.0',
      '2. Put device in pairing mode (usually hold button for 5-10 seconds)',
      '3. Open your hub app and select "Add Device"',
      '4. Follow the in-app pairing process',
      '5. Test device functionality after pairing'
    ]
  },
  'zwave_plus': {
    name: 'Z-Wave Plus',
    description: 'Mesh networking protocol with excellent range and reliability',
    frequency: '908.42MHz (US), 868.42MHz (EU)',
    range: '30-100m',
    powerConsumption: 'low',
    security: 'high',
    compatibility: ['Aeotec', 'Fibaro', 'GE/Jasco', 'Leviton', 'Ring'],
    setupInstructions: [
      '1. Put Z-Wave controller in inclusion mode',
      '2. Press the inclusion button on your device (usually 3 times quickly)',
      '3. Wait for the controller to detect the device',
      '4. Assign device to appropriate room/group',
      '5. Test device operation'
    ]
  },
  'matter_thread': {
    name: 'Matter/Thread',
    description: 'Universal standard for smart home interoperability',
    frequency: '2.4GHz',
    range: '10-30m per hop',
    powerConsumption: 'low',
    security: 'high',
    compatibility: ['Apple HomeKit', 'Google Home', 'Amazon Alexa', 'Samsung SmartThings'],
    setupInstructions: [
      '1. Ensure device has Matter certification',
      '2. Scan QR code or enter setup code from device packaging',
      '3. Choose your preferred ecosystem (Apple, Google, Amazon)',
      '4. Follow platform-specific setup process',
      '5. Device will be available across all Matter-compatible platforms'
    ]
  },
  'wifi6': {
    name: 'WiFi 6 (802.11ax)',
    description: 'High-speed wireless protocol for bandwidth-intensive devices',
    frequency: '2.4GHz & 5GHz',
    range: '50-100m',
    powerConsumption: 'medium',
    security: 'high',
    compatibility: ['Most modern smart TVs', 'Security cameras', 'Smart speakers'],
    setupInstructions: [
      '1. Connect device to power and wait for startup',
      '2. Use manufacturer app to scan for device',
      '3. Connect device to your WiFi network',
      '4. Enter WiFi password when prompted',
      '5. Complete device-specific setup in app'
    ]
  },
  'bluetooth_le': {
    name: 'Bluetooth Low Energy (BLE)',
    description: 'Short-range, low-power protocol for personal devices',
    frequency: '2.4GHz',
    range: '10-50m',
    powerConsumption: 'low',
    security: 'standard',
    compatibility: ['Fitness trackers', 'Smart locks', 'Beacons', 'Sensors'],
    setupInstructions: [
      '1. Enable Bluetooth on your smartphone',
      '2. Put device in pairing mode',
      '3. Open manufacturer app and scan for devices',
      '4. Select your device from the list',
      '5. Complete pairing process'
    ]
  }
};

// Device Brand Configurations
export const DEVICE_BRANDS: Record<string, DeviceBrand> = {
  'philips_hue': {
    name: 'Philips Hue',
    protocols: ['zigbee3', 'bluetooth_le'],
    setupGuide: [
      '1. Download Philips Hue app',
      '2. Connect Hue Bridge to router via Ethernet',
      '3. Press button on Bridge when prompted',
      '4. Add lights by scanning for new devices',
      '5. For Bluetooth-only setup, skip Bridge and pair directly'
    ],
    commonIssues: [
      'Bridge not found: Check Ethernet connection and router settings',
      'Lights not responding: Move closer to Bridge or add Hue range extender',
      'App connection issues: Ensure phone and Bridge are on same network'
    ],
    supportedDevices: ['Smart Bulbs', 'Light Strips', 'Motion Sensors', 'Smart Switches']
  },
  'sonoff': {
    name: 'Sonoff',
    protocols: ['wifi6', 'zigbee3'],
    setupGuide: [
      '1. Download eWeLink app',
      '2. Create account and log in',
      '3. Hold device button for 5-7 seconds until LED blinks',
      '4. Add device in app and follow WiFi setup',
      '5. For Zigbee models, use compatible hub'
    ],
    commonIssues: [
      'WiFi connection failed: Check 2.4GHz network availability',
      'Device offline: Verify router firewall settings',
      'Pairing timeout: Reset device and try again'
    ],
    supportedDevices: ['Smart Switches', 'Smart Plugs', 'Temperature Sensors', 'Door Sensors']
  },
  'amazon_alexa': {
    name: 'Amazon Alexa',
    protocols: ['wifi6', 'zigbee3', 'bluetooth_le'],
    setupGuide: [
      '1. Download Amazon Alexa app',
      '2. Set up Echo device with WiFi',
      '3. Enable device skills in Alexa app',
      '4. Discover devices by saying "Alexa, discover devices"',
      '5. Control devices via voice or app'
    ],
    commonIssues: [
      'Device not discovered: Check device compatibility and network',
      'Voice commands not working: Verify device names and pronunciation',
      'Skill not responding: Disable and re-enable device skill'
    ],
    supportedDevices: ['Echo Speakers', 'Smart Displays', 'Fire TV', 'Ring Devices']
  },
  'google_home': {
    name: 'Google Home',
    protocols: ['wifi6', 'matter_thread', 'bluetooth_le'],
    setupGuide: [
      '1. Download Google Home app',
      '2. Set up Google Nest/Home device',
      '3. Link device accounts in Google Home app',
      '4. Assign devices to rooms',
      '5. Create routines and automations'
    ],
    commonIssues: [
      'Account linking failed: Check device manufacturer app login',
      'Commands not recognized: Use exact device names',
      'Routines not triggering: Verify trigger conditions and timing'
    ],
    supportedDevices: ['Nest Speakers', 'Nest Displays', 'Nest Thermostats', 'Chromecast']
  },
  'samsung_smartthings': {
    name: 'Samsung SmartThings',
    protocols: ['zigbee3', 'zwave_plus', 'wifi6', 'matter_thread'],
    setupGuide: [
      '1. Download SmartThings app',
      '2. Set up SmartThings Hub (if required)',
      '3. Add devices by scanning QR codes or manual search',
      '4. Create automations and scenes',
      '5. Integrate with other platforms'
    ],
    commonIssues: [
      'Hub not connecting: Check Ethernet and power connections',
      'Device pairing failed: Ensure device is in pairing mode',
      'Automations not working: Check trigger conditions and device status'
    ],
    supportedDevices: ['SmartThings Hub', 'Galaxy Home', 'Smart TVs', 'Appliances']
  },
  'tp_link_kasa': {
    name: 'TP-Link Kasa',
    protocols: ['wifi6'],
    setupGuide: [
      '1. Download Kasa Smart app',
      '2. Create TP-Link ID account',
      '3. Plug in device and wait for WiFi indicator',
      '4. Add device in app and connect to WiFi',
      '5. Set up schedules and remote access'
    ],
    commonIssues: [
      'WiFi setup failed: Use 2.4GHz network only',
      'Remote access not working: Check router UPnP settings',
      'Device keeps disconnecting: Improve WiFi signal strength'
    ],
    supportedDevices: ['Smart Plugs', 'Smart Switches', 'Smart Bulbs', 'Security Cameras']
  },
  'xiaomi_mi': {
    name: 'Xiaomi Mi',
    protocols: ['zigbee3', 'wifi6', 'bluetooth_le'],
    setupGuide: [
      '1. Download Mi Home app',
      '2. Set up Mi Hub (for Zigbee devices)',
      '3. Add devices by scanning or manual addition',
      '4. Configure automation scenes',
      '5. Enable cloud connectivity for remote access'
    ],
    commonIssues: [
      'Server region issues: Select correct server region in app',
      'Hub not found: Reset hub and check network connection',
      'Automation delays: Check internet connection stability'
    ],
    supportedDevices: ['Mi Hub', 'Smart Sensors', 'Smart Cameras', 'Robot Vacuums']
  }
};

// Device Setup Instructions by Category
export const DEVICE_CATEGORIES = {
  lighting: {
    name: 'Smart Lighting',
    commonProtocols: ['zigbee3', 'wifi6', 'bluetooth_le'],
    setupTips: [
      'Start with a hub-based system for better reliability',
      'Place hub centrally for optimal mesh coverage',
      'Update firmware regularly for security and features',
      'Use descriptive names for voice control'
    ],
    troubleshooting: [
      'Flickering lights: Check dimmer compatibility',
      'Slow response: Improve mesh network coverage',
      'Color accuracy issues: Calibrate in manufacturer app'
    ]
  },
  security: {
    name: 'Security Systems',
    commonProtocols: ['zwave_plus', 'wifi6', 'matter_thread'],
    setupTips: [
      'Install security devices first for immediate protection',
      'Use battery backup for critical sensors',
      'Test all sensors monthly',
      'Set up multiple notification methods'
    ],
    troubleshooting: [
      'False alarms: Adjust sensor sensitivity',
      'Missed notifications: Check app permissions',
      'Battery drain: Optimize sensor placement'
    ]
  },
  climate: {
    name: 'Climate Control',
    commonProtocols: ['wifi6', 'matter_thread', 'zwave_plus'],
    setupTips: [
      'Install smart thermostats with C-wire for reliability',
      'Use temperature sensors in multiple rooms',
      'Set up geofencing for automatic adjustments',
      'Create schedules based on occupancy'
    ],
    troubleshooting: [
      'Thermostat not heating/cooling: Check HVAC compatibility',
      'Temperature inaccuracies: Calibrate sensors',
      'High energy bills: Review automation schedules'
    ]
  },
  appliances: {
    name: 'Smart Appliances',
    commonProtocols: ['wifi6', 'matter_thread'],
    setupTips: [
      'Connect appliances to dedicated IoT network',
      'Enable automatic software updates',
      'Set up maintenance reminders',
      'Use energy monitoring features'
    ],
    troubleshooting: [
      'Appliance offline: Check WiFi signal strength',
      'App crashes: Clear cache and update app',
      'Features not working: Verify subscription status'
    ]
  }
};

// Network Configuration Recommendations
export const NETWORK_RECOMMENDATIONS = {
  router_settings: {
    '2.4GHz': {
      channel: 'Auto (avoid 1, 6, 11 if congested)',
      bandwidth: '20MHz for compatibility',
      security: 'WPA3 (WPA2 if not supported)'
    },
    '5GHz': {
      channel: 'Auto (DFS channels for less congestion)',
      bandwidth: '80MHz for performance',
      security: 'WPA3'
    }
  },
  iot_network: {
    setup: [
      'Create separate 2.4GHz network for IoT devices',
      'Use VLAN isolation for security',
      'Limit bandwidth if needed',
      'Enable guest network isolation'
    ],
    security: [
      'Change default router passwords',
      'Disable WPS',
      'Enable firewall',
      'Regular firmware updates'
    ]
  }
};

/**
 * Get setup instructions for a specific device brand
 */
export function getDeviceSetupInstructions(brand: string): DeviceBrand | null {
  const brandKey = brand.toLowerCase().replace(/\s+/g, '_');
  return DEVICE_BRANDS[brandKey] || null;
}

/**
 * Get protocol information
 */
export function getProtocolInfo(protocol: string): DeviceProtocol | null {
  return PROTOCOLS[protocol] || null;
}

/**
 * Get recommended protocols for device category
 */
export function getRecommendedProtocols(category: string): string[] {
  const categoryInfo = DEVICE_CATEGORIES[category as keyof typeof DEVICE_CATEGORIES];
  return categoryInfo?.commonProtocols || [];
}

/**
 * Generate device-specific setup guide
 */
export function generateSetupGuide(deviceName: string, brand: string, category: string): string[] {
  const brandInfo = getDeviceSetupInstructions(brand);
  const categoryInfo = DEVICE_CATEGORIES[category as keyof typeof DEVICE_CATEGORIES];
  
  const guide = [
    `Setting up ${deviceName}:`,
    '',
    '📱 App Setup:'
  ];
  
  if (brandInfo) {
    guide.push(...brandInfo.setupGuide.map(step => `  ${step}`));
  }
  
  guide.push('', '💡 Category-specific tips:');
  if (categoryInfo) {
    guide.push(...categoryInfo.setupTips.map(tip => `  • ${tip}`));
  }
  
  guide.push('', '🔧 Troubleshooting:');
  if (brandInfo) {
    guide.push(...brandInfo.commonIssues.map(issue => `  • ${issue}`));
  }
  
  return guide;
}