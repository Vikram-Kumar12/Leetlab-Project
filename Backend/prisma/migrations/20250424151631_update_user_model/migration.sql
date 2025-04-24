/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "changePasswordToken" TEXT,
ADD COLUMN     "changePasswordTokenExpiry" TEXT,
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "resetPasswordToken" TEXT,
ADD COLUMN     "resetPasswordTokenExpiry" TEXT,
ADD COLUMN     "username" TEXT,
ADD COLUMN     "verificationToken" TEXT,
ADD COLUMN     "verificationTokenExpiry" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
