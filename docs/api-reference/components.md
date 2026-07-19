## 📄 Références Techniques des Composants

---

# Badge - Référence Technique

## Description

Composant d'étiquette visuelle pour afficher des statuts, des catégories ou des informations contextuelles.

## Rôle principal

Fournir une indication visuelle rapide avec des variantes de couleurs prédéfinies et des tailles ajustables.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu du badge |
| `variant` | `'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | ❌ | `'default'` | Couleur du badge |
| `size` | `'sm' \| 'md' \| 'lg'` | ❌ | `'md'` | Taille du badge |
| `rounded` | `boolean` | ❌ | `true` | Coins arrondis complets |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Badge de statut
```tsx
<Badge variant="success">Payée</Badge>
<Badge variant="warning">En attente</Badge>
<Badge variant="danger">En retard</Badge>
```

### Exemple 2 : Badge de taille différente
```tsx
<Badge size="sm">Petit</Badge>
<Badge size="md">Moyen</Badge>
<Badge size="lg">Grand</Badge>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Text` - Composant de texte
- `Box` - Conteneur générique

---

# Barcode - Référence Technique

## Description

Composant de génération de codes-barres pour les documents PDF.

## Rôle principal

Permettre l'intégration de codes-barres dans les factures et documents générés.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `value` | `string` | ✅ | - | Valeur à encoder |
| `format` | `'CODE128' \| 'CODE39' \| 'EAN13' \| 'EAN8' \| 'UPC' \| 'ITF' \| 'ITF14' \| 'MSI' \| 'CODABAR' \| 'PHARMACODE'` | ❌ | `'CODE128'` | Format du code-barres |
| `width` | `number` | ❌ | `2` | Largeur des barres |
| `height` | `number` | ❌ | `100` | Hauteur du code-barres |
| `displayValue` | `boolean` | ❌ | `true` | Afficher la valeur sous le code |
| `fontSize` | `number` | ❌ | `16` | Taille de police de la valeur |
| `background` | `string` | ❌ | `'#ffffff'` | Couleur de fond |
| `lineColor` | `string` | ❌ | `'#000000'` | Couleur des barres |

## Exemples d'utilisation

### Exemple 1 : Code-barres simple
```tsx
<Barcode value="INV-2026-001" format="CODE128" />
```

### Exemple 2 : Code-barres EAN-13
```tsx
<Barcode value="123456789012" format="EAN13" height={60} />
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `QRCode` - Génération de QR code

---

# Box - Référence Technique

## Description

Conteneur générique avec options de style intégrées (padding, margin, bordure, ombre).

## Rôle principal

Fournir une boîte de base stylisée avec des classes Tailwind.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu de la boîte |
| `padding` | `number` | ❌ | `4` | Padding interne (1-12) |
| `margin` | `number` | ❌ | `0` | Marge externe (1-12) |
| `border` | `boolean` | ❌ | `false` | Ajouter une bordure |
| `rounded` | `boolean` | ❌ | `false` | Coins arrondis |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | ❌ | `'none'` | Ombrage |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Boîte avec bordure
```tsx
<Box border rounded padding={4}>
  <Text>Contenu avec bordure</Text>
</Box>
```

### Exemple 2 : Boîte avec ombre
```tsx
<Box shadow="md" padding={6} className="bg-white">
  <Text>Carte avec ombre</Text>
</Box>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Flex` - Disposition en ligne/colonne
- `Grid` - Disposition en grille

---

# Divider - Référence Technique

## Description

Séparateur visuel pour structurer le contenu.

## Rôle principal

Créer une séparation horizontale entre les sections d'un document.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | ❌ | `'solid'` | Style de la ligne |
| `size` | `number` | ❌ | `2` | Épaisseur en pixels |
| `color` | `string` | ❌ | `'gray-300'` | Couleur Tailwind |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Séparateur simple
```tsx
<Divider />
```

