/*
  Warnings:

  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsageHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsageHistory" DROP CONSTRAINT "UsageHistory_modelId_fkey";

-- DropForeignKey
ALTER TABLE "UsageHistory" DROP CONSTRAINT "UsageHistory_userId_fkey";

-- DropTable
DROP TABLE "Model";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "UsageHistory";

-- DropEnum
DROP TYPE "TransactionType";
