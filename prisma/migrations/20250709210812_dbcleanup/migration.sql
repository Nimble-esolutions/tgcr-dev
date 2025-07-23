/*
  Warnings:

  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Earning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favourite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Partner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Progress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedOn` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_catId_fkey`;

-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Earning` DROP FOREIGN KEY `Earning_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Favourite` DROP FOREIGN KEY `Favourite_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Favourite` DROP FOREIGN KEY `Favourite_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_videoId_fkey`;

-- DropForeignKey
ALTER TABLE `Video` DROP FOREIGN KEY `Video_courseId_fkey`;

-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedOn` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `lastLogin` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('Student', 'Instructor', 'Admin', 'Manager') NOT NULL DEFAULT 'Student';

-- DropTable
DROP TABLE `Asset`;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Course`;

-- DropTable
DROP TABLE `Earning`;

-- DropTable
DROP TABLE `Favourite`;

-- DropTable
DROP TABLE `Partner`;

-- DropTable
DROP TABLE `Progress`;

-- DropTable
DROP TABLE `Review`;

-- DropTable
DROP TABLE `Subscription`;

-- DropTable
DROP TABLE `Video`;
