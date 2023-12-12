/*
  Warnings:

  - You are about to drop the column `group` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `match_number` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `round` on the `results` table. All the data in the column will be lost.
  - You are about to drop the column `winner_id` on the `results` table. All the data in the column will be lost.
  - Added the required column `athlete_id` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `results` DROP FOREIGN KEY `Results_winner_id_fkey`;

-- AlterTable
ALTER TABLE `results` DROP COLUMN `group`,
    DROP COLUMN `match_number`,
    DROP COLUMN `round`,
    DROP COLUMN `winner_id`,
    ADD COLUMN `athlete_id` INTEGER NOT NULL,
    ADD COLUMN `medal` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_athlete_id_fkey` FOREIGN KEY (`athlete_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
