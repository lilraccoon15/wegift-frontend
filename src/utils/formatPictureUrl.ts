export const formatPictureUrl = (
  rawPicture: string | undefined,
  backendUrl: string,
  defaultUrl: string
): string => {
  if (!rawPicture) return `${backendUrl}${defaultUrl}`;

  if (rawPicture.startsWith("blob:") || rawPicture.startsWith("http")) {
    return rawPicture;
  }

  return `${backendUrl}${rawPicture}`;
};
