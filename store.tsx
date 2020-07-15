import { createStore } from "redux";

const initialState = {
  page: "Home",
  action: "nothing",
};

function reducer(state = initialState, action: string) {
  switch (action.type) {
    case "VIEW_CAMERAS": {
      return {
        ...state,
        action: "viewCameras",
        page: "Cameras",
      };
    }
    case "FADE_OUT_CHAT_BUBBLE": {
      return {
        ...state,
        action: "fadeOutChatBubble",
      };
    }
    case "LEAVE_EQUIPMENT_PAGE": {
      return {
        ...state,
        action: "leaveEquipmentPage",
      };
    }
    case "ANIMATE_NAVBAR": {
      return {
        ...state,
        action: "animateNavBar",
        // page: "Cameras",
      };
    }
    case "VIEW_HOME": {
      return {
        ...state,
        action: "goHome",
        page: "Home",
      };
    }
    case "OPEN_PROFILE": {
      return {
        ...state,
        action: "goToProfileScreen",
        page: "Profile",
      };
    }
    case "VIEW_EQUIPMENT": {
      return {
        ...state,
        action: "viewEquipment",
        page: "Equipment",
      };
    }
    default:
      return state;
  }
}

export default createStore(reducer);
