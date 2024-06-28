/*
  Warnings:

  - You are about to drop the column `isPublic` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPublic";
