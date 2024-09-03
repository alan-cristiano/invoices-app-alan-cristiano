import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    createUsers();
    createCustomers();
    createRevenue();
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

async function createUsers() {
    const DEFAULT_PASSWORD = "123456";
    const HASHED_PASSWORD = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    const alice = await prisma.user.upsert({
        where: { email: "alice@mail.io" },
        update: {},
        create: {
            email: "alice@mail.io",
            name: "Alice",
            password: HASHED_PASSWORD,
        },
    });
    const bob = await prisma.user.upsert({
        where: { email: "bob@mail.io" },
        update: {},
        create: {
            email: "bob@mail.io",
            name: "Bob",
            password: HASHED_PASSWORD,
        },
    });
    const john = await prisma.user.upsert({
        where: { email: "john@mail.io" },
        update: {},
        create: {
            email: "john@mail.io",
            name: "John",
            password: HASHED_PASSWORD,
        },
    });
    console.log({ alice, bob, john });
}

async function createCustomers() {
    const jack = await prisma.customer.upsert({
        where: { email: "jack@mail.io" },
        update: {},
        create: {
            name: "Jack",
            email: "jack@mail.io",
            image_url: "/customers/blue-circle.png",
            invoices: {
                create: [
                    {
                        amount: 5000,
                        status: "paid",
                    },
                    {
                        amount: 4500,
                        status: "pending",
                    },
                    {
                        amount: 6000,
                        status: "paid",
                    },
                    {
                        amount: 9850,
                        status: "pending",
                    },
                    {
                        amount: 3500,
                        status: "paid",
                    },
                ],
            },
        },
    });
    const jess = await prisma.customer.upsert({
        where: { email: "jess@mail.io" },
        update: {},
        create: {
            name: "Jess",
            email: "jess@mail.io",
            image_url: "/customers/red-circle.png",
            invoices: {
                create: [
                    {
                        amount: 1250,
                        status: "pending",
                    },
                    {
                        amount: 100,
                        status: "pending",
                    },
                    {
                        amount: 8540,
                        status: "paid",
                    },
                    {
                        amount: 22500,
                        status: "paid",
                    },
                    {
                        amount: 31500,
                        status: "pending",
                    },
                ],
            },
        },
    });

    const invoices = await prisma.invoice.findMany();

    console.log({ jack, jess });
    console.log(invoices);
}

async function createRevenue() {
    await prisma.revenue.deleteMany();

    const anualRevenue = await prisma.revenue.createMany({
        data: [
            {
                month: "Jan",
                revenue: 5000,
            },
            {
                month: "Fev",
                revenue: 6500,
            },
            {
                month: "Mar",
                revenue: 6200,
            },
            {
                month: "Apr",
                revenue: 7850,
            },
            {
                month: "May",
                revenue: 8350,
            },
            {
                month: "Jun",
                revenue: 9800,
            },
            {
                month: "Jul",
                revenue: 8000,
            },
            {
                month: "Aug",
                revenue: 10200,
            },
            {
                month: "Sep",
                revenue: 14000,
            },
            {
                month: "Oct",
                revenue: 13100,
            },
            {
                month: "Nov",
                revenue: 15000,
            },
            {
                month: "Dec",
                revenue: 16000,
            },
        ],
    });

    console.log(anualRevenue);
}
