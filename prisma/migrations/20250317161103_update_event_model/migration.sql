/*
  Warnings:

  - The values [SPORTS,POLITICS,TECHNOLOGY,ENTERTAINMENT,OTHER] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('top', 'politics', 'domestic', 'other');
ALTER TABLE "Event" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "article_id" TEXT NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'UNKNOWN',
ALTER COLUMN "content" DROP NOT NULL;
