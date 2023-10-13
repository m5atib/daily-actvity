export function getUploadingImageProgress(
  bytesTransferred: number,
  totalBytes: number
) {
  return Math.round((bytesTransferred / totalBytes) * 100);
}

export const log = console.log;
