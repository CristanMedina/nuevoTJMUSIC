import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        trim: true,
        default: ''
    },
    media: [{
        url: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['image', 'audio', 'video'],
            required: true
        },
        thumbnail: {
            type: String
        }
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        replies: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                required: true,
                trim: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]
    }],
    visibility: {
        type: String,
        enum: ['public', 'private', 'followers'],
        default: 'public'
    },
    tags: [{
        type: String,
        trim: true
    }],
    location: {
        type: String,
        trim: true
    },
    postType: {
        type: String,
        enum: ['standard', 'song', 'event'],
        required: true
    }
}, {timestamps: true,});

const songPostSchema = new mongoose.Schema({
    ...postSchema.obj,
    songInfo: {
        title: {
            type: String,
            required: true,
            trim: true
        },
        genre: [{
            type: String,
            trim: true
        }],
        instruments: [{
            type: String,
            trim: true
        }],
        isOriginal: {
            type: Boolean,
            default: true
        },
        originalArtist: {
            type: String,
            trim: true
        },
        bpm: Number,
        key: String,
        duration: Number,
        collaborators: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            role: {
                type: String,
                trim: true
            }
        }]
    }
}, {
    discriminatorKey: 'postType'
});

const eventPostSchema = new mongoose.Schema({
    ...postSchema.obj,
    eventInfo: {
        title: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: Date,
        venue: {
            name: {
                type: String,
                required: true
            },
            address: String,
            city: String,
            country: String,
            coordinates: {
                latitude: Number,
                longitude: Number
            }
        },
        eventType: {
            type: String,
            enum: ['concierto', 'jam_session', 'taller', 'festival', 'otro'],
            required: true
        },
        ticketPrice: {
            type: Number,
            min: 0
        },
        ticketUrl: String,
        performers: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            role: String
        }],
        isVirtual: {
            type: Boolean,
            default: false
        },
        meetLink: String
    }
}, {
    discriminatorKey: 'postType'
});

const standardPostSchema = new mongoose.Schema({
    ...postSchema.obj,
}, {
    discriminatorKey: 'postType'
});

const PostModel = mongoose.model('Post', postSchema);

const SongPost = PostModel.discriminator('song', songPostSchema);
const EventPost = PostModel.discriminator('event', eventPostSchema);
const StandardPost = PostModel.discriminator('standard', standardPostSchema);

standardPostSchema.index({ author: 1, createdAt: -1 });
standardPostSchema.index({ tags: 1 });
standardPostSchema.index({ postType: 1 });
songPostSchema.index({ 'songInfo.genre': 1 });
eventPostSchema.index({ 'eventInfo.startDate': 1 });
eventPostSchema.index({ 'eventInfo.venue.city': 1 });

export { PostModel, SongPost, EventPost, StandardPost };
