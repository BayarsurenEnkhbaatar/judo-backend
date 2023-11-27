import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const getCategory = async (req, res) => {
    try{
        const response = await prisma.category.findMany();
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const getCategoryId = async (req, res) => {
    try{
        const response = await prisma.category.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const createCategory = async (req, res) => {
    const {name, type, gender, access_age} = req.body;
    const date = new Date(access_age)
    try{
        const response = await prisma.category.create({
            data:{
                name: name,
                type: type,
                gender: gender,
                access_age:date,
            }
        });
        res.status(201).json("Амжилттай нэмлээ");
    }catch(error){
        console.log(error)
        res.status(400).json({msg: error.message});
    }
}

export const updateCategory = async (req, res) => {
    const {name, type} = req.body;
    try{
        const response = await prisma.category.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                name: name,
                type: type,
            }
        });
        res.status(200).json("Амжилттай шинчлэгдлээ");
    }catch(error){
        res.status(400).json({msg: error.message});
    }
}

export const deleteCategory = async (req, res) => {
    try{
        const response = await prisma.category.delete({
            where:{
                id: Number(req.params.id)
            },
        });
        res.status(200).json("Амжилттай устгалаа");
    }catch(error){
        res.status(400).json({msg: error.message});
    }
}



// Comp to Category

export const getCategoryToComptation = async (req, res) => {
    try{
        const response = await prisma.comp_to_category.findMany({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

export const getComptationCategoty = async (req, res) => {
    try {
        const response = await prisma.comp_to_category.findMany({
            where: {
                comp_id: Number(req.params.id)
            },
            include: {
                category: {
                    include: {
                        jin: true,
                    },
                },
            },
        });
        
        const compt = await prisma.comptation.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        
        res.status(200).json({
            category: {
                comp: compt,
                data: response
            }
        });
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}
