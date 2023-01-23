import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NavigatorType, RouteScreen } from "../types";
import { Pressable } from "react-native";

type Icon = (props: {
  focused: boolean;
  color: string;
  size: number;
}) => React.ReactNode;

interface NavConfig {
  tabBarIconName?: string;
  tabBarIcon?: BottomTabNavigationOptions["tabBarIcon"];
  headerRight?: Icon;
  headerLeft?: Icon;
  tabBarActiveTintColor?: BottomTabNavigationOptions["tabBarActiveTintColor"];
  tabBarInactiveTintColor?: BottomTabNavigationOptions["tabBarInactiveTintColor"];
  tabBarButton?: BottomTabNavigationOptions["tabBarButton"];
}

export const getConfig = (
  Screen: RouteScreen,
  route: RouteProp<ParamListBase, string>,
  Icons: any,
  ui: any,
  ctx?: any
) => {
  let config: NavConfig = {
    ...Screen.options,
  };
 
  if (Screen.type === NavigatorType.tab) {
    const tabBarButton = Screen?.screens[route.name]?.options?.tabBarItemHide
      ? () => {
          return null;
        }
      : undefined;
    const IconName = Screen?.screens[route.name]?.options?.tabBarIconName;

    const CustomComponent =
      Screen?.screens[route.name]?.options?.customComponent;

    if (IconName in Icons) {
      const Icon = Icons[IconName];
      const tabBarInactiveTintColor =
        Screen?.screens[route.name]?.options?.tabBarInactiveTintColor;
      const tabBarActiveTintColor =
        Screen?.screens[route.name]?.options?.tabBarActiveTintColor;
      config = {
        ...config,
        tabBarIcon: ({ focused, color, size }) => {
          return (
            // eslint-disable-next-line react/react-in-jsx-scope
            <Icon
              width={size}
              height={size}
              color={color}
              fill={focused ? tabBarActiveTintColor : tabBarInactiveTintColor}
            />
          );
        },

        tabBarButton,
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
      };
    } else if (CustomComponent in ui) {
      const Component = ui[CustomComponent];
 
      config = {
        ...config,
        tabBarIcon: ({ focused, color, size }) => {
          // eslint-disable-next-line react/react-in-jsx-scope
          return <Component />;
        },
      };
    }
  } else if (Screen.type === NavigatorType.component) {
    const headerRightIconName = Screen.options?.headerRightIconName;
    const headerLeftIconName = Screen.options?.headerLeftIconName;
    if (headerRightIconName in Icons) {
      const Icon = Icons[headerRightIconName];
      config = {
        ...config,
        headerRight: () => {
          let cta = null;
          if (
            Screen.options?.headerRightLogic &&
            ctx?.hasOwnProperty(Screen.options?.headerRightLogic)
          ) {
            cta = ctx[Screen.options?.headerRightLogic];
            return (
              <Pressable onPress={cta}>
                <Icon width={24} height={24} color={"#000"} />
              </Pressable>
            );
          } else {
            return <Icon width={24} height={24} color={"#000"} />;
          }
        },
      };
      if (headerLeftIconName in Icons) {
        const Icon = Icons[headerLeftIconName];
        config = {
          ...config,
          headerLeft: () => {
            let cta = null;
            if (
              Screen.options?.headerLeftLogic &&
              ctx?.hasOwnProperty(Screen.options?.headerLeftLogic)
            ) {
              cta = ctx[Screen.options?.headerLeftLogic];
              return (
                <Pressable onPress={cta}>
                  <Icon width={24} height={24} color={"#000"} />
                </Pressable>
              );
            } else {
              return <Icon width={24} height={24} color={"#000"} />;
            }
          },
        };
      }
    }
  }

  return config;
};
