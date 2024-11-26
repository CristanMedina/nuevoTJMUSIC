import  { PostModel, SongPost, EventPost, StandardPost } from '../models/post.model.js';

export const createPost = async(req, res) => {
    try {
        const { postType } = req.body;
        let post;

        switch (postType) {
            case 'song':
                post = new SongPost({
                    ...req.body,
                    author: req.user._id
                });
            break;

            case 'event':
                post = new EventPost({
                    ...req.body,
                    author: req.user._id
                });
            break;

            case 'standard':
                post = new StandardPost({
                    ...req.body,
                    author: req.user._id
                });
            break;

            default:
                return res.status(400).json({ message: "Tipo de publicacion invalida" });
        }

        await post.save();
        await post.populate('author', 'name');

        res.status(201).json({
            message: 'Publicacion creada con exito',
            post
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Error creando publicacion',
            error: error.message
        });
    }
}

export const getPosts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            postType,
            genre,
            eventType,
            startDate,
            endDate,
            visibility,
        } = req.query;

        let query = {};

        if (postType) query.postType = postType;
        if (genre) query["songInfo.genre"] = genre;
        if (eventType) query["eventInfo.eventType"] = eventType;
        if (visibility) query.visibility = visibility;

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const posts = await PostModel.find(query)
            .populate('author', 'name')
            .populate('like', 'name')
            .populate('comments.user', 'name')
            .populate('comments.replies.user', 'name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await PostModel.countDocuments(query);

        res.json({
            posts,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalPosts: total
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error en funcion getPosts',
            error: error.message
        });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
            .populate('author', 'name')
            .populate('like', 'name')
            .populate('comments.user', 'name')
            .populate('comments.replies.user', 'name')

        if(!post){
            return res.status(404).json({ message: "Post no encontrado" });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: 'Error en getPostById',
            error: error.message
        });
    }
}

export const getPostsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await PostModel.find({ author: userId })
            .populate('author', 'name')
            .populate('like', 'name')
            .populate('comments.user', 'name')
            .populate('comments.replies.user', 'name')
            .sort({ createdAt: -1 });

        if (!posts.length) {
            return res.status(404).json({ message: "No posts found for this user" });
        }

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Error in getPostsByUser',
            error: error.message
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await PostModel.findOne({
            _id: req.params.id,
            author: req.user._id
        });

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado, o no estas autorizado' });
        }

        const updateData = req.body;
        delete updateData.author;
        delete updateData.postType;
        delete updateData.likes;
        delete updateData.comments;

        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        ).populate('author', 'name');

        res.json({
            message: 'Post actualizado con exito',
            post: updatedPost
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error actualizando post',
            error: error.message
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await PostModel.findOneAndDelete({
            _id: req.params.id,
            author: req.user._id
        });

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado, o no estas autorizado' });
        }

        res.json({ message: 'Post eliminado con exito' });
    } catch (error) {
        res.status(500).json({
            message: 'Error eliminando post',
            error: error.message
        });
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        const likeIndex = post.likes.indexOf(req.user._id);

        if (likeIndex === -1) {
            post.likes.push(req.user._id);
        } else {
            post.likes.splice(likeIndex, 1);
        }

        await post.save();

        res.json({
            message: likeIndex === -1 ? 'Like agregado' : 'Like removido',
            likes: post.likes.length
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al agregar like',
            error: error.message
        });
    }
}

export const commentPost = async (req, res) => {
    try {
        const { text } = req.body;
        const comment = {
            user: req.user._id,
            text
        };

        const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $push: { comments: comment } },
            { new: true }
        ).populate('comments.user', 'name');

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        res.json({
            message: 'Comentario agregado con exito',
            comment: post.comments[post.comments.length - 1]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error agregando comentario',
            error: error.message
        });
    }
}

export const replyComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { commentId } = req.params;

        const reply = {
            user: req.user._id,
            text
        };

        const post = await PostModel.findOneAndUpdate(
            { 'comments._id': commentId },
            { $push: { 'comments.$.replies': reply } },
            { new: true }
        ).populate('comments.replies.user', 'name');

        if (!post) {
            return res.status(404).json({ message: 'Post o comentario no encontrado' });
        }

        const updatedComment = post.comments.find(
            comment => comment._id.toString() === commentId
        );

        res.json({
            message: 'Respuesta agregado con exito',
            reply: updatedComment.replies[updatedComment.replies.length - 1]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error agregando respuesta',
            error: error.message
        });
    }
};
