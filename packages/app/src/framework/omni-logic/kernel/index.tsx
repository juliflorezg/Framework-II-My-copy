/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {
  ReactNode,
  MutableRefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { EngineProps } from '../../engine/contex';

import type {
  OmniHook,
} from './types/omni-hook';
import { Fetcher, MutationHook } from './utils/types';


const Commerce = createContext<CommerceContextValue<any> | {}>({});

export type Provider = CommerceConfig & {
  fetcher: Fetcher;
  hooks?: {
    useOmniHook?: MutationHook<OmniHook>;
  };
};

export type CommerceProps<P extends Provider> = {
  children?: ReactNode;
  provider: P;
  config: CommerceConfig;
};

export type CommerceConfig = Omit<
  CommerceContextValue<any>,
  'providerRef' | 'fetcherRef'
> & {
  config: CommerceConfigProviderJSON;
};

export type CommerceConfigProviderJSON = {
  variables: {
    domain: string
  }
};

export type CommerceContextValue<P extends Provider> = {
  providerRef: MutableRefObject<P>;
  fetcherRef: MutableRefObject<Fetcher>;
  locale: string;
  config: EngineProps['data']['config']
};

export function CommerceProvider<P extends Provider>({
  provider,
  children,
  config,
}: CommerceProps<P>) {
  if (!config) {
    throw new Error('CommerceProvider requires a valid config object');
  }

  const providerRef = useRef(provider);
  // TODO: Remove the fetcherRef

  const cfg = useMemo(
    () => ({
      providerRef,
      locale: config.locale,
      config: config.config,
    }),
    [config.locale, config.config]
  );
  
  return <Commerce.Provider value={cfg}>{children}</Commerce.Provider>;
}

export function useCommerce<P extends Provider>() {
  return useContext(Commerce) as CommerceContextValue<P>;
}
