'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { motion, AnimatePresence, type Transition } from 'motion/react';
import { XIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

type SheetContextType = {
  open: boolean;
};

const SheetContext = React.createContext<SheetContextType | undefined>(undefined);

function useSheet() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('useSheet must be used within a SheetProvider');
  }
  return context;
}

type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;

function Sheet({ open = false, ...props }: SheetProps) {
  return (
    <SheetContext.Provider value={{ open }}>
      <DialogPrimitive.Root open={open} {...props} />
    </SheetContext.Provider>
  );
}

const SheetTrigger = DialogPrimitive.Trigger;
const SheetPortal = DialogPrimitive.Portal;
const SheetClose = DialogPrimitive.Close;

type SheetOverlayProps = React.ComponentProps<typeof DialogPrimitive.Overlay> & {
  transition?: Transition;
};

function SheetOverlay({
  className,
  transition = { duration: 0.3, ease: 'easeInOut' },
  ...props
}: SheetOverlayProps) {
  const { open } = useSheet();

  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Overlay asChild forceMount {...props}>
          <motion.div
            data-slot="sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className={cn(
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
              className,
            )}
          />
        </DialogPrimitive.Overlay>
      )}
    </AnimatePresence>
  );
}

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b',
        bottom: 'inset-x-0 bottom-0 border-t',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

const sheetMotionVariants = {
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
};

type SheetContentProps = React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetVariants> & {
    transition?: Transition;
    showClose?: boolean;
  };

function SheetContent({
  side = 'right',
  className,
  children,
  transition = { type: 'spring', stiffness: 300, damping: 30 },
  showClose = true,
  ...props
}: SheetContentProps) {
  const { open } = useSheet();
  const motionVariants = sheetMotionVariants[side ?? 'right'];

  return (
    <SheetPortal>
      <SheetOverlay />
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Content asChild forceMount {...props}>
            <motion.div
              data-slot="sheet-content"
              initial={motionVariants.initial}
              animate={motionVariants.animate}
              exit={motionVariants.exit}
              transition={transition}
              className={cn(sheetVariants({ side }), className)}
            >
              {children}
              {showClose && (
                <SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
                  <XIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              )}
            </motion.div>
          </DialogPrimitive.Content>
        )}
      </AnimatePresence>
    </SheetPortal>
  );
}

type SheetHeaderProps = React.ComponentProps<'div'>;

function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        'flex flex-col space-y-2 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  );
}

type SheetFooterProps = React.ComponentProps<'div'>;

function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  );
}

type SheetTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>;

function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground text-lg font-semibold', className)}
      {...props}
    />
  );
}

type SheetDescriptionProps = React.ComponentProps<
  typeof DialogPrimitive.Description
>;

function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  type SheetProps,
  type SheetOverlayProps,
  type SheetContentProps,
  type SheetHeaderProps,
  type SheetFooterProps,
  type SheetTitleProps,
  type SheetDescriptionProps,
};
