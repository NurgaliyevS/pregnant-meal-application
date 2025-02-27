import Link from "next/link";
import { handleSignIn } from "./handleSignIn";
import { useSession } from "next-auth/react";
import { usePlausible } from "next-plausible";

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
          className={`btn btn-primary no-underline ${className}`}
          onClick={(e) => {
            e.preventDefault();
            plausible(plausibleNameBeforeLogin);
            handleSignIn(e);
          }}
        >
          {buttonText || CTANAME}
        </Link>
      ) : (
        <Link
          href="/meal"
          className={`btn btn-primary no-underline ${className}`}
          title="Meal page"
          rel="nofollow"
          onClick={() => {
            plausible(plausibleNameAfterLogin);
          }}
        >
          {buttonText || CTANAME}
        </Link>
      )}
    </>
  );
}

export default CTAButton;
