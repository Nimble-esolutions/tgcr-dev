/*
  Warnings:

  - You are about to drop the column `feedbackAttributeKey` on the `FeedbackDetail` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackAttributeValue` on the `FeedbackDetail` table. All the data in the column will be lost.
  - Added the required column `feedbackKey` to the `FeedbackDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedbackValue` to the `FeedbackDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FeedbackDetail` DROP COLUMN `feedbackAttributeKey`,
    DROP COLUMN `feedbackAttributeValue`,
    ADD COLUMN `feedbackKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `feedbackValue` INTEGER NOT NULL;
