-- CreateTable
CREATE TABLE "login"."boards" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_boards" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login"."user_boards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'member',

    CONSTRAINT "PK_user_boards" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_boards_userId_boardId_key" ON "login"."user_boards"("userId", "boardId");

-- AddForeignKey
ALTER TABLE "login"."user_boards" ADD CONSTRAINT "user_boards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "login"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login"."user_boards" ADD CONSTRAINT "user_boards_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "login"."boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
