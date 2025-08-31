// Utility function to convert image URLs to base64 data URLs
export const getImageAsBase64 = async imagePath => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

// Pre-load common images as base64
export const getCommonImages = async () => {
  const images = {
    logoLight: '/assets/logo-light.png',
    msClubLogo: '/assets/ms_club_logo.png',
    fcscLogo: '/assets/fcsc_logo.webp',
  };

  const base64Images = {};

  for (const [key, path] of Object.entries(images)) {
    base64Images[key] = await getImageAsBase64(path);
  }

  return base64Images;
};
