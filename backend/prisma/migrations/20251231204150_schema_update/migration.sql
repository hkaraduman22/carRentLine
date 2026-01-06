/*
  Warnings:

  - You are about to alter the column `pricePerDay` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `Decimal(32,16)` to `Int`.
  - Made the column `imageUrl` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Car] ALTER COLUMN [pricePerDay] INT NOT NULL;
ALTER TABLE [dbo].[Car] ALTER COLUMN [imageUrl] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
