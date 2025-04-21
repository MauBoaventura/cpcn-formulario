import { NextResponse } from 'next/server'
import { z } from 'zod'
import mysql from 'mysql2/promise'
import 'dotenv/config' // Carrega as variáveis de ambiente do arquivo .env

const schema = z.object({
  nomeCompleto: z.string().min(3, 'Informe o nome completo'),
  nomeSocial: z.string().optional(),
  sexo: z.enum(['masculino', 'feminino']),
  percurso: z.enum(['7.5km', '15km']),
  dataNascimento: z.string().min(1, 'Informe a data de nascimento'),
  email: z.string().email('Informe um email válido'),
  telefone: z.string().min(10, 'Informe um telefone válido'),
  cpf: z.string().min(11, 'Informe um CPF válido').max(14, 'Informe um CPF válido'), // CPF com validação de tamanho
})

// Configure a conexão com o banco de dados usando variáveis de ambiente
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const parsedData = schema.parse(data)

    // Conecte-se ao banco de dados
    const connection = await mysql.createConnection(dbConfig)

    // Insira os dados no banco de dados
    const query = `
      INSERT INTO cadastros (nomeCompleto, nomeSocial, cpf, sexo, percurso, dataNascimento, email, telefone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
      parsedData.nomeCompleto,
      parsedData.nomeSocial || null,
      parsedData.cpf || null,
      parsedData.sexo,
      parsedData.percurso,
      parsedData.dataNascimento,
      parsedData.email,
      parsedData.telefone,
    ]

    await connection.execute(query, values)
    await connection.end()

    return NextResponse.json({ message: 'Cadastro realizado com sucesso!', data: parsedData }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Erro de validação', errors: error.errors }, { status: 400 })
    }
    console.error('Erro no servidor:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}