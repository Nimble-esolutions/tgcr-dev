-- CreateTable
CREATE TABLE `UserEducationalBoard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `educationalBoardId` INTEGER NOT NULL,

    INDEX `educationalBoardId`(`educationalBoardId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserEducationalBoard` ADD CONSTRAINT `UserEducationalBoard_educationalBoardId_fkey` FOREIGN KEY (`educationalBoardId`) REFERENCES `EducationalBoard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEducationalBoard` ADD CONSTRAINT `UserEducationalBoard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
