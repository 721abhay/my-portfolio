# LinkedIn App Registration Details

## 📋 Required Information for LinkedIn App

Use these details when creating your LinkedIn app at https://www.linkedin.com/developers/apps

---

## 🏷️ App Name
```
Abhay Vishwakarma Portfolio Sync
```

**Alternative Names:**
- `Portfolio LinkedIn Sync`
- `Abhay Portfolio Integration`
- `My Portfolio Auto-Sync`

---

## 🌐 Privacy Policy URL

### For Local Development:
```
http://localhost:3000/privacy-policy.html
```

### For Production (after deployment):
```
https://your-domain.com/privacy-policy.html
```

**Examples:**
- `https://abhayvishwakarma.vercel.app/privacy-policy.html`
- `https://abhaydev.com/privacy-policy.html`
- `https://your-custom-domain.com/privacy-policy.html`

---

## 🔗 Redirect URLs

### For Local Development:
```
http://localhost:3000/api/linkedin/callback
```

### For Production:
```
https://your-domain.com/api/linkedin/callback
```

**Note:** Add BOTH URLs if you want to test locally and in production!

---

## 📝 App Description

```
A personal portfolio website that syncs professional certifications and projects 
from LinkedIn to showcase achievements and work experience. This integration 
allows automatic updates to the portfolio when LinkedIn profile is updated, 
ensuring the portfolio always displays current and accurate information.
```

**Alternative (Shorter):**
```
Personal portfolio with LinkedIn integration for automatic sync of certifications 
and projects. Keeps portfolio up-to-date with LinkedIn profile changes.
```

---

## 🏢 Company/Organization

```
Personal Portfolio
```

**Or use your name:**
```
Abhay Vishwakarma
```

---

## 🌍 App Website URL

### For Local Development:
```
http://localhost:3000
```

### For Production:
```
https://your-domain.com
```

---

## 📧 Contact Email

```
abhayvishwakarma0814@gmail.com
```

---

## 🎨 App Logo

**Recommendations:**
- Size: 300x300px minimum
- Format: PNG or JPG
- Background: Transparent or solid color
- Content: Your initials (AV) or portfolio logo

**Quick Logo Ideas:**
1. Use your profile picture
2. Create initials logo (A + V)
3. Use a portfolio icon
4. Design in Canva (free)

---

## 🔐 OAuth 2.0 Scopes

Request these permissions:

### Required:
- ✅ `r_liteprofile` - Basic profile information
- ✅ `r_emailaddress` - Email address

### Optional (for future features):
- `w_member_social` - Share on LinkedIn
- `r_organization_social` - Organization data

---

## 📋 Complete Registration Checklist

### Step 1: Basic Information
- [ ] App Name: `Abhay Vishwakarma Portfolio Sync`
- [ ] App Description: (Use description above)
- [ ] App Website: `http://localhost:3000` or your domain
- [ ] Company: `Personal Portfolio`
- [ ] App Logo: Upload your logo

### Step 2: Legal
- [ ] Privacy Policy URL: `http://localhost:3000/privacy-policy.html`
- [ ] Terms of Service URL: (Optional)
- [ ] Accept LinkedIn API Terms

### Step 3: Auth Settings
- [ ] Redirect URLs:
  - `http://localhost:3000/api/linkedin/callback`
  - `https://your-domain.com/api/linkedin/callback` (if deployed)

### Step 4: Products
- [ ] Request access to "Sign In with LinkedIn"
- [ ] Request access to "Profile API"

### Step 5: Credentials
- [ ] Copy Client ID
- [ ] Copy Client Secret
- [ ] Add to `.env.local`

---

## 🚀 Quick Setup Script

After creating the app, add credentials to `.env.local`:

```env
# LinkedIn OAuth Configuration
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback

# For production, also add:
# LINKEDIN_REDIRECT_URI=https://your-domain.com/api/linkedin/callback
```

---

## 📱 App Settings Summary

| Setting | Value |
|---------|-------|
| **App Name** | Abhay Vishwakarma Portfolio Sync |
| **Privacy Policy** | http://localhost:3000/privacy-policy.html |
| **Redirect URL (Dev)** | http://localhost:3000/api/linkedin/callback |
| **Redirect URL (Prod)** | https://your-domain.com/api/linkedin/callback |
| **Website** | http://localhost:3000 or your domain |
| **Contact Email** | abhayvishwakarma0814@gmail.com |
| **Scopes** | r_liteprofile, r_emailaddress |

---

## 🔄 After Deployment

When you deploy to production (Vercel/Netlify):

1. **Update LinkedIn App:**
   - Add production redirect URL
   - Update privacy policy URL
   - Update website URL

2. **Update Environment Variables:**
   ```env
   LINKEDIN_REDIRECT_URI=https://your-domain.com/api/linkedin/callback
   ```

3. **Test:**
   - Click "Connect LinkedIn"
   - Verify OAuth flow works
   - Check data syncs correctly

---

## 🎯 Privacy Policy Location

Your privacy policy is available at:

**Local:**
```
http://localhost:3000/privacy-policy.html
```

**Production:**
```
https://your-domain.com/privacy-policy.html
```

The file is located at:
```
public/privacy-policy.html
```

---

## 📞 Support Information

If LinkedIn asks for support information:

**Support Email:**
```
abhayvishwakarma0814@gmail.com
```

**Support URL:**
```
https://github.com/721abhay
```

---

## ✅ Verification Checklist

Before submitting your app:

- [ ] App name is descriptive
- [ ] Privacy policy is accessible
- [ ] Redirect URLs are correct
- [ ] Logo is uploaded (300x300px min)
- [ ] Description explains the integration
- [ ] Contact email is valid
- [ ] All required fields are filled
- [ ] OAuth scopes are selected
- [ ] Terms are accepted

---

## 🎉 You're Ready!

Use the information above to create your LinkedIn app. Once created:

1. ✅ Copy Client ID and Client Secret
2. ✅ Add to `.env.local`
3. ✅ Restart dev server
4. ✅ Click "Connect LinkedIn"
5. ✅ Start syncing!

---

**Need help?** Check `LINKEDIN_SYNC_SETUP.md` for detailed instructions!
