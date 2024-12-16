<div>
  <div className={`rounded-lg px-4 py-2 ${
    message.type === 'user'
      ? 'bg-gold-800 text-white'
      : 'bg-gray-700 text-gray-200'
  }`}>
    {/* Content goes here */}
  </div>

  <input
    className="flex-1 rounded-md bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-700"
  />
  <button className="rounded-md bg-gold-700 p-2 text-gray-900 hover:bg-gold-600">
    Send
  </button>
</div>