import Link from "next/link";
import { handleSignIn } from "./handleSignIn";
import { useSession } from "next-auth/react";
import { usePlausible } from "next-plausible";
import { FiArrowRight } from "react-icons/fi";

const CTANAME = "Make My Meals";

function CTAButton(props) {
  const { plausibleNameBeforeLogin, plausibleNameAfterLogin, className = "", buttonText } = props;

  const { data: session } = useSession();
  const plausible = usePlausible();

  return (
    <>
      {!session?.user ? (
        <Link
          href="#"
          className={`btn btn-primary no-underline text-base sm:text-lg px-5 py-3 h-auto min-h-12 ${className}`}
          onClick={(e) => {
            e.preventDefault();
            plausible(plausibleNameBeforeLogin);
            handleSignIn(e);
          }}
        >
          {buttonText || CTANAME}
          <FiArrowRight className="ml-2 h-5 w-5" />
        </Link>
      ) : (
        <Link
          href="/meal"
          className={`btn btn-primary no-underline text-base sm:text-lg px-5 py-3 h-auto min-h-12 ${className}`}
          title="Meal page"
          rel="nofollow"
          onClick={() => {
            plausible(plausibleNameAfterLogin);
          }}
        >
          {buttonText || CTANAME}
          <FiArrowRight className="ml-2 h-5 w-5" />
        </Link>
      )}
    </>
  );
}

export default CTAButton;
