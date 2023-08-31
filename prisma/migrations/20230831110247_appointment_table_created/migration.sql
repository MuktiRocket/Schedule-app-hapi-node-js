-- AlterTable
ALTER TABLE `users` ADD COLUMN `off_end_date` DATE NULL,
    ADD COLUMN `off_end_time` TIME NULL,
    ADD COLUMN `off_start_date` DATE NULL,
    ADD COLUMN `off_start_time` TIME NULL;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `agenda` VARCHAR(191) NULL,
    `user_id` INTEGER NULL,
    `with_user_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `appointments_user_id_with_user_id_idx`(`user_id`, `with_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_with_user_id_fkey` FOREIGN KEY (`with_user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
