'use client';

import * as React from 'react';
import { motion, type Transition } from 'motion/react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/animate-ui/components/buttons/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  renderSlide?: (index: number) => React.ReactNode;
  getDotLabel?: (index: number) => string;
};

type EmblaControls = {
  selectedIndex: number;
  scrollSnaps: number[];
  prevDisabled: boolean;
  nextDisabled: boolean;
  onDotClick: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
};

type DotButtonProps = {
  selected?: boolean;
  label: string;
  onClick: () => void;
};

const transition: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 24,
  mass: 1,
};

const useEmblaControls = (
  emblaApi: EmblaCarouselType | undefined,
): EmblaControls => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [prevDisabled, setPrevDisabled] = React.useState(true);
  const [nextDisabled, setNextDisabled] = React.useState(true);

  const onDotClick = React.useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const onNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const updateSelectionState = (api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());
  };

  const onInit = React.useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
    updateSelectionState(api);
  }, []);

  const onSelect = React.useCallback((api: EmblaCarouselType) => {
    updateSelectionState(api);
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    emblaApi.on('reInit', onInit).on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit).off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  };
};

function MotionCarousel(props: PropType) {
  const { slides, options, renderSlide, getDotLabel } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    selectedIndex,
    scrollSnaps,
    prevDisabled,
    nextDisabled,
    onDotClick,
    onPrev,
    onNext,
  } = useEmblaControls(emblaApi);

  return (
    <div className="w-full space-y-4 [--slide-height:9rem] sm:[--slide-height:13rem] md:[--slide-height:18rem] [--slide-spacing:1.5rem] [--slide-size:55%]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((index) => {
            const isActive = index === selectedIndex;

            return (
              <motion.div
                key={index}
                className="h-full mr-[var(--slide-spacing)] basis-[100%] sm:basis-[80%] md:basis-[60%] lg:basis-[45%] flex-none flex min-w-0"
              >
                <motion.div
                  className="size-full select-none"
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.95,
                    opacity: isActive ? 1 : 0.7,
                  }}
                  transition={transition}
                >
                  {renderSlide ? renderSlide(index) : (
                    <div className="size-full flex items-center justify-center text-3xl md:text-5xl font-semibold border-4 rounded-xl glass">
                      {index + 1}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <Button size="icon" onClick={onPrev} disabled={prevDisabled} className="bg-gradient-to-r from-cyber-primary to-accent hover:from-cyber-primary/90 hover:to-accent/90 text-white border-none">
          <ChevronLeft className="size-5" />
        </Button>

        <div className="flex flex-wrap justify-end items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              label={getDotLabel ? getDotLabel(index) : `Slide ${index + 1}`}
              selected={index === selectedIndex}
              onClick={() => onDotClick(index)}
            />
          ))}
        </div>

        <Button size="icon" onClick={onNext} disabled={nextDisabled} className="bg-gradient-to-r from-cyber-primary to-accent hover:from-cyber-primary/90 hover:to-accent/90 text-white border-none">
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </div>
  );
}

function DotButton({ selected = false, label, onClick }: DotButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      layout
      initial={false}
      className="flex cursor-pointer select-none items-center justify-center rounded-full border-none bg-gradient-to-r from-cyber-primary to-accent text-white text-sm shadow-lg shadow-cyber-primary/30"
      animate={{
        width: selected ? 68 : 12,
        height: selected ? 28 : 12,
      }}
      transition={transition}
    >
      <motion.span
        layout
        initial={false}
        className="block whitespace-nowrap px-3 py-1"
        animate={{
          opacity: selected ? 1 : 0,
          scale: selected ? 1 : 0,
          filter: selected ? 'blur(0)' : 'blur(4px)',
        }}
        transition={transition}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

export { MotionCarousel };
