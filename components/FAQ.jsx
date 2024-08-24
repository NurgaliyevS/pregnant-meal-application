"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { handleSignIn } from "./handleSignIn";
import { usePlausible } from "next-plausible";
import CTAButton from "./CTAButton";

const faqList = [
  {
    question: "What foods should I avoid during pregnancy?",
    answer: "Don't eat raw fish, unpasteurized cheese, or undercooked meat.",
  },
  {
    question: "What's the best drink for energy during pregnancy?",
    answer: "Water is best. Some caffeine-free teas are okay. Ask your doctor about energy drinks.",
  },
  {
    question: "What is gestational diabetes?",
    answer: "It's when your blood sugar gets too high during pregnancy.",
  },
  {
    question: "How can I count calories during pregnancy?",
    answer: "Use a food tracking app or write down what you eat.",
  },
  {
    question: "What are food aversions in pregnancy?",
    answer: "It's normal to dislike foods you usually enjoy. Try eating small, frequent meals.",
  },
  {
    question: "How many extra calories do I need when pregnant?",
    answer: "It depends on your size and activity, but usually 300-500 extra calories per day.",
  },
  {
    question: "What should a 7-day meal plan for a pregnant woman include?",
    answer: "Include fruits, veggies, whole grains, lean proteins, and healthy fats each day.",
  },
  {
    question: "What are good dinner ideas for the first trimester?",
    answer: "Light, easy-to-digest foods like crackers, fruits, and soups often work well.",
  },
  {
    question: "What's a healthy meal plan during pregnancy?",
    answer: "Focus on balanced meals with variety. Include all food groups and take prenatal vitamins.",
  },
  {
    question: "What's an example of a one-day meal plan for a pregnant woman?",
    answer: "Breakfast: oatmeal with fruit. Lunch: salad with chicken. Dinner: fish with veggies. Snacks: yogurt and nuts",
  },
];

const FaqItem = ({ item }) => {
  const accordion = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span className={`flex-1 ${isOpen ? "text-primary" : ""}`}>
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function FAQ() {
  const plausible = usePlausible();
  return (
    <ErrorBoundary>
      <section
        className="bg-neutral text-gray-300 py-44 overflow-hidden"
        id="faq"
      >
        <div className="px-8 container max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex flex-col text-left basis-1/2">
            <p className="sm:text-4xl text-3xl font-extrabold">
              Frequently Asked Questions
            </p>
          </div>

          <ul className="basis-1/2">
            {faqList.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center mt-20">
          <CTAButton plausibleNameBeforeLogin="GET_STARTED_FAQ" plausibleNameAfterLogin="GET_STARTED_FAQ_AFTER_LOGIN" />
        </div>
      </section>
    </ErrorBoundary>
  );
}

export default FAQ;