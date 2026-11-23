import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sgMail from '@sendgrid/mail';
import 'dotenv/config';
import { createServer } from 'vite';

const app = express();
const PORT = process.env.PORT || 3000;
const projectFolder = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.post('/subscribe', async (req, res) => {
  const email = String(req.body.email || '').trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    console.log('Status 400: Invalid email address');
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (!process.env.SENDGRID_API_KEY || !process.env.FROM_EMAIL) {
    console.error('Status 500: SENDGRID_API_KEY or FROM_EMAIL is missing');
    return res.status(500).json({ message: 'Email service is not configured.' });
  }

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const [emailResponse] = await sgMail.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Welcome to DEV@Deakin/Chitkara!',
      text: 'Thank you for subscribing to DEV@Deakin/Chitkara. We are happy to have you with us!',
      html: `
        <h1>Welcome to DEV@Deakin/Chitkara!</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>We are happy to have you with us!</p>
      `
    });

    console.log(`SendGrid Status ${emailResponse.statusCode}: Welcome email sent to ${email}`);
    return res.status(200).json({ message: 'Subscribed! Please check your email.' });
  } catch (error) {
    const apiStatus = error.code || error.response?.statusCode || 500;
    console.error(`Email API Status ${apiStatus}: Welcome email failed`);
    if (error.response?.body) console.error(error.response.body);
    return res.status(500).json({ message: 'Could not send the welcome email. Please try again.' });
  }
});

if (process.argv.includes('--production')) {
  app.use(express.static(path.join(projectFolder, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(projectFolder, 'dist', 'index.html'));
  });
} else {
  const vite = await createServer({ server: { middlewareMode: true } });
  app.use(vite.middlewares);
}

app.listen(PORT, () => {
  console.log(`DEV@Deakin/Chitkara server running at http://localhost:${PORT}`);
});

