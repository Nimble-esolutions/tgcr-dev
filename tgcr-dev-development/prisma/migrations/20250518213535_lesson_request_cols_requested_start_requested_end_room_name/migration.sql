/*
  Warnings:

  - You are about to drop the column `endTime` on the `LessonRequest` table. All the data in the column will be lost.
  - You are about to drop the column `requestedDate` on the `LessonRequest` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `LessonRequest` table. All the data in the column will be lost.
  - The values [Cancelled,Hold] on the enum `Order_paymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `requestedEnd` to the `LessonRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestedStart` to the `LessonRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LessonRequest` DROP COLUMN `endTime`,
    DROP COLUMN `requestedDate`,
    DROP COLUMN `startTime`,
    ADD COLUMN `requestedEnd` DATETIME(3) NOT NULL,
    ADD COLUMN `requestedStart` DATETIME(3) NOT NULL,
    ADD COLUMN `roomName` VARCHAR(191) NULL,
    MODIFY `status` ENUM('Requested', 'Accepted', 'Rejected', 'Cancelled', 'Completed') NOT NULL DEFAULT 'Requested';

-- AlterTable
ALTER TABLE `Order` MODIFY `paymentStatus` ENUM('Pending', 'Paid', 'Failed', 'Refunded') NOT NULL DEFAULT 'Pending';
