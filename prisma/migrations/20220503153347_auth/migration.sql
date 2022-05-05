/*
  Warnings:

  - The primary key for the `files` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fileName` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `files` table. All the data in the column will be lost.
  - Added the required column `fileinfo` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filepath` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filesize` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" DROP CONSTRAINT "files_pkey",
DROP COLUMN "fileName",
DROP COLUMN "filePath",
DROP COLUMN "fileSize",
DROP COLUMN "id",
DROP COLUMN "title",
ADD COLUMN     "fileId" SERIAL NOT NULL,
ADD COLUMN     "fileinfo" VARCHAR(200) NOT NULL,
ADD COLUMN     "filename" VARCHAR(15) NOT NULL,
ADD COLUMN     "filepath" TEXT NOT NULL,
ADD COLUMN     "filesize" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "files_pkey" PRIMARY KEY ("fileId");

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL NOT NULL,
    "username" VARCHAR(15) NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);
