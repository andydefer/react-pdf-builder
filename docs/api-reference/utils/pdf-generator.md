# PDFGenerator - Référence Technique

## Description

Classe utilitaire pour la génération de PDF à partir d'éléments HTML, avec support multi-pages et fusion de documents.

## Hiérarchie / Implémentations

```
PDFGenerator
├── Utilise: html2canvas (capture DOM → canvas)
├── Utilise: jsPDF (génération PDF)
├── Utilise: pdf-lib (fusion de PDFs)
└── Exporte: ArrayBuffer, base64, téléchargement direct
```

## Rôle principal

Assurer la capture d'éléments HTML, leur conversion en images, et l'assemblage en documents PDF optimisés pour les besoins de facturation et de documentation.

---

## API / Méthodes publiques

### `generatePage(element: HTMLElement, options?: PDFOptions): Promise<ArrayBuffer>`

Génère un PDF à partir d'un seul élément HTML.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `element` | `HTMLElement` | Élément HTML à capturer |
| `options` | `PDFOptions` | Options de génération (scale, qualité, format, etc.) |

**Retourne :** `Promise<ArrayBuffer>` - Données binaires du PDF généré

**Exceptions :** `Error` - Si la génération échoue

**Exemple :**
```ts
const generator = new PDFGenerator();
const element = document.querySelector('#invoice') as HTMLElement;
const buffer = await generator.generatePage(element, {
  format: 'a4',
  orientation: 'portrait',
  scale: 2,
  quality: 0.9,
});
```

---

### `generateMultiplePages(elements: HTMLElement[], options?: PDFOptions): Promise<ArrayBuffer>`

Génère un PDF fusionné à partir de plusieurs éléments HTML.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `elements` | `HTMLElement[]` | Liste des éléments à capturer |
| `options` | `PDFOptions` | Options de génération |

**Retourne :** `Promise<ArrayBuffer>` - Données binaires du PDF fusionné

**Exceptions :** `Error` - Si la génération échoue

**Exemple :**
```ts
const generator = new PDFGenerator();
const pages = document.querySelectorAll('[data-page-id]') as NodeListOf<HTMLElement>;
const buffer = await generator.generateMultiplePages(Array.from(pages), {
  format: 'a4',
  scale: 1.5,
  quality: 0.8,
});
```

---

### `mergePDFs(pdfFiles: ArrayBuffer[]): Promise<ArrayBuffer>`

Fusionne plusieurs fichiers PDF en un seul document.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `pdfFiles` | `ArrayBuffer[]` | Liste des PDFs à fusionner |

**Retourne :** `Promise<ArrayBuffer>` - Données binaires du PDF fusionné

**Exceptions :** `Error` - Si la fusion échoue

**Exemple :**
```ts
const generator = new PDFGenerator();
const buffers = [pdf1, pdf2, pdf3];
const merged = await generator.mergePDFs(buffers);
```

---

### `toBase64(htmlContent: string, options?: PDFOptions): Promise<string>`

Convertit un contenu HTML en base64 d'image.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `htmlContent` | `string` | Code HTML à capturer |
| `options` | `PDFOptions` | Options de capture |

**Retourne :** `Promise<string>` - Données base64 de l'image (JPEG)

**Exceptions :** `Error` - Si la conversion échoue

**Exemple :**
```ts
const generator = new PDFGenerator();
const base64 = await generator.toBase64('<h1>Hello</h1>', {
  scale: 2,
  quality: 0.9,
});
```

---

### `downloadMultiplePages(elements: HTMLElement[], options?: PDFOptions): Promise<void>`

Génère et télécharge automatiquement un PDF multi-pages.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `elements` | `HTMLElement[]` | Liste des éléments à capturer |
| `options` | `PDFOptions` | Options de génération (incluant `filename`) |

**Retourne :** `Promise<void>`

**Exceptions :** `Error` - Si la génération ou le téléchargement échoue

**Exemple :**
```ts
const generator = new PDFGenerator();
const pages = document.querySelectorAll('.page') as NodeListOf<HTMLElement>;
await generator.downloadMultiplePages(Array.from(pages), {
  filename: 'document-complet.pdf',
  format: 'a4',
  scale: 2,
});
```

---

## Cas d'utilisation

### Cas 1 : Génération d'une facture simple

```ts
import { PDFGenerator } from '@andy-defer/react-pdf-builder';

async function generateInvoice() {
  const generator = new PDFGenerator();
  const invoiceElement = document.querySelector('#invoice') as HTMLElement;
  
  const buffer = await generator.generatePage(invoiceElement, {
    format: 'a4',
    orientation: 'portrait',
    scale: 2,
    quality: 0.9,
    margin: 10,
  });

  // Télécharger le PDF
  const blob = new Blob([buffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'facture.pdf';
  link.click();
  URL.revokeObjectURL(url);
}
```

