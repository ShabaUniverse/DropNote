import React from "react";

const Home = () => {
  return (
    <div className=" px-5 md:pl-48 bg-teal-500 h-screen flex flex-col justify-center items-start">
      <h1 className=" text-blue-100 font-bold text-3xl">
        Welcome to <span className="text-white">DropNote</span> - <br /> Your
        Private Thoughts Space.
      </h1>
      <p className=" text-xl font-semibold text-blue-100 mt-10">
        <span className="text-white">DropNote</span> is more than just a
        platform. <br /> it's your personal sanctuary for thoughts, musings, and
        moments. <br /> In a world where privacy matters, <br />
        <span className="text-white">DropNote</span> empowers you to share your
        ideas, reflections, <br /> and snippets of your life securely.
      </p>
    </div>
  );
};

export default Home;
