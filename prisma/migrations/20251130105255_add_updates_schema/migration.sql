/*
  Warnings:

  - The primary key for the `booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookingId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `checkIn` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `booking` table. All the data in the column will be lost.
  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `roomCapacity` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `roomPrice` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `room` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userPassword` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userRole` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room_id,check_in,check_out]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `booking_id` was added to the `Booking` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `check_in` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_out` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_capacity` to the `Room` table without a default value. This is not possible if the table is not empty.
  - The required column `room_id` was added to the `Room` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `room_price` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_userId_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_ownerId_fkey`;

-- DropIndex
DROP INDEX `Booking_roomId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Booking_userId_fkey` ON `booking`;

-- DropIndex
DROP INDEX `Room_ownerId_fkey` ON `room`;

-- AlterTable
ALTER TABLE `booking` DROP PRIMARY KEY,
    DROP COLUMN `bookingId`,
    DROP COLUMN `checkIn`,
    DROP COLUMN `checkOut`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `roomId`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `booking_id` CHAR(36) NOT NULL,
    ADD COLUMN `check_in` DATETIME(3) NOT NULL,
    ADD COLUMN `check_out` DATETIME(3) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `room_id` CHAR(36) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` CHAR(36) NOT NULL,
    ADD PRIMARY KEY (`booking_id`);

-- AlterTable
ALTER TABLE `room` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `isActive`,
    DROP COLUMN `ownerId`,
    DROP COLUMN `roomCapacity`,
    DROP COLUMN `roomId`,
    DROP COLUMN `roomPrice`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `owner_id` CHAR(36) NOT NULL,
    ADD COLUMN `room_capacity` INTEGER NOT NULL,
    ADD COLUMN `room_id` CHAR(36) NOT NULL,
    ADD COLUMN `room_price` DECIMAL(8, 2) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `roomName` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`room_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `isActive`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userEmail`,
    DROP COLUMN `userId`,
    DROP COLUMN `userName`,
    DROP COLUMN `userPassword`,
    DROP COLUMN `userRole`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_email` VARCHAR(255) NOT NULL,
    ADD COLUMN `user_id` CHAR(36) NOT NULL,
    ADD COLUMN `user_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `user_password` VARCHAR(255) NOT NULL,
    ADD COLUMN `user_role` ENUM('OWNER', 'GUEST', 'ADMIN') NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- CreateIndex
CREATE INDEX `Booking_user_id_idx` ON `Booking`(`user_id`);

-- CreateIndex
CREATE INDEX `Booking_room_id_idx` ON `Booking`(`room_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Booking_room_id_check_in_check_out_key` ON `Booking`(`room_id`, `check_in`, `check_out`);

-- CreateIndex
CREATE INDEX `Room_owner_id_idx` ON `Room`(`owner_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_user_email_key` ON `User`(`user_email`);

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
