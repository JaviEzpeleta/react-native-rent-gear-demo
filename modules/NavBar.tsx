import React, { Component } from "react"
import { Dimensions, TouchableOpacity } from "react-native"
import Animated, { Easing } from "react-native-reanimated"
import styled, { withTheme } from "styled-components/native"
import { Row } from "../components"
import { Feather } from "@expo/vector-icons"
import { connect } from "react-redux"

const screenWidth = Math.round(Dimensions.get("window").width)
const screenHeight = Math.round(Dimensions.get("window").height)

const duration = 400

class NavBar extends Component {
  state = {
    bubbleOpacity: new Animated.Value(0),
    scaleY: new Animated.Value(1),
    originalBubbleOpacity: new Animated.Value(1),
    translateY: new Animated.Value(0),
    wrapperTranslateY: new Animated.Value(0),
    wrapperOpacity: new Animated.Value(1),
    bubbleScale: new Animated.Value(1),
    ballScale: new Animated.Value(0),
    bubbleX: 0,
    bubbleY: 0,
    ballX: new Animated.Value(0),
    interpolateColor: false,
    ballOpacity: new Animated.Value(1),
    wrapperHeight: new Animated.Value(0),
    currentPage: "Home",
  }

  goToProfile() {
    this.props.goToProfileScreen()
    this.setState({ currentPage: "Profile" })
  }
  goToHome() {
    this.props.goToHomeScreen()
    this.setState({ currentPage: "Home" })
  }

  flatChat = () => {
    const { scaleY } = this.state
    Animated.timing(scaleY, {
      toValue: 0.6,
      duration: 200,
      easing: Easing.out(Easing.ease),
    }).start()
  }
  hideOriginalBubble = () => {
    const { originalBubbleOpacity } = this.state
    Animated.timing(originalBubbleOpacity, {
      toValue: 0,
      duration: 0,
      easing: Easing.in(Easing.ease),
    }).start()
  }

