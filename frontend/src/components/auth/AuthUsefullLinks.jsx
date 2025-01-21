import { authPageUrls } from "../../constants/pageUrls";
import LinkLi from "./LinkLi";

const AuthUsefullLinks = ({
  showSignUp = null,
  showSignIn = null,
  showSendEmailVerification = null,
  showVerifyEmail = null,
  showResetPassword = null,
  showSendPasswordResetEmail = null,
}) => {
  const defaultSignUpMessage = "";
  const defaultSignInMessage = "";
  const defaultSendEmailMessage = "";
  const defaultSendPwMessage = "";
  const defaultVerifyEmailMessage = "";
  const defaultResetPwMessage = "";
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <ul className="list-none w-full flex flex-col gap-1">
        {showSignUp && (
          <LinkLi
            link={authPageUrls.signUp}
            title={
              showSignUp.message ? showSignUp.message : defaultSignUpMessage
            }
            linkText="Sign up"
          />
        )}
        {showSignIn && (
          <LinkLi
            link={authPageUrls.signIn}
            title={
              showSignIn.message ? showSignIn.message : defaultSignInMessage
            }
            linkText="Sign in"
          />
        )}
        {showSendEmailVerification && (
          <LinkLi
            link={authPageUrls.sendEmailVerification}
            title={
              showSendEmailVerification.message
                ? showSendEmailVerification.message
                : defaultSendEmailMessage
            }
            linkText="Send"
          />
        )}
        {showVerifyEmail && (
          <LinkLi
            link={authPageUrls.verifyEmail}
            title={
              showVerifyEmail.message
                ? showVerifyEmail.message
                : defaultVerifyEmailMessage
            }
            linkText="Verify"
          />
        )}
        {showResetPassword && (
          <LinkLi
            link={authPageUrls.resetPassword}
            title={
              showResetPassword.message
                ? showResetPassword.message
                : defaultResetPwMessage
            }
            linkText="Reset"
          />
        )}
        {showSendPasswordResetEmail && (
          <LinkLi
            link={authPageUrls.sendPasswordResetEmail}
            title={
              showSendPasswordResetEmail.message
                ? showSendPasswordResetEmail.message
                : defaultSendPwMessage
            }
            linkText="Send"
          />
        )}
      </ul>
    </div>
  );
};

export default AuthUsefullLinks;
