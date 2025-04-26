'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [username, setUsername] = useState("")
    const router = useRouter()
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("") 
        
            const response = await signIn("credentials", {
                redirect: false,
                password,
                credential: username })
    
            if (response?.error || response?.status != 200) {
            setError(response?.error ?? "Erro ");
            setLoading(false)
            }else {
                router.push('/dashboard')
            }

        
            
        
        }

        return(
                <div className="h-full w-full flex flex-col items-center relative">
                    <div className='mt-14 w-full max-w-sm p-3 shadow-xl rounded-3xl border border-[#ffb162]'>
                        <div className="w-full max-w-sm bg-[#222e3d] shadow-xl p-4 rounded-3xl">
                            {loading ? (<div className='flex flex-col  items-center'>
                                                <p>Aguarde um momento</p>
                                            </div>) : (<>
                            <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>
                            
                            <form onSubmit={handleSubmit}>
                                <span>
                                    <label htmlFor="crendential">
                                    Email ou nome de usuário
                                    </label>
                                    <input
                                    type="text"
                                    id="crendential"
                                    name="crendential"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    />
                                </span>
                                
                                <span>
                                    <label htmlFor="password" >
                                    Senha
                                    </label>
                                    <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />
                                </span>

                                {error && <p>{error}</p>}

                                <div className="mb-4 mt-2 flex w-full justify-center">
                                    <button
                                    type="submit"
                                    className='font-semibold rounded-md text-white'
                                    >Entrar</button>
                                </div>
                            </form>

                            <div className="text-center flex flex-col mt-4">
                            <Link href='/esqueci-senha' className="font-semibold"
                            >Esqueci minha senha</Link>
                            <Link href='/criar-conta' className="font-semibold"
                            >Criar uma nova conta</Link>
                            </div>
                                            </>)}
                        </div>

                    </div>
                </div>
        )
}