/*
  Warnings:

  - You are about to drop the column `userId` on the `StudentEducationalBoard` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TeacherClassLevelCost` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TeacherEducationalBoard` table. All the data in the column will be lost.
  - You are about to drop the `UserEducationalQualification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserExperienceLevel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `StudentEducationalBoard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `StudentEducationalBoard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `TeacherClassLevelCost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `TeacherEducationalBoard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `StudentEducationalBoard` DROP FOREIGN KEY `StudentEducationalBoard_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TeacherClassLevelCost` DROP FOREIGN KEY `TeacherClassLevelCost_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TeacherEducationalBoard` DROP FOREIGN KEY `TeacherEducationalBoard_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEducationalQualification` DROP FOREIGN KEY `UserEducationalQualification_educationalQualificationId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEducationalQualification` DROP FOREIGN KEY `UserEducationalQualification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserExperienceLevel` DROP FOREIGN KEY `UserExperienceLevel_experienceLevelId_fkey`;

-- DropForeignKey
ALTER TABLE `UserExperienceLevel` DROP FOREIGN KEY `UserExperienceLevel_userId_fkey`;

-- DropIndex
DROP INDEX `StudentEducationalBoard_userId_key` ON `StudentEducationalBoard`;

-- DropIndex
DROP INDEX `userId` ON `StudentEducationalBoard`;

-- DropIndex
DROP INDEX `userId` ON `TeacherClassLevelCost`;

-- DropIndex
DROP INDEX `userId` ON `TeacherEducationalBoard`;

-- AlterTable
ALTER TABLE `StudentEducationalBoard` DROP COLUMN `userId`,
    ADD COLUMN `studentId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TeacherClassLevelCost` DROP COLUMN `userId`,
    ADD COLUMN `teacherId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `TeacherEducationalBoard` DROP COLUMN `userId`,
    ADD COLUMN `teacherId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `UserEducationalQualification`;

-- DropTable
DROP TABLE `UserExperienceLevel`;

-- CreateTable
CREATE TABLE `TeacherEducationalQualification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherId` VARCHAR(191) NOT NULL,
    `educationalQualificationId` INTEGER NOT NULL,

    INDEX `educationalQualificationId`(`educationalQualificationId`),
    INDEX `userId`(`teacherId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeacherExperienceLevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacherId` VARCHAR(191) NOT NULL,
    `experienceLevelId` INTEGER NOT NULL,

    INDEX `experienceLevelId`(`experienceLevelId`),
    INDEX `userId`(`teacherId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `StudentEducationalBoard_studentId_key` ON `StudentEducationalBoard`(`studentId`);

-- CreateIndex
CREATE INDEX `userId` ON `StudentEducationalBoard`(`studentId`);

-- CreateIndex
CREATE INDEX `userId` ON `TeacherClassLevelCost`(`teacherId`);

-- CreateIndex
CREATE INDEX `userId` ON `TeacherEducationalBoard`(`teacherId`);

-- AddForeignKey
ALTER TABLE `TeacherClassLevelCost` ADD CONSTRAINT `TeacherClassLevelCost_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherEducationalQualification` ADD CONSTRAINT `TeacherEducationalQualification_educationalQualificationId_fkey` FOREIGN KEY (`educationalQualificationId`) REFERENCES `EducationalQualification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherEducationalQualification` ADD CONSTRAINT `TeacherEducationalQualification_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherExperienceLevel` ADD CONSTRAINT `TeacherExperienceLevel_experienceLevelId_fkey` FOREIGN KEY (`experienceLevelId`) REFERENCES `ExperienceLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherExperienceLevel` ADD CONSTRAINT `TeacherExperienceLevel_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeacherEducationalBoard` ADD CONSTRAINT `TeacherEducationalBoard_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentEducationalBoard` ADD CONSTRAINT `StudentEducationalBoard_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
