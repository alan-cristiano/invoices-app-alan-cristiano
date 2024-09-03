"use server";

import { z } from "zod";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const formSchema = z.object({
    id: z.number(),
    customerId: z.coerce.number().gt(0, {
        message: "Please select a customer.",
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: "Please enter an amount greater than $0." }),
    status: z.enum(["pending", "paid"], {
        invalid_type_error: "Please select an invoice status.",
    }),
    date: z.date(),
});

const CreateInvoice = formSchema.omit({ id: true, date: true });
const UpdateInvoice = formSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to create invoice.",
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await prisma.invoice.create({
            data: {
                customer_id: customerId,
                amount: amountInCents,
                status: status,
            },
        });
    } catch (error) {
        return {
            message: "Database Error: failed to Create Invoice.",
        };
    }

    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
}

export async function updateInvoice(
    id: number,
    prevState: State,
    formData: FormData
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get("customerId"),
        amount: formData.get("amount"),
        status: formData.get("status"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing fields. Failed to update invoice.",
        };
    }
    const { customerId, amount, status } = validatedFields.data;

    const amountInCents = amount * 100;

    try {
        await prisma.invoice.update({
            where: { id: id },
            data: {
                customer_id: customerId,
                amount: amountInCents,
                status: status,
            },
        });
    } catch (error) {
        return {
            message: "Database Error: failed to Update Invoice.",
        };
    }

    revalidatePath("/dashboard/invoices");
    redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: number) {
    // throw new Error("Failed to Delete Invoice");
    try {
        await prisma.invoice.delete({ where: { id: id } });
    } catch (error) {
        return {
            message: "Database Error: failed to Delete Invoice.",
        };
    }
    revalidatePath("/dashboard/invoices");
}
