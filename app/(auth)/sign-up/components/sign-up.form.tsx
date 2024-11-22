'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import * as z from "zod";// importacion de toda la libreria.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUser, updateUser } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { getDisplayName } from "next/dist/shared/lib/utils";
const SignUpForm = () => {
  //Estado de carga
  const [isLoading, setisLoading] = useState<boolean>(false)
  //==============form==============

  //Definimos el esquema de validacion del formulario usando la biblioteca Zod

  const formSchema = z.object({
    uid: z.string(),
    name: z.string().min(3, {
      message: 'El nombre debe tener al menos 3 caracteres'
    }),
    email: z.string().email('El email no es valido.').min(1, {
      message: 'Este campo es obligatorio.'
    }),
    password: z.string().min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres'
    })
  })
  // Configuramos el formulario usando el hook useForm de React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: '',
      name: '',
      email: '',
      password: ''
    }
  })
  // Extraccion de datos
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  //==============Sign In==============
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
   
    setisLoading(true);
    try {

      let res = await CreateUser(user);
      await updateUser({ displayName: user.name });

    } catch (error: any) {

      toast.error(error.message, { duration: 2500 });

    } finally {//espero la respuesta 

      setisLoading(false);//saco la carga

    }
  }
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Registro</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa los siguientes datos para crear tu cuenta
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>


        <div className="grid gap-2">

          {/*==============name==============*/}
          <div className="mb-3">
            <Label htmlFor="name">Nombre</Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="Ingrese su nombre"
              type="text"
              autoComplete="name"
            />
            <p className="form-error">{errors.name?.message}</p>
          </div>

          {/*==============email==============*/}
          <div className="mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="Ingrese su email"
              type="email"
              autoComplete="email"
            />
            <p className="form-error">{errors.email?.message}</p>
          </div>
          {/*==============password==============*/}
          <div className="mb-3">
            <Label htmlFor="password">Contaseña</Label>
            <Input
              {...register("password")}
              id="password"
              placeholder="Ingrese su contraseña"
              type="password"
              autoComplete="password"
            />
            <p className="form-error">{errors.password?.message}</p>
          </div>
          

          {/*==============Crear cuenta==============*/}
          <Button
            type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Crear Cuenta
          </Button>
        </div>
      </form>

      {/* ==============iniciar sesion============== */}
      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tenes cuenta? {""}
        <Link
          href="/"
          className="underline underline-offset-4 hover:text-primary"
        >
          Iniciar Sesion
        </Link>
      </p>
    </>
  );
};

export default SignUpForm;
