export interface Company {
    name: string;
    address: string;
    city: string;
    siret: string;
    email: string;
    phone: string;
    logo?: string;
}

export interface Client {
    name: string;
    company: string;
    address: string;
    city: string;
    email: string;
}

export interface LineItem {
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface InvoiceData {
    number: string;
    date: string;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
    company: Company;
    client: Client;
    items: LineItem[];
    discount: number;
    tax: number;
}

export interface TemplateOptions {
    showLogo?: boolean;
    showPaymentInfo?: boolean;
    primaryColor?: string;
    secondaryColor?: string;
}