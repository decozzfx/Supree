import { ScrollView } from "react-native";
import { SafeScreen } from "@/components/template";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/AppStore";

function Jadwal() {
  const dataUser = useSelector((state: RootState) => state.dataUser);

  return (
    <SafeScreen>
      <ScrollView style={styles.container}>
        <Icon name="person" size={30} />
      </ScrollView>
    </SafeScreen>
  );
}

export default Jadwal;
