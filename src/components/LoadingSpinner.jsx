import { LoaderPinwheel } from 'lucide-react';

const LoadingSpinner = ({ size }) => {
  return (
    <LoaderPinwheel size={size} strokeWidth={1.5} className="animate-spin" />
  );
};

export default LoadingSpinner;
