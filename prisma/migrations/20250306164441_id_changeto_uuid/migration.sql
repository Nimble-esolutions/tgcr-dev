/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Earning` DROP FOREIGN KEY `Earning_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Enrolment` DROP FOREIGN KEY `Enrolment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Favourite` DROP FOREIGN KEY `Favourite_userId_fkey`;

-- DropForeignKey
ALTER TABLE `InstructorAvailability` DROP FOREIGN KEY `InstructorAvailability_userId_fkey`;

-- DropForeignKey
ALTER TABLE `InstructorAvailabilityExceptions` DROP FOREIGN KEY `InstructorAvailabilityExceptions_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_userId_fkey`;

-- DropForeignKey
ALTER TABLE `LessonRequest` DROP FOREIGN KEY `LessonRequest_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TeacherClassLevelCost` DROP FOREIGN KEY `TeacherClassLevelCost_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEducationalQualification` DROP FOREIGN KEY `UserEducationalQualification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserExperienceLevel` DROP FOREIGN KEY `UserExperienceLevel_userId_fkey`;

-- DropIndex
DROP INDEX `Earning_userId_fkey` ON `Earning`;

-- DropIndex
DROP INDEX `Enrolment_userId_fkey` ON `Enrolment`;

-- DropIndex
DROP INDEX `Favourite_userId_fkey` ON `Favourite`;

-- DropIndex
DROP INDEX `Lesson_userId_fkey` ON `Lesson`;

-- DropIndex
DROP INDEX `LessonRequest_userId_fkey` ON `LessonRequest`;

-- DropIndex
DROP INDEX `Payment_userId_fkey` ON `Payment`;

-- DropIndex
DROP INDEX `Progress_userId_fkey` ON `Progress`;

-- AlterTable
ALTER TABLE `Account` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Course` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Earning` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Enrolment` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Favourite` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `InstructorAvailability` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `InstructorAvailabilityExceptions` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Lesson` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `LessonRequest` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Notification` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Payment` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Profile` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Progress` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Review` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TeacherClassLevelCost` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserEducationalQualification` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserExperienceLevel` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrolment` ADD CONSTRAINT `Enrolment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Earning` ADD CONSTRAINT `Earning_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InstructorAvailability` ADD CONSTRAINT `InstructorAvailability_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InstructorAvailabilityExceptions` ADD CONSTRAINT `InstructorAvailabilityExceptions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonRequest` ADD CONSTRAINT `LessonRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherClassLevelCost` ADD CONSTRAINT `TeacherClassLevelCost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEducationalQualification` ADD CONSTRAINT `UserEducationalQualification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExperienceLevel` ADD CONSTRAINT `UserExperienceLevel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
