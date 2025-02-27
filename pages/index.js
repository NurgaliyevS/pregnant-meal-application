import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { customConfig } from "@/project.custom.config";
import { Noto_Sans } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import Link from "next/link";
import { buyProduct } from "@/components/buyProduct";

// Let's install and use react-icons instead
import { FiInfo, FiUser, FiCalendar, FiClipboard, FiShoppingBag, FiCheck } from "react-icons/fi";

const lato = Noto_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content={customConfig.seo.description}
        />
        <title>{customConfig.documentTitle}</title>
        <link rel="canonical" href={customConfig.domainWithHttps} />
      </Head>
      <header className={lato.className}>
        <Header />
      </header>
      <main className={`flex flex-col min-h-screen mx-auto ${lato.className}`}>
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto flex flex-col items-center justify-between px-8 py-16 lg:py-24 gap-10">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">
            <div className="flex flex-col gap-8 items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
              <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight text-primary">
                Healthy Meals for You and Your Baby
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Simple meal plans designed for each stage of your pregnancy journey.
              </p>
              <div className="flex gap-4">
                <CTAButton plausibleNameBeforeLogin="GET_STARTED_HERO" />
                <Link href="/demo" className="btn btn-outline btn-primary">
                  <FiInfo className="h-5 w-5 mr-2" />
                  Demo
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <Image
                src="/main.webp"
                alt="Pregnant meal plan"
                width={600}
                height={600}
                className="w-full rounded-lg shadow-lg"
                priority={true}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container max-w-7xl mx-auto px-8">
            <h2 className="font-bold text-3xl lg:text-5xl text-center mb-16 text-primary">
              More Benefits for You
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-lg shadow-lg text-primary-focus">
                <div className="text-primary mb-4 flex justify-center">
                  <FiCalendar className="h-16 w-16" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-center">Personalized Meal Plans</h3>
                <p>Meals designed for your specific trimester and nutritional needs.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg text-primary-focus">
                <div className="text-primary mb-4 flex justify-center">
                  <FiClipboard className="h-16 w-16" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-center">Easy Recipes</h3>
                <p>Simple, delicious recipes that are quick to prepare and good for you.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg text-primary-focus">
                <div className="text-primary mb-4 flex justify-center">
                  <FiShoppingBag className="h-16 w-16" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-center">Trimester Focus</h3>
                <p>Specialized nutrition guidance for each stage of your pregnancy.</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-16">
              <CTAButton plausibleNameBeforeLogin="GET_STARTED_FEATURES" />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container max-w-7xl mx-auto px-8 py-16 lg:py-24">
          <h2 className="font-bold text-3xl lg:text-5xl text-center mb-16 text-primary">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                <FiUser className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-primary-focus">Sign Up</h3>
              <p>Create your account in seconds</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                <FiInfo className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-primary-focus">Tell Us About You</h3>
              <p>Share your pregnancy stage and preferences</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                <FiCalendar className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-primary-focus">Get Your Plan</h3>
              <p>Receive your personalized meal plan</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                <FiClipboard className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl mb-2 text-primary-focus">Enjoy Your Meals</h3>
              <p>Cook and enjoy nutritious, delicious food</p>
            </div>
          </div>
        </section>

        {/* Example Meals */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container max-w-7xl mx-auto px-8">
            <h2 className="font-bold text-3xl lg:text-5xl text-center mb-16 text-primary">
              Sample Meals
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 bg-gray-200 relative">
                  <Image 
                    src="/avocado-breakfast.webp" 
                    alt="Breakfast example" 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Breakfast"
                    }}
                  />
                </div>
                <div className="p-6 text-primary-focus">
                  <h3 className="font-bold text-xl mb-2">Breakfast</h3>
                  <p>Greek yogurt with berries and granola</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 bg-gray-200 relative">
                  <Image 
                    src="/Caesar-salad.webp" 
                    alt="Lunch example" 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Lunch"
                    }}
                  />
                </div>
                <div className="p-6 text-primary-focus">
                  <h3 className="font-bold text-xl mb-2">Lunch</h3>
                  <p>
                    Caesar Salad with grilled chicken
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 bg-gray-200 relative">
                  <Image 
                    src="/pasta-Primavera.webp" 
                    alt="Dinner example" 
                    fill 
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=Dinner"
                    }}
                  />
                </div>
                <div className="p-6 text-primary-focus">
                  <h3 className="font-bold text-xl mb-2">Dinner</h3>
                  <p>
                    Pasta Primavera with salmon and roasted vegetables
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-16">
              <CTAButton plausibleNameBeforeLogin="GET_STARTED_MEALS" />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container max-w-7xl mx-auto px-8 py-16 lg:py-24" id="pricing">
          <h2 className="font-bold text-3xl lg:text-5xl text-center mb-16 text-primary">
            Choose Your Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-primary border-opacity-20 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="font-bold text-2xl mb-2 text-primary-focus">Yummy Starter</h3>
                <div className="text-4xl font-bold text-primary">$4.99</div>
                <p className="mt-2 text-gray-500">One-time payment</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  20 recipes
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  Safe food list
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  First trimester focus
                </li>
                <li className="flex items-center opacity-50">
                  <FiCheck className="h-5 w-5 text-primary mr-2 opacity-0" />
                  No email support
                </li>
              </ul>
              
              <button 
                className="btn btn-primary w-full"
                onClick={(e) => {
                  e.preventDefault();
                  buyProduct();
                }}
              >
                Get my meals
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-primary relative flex flex-col h-full">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
              <div className="text-center mb-6">
                <h3 className="font-bold text-2xl mb-2 text-primary-focus">Super Food Pack</h3>
                <div className="text-4xl font-bold text-primary">$9.99</div>
                <p className="mt-2 text-gray-500">One-time payment</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  50 recipes
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  Safe food list
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  Second trimester focus
                </li>
                <li className="flex items-center opacity-50">
                  <FiCheck className="h-5 w-5 text-primary mr-2 opacity-0" />
                  No email support
                </li>
              </ul>
              
              <button 
                className="btn btn-primary w-full"
                onClick={(e) => {
                  e.preventDefault();
                  buyProduct("493049");
                }}
              >
                Get my meals
              </button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border border-primary border-opacity-20 flex flex-col h-full">
              <div className="text-center mb-6">
                <h3 className="font-bold text-2xl mb-2 text-primary-focus">Magic Mom Menu</h3>
                <div className="text-4xl font-bold text-primary">$19.99</div>
                <p className="mt-2 text-gray-500">One-time payment</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  150 recipes
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  Safe food list
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  All trimester focus
                </li>
                <li className="flex items-center">
                  <FiCheck className="h-5 w-5 text-primary mr-2" />
                  24/7 email support
                </li>
              </ul>
              
              <button 
                className="btn btn-primary w-full"
                onClick={(e) => {
                  e.preventDefault();
                  buyProduct("493050");
                }}
              >
                Get my meals
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Final CTA */}
        <section className="bg-primary text-white py-16">
          <div className="container max-w-7xl mx-auto px-8 text-center">
            <h2 className="font-bold text-3xl lg:text-5xl mb-6">
              Start Your Healthy Pregnancy Journey Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of moms who are enjoying stress-free meal planning with PregnantMeal.
            </p>
            <div className="flex gap-4 justify-center">
              <CTAButton plausibleNameBeforeLogin="GET_STARTED_FINAL" buttonText="Get Started Now" />
              <Link href="/demo" className="btn btn-outline bg-white text-primary hover:bg-white hover:text-primary-focus">
                <FiInfo className="h-5 w-5 mr-2" />
                View Demo
              </Link>
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
