# SIT313 P4 – DEV@Deakin Login and Registration

## Setup
1. Extract this folder and open it in VS Code.
2. Copy `.env.example` and rename the copy to `.env`.
3. Check the Firebase web app values in Firebase Console → Project settings → Your apps. Update `.env` if your Firebase project uses different values.
4. In Firebase Console → Authentication → Sign-in method, enable **Email/Password**.
5. In Firebase Console → Firestore Database → Rules, publish the contents of `firestore.rules`.
6. Open the terminal in this project folder and run:

   ```bash
   npm install
   npm run dev
   ```

7. Open the local URL printed by Vite.

## Features
- React Router routes for the home page, login and registration.
- Shared navigation bar and footer across pages.
- Firebase Authentication for account creation and login. Passwords are managed by Firebase Authentication and are not stored in the Firestore user profile.
- Firestore `users/{uid}` document stores the user's UID, full name, email and account creation timestamp.
- Form validation and user-friendly error messages.
- Local images are served from `public/images` using the exact filenames.

## Before submission
- Test a new registration using an email address you control.
- Confirm a matching user document appears in Firestore.
- Log out of the newly created account (registration automatically signs out) and test login.
- Test an incorrect password and confirm an error is shown.
- Capture genuine screenshots of the working pages and test results.
- Do not commit `.env`, `node_modules/` or `dist/` to GitHub/GitLab.
