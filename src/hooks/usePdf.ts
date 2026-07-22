// src/hooks/usePdf.ts
import { useState, ReactElement, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { PDFGenerator as PDFGeneratorClass, PDFOptions } from '../utils/pdfGenerator';

const DEFAULT_CONFIG = {
    format: 'a3' as const,
    orientation: 'portrait' as const,
    scale: 2,
    margin: 20,
    containerWidth: 900,
    containerPadding: 10,
    containerBackground: '#ffffff',
};

export interface UsePDFReturn {
    /** Télécharge le PDF */
    download: (options?: Partial<PDFOptions>) => Promise<void>;
    /** Génère le PDF en base64 */
    generate: (options?: Partial<PDFOptions>) => Promise<string>;
    /** État de chargement */
    loading: boolean;
    /** Erreur éventuelle */
    error: string | null;
    /** Configuration */
    config: typeof DEFAULT_CONFIG;
    /** Met à jour la configuration */
    updateConfig: (newConfig: Partial<typeof DEFAULT_CONFIG>) => void;
}

export function usePdf(component: ReactElement): UsePDFReturn {
    const [config, setConfigState] = useState(DEFAULT_CONFIG);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const getStyles = (): string => {
        const styleSheets = document.styleSheets;
        let styles = '';

        for (const sheet of styleSheets) {
            try {
                const rules = sheet.cssRules || sheet.rules;
                if (rules) {
                    for (const rule of rules) {
                        if (rule instanceof CSSStyleRule) {
                            styles += rule.cssText;
                        }
                    }
                }
            } catch (e) {
                // Ignorer les erreurs de cross-origin
            }
        }

        return styles;
    };

    const renderComponent = (comp: ReactElement, options?: Partial<PDFOptions>): HTMLElement => {
        const {
            containerWidth = config.containerWidth,
            containerPadding = config.containerPadding,
            containerBackground = config.containerBackground,
        } = options || {};

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        // ✅ Utiliser containerWidth au lieu de '100%'
        container.style.width = `${containerWidth}px`;
        container.style.background = containerBackground;
        container.style.padding = `${containerPadding}px`;
        document.body.appendChild(container);

        const styleElement = document.createElement('style');
        styleElement.textContent = getStyles();
        container.appendChild(styleElement);

        const root = createRoot(container);
        root.render(comp);

        containerRef.current = container;
        return container;
    };

    const cleanup = (): void => {
        if (containerRef.current) {
            try {
                document.body.removeChild(containerRef.current);
            } catch (e) {
                // Ignorer
            }
            containerRef.current = null;
        }
    };

    const updateConfig = (newConfig: Partial<typeof DEFAULT_CONFIG>): void => {
        setConfigState((prev) => ({ ...prev, ...newConfig }));
    };

    const download = async (options?: Partial<PDFOptions>): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const container = renderComponent(component, options);
            await new Promise(resolve => setTimeout(resolve, 300));

            const pages: HTMLElement[] = [];
            const pageElements = container.querySelectorAll('[data-page-id]');

            if (pageElements.length > 0) {
                pageElements.forEach((page) => {
                    pages.push(page as HTMLElement);
                });
            } else {
                pages.push(container);
            }

            if (pages.length === 0) {
                throw new Error('No pages found to generate PDF');
            }

            const generator = new PDFGeneratorClass();
            await generator.downloadMultiplePages(pages, {
                filename: options?.filename || 'document.pdf',
                format: options?.format || config.format,
                orientation: options?.orientation || config.orientation,
                scale: options?.scale || 1.5,
                margin: options?.margin || config.margin,
                backgroundColor: options?.backgroundColor || '#ffffff',
                quality: options?.quality || 0.8,
                containerWidth: options?.containerWidth || config.containerWidth,
                containerPadding: options?.containerPadding || config.containerPadding,
                containerBackground: options?.containerBackground || config.containerBackground,
            });

            cleanup();
            setLoading(false);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            setLoading(false);
            cleanup();
            throw err;
        }
    };

    const generate = async (options?: Partial<PDFOptions>): Promise<string> => {
        try {
            setLoading(true);
            setError(null);

            const container = renderComponent(component, options);
            await new Promise(resolve => setTimeout(resolve, 300));

            const generator = new PDFGeneratorClass();
            const base64 = await generator.toBase64(container.outerHTML, {
                scale: options?.scale || 1.5,
                backgroundColor: options?.backgroundColor || '#ffffff',
                quality: options?.quality || 0.8,
                containerWidth: options?.containerWidth || config.containerWidth,
                containerPadding: options?.containerPadding || config.containerPadding,
                containerBackground: options?.containerBackground || config.containerBackground,
            });

            cleanup();
            setLoading(false);
            return base64;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            setLoading(false);
            cleanup();
            throw err;
        }
    };

    return {
        download,
        generate,
        loading,
        error,
        config,
        updateConfig,
    };
}

export default usePdf;