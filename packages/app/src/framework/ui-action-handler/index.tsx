import React, { FC, useCallback, useMemo } from "react";

 

export interface State {
  displayModal: boolean;
  modalContent: React.ReactNode | null;
}

export interface UIFNActions {
  openModal: (props: ModalFNProps) => void;
  closeModal: () => void;
}

const initialState: State = {
  modalContent: null,
  displayModal: false,
};

type Action =
  | {
      type: "OPEN_MODAL";
      payload: ModalFNProps;
    }
  | {
      type: "CLOSE_MODAL";
    };

export const UIContext = React.createContext<State>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        modalContent: action.payload.content,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }

    default:
      return state;
  }
}

type ModalFNProps = {
  content?: React.ReactNode ;
  modalContent?: React.ReactNode ;
};

export const UIProvider: FC<any> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openModal = useCallback(
    (props: ModalFNProps) => dispatch({ type: "OPEN_MODAL", payload: props }),
    [dispatch]
  );
  const closeModal = useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
    }),
    [closeModal, openModal, state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context as State & UIFNActions;
};

 
 
