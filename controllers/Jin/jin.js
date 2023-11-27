import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const createJin = async (req, res) => {
    const {kg, id} = req.body;
    try{
        const response = await prisma.jin.create({
            data:{
                kg: kg,
                category_id: id
            }
        });
        res.status(201).json("Амжилттай нэмлээ");
    }catch(error){
        res.status(400).json({msg: error.message});
    }
}

export const getJinId = async (req, res) => {
    try{
        const response = await prisma.jin.findMany({
            where:{
                category_id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}