-- CreateTable
CREATE TABLE `Results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `round` INTEGER NULL,
    `match_number` INTEGER NULL,
    `group` VARCHAR(191) NULL,
    `kg` VARCHAR(191) NULL,
    `comp_id` INTEGER NOT NULL,
    `winner_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_winner_id_fkey` FOREIGN KEY (`winner_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
