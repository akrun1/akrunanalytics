# Setting Up Email Notifications for Contact Form

To receive email notifications when someone submits your contact form, follow these steps:

## 1. Configure Netlify Form Notifications

1. Log in to your [Netlify Dashboard](https://app.netlify.com/)
2. Select your site (akrunanalytics)
3. Go to **Site settings** (in the top navigation)
4. Click on **Forms** in the left sidebar
5. Look for the "Active forms" section and you should see your "contact" form listed
6. Click on the form name to view submissions
7. Click on **Form notifications** (in the top right)
8. Click **Add notification** and select **Email notification**
9. Enter your email address: `akrun111@gmail.com`
10. Save the notification settings

## 2. Verify Your Heroku Backend Email Configuration

If you're also using your Heroku backend to send emails:

1. Make sure your Heroku app has the correct environment variables set:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=akrun111@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

2. If using Gmail, you need to:
   - Enable 2-Step Verification on your Google account
   - Generate an "App Password" specifically for your application
   - Use this App Password instead of your regular password

3. Check your Heroku logs for any email sending errors:
   ```
   heroku logs --tail --app akrun-analytics-62aa25462087
   ```

## 3. Testing Your Email Configuration

After setting up the notifications:

1. Submit a test message through your contact form
2. Check your email (including spam folder)
3. Verify that the form submission appears in your Netlify Forms dashboard

## Troubleshooting

If you're still not receiving emails:

1. Check your spam/junk folder
2. Verify that your email address is correctly entered in the Netlify notification settings
3. Try adding an alternative email address as a backup
4. Check Netlify's form submission dashboard to confirm the form is being submitted correctly
5. Review Heroku logs for any backend email sending errors

## Additional Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Netlify Form Notifications](https://docs.netlify.com/forms/notifications/)
- [Heroku Node.js Email Setup](https://devcenter.heroku.com/articles/sending-email-from-nodejs)
