# AKrun Analytics Frontend Integration

This directory contains scripts and code samples to help integrate your Netlify frontend site with your Heroku backend API.

## Setup Instructions

### 1. DNS Configuration

1. Add a CNAME record for the subdomain `api.akrunanalyticscorp.com` pointing to your Heroku app's DNS target:
   - **Name/Host:** `api`
   - **Value/Target:** Your Heroku DNS target (e.g., `serene-chicken-e63badcj3lmzdesuvgsadk3...`)
   - **TTL:** 3600 or Auto

2. In your Heroku dashboard:
   - Go to Settings → Domains
   - Add `api.akrunanalyticscorp.com` as a custom domain

### 2. Frontend Integration

To add the contact form to your Netlify site:

1. Copy the `contact-form.js` file to your Netlify site's JS directory
2. Either:
   - Use the provided `contact-form.html` code directly in your website
   - OR: Integrate the form with your existing design by copying relevant parts

3. Make sure your form has:
   - `id="contact-form"` on the form element
   - Input fields with ids: `name`, `email`, `subject`, `message`
   - A div with `id="form-status"` to display status messages

4. Update the API endpoint in `contact-form.js` if needed:
   ```javascript
   const API_ENDPOINT = 'https://api.akrunanalyticscorp.com/api/contact';
   ```

### 3. Form Styling

The provided CSS in `contact-form.html` can be:
- Used directly if you're creating a new page
- Integrated with your existing stylesheet (copying only what you need)
- Customized to match your site's design

### 4. Testing the Integration

1. Deploy the changes to your Netlify site
2. Fill out the contact form and submit
3. Check your Heroku logs to confirm the API received the request
4. Verify the message appears in your admin dashboard

## Accessing the Admin Dashboard

You can access the admin dashboard to view submitted messages at:
`https://api.akrunanalyticscorp.com/admin/login`

## API Endpoints

Your backend now exposes these API endpoints:

- `POST /api/contact` - Submit contact form data
  - Accepts: `{ name, email, subject, message }`
  - Returns: `{ success: true/false, message: "status message" }`

- `GET /api/messages` - Get all contact messages (admin only)
  - Requires authentication
  - Query params: `page`, `per_page`
  - Returns paginated list of messages

## Troubleshooting

If you encounter issues:

1. Check browser console for JavaScript errors
2. Verify your Heroku app is running
3. Confirm DNS is properly configured
4. Check Heroku logs for backend errors

## Need Help?

If you need additional assistance, please contact support or open an issue on GitHub.
