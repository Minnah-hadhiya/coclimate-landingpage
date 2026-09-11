/**
 * Shared constants for Co-Climate landing page
 */

// Mock data for visualization
export const MOCK_SITES = [
  { lat: 4.2, lon: 73.5, name: 'Maldives Reef', canopy: 47, co2: 12.4, verified: 'Aug 2026' },
  { lat: -2.5, lon: 34.8, name: 'Lake Victoria Basin', canopy: 62, co2: 28.1, verified: 'Jul 2026' },
  { lat: 51.5, lon: -0.1, name: 'Thames Estuary', canopy: 31, co2: 8.7, verified: 'Sep 2026' },
  { lat: -15.8, lon: -47.9, name: 'Cerrado Corridor', canopy: 78, co2: 45.3, verified: 'Jun 2026' },
  { lat: 1.3, lon: 103.8, name: 'Singapore Mangroves', canopy: 55, co2: 19.6, verified: 'Aug 2026' },
  { lat: 35.7, lon: 139.7, name: 'Tokyo Urban Forest', canopy: 23, co2: 5.2, verified: 'Jul 2026' },
  { lat: -33.9, lon: 18.4, name: 'Cape Fynbos', canopy: 41, co2: 14.8, verified: 'May 2026' },
  { lat: 9.1, lon: 7.5, name: 'Niger Delta', canopy: 69, co2: 33.7, verified: 'Aug 2026' },
  { lat: 28.6, lon: 77.2, name: 'Delhi Green Belt', canopy: 37, co2: 11.1, verified: 'Sep 2026' },
  { lat: -22.9, lon: -43.2, name: 'Atlantic Forest', canopy: 84, co2: 52.6, verified: 'Jul 2026' },
  { lat: 13.7, lon: 100.5, name: 'Bangkok Wetlands', canopy: 44, co2: 16.3, verified: 'Jun 2026' },
  { lat: 55.8, lon: 37.6, name: 'Moscow Greenbelt', canopy: 58, co2: 22.9, verified: 'Aug 2026' },
];

export const GLOBAL_STATS = {
  sites: 2847,
  countries: 14,
  hectares: '1.2M',
  co2Sequestered: '847K',
};

export const VERIFICATION_STEPS = [
  { id: 'assigned', label: 'Work Assigned', icon: '✓', description: 'Manager creates a task with deadline and required evidence' },
  { id: 'evidence', label: 'Field Evidence', icon: '✓', description: 'Officer submits photos and GPS from the site on a phone' },
  { id: 'reviewed', label: 'Human Review', icon: '✓', description: 'A manager reads every submission and flags good, moderate or needs attention' },
  { id: 'tracked', label: 'Health Tracked', icon: '✓', description: 'Approved counts build a survival trend — not just a snapshot' },
];

// 3D Scene constants
export const TERRAIN = {
  WIDTH: 40,
  DEPTH: 40,
  SEGMENTS: 128,
  HEIGHT_SCALE: 3.5,
  NOISE_SCALE: 0.08,
};

export const PARTICLES = {
  COUNT: 3000,
  COUNT_MOBILE: 800,
  SPREAD: 20,
  SIZE: 0.03,
};

export const GLOBE = {
  RADIUS: 2.5,
  SEGMENTS: 64,
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
};
