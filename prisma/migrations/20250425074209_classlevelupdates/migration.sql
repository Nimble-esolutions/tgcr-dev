/*
  Warnings:

  - You are about to drop the `InstructorAvailabilityExceptions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studentUserId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `costPerLesson` on table `TeacherClassLevelCost` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `InstructorAvailabilityExceptions` DROP FOREIGN KEY `InstructorAvailabilityExceptions_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_userId_fkey`;

-- AlterTable
ALTER TABLE `LessonRequest` ADD COLUMN `lessonRemake` TEXT NULL,
    ADD COLUMN `teacherClassLevelCostId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `costAverage` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `studentUserId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TeacherClassLevelCost` MODIFY `costPerLesson` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `InstructorAvailabilityExceptions`;

-- CreateTable
CREATE TABLE `StudentClassLevel` (
    `studentId` VARCHAR(191) NOT NULL,
    `classLevelId` INTEGER NOT NULL,

    UNIQUE INDEX `StudentClassLevel_studentId_key`(`studentId`),
    INDEX `classLevelId`(`classLevelId`),
    INDEX `studentId`(`studentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeacherEducationalBoard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `educationalBoardId` INTEGER NOT NULL,

    INDEX `educationalBoardId`(`educationalBoardId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentEducationalBoard` (
    `userId` VARCHAR(191) NOT NULL,
    `educationalBoardId` INTEGER NOT NULL,

    UNIQUE INDEX `StudentEducationalBoard_userId_key`(`userId`),
    INDEX `educationalBoardId`(`educationalBoardId`),
    INDEX `userId`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `userId` ON `Review`(`userId`);

-- CreateIndex
CREATE INDEX `studentUserId` ON `Review`(`studentUserId`);

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_studentUserId_fkey` FOREIGN KEY (`studentUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LessonRequest` ADD CONSTRAINT `LessonRequest_teacherClassLevelCostId_fkey` FOREIGN KEY (`teacherClassLevelCostId`) REFERENCES `TeacherClassLevelCost`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentClassLevel` ADD CONSTRAINT `StudentClassLevel_classLevelId_fkey` FOREIGN KEY (`classLevelId`) REFERENCES `ClassLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentClassLevel` ADD CONSTRAINT `StudentClassLevel_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherEducationalBoard` ADD CONSTRAINT `TeacherEducationalBoard_educationalBoardId_fkey` FOREIGN KEY (`educationalBoardId`) REFERENCES `EducationalBoard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherEducationalBoard` ADD CONSTRAINT `TeacherEducationalBoard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentEducationalBoard` ADD CONSTRAINT `StudentEducationalBoard_educationalBoardId_fkey` FOREIGN KEY (`educationalBoardId`) REFERENCES `EducationalBoard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentEducationalBoard` ADD CONSTRAINT `StudentEducationalBoard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
