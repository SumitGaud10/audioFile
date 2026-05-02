const imageToUrl = async (file: File, previousUrl?: string) => {
  if (typeof previousUrl === "string" && previousUrl.startsWith("blob:")) {
    URL.revokeObjectURL(previousUrl);
  }
  const Uint8 = new Uint8Array(await file.arrayBuffer());
  const blob = new Blob([Uint8]);
  return URL.createObjectURL(blob);
};

export default imageToUrl;
