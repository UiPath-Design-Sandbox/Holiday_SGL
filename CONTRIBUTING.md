# Contributing to the Holiday Game 🎄

Welcome to the team holiday app! This project is designed to help us practice our Git skills while celebrating together.

## How to Add Your Present

### 1. Create Your Branch
Always work on a new branch to avoid conflicts.
```bash
git checkout -b feature/add-[your-name]-present
# Example: git checkout -b feature/add-krishna-present
```

### 2. Create Your Present Component
1. Navigate to `src/presents/`.
2. Copy `Template.tsx` and rename it to `[YourName].tsx`.
3. Customize the content inside! You can add images, text, jokes, or even mini-games.

### 3. Register Your Present
1. Open `src/presents/index.ts`.
2. Import your new component at the top.
3. Add an entry to the `presents` array.

```typescript
// src/presents/index.ts
import MyPresentContent from './MyPresent'; // Import your file

export const presents: PresentData[] = [
  // ... existing presents
  {
    id: 'unique-id-here', // Make sure this is unique!
    sender: 'Your Name',
    content: <MyPresentContent />, // Use your component
    color: 'bg-blue-500' // Pick a color (tailwind class)
  }
];
```

### 4. Commit and Push
```bash
git add .
git commit -m "Add present from [Your Name]"
git push origin feature/add-[your-name]-present
```

### 5. Create a Pull Request (PR)
Go to GitHub and open a Pull Request to merge your branch into `main`.

## Troubleshooting
If you have merge conflicts in `src/presents/index.ts`, don't panic! This is expected since everyone is editing the same list.
1. Pull the latest `main` into your branch: `git pull origin main`.
2. Resolve the conflicts in your editor (keep both changes!).
3. Commit the resolution and push again.

Happy Coding! 🎅
