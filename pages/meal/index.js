import withAuth from "@/components/withAuth";
import Head from "next/head";
import { Lato } from "next/font/google";
import Header from "@/components/Header";
import MealList from "@/components/MealList";
import Footer from "@/components/Footer";

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
  href: "/meal/newMeal",
  label: "Add Meal",
};

function Meal(props) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <header className={lato.className}>
        <Header linksOutside={links} buttonCore={button} />
      </header>
      {/* go back gutton */}
      <main className={`flex flex-col min-h-screen mx-auto ${lato.className}`}>
        <MealList />
      </main>
      <footer className={lato.className}>
        <Footer />
      </footer>
    </>
  );
}

export default withAuth(Meal);
