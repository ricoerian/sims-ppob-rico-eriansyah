import React from 'react';

interface SliderBannerProps {
  images: string[];
  speed?: number; // Kecepatan animasi dalam detik
}

const SliderBanner: React.FC<SliderBannerProps> = ({ images, speed }) => {
  if (images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex items-center w-max h-full animate-slide"
        style={{
          animationDuration: `${speed}s`, // Durasi animasi
        }}
      >
        {images.concat(images).map((image, index) => ( // Gandakan gambar untuk loop
          <div
            key={index}
            className="flex-none mx-2 overflow-hidden rounded-lg"
          >
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide {
          display: flex;
          animation: slide linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SliderBanner;
