import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Inventory
  const branches = ["Kitob Olami", "Minor", "Sharq"];
  const products = ["team", "event", "virtual", "resident", "meeting"];

  for (const branch of branches) {
    for (const product of products) {
      // Make 'virtual' full in Kitob Olami for testing
      const status = (branch === "Kitob Olami" && product === "virtual") ? "FULL" : "AVAILABLE";
      
      await prisma.inventory.create({
        data: {
          branch,
          product,
          status,
        },
      });
    }
  }

  // Settings
  await prisma.settings.create({
    data: {
      key: "contactEmail",
      value: "info@groundzero.uz",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
