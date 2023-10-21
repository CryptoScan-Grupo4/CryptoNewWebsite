-- CreateTable
CREATE TABLE `funcionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeFunc` VARCHAR(80) NOT NULL,
    `rg` CHAR(10) NOT NULL,
    `cpf` CHAR(14) NOT NULL,
    `email` VARCHAR(80) NOT NULL,
    `senha` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
