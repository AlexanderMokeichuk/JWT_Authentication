/*
  Warnings:

  - You are about to drop the column `hashedAT` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hashedRT` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedAT",
DROP COLUMN "hashedRT";