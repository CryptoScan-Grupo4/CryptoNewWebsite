/*
  Warnings:

  - The required column `token` was added to the `funcionario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `funcionario` ADD COLUMN `token` VARCHAR(191) NOT NULL;
