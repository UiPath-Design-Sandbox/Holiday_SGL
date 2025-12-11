# Holiday SGL - Share.Grow.Learn

A festive holiday app where team members can share their holiday wishes!

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/downloads)
- A code editor (VS Code, Cursor, or any editor of your choice)

To verify your installations, run these commands in your terminal:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
git --version   # Should show git version 2.x.x or higher
```

## 🚀 Getting Started

### Step 1: Clone the Repository

Open your terminal and navigate to where you want to store the project, then run:

```bash
git clone https://github.com/UiPath-Design-Sandbox/Holiday_SGL.git
cd Holiday_SGL
```

### Step 2: Install Dependencies

If you're **not using Cursor**, you'll need to install the required packages manually:

```bash
npm install
```

This will install all the dependencies listed in `package.json`, including:
- React and React DOM
- TypeScript
- Vite (build tool)
- Tailwind CSS
- Framer Motion
- And other required packages

**Note:** If you're using Cursor, dependencies may be installed automatically, but you can still run `npm install` to ensure everything is set up correctly.

### Step 3: Run the Development Server

Start the app locally to see it in action:

```bash
npm run dev
```

The app will open in your browser at `http://localhost:5173` (or the port shown in your terminal).

You should see the holiday scene with presents scattered around the tree! 🎄

## 🎁 Adding Your Present

### Step 1: Pull Latest from Main and Switch to Submit-Present Branch

Before making changes, make sure you have the latest code from the main branch, then switch to the Submit-Present branch:

```bash
# Make sure you're on the main branch
git checkout main

# Pull the latest changes from main
git pull origin main

# Switch to the Submit-Present branch (it already exists)
git checkout Submit-Present

# Pull any updates to Submit-Present branch
git pull origin Submit-Present
```

This ensures you're working with the most up-to-date code!

### Step 2: Add Your Present

1. **Open** `src/presents/index.tsx` in your code editor

2. **Find** the `rawPresents` array (around line 19)

3. **Uncomment and fill in** the template at the bottom of the array (around line 43-50):

   ```typescript
   {
       sender: 'Firstname-Lastname',        // Your name in firstname-lastname format (e.g., 'John-Doe', 'Jane-Smith')
                                           // ID will be auto-generated as 'present-firstname-lastname'
       postcardImage: 'IMAGE_URL_HERE',    // Holiday image URL (see tips below)
       wishes: 'Your personalized holiday wishes message goes here...', // Your message
       color: 'red'                        // Color: red, blue, green, purple, pink, orange, yellow, teal, indigo
   },
   ```

   **Example:**
   ```typescript
   {
       sender: 'John-Doe',
       postcardImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop',
       wishes: 'Wishing you a season filled with warmth, joy, and wonderful memories!',
       color: 'blue'
   },
   ```

4. **Save** the file

### Step 3: Test Your Changes Locally

Make sure the app still runs correctly with your changes:

```bash
npm run dev
```

Check that:
- The app loads without errors
- Your present appears in the scene
- You can click on your present and see your message

### Step 4: Commit and Push Your Changes

1. **Optional: Merge latest from main** (to ensure you have the most recent changes):
   ```bash
   git merge origin/main
   ```
   This will merge any new changes from main into your Submit-Present branch. If there are any conflicts, resolve them before proceeding.

2. **Stage your changes:**
   ```bash
   git add src/presents/index.tsx
   ```

3. **Commit your changes:**
   ```bash
   git commit -m "Add present for [Your-Name]"
   ```
   (Replace `[Your-Name]` with your actual name)

4. **Push to the Submit-Present branch:**
   ```bash
   git push origin Submit-Present
   ```

   If this is your first push to this branch, Git may ask you to set the upstream:
   ```bash
   git push -u origin Submit-Present
   ```

### Step 5: Create a Pull Request

1. Go to the repository on GitHub: https://github.com/UiPath-Design-Sandbox/Holiday_SGL
2. You should see a banner suggesting to create a pull request for your new branch
3. Click **"Compare & pull request"**
4. Add a title like: "Add present for [Your-Name]"
5. Add a description (optional)
6. Click **"Create pull request"**

Your changes will be reviewed and merged into the main branch! 🎉

## 📸 Finding Holiday Images

Need a holiday image for your postcard? Here are some options:

1. **Unsplash** (Recommended):
   - Visit [Unsplash Christmas](https://unsplash.com/s/photos/christmas) or [Unsplash Holidays](https://unsplash.com/s/photos/holiday)
   - Click on an image you like
   - Click the "Download" button or right-click and "Copy image address"
   - Add `?w=600&h=400&fit=crop` at the end of the URL

2. **Example URLs:**
   ```
   https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&h=400&fit=crop
   https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=600&h=400&fit=crop
   ```

## 🎨 Available Colors

Simply use these color names (no need to know Tailwind!):
- `red`, `blue`, `green`, `purple`, `pink`, `orange`, `yellow`, `teal`, `indigo`

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check for code issues

## 🆘 Troubleshooting

### "Command not found: npm"
- Make sure Node.js is installed correctly
- Try restarting your terminal
- On Mac/Linux, you may need to add Node.js to your PATH

### "Port 5173 is already in use"
- The port is already being used by another application
- Vite will automatically try the next available port
- Or stop the other application using that port

### "Module not found" errors
- Make sure you've run `npm install`
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

### Git push errors
- Make sure you're authenticated with GitHub (SSH key or personal access token)
- Verify you're on the correct branch: `git branch`
- Make sure you've committed your changes: `git status`

## 📚 Technical Details

This project uses:
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** for 3D graphics (tree component)

---

Happy Holidays! 🎄✨
