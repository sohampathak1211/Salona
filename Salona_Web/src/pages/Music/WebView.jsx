import React, { useRef, useState, useEffect } from 'react';

const WebViewBrowser = () => {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Internet connection status updates
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
        <h1 className="text-xl font-bold text-red-500 mb-4">No Internet Connection</h1>
        <p className="text-gray-700">Please check your internet connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-red-500">
      <div className=" bg-blue-500 text-white py-2 px-8 flex items-center justify-between">
        <button
          onClick={() => setLoading(true)}
          className="px-4 bg-blue-600 hover:bg-blue-500 rounded"
        >
          Reload
        </button>
      </div>

      {/* Loader while the iframe is loading */}
      <div className="h-[95%] bg-cyan-500 p-4 overflow-hidden rounded-2xl">
        {loading && (
          <div className="flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50">
            <div className="loader">Loading...</div> {/* Add your own spinner or animation */}
          </div>
        )}
        <iframe
          ref={iframeRef}
          src="https://open.spotify.com/"
          className="w-full h-full rounded-2xl overflow-hidden"
          onLoad={() => setLoading(false)}
          title="Web Content"
        ></iframe>
      </div>
    </div>
  );
};

export default WebViewBrowser;
