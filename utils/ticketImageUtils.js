/**
 * Utility functions for ticket image generation
 * Ensures consistent settings for html-to-image conversion across all ticket components
 */

// Standard options for toPng conversion
export const getTicketImageOptions = (width = 727, height = 400) => ({
  cacheBust: true,
  pixelRatio: 2, // Higher quality for retina displays
  useCORS: true, // Allow cross-origin images
  allowTaint: true, // Allow tainted canvas
  backgroundColor: '#ffffff',
  width,
  height,
  style: {
    transform: 'none',
    transformOrigin: 'top left',
    // Ensure fonts are loaded before conversion
    fontDisplay: 'swap',
  },
  // Add filter to improve image quality
  filter: node => {
    // Exclude script tags and other non-visual elements
    if (node.tagName === 'SCRIPT') return false;
    if (node.tagName === 'STYLE' && node.innerHTML.includes('@font-face')) {
      // Keep font-face styles
      return true;
    }
    return true;
  },
});

// Function to convert image URL to base64
export const convertImageToBase64 = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Error loading image ${url}:`, error);
    return url; // fallback to original URL
  }
};

// Preload multiple images and convert to base64
export const preloadImagesAsBase64 = async imageUrls => {
  try {
    const base64Images = await Promise.all(
      imageUrls.map(async url => {
        const base64 = await convertImageToBase64(url);
        return { url, base64 };
      })
    );

    return base64Images.reduce((acc, { url, base64 }) => {
      const key = url.split('/').pop().split('.')[0]; // Extract filename without extension
      acc[key] = base64;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error preloading images:', error);
    return {};
  }
};

// SF Pro Display font CSS for inline injection
export const SF_PRO_DISPLAY_FONTS = `
@font-face {
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local("SF Pro Display"), url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYREGULAR.woff") format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: local("SF Pro Display"), url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYMEDIUM.woff") format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: local("SF Pro Display"), url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYSEMIBOLD.woff") format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local("SF Pro Display"), url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYBOLD.woff") format("woff");
}
@font-face {
  font-family: "SF Pro Display";
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: local("SF Pro Display"), url("https://fonts.cdnfonts.com/s/59278/SFPRODISPLAYHEAVY.woff") format("woff");
}`;

// Common styles for team ticket elements
export const TEAM_TICKET_STYLES = {
  ticketTeamName: {
    fontFamily:
      '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '38px',
    letterSpacing: '-0.02em',
  },
  ticketTeamMember: {
    fontFamily:
      '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '24px',
    letterSpacing: '-0.02em',
  },
  ticketTeamRound: {
    fontFamily:
      '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#969696',
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '29px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  },
  ticketTeamDate: {
    fontFamily:
      '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '24px',
    fontWeight: '700',
    lineHeight: '29px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  },
  ticketTeamTime: {
    fontFamily:
      '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#969696',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '29px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  },
  teamHostedBy: {
    fontFamily:
      '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '24px',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  },
  teamDashedLine: {
    border: '2px dashed rgba(0, 0, 0, 0.19)',
    height: '100%',
  },
  teamNumber: {
    fontFamily:
      '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '36px',
    fontWeight: '800',
    writingMode: 'vertical-lr',
    textOrientation: 'mixed',
    transform: 'rotate(-180deg)',
  },
};
