import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Seed users
  // const userCount = 1000; // Adjust as needed
  // const users = Array.from({ length: userCount }).map(() => ({
  //   username: faker.internet.userName(),
  //   fullName: faker.person.firstName(),
  //   email: faker.internet.email(),
  //   password: faker.internet.password(),
  //   role: faker.helpers.arrayElement(["ADMIN", "MODERATOR", "USER"]),
  // }));

  // await prisma.user.createMany({
  //   data: users,
  // });

  // Seed blog posts
  const blogPostCount = 5000; // Adjust as needed
  const blogPosts = Array.from({ length: blogPostCount }).map(() => ({
    blogTitle: faker.lorem.sentence(),
    blogDescription: faker.lorem.paragraph(),
    blogOverView: faker.lorem.paragraph(),
    blogSlug: faker.lorem.slug(),
    blogThumbnail: faker.image.url(),
    blogThumbnailAuthor: faker.person.firstName(),
    isPublic: true,
    authorId: "cm14ybi5r00019du35pljn9b0", // Ensure this matches with existing user IDs
  }));

  await prisma.blogPost.createMany({
    data: blogPosts,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
