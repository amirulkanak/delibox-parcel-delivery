import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { validateEmail } from '@/utils/validator';

const LoginForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [gloading, setGLoading] = useState(false);
  const { loginWithGooglePopup, logIn } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login with Google
  const handleLoginWithGoogle = () => {
    setGLoading(true);
    loginWithGooglePopup()
      .then((result) => {
        setGLoading(false);
        toast({
          title: 'Login Successful',
          description: `Welcome ${result.user.displayName}`,
        });
        navigate(state ? state : '/dashboard');
      })
      .catch((error) => {
        setGLoading(false);
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: `${error.message}`,
        });
        setError(
          'Failed to login with Google. Please try again. ' + error.message
        );
      });
  };

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const formData = Object.fromEntries(new FormData(event.target));

    if (!validateEmail(formData.email)) {
      setError('Invalid email. Please check email address.');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Password is required');
      setLoading(false);
    }

    logIn(formData.email, formData.password)
      .then((result) => {
        setLoading(false);
        toast({
          title: 'Login Successful',
          description: `Welcome ${result.user.displayName}`,
        });
        navigate(state ? state : '/dashboard');
      })
      .catch((error) => {
        setLoading(false);
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: `${error.message}`,
        });
        setError(
          'Failed to login with Google. Please try again. ' + error.message
        );
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="md:border-none md:shadow-none overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="border-r relative hidden md:block">
            <img
              src="https://i.ibb.co.com/F5Y3BRC/auth-cover.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 text-clr-primary-text">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-clr-secondary-text/60">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="delibox@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to={'/forget-password'}
                    className="ml-auto text-sm underline-offset-2 hover:underline text-clr-secondary-text/80">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              {/* error message */}
              <span>
                {error && <div className="text-red-500 mb-1">{error}</div>}
              </span>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-clr-primary/80 hover:bg-clr-primary text-clr-primary-text">
                {loading ? <LoadingSpinner /> : 'Login'}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-clr-secondary-text/80">
                  Or continue with
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLoginWithGoogle}
                disabled={gloading}>
                {gloading && <LoadingSpinner />}
                {!gloading && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-clr-secondary-text/80">
                Don&apos;t have an account?{' '}
                <Link to={'/signup'} className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-clr-secondary-text/60 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-clr-secondary-text">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginForm;
