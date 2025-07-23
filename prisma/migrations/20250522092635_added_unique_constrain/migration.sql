/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ClassLevel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `EducationalBoard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `EducationalQualification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ExperienceLevel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `InstructionMedium` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Timezone` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ClassLevel_name_key` ON `ClassLevel`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `EducationalBoard_name_key` ON `EducationalBoard`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `EducationalQualification_name_key` ON `EducationalQualification`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `ExperienceLevel_name_key` ON `ExperienceLevel`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `InstructionMedium_name_key` ON `InstructionMedium`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Subject_name_key` ON `Subject`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Timezone_name_key` ON `Timezone`(`name`);
