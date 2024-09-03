import Breadcrumbs from "@/components/dashboard/invoices/breadcrumbs";
import Form from "@/components/dashboard/invoices/edit-form";
import { fetchCustomers, fetchInvoiceById } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Edit Invoice",
};

export default async function Page({ params }: { params: { id: number } }) {
    const id = Number(params.id);

    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ]);

    console.log("invoice =>", invoice);

    if (!invoice) notFound();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        label: "Invoices",
                        href: "/dashboard/invoices",
                    },
                    {
                        label: "Edit Invoice",
                        href: `/dashboard/invoices/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}
