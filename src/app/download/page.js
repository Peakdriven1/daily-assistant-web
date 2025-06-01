'use client';

import { useState } from 'react';

export default function DownloadPage() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [message, setMessage] = useState('');

  const handleDownload = async () => {
    setMessage('Downloading...');

    try {
      const res = await fetch('https://daily-assistant-backend.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format }),
      });

      if (!res.ok) {
        throw new Error('Download failed');
      }

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `video.${format}`;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      setMessage('✅ Download complete!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to download. Check the link or try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#DFD7C3] text-[#3F3329] p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 mt-10">🎥 Download YouTube Video</h2>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste YouTube link here"
        className="w-full max-w-xl p-3 rounded-lg border border-gray-400 mb-4"
      />

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => { setFormat('mp4'); handleDownload(); }}
          className="bg-[#3F3329] text-white px-6 py-2 rounded-lg hover:bg-[#2e241c] transition"
        >
          Download MP4
        </button>
        <button
          onClick={() => { setFormat('mp3'); handleDownload(); }}
          className="bg-[#3F3329] text-white px-6 py-2 rounded-lg hover:bg-[#2e241c] transition"
        >
          Download MP3
        </button>
      </div>

      {message && <p className="text-sm text-center">{message}</p>}
    </div>
  );
}
