/*
  Warnings:

  - You are about to drop the column `isdeleted` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "isdeleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
