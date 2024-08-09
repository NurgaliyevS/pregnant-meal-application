import Image from "next/image";
import Link from "next/link";
import { handleSignIn } from "./handleSignIn";
import { usePlausible } from "next-plausible";

function Main() {
  const plausible = usePlausible();
  return (
    <section className="container max-w-7xl mx-auto flex flex-col items-center justify-between px-8 py-8 lg:py-20 gap-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-16">
        <div className="flex flex-col gap-10 lg:gap-14 items-center lg:items-start text-center lg:text-left w-full lg:w-2/3">
          <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4 flex justify-center items-center">
            <span className="whitespace-wrap lg:whitespace-nowrap relative">
              Eat <strong className="relative text-primary">Right </strong> for{" "}
              <strong className="relative text-primary">Your</strong> Baby
            </span>
          </h1>
          <p className="text-xl opacity-80 leading-relaxed">
            Personal <strong className="relative text-primary">meal </strong>
            plan for <strong className="relative text-primary">
              pregnant
            </strong>{" "}
            women. <br />
            Get daily, <strong className="relative text-primary">weekly</strong>
            , and monthly{" "}
            <strong className="relative text-primary">meal</strong> plan.
          </p>
          <Link
            href="#"
            className="btn btn-primary btn-wide no-underline"
            onClick={(e) => {
              e.preventDefault();
              plausible("GET_STARTED_MAIN");
              handleSignIn(e);
            }}
          >
            Make My Meals
          </Link>
        </div>

        <div className="hidden lg:block relative max-md:-m-4 lg:w-1/2">
          <Image
            src={"/main.webp"}
            alt="Uptime 24/7 notify via SMS, EMAIL"
            width={1080}
            height={1080}
            className="w-full max-w-xl ml-auto"
            priority={true}
          />
        </div>
      </div>

      <div className="w-full text-center">
        <p className="text-lg text-neutral-500">Yummy Meals, Strong Baby</p>
      </div>
    </section>
  );
}

export default Main;
