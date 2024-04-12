import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.upsert({
        where: {
            email: "testuser@email.com",
        },
        update: {},
        create: {
            email: "testuser@email.com",
            name: "Test User",
            password: "password",
        },
    });

    const invoices = [];
    for (let i = 1; i <= 50; i++) {
        invoices.push({
            vendor_name: `Vendor ${i}`,
            amount: Math.floor(Math.random() * 10000) + 100, // Random amount between 100 and 10100
            due_date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            description: `Description for invoice ${i}`,
            user_id: user.id,
            paid: Math.random() > 0.5
        });
    }

    await prisma.invoice.createMany({
        data: invoices,
        skipDuplicates: true, // Skip if there are duplicates
    });
}

main().then(() => {
    console.log("Seed complete");
    prisma.$disconnect();
}).catch((e) => {
    console.error(e);
    prisma.$disconnect();
});