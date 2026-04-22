# 🛠️ Hackathon Survival Kit

A minimal, beginner-friendly web application designed for live bootcamp demos. This project demonstrates the core pillars of web development: **Frontend**, **Backend**, and **Database**.

## 🚀 Features
- **One-Page Layout**: Clean and mobile-friendly using [Pico.css](https://picocss.com/).
- **Dynamic List**: Items are sorted by importance (Must-Have Level).
- **SQLite Database**: Simple file-based storage for local persistence.
- **QR Code**: Automatically generated to help students open the app on their phones.

## 🛠️ Tech Stack
- **Frontend**: Plain HTML, CSS, and Vanilla JavaScript.
- **Backend**: Node.js with [Express](https://expressjs.com/).
- **Database**: [SQLite](https://www.sqlite.org/) (via `sqlite3` and `sqlite` promise wrapper).
- **QR Code**: [qrcode.js](https://davidshimjs.github.io/qrcodejs/) (Client-side).

## 📂 Project Structure
- `server.js`: The heart of the app. It sets up the server, initializes the SQLite database, seeds initial data, and provides API endpoints.
- `public/`: Contains all frontend assets.
  - `index.html`: The structure of the page.
  - `style.css`: Minimal custom styling.
  - `script.js`: Logic for fetching items, submitting the form, and generating the QR code.
- `survival.db`: The SQLite database file (created automatically on first run).

## 🚦 How to Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. Open your browser at `http://localhost:3000`.

## 💾 Data Storage
The app stores data in a single file called `survival.db`. When you restart the server, your data remains safe!

---
*Created for the Live Bootcamp Demo.*
