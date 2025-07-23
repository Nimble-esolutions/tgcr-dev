/*
  Warnings:

  - You are about to drop the `UserEducationalBoard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserEducationalBoard` DROP FOREIGN KEY `UserEducationalBoard_educationalBoardId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEducationalBoard` DROP FOREIGN KEY `UserEducationalBoard_userId_fkey`;

-- AlterTable
ALTER TABLE `TeacherClassLevelCost` MODIFY `costPerLesson` DOUBLE NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `UserEducationalBoard`;
