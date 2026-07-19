import { useRef, ReactNode, useImperativeHandle, forwardRef } from 'react';
import { usePDFContext } from '../context';
import { PDFGenerator as PDFGeneratorClass } from '../utils/pdfGenerator';
import { PDFGeneratorRef } from '../types/pdf';

export interface PDFGeneratorProps {
    children: ReactNode;
    format?: 'a4' | 'a3' | 'letter' | 'legal';
    orientation?: 'portrait' | 'landscape';
    scale?: number;
    margin?: number;
    className?: string;
    onGenerate?: (base64: string) => void;
    onDownload?: (pdf: any) => void;
}

export const PDFGenerator = forwardRef<PDFGeneratorRef, PDFGeneratorProps>(
    (
        {
            children,
            format = 'a4',
            orientation = 'portrait',
            scale = 2,
            margin = 40,
            className = '',
            onGenerate,
            onDownload,
        },
        ref
    ) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const { setLoading, setError } = usePDFContext();

        const generatePDF = async (filename = 'document.pdf') => {
            try {
                setLoading(true);
                setError(null);

                const container = containerRef.current;
                if (!container) {
                    throw new Error('Container not found');
                }

                const generator = new PDFGeneratorClass();
                const html = container.innerHTML;

                const pdf = await generator.generate(html, {
                    filename,
                    format,
                    orientation,
                    scale,
                    margin,
                });

                if (onDownload) onDownload(pdf);
                setLoading(false);
                return pdf;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
                setLoading(false);
                throw error;
            }
        };

        const generateBase64 = async () => {
            try {
                setLoading(true);
                setError(null);

                const container = containerRef.current;
                if (!container) {
                    throw new Error('Container not found');
                }

                const generator = new PDFGeneratorClass();
                const html = container.innerHTML;

                const base64 = await generator.toBase64(html, {
                    scale,
                });

                if (onGenerate) onGenerate(base64);
                setLoading(false);
                return base64;
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
                setLoading(false);
                throw error;
            }
        };

        useImperativeHandle(ref, () => ({
            generatePDF,
            generateBase64,
        }));

        return (
            <div
                ref={containerRef}
                className={`pdf-container ${className}`}
                style={{
                    backgroundColor: '#ffffff',
                    padding: `${margin}px`,
                }}
            >
                {children}
            </div>
        );
    }
);

PDFGenerator.displayName = 'PDFGenerator';