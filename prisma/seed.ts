import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const employee1 = await prisma.employee.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@plexxis.com",
      phone: "6476476647",
      position: "developer",
      department: "R&D",
    },
  });

  const employee2 = await prisma.employee.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: "Mary",
      lastName: "Kent",
      email: "marykent@plexxis.com",
      phone: "6476476648",
      position: "director",
      department: "R&D",
    },
  });

  console.log({ employee1, employee2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
