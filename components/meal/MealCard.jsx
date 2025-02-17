import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

function MealCard({ mealNumber, totalMeals, title, description, ingredients, type }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const cleanIngredients = ingredients?.replace('Key ingredients:', '').trim();

  useEffect(() => {
    const generateImage = async () => {
      try {
        const response = await axios.post('/api/core/generate-meal-image', {
          title,
          description,
        });
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error('Error generating image:', error);
      } finally {
        setIsLoadingImage(false);
      }
    };

    generateImage();
  }, [title, description]);

  return (
    <div className="card bg-base-200 hover:bg-base-300 transition-all duration-200 h-full">
      <figure className="relative w-full h-48">
        {isLoadingImage ? (
          <div className="w-full h-full bg-base-300 animate-pulse flex items-center justify-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-t-2xl"
            width={256}
            height={256}            
          />
        ) : (
          <div className="w-full h-full bg-base-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-base-content/30">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}
      </figure>

      <div className="card-body p-5 flex flex-col h-full">
        <div className="">
          <div className="flex items-start gap-3 mb-2">
            <div className="badge badge-primary badge-lg whitespace-nowrap">
              {type || `Meal ${mealNumber}/${totalMeals}`}
            </div>
          </div>
          <h4 className="font-semibold text-lg leading-tight line-clamp-2">
            {title}
          </h4>
        </div>

        <div className="text-sm flex flex-col gap-2">
          <span className="font-medium">Ingridients</span>
          {cleanIngredients?.split(",").map((ingredient, i) => (
            <span
              key={i}
              className="badge badge-outline badge-sm whitespace-normal text-left h-auto py-1"
            >
              {ingredient.trim()}
            </span>
          ))}
        </div>

        <p className="text-sm text-base-content/70 mb-3">{description}</p>
      </div>
    </div>
  );
}

export default MealCard;
