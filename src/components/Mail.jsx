import React from "react";
import { BiArchiveIn } from "react-icons/bi";
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdDeleteOutline,
  MdOutlineReport,
  MdOutlineMarkEmailUnread,
  MdOutlineWatchLater,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { motion } from "framer-motion";

const Mail = () => {
  const navigate = useNavigate();
  const {selectedEmail} = useSelector(store=>store.appSlice);
  const params = useParams();

  const deleteMailById = async (id) => {
    try {
      await deleteDoc(doc(db, "emails", id));
      navigate("/");
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex-1 bg-white rounded-xl mx-5"
    >
      <motion.div
        className="flex items-center justify-between px-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <motion.div
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="p-2 rounded-full cursor-pointer"
          >
            <IoMdArrowBack size={"20px"} />
          </motion.div>
          {[BiArchiveIn, MdOutlineReport, MdDeleteOutline, MdOutlineMarkEmailUnread, MdOutlineWatchLater, MdOutlineAddTask, MdOutlineDriveFileMove, IoMdMore].map((Icon, index) => (
            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
              whileTap={{ scale: 0.95 }}
              key={index}
              onClick={Icon === MdDeleteOutline ? () => deleteMailById(params.id) : undefined}
              className="p-2 rounded-full cursor-pointer"
            >
              <Icon size={"20px"} />
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full"
          >
            <MdKeyboardArrowLeft size={"20px"} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full"
          >
            <MdKeyboardArrowRight size={"20px"} />
          </motion.button>
        </div>
      </motion.div>
  
      <motion.div
        className="h-[90vh] overflow-y-auto p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between bg-white gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium"> {selectedEmail?.subject} </h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">inbox</span>
          </div>
          <div className="flex-none text-gray-400 my-5 text-sm">
            <p> {new Date(selectedEmail?.createdAt?.seconds * 1000).toUTCString()} </p>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          <h1> {selectedEmail?.to} </h1>
          <span>to me</span>
        </div>
        <div className="my-10">
          <p> {selectedEmail?.message} </p>
        </div>
      </motion.div>
    </motion.div>
  );
  
};

export default Mail;
