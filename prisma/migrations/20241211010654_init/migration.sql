-- CreateEnum
CREATE TYPE "Region" AS ENUM ('NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SPORTS', 'POLITICS', 'TECHNOLOGY', 'ENTERTAINMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "MoodType" AS ENUM ('HAPPY', 'SAD', 'ANGRY', 'NEUTRAL');

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "region" "Region" NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "type" "MoodType" NOT NULL,
    "intensity" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "country_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood_Prediction" (
    "id" SERIAL NOT NULL,
    "type" "MoodType" NOT NULL,
    "intensity" DOUBLE PRECISION NOT NULL,
    "confidence_level" DOUBLE PRECISION NOT NULL,
    "prediction_date" TIMESTAMP(3) NOT NULL,
    "country_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "Mood_Prediction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood_Prediction" ADD CONSTRAINT "Mood_Prediction_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood_Prediction" ADD CONSTRAINT "Mood_Prediction_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
