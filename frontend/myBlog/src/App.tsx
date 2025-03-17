import './App.css'

function App() {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log('Comment added:', comment); // Replace with actual comment submission logic
      setComment('');
    }
  };
  
  return (
    <>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      {/* Header with Avatars and Buttons */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div> {/* Avatar 1 */}
          <div className="w-8 h-8 bg-gray-500 rounded-full"></div> {/* Avatar 2 */}
          <div className="w-8 h-8 bg-pink-500 rounded-full"></div> {/* Avatar 3 */}
          <span className="text-gray-500 text-sm">+2</span>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-500 hover:text-gray-700 text-sm">Share</button>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Comments</button>
          <button className="text-gray-500 hover:text-gray-700 text-sm">Properties</button>
          <button className="text-gray-500 hover:text-gray-700 text-sm">Activity</button>
        </div>
      </div>

      {/* Comment Area */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {/* Placeholder Comments */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start space-x-2 opacity-50">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Comment Avatar Placeholder */}
            <div className="flex-1">
              <div className="bg-gray-200 h-4 w-3/4 rounded"></div> {/* Comment Text Placeholder */}
            </div>
          </div>
          <div className="flex items-start space-x-2 opacity-50">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Comment Avatar Placeholder */}
            <div className="flex-1">
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div> {/* Comment Text Placeholder */}
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-4">No comment yet</p>

        {/* Comment Input */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div> {/* User Avatar */}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add comment..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
          >
            Post
          </button>
        </form>
        <p className="text-gray-500 text-xs mt-1">use @ to mention someone</p>
      </div>

      {/* Sidebar (Placeholder) */}
      <div className="w-1/4 bg-gray-200 h-full"></div>
    </div>
    </>
  )
}

export default App
