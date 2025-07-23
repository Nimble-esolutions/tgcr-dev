/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `FeedbackAttribute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `FeedbackAttribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FeedbackAttribute` ADD COLUMN `key` VARCHAR(5) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `FeedbackAttribute_key_key` ON `FeedbackAttribute`(`key`);
