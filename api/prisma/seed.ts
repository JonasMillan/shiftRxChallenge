import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password", 10);

  // --- Create/Upsert Users and Their First Posts in a Chain ---
    await prisma.user.upsert({
      where: { email: "alice@example.com" },
      update: {},
      create: {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: password,
        auctions: {
          create: {
            title: "Antique Painting",
            description: "Beautiful oil painting from the 19th century",
            startingPrice: 500.0,
            currentPrice: 500.0,
            endTime: new Date("2024-08-01T12:00:00Z"),
          },
        },
      },
    });

    await prisma.user.upsert({
      where: { email: "bob@example.com" },
      update: {},
      create: {
        name: "Bob Johnson",
        email: "bob@example.com",
        password: password,
        auctions: {
          create: {
            title: "Antique Food",
            description: "food from another planet",
            startingPrice: 500.0,
            currentPrice: 500.0,
            endTime: new Date("2024-08-01T12:00:00Z"),
          },
        },
      },
    })
    await prisma.user.upsert({
      where: { email: "carl@example.com" },
      update: {},
      create: {
        name: "Carl Johnson",
        email: "carl@example.com",
        password: password,
        auctions: {
          create: {
            title: "Carl Dog",
            description: "just selling my dog",
            startingPrice: 500.0,
            currentPrice: 500.0,
            endTime: new Date("2024-08-01T12:00:00Z"),
          },
        },
      },
    })
}

// --- Error Handling and Cleanup ---
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
