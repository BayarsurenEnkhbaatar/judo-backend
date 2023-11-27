/*
  Warnings:

  - You are about to alter the column `round` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `match_number` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `matches` MODIFY `round` INTEGER NULL,
    MODIFY `match_number` INTEGER NULL;
