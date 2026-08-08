/* ============================================================
   RoamRoots TravNet — Backend + Static Site Server
   Serves the whole site (HTML/CSS/JS/images) AND the API from
   one server, so it can run locally OR be deployed to a free
   host (Render, Railway, etc.) as a single app with one URL.
   Data is stored in a local JSON file (data/db.json) — no
   database to set up.

   Run it locally with:
     cd server
     npm install
     npm start

   Then open http://localhost:4000 in your browser.
   ============================================================ */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 4000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const SITE_ROOT = path.join(__dirname, 'public');

app.use(cors());
app.use(express.json());

/* Serve the website (index.html, styles.css, data.js, api.js, img/,
   every page) from the self-contained public/ folder. Everything else
   in this server folder (server.js, package.json, data/db.json with
   password hashes) sits outside public/, so it's never reachable
   over HTTP. */
app.use(express.static(SITE_ROOT));

/* ---------- tiny file-based "database" helpers ---------- */
function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}
function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}
function newId(prefix) {
  return `${prefix}_${crypto.randomBytes(5).toString('hex')}`;
}
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/* ---------- health check ---------- */
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'RoamRoots TravNet API is running.' });
});

/* ============================================================
   AUTH
   ============================================================ */
app.post('/api/auth/signup', (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ ok: false, error: 'Name, email, and password are required.' });
  }
  const db = readDB();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ ok: false, error: 'An account with that email already exists.' });
  }
  const user = {
    id: newId('user'),
    name,
    email,
    phone: phone || '',
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString()
  };
  db.users.push(user);
  writeDB(db);
  const { passwordHash, ...safeUser } = user;
  res.status(201).json({ ok: true, user: safeUser, token: newId('token') });
});

app.post('/api/auth/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: 'Email and password are required.' });
  }
  const db = readDB();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ ok: false, error: 'Incorrect email or password.' });
  }
  const { passwordHash, ...safeUser } = user;
  res.json({ ok: true, user: safeUser, token: newId('token') });
});

/* ============================================================
   BOOKINGS (accommodation, transport, experiences, restaurants)
   ============================================================ */
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  res.json({ ok: true, bookings: db.bookings });
});

app.post('/api/bookings', (req, res) => {
  const { category, itemName, guestName, date, details } = req.body;
  if (!category || !itemName) {
    return res.status(400).json({ ok: false, error: 'category and itemName are required.' });
  }
  const db = readDB();
  const booking = {
    id: newId('bk'),
    category,          // "accommodation" | "transport" | "experience" | "restaurant"
    itemName,
    guestName: guestName || 'Guest',
    date: date || null,
    details: details || {},
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  db.bookings.push(booking);
  writeDB(db);
  res.status(201).json({ ok: true, booking });
});

/* ============================================================
   REVIEWS
   ============================================================ */
app.get('/api/reviews', (req, res) => {
  const db = readDB();
  res.json({ ok: true, reviews: db.reviews });
});

app.post('/api/reviews', (req, res) => {
  const { name, place, rating, text } = req.body;
  if (!name || !place || !rating || !text) {
    return res.status(400).json({ ok: false, error: 'name, place, rating, and text are required.' });
  }
  const db = readDB();
  const initials = name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const review = {
    id: newId('rev'),
    name,
    initials,
    place,
    rating: Number(rating),
    text,
    createdAt: new Date().toISOString()
  };
  db.reviews.unshift(review);
  writeDB(db);
  res.status(201).json({ ok: true, review });
});

/* ============================================================
   CONTACT FORM
   ============================================================ */
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'name, email, and message are required.' });
  }
  const db = readDB();
  const entry = {
    id: newId('msg'),
    name, email, message,
    createdAt: new Date().toISOString()
  };
  db.contactMessages.push(entry);
  writeDB(db);
  res.status(201).json({ ok: true, message: 'Message received.' });
});

app.listen(PORT, () => {
  console.log(`\n  RoamRoots TravNet running at http://localhost:${PORT}`);
  console.log(`  Open that link in your browser — the site and the API are both served from here.\n`);
});
