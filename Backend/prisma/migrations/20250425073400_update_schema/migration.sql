/*
  Warnings:

  - You are about to drop the column `changePasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `changePasswordTokenExpiry` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "changePasswordToken",
DROP COLUMN "changePasswordTokenExpiry",
DROP COLUMN "resetPasswordToken",
DROP COLUMN "resetPasswordTokenExpiry",
ADD COLUMN     "forgotPasswordToken" TEXT,
ADD COLUMN     "forgotPasswordTokenExpiry" TIMESTAMP(3);
