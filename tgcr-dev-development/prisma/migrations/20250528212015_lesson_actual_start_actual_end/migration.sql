/*
  Warnings:

  - You are about to drop the column `endTime` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledDate` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `actualEnd` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actualStart` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Lesson` DROP COLUMN `endTime`,
    DROP COLUMN `scheduledDate`,
    DROP COLUMN `startTime`,
    ADD COLUMN `actualEnd` DATETIME(3) NOT NULL,
    ADD COLUMN `actualStart` DATETIME(3) NOT NULL;
