/*
  Warnings:

  - You are about to drop the column `lessonRemake` on the `LessonRequest` table. All the data in the column will be lost.
  - You are about to drop the column `lessonRequestId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `studentUserId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedOn` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Enrolment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderId` to the `LessonRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessonId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessonId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Earning` DROP FOREIGN KEY `Earning_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Enrolment` DROP FOREIGN KEY `Enrolment_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Enrolment` DROP FOREIGN KEY `Enrolment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_studentUserId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropIndex
DROP INDEX `lessonRequestId` ON `Payment`;

-- DropIndex
DROP INDEX `Review_courseId_fkey` ON `Review`;

-- DropIndex
DROP INDEX `Review_userId_courseId_idx` ON `Review`;

-- DropIndex
DROP INDEX `studentUserId` ON `Review`;

-- DropIndex
DROP INDEX `userId` ON `Review`;

-- AlterTable
ALTER TABLE `LessonRequest` DROP COLUMN `lessonRemake`,
    ADD COLUMN `orderId` VARCHAR(191) NOT NULL,
    ADD COLUMN `remarks` TEXT NULL;

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `lessonRequestId`,
    ADD COLUMN `lessonId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `courseId`,
    DROP COLUMN `studentUserId`,
    DROP COLUMN `updatedOn`,
    DROP COLUMN `userId`,
    ADD COLUMN `lessonId` INTEGER NOT NULL,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `teacherId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TeacherClassLevelCost` MODIFY `costPerLesson` DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Enrolment`;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `paymentId` VARCHAR(191) NULL,
    `paymentStatus` ENUM('Pending', 'Paid', 'Cancelled', 'Hold') NOT NULL DEFAULT 'Pending',
    `paymentVia` VARCHAR(191) NULL,
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedOn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Order_orderNumber_key`(`orderNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `lessonId` ON `Payment`(`lessonId`);

-- CreateIndex
CREATE INDEX `teacherId` ON `Review`(`teacherId`);

-- CreateIndex
CREATE INDEX `studentId` ON `Review`(`studentId`);

-- CreateIndex
CREATE INDEX `Review_lessonId_fkey` ON `Review`(`lessonId`);

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonRequest` ADD CONSTRAINT `LessonRequest_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
