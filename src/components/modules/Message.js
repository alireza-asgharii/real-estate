import React from "react";

const Message = ({ children, bg = "bg-gray-500", text }) => {
  return <p className={`rounded-md p-2 ${bg} ${text} w-full h-fit`}>{children}</p>;
};

export default Message;
