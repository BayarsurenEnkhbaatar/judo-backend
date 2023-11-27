/*
  Warnings:

  - You are about to drop the column `create_date` on the `organization` table. All the data in the column will be lost.
  - Made the column `created_at` on table `organization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `organization` DROP COLUMN `create_date`,
    ADD COLUMN `created_date` VARCHAR(191) NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
