import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    // Update Title
    const baseTitle = "VibeShop";
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Thời Trang Đương Đại`;

    // Update Meta Description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [title, description]);

  return null;
};

export default SEO;
