'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

const schema = z.object({
  nomeCompleto: z.string().min(3, 'Informe o nome completo'),
  nomeSocial: z.string().optional(),
  sexo: z.enum(['masculino', 'feminino']),
  percurso: z.enum(['6km', '12km']),
  dataNascimento: z.string().min(1, 'Informe a data de nascimento'),
})

type FormData = z.infer<typeof schema>

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao enviar os dados')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Dados enviados:', data)
      })
      .catch((error) => {
        console.error('Erro:', error)
        alert('Erro ao enviar os dados')
      })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-xl space-y-6"
      >
        {/* Adicionando a logo */}
        <div className="flex justify-center">
          <img
            src="/logo-cpcn.png" // Substitua pelo caminho da sua logo
            alt="Logo do Circuito de Corrida"
            className="h-32 w-auto" // Ajuste o tamanho conforme necessário
          />
        </div>

        <h1 className="text-2xl font-bold text-green-800 text-center">
          Cadastro - Corrida na Natureza
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
          <input
            type="text"
            {...register('nomeCompleto')}
            className={clsx(
              'w-full border px-3 py-2 rounded-lg',
              errors.nomeCompleto ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.nomeCompleto && (
            <p className="text-sm text-red-500 mt-1">{errors.nomeCompleto.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome social (opcional)</label>
          <input
            type="text"
            {...register('nomeSocial')}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" value="masculino" {...register('sexo')} />
              Masculino
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="feminino" {...register('sexo')} />
              Feminino
            </label>
          </div>
          {errors.sexo && (
            <p className="text-sm text-red-500 mt-1">{errors.sexo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Percurso desejado</label>
          <select
            {...register('percurso')}
            className={clsx(
              'w-full border px-3 py-2 rounded-lg',
              errors.percurso ? 'border-red-500' : 'border-gray-300'
            )}
          >
            <option value="">Selecione...</option>
            <option value="6km">6km</option>
            <option value="12km">12km</option>
          </select>
          {errors.percurso && (
            <p className="text-sm text-red-500 mt-1">{errors.percurso.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
            <input
            type="date"
            {...register('dataNascimento')}
            className={clsx(
              'w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none',
              errors.dataNascimento ? 'border-red-500' : 'border-gray-300'
            )}
            max={new Date().toISOString().split('T')[0]} // Restrict to past dates
            />
            {errors.dataNascimento && (
            <p className="text-sm text-red-500 mt-1">{errors.dataNascimento.message}</p>
            )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Enviar pré-cadastro
        </button>
      </form>
    </main>
  )
}
