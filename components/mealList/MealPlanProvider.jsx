import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const MealPlanContext = createContext();

// Static cache outside of component to persist between re-renders
const IMAGE_CACHE = new Map();

export function useMealPlan() {
  return useContext(MealPlanContext);
}

export function MealPlanProvider({ children }) {
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const loadImagesForPlan = async (planId, mealImages) => {
    // Return immediately if images are cached
    if (IMAGE_CACHE.has(planId)) {
      return IMAGE_CACHE.get(planId);
    }

    setIsPdfLoading(true);

    try {
      const loadedImages = await Promise.all(
        mealImages.map(async (img) => {
          try {
            await new Promise((resolve, reject) => {
              const image = new Image();
              image.onload = resolve;
              image.onerror = reject;
              image.src = img.imageUrl;
            });
            return {
              imageUrl: img.imageUrl,
              mealTitle: img.mealTitle
            };
          } catch (err) {
            console.warn(`Failed to load image: ${img.imageUrl}`);
            return null;
          }
        })
      );

      const validImages = loadedImages.filter(Boolean);
      
      if (validImages.length === mealImages.length) {
        IMAGE_CACHE.set(planId, validImages);
        return validImages;
      }
    } catch (error) {
      console.error("Error loading images:", error);
      toast.error("Failed to load images");
    } finally {
      setIsPdfLoading(false);
    }
  };

  const getLoadedImages = (planId) => {
    return IMAGE_CACHE.get(planId);
  };

  const isImagesLoaded = (planId) => {
    return IMAGE_CACHE.has(planId);
  };

  const value = {
    isPdfLoading,
    isImagesLoaded,
    loadImagesForPlan,
    getLoadedImages
  };

  return (
    <MealPlanContext.Provider value={value}>
      {children}
    </MealPlanContext.Provider>
  );
} 