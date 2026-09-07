# 🎮 GameHub - سوپر اپ بازی

اپلیکیشن موبایل بازی‌های رقابتی آفلاین/آزمایشی

**Offline/Demo Competitive Games Super App**

## بازی‌های موجود 🎲

- 🎲 **تخته‌نرد** (Backgammon)
- 🂡 **بلک‌جک / ۲۱** (Blackjack)
- 🃏 **حکم** (Hokm)
- ♠️ **پوکر** (Poker - Texas Hold'em)
- ♟️ **شطرنج** (Chess)
- 🟣 **منچ** (Ludo)
- 🁫 **دومینو** (Domino)

## نیازمندی‌ها 📦

### برای بیلد APK:
- **Node.js** (v14+)
- **Android SDK**
- **Java Development Kit (JDK)** 11+
- **Cordova CLI**

### نصب ابزارها:

```bash
# نصب Cordova CLI
npm install -g cordova

# نصب Maven (اختیاری)
npm install -g android-sdk
```

## راه‌اندازی پروژه 🚀

### 1. کلون کردن مخزن
```bash
git clone https://github.com/seakurd/GameHub.git
cd GameHub
```

### 2. نصب وابستگی‌ها
```bash
npm install
```

### 3. آماده‌سازی Android
```bash
cordova platform add android
```

### 4. بیلد APK

#### برای حالت Debug (تست):
```bash
cordova build android
```
فایل APK در `platforms/android/app/build/outputs/apk/debug/` تولید می‌شود.

#### برای حالت Release (برای انتشار):
```bash
cordova build android --release
```

### 5. اجرا روی دستگاه
```bash
# بروی شبیه‌ساز
cordova emulate android

# بروی دستگاه فیزیکی (USB متصل)
cordova run android
```

## ساختار پروژه 📁

```
GameHub/
├── www/
│   ├── index.html          # صفحه اصلی اپ
│   ├── css/
│   │   └── index.css       # استایل‌ها
│   └── js/
│       └── index.js        # اسکریپت‌های Cordova
├── platforms/              # پلتفرم‌های تولید شده (Android, iOS)
├── plugins/                # پلاگین‌های Cordova
├── config.xml              # تنظیمات اپلیکیشن
├── package.json            # وابستگی‌های npm
└── README.md               # این فایل
```

## تنظیمات Cordova 🔧

### تغییر نسخه اپ:
به `config.xml` بروید و `version` را تغییر دهید:
```xml
<widget id="com.gamehub.app" version="1.0.1" ...>
```

### تغییر پکیج ID:
```xml
<widget id="com.yourcompany.gamehub" ...>
```

## مشکلات رایج ❌

### `cordova not found`
```bash
npm install -g cordova
```

### خطا در Android SDK
مطمئن شوید متغیرهای محیطی تنظیم شده‌اند:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### حجم فایل APK بزرگ است
امری طبیعی است. برای کاهش:
```bash
cordova build android --release -- --minifyResources
```

## ویژگی‌های توسعه 🛠️

- ✅ صفحه‌بندی مختلف (خانه، بازی‌ها، کیف پول، پروفایل)
- ✅ سیستم سکه‌های مجازی
- ✅ ذخیره اطلاعات در `localStorage`
- ✅ رابط کاربری فارسی
- ✅ دایناسناس (مطابقت با موبایل)
- ✅ حالت شب (Dark Mode)

## اپ‌های آینده 🚀

- [ ] سیستم آنلاین Multiplayer
- [ ] سیستم رتبه‌بندی
- [ ] انتقال موجودی بین کاربران
- [ ] تاریخچه بازی‌ها
- [ ] اشتراک‌گذاری نتایج
- [ ] پوش نوتیفیکیشن‌ها
- [ ] وب‌سوکت برای بازی‌های Real-time

## لایسنس 📄

MIT License - برای استفاده آزاد

## تماس 📧

سؤالات و پیشنهادات: [ایشو‌ها را باز کنید](https://github.com/seakurd/GameHub/issues)

---

**نسخه:** 1.0.0  
**آخرین بروز رسانی:** سپتامبر 2024
