import React, { createContext, FC, useContext, useMemo } from 'react'
import { SharedValue } from 'react-native-reanimated';

export type StepperContextValue = StepperConfig;

const Stepper = createContext<Partial<StepperContextValue>>({});

export interface StepperProps {
  props: StepperConfig;
  children: React.ReactNode
}

export type StepperConfig = {
  currentPage: SharedValue<number>
  nextPage: (...args: any) => void
  prevPage: (...args: any) => void
};

export const StepperProvider: FC<StepperProps> = ({
  props,
  children,
}) => {
  const value = useMemo(() => {
    return {
      currentPage: props.currentPage,
      nextPage: props.nextPage,
      prevPage: props.prevPage
    };
  }, [props]);
  return (
    <Stepper.Provider value={value}>{children}</Stepper.Provider>
  );
};

export const useStepper = (): StepperConfig => {
  return useContext(Stepper) as StepperContextValue;
};