### Cas 2 : Génération d'un document multi-pages

```ts
async function generateMultiPageDocument() {
  const generator = new PDFGenerator();
  const pages = document.querySelectorAll('[data-page-id]') as NodeListOf<HTMLElement>;
  
  // Fusion automatique des pages
  const buffer = await generator.generateMultiplePages(Array.from(pages), {
    format: 'a4',
    orientation: 'portrait',
    scale: 1.5,
    quality: 0.8,
  });

  // Télécharger le document complet
  const blob = new Blob([buffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
```

### Cas 3 : Fusion de PDFs existants

```ts
async function mergeExistingPDFs() {
  const generator = new PDFGenerator();
  
  // Charger des PDFs existants
  const pdf1 = await fetch('document1.pdf').then(r => r.arrayBuffer());
  const pdf2 = await fetch('document2.pdf').then(r => r.arrayBuffer());
  
  // Les fusionner
  const merged = await generator.mergePDFs([pdf1, pdf2]);
  
  // Télécharger le résultat
  const blob = new Blob([merged], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
```

### Cas 4 : Export en base64 pour API

```ts
async function exportToBase64ForAPI() {
  const generator = new PDFGenerator();
  const content = document.querySelector('#report') as HTMLElement;
  
  // Générer en base64
  const base64 = await generator.toBase64(content.outerHTML, {
    scale: 2,
    quality: 0.9,
  });
  
  // Envoyer à l'API
  await fetch('/api/upload-pdf', {
    method: 'POST',
    body: JSON.stringify({ pdf: base64 }),
    headers: { 'Content-Type': 'application/json' },
  });
}
```

---

## Gestion des erreurs

| Situation | Exception | Message |
|-----------|-----------|---------|
| Élément introuvable | `Error` | `Container not found` |
| Aucune page à générer | `Error` | `No pages found to generate PDF` |
| Échec de capture HTML | `Error` | `PDF generation failed: [details]` |
| Échec de fusion | `Error` | `PDF merge failed: [details]` |
| Échec de conversion base64 | `Error` | `Base64 conversion failed: [details]` |

---

## Intégration

La classe `PDFGenerator` est utilisée par :

- **`usePDF`** : Hook React qui expose les fonctionnalités
- **`PDFGenerator`** : Composant React qui encapsule la logique
- **Applications utilisatrices** : Peut être instanciée directement

---

## Performance

| Facteur | Impact |
|---------|--------|
| `scale` | Augmente la qualité mais aussi le temps de génération et la taille |
| `quality` | Réduit la taille du fichier (JPEG) au prix d'une perte de qualité |
| `compress: true` | Active la compression intégrée de jsPDF |
| Nombre de pages | Chaque page est capturée individuellement puis fusionnée |

**Recommandations :**
- `scale: 1.5` pour un bon équilibre qualité/poids
- `quality: 0.8` pour réduire la taille de 30-40%
- Éviter `scale: 3` sauf pour des besoins d'impression haute qualité

---

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |
| Navigateurs modernes | ✅ Complet (Chrome, Firefox, Safari, Edge) |

---

## Exemple complet

```ts
import { PDFGenerator } from '@andy-defer/react-pdf-builder';

async function generateCompleteDocument() {
  const generator = new PDFGenerator();
  
  // Récupérer toutes les pages
  const pages = document.querySelectorAll('[data-page-id]') as NodeListOf<HTMLElement>;
  
  if (pages.length === 0) {
    throw new Error('Aucune page trouvée');
  }

  // Générer le PDF complet
  const buffer = await generator.generateMultiplePages(Array.from(pages), {
    filename: 'document-complet.pdf',
    format: 'a4',
    orientation: 'portrait',
    scale: 1.5,
    margin: 10,
    backgroundColor: '#ffffff',
    quality: 0.85,
  });

  // Télécharger
  const blob = new Blob([buffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  
  // Ouvrir dans un nouvel onglet
  const win = window.open(url, '_blank');
  if (win) {
    win.focus();
  }
  
  // Nettoyer après 10 secondes
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
```

---

## Voir aussi
- `usePDF` - Hook React pour la génération
- `PDFGenerator` - Composant React
- `Page` - Composant de page
- [html2canvas](https://html2canvas.hertzen.com/) - Documentation
- [jsPDF](https://github.com/parallax/jsPDF) - Documentation
- [pdf-lib](https://pdf-lib.js.org/) - Documentation