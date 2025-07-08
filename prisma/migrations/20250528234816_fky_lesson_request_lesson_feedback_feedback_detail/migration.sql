/*
  Warnings:

  - You are about to drop the column `feedbackKey` on the `FeedbackDetail` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackValue` on the `FeedbackDetail` table. All the data in the column will be lost.
  - You are about to drop the column `actualEnd` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `actualStart` on the `Lesson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lessonRequestId]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lessonId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedbackAttributeId` to the `FeedbackDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedbackAttributeKey` to the `FeedbackDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feedbackAttributeValue` to the `FeedbackDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessonCounter` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_id_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_teacherId_fkey`;

-- AlterTable
ALTER TABLE `Feedback` ADD COLUMN `lessonId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FeedbackDetail` DROP COLUMN `feedbackKey`,
    DROP COLUMN `feedbackValue`,
    ADD COLUMN `feedbackAttributeId` INTEGER NOT NULL,
    ADD COLUMN `feedbackAttributeKey` VARCHAR(191) NOT NULL,
    ADD COLUMN `feedbackAttributeValue` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Lesson` DROP COLUMN `actualEnd`,
    DROP COLUMN `actualStart`,
    ADD COLUMN `lessonCounter` INTEGER NOT NULL,
    ADD COLUMN `studentEnd` DATETIME(3) NULL,
    ADD COLUMN `studentStart` DATETIME(3) NULL,
    ADD COLUMN `teacherEnd` DATETIME(3) NULL,
    ADD COLUMN `teacherStart` DATETIME(3) NULL,
    MODIFY `lessonRequestId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Feedback_lessonId_key` ON `Feedback`(`lessonId`);

-- CreateIndex
CREATE UNIQUE INDEX `Lesson_lessonRequestId_key` ON `Lesson`(`lessonRequestId`);

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_lessonRequestId_fkey` FOREIGN KEY (`lessonRequestId`) REFERENCES `LessonRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedbackDetail` ADD CONSTRAINT `FeedbackDetail_feedbackAttributeId_fkey` FOREIGN KEY (`feedbackAttributeId`) REFERENCES `FeedbackAttribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
