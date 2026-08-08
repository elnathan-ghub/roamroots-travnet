# RoamRoots TravNet — Backend Server

This server does two jobs at once: it serves your whole website (every
HTML page, the styles, the images) AND it runs the API (sign in, bookings,
reviews, contact form). That means there's only one thing to run, and
only one link to share.

Data is stored in a plain JSON file (`data/db.json`) — no database
installation needed.

---

## Running it locally (on your own laptop)

### One-time setup
1. Install [Node.js](https://nodejs.org) if you don't have it.
2. Open a terminal in this `server` folder.
3. Run:
   ```
   npm install
   ```

### Every time you want to use it
1. In this `server` folder, run:
   ```
   npm start
   ```
2. You'll see:
   ```
   RoamRoots TravNet running at http://localhost:4000
   ```
3. Open **http://localhost:4000** in your browser (not the HTML files
   directly) — the whole site loads from there, and everything works.

You can still double-click `index.html` directly instead if you prefer —
it'll still try to reach the API at `http://localhost:4000`, so just make
sure the server is running in the background either way.

---

## Putting it online so others can use the real link

To get a public link where sign-in, bookings, and reviews genuinely work
for anyone, you need to host this server somewhere. **Render** is a good
free option that doesn't require a credit card for a small project like
this.

### Steps (Render.com)

1. Create a free account at [render.com](https://render.com).
2. Put this whole `RoamRoots-TravNet` folder in a GitHub repository
   (create a free GitHub account too if you don't have one, create a new
   repository, and upload/push the folder into it).
3. In Render, click **New +** → **Web Service**, and connect your GitHub
   repository.
4. Fill in these settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Click **Create Web Service**. Render will build and start it — this
   takes a couple of minutes the first time.
6. Once it's live, Render gives you a public URL like:
   ```
   https://roamroots-travnet.onrender.com
   ```
   Share that link with anyone — the whole site and the backend both work
   from it, no setup needed on their end.

### One thing to know about the free tier
Free Render services "fall asleep" after 15 minutes of no visitors. The
**first** visit after that can take 30–60 seconds to wake back up before
the site loads — this is normal, not a bug. If you're presenting live and
want it snappy, open the link yourself a minute or two before you start
so it's already awake.

---

## If you forget to start the server (local use)

Nothing breaks. Every button on the site falls back to a "Demo mode"
message instead of erroring out.

## Resetting the data

To clear out any test bookings/reviews and start fresh, replace
`data/db.json` with:

```json
{
  "users": [],
  "bookings": [],
  "reviews": [
    {
      "id": "rev_seed_1",
      "name": "Ama K.",
      "initials": "AK",
      "place": "Kakum National Park",
      "rating": 5,
      "text": "The canopy walk was unreal — go early morning before the heat and crowds. Guides are friendly and full of local knowledge.",
      "createdAt": "2026-06-10T09:00:00.000Z"
    },
    {
      "id": "rev_seed_2",
      "name": "David O.",
      "initials": "DO",
      "place": "Wli Waterfalls",
      "rating": 4,
      "text": "Beautiful hike, but wear proper shoes — the trail gets slippery near the falls. Bring a change of clothes, you will get wet!",
      "createdAt": "2026-06-15T09:00:00.000Z"
    },
    {
      "id": "rev_seed_3",
      "name": "Efua T.",
      "initials": "ET",
      "place": "Cape Coast Castle",
      "rating": 5,
      "text": "A heavy but important visit. The guided tour was respectful and informative — set aside at least two hours.",
      "createdAt": "2026-06-20T09:00:00.000Z"
    }
  ],
  "contactMessages": []
}
```
