/*
  Warnings:

  - You are about to alter the column `createdAt` on the `Experience` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamp(3)")` to `DateTime`.
  - You are about to alter the column `createdAt` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamp(3)")` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamp(3)")` to `DateTime`.
  - You are about to alter the column `createdAt` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamp(3)")` to `DateTime`.
  - You are about to alter the column `createdAt` on the `Skill` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamp(3)")` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Experience" ("company", "createdAt", "description", "duration", "id", "role") SELECT "company", "createdAt", "description", "duration", "id", "role" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
CREATE TABLE "new_Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "github" TEXT,
    "linkedin" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Profile" ("bio", "createdAt", "email", "github", "id", "linkedin", "name", "phone", "title", "updatedAt") SELECT "bio", "createdAt", "email", "github", "id", "linkedin", "name", "phone", "title", "updatedAt" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "repoUrl" TEXT,
    "liveUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("createdAt", "description", "id", "liveUrl", "repoUrl", "techStack", "title") SELECT "createdAt", "description", "id", "liveUrl", "repoUrl", "techStack", "title" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE TABLE "new_Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Skill" ("category", "createdAt", "id", "name") SELECT "category", "createdAt", "id", "name" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
