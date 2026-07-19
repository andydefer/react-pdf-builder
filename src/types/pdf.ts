export interface PDFConfig {
    format: 'a4' | 'a3' | 'letter' | 'legal';
    orientation: 'portrait' | 'landscape';
    scale: number;
    margin: number;
}


export interface PDFOptions {
    filename?: string;
    scale?: number;
    backgroundColor?: string;
    margin?: number;
    format?: 'a4' | 'a3' | 'letter' | 'legal' | number[];
    orientation?: 'portrait' | 'landscape';
    quality?: number; // 0.1 à 1.0
}

export interface PDFGeneratorRef {
    generatePDF: (filename?: string) => Promise<any>;
    generateBase64: () => Promise<string>;
}