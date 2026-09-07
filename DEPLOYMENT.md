# 🚀 GameHub Deployment & Distribution Guide

**راهنمای استقرار و توزیع اپلیکیشن**

---

## 1️⃣ Prepare Release Build

### بررسی نسخه و متادیتا
```bash
# 1. config.xml را بررسی کنید
cat config.xml | grep version

# 2. ورژن را به روز کنید (اگر لازم است)
# config.xml میں version تغیر دهید
```

### ساخت Release APK
```bash
# کلید امضا را آماده کنید
ls -la gamehub-key.keystore

# اگر کلید ندارید، ایجاد کنید:
keytool -genkey -v -keystore gamehub-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias gamehub-alias

# ساخت Release APK
npm run build:android:release -- \
  --keystore=gamehub-key.keystore \
  --storePassword=YOUR_PASSWORD \
  --alias=gamehub-alias \
  --password=YOUR_PASSWORD
```

### تحقق از اندازه APK
```bash
ls -lh platforms/android/app/build/outputs/apk/release/app-release.apk

# مثال: 5.2M app-release.apk
# اندازه معقول است
```

---

## 2️⃣ Google Play Store Deployment

### مرحله 1: حساب Google Play Developer

```
1. https://play.google.com/console پنجیکریں
2. 25 ڈالر کی رجسٹریشن فیس ادا کریں
3. حساب کو منظوری کے لیے منتظر رہیں (24-48 ساعات)
4. API کی کلیدیں ایک جگہ محفوظ رکھیں
```

### مرحले 2: اپ ملتی جلتی

```bash
# 1. Play Console میں نیا app بنائیں
# 2. بنیادی معلومات بھریں:
#    - نام: GameHub
#    - شرح: سوپر‌اپ بازی‌های رقابتی
#    - زمرہ: Games > Casual
#    - مواد کی درجہ بندی: استفہام (PEGI 3+)
```

### مرحلہ 3: APK آپ لوڈ کریں

**دستی اپ لوڈ:**
```
1. Play Console میں "Release" تک جائیں
2. "Testing" → "Internal testing" کو منتخب کریں
3. "Create new release" پر کلک کریں
4. Release APK کو منتخب کریں
5. تبدیلی کے نوٹس میں: "Initial release"
6. "Review" پر کلک کریں
7. "Start rollout to Internal testing" دبائیں
```

### مرحلہ 4: مختلف ایڈوانسڈ معلومات

```
Store Listing میں:
- ٹائٹل: 🎮 GameHub
- مختصر تفصیل: سوپر‌اپ بازی‌های رقابتی آفلاین/آزمایشی
- تفصیلی تفصیل:
  GameHub میں حکم، پوکر، شطرنج، منچ اور بہت کچھ کھیلیں۔
  آفلاین طریقے میں دوستوں کے ساتھ کھیلیں۔
  
- سکرین شاٹس (ضروری):
  * 3-5 سکرین شاٹ (1440x2560 px)
  * مختلف صفحات کے عکسیں
  
- ڈیور تصویر (512x512 px):
  * 🎮 GameHub لوگو
  
- خصوصی تصویر (1024x500 px):
  * بلند معیار کی بیک گراؤنڈ تصویر
```

### مرحله 5: Content Rating

```
1. "Content rating" میں جائیں
2. "Set up your content rating" پر کلک کریں
3. سوالنامہ مکمل کریں:
   - Age: 12+
   - Violence: None
   - Sexual content: None
   - Other concerns: None
```

### مرحلے 6: قیمت اور تقسیم

```
1. "Pricing & distribution" میں جائیں
2. "Free" منتخب کریں
3. تمام ممالک میں دستیاب کریں
4. محفوظ کریں
```

### مرحلہ 7: پابندیاں

```
1. "App access" میں جائیں
2. "This app doesn't have restricted content" منتخب کریں
3. "Ads" میں "No ads" منتخب کریں
```

### مرحلہ 8: رہائی

**Internal Testing:**
```
1. پہلے Internal Testing میں شائع کریں
2. 2-3 روز انتظار کریں
3. تصدیق کریں کہ اپ ٹھیک کام کر رہا ہے
```

**Beta Testing:**
```
1. "Open testing" کو منتخب کریں
2. تدریجی رولآؤٹ شروع کریں (5% سے شروع)
3. خرابیوں کے لیے نگرانی کریں
4. 25% → 50% → 100% میں اضافہ کریں
```

**Production Release:**
```
1. "Production" تک جائیں
2. "Create new release" پر کلک کریں
3. اسی Release APK کو منتخب کریں
4. "Release notes" شامل کریں
5. "Review" → "Start rollout to production"
```

---

## 3️⃣ فوری توزیع (سیلف ہوسٹڈ)

