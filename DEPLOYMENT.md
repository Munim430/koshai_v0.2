# KOSHAI Deployment Guide

## Pre-Deployment Checklist

### 1. Database Setup
- [ ] Execute `lib/database.sql` in Supabase SQL editor
- [ ] Verify all tables are created:
  - profiles
  - animal_listings
  - butcher_listings
  - qurbani_listings
  - qurbani_shares
  - chat_rooms
  - chat_messages
  - transactions
  - admin_approvals
  - listing_counters
- [ ] Verify RLS policies are active
- [ ] Verify functions and triggers are created

### 2. Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://uttkxgxnshjnqvdalbqz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=https://koshai.app
```

### 3. Admin Access Configuration
- [ ] Set admin emails in `lib/supabase.ts`:
  - munimm247@gmail.com
  - munimhasibul10@gmail.com
- [ ] Create test accounts with these emails in Supabase Auth

### 4. PWA Setup
- [ ] Generate icons (192px and 512px) → place in `public/`
- [ ] Update `app/manifest.ts` with correct URLs
- [ ] Verify service worker registration

### 5. Testing Checklist

#### Authentication Flow
```bash
# Test signup
- Create new account with email
- Verify email confirmation (if enabled)
- Sign in with credentials
- Verify user is in profiles table
```

#### Animal Marketplace
```bash
# Test listing creation
- Create 3 free listings (should not charge)
- Create 1001st listing (should calculate fee)
- Verify fee appears in transactions table
- View marketplace listings
- Search/filter listings
```

#### Butcher Services
```bash
# Test butcher listing
- Create butcher service (should be free)
- Verify "Number Reveal" available
- Test number reveal purchase (৳150)
- View butcher listings
```

#### Qurbani Sharing
```bash
# Test qurbani listing
- Create qurbani (5 shares hardcoded)
- Join share as different user
- Verify share reduction
- Test full booking (all 5 shares taken)
```

#### Admin Dashboard
```bash
# Test admin access
- Sign in with munimm247@gmail.com
- Verify admin dashboard visible
- Check pending approvals
- Test approval/rejection flow
```

#### Chat
```bash
# Test chat system
- Open chat widget
- Send message
- Verify message appears
```

#### PWA
```bash
# Test PWA features
- Visit on mobile
- Verify "Add to Home Screen" prompt
- Install app
- Test offline functionality
```

## Production Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

#### 1. Push to GitHub
```bash
git add .
git commit -m "Initial KOSHAI build"
git push origin main
```

#### 2. Connect to Vercel
```bash
vercel link
```

#### 3. Set Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

#### 4. Deploy
```bash
vercel --prod
```

#### 5. Configure Domain
- Add custom domain in Vercel dashboard
- Update DNS records
- Enable SSL/TLS

### Option 2: Self-Hosted (Docker)

#### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

#### 2. Build and Run
```bash
docker build -t koshai .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
  koshai
```

## Post-Deployment Verification

### 1. Health Checks
```bash
# Check homepage loads
curl https://koshai.app/

# Check API endpoints
curl https://koshai.app/api/listings/animals

# Check PWA manifest
curl https://koshai.app/manifest.json
```

### 2. Performance Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up Sentry for error tracking
- [ ] Monitor database performance
- [ ] Check image optimization

### 3. Security Verification
- [ ] HTTPS working
- [ ] CSP headers configured
- [ ] RLS policies active
- [ ] Admin emails verified
- [ ] No secrets in code/logs

### 4. Database Maintenance
```sql
-- Create regular backups
-- Monitor query performance
-- Archive old transactions
-- Clean up soft-deleted items
```

## Scaling Considerations

### 1. Database Optimization
- Add indexes for frequently searched columns
- Archive old chat messages
- Implement pagination for large result sets
- Use connection pooling

### 2. Caching Strategy
- Cache animal listings (5 min TTL)
- Cache butcher listings (5 min TTL)
- Real-time cache invalidation on new listings
- User profile caching (15 min TTL)

### 3. Image Optimization
- Compress images to max 800KB
- Use WebP format
- Implement lazy loading
- Use CDN for static assets

### 4. API Rate Limiting
```javascript
// Add rate limiting middleware
// Prevent spam listings
// Protect admin endpoints
// Limit message frequency
```

## Troubleshooting

### Database Connection Issues
```bash
# Verify connection
psql postgresql://user:pass@host/db -c "SELECT 1"

# Check Supabase status
# https://status.supabase.com
```

### Authentication Issues
- Check Supabase Auth settings
- Verify email confirmation settings
- Check OAuth provider config (if using)
- Review auth logs in Supabase dashboard

### PWA Issues
- Clear browser cache and service workers
- Verify manifest.json is valid
- Check service worker registration
- Test on different browsers

### Performance Issues
- Check database slow query logs
- Analyze API response times
- Review bundle size with `npm run build -- --analyze`
- Monitor server CPU/memory usage

## Maintenance

### Daily
- Monitor error logs (Sentry)
- Check database health
- Monitor API response times

### Weekly
- Review user feedback
- Check spam/abuse reports
- Backup database

### Monthly
- Security audit
- Performance review
- Update dependencies
- Database optimization

## Support & Escalation

For production issues:
1. Check error logs in Sentry
2. Review Supabase dashboard
3. Check Vercel deployment logs
4. Contact development team

---

**Last Updated**: May 2026
**Version**: 1.0.0
