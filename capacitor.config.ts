
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6ec405f34eee4f72af447dc6069909f9',
  appName: 'vape-free-health-tracker',
  webDir: 'dist',
  server: {
    url: "https://6ec405f3-4eee-4f72-af44-7dc6069909f9.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6",
      showSpinner: false
    }
  }
};

export default config;
