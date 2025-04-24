/*
  Warnings:

  - The `changePasswordTokenExpiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `resetPasswordTokenExpiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `verificationTokenExpiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "changePasswordTokenExpiry",
ADD COLUMN     "changePasswordTokenExpiry" TIMESTAMP(3),
DROP COLUMN "resetPasswordTokenExpiry",
ADD COLUMN     "resetPasswordTokenExpiry" TIMESTAMP(3),
DROP COLUMN "verificationTokenExpiry",
ADD COLUMN     "verificationTokenExpiry" TIMESTAMP(3);
