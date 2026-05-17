# Next.js 16.2.6

คำสั่งในการสร้างโปรเจค Next.js 16.2.6 ด้วย TypeScript, Tailwind CSS, และใช้ pnpm เป็น package manager:

```bash
pnpm create next-app project-name --ts --tailwind --app --use-pnpm
```

ค่า package.json ที่ได้จากการสร้างโปรเจคด้วยคำสั่งข้างต้นจะมีลักษณะดังนี้ :

```json
{
  "name": "x-components",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```