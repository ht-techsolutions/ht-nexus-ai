'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { motion, AnimatePresence, type Transition } from 'motion/react';

import { cn } from '@/lib/utils';

type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider> & {
  openDelay?: number;
  closeDelay?: number;
};

function TooltipProvider({ openDelay = 0, closeDelay = 0, ...props }: TooltipProviderProps) {
  return <TooltipPrimitive.Provider delayDuration={openDelay} skipDelayDuration={closeDelay} {...props} />;
}

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;

function Tooltip(props: TooltipProps) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

type TooltipTriggerProps = React.ComponentProps<typeof TooltipPrimitive.Trigger>;

function TooltipTrigger(props: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

type TooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content> & {
  transition?: Transition;
};

function TooltipContent({
  className,
  sideOffset = 4,
  transition = { type: 'spring', stiffness: 400, damping: 25, mass: 0.5 },
  children,
  ...props
}: TooltipContentProps) {
  return (
    <AnimatePresence>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          asChild
          sideOffset={sideOffset}
          {...props}
        >
          <motion.div
            data-slot="tooltip-content"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={transition}
            className={cn(
              'bg-primary text-primary-foreground z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs',
              className,
            )}
          >
            {children}
          </motion.div>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </AnimatePresence>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  type TooltipProps,
  type TooltipTriggerProps,
  type TooltipContentProps,
  type TooltipProviderProps,
};
