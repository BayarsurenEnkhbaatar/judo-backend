-- CreateTable
CREATE TABLE `Repechage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `round` INTEGER NULL,
    `match_number` INTEGER NULL,
    `kg` VARCHAR(191) NULL,
    `comp_id` INTEGER NOT NULL,
    `athlete1_id` INTEGER NOT NULL,
    `athlete2_id` INTEGER NOT NULL,
    `winner_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Finals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `round` INTEGER NULL,
    `match_number` INTEGER NULL,
    `kg` VARCHAR(191) NULL,
    `comp_id` INTEGER NOT NULL,
    `athlete1_id` INTEGER NOT NULL,
    `athlete2_id` INTEGER NOT NULL,
    `winner_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Repechage` ADD CONSTRAINT `Repechage_athlete1_id_fkey` FOREIGN KEY (`athlete1_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repechage` ADD CONSTRAINT `Repechage_athlete2_id_fkey` FOREIGN KEY (`athlete2_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repechage` ADD CONSTRAINT `Repechage_winner_id_fkey` FOREIGN KEY (`winner_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repechage` ADD CONSTRAINT `Repechage_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finals` ADD CONSTRAINT `Finals_athlete1_id_fkey` FOREIGN KEY (`athlete1_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finals` ADD CONSTRAINT `Finals_athlete2_id_fkey` FOREIGN KEY (`athlete2_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finals` ADD CONSTRAINT `Finals_winner_id_fkey` FOREIGN KEY (`winner_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finals` ADD CONSTRAINT `Finals_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
