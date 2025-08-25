
# PDFMasterPro - Build & Deployment Guide

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build:production
npm run preview
```

## 📦 Build Configuration

### Available Scripts
- `npm run dev` - Development server
- `npm run build` - Standard build
- `npm run build:production` - Optimized production build for InfinityFree
- `npm run preview` - Preview production build
- `npm run lint` - ESLint check

### Production Build Features
- ✅ Gzip compression
- ✅ Asset optimization
- ✅ Relative paths for static hosting
- ✅ Service worker for offline capability
- ✅ PWA manifest
- ✅ SEO optimization
- ✅ Automatic file cleanup

## 🌐 Deployment Options

### 1. InfinityFree (Recommended for Free Hosting)
```bash
# Build for production
npm run build:production

# Upload /dist contents to /htdocs folder
# Files include: index.html, assets/, .htaccess, manifest.json, sw.js
```

### 2. Netlify
```bash
npm run build:production
# Upload /dist folder or connect to Git
```

### 3. Vercel
```bash
npm run build:production
# Upload /dist folder or deploy via CLI
```

### 4. Static File Server
```bash
npm run build:production
# Serve /dist folder with any static server
```

## 📋 Pre-deployment Checklist

- [ ] Run `npm run build:production` successfully
- [ ] Test with `npm run preview`
- [ ] Check Lighthouse scores (should be 90+)
- [ ] Verify PWA installation
- [ ] Test offline functionality
- [ ] Verify all PDF tools work
- [ ] Check mobile responsiveness
- [ ] Test file cleanup (30min timeout)

## 🔧 Configuration

### Environment Variables (Optional)
Create `.env.local` for custom configuration:
```env
VITE_APP_NAME=PDFMasterPro
VITE_API_URL=https://your-api.com
```

### Service Worker
- Caches static assets for offline use
- Network-first strategy for dynamic content
- Auto-updates when new version deployed

### File Cleanup
- Automatic cleanup after 30 minutes
- Browser storage cleared on page unload
- No server storage required

## 🎯 Performance Optimizations

- Code splitting with React.lazy()
- Tree shaking for unused code
- Image optimization
- Gzip compression
- Browser caching headers
- Preload critical resources
- Minimal bundle size

## 📱 PWA Features

- Install prompt on mobile/desktop
- Offline functionality
- App-like experience
- Custom splash screen
- 192x192 and 512x512 icons

## 🔒 Security

- CSP headers in .htaccess
- XSS protection
- No external dependencies for PDF processing
- Client-side only (no server uploads)
- Automatic file cleanup

## 📊 Analytics Setup (Optional)

Add Google Analytics to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🐛 Troubleshooting

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist && npm run build:production`

### Deployment Issues
- Check file paths are relative (no leading /)
- Verify .htaccess is uploaded
- Check browser console for errors

### Performance Issues
- Use Lighthouse for analysis
- Check Network tab for large assets
- Verify service worker registration

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Test in incognito mode
3. Verify all files are uploaded correctly
4. Check .htaccess configuration
