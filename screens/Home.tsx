import React from "react";
import { ScrollView, Dimensions } from "react-native";
import styled, { withTheme } from "styled-components/native";
import { connect } from "react-redux";
import Animated, { Easing } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

import CategoriesCarousel from "../modules/CategoriesCarousel";
import BestOffersHomeSection from "../modules/BestOffersHomeSection";
import { Title, Subtitle, CartButton, Row, MenuButton } from "../components";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

console.log({ screenWidth });
console.log({ screenHeight });

class Home extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    translateY: new Animated.Value(30),
    scale: new Animated.Value(1),
  };

  componentDidMount() {
    this.animateIn();
  }

  animateIn() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 320,
      easing: Easing.out(Easing.ease),
    }).start();
    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: 330,
      easing: Easing.out(Easing.ease),
    }).start();
  }

  animateOut() {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
    }).start();
    setTimeout(() => {
      Animated.timing(this.state.translateY, {
        toValue: 100,
        duration: 400,
        easing: Easing.in(Easing.ease),
      }).start();
    }, 100);
    Animated.timing(this.state.scale, {
      toValue: 1.03,
      duration: 100,
      easing: Easing.in(Easing.ease),
    }).start();
  }
  componentDidUpdate() {
    const { action } = this.props;
    if (action === "viewEquipment") {
      this.animateOut();
    }
  }

  render() {
    const { opacity, translateY } = this.state;
    return (
      <PageWrapper>
        <AnimatedContainer
          style={{
            opacity,
            transform: [{ translateY }, { scale: this.state.scale }],
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 80 }}
          >
            <HeaderWrapper>
              <MenuButton />
              <CartButton />
            </HeaderWrapper>

            <WelcomeWrapper>
              <Title>Hello Sophie,</Title>
              <Subtitle>What equipment are you looking for?</Subtitle>
            </WelcomeWrapper>
            <SearchAndSettingsWrapper>
              <Row style={{ justifyContent: "space-between" }}>
                <SearchBar>
                  <SearchText>Try Lens</SearchText>
                </SearchBar>
                <Feather
                  name="search"
                  size={22}
                  color={this.props.theme.darkIcon}
                  style={{ position: "absolute", top: 13, left: 12 }}
                />
                <SettingsButton>
                  <Feather
                    name="sliders"
                    size={22}
                    style={{ marginTop: -2 }}
                    color="white"
                  />
                </SettingsButton>
              </Row>
            </SearchAndSettingsWrapper>
            <CategoriesCarouselWrapper
              style={{ marginTop: screenHeight > 700 ? 50 : 24 }}
            >
              <CategoriesCarousel />
            </CategoriesCarouselWrapper>
            <BestOffersWrapper
              style={{
                marginTop: screenHeight > 700 ? 30 : 12,
                marginBottom: 20,
              }}
            >
              <BestOffersHomeSection />
            </BestOffersWrapper>
          </ScrollView>
        </AnimatedContainer>
      </PageWrapper>
    );
  }
}

const PageWrapper = styled.View`
  background: ${(props) => props.theme.appBackground};
  /* margin-bottom: 180px; */
  padding-top: 10px;
  height: ${screenHeight}px;
  /* flex: 1; */
`;
const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 20px;
  margin-top: ${screenHeight > 700 ? "30px" : "10px"};
  align-items: center;
`;

const SearchAndSettingsWrapper = styled.View`
  padding: 0px 20px;
`;
const SearchBar = styled.View`
  background: white;
  width: ${screenWidth - 120}px;
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const SearchText = styled.Text`
  font-family: "montserrat-bold";
  padding: 16px 40px 16px 44px;
  font-size: 16px;
  color: ${(props) => props.theme.grayTextOnWhite};
`;
const SettingsButton = styled.View`
  background: ${(props) => props.theme.primary};
  padding: 0px 20px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
const WelcomeWrapper = styled.View`
  padding: 0px 20px 20px;
`;

const AnimatedView = styled.View`
  /* border: 1px solid red; */
`;

const CategoriesCarouselWrapper = styled.View``;
const BestOffersWrapper = styled.View``;

const AnimatedContainer = Animated.createAnimatedComponent(AnimatedView);

const mapStateToProps = (state) => {
  return { action: state.action };
};
function mapDispatchToProps(dispatch) {
  return {
    openConcert: (concert) =>
      dispatch({
        type: "OPEN_CONCERT",
        concert,
      }),
    addNotification: (concert) =>
      dispatch({
        type: "ADD_NOTIFICATION",
        date: concert.date,
        concert: concert,
      }),
    removeNotifaction: (concert) =>
      dispatch({
        type: "REMOVE_NOTIFICATION",
        concert,
      }),
  };
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Home));
