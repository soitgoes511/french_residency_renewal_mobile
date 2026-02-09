# Mobile Residence Permit Tracker

This folder contains a mobile-optimized, offline version of your Residence Permit Tracker.
Unlike the Python version, this version runs entirely in your browser without needing a server, which makes it perfect for use on your phone.

## Option 1: The Easiest Way (Recommended)
You can use this as a **Progressive Web App (PWA)**. This behaves exactly like an installed app on your Android phone.

1.  **Host the files:** You need to put these files on the web. The easiest way is **GitHub Pages** or **Netlify Drop**.
    *   **Netlify Drop:** Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag this entire `Residence_renewal_mobile` folder onto the page. It will give you a link (e.g., `https://my-residence-tracker.netlify.app`).
2.  **Install on Phone:**
    *   Open the link in **Chrome** on your Android phone.
    *   Tap the **three dots menu** (top right).
    *   Tap **"Add to Home Screen"** or **"Install App"**.
3.  **Use Offline:** You can now open the app from your home screen even without internet!

## Option 2: Turn into an APK
If you strictly require an `.apk` file to install:

1.  **Use a Web-to-App Builder:**
    *   Zip the contents of this folder (`index.html`, `styles.css`, `app_offline.js`, `config.js`, etc.).
    *   Use a free service like **WebIntoApp** or **AppsGeyser**.
    *   Upload your zip file and download the resulting APK.

## Features
*   **Offline Support:** All data is saved to your phone's storage. No internet required after loading.
*   **Progress Tracking:** Tracks completion percentage automatically.
*   **Notes & Due Dates:** Add notes and due dates to any document.
*   **Profiles:** Filter requirements based on your situation (Spouse of French, Worker, etc.).

## Files Understanding
*   `index.html`: The main app entry point.
*   `styles.css`: The visual design.
*   `app_offline.js`: The application logic (replaces the Python backend).
*   `config.js`: Contains all the permit requirements and documents (generated from your YAML files).

## How Offline Works (Technical)
This app uses a **Service Worker** (`service-worker.js`) to provide offline support.
1.  **Caching:** On the first visit, the service worker downloads and saves all core files (`index.html`, `styles.css`, etc.) into the browser's Cache Storage.
2.  **Interception:** When you reload the page, the service worker intercepts the network request. If the file is in the cache, it serves it directly from your phone, bypassing the network entirely.
3.  **Persistence:** Because the files are stored locally on your device, the app **will continue to work** even if the original website goes down or is deleted. It is effectively "installed" on your device.

