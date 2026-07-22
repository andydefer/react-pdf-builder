export interface PDFConfig {
    format: 'a4' | 'a3' | 'letter' | 'legal';
    orientation: 'portrait' | 'landscape';
    scale: number;
    margin: number;
}


export interface PDFGeneratorRef {
    generatePDF: (filename?: string) => Promise<any>;
    generateBase64: () => Promise<string>;
}