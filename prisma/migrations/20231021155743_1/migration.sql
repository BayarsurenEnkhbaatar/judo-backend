/*
  Warnings:

  - Added the required column `category_id` to the `Athlete_to_comptation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `Athlete_to_comptation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `athlete_to_comptation` ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `org_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Athlete_to_comptation` ADD CONSTRAINT `Athlete_to_comptation_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athlete_to_comptation` ADD CONSTRAINT `Athlete_to_comptation_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
