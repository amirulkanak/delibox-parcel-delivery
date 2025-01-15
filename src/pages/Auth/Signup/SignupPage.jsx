import SignupForm from './SignupForm';

const Signup = () => {
  return (
    <section className="mt-20 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-5xl">
        <SignupForm />
      </div>
    </section>
  );
};

export default Signup;
