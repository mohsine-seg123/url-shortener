import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(){
    try{
        const urls= await prisma.url.findMany({
            orderBy:{
                createdAt:"desc"
    },
    take:7})
    return NextResponse.json({urls})
}catch(error){
    console.error("Error fetching URLs",error)
    return NextResponse.json({error:"Failed to fetch URLs"},{status:500})
}
}