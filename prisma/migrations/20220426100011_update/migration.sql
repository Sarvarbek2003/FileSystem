/*
  Warnings:

  - Changed the type of `fileSize` on the `Files` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Files" DROP COLUMN "fileSize",
ADD COLUMN     "fileSize" INTEGER NOT NULL;
