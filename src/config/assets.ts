/**
 * CENTRALIZED ASSET PATHS
 * Replace `null` with image paths in `/public/...` (e.g. '/images/profile.webp')
 * whenever real photography or dashboard screenshots are ready.
 * Components automatically render clean architectural placeholders when null.
 */

export const PROFILE_PHOTO_URL: string | null = '/images/removpasfoto.png';
export const ABOUT_AVATAR_URL: string | null = '/images/removpasfoto.png';

export const PROJECT_PREVIEW_IMAGES: Record<string, string | null> = {
  'pizza-sales': '/images/projects/pizza-dashboard.png',
  'nyc-traffic': '/images/projects/nyc-traffic-dashboard.png',
};

export const CERTIFICATE_THUMBNAILS = {
  certiport: '/certificates/certiport-thumb.png',
  bnsp: '/certificates/bnsp-web-developer.jpg',
} as const;
