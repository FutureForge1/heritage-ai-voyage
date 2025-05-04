
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface ExtendedProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
  isAnimated?: boolean;
  animationDuration?: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ExtendedProgressProps
>(({ className, value, indicatorClassName, isAnimated = true, animationDuration = 1000, ...props }, ref) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (!isAnimated) {
      setDisplayValue(value || 0);
      return;
    }

    // If value is not set, just use 0
    if (value === undefined) {
      setDisplayValue(0);
      return;
    }

    // Animate the value
    let startTime: number;
    let startValue = displayValue;
    const endValue = value;
    const duration = animationDuration;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate progress
      const progress = Math.min(elapsed / duration, 1);
      const newValue = startValue + progress * (endValue - startValue);
      
      setDisplayValue(newValue);

      // Continue animation if not complete
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, isAnimated, animationDuration]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary transition-all duration-300",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (displayValue || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
