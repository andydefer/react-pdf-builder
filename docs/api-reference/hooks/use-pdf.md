# usePDF - Référence Technique

## Description

Hook principal pour la génération et le téléchargement de documents PDF à partir de composants React.

## Rôle principal

Fournir une interface programmatique pour capturer, générer et télécharger des PDF à partir du DOM React.

## API

### `generate(element: HTMLElement, options?: Partial<PDFOptions>): Promise<string>`

Génère une représentation base64 du PDF d'un élément HTML.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `element` | `HTMLElement` | Élément HTML à capturer |
| `options` | `Partial<PDFOptions>` | Options de génération (scale, qualité, etc.) |

**Retourne :** `Promise<string>` - Données base64 de l'image du PDF

**Exceptions :** Lance une erreur si la génération échoue

**Exemple :**
```tsx
const { generate } = usePDF();
const container = document.querySelector('.my-content') as HTMLElement;
const base64 = await generate(container, { scale: 1.5, quality: 0.8 });
```

---

### `download(elements: HTMLElement | HTMLElement[], options?: Partial<PDFOptions>): Promise<void>`

Télécharge un ou plusieurs éléments sous forme de PDF.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `elements` | `HTMLElement \| HTMLElement[]` | Élément(s) à convertir en PDF |
| `options` | `Partial<PDFOptions>` | Options de génération et de nom de fichier |

**Retourne :** `Promise<void>`

**Exceptions :** Lance une erreur si aucun élément n'est trouvé ou si la génération échoue

**Exemple :**
```tsx
const { download } = usePDF();
const container = document.querySelector('.pdf-container') as HTMLElement;
await download(container, { filename: 'document.pdf' });
```

---

### `preview(element: HTMLElement, containerId: string): void`

Affiche un aperçu d'un élément dans un conteneur spécifique.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `element` | `HTMLElement` | Élément à prévisualiser |
| `containerId` | `string` | ID du conteneur de destination |

**Exceptions :** Lance une erreur si le conteneur n'existe pas

**Exemple :**
```tsx
const { preview } = usePDF();
const element = document.querySelector('.my-content') as HTMLElement;
preview(element, 'preview-container');
```

---

### `updateConfig(newConfig: Partial<typeof config>): void`

Met à jour la configuration globale du PDF.

| Paramètre | Type | Description |
|-----------|------|-------------|
| `newConfig` | `Partial<typeof config>` | Nouvelles valeurs de configuration |

**Exemple :**
```tsx
const { updateConfig } = usePDF();
updateConfig({ format: 'a4', orientation: 'landscape', scale: 2 });
```

---

## Propriétés retournées

| Propriété | Type | Description |
|-----------|------|-------------|
| `generate` | `Function` | Génère un PDF en base64 |
| `download` | `Function` | Télécharge un ou plusieurs PDFs |
| `preview` | `Function` | Prévisualise un élément |
| `updateConfig` | `Function` | Met à jour la configuration |
| `config` | `PDFConfig` | Configuration actuelle |
| `loading` | `boolean` | Indique si une génération est en cours |
| `error` | `string \| null` | Message d'erreur si présent |
| `setError` | `Function` | Permet de réinitialiser l'erreur |

---

## Cas d'utilisation

### Cas 1 : Téléchargement d'un document simple

```tsx
import { usePDF, PDFProvider } from '@andy-defer/react-pdf-builder';

function MyDocument() {
  const { download, loading } = usePDF();

  const handleDownload = async () => {
    const container = document.querySelector('.pdf-container') as HTMLElement;
    await download(container, {
      filename: 'document.pdf',
      format: 'a4',
      orientation: 'portrait',
      scale: 2,
    });
  };

  return (
    <div>
      <div className="pdf-container">
        <h1>Mon Document</h1>
        <p>Contenu du document</p>
      </div>
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Génération...' : 'Télécharger PDF'}
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

### Cas 2 : Document multi-pages

```tsx
import { PDFGenerator, Page, usePDF } from '@andy-defer/react-pdf-builder';

function MultiPageDocument() {
  const { download, loading } = usePDF();

  const handleDownload = async () => {
    const container = document.querySelector('.pdf-container') as HTMLElement;
    await download(container, { 
      filename: 'multi-page.pdf',
      scale: 1.5,
      quality: 0.9,
    });
  };

  return (
    <div>
      <PDFGenerator format="a4">
        <Page>
          <h1>Page 1</h1>
          <p>Contenu de la première page</p>
        </Page>
        <Page>
          <h1>Page 2</h1>
          <p>Contenu de la deuxième page</p>
        </Page>
      </PDFGenerator>
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Génération...' : 'Télécharger PDF'}
      </button>
    </div>
  );
}
```

### Cas 3 : Génération en base64 pour envoi API

```tsx
function InvoiceComponent() {
  const { generate } = usePDF();

  const sendInvoiceByEmail = async () => {
    const invoiceElement = document.querySelector('#invoice') as HTMLElement;
    const base64 = await generate(invoiceElement, {
      scale: 2,
      quality: 0.9,
    });

    // Envoyer le PDF à l'API
    await fetch('/api/send-invoice', {
      method: 'POST',
      body: JSON.stringify({ pdf: base64 }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return <button onClick={sendInvoiceByEmail}>Envoyer par email</button>;
}
```

### Cas 4 : Prévisualisation en direct

```tsx
function DocumentPreview() {
  const { preview } = usePDF();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      preview(contentRef.current, 'preview-container');
    }
  }, []);

  return (
    <div>
      <div ref={contentRef}>
        <h1>Document à prévisualiser</h1>
      </div>
      <div id="preview-container" />
    </div>
  );
}
```

---

## Gestion des erreurs

| Situation | Erreur | Message |
|-----------|--------|---------|
| Aucun élément trouvé | `Error` | `Container not found` |
| Aucune page trouvée | `Error` | `No pages found to generate PDF` |
| Conteneur de prévisualisation inexistant | `Error` | `Container #${containerId} not found` |
| Échec de la génération | `Error` | `Unknown error` |
| Échec de capture du DOM | `Error` | `PDF generation failed: [détails]` |

---

## Performance

- La génération utilise `html2canvas` qui peut être gourmand en ressources pour les documents complexes
- Le paramètre `scale` influence directement la qualité et le temps de génération
- La `quality` permet de réduire la taille du fichier final
- Utiliser `scale: 1.5` et `quality: 0.8` offre un bon compromis qualité/poids

---

## Compatibilité

| Version | Support |
|---------|---------|
| React 18+ | ✅ Complet |
| TypeScript 5+ | ✅ Complet |
| Navigateurs modernes | ✅ Complet |

---

## Voir aussi
- `PDFGenerator` - Composant conteneur
- `Page` - Composant de page
- `PDFProvider` - Fournisseur de contexte