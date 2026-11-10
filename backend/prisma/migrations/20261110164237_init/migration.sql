-- CreateEnum
CREATE TYPE "Modalidade" AS ENUM ('ALUGUEL', 'EMPRESTIMO');

-- CreateEnum
CREATE TYPE "StatusReserva" AS ENUM ('PENDENTE', 'APROVADA', 'RECUSADA', 'CANCELADA', 'CONCLUIDA');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bairro" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ferramenta" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "proprietarioId" INTEGER NOT NULL,
    "modalidade" "Modalidade" NOT NULL,
    "precoDiaria" DECIMAL(10,2),
    "imagemUrl" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "complemento" TEXT,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ferramenta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "ferramentaId" INTEGER NOT NULL,
    "solicitanteId" INTEGER NOT NULL,
    "dataRetirada" DATE NOT NULL,
    "dataDevolucao" DATE NOT NULL,
    "diarias" INTEGER NOT NULL,
    "valorTotal" DECIMAL(10,2) NOT NULL,
    "status" "StatusReserva" NOT NULL DEFAULT 'PENDENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE INDEX "Ferramenta_categoriaId_idx" ON "Ferramenta"("categoriaId");

-- CreateIndex
CREATE INDEX "Ferramenta_proprietarioId_idx" ON "Ferramenta"("proprietarioId");

-- CreateIndex
CREATE INDEX "Reserva_ferramentaId_status_dataRetirada_dataDevolucao_idx" ON "Reserva"("ferramentaId", "status", "dataRetirada", "dataDevolucao");

-- CreateIndex
CREATE INDEX "Reserva_solicitanteId_idx" ON "Reserva"("solicitanteId");

-- AddForeignKey
ALTER TABLE "Ferramenta" ADD CONSTRAINT "Ferramenta_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ferramenta" ADD CONSTRAINT "Ferramenta_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_ferramentaId_fkey" FOREIGN KEY ("ferramentaId") REFERENCES "Ferramenta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_solicitanteId_fkey" FOREIGN KEY ("solicitanteId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
