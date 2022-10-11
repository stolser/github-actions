# Custom 'print-links' JavaScript action

Prints all existing links in provided file.

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

