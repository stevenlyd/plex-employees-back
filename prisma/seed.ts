import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const employee1 = await prisma.employee.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@plexxis.com',
      phone: '6476476647',
      gender: 'male',
      position: 'developer',
      department: 'R&D',
      directReports: [],
      directSuperiors: [],
    },
  });

  const employee2 = await prisma.employee.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: 'Mary',
      lastName: 'Kent',
      email: 'marykent@plexxis.com',
      phone: '6476476648',
      gender: 'female',
      position: 'director',
      department: 'R&D',
      directReports: [],
      directSuperiors: [],
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
