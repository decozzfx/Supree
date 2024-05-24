import { View } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTheme } from "@/theme";
import NexaLogo from "@/theme/assets/images/nexalogo.svg";
import { UsernameSvg, PasswordSvg } from "@/theme/svgs";
import { SafeScreen } from "@/components/template";
import { routesEnum, type ApplicationScreenProps } from "@/navigators/routes";
import { TextBase } from "@/components/derivatives/text";
import { InputBorder, InputString } from "@/components/derivatives/input";
import Gap from "@/components/generics/gap/Gap";
import { ButtonFull } from "@/components/derivatives/button";
import { CommonActions } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/AppStore";
import { actions as actionDataUser } from "@/redux/reducers/DataUserReducer";

function Auth({ navigation }: ApplicationScreenProps) {
  const { layout } = useTheme();
  const dispatch = useDispatch();
  const dataUser = useSelector((state: RootState) => state.dataUser);

  const navigateToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: routesEnum.MainDrawer }],
      })
    );
  };

  useEffect(() => {
    if (dataUser.token) {
      navigateToHome();
    }
  }, [dataUser.token, navigation]);

  const onSubmit = async () => {};

  const renderMain = useMemo(() => {
    return (
      <SafeScreen>
        <Gap height={100} />
        <View style={[layout.itemsCenter, layout.justifyCenter]}>
          <NexaLogo />
          <TextBase color={"#8696BB"} size={15}>
            Silakan login dengan akun google anda
          </TextBase>

          <ButtonFull onPress={navigateToHome}>login</ButtonFull>

          <Gap height={50} />
        </View>
      </SafeScreen>
    );
  }, [layout.itemsCenter, layout.justifyCenter, onSubmit]);

  return renderMain;
}

export default Auth;
