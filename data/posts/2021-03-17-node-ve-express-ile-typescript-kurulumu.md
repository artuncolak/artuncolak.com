---
title: Node ve Express ile TypeScript Kurulumu
slug: node-ve-express-ile-typescript-kurulumu
description: 'NodeJS ve Express projesinde typescript kurulumu nasıl yapılır?'
date: 2021-03-17T13:28:29Z
preview:
---

Öncelikle boş bir klasörde `npm init` komutuyla yeni bir NodeJS projesi oluşturduktan sonra başlayabiliriz.

### Dependencyleri Yükleyelim

```bash
npm install express
npm install --save-dev typescript ts-node nodemon @types/node @types/express
```

### TypeScript Konfigurasyonu

TypeScript konfigurasyonlarımızın tutulacağı tsconfig.json dosyamızı oluşturalım

**tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

tsconfig.json dosyamızda görüldüğü gibi tüm TypeScript kodlarımızı src klasöründe yazacağız

### Scriptlerin yazılması

**package.json**

```json
{
  //...package.json
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc"
  }
}
```

### index.ts dosyasının yazılması ve projeyi ayağa kaldırmak

Artık src klasörümüzde index.ts dosyamızı oluşturarak `npm run dev` komutu ile express projemizi çalıştırabiliriz.

**src/index.ts**

```ts
import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(5000, () =>
  console.log('Server listening on http://localhost:5000')
);
```

**Output**

```bash
$ npm run dev

> nodemon src/index.ts

[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/index.ts`
Server listening on http://localhost:5000
```

`npm run build` komutu ile projeyi buildleyerek `npm start` ile projenin JavaScripte compile edilmiş halini productionda ayağa kaldırabilirsiniz.