  jumpDown = () => {
    const { translateY, bubbleScale, ballScale, scaleY } = this.state
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(bubbleScale, {
      toValue: 1.4,
      duration: 300,
      easing: Easing.out(Easing.ease),
    }).start()
    setTimeout(() => {
      Animated.spring(ballScale, {
        toValue: 1,
        damping: 10,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start()
    }, 100)

    setTimeout(() => {
      Animated.timing(scaleY, {
        toValue: 0.7,
        duration: 150,
        easing: Easing.out(Easing.ease),
      }).start()
    }, 300)

    setTimeout(() => {
      Animated.timing(scaleY, {
        toValue: 1,
        duration: 200,
        easing: Easing.in(Easing.ease),
      }).start()
    }, 450)
  }

  jumpUp = () => {
    const { scaleY, translateY } = this.state
    Animated.timing(scaleY, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
    }).start()
    Animated.timing(translateY, {
      toValue: -40,
      duration: 200,
      easing: Easing.out(Easing.ease),
    }).start()
  }

  fadeOutChatBubble() {
    const { bubbleOpacity, bubbleScale, ballOpacity } = this.state
    this.animatedColorValue = new Animated.Value(0)

    Animated.timing(bubbleOpacity, {
      toValue: 0,
      duration: 0,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(bubbleScale, {
      toValue: 1,
      duration: 300,
      easing: Easing.in(Easing.ease),
    }).start()
    // Animated.timing(ballX, {
    //   toValue: 40,
    //   duration: 400,
    //   easing: Easing.in(Easing.ease),
    // }).start()
    Animated.timing(ballOpacity, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
    }).start()
  }

  animateNavBar() {
    this.hideOriginalBubble()

    const {
      wrapperTranslateY,
      ballOpacity,
      ballX,
      wrapperOpacity,
      bubbleOpacity,
    } = this.state

    Animated.timing(wrapperTranslateY, {
      toValue: 140,
      duration: 500,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(wrapperOpacity, {
      toValue: 1,
      duration: 400,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(ballX, {
      toValue: 0,
      duration: 400,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(ballOpacity, {
      toValue: 1,
      duration: 400,
      easing: Easing.in(Easing.ease),
    }).start()

    this.flatChat()

    setTimeout(() => {
      this.jumpUp()
    }, 200)
    setTimeout(() => {
      this.jumpDown()
    }, 400)

    setTimeout(() => {
      Animated.timing(this.animatedColorValue, {
        toValue: 150,
        duration: 80,
        easing: Easing.out(Easing.ease),
      }).start()
    }, 700)

    Animated.timing(bubbleOpacity, {
      toValue: 1,
      duration: duration,
      easing: Easing.out(Easing.ease),
    }).start()
  }

  componentDidUpdate() {
    const { action } = this.props

    // console.log(" 🇨🇦 NavBar action: " + action)

    if (action === "viewEquipment") {
      this.animateNavBar()
    }
    if (action === "goHome") {
      this.resetNavBar()
    }
    if (action === "fadeOutChatBubble") {
      this.fadeOutChatBubble()
    }
    if (action === "leaveEquipmentPage") {
      this.fadeOutChatBubble()
    }
    if (action === "viewCameras") {
      this.hideNavBar()
    }
  }

  hideNavBar() {
    const { wrapperHeight } = this.state
    Animated.timing(wrapperHeight, {
      toValue: 0,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start()
  }
  resetNavBar() {
    const {
      originalBubbleOpacity,
      scaleY,
      bubbleOpacity,
      translateY,
      ballScale,
      wrapperOpacity,
      wrapperTranslateY,
    } = this.state

    Animated.timing(originalBubbleOpacity, {
      toValue: 1,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(scaleY, {
      toValue: 1,
      duration: 0,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(bubbleOpacity, {
      toValue: 0,
      duration: 0,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(translateY, {
      toValue: 0,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(wrapperTranslateY, {
      toValue: 0,
      duration: duration,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(wrapperOpacity, {
      toValue: 1,
      duration: 0,
      easing: Easing.in(Easing.ease),
    }).start()
    Animated.timing(ballScale, {
      toValue: 0,
      duration: 0,
      easing: Easing.in(Easing.ease),
    }).start()

    this.animatedColorValue = new Animated.Value(0)
  }

  UNSAFE_componentWillMount() {
    this.animatedColorValue = new Animated.Value(0)
  }

  componentDidMount() {
    // this.setState({
    // })
  }

  onLayout() {
    this.refs["referenceNode"].measureInWindow((x: number, y: number) => {
      //   setBubbleX(x)
      //   setBubbleY(y)\
      this.setState({ bubbleX: x, bubbleY: y })
    })
    // you'll get something like this here:
    // {"target":1105,"layout":{"y":0,"width":256,"x":32,"height":54.5}}
  }

  render() {
    const interpolateColor = this.animatedColorValue.interpolate({
      inputRange: [0, 150],
      outputRange: [
        Animated.color(65, 70, 91, 1),
        Animated.color(255, 255, 255, 1),
      ],
    })
    const {
      bubbleOpacity,
      scaleY,
      originalBubbleOpacity,
      translateY,
      wrapperTranslateY,
      wrapperOpacity,
      bubbleScale,
      ballScale,
      bubbleX,
      bubbleY,
      ballOpacity,
      ballX,
      wrapperHeight,
      currentPage,
    } = this.state

    return (
      <>
        <Animated.View
          style={{
            transform: [{ translateY: wrapperTranslateY }],
            opacity: wrapperOpacity,
            height: wrapperHeight,
          }}
        >
          <Wrapper>
            <Row
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <TouchableOpacity onPress={() => this.goToHome()}>
                <SearchButtonWrapper>
                  <Item>
                    <Feather
                      size={24}
                      name="search"
                      color={
                        currentPage === "Home"
                          ? this.props.theme.primary
                          : this.props.theme.blackText
                      }
                    ></Feather>
                    <Title
                      style={{
                        color:
                          currentPage === "Home"
                            ? this.props.theme.primary
                            : this.props.theme.blackText,
                      }}
                    >
                      SEARCH
                    </Title>
                  </Item>
                </SearchButtonWrapper>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.goToProfile()}>
                <ProfileButtonWrapper>
                  <Item>
                    <Feather
                      size={24}
                      name="user"
                      color={
                        currentPage === "Profile"
                          ? this.props.theme.primary
                          : this.props.theme.blackText
                      }
                    ></Feather>

                    <Title
                      style={{
                        color:
                          currentPage === "Profile"
                            ? this.props.theme.primary
                            : this.props.theme.blackText,
                      }}
                    >
                      PROFILE
                    </Title>
                  </Item>
                </ProfileButtonWrapper>
              </TouchableOpacity>

              <ChatButtonWrapper>
                <Item
                  onLayout={() => {
                    this.onLayout()
                  }}
                  ref="referenceNode"
                >
                  <Animated.View style={{ opacity: originalBubbleOpacity }}>
                    <Feather
                      size={24}
                      name="message-circle"
                      color={this.props.theme.blackText}
                      // color={
                      //   this.props.action === "goHome"
                      //     ? this.props.theme.blackText
                      //     : "white"
                      // }
                    ></Feather>
                  </Animated.View>
                  <Title>CHAT</Title>
                </Item>
              </ChatButtonWrapper>
            </Row>
          </Wrapper>
        </Animated.View>

        <Animated.View
          style={{
            zIndex: 900,
            position: "absolute",
            left: bubbleX + 2,
            top: bubbleY,
            transform: [{ scale: ballScale, translateX: ballX }],
            opacity: ballOpacity,
          }}
        >
          <CircleThatGrows></CircleThatGrows>
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 900,
            position: "absolute",
            left: bubbleX + 2,
            top: bubbleY,
            opacity: bubbleOpacity,
            transform: [
              { scaleY, scale: bubbleScale, translateY, translateX: ballX },
            ],
          }}
        >
          <Item>
            <AnimatedFeather
              size={24}
              name="message-circle"
              //   style={{ color: interpolateColor }}
              color={interpolateColor}
            ></AnimatedFeather>
          </Item>
        </Animated.View>
      </>
    )
  }
}

const ChatClonned = styled.View``

const Title = styled.Text`
  color: ${(props) => props.theme.blackText};
  font-family: "montserrat-extra-bold";
  font-size: 10px;
  margin-top: 8px;
`
const Item = styled.View`
  flex-direction: column;
  /* border: 1px solid red; */
  padding: 20px;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.View`
  background: white;
  height: ${screenHeight > 700 ? "100px" : "80px"};

  /* position: fixed; */
  bottom: ${screenHeight > 700 ? "90px" : "78px"};
  width: 100%;
  border-top-right-radius: 18px;
  border-top-left-radius: 18px;
  box-shadow: ${(props) => props.theme.boxShadow};
`

const SearchButtonWrapper = styled.View``
const ProfileButtonWrapper = styled.View``
const ChatButtonWrapper = styled.View``

const CircleThatGrows = styled.View`
  background: ${(props) => props.theme.primary};
  width: 66px;
  height: 66px;
  border-radius: 33px;
`

const AnimatedFeather = Animated.createAnimatedComponent(Feather)

const mapStateToProps = (state) => {
  return { action: state.action }
}
function mapDispatchToProps(dispatch) {
  return {
    goToProfileScreen: () =>
      dispatch({
        type: "OPEN_PROFILE",
      }),
    goToHomeScreen: () =>
      dispatch({
        type: "VIEW_HOME",
      }),
  }
}

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(NavBar))
