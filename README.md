See live at https://bca-nextsem.web.app/

---

## 🚀 NextSem Workspace & Multi-Repository Automation

Manage all NextSem repositories (`CS-Guide`, `ncert.nextsem.online`, `bca`, etc.) seamlessly:

```bash
# 1. Inspect repository status, metrics & immediate next step
status cs-guide             # Or: .\status cs-guide | npm run status -- cs-guide
status ncert                # Or: .\status ncert    | npm run status -- ncert
status bca                  # Or: .\status bca      | npm run status -- bca
status                      # Master dashboard of all repos

# 2. Auto-clone all missing repositories
repo clone                  # Automatically clones all missing repos from GitHub
repo clone <repo-name>      # Clone a specific repo

# 3. List or add new repositories
repo list                   # List all registered repositories & local paths
repo add <id> <git-url>     # Tell the manager a new repository
```

---



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
