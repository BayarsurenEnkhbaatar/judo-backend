/*
  Warnings:

  - Added the required column `kg` to the `Athlete_to_comptation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `athlete_to_comptation` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `kg` VARCHAR(191) NOT NULL;
