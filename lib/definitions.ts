export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type Revenue = {
    month: string;
    revenue: number;
};

export type CustomerField = {
    id: string;
    name: string;
    email: string;
    image_url: string;
};

export type Invoice = {
    id: string;
    amount: number;
    status: string;
    date: Date;
    customer_id: string;
};

export type InvoiceForm = {
    id: string;
    amount: number;
    status: string;
    customer_id: string;
};

export type FormattedCustomersTable = {
    id: string;
    name: string;
    email: string;
    image_url: string;
    invoices: Invoice[];
    _count: { invoices: number };
    total_paid: string;
    total_pending: string;
};
