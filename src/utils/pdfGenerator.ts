// src/utils/pdfGenerator.ts
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PDFDocument } from 'pdf-lib';

export interface PDFOptions {
    filename?: string;
    scale?: number;
    backgroundColor?: string;
    margin?: number;
    format?: 'a4' | 'a3' | 'letter' | 'legal' | number[];
    orientation?: 'portrait' | 'landscape';
    quality?: number; // 0.1 à 1.0
    /** Largeur du conteneur de rendu (défaut: 900) */
    containerWidth?: number;
    /** Padding du conteneur de rendu (défaut: 40) */
    containerPadding?: number;
    /** Couleur de fond du conteneur de rendu (défaut: #ffffff) */
    containerBackground?: string;
}

export class PDFGenerator {
    /**
     * Crée un conteneur temporaire caché pour le rendu
     */
    private createTempContainer(
        content: HTMLElement | string,
        options: {
            width?: number;
            padding?: number;
            background?: string;
        } = {}
    ): HTMLDivElement {
        const {
            width = 900,
            padding = 40,
            background = '#ffffff',
        } = options;

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = `${width}px`;
        container.style.background = background;
        container.style.padding = `${padding}px`;

        if (typeof content === 'string') {
            container.innerHTML = content;
        } else {
            container.appendChild(content.cloneNode(true));
        }

        document.body.appendChild(container);
        return container;
    }

    /**
     * Nettoie et supprime un conteneur du DOM
     */
    private removeTempContainer(container: HTMLDivElement): void {
        if (container.parentNode) {
            document.body.removeChild(container);
        }
    }

    /**
     * Capture un élément HTML en canvas
     */
    private async captureElement(
        element: HTMLElement,
        options: {
            scale: number;
            backgroundColor: string;
            width: number;
            height: number;
        }
    ): Promise<HTMLCanvasElement> {
        return html2canvas(element, {
            scale: options.scale,
            backgroundColor: options.backgroundColor,
            logging: false,
            useCORS: true,
            allowTaint: true,
            width: options.width,
            height: options.height,
            windowWidth: options.width,
            windowHeight: options.height,
        });
    }

    /**
     * Attend que le conteneur soit prêt
     */
    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Génère une page PDF à partir d'un élément HTML
     */
    async generatePage(
        element: HTMLElement,
        options: PDFOptions = {}
    ): Promise<ArrayBuffer> {
        const {
            scale = 1.5,
            backgroundColor = '#ffffff',
            margin = 10,
            format = 'a4',
            orientation = 'portrait',
            quality = 0.8,
            containerWidth = 900,
            containerPadding = 40,
            containerBackground = '#ffffff',
        } = options;

        const container = this.createTempContainer(element, {
            width: containerWidth,
            padding: containerPadding,
            background: containerBackground,
        });

        try {
            await this.wait(200);

            const canvas = await this.captureElement(container, {
                scale,
                backgroundColor,
                width: containerWidth,
                height: container.scrollHeight,
            });

            this.removeTempContainer(container);

            const pdf = new jsPDF({
                orientation: orientation,
                unit: 'mm',
                format: format,
                compress: true,
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const usableWidth = pdfWidth - (margin * 2);
            const usableHeight = pdfHeight - (margin * 2);

            const imgData = canvas.toDataURL('image/jpeg', quality);
            const imgWidth = usableWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (imgHeight > usableHeight) {
                const ratio = usableHeight / imgHeight;
                const newWidth = imgWidth * ratio;
                const xOffset = margin + (usableWidth - newWidth) / 2;
                pdf.addImage(imgData, 'JPEG', xOffset, margin, newWidth, usableHeight);
            } else {
                const yOffset = margin + (usableHeight - imgHeight) / 2;
                pdf.addImage(imgData, 'JPEG', margin, yOffset, imgWidth, imgHeight);
            }

            return pdf.output('arraybuffer');

        } catch (error) {
            this.removeTempContainer(container);
            throw new Error(`PDF generation failed: ${error}`);
        }
    }

    /**
     * Génère un PDF multi-pages
     */
    async generateMultiplePages(
        elements: HTMLElement[],
        options: PDFOptions = {}
    ): Promise<ArrayBuffer> {
        const {
            format = 'a4',
            orientation = 'portrait',
            scale = 1.5,
            margin = 10,
            backgroundColor = '#ffffff',
            quality = 0.8,
            containerWidth = 900,
            containerPadding = 40,
            containerBackground = '#ffffff',
        } = options;

        const pdfBuffers: ArrayBuffer[] = [];

        for (const element of elements) {
            const buffer = await this.generatePage(element, {
                format,
                orientation,
                scale,
                margin,
                backgroundColor,
                quality,
                containerWidth,
                containerPadding,
                containerBackground,
            });
            pdfBuffers.push(buffer);
        }

        if (pdfBuffers.length === 1) {
            return pdfBuffers[0];
        }

        return await this.mergePDFs(pdfBuffers);
    }

    /**
     * Fusionne plusieurs PDFs
     */
    async mergePDFs(pdfFiles: ArrayBuffer[]): Promise<ArrayBuffer> {
        try {
            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of pdfFiles) {
                const pdf = await PDFDocument.load(pdfFile);
                const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                pages.forEach((page) => mergedPdf.addPage(page));
            }

            const uint8Array = await mergedPdf.save();
            return uint8Array.buffer as ArrayBuffer;
        } catch (error) {
            throw new Error(`PDF merge failed: ${error}`);
        }
    }

    /**
     * Convertit du HTML en base64
     */
    async toBase64(
        htmlContent: string,
        options: PDFOptions = {}
    ): Promise<string> {
        const {
            scale = 1.5,
            backgroundColor = '#ffffff',
            quality = 0.8,
            containerWidth = 900,
            containerPadding = 40,
            containerBackground = '#ffffff',
        } = options;

        const container = this.createTempContainer(htmlContent, {
            width: containerWidth,
            padding: containerPadding,
            background: containerBackground,
        });

        try {
            await this.wait(300);

            const canvas = await this.captureElement(container, {
                scale,
                backgroundColor,
                width: containerWidth,
                height: container.scrollHeight,
            });

            this.removeTempContainer(container);
            return canvas.toDataURL('image/jpeg', quality);
        } catch (error) {
            this.removeTempContainer(container);
            throw new Error(`Base64 conversion failed: ${error}`);
        }
    }

    /**
     * Télécharge directement un PDF multi-pages
     */
    async downloadMultiplePages(
        elements: HTMLElement[],
        options: PDFOptions = {}
    ): Promise<void> {
        const {
            filename = 'document.pdf',
        } = options;

        const buffer = await this.generateMultiplePages(elements, options);
        const blob = new Blob([buffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}