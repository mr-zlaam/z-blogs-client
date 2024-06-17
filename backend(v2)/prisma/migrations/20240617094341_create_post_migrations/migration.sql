-- CreateTable
CREATE TABLE "BlogPost" (
    "blogId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "blogTitle" TEXT NOT NULL,
    "blogDescription" TEXT NOT NULL,
    "blogSlug" TEXT NOT NULL,
    "blogThumbnail" TEXT NOT NULL,
    "blogThumbnailAuthor" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("blogId")
);

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
