import CustomersTable from "@/components/dashboard/customers/table";
import { fetchFilteredCustomers } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Customers",
};

export default async function Page({
    searchParams,
}: {
    searchParams?: { query?: string; page?: string };
}) {
    const query = searchParams?.query || "";
    const customers = await fetchFilteredCustomers(query);

    return (
        <main>
            <CustomersTable customers={customers} />
        </main>
    );
}
