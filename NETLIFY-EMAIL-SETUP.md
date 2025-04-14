# Setting Up Email for Contact Form in Netlify

To ensure your contact form emails are delivered to your inbox, you need to set up the following environment variables in your Netlify dashboard:

## Required Environment Variables

Add these environment variables in your Netlify site dashboard:

1. `EMAIL_USER`: Your Gmail address (e.g., akrun111@gmail.com)
2. `EMAIL_PASSWORD`: Your Gmail app password (not your regular password)
3. `EMAIL_HOST`: smtp.gmail.com
4. `EMAIL_PORT`: 587

## How to Set Up Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site (akrunanalytics)
3. Go to **Site settings** > **Build & deploy** > **Environment**
4. Click on **Edit variables**
5. Add each of the variables listed above

## Creating a Gmail App Password

For security reasons, Gmail requires you to use an "App Password" instead of your regular password:

1. Go to your Google Account settings: https://myaccount.google.com/
2. Select **Security**
3. Under "Signing in to Google," select **2-Step Verification** (enable it if not already enabled)
4. At the bottom of the page, select **App passwords**
5. Click **Select app** and choose "Mail"
6. Click **Select device** and choose "Other"
7. Enter a name (e.g., "Akrun Analytics Website")
8. Click **Generate**
9. Copy the 16-character password that appears
10. Use this password as your `EMAIL_PASSWORD` environment variable

## Testing the Email Functionality

After setting up the environment variables:

1. Deploy your site with the updated environment variables
2. Submit a test message through your contact form
3. Check your email inbox (and spam folder) for the message

## Troubleshooting

If emails are not being delivered:

1. Check Netlify function logs in your Netlify dashboard under **Functions**
2. Verify that all environment variables are correctly set
3. Make sure your Gmail account has "Less secure app access" enabled or is properly set up with an App Password
4. Check if your Gmail has filters that might be affecting incoming messages

## Additional Resources

- [Netlify Environment Variables Documentation](https://docs.netlify.com/configure-builds/environment-variables/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Nodemailer Documentation](https://nodemailer.com/about/)
