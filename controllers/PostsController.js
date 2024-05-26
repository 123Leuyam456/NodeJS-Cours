const prisma = require ("../config/prisma");

class PostsController {


    async index(req, res){
        try {
            const posts = await prisma.post.findMany();
            return res.status(200).json(posts);
        }catch (e){
            return res.status(500).json({message: e.message})
        }
    }


    async store(req, res){
        try {
            const body = req.body;
            const post = await prisma.post.create({
                "data": body
            })
            return res.status(200).json(post);
        }catch (e){
            return res.status(500).json({message: e.message})
        }
    }


    async show(req, res){
        try {
        const id = req.params.id;
        const post = await prisma.post.findUnique({
            where: {
              id: Number(id),
            },
        })
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(post);
        
        }catch (e){
            return res.status(500).json({message: e.message})
        }
    }


    async update(req, res){
        try {
            const id = req.params.id;
            const body = req.body;
            const post = await prisma.post.update({
                where: { id: Number(id),},
                data: body
            })

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }
    
            post.name = body.name;
    
            return res.status(200).json(post);
        }catch (e){
            return res.status(500).json({message: e.message})
        }  
    }


    async delete(req, res){
        try {
            const id = req.params.id;
            const post = await prisma.post.findUnique({
                where: {
                  id: Number(id),
                },
            })

            if (post) {
                const post = await prisma.post.delete({
                    where: { id: Number(id),},
                })
                return res.status(200).json(post);
            }else{
                return res.status(404).json({ message: "Post not found" });
            }

        }catch (e){
            return res.status(500).json({message: e.message})
        }
    }

    
}

module.exports = new PostsController();
