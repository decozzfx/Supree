import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeScreen } from "@/components/template";
import { useMutation, useQuery } from "@tanstack/react-query";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/AppStore";
import { useEffect, useState } from "react";
import { TextL, TextM, TextS } from "@/components/derivatives/text";
import colors from "@/configs/colors";
import { IGetListSemuaDokterResponse } from "@/types/commonTypes";
import { Image } from "moti";
import Gap from "@/components/generics/gap/Gap";
import { CLockOrangeSvg, ClockBlueSvg, LocationSvg } from "@/theme/svgs";

function About() {
  const dataUser = useSelector((state: RootState) => state.dataUser);

  return (
    <SafeScreen>
      <ScrollView style={styles.container}>
        <Icon name="person" size={30} />
      </ScrollView>
    </SafeScreen>
  );
}

export default About;
