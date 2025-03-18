import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Noto_Sans } from "next/font/google";
import { GiPumpkin } from "react-icons/gi"; // Replace FaPumpkin with GiPumpkin
import {
  FaSeedling,
  FaAppleAlt,
  FaLemon,
  FaCarrot,
  FaPepperHot,
} from "react-icons/fa";
import {
  GiCherry,
  GiStrawberry,
  GiCoconuts,
  GiPineapple,
  GiWatermelon,
  GiAvocado,
  GiBanana,
  GiPeach,
  GiPear,
  GiGrapes,
  GiCorn,
  GiBroccoli,
} from "react-icons/gi";
import PageHead from "@/components/pregnancy/PageHead";
import HeroSection from "@/components/pregnancy/HeroSection";
import ProgressTracker from "@/components/pregnancy/ProgressTracker";
import WeekInfoSection from "@/components/pregnancy/WeekInfoSection";
import NutritionTipsSection from "@/components/pregnancy/NutritionTipsSection";
import CommonQuestionsSection from "@/components/pregnancy/CommonQuestionsSection";
import WeekSidebar from "@/components/pregnancy/WeekSidebar";
import SupportSection from "@/components/pregnancy/SupportSection";
import LoadingSpinner from "@/components/pregnancy/LoadingSpinner";
import ErrorDisplay from "@/components/pregnancy/ErrorDisplay";

