# LinkedIn Auto-Sync Setup Guide

## 🎯 Overview

Your portfolio now supports **automatic synchronization** with LinkedIn! When you add certificates or projects on LinkedIn, they will automatically appear on your portfolio.

## ✨ Features

- ✅ **Auto-sync** certificates from LinkedIn
- ✅ **Auto-sync** projects from LinkedIn  
- ✅ **One-click sync** button
- ✅ **Background sync** every 24 hours
- ✅ **LinkedIn badge** on synced items
- ✅ **Merge** LinkedIn data with manual entries
- ✅ **Credential verification** links

## 🚀 Setup Instructions

### Step 1: Create LinkedIn App

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click **"Create app"**
3. Fill in the details:
   - **App name**: "My Portfolio Sync"
   - **LinkedIn Page**: Your LinkedIn page (or create one)
   - **App logo**: Upload any logo
   - **Legal agreement**: Accept terms

4. Click **"Create app"**

### Step 2: Configure OAuth Settings

1. In your app dashboard, go to **"Auth"** tab
2. Add **Redirect URLs**:
   ```
   http://localhost:3000/api/linkedin/callback
   https://your-domain.com/api/linkedin/callback
   ```

3. Under **"Products"**, request access to:
   - ✅ **Sign In with LinkedIn**
   - ✅ **Share on LinkedIn**
   - ✅ **Profile API**

### Step 3: Get Your Credentials

1. Go to **"Auth"** tab
2. Copy your:
   - **Client ID**
   - **Client Secret**

### Step 4: Add to Environment Variables

1. Open `.env.local` in your project
2. Add these lines:

```env
# LinkedIn OAuth Configuration
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/linkedin/callback

# For production, also add:
# LINKEDIN_REDIRECT_URI=https://your-domain.com/api/linkedin/callback
```

3. **Replace** `your_client_id_here` and `your_client_secret_here` with your actual credentials

### Step 5: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## 🎮 How to Use

### First Time Setup

1. **Open your portfolio** at http://localhost:3000
2. **Click the blue "Connect LinkedIn" button** in the bottom-right corner
3. **Authorize the app** on LinkedIn
4. **Wait for sync** to complete
5. **Refresh the page** to see your LinkedIn certificates and projects!

### Updating Content

**Option 1: Automatic (Recommended)**
- Add certificates/projects on LinkedIn
- Wait 24 hours for auto-sync
- OR click "Sync LinkedIn" button for instant update

**Option 2: Manual Sync**
- Click the **"Sync LinkedIn" button** anytime
- Your LinkedIn data will be fetched immediately

### What Gets Synced?

#### Certificates
- ✅ Certificate name
- ✅ Issuing organization
- ✅ Issue date
- ✅ Credential URL
- ✅ Skills (if available)

#### Projects
- ✅ Project title
- ✅ Description
- ✅ Project URL
- ✅ Start/End dates
- ✅ Team members count

## 🎨 Visual Indicators

### LinkedIn Badge
Certificates and projects synced from LinkedIn will show a blue **LinkedIn badge** in the top-left corner.

### Sync Status
- 🔄 **Syncing...** - Data is being fetched
- ✅ **Synced!** - Successfully updated
- ❌ **Failed** - Error occurred (check console)

### Last Sync Time
Displays when the last sync occurred:
- "Just now"
- "5m ago"
- "2h ago"
- "1d ago"

## 🔧 Advanced Configuration

### Change Sync Interval

Edit `lib/linkedin-sync.ts`:

```typescript
// Change from 24 hours to 12 hours
const hoursSinceSync = (now.getTime() - lastSyncDate.getTime()) / (1000 * 60 * 60)
return hoursSinceSync >= 12 // Changed from 24
```

### Customize Certificate Conversion

Edit `lib/linkedin-sync.ts` in the `convertLinkedInCertificate` function:

```typescript
export function convertLinkedInCertificate(cert: LinkedInCertificate) {
  return {
    // ... existing code
    featured: true, // Make all LinkedIn certs featured
    skills: extractSkills(cert.description), // Add custom skill extraction
  }
}
```

### Add Custom Fields

You can add custom fields to LinkedIn data by modifying the conversion functions in `lib/linkedin-sync.ts`.

## 🐛 Troubleshooting

### "Connect LinkedIn" button doesn't work
- ✅ Check `.env.local` has correct credentials
- ✅ Restart development server
- ✅ Check browser console for errors

### Sync fails with 401 error
- ✅ Token expired - click "Connect LinkedIn" again
- ✅ Check LinkedIn app is approved
- ✅ Verify redirect URLs match exactly

### No data appears after sync
- ✅ Check you have certificates/projects on LinkedIn
- ✅ Open browser console and check for errors
- ✅ Verify LinkedIn app has correct permissions

### Sync button shows "Failed"
- ✅ Check internet connection
- ✅ Verify LinkedIn API credentials
- ✅ Check browser console for detailed error
- ✅ Try reconnecting LinkedIn

## 📊 Data Flow

```
LinkedIn Profile
      ↓
  OAuth Login
      ↓
  Access Token
      ↓
LinkedIn API Fetch
      ↓
 Convert Format
      ↓
Local Storage Cache
      ↓
Portfolio Display
```

## 🔒 Security Notes

- ✅ Access tokens are stored in **localStorage** (client-side only)
- ✅ Client secrets are in **`.env.local`** (never committed to git)
- ✅ OAuth flow uses **secure redirect**
- ✅ Tokens expire and require re-authentication
- ✅ No sensitive data is stored on server

## 🌐 Production Deployment

### Vercel / Netlify

1. Add environment variables in dashboard:
   ```
   LINKEDIN_CLIENT_ID=your_client_id
   LINKEDIN_CLIENT_SECRET=your_client_secret
   LINKEDIN_REDIRECT_URI=https://your-domain.com/api/linkedin/callback
   ```

2. Update LinkedIn app redirect URLs:
   ```
   https://your-domain.com/api/linkedin/callback
   ```

3. Deploy!

## 📱 Mobile Support

The LinkedIn sync button is fully responsive and works on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🎯 Best Practices

1. **Keep LinkedIn Updated**: Regularly update your LinkedIn profile
2. **Use Featured**: Mark important items as "featured" on LinkedIn
3. **Add Details**: Include descriptions and URLs for better display
4. **Sync Regularly**: Click sync button after LinkedIn updates
5. **Manual Override**: You can still add manual certificates/projects

## 🔄 Hybrid Approach

Your portfolio supports **both** LinkedIn sync and manual entries:

- **LinkedIn data** appears first (with LinkedIn badge)
- **Manual entries** appear after
- **No duplicates** - same ID won't appear twice
- **Full control** - disable sync anytime

## 📖 API Reference

### `syncLinkedInData(accessToken)`
Fetches and syncs LinkedIn data.

### `getCachedLinkedInData()`
Returns cached LinkedIn data from localStorage.

### `shouldSync()`
Checks if 24 hours have passed since last sync.

### `convertLinkedInCertificate(cert)`
Converts LinkedIn certificate format to portfolio format.

### `convertLinkedInProject(project)`
Converts LinkedIn project format to portfolio format.

## 🎉 You're All Set!

Your portfolio now automatically syncs with LinkedIn! Just:
1. Add credentials to `.env.local`
2. Click "Connect LinkedIn"
3. Enjoy automatic updates!

---

**Questions?** Check the main documentation or open an issue on GitHub.
