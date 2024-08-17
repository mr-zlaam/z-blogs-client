-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,
    "otp" TEXT,
    "otpExpiry" TIMESTAMP(3),
    "isVerfied" BOOLEAN NOT NULL DEFAULT false,
    "otpRequestCount" INTEGER DEFAULT 0,
    "lastOtpRequest" TIMESTAMP(3),
    "cooldownExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "blogId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "blogTitle" TEXT NOT NULL,
    "blogDescription" TEXT NOT NULL,
    "blogSlug" TEXT NOT NULL,
    "blogThumbnail" TEXT NOT NULL,
    "blogThumbnailAuthor" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("blogId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_otp_key" ON "User"("otp");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_createdAt_idx" ON "User"("role", "createdAt");

-- CreateIndex
CREATE INDEX "otp_user_idx" ON "User"("otp");

-- CreateIndex
CREATE INDEX "role_name_user_idx" ON "User"("role", "username");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_blogSlug_key" ON "BlogPost"("blogSlug");

-- CreateIndex
CREATE INDEX "BlogPost_authorId_idx" ON "BlogPost"("authorId");

-- CreateIndex
CREATE INDEX "BlogPost_blogSlug_idx" ON "BlogPost"("blogSlug");

-- CreateIndex
CREATE INDEX "BlogPost_isPublic_createdAt_idx" ON "BlogPost"("isPublic", "createdAt");

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
