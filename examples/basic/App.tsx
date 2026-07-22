import React, { useRef, useState } from 'react';
import {
    Flex,
    Grid,
    Box,
    Text,
    Heading,
    Divider,
    Page,
    usePDF,
    PDFProvider,
} from '../../src';

function BasicDocument() {
    return (
        <Page>
            <Flex direction="column" gap={4}>
                <Heading level={1} className="text-foreground">
                    Hello World
                </Heading>

                <Text variant="body" className="text-foreground py-3 inline-block">
                    This is a basic example of the PDF generator.
                </Text>

                <Grid columns={2} gap={4}>
                    <Box className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <Text variant="h4" className="text-primary">Column 1</Text>
                        <Text className="text-foreground">Content for column 1</Text>
                    </Box>
                    <Box className="bg-success/10 p-4 rounded-lg border border-success/20">
                        <Text variant="h4" className="text-success">Column 2</Text>
                        <Text className="text-foreground">Content for column 2</Text>
                    </Box>
                </Grid>

                <Divider className="border-border" />

                <Text variant="small" className="text-muted-foreground">
                    Generated on {new Date().toLocaleDateString()}
                </Text>
            </Flex>
        </Page>
    );
}

function BasicExampleContent() {
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { download, loading } = usePDF();

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const container = containerRef.current;
            if (!container) {
                throw new Error('Container not found');
            }

            // ✅ Ancienne API : on passe l'élément HTML en paramètre
            await download(container, {
                filename: 'basic-document.pdf',
                format: 'a4',
                orientation: 'portrait',
                scale: 2,
            });
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const isLoadingState = loading || isLoading;

    return (
        <div className="p-8 bg-background min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-foreground">
                Basic PDF Generator
            </h1>

            {/* ✅ Conteneur avec ref pour le download */}
            <div
                ref={containerRef}
                className="border border-border rounded-lg p-4 bg-card mb-4"
            >
                <BasicDocument />
            </div>

            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={handleDownload}
                    disabled={isLoadingState}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground transition-all duration-200 font-medium"
                >
                    {isLoadingState ? (
                        <>
                            <span className="inline-block animate-spin mr-2">⏳</span>
                            Generating...
                        </>
                    ) : (
                        '⬇️ Download PDF'
                    )}
                </button>
            </div>
        </div>
    );
}

export default function BasicExample() {
    return (
        <PDFProvider>
            <BasicExampleContent />
        </PDFProvider>
    );
}