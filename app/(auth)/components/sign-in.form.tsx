import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const SignInForm = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Inicio Sesion</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tu Email y contraseña
        </p>
      </div>
      <form>
        <div className="grid gap-2">
            {/* email */}
          <div className="mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="email@example.com"
              type="email"
              autoComplete="email"
            />
          </div>
            {/* password */}
            <div className="mb-3">
            <Label htmlFor="email">Contaseña</Label>
            <Input
              id="password"
              placeholder="Ingrese su contraseña"
              type="password"
              autoComplete="password"
            />
          </div>
          <Link
          href="/forgot-password"
          className="underline text-muted-foreground underline-offset-4 hover:text-primary mb-6 text-sm text-end"
          >¿Olvidaste tu contraseña?</Link>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
