import withAuth from "@/components/withAuth";
import Head from "next/head";
import { Lato } from "next/font/google";
import Header from "@/components/Header";
import MealList from "@/components/MealList";

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

function Meal(props) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <header className={lato.className}>
        <Header linksOutside={links} />
      </header>
      <main className={`flex flex-col min-h-screen mx-auto ${lato.className}`}>
        <MealList />
      </main>
    </>
  );
}

export default withAuth(Meal);
