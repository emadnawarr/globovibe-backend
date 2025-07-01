-- CreateEnum
CREATE TYPE "Region" AS ENUM ('Africa', 'Europe', 'Asia', 'North_America', 'South_America', 'Oceania');

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "region" "Region" NOT NULL,
    "iso_code" VARCHAR(2) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "source" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL,
    "article_id" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "language" TEXT NOT NULL DEFAULT 'UNKNOWN',
    "category" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "intensity" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "country_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood_Prediction" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "intensity" DOUBLE PRECISION NOT NULL,
    "confidence_level" DOUBLE PRECISION NOT NULL,
    "prediction_date" TIMESTAMP(3) NOT NULL,
    "country_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "Mood_Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_article_id_key" ON "Event"("article_id");

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
