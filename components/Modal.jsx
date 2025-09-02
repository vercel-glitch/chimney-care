"use client";

import { X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Use a portal to render the modal at the root level of the DOM
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-8 right-8 text-white hover:text-blue-300 z-[10000] flex items-center gap-1 text-lg transition-all duration-300"
      >
        <X className="w-4 h-4 mt-[2px]" />
        Close
      </button>
      
      {/* Modal content */}
      <div className="relative z-[10000]">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
