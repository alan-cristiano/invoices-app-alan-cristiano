export type Revenue = {
    month: string;
    revenue: number;
};

export type CustomerField = {
    id: number;
    name: string;
    email: string;
    image_url: string;
};

export type Invoice = {
    id: number;
    amount: number;
    status: string;
    date: Date;
    customer_id: number;
};

export type InvoiceForm = {
    id: number;
    amount: number;
    status: string;
    customer_id: number;
};

export type FormattedCustomersTable = {
    id: number;
    name: string;
    email: string;
    image_url: string;
    invoices: Invoice[];
    _count: { invoices: number };
    total_paid: string;
    total_pending: string;
};
