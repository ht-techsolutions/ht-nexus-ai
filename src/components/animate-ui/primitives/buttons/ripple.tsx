'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import { getStrictContext } from '@/lib/get-strict-context';

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type RippleButtonContextType = {
  ripples: Ripple[];
  setRipples: (ripples: Ripple[]) => void;
};

const [RippleButtonProvider, useRippleButton] =
  getStrictContext<RippleButtonContextType>('RippleButtonContext');

type RippleButtonProps = HTMLMotionProps<'button'> & {
  hoverScale?: number;
  tapScale?: number;
};

function RippleButton({
  ref,
  onClick,
  hoverScale = 1.05,
  tapScale = 0.95,
  style,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    if (ref && typeof ref === 'object' && 'current' in ref) {
      (ref as React.MutableRefObject<HTMLButtonElement | null>).current = buttonRef.current;
    } else if (typeof ref === 'function') {
      ref(buttonRef.current);
    }
  }, [ref]);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    [],
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      if (onClick) {
        onClick(event);
      }
    },
    [createRipple, onClick],
  );

  return (
    <RippleButtonProvider value={{ ripples, setRipples }}>
      <motion.button
        ref={buttonRef}
        data-slot="ripple-button"
        onClick={handleClick}
        whileTap={{ scale: tapScale }}
        whileHover={{ scale: hoverScale }}
        style={{
          position: 'relative',
          overflow: 'hidden',
          ...style,
        }}
        {...props}
      />
    </RippleButtonProvider>
  );
}

type RippleButtonRipplesProps = HTMLMotionProps<'span'> & {
  color?: string;
  scale?: number;
};

function RippleButtonRipples({
  color = 'var(--ripple-button-ripple-color)',
  scale = 10,
  transition = { duration: 0.6, ease: 'easeOut' },
  style,
  ...props
}: RippleButtonRipplesProps) {
  const { ripples } = useRippleButton();

  return ripples.map((ripple) => (
    <motion.span
      key={ripple.id}
      initial={{ scale: 0, opacity: 0.5 }}
      animate={{ scale, opacity: 0 }}
      transition={transition}
      style={{
        position: 'absolute',
        borderRadius: '50%',
        pointerEvents: 'none',
        width: '20px',
        height: '20px',
        backgroundColor: color,
        top: ripple.y - 10,
        left: ripple.x - 10,
        ...style,
      }}
      {...props}
    />
  ));
}

export {
  RippleButton,
  RippleButtonRipples,
  type RippleButtonProps,
  type RippleButtonRipplesProps,
};
