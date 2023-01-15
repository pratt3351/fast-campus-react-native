const IS_DEV = process.env.APP_VARIANT !== 'production';

export default {
  "expo": {
    "name": IS_DEV ? "anstagram-dev": "anstagram",
    "slug": "anstagram",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/66f8c4bb-70b3-4f63-b8a9-c0ece3c38cae"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "googleServicesFile": IS_DEV ? "./GoogleService-dev-Info.plist": "./GoogleService-Info.plist",
      "bundleIdentifier": IS_DEV ? "com.anstagram.dev" : "com.anstagram"
    },
    "android": {
      "googleServicesFile":IS_DEV ? "./google-services-dev.json": "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": [
        "android.permission.RECORD_AUDIO"
      ],
      "package": IS_DEV ? "com.anstagram.dev": "com.anstagram"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/crashlytics",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "66f8c4bb-70b3-4f63-b8a9-c0ece3c38cae"
      }
    },
    "runtimeVersion": "1.0.0"
  }
}
