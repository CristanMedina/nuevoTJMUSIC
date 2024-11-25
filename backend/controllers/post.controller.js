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
