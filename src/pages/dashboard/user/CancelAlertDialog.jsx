import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const CancelAlertDialog = ({ children, onConfirm }) => {
  return (
    <AlertDialog>
      {/* Trigger Button */}
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      {/* Dialog Content */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will cancel the parcel booking.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* Cancel Button */}
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          {/* Confirm Button */}
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelAlertDialog;
