export const useValidateImageUrl = (url: string) => {
  const regex =
    /^(?:(?:https?|ftp):\/\/)?(?:\([^)]+\)|[^:\s]+)(?:\:\S+)?(?:\/[\w-._~:\/?#[\]@!$&'()*+,;=%]*)$/;
  return regex.test(url);
};
