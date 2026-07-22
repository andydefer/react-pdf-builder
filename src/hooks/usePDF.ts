import { usePDFContext } from '../context';
import { PDFGenerator as PDFGeneratorClass, PDFOptions } from '../utils/pdfGenerator';

export function usePDF() {
    const { config, setConfig, loading, setLoading, error, setError } = usePDFContext();

    const generate = async (
        element: HTMLElement,
        options?: Partial<PDFOptions>
    ): Promise<string> => {
        try {
            setLoading(true);
            setError(null);

            const generator = new PDFGeneratorClass();
            const html = element.outerHTML;

            const base64 = await generator.toBase64(html, {
                scale: options?.scale || 1.5,
                backgroundColor: options?.backgroundColor || '#ffffff',
                quality: options?.quality || 0.8,
            });

            setLoading(false);
            return base64;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            setLoading(false);
            throw err;
        }
    };

    const download = async (
        elements: HTMLElement | HTMLElement[],
        options?: Partial<PDFOptions>
    ): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const generator = new PDFGeneratorClass();
            const elementsArray = Array.isArray(elements) ? elements : [elements];

            // Récupérer toutes les Pages
            const pages: HTMLElement[] = [];

            for (const el of elementsArray) {
                const pageElements = el.querySelectorAll('[data-page-id]');

                if (pageElements.length > 0) {
                    pageElements.forEach((page) => {
                        pages.push(page as HTMLElement);
                    });
                } else {
                    pages.push(el);
                }
            }

            if (pages.length === 0) {
                throw new Error('No pages found to generate PDF');
            }

            // Générer et fusionner les PDFs
            await generator.downloadMultiplePages(pages, {
                filename: options?.filename || 'document.pdf',
                format: options?.format || config.format,
                orientation: options?.orientation || config.orientation,
                scale: options?.scale || 1.5,
                margin: options?.margin || config.margin,
                backgroundColor: options?.backgroundColor || '#ffffff',
                quality: options?.quality || 0.8,
            });

            setLoading(false);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            setLoading(false);
            throw err;
        }
    };

    const preview = (element: HTMLElement, containerId: string): void => {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container #${containerId} not found`);
        }
        container.innerHTML = element.outerHTML;
    };

    const updateConfig = (newConfig: Partial<typeof config>): void => {
        setConfig(newConfig);
    };

    return {
        generate,
        download,
        preview,
        config,
        updateConfig,
        loading,
        error,
        setError,
    };
}