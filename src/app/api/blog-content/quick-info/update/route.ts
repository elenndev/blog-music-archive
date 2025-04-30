import { NextRequest, NextResponse } from "next/server"
import BlogQuickInfoDB from "../../../../../../models/blogQuickInfosModel"
import { connectMongoDB } from "../../../../../../lib/db"

export async function POST(request: NextRequest){
    try{
        const {info_name, info_value} = await request.json() 
        if(!info_name || !info_value){
            return NextResponse.json({message: "Parâmetros ausentes"}, {status: 500})
        }

        await connectMongoDB()

        const updatedInfo = await BlogQuickInfoDB.updateOne(
            { info_name },
            { $set: { info_value } },
            { upsert: true }
        );

        if (updatedInfo.upsertedCount === 1 || updatedInfo.modifiedCount === 1 || updatedInfo.matchedCount == 1) {
            return NextResponse.json({updateResponse: 200},{status: 200})
        } else {
            return NextResponse.json({message: "Nenhum valor foi alterado nem criado"}, {status: 500})
        }
        

    }catch(error){
        console.log(error)
        const errorMessage = error instanceof Error ?  error.message : "Erro ao salvar no db"
        return NextResponse.json({message: errorMessage}, {status: 500})
    }
}