import React, { Component } from "react";
import styled from "styled-components/native";
import Animated, { Easing } from "react-native-reanimated";
import { Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

const screenHeight = Math.round(Dimensions.get("window").height);

const duration = 400;

class EquipmentItem extends Component {
  state = {
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.1),
    translateY: new Animated.Value(150),
    translateX: new Animated.Value(50),
  };

  fadeOut() {
    const { opacity, translateY, translateX, scale } = this.state;
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      //   useNativeDriver: true,
    }).start();
    Animated.timing(scale, {
      toValue: 0.1,
      duration: duration,
      easing: Easing.out(Easing.ease),
      //   useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 50,
      duration: duration,
      easing: Easing.out(Easing.ease),
      //   useNativeDriver: true,
    }).start();
    Animated.timing(translateX, {
      toValue: 40,
      duration: duration,
      easing: Easing.out(Easing.ease),
      //   useNativeDriver: true,
    }).start();
  }

  listCameras = () => {
    // console.log("List Cameras clicked!!")

    this.props.leaveEquipmentPage();

    setTimeout(() => {
      // console.log("Going to Next Page (v1)....")
      this.props.goToCameras();
    }, 400);
  };

  componentDidUpdate() {
    const { action } = this.props;

    // console.log(" 🇨🇦 NavBar action: " + action)

    if (action === "leaveEquipmentPage") {
      this.fadeOut();
    }
  }

  componentDidMount() {
    const { index } = this.props;
    const { opacity, translateY, translateX, scale } = this.state;
    // console.log("🇧🇼 on LOAD is this!!")
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        //   useNativeDriver: true,
      }).start();
      Animated.timing(scale, {
        toValue: 1,
        duration: duration,
        easing: Easing.out(Easing.ease),
        //   useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: duration,
        easing: Easing.out(Easing.ease),
        //   useNativeDriver: true,
      }).start();
      Animated.timing(translateX, {
        toValue: 0,
        duration: duration,
        easing: Easing.out(Easing.ease),
        //   useNativeDriver: true,
      }).start();
    }, index * 120 + 120);
  }

  render() {
    const { rightColumn, item } = this.props;
    const { opacity, translateY, translateX, scale } = this.state;
    return (
      <TouchableOpacity onPress={() => this.listCameras()}>
        <ItemWrapper
          style={{
            marginLeft: rightColumn ? 0 : 30,
            marginRight: rightColumn ? 30 : 0,
          }}
        >
          <Animated.View
            style={{
              opacity,
              transform: [
                { translateY: translateY },
                { translateX: translateX },
                { scale: scale },
              ],
            }}
          >
            <ImageWrapper>
              <Image square={item.square} source={item.image} />
            </ImageWrapper>
          </Animated.View>
          <Animated.View
            style={{
              opacity,
              transform: [
                { translateY: translateY },
                { translateX: translateX },
                // { scale: scale },
              ],
            }}
          >
            <Title>{item.name}</Title>
            <Subtitle>{item.count} items</Subtitle>
          </Animated.View>
        </ItemWrapper>
      </TouchableOpacity>
    );
  }
}

const ItemWrapper = styled.View`
  margin-bottom: 18px;
`;
const ImageWrapper = styled.View`
  background: white;
  padding: 24px 0px;
  border-radius: 8px;
  width: ${screenHeight > 700 ? "150px" : "130px"};
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: ${screenHeight > 700 ? "140px" : "100px"};
  align-items: center;
  align-content: center;
  justify-content: center;
  height: ${(props) => {
    if (props.square) {
      return screenHeight > 700 ? "100px" : "80px";
    } else {
      return screenHeight > 700 ? "150px" : "120px";
    }
  }};
`;
const Title = styled.Text`
  font-family: "montserrat-extra-bold";
  font-size: 18px;
  margin: 8px 0px 2px;
  color: ${(props) => props.theme.blackText};
`;
const Subtitle = styled.Text`
  font-family: "montserrat-bold";
  font-size: 14px;
  color: ${(props) => props.theme.grayText};
`;

const mapStateToProps = (state) => {
  return { action: state.action };
};
function mapDispatchToProps(dispatch) {
  return {
    leaveEquipmentPage: () => dispatch({ type: "LEAVE_EQUIPMENT_PAGE" }),
    goToCameras: () => dispatch({ type: "VIEW_CAMERAS" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentItem);
