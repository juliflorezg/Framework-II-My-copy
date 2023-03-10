/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useMemo, } from 'react';
import { createContext, FC, useContext } from 'react';
import { PaletteType, ThemeType } from './types/theme';
import { createTheme } from './theme';
import { StyleSheet } from 'react-native'
import { computeClasses } from './utils/process-style';
export type StyleguideContextValue = StyleguideConfig;

const Styleguide = createContext<StyleguideContextValue | {}>({});

export interface StyleguideProps {
  config: Omit<StyleguideConfig, 'setTheme' | 'currentTheme'>;
  children: React.ReactElement
}

export interface CustomComponentsType<P> {
  [key: string]: React.FC<P>;
}


export type StyleClass = StyleSheet.NamedStyles<any> | StyleSheet.NamedStyles<unknown> | StyleSheet.NamedStyles<StyleSheet.NamedStyles<any> | StyleSheet.NamedStyles<unknown>>
type UIStyleguideType = Record<string, React.FC>
type UtilsStyleguideType = Record<string, unknown>
export interface StyleguideConfig extends ThemeState {
  theme: ThemeType;
  setTheme: (type: PaletteType) => void;
  CustomComponents: {};
  sharedComponents: {
    ui: UIStyleguideType,
    utils: UtilsStyleguideType
    icons: {
      [key: string]: React.ReactNode
    }
  }
  styles: { [x: string]: StyleClass }
}

export interface ThemeState {
  currentTheme: PaletteType;
  theme: ThemeType;
}

type ThemeAction = {
  type: 'SET_THEME';
  payload: PaletteType;
};

/**
 * If the action type is 'SET_THEME', then return a new state object with the currentTheme property set
 * to the payload of the action, and the theme property set to a new theme object with the palette
 * property set to a new palette object with the type property set to the payload of the action.
 * @param {ThemeState} state - ThemeState - The current state of the reducer.
 * @param {ThemeAction} action - ThemeAction - This is the action that is dispatched to the reducer.
 * @returns The state is being returned.
 */
function ThemeReducer(state: ThemeState, action: ThemeAction) {
  switch (action.type) {
    case 'SET_THEME': {
      return {
        ...state,
        currentTheme: action.payload,
        theme: createTheme({
          ...state.theme,
          palette: {
            ...state.theme.palette,
            type: action.payload,
          },
        }),
      };
    }
    default:
      return state;
  }
}

export const StyleguideProvider: FC<StyleguideProps> = ({
  config,
  children,
}) => {
  const [state, dispatch] = React.useReducer(ThemeReducer, {
    currentTheme: config.theme.palette?.type,
    theme: config.theme,
  });

  const setTheme = useCallback(
    (type: PaletteType) => dispatch({ type: 'SET_THEME', payload: type }),
    [dispatch]
  );


  const value = useMemo(() => {
    return {
      currentTheme: state.currentTheme,
      theme: state.theme,
      setTheme,
      CustomComponents: config.CustomComponents,
      sharedComponents: config.sharedComponents,
      styles: computeClasses(config.styles, state.theme)
    };
  }, [setTheme, state.currentTheme, state.theme, config]);
  return <Styleguide.Provider value={value}>{children}</Styleguide.Provider>;
};

export function useStyleguide() {
  return useContext(Styleguide) as StyleguideContextValue;
}
