import { UserAvatar } from "../components/UserAvatar"

export function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Home</h1>
        <UserAvatar initials="MS" />
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Olá!</h2>
        <p className="text-gray-600 mb-8">
          {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="flex flex-col items-center justify-center gap-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-M9a497Rot30MhDJJ2Cm5zdHDR6DcI5.png"
            alt="Bem-vindo ao WenLock"
            className="w-96"
          />
          <div className="border border-black px-8 py-4 inline-block rounded-lg">
            <h3 className="text-xl font-medium text-gray-900">Bem-vindo ao WenLock!</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

