import { deleteInvoice } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteInvoice({ id }: { id: number }) {
    const deleteInvoiceWithId = deleteInvoice.bind(null, id);
    return (
        <form action={deleteInvoiceWithId}>
            <button
                type="submit"
                className="rounded-md border p-2 hover:bg-gray-100"
            >
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}
