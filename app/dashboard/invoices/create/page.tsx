import Breadcrumbs from "@/components/dashboard/invoices/breadcrumbs";
import Form from "@/components/dashboard/invoices/create-form";
import { fetchCustomers } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Invoice",
};

export default async function Page() {
    const customers = await fetchCustomers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Invoices", href: "/dashboard/invoices" },
                    {
                        label: "Create Invoice",
                        href: "/dashboard/invoices/create",
                        active: true,
                    },
                ]}
            />
            <Form customers={customers} />
        </main>
    );
}
