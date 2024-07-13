'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import * as z from "zod";// importacion de toda la libreria.
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircle} from "lucide-react";
import toast from "react-hot-toast";
const SignInForm = () => {
  //Estado de carga
  const [isLoading,setisLoading] = useState<boolean>(false)
  //==============form==============

  //Definimos el esquema de validacion del formulario usando la biblioteca Zod
  const formSchema = z.object({
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
    defaultValues: { email: '', password: '' }
  })
  // Extraccion de datos
  const { register, handleSubmit, formState } = form
  const { errors } = formState
   //==============Sign In==============
   const onSubmit = async (user:z.infer<typeof formSchema>)=> {
    console.log(user)
    setisLoading(true);
    try {
      const res=await signIn (user);
      toast.success('Inicio de sesion Exitoso!', {duration:2500})
    } catch (error) {
      toast.error("Email o Contraseña incorrecta.", {duration:2500})
    }finally{//espero la respuesta 
      setisLoading(false)//saco la carga
    }
   }
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Inicio Sesion</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tu Email y contraseña
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {/*==============email==============*/}
          <div className="mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
            {...register("email")}
              id="email"
              placeholder="email@example.com"
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
          <Link
            href="/forgot-password"
            className="underline text-muted-foreground underline-offset-4 hover:text-primary mb-6 text-sm text-end"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          {/*==============Ingresar==============*/}
          <Button 
          type="submit" disabled={isLoading}>
          {isLoading && (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
          )}
          Ingresar
          </Button>
        </div>
      </form>

      {/* ==============Registrarse============== */}
      <p className="text-center text-sm text-muted-foreground">
        ¿No tenes cuenta? {""}
        <Link
          href="/sign-up"
          className="underline underline-offset-4 hover:text-primary"
        >
          Registrar
        </Link>
      </p>
    </>
  );
};

export default SignInForm;
