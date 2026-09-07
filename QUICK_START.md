# 🚀 سریع‌ترین شروع - GameHub

## ✅ APK خودکار ساخته می‌شود!

### دیدن APK ساخته شده:

1. به [Releases](https://github.com/seakurd/GameHub/releases) برو
2. بزرگ‌ترین Release را انتخاب کن
3. **app-debug.apk** یا **app-release.apk** را دانلود کن

---

## 📲 روی گوشی نصب کن

### روش 1: مستقیم (ساده‌ترین)
```bash
# APK را از دانلود‌ها باز کن
# برای نصب روی گوشی دوبار ضربه بزن
```

### روش 2: دستور (اگر ADB داری)
```bash
adb install app-debug.apk
```

---

## 🔄 APK خودکار بررسی‌سازی

هر بار که commit به `main` بشود:
- ✅ APK خودکار ساخته می‌شود
- ✅ فایل‌ها Artifacts میں ذخیره می‌شوند
- ✅ می‌تونی دانلود کنی

---

## 🎮 اگر خودت می‌خوای ساخت کنی

```bash
git clone https://github.com/seakurd/GameHub.git
cd GameHub
npm install
npm run setup
npm run build:android:debug
```

**فایل نهایی:**
```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📊 Build Status

![Build APK](https://github.com/seakurd/GameHub/actions/workflows/build-apk.yml/badge.svg)

---

**سوال؟** [Issues را باز کن](https://github.com/seakurd/GameHub/issues) 💬
