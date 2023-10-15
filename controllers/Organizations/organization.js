import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const getOrg = async (req, res) => {
    try{
        const response = await prisma.organization.findMany();
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({msg: error.message});
    }
}

// export const getCategoryId = async (req, res) => {
//     try{
//         const response = await prisma.category.findUnique({
//             where:{
//                 id: Number(req.params.id)
//             }
//         });
//         res.status(200).json(response);
//     }catch(error){
//         res.status(404).json({msg: error.message});
//     }
// }

export const createOrg = async (req, res) => {
    const {type, name, status} = req.body;
    console.log(type, name)
    try{
        const response = await prisma.organization.create({
            data:{
                name: name,
                type: type,
                status: status,
            }
        });
        res.status(201).json("Амжилттай нэмлээ");
    }catch(error){
        res.status(400).json({msg: error.message});
    }
}

// export const updateCategory = async (req, res) => {
//     const {name, type} = req.body;
//     try{
//         const response = await prisma.category.update({
//             where:{
//                 id: Number(req.params.id)
//             },
//             data:{
//                 name: name,
//                 type: type,
//             }
//         });
//         res.status(200).json("Амжилттай шинчлэгдлээ");
//     }catch(error){
//         res.status(400).json({msg: error.message});
//     }
// }

// export const deleteCategory = async (req, res) => {
//     try{
//         const response = await prisma.category.delete({
//             where:{
//                 id: Number(req.params.id)
//             },
//         });
//         res.status(200).json("Амжилттай устгалаа");
//     }catch(error){
//         res.status(400).json({msg: error.message});
//     }
// }