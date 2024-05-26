import React, { useMemo } from "react";
import Modal from "react-native-modal";
import { StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";

type IProps = {
  isActive: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onShow?: () => void;
  backPress: () => void;
  backDropColor?: string;
  isSLow?: boolean | false;
  noSwipe?: boolean | true;
};

const Center: React.FC<IProps> = (props) => {
  const {
    isActive,
    backPress,
    children,
    style,
    onShow,
    backDropColor,
    isSLow,
    noSwipe,
  } = props;

  const RenderMain = useMemo(() => {
    return (
      <Modal
        isVisible={isActive}
        onSwipeComplete={backPress}
        onShow={onShow}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={isSLow ? 1000 : 600}
        animationOutTiming={isSLow ? 1000 : 600}
        backdropTransitionInTiming={isSLow ? 1000 : 600}
        backdropTransitionOutTiming={isSLow ? 1000 : 600}
        swipeDirection={noSwipe ? undefined : ["down"]}
        backdropColor={backDropColor}
        useNativeDriver
        useNativeDriverForBackdrop
      >
        <Pressable onPress={backPress} style={[Styles.fullModal]}>
          <Pressable style={[Styles.contentModal, style]}>{children}</Pressable>
        </Pressable>
      </Modal>
    );
  }, [
    backDropColor,
    backPress,
    children,
    isActive,
    isSLow,
    noSwipe,
    onShow,
    style,
  ]);

  return RenderMain;
};

const Styles = StyleSheet.create({
  contentModal: {
    backgroundColor: "white",
    width: 400,
  },
  fullModal: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: 0,
  },
});

export default Center;
