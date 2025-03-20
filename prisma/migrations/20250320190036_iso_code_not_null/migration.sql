/*
  Warnings:

  - Made the column `iso_code` on table `Country` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "iso_code" SET NOT NULL;
