/*
  Warnings:

  - Added the required column `email` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwod` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `organization` ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `passwod` VARCHAR(255) NOT NULL;
