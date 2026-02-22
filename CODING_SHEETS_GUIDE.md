# Coding Sheets - Problem Sets Structure 📋

## Overview
This document explains how the coding sheets problem system works and how to add all problems from the various sheets.

## Current Implementation

### ✅ Completed Features
1. **Code Editor Integration** - Built-in Monaco Editor (VS Code's editor)
   - Multi-language support (JavaScript, Python, Java, C++)
   - Syntax highlighting and IntelliSense
   - Code execution for JavaScript
   - Theme selection (Dark, Light, High Contrast)

2. **Problem Structure** - Each problem includes:
   - Title, difficulty, completion status
   - Platform (LeetCode, GeeksforGeeks, CodeChef, etc.)
   - Direct link to original problem
   - Language preference
   - Optional: description, examples, constraints

3. **Responsive UI** - Works on all devices with adaptive layouts

## Problem Data Structure

### Location
- Main data: `frontend/src/data/problemSets.js`
- Currently embedded in: `frontend/src/pages/CodingSheets.jsx` (in `problemSets` object)

### Format
```javascript
{
  'sheet-id': [
    {
      name: 'Category Name',
      problems: [
        {
          id: 1,
          title: 'Problem Title',
          difficulty: 'easy' | 'medium' | 'hard',
          completed: true | false,
          platform: 'leetcode' | 'gfg' | 'codechef' | etc.,
          link: 'https://...',
          language: 'javascript' | 'python' | 'java' | 'cpp',
          description: 'Optional problem description',
          examples: [{ input: '', output: '', explanation: '' }],
          constraints: ['constraint 1', 'constraint 2'],
          starterCode: 'Optional starter code template'
        }
      ]
    }
  ]
}
```

## Adding All Problems

### Method 1: Manual Addition (Current)
Currently, sample problems are added for demonstration. To add ALL problems:

1. **Striver's SDE Sheet** (191 problems)
   - Source: https://takeuforward.org/dsa/strivers-sde-sheet-top-coding-interview-problems
   - Structure: 24 categories (Arrays, Linked List, Binary Search, etc.)
   
2. **Striver's A2Z DSA** (455 problems)
   - Source: https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z
   - Structure: 16 major sections
   
3. **Neetcode 150** (150 problems)
   - Source: https://codolio.com/question-tracker/sheet/neetcode-150
   - Structure: 18 categories
   
4. **Blind 75** (75 problems)
   - Source: https://takeuforward.org/dsa/blind-75-leetcode-problems-detailed-video-solutions
   - Structure: 10 core categories
   
5. **Love Babbar Sheet** (430 problems)
   - Source: https://codolio.com/question-tracker/sheet/love-babbar-sheet
   - Structure: 15 categories
   
6. **Rising Brain DSA Sheet** (300 problems)
   - Source: https://www.risingbrain.org/sheet
   - Structure: Pattern-wise organization
   
7. **TUF CP Sheet** (250 problems)
   - Source: https://takeuforward.org/competitive-programming/strivers-cp-sheet
   - Structure: 10 advanced topics
   
8. **Striver 79 Sheet** (79 problems)
   - Source: https://takeuforward.org/dsa/strivers-79-last-moment-dsa-sheet-ace-interviews
   - Structure: Quick revision categories
   
9. **Top Interview 150** (150 problems)
   - Source: https://codolio.com/question-tracker/sheet/top-interview-150-leetcode
   - Structure: 13 essential categories

### Method 2: API Integration (Recommended for Scale)

For 2000+ problems, consider:

```javascript
// Create API endpoints
// GET /api/sheets/:sheetId/problems
// Returns paginated problem list

// Frontend implementation:
useEffect(() => {
  const fetchProblems = async () => {
    const response = await fetch(`/api/sheets/${viewingSheet}/problems`);
    const data = await response.json();
    setCurrentProblems(data);
  };
  
  if (viewingSheet) {
    fetchProblems();
  }
}, [viewingSheet]);
```

### Method 3: JSON Files (Good Balance)

Create individual JSON files per sheet:

```
frontend/
  src/
    data/
      problems/
        striver-sde.json         (191 problems)
        striver-a2z.json         (455 problems)
        neetcode-150.json        (150 problems)
        blind-75.json            (75 problems)
        love-babbar.json         (430 problems)
        raising-minds.json       (300 problems)
        tuf-cp-sheet.json        (250 problems)
        striver-79.json          (79 problems)
        top-interview-150.json   (150 problems)
```

Then import dynamically:

```javascript
const loadProblems = async (sheetId) => {
  const module = await import(`../data/problems/${sheetId}.json`);
  return module.default;
};
```

## Web Scraping Approach (For Complete Data)

To get ALL problems programmatically:

```javascript
// Example scraper (Node.js)
const puppeteer = require('puppeteer');

async function scrapeSheet(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  const problems = await page.evaluate(() => {
    // Extract problem data from DOM
    const problemElements = document.querySelectorAll('.problem-item');
    return Array.from(problemElements).map(el => ({
      title: el.querySelector('.title')?.textContent,
      difficulty: el.querySelector('.difficulty')?.textContent,
      link: el.querySelector('a')?.href,
      // ... extract other data
    }));
  });
  
  await browser.close();
  return problems;
}
```

## CS Fundamentals Sheets

### Operating Systems (90 questions)
- Source: https://takeuforward.org/operating-system/most-asked-operating-system-interview-questions
- Topics: Process Management, Memory, Scheduling, Deadlocks, File Systems

### Computer Networks (85 questions)
- Source: https://takeuforward.org/computer-network/most-asked-computer-networks-interview-questions
- Topics: OSI Model, TCP/IP, Protocols, Security

### DBMS (100 questions)
- Source: https://takeuforward.org/dbms/most-asked-dbms-interview-questions
- Topics: SQL, Normalization, Transactions, Indexing

### System Design (60 questions)
- Source: https://takeuforward.org/system-design/complete-system-design-roadmap-with-videos-for-sdes
- Topics: Scalability, Load Balancing, Caching, Microservices

## Next Steps

### Immediate (to add all problems):
1. Visit each source URL
2. Copy problem titles, difficulties, and links
3. Format according to the structure above
4. Add to appropriate sheet in `problemSets` object

### Long-term (for scalability):
1. Set up database schema for problems
2. Create API endpoints
3. Implement pagination
4. Add problem filtering and search
5. Cache frequently accessed data

### Enhancement Ideas:
1. **Progress Tracking** - Save completed problems to backend
2. **Problem Notes** - Let users add notes per problem
3. **Discussion Forum** - Per-problem discussions
4. **Solution Videos** - Embed video tutorials
5. **Code Submission** - Submit and validate solutions
6. **Leaderboard** - Track solving speed and accuracy
7. **Daily Challenge** - Recommend daily problems
8. **Spaced Repetition** - Resurface problems for review

## Code Editor Features

### Current:
- ✅ Syntax highlighting
- ✅ Multiple languages (JS, Python, Java, C++)
- ✅ Theme switching
- ✅ Code execution (JavaScript)
- ✅ Problem description panel
- ✅ Output display
- ✅ Code reset
- ✅ Copy to clipboard

### Future Enhancements:
- [ ] Test case execution
- [ ] Code submission to judges
- [ ] Performance metrics
- [ ] Code analysis and suggestions
- [ ] Collaborative coding
- [ ] Code snippets library
- [ ] Auto-save drafts
- [ ] Multiple test file tabs

## Contributing

To add more problems:
1. Fork the repository
2. Add problems to the appropriate sheet
3. Test with the code editor
4. Submit pull request

## Resources

- LeetCode API: Unofficial scrapers available
- GeeksforGeeks: Web scraping required
- Codolio: Check for public API
- TakeUforward: Web scraping or manual entry

---

**Note**: This is a learning platform. Always respect the original problem sources and give proper attribution.
