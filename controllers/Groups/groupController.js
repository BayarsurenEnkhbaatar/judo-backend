import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const createGroup = async (req, res) => {
    const {kg, comp_id, group_name} = req.body;
    try{
        const response = await prisma.groups.create({
            data:{
                kg: kg,
                comp_id: comp_id,
                group_name: group_name
            }
        });
        res.status(201).json("Амжилттай нэмлээ");
    }catch(error){
        res.status(400).json({msg: error.message});
    }
}

export const getGroupComp = async (req, res) => {
    const {comp_id, kg} = req.query
    try{
        const response = await prisma.groups.findMany({
            where:{
                comp_id: Number(comp_id),
                kg: kg,
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}