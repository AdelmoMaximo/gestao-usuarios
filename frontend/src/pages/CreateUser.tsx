"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Card } from "@/components/ui/card"
import { CancelDialog } from "../components/CancelDialog"
import { Toast } from "@/components/ui/toast"
import { createUser } from "../api/users"

const formSchema = z
  .object({
    nome: z
      .string()
      .min(1, "Campo Obrigatório")
      .max(30, "O nome deve ter no máximo 30 caracteres")
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/, "O nome deve conter apenas letras"),
    email: z
      .string()
      .min(1, "Campo Obrigatório")
      .email("E-mail inválido")
      .max(40, "O e-mail deve ter no máximo 40 caracteres"),
    matricula: z
      .string()
      .min(4, "Campo Obrigatório")
      .max(10, "A matrícula deve ter no máximo 10 caracteres")
      .regex(/^\d+$/, "A matrícula deve conter apenas números"),
    senha: z
      .string()
      .min(6, "A senha deve ter 6 caracteres")
      .max(6, "A senha deve ter 6 caracteres")
      .regex(/^[a-zA-Z0-9]*$/, "A senha deve ser alfanumérica"),
    confirmPassword: z.string().min(1, "Campo Obrigatório"),
  })
  .refine((data) => data.senha === data.confirmPassword, {
    message: "As senhas não se correspondem",
    path: ["confirmPassword"],
  })

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  {
    label: string
    value: string
    error?: boolean
    errorMessage?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    name: string
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onBlur">
>(({ label, value, error, errorMessage, onChange, onBlur, name, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false)

  const isPasswordField = name.includes("password") || name.includes("senha")

  return (
    <div className="relative">
      <div className="relative">
        <input
          {...props}
          ref={ref}
          value={value}
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-gray-100 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
            error
              ? isPasswordField
                ? "border-[#B71C1C]"
                : "border-red-500"
              : value && !error
                ? "border-b-primary"
                : "border-b-gray-300"
          }`}
          placeholder=" "
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false)
            onBlur()
          }}
        />
        <label
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
            error
              ? isPasswordField
                ? "text-[#B71C1C]"
                : "text-red-500"
              : (isFocused || value) && !error
                ? "text-primary"
                : "text-gray-500"
          }`}
        >
          {label}
        </label>
      </div>
      {error && errorMessage && (
        <span className={`absolute left-0 text-sm mt-0.5 ${isPasswordField ? "text-[#B71C1C]" : "text-red-500"}`}>
          {errorMessage}
        </span>
      )}
    </div>
  )
})

FloatingLabelInput.displayName = "FloatingLabelInput"

export function CreateUser() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [toast, setToast] = useState<{
    open: boolean
    variant: "success" | "warning" | "error"
    message: string
  }>({
    open: false,
    variant: "success",
    message: "",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      matricula: "",
      senha: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  const { formState } = form
  const isValid = formState.isValid

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUser({
        nome: values.nome,
        email: values.email,
        matricula: values.matricula,
        senha: values.senha,
      })
      setToast({
        open: true,
        variant: "success",
        message: "Cadastro realizado com sucesso!",
      })
      setTimeout(() => {
        navigate("/usuarios")
      }, 2000)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data
        let errorMessages: string[] = []

        if (errorData && typeof errorData === "object" && "message" in errorData) {
          if (Array.isArray(errorData.message)) {
            errorMessages = errorData.message
          } else if (typeof errorData.message === "string") {
            errorMessages = [errorData.message]
          }
        }

        setToast({
          open: true,
          variant: "error",
          message: errorMessages.length > 0 ? errorMessages.join(". ") : "Erro ao cadastrar usuário.",
        })
      } else {
        setToast({
          open: true,
          variant: "error",
          message: "Erro ao cadastrar usuário. Por favor, tente novamente.",
        })
      }
    }
  }

  const handleCancel = () => {
    setShowCancelDialog(false)
    setToast({
      open: true,
      variant: "warning",
      message: "Cadastro cancelado",
    })
    setTimeout(() => {
      navigate("/usuarios")
    }, 2000)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <button onClick={() => navigate("/usuarios")} className="hover:text-gray-700">
              Usuários
            </button>
            <span>/</span>
            <span>Cadastro de Usuário</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/usuarios")} className="hover:bg-gray-100 p-1 rounded-full">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Cadastro de Usuário</h1>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-base font-medium relative after:absolute after:content-[''] after:h-[1px] after:bg-gray-300 after:left-0 after:right-[-24px] after:top-1/2 after:translate-y-3 mb-6">
                Dados do Usuário
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Controller
                          name="nome"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <div className="mb-6">
                              <FloatingLabelInput
                                label="Nome Completo"
                                error={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name="nome"
                              />
                              <p className="text-xs text-gray-500 text-right">Máx. 30 Caracteres</p>
                            </div>
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="matricula"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Controller
                          name="matricula"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <div className="mb-6">
                              <FloatingLabelInput
                                label="Matrícula"
                                error={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                name="matricula"
                              />
                              <p className="text-xs text-gray-500 text-right">Mín. 4 letras • Máx. 10 Caracteres</p>
                            </div>
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Controller
                          name="email"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <div className="mb-6">
                              <FloatingLabelInput
                                label="E-mail"
                                error={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                type="email"
                                name="email"
                              />
                              <p className="text-xs text-gray-500 text-right">Máx. 40 Caracteres</p>
                            </div>
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h2 className="text-base font-medium relative after:absolute after:content-[''] after:h-[1px] after:bg-gray-300 after:left-0 after:right-[-24px] after:top-1/2 after:translate-y-3 mb-6">
                Dados de acesso
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Controller
                            name="senha"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <div className="mb-6">
                                <FloatingLabelInput
                                  label="Senha"
                                  error={!!fieldState.error}
                                  errorMessage={fieldState.error?.message}
                                  value={field.value}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  type={showPassword ? "text" : "password"}
                                  name="senha"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                                >
                                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                              </div>
                            )}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <div className="mb-6">
                                <FloatingLabelInput
                                  label="Repetir Senha"
                                  error={!!fieldState.error}
                                  errorMessage={fieldState.error?.message}
                                  value={field.value}
                                  onChange={field.onChange}
                                  onBlur={field.onBlur}
                                  type={showConfirmPassword ? "text" : "password"}
                                  name="confirmPassword"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                                >
                                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                              </div>
                            )}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setShowCancelDialog(true)} className="px-8">
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!isValid}
                className={`px-8 ${
                  isValid ? "bg-primary hover:bg-primary/90 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      <CancelDialog open={showCancelDialog} onOpenChange={setShowCancelDialog} onConfirm={handleCancel} />
      <Toast
        open={toast.open}
        variant={toast.variant}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />
    </div>
  )
}

