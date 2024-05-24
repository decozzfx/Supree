import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "@/theme";
import RootNavigator from "./rootNavigator";

function ApplicationNavigator() {
  const { navigationTheme } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
