import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import ProfilePhotoUpload from './ProfilePhotoUpload';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { validateEmail, validatePasswordForSignUp } from '@/utils/validator';
import uploadImage from '@/utils/uploadImage';
import { useToast } from '@/hooks/useToast';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAxiosPublic } from '@/hooks/axios/useAxios';

const SignupForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [gloading, setGLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, updateUserProfile, loginWithGooglePopup } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const formData = Object.fromEntries(new FormData(event.target));

    // Validate form data before submitting name, email, password, and profile photo
    if (!formData.name) {
      setError('Full name is required.');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Invalid email. Please check email address.');
      setLoading(false);
      return;
    }

    if (!validatePasswordForSignUp(formData.password)) {
      setError(
        'Password must includes 6 characters, an uppercase and a lowercase letters.'
      );
      setLoading(false);
      return;
    }

    if (!selectedImage) {
      setError('Profile photo is required.');
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadImage(selectedImage);
      const { user } = await signUp(formData.email, formData.password);

      if (!user) {
        toast({
          title: 'Failed to create an account.',
          description: 'Please try again later.',
        });
        throw new Error('Failed to create an account.');
      }

      // Update user profile with name and photoURL
      await updateUserProfile(formData.name, imageUrl);
      toast({
        title: 'Account created successfully.',
        description: 'You are now logged in.',
      });

      await axiosPublic.post(`/users/${user.email}`, {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: formData.role,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to create an account.',
        description: error.message,
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
        navigate('/dashboard');
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
                <h1 className="text-2xl font-bold">Delibox</h1>
                <p className="text-balance text-clr-secondary-text/60">
                  Create an account with us to continue
                </p>
              </div>

              {/* Profile Photo */}
              <ProfilePhotoUpload setSelectedImage={setSelectedImage} />

              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Full Name"
                  required
                />
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
                </div>
                <Input id="password" name="password" type="password" required />
              </div>

              <div>
                <Select name="role" required>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="deliveryMan">Delivery Man</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* error message */}
              <span>
                {error && <div className="text-red-500 mb-1">{error}</div>}
              </span>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-clr-primary/80 hover:bg-clr-primary text-clr-primary-text">
                {loading ? <LoadingSpinner /> : 'Signup'}
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
                    Signup with Google
                  </>
                )}
              </Button>
              <div className="text-center text-sm text-clr-secondary-text/80">
                Have an account?{' '}
                <Link to={'/login'} className="underline underline-offset-4">
                  Login
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

export default SignupForm;
