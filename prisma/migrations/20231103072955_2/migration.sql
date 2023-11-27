-- CreateTable
CREATE TABLE `Groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(191) NULL,
    `kg` VARCHAR(191) NULL,
    `comp_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Groups` ADD CONSTRAINT `Groups_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
