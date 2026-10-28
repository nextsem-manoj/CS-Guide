# Deployment Guide — Nextsem Academy

This document covers both **staging** (preview) and **production** deployments to Firebase Hosting.

---

## Quick Commands

| Command | What it does |
|---|---|
| `npm run deploy:staging` | Build + deploy to the `staging` preview channel |
| `npm run deploy:prod` | Build + deploy to production (`nextsem.online`) |

---

## Staging (Preview Channel)

Staging uses **Firebase Hosting Preview Channels** — a built-in feature that gives you a live, shareable URL on the same Firebase project without touching production.

**Staging URL:** `https://bca-nextsem--staging.web.app`

### Deploy to Staging
```bash
npm run deploy:staging
```

This runs:
1. `node scripts/generate-search-index.js` — regenerates the search index
2. `next build` — generates the static `out/` directory
3. `firebase hosting:channel:deploy staging` — pushes to the staging channel

> Preview channels **do not expire** unless you pass `--expires`. The staging channel persists until manually deleted or overwritten by a new deploy.

### Useful Channel Commands
```bash
# List all active preview channels
npx firebase-tools hosting:channel:list --project bca-nextsem

# Delete the staging channel when done
npx firebase-tools hosting:channel:delete staging --project bca-nextsem

# Create a one-off feature branch preview (expires in 7 days)
npx firebase-tools hosting:channel:deploy feature-my-new-feature --expires 7d --project bca-nextsem
```

---

## Production Deploy

**Live URL:** https://cs.nextsem.online (also: https://ignou-study-notes-by-nextsem.web.app)

### Deploy to Production
```bash
npm run deploy:prod
```

This runs:
1. `node scripts/generate-search-index.js`
2. `next build`
3. `firebase deploy --only hosting`

---

## Setup Reference

### 1. Next.js Static Export (`next.config.ts`)
```typescript
const nextConfig: NextConfig = {
  output: 'export'
};
```

### 2. Firebase Hosting (`firebase.json`)
```json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "cleanUrls": true
  }
}
```

### 3. Firebase Project (`.firebaserc`)
```json
{
  "projects": {
    "default": "bca-nextsem"
  }
}
```

### 4. Prerequisites
- Firebase CLI installed: `npm install -g firebase-tools`
- Logged in: `firebase login`
- Project linked: `.firebaserc` already configured to `bca-nextsem`

---

## Workflow: Feature to Production

```
1. Build your feature on a branch
2. npm run deploy:staging
3. Share staging URL for review: https://bca-nextsem--staging.web.app
4. Approve & merge to main
5. npm run deploy:prod
```
