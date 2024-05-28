import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";

export enum routesEnum {
  Auth = "Auth",
  Home = "Home",
  Jadwal = "Jadwal",
  Pesan = "Pesan",
  Camera = "Camera",
  Profil = "Profil",
  About = "About",
  MainBottomTabMenu = "MainBottomTabMenu",
  MainDrawer = "MainDrawer",
}

export type RootStackNavigationTypes = {
  [routesEnum.Auth]: undefined;
  [routesEnum.Pesan]: undefined;
  [routesEnum.About]: undefined;
  [routesEnum.Profil]: { photoPath?: string };

  // Bottom Tab Menu
  [routesEnum.MainBottomTabMenu]: undefined;
  [routesEnum.MainDrawer]: {
    navigateToScreen?: routesEnum;
    params?: string;
  };
};

export type ApplicationScreenProps = StackScreenProps<RootStackNavigationTypes>;

const Stack = createNativeStackNavigator<RootStackNavigationTypes>();
const { Navigator } = Stack;
const { Screen } = Stack;

export { Stack, NavigationContainer, Navigator, Screen };
