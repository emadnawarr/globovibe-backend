/*
  Warnings:

  - Changed the type of `category` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "category_old" "Category"[],
DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL;
