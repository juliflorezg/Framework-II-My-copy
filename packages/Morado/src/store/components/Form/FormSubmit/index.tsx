import React, { FC } from "react";
import { useFormContext } from "react-hook-form";
import {Button, Text} from "@my-app/ui";
import { useStoreForm } from "../context";
import { ButtonProps } from "./types";
import { View } from "react-native";
import useStyles from "@my-app/app/src/framework/styleguide/hooks/useStyles";
import { BlockComponent } from "@my-app/app/src/framework/engine/types";

export const SubmitButton: FC<BlockComponent<ButtonProps>> = ({ props: { buttonText, style } }) => {
  const { onSubmit, submitIsLoading } = useStoreForm();
  const {
    handleSubmit,
  } = useFormContext();

  const ButtonStyles = useStyles(style)

  return (
    <View style={ButtonStyles?.wrapper}>
      <Button style={ButtonStyles?.button} onPress={
        handleSubmit((event) =>
          onSubmit({
            ...event,
          })
        )}
        isLoading={submitIsLoading || false}
      >
        <Text style={ButtonStyles?.buttonText}>{buttonText}</Text>
      </Button>
    </View>

  );
}