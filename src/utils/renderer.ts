import React from 'react';
import { renderToString } from 'react-dom/server';

export function renderToHTML(element: React.ReactElement): string {
    try {
        const html = renderToString(element);
        return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Helvetica', 'Arial', sans-serif; }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
    } catch (error) {
        throw new Error(`Failed to render React component: ${error}`);
    }
}

export function renderToDOM(element: React.ReactElement, containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) {
        throw new Error(`Container #${containerId} not found`);
    }

    import('react-dom/client').then(({ createRoot }) => {
        const root = createRoot(container);
        root.render(element);
    });
}