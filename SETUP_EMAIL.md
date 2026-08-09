# Email Setup Guide

The contact form is now fully functional! 

## How it works

1.  **Mock Mode (Default)**: If you don't provide email credentials, the form will still "submit" successfully. The details of the message will be logged to your terminal (where you run `npm run dev`). This lets you test the UI immediately.
2.  **Real Email Mode**: To send actual emails, you need to configure your Gmail (or other SMTP) credentials.

## Setting up Real Emails

1.  Create or edit the `.env.local` file in the root of your project.
2.  Add the following variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Note**: For Gmail, you MUST use an **App Password**, not your regular password.
- Go to [Google Account Security](https://myaccount.google.com/security).
- Enable 2-Step Verification if not enabled.
- Go to "App passwords" (search for it).
- Create a new app password (name it "Portfolio").
- Use that 16-character password in `EMAIL_PASS`.

3.  Restart your development server: note that environment variables are loaded on start.
    ```bash
    npm run dev
    ```

## Troubleshooting

-   If you get errors, check the terminal output.
-   Make sure you allow "Less secure apps" or use App Passwords (recommended).
