import React, { useState } from "react";

const Dashboard = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [note, setNote] = useState({
    text: "",
    author: "Shabdan",
    date: null,
  });

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const submitNote = () => {
    setAllPosts([...allPosts, note]);
  };

  console.log(allPosts);

  return (
    <div className=" pl-48">
      <h1 className=" text-gray-800 font-bold text-xl mb-10">Dashboard</h1>
      {/* post input */}
      <div className="post-area">
        <textarea
          placeholder="Type on to post..."
          className=" bg-blue-100 border-none outline-none px-5 py-1 w-[500px] h-[150px] resize-none"
          value={note.text}
          onChange={(e) =>
            setNote({ ...note, text: e.target.value, date: formattedDate })
          }
        />
        <br />
        <button
          className=" bg-teal-400 px-5 py-1 text-white font-bold hover:bg-teal-500"
          onClick={submitNote}>
          Post
        </button>
      </div>

      {/* posts */}
      <div className="posts mt-10">
        <h3 className=" text-teal-400 font-semibold">My Notes</h3>
        {allPosts.length < 1 ? (
          <p>no posts yet</p>
        ) : (
          allPosts.map((post) => (
            <div className="bg-blue-100 w-[300px] mb-5">
              <p className=" ml-4">{post.text}</p>
              <div className=" bg-teal-400">
                <p className="text-sm">{post.author}</p>
                <p className="text-sm text-white">{post.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
