import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import { validateEmail } from '@/utils/validator';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgetPasswordForm = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sendPasswordResetEmailToUser } = useAuth();
  const { toast } = useToast();

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
    sendPasswordResetEmailToUser(formData.email)
      .then((result) => {
        toast({
          title: 'Password Reset Email Sent',
          description: 'Check your email for password reset link.',
        });
        setLoading(false);
        navigate('/login');
      })
      .catch((error) => {
        setError(
          'Failed to login with Google. Please try again. ' + error.message
        );
        toast({
          variant: 'destructive',
          title: 'Failed to send password reset email',
          description: error.message,
        });
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
                <h1 className="text-2xl font-bold">Forget Password</h1>
                <p className="text-balance text-clr-secondary-text/60">
                  Enter your email to reset your password
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

              {/* error message */}
              <span>
                {error && <div className="text-red-500 mb-1">{error}</div>}
              </span>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-clr-primary/80 hover:bg-clr-primary text-clr-primary-text">
                {loading ? <LoadingSpinner /> : 'Reset Password'}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-clr-secondary-text/80">
                  Or
                </span>
              </div>
              <div className="text-center text-sm text-clr-secondary-text/80">
                Remember Password?{' '}
                <Link to={'/login'} className="underline underline-offset-4">
                  Login
                </Link>
              </div>
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

export default ForgetPasswordForm;
