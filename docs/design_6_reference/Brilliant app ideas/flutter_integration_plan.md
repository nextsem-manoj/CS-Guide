# Flutter Integration Plan (Option 1: Native WebView Shell)

This document outlines the step-by-step plan to replace the current Capacitor shell with a native Flutter wrapper that renders the Next.js app via an high-performance interactive webview.

---

## 🚀 Why Option 1?
By wrapping the Next.js static output (or live staging/production app) in a Flutter native shell using `flutter_inappwebview`, we get:
1. **Finer Control**: Better control over webview cache, cookies, headers, and user-agent string.
2. **Native Performance**: Native components (such as native alert dialogs, splash screens, and navigation overlays) run with 60/120fps fluid performance.
3. **Extensibility**: Easy addition of native features (mascot animations, local storage integration, push notifications, and background processes) in Dart/Flutter later.

---

## 🛠️ Step-by-Step Installation Guide (⊞ Windows)

Since the `flutter` command was not found in the PATH, follow these steps to install the Flutter SDK on your 🪟 Windows 11 / Windows machine:

### Step 1: Install Flutter SDK via Winget (Recommended & Easiest)
Open a standard Windows Terminal / PowerShell (as Administrator) and run:
```powershell
winget install Flutter.Flutter
```
*Note: After running this, restart your terminal or IDE (VS Code / Gemini) to refresh the environment variables.*

#### Alternative: Manual Installation
1. Download the latest stable Flutter Windows SDK zip file:
   [Flutter SDK Download](https://docs.flutter.dev/get-started/install/windows/desktop)
2. Extract the zip file and place the `flutter` folder in a simple path (e.g., `C:\flutter` or `C:\src\flutter`).
3. Add the bin folder to your User Path Environment Variables:
   - Search for **"env"** in the Windows Start menu and select **"Edit environment variables for your account"**.
   - Under User Variables, select **Path** and click **Edit**.
   - Click **New** and add the full path to `flutter\bin` (e.g., `C:\flutter\bin` or `C:\src\flutter\bin`).
   - Click **OK** to save and close.

---

### Step 2: Verify the Installation
Open a new PowerShell terminal and run:
```powershell
flutter doctor
```
This command checks your environment and displays a report of the status of your Flutter installation, including the Android SDK, Android Studio, Chrome, VS Code, and connected devices.

---

### Step 3: Install Android SDK & Android Studio
1. Download and install [Android Studio](https://developer.android.com/studio).
2. Open Android Studio, go to **Tools > SDK Manager**, and under the **SDK Tools** tab, verify that **Android SDK Command-line Tools (latest)** is checked. Click **Apply** to install.
3. Accept the Android Licenses by running the following command in PowerShell:
   ```powershell
   flutter doctor --android-licenses
   ```
   Press `y` to accept each license.

---

## 📱 Implementation Details for replacing Capacitor

Once the environment is ready, we will carry out the following changes:

### 1. Create the Flutter Mobile Wrapper
At the root of the project (`c:\jbrs-landing-page`), run:
```powershell
flutter create --org online.nextsem --project-name nextsem_mobile mobile
```
This creates a new Flutter project inside a `mobile/` subfolder.

### 2. Configure `flutter_inappwebview`
In `mobile/pubspec.yaml`, add:
```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_inappwebview: ^6.1.0
  google_sign_in: ^6.2.1
  google_mobile_ads: ^5.1.0
```

### 3. Implement the Webview Shell (`mobile/lib/main.dart`)
We will configure `InAppWebView` to:
- Render the Next.js app (either from local assets or loading `https://nextsem-staging.web.app`).
- Set a custom User Agent or inject a Javascript Handler so Next.js knows it's running inside the app:
  ```dart
  // In Dart
  controller.addJavaScriptHandler(handlerName: 'getPlatform', callback: (args) {
    return 'native-app';
  });
  ```

### 4. Bridge Javascript and Dart (Firebase Auth & AdMob)
- **Firebase Google Authentication**: Instead of Capacitor Google Auth, we'll trigger native Google Sign-in in Dart and pass the tokens back to Next.js.
- **Google AdMob**: Flutter will listen for web requests to display native banner/interstitial ads instead of using web AdSense.

---

## 📋 Task Checklist
- [ ] Install Flutter SDK & update Path.
- [ ] Run `flutter doctor` and verify Android tools.
- [ ] Create Flutter project under `c:\jbrs-landing-page\mobile`.
- [ ] Build the Next.js static assets using `npm run build` (`out/`).
- [ ] Implement the `InAppWebView` container.
- [ ] Test local offline loading and remote hosting synchronization.
