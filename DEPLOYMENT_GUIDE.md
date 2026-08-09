# 🚀 Deployment & Updates Guide

Yes! You can absolutely update your portfolio and add new features after it has been deployed. Modern web development is built for this.

## 🔄 How Updates Work (The Workflow)

1.  **Make Changes Locally**: You continue working with me (or on your own) to add features, fix bugs, or change content in your VS Code.
2.  **Push to GitHub**: When you are happy with the changes, you "push" (save) them to your GitHub repository.
3.  **Automatic Redeploy**: If you use a platform like **Vercel** or **Netlify** connected to your GitHub, they essentially say: *"Oh, Abhay pushed new code! Let me rebuild and update the live site."*
    *   This usually takes 1-2 minutes.
    *   **No downtime**: The old site stays live until the new one is ready.

---

## 🔑 CRITICAL: Making the GitHub Section Work in Production

The "Real-Time GitHub Stats" feature we just built relies on a **Secret Key** (`GITHUB_TOKEN`). This key exists in your local `.env.local` file, but **it is NOT uploaded to GitHub** for security.

**You MUST add this key to your Deployment Platform manually.**

### If using Vercel (Recommended):
1.  Go to your Project Dashboard on Vercel.
2.  Navigate to **Settings** > **Environment Variables**.
3.  Add a new variable:
    *   **Key**: `GITHUB_TOKEN`
    *   **Value**: (Paste your token starting with `ghp_...`)
4.  Click **Save**.
5.  **Redeploy** (Go to Deployments > Redeploy) for it to take effect.

**If you skip this step, the GitHub section will show empty data or an error on the live site, even though it works locally.**

---

## ⚡ What Updates Automatically vs. Manually?

| Feature | How it Updates |
| :--- | :--- |
| **GitHub Stats/Graph** | **Automatic (Dynamic)**. The site fetches new data every minute. You do *not* need to redeploy just because you made a new commit. |
| **New Project in Grid** | **Manual**. You must add the code for the new project and push to GitHub. |
| **New Blog Post** | **Manual** (unless using a CMS). You need to add the file and push. |
| **Design / Layout** | **Manual**. Requires code changes and a push. |

## 📝 Simple Checklist for Updating

1.  🛠️ **Code**: `I want to add a new 'Experience' section.` -> We write the code.
2.  ✅ **Verify**: Run `npm run dev` to obtain visual confirmation.
3.  🚀 **Push**:
    ```bash
    git add .
    git commit -m "Added Experience Section"
    git push origin main
    ```
4.  ✨ **Done**: Your live site updates automatically in minutes.
