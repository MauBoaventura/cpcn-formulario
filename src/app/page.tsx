'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useState } from 'react'

const schema = z.object({
  nomeCompleto: z.string().min(3, 'Informe o nome completo'),
  nomeSocial: z.string().optional(),
  sexo: z.enum(['masculino', 'feminino']),
  percurso: z.enum(['6km', '12km'],),
  dataNascimento: z.string().min(1, 'Informe a data de nascimento'),
  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d \d{4}-\d{4}$/, 'Informe um telefone válido no formato (XX) X XXXX-XXXX'),
  email: z.string().email('Informe um email válido'),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Informe um CPF válido no formato XXX.XXX.XXX-XX'),
})

type FormData = z.infer<typeof schema>

export default function Home() {
  const [mostrarNomeSocial, setMostrarNomeSocial] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
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
        window.location.href = '/sucesso'
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
            src="/logo-cpcn.png"
            alt="Logo do Circuito de Corrida"
            className="h-32 w-auto"
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
          <label className="flex items-center gap-2 mb-1">
            <input
              type="checkbox"
              checked={mostrarNomeSocial}
              onChange={(e) => setMostrarNomeSocial(e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Utilizar nome social
            </span>
          </label>
          
          {mostrarNomeSocial && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome social
              </label>
              <input
                type="text"
                {...register('nomeSocial')}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone de contato</label>
          <input
            type="text"
            {...register('telefone')}
            className={clsx(
              'w-full border px-3 py-2 rounded-lg',
              errors.telefone ? 'border-red-500' : 'border-gray-300'
            )}
            onChange={(e) => {
              let raw = e.target.value.replace(/\D/g, '')
              if (raw.length > 11) raw = raw.slice(0, 11)
            
              let formatted = raw
              if (raw.length > 10) {
                formatted = raw.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4')
              } else if (raw.length > 6) {
                formatted = raw.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3')
              } else if (raw.length > 2) {
                formatted = raw.replace(/^(\d{2})(\d{0,4})$/, '($1) $2')
              } else {
                formatted = raw.replace(/^(\d*)$/, '($1')
              }
            
              setValue('telefone', formatted, { shouldValidate: true })
            }}
            
          />
          {errors.telefone && (
            <p className="text-sm text-red-500 mt-1">{errors.telefone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className={clsx(
              'w-full border px-3 py-2 rounded-lg',
              errors.email ? 'border-red-500' : 'border-gray-300'
            )}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
          <input
            type="text"
            {...register('cpf')}
            className={clsx(
              'w-full border px-3 py-2 rounded-lg',
              errors.cpf ? 'border-red-500' : 'border-gray-300'
            )}
            onChange={(e) => {
              let rawValue = e.target.value.replace(/\D/g, '')
              if (rawValue.length > 11) rawValue = rawValue.slice(0, 11)
            
              let formatted = rawValue
              if (formatted.length > 9) {
                formatted = formatted.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
              } else if (formatted.length > 6) {
                formatted = formatted.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3')
              } else if (formatted.length > 3) {
                formatted = formatted.replace(/(\d{3})(\d{0,3})/, '$1.$2')
              }
            
              setValue('cpf', formatted, { shouldValidate: true })
            }}
            
          />
          {errors.cpf && (
            <p className="text-sm text-red-500 mt-1">{errors.cpf.message}</p>
          )}
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
            <p className="text-sm text-red-500 mt-1">Selecione uma opção</p>
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
            <p className="text-sm text-red-500 mt-1">Selecione um percurso </p>
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
            max={new Date().toISOString().split('T')[0]}
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
