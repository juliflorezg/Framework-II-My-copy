import React, { FC, useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useUI } from "..";
 

export const ModalComponent: FC = () => {
  const {
    displayModal,
    closeModal,
    modalContent,
  } = useUI();

  const onCancelHandler = () => {
    closeModal();
  };

  return (
    <Modal animationType="fade" visible={displayModal} transparent={true}>
      <TouchableWithoutFeedback onPress={onCancelHandler}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {modalContent}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const defaultStyles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 6,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowOpacity: 0.25,
    elevation: 10,
    width: "88%",
  },
});