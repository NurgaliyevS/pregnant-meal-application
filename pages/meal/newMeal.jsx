import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lato } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

function NewMeal() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    cuisineType: "European",
    pregnancyStage: "First Trimester",
    mealCountPerDay: 3,
    allergiesFoodAversionsDietaryRestrictions: "",
    cookingLevel: "Easy",
  });
  const [mealPlan, setMealPlan] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [mealGenerationCount, setMealGenerationCount] = useState(0);

  const steps = [
    { name: "You", active: currentStep >= 0 },
    { name: "Generating", active: currentStep >= 1 },
    { name: "Done", active: currentStep >= 2 },
  ];

  useEffect(() => {
    fetchUserData();
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setCurrentStep(1);

    console.log("Submitting form:", formData);

    try {
      // Save user preferences
      const preferenceResponse = await axios.post(
        "/api/core/meal-preferences",
        {
          user_email: session.user.email,
          ...formData,
        }
      );

      console.log("User preference saved:", preferenceResponse.data);

      // Generate meal plan
      const mealPlanResponse = await axios.post(
        "/api/core/generate-meal-plan",
        {
          id: preferenceResponse?.data?.preference._id,
        }
      );

      console.log("Meal plan generated:", mealPlanResponse.data);

      setMealPlan(mealPlanResponse.data?.mealPlan);
      setCurrentStep(2);
    } catch (error) {
      console.error("Error submitting form:", error);
      setCurrentStep(0);
      setMealPlan(null);
      toast.error("Error generating meal plan");
      // Handle error (e.g., show error message to user)
    } finally {
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

      console.log(mealsUser, 'mealsUser')

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
            <div className={`card-body min-h-screen ${currentStep === 1 && "flex items-center justify-center"}`}>
              {currentStep === 0 && (
                <>
                  <h2 className="card-title font-extrabold text-4xl lg:text-6xl tracking-tight mb-4">
                    <span className="relative">
                      To make personal{" "}
                      <strong className="text-primary">meals</strong>
                    </span>
                  </h2>
                  <p className="mb-8">
                    Fill out the form below to create a new meal.
                  </p>
                  <form onSubmit={submitForm}>
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Cuisine type</span>
                      </div>
                      <input
                        type="text"
                        name="cuisineType"
                        placeholder="European"
                        className="input input-bordered w-full max-w-xs"
                        value={formData.cuisineType}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Pregnancy stage</span>
                      </div>
                      <select
                        name="pregnancyStage"
                        className="select select-bordered"
                        value={formData.pregnancyStage}
                        onChange={handleInputChange}
                      >
                        <option>First Trimester</option>
                        <option>Second Trimester</option>
                        <option>Third Trimester</option>
                        <option>Not Pregnant</option>
                      </select>
                    </label>
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Meal per day</span>
                      </div>
                      <input
                        type="range"
                        name="mealCountPerDay"
                        className="w-full max-w-xs"
                        value={formData.mealCountPerDay}
                        onChange={handleInputChange}
                        min={1}
                        max={6}
                        step={1}
                      />
                      <div className="flex w-full justify-between px-2 text-xs">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                      </div>
                    </label>
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text">
                          Any dietary restrictions, allergies, or food aversions
                        </span>
                      </div>
                      <textarea
                        name="allergiesFoodAversionsDietaryRestrictions"
                        className="textarea textarea-bordered h-24"
                        placeholder="None"
                        value={
                          formData.allergiesFoodAversionsDietaryRestrictions
                        }
                        onChange={handleInputChange}
                      ></textarea>
                    </label>
                    <label className="form-control w-full max-w-xs">
                      <div className="label">
                        <span className="label-text">Cooking level</span>
                      </div>
                      <select
                        name="cookingLevel"
                        className="select select-bordered"
                        value={formData.cookingLevel}
                        onChange={handleInputChange}
                      >
                        <option>Easy</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </label>
                    <div className="card-actions justify-end mt-6 lg:mt-0">
                      <div className="tooltip" data-tip="Paid feature">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          disabled={isDisabled}
                        >
                          Get Meal
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}
              {currentStep === 1 && (
                <div className="text-center">
                  <div className="spinner"></div>
                  <h2 className="text-2xl font-bold mb-4">
                    Loading meal plan...
                  </h2>
                </div>
              )}
              {currentStep === 2 && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">Your meal plan</h2>
                  <pre className="text-left whitespace-pre-wrap mt-5">
                    {mealPlan}
                  </pre>
                </div>
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
