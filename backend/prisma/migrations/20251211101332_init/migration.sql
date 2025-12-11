BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [surname] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL CONSTRAINT [User_role_df] DEFAULT 'user',
    [password] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Car] (
    [id] INT NOT NULL IDENTITY(1,1),
    [brand] NVARCHAR(1000) NOT NULL,
    [model] NVARCHAR(1000) NOT NULL,
    [km] INT NOT NULL,
    [pricePerDay] DECIMAL(32,16) NOT NULL,
    [year] INT NOT NULL,
    [isAvailable] BIT NOT NULL CONSTRAINT [Car_isAvailable_df] DEFAULT 1,
    [imageUrl] NVARCHAR(1000),
    CONSTRAINT [Car_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Feature] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Feature_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Feature_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Reservation] (
    [id] INT NOT NULL IDENTITY(1,1),
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [totalPrice] DECIMAL(32,16) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Reservation_status_df] DEFAULT 'PENDING',
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Reservation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [userId] INT NOT NULL,
    [carId] INT NOT NULL,
    CONSTRAINT [Reservation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_CarToFeature] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_CarToFeature_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_CarToFeature_B_index] ON [dbo].[_CarToFeature]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Reservation] ADD CONSTRAINT [Reservation_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reservation] ADD CONSTRAINT [Reservation_carId_fkey] FOREIGN KEY ([carId]) REFERENCES [dbo].[Car]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[_CarToFeature] ADD CONSTRAINT [_CarToFeature_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Car]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_CarToFeature] ADD CONSTRAINT [_CarToFeature_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[Feature]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
