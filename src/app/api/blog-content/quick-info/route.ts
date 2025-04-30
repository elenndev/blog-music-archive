import BlogQuickInfoDB from "../../../../../models/blogQuickInfosModel"
import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from "../../../../../lib/db"

export async function GET(request: NextRequest){
    const { searchParams } = new URL(request.url)
    const info_name = searchParams.get("info_name")
    
    try{
        await connectMongoDB()
        let quickInfo
        if (info_name == 'all'){
            quickInfo = await BlogQuickInfoDB.find()
        }else{
            quickInfo = await BlogQuickInfoDB.findOne({info_name})
        }

        if(quickInfo == null || quickInfo.lenght == 0){
            return NextResponse.json({quickInfo: []},{status: 200})
        } else if(!quickInfo){
            throw new Error("Erro na chamada ao db")
        }

        return NextResponse.json({quickInfo},{status: 200})
        
    }catch(error){
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        return NextResponse.json({error: errorMessage},{status:500})
    }
}