/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `InstructorAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `InstructorAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `isRecurring` on the `InstructorAvailability` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `InstructorAvailability` table. All the data in the column will be lost.
  - Added the required column `duration` to the `InstructorAvailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endWeek` to the `InstructorAvailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startWeek` to the `InstructorAvailability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `InstructorAvailability` DROP COLUMN `dayOfWeek`,
    DROP COLUMN `endTime`,
    DROP COLUMN `isRecurring`,
    DROP COLUMN `startTime`,
    ADD COLUMN `duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `endWeek` INTEGER NOT NULL,
    ADD COLUMN `exdate` TEXT NULL,
    ADD COLUMN `rrule` TEXT NULL,
    ADD COLUMN `startWeek` INTEGER NOT NULL,
    ADD COLUMN `title` ENUM('Availability', 'Booking') NOT NULL DEFAULT 'Availability';
