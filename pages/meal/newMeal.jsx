import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lato } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MealForm from "@/components/meal/MealForm";
import LoadingState from "@/components/meal/LoadingState";
import MealPlanDisplay from "@/components/meal/MealPlanDisplay";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/#pricing",
    label: "Pricing",
  },
];

const button = {
  href: "/meal",
  label: "Back to Meal List",
};

const formData = {
  cuisineType: "European",
  pregnancyStage: "First Trimester",
  mealCountPerDay: 3,
  allergiesFoodAversionsDietaryRestrictions: "",
  cookingLevel: "Easy",
};

function NewMeal() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [mealPlan, setMealPlan] = useState(null);
  const [mealPlanStructured, setMealPlanStructured] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const steps = [
    { name: "You", active: currentStep >= 0 },
    { name: "Generating", active: currentStep >= 1 },
    { name: "Done", active: currentStep >= 2 },
  ];

  useEffect(() => {
    fetchUserData();
  }, [session]);

  const handleSubmit = async (formData) => {
    setCurrentStep(1);
    try {
      // Create meal preference
      const preferenceResponse = await axios.post("/api/core/meal-preferences", {
        user_email: session.user.email,
        ...formData,
      });

      if (!preferenceResponse?.data?.preference?._id) {
        throw new Error('Failed to create meal preference');
      }

      // Generate meal plan text
      const mealPlanResponse = await axios.post("/api/core/generate-meal-plan-text", {
        prompt: preferenceResponse.data.preference._id,
        formData: formData,
      });

      setMealPlan(mealPlanResponse.data.mealPlan);
      setMealPlanStructured(mealPlanResponse.data.mealPlanStructured);

      // Generate images for the meal plan
      const imagesResponse = await axios.post("/api/core/generate-meal-images", {
        id: preferenceResponse.data.preference._id,
        mealPlanStructured: mealPlanResponse.data.mealPlanStructured
      });

      setCurrentStep(2);
      setMealPlanStructured(imagesResponse.data.mealPlanStructured);
    } catch (error) {
      console.error("Error submitting form:", error);
      setCurrentStep(0);
      setMealPlan(null);
      setMealPlanStructured(null);
      toast.error("Error generating meal plan");
    }
  };

  const fetchUserData = async () => {
    if (!session) return;
    try {
      const userData = await axios.get("/api/users/user", {
        params: {
          email: session.user.email,
        },
      });
      const mealPreferencesResponse = await axios.get(
        "/api/core/meal-preferences",
        {
          params: {
            user_email: session.user.email,
          },
        }
      );
      const mealsUser = mealPreferencesResponse?.data;

      if (userData?.data?.success && mealsUser) {
        const variantName = userData.data?.data?.variant_name;
        if (variantName && variantName !== "free") {
          const maxRecipes = getMaxRecipesForPlan(variantName.toLowerCase());
          if (mealsUser.length <= maxRecipes) {
            setIsDisabled(false);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getMaxRecipesForPlan = (variantName) => {
    switch (variantName) {
      case "yummy starter":
        return 20;
      case "super food pack":
        return 50;
      case "magic mom menu":
        return 150;
      default:
        return 0;
    }
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <header className={lato.className}>
        <Header linksOutside={links} buttonCore={button} />
      </header>
      <main className={`flex flex-col min-h-screen mx-auto ${lato.className}`}>
        <section className="container max-w-7xl mx-auto flex flex-col items-center justify-between px-8 py-8 lg:py-20 gap-10">
          <div className="card bg-base-500 w-full lg:w-2/3 shadow-2xl">
            <ul className="steps mt-5">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`step ${step.active ? "step-primary" : ""}`}
                >
                  {step.name}
                </li>
              ))}
            </ul>
            <div
              className={`${
                currentStep === 1 && "flex items-center justify-center"
              } px-8 py-4`}
            >
              {currentStep === 0 && (
                <MealForm
                  initialFormData={formData}
                  isDisabled={isDisabled}
                  onSubmit={handleSubmit}
                />
              )}
              {currentStep === 1 && <LoadingState />}
              {currentStep === 2 && (
                <MealPlanDisplay 
                  mealPlan={mealPlan} 
                  mealPlanStructured={mealPlanStructured} 
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className={lato.className}>
        <Footer />
      </footer>
    </>
  );
}

export default NewMeal;
