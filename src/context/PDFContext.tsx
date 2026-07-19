import { createContext, useContext, useState, ReactNode } from 'react';

export interface PDFConfig {
    format: 'a4' | 'a3' | 'letter' | 'legal';
    orientation: 'portrait' | 'landscape';
    scale: number;
    margin: number;
}

interface PDFContextType {
    config: PDFConfig;
    setConfig: (config: Partial<PDFConfig>) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const defaultConfig: PDFConfig = {
    format: 'a4',
    orientation: 'portrait',
    scale: 2,
    margin: 40,
};

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export function PDFProvider({
    children,
    initialConfig = defaultConfig,
}: {
    children: ReactNode;
    initialConfig?: Partial<PDFConfig>;
}) {
    const [config, setConfigState] = useState<PDFConfig>({
        ...defaultConfig,
        ...initialConfig,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setConfig = (newConfig: Partial<PDFConfig>) => {
        setConfigState((prev) => ({ ...prev, ...newConfig }));
    };

    return (
        <PDFContext.Provider
            value={{
                config,
                setConfig,
                loading,
                setLoading,
                error,
                setError,
            }}
        >
            {children}
        </PDFContext.Provider>
    );
}

export function usePDFContext() {
    const context = useContext(PDFContext);
    if (!context) {
        throw new Error('usePDFContext must be used within a PDFProvider');
    }
    return context;
}