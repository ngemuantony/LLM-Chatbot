import React, { useState } from 'react';

const VirtualCommunity = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      replies: [],
      anonymous: true
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Virtual Help Community
      </h1>

      {/* Create Post */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your experience or ask for support..."
            className="w-full h-32 p-4 mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg 
                     border border-gray-200 dark:border-gray-600 
                     text-gray-800 dark:text-white resize-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-between items-center">
            <label className="flex items-center text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked
              />
              Post Anonymously
            </label>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 transition-colors"
            >
              Share
            </button>
          </div>
        </div>
      </form>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-800 dark:text-white font-medium">
                  {post.anonymous ? 'Anonymous User' : 'User Name'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 
                         dark:hover:text-gray-200"
              >
                •••
              </button>
            </div>
            <p className="text-gray-800 dark:text-white mb-4">{post.content}</p>
            <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
              <button className="flex items-center space-x-1 hover:text-blue-600">
                <span>👍</span>
                <span>{post.likes}</span>
              </button>
              <button className="hover:text-blue-600">
                💬 Reply
              </button>
              <button className="hover:text-blue-600">
                🔗 Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualCommunity;
