/* ============================================================
   RoamRoots TravNet — API helper
   Talks to the local backend (server/server.js) at
   http://localhost:4000. If the server isn't running (e.g.
   during a quick demo where it wasn't started), every call
   fails gracefully and the page falls back to a friendly
   demo message instead of breaking.
   ============================================================ */

// If the page was opened directly as a file (double-clicked), talk to the
// local dev server at localhost:4000. If the page is being served by a
// server (locally at http://localhost:4000/ or once deployed live), use a
// relative path so it automatically points to wherever it's hosted.
const API_BASE = (location.protocol === 'file:') ? 'http://localhost:4000/api' : '/api';

async function apiCall(path, method = 'GET', body = null) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) return { connected: true, ok: false, error: data.error || 'Something went wrong.' };
    return { connected: true, ok: true, data };
  } catch (err) {
    // Server not running / unreachable — let the caller fall back to demo mode.
    return { connected: false, ok: false, error: 'Backend server not running.' };
  }
}

/* ============================================================
   Site-wide login state
   Swaps the "Sign In / Create Account" buttons for an account
   avatar + name whenever someone is signed in (stored in
   localStorage after signin.html / signup.html succeed).
   Runs automatically on every page that includes this file.
   ============================================================ */
function initialsFromName(name) {
  return name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function renderAuthState() {
  const name = localStorage.getItem('roamroots_user_name');
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  const signInLink = navActions.querySelector('a[href="signin.html"]');
  const signUpLink = navActions.querySelector('a[href="signup.html"]');

  if (name && signInLink && signUpLink) {
    const account = document.createElement('a');
    account.href = 'dashboard.html';
    account.className = 'nav-account';
    account.innerHTML = `
      <span class="nav-avatar">${initialsFromName(name)}</span>
      <span class="nav-account-name">${name.split(' ')[0]}<small>My Account</small></span>
    `;
    signInLink.replaceWith(account);

    const signOut = document.createElement('button');
    signOut.type = 'button';
    signOut.className = 'nav-signout';
    signOut.textContent = 'Sign Out';
    signOut.addEventListener('click', () => {
      localStorage.removeItem('roamroots_user_name');
      localStorage.removeItem('roamroots_user_email');
      window.location.href = 'index.html';
    });
    signUpLink.replaceWith(signOut);
  }
}

document.addEventListener('DOMContentLoaded', renderAuthState);

/* ============================================================
   Mobile nav menu
   Toggles the hamburger button's dropdown of nav links, and
   moves the Sign In / Create Account / Account section into that
   same dropdown on mobile widths (instead of leaving it cramped
   in the top bar). Moves it back to the top bar on desktop.
   ============================================================ */
function initMobileNav() {
  const hamburger = document.getElementById('navHamburger');
  const mainLinks = document.querySelector('nav.main-links');
  const navActions = document.querySelector('.nav-actions');
  const navTop = document.querySelector('.nav-top');
  if (!hamburger || !mainLinks || !navActions || !navTop) return;

  let actionsInDropdown = false;

  function placeActionsForWidth() {
    const isMobile = window.innerWidth <= 980;
    if (isMobile && !actionsInDropdown) {
      mainLinks.appendChild(navActions);
      actionsInDropdown = true;
    } else if (!isMobile && actionsInDropdown) {
      navTop.appendChild(navActions);
      actionsInDropdown = false;
    }
  }
  placeActionsForWidth();

  hamburger.addEventListener('click', () => {
    mainLinks.classList.toggle('mobile-open');
  });

  mainLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainLinks.classList.remove('mobile-open'));
  });

  window.addEventListener('resize', () => {
    placeActionsForWidth();
    if (window.innerWidth > 980) mainLinks.classList.remove('mobile-open');
  });
}

document.addEventListener('DOMContentLoaded', initMobileNav);
