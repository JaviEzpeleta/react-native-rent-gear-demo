import React, { useState, useEffect } from "react"
import { Platform } from "react-native"
import Home from "./screens/Home"
import Profile from "./screens/Profile"
import CamerasNavigator from "./screens/CamerasNavigator"
import Equipment from "./screens/Equipment"
import NavBar from "./modules/NavBar"
import AndroidNavBar from "./modules/AndroidNavBar"
import { useSelector, useDispatch } from "react-redux"

const isAndroid = Platform.OS === "android"

export default function AppNavigator() {
  const dispatch = useDispatch()
  const [page, setPage] = useState("Home")
  const currentPage = useSelector((state: any) => state.page)

  // console.log("🎟 page: " + page)

  useEffect(() => {
    // effect
    // console.log("inside UseEffect!")
    // console.log({ page })
    // console.log({ currentPage })

    // setPage("Profile")
    // return () => {}

    if (currentPage != page) {
      if (currentPage === "Equipment")
        if (page === "Home") {
          setTimeout(() => {
            //  dispatch({ type: "ANIMATE_NAVBAR" });
            setPage(currentPage)
          }, 300)
        }
      if (page === "Equipment")
        if (currentPage === "Cameras") {
          setPage(currentPage)
        }
      if (page === "Equipment")
        if (currentPage === "Home") {
          setPage(currentPage)
        }
      if (page === "Cameras")
        if (currentPage === "Home") {
          setPage(currentPage)
        }
      if (page === "Profile")
        if (currentPage === "Home") {
          setPage(currentPage)
        }
      if (page === "Home")
        if (currentPage === "Profile") {
          setPage(currentPage)
        }
    }
    return () => {}
  }, [currentPage, page])

  // if (currentPage != page) {
  //   if (currentPage === "Equipment")
  //     if (page === "Home") {
  //       setTimeout(() => {
  //         //  dispatch({ type: "ANIMATE_NAVBAR" });
  //         setPage(currentPage)
  //       }, 300)
  //     }
  //   if (page === "Cameras")
  //     if (currentPage === "Equipment") {
  //       setPage(currentPage)
  //     }
  //   if (page === "Equipment")
  //     if (currentPage === "Home") {
  //       setPage(currentPage)
  //     }
  // }
  //   console.log({ currentPage });

  return (
    <>
      {page === "Home" && <Home />}
      {page === "Profile" && <Profile />}
      {page === "Cameras" && <CamerasNavigator />}
      {page === "Equipment" && <Equipment />}
      {isAndroid && <AndroidNavBar />}
      {!isAndroid && <NavBar />}
    </>
  )
}
