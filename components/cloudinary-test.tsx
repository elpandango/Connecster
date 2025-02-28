"use client";

import { CldImage } from 'next-cloudinary';

export default function CloudinaryTest() {
  return (
    <CldImage
      src="cld-sample-5" // Use this sample image or upload your own via the Media Explorer
      width="500" // Transform the image: auto-crop to square aspect_ratio
      height="500"
      alt="Test image"
      crop={{
        type: 'auto',
        source: true
      }}
    />
  );
}