import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// Define seed data for users, tasks, and subtasks
const userData: Prisma.UserCreateInput[] = [
  {
    email: 'nilawdu@prisma.io',
    tasks: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          completed: false,
          date: new Date(),
          deadline: new Date('2024-12-31T23:59:59'),
          expectedDuration: 60,
          currentDuration: 0,
          subtasks: {
            create: [
              {
                title: 'Visit Prisma Twitter profile',
                completed: false,
                date: new Date(),
                deadline: new Date('2024-12-31T23:59:59'),
                expectedDuration: 30,
                currentDuration: 0,
              },
              {
                title: 'Follow Prisma Twitter',
                completed: false,
                date: new Date(),
                deadline: new Date('2024-12-31T23:59:59'),
                expectedDuration: 10,
                currentDuration: 0,
              },
            ],
          },
        },
      ],
    },
  },
  {
    email: 'mahmouawdd@prisma.io',
    tasks: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          completed: false,
          date: new Date(),
          deadline: new Date('2024-12-15T23:59:59'),
          expectedDuration: 120,
          currentDuration: 0,
          subtasks: {
            create: [
              {
                title: 'Create a GitHub issue',
                completed: false,
                date: new Date(),
                deadline: new Date('2024-12-15T23:59:59'),
                expectedDuration: 60,
                currentDuration: 0,
              },
              {
                title: 'Wait for responses',
                completed: false,
                date: new Date(),
                deadline: new Date('2024-12-15T23:59:59'),
                expectedDuration: 30,
                currentDuration: 0,
              },
            ],
          },
        },
        {
          title: 'Prisma on YouTube',
          completed: false,
          date: new Date(),
          deadline: new Date('2024-12-20T23:59:59'),
          expectedDuration: 90,
          currentDuration: 0,
        },
      ],
    },
  },
]

// This function creates users, tasks, and subtasks in the database
async function main() {
  console.log('Start seeding ...')

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })