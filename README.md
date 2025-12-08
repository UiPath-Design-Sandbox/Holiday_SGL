# Holiday SGL - Share.Grow.Learn

A festive holiday app where team members can share their holiday wishes!

## 🎁 Adding Your Present

Want to add your holiday wishes? It's super easy!

1. **Open** `src/presents/index.tsx`
2. **Find** the array of presents (look for `export const presents: PresentData[] = [...]`)
3. **Copy** one of the example presents
4. **Fill in your details:**
   ```typescript
   {
     id: 'present-yourname',           // Unique ID (e.g., 'present-krishna')
     sender: 'Your Name',              // Your name as it should appear
     postcardImage: 'IMAGE_URL_HERE',  // Holiday image URL (see tips below)
     wishes: 'Your holiday message...', // Your personalized wishes
     color: 'red'                      // Color: red, blue, green, purple, pink, orange, yellow, teal, indigo
   }
   ```
5. **Save** the file - that's it! 🎉

### Finding Holiday Images

- Search on [Unsplash](https://unsplash.com/s/photos/christmas) or [Unsplash Holidays](https://unsplash.com/s/photos/holiday)
- Copy the image URL
- Add `?w=600&h=400&fit=crop` at the end of the URL

### Available Colors

Simply use these color names (no need to know Tailwind!):
- `red`, `blue`, `green`, `purple`, `pink`, `orange`, `yellow`, `teal`, `indigo`

---

## Development

This project uses React + TypeScript + Vite.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
