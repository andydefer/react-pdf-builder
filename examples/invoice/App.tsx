import React, { useState } from 'react';
import {
    Flex,
    Grid,
    Box,
    Text,
    Heading,
    Table,
    Badge,
    Divider,
    TotalBox,
    QRCode,
    Barcode,
    Page,
    usePdf,
    PDFPreview,
} from '../../src';
import { Eye, Download, Loader2 } from 'lucide-react';

function InvoiceDocument() {
    const items = [
        { description: 'E-commerce Website Development', quantity: 1, unitPrice: 850.00, total: 850.00 },
        { description: 'Payment System Integration', quantity: 1, unitPrice: 350.00, total: 350.00 },
        { description: 'Premium Hosting (1 year)', quantity: 12, unitPrice: 25.00, total: 300.00 },
        { description: 'Maintenance & Support (3 months)', quantity: 3, unitPrice: 120.00, total: 360.00 },
    ];

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const discount = 50.00;
    const tax = 20;
    const total = subtotal - discount + ((subtotal - discount) * tax / 100);

    return (
        <>
            {/* ===== PAGE 1 ===== */}
            <Page>
                <Box className="border border-border rounded-lg p-2 bg-card">
                    {/* HEADER */}
                    <Flex direction="row" justify="between" className="mb-8">
                        <Flex direction="column" gap={1}>
                            <Heading level={1} className="text-foreground">INVOICE</Heading>
                            <Text className="text-muted-foreground">#INV-2026-001</Text>
                        </Flex>
                        <Flex direction="column" align="end" gap={1}>
                            <Text variant="body" className="font-bold text-foreground">WebStudio Pro</Text>
                            <Text variant="small" className="text-muted-foreground">123 Avenue des Créateurs</Text>
                            <Text variant="small" className="text-muted-foreground">75000 Paris</Text>
                            <Text variant="small" className="text-muted-foreground">contact@webstudio.fr</Text>
                            <Text variant="small" className="text-muted-foreground">+33 1 23 45 67 89</Text>
                        </Flex>
                    </Flex>

                    <Divider className="border-border mb-6" />

                    {/* CLIENT INFO */}
                    <Flex direction="row" justify="between" className="my-6" style={{ gap: '40px' }}>
                        <Box className="p-4 rounded-lg bg-muted/50 border border-border flex-1">
                            <Text variant="small" className="text-muted-foreground mb-2">BILL TO</Text>
                            <Text className="font-bold text-foreground">Jean Dupont</Text>
                            <Text className="text-sm text-foreground">45 Rue du Commerce</Text>
                            <Text className="text-sm text-foreground">69000 Lyon</Text>
                            <Text className="text-sm text-foreground">jean.dupont@example.com</Text>
                        </Box>

                        <Box className="p-4 rounded-lg bg-muted/50 border border-border flex-1">
                            <Text variant="small" className="text-muted-foreground mb-2">INVOICE DETAILS</Text>
                            <Text className="text-sm text-foreground"><strong>Date:</strong> 19/07/2026</Text>
                            <Text className="text-sm text-foreground"><strong>Due Date:</strong> 18/08/2026</Text>
                            <Text className="text-sm text-foreground"><strong>Payment:</strong> Bank Transfer</Text>
                            <div className="mt-2">
                                <Badge variant="warning">Pending</Badge>
                            </div>
                        </Box>
                    </Flex>

                    {/* TABLEAU DES ARTICLES */}
                    <Table
                        columns={[
                            { key: 'description', label: 'Description', width: '50%' },
                            { key: 'quantity', label: 'Qty', align: 'center' },
                            { key: 'unitPrice', label: 'Price', align: 'right' },
                            { key: 'total', label: 'Total', align: 'right' },
                        ]}
                        data={items}
                        bordered
                        striped
                        className="my-6"
                    />

                    {/* TOTAUX */}
                    <Flex direction="row" justify="end">
                        <TotalBox
                            subtotal={subtotal}
                            discount={discount}
                            tax={tax}
                            shipping={0}
                            total={total}
                            className="w-64"
                            style={{
                                backgroundColor: 'hsl(var(--muted) / 0.5)',
                                padding: '16px',
                                borderRadius: '8px',
                                width: '280px',
                                border: '1px solid hsl(var(--border))',
                            }}
                        />
                    </Flex>

                    <Divider className="border-border my-8" />

                    {/* FOOTER PAGE 1 */}
                    <Flex direction="row" justify="between">
                        <Flex direction="column" gap={1}>
                            <Text variant="small" className="text-muted-foreground">
                                <strong>Payment Terms:</strong> Due in 30 days
                            </Text>
                            <Text variant="small" className="text-muted-foreground">
                                <strong>IBAN:</strong> FR76 1234 5678 9012 3456 7890 123
                            </Text>
                            <Text variant="small" className="text-muted-foreground">
                                <strong>BIC:</strong> AGRIFRPP
                            </Text>
                        </Flex>
                        <Flex direction="column" align="end">
                            <Text variant="small" className="text-muted-foreground">
                                Thank you for your business!
                            </Text>
                            <Text variant="small" className="text-muted-foreground text-[11px]">
                                Generated on {new Date().toLocaleDateString()}
                            </Text>
                        </Flex>
                    </Flex>

                    {/* QR CODE PAGE 1 */}
                    <Flex direction="row" justify="center" className="mt-6">
                        <QRCode
                            value={`https://example.com/invoice/INV-2026-001`}
                            size={100}
                            fgColor="#1a1a2e"
                            bgColor="#ffffff"
                        />
                    </Flex>
                </Box>
            </Page>

            {/* ===== PAGE 2 ===== */}
            <Page>
                <Box className="border border-border rounded-lg p-2 bg-card">
                    <Heading level={2} className="text-foreground mb-6">
                        Document Information
                    </Heading>

                    <Divider className="border-border mb-6" />

                    {/* QR CODE + BARCODE */}
                    <Grid columns={2} gap={6}>
                        <Box className="bg-muted/50 p-6 rounded-lg border border-border text-center">
                            <Text variant="h5" className="text-foreground mb-4">QR Code</Text>
                            <QRCode
                                value={`https://example.com/invoice/INV-2026-001`}
                                size={150}
                                fgColor="#4338ca"
                                bgColor="#ffffff"
                                level="H"
                            />
                            <Text variant="small" className="text-muted-foreground mt-3">
                                Scan for invoice details
                            </Text>
                        </Box>

                        <Box className="bg-muted/50 p-6 rounded-lg border border-border text-center">
                            <Text variant="h5" className="text-foreground mb-4">Barcode</Text>
                            <Barcode
                                value="INV-2026-001"
                                format="CODE128"
                                width={2}
                                height={80}
                                displayValue={true}
                                fontSize={14}
                            />
                            <Text variant="small" className="text-muted-foreground mt-3">
                                Invoice Reference
                            </Text>
                        </Box>
                    </Grid>

                    <Divider className="border-border my-6" />

                    {/* EAN-13 + Client QR */}
                    <Grid columns={2} gap={6}>
                        <Box className="bg-muted/50 p-6 rounded-lg border border-border text-center">
                            <Text variant="h5" className="text-foreground mb-4">EAN-13</Text>
                            <Barcode
                                value="123456789012"
                                format="EAN13"
                                width={2}
                                height={60}
                                displayValue={true}
                                fontSize={12}
                            />
                        </Box>

                        <Box className="bg-muted/50 p-6 rounded-lg border border-border text-center">
                            <Text variant="h5" className="text-foreground mb-4">Client QR</Text>
                            <QRCode
                                value={`client:jean.dupont@example.com`}
                                size={100}
                                fgColor="#059669"
                                bgColor="#ffffff"
                            />
                            <Text variant="small" className="text-muted-foreground mt-3">
                                Client Identifier
                            </Text>
                        </Box>
                    </Grid>

                    <Divider className="border-border my-6" />

                    {/* FOOTER PAGE 2 */}
                    <Flex direction="row" justify="between">
                        <Flex direction="column" gap={1}>
                            <Text variant="small" className="text-muted-foreground">
                                <strong>Document ID:</strong> DOC-2026-001
                            </Text>
                            <Text variant="small" className="text-muted-foreground">
                                <strong>Version:</strong> 1.0
                            </Text>
                        </Flex>
                        <Flex direction="column" align="end">
                            <Text variant="small" className="text-muted-foreground">
                                Page 2 / 2
                            </Text>
                            <Text variant="small" className="text-muted-foreground text-[11px]">
                                Generated on {new Date().toLocaleDateString()}
                            </Text>
                        </Flex>
                    </Flex>
                </Box>
            </Page>
        </>
    );
}

export default function InvoiceExample() {
    const [showPreview, setShowPreview] = useState(false);
    const { download, loading } = usePdf(<InvoiceDocument />);

    return (
        <div className="p-8 bg-background min-h-screen" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="text-2xl font-bold mb-4 text-foreground">
                Invoice Generator
            </h1>

            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={() => setShowPreview(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-all duration-200 font-medium"
                >
                    <Eye size={18} />
                    Preview
                </button>

                <button
                    onClick={() => download({
                        filename: 'invoice_INV-2026-001.pdf',
                        containerWidth: 900,
                        containerPadding: 40,
                        containerBackground: '#ffffff',
                    })}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground transition-all duration-200 font-medium"
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Download size={18} />
                            Download Invoice PDF
                        </>
                    )}
                </button>
            </div>

            {showPreview && (
                <PDFPreview
                    width={90}
                    height={85}
                    onClose={() => setShowPreview(false)}
                >
                    <InvoiceDocument />
                </PDFPreview>
            )}
        </div>
    );
}