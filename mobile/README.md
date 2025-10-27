# Mobile React Native Frontend
### Emulation Terminal Commands (Dev)
1. Start dev server  
2. Start Emulator from Android Studio SDK  
3. Launch app  
4. Refresh app by pressing `r` in dev server terminal

|Command|Purpose|
|---|---| 
|`pnpm start`|Start dev server|
|`emulator -list-avds`|List available emulators|
|`emulator -avd Medium_Phone`|Start Medium_Phone emulator|
|`emulator -avd Pixel_9a`|Start Pixel_9a emulator|
|`adb shell am start -n com.frontend/.MainActivity`|Launch React Native app on emulator|
