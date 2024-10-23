import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedEmail } from "../redux/appSlice";
import { motion } from "framer-motion";

const Message = ({email}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMail = () => {
    dispatch(setSelectedEmail(email));
    navigate(`/mail/${email.id}`);
  };
  return (
    <motion.div
      onClick={openMail}
      whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex items-start justify-between border-b border-b-gray-200 px-4 py-2 text-sm hover:cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="flex-none text-gray-300">
          <MdCropSquare className="w-5 h-5" />
        </div>
        <div className="flex-none text-gray-300">
          <RiStarLine className="w-5 h-5" />
        </div>
        <div>
          <h1 className="fond-semibold"> {email?.to} </h1>
        </div>
      </div>
      <div className="flex-1 ml-4">
        <p className="text-gray-600 truncate inline-block max-w-full">
          {email?.message}
        </p>
      </div>
      <div className="flex-none text-gray-400 text-sm">
        <p> {new Date(email?.createdAt?.seconds * 1000).toUTCString()} </p>
      </div>
    </motion.div>
  );  
};

export default Message;
