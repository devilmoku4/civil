# Deployment & Hosting Guide – Luxury Civil Portfolio

## Recommended Hosting: Vercel (Best for Next.js)

**Why Vercel?**
- Official Next.js hosting platform (created by Next.js team)
- Automatic deployments from Git
- Free tier available
- Fast CDN & automatic optimization
- Environment variables & secrets management
- One-click rollbacks

### Step 1: Prepare Project for Deployment

Before deploying, run a production build locally to ensure no errors:
```bash
npm run build
npm start
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Fastest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow prompts (select framework: Next.js, confirm settings, deploy)

4. Your site will be live at: `https://your-project-name.vercel.app`

#### Option B: Deploy via Git (Recommended for Updates)

1. Push your project to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/luxury-civil-portfolio.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click "Add New" → "Project" → Select your repository

4. Vercel auto-detects Next.js settings. Click "Deploy"

5. Every push to `main` branch automatically redeploys

---

## Alternative Hosting Options

### 1. **Netlify** (Static/Hybrid)
- **Pros:** Easy GitHub integration, free tier, good CDN
- **Cons:** Requires adapter for Next.js server functions
- **Deploy:** Connect GitHub repo → auto-deploys

### 2. **AWS (Amplify / EC2)**
- **Pros:** Highly scalable, enterprise-grade
- **Cons:** More complex, pay-as-you-go pricing
- **Cost:** Varies

### 3. **DigitalOcean** (VPS/App Platform)
- **Pros:** Affordable, easy app deployment
- **Cons:** Requires some setup
- **Cost:** ~$5–12/month

### 4. **Google Cloud** (Cloud Run / App Engine)
- **Pros:** Scalable, integrates with Google services
- **Cons:** Complex dashboard
- **Cost:** Pay-as-you-go

### 5. **Heroku** (Deprecated free tier)
- **Note:** Free tier ended. Now costs money.

---

## Environment Variables (if needed)

If your project uses API keys or secrets:

1. Create a `.env.local` file in the root:
```
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_KEY=your_secret_here
```

2. In Vercel dashboard: Settings → Environment Variables → Add secrets

3. Re-deploy after adding secrets

---

## After Deployment

1. **Custom Domain:** 
   - Vercel: Project Settings → Domains → Add custom domain
   - Update DNS records with your domain provider

2. **Monitor Performance:**
   - Vercel Analytics
   - Check Core Web Vitals
   - Monitor build times

3. **Update Content:**
   - Edit `data/siteData.js` → commit → auto-redeploy
   - Add new images to `public/` → commit → auto-redeploy

---

## Build & Start Locally

Test production build before deploying:
```bash
npm run build
npm start
```

Visit: http://localhost:3000

---

## Quick Checklist Before Going Live

- [ ] Run `npm run build` successfully
- [ ] Test on http://localhost:3000 after build
- [ ] All images load correctly
- [ ] Testimonials display without errors
- [ ] Gallery loads all images
- [ ] Contact form works (if added)
- [ ] Mobile responsive (test on phone)
- [ ] SEO meta tags updated (optional: `app/layout.js`)

---

## QR Code

Once deployed, generate a QR code for your live URL:
- **Localhost (dev):** Use QR-server or qrcode.io and point to: `http://localhost:3000`
- **Production URL:** After deployment, use the live URL (e.g., `https://luxury-civil.vercel.app`)

**Online QR Code Generator:** https://qr-server.com/api/qr?size=300x300&data=YOUR_URL

---

## Support & Docs

- **Next.js Deployment Docs:** https://nextjs.org/docs/deployment
- **Vercel Docs:** https://vercel.com/docs
- **Git Guide:** https://github.com/git-tips/tips

