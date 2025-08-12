"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  image: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function ImageModal({ image, isOpen, onClose, title }: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4" onClick={onClose}>
      <div className="relative max-w-7xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            width={1920}
            height={1080}
            className="object-contain max-h-[85vh] w-auto rounded-lg"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}