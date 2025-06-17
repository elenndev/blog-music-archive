import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../lib/prisma"

export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url)
    const credential = searchParams.get("credential")

    if(!credential){
        return NextResponse.json({message: 'Parâmetros ausentes'}, {status: 500})
    }
    
    try{
        const user = await prisma.user.findFirst({
            where: {
                username: credential
            },
        })
        if(user){
            return NextResponse.json({user}, {status: 200})
        } else {
            return NextResponse.json({message: 'Usuário não encontrado'}, {status: 500})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({message:"erro com conexão ao banco de dados"}, {status: 500})
    }

}