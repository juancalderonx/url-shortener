-- AlterTable
ALTER TABLE `Url` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `expiresAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `updatedAt` DATETIME(3) NULL;
