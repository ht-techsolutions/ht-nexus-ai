import React from "react";
import { Loader2 } from "lucide-react";

export const AuthLoading: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='glass p-8 rounded-2xl flex flex-col items-center gap-4'>
        <Loader2 className='w-12 h-12 text-cyber-primary animate-spin' />
        <div className='text-lg font-medium'>
          {message ?? "Checking authentication..."}
        </div>
        <div className='text-sm text-muted-foreground'>
          This should only take a second.
        </div>
      </div>
    </div>
  );
};

export default AuthLoading;
