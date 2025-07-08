/*
  Warnings:

  - You are about to drop the column `userId` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `LessonRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_userId_fkey`;

-- DropForeignKey
ALTER TABLE `LessonRequest` DROP FOREIGN KEY `LessonRequest_userId_fkey`;

-- DropIndex
DROP INDEX `Lesson_userId_fkey` ON `Lesson`;

-- DropIndex
DROP INDEX `LessonRequest_userId_fkey` ON `LessonRequest`;

-- AlterTable
ALTER TABLE `Lesson` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `LessonRequest` DROP COLUMN `userId`,
    MODIFY `studentId` VARCHAR(191) NOT NULL,
    MODIFY `instructorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `LessonRequest` ADD CONSTRAINT `LessonRequest_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonRequest` ADD CONSTRAINT `LessonRequest_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
