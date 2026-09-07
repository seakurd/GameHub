# GameHub Development Setup Guide

**پروژه GameHub - راهنمای نصب و راه‌اندازی حرفه‌ای**

## 🚀 نصب سریع (5 دقیقه)

### الف. پیش‌نیازها

#### Windows 10/11:
```bash
# 1. Node.js (LTS)
# دانلود از https://nodejs.org
node --version  # v18+ توصیه می‌شود

# 2. Java JDK 11+
# دانلود از https://www.oracle.com/java/technologies/downloads/
java -version

# 3. Android Studio + SDK
# دانلود از https://developer.android.com/studio
# در هنگام نصب SDK را انتخاب کنید

# 4. متغیرهای محیطی را تنظیم کنید:
# ANDROID_HOME = C:\Users\[YourUser]\AppData\Local\Android\Sdk
# JAVA_HOME = C:\Program Files\Java\jdk-11.x
```

#### macOS:
```bash
# با Homebrew
brew install node@18
brew install openjdk@11
brew install --cask android-studio

# یا دستی از وب‌سایت‌های رسمی
```

#### Linux (Ubuntu 20.04+):
```bash
sudo apt-get update
sudo apt-get install -y nodejs npm openjdk-11-jdk
sudo snap install android-studio --classic
```

### ب. نصب پروژه

```bash
# 1. کلون کردن مخزن
git clone https://github.com/seakurd/GameHub.git
cd GameHub

# 2. نصب وابستگی‌ها
npm install

# 3. راه‌اندازی Cordova
npm run setup
```

---

## 🔨 دستورات مهم

```bash
# ساخت APK Debug (برای تست)
npm run build:android:debug

# ساخت APK Release (برای انتشار)
npm run build:android:release

# اجرا روی شبیه‌ساز
npm run emulate

# اجرا روی گوشی (USB متصل)
npm run dev

# تمیز کردن فایل‌های build
npm run clean

# تنظیم مجدد پروژه
npm run setup
```

---

## 🎯 ساخت APK مرحله به مرحله

### مرحله 1: بررسی نصب
```bash
node --version      # v18.0.0+
npm --version       # 9.0.0+
java -version       # openjdk 11+
cordova --version   # 12.0.0+
```

اگر ابزار نصب نشد:
```bash
npm install -g cordova
```

---

### مرحله 2: ساخت Debug APK (سریع‌ترین روش)

```bash
# هر یک از این دستورات به طور مستقل کار می‌کند:
npm run build:android:debug

# یا:
cordova build android

# APK را در این مسیر بیابید:
# platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

⏱️ زمان: 2-5 دقیقه (بار اول بیشتر)

---

### مرحله 3: ساخت Release APK (برای انتشار)

#### 3.1 ایجاد کلید امضا (یک بار)
```bash
# Windows:
keytool -genkey -v -keystore gamehub-key.keystore ^
  -keyalg RSA -keysize 2048 -validity 10000 ^
  -alias gamehub-alias

# macOS/Linux:
keytool -genkey -v -keystore gamehub-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias gamehub-alias

# اطلاعات را وارد کنید:
# - رمز عبور keystore: [رمزی قوی]
# - نام و نام خانوادگی: GameHub
# - نام سازمان: Your Company
# - شهر/منطقه: Tehran
# - استان: TH
# - کشور: IR (کد دو حرفی)
# - رمز عبور کلید: [همان رمز keystore]
```

#### 3.2 ساخت APK Release
```bash
npm run build:android:release -- --keystore=gamehub-key.keystore ^
  --storePassword=YOUR_PASSWORD ^
  --alias=gamehub-alias ^
  --password=YOUR_PASSWORD

# یا:
cordova build android --release -- --keystore=gamehub-key.keystore \
  --storePassword=YOUR_PASSWORD \
  --alias=gamehub-alias \
  --password=YOUR_PASSWORD
