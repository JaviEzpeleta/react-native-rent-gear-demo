import React, { useEffect } from "react";
import { ScrollView, Dimensions, TouchableOpacity } from "react-native";
import styled, { withTheme } from "styled-components/native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import Animated, { Easing } from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";

import { CartButton, Row, Column } from "../components";

const screenHeight = Math.round(Dimensions.get("window").height);
const duration = 400;

function Cameras({ navigation }) {
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch({ type: "VIEW_HOME" });
  };

  const titleOpacity = new Animated.Value(0);
  const filtersTranslateX = new Animated.Value(80);
  const filtersScale = new Animated.Value(1.08);
  const filtersOpacity = new Animated.Value(0);
  const bodyTranslateY = new Animated.Value(90);
  const bodyOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
    Animated.timing(filtersOpacity, {
      toValue: 1,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
    Animated.timing(filtersScale, {
      toValue: 1,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
    Animated.timing(filtersTranslateX, {
      toValue: 0,
      duration: duration,
      easing: Easing.out(Easing.ease),
    }).start();
    Animated.timing(bodyOpacity, {
      toValue: 1,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start();
    Animated.timing(bodyTranslateY, {
      toValue: 0,
      duration: duration,
      easing: Easing.out(Easing.ease),
    }).start();

    return () => {
      // cleanup
    };
  }, [
    bodyOpacity,
    bodyTranslateY,
    filtersOpacity,
    filtersScale,
    filtersTranslateX,
    titleOpacity,
  ]);
  return (
    <PageWrapper
      style={{ height: screenHeight, borderWidth: 2, borderColor: "#f9f9f9" }}
    >
      <HeaderWrapper>
        <TouchableOpacity onPress={() => goHome()}>
          <Feather name="chevron-left" size={36} />
        </TouchableOpacity>
        <Animated.View
          style={{
            opacity: titleOpacity,
          }}
        >
          <PageTitle>Cameras</PageTitle>
        </Animated.View>
        <Animated.View
          style={{
            opacity: titleOpacity,
          }}
        >
          <CartButton />
        </Animated.View>
      </HeaderWrapper>
      <Animated.View
        style={{
          transform: [
            { translateX: filtersTranslateX },
            { scale: filtersScale },
          ],
          opacity: filtersOpacity,
        }}
      >
        <Row
          style={{
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          {filters &&
            filters.map((filter, index) => (
              <FilterWarpper key={index + 10}>
                <Filter>{filter}</Filter>
              </FilterWarpper>
            ))}
          <SettingsButton>
            <Feather
              name="sliders"
              size={22}
              style={{ marginTop: -2 }}
              color="white"
            />
          </SettingsButton>
        </Row>
      </Animated.View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: bodyOpacity,
            transform: [{ translateY: bodyTranslateY }],
          }}
        >
          <TitleWrapper>
            <Title>Your Options</Title>
            <OptionsCount>(23)</OptionsCount>
          </TitleWrapper>
          {camerasList &&
            camerasList.map((camera, index) => (
              <CameraWrapper key={index}>
                <Row>
                  <TouchableOpacity
                    // style={styles.flex}
                    // activeScale={0.9}
                    // tension={50}
                    // friction={7}
                    // useNativeDriver
                    onPress={() => {
                      navigation.navigate("CameraDetail", { camera });
                    }}
                  >
                    <SharedElement id={camera.id}>
                      <Image source={camera.image} />
                    </SharedElement>
                  </TouchableOpacity>
                  <Column style={{ flex: 1 }}>
                    <Row>
                      {camera.tags.map((tag, tagIndex) => (
                        <TagWrapper key={tagIndex}>
                          <Tag>{tag}</Tag>
                        </TagWrapper>
                      ))}
                    </Row>
                    <Name>{camera.name}</Name>
                    <Row
                      style={{
                        justifyContent: "space-between",
                      }}
                    >
                      <Price>${camera.price}.00</Price>
                      <Row
                        style={{ alignContent: "center", alignItems: "center" }}
                      >
                        <FontAwesome
                          name="star"
                          size={screenHeight > 700 ? 22 : 19}
                          color="#fdda6d"
                        />
                        <Rating>{camera.rating}</Rating>
                      </Row>
                    </Row>
                  </Column>
                </Row>
              </CameraWrapper>
            ))}
        </Animated.View>
      </ScrollView>
    </PageWrapper>
  );
}

const CameraWrapper = styled.View`
  background: white;
  margin: 10px 20px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const TagWrapper = styled.View`
  background: ${(props) => props.theme.tagBackground};
  /* width: 80px; */
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  border-radius: 8px;
`;

const Tag = styled.Text`
  font-family: "montserrat-bold";
  color: ${(props) => props.theme.blackTextLighter};
  font-size: ${screenHeight > 700 ? "14px" : "12px"};
`;

const Name = styled.Text`
  font-family: "montserrat-extra-bold";
  color: ${(props) => props.theme.blackText};
  font-size: ${screenHeight > 700 ? "18px" : "16px"};
  margin: ${screenHeight > 700 ? "12px 0px 20px" : "10px 0px"};
`;

const Rating = styled.Text`
  font-family: "montserrat-extra-bold";
  color: ${(props) => props.theme.blackText};
  font-size: ${screenHeight > 700 ? "20px" : "17px"};
  margin-left: 4px;
`;

const Price = styled.Text`
  font-family: "montserrat-extra-bold";
  color: ${(props) => props.theme.primary};
  font-size: ${screenHeight > 700 ? "20px" : "17px"};
`;

const Image = styled.Image`
  width: ${screenHeight > 700 ? "110px" : "90px"};
  height: ${screenHeight > 700 ? "110px" : "90px"};
  margin-right: 20px;
`;

const camerasList = [
  {
    id: 1,
    name: "SONY Alpha a7R III",
    image: require("../assets/images/a7iii.png"),
    price: 11,
    rating: 4.8,
    tags: ["Sony", "Mirrorless"],
  },
  {
    id: 2,
    name: "Leica SL2",
    image: require("../assets/images/leica-sl2.png"),
    price: 17,
    rating: 4.7,
    tags: ["Leica", "Mirrorless"],
  },
  {
    id: 3,
    name: "Canon EOS R",
    image: require("../assets/images/eos-r.png"),
    price: 12,
    rating: 4.3,
    tags: ["Canon", "Mirrorless"],
  },
  {
    id: 4,
    name: "Lumix DC-S1",
    image: require("../assets/images/lumix.png"),
    price: 13,
    rating: 4.5,
    tags: ["Lumix", "Mirrorless"],
  },
];

const filters = ["Full Frame", "Mirrorless"];

const Filter = styled.Text`
  font-family: "montserrat-extra-bold";
  font-size: ${screenHeight > 700 ? "16px" : "14px"};
  color: ${(props) => props.theme.blackText};
`;

const FilterWarpper = styled.View`
  background: white;
  box-shadow: ${(props) => props.theme.boxShadow};
  padding: 14px 20px;
  border-radius: 8px;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin: ${screenHeight > 700 ? "20px" : "8px 22px"};
`;

const Title = styled.Text`
  font-family: "montserrat-extra-bold";
  color: ${(props) => props.theme.blackText};
  font-size: 24px;
`;

const OptionsCount = styled.Text`
  font-family: "montserrat-bold";
  font-size: 20px;
  color: ${(props) => props.theme.grayText};
  margin-bottom: 5px;
`;

const PageWrapper = styled.View`
  background: ${(props) => props.theme.appBackground};
  flex: 1;
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
  margin-top: 40px;
  align-items: center;
`;

const SettingsButton = styled.View`
  background: ${(props) => props.theme.primary};
  padding: 0px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

export default withTheme(Cameras);
