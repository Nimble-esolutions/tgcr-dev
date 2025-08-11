/*
  Warnings:

  - The primary key for the `LessonRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roomName` on the `LessonRequest` table. All the data in the column will be lost.
  - Added the required column `updatedOn` to the `LessonRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `LessonRequest` DROP PRIMARY KEY,
    DROP COLUMN `roomName`,
    ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedOn` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
