import { Invoice } from "./definitions";
import { prisma } from "./prisma";
import { formatCurrency } from "./utils";

export async function fetchLatestInvoices() {
    try {
        const data = await prisma.invoice.findMany({
            select: {
                amount: true,
                id: true,
                customer: {
                    select: {
                        name: true,
                        email: true,
                        image_url: true,
                    },
                },
            },
            orderBy: {
                id: "desc",
            },
            take: 5,
        });

        const latestInvoices = data.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));

        return latestInvoices;
    } catch (error) {
        console.error("Database Error: ", error);
        throw new Error("Failed to fetch the latest invoices");
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
    query: string,
    currentPage: number
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const data = await prisma.invoice.findMany({
            include: {
                customer: {
                    select: {
                        name: true,
                        email: true,
                        image_url: true,
                    },
                },
            },
            where: {
                OR: [
                    { customer: { name: { contains: query } } },
                    { customer: { email: { contains: query } } },
                    { status: { contains: query } },
                ],
            },
            orderBy: { id: "desc" },
            take: ITEMS_PER_PAGE,
            skip: offset,
        });
        return data;
    } catch (error) {
        console.error("Database Error: ", error);
        throw new Error("Failed to fetch invoices");
    }
}

export async function fetchInvoicesPages(query: string) {
    try {
        const count = await prisma.invoice.count({
            where: {
                OR: [
                    { customer: { name: { contains: query } } },
                    { customer: { email: { contains: query } } },
                    { status: { contains: query } },
                ],
            },
        });
        const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch total number of invoices");
    }
}

export async function fetchRevenue() {
    const data = await prisma.revenue.findMany();
    return data;
}

export async function fetchCardData() {
    try {
        const invoiceCountPromise = prisma.invoice.count();
        const customerCountPromise = prisma.customer.count();
        const paidInvoicePromise = prisma.invoice.findMany({
            where: { status: "paid" },
        });
        const pendingInvoicePromise = prisma.invoice.findMany({
            where: { status: "pending" },
        });

        const data = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            paidInvoicePromise,
            pendingInvoicePromise,
        ]);

        const numberOfInvoices = data[0];
        const numberOfCustomers = data[1];
        const totalPaidInvoices = formatCurrency(
            data[2].reduce((acc, invoice) => {
                return acc + invoice.amount;
            }, 0)
        );
        const totalPendingInvoices = formatCurrency(
            data[3].reduce((acc, invoice) => {
                return acc + invoice.amount;
            }, 0)
        );
        return {
            numberOfInvoices,
            numberOfCustomers,
            totalPaidInvoices,
            totalPendingInvoices,
        };
    } catch (error) {
        console.error("Database Error: ", error);
        throw new Error("Failed to fetch card data.");
    }
}

export async function fetchCustomers() {
    try {
        const data = await prisma.customer.findMany({
            orderBy: { name: "asc" },
        });
        return data;
    } catch (error) {
        console.error("Database Error: ", error);
        throw new Error("Failed to fetch all customers.");
    }
}

export async function fetchFilteredCustomers(query: string) {
    try {
        const data = await prisma.customer.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { email: { contains: query } },
                ],
            },
            include: {
                invoices: true,
                _count: {
                    select: { invoices: true },
                },
            },
            orderBy: { name: "asc" },
        });

        const customers = data.map((customer) => {
            let totalPaidInvoice = 0;
            let totalPendingInvoice = 0;

            customer.invoices.map((invoice) => {
                if (invoice.status.toLowerCase() === "paid") {
                    totalPaidInvoice += invoice.amount;
                }
                if (invoice.status.toLowerCase() === "pending") {
                    totalPendingInvoice += invoice.amount;
                }
            });

            return {
                ...customer,
                total_paid: formatCurrency(totalPaidInvoice),
                total_pending: formatCurrency(totalPendingInvoice),
            };
        });
        // console.log("customer -> ", customers);

        return customers;
    } catch (error) {
        console.error("Database Error: ", error);
        throw new Error("Failed to fetch customers table.");
    }
}

export async function fetchInvoiceById(id: string) {
    try {
        const data = (await prisma.invoice.findUnique({
            where: { id: id },
        })) as Invoice;

        if (data) {
            const invoice = { ...data, amount: data.amount / 100 };
            return invoice;
        }
    } catch (error) {
        console.error("Database Error: ", error);
        throw new Error("Faild to fetch invoice.");
    }
}