### Exemple 2 : Séparateur en pointillés
```tsx
<Divider variant="dashed" color="blue-200" />
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

---

# Flex - Référence Technique

## Description

Composant de mise en page flexible (flexbox) avec options d'alignement et d'espacement.

## Rôle principal

Fournir une interface déclarative pour les layouts flexbox avec des props typées.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Éléments à disposer |
| `direction` | `'row' \| 'column'` | ❌ | `'row'` | Direction du flux |
| `gap` | `number` | ❌ | `4` | Espace entre les éléments |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | ❌ | `'stretch'` | Alignement vertical |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | ❌ | `'start'` | Alignement horizontal |
| `wrap` | `boolean` | ❌ | `false` | Retour à la ligne |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Disposition en ligne
```tsx
<Flex direction="row" gap={4}>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Flex>
```

### Exemple 2 : Disposition en colonne centrée
```tsx
<Flex direction="column" align="center" justify="center" gap={2}>
  <Text>Centered content</Text>
  <Text>Another line</Text>
</Flex>
```

### Exemple 3 : Espacement entre éléments
```tsx
<Flex justify="between" align="center">
  <div>Gauche</div>
  <div>Droite</div>
</Flex>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Grid` - Mise en page en grille
- `Box` - Conteneur générique

---

# Grid - Référence Technique

## Description

Composant de mise en page en grille avec colonnes configurables.

## Rôle principal

Organiser le contenu en grille avec un nombre de colonnes défini.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Éléments à disposer |
| `columns` | `number` | ❌ | `2` | Nombre de colonnes (1-12) |
| `gap` | `number` | ❌ | `4` | Espace entre les éléments |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Grille à 2 colonnes
```tsx
<Grid columns={2} gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Grid>
```

### Exemple 2 : Grille à 3 colonnes
```tsx
<Grid columns={3} gap={6}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Grid>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Flex` - Disposition en ligne/colonne
- `Box` - Conteneur générique

---

# Heading - Référence Technique

## Description

Composant de titre avec niveaux hiérarchiques (h1 à h6).

## Rôle principal

Fournir des titres structurés avec des styles cohérents.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu du titre |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | ❌ | `1` | Niveau hiérarchique |
| `color` | `'primary' \| 'secondary' \| 'muted'` | ❌ | `'primary'` | Couleur du texte |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Titre principal
```tsx
<Heading level={1}>Titre Principal</Heading>
```

### Exemple 2 : Sous-titre
```tsx
<Heading level={2} color="secondary">Sous-titre</Heading>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Text` - Texte générique

---

# Image - Référence Technique

## Description

Composant d'image avec gestion d'erreur et fallback.

## Rôle principal

Afficher des images avec options de dimensionnement et de fallback en cas d'erreur.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `src` | `string` | ✅ | - | URL de l'image |
| `alt` | `string` | ❌ | `''` | Texte alternatif |
| `width` | `number` | ❌ | - | Largeur en pixels |
| `height` | `number` | ❌ | - | Hauteur en pixels |
| `fit` | `'contain' \| 'cover' \| 'fill' \| 'none'` | ❌ | `'contain'` | Mode de redimensionnement |
| `rounded` | `boolean \| 'full'` | ❌ | `false` | Coins arrondis |
| `fallback` | `string` | ❌ | - | URL de remplacement |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Image simple
```tsx
<Image src="/logo.png" alt="Logo" width={150} height={50} />
```

### Exemple 2 : Image avec fallback
```tsx
<Image 
  src="/missing.png" 
  alt="Logo" 
  fallback="https://via.placeholder.com/150x50"
/>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

---

# Page - Référence Technique

## Description

Composant représentant une page dans un document multi-pages.

## Rôle principal

Délimiter les pages dans un document PDF, avec un identifiant unique pour le suivi.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu de la page |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |
| `id` | `string` | ❌ | `auto-généré` | Identifiant unique |

## Exemples d'utilisation

### Exemple 1 : Page simple
```tsx
<Page>
  <Text>Contenu de la page 1</Text>
</Page>
```

