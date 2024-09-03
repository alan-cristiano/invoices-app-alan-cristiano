import CardWrapper from "@/components/dashboard/overview/cards";
import { LatestInvoices } from "@/components/dashboard/overview/latest-invoices";
import { RevenueChart } from "@/components/dashboard/overview/revenue-chart";
import { lusitana } from "@/fonts";

export default async function Page() {
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <CardWrapper />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart />
                <LatestInvoices />
            </div>
        </main>
    );
}
