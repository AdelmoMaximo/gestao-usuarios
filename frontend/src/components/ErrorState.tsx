import { RefreshCcw } from "lucide-react"
import { Button } from "./ui/button"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = "Erro ao carregar dados",
  message = "Não foi possível carregar os dados. Por favor, tente novamente.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/error-state-kS47JhVDXB8G3gB8UBCVvh6OqYuG3O.svg"
        alt="Estado de erro"
        className="w-72 h-72 mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 text-center max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="bg-primary hover:bg-primary/90">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Tentar novamente
        </Button>
      )}
    </div>
  )
}

