import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { CiCircleQuestion } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setUser } from "../../redux/appSlice";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [toggle, setToggle] = useState(false);
  const {user} = useSelector(store=>store.appSlice);
  const dispatch = useDispatch();
  const signOutHandler = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    }).catch((error) => {
      console.log(error);
      
    })
  }

  useEffect(() => {
    dispatch(setSearchText(input));
  }, [input]);
  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <RxHamburgerMenu size={"20px"} />
          </div>
          <img
            className="w-8"
            src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
            alt="Gmail_Logo"
          />
          <h1 className="text-2xl text-gray-500 font-medium">Gmail</h1>
        </div>
      </div>
      <div className="md:block hidden w-[50%] mr-60">
        <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
          <IoIosSearch size={"24px"} className="text-gray-700" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search mail"
            className="rounded-full w-full bg-transparent outline-none px-1"
          />
        </div>
      </div>
      <div className="md:block hidden ">
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <CiCircleQuestion size={"25px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoSettingsSharp size={"25px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
            <PiDotsNineBold size={"25px"} />
          </div>
          <div className="cursor-pointer">
            <Avatar
              onClick={() => setToggle(!toggle)}
              src=" {user?.photoURL} "
              size="40"
              round={true}
            />
            <AnimatePresence>
              {toggle && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                        className="rounded-full w-10 h-10"
                      />
                      <div>
                        <p className="font-medium">Shayan Ahmed</p>
                        <p className="text-sm text-gray-500">
                          example@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="border-t my-2"></div>
                    <button
                      className="w-full text-left text-red-500 hover:bg-gray-100 px-4 py-2 rounded-lg"
                      onClick= {signOutHandler}
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
