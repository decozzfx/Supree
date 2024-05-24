export enum routesEnum {
  Auth = "Auth",
  Home = "Home",
  Jadwal = "Jadwal",
  Pesan = "Pesan",
  Camera = "Camera",
  Profil = "Profil",
  MainBottomTabMenu = "MainBottomTabMenu",
  MainDrawer = "MainDrawer",
}

export type RootStackNavigationTypes = {
  [routesEnum.Auth]: undefined;
  [routesEnum.Home]: undefined;
  [routesEnum.Jadwal]: undefined;
  [routesEnum.Pesan]: undefined;
  [routesEnum.Camera]: undefined;
  [routesEnum.Profil]: { photoPath?: string };

  // Bottom Tab Menu
  [routesEnum.MainBottomTabMenu]: undefined;
  [routesEnum.MainDrawer]: {
    navigateToScreen?: routesEnum;
    params?: string;
  };
};

import type { StackScreenProps } from "@react-navigation/stack";

export type ApplicationScreenProps = StackScreenProps<RootStackNavigationTypes>;
