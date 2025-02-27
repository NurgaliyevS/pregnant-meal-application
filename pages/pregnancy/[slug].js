import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { customConfig } from "../../project.custom.config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Noto_Sans } from "next/font/google";
import { 
  FaSeedling, FaAppleAlt, FaLemon, FaCarrot, 
  FaPepperHot, FaEgg, FaPumpkin 
} from "react-icons/fa";
import { 
  GiCherry, GiStrawberry, GiCoconuts, GiPineapple, 
  GiWatermelon, GiAvocado, GiBanana, GiPeach, 
  GiPear, GiGrapes, GiCorn, GiCauliflower 
} from "react-icons/gi";

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
    // Pregnancy months are typically calculated as 4.3 weeks per month
    const months = (weeks / 4.3).toFixed(1);
    return months;
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
    for (let i = Math.max(1, currentWeek - 2); i <= Math.min(42, currentWeek + 2); i++) {
      if (i !== currentWeek) {
        weeks.push(i);
      }
    }
    return weeks;
  };

  // Get fruit size comparison with icon
  const getFruitSize = (week) => {
    if (week <= 4) return { name: "poppy seed", icon: <FaSeedling className="text-green-500" size={40} /> };
    if (week <= 6) return { name: "lentil", icon: <FaSeedling className="text-green-700" size={40} /> };
    if (week <= 7) return { name: "blueberry", icon: <GiGrapes className="text-blue-700" size={40} /> };
    if (week <= 8) return { name: "raspberry", icon: <GiGrapes className="text-red-500" size={40} /> };
    if (week <= 9) return { name: "cherry", icon: <GiCherry className="text-red-600" size={40} /> };
    if (week <= 10) return { name: "strawberry", icon: <GiStrawberry className="text-red-500" size={40} /> };
    if (week <= 12) return { name: "lime", icon: <FaLemon className="text-green-500" size={40} /> };
    if (week <= 13) return { name: "lemon", icon: <FaLemon className="text-yellow-400" size={40} /> };
    if (week <= 14) return { name: "peach", icon: <GiPeach className="text-orange-300" size={40} /> };
    if (week <= 15) return { name: "apple", icon: <FaAppleAlt className="text-red-500" size={40} /> };
    if (week <= 16) return { name: "avocado", icon: <GiAvocado className="text-green-700" size={40} /> };
    if (week <= 17) return { name: "pear", icon: <GiPear className="text-green-500" size={40} /> };
    if (week <= 18) return { name: "bell pepper", icon: <FaPepperHot className="text-red-500" size={40} /> };
    if (week <= 20) return { name: "banana", icon: <GiBanana className="text-yellow-400" size={40} /> };
    if (week <= 21) return { name: "carrot", icon: <FaCarrot className="text-orange-500" size={40} /> };
    if (week <= 23) return { name: "grapefruit", icon: <GiGrapes className="text-pink-300" size={40} /> };
    if (week <= 24) return { name: "corn on the cob", icon: <GiCorn className="text-yellow-500" size={40} /> };
    if (week <= 27) return { name: "cauliflower", icon: <GiCauliflower className="text-gray-100" size={40} /> };
    if (week <= 29) return { name: "butternut squash", icon: <FaPumpkin className="text-orange-400" size={40} /> };
    if (week <= 32) return { name: "coconut", icon: <GiCoconuts className="text-brown-500" size={40} /> };
    if (week <= 33) return { name: "pineapple", icon: <GiPineapple className="text-yellow-500" size={40} /> };
    if (week <= 36) return { name: "honeydew melon", icon: <GiWatermelon className="text-green-300" size={40} /> };
    if (week <= 40) return { name: "small pumpkin", icon: <FaPumpkin className="text-orange-500" size={40} /> };
    return { name: "watermelon", icon: <GiWatermelon className="text-green-600" size={40} /> };
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${lato.className}`}>
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${lato.className}`}>
        <Header />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="alert alert-error max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const months = calculateMonths(weekNumber);
  const trimester = getTrimester(weekNumber);
  const relatedWeeks = getRelatedWeeks(weekNumber);
  const fruitSize = getFruitSize(weekNumber);
  
  const pageTitle = `${weekNumber} Weeks Pregnant in Months - ${months} Months | PregnantMeal`;
  const pageDescription = `${weekNumber} weeks pregnant equals ${months} months. Learn about your baby's development, what to expect, and get meal plans for week ${weekNumber} of pregnancy.`;

  return (
    <div className={lato.className}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${weekNumber} weeks pregnant in months, ${weekNumber} weeks pregnant, ${months} months pregnant, pregnancy week ${weekNumber}, ${trimester} trimester, pregnancy calculator, pregnancy meal plan week ${weekNumber}`} />
        <link rel="canonical" href={`${customConfig.domainWithHttps}/pregnancy/${weekNumber}-weeks-pregnant-in-months`} />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${customConfig.domainWithHttps}/pregnancy/${weekNumber}-weeks-pregnant-in-months`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={customConfig.seo.og.image} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={customConfig.seo.og.twitterSite} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={customConfig.seo.og.twitterImage} />
      </Head>

      <Header />

      <main className="bg-base-100">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-base-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {weekNumber} Weeks Pregnant
                </h1>
                <div className="stats shadow mb-6">
                  <div className="stat">
                    <div className="stat-title">Months</div>
                    <div className="stat-value text-primary">{months}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Trimester</div>
                    <div className="stat-value text-secondary capitalize">{trimester}</div>
                  </div>
                </div>
                <p className="text-lg mb-6">
                  At {weekNumber} weeks pregnant, your baby is about the size of a {fruitSize.name}. 
                  You're making great progress in your pregnancy journey!
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="/meal-plans" className="btn btn-primary">Get Meal Plans</a>
                  <a href="#nutrition" className="btn btn-outline">Nutrition Tips</a>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 rounded-full bg-base-200 flex items-center justify-center shadow-lg">
                  <div className="absolute inset-0 rounded-full border-8 border-primary/20 animate-pulse"></div>
                  <div className="w-40 h-40 relative flex flex-col items-center justify-center">
                    <div className="mb-4 transform scale-150">
                      {fruitSize.icon}
                    </div>
                    <span className="text-xl font-semibold text-center">Size: {fruitSize.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Tracker */}
        <section className="py-8 container mx-auto px-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Your Pregnancy Progress</h2>
              <div className="w-full bg-base-200 rounded-full h-4 mb-6">
                <div 
                  className="bg-primary h-4 rounded-full" 
                  style={{ width: `${(weekNumber / 40) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Week 1</span>
                <span>Week 13</span>
                <span>Week 27</span>
                <span>Week 40</span>
              </div>
              <div className="flex justify-between text-xs text-base-content/70 mt-1">
                <span>First Trimester</span>
                <span className="ml-12">Second Trimester</span>
                <span>Third Trimester</span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <section className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Understanding Week {weekNumber}</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Baby Development</h3>
                    {weekNumber <= 13 && (
                      <p>
                        During the first trimester, your baby's major organs and body systems are forming. 
                        At {weekNumber} weeks, your baby's heart is beating, and limb buds are developing into arms and legs.
                        Facial features are beginning to take shape, and the neural tube is forming into the brain and spinal cord.
                      </p>
                    )}
                    {weekNumber > 13 && weekNumber <= 27 && (
                      <p>
                        At {weekNumber} weeks, your baby can hear sounds, has developed fingerprints, and is practicing breathing movements.
                        The eyes can open and close, and the baby is moving around quite a bit. All essential organs have formed and are continuing to mature.
                        You might start feeling movements, which is an exciting milestone in your pregnancy!
                      </p>
                    )}
                    {weekNumber > 27 && (
                      <p>
                        At {weekNumber} weeks, your baby is putting on weight and developing fat stores. The brain is developing rapidly,
                        and the lungs are maturing in preparation for breathing air. Your baby is practicing sucking and swallowing
                        and has periods of sleep and wakefulness. The baby is getting ready for life outside the womb!
                      </p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Your Body This Week</h3>
                    {weekNumber <= 13 && (
                      <p>
                        At {weekNumber} weeks, you might be experiencing morning sickness, fatigue, breast tenderness, and frequent urination.
                        Many women don't "look" pregnant yet, but your body is working hard to support your baby's development.
                        Take care of yourself by getting plenty of rest and staying hydrated.
                      </p>
                    )}
                    {weekNumber > 13 && weekNumber <= 27 && (
                      <p>
                        At {weekNumber} weeks, you're likely feeling more energetic than in the first trimester.
                        You may have started to feel your baby move (called "quickening"), and your pregnancy is probably visible.
                        Some women experience round ligament pain as the uterus grows. Your skin may also be changing with the pregnancy glow!
                      </p>
                    )}
                    {weekNumber > 27 && (
                      <p>
                        At {weekNumber} weeks, you might be feeling more uncomfortable with backaches, swollen ankles, and difficulty sleeping.
                        Your baby's movements are stronger now, and you might experience Braxton Hicks contractions as your body prepares for labor.
                        Your center of gravity has shifted, so be careful with your movements to prevent falls.
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section id="nutrition" className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Nutrition Tips for Week {weekNumber}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {weekNumber <= 13 && (
                      <>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Focus on Folate</h3>
                            <p>Leafy greens, citrus fruits, and legumes are excellent sources of folate, which is crucial for neural tube development.</p>
                          </div>
                        </div>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Combat Nausea</h3>
                            <p>Try eating small, frequent meals throughout the day. Ginger tea and crackers can help manage morning sickness.</p>
                          </div>
                        </div>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Stay Hydrated</h3>
                            <p>Aim for 8-10 glasses of water daily. Herbal teas (approved by your doctor) can be a good alternative.</p>
                          </div>
                        </div>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Iron-Rich Foods</h3>
                            <p>Include lean meats, spinach, and beans in your diet to support increased blood volume and prevent anemia.</p>
                          </div>
                        </div>
                      </>
                    )}
                    {weekNumber > 13 && weekNumber <= 27 && (
                      <>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Calcium Sources</h3>
                            <p>Dairy products, fortified plant milks, and leafy greens provide calcium for your baby's developing bones.</p>
                          </div>
                        </div>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Omega-3 Fatty Acids</h3>
                            <p>Fatty fish (like salmon), walnuts, and flaxseeds support your baby's brain and eye development.</p>
                          </div>
                        </div>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Vitamin D</h3>
                            <p>Get vitamin D from fortified milk, eggs, and safe sun exposure to help with calcium absorption.</p>
                          </div>
                        </div>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Protein Power</h3>
                            <p>Include lean meats, poultry, fish, eggs, dairy, legumes, and nuts to support your baby's growing tissues.</p>
                          </div>
                        </div>
                      </>
                    )}
                    {weekNumber > 27 && (
                      <>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Extra Protein</h3>
                            <p>Increase protein intake to support your baby's final growth spurt with lean meats, eggs, and plant proteins.</p>
                          </div>
                        </div>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Fiber-Rich Foods</h3>
                            <p>Whole grains, fruits, and vegetables can help with digestion and prevent constipation in the third trimester.</p>
                          </div>
                        </div>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Vitamin K</h3>
                            <p>Leafy greens, broccoli, and Brussels sprouts provide vitamin K for healthy blood clotting.</p>
                          </div>
                        </div>
                        <div className="card bg-base-200">
                          <div className="card-body">
                            <h3 className="card-title text-lg">Smaller Meals</h3>
                            <p>As your stomach gets compressed, eat smaller, more frequent meals to prevent heartburn and indigestion.</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <a href="/meal-plans" className="btn btn-primary btn-block">Get Your Personalized Meal Plan</a>
                  </div>
                </div>
              </section>

              <section className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4">Common Questions About Week {weekNumber}</h2>
                  
                  <div className="space-y-4">
                    <div className="collapse collapse-plus bg-base-200">
                      <input type="checkbox" /> 
                      <div className="collapse-title font-medium">
                        Is {weekNumber} weeks exactly {months} months pregnant?
                      </div>
                      <div className="collapse-content"> 
                        <p>Not exactly. Pregnancy months aren't the same as calendar months. A pregnancy month is calculated as 4.3 weeks, so {weekNumber} weeks equals approximately {months} months. Healthcare providers prefer to track pregnancy by weeks because it's more precise for monitoring development.</p>
                      </div>
                    </div>
                    
                    <div className="collapse collapse-plus bg-base-200">
                      <input type="checkbox" /> 
                      <div className="collapse-title font-medium">
                        What should I be feeling at {weekNumber} weeks pregnant?
                      </div>
                      <div className="collapse-content"> 
                        {weekNumber <= 13 && (
                          <p>At {weekNumber} weeks, you might be experiencing morning sickness, fatigue, breast tenderness, and frequent urination. Many women don't "look" pregnant yet, but your body is working hard to support your baby's development.</p>
                        )}
                        {weekNumber > 13 && weekNumber <= 27 && (
                          <p>At {weekNumber} weeks, you're likely feeling more energetic than in the first trimester. You may have started to feel your baby move (called "quickening"), and your pregnancy is probably visible. Some women experience round ligament pain as the uterus grows.</p>
                        )}
                        {weekNumber > 27 && (
                          <p>At {weekNumber} weeks, you might be feeling more uncomfortable with backaches, swollen ankles, and difficulty sleeping. Your baby's movements are stronger now, and you might experience Braxton Hicks contractions as your body prepares for labor.</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="collapse collapse-plus bg-base-200">
                      <input type="checkbox" /> 
                      <div className="collapse-title font-medium">
                        What is my baby doing at {weekNumber} weeks?
                      </div>
                      <div className="collapse-content"> 
                        {weekNumber <= 13 && (
                          <p>At {weekNumber} weeks, your baby's major organs and body systems are forming. The heart is beating, and limb buds are developing into arms and legs. Facial features are beginning to take shape, and the neural tube is forming into the brain and spinal cord.</p>
                        )}
                        {weekNumber > 13 && weekNumber <= 27 && (
                          <p>At {weekNumber} weeks, your baby can hear sounds, has developed fingerprints, and is practicing breathing movements. The eyes can open and close, and the baby is moving around quite a bit. All essential organs have formed and are continuing to mature.</p>
                        )}
                        {weekNumber > 27 && (
                          <p>At {weekNumber} weeks, your baby is putting on weight and developing fat stores. The brain is developing rapidly, and the lungs are maturing in preparation for breathing air. Your baby is practicing sucking and swallowing and has periods of sleep and wakefulness.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-8">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl">Week by Week</h3>
                    <p className="mb-4">Explore other weeks of pregnancy:</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {relatedWeeks.map(w => (
                        <a key={w} href={`/pregnancy/${w}-weeks-pregnant-in-months`} className="btn btn-sm btn-outline">
                          Week {w}
                        </a>
                      ))}
                    </div>
                    
                    <div className="divider">OR</div>
                    
                    <div className="form-control">
                      <div className="input-group">
                        <select className="select select-bordered w-full" onChange={(e) => {
                          if (e.target.value) {
                            router.push(`/pregnancy/${e.target.value}-weeks-pregnant-in-months`);
                          }
                        }}>
                          <option value="">Select a week...</option>
                          {Array.from({length: 42}, (_, i) => i + 1).map(w => (
                            <option key={w} value={w}>Week {w}</option>
                          ))}
                        </select>
                        <button className="btn btn-primary">Go</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card bg-primary text-primary-content shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl">Personalized Meal Plans</h3>
                    <p className="mb-4">Get nutrition plans tailored to week {weekNumber} of your pregnancy.</p>
                    <a href="/meal-plans" className="btn btn-secondary">Get Started</a>
                  </div>
                </div>
                
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl">Pregnancy Resources</h3>
                    <ul className="menu bg-base-200 rounded-box">
                      <li><a href="/blog/first-trimester-nutrition">First Trimester Nutrition</a></li>
                      <li><a href="/blog/managing-pregnancy-symptoms">Managing Pregnancy Symptoms</a></li>
                      <li><a href="/blog/preparing-for-labor">Preparing for Labor</a></li>
                      <li><a href="/blog">More Articles</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <section className="card bg-gradient-to-r from-primary/20 to-secondary/20 shadow-xl mt-8">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Get Support for Your Pregnancy Journey</h2>
              <p className="mb-6">
                Every pregnancy is unique, and proper nutrition is essential for both you and your baby. 
                At PregnantMeal, we offer personalized meal plans designed specifically for each stage of pregnancy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/meal-plans" className="btn btn-primary">Explore Meal Plans</a>
                <a href="/blog" className="btn btn-outline">Read Pregnancy Articles</a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}