"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollArrow() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Vérifier si la flèche a déjà été utilisée dans cette session
    const hasUsedArrow = localStorage.getItem("arrowUsed");
    if (hasUsedArrow) {
      setIsVisible(false);
    }
  }, []);
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
    
    // Marquer la flèche comme utilisée dans localStorage
    localStorage.setItem("arrowUsed", "true");
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <button 
        onClick={scrollToContent}
        className="flex flex-col items-center text-white hover:text-white/80 transition-colors animate-bounce"
        aria-label="Défiler vers le bas"
      >
        <span className="text-lg font-medium mb-2">Découvrir</span>
        <ChevronDown className="w-10 h-10" />
      </button>
    </div>
  );
} 