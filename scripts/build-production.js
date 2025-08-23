
#!/usr/bin/env node

// Production build script for InfinityFree deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building PDF Master Pro for InfinityFree deployment...\n');

// Clean previous build
console.log('1. Cleaning previous build...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}

// Build the project
console.log('2. Building React application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Copy .htaccess to dist
console.log('3. Copying .htaccess configuration...');
const htaccessSource = path.join('public', '.htaccess');
const htaccessDest = path.join('dist', '.htaccess');

if (fs.existsSync(htaccessSource)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('✅ .htaccess copied successfully');
} else {
  console.log('⚠️  .htaccess not found, creating basic configuration...');
  const basicHtaccess = `
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`;
  fs.writeFileSync(htaccessDest, basicHtaccess);
}

// Optimize files for InfinityFree
console.log('4. Optimizing for InfinityFree...');

// Update base path in index.html if needed
const indexPath = path.join('dist', 'index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Ensure relative paths work on InfinityFree
  indexContent = indexContent.replace(/href="\//g, 'href="./');
  indexContent = indexContent.replace(/src="\//g, 'src="./');
  
  fs.writeFileSync(indexPath, indexContent);
  console.log('✅ Updated asset paths for relative loading');
}

// Create deployment info
const deploymentInfo = {
  buildDate: new Date().toISOString(),
  version: '1.0.0',
  target: 'InfinityFree',
  features: [
    'Client-side PDF processing',
    'Automatic file cleanup (30 minutes)',
    'Progressive Web App support',
    'Optimized for shared hosting',
    'SEO friendly',
    'Mobile responsive'
  ]
};

fs.writeFileSync(
  path.join('dist', 'deployment-info.json'), 
  JSON.stringify(deploymentInfo, null, 2)
);

// Generate file list for deployment
const getFileList = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFileList(filePath, fileList);
    } else {
      fileList.push(path.relative('dist', filePath));
    }
  });
  return fileList;
};

const fileList = getFileList('dist');
fs.writeFileSync(
  path.join('dist', 'file-list.txt'),
  fileList.join('\n')
);

console.log('\n🎉 Build completed successfully!');
console.log(`📁 Total files: ${fileList.length}`);
console.log('📋 Ready for InfinityFree deployment');
console.log('\n📖 Deployment Instructions:');
console.log('1. Upload all files from /dist folder to your InfinityFree /htdocs directory');
console.log('2. Ensure index.html is in the root of /htdocs');
console.log('3. The .htaccess file will handle routing automatically');
console.log('4. Your site will be ready at your InfinityFree domain');
console.log('\n✨ Features included:');
deploymentInfo.features.forEach(feature => console.log(`   • ${feature}`));