### Exemple 2 : Multi-pages
```tsx
<Page>
  <Text>Page 1</Text>
</Page>
<Page>
  <Text>Page 2</Text>
</Page>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `PDFGenerator` - Générateur de PDF

---

# PDFGenerator - Référence Technique

## Description

Composant conteneur principal pour la génération de documents PDF.

## Rôle principal

Capturer le contenu React et le convertir en PDF avec support multi-pages.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu du document |
| `format` | `'a4' \| 'a3' \| 'letter' \| 'legal'` | ❌ | `'a4'` | Format du papier |
| `orientation` | `'portrait' \| 'landscape'` | ❌ | `'portrait'` | Orientation |
| `scale` | `number` | ❌ | `2` | Qualité du rendu |
| `margin` | `number` | ❌ | `40` | Marge en pixels |
| `border` | `boolean` | ❌ | `true` | Bordure autour du document |
| `borderColor` | `string` | ❌ | `'#e5e7eb'` | Couleur de la bordure |
| `borderWidth` | `number` | ❌ | `2` | Épaisseur de la bordure |
| `borderRadius` | `number` | ❌ | `12` | Rayon des coins |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Document simple
```tsx
<PDFGenerator format="a4">
  <Text>Mon document</Text>
</PDFGenerator>
```

### Exemple 2 : Document multi-pages
```tsx
<PDFGenerator format="a4" border={true}>
  <Page>
    <Text>Page 1</Text>
  </Page>
  <Page>
    <Text>Page 2</Text>
  </Page>
</PDFGenerator>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Page` - Composant de page
- `usePDF` - Hook de génération

---

# QRCode - Référence Technique

## Description

Composant de génération de QR codes pour les documents.

## Rôle principal

Permettre l'intégration de QR codes dans les factures et documents.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `value` | `string` | ✅ | - | Données à encoder |
| `size` | `number` | ❌ | `128` | Taille en pixels |
| `bgColor` | `string` | ❌ | `'#ffffff'` | Couleur de fond |
| `fgColor` | `string` | ❌ | `'#000000'` | Couleur du QR code |
| `level` | `'L' \| 'M' \| 'Q' \| 'H'` | ❌ | `'M'` | Niveau de correction d'erreur |
| `includeMargin` | `boolean` | ❌ | `false` | Inclure la marge |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : QR code simple
```tsx
<QRCode value="https://example.com/invoice/123" />
```

### Exemple 2 : QR code personnalisé
```tsx
<QRCode 
  value="https://example.com" 
  size={200} 
  fgColor="#4338ca" 
  level="H" 
/>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Barcode` - Génération de code-barres

---

# Table - Référence Technique

## Description

Composant de tableau avec colonnes configurables et options de style.

## Rôle principal

Afficher des données tabulaires avec des colonnes définies.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `columns` | `Column[]` | ✅ | - | Définition des colonnes |
| `data` | `Record<string, any>[]` | ✅ | - | Données du tableau |
| `bordered` | `boolean` | ❌ | `false` | Ajouter des bordures |
| `striped` | `boolean` | ❌ | `false` | Alternance de couleurs |
| `hoverable` | `boolean` | ❌ | `false` | Effet au survol |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

### Type Column

| Prop | Type | Requis | Description |
|------|------|--------|-------------|
| `key` | `string` | ✅ | Clé dans les données |
| `label` | `string` | ✅ | En-tête de colonne |
| `width` | `string` | ❌ | Largeur (ex: '50%') |
| `align` | `'left' \| 'center' \| 'right'` | ❌ | Alignement du texte |

## Exemples d'utilisation

### Exemple 1 : Tableau simple
```tsx
<Table
  columns={[
    { key: 'name', label: 'Nom' },
    { key: 'price', label: 'Prix', align: 'right' },
  ]}
  data={[
    { name: 'Produit A', price: 100 },
    { name: 'Produit B', price: 200 },
  ]}
