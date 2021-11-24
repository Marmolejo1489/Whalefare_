/*
-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema krishna_sql
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema krishna_sql
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `krishna_sql` DEFAULT CHARACTER SET utf8 ;
USE `krishna_sql` ;
-- -----------------------------------------------------
-- Table `password`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `password` (
  `id_c` INT NOT NULL AUTO_INCREMENT,
  `id_u` INT NULL DEFAULT NULL,
  `id_d` INT NULL DEFAULT NULL,
  `pass_c` VARCHAR(256) NOT NULL,
  `safe_c` TINYINT NULL DEFAULT NULL,
  `user_c` VARCHAR(45) NULL DEFAULT NULL,
  `key_c` VARCHAR(256) NOT NULL,
  `website_c` VARCHAR(256) NOT NULL,
  `title_c` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_c`))
  ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id_u` INT NOT NULL AUTO_INCREMENT,
  `user_u` VARCHAR(45) NOT NULL,
  `email_u` VARCHAR(256) NOT NULL,
  `pass_u` VARCHAR(256) NOT NULL,
  `verified_u` TINYINT NULL DEFAULT NULL,
  `authorized_u` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id_u`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `website`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `website` (
  `id_d` INT NOT NULL AUTO_INCREMENT,
  `name_d` VARCHAR(45) NOT NULL,
  `dom_d` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_d`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
*/