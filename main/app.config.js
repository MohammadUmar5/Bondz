export default {
  expo: {
    name: "Bondz",
    slug: "bondz",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logos/app_icon.png",
    scheme: "bondz",
    deepLinking: true,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.bondz",
    },

    android: {
      package: "com.bondz",
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.bondz",
      adaptiveIcon: {
        foregroundImage: "./assets/logos/app_icon.png",
        backgroundColor: "#000",
      },
      splash: {
        image: "./assets/logos/splash_icon.gif",
        resizeMode: "contain",
        backgroundColor: "#000",
      },
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/logos/app_icon.png",
    },

    plugins: ["expo-router"],

    experiments: {
      typedRoutes: true,
    },

    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      eas: {
        // projectId: "d6ae379e-0d7e-451e-8789-f8c2b406a643",
        projectId: "c02cb612-a557-47d5-9a78-816a4a87740a",
      },
    },
  },
};
