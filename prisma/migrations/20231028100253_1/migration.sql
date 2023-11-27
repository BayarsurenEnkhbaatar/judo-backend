-- CreateTable
CREATE TABLE `Matches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `round` VARCHAR(191) NULL,
    `match_number` VARCHAR(191) NULL,
    `group` VARCHAR(191) NULL,
    `kg` VARCHAR(191) NULL,
    `comp_id` INTEGER NOT NULL,
    `athlete1_id` INTEGER NOT NULL,
    `athlete2_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_athlete1_id_fkey` FOREIGN KEY (`athlete1_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_athlete2_id_fkey` FOREIGN KEY (`athlete2_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
