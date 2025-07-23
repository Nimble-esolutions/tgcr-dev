-- AlterTable
ALTER TABLE `LessonRequest` MODIFY `status` ENUM('Requested', 'Accepted', 'Rejected', 'Cancelled', 'Started', 'Completed') NOT NULL DEFAULT 'Requested';
