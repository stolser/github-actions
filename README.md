# github-actions

A monorepo with custom GitHub Actions.

## Generating folder 'dist'

Install @vercel/ncc:
```
npm i -g @vercel/ncc
```
Before committing regenerate the ./dist/index.js file:
```
cd <action-folder>
ncc build index.js
```
