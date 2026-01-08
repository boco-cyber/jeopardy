# Excel Template Guide

## How to Create Your Question File

### Basic Structure

Your Excel file should have this format:

```
Row 1: [Points] [Category 1] [Category 2] [Category 3] ...
Row 2: [200]    [Question 1]  [Question 1]  [Question 1]  ...
Row 3: [empty]  [Answer 1]    [Answer 1]    [Answer 1]    ...
Row 4: [400]    [Question 2]  [Question 2]  [Question 2]  ...
Row 5: [empty]  [Answer 2]    [Answer 2]    [Answer 2]    ...
...
```

### Detailed Instructions

1. **First Row (Headers)**
   - Cell A1: "Points" (or leave empty)
   - Cells B1, C1, D1, etc.: Your category names

2. **Point Values (Column A)**
   - Row 2: 200
   - Row 4: 400
   - Row 6: 600
   - Row 8: 800
   - Row 10: 1000
   - Continue with higher values if needed

3. **Questions (Even Rows)**
   - Rows 2, 4, 6, 8, 10, etc.
   - Each cell contains a question for that category

4. **Answers (Odd Rows after 1)**
   - Rows 3, 5, 7, 9, 11, etc.
   - Each cell contains the answer to the question above it
   - Leave Column A empty for answer rows

### Example

```
| Points | Science        | History            | Geography      |
|--------|----------------|--------------------|----------------|
| 200    | Chemical symbol for gold | First US President | Largest ocean |
|        | What is Au?    | Who is George Washington? | What is Pacific? |
| 400    | Planet closest to Sun | Year WWII ended | Capital of France |
|        | What is Mercury? | What is 1945? | What is Paris? |
```

### Tips

- **Keep it short**: Questions should fit on screen
- **Answer format**: Use "What is..." or "Who is..." format for authenticity
- **Point values**: Can be anything (200, 400, 600 or 100, 200, 300)
- **Categories**: Can have spaces and special characters
- **Number of items**: Match your board size settings

### Common Mistakes to Avoid

❌ **Don't skip rows** - Each question must have an answer row immediately after
❌ **Don't merge cells** - Keep all cells separate
❌ **Don't use formulas** - Plain text only
❌ **Don't leave point values empty** - Every question row needs a value

### Using the Template

1. Click "Download Template" in the setup screen
2. Open the file in Excel/Google Sheets/LibreOffice
3. Replace sample data with your questions
4. Save the file
5. Upload in the game setup

That's it! Your custom Jeopardy game is ready to play!
