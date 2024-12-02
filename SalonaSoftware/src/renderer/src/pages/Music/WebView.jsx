import React, { useRef, useState, useEffect } from 'react'

const WebView = ({ visible, setVisible }) => {
  const webviewRef = useRef(null)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [loading, setLoading] = useState(true)

  // Handles navigation
  const handleNavigation = (direction) => {
    const webview = webviewRef.current

    if (webview) {
      if (direction === 'back' && webview.canGoBack()) {
        webview.goBack()
      } else if (direction === 'forward' && webview.canGoForward()) {
        webview.goForward()
      }
    }
  }

  // Mute/unmute and volume control
  const handleAudioControl = (action) => {
    const webview = webviewRef.current

    if (webview) {
      switch (action) {
        case 'mute':
          webview.executeJavaScript(`document.querySelector('video').muted = true;`)
          break
        case 'unmute':
          webview.executeJavaScript(`document.querySelector('video').muted = false;`)
          break
        case 'volume':
          // You can adjust the volume with a value between 0 and 1
          webview.executeJavaScript(`document.querySelector('video').volume = 0.5;`)
          break
        default:
          break
      }
    }
  }

  // Save cookies to localStorage
  const saveCookies = () => {
    const webview = webviewRef.current

    if (webview) {
      webview
        .getWebContents()
        .session.cookies.get({ url: 'https://www.youtube.com' })
        .then((cookies) => {
          localStorage.setItem('youtubeCookies', JSON.stringify(cookies))
        })
        .catch((err) => console.error('Error saving cookies:', err))
    }
  }

  // Inject cookies into the webview
  const injectCookies = () => {
    const cookies = JSON.parse(localStorage.getItem('youtubeCookies'))

    if (cookies) {
      const webview = webviewRef.current
      cookies.forEach((cookie) => {
        webview
          .getWebContents()
          .session.cookies.set(cookie)
          .catch((err) => console.error('Error setting cookie:', err))
      })
    }
  }

  // Updates navigation state (fallback with periodic checks)
  useEffect(() => {
    const interval = setInterval(() => {
      const webview = webviewRef.current

      if (webview) {
        setCanGoBack(webview.canGoBack())
        setCanGoForward(webview.canGoForward())
      }
    }, 500) // Check every 500ms

    return () => clearInterval(interval)
  }, [])

  // Internet connection status updates
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Inject cookies after webview is loaded
  useEffect(() => {
    const webview = webviewRef.current
    if (webview) {
      webview.addEventListener('did-finish-load', () => {
        injectCookies() // Inject cookies after the page loads
        setLoading(false) // Hide the loader after the page finishes loading
      })
    }

    return () => {
      if (webview) {
        webview.removeEventListener('did-finish-load', injectCookies)
      }
    }
  }, [])

  // Save cookies when user logs out or the app is closed
  const handleLogout = () => {
    const webview = webviewRef.current

    if (webview) {
      saveCookies() // Save cookies when user logs out
    }
  }

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
        <h1 className="text-xl font-bold text-red-500 mb-4">No Internet Connection</h1>
        <p className="text-gray-700">Please check your internet connection and try again.</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-red-500">
      {/* Header with navigation buttons */}
      <div className=" bg-blue-500 text-white py-2 px-8 flex items-center justify-between">
        <div className="flex space-x-2">
          {/* Audio Control Buttons */}
          <button
            onClick={() => handleAudioControl('mute')}
            className="px-4 bg-blue-600 hover:bg-blue-500 rounded"
          >
            🔇 Mute
          </button>
          <button
            onClick={() => handleAudioControl('unmute')}
            className="px-4 bg-green-600 hover:bg-green-500 rounded"
          >
            🔊 Unmute
          </button>
          <button
            onClick={() => handleAudioControl('volume')}
            className="px-4 bg-yellow-600 hover:bg-yellow-500 rounded"
          >
            Volume
          </button>
        </div>
        <div className="flex space-x-2">
          {/* Navigation Buttons */}
          <button
            onClick={() => handleNavigation('back')}
            disabled={!canGoBack}
            className={`px-4 rounded ${canGoBack ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            ◀ Back
          </button>
          <button
            onClick={() => handleNavigation('forward')}
            disabled={!canGoForward}
            className={`px-4 rounded ${canGoForward ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Forward ▶
          </button>
        </div>
      </div>

      {/* Loader while the webview is loading */}

      {/* Webview */}
      <div className="h-[95%] bg-cyan-500 p-4 overflow-hidden rounded-2xl">
        {loading && (
          <div className="flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-50">
            <div className="loader">Loading...</div> {/* Add your own spinner or animation */}
          </div>
        )}
        <webview
          ref={webviewRef}
          src="https://www.youtube.com/"
          className="w-full h-full rounded-2xl overflow-hidden"
        ></webview>
      </div>
    </div>
  )
}

export default WebView
