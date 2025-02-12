"use client"

import { useState, useEffect } from "react"
import { UserAvatar } from "../components/UserAvatar"
import { Search, Plus, Eye, Pencil, Trash } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useNavigate } from "react-router-dom"
import { DeleteDialog } from "../components/DeleteDialog"
import { Toast } from "../components/ui/toast"
import { getUsers, deleteUser, type User } from "../api/users"
import { ErrorState } from "../components/ErrorState"

export function Users() {
  const navigate = useNavigate()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)
  const [toast, setToast] = useState<{
    open: boolean
    variant: "success" | "warning" | "error"
    message: string
  }>({
    open: false,
    variant: "success",
    message: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Paginação
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    } catch (err) {
      setError("Falha ao buscar usuários")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Filtra os usuários com base na pesquisa
  const filteredUsers = users.filter((user) => user.nome.toLowerCase().includes(searchQuery.toLowerCase()))

  // Calcula os índices dos itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  // Gera array com números das páginas a serem exibidas
  const getPageNumbers = () => {
    const totalFilteredPages = Math.ceil(filteredUsers.length / itemsPerPage)
    if (totalFilteredPages <= 5) {
      return Array.from({ length: totalFilteredPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5]
    }

    if (currentPage >= totalFilteredPages - 2) {
      return Array.from({ length: 5 }, (_, i) => totalFilteredPages - 4 + i)
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    const totalFilteredPages = Math.ceil(filteredUsers.length / itemsPerPage)
    if (currentPage < totalFilteredPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleDelete = (userId: number) => {
    setUserToDelete(userId)
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete)
        setUsers(users.filter((user) => user.id !== userToDelete))
        setToast({
          open: true,
          variant: "success",
          message: "Usuário excluído!",
        })
      } catch (err) {
        setToast({
          open: true,
          variant: "error",
          message: "Falha ao excluir usuário. Por favor, tente novamente.",
        })
      }
    }
    setShowDeleteDialog(false)
    setUserToDelete(null)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Usuários</h1>
          <UserAvatar initials="MS" />
        </div>

        <div className="flex justify-between items-center">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Pesquisa"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1) // Reset para primeira página ao pesquisar
              }}
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate("/usuarios/cadastro")}>
            <Plus className="mr-2 h-4 w-4" />
            Cadastrar Usuário
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : error ? (
          <ErrorState
            title="Falha ao carregar usuários"
            message="Não foi possível carregar a lista de usuários. Por favor, tente novamente."
            onRetry={fetchUsers}
          />
        ) : (
          <div className="bg-white flex-1 flex flex-col">
            <table className="w-full">
              <thead className="bg-[#0F1E36] text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium">Nome</th>
                  <th className="px-6 py-4 text-right text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="flex-1">
                {currentItems.length > 0 ? (
                  currentItems.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="px-6 py-4 text-sm text-gray-900">{user.nome}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Eye className="h-4 w-4 text-gray-500" />
                          </button>
                          <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => navigate(`/usuarios/editar/${user.id}`)}
                          >
                            <Pencil className="h-4 w-4 text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => handleDelete(user.id)}>
                            <Trash className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2}>
                      <div className="flex flex-col items-center justify-center py-20">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SxxaDNVQXxRhG0ots9rFZCChX5IWkG.png"
                          alt="Nenhum resultado encontrado"
                          className="w-72 h-72 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Nenhum Resultado Encontrado</h2>
                        <p className="text-gray-500 text-center max-w-md">
                          Não foi possível achar nenhum resultado para sua busca.
                          <br />
                          Tente refazer a pesquisa para encontrar o que busca.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!error && !isLoading && filteredUsers.length > 0 && (
          <div className="bg-white px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Total de itens: <span className="font-medium">{filteredUsers.length}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Itens por página: <span className="font-medium">{itemsPerPage}</span>
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className={currentPage === pageNumber ? "bg-primary hover:bg-primary/90 text-white" : ""}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {Math.ceil(filteredUsers.length / itemsPerPage) > 5 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      className={
                        currentPage >= Math.ceil(filteredUsers.length / itemsPerPage)
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
              <div className="text-sm text-gray-500">
                de <span className="font-medium">{Math.ceil(filteredUsers.length / itemsPerPage)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <DeleteDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} onConfirm={handleConfirmDelete} />

      <Toast
        open={toast.open}
        variant={toast.variant}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </div>
  )
}

