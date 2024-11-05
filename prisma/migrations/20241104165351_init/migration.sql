-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cycles" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "minutes_amount" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interrupted_date" TIMESTAMP(3),
    "finished_date" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "cycles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "cycles" ADD CONSTRAINT "cycles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
