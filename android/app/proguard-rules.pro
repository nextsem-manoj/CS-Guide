# ProGuard / R8 Optimization Rules for Nextsem CSguide
# Keeps release APK/AAB size under 20MB while protecting Flutter & Android dependencies

# Code optimization and shrinking
-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-verbose

# Flutter & Core Engine
-keep class io.flutter.** { *; }
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.** { *; }
-keep class io.flutter.util.** { *; }
-keep class io.flutter.view.** { *; }
-keep class io.flutter.embedding.** { *; }

# Capacitor (if hybrid components used)
-keep class com.getcapacitor.** { *; }

# Firebase & Google Play Services
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keep public class * extends java.lang.Exception
-dontwarn com.google.android.gms.**
-keep class com.google.android.gms.** { *; }
-keep class com.google.firebase.** { *; }

# Google AdMob
-keep class com.google.android.gms.ads.** { *; }
-dontwarn com.google.android.gms.ads.**

# JSON Serialization & Models
-keepattributes Signature
-keepattributes EnclosingMethod

# Google Play Core (Flutter deferred components)
-dontwarn com.google.android.play.core.**

