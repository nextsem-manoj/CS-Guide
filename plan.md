# Flutter + Firebase Integration Plan (`ignou.nextsem.online`)

Based on the screenshot from your Firebase Console, here is the complete step-by-step guide and workflow to initialize a **Flutter application** with **Firebase (FlutterFire)**.

---

## 📋 Step 1: Install & Verify Prerequisites

1. **Firebase CLI:**
   Check if Firebase CLI is installed and log in:
   ```bash
   firebase login
   ```
2. **FlutterFire CLI:**
   Install the FlutterFire CLI globally:
   ```bash
   dart pub global activate flutterfire_cli
   ```

---

## 🚀 Step 2: Create Flutter Project

Create your Flutter application in the workspace:
```bash
flutter create ignou_nextsem_app
```

---

## ⚡ Step 3: Configure Firebase with FlutterFire

Navigate to your Flutter project directory and run automatic configuration:
```bash
cd ignou_nextsem_app
flutterfire configure
```
*(This automatically registers your Android/iOS/Web app in Firebase and generates `lib/firebase_options.dart`)*

---

## 📦 Step 4: Add Firebase Dependencies

In `pubspec.yaml` of the Flutter project, add core Firebase packages:
```yaml
dependencies:
  flutter:
    sdk: flutter
  firebase_core: ^3.0.0
  cloud_firestore: ^5.0.0
  firebase_auth: ^5.0.0
```
Then run:
```bash
flutter pub get
```

---

## 🔑 Step 5: Initialize Firebase in `lib/main.dart`

```dart
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'IGNOU Nextsem Online',
      theme: ThemeData.dark(),
      home: Scaffold(
        appBar: AppBar(title: const Text('IGNOU Nextsem')),
        body: const Center(child: Text('Firebase Connected Successfully!')),
      ),
    );
  }
}
```

---

## ❓ Next Action
Would you like me to:
1. Run `flutter create` right now to generate the Flutter app structure in this folder?
2. Run the `firebase login` and `flutterfire configure` command for your project?