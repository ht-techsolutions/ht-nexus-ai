'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

type ButtonProps = HTMLMotionProps<'button'> & {
  hoverScale?: number;
  tapScale?: number;
  asChild?: boolean;
};

function Button({
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: tapScale }}
      whileHover={{ scale: hoverScale }}
      {...props}
    />
  );
}

export { Button, type ButtonProps };
