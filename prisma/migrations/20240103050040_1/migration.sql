-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `access_age` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kg` VARCHAR(191) NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `created_date` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `expiry_date` DATETIME(3) NULL,
    `phone_no` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `sum` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Athlete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `birth_date` VARCHAR(191) NULL,
    `register_no` VARCHAR(191) NULL,
    `phone_no` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `profile_img` TEXT NULL,
    `document_img` TEXT NULL,
    `created_at` DATETIME(3) NULL,
    `expiry_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `org_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comptation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `desc` VARCHAR(191) NULL,
    `province` VARCHAR(191) NULL,
    `sum` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `orgenizer` VARCHAR(191) NULL,
    `cover_img` VARCHAR(191) NULL,
    `guide_doc` VARCHAR(191) NULL,
    `mandat_price` INTEGER NULL,
    `more_address` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comp_to_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comp_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Athlete_to_comptation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `athlete_id` INTEGER NOT NULL,
    `comp_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `org_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `kg` VARCHAR(191) NOT NULL,
    `control_jin` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `round` INTEGER NULL,
    `match_number` INTEGER NULL,
    `group` VARCHAR(191) NULL,
    `kg` VARCHAR(191) NULL,
    `comp_id` INTEGER NOT NULL,
    `athlete1_id` INTEGER NOT NULL,
    `athlete2_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medal` VARCHAR(191) NULL,
    `kg` VARCHAR(191) NULL,
    `number` INTEGER NULL,
    `comp_id` INTEGER NOT NULL,
    `athlete_id` INTEGER NOT NULL,
    `org_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(191) NULL,
    `kg` VARCHAR(191) NULL,
    `group_number` INTEGER NULL,
    `comp_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Comptation_to_Organization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comp_id` INTEGER NOT NULL,
    `org_id` INTEGER NOT NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jin` ADD CONSTRAINT `Jin_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athlete` ADD CONSTRAINT `Athlete_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comp_to_category` ADD CONSTRAINT `Comp_to_category_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comp_to_category` ADD CONSTRAINT `Comp_to_category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athlete_to_comptation` ADD CONSTRAINT `Athlete_to_comptation_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athlete_to_comptation` ADD CONSTRAINT `Athlete_to_comptation_athlete_id_fkey` FOREIGN KEY (`athlete_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athlete_to_comptation` ADD CONSTRAINT `Athlete_to_comptation_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Athlete_to_comptation` ADD CONSTRAINT `Athlete_to_comptation_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_athlete1_id_fkey` FOREIGN KEY (`athlete1_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_athlete2_id_fkey` FOREIGN KEY (`athlete2_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Matches` ADD CONSTRAINT `Matches_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_athlete_id_fkey` FOREIGN KEY (`athlete_id`) REFERENCES `Athlete`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Results` ADD CONSTRAINT `Results_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Groups` ADD CONSTRAINT `Groups_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `Comptation_to_Organization` ADD CONSTRAINT `Comptation_to_Organization_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `Comptation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comptation_to_Organization` ADD CONSTRAINT `Comptation_to_Organization_org_id_fkey` FOREIGN KEY (`org_id`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
