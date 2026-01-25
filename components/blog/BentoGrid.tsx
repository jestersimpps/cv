"use client";

import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface BentoImage {
  src: string;
  alt: string;
  span?: "wide" | "tall" | "large" | "normal";
}

interface BentoGridProps {
  images: BentoImage[];
}

export function BentoGrid({ images }: BentoGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
    if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getSpanClass = (span?: string) => {
    switch (span) {
      case "wide":
        return "col-span-2";
      case "tall":
        return "row-span-2";
      case "large":
        return "col-span-2 row-span-2";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-8">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl border border-white/10 cursor-pointer group ${getSpanClass(image.span)}`}
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-square relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2 bg-black/30 rounded-full backdrop-blur-sm"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 p-2 bg-black/30 rounded-full backdrop-blur-sm"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Image */}
          <div className="relative max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              width={1920}
              height={1080}
              className="object-contain max-h-[85vh] w-auto rounded-lg"
              unoptimized
            />
            {images[currentIndex].alt && (
              <p className="text-center text-white/70 mt-4 text-sm">
                {images[currentIndex].alt}
              </p>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
