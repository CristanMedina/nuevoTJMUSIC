import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/posts";

axios.defaults.withCredentials = true;

export const usePostStore = create((set, get) => ({
  posts: [],
  error: null,
  isLoading: false,
  message: null,

  // Fetch all posts
  fetchPosts: async (query = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(API_URL, { params: query });
      set({ posts: response.data.posts, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al cargar publicaciones",
        isLoading: false,
      });
    }
  },

  // Create a new post
  createPost: async (postData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(API_URL, postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      set((state) => ({
        posts: [response.data.post, ...state.posts],
        message: response.data.message || "Publicación creada con éxito",
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al crear publicación",
        isLoading: false,
      });
      throw error;
    }
  },

  // Like or unlike a post
  likePost: async (postId) => {
    try {
        const response = await axios.post(
            `${API_URL}/${postId}/like`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            }
        );

        set((state) => ({
            posts: state.posts.map((post) =>
                post._id === postId
                    ? { ...post, likes: response.data.likes }
                    : post
            ),
        }));
    } catch (error) {
        set({
            error: error.response?.data?.message || "Error toggling like",
        });
        throw error;
    }
},

  // Add a comment to a post
  commentPost: async (postId, text) => {
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data.comment] }
            : post
        ),
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al agregar comentario",
      });
      throw error;
    }
  },

  // Reply to a comment
  replyComment: async (postId, commentId, text) => {
    try {
      const response = await axios.post(
        `${API_URL}/${postId}/comments/${commentId}/replies`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === commentId
                    ? {
                        ...comment,
                        replies: [...comment.replies, response.data.reply],
                      }
                    : comment
                ),
              }
            : post
        ),
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al responder comentario",
      });
      throw error;
    }
  },

  // Delete a post
  deletePost: async (postId) => {
    try {
      await axios.delete(`${API_URL}/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
        message: "Publicación eliminada con éxito",
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error al eliminar publicación",
      });
      throw error;
    }
  },
}));
