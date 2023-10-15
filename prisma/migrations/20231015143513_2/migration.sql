-- AlterTable
ALTER TABLE `organization` MODIFY `type` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NULL,
    MODIFY `name` INTEGER NULL,
    MODIFY `logo` VARCHAR(191) NULL,
    MODIFY `cover` VARCHAR(191) NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `created_at` DATETIME(3) NULL,
    MODIFY `phone_no` INTEGER NULL,
    MODIFY `create_date` DATETIME(3) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(255) NULL,
    MODIFY `passwod` VARCHAR(255) NULL;
