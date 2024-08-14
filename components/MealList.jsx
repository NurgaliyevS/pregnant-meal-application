"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function MealList() {
  const { data: session } = useSession();
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    getAllMeals();
  }, []);

  const getAllMeals = async () => {
    if (session?.user?.email) {
      try {
        const response = await axios.get(
          "/api/core/meal-preferences?user_email=" + session.user.email
        );
        setMealPlan(response.data);
      } catch (error) {
        toast.error("Failed to get meals");
      }
    }
  };

  return (
    <section className="container max-w-7xl mx-auto flex flex-col items-center justify-between px-8 py-8 lg:py-20 gap-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-16">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 flex justify-center items-center">
          <span className="relative">
            Your <strong className="text-primary">meals</strong>
          </span>
        </h1>
      </div>
    </section>
  );
}

export default MealList;
