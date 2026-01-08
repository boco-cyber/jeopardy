# How to Upload to GitHub

## Method 1: Using GitHub Web Interface (Easiest)

### Step 1: Create a New Repository
1. Go to https://github.com
2. Click the "+" icon (top right) → "New repository"
3. Repository name: `jeopardy-game` (or any name you like)
4. Description: "Customizable Jeopardy game with Excel import, timer, and scoring"
5. Choose "Public" or "Private"
6. **Don't** initialize with README (we already have one)
7. Click "Create repository"

### Step 2: Upload Files
1. On the new repository page, click "uploading an existing file"
2. Drag and drop these files:
   - `jeopardy.html`
   - `README.md`
   - `EXCEL_TEMPLATE_GUIDE.md`
   - `.gitignore`
3. Add commit message: "Initial commit"
4. Click "Commit changes"

✅ Done! Your repository is live!

---

## Method 2: Using Git Command Line

### Prerequisites
- Git installed on your computer
- GitHub account

### Step 1: Create Repository on GitHub
1. Go to https://github.com
2. Click "+" → "New repository"
3. Name: `jeopardy-game`
4. Don't initialize with README
5. Click "Create repository"
6. **Copy the repository URL** (looks like: `https://github.com/username/jeopardy-game.git`)

### Step 2: Clone the Bundle
```bash
# Navigate to where you want the project
cd ~/Documents

# Clone from the bundle file
git clone jeopardy-game.bundle jeopardy-game

# Navigate into the directory
cd jeopardy-game
```

### Step 3: Push to GitHub
```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/jeopardy-game.git

# Push to GitHub
git push -u origin master
```

✅ Done! Your repository is live!

---

## Method 3: GitHub Desktop (User-Friendly)

### Step 1: Download Files
- Download all files from this output folder

### Step 2: Create Repository
1. Open GitHub Desktop
2. File → New Repository
3. Name: `jeopardy-game`
4. Choose location
5. Click "Create Repository"

### Step 3: Add Files
1. Copy `jeopardy.html`, `README.md`, `EXCEL_TEMPLATE_GUIDE.md`, and `.gitignore` into the repository folder
2. Files will appear in GitHub Desktop
3. Add commit message: "Initial commit"
4. Click "Commit to master"

### Step 4: Publish
1. Click "Publish repository" 
2. Choose public or private
3. Click "Publish"

✅ Done! Your repository is live!

---

## After Upload: Enable GitHub Pages (Optional)

To make your game playable directly from GitHub:

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll to "Pages" section (left sidebar)
4. Under "Source", select "master" branch
5. Click "Save"
6. Wait a minute, then visit: `https://YOUR_USERNAME.github.io/jeopardy-game/jeopardy.html`

Now anyone can play your game without downloading! 🎮

---

## Your Repository URL

After uploading, your repository will be at:
```
https://github.com/YOUR_USERNAME/jeopardy-game
```

Share this link with others to let them:
- ⭐ Star the repository
- 🍴 Fork it to make their own version
- 📥 Download the game
- 🐛 Report issues
- 💡 Suggest improvements

---

## Files Included

- `jeopardy.html` - The complete game (39KB)
- `README.md` - Full documentation
- `EXCEL_TEMPLATE_GUIDE.md` - How to create question files
- `.gitignore` - Git ignore file
- `jeopardy-game.bundle` - Git bundle (for Method 2)

---

## Need Help?

- **GitHub guides**: https://guides.github.com/
- **Git documentation**: https://git-scm.com/doc
- **Markdown guide**: https://guides.github.com/features/mastering-markdown/

Happy gaming! 🎉
