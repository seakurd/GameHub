# راهنمای تفصیلی ساخت APK 📱

## گام‌های کامل ساخت APK برای GameHub

### مرحله 1️⃣: نصب نرم‌افزارهای لازم

#### Windows 10/11:
```bash
# 1. Node.js را از https://nodejs.org دانلود و نصب کنید (LTS)
# بعد از نصب:
node --version
npm --version

# 2. Java JDK 11+ را نصب کنید
# https://www.oracle.com/java/technologies/downloads/
java -version

# 3. Android Studio را نصب کنید
# https://developer.android.com/studio
# و SDK را نصب کنید

# 4. متغیرهای محیطی را تنظیم کنید:
# ANDROID_HOME = C:\Users\[YourUser]\AppData\Local\Android\Sdk
# JAVA_HOME = C:\Program Files\Java\jdk-11.0.x

# 5. Cordova را نصب کنید
npm install -g cordova
cordova --version
```

#### macOS:
```bash
# با Homebrew
brew install node
brew install java
brew install android-sdk

# یا دستی از:
# https://nodejs.org
# https://www.oracle.com/java
# https://developer.android.com/studio

npm install -g cordova
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install nodejs npm openjdk-11-jdk

# Android SDK
sudo apt-get install android-sdk

npm install -g cordova
```

---

### مرحله 2️⃣: آماده‌سازی پروژه

```bash
# این مخزن را کلون کنید
git clone https://github.com/seakurd/GameHub.git
cd GameHub

# وابستگی‌های npm را نصب کنید
npm install
```

---

### مرحله 3️⃣: اضافه کردن پلتفرم Android

```bash
# اگر قبلاً اضافه نشده است
cordova platform add android

# تایید کنید
cordova platform list
```

---

### مرحله 4️⃣: ساخت APK

#### گزینه A: ساخت Debug (برای تست)
```bash
cordova build android
```

**فایل APK نهایی:**
```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

#### گزینه B: ساخت Release (برای انتشار)

**ابتدا کلید امضاء بسازید:**
```bash
# Windows
keytool -genkey -v -keystore gamehub-key.keystore ^^
  -keyalg RSA -keysize 2048 -validity 10000 ^^
  -alias gamehub-alias

# macOS/Linux
keytool -genkey -v -keystore gamehub-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias gamehub-alias
```

**سپس APK Release را بسازید:**
```bash
cordova build android --release -- --keystore=gamehub-key.keystore --storePassword=YOUR_PASSWORD --alias=gamehub-alias --password=YOUR_PASSWORD
```

**فایل APK نهایی:**
```
platforms/android/app/build/outputs/apk/release/app-release.apk
```

---

### مرحله 5️⃣: اجرا و تست

#### روی شبیه‌ساز (Emulator):
```bash
# شبیه‌ساز را از Android Studio راه‌اندازی کنید
# سپس:
cordova run android
```

#### روی گوشی فیزیکی:
```bash
# USB را متصل کنید
# USB Debugging را فعال کنید
cordova run android

# یا APK را مستقیماً نصب کنید:
adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## حل مشکلات عام 🔧

### ❌ `cordova: command not found`
```bash
npm install -g cordova
```

### ❌ `ANDROID_HOME is not set`

**Windows:**
- `Win + X` → `System` → `Advanced system settings`
- `Environment Variables` → `New`
- Variable name: `ANDROID_HOME`
- Variable value: `C:\Users\[YourUser]\AppData\Local\Android\Sdk`

**macOS/Linux:**
```bash
echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.bashrc
source ~/.bashrc
```

### ❌ `No Android platforms found`
```bash
cordova platform add android@latest
```

### ❌ Gradle خطا
```bash
# حذف و بازسازی
rm -rf platforms/android
cordova platform add android
cordova build android
```

### ❌ Java version mismatch
```bash
# نسخه Java را بررسی کنید
java -version

# JDK 11 یا بالاتر نصب کنید
# https://www.oracle.com/java/technologies/downloads/
```

---

## خصوصی‌سازی APK 🎨

### تغییر نام اپ:
`config.xml` را باز کنید و تغییر دهید:
```xml
<name>نام جدید اپ</name>
```

### تغییر آیکون:
1. تصویر 192x192 پیکسل بسازید
2. در `res/icon/android/` کپی کنید
3. `config.xml` را بروز رسانی کنید

### تغییر Splash Screen:
تصویر 1280x720 بسازید و در `res/screen/android/` کپی کنید

---

## توزیع APK 📤

### Google Play Store:
1. حساب Google Play Developer بسازید ($25 یکبار)
2. APK Release امضا شده آپلود کنید
3. متادیتا (توضیحات، تصاویر) را کامل کنید
4. منتشر کنید

### توزیع مستقل:
1. APK را به وب‌سایت آپلود کنید
2. لینک دانلود را به اشتراک بگذارید
3. یا QR Code بسازید

---

## بهینه‌سازی 🚀

### کاهش حجم APK:
```bash
# ProGuard/R8 برای minification
cordova build android --release -- --minifyResources
```

### بهبود عملکرد:
- تمام فایل‌های غیر ضروری را حذف کنید
- CSS و JS را minify کنید
- تصاویر را optimize کنید (PNG Crush, ImageOptim)

---

## نکات مهم ⚠️

- ✅ همیشه Debug APK را تست کنید قبل از Release
- ✅ متن `BUILD_INSTRUCTIONS.md` را برای مستندات نگه دارید
- ✅ کلید امضاء (`gamehub-key.keystore`) را ایمن نگه دارید
- ✅ نسخه کد را بروز رسانی کنید قبل از هر Release جدید
- ✅ تست بر روی دستگاه‌های مختلف انجام دهید

---

**اگر مشکل پیدا کردید:**
- [GitHub Issues را باز کنید](https://github.com/seakurd/GameHub/issues)
- [Cordova Docs](https://cordova.apache.org/docs/en/latest/)
- [Android Developers](https://developer.android.com/)
