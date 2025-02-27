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
  const [isFreePlan, setIsFreePlan] = useState(true);
  const [hasReachedLimit, setHasReachedLimit] = useState(true);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const steps = [
    { name: "You", active: currentStep >= 0 },
    { name: "Generating", active: currentStep >= 1 },
    { name: "Done", active: currentStep >= 2 },
  ];

  useEffect(() => {
    fetchUserData();
  }, [session]);

  const handleSubmit = async (formData) => {
    if (isButtonClicked) return;
    setIsButtonClicked(true);
    
    if (isFreePlan || hasReachedLimit) {
      setShowLimitModal(true);
      setIsButtonClicked(false);
      return;
    }
    
    setCurrentStep(1);
    try {
      const preferenceId = await createMealPreference(formData);
      const mealPlanData = await generateMealPlan(preferenceId, formData);
      
      setMealPlan(mealPlanData.mealPlan);
      setMealPlanStructured(mealPlanData.mealPlanStructured);
      setCurrentStep(2);

      generateMealImages(preferenceId, mealPlanData.mealPlanStructured);
    } catch (error) {
      console.error("Error submitting form:", error);
      setCurrentStep(0);
      setMealPlan(null);
      setMealPlanStructured(null);
      toast.error("Error generating meal plan");
    } finally {
      setIsButtonClicked(false);
    }
  };

  const createMealPreference = async (formData) => {
    const preferenceResponse = await axios.post("/api/core/meal-preferences", {
      user_email: session.user.email,
      ...formData,
    });

    if (!preferenceResponse?.data?.preference?._id) {
      throw new Error('Failed to create meal preference');
    }
    
    return preferenceResponse.data.preference._id;
  };

  const generateMealPlan = async (preferenceId, formData) => {
    const mealPlanResponse = await axios.post("/api/core/generate-meal-plan-text", {
      prompt: preferenceId,
      formData: formData,
    });
    
    return {
      mealPlan: mealPlanResponse.data.mealPlan,
      mealPlanStructured: mealPlanResponse.data.mealPlanStructured
    };
  };

  const generateMealImages = async (preferenceId, mealPlanStructured) => {
    try {
      const imagesResponse = await axios.post("/api/core/generate-meal-images", {
        id: preferenceId,
        mealPlanStructured: mealPlanStructured
      });
      setMealPlanStructured(imagesResponse.data.mealPlanStructured);
    } catch (imageError) {
      console.error("Error generating images:", imageError);
      toast.warning("Some meal images could not be generated");
    }
  };

  const fetchUserData = async () => {
    if (!session) return;
    setIsFreePlan(true);
    setHasReachedLimit(true);
    
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

      if (userData?.data?.success) {
        const variantName = userData.data?.data?.variant_name;
        
        if (!variantName || variantName === "free") {
          setIsFreePlan(true);
          setHasReachedLimit(true);
        } else {
          setIsFreePlan(false);
          
          const maxMeals = getMaxRecipesForPlan(variantName.toLowerCase());
          
          const totalMealCount = mealsUser ? mealsUser.reduce((total, preference) => {
            return total + (preference.mealCountPerDay || 0);
          }, 0) : 0;
          
          if (totalMealCount >= maxMeals) {
            setHasReachedLimit(true);
          } else {
            setHasReachedLimit(false);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsFreePlan(true);
      setHasReachedLimit(true);
    } finally {
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

  const navigateToPricing = () => {
    window.location.href = "/#pricing";
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

      {showLimitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="font-bold text-xl mb-4 text-primary">
              {isFreePlan ? "Upgrade Required" : "Meal Plan Limit Reached"}
            </h3>
            <p className="mb-6">
              {isFreePlan 
                ? "You're currently on the free plan. Upgrade to create delicious meal plans tailored for your pregnancy journey."
                : "You've reached your meal plan limit. Upgrade to a higher plan to create more meal plans."}
            </p>
            <div className="flex justify-between">
              <button 
                className="btn btn-outline"
                onClick={() => setShowLimitModal(false)}
              >
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={navigateToPricing}
              >
                View Pricing Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewMeal;
