# StarkBank

StarkBank is a lightweight, beginner-friendly client-side banking app built with plain HTML, CSS and JavaScript. It demonstrates user sign-up/sign-in, account management, expense tracking (debits/credits), and persistent browser storage using localStorage — no backend required.

## Features
- Create and sign in to local accounts
- Add income (credit) and expenses (debit)
- Automatic balance updates
- Remove expenses (updates balance and storage)
- Data persisted in browser localStorage
- Simple, responsive UI suitable for learning DOM manipulation

## Tech stack
- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- localStorage for persistence

## Quickstart (run locally)
1. Clone the repo:
```bash
git clone https://github.com/<your-username>/StarkBank.git
cd StarkBank
```

2. simply open `index.html` in a browser (some features work best when served via HTTP).

## Usage
- Sign up to create a user account.
- Sign in with the created account.
- Add income or expense entries; the balance updates automatically.
- Click the remove icon next to an expense to delete it (this updates balance and localStorage).

## Project structure (important files)
- index.html — main UI
- style.css — styling
- script.js — app logic (accounts, transactions, localStorage handling)
- README.md — project description

## Development notes
- Useful helpers: `retrieveUsers()`, `updateUsers()`, `retrieveCurrentUser()`, `updateCurrentUser()` (see `script.js`)
- No backend or database — all data lives in the browser (localStorage). 