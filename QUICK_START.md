# KOSHAI - Quick Start Guide

## 🚀 Deploy in 5 Steps

### 1. Set Environment Variables
Create `.env.local` in project root:
```
NEXT_PUBLIC_SUPABASE_URL=https://uttkxgxnshjnqvdalbqz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. Initialize Database
1. Go to [Supabase Console](https://app.supabase.com)
2. Open SQL Editor
3. Copy content from `lib/database.sql`
4. Paste and execute all statements
5. Wait for completion

### 3. Run Locally
```bash
npm install
npm run dev
```
Visit: http://localhost:3000

### 4. Test Features
- Sign up with email at `/auth`
- Create animal listing at `/marketplace/create`
- Create butcher service at `/butcher/create`
- Create qurbani listing at `/qurbani/create`
- View admin dashboard if using admin emails

### 5. Deploy to Vercel
```bash
vercel
```
Then add environment variables in Vercel dashboard.

---

## 📱 Key Features

| Feature | Details |
|---------|---------|
| **Animal Marketplace** | 1000 free, then 2% fee |
| **Butcher Services** | 100 free, then fee |
| **Number Reveal** | ৳150 BDT feature |
| **Qurbani** | 5-person shares |
| **Chat** | Real-time messaging |
| **Admin** | 2 whitelisted emails |

---

## 🎨 Design Tokens

- **Primary Color**: #DA291C (Red)
- **Background**: #FFFFFF (White)
- **Font**: Hind Siliguri (Bengali)
- **Accent**: #FF6B6B

---

## 👤 Admin Access

Only these emails have admin privileges:
1. `munimm247@gmail.com`
2. `munimhasibul10@gmail.com`

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `lib/database.sql` | Database schema |
| `README.md` | Full documentation |
| `BUILD_COMPLETE.md` | What was built |
| `DEPLOYMENT.md` | Deployment guide |
| `PROJECT_STATUS.md` | Technical details |

---

## ❓ Common Issues

### Build Fails
```bash
npm install
npm run build
```

### Database Errors
- Check SQL executed in Supabase console
- Verify RLS policies enabled
- Check service role key is set

### Auth Issues
- Verify SUPABASE_URL is correct
- Check ANON_KEY is set
- Clear browser cache and retry

---

## 📊 Project Stats

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **Database**: Supabase PostgreSQL
- **Auth**: Email-only
- **Components**: 30+
- **API Routes**: 6
- **Build Time**: ~4 seconds

---

## ✅ Pre-Launch Checklist

- [ ] Database schema imported
- [ ] Environment variables set
- [ ] Local build passes
- [ ] All pages accessible
- [ ] Forms submit correctly
- [ ] Auth flow works
- [ ] Chat loads
- [ ] Mobile responsive
- [ ] Deployed to Vercel
- [ ] Custom domain set up

---

**Ready to launch KOSHAI? Follow these steps and you're live in minutes!** 🎉
