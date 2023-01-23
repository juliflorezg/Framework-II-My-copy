import { Provider, useCommerce } from "../../kernel";
import { useCallback } from "react";
import type { MutationHook, PickRequired, SWRHook } from "./types";
import useData from "./use-data";
import Storage from "./async-storage";
import { useStyleguide } from "../../../styleguide/context";
import { useGlobalState } from "../../../state-machine";
import { useLinkTo, useRoute } from "@react-navigation/native";
import { useUI } from "../../../ui-action-handler";

export function useFetcher() {
  const { providerRef, fetcherRef, config } = useCommerce();
  return providerRef.current.fetcher ?? fetcherRef.current;
}

export function useHook<
  P extends Provider,
  H extends MutationHook<any> | SWRHook<any>
>(fn: (provider: P) => H) {
  const { providerRef } = useCommerce<P>();
  const provider = providerRef.current;
  return fn(provider);
}

export function useSWRHook<H extends SWRHook<any>>(
  hook: PickRequired<H, "fetcher">
) {
  const fetcher = useFetcher();

  return hook.useHook({
    useData(ctx) {
      const response = useData(
        hook,
        ctx?.input ?? [],
        fetcher,
        ctx?.swrOptions
      );
      return response;
    },
  });
}

type ISend = {
  machine: string;
  type: string;
  params: any;
};

type iDontKnown = {
  function: string;
  params: ISend;
};

export const useCommons = () => {
  const {
    sharedComponents: { utils },
  } = useStyleguide();
  const linkTo = useLinkTo();
  const route = useRoute();

  const machines = useGlobalState();
  const {openModal, closeModal} = useUI()

  const send = (machine: string, type: string, params: any) => {
    console.log("Send:", machine, type, params);
    if (machines.hasOwnProperty(machine)) {
      //@ts-ignore
      const Machine = machines[machine]?.interpreted;
      Machine.send({ type, ...params, utils: { Navigation: { linkTo } } });
      return true;
    }
    return false;
  };

  const getData = (machine: string) => {
    if (machines.hasOwnProperty(machine)) {
      //@ts-ignore

      const [{ value, context }] = machines[machine]?.actor;
      return { value, context };
    }
    return null;
  };

  const listener = (
    machine: string,
    value: string,
    sender: ISend,
    config: { waitFor?: string }
  ) => {
    if (machines.hasOwnProperty(machine)) {
      //@ts-ignore
      const Machine = machines[machine]?.interpreted;
      Machine.onTransition((ctx, event) => {
        if (
          ctx.changed &&
          ctx.value === value &&
          event.type === config?.waitFor
        ) {
          fns[sender.function](...sender.params);
          return;
        }
      });
      return true;
    }
    return false;
  };

  const fns = {
    send,
    getData,
    listener,
  };
  return {
    ...utils,
    UI:{
      openModal,
      closeModal
    },
    StateMachine: {
      send,
      getData,
      listener,
    },
    Navigation: {
      linkTo,
      route: () => route,
    },
  };
};

export function useMutationHook<H extends MutationHook<any>>(
  hook: PickRequired<H, "fetcher">
) {
  const fetcher = useFetcher();
  const utils = useCommons();
  const { config } = useCommerce();
  return hook.useHook({
    fetch: useCallback(
      ({ input } = {}) => {
        
        return hook.fetcher({
          input,
          options: hook.fetchOptions,
          fetch: fetcher,
          utils,
          template: hook.template || {},
          variables: config?.variables,
        });
      },
      [fetcher, hook.fetchOptions, utils]
    ),
  });
}