export function isVideoUrl(url?: string | null): boolean {
  if (!url) return false;
  const cleanUrl = url.split("?")[0].toLowerCase();
  const videoExtensions = [".webm", ".mp4", ".ogg", ".mov", ".m4v", ".avi", ".mkv"];
  return videoExtensions.some((ext) => cleanUrl.endsWith(ext));
}
