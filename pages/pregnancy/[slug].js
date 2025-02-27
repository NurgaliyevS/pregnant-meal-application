import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { customConfig } from "../../project.custom.config";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const months = calculateMonths(weekNumber);
  const trimester = getTrimester(weekNumber);
  const relatedWeeks = getRelatedWeeks(weekNumber);
  
  const pageTitle = `${weekNumber} Weeks Pregnant in Months - ${months} Months | PregnantMeal`;
  const pageDescription = `${weekNumber} weeks pregnant equals ${months} months. Learn about your baby's development, what to expect, and get meal plans for week ${weekNumber} of pregnancy.`;

  return (
    <>
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

      <main className="container mx-auto px-4 py-8 min-h-screen">
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">{weekNumber} Weeks Pregnant in Months</h1>
          
          <div className="bg-base-200 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Quick Answer</h2>
            <p className="text-lg">
              <strong>{weekNumber} weeks pregnant equals approximately {months} months.</strong> 
              You are in your {trimester} trimester of pregnancy.
            </p>
          </div>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Understanding Pregnancy Weeks vs. Months</h2>
            <p>
              Pregnancy is most accurately tracked in weeks rather than months because your baby's development happens week by week. 
              Healthcare providers typically use weeks to monitor pregnancy progress, but many expectant parents also like to think in terms of months.
            </p>
            <p>
              A full-term pregnancy lasts about 40 weeks, which is approximately 9 months. However, pregnancy months aren't exactly the same as calendar months. 
              In pregnancy calculations, a month is considered to be about 4.3 weeks (30.4 days).
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">At {weekNumber} Weeks Pregnant ({months} Months)</h2>
            
            {weekNumber <= 13 && (
              <div>
                <h3 className="text-xl font-medium mb-2">First Trimester (Weeks 1-13)</h3>
                <p>
                  During the first trimester, your baby's major organs and body systems are forming. 
                  This is a critical time for development, and you might be experiencing morning sickness, fatigue, and breast tenderness.
                </p>
                <p>
                  At {weekNumber} weeks, your baby is about the size of a {
                    weekNumber <= 4 ? "poppy seed" : 
                    weekNumber <= 8 ? "raspberry" : 
                    weekNumber <= 12 ? "lime" : "lemon"
                  }.
                </p>
              </div>
            )}
            
            {weekNumber > 13 && weekNumber <= 27 && (
              <div>
                <h3 className="text-xl font-medium mb-2">Second Trimester (Weeks 14-27)</h3>
                <p>
                  The second trimester is often called the "golden period" of pregnancy. Morning sickness typically subsides, 
                  and you'll likely feel more energetic. Your baby is growing rapidly, and you'll start to feel movements.
                </p>
                <p>
                  At {weekNumber} weeks, your baby is about the size of a {
                    weekNumber <= 16 ? "avocado" : 
                    weekNumber <= 20 ? "banana" : 
                    weekNumber <= 24 ? "corn on the cob" : "cauliflower"
                  }.
                </p>
              </div>
            )}
            
            {weekNumber > 27 && (
              <div>
                <h3 className="text-xl font-medium mb-2">Third Trimester (Weeks 28-42)</h3>
                <p>
                  In the third trimester, your baby is putting on weight and developing rapidly. 
                  You might experience backaches, trouble sleeping, and Braxton Hicks contractions as your body prepares for labor.
                </p>
                <p>
                  At {weekNumber} weeks, your baby is about the size of a {
                    weekNumber <= 32 ? "coconut" : 
                    weekNumber <= 36 ? "honeydew melon" : 
                    weekNumber <= 40 ? "small pumpkin" : "watermelon"
                  }.
                </p>
              </div>
            )}
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nutrition Tips for Week {weekNumber}</h2>
            <p>
              Proper nutrition is crucial during pregnancy. At {weekNumber} weeks ({months} months), focus on:
            </p>
            <ul>
              {weekNumber <= 13 && (
                <>
                  <li>Folate-rich foods like leafy greens, citrus fruits, and legumes</li>
                  <li>Small, frequent meals to combat nausea</li>
                  <li>Staying hydrated with water and herbal teas</li>
                  <li>Iron-rich foods like lean meats and spinach</li>
                </>
              )}
              {weekNumber > 13 && weekNumber <= 27 && (
                <>
                  <li>Calcium-rich foods for your baby's developing bones</li>
                  <li>Omega-3 fatty acids for brain development</li>
                  <li>Vitamin D sources like fortified milk and sunlight</li>
                  <li>Protein for your baby's growing tissues</li>
                </>
              )}
              {weekNumber > 27 && (
                <>
                  <li>Extra protein and calcium for your baby's final growth spurt</li>
                  <li>Fiber to help with digestion and constipation</li>
                  <li>Foods rich in vitamin K for healthy blood clotting</li>
                  <li>Smaller, more frequent meals as your stomach gets compressed</li>
                </>
              )}
            </ul>
            <div className="mt-4">
              <a href="/meal-plans" className="btn btn-primary">Get Personalized Pregnancy Meal Plans</a>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Common Questions About Week {weekNumber}</h2>
            
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
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Related Pregnancy Weeks</h2>
            <div className="flex flex-wrap gap-2">
              {relatedWeeks.map(w => (
                <a key={w} href={`/pregnancy/${w}-weeks-pregnant-in-months`} className="btn btn-outline">
                  {w} Weeks in Months
                </a>
              ))}
            </div>
          </section>
          
          <section className="bg-base-200 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Get Support for Your Pregnancy Journey</h2>
            <p>
              Every pregnancy is unique, and proper nutrition is essential for both you and your baby. 
              At PregnantMeal, we offer personalized meal plans designed specifically for each stage of pregnancy.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <a href="/meal-plans" className="btn btn-primary">Explore Meal Plans</a>
              <a href="/blog" className="btn btn-outline">Read Pregnancy Articles</a>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}