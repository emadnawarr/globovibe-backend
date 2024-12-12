/*
  Warnings:

  - You are about to drop the column `publishedAt` on the `Event` table. All the data in the column will be lost.
  - Added the required column `publish_date` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "publishedAt",
ADD COLUMN     "publish_date" TIMESTAMP(3) NOT NULL;
