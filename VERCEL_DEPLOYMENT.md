# Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git push -u origin main
   ```

2. **Go to Vercel:**
   - Visit https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository: `NAYANSURYAVANSHI/nayan-portfolio`

3. **Configure the Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `prisma generate && next build` (auto-configured)
   - **Output Directory:** `.next` (auto-configured)
   - **Install Command:** `npm install` (auto-configured)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   
   **For SQLite (Development/Testing):**
   ```
   DATABASE_URL=file:./dev.db
   ```
   
   **For PostgreSQL (Production - Recommended):**
   ```
   DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
   ```
   
   > **Note:** For production, you should use a hosted PostgreSQL database like:
   > - Vercel Postgres
   > - Neon
   > - Supabase
   > - Railway
   > - PlanetScale

5. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete (~2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `nayan-portfolio`
   - Directory? `./`
   - Override settings? **N**

4. **Add Environment Variables:**
   ```bash
   vercel env add DATABASE_URL
   ```
   Enter your database URL when prompted.

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

---

## 🗄️ Database Setup for Production

### Option A: Vercel Postgres (Easiest)

1. Go to your Vercel project dashboard
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Copy the `DATABASE_URL` connection string
5. Add it to your environment variables
6. Run migrations:
   ```bash
   # Install Vercel CLI if not already
   npm install -g vercel
   
   # Pull environment variables
   vercel env pull .env.local
   
   # Run migrations
   npx prisma migrate deploy
   
   # Seed the database
   curl -X POST https://your-project.vercel.app/api/seed
   ```

### Option B: Neon (Free PostgreSQL)

1. Go to https://neon.tech
2. Create a free account
3. Create a new project
4. Copy the connection string
5. Update your Vercel environment variables with the Neon `DATABASE_URL`
6. Redeploy your project

### Option C: Supabase (Free PostgreSQL)

1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (use "Connection pooling" for better performance)
5. Update your Vercel environment variables
6. Redeploy your project

---

## 📝 Post-Deployment Steps

1. **Seed the Database:**
   After deployment, seed your database:
   ```bash
   curl -X POST https://your-project.vercel.app/api/seed
   ```

2. **Verify Deployment:**
   - Visit your deployed URL
   - Check that all sections load correctly
   - Test the command overlay (Ctrl+K)
   - Verify database data is displayed

3. **Set Custom Domain (Optional):**
   - Go to your Vercel project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

---

## 🔧 Troubleshooting

### Build Fails with Prisma Error
**Solution:** Make sure `postinstall` script is in package.json:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Database Connection Error
**Solution:** 
1. Check your `DATABASE_URL` environment variable
2. Make sure it's set in Vercel dashboard
3. For PostgreSQL, ensure the database is accessible from Vercel's servers

### Missing Data After Deployment
**Solution:** Run the seed endpoint:
```bash
curl -X POST https://your-project.vercel.app/api/seed
```

### Environment Variables Not Working
**Solution:**
1. Go to Vercel dashboard → Settings → Environment Variables
2. Make sure variables are set for "Production" environment
3. Redeploy the project after adding variables

---

## 🎯 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and linked to GitHub repo
- [ ] Environment variables configured (DATABASE_URL)
- [ ] Build completed successfully
- [ ] Database seeded with initial data
- [ ] Site loads correctly at Vercel URL
- [ ] All sections display data properly
- [ ] Command overlay works (Ctrl+K)
- [ ] Responsive design verified on mobile

---

## 📊 Vercel Configuration Files

### vercel.json
```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install"
}
```

### package.json (scripts)
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Prisma Deployment:** https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel
- **Next.js on Vercel:** https://nextjs.org/docs/deployment

---

## 🎉 Your Site Will Be Live At:

```
https://nayan-portfolio.vercel.app
```

Or your custom domain once configured!
