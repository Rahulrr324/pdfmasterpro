
# Deployment Guide for InfinityFree

This guide will help you deploy PdfMaster Pro to InfinityFree hosting.

## Prerequisites

1. **InfinityFree Account**: Sign up at [infinityfree.net](https://infinityfree.net)
2. **Node.js**: Ensure you have Node.js installed locally
3. **Built Project**: Run the build command before deployment

## Build Process

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build for Production**:
   ```bash
   npm run build
   ```

3. **Verify Build**: Check that `/dist` folder is created with all assets

## File Structure After Build

```
dist/
├── index.html          # Main entry point
├── assets/            # CSS, JS, and other assets
│   ├── index.[hash].css
│   ├── index.[hash].js
│   └── [other assets]
├── sitemap.xml        # SEO sitemap
└── robots.txt         # Search engine instructions
```

## InfinityFree Deployment Steps

### Method 1: File Manager (Recommended for beginners)

1. **Login to InfinityFree Control Panel**
2. **Access File Manager**:
   - Go to "Files" → "File Manager"
   - Navigate to `/htdocs` folder

3. **Upload Files**:
   - Select all files from your `/dist` folder
   - Upload them to `/htdocs`
   - Ensure `index.html` is in the root of `/htdocs`

4. **Set Permissions** (if needed):
   - All files should have 644 permissions
   - Folders should have 755 permissions

### Method 2: FTP Upload

1. **Get FTP Credentials**:
   - In your InfinityFree control panel
   - Go to "Files" → "FTP Accounts"
   - Note the server, username, and password

2. **Upload via FTP Client**:
   - Use FileZilla or similar FTP client
   - Connect to your InfinityFree server
   - Upload all `/dist` contents to `/htdocs`

## Important Configuration for InfinityFree

### .htaccess File (Create in /htdocs)

Create a `.htaccess` file in your `/htdocs` directory:

```apache
# Enable GZIP compression
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

# Cache control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Single Page Application routing
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</iFModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
```

## Post-Deployment Verification

1. **Test Basic Functionality**:
   - Visit your domain
   - Check if the homepage loads correctly
   - Test navigation between pages

2. **Test PDF Tools**:
   - Upload a test PDF file
   - Try merging, splitting, or other operations
   - Verify file downloads work correctly

3. **Mobile Responsiveness**:
   - Test on different screen sizes
   - Ensure all features work on mobile

4. **Performance Check**:
   - Use Google PageSpeed Insights
   - Verify loading times are acceptable

## Troubleshooting

### Common Issues:

1. **404 Errors on Routes**:
   - Ensure `.htaccess` file is properly configured
   - Check that all routes redirect to `index.html`

2. **Files Not Loading**:
   - Verify file permissions (644 for files, 755 for folders)
   - Check that all assets are uploaded correctly

3. **Large File Upload Issues**:
   - InfinityFree has file size limits
   - PDF processing is done client-side, so server limits shouldn't affect functionality

4. **Slow Loading**:
   - Enable GZIP compression in `.htaccess`
   - Optimize images and assets

## Domain Configuration

1. **Free Subdomain**: Your site will be available at `yourdomain.rf.gd` or similar
2. **Custom Domain**: You can point your own domain to InfinityFree servers
3. **SSL Certificate**: InfinityFree provides free SSL certificates

## Maintenance

1. **Regular Updates**: Keep dependencies updated
2. **Backup**: Regularly backup your files
3. **Monitoring**: Check site performance periodically

## Support

- **InfinityFree Forums**: [forum.infinityfree.net](https://forum.infinityfree.net)
- **Documentation**: [docs.infinityfree.net](https://docs.infinityfree.net)

## Notes

- All PDF processing happens in the browser (client-side)
- No server-side PHP processing is required for basic functionality
- The app is fully static and works well with InfinityFree's limitations
- Consider upgrading to premium hosting for better performance if needed

---

**Deployment Checklist:**
- [ ] Project built successfully
- [ ] All files uploaded to `/htdocs`
- [ ] `.htaccess` file configured
- [ ] Site accessible via domain
- [ ] All tools tested and working
- [ ] Mobile compatibility verified
- [ ] Performance optimized
