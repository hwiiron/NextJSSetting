// Node.js에서 ES 모듈 환경에서 __dirname, __filename을 사용하기 위한 설정
import { dirname } from "path";
import { fileURLToPath } from "url";

// FlatConfig 호환을 위한 유틸리티 (기존 ESLint config 방식과 호환되도록 변환)
import { FlatCompat } from "@eslint/eslintrc";

// Tailwind CSS 관련 ESLint 플러그인
import tailwindcss from "eslint-plugin-tailwindcss";

// ES 모듈에서 __filename, __dirname을 사용하기 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 기존 ESLint config를 FlatConfig 스타일로 변환하기 위한 객체
const compat = new FlatCompat({
  baseDirectory: __dirname, // 상대 경로 해석을 위한 기준 디렉토리
});

// 최종 ESLint 설정 배열
const eslintConfig = [
  // 기존 방식의 확장 구성을 FlatConfig 스타일로 변환하여 적용
  ...compat.extends(
    "next/core-web-vitals", // Next.js 권장 린트 규칙 (웹 바이탈 포함)
    "next/typescript", // Next.js + TypeScript 관련 린트 규칙
    "plugin:prettier/recommended", // Prettier와 충돌 방지 및 린트 에러로 표시
    "plugin:import/recommended", // import 문 관련 규칙
    "plugin:tailwindcss/recommended", // Tailwind 관련 권장 규칙
  ),

  // 공통 파일 룰 (JS/TS/JSX/TSX)
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    plugins: {
      tailwindcss, // TailwindCSS 플러그인 명시
    },
    settings: {
      // import 경로 별칭 (@/...) 인식 설정
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json", // tsconfig 경로 (필요시 jsconfig.json으로 변경 가능)
        },
      },
    },
    rules: {
      "no-console": "warn", // console.log 등 경고 처리
      eqeqeq: ["error", "always"], // 항상 ===, !== 사용
      "@typescript-eslint/no-explicit-any": "error", // any 사용 금지
      "@typescript-eslint/no-unused-vars": "error", // 사용되지 않는 변수 금지
      "@typescript-eslint/no-require-imports": "off", // require 사용 허용
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"], // import 순서 그룹 정의
          "newlines-between": "always", // 그룹 간 줄바꿈 필수
        },
      ],
      "tailwindcss/enforces-shorthand": "warn", // Tailwind 클래스는 축약형 권장
      "no-restricted-imports": [
        "error",
        {
          patterns: ["./*", "../*"], // 상대 경로 금지
        },
      ],
    },
  },
];

export default eslintConfig;
