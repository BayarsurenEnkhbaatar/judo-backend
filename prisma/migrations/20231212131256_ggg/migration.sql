/*
  Warnings:

  - Added the required column `org_id` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `results` ADD COLUMN `org_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
