/*
  Warnings:

  - You are about to alter the column `expiry_date` on the `Athlete` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `expiry_date` on the `Organization` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `Athlete` MODIFY `expiry_date` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Organization` MODIFY `expiry_date` DATETIME(3) NULL;
