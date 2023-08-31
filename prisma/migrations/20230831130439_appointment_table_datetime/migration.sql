/*
  Warnings:

  - You are about to drop the column `off_end_time` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `off_start_time` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `appointments` ADD COLUMN `appointment_datetime` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `off_end_time`,
    DROP COLUMN `off_start_time`,
    MODIFY `off_end_date` DATETIME(3) NULL,
    MODIFY `off_start_date` DATETIME(3) NULL;
