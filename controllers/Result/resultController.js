import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const ResultGetComp = async (req, res) => {
    const { comp_id, kg, round,group } = req.query;

    try {
        const response = await prisma.results.findMany({
            where:{
                comp_id:Number(comp_id),
                kg:kg,
                round: Number(round),
                group:group
            },
            include: {
                winnerid: true,
            },
        });

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json('Internal server error');
    }
};
