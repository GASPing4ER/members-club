import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <SignIn forceRedirectUrl={"/events"} />
    </div>
  );
};

export default SignInPage;
