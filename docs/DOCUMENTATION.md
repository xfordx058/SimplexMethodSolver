# SimplexSolver - Complete Code Documentation

## Table of Contents
1. [High-Level Overview](#high-level-overview)
2. [Project Architecture](#project-architecture)
3. [File Structure & Modules](#file-structure--modules)
4. [Core Components](#core-components)
5. [Functionality Guide](#functionality-guide)
6. [Step-by-Step Execution Flow](#step-by-step-execution-flow)
7. [Algorithm Explanation](#algorithm-explanation)
8. [Beginner-Friendly Code Walkthroughs](#beginner-friendly-code-walkthroughs)
9. [Improvements & Future Enhancements](#improvements--future-enhancements)

---

## High-Level Overview

**SimplexSolver** is an interactive, web-based educational tool for solving linear programming (LP) problems using the **Simplex Method**. Developed for the University of Eastern Philippines (UEP), it provides students, instructors, and researchers with a visual, step-by-step walkthrough of the Simplex algorithm.

### Key Features
- ✅ Real-time Simplex tableau generation and pivoting
- ✅ Step-by-step visualization of all iterations
- ✅ Automatic pivot element detection and highlighting
- ✅ Dark/Light theme toggle with persistent storage
- ✅ Responsive glassmorphism UI design
- ✅ Offline-capable (no backend required)
- ✅ Solution validation with constraint checking
- ✅ Educational modules and downloadable notes

### Target Users
- Students learning linear programming
- Instructors teaching operations research
- Researchers validating LP problems

---

## Project Architecture

```
SimplexSolver/
├── index.html          # Landing page with hero section
├── calculator.html     # Main solver interface (form + results)
├── about.html          # System overview and features
├── modules.html        # Downloadable educational materials
├── team.html           # Project contributors
├── css/
│   └── styles.css      # Glassmorphic design & theming (1265 lines)
├── js/
│   ├── main.js         # UI helpers, theme toggle, menu (74 lines)
│   └── solver.js       # Core Simplex algorithm (927 lines)
├── modules/            # PDF/PPT resources
│   ├── Module-1-*.pdf
│   ├── Module-2-*.pdf
│   ├── Module-3-*.pptx
│   └── Module-4-*.pdf
└── images/             # UEP logos and campus photos
```

### Technology Stack
- **Frontend**: HTML5, CSS3 (Glassmorphism), JavaScript (ES6+)
- **Storage**: LocalStorage (theme preference)
- **Styling**: CSS Variables for theming, Backdrop Filters, Animations
- **No Dependencies**: Pure vanilla JavaScript (no jQuery, React, Vue)

---

## File Structure & Modules

### 1. **HTML Pages**

#### `index.html` - Landing/Home Page
**Purpose**: Welcome screen and project introduction

**Structure**:
```
Header (Logo + Title + Theme Toggle)
  ↓
Navigation (Hamburger Menu for mobile)
  ↓
Carousel (3 campus images with captions)
  ↓
Hero Section (Call-to-action quote + Start button)
  ↓
Footer (Copyright + Year)
```

**Key Elements**:
- Responsive header with UEP and CS logos
- Auto-rotating carousel (4-second intervals)
- CTA button links to calculator.html
- Mobile-friendly hamburger menu

---

#### `calculator.html` - Main Solver Interface
**Purpose**: User input form and solution output display

**Structure**:
```
Header (Navigation)
  ↓
Main Content (Two-column layout on desktop)
  ├─ LEFT: Form Section
  │   ├─ Objective Function Input
  │   ├─ Constraints Container (dynamic rows)
  │   └─ Control Buttons (Add/Reset/Solve)
  └─ RIGHT: Output Section
      ├─ Results Placeholder
      └─ Solution Steps (collapsible tableaus)
  ↓
Footer
```

**Input Fields**:
- **Objective Function**: Text input (e.g., "1.5x + 1.2y")
- **Constraints**: Dynamic rows with:
  - Expression input (e.g., "2x + 3y")
  - Inequality dropdown (<=, >=, =)
  - RHS (Right-hand side) numeric value
- **Buttons**: Add Constraint, Reset, Solve

---

#### `about.html` - System Information
**Purpose**: Educational content about the tool and how to use it

**Sections**:
- System Overview
- Objectives
- System Features
- Technologies Used
- System Flow
- How to Use (step-by-step)

---

#### `modules.html` - Educational Resources
**Purpose**: Download study materials

**Content**:
- Module 1: Introduction to LP
- Module 2: Standard Forms & Slack Variables
- Module 3: Constructing Simplex Tableau
- Module 4: Dual Method

**File Types**: PDF + PowerPoint (direct HTML download links)

---

#### `team.html` - Project Team
**Purpose**: Display student contributors

**Structure**:
- 7 team member cards with photos and roles
- Roles: Team Leader, Programmer, UI/UX Designer, Doc Writer, Researchers, Testers

---

### 2. **CSS Styling** (`css/styles.css` - 1265 lines)

**Design Philosophy**: Glassmorphism (frosted glass effect) with modern animations

#### CSS Variables (Theme System)
```css
:root {
  --bg-gradient: Linear blue-to-purple gradient (light mode)
  --glass-bg: Semi-transparent white (12% opacity)
  --glass-border: Semi-transparent white (24% opacity)
  --blur: 16px backdrop filter
  --accent: #007bff (primary blue)
  --success: #28a745 (green)
  --highlight-pivot: #ff6b6b (red)
  --highlight-row: Red row background (10% opacity)
  --highlight-col: Violet column background (10% opacity)
}

[data-theme="dark"] {
  --bg-gradient: Dark blue-to-dark gradient
  --glass-bg: Semi-transparent white (8% opacity)
  --blur: 20px (more blur in dark mode)
  --accent: #64b5f6 (lighter blue)
  [...]
}
```

#### Key CSS Classes
| Class | Purpose |
|-------|---------|
| `.glass-card` | Base card with frosted glass effect |
| `.glass-input` | Form input styling |
| `.glass-btn` | Button styling (primary/secondary) |
| `.theme-toggle` | Toggle switch for dark/light mode |
| `.pivot-element` | Highlight pivot cell (red) |
| `.pivot-row` | Highlight pivot row (soft red) |
| `.pivot-col` | Highlight pivot column (violet) |
| `.carousel-slide` | Image carousel animation |
| `.constraint-row` | Constraint input row container |
| `.fade-up` | Entrance animation |

#### Responsive Design
- **Mobile First**: Single-column layout
- **Tablet (768px+)**: Two-column layout (form left, output right)
- **Desktop (1024px+)**: Full-width optimized layout

---

### 3. **JavaScript - Main UI** (`js/main.js` - 74 lines)

**Purpose**: Global UI functionality, theme management, navigation

#### Functions

##### `applyTheme(theme)`
**Input**: `theme` (string: 'dark' or 'light')
**Output**: Applies theme to DOM and stores in localStorage
**Logic**:
```javascript
if (theme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.removeAttribute('data-theme');
}
localStorage.setItem(THEME_KEY, theme);
```

---

##### `initThemeToggles()`
**Purpose**: Initialize all theme toggle switches on the page
**Listeners**: Change event on `.theme-switch` checkboxes
**Effect**: Calls `applyTheme()` when toggled

---

##### `initHamburgerMenu()`
**Purpose**: Mobile navigation drawer

**Logic Flow**:
1. Get hamburger button, drawer, and backdrop elements
2. On hamburger click:
   - Toggle `.open` class on drawer
   - Toggle `aria-hidden` attribute
   - Show/hide backdrop
3. On backdrop click or drawer link click: close drawer

---

##### `setFooterYear()`
**Purpose**: Auto-update copyright year
**Logic**: `yearSpan.textContent = new Date().getFullYear();`

---

##### `setActiveNav()`
**Purpose**: Highlight current page in navigation

**Logic**:
```javascript
Get current page from location.pathname
For each nav link:
  if link.href matches current path → add 'active' class
  else → remove 'active' class
```

---

##### `initCarousel()`
**Purpose**: Auto-rotating image carousel

**Logic**:
1. Get all `.carousel-slide` elements
2. Show one slide at a time with `.show` class
3. Rotate every 4 seconds (4000ms)
4. Cycle back to start after last slide

---

##### `revealCards()`
**Purpose**: Staggered fade-in animation for glass cards

**Logic**:
```javascript
For each .glass-card element:
  Set transition-delay = index * 30ms
  Add 'fade-up' class (initial state)
  requestAnimationFrame(() => add 'visible' class)
```
**Effect**: Cards fade in from bottom with staggered timing

---

##### `window.styleConstraintRows()`
**Purpose**: Apply alternating styles to constraint rows
**Called By**: solver.js (to maintain consistent styling)
**Logic**: Alternate `.c-odd` and `.c-even` classes

---

#### Initialization
**On DOMContentLoaded**:
1. Load and apply saved theme from localStorage
2. Initialize all theme toggles
3. Initialize hamburger menu
4. Set footer year
5. Set active nav link
6. Initialize carousel
7. Reveal cards with animation
8. Style constraint rows

---

### 4. **JavaScript - Solver Algorithm** (`js/solver.js` - 927 lines)

**Purpose**: Implement the Simplex Method algorithm and display results

#### Core Functions

##### `solveSimplex()`
**Entry Point**: Called when user clicks "Solve" button

**Input Flow**:
```
1. Get objective function from #objective input
   ↓ parseExpression() → terms object {variable: coefficient}
2. Get all constraint rows from .constraint-row elements
   ↓ For each row:
     - Parse expression
     - Get inequality operator (<=, >=, =)
     - Get RHS value
   ↓ Store as constraints array
3. Call performSimplex(objective, constraints)
   ↓ Returns solution object with tableaus and final answer
4. Call displaySolution(solution)
   ↓ Renders HTML for all iterations
```

**Error Handling**:
- Try-catch block wraps all parsing
- Alerts user on error with message
- Logs detailed errors to console

---

##### `parseExpression(expression)`
**Purpose**: Convert mathematical expression string to coefficients object

**Input**: `"1.5x + 1.2y"` (user input)
**Output**: `{x: 1.5, y: 1.2}` (terms object)

**Algorithm**:
```javascript
1. Use regex: /([+-]?\s*\d*\.?\d*)\s*([a-zA-Z])/g
   (captures: [+/- number] and [variable letter])

2. Add implicit '+' at beginning if not present

3. For each regex match:
   - Extract coefficient (number part)
   - Extract variable (letter part)
   - Handle special cases:
     * "+" alone → coefficient = 1
     * "-" alone → coefficient = -1
     * "" (empty) → coefficient = 1
   - Store: terms[variable] = parseFloat(coefficient)

4. Return terms object
```

**Example**:
```
Input: "1.5x + 1.2y"
→ Add '+': "+1.5x + 1.2y"
→ Match 1: ["+1.5", "x"] → x: 1.5
→ Match 2: ["+1.2", "y"] → y: 1.2
→ Output: {x: 1.5, y: 1.2}
```

---

##### `performSimplex(objective, constraints)`
**Purpose**: Execute the Simplex algorithm

**Input**:
- `objective`: {variable: coefficient, ...}
- `constraints`: [{expression: {...}, inequality: "<=", rhs: 24}, ...]

**Output**:
```javascript
{
  tableaus: [
    {
      number: 1,
      basicVars: ["s1", "s2", "Z"],
      variables: ["x", "y", "s1", "s2"],
      matrix: [[...], [...], [...]],
      ratios: [...],
      pivotCol: 0,
      pivotRow: 0,
      pivotValue: 2,
      pivotOperations: {...}
    },
    // ... more tableaus
  ],
  solution: {x: 6, y: 4, z: 17},
  variableList: ["x", "y"],
  constraints: [...],
  objective: {...}
}
```

**Algorithm Steps**:

**Phase 1: Extract Variables**
```javascript
1. Collect all unique variables from objective and constraints
2. Sort alphabetically (x, y, z, ...)
3. Create variable list for column ordering
```

**Phase 2: Build Initial Tableau**
```javascript
Create matrix with rows = constraints + 1 (Z-row)
                columns = decision vars + slack vars + RHS

For each constraint row i:
  1. Copy decision variable coefficients
  2. Add slack variable column:
     - 1 if this is the i-th constraint (identity matrix)
     - 0 otherwise
  3. Add RHS (constraint.rhs)

For Z-row:
  1. Add negative of objective coefficients
     (Negative because we're maximizing)
  2. Add zeros for slack variables
  3. Add 0 for RHS
```

**Example Initial Tableau**:
```
Constraints:
  2x + 3y ≤ 24
  6x + 3y ≤ 48

Objective: Maximize 1.5x + 1.2y

Initial Tableau:
     x    y   s1  s2 | RHS
s1 [ 2    3    1   0 |  24 ]
s2 [ 6    3    0   1 |  48 ]
Z  [-1.5 -1.2  0   0 |   0 ]
```

**Phase 3: Simplex Iterations**
```javascript
WHILE (tableau not optimal):
  1. Find ENTERING VARIABLE (pivot column)
     - Look at Z-row (last row)
     - Find MOST NEGATIVE value (excluding RHS)
     - That column is the pivot column
  
  2. Find LEAVING VARIABLE (pivot row)
     - Calculate ratio for each row: RHS / pivot_element
     - Only consider rows with positive pivot element
     - Choose row with SMALLEST POSITIVE RATIO
  
  3. If no positive pivot elements → UNBOUNDED problem
  
  4. Perform PIVOT OPERATION:
     a. Divide pivot row by pivot element (normalize)
     b. For all other rows:
        - Multiply normalized pivot row by factor
        - Subtract from other row (elimination)
  
  5. Update basic variable at pivot row position
  
  6. Save current tableau state for display
  
  7. Increment iteration counter
```

**Phase 4: Extract Final Solution**
```javascript
For each decision variable:
  1. Check if it's a basic variable (appears in basicVars list)
  2. If yes: solution[variable] = RHS value from that row
  3. If no: solution[variable] = 0 (non-basic = 0)

solution.z = RHS value from final Z-row
```

**Safety Mechanisms**:
- Max 20 iterations (prevents infinite loops)
- Unbounded detection (no positive values in pivot column)
- Exception throwing on infeasibility detection

---

##### `calculatePivotOperations(tableau, pivotRow, pivotCol, basicVars, allVariables)`
**Purpose**: Document all arithmetic steps for educational display

**Output**: Object with detailed operations for each element transformation

**Calculation**:
```javascript
For pivot row:
  For each element j:
    operation = "oldValue × (1/pivotElement) = newValue"

For other rows i:
  For each element j:
    factor = tableau[i][pivotCol]
    operation = "oldValue - (pivotNormalized)(factor) = newValue"
```

**Used For**: Displaying step-by-step elimination in UI

---

##### `formatNumber(num)`
**Purpose**: Format decimal numbers as readable fractions or decimals

**Logic Priority**:
1. Exact zero detection (< 1e-12) → "0"
2. Special numbers (1, -1) → "1", "-1"
3. Common fractions lookup (0.5 → "1/2", 0.333... → "1/3", etc.)
4. Rational approximation (denominators up to 24)
5. Fallback to fixed decimal (3 places)

**Examples**:
- 0.5 → "1/2"
- 0.3333... → "1/3"
- 6.0 → "6"
- 0.6667 → "2/3"
- 3.14159 → "3.142"

---

##### `displaySolution(solution)`
**Purpose**: Render all tableaus and solution steps in HTML

**Output**: Populates #solution-steps container with collapsible sections

**Process**:
```
1. Clear existing content
2. Render LP Model (original + canonical form)
3. For each tableau:
   a. Create collapsible section
   b. Build HTML table from matrix
   c. Highlight pivot row/column/element
   d. Show pivot column and row selection ratios
   e. Display elimination operations
   f. First tableau auto-expanded, others collapsed
4. Render final solution:
   a. Show optimal values for all variables
   b. Show objective function value (Z)
   c. Validate each constraint with substitution
   d. Check objective function calculation
```

---

##### `renderLPModel(solution, constraintRows)`
**Purpose**: Display original and canonical LP problem formulation

**Output**: HTML div with:
```
Objective: Z = 1.5x + 1.2y --> z - 1.5x - 1.2y = 0

Constraints:
  2x + 3y ≤ 24 --> 2x + 3y + s1 = 24
  6x + 3y ≤ 48 --> 6x + 3y + s2 = 48

Non-negativity:
  x, y ≥ 0 --> x, y, s1, s2 ≥ 0
```

---

#### Event Listeners

**#add-constraint button**:
- Creates new constraint-row div
- Appends to #constraints-container
- Calls styleConstraintRows() for alternating colors

**#reset-btn button**:
- Clears output section
- Resets objective to default "1.5x + 1.2y"
- Resets constraints to 2 default constraints
- Hides output

**#solve-btn button**:
- Calls solveSimplex()

**.step-header elements**:
- Toggle `.active` class on sibling `.step-content`
- Collapses/expands tableau details

---

## Step-by-Step Execution Flow

### User Journey: Solving a Problem

```
USER ACTION                     SYSTEM RESPONSE
───────────────────────────────────────────────────

1. User visits calculator.html
                                → main.js initializes
                                → Loads saved theme
                                → Default values populated

2. User enters objective:       → Text input stored in #objective
   "1.5x + 1.2y"

3. User reviews/modifies        → Default constraints shown
   constraints:                 → Can edit or add more
   - 2x + 3y ≤ 24
   - 6x + 3y ≤ 48

4. User clicks "Add            → New constraint-row created
   Constraint" (optional)       → Appended to constraints-container

5. User clicks "Solve"          → solveSimplex() called
   button                           ├─ parseExpression("1.5x + 1.2y")
                                    │  → {x: 1.5, y: 1.2}
                                    ├─ Parse all constraints
                                    │  → [{expr: {...}, ineq: "<=", rhs: 24}, ...]
                                    ├─ performSimplex(objective, constraints)
                                    │  ├─ Extract variables: [x, y]
                                    │  ├─ Build initial tableau
                                    │  ├─ Iteration 1:
                                    │  │  ├─ Find pivot (most negative in Z-row)
                                    │  │  ├─ Calculate ratios
                                    │  │  ├─ Find smallest ratio
                                    │  │  ├─ Perform pivot
                                    │  │  └─ Save tableau state
                                    │  ├─ Iteration 2: (if not optimal)
                                    │  │  └─ Repeat...
                                    │  └─ Extract solution
                                    ├─ displaySolution(solution)
                                    │  ├─ Render LP Model
                                    │  ├─ For each tableau:
                                    │  │  ├─ Create collapsible section
                                    │  │  ├─ Build HTML table
                                    │  │  ├─ Highlight pivot
                                    │  │  └─ Show operations
                                    │  └─ Validate constraints
                                    └─ Show output section

6. Output displayed             → Tableaus collapsible/expandable
   with all iterations          → First tableau expanded
                                → Solution values shown
                                → Constraints validated

7. User can expand             → Full elimination operations
   each tableau                 → Row reduction steps visible

8. User clicks "Reset"         → All inputs cleared
                                → Defaults restored
                                → Output hidden

9. User toggles theme          → main.js applyTheme()
                                → localStorage updated
                                → All pages reflect theme
```

---

## Algorithm Explanation

### The Simplex Method (Simplified)

#### What is the Simplex Method?
The Simplex Method is an algorithm for solving linear programming problems by traversing vertices of the feasible region until reaching an optimal solution.

#### Standard Form
All LP problems are converted to:
```
Maximize: Z = c₁x₁ + c₂x₂ + ... + cₙxₙ

Subject to:
  a₁₁x₁ + a₁₂x₂ + ... + a₁ₙxₙ ≤ b₁
  a₂₁x₁ + a₂₂x₂ + ... + a₂ₙxₙ ≤ b₂
  ...
  aₘ₁x₁ + aₘ₂x₂ + ... + aₘₙxₙ ≤ bₘ
  
  x₁, x₂, ..., xₙ ≥ 0
```

#### Canonical Form (with Slack Variables)
```
Maximize: Z = c₁x₁ + c₂x₂ + ... + cₙxₙ

Subject to:
  a₁₁x₁ + a₁₂x₂ + ... + a₁ₙxₙ + s₁ = b₁
  a₂₁x₁ + a₂₂x₂ + ... + a₂ₙxₙ + s₂ = b₂
  ...
  aₘ₁x₁ + aₘ₂x₂ + ... + aₘₙxₙ + sₘ = bₘ
  
  x₁, x₂, ..., xₙ, s₁, s₂, ..., sₘ ≥ 0
```

Where sᵢ are slack variables (unused capacity).

#### Initial Simplex Tableau
```
Basic | x₁   x₂   ... xₙ  | s₁  s₂  ... sₘ | RHS
──────┼────────────────────┼─────────────────┼─────
s₁    | a₁₁  a₁₂  ... a₁ₙ | 1   0   ... 0   | b₁
s₂    | a₂₁  a₂₂  ... a₂ₙ | 0   1   ... 0   | b₂
...   | ...  ...  ... ...  | ... ... ... ... | ...
sₘ    | aₘ₁  aₘ₂  ... aₘₙ | 0   0   ... 1   | bₘ
──────┼────────────────────┼─────────────────┼─────
Z     |-c₁  -c₂  ... -cₙ | 0   0   ... 0   | 0
```

Note: Objective row coefficients are NEGATIVE (for maximization).

#### Pivot Operation (Gaussian Elimination)

**Step 1: Find Entering Variable (Pivot Column)**
- Look at Z-row (bottom row)
- Find the MOST NEGATIVE value (excluding RHS column)
- That variable enters the basis
- If no negative values exist → OPTIMAL solution found

**Step 2: Find Leaving Variable (Pivot Row)**
- Calculate ratio for each row: RHS ÷ pivot_element
- Only consider positive pivot elements
- Choose the row with the SMALLEST RATIO
- That variable leaves the basis
- If no positive ratios → UNBOUNDED problem

**Step 3: Normalize Pivot Row**
```
new_pivot_row = old_pivot_row ÷ pivot_element
```

**Step 4: Eliminate (Row Reduction)**
```
For each other row:
  new_row = old_row - (old_row[pivot_col]) × new_pivot_row
```

This makes all other elements in pivot column = 0 (identity column).

#### Example: Full Solution

**Original Problem**:
```
Maximize: Z = 1.5x + 1.2y

Subject to:
  2x + 3y ≤ 24
  6x + 3y ≤ 48
  x, y ≥ 0
```

**Initial Tableau** (add slack s1, s2):
```
      x     y    s1   s2  | RHS
s1    2     3    1    0   | 24
s2    6     3    0    1   | 48
Z    -1.5 -1.2  0    0   | 0
```

**Iteration 1**:
- Most negative in Z-row: -1.5 (column x) → x enters
- Ratios: 24/2=12, 48/6=8 → smallest is 8
- Pivot row 2 (s2 row), pivot col 1 (x col)
- Pivot element: 6

Normalize row 2: [6, 3, 0, 1, 48] ÷ 6 = [1, 0.5, 0, 1/6, 8]

Eliminate other rows:
- Row 1: [2, 3, 1, 0, 24] - 2×[1, 0.5, 0, 1/6, 8] = [0, 2, 1, -1/3, 8]
- Z-row: [-1.5, -1.2, 0, 0, 0] - (-1.5)×[1, 0.5, 0, 1/6, 8] = [0, -0.45, 0, 0.25, 12]

**Tableau After Iteration 1**:
```
      x    y     s1   s2   | RHS
s1    0    2     1   -1/3  | 8
x     1    0.5   0    1/6  | 8
Z     0   -0.45  0    0.25 | 12
```

**Iteration 2**:
- Most negative in Z-row: -0.45 (column y) → y enters
- Ratios: 8/2=4, 8/0.5=16 → smallest is 4
- Pivot row 1 (s1 row), pivot col 2 (y col)
- Pivot element: 2

Normalize row 1: [0, 2, 1, -1/3, 8] ÷ 2 = [0, 1, 0.5, -1/6, 4]

Eliminate other rows:
- Row 2: [1, 0.5, 0, 1/6, 8] - 0.5×[0, 1, 0.5, -1/6, 4] = [1, 0, -0.25, 1/4, 6]
- Z-row: [0, -0.45, 0, 0.25, 12] - (-0.45)×[0, 1, 0.5, -1/6, 4] = [0, 0, 0.225, 0.175, 13.8]

**Final Tableau** (Optimal):
```
      x    y    s1    s2   | RHS
y     0    1    0.5  -1/6  | 4
x     1    0    -0.25 0.25 | 6
Z     0    0    0.225 0.175| 13.8
```

**Optimal Solution**:
- x = 6
- y = 4
- Z = 13.8 (but recalculate: 1.5×6 + 1.2×4 = 9 + 4.8 = 13.8 ✓)

No negative values in Z-row → **OPTIMAL SOLUTION FOUND**

---

## Beginner-Friendly Code Walkthroughs

This section explains the JavaScript code in simple, everyday language for beginners.

### 🟦 **main.js Explained** (UI and Theme Management)

Think of `main.js` as the **remote control for your website**. It handles:
- 🎨 Switching between dark and light modes
- 📱 Opening/closing the mobile menu
- 📅 Updating the year in the footer
- ⚡ Making animations work smoothly

#### What Happens When You First Load the Page?

**Step 1: Page Loads**
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // All the magic happens here
});
```
**In Simple Words**: 
- When you open the page, the browser says "Hey, the page is ready!"
- This special listener (`addEventListener`) hears that announcement
- Everything inside this block then runs automatically

**What runs**:
1. **Load saved theme** → "Did the user pick dark or light mode before? Remember it!"
2. **Setup theme toggles** → "Listen for clicks on the theme toggle switch"
3. **Setup hamburger menu** → "Listen for clicks on the menu button"
4. **Update year** → "Put the current year in the footer"
5. **Highlight current page** → "Bold the menu item that matches this page"
6. **Start carousel** → "Begin rotating the images on the home page"
7. **Animate cards** → "Make the content boxes fade in one by one"

---

#### The Theme Toggle (Dark/Light Mode)

**How It Works:**
```javascript
// Step 1: Check if user saved a preference
const DEFAULT_THEME = localStorage.getItem(THEME_KEY) || 'light';
```
**What This Means**:
- `localStorage` is like a **tiny filing cabinet in the browser**
- It remembers things even after you close the page
- We're asking: "Do you remember what theme we used last time?"
- If yes → use that theme
- If no → use 'light' as default

**Step 2: Apply the Theme**
```javascript
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem(THEME_KEY, theme);
}
```

**What This Means**:
1. If theme is 'dark' → Add a marker to the HTML saying "use dark mode"
2. If theme is 'light' → Remove that marker
3. Save the choice to the filing cabinet for next time

The CSS file watches for this marker and changes all the colors accordingly!

**Step 3: Listen for Toggle Clicks**
```javascript
document.querySelectorAll('.theme-switch').forEach(cb => {
  cb.addEventListener('change', () => {
    applyTheme(cb.checked ? 'dark' : 'light');
  });
});
```

**What This Means**:
- Find all checkboxes with class `theme-switch`
- For each one, listen for when it changes (user clicks it)
- If checkbox is checked (✓) → dark mode
- If checkbox is unchecked → light mode

---

#### The Hamburger Menu (Mobile Navigation)

**The Problem**: On small phones, navigation links don't fit. Solution: A hidden menu!

**Step 1: Find the Menu Elements**
```javascript
const hamburger = document.querySelector('.hamburger');      // The ☰ button
const drawer = document.getElementById('side-drawer');       // The hidden menu
const backdrop = document.getElementById('drawer-backdrop');  // Dark overlay
```

**In Simple Words**: 
- Find the three-line menu button (☰)
- Find the hidden menu (drawer)
- Find the dark background that appears behind it

**Step 2: Open the Menu**
```javascript
function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  backdrop.hidden = false;
}
```

**What This Does**:
1. Add `'open'` class to drawer → CSS shows it
2. Tell screen readers "menu is now visible"
3. Show the dark backdrop behind it

**Step 3: Close the Menu**
```javascript
function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  backdrop.hidden = true;
}
```

**What This Does**: Same steps in reverse!

**Step 4: Listen for Clicks**
```javascript
hamburger.addEventListener('click', () => {
  if (drawer.classList.contains('open')) {
    closeDrawer();  // If open, close it
  } else {
    openDrawer();   // If closed, open it
  }
});

backdrop.addEventListener('click', closeDrawer);  // Click overlay to close

// Also close when you click a link
document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});
```

**What This Means**:
- Click hamburger → Toggle menu open/closed
- Click dark background → Close menu
- Click a menu link → Close menu (user navigated away)

---

#### The Carousel (Rotating Images)

**The Idea**: Show one image, wait 4 seconds, switch to next image, repeat!

```javascript
let carouselIndex = 0;  // Start with first image

function showSlide(n) {
  const slides = document.querySelectorAll('.carousel-slide');
  
  // Hide all slides
  slides.forEach(slide => slide.classList.remove('show'));
  
  // Show only the one we want
  slides[n % slides.length].classList.add('show');
}

setInterval(() => {
  carouselIndex++;           // Move to next image
  showSlide(carouselIndex);  // Display it
}, 4000);  // Every 4000 milliseconds (4 seconds)
```

**What This Means**:
1. Keep track of which image we're on (`carouselIndex`)
2. Hide all images by removing the `'show'` class
3. Show only the current image by adding the `'show'` class
4. Every 4 seconds, move to next image and repeat

**The Modulo Trick** (`n % slides.length`):
- If we have 3 images (indices 0, 1, 2)
- `3 % 3 = 0` → Wrap back to image 0
- This makes it loop forever!

---

#### The Fade-In Animation

**Goal**: Make cards appear one by one with a nice fade-in effect

```javascript
function revealCards() {
  document.querySelectorAll('.glass-card').forEach((el, idx) => {
    // Add a delay: first card delays 0ms, second delays 30ms, third delays 60ms, etc.
    el.style.transitionDelay = (idx * 30) + 'ms';
    
    // Add the 'fade-up' class (CSS makes it invisible initially)
    el.classList.add('fade-up');
    
    // Use requestAnimationFrame to trigger the animation
    requestAnimationFrame(() => {
      el.classList.add('visible');  // Remove invisibility, show it!
    });
  });
}
```

**What This Means**:
1. Find all glass cards on the page
2. For each card:
   - Delay its animation by index × 30ms
   - Add class that makes it invisible
   - On next frame, add class that makes it visible
   - CSS transition animates the fade-in smoothly

**Result**: Cards appear one after another with staggered timing!

---

### 🟦 **solver.js Explained** (The Main Algorithm)

This is the **brain of the operation**. It solves your math problem!

#### Part 1: Event Listeners (Listening for Clicks)

```javascript
document.getElementById("add-constraint").addEventListener("click", function () {
  // User clicked "Add Constraint" button
  // Create a new row for another constraint
});

document.getElementById("solve-btn").addEventListener("click", function () {
  // User clicked "Solve" button
  // Run the algorithm!
});

document.getElementById("reset-btn").addEventListener("click", function () {
  // User clicked "Reset" button
  // Clear everything and go back to defaults
});
```

**In Simple Words**:
- "Hey, if someone clicks this button, do this task"
- It's like having a waiter who listens for you to call them

---

#### Part 2: Parsing (Converting Text to Numbers)

**The Problem**: User types "1.5x + 1.2y" - we need to turn this into numbers!

```javascript
function parseExpression(expression) {
  const terms = {};
  
  // Find all patterns like: (number)(letter)
  const regex = /([+-]?\s*\d*\.?\d*)\s*([a-zA-Z])/g;
  let match;
  
  // Add '+' at start if missing
  let expr = expression.trim();
  if (!expr.startsWith("-") && !expr.startsWith("+")) {
    expr = "+" + expr;
  }
  
  // Extract each term
  while ((match = regex.exec(expr)) !== null) {
    let coefficient = match[1].replace(/\s/g, "");  // Get the number part
    const variable = match[2];                      // Get the letter part
    
    // Handle special cases
    if (coefficient === "+" || coefficient === "") {
      coefficient = "1";      // "+x" means "1x"
    } else if (coefficient === "-") {
      coefficient = "-1";     // "-x" means "-1x"
    }
    
    terms[variable] = parseFloat(coefficient);
  }
  
  return terms;
}
```

**Let's Trace Through an Example**:
```
Input: "1.5x + 1.2y"

Step 1: Add '+' at start → "+1.5x + 1.2y"

Step 2: Use regex to find matches:
  Match 1: ["+1.5", "x"] → Extract "1.5" and "x"
  Match 2: ["+1.2", "y"] → Extract "1.2" and "y"

Step 3: Create object:
  {
    x: 1.5,
    y: 1.2
  }
```

**Why This Matters**: We convert human-readable math into computer numbers!

---

#### Part 3: The Main Solving Function

```javascript
function solveSimplex() {
  try {
    // Step 1: Get and parse objective function
    const objectiveInput = document.getElementById("objective").value;
    const objective = parseExpression(objectiveInput);
    
    // Step 2: Get and parse all constraints
    const constraints = [];
    const constraintRows = document.querySelectorAll(".constraint-row");
    
    constraintRows.forEach((row) => {
      const expressionInput = row.querySelector(".constraint-input").value;
      const inequality = row.querySelector(".constraint-select").value;
      const rhs = parseFloat(row.querySelector(".constraint-rhs").value);
      
      if (expressionInput && !isNaN(rhs)) {
        const expression = parseExpression(expressionInput);
        constraints.push({
          expression: expression,
          inequality: inequality,
          rhs: rhs,
        });
      }
    });
    
    // Step 3: Run the Simplex algorithm
    const solution = performSimplex(objective, constraints);
    
    // Step 4: Show results on screen
    displaySolution(solution);
    
    document.getElementById("output-section").style.display = "block";
    
  } catch (error) {
    alert("Error: " + error.message);
  }
}
```

**What This Does in Order**:
1. **Get user input** → Read what user typed
2. **Parse it** → Convert text to numbers using parseExpression()
3. **Run algorithm** → Do the math with performSimplex()
4. **Display results** → Show the answer with displaySolution()

**Error Handling**: If anything goes wrong, catch the error and show a message

---

#### Part 4: The Core Algorithm (performSimplex)

This is the **most complex part**. Let's break it down:

**Section A: Extract Variables**
```javascript
// Find all unique variables (x, y, z, etc.)
const variables = new Set();
Object.keys(objective).forEach(v => variables.add(v));
constraints.forEach(constraint => {
  Object.keys(constraint.expression).forEach(v => variables.add(v));
});
const variableList = Array.from(variables).sort();
```

**In Simple Words**: 
- Collect all the different letters used in the problem
- Sort them alphabetically (x comes before y)
- This tells us the order of columns in our table

---

**Section B: Build Initial Tableau**

Think of a tableau like a **spreadsheet for the math problem**.

```javascript
let tableau = [];
let basicVars = [];

// Create rows for constraints
for (let i = 0; i < numConstraints; i++) {
  const constraint = constraints[i];
  const row = [];
  
  // Add decision variable coefficients
  for (let j = 0; j < numVariables; j++) {
    const variable = variableList[j];
    row.push(constraint.expression[variable] || 0);
  }
  
  // Add slack variables (identity matrix)
  for (let j = 0; j < numConstraints; j++) {
    row.push(i === j ? 1 : 0);  // 1 on diagonal, 0 elsewhere
  }
  
  // Add RHS (right-hand side)
  row.push(constraint.rhs);
  
  tableau.push(row);
  basicVars.push(`s${i + 1}`);  // Track which variable is in this row
}
```

**Example**: If we have constraint "2x + 3y ≤ 24"
```
We need: 2x + 3y + s₁ = 24

Row in tableau: [2, 3, 1, 0, 24]
                 ↑  ↑  ↑  ↑  ↑
                 x  y  s1 s2 RHS
```

**Then add the objective row** (the Z-row at bottom):
```javascript
const objRow = [];
for (let j = 0; j < numVariables; j++) {
  const variable = variableList[j];
  objRow.push(-(objective[variable] || 0));  // NEGATIVE!
}
// Add zeros for slack variables
for (let j = 0; j < numConstraints; j++) {
  objRow.push(0);
}
objRow.push(0);  // RHS is 0 initially
```

**Why Negative**: We use negative to find the pivot. This is how the algorithm works!

---

**Section C: The Iteration Loop (Main Algorithm)**

This is where the **magic happens**. Repeat until optimal:

```javascript
while (true) {
  // STEP 1: Find entering variable (which column to pivot on)
  const objRow = tableau[tableau.length - 1];  // Get Z-row
  let pivotCol = -1;
  let mostNegative = 0;
  
  for (let j = 0; j < objRow.length - 1; j++) {  // Check all columns (except RHS)
    if (objRow[j] < mostNegative) {  // If it's negative
      mostNegative = objRow[j];
      pivotCol = j;  // This is our pivot column
    }
  }
  
  if (pivotCol === -1) break;  // No negative? We're done! Solution is optimal.
  
  // STEP 2: Find leaving variable (which row to pivot on)
  const ratios = [];
  let pivotRow = -1;
  let minRatio = Infinity;
  
  for (let i = 0; i < tableau.length - 1; i++) {  // Check all constraint rows
    const pivotVal = tableau[i][pivotCol];
    
    if (pivotVal > 0) {  // Only positive values
      const ratio = tableau[i][tableau[i].length - 1] / pivotVal;  // RHS / element
      
      if (ratio < minRatio) {  // Smallest ratio wins
        minRatio = ratio;
        pivotRow = i;  // This is our pivot row
      }
      ratios.push({ value: ratio, text: `${...} = ${...}` });
    } else {
      ratios.push(null);
    }
  }
  
  if (pivotRow === -1) {
    throw new Error("Problem is unbounded!");  // No valid row? Problem is unbounded.
  }
  
  // STEP 3: Perform pivot operation (Gaussian elimination)
  const pivotElement = tableau[pivotRow][pivotCol];
  
  // Divide pivot row by pivot element
  for (let j = 0; j < tableau[pivotRow].length; j++) {
    tableau[pivotRow][j] /= pivotElement;
  }
  
  // Eliminate other rows
  for (let i = 0; i < tableau.length; i++) {
    if (i !== pivotRow) {
      const factor = tableau[i][pivotCol];
      for (let j = 0; j < tableau[i].length; j++) {
        tableau[i][j] -= factor * tableau[pivotRow][j];
      }
    }
  }
  
  // Update which variable is in this row
  const allVariables = [...variableList];
  for (let i = 0; i < numConstraints; i++) {
    allVariables.push(`s${i + 1}`);
  }
  basicVars[pivotRow] = allVariables[pivotCol];
  
  iteration++;  // Count iterations
}
```

**What's Happening Here**:

| Step | Action | Meaning |
|------|--------|---------|
| 1 | Find most negative in Z-row | Which variable do we want to increase? |
| 2 | Calculate RHS/element ratios | How much can we increase it? |
| 3 | Pick smallest ratio | Pick the tightest constraint |
| 4 | Perform elimination | Update all equations |
| Loop | Repeat until no negatives | Keep improving until optimal |

**Real Example**:
```
Initial:
     x    y   s1  s2 | RHS
s1 [ 2    3   1   0  | 24 ]
s2 [ 6    3   0   1  | 48 ]
Z  [-1.5 -1.2 0   0  | 0 ]

Step 1: Most negative in Z-row is -1.5 (column x)
  → pivotCol = 0 (x enters)

Step 2: Calculate ratios
  Row 1: 24 / 2 = 12
  Row 2: 48 / 6 = 8  ← Smallest!
  → pivotRow = 1 (s2 leaves)

Step 3: Pivot element = 6
  Divide row 2 by 6:  [1, 0.5, 0, 1/6, 8]
  
  Eliminate others:
  Row 1 - 2 × new_row2: [0, 2, 1, -1/3, 8]
  Z - (-1.5) × new_row2: [0, -0.45, 0, 0.25, 12]

Result:
     x    y    s1   s2   | RHS
s1 [ 0    2    1   -1/3  | 8 ]
x  [ 1    0.5  0    1/6  | 8 ]
Z  [ 0   -0.45 0    0.25 | 12]

Still negative in Z-row, so repeat!
```

---

#### Part 5: Display the Solution

```javascript
function displaySolution(solution) {
  const stepsContainer = document.getElementById("solution-steps");
  stepsContainer.innerHTML = "";  // Clear old results
  
  // Show LP model (original problem)
  const lpModelBlock = renderLPModel(solution, constraintRows);
  stepsContainer.appendChild(lpModelBlock);
  
  // Show each iteration
  solution.tableaus.forEach((tableau, index) => {
    const stepSection = document.createElement("div");
    stepSection.className = "step-section";
    
    // Create header (clickable to expand/collapse)
    const stepHeader = document.createElement("div");
    stepHeader.className = "step-header";
    stepHeader.innerHTML = `Tableau ${tableau.number}`;
    
    // Create content with table
    const stepContent = document.createElement("div");
    stepContent.className = "step-content";
    
    const table = document.createElement("table");
    // Build table from matrix...
    
    // Show pivot information
    if (tableau.pivotCol !== null) {
      const pivotInfo = document.createElement("div");
      pivotInfo.innerHTML = `
        <p><strong>Pivot Column:</strong> ${tableau.variables[tableau.pivotCol]}</p>
        <p><strong>Pivot Row:</strong> ${tableau.basicVars[tableau.pivotRow]}</p>
        <p><strong>Pivot Element:</strong> ${formatNumber(tableau.pivotValue)}</p>
      `;
      stepContent.appendChild(pivotInfo);
    }
    
    stepSection.appendChild(stepHeader);
    stepSection.appendChild(stepContent);
    stepsContainer.appendChild(stepSection);
  });
  
  // Show final answer
  const solutionSection = document.createElement("div");
  solutionSection.className = "solution-section";
  solutionSection.innerHTML = `
    <h3>Optimal Solution</h3>
    <p><strong>${optParts.join(', ')}, Z = ${formatNumber(solution.solution.z)}</strong></p>
    <!-- Validate constraints -->
  `;
  stepsContainer.appendChild(solutionSection);
}
```

**What This Does**:
1. Clear old results
2. Show the problem we're solving
3. For each iteration, create a collapsible section with the tableau
4. Highlight the pivot element
5. Show the final answer
6. Validate that it satisfies all constraints

---

#### Part 6: Formatting Numbers as Fractions

```javascript
function formatNumber(num) {
  // If very close to zero
  if (Math.abs(num) < 1e-12) return '0';
  
  // Special cases
  if (num === 1) return '1';
  if (num === -1) return '-1';
  
  // Try common fractions (fast lookup)
  const common = {
    '0.5': '1/2',
    '0.25': '1/4',
    '0.75': '3/4',
    '0.3333333333': '1/3',
    '0.6666666667': '2/3',
  };
  
  for (const k in common) {
    if (Math.abs(num - parseFloat(k)) < 0.005) {
      return common[k];
    }
  }
  
  // Try to approximate as fraction
  const approx = approximateFraction(num, 24, 0.006);
  if (approx && approx.str) return approx.str;
  
  // Fallback: decimal format
  return Number.isInteger(num) ? String(num) : num.toFixed(3);
}
```

**What This Does**:
- Turns decimals like 0.5 into readable fractions like "1/2"
- Makes output easier to understand
- Falls back to decimals if no good fraction found

**Examples**:
```
0.5        → "1/2"
0.333...   → "1/3"
0.6667     → "2/3"
6.0        → "6"
3.14159    → "3.142"
```

---

### 📊 **Visual Flow Diagram**

Here's how the code flows from start to finish:

```
┌─────────────────────────────────┐
│ User Opens calculator.html      │
│ (main.js runs)                  │
└────────────┬────────────────────┘
             │
             ├─ Load saved theme
             ├─ Setup menu listeners
             ├─ Setup carousel
             └─ Animate cards
             
┌────────────────────────────────────────────┐
│ User Types: "1.5x + 1.2y" and constraints  │
│ Clicks "Solve" button                      │
└────────────┬─────────────────────────────────┘
             │
    ┌────────▼────────┐
    │ solveSimplex()  │
    └────────┬────────┘
             │
             ├─ Get objective input
             ├─ parseExpression("1.5x + 1.2y")
             │  └─ Output: {x: 1.5, y: 1.2}
             │
             ├─ Get all constraints
             ├─ parseExpression for each
             │  └─ Output: [{expression: {...}, ...}, ...]
             │
    ┌────────▼──────────────────┐
    │ performSimplex(obj, cons) │
    └────────┬──────────────────┘
             │
             ├─ Extract variables: [x, y]
             ├─ Build initial tableau
             │
             ├─ LOOP (Iteration 1, 2, 3, ...):
             │  ├─ Find pivotCol (most negative)
             │  ├─ Find pivotRow (smallest ratio)
             │  ├─ Perform pivot (Gaussian elimination)
             │  └─ Save tableau state
             │
             ├─ When no negatives left → DONE!
             └─ Extract solution values
             
    ┌────────▼────────────────┐
    │ displaySolution(solution)│
    └────────┬─────────────────┘
             │
             ├─ Show LP model
             ├─ For each tableau:
             │  ├─ Create collapsible section
             │  ├─ Build HTML table
             │  ├─ Highlight pivot
             │  └─ Show operations
             │
             ├─ Show final answer
             ├─ Validate constraints
             └─ Display on screen ✓

┌──────────────────┐
│ Solution Visible │
│ x = 6, y = 4     │
│ Z = 13.8         │
└──────────────────┘
```

---

### 🔑 **Key Concepts Explained Simply**

#### What is a "Tableau"?
A tableau is just a **fancy spreadsheet** for your math problem. It keeps track of:
- All the equations
- Which variables are "in" (basic)
- Which variables are "out" (non-basic)
- The current solution values

#### What is a "Pivot"?
A pivot is like **trading places**:
- One variable "enters" the solution (moves in)
- One variable "leaves" the solution (moves out)
- We do arithmetic to update all equations

#### What is "Gaussian Elimination"?
It's the process of:
- Divide pivot row by pivot element (normalize)
- Subtract multiples from other rows (eliminate)
- This makes one column all zeros (except pivot)

#### Why "Most Negative"?
- Negative means the variable makes Z bigger if we increase it
- Most negative means increase it the most
- This greedily improves our solution each iteration

#### Why "Smallest Ratio"?
- Ratio = RHS / element shows how much we can increase
- Smallest ratio hits a constraint first
- This keeps the solution **feasible** (valid)

---

### 💡 **Common Mistakes & How to Avoid**

| Mistake | Problem | Solution |
|---------|---------|----------|
| **Forgetting slack variables** | Equations won't work | Always add slack to ≤ constraints |
| **Using positive in Z-row** | Algorithm goes wrong | Use negative coefficients in Z-row |
| **Not normalizing pivot row** | Elimination fails | Always divide pivot row first |
| **Using wrong ratio** | Pick wrong pivot row | Calculate RHS / element correctly |
| **Not checking for zero pivot** | Division by zero error | Skip rows where pivot element = 0 |

---

## Improvements & Future Enhancements

### Current Limitations

1. **Minimization Problems**
   - Currently only supports maximization
   - **Fix**: Negate objective coefficients for minimization

2. **≥ Constraints Not Supported**
   - Algorithm assumes all ≤ constraints
   - **Required**: Surplus variables and two-phase method for ≥

3. **Equality Constraints (=)**
   - Not properly handled
   - **Fix**: Use artificial variables and Big-M method

4. **Degeneracy Not Handled**
   - Degenerate pivots can cause cycling
   - **Fix**: Implement Bland's rule or perturbation method

5. **Unboundedness Message**
   - Could be more detailed
   - **Fix**: Show which variable is unbounded

6. **No Phase I/II**
   - Two-phase method for infeasible initial basis
   - **Improvement**: Detect infeasibility earlier

### Suggested Enhancements

#### 1. **Extended Algorithm Support**
```javascript
// Support for minimization
if (problemType === 'minimize') {
  objective = Object.keys(objective).reduce((acc, key) => {
    acc[key] = -objective[key];
    return acc;
  }, {});
}

// Support for ≥ constraints (surplus variables)
if (constraint.inequality === '>=') {
  slackType = 'surplus'; // negative coefficient
}

// Support for = constraints (artificial variables)
if (constraint.inequality === '=') {
  useArtificialVariable = true; // Big-M method
}
```

#### 2. **Two-Phase Method**
```javascript
function solveSimplex_TwoPhase(objective, constraints) {
  // Phase I: Find initial basic feasible solution
  let phase1Tableau = createPhaseITableau(constraints);
  solveUntilOptimal(phase1Tableau);
  
  if (phase1Tableau.objective > 0) {
    throw new Error("Problem is infeasible");
  }
  
  // Phase II: Optimize original objective
  let phase2Tableau = createPhaseIITableau(phase1Tableau, objective);
  solveUntilOptimal(phase2Tableau);
  
  return phase2Tableau;
}
```

#### 3. **Sensitivity Analysis**
```javascript
// Show how solution changes with coefficient changes
function sensitivityAnalysis(finalTableau) {
  return {
    shadowPrices: getShadowPrices(finalTableau),
    reducedCosts: getReducedCosts(finalTableau),
    rangeOfObjective: getObjectiveCoeffRange(),
    rangeOfRHS: getRHSRange()
  };
}
```

#### 4. **Graph Visualization**
```javascript
// Plot feasible region and optimal point
function plotFeasibleRegion(constraints, solution) {
  // Use Canvas or SVG to draw:
  // - Constraint lines
  // - Feasible region (shaded)
  // - Corner points
  // - Optimal point (highlighted)
}
```

#### 5. **Duality**
```javascript
// Show dual problem and shadow prices
function showDualProblem(objective, constraints, finalTableau) {
  const dual = {
    objective: constraints.map(c => c.rhs), // RHS become objective
    constraints: [...] // variables become constraints
  };
  return dual;
}
```

#### 6. **Export Results**
```javascript
// Export solution to PDF or Excel
function exportSolution(solution, format) {
  if (format === 'pdf') {
    // Use jsPDF to generate PDF
    // Include all tableaus and graphs
  } else if (format === 'csv') {
    // Export tableau data as CSV
  }
}
```

#### 7. **Performance Optimization**
- Use Web Workers for large problems
- Cache intermediate results
- Implement sparse matrix representation

#### 8. **Accessibility Improvements**
- Add ARIA labels to all tableaus
- Keyboard navigation for step-by-step
- High-contrast mode beyond dark/light
- Screen reader optimization

#### 9. **Mobile Enhancements**
- Horizontal tableau scrolling with indicators
- Swipe to next/previous step
- Collapsible pivot operations by default
- Simplified output on small screens

#### 10. **Educational Features**
- Interactive tutorials (step-by-step hints)
- Problem library with examples
- Quiz mode (user solves, system checks)
- Video explanations
- Printable solution worksheets

---

## Example Usage

### Basic Setup
1. Open `calculator.html` in browser
2. Default problem pre-filled:
   - Objective: 1.5x + 1.2y
   - Constraints:
     * 2x + 3y ≤ 24
     * 6x + 3y ≤ 48

### To Solve Custom Problem
```
1. Clear objective and enter: "3x + 2y"
2. Modify first constraint: "x + y" <= "10"
3. Modify second constraint: "2x + y" <= "15"
4. (Optional) Add constraint: "+ Add Constraint"
5. Click "Solve"
6. Review results:
   - Each tableau shows iteration
   - Highlight shows pivot operation
   - Final solution shows optimal values
   - Validation confirms constraints satisfied
```

### Example Output
```
Tableau 1 (Initial):
     x    y   s1  s2 | RHS
s1   1    1   1   0  | 10
s2   2    1   0   1  | 15
Z   -3   -2   0   0  | 0

Tableau 2 (After 1st pivot):
     x    y   s1  s2  | RHS
s1   0   0.5  1  -0.5 | 2.5
x    1   0.5  0   0.5 | 7.5
Z    0  -0.5  0   1.5 | 22.5

Tableau 3 (Final - Optimal):
     x    y   s1   s2  | RHS
y    0    1    2   -1  | 5
x    1    0   -1    1  | 5
Z    0    0    1    1  | 25

OPTIMAL SOLUTION: x = 5, y = 5, Z = 25
```

---

## Code Quality Notes

### Strengths
✅ Well-organized code structure
✅ Comprehensive error handling
✅ Educational output with detailed steps
✅ Responsive, accessible design
✅ No external dependencies
✅ Consistent naming conventions
✅ Proper separation of concerns

### Areas for Improvement
⚠️ Could use JSDoc comments for functions
⚠️ Some functions are quite long (performSimplex = 400+ lines)
⚠️ Could extract UI rendering into separate module
⚠️ Magic numbers (e.g., 20 iterations limit) could be constants
⚠️ Limited input validation

---

## Glossary

| Term | Definition |
|------|-----------|
| **LP (Linear Programming)** | Optimization of linear objective subject to linear constraints |
| **Tableau** | Matrix representation of LP problem in Simplex form |
| **Pivot** | Exchange of basic and non-basic variables |
| **Slack Variable** | Non-negative variable added to convert ≤ to = |
| **Basic Variable** | Variable currently in solution (non-zero) |
| **Non-basic Variable** | Variable not in solution (set to zero) |
| **Entering Variable** | Variable to enter the basis (most negative in Z-row) |
| **Leaving Variable** | Variable to leave the basis (smallest ratio) |
| **Feasible Region** | Set of all points satisfying constraints |
| **Optimal Solution** | Best feasible solution (maximizes/minimizes objective) |
| **Unbounded** | Solution can be arbitrarily large (no optimal) |
| **Infeasible** | No solution satisfying all constraints |

---

## References

### Educational Modules
- Module 1: Introduction to Linear Programming
- Module 2: Standard Forms & Slack Variables
- Module 3: Constructing the Simplex Tableau
- Module 4: The Dual Method

### Standard Texts
- Dantzig, G.B. (1963). Linear Programming and Extensions
- Winston, W.L. (2003). Operations Research: Applications and Algorithms
- Hillier, F.S. & Lieberman, G.J. (2014). Introduction to Operations Research

### Technologies
- HTML5 Specification
- CSS3 Backdrop Filter Effects
- JavaScript ES6 Standard
- LocalStorage API

---

**Documentation Last Updated**: December 6, 2025  
**Project**: SimplexSolver  
**Institution**: University of Eastern Philippines  
**Audience**: Students, Instructors, Developers

