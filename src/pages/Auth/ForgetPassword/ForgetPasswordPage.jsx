import ForgetPasswordForm from './ForgetPasswordForm';

const ForgetPasswordPage = () => {
  document.title = 'Forget Password | Delibox';
  window.scrollTo(0, 0);
  return (
    <>
      <div className="h-20 bg-transparent"></div>
      <section className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-5xl">
          <ForgetPasswordForm />
        </div>
      </section>
    </>
  );
};

export default ForgetPasswordPage;
