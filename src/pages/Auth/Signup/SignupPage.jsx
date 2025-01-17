import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <>
      <div className="h-20 bg-transparent"></div>
      <section className="mt-20 flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-5xl">
          <SignupForm />
        </div>
      </section>
    </>
  );
};

export default Signup;
