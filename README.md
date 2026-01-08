# Jeopardy Game Application

A fully-featured, customizable Jeopardy-style game built with HTML, CSS, and JavaScript. Perfect for church groups, classrooms, trivia nights, or any educational setting!

![Jeopardy Game](screenshot.png)
please enjoy the game on this link , just upload your questions !
https://boco-cyber.github.io/jeopardy/

## Features

### 🎮 Core Gameplay
- **Classic Jeopardy board** with authentic blue and gold styling
- Click any question to reveal it in a modal
- Show/hide answers with a button
- Award points to teams (correct or incorrect)
- Real-time score tracking
- Questions are grayed out once answered

### ⚙️ Customization Options
- **Custom game title** - Change "JEOPARDY!" to anything you want
- **Flexible team setup** - 1-8 teams with custom names
- **Adjustable board size** - Choose number of rows (questions per category) and columns (categories)
- **Excel import** - Load your own questions from an Excel file
- **Built-in sample questions** - Start playing immediately without preparation

### ⏱️ Timer Feature
- Optional countdown timer for each question
- Customizable duration (5-300 seconds)
- Visual countdown with color coding:
  - **Gold**: Normal time
  - **Orange**: Warning (≤10 seconds)
  - **Red + Pulsing**: Danger (≤5 seconds)
- Displays "TIME'S UP!" when timer reaches zero

### 💯 Score Management
- **Automatic scoring** - Award points by clicking team buttons
- **Manual adjustments** - Add or subtract points manually
  - Quick buttons: +100 / -100
  - Custom input: Enter any amount
- Scores update in real-time

## Getting Started

### Quick Start
1. Download `jeopardy.html`
2. Open it in any modern web browser
3. Configure your game settings
4. Click "Start Game"

That's it! No installation or server required.

## How to Use

### Setup Screen

1. **Game Title** (Optional)
   - Enter a custom title or keep "JEOPARDY!"

2. **Number of Teams**
   - Choose 1-8 teams
   - Enter custom names for each team

3. **Board Configuration**
   - Rows: Number of questions per category (1-15)
   - Columns: Number of categories (1-12)

4. **Timer** (Optional)
   - Check "Enable Timer" to activate countdown
   - Set seconds per question

5. **Questions**
   - Upload Excel file with your questions
   - Or use built-in sample questions

### Excel Format

Create an Excel file (`.xlsx` or `.xls`) with this structure:

| Points | Category 1 | Category 2 | Category 3 | ... |
|--------|-----------|-----------|-----------|-----|
| 200    | Question 1 for Cat 1 | Question 1 for Cat 2 | Question 1 for Cat 3 | ... |
|        | Answer 1 for Cat 1 | Answer 1 for Cat 2 | Answer 1 for Cat 3 | ... |
| 400    | Question 2 for Cat 1 | Question 2 for Cat 2 | Question 2 for Cat 3 | ... |
|        | Answer 2 for Cat 1 | Answer 2 for Cat 2 | Answer 2 for Cat 3 | ... |

**Important:**
- Row 1: Category names (skip first cell or put "Points")
- Column A: Point values (200, 400, 600, etc.)
- Questions and answers alternate rows
- Each question is immediately followed by its answer

**Download the template:**
Click "Download Template" button in the setup screen to get a pre-formatted Excel file.

### Playing the Game

1. **Select a Question**
   - Click any dollar amount on the board
   - Question appears in a modal

2. **Timer** (if enabled)
   - Countdown starts automatically
   - Changes color as time runs low

3. **Show Answer**
   - Click "Show Answer" when ready
   - Answer appears below the question

4. **Award Points**
   - Click a team name to award full points (correct answer)
   - Click team name with ✗ to deduct points (incorrect answer)
   - Question is marked as answered

5. **Manual Score Adjustment**
   - Use +100/-100 quick buttons
   - Or enter custom amount and click "Apply"

6. **Continue Playing**
   - Click more questions
   - Monitor scores in real-time
   - Click "New Game" to start over

## Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Technical Details

- **File size:** ~30KB (single HTML file)
- **Dependencies:** SheetJS (loaded from CDN for Excel import)
- **Storage:** No data persistence - runs entirely in browser memory
- **Offline:** Works offline after first load (if CDN is cached)

## Customization

The game is a single HTML file that you can easily customize:

### Colors
Search for color codes and replace:
- `#0000a0` - Main blue background
- `#ffcc00` - Gold/yellow text and borders
- `#1a1a60` - Category cell background

### Fonts
Currently uses Google Fonts:
- **Oswald** - Main game font
Change the `@import` URL at the top of the CSS section

### Point Values
Modify the point calculation in the Excel import or sample data sections

## Use Cases

- 🏛️ Church education and youth groups
- 🎓 Classroom review games
- 🎉 Trivia nights and parties
- 👨‍👩‍👧‍👦 Family game nights
- 📚 Study groups and test prep
- 🏢 Corporate training and team building

## Sample Question Topics

The built-in sample questions cover:
- Science
- History  
- Geography
- Literature
- Pop Culture
- Sports

Upload your own Excel file for any topic!

## Troubleshooting

**Questions not loading from Excel:**
- Ensure file format matches the template
- Check that questions and answers are on alternating rows
- Verify point values are in column A

**Timer not showing:**
- Make sure "Enable Timer" is checked
- Open browser console (F12) to check for errors
- Refresh the page and try again

**Board layout issues:**
- Try refreshing the page
- Check browser zoom level (100% recommended)
- Ensure you're using a modern browser

## License

Free to use for personal, educational, and commercial purposes.

## Credits

Created with ❤️ for interactive learning and fun!

## Support

For issues or questions:
1. Check the troubleshooting section
2. Open browser console (F12) for error messages
3. Create an issue on GitHub

---

**Enjoy your Jeopardy game! 🎮✨**
