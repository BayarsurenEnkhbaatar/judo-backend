-- CreateTable
CREATE TABLE `Athlete_to_comptation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athlete_id` INTEGER NOT NULL,
    `comp_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Athlete_to_comptation` ADD CONSTRAINT `Athlete_to_comptation_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athlete_to_comptation` ADD CONSTRAINT `Athlete_to_comptation_athlete_id_fkey` FOREIGN KEY (`athlete_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
