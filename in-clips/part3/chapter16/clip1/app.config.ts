const IS_PRODUCTION = process.env.APP_VARIANT ==='production';

export default{
  "expo": {
    "name": IS_PRODUCTION ? "anstagram":"anstagram-dev",
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
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "googleServicesFile": IS_PRODUCTION ? "./GoogleService-Info.plist":"./GoogleService-Debug-Info.plist",
      "bundleIdentifier": IS_PRODUCTION ? "com.my.anstagram" : "com.my.anstagram.debug"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "googleServicesFile": IS_PRODUCTION ? "./google-services.json" : "./google-services-debug.json",
      "permissions": [
        "android.permission.RECORD_AUDIO"
      ],
      "package": IS_PRODUCTION ? "com.anstagram":"com.anstagram.dev"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/crashlytics",
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "25d04421-0bea-421d-bb94-900332b1337c"
      }
    }
  }
}
