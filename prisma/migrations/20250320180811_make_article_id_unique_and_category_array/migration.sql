/*
  Warnings:

  - A unique constraint covering the columns `[article_id]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Changed the column `category` on the `Event` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN "category_new" "Category"[] DEFAULT ARRAY[]::"Category"[];

UPDATE "Event"
SET "category_new" = ARRAY["category"];

ALTER TABLE "Event" DROP COLUMN "category";

ALTER TABLE "Event" RENAME COLUMN "category_new" TO "category";

-- -- CreateIndex
 CREATE UNIQUE INDEX "Event_article_id_key" ON "Event"("article_id");
