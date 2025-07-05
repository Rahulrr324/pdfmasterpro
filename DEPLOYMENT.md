
# PDFTools Pro - Deployment Guide for InfinityFree

## Pre-Deployment Checklist

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Test the build locally:**
   ```bash
   npm run preview
   ```

## InfinityFree Deployment Steps

### Step 1: Prepare Files
1. After running `npm run build`, you'll get a `dist` folder
2. The `dist` folder contains all files needed for deployment

### Step 2: Upload to InfinityFree
1. Login to your InfinityFree control panel
2. Go to File Manager
3. Navigate to `htdocs` folder (or your domain's public folder)
4. Upload ALL contents of the `dist` folder (not the folder itself)

### Step 3: Configure .htaccess (Important!)
Create a `.htaccess` file in your domain's root with this content:

```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/icon "access plus 1 year"
    ExpiresByType text/plain "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
</IfModule>

# Handle React Router (SPA)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
```

### Step 4: Verify Deployment
1. Visit your domain
2. Test all PDF tools functionality
3. Check that routing works (try navigating to /tool/merge-pdf directly)

## Performance Optimizations Already Included

- ✅ Code splitting for optimal loading
- ✅ Asset compression and minification
- ✅ Local PDF processing (no server required)
- ✅ Responsive design for all devices
- ✅ SEO optimization with meta tags
- ✅ Progressive loading of components

## Troubleshooting

### Common Issues:

1. **Blank page after deployment:**
   - Check if `.htaccess` is properly configured
   - Ensure all files from `dist` were uploaded

2. **Routes not working:**
   - Verify `.htaccess` rewrite rules are active
   - Check if mod_rewrite is enabled on your hosting

3. **Assets not loading:**
   - Confirm the `base: './'` setting in vite.config.ts
   - Check file permissions (should be 644 for files, 755 for folders)

### InfinityFree Specific Notes:
- InfinityFree supports static HTML/CSS/JS hosting perfectly
- No server-side processing needed (our PDF tools work client-side)
- Free SSL certificates available through InfinityFree
- Custom domain support available

## Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] All tool pages accessible
- [ ] PDF processing works (test merge, split, protect, compress)
- [ ] Mobile responsiveness verified
- [ ] Dark/light mode toggle works
- [ ] SEO meta tags present (check page source)

Your Tony Stark-level PDF processing platform is now live! 🚀
