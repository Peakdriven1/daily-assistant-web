import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function POST(req) {
  const { url, format } = await req.json();

  if (!url || !format) {
    return NextResponse.json({ error: 'Missing url or format' }, { status: 400 });
  }

  try {
    const filename = `download.${format}`;
    const outputPath = path.resolve(filename);

    const args =
      format === 'mp3'
        ? ['-x', '--audio-format', 'mp3', '-o', outputPath, url]
        : ['-f', 'bestvideo+bestaudio', '--merge-output-format', 'mp4', '-o', outputPath, url];

    await new Promise((resolve, reject) => {
      const ytdlp = spawn('yt-dlp', args);

      ytdlp.stderr.on('data', (data) => console.error(data.toString()));
      ytdlp.on('close', (code) => {
        code === 0 ? resolve() : reject(new Error('yt-dlp failed'));
      });
    });

    const fileBuffer = fs.readFileSync(outputPath);
    fs.unlinkSync(outputPath); // cleanup

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': format === 'mp3' ? 'audio/mpeg' : 'video/mp4',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
