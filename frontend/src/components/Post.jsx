import { useState } from "react";
import { Heart } from "lucide-react";
import { usePostStore } from "../store/postStore";
import { useAuthStore } from "../store/authStore";

const Post = ({ post }) => {
  const { likePost, commentPost } = usePostStore();
  const { user, isAuthenticated } = useAuthStore();
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [error, setError] = useState("");

  const handleLike = async () => {
    if (!isAuthenticated) {
      setError("You must be logged in to like posts.");
      return;
    }

    setIsLiking(true);
    setError("");
    try {
      await likePost(post._id);

      const userAlreadyLiked = post.likes.includes(user._id);
      setLikes((prevLikes) => (userAlreadyLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (err) {
      console.error("Error liking post:", err);
      setError("Failed to toggle like. Please try again.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("You must be logged in to comment.");
      return;
    }

    setIsCommenting(true);
    setError("");
    try {
      const newCommentData = await commentPost(post._id, newComment);
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment("");
    } catch (err) {
      console.error("Error commenting on post:", err);
      setError("Failed to post the comment. Please try again.");
    } finally {
      setIsCommenting(false);
    }
  };

  const renderPostDetails = () => {
    switch (post.postType) {
      case "song":
        return (
          <div className="mt-4 text-gray-300">
            <p><strong>Título:</strong> {post.songInfo?.title || "N/A"}</p>
            <p><strong>Género:</strong> {post.songInfo?.genre?.join(", ") || "N/A"}</p>
            <p><strong>Artista Original:</strong> {post.songInfo?.originalArtist || "N/A"}</p>
            <p><strong>Duración:</strong> {post.songInfo?.duration || "N/A"} min</p>
          </div>
        );
      case "event":
        return (
          <div className="mt-4 text-gray-300">
            <p><strong>Título del Evento:</strong> {post.eventInfo?.title || "N/A"}</p>
            <p><strong>Fecha de Inicio:</strong> {new Date(post.eventInfo?.startDate).toLocaleDateString() || "N/A"}</p>
            <p><strong>Fecha de Fin:</strong> {new Date(post.eventInfo?.endDate).toLocaleDateString() || "N/A"}</p>
            <p><strong>Tipo de Evento:</strong> {post.eventInfo?.eventType || "N/A"}</p>
            <p><strong>Lugar:</strong> {post.eventInfo?.venue?.name || "N/A"}</p>
            <p><strong>Dirección:</strong> {post.eventInfo?.venue?.address || "N/A"}</p>
          </div>
        );
      case "standard":
      default:
        return <p className="mt-4 text-gray-300">Publicación estándar.</p>;
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow-md p-4 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0"></div>
        <div className="flex-1">
          <p className="font-bold text-rose-400">{post.author?.name || "Unknown Artist"}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleTimeString()} · {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-gray-300">{post.content || "No content available."}</p>

      {renderPostDetails()}

      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="text-gray-400 hover:text-rose-400 flex items-center gap-1"
        >
          <Heart /> {likes} {isLiking && "…"}
        </button>
        <p className="text-gray-400">{comments.length} Comments</p>
      </div>

      <div className="space-y-2">
        {comments.map((comment) => (
          <div key={comment._id} className="text-sm text-gray-300">
            <span className="font-bold text-rose-400">{comment.user?.name || "Anonymous"}:</span> {comment.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleComment} className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-gray-700 text-white rounded-lg p-2"
        />
        <button
          type="submit"
          disabled={isCommenting}
          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
        >
          {isCommenting ? "Posting..." : "Post"}
        </button>
      </form>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Post;
