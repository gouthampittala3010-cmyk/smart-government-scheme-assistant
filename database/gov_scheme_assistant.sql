-- =========================================================================================
-- AI-Based Government Scheme Eligibility and Assistance System
-- MySQL Database Creation Script
-- Database: gov_scheme_assistant_db
-- =========================================================================================

CREATE DATABASE IF NOT EXISTS `gov_scheme_assistant_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `gov_scheme_assistant_db`;

-- 1. Users Table (Authentication & Roles)
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(20),
    `role` VARCHAR(20) NOT NULL DEFAULT 'ROLE_CITIZEN',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Citizen Profiles Table (Demographics, Income, Socio-economic Factors)
CREATE TABLE IF NOT EXISTS `citizen_profiles` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL UNIQUE,
    `age` INT,
    `gender` VARCHAR(20),
    `state` VARCHAR(100),
    `district` VARCHAR(100),
    `annual_income` DOUBLE,
    `occupation` VARCHAR(100),
    `category` VARCHAR(50),
    `education` VARCHAR(100),
    `marital_status` VARCHAR(50) DEFAULT 'Single',
    `disability` BOOLEAN DEFAULT FALSE,
    `disability_percentage` INT DEFAULT 0,
    `minority` BOOLEAN DEFAULT FALSE,
    `rural_urban` VARCHAR(30) DEFAULT 'Rural',
    `bpl_card_holder` BOOLEAN DEFAULT FALSE,
    `has_land` BOOLEAN DEFAULT FALSE,
    `land_holding_hectares` DOUBLE DEFAULT 0.0,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_profile_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Schemes Table (Government Scheme Repository & Rule Engine Criteria)
CREATE TABLE IF NOT EXISTS `schemes` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(200) NOT NULL,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `category` VARCHAR(100) NOT NULL,
    `ministry` VARCHAR(200) NOT NULL,
    `brief_description` TEXT,
    `benefits` TEXT,
    `financial_aid_amount` DOUBLE,
    `level` VARCHAR(50) DEFAULT 'Central',
    `applicable_state` VARCHAR(100) DEFAULT 'All India',
    `min_age` INT,
    `max_age` INT,
    `eligible_genders` VARCHAR(50) DEFAULT 'All',
    `max_annual_income` DOUBLE,
    `eligible_categories` VARCHAR(255) DEFAULT 'All',
    `eligible_occupations` VARCHAR(255) DEFAULT 'All',
    `eligible_educations` VARCHAR(255) DEFAULT 'All',
    `requires_disability` BOOLEAN DEFAULT FALSE,
    `requires_minority` BOOLEAN DEFAULT FALSE,
    `requires_bpl` BOOLEAN DEFAULT FALSE,
    `requires_land` BOOLEAN DEFAULT FALSE,
    `rural_only` BOOLEAN DEFAULT FALSE,
    `urban_only` BOOLEAN DEFAULT FALSE,
    `required_documents` TEXT,
    `application_procedure` TEXT,
    `official_website` VARCHAR(500),
    `helpline_number` VARCHAR(100),
    `tags` VARCHAR(500),
    `active` BOOLEAN DEFAULT TRUE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Data:
-- Note: Spring Boot automatically creates and seeds these tables on startup, 
-- but this script can be executed standalone in MySQL Workbench or CLI anytime.
