# 🚀 Next.js 프로젝트 초기 세팅 가이드

Next.js + React 18 + Tailwind CSS v3 + TypeScript + ESLint + Prettier 구성으로 프로젝트를 세팅하는 가이드입니다.  
최신 버전이 아닌 특정 버전(React 18, Tailwind v3)을 사용하며, 일관된 코드 스타일과 폰트 적용까지 포함됩니다.

---

## 📁 프로젝트 생성

### 1. Next.js 프로젝트 시작

```bash
npx create-next-app .
```

### 2. 설치 옵션 선택

> Tailwind는 수동 설치를 위해 `No`로 설정

```text
✔ Would you like to use TypeScript? → Yes
✔ Would you like to use ESLint? → Yes
✔ Would you like to use Tailwind CSS? → No
✔ Would you like your code inside a src/ directory? → No
✔ Would you like to use App Router? (recommended) → Yes
✔ Would you like to use Turbopack? → No
✔ Would you like to customize the import alias? (@/* by default) → No
```

---

## ⚛️ React 18로 다운그레이드

```bash
npm uninstall react react-dom
npm install react@18 react-dom@18
```

### 타입도 함께 맞춰주기

```bash
npm install -D @types/react@18 @types/react-dom@18
```

---

## 🎨 Tailwind CSS v3 설치 및 설정

> Tailwind v4가 기본으로 설치되므로, v3.4.1 버전을 명시적으로 설치

### 1. 패키지 설치

```bash
npm install tailwindcss@3.4.1 autoprefixer postcss
```

### 2. 설정 파일 생성

```bash
npx tailwindcss init -p
```

### 3. `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

### 4. `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 5. `globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 💅 Prettier 설정

### 1. 설치

```bash
npm install -D prettier
```

### 2. 플러그인 설치

```bash
npm install -D prettier-plugin-tailwindcss prettier-plugin-organize-imports
```

### 3. `.prettierrc`

```json
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "auto",
  "plugins": [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-organize-imports"
  ],
  "overrides": [
    {
      "files": "eslint.config.mjs",
      "options": { "parser": "babel" }
    }
  ]
}
```

---

## 🧹 ESLint 설정

### 1. ESLint 및 관련 패키지 설치

```bash
npm install -D \
eslint \
@eslint/eslintrc \
eslint-plugin-import \
eslint-plugin-prettier \
eslint-config-prettier \
eslint-plugin-tailwindcss \
eslint-config-next \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
eslint-import-resolver-typescript
```

### 2. `eslint.config.mjs`

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcss from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next/", "node_modules/"],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:tailwindcss/recommended",
  ),
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      tailwindcss,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "no-console": "warn",
      eqeqeq: ["error", "always"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-require-imports": "off",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          "newlines-between": "always",
        },
      ],
      "tailwindcss/enforces-shorthand": "warn",
      "no-restricted-imports": [
        "error",
        {
          patterns: ["./*", "../*"],
        },
      ],
    },
  },
];

export default eslintConfig;
```

---

## 🧠 VSCode 설정 (`.vscode/settings.json`)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "typescript", "typescriptreact"],
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
  }
}
```

---

## ✍️ Pretendard 웹 폰트 적용

### 1. `app/layout.tsx`의 `<head>`에 CDN 추가

```tsx
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
    crossOrigin="anonymous"
  />
</head>
```

### 2. `tailwind.config.js`에서 폰트 적용

```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Pretendard', 'Arial', 'sans-serif'],
    },
  },
}
```

---

## 📜 스크립트 명령어

| 명령어                   | 설명                         |
| ------------------------ | ---------------------------- |
| `npm run dev`            | 개발 서버 실행 (`localhost`) |
| `npm run lint`           | ESLint 검사                  |
| `npx prettier . --write` | 전체 파일 Prettier 포맷 적용 |
