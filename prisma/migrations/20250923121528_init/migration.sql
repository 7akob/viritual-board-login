-- CreateTable
CREATE TABLE "login"."users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(250) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "role" VARCHAR(250) NOT NULL DEFAULT 'user',

    CONSTRAINT "PK_users" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "login"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "login"."users"("email");
