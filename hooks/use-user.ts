import { getFromLocalstorage } from "@/actions/get-from-localstorage"
import { setInLocalstorage } from "@/actions/set-in-localstorage"
import { User } from "@/interfaces/user.interface"
import { auth, getDocument } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { DocumentData } from "firebase/firestore"
import { useEffect, useState } from "react"




export const useUser=()=>{
    const [user, setUser] = useState<User|undefined|DocumentData>(undefined)
    const getUserFromDb=async (uid:string) =>{
        const path=`users/${uid})`;
        try{
           let res = await getDocument(path);
           setUser(res);
           
           setInLocalstorage('seru',res);
        }catch(error){

        }
    }

    useEffect(()=>{
        return onAuthStateChanged(auth, async(authUser)=>{
            

            //El usuario esta Auth
            if(authUser){

                const userInLocal=getFromLocalstorage('user');

                if(userInLocal) setUser(userInLocal);
                else getUserFromDb(authUser.uid);
              

            }
           //No esta Auth
           else{


           }
        })
    }



)
return user;
}