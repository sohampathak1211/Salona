import React, { useRef, useState, useEffect } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'
import { GoUnmute } from 'react-icons/go'
import { GoMute } from 'react-icons/go'
import { SiYoutubemusic } from 'react-icons/si'
import { SiSpotify } from 'react-icons/si'
import { SiYoutube } from 'react-icons/si'

const WebView = ({ visible, setVisible }) => {
  const webviewRef = useRef(null)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [loading, setLoading] = useState(true)
  const [mute, setMuted] = useState(false)
  const [volume, setVolume] = useState(1.0)
  const [currentUrl, setCurrentUrl] = useState('https://www.youtube.com/')
  const [currentKey, setCurrentKey] = useState('youtubeCookies')
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

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)

    const webview = webviewRef.current
    if (webview) {
      webview.executeJavaScript(
        `(() => {
          const video = document.querySelector('video');
          if (video) {
            video.volume = ${newVolume};
            return video.volume;
          }
          return 0;
        })();`
      )
    }
  }
  // Mute/unmute and volume control
  const handleAudioControl = (action) => {
    const webview = webviewRef.current

    if (webview) {
      switch (action) {
        case 'mute':
          webview.executeJavaScript(`document.querySelector('video').muted = true;`)
          setMuted(true)
          break
        case 'unmute':
          webview.executeJavaScript(`document.querySelector('video').muted = false;`)
          setMuted(false)
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
        .session.cookies.get({ url: currentUrl })
        .then((cookies) => {
          localStorage.setItem(currentKey, JSON.stringify(cookies))
        })
        .catch((err) => console.error('Error saving cookies:', err))
    }
  }

  // Inject cookies into the webview
  const injectCookies = () => {
    const cookies = JSON.parse(localStorage.getItem(currentKey))

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

  const handleUrlChange = (url) => {
    setCurrentUrl(url)
    if (url == 'https://www.youtube.com/') {
      setCurrentKey('youtubeCookies')
    } else if (url == 'https://www.spotify.com/') {
      setCurrentKey('spotifyCookies')
    } else {
      setCurrentKey('ytMusicCookies')
    }
    setLoading(true)
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
    <div className="w-full h-[95%]">
      {/* Header with navigation buttons */}
      <div className="text-white pt-3 px-8 flex items-center justify-between">
        <div className="flex space-x-2">
          {/* Navigation Buttons */}
          <button
            onClick={() => handleNavigation('back')}
            disabled={!canGoBack}
            className={`p-3 rounded-full ${canGoBack ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => handleNavigation('forward')}
            disabled={!canGoForward}
            className={`p-3 rounded-full ${canGoForward ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            <FaChevronRight />
          </button>
          <div className="flex space-x-2">
            {/* Audio Control Buttons */}

            {mute ? (
              <button
                onClick={() => handleAudioControl('unmute')}
                className={`p-3 rounded-full ${mute ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-500'}`}
              >
                <GoMute />
              </button>
            ) : (
              <button
                onClick={() => handleAudioControl('mute')}
                className={`p-3 rounded-full ${mute ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-500'}`}
              >
                <GoUnmute />
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2 pl-4">
            <input
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 "
            />
            <span className="text-sm">{Math.round(volume * 100)}%</span>
          </div>
        </div>
        <div className="flex">
          <div className="px-2">
            <SiYoutube
              color="yellow"
              size={30}
              onClick={() => handleUrlChange('https://www.youtube.com/')}
              className="cursor-pointer"
            />
          </div>
          <div className="px-2">
            <SiSpotify
              color="yellow"
              size={30}
              onClick={() => handleUrlChange('https://www.spotify.com/')}
              className="cursor-pointer"
            />
          </div>
          <div className="px-2">
            <SiYoutubemusic
              color="yellow"
              size={30}
              onClick={() => handleUrlChange('https://music.youtube.com/')}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Loader while the webview is loading */}

      {/* Webview */}
      <div className="h-full p-4 overflow-hidden rounded-2xl">
        <webview
          ref={webviewRef}
          src={currentUrl}
          className="w-full h-full rounded-2xl overflow-hidden"
        ></webview>
      </div>
    </div>
  )
}

export default WebView
