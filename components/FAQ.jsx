"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { handleSignIn } from "./handleSignIn";
import { usePlausible } from "next-plausible";
import CTAButton from "@/components/CTAButton";

const faqList = [
  {
    question: "What foods should I avoid during pregnancy?",
    answer: (
      <p>Don't eat raw fish, unpasteurized cheese, or undercooked meat.</p>
    ),
  },
  {
    question: "What's the best drink for energy during pregnancy?",
    answer: (
      <p>
        Water is best. Some caffeine-free teas are okay. Ask your doctor about
        energy drinks.
      </p>
    ),
  },
  {
    question: "What is gestational diabetes?",
    answer: <p>It's when your blood sugar gets too high during pregnancy.</p>,
  },
  {
    question: "How can I count calories during pregnancy?",
    answer: <p>Use a food tracking app or write down what you eat.</p>,
  },
  {
    question: "What are food aversions in pregnancy?",
    answer: (
      <p>
        It's normal to dislike foods you usually enjoy. Try eating small,
        frequent meals.
      </p>
    ),
  },
  {
    question: "How many extra calories do I need when pregnant?",
    answer: (
      <p>
        It depends on your size and activity, but usually 300-500 extra calories
        per day.
      </p>
    ),
  },
  {
    question: "What should a 7-day meal plan for a pregnant woman include?",
    answer: (
      <p>
        Include fruits, veggies, whole grains, lean proteins, and healthy fats
        each day.
      </p>
    ),
  },
  {
    question: "What are good dinner ideas for the first trimester?",
    answer: (
      <p>
        Light, easy-to-digest foods like crackers, fruits, and soups often work
        well.
      </p>
    ),
  },
  {
    question: "What's a healthy meal plan during pregnancy?",
    answer: (
      <p>
        Focus on balanced meals with variety. Include all food groups and take
        prenatal vitamins.
      </p>
    ),
  },
  {
    question: "What's an example of a one-day meal plan for a pregnant woman?",
    answer: (
      <p>
        Breakfast: oatmeal with fruit. Lunch: salad with chicken. Dinner: fish
        with veggies. Snacks: yogurt and nuts
      </p>
    ),
  },
];

const FaqItem = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

function FAQ() {
  return (
    <section className="bg-white px-8 py-16 lg:py-24" id="faq">
      <div className="container max-w-7xl mx-auto">
        <h2 className="font-bold text-3xl lg:text-5xl text-center mb-16 text-primary">
          Common Questions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-xl mb-2 text-primary-focus">What foods should I avoid during pregnancy?</h3>
            <p>Raw fish, unpasteurized cheese, and undercooked meat should be avoided during pregnancy.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-xl mb-2 text-primary-focus">How many extra calories do I need?</h3>
            <p>Most women need about 300-500 extra calories per day during pregnancy.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-xl mb-2 text-primary-focus">What's good for morning sickness?</h3>
            <p>Small, frequent meals and ginger-based foods can help ease morning sickness.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-bold text-xl mb-2 text-primary-focus">Can I customize my meal plan?</h3>
            <p>Yes! You can adjust your plan based on food preferences and dietary restrictions.</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <CTAButton plausibleNameBeforeLogin="GET_STARTED_FAQ" />
        </div>
      </div>
    </section>
  );
}

export default FAQ;
