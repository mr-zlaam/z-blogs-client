/*
  Warnings:

  - A unique constraint covering the columns `[blogSlug]` on the table `BlogPost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_blogSlug_key" ON "BlogPost"("blogSlug");
