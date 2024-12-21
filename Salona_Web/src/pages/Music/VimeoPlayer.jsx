import React from 'react';

const VimeoPlayer = () => {
  return (
    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
      <iframe
        src="https://player.vimeo.com/video/1041180775?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        title="MW2 GHOST - Way Down We Go"
      ></iframe>
    </div>
  );
};

export default VimeoPlayer;
