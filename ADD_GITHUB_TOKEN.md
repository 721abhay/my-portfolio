# 🔑 How to Add Your GitHub Token to Vercel

To make the contribution graph work on your live site, follow these steps exactly.

## Step 1: Get Your GitHub Token (If you don't have it)

1.  Go to **GitHub** and sign in.
2.  Click your profile picture (top right) → **Settings**.
3.  Scroll down to the bottom left sidebar → **Developer settings**.
4.  Click **Personal access tokens** → **Tokens (classic)**.
5.  Click **Generate new token** → **Generate new token (classic)**.
6.  **Note**: "Portfolio Portfolio".
7.  **Select Scopes** (Check these boxes):
    *   ✅ `public_repo` (or just `repo` if uncertain)
    *   ✅ `read:user`
8.  Click **Generate token**.
9.  **COPY the token** (It starts with `ghp_...`). You won't see it again!

---

## Step 2: Add Token to Vercel

1.  Go to your **[Vercel Dashboard](https://vercel.com/dashboard)**.
2.  Click on your project (**my-portfolio**).
3.  Click the **Settings** tab (at the top).
4.  Click **Environment Variables** (in the left sidebar).
5.  Add the variable:
    *   **Key**: `GITHUB_TOKEN`
    *   **Value**: (Paste your `ghp_...` token here)
6.  Click **Save**.

---

## Step 3: Redeploy (Essential!)

The changes won't apply until the site rebuilds.

1.  Go to the **Deployments** tab (at the top).
2.  Find the top-most deployment (the one that says "Ready").
3.  Click the **three dots** (`...`) on the right side.
4.  Click **Redeploy**.
5.  Click **Redeploy** again in the confirmation box.

Wait ~1 minute. Once it finishes, your GitHub section will be live! 🟩
