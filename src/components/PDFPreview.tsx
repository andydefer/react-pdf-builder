// src/components/PDFPreview.tsx
import { ReactNode, useEffect } from 'react';

export interface PDFPreviewProps {
    /** Le document à prévisualiser */
    children: ReactNode;
    /** Largeur en vw (défaut: 80) */
    width?: number;
    /** Hauteur en vh (défaut: 80) */
    height?: number;
    /** Appelé quand le preview se ferme */
    onClose: () => void;
}

export function PDFPreview({
    children,
    width = 80,
    height = 80,
    onClose
}: PDFPreviewProps) {
    // ✅ Gérer la touche Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // ✅ Empêcher le scroll du body
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backdropFilter: 'blur(4px)',
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    width: `${width}vw`,
                    height: `${height}vh`,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    overflow: 'auto',
                    padding: '20px',
                    position: 'relative',
                }}
            >
                {/* Bouton de fermeture */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'sticky',
                        top: 0,
                        float: 'right',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.2s',
                        flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    ✕
                </button>

                {/* Le document */}
                {children}
            </div>
        </div>
    );
}

export default PDFPreview;