import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

function VideoModal({ isOpen, onClose, videoId }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
        <button 
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <FiX className="w-6 h-6" />
        </button>
        
        <div className="relative pt-[56.25%] w-full overflow-hidden rounded-lg">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default VideoModal; 