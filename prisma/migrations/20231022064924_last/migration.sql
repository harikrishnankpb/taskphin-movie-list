/*
  Warnings:

  - You are about to drop the column `raiting` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "raiting",
ADD COLUMN     "rating" INTEGER;