/>
```

### Exemple 2 : Tableau avec style
```tsx
<Table
  columns={[
    { key: 'description', label: 'Description', width: '50%' },
    { key: 'qty', label: 'Qté', align: 'center' },
    { key: 'total', label: 'Total', align: 'right' },
  ]}
  data={items}
  bordered
  striped
/>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `TableRow` - Ligne de tableau
- `TableCell` - Cellule de tableau

---

# TableCell - Référence Technique

## Description

Cellule de tableau avec options d'alignement.

## Rôle principal

Afficher le contenu d'une cellule avec alignement configurable.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu de la cellule |
| `align` | `'left' \| 'center' \| 'right'` | ❌ | `'left'` | Alignement du texte |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

```tsx
<TableRow>
  <TableCell>Texte à gauche</TableCell>
  <TableCell align="center">Centré</TableCell>
  <TableCell align="right">Droite</TableCell>
</TableRow>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Table` - Tableau complet
- `TableRow` - Ligne de tableau

---

# TableRow - Référence Technique

## Description

Ligne de tableau pour organiser les cellules.

## Rôle principal

Grouper des cellules dans une ligne de tableau.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Cellules de la ligne |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

```tsx
<TableRow className="bg-gray-50">
  <TableCell>Donnée 1</TableCell>
  <TableCell>Donnée 2</TableCell>
</TableRow>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Table` - Tableau complet
- `TableCell` - Cellule de tableau

---

# Text - Référence Technique

## Description

Composant de texte avec variantes de style et couleurs.

## Rôle principal

Afficher du texte avec des styles cohérents.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `children` | `ReactNode` | ✅ | - | Contenu du texte |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'body' \| 'small'` | ❌ | `'body'` | Style typographique |
| `color` | `'primary' \| 'secondary' \| 'muted' \| 'danger' \| 'success' \| 'warning'` | ❌ | `'primary'` | Couleur du texte |
| `align` | `'left' \| 'center' \| 'right' \| 'justify'` | ❌ | `'left'` | Alignement |
| `bold` | `boolean` | ❌ | `false` | Texte en gras |
| `truncate` | `boolean` | ❌ | `false` | Tronquer le texte |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Texte simple
```tsx
<Text>Texte normal</Text>
```

### Exemple 2 : Titre avec couleur
```tsx
<Text variant="h2" color="danger">Titre en rouge</Text>
```

### Exemple 3 : Texte centré
```tsx
<Text align="center" color="muted">Texte centré gris</Text>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Heading` - Titres hiérarchiques
- `Badge` - Étiquettes

---

# TotalBox - Référence Technique

## Description

Bloc d'affichage des totaux pour les factures.

## Rôle principal

Afficher les montants (sous-total, remise, TVA, total) dans un format structuré.

## Props

| Prop | Type | Requis | Défaut | Description |
|------|------|--------|--------|-------------|
| `subtotal` | `number` | ✅ | - | Montant hors taxe |
| `discount` | `number` | ❌ | `0` | Remise en euros |
| `tax` | `number` | ❌ | `0` | TVA en pourcentage |
| `shipping` | `number` | ❌ | `0` | Frais de livraison |
| `total` | `number` | ✅ | - | Montant total TTC |
| `currency` | `string` | ❌ | `'€'` | Symbole de la devise |
| `className` | `string` | ❌ | `''` | Classes CSS additionnelles |
| `style` | `CSSProperties` | ❌ | `{}` | Styles inline additionnels |

## Exemples d'utilisation

### Exemple 1 : Total simple
```tsx
<TotalBox subtotal={850} discount={50} tax={20} total={960} />
```

### Exemple 2 : Avec frais de livraison
```tsx
<TotalBox 
  subtotal={850} 
  discount={50} 
  tax={20} 
  shipping={15} 
  total={975} 
  currency="$"
/>
```

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |

## Voir aussi
- `Table` - Tableau des articles
- `Text` - Affichage du texte