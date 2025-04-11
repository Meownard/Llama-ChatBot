import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, checkAuthStatus, signupUser, logoutUser } from "../helpers/api-communicator";

type User = {
    name : string;
    email : string;
};

type UserAuth = {
    isLoggedIn : boolean;
    user : User | null;
    login : (email : string, password : string) => Promise<void>;
    signup : (name : string, email : string, password : string) => Promise<void>;
    logout : () => Promise<void>;     
};
const AuthContext = createContext <UserAuth | null>(null);

const AuthProvider = ({children} : {children : React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data){
                setUser({email : data.email, name : data.name}); 
                setIsLoggedIn(true);     
            }
        };

        checkStatus();

        const user = localStorage.getItem("user");
        if(user){
            setUser(JSON.parse(user));
            setIsLoggedIn(true);
        }
    }, []);
    const  login = async (email : string, password : string) => {
        const data = await loginUser(email, password);
        if (data){
            setUser({email : data.email, name : data.name}); 
            setIsLoggedIn(true);
            
        }
    };
    const signup = async (name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      };
    
      const logout = async () => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
      };    

    const value = {
        isLoggedIn,
        user,
        login,
        signup,
        logout,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;   
};

function useAuth(): UserAuth {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };
  
