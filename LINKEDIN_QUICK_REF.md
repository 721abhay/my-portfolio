# 📋 LinkedIn App - Quick Reference Card

Copy and paste these values when creating your LinkedIn app!

---

## 🏷️ App Name
```
Abhay Vishwakarma Portfolio Sync
```

---

## 🌐 Privacy Policy URL

**Production (Vercel):** ⭐ **USE THIS**
```
https://your-vercel-url.vercel.app/privacy-policy.html
```

**Local Development:**
```
http://localhost:3000/privacy-policy.html
```

💡 **Find your Vercel URL:** https://vercel.com/dashboard

---

## 🔗 Redirect URLs

**Add BOTH URLs to LinkedIn app:**

**Production (Vercel):**
```
https://your-vercel-url.vercel.app/api/linkedin/callback
```

**Local Development:**
```
http://localhost:3000/api/linkedin/callback
```

---

## 🌍 App Website URL

**Local:**
```
http://localhost:3000
```

**Production:**
```
https://your-domain.com
```

---

## 📝 App Description
```
Personal portfolio with LinkedIn integration for automatic sync of certifications and projects. Keeps portfolio up-to-date with LinkedIn profile changes.
```

---

## 📧 Contact Email
```
abhayvishwakarma0814@gmail.com
```

---

## 🔐 OAuth Scopes

Select these permissions:
- ✅ `r_liteprofile` - Basic profile
- ✅ `r_emailaddress` - Email address

---

## 🏢 Company/Organization
```
Personal Portfolio
```

---

## ⚡ After Creating App

1. Copy **Client ID** and **Client Secret**
2. Add to `.env.local`:
   ```env
   LINKEDIN_CLIENT_ID=paste_client_id_here
   LINKEDIN_CLIENT_SECRET=paste_client_secret_here
   LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback
   ```
3. Restart dev server: `npm run dev`
4. Click "Connect LinkedIn" button
5. Done! ✅

---

## 📍 Privacy Policy Location

Your privacy policy is ready at:
- **File:** `public/privacy-policy.html`
- **URL:** http://localhost:3000/privacy-policy.html

---

## 🎯 Quick Links

- **Create App:** https://www.linkedin.com/developers/apps
- **Full Guide:** `LINKEDIN_APP_DETAILS.md`
- **Setup Guide:** `LINKEDIN_SYNC_SETUP.md`

---

**That's it! Use these values to create your LinkedIn app! 🚀**
