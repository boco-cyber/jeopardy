# Jeopardy Game - Server Deployment Guide

This is the server-ready version of the Jeopardy Game, split into separate HTML, CSS, and JavaScript files for professional deployment.

## File Structure

```
jeopardy-game/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── game.js         # All JavaScript code
├── .htaccess           # Apache server configuration
├── README.md           # This file
└── DEPLOYMENT.md       # Detailed deployment instructions
```

## Quick Start - Local Testing

1. **Simple HTTP Server (Python)**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

2. **Node.js HTTP Server**
```bash
npx http-server -p 8000
```

3. **PHP Built-in Server**
```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

## Deployment Options

### Option 1: Shared Hosting (cPanel, etc.)

1. Upload all files to your public_html or www directory
2. Access via your domain: `https://yourdomain.com`
3. The .htaccess file will handle configuration

**Recommended Hosts:**
- Bluehost
- SiteGround
- HostGator
- GoDaddy
- Namecheap

### Option 2: VPS/Cloud (DigitalOcean, AWS, etc.)

1. Set up a web server (Apache/Nginx)
2. Upload files to document root
3. Configure virtual host
4. Enable SSL with Let's Encrypt

### Option 3: Static Site Hosting

**GitHub Pages:**
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Access via: `https://username.github.io/jeopardy-game`

**Netlify:**
1. Drag and drop folder to Netlify
2. Get instant URL
3. Optional custom domain

**Vercel:**
1. Import from GitHub or upload
2. Auto-deploy on every push
3. Free SSL and CDN

### Option 4: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## Server Requirements

**Minimum:**
- Any web server (Apache, Nginx, IIS)
- No database required
- No server-side language required
- Static file hosting only

**Recommended:**
- SSL certificate (Let's Encrypt is free)
- PHP 7+ or Node.js (for advanced features if needed later)
- Good uptime (99.9%+)

## Configuration

### Apache (.htaccess included)
- Compression enabled
- Browser caching
- Security headers
- HTTPS redirect (commented out)

### Nginx
Create `/etc/nginx/sites-available/jeopardy`:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/jeopardy;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Caching
    location ~* \.(css|js)$ {
        expires 1M;
        add_header Cache-Control "public";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-apache

# Get certificate
sudo certbot --apache -d yourdomain.com

# Auto-renewal is set up automatically
```

## Performance Optimization

### 1. Enable Compression
Already configured in .htaccess for Apache

### 2. Use CDN (Optional)
For external libraries, we already use:
- Google Fonts
- CDN for SheetJS (Excel library)

### 3. Minify Files (Optional)
For production, you can minify CSS and JS:

```bash
# Install minifiers
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o css/styles.min.css css/styles.css

# Minify JS
uglifyjs js/game.js -o js/game.min.js

# Update index.html to reference .min files
```

## Security Considerations

1. **HTTPS is highly recommended** for production
2. **Content Security Policy** (optional, advanced)
3. **Regular backups** of your files
4. **Keep external dependencies updated** (SheetJS CDN)

## Monitoring & Analytics

### Add Google Analytics (Optional)

Add before `</head>` in index.html:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

**Issue: Files not loading**
- Check file paths are correct
- Ensure file permissions (644 for files, 755 for directories)
- Check browser console for errors

**Issue: Excel import not working**
- Verify SheetJS CDN is accessible
- Check browser compatibility
- Ensure HTTPS if serving over SSL

**Issue: .htaccess not working**
- Ensure mod_rewrite is enabled on Apache
- Check Apache configuration allows .htaccess override
- Verify file is named exactly ".htaccess" (with the dot)

## Custom Domain Setup

1. Purchase domain from registrar
2. Update DNS records to point to your server
3. Wait for DNS propagation (up to 48 hours)
4. Configure virtual host on server
5. Add SSL certificate

## Backup Strategy

```bash
# Create backup
tar -czf jeopardy-backup-$(date +%Y%m%d).tar.gz /path/to/jeopardy

# Restore from backup
tar -xzf jeopardy-backup-20260108.tar.gz -C /path/to/restore
```

## Support & Updates

- Keep this README with your deployment
- Test thoroughly before production launch
- Monitor error logs regularly
- Keep backups of working versions

## License

Free to use for personal, educational, and commercial purposes.

---

**Need help?** Check the main README.md or consult your hosting provider's documentation.
