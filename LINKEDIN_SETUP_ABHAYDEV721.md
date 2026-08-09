# 🎯 LinkedIn App Setup - YOUR EXACT URLs

## ✅ Your Vercel URL: abhaydev721.vercel.app

Use these EXACT values when creating your LinkedIn app!

---

## 📋 **Copy-Paste Ready Values**

### **App Name:**
```
Abhay Vishwakarma Portfolio Sync
```

---

### **Privacy Policy URL:**
```
https://abhaydev721.vercel.app/privacy-policy.html
```

---

### **Redirect URLs:** (Add BOTH!)

**Production:**
```
https://abhaydev721.vercel.app/api/linkedin/callback
```

**Local Development:**
```
http://localhost:3000/api/linkedin/callback
```

---

### **App Website URL:**
```
https://abhaydev721.vercel.app
```

---

### **Contact Email:**
```
abhayvishwakarma0814@gmail.com
```

---

### **App Description:**
```
Personal portfolio with LinkedIn integration for automatic sync of certifications and projects. Keeps portfolio up-to-date with LinkedIn profile changes.
```

---

### **Company/Organization:**
```
Personal Portfolio
```

---

### **OAuth Scopes:**
Select these permissions:
- ✅ `r_liteprofile` - Basic profile information
- ✅ `r_emailaddress` - Email address

---

## ⚙️ **Vercel Environment Variables**

After creating LinkedIn app, add these to Vercel:

**Go to:** https://vercel.com/dashboard → abhaydev721 → Settings → Environment Variables

### **Variable 1:**
```
Name:  LINKEDIN_CLIENT_ID
Value: [paste your Client ID from LinkedIn app]
```

### **Variable 2:**
```
Name:  LINKEDIN_CLIENT_SECRET
Value: [paste your Client Secret from LinkedIn app]
```

### **Variable 3:**
```
Name:  LINKEDIN_REDIRECT_URI
Value: https://abhaydev721.vercel.app/api/linkedin/callback
```

**Select:** Production, Preview, Development (all three)

---

## 💻 **Local `.env.local`**

For local testing, add to your `.env.local` file:

```env
# LinkedIn OAuth Configuration
LINKEDIN_CLIENT_ID=same_client_id_from_vercel
LINKEDIN_CLIENT_SECRET=same_client_secret_from_vercel
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback
```

---

## 🚀 **Step-by-Step Instructions**

### **Step 1: Create LinkedIn App**
1. Go to https://www.linkedin.com/developers/apps
2. Click **"Create app"**
3. Copy-paste the values from above ⬆️
4. Click **"Create app"**

### **Step 2: Get Credentials**
1. Go to **"Auth"** tab
2. Copy **Client ID**
3. Copy **Client Secret**
4. Save them somewhere safe!

### **Step 3: Add to Vercel**
1. Go to https://vercel.com/dashboard
2. Select **abhaydev721** project
3. Go to **Settings** → **Environment Variables**
4. Add the 3 variables (see above)
5. Select all environments
6. Click **"Save"**

### **Step 4: Add to Local `.env.local`**
1. Open `.env.local` in your project
2. Add the LinkedIn credentials (see above)
3. Save the file

### **Step 5: Redeploy**
```bash
git add .
git commit -m "Add LinkedIn integration"
git push
```

Vercel will automatically redeploy!

### **Step 6: Test on Production**
1. Visit https://abhaydev721.vercel.app
2. Scroll to bottom-right corner
3. Click **"Connect LinkedIn"** (blue button)
4. Authorize the app
5. Click **"Sync LinkedIn"**
6. ✅ Done! Your LinkedIn data appears!

---

## 🔗 **Your URLs Summary**

| Purpose | URL |
|---------|-----|
| **Portfolio** | https://abhaydev721.vercel.app |
| **Privacy Policy** | https://abhaydev721.vercel.app/privacy-policy.html |
| **OAuth Callback** | https://abhaydev721.vercel.app/api/linkedin/callback |
| **Local Callback** | http://localhost:3000/api/linkedin/callback |

---

## ✅ **Verification**

After setup, verify these URLs work:

**Privacy Policy:**
- Visit: https://abhaydev721.vercel.app/privacy-policy.html
- Should show your privacy policy page

**LinkedIn Sync Button:**
- Visit: https://abhaydev721.vercel.app
- Scroll to bottom-right
- Should see blue "Connect LinkedIn" button

---

## 🎯 **Quick Checklist**

- [ ] Created LinkedIn app with exact URLs above
- [ ] Got Client ID and Client Secret
- [ ] Added 3 environment variables to Vercel
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Added credentials to local `.env.local`
- [ ] Committed and pushed to GitHub
- [ ] Vercel redeployed automatically
- [ ] Visited https://abhaydev721.vercel.app
- [ ] Clicked "Connect LinkedIn"
- [ ] Authorized app on LinkedIn
- [ ] Clicked "Sync LinkedIn"
- [ ] LinkedIn data appeared on portfolio!

---

## 🎉 **You're All Set!**

Your LinkedIn integration will work on:
- ✅ **Production:** https://abhaydev721.vercel.app
- ✅ **Local:** http://localhost:3000

Just create the LinkedIn app with the exact values above and add the environment variables to Vercel!

---

**🚀 Start here:** https://www.linkedin.com/developers/apps/new
