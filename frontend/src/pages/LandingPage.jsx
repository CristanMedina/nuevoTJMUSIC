import React, { useEffect, useState } from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import { usePostStore } from "../store/postStore";
import { Loader } from "lucide-react";

const LandingPage = () => {
  const { posts, fetchPosts, isLoading, error } = usePostStore();
  const [newPost, setNewPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = (post) => {
    setNewPost(post);
  };

  return (
    <div className="min-h-screen">

      <main className="max-w-screen-2xl mx-auto p-6 space-y-6">
        <PostForm onPostCreated={handlePostCreated} />

        {error && <p className="text-red-500 text-center">{error}</p>}

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader className="animate-spin w-8 h-8 text-rose-500" />
          </div>
        ) : (
          <div className="space-y-6">
            {newPost && <Post post={newPost} />}
            {posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
