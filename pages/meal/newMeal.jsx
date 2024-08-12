import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lato } from "next/font/google";
import { useSession } from "next-auth/react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
});

const links = [
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

  const steps = [
    {
      name: "You",
      active: true,
    },
    {
      name: "Generating",
      active: false,
    },
    {
      name: "Done",
      active: false,
    },
  ];

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  }

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
          <div className="card bg-base-500 w-full lg:w-2/3 shadow-xl">
            <ul className="steps">
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`step ${step.active ? "step-primary" : ""}`}
                >
                  {step.name}
                </li>
              ))}
            </ul>
            <div className="card-body">
              <h2 className="card-title font-extrabold text-4xl lg:text-6xl tracking-tight mb-4">
                <span className="relative">
                  To make personal{" "}
                  <strong className="text-primary">meals</strong>
                </span>
              </h2>
              <p className="mb-8">
                Fill out the form below to create a new meal.
              </p>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Cuisine type</span>
                </div>
                <input
                  type="text"
                  placeholder="European"
                  className="input input-bordered w-full max-w-xs"
                  defaultValue="European"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Pregancy stage</span>
                </div>
                <select className="select select-bordered">
                  <option selected>First Trimester</option>
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
                  placeholder="3"
                  className="w-full max-w-xs"
                  defaultValue="3"
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
                  className="textarea textarea-bordered h-24"
                  placeholder="None"
                ></textarea>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Cooking level</span>
                </div>
                <select className="select select-bordered" defaultValue="Easy">
                  <option selected>Easy</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
              <div className="card-actions justify-end mt-6 lg:mt-0">
                <button className="btn btn-primary" type="submit">Generate Meal</button>
              </div>
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
