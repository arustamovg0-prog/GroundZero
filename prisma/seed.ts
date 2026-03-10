import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Locations
  const locations = [
    { name: "Kitob Olami", address: "Проспект Мустакиллик, 6/7" },
    { name: "Minor", address: "Массив Минор, 57" },
    { name: "Sharq", address: "2-й проезд Тараккиёт, 33" },
  ];

  for (const loc of locations) {
    await prisma.location.upsert({
      where: { id: locations.indexOf(loc) + 1 },
      update: {},
      create: {
        id: locations.indexOf(loc) + 1,
        name: loc.name,
        address: loc.address,
      },
    });
  }

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
