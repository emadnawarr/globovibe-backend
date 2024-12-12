/*
  Warnings:

  - The values [NORTH,SOUTH,EAST,WEST,CENTRAL] on the enum `Region` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Region_new" AS ENUM ('Africa', 'Europe', 'Asia', 'North_America', 'South_America', 'Oceania');
ALTER TABLE "Country" ALTER COLUMN "region" TYPE "Region_new" USING ("region"::text::"Region_new");
ALTER TYPE "Region" RENAME TO "Region_old";
ALTER TYPE "Region_new" RENAME TO "Region";
DROP TYPE "Region_old";
COMMIT;
