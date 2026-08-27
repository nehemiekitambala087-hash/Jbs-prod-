export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function isDirectVideoUrl(url: string): boolean {
  if (!url) return false;
  return (
    url.startsWith('data:video') ||
    url.startsWith('blob:') ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)
  );
}

export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;
  return /youtube\.com|youtu\.be/i.test(url);
}
