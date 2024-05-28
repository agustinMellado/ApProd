import Logo from "@/components/logo";
import { Metadata } from "next";

export const metadata: Metadata={
    title: "Sing IN",
    description:"Sing in to get access to your product list"
}
const AuthPage = () => {

    return ( 
        <div className="flex justify-center items-center md:h-[95vh]">
            <div className="container h-[85vh] flex-col justify-center md:grid lg:grid-cols-2 lg:px-0">
                {/* seccion imagen */}
                <div className="relative hidden h-full flex-col p-10 text-white lg:flex">
                    <div className="bg-auth  absolute inset-0"></div>
                    <Logo/>
                    <div className="relative z-20 mt-auto">
                        <p className='text-lg'>
                        &ldquo;Sistema para facilitar tu vida&ldquo;
                        </p>
                        <footer className="text-sm">Mellado Agustin</footer>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AuthPage;