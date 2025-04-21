import Image from "next/image";

export default function Sucesso() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-green-50 p-4">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-xl text-center space-y-6">
        <div className="flex justify-center">
          <Image
            src="/logo-cpcn.png"
            alt="Logo do Circuito de Corrida"
            className="h-32 w-auto"
            width={128}
            height={128}
          />
        </div>
        <h1 className="text-2xl font-bold text-green-800">
          Pré-cadastro realizado com sucesso!
        </h1>
        <p className="text-gray-700">
          Obrigado por se inscrever no Circuito Piauiense de Corridas na Natureza. Em breve entraremos em contato com mais informações.
        </p>
        <a
          href="https://www.instagram.com/evento_cpcn/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition"
        >
          Siga nossa página no Instagram
        </a>
      </div>
    </main>
  )
}
