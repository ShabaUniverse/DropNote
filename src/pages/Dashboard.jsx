import React from "react";

const Dashboard = () => {
  return (
    <div className=" pl-48">
      <h1 className=" text-gray-800 font-bold">Dashboard</h1>

      <div className="post-area">
        <textarea
        placeholder="Type on to post..."
        className=" bg-blue-100 border-none outline-none px-5 py-1 w-[500px] h-[200px] resize-none" />
        <br />
        <button className=" bg-teal-400 px-5 py-1 text-white font-bold hover:bg-teal-500">Post</button>
      </div>
    </div>
  );
};

export default Dashboard;
