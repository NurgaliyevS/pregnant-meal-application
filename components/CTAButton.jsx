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
        <button
          className={`inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-500 text-white font-medium text-base border border-blue-600 shadow-sm hover:bg-blue-600 transition-colors ${className}`}
          onClick={(e) => {
            e.preventDefault();
            plausible(plausibleNameBeforeLogin);
            handleSignIn(e);
          }}
        >
          {buttonText || CTANAME}
          <FiArrowRight className="ml-2 h-5 w-5" />
        </button>
      ) : (
        <Link
          href="/meal"
          className={`inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-500 text-white font-medium text-base border border-blue-600 shadow-sm hover:bg-blue-600 transition-colors ${className}`}
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
