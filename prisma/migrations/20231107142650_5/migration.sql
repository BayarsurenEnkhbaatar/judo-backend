-- CreateTable
CREATE TABLE `Comptation_to_Organization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comp_id` INTEGER NOT NULL,
    `org_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comptation_to_Organization` ADD CONSTRAINT `Comptation_to_Organization_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comptation_to_Organization` ADD CONSTRAINT `Comptation_to_Organization_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
