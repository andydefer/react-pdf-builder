import { usePDFContext } from '../context';
import { PDFGenerator as PDFGeneratorClass } from '../utils/pdfGenerator';
import { PDFOptions } from '../types';

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
            const html = element.innerHTML;

            const base64 = await generator.toBase64(html, {
                scale: options?.scale || config.scale,
                backgroundColor: options?.backgroundColor || '#ffffff',
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
        element: HTMLElement,
        options?: Partial<PDFOptions>
    ): Promise<void> => {
        try {
            setLoading(true);
            setError(null);

            const generator = new PDFGeneratorClass();
            const html = element.innerHTML;

            await generator.generate(html, {
                filename: options?.filename || 'document.pdf',
                format: options?.format || config.format,
                orientation: options?.orientation || config.orientation,
                scale: options?.scale || config.scale,
                margin: options?.margin || config.margin,
                backgroundColor: options?.backgroundColor || '#ffffff',
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