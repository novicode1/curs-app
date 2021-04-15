# Getting started 

Make sure environment is configured as per the manual at React Native "Getting started" (React Native CLI setup)
https://reactnative.dev/docs/environment-setup

Checked the app working on:
- xCode v11
- NodeJS v12
- React Native v0.

# Running the app on Android:

- Connect Android device
- Make sure all pre-requisite for Android development is installed and debugging is enabled on Android device
- Check that device is available for development by running "adb devices"
- Run "react-native run-android"

# Running the app on iOS

- Install xCode v11
- Run "npm install" 
- Go to ios folder and run "pod install"
- Run "npm run ios"

# FAQs

- Getting "EMFILE: too many files open" error when building the bundle
- Make sure that "watchman" is installed as per the getting started instructions

- The operation couldn’t be completed. Unable to log in with account
- Make sure that Apple account is configured correctly in the xCode Preferences -> Accounts page

- App is building, but images are not loading on startup
- Its likely that you are using xCode version >=12. Unfortunately version should be downgraded down to v11

