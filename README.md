# 🚀 Next.js 프로젝트 초기 세팅 가이드

Next.js + React 18 + Tailwind CSS v3 + TypeScript + ESLint + Prettier 구성으로 프로젝트를 세팅하는 가이드입니다.  
최신 버전이 아닌 React 18, Tailwind v3 등 특정 버전을 사용하며, 일관된 코드 스타일, 웹 폰트 적용, 브랜치 자동 생성 및 코드 품질 검사 자동화(GitHub Actions)까지 포함합니다.

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

## 🛡️ GitHub Actions - 코드 품질 검사 및 브랜치 자동 생성

### .github/workflows/lint.yml

```bash
name: Code Quality Check

# main 브랜치에 대한 Pull Request가 열릴 때 워크플로 실행
on:
  pull_request:
    branches: [main]

jobs:
  lint:
    name: Lint & Prettier Check
    runs-on: ubuntu-latest # GitHub에서 제공하는 최신 Ubuntu 러너에서 실행

    steps:
      # 1. 코드 체크아웃
      - name: Checkout Code
        uses: actions/checkout@v3 # PR 코드가 포함된 브랜치를 가져옴

      # 2. Node.js 환경 설정
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20" # 프로젝트에서 사용하는 Node.js 버전에 맞게 설정

      # 3. 의존성 설치 (package-lock.json 기반으로 정확한 버전 설치)
      - name: Install dependencies
        run: npm ci # 'npm install'보다 빠르고 일관성 있게 설치

      # 4. ESLint 검사 실행 (.ts, .tsx 파일 대상)
      - name: Run ESLint
        run: npx eslint . --ext .ts,.tsx # 프로젝트 전체에 대해 TypeScript 린트 검사 수행

      # 5. Prettier 포맷 검사
      - name: Run Prettier Check
        run: npx prettier "**/*.{js,ts,jsx,tsx,json,md,css}" --check
        # 지정된 확장자 파일에 대해 포맷이 Prettier 룰에 맞는지 확인 (수정은 하지 않음)
```

---

## 🌿 이슈 생성 시 브랜치 자동 생성

### .github/workflows/create-branch.yml

```bash
name: Create Feature Branch on Issue Creation

# 이 워크플로는 이슈가 생성되었을 때(trigger: issues.opened) 자동 실행됩니다.
on:
  issues:
    types: [opened]

jobs:
  create-branch:
    runs-on: ubuntu-latest

    steps:
      # 1. GitHub 리포지토리의 main 브랜치를 체크아웃합니다.
      - name: Checkout repository
        uses: actions/checkout@v2
        with:
          token: ${{ secrets.TOKEN }} # 리포지토리에 접근 가능한 Personal Access Token
          ref: main # 기준 브랜치는 'main'

      # 2. 이슈 제목과 번호를 이용해 브랜치를 생성하고 푸시합니다.
      - name: Create feature branch
        env:
          ISSUE_NUMBER: ${{ github.event.issue.number }} # 이슈 번호
          ISSUE_TITLE: ${{ github.event.issue.title }} # 이슈 제목
        run: |
          # 공백 → 하이픈으로 변환
          ISSUE_TITLE_CLEAN="${ISSUE_TITLE// /-}"

          # 영문, 한글, 숫자, 언더스코어(_), 하이픈(-) 외의 특수문자는 모두 제거
          ISSUE_TITLE_CLEAN="${ISSUE_TITLE_CLEAN//[^a-zA-Z0-9가-힣_-]/}"

          # 최종 브랜치 이름 생성 (예: #23_버그수정)
          BRANCH_NAME="#${ISSUE_NUMBER}_${ISSUE_TITLE_CLEAN}"

          echo "Creating branch: $BRANCH_NAME"

          # git 설정 및 브랜치 생성, 푸시
          git checkout main                  # main 브랜치로 이동
          git pull origin main               # 최신 커밋 받아오기
          git checkout -b "$BRANCH_NAME"     # 새 브랜치 생성
          git push origin "$BRANCH_NAME"     # 원격 저장소에 브랜치 푸시

      # 3. 이슈에 브랜치명을 댓글로 남깁니다.
      - name: Comment on issue
        uses: actions/github-script@v6
        env:
          ISSUE_NUMBER: ${{ github.event.issue.number }} # 이슈 번호
          ISSUE_TITLE: ${{ github.event.issue.title }} # 이슈 제목
        with:
          github-token: ${{ secrets.TOKEN }} # 인증 토큰
          script: |
            // 이슈 정보 환경변수 읽기
            const issueNumber = process.env.ISSUE_NUMBER;
            const rawTitle = process.env.ISSUE_TITLE;

            // 제목 정제: 공백 → 하이픈, 특수문자 제거
            const cleanedTitle = rawTitle
              .replace(/ /g, '-')
              .replace(/[^a-zA-Z0-9가-힣_-]/g, '');

            // 브랜치 이름 포맷 (앞 단계와 일치해야 함)
            const branchName = `issue-${issueNumber}_${cleanedTitle}`;

            // 이슈에 댓글로 브랜치명만 남기기
            await github.rest.issues.createComment({
              issue_number: Number(issueNumber),
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: branchName
            });
```

---

## 📜 스크립트 명령어

| 명령어                   | 설명                         |
| ------------------------ | ---------------------------- |
| `npm run dev`            | 개발 서버 실행 (`localhost`) |
| `npm run lint`           | ESLint 검사                  |
| `npx prettier . --write` | 전체 파일 Prettier 포맷 적용 |
