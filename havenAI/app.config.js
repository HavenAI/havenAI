import 'dotenv/config';

export default {
  expo: {
    name: "havenAI",
    slug: "havenAI",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "havenai",
    platforms: ["ios", "android", "web"],
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.pm.havenAI",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      package: "com.pm.havenAI",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: ["expo-font"],
    extra: {
      eas: {
        projectId: "bcf0ab65-b99f-490f-9629-b5a467999ac1"
      },
      backendUrl: "https://haven-backend-kjdf.onrender.com/"
    },
    runtimeVersion: "1.0.0",
    updates: {
      url: "https://u.expo.dev/bcf0ab65-b99f-490f-9629-b5a467999ac1"
    }
  }
};
