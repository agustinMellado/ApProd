import { Input } from "@/components/ui/input";

const SignInForm = () => {
    return ( 

        <>
        
        <div className="text-center">
            <h1 className="text-2xl font-semibold">
                Inicio Sesion
            </h1>
            <p className="text-sm text-muted-foreground">
                Ingresa tu Email y contraseña
            </p>

            <form >
                <div className="grid gap-3">
                    <div className="mb-2">
                        <Input 
                        id="email"
                        placeholder="email@example.com"
                        type="email"
                        autoComplete="email" />
                    </div>
                </div>

            </form>
        </div>
        </>

     );
}
 
export default SignInForm;