```

APK نهایی:
```
platforms/android/app/build/outputs/apk/release/app-release.apk
```

---

## ✅ تست روی دستگاه

### گزینه 1: شبیه‌ساز (Emulator)

```bash
# از Android Studio شبیه‌ساز را راه‌اندازی کنید
# سپس:
npm run run:android:emulator
```

### گزینه 2: گوشی واقعی

```bash
# USB را متصل کنید
# USB Debugging را فعال کنید:
# Settings → Developer Options → USB Debugging

npm run dev

# یا APK را مستقیم نصب کنید:
adb install platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🐛 حل مشکلات عام

### خطای: `cordova not found`
```bash
npm install -g cordova@12
which cordova  # یا where cordova (Windows)
```

### خطای: `ANDROID_HOME is not set`

**Windows (Cmd/PowerShell):**
```batch
setx ANDROID_HOME "C:\Users\YourUser\AppData\Local\Android\Sdk"
setx JAVA_HOME "C:\Program Files\Java\jdk-11.x"
:: بسته بندی و دوباره باز کنید
```

**macOS/Linux (Bash/Zsh):**
```bash
echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.bashrc
echo 'export JAVA_HOME=/usr/libexec/java_home' >> ~/.bashrc
source ~/.bashrc
```

### خطای: `Failed to find Build Tools`
```bash
# SDK Manager را باز کنید (Android Studio)
# Tools → SDK Manager
# "Build Tools" بخش میں جدیدترین ورژن تحميل کریں (مثل 34.0.0)
```

### خطای: Gradle sync failed
```bash
npm run clean
npm run setup
npm run build:android:debug
```

### خطای: `Execution failed for task ':app:compileDebugJavaWithJavac'`
```bash
# Java ورژن را چک کنید:
java -version  # باید 11 یا بالاتر باشد

# اگر Java 8 است:
export JAVA_HOME=/path/to/jdk11
# یا متغیر محیطی را تغیر دهید
```

---

## 📦 ساختار پروژه

```
GameHub/
├── www/                          # منبع وب
│   ├── index.html               # صفحه اصلی
│   ├── css/index.css            # استایل‌ها
│   └── js/index.js              # اسکریپت‌های Cordova
├── config.xml                   # تنظیمات Cordova
├── package.json                 # وابستگی‌ها
├── build.gradle                 # تنظیمات Gradle
├── platforms/android/           # کد Android توليد شده
├── plugins/                     # پلاگین‌های Cordova
├── BUILD_INSTRUCTIONS.md        # راهنمای تفصیلی
├── SETUP.md                     # این فایل
└── .github/workflows/           # اتوماسیون CI/CD
```

---

## 🔒 ایمنی

- **کلید امضا (`gamehub-key.keystore`)** را در جای امن نگه دارید
- این فایل را در مخزن commit نکنید (`.gitignore` میں قبلاً شامل است)
- رمز عبور را یادداشت کنید (حتی یادداشت مخفی)

---

## 🎯 چک‌لیست قبل از Release

- [ ] تمام بازی‌ها روی گوشی تست شده‌اند
- [ ] `config.xml` ورژن درست است
- [ ] تصویر نماد (192x192) درست است
- [ ] Splash screen تنظیم شده است
- [ ] Release APK ساخته شده است
- [ ] APK با `jarsigner` امضا شده است
- [ ] تمام مستندات بروز رسانی شده‌اند

---

## 🚀 انتشار در Google Play Store

1. حساب Google Play Developer ایجاد کنید ($25 یک بار)
2. Release APK را آپلود کنید
3. متادیتا پر کنید (تصویر، توضیحات، رتبه‌بندی)
4. منتشر کنید

---

## 📞 کمک و پشتیبانی

- [GitHub Issues](https://github.com/seakurd/GameHub/issues)
- [Cordova Docs](https://cordova.apache.org/docs/en/latest/)
- [Android Developers](https://developer.android.com/)

---

**نسخه:** 1.0.0  
**آخرین بروز رسانی:** سپتامبر 2024
