"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
            blogTitle: faker_1.faker.lorem.sentence(),
            blogDescription: faker_1.faker.lorem.paragraph(),
            blogOverView: faker_1.faker.lorem.paragraph(),
            blogSlug: faker_1.faker.lorem.slug(),
            blogThumbnail: faker_1.faker.image.url(),
            blogThumbnailAuthor: faker_1.faker.person.firstName(),
            isPublic: true,
            authorId: "cm14ybi5r00019du35pljn9b0", // Ensure this matches with existing user IDs
        }));
        yield prisma.blogPost.createMany({
            data: blogPosts,
        });
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