const lato = Noto_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function WeeksToMonthsPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [weekNumber, setWeekNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      // Extract the week number from the slug format: "XX-weeks-pregnant-in-months"
      const match = slug.match(/^(\d+)-weeks-pregnant-in-months$/);
      if (match) {
        const parsedWeek = parseInt(match[1], 10);
        if (isNaN(parsedWeek) || parsedWeek < 1 || parsedWeek > 42) {
          setError("Invalid week number. Pregnancy weeks range from 1 to 42.");
        } else {
          setWeekNumber(parsedWeek);
        }
      } else {
        setError("Invalid URL format. Please check the URL and try again.");
      }
      setLoading(false);
    }
  }, [slug]);

  // Calculate months from weeks
  const calculateMonths = (weeks) => {
    const totalDays = weeks * 7;
    const months = Math.floor(totalDays / 30.44); // average days in a month
    const remainingDays = totalDays % 30.44;
    const remainingWeeks = Math.floor(remainingDays / 7);
    const days = Math.round(remainingDays % 7);

    let result = `${months} months`;
    if (remainingWeeks > 0) {
      result += ` ${remainingWeeks} weeks`;
    }
    if (days > 0) {
      result += ` ${days} days`;
    }
    return result;
  };

  // Get trimester based on week
  const getTrimester = (week) => {
    if (week <= 13) return "first";
    if (week <= 27) return "second";
    return "third";
  };

  // Generate related weeks for navigation
  const getRelatedWeeks = (currentWeek) => {
    const weeks = [];
    for (
      let i = Math.max(1, currentWeek - 2);
      i <= Math.min(42, currentWeek + 2);
      i++
    ) {
      if (i !== currentWeek) {
        weeks.push(i);
      }
    }
    return weeks;
  };

  // Get fruit size comparison with icon
  const getFruitSize = (week) => {
    if (week <= 4)
      return {
        name: "poppy seed",
        icon: <FaSeedling className="text-green-500" size={40} />,
      };
    if (week <= 6)
      return {
        name: "lentil",
        icon: <FaSeedling className="text-green-700" size={40} />,
      };
    if (week <= 7)
      return {
        name: "blueberry",
        icon: <GiGrapes className="text-blue-700" size={40} />,
      };
    if (week <= 8)
      return {
        name: "raspberry",
        icon: <GiGrapes className="text-red-500" size={40} />,
      };
    if (week <= 9)
      return {
        name: "cherry",
        icon: <GiCherry className="text-red-600" size={40} />,
      };
    if (week <= 10)
      return {
        name: "strawberry",
        icon: <GiStrawberry className="text-red-500" size={40} />,
      };
    if (week <= 12)
      return {
        name: "lime",
        icon: <FaLemon className="text-green-500" size={40} />,
      };
    if (week <= 13)
      return {
        name: "lemon",
        icon: <FaLemon className="text-yellow-400" size={40} />,
      };
    if (week <= 14)
      return {
        name: "peach",
        icon: <GiPeach className="text-orange-300" size={40} />,
      };
    if (week <= 15)
      return {
        name: "apple",
        icon: <FaAppleAlt className="text-red-500" size={40} />,
      };
    if (week <= 16)
      return {
        name: "avocado",
        icon: <GiAvocado className="text-green-700" size={40} />,
      };
    if (week <= 17)
      return {
        name: "pear",
        icon: <GiPear className="text-green-500" size={40} />,
      };
    if (week <= 18)
      return {
        name: "bell pepper",
        icon: <FaPepperHot className="text-red-500" size={40} />,
      };
    if (week <= 20)
      return {
        name: "banana",
        icon: <GiBanana className="text-yellow-400" size={40} />,
      };
    if (week <= 21)
      return {
        name: "carrot",
        icon: <FaCarrot className="text-orange-500" size={40} />,
      };
    if (week <= 23)
      return {
        name: "grapefruit",
        icon: <GiGrapes className="text-pink-300" size={40} />,
      };
    if (week <= 24)
      return {
        name: "corn on the cob",
        icon: <GiCorn className="text-yellow-500" size={40} />,
      };
    if (week <= 27)
      return {
        name: "cauliflower",
        icon: <GiBroccoli className="text-green-100" size={40} />,
      };
    if (week <= 29)
      return {
        name: "butternut squash",
        icon: <GiPumpkin className="text-orange-400" size={40} />,
      };
    if (week <= 32)
      return {
        name: "coconut",
        icon: <GiCoconuts className="text-brown-500" size={40} />,
      };
    if (week <= 33)
      return {
        name: "pineapple",
        icon: <GiPineapple className="text-yellow-500" size={40} />,
      };
    if (week <= 36)
      return {
        name: "honeydew melon",
        icon: <GiWatermelon className="text-green-300" size={40} />,
      };
    if (week <= 40)
      return {
        name: "small pumpkin",
        icon: <GiPumpkin className="text-orange-500" size={40} />,
      };
    return {
      name: "watermelon",
      icon: <GiWatermelon className="text-green-600" size={40} />,
    };
  };

  if (loading) {
    return <LoadingSpinner font={lato.className} />;
  }

  if (error) {
    return <ErrorDisplay error={error} font={lato.className} />;
  }

  const months = calculateMonths(weekNumber);
  const trimester = getTrimester(weekNumber);
  const relatedWeeks = getRelatedWeeks(weekNumber);
  const fruitSize = getFruitSize(weekNumber);

  const pageTitle = `${weekNumber} Weeks Pregnant (${calculateMonths(weekNumber)}) | PregnantMeal`;
  const pageDescription = `At ${weekNumber} weeks pregnant (${calculateMonths(weekNumber)}), learn about your baby's development, what to expect, and get personalized meal plans for this stage of pregnancy.`;

  return (
    <div className={lato.className}>
      <PageHead
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        weekNumber={weekNumber}
        months={months}
        trimester={trimester}
      />

      <Header />

      <main className="bg-base-100">
        <HeroSection
          weekNumber={weekNumber}
          months={months}
          trimester={trimester}
          fruitSize={fruitSize}
        />

        <ProgressTracker weekNumber={weekNumber} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <WeekInfoSection weekNumber={weekNumber} />
              <NutritionTipsSection weekNumber={weekNumber} />
              <CommonQuestionsSection weekNumber={weekNumber} months={months} />
            </div>

            {/* Sidebar */}
            <WeekSidebar
              weekNumber={weekNumber}
              relatedWeeks={relatedWeeks}
              router={router}
            />
          </div>

          <SupportSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
