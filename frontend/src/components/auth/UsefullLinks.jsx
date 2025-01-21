import { authPageUrls } from "../../constants/pageUrls";
import LinkLi from "./LinkLi";

const UsefullLinks = ({
  showSignUp = false,
  showSignIn = false,
  showSendEmailVerification = false,
  showVerifyEmail = false,
  showResetPassword = false,
  showSendPasswordResetEmail = false,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-1">
      <ul className="list-none">
        {showSignUp && (
          <LinkLi
            link={authPageUrls.signUp}
            title="Do not have an account?"
            linkText="Sign up"
          />
        )}
        {showSignIn && (
          <LinkLi
            link={authPageUrls.signIn}
            title="Already have an account?"
            linkText="Sign in"
          />
        )}
        {showSendEmailVerification && (
          <LinkLi
            link={authPageUrls.sendEmailVerification}
            title="Didn't receive verification email?"
            linkText="Send"
          />
        )}
        {showVerifyEmail && (
          <LinkLi
            link={authPageUrls.verifyEmail}
            title="Email not verified?"
            linkText="Verify"
          />
        )}
        {showResetPassword && (
          <LinkLi
            link={authPageUrls.resetPassword}
            title="Forgot your password?"
            linkText="Reset password"
          />
        )}
        {showSendPasswordResetEmail && (
          <LinkLi
            link={authPageUrls.sendPasswordResetEmail}
            title="Didn't receive password reset email?"
            linkText="Send password reset email"
          />
        )}
      </ul>
    </div>
  );
};

export default UsefullLinks;
