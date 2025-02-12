import axios from "axios"

const API_BASE_URL = "http://localhost:3000"

export interface User {
  id: number
  nome: string
  email: string
  matricula: string
}

export interface CreateUserData {
  nome: string
  email: string
  matricula: string
  senha: string
}

export async function createUser(userData: CreateUserData): Promise<User> {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, userData)
    return response.data
  } catch (error) {
    console.error("Erro ao criar usuário:", error)
    throw error
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios`)
    return response.data
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    throw error
  }
}

export async function getUser(id: number): Promise<User> {
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar usuário com ID ${id}:`, error)
    throw error
  }
}

export async function updateUser(id: number, userData: Partial<CreateUserData>): Promise<User> {
  try {
    const response = await axios.patch(`${API_BASE_URL}/usuarios/${id}`, userData)
    return response.data
  } catch (error) {
    console.error(`Erro ao atualizar usuário com ID ${id}:`, error)
    throw error
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/usuarios/${id}`)
  } catch (error) {
    console.error(`Erro ao excluir usuário com ID ${id}:`, error)
    throw error
  }
}