### APK براہ راست ڈاؤن لوڈ لنک

```bash
# 1. ویب سرور پر اپ لوڈ کریں:
scp platforms/android/app/build/outputs/apk/release/app-release.apk \
  user@your-server.com:/var/www/html/gamehub/

# 2. ڈاؤن لوڈ لنک شیئر کریں:
https://your-domain.com/gamehub/app-release.apk

# 3. QR کوڈ بنائیں:
# https://qr-server.com/api/generate?url=https://your-domain.com/gamehub/app-release.apk
```

### GitHub Releases

```bash
# 1. Release بنائیں:
git tag v1.0.0
git push origin v1.0.0

# 2. GitHub میں:
# - "Releases" تک جائیں
# - "Create a new release" دبائیں
# - app-release.apk اپ لوڈ کریں
# - وضاحت لکھیں
# - "Publish release"
```

---

## 4️⃣ دیگر اپ سٹورز

### Huawei AppGallery (چین/ایشیا)
```
1. https://developer.huawei.com/consumer/en/appgallery
2. APK اپ لوڈ کریں
3. متادیتا شامل کریں
4. منتظر رہیں (24-48 ساعات)
```

### Samsung Galaxy Store
```
1. https://seller.samsungapps.com
2. اپ رجسٹر کریں
3. APK اپ لوڈ کریں
4. منظوری کے لیے انتظار کریں
```

### F-Droid (اوپن سورس)
```
1. https://f-droid.org/submit
2. مخزن کی معلومات جمع کریں
3. APK خود بخود تیار ہوگی
4. منتظر رہیں (کچھ ہفتے)
```

---

## 5️⃣ مسئلہ نزع و حل

### اپ Play Store میں منتشر نہیں ہو رہا

```bash
# 1. Build ورژن چیک کریں
# config.xml میں android-targetSdkVersion = 34+

# 2. سب تبدیلیاں کریں
cordova platform rm android
cordova platform add android
npm run build:android:release

# 3. دوبارہ اپ لوڈ کریں
```

### "App not installed" خرابی

```bash
# 1. ڈیوائس کے لیے APK مطابقت چیک کریں
aapt dump badging platforms/android/app/build/outputs/apk/release/app-release.apk

# 2. اگر مسئلہ ہے:
# - Android API سطح کو کم کریں (config.xml میں)
# - دوبارہ ساختی تبدیلی کریں
```

### APK سائز بہت بڑا ہے

```bash
# 1. Minify کریں:
cordova build android --release -- --minifyResources

# 2. تصاویر کو سمپیڈ کریں:
# ImageMagick استعمال کریں یا آن لائن ٹول

# 3. غیر ضروری فائلیں ہٹائیں
```

---

## 6️⃣ آپ ڈیٹ اور نئے ورژن

### ورژن اپ ڈیٹ کریں

```bash
# 1. ورژن نمبر تبدیل کریں
# config.xml میں:
# <widget id="com.gamehub.app" version="1.0.1">

# 2. changelog لکھیں
# CHANGELOG.md میں نئی entry شامل کریں

# 3. دوبارہ ساخت اور انتشار
npm run build:android:release
```

### Staged Rollout (تدریجی رہائی)

```
Play Console میں:
1. "Production" میں جائیں
2. "Manage rollout" پر کلک کریں
3. شروع کریں: 5% → 10% → 25% → 50% → 100%
4. ہر مرحلے میں 1-2 دن انتظار کریں
5. خرابیوں کے لیے نگاہ رکھیں
```

---

## ✅ Pre-Release Checklist

- [ ] تمام مقامات میں ٹیسٹ کیا (اردو، انگریزی)
- [ ] تمام Android ورژن میں کام کرتا ہے (API 21+)
- [ ] تمام بازیوں میں کوئی خرابی نہیں
- [ ] لوڈنگ ٹائم قابل قبول ہے
- [ ] localStorage صحیح طریقے سے کام کر رہا ہے
- [ ] Privacy Policy موجود ہے
- [ ] Terms of Service موجود ہے
- [ ] APK اندازے میں ہے (<50MB)
- [ ] کوئی منع شدہ مواد نہیں
- [ ] تمام متادیتا درست ہے

---

## 📊 Analytics Setup

### Google Analytics شامل کریں

```javascript
// www/index.html میں شامل کریں
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

### Firebase Integration

```bash
npm install --save firebase
```

---

## 📞 پشتیبانی اور رابطہ

- بگ رپورٹ: https://github.com/seakurd/GameHub/issues
- ای میل: dev@gamehub.ir
- سوشل میڈیا: [@GameHubIR](https://twitter.com/GameHubIR)

---

**نسخہ:** 1.0.0  
**آخری اپ ڈیٹ:** ستمبر 2024
