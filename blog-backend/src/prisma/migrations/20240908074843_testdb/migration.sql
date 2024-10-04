-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "published" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
