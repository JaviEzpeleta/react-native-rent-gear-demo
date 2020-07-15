import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import styled, { withTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import Animated, { Easing } from "react-native-reanimated";

import EquipmentItem from "../modules/EquipmentItem";
import { Row, Column } from "../components";

const screenHeight = Math.round(Dimensions.get("window").height);

const Equipment = () => {
  const dispatch = useDispatch();

  const opacity = new Animated.Value(0);
  const translateX = new Animated.Value(30);
  const bodyTranslateY = new Animated.Value(0);
  const bodyOpacity = new Animated.Value(1);

  const fadeItOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
    Animated.timing(translateX, {
      toValue: 30,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
    Animated.timing(bodyTranslateY, {
      toValue: 60,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
    Animated.timing(bodyOpacity, {
      toValue: 0,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
  };

  const goHome = () => {
    dispatch({ type: "LEAVE_EQUIPMENT_PAGE" });
    // dispatch({ type: "FADE_OUT_CHAT_BUBBLE" })
    fadeItOut();
    setTimeout(() => {
      dispatch({ type: "VIEW_HOME" });
    }, 600);
  };

  const duration = 400;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
    Animated.timing(translateX, {
      toValue: 0,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
  }, [opacity, translateX]);

  return (
    <PageWrapper
      style={{ height: screenHeight, borderWidth: 2, borderColor: "#f9f9f9" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderWrapper>
          <Animated.View
            style={{
              opacity,
              transform: [{ translateX: translateX }],
            }}
          >
            <TouchableOpacity onPress={() => goHome()}>
              <Feather name="chevron-left" size={36} />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              opacity,
              // transform: [{ translateX: translateX }],
            }}
          >
            <PageTitle>Photo Equipment</PageTitle>
          </Animated.View>
          {/* <CartButton /> */}
          <EmptyCorner />
        </HeaderWrapper>
        <Animated.View
          style={{
            opacity: bodyOpacity,
            transform: [{ translateY: bodyTranslateY }],
          }}
        >
          <Row style={{ justifyContent: "space-between" }}>
            <Column>
              {itemsLeft &&
                itemsLeft.map((item, index) => (
                  <EquipmentItem
                    key={index}
                    item={item}
                    index={index}
                    rightColumn={false}
                  />
                ))}
            </Column>
            <Column>
              {itemsRight &&
                itemsRight.map((item, index) => (
                  <EquipmentItem
                    rightColumn={true}
                    key={index + 10}
                    item={item}
                    index={index + 0.5}
                  />
                ))}
            </Column>
          </Row>
        </Animated.View>
      </ScrollView>
    </PageWrapper>
  );
};

const itemsLeft = [
  {
    name: "Cameras",
    count: 32,
    image: require("../assets/images/camera.png"),
    square: true,
  },
  {
    name: "Synchronizers",
    count: 23,
    image: require("../assets/images/synchronizer.jpg"),
    square: true,
  },
  {
    name: "Softboxes",
    count: 23,
    image: require("../assets/images/softbox.jpg"),
    square: false,
  },
];
const itemsRight = [
  {
    name: "Lenses",
    count: 115,
    image: require("../assets/images/canon-lens2.jpg"),
    square: false,
  },
  {
    name: "Flashes",
    count: 17,
    image: require("../assets/images/flash.jpg"),
    square: false,
  },
  {
    name: "Tripods",
    count: 40,
    image: require("../assets/images/tripod.jpg"),
    square: false,
  },
];
const PageWrapper = styled.View`
  background: ${(props) => props.theme.appBackground};
  /* padding-top: 14px; */
  padding: 10px 6px 0px 6px;
  height: ${screenHeight}px;
`;

const PageTitle = styled.Text`
  font-family: "montserrat-extra-bold";
  color: ${(props) => props.theme.blackText};
  font-size: 24px;
`;

const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: ${screenHeight > 700 ? "20px" : "0px 10px"};
  margin: 30px 0px 20px;
  align-items: center;
`;

const EmptyCorner = styled.View`
  width: 1px;
`;

export default withTheme(Equipment);
