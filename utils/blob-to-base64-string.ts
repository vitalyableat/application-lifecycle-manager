export const blobToBase64String = async (blob: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result?.toString() || '');
  });
};
