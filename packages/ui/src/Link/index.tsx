/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC } from "react";
import {
  Linking,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import {
  CommonActions,
  ParamListBase,
  StackActions,
  useLinkTo,
  useNavigation,
  RouteProp,
} from "@react-navigation/native";
import Text from "../Text";
import { useUI } from "@my-app/app/src/framework/ui-action-handler";
export interface LinkProps {
  href: string;
  resetAndRedirectTo?: {
    index: number;
    routes: RouteProp<ParamListBase, string>[];
  };
  children: React.ReactNode;
  external_url?: boolean;
  text?: string;
  style?: StyleProp<TextStyle | ViewStyle>;
}

const Link: FC<LinkProps> = ({
  href = "",
  resetAndRedirectTo,
  children,
  external_url = false,
  style,
  text,
}) => {
  const linkTo = useLinkTo();
  const navigation = useNavigation();
  const { closeModal } = useUI();
  const redirect = () => {
    closeModal();
    if (external_url) {
      Linking.openURL(href);
    } else if (resetAndRedirectTo) {
      goNavigation();
    } else if (href === "goBack") {
      goBackHandler();
    } else {
      linkTo(href || "/feed");
    }
  };
  const goBackHandler = () => {
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
  };

  const goNavigation = () => {
    if (resetAndRedirectTo) {
      closeModal();
      navigation.dispatch(CommonActions.reset(resetAndRedirectTo));
    } else {
      redirect();
    }
  };

  return (
    <>
      {text ? (
        <Text onPress={() => redirect()} style={style?.text}>
          {text}
        </Text>
      ) : (
        <TouchableOpacity onPress={() => redirect()} style={style?.container}>
          {children}
        </TouchableOpacity>
      )}
    </>
  );
};

export default Link;
