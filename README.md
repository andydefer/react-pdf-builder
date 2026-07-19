# React PDF Builder

> Générez des documents PDF professionnels avec React et Tailwind CSS

[![npm version](https://img.shields.io/badge/npm-1.0.0-blue.svg)](https://www.npmjs.com/package/@andy-defer/react-pdf-builder)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/andy-defer/react-pdf-builder/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)

---

## 📋 Table des matières

- [Introduction](#introduction)
- [Installation](#installation)
- [Prérequis](#prérequis)
- [Démarrage rapide](#démarrage-rapide)
- [Téléchargement du PDF](#téléchargement-du-pdf)
- [Composants](#composants)
  - [PDFGenerator](#pdfgenerator)
  - [Page](#page)
  - [Flex](#flex)
  - [Grid](#grid)
  - [Box](#box)
  - [Text](#text)
  - [Heading](#heading)
  - [Image](#image)
  - [Table](#table)
  - [TableRow](#tablerow)
  - [TableCell](#tablecell)
  - [Badge](#badge)
  - [Divider](#divider)
  - [TotalBox](#totalbox)
  - [QRCode](#qrcode)
  - [Barcode](#barcode)
- [Hooks](#hooks)
  - [usePDF](#usepdf)
- [API Référence](#api-référence)
- [Exemples](#exemples)
- [Performance](#performance)
- [Compatibilité](#compatibilité)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## Introduction

**React PDF Builder** est une bibliothèque qui permet de générer des documents PDF directement depuis vos composants React en utilisant le rendu HTML/CSS.

### Philosophie

- **React-first** : Construisez vos documents avec des composants React familiers
- **Tailwind CSS** : Stylisez avec les classes Tailwind que vous connaissez
- **TypeScript** : Typage complet pour une expérience de développement fluide
- **Sans serveur** : Tout se passe côté client, aucune installation serveur nécessaire
- **Multi-pages** : Support natif des documents multi-pages

### Cas d'usage

- 📄 Factures et reçus
- 📊 Rapports de données
- 🏷️ Étiquettes et codes-barres
- 📑 Documents administratifs
- 🎫 Billets et réservations

---

## Installation

```bash
# Avec npm
npm install @andy-defer/react-pdf-builder

# Avec yarn
yarn add @andy-defer/react-pdf-builder

# Avec pnpm
pnpm add @andy-defer/react-pdf-builder
```

### Dépendances

Le package utilise les bibliothèques suivantes en peerDependencies :

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwindcss": "^3.0.0"
}
```

---

## Prérequis

### 1. Configuration Tailwind CSS

Assurez-vous que Tailwind CSS est configuré dans votre projet :

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@andy-defer/react-pdf-builder/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 2. Import du CSS

Importez le CSS du package dans votre point d'entrée :

```tsx
// index.tsx ou App.tsx
import '@andy-defer/react-pdf-builder/dist/style.css';
```

---

## Démarrage rapide

### Exemple minimal

```tsx
import React from 'react';
import { 
  PDFGenerator, 
  Page, 
  Flex, 
  Text, 
  usePDF, 
  PDFProvider 
} from '@andy-defer/react-pdf-builder';

function MyDocument() {
  const { download, loading } = usePDF();

  const handleDownload = async () => {
    const container = document.querySelector('.pdf-container') as HTMLElement;
    if (container) {
      await download(container, {
        filename: 'mon-document.pdf',
        format: 'a4',
        orientation: 'portrait',
        scale: 2,
      });
    }
  };

  return (
    <div>
      <PDFGenerator format="a4">
        <Page>
          <Flex direction="column" gap={4}>
            <Text variant="h1">Mon Document</Text>
            <Text>Ceci est un document PDF généré avec React.</Text>
          </Flex>
        </Page>
      </PDFGenerator>

      <button 
        onClick={handleDownload}
        disabled={loading}
        style={{
          marginTop: '16px',
          padding: '10px 24px',
          background: loading ? '#6b7280' : '#4338ca',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'default' : 'pointer',
          fontWeight: 'bold',
        }}
      >
        {loading ? 'Génération en cours...' : '📥 Télécharger le PDF'}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <PDFProvider>
      <MyDocument />
    </PDFProvider>
  );
}
```

---

## Téléchargement du PDF

### Méthode 1 : Téléchargement simple avec `download()`

```tsx
import { usePDF } from '@andy-defer/react-pdf-builder';

function MyComponent() {
  const { download, loading } = usePDF();

  const handleDownload = async () => {
    const container = document.querySelector('.pdf-container') as HTMLElement;
    
    if (container) {
      await download(container, {
        filename: 'facture.pdf',
        format: 'a4',
        orientation: 'portrait',
        scale: 2,
        quality: 0.9,
      });
    }
  };

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? 'Génération...' : 'Télécharger PDF'}
    </button>
  );
}
```

### Méthode 2 : Téléchargement multi-pages

```tsx
import { usePDF } from '@andy-defer/react-pdf-builder';

function MultiPageComponent() {
  const { download, loading } = usePDF();

  const handleDownload = async () => {
    const container = document.querySelector('.pdf-container') as HTMLElement;
    
    if (container) {
      await download(container, {
        filename: 'document-complet.pdf',
        format: 'a4',
        scale: 1.5,
        quality: 0.8,
      });
    }
  };

  return (
    <PDFGenerator format="a4">
      <Page>Page 1</Page>
      <Page>Page 2</Page>
    </PDFGenerator>
  );
}
```

### Méthode 3 : Téléchargement avec gestion d'erreur

```tsx
import { usePDF } from '@andy-defer/react-pdf-builder';
import { useState } from 'react';

function MyComponent() {
  const { download, loading, error } = usePDF();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setErrorMessage(null);
      const container = document.querySelector('.pdf-container') as HTMLElement;
      
      if (!container) {
        setErrorMessage('Conteneur du document non trouvé');
        return;
      }

      await download(container, {
        filename: 'document.pdf',
        format: 'a4',
        scale: 2,
        quality: 0.9,
      });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  return (
    <div>
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '12px' }}>
          ❌ {errorMessage}
        </div>
      )}
      <button onClick={handleDownload} disabled={loading}>
        {loading ? '⏳ Génération...' : '📥 Télécharger PDF'}
      </button>
    </div>
  );
}
```

### Méthode 4 : Bouton de téléchargement stylé avec Tailwind

```tsx
import { usePDF } from '@andy-defer/react-pdf-builder';

function MyComponent() {
  const { download, loading } = usePDF();

  const handleDownload = async () => {
    const container = document.querySelector('.pdf-container') as HTMLElement;
    if (container) {
      await download(container, {
        filename: 'facture.pdf',
        format: 'a4',
        scale: 2,
        quality: 0.9,
      });
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`
        mt-4 px-6 py-3 rounded-lg font-bold text-white transition-all
        ${loading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:transform active:scale-95'
        }
      `}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          Génération en cours...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          📥 Télécharger le PDF
        </span>
      )}
    </button>
  );
}
```

---

## Composants

### PDFGenerator

Composant conteneur principal qui encapsule le document à générer.

```tsx
import { PDFGenerator } from '@andy-defer/react-pdf-builder';

<PDFGenerator
  format="a4"                    // 'a4' | 'a3' | 'letter' | 'legal'
  orientation="portrait"          // 'portrait' | 'landscape'
  scale={2}                      // Qualité du rendu (1-3)
  margin={40}                    // Marge en pixels
  border={true}                  // Bordure autour du document
  borderColor="#e5e7eb"          // Couleur de la bordure
  borderWidth={2}                // Épaisseur de la bordure
  borderRadius={12}              // Rayon des coins
  className="bg-white"           // Classes CSS additionnelles
  style={{}}                     // Styles inline additionnels
>
  {/* Contenu du document */}
</PDFGenerator>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `format` | `'a4' \| 'a3' \| 'letter' \| 'legal'` | `'a4'` | Format du papier |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Orientation |
| `scale` | `number` | `2` | Qualité du rendu |
| `margin` | `number` | `40` | Marge en pixels |
| `border` | `boolean` | `true` | Ajouter une bordure |
| `borderColor` | `string` | `'#e5e7eb'` | Couleur de la bordure |
| `borderWidth` | `number` | `2` | Épaisseur de la bordure |
| `borderRadius` | `number` | `12` | Rayon des coins |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Page

Composant représentant une page individuelle dans un document multi-pages.

```tsx
import { Page } from '@andy-defer/react-pdf-builder';

<Page id="page-1" className="" style={{}}>
  {/* Contenu de la page */}
</Page>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu de la page |
| `id` | `string` | `auto-généré` | Identifiant unique |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

**Important :** Chaque `Page` est automatiquement détectée et transformée en une page PDF distincte.

---

### Flex

Composant de mise en page flexible (flexbox).

```tsx
import { Flex } from '@andy-defer/react-pdf-builder';

<Flex
  direction="row"                // 'row' | 'column'
  gap={4}                        // Espace entre les éléments (1-12)
  align="start"                  // 'start' | 'center' | 'end' | 'stretch'
  justify="between"              // 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap={false}                   // Retour à la ligne
  className=""
  style={{}}
>
  <div>Élément 1</div>
  <div>Élément 2</div>
</Flex>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Éléments à disposer |
| `direction` | `'row' \| 'column'` | `'row'` | Direction du flux |
| `gap` | `number` | `4` | Espace entre les éléments |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | Alignement vertical |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'` | Alignement horizontal |
| `wrap` | `boolean` | `false` | Retour à la ligne |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Grid

Composant de mise en page en grille.

```tsx
import { Grid } from '@andy-defer/react-pdf-builder';

<Grid
  columns={2}                    // Nombre de colonnes (1-12)
  gap={4}                        // Espace entre les éléments
  className=""
  style={{}}
>
  <div>Colonne 1</div>
  <div>Colonne 2</div>
</Grid>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Éléments à disposer |
| `columns` | `number` | `2` | Nombre de colonnes |
| `gap` | `number` | `4` | Espace entre les éléments |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Box

Conteneur générique avec options de style intégrées.

```tsx
import { Box } from '@andy-defer/react-pdf-builder';

<Box
  padding={4}                    // Padding interne (1-12)
  margin={2}                     // Marge externe (1-12)
  border={true}                  // Ajouter une bordure
  rounded={true}                 // Coins arrondis
  shadow="md"                    // 'none' | 'sm' | 'md' | 'lg'
  className=""
  style={{}}
>
  Contenu
</Box>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu de la boîte |
| `padding` | `number` | `4` | Padding interne |
| `margin` | `number` | `0` | Marge externe |
| `border` | `boolean` | `false` | Ajouter une bordure |
| `rounded` | `boolean` | `false` | Coins arrondis |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Ombrage |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Text

Composant de texte avec variantes de style.

```tsx
import { Text } from '@andy-defer/react-pdf-builder';

<Text
  variant="body"                 // 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'small'
  color="primary"                // 'primary' | 'secondary' | 'muted' | 'danger' | 'success' | 'warning'
  align="left"                   // 'left' | 'center' | 'right' | 'justify'
  bold={false}                   // Texte en gras
  truncate={false}               // Tronquer le texte
  className=""
  style={{}}
>
  Contenu du texte
</Text>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu du texte |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'body' \| 'small'` | `'body'` | Style typographique |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'danger' \| 'success' \| 'warning'` | `'primary'` | Couleur du texte |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | `'left'` | Alignement |
| `bold` | `boolean` | `false` | Texte en gras |
| `truncate` | `boolean` | `false` | Tronquer le texte |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Heading

Composant de titre hiérarchique.

```tsx
import { Heading } from '@andy-defer/react-pdf-builder';

<Heading
  level={1}                      // 1-6 (h1 à h6)
  color="primary"                // 'primary' | 'secondary' | 'muted'
  className=""
  style={{}}
>
  Titre
</Heading>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu du titre |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` | Niveau hiérarchique |
| `color` | `'primary' \| 'secondary' \| 'muted'` | `'primary'` | Couleur du texte |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Image

Composant d'image avec gestion d'erreur et fallback.

```tsx
import { Image } from '@andy-defer/react-pdf-builder';

<Image
  src="/logo.png"                // URL de l'image
  alt="Logo"                     // Texte alternatif
  width={150}                    // Largeur en pixels
  height={50}                    // Hauteur en pixels
  fit="contain"                  // 'contain' | 'cover' | 'fill' | 'none'
  rounded={false}                // Coins arrondis ou 'full'
  fallback="/fallback.png"       // Image de remplacement
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `src` | `string` | - | URL de l'image |
| `alt` | `string` | `''` | Texte alternatif |
| `width` | `number` | - | Largeur en pixels |
| `height` | `number` | - | Hauteur en pixels |
| `fit` | `'contain' \| 'cover' \| 'fill' \| 'none'` | `'contain'` | Mode de redimensionnement |
| `rounded` | `boolean \| 'full'` | `false` | Coins arrondis |
| `fallback` | `string` | - | URL de remplacement |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Table

Composant de tableau avec colonnes configurables.

```tsx
import { Table } from '@andy-defer/react-pdf-builder';

const columns = [
  { key: 'name', label: 'Nom', width: '50%' },
  { key: 'qty', label: 'Qté', align: 'center' },
  { key: 'price', label: 'Prix', align: 'right' },
];

const data = [
  { name: 'Produit A', qty: 2, price: 150 },
  { name: 'Produit B', qty: 1, price: 200 },
];

<Table
  columns={columns}
  data={data}
  bordered={true}
  striped={true}
  hoverable={false}
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `columns` | `Column[]` | - | Définition des colonnes |
| `data` | `Record<string, any>[]` | - | Données du tableau |
| `bordered` | `boolean` | `false` | Ajouter des bordures |
| `striped` | `boolean` | `false` | Alternance de couleurs |
| `hoverable` | `boolean` | `false` | Effet au survol |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

#### Type Column

| Prop | Type | Description |
|------|------|-------------|
| `key` | `string` | Clé dans les données |
| `label` | `string` | En-tête de colonne |
| `width` | `string` | Largeur (ex: '50%') |
| `align` | `'left' \| 'center' \| 'right'` | Alignement du texte |

---

### TableRow

Composant de ligne de tableau.

```tsx
import { TableRow } from '@andy-defer/react-pdf-builder';

<TableRow className="" style={{}}>
  <TableCell>Contenu</TableCell>
</TableRow>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Cellules de la ligne |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### TableCell

Composant de cellule de tableau.

```tsx
import { TableCell } from '@andy-defer/react-pdf-builder';

<TableCell align="left" className="" style={{}}>
  Contenu
</TableCell>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu de la cellule |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Alignement du texte |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Badge

Composant d'étiquette visuelle.

```tsx
import { Badge } from '@andy-defer/react-pdf-builder';

<Badge
  variant="success"              // 'success' | 'warning' | 'danger' | 'info' | 'default'
  size="md"                      // 'sm' | 'md' | 'lg'
  rounded={true}                 // Coins arrondis complets
  className=""
  style={{}}
>
  Payée
</Badge>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `children` | `ReactNode` | - | Contenu du badge |
| `variant` | `'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` | Couleur du badge |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du badge |
| `rounded` | `boolean` | `true` | Coins arrondis complets |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Divider

Composant de séparateur visuel.

```tsx
import { Divider } from '@andy-defer/react-pdf-builder';

<Divider
  variant="solid"                // 'solid' | 'dashed' | 'dotted'
  size={2}                       // Épaisseur
  color="gray-300"               // Couleur Tailwind
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Style de la ligne |
| `size` | `number` | `2` | Épaisseur en pixels |
| `color` | `string` | `'gray-300'` | Couleur Tailwind |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### TotalBox

Bloc d'affichage des totaux pour les factures.

```tsx
import { TotalBox } from '@andy-defer/react-pdf-builder';

<TotalBox
  subtotal={850}
  discount={50}
  tax={20}
  shipping={0}
  total={960}
  currency="€"
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `subtotal` | `number` | - | Montant hors taxe |
| `discount` | `number` | `0` | Remise en euros |
| `tax` | `number` | `0` | TVA en pourcentage |
| `shipping` | `number` | `0` | Frais de livraison |
| `total` | `number` | - | Montant total TTC |
| `currency` | `string` | `'€'` | Symbole de la devise |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

**Calcul automatique :** La TVA est calculée sur `(subtotal - discount) × tax / 100`.

---

### QRCode

Composant de génération de QR codes.

```tsx
import { QRCode } from '@andy-defer/react-pdf-builder';

<QRCode
  value="https://example.com"    // Données à encoder
  size={128}                     // Taille en pixels
  bgColor="#ffffff"              // Couleur de fond
  fgColor="#000000"              // Couleur du QR code
  level="M"                      // 'L' | 'M' | 'Q' | 'H'
  includeMargin={false}          // Inclure la marge
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | - | Données à encoder |
| `size` | `number` | `128` | Taille en pixels |
| `bgColor` | `string` | `'#ffffff'` | Couleur de fond |
| `fgColor` | `string` | `'#000000'` | Couleur du QR code |
| `level` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | Niveau de correction d'erreur |
| `includeMargin` | `boolean` | `false` | Inclure la marge |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

---

### Barcode

Composant de génération de codes-barres.

```tsx
import { Barcode } from '@andy-defer/react-pdf-builder';

<Barcode
  value="INV-2026-001"           // Valeur à encoder
  format="CODE128"               // Format du code-barres
  width={2}                      // Largeur des barres
  height={100}                   // Hauteur
  displayValue={true}            // Afficher la valeur
  fontSize={16}                  // Taille de police
  background="#ffffff"           // Couleur de fond
  lineColor="#000000"            // Couleur des barres
  className=""
  style={{}}
/>
```

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `value` | `string` | - | Valeur à encoder |
| `format` | `'CODE128' \| 'CODE39' \| 'EAN13' \| 'EAN8' \| 'UPC' \| 'ITF' \| 'ITF14' \| 'MSI' \| 'CODABAR' \| 'PHARMACODE'` | `'CODE128'` | Format du code-barres |
| `width` | `number` | `2` | Largeur des barres |
| `height` | `number` | `100` | Hauteur |
| `displayValue` | `boolean` | `true` | Afficher la valeur |
| `fontSize` | `number` | `16` | Taille de police |
| `font` | `string` | `'monospace'` | Police |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Alignement du texte |
| `textPosition` | `'top' \| 'bottom'` | `'bottom'` | Position du texte |
| `background` | `string` | `'#ffffff'` | Couleur de fond |
| `lineColor` | `string` | `'#000000'` | Couleur des barres |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | `{}` | Styles inline additionnels |

**Formats supportés :**
- `CODE128`
- `CODE39`
- `EAN13`
- `EAN8`
- `UPC`
- `ITF`
- `ITF14`
- `MSI`
- `CODABAR`
- `PHARMACODE`

---

## Hooks

### usePDF

Hook principal pour la génération de PDF.

```tsx
import { usePDF } from '@andy-defer/react-pdf-builder';

const {
  generate,                      // Génère un PDF en base64
  download,                      // Télécharge un PDF
  preview,                       // Prévisualise un élément
  updateConfig,                  // Met à jour la configuration
  config,                        // Configuration actuelle
  loading,                       // État de chargement
  error,                         // Message d'erreur
  setError,                      // Réinitialise l'erreur
} = usePDF();
```

#### `generate(element: HTMLElement, options?: Partial<PDFOptions>): Promise<string>`

Génère une représentation base64 d'un élément HTML.

```tsx
const base64 = await generate(element, {
  scale: 2,
  quality: 0.9,
});
```

#### `download(elements: HTMLElement | HTMLElement[], options?: Partial<PDFOptions>): Promise<void>`

Télécharge un ou plusieurs éléments sous forme de PDF.

```tsx
const container = document.querySelector('.pdf-container') as HTMLElement;
await download(container, {
  filename: 'document.pdf',
  format: 'a4',
  orientation: 'portrait',
  scale: 2,
});
```

#### `preview(element: HTMLElement, containerId: string): void`

Affiche un aperçu d'un élément dans un conteneur.

```tsx
preview(element, 'preview-container');
```

#### `updateConfig(newConfig: Partial<typeof config>): void`

Met à jour la configuration globale.

```tsx
updateConfig({ 
  format: 'a4', 
  orientation: 'landscape', 
  scale: 2 
});
```

---

## API Référence

### PDFOptions

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `filename` | `string` | `'document.pdf'` | Nom du fichier PDF |
| `scale` | `number` | `1.5` | Qualité du rendu (1-3) |
| `quality` | `number` | `0.8` | Qualité JPEG (0.1-1.0) |
| `format` | `'a4' \| 'a3' \| 'letter' \| 'legal'` | `'a4'` | Format du papier |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Orientation |
| `margin` | `number` | `10` | Marge en mm |
| `backgroundColor` | `string` | `'#ffffff'` | Couleur de fond |

---

## Exemples

### Facture complète avec QR Code et Barcode

```tsx
import React from 'react';
import {
  PDFGenerator,
  Page,
  Flex,
  Grid,
  Box,
  Text,
  Heading,
  Table,
  Badge,
  Divider,
  TotalBox,
  QRCode,
  Barcode,
  usePDF,
  PDFProvider,
} from '@andy-defer/react-pdf-builder';

function CompleteInvoice() {
  const { download, loading } = usePDF();

  const items = [
    { description: 'Développement site e-commerce', quantity: 1, unitPrice: 850, total: 850 },
    { description: 'Intégration système de paiement', quantity: 1, unitPrice: 350, total: 350 },
    { description: 'Hébergement premium (1 an)', quantity: 12, unitPrice: 25, total: 300 },
  ];

  const subtotal = 1500;
  const discount = 50;
  const tax = 20;
  const total = 1740;

  const handleDownload = async () => {
    const container = document.querySelector('.pdf-container') as HTMLElement;
    if (container) {
      await download(container, {
        filename: 'facture_INV-2026-001.pdf',
        format: 'a4',
        orientation: 'portrait',
        scale: 2,
        quality: 0.9,
      });
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <PDFGenerator format="a4" border>
        <Page>
          <Box>
            <Flex justify="between" align="center">
              <Box>
                <Heading level={1}>FACTURE</Heading>
                <Text color="muted">#INV-2026-001</Text>
              </Box>
              <Box>
                <Text variant="body" className="font-bold">WebStudio Pro</Text>
                <Text variant="small" color="muted">123 Avenue des Créateurs</Text>
                <Text variant="small" color="muted">75000 Paris</Text>
              </Box>
            </Flex>

            <Divider />

            <Grid columns={2} gap={4}>
              <Box className="bg-gray-50 p-4 rounded">
                <Text variant="small" color="muted">DESTINATAIRE</Text>
                <Text className="font-bold">Jean Dupont</Text>
                <Text>45 Rue du Commerce</Text>
                <Text>69000 Lyon</Text>
              </Box>
              <Box className="bg-gray-50 p-4 rounded">
                <Text variant="small" color="muted">DÉTAILS</Text>
                <Text>Date: 19/07/2026</Text>
                <Text>Échéance: 18/08/2026</Text>
                <Badge variant="warning">En attente</Badge>
              </Box>
            </Grid>

            <Table
              columns={[
                { key: 'description', label: 'Description', width: '50%' },
                { key: 'quantity', label: 'Qté', align: 'center' },
                { key: 'unitPrice', label: 'Prix unit.', align: 'right' },
                { key: 'total', label: 'Total', align: 'right' },
              ]}
              data={items}
              bordered
              striped
            />

            <Flex justify="end">
              <TotalBox
                subtotal={subtotal}
                discount={discount}
                tax={tax}
                total={total}
              />
            </Flex>

            <Divider />

            <Flex justify="between">
              <Box>
                <Text variant="small" color="muted">
                  <strong>Conditions de paiement :</strong> 30 jours nets
                </Text>
                <Text variant="small" color="muted">
                  <strong>IBAN :</strong> FR76 1234 5678 9012 3456 7890 123
                </Text>
              </Box>
              <Flex gap={4}>
                <QRCode value="https://example.com/invoice/123" size={80} />
                <Barcode value="INV-2026-001" format="CODE128" height={60} />
              </Flex>
            </Flex>
          </Box>
        </Page>
      </PDFGenerator>

      {/* ===== BOUTON DE TÉLÉCHARGEMENT ===== */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          onClick={handleDownload}
          disabled={loading}
          style={{
            padding: '12px 32px',
            background: loading ? '#6b7280' : '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: loading ? 'default' : 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.background = '#047857';
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.background = '#059669';
          }}
        >
          {loading ? (
            <>
              <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
              Génération en cours...
            </>
          ) : (
            <>📥 Télécharger la facture</>
          )}
        </button>

        {error && (
          <span style={{ color: '#dc2626', fontSize: '14px' }}>
            ❌ {error}
          </span>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <PDFProvider>
      <CompleteInvoice />
    </PDFProvider>
  );
}
```

---

## Performance

### Optimisation de la taille des PDF

| Paramètre | Impact |
|-----------|--------|
| `scale: 1.5` | Bon équilibre qualité/poids |
| `scale: 2` | Qualité supérieure, fichier 2x plus lourd |
| `quality: 0.8` | Réduction de 30-40% du poids |
| `quality: 0.6` | Réduction de 50-60% (perte de qualité visible) |

### Recommandations

- Utilisez `scale: 1.5` et `quality: 0.8` par défaut
- Utilisez `scale: 2` et `quality: 0.9` pour l'impression
- Utilisez `scale: 1` et `quality: 0.6` pour les aperçus rapides

---

## Compatibilité

| Environnement | Support |
|---------------|---------|
| **React** | 18.0+ |
| **TypeScript** | 5.0+ |
| **Chrome** | 60+ |
| **Firefox** | 55+ |
| **Safari** | 12+ |
| **Edge** | 79+ |

---

## Contribuer

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

---

## Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.

---

## Liens utiles

- [GitHub Repository](https://github.com/andy-defer/react-pdf-builder)
- [NPM Package](https://www.npmjs.com/package/@andy-defer/react-pdf-builder)
- [Signaler un bug](https://github.com/andy-defer/react-pdf-builder/issues)