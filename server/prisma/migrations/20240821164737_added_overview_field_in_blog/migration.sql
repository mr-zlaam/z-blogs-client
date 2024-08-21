-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "blogOverView" TEXT;

-- CreateIndex
CREATE INDEX "BlogPost_blogTitle_idx" ON "BlogPost"("blogTitle");
