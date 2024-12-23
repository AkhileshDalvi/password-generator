# Password Generator App

A modern React application that generates secure passwords based on user preferences. Built with React + TypeScript + Vite, utilizing React hooks for state management and side effects.

## Live Demo

🚀 [Try the Password Generator App](https://password-generator-green-delta.vercel.app/)

![Password Generator Screenshot](/src/assets/Password-Generator.png)

## Features

- Generate random passwords with customizable length
- Include/exclude numbers and special characters
- Copy generated password to clipboard
- Real-time password generation as preferences change
- Modern UI with Tailwind CSS and Shadcn UI

## Technical Implementation

### React Hooks Usage

#### State Management (`useState`)

The app uses multiple state hooks to manage different aspects of the password generation:

```typescript
const [password, setPassword] = useState(""); // Stores the generated password
const [length, setLength] = useState(8); // Controls password length
const [includeNumbers, setIncludeNumbers] = useState(false); // Toggles numbers
const [includeSpecialChars, setIncludeSpecialChars] = useState(false); // Toggles special characters
```

#### Performance Optimization (`useCallback`)

The password generation logic is memoized using `useCallback` to prevent unnecessary re-renders:

```typescript
const passwordGenerator = useCallback(() => {
	// Password generation logic
}, [length, includeNumbers, includeSpecialChars]);
```

**Why?** The callback is memoized to maintain the same function reference between renders when dependencies haven't changed, optimizing performance for child component re-renders.

#### Side Effects (`useEffect`)

`useEffect` is used to automatically generate a new password whenever user preferences change:

```typescript
useEffect(() => {
	passwordGenerator();
}, [length, includeNumbers, includeSpecialChars]);
```

**Why?** This ensures the password stays in sync with user preferences without requiring manual regeneration.

#### DOM Reference (`useRef`)

`useRef` is used to maintain a reference to the password input field for copy functionality:

```typescript
const passwordRef = useRef<HTMLInputElement>(null);
```

**Why?** Direct DOM access is needed to select the password text when copying to clipboard.

## User Interface Components

- **Password Display**: Shows the generated password with a copy button
- **Length Slider**: Adjusts password length (6-30 characters)
- **Checkboxes**: Toggle inclusion of numbers and special characters
- **Generate Button**: Manually trigger password generation

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI Components
- Lucide Icons

## Original Vite Template Information

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
	languageOptions: {
		// other options...
		parserOptions: {
			project: ["./tsconfig.node.json", "./tsconfig.app.json"],
			tsconfigRootDir: import.meta.dirname,
		},
	},
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
	// Set the react version
	settings: { react: { version: "18.3" } },
	plugins: {
		// Add the react plugin
		react,
	},
	rules: {
		// other rules...
		// Enable its recommended rules
		...react.configs.recommended.rules,
		...react.configs["jsx-runtime"].rules,
	},
});
```
