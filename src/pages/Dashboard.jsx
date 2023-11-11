import { doc, setDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

const Dashboard = () => {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false)

  // Handle post----------------------------------------------------------
  const handlePost = async () => {
    const docRef = doc(db, "users", localStorage.currentUID);
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.data();
    console.log("post added");

    const newPost = {
      text: noteText,
      author: localStorage.currentEmail
    }

    setDoc(doc(db, 'users', localStorage.currentUID), {
      ...existingData,
      posts: [...existingData.posts || [], newPost]
    })
    setDataIsLoaded(false);
  };

  // Use Effect---------------------------------------------------------

  useEffect(() => {
    const getPosts = async () => {
      const docRef = doc(db, "users", localStorage.currentUID);
      const docSnap = await getDoc(docRef);
      const snapshot = (docSnap.data());
      setNotes(snapshot.posts);
      setDataIsLoaded(true);
    }
    if(dataIsLoaded === false){
      getPosts();
    }
  }, [dataIsLoaded]);

  return (
    <div className=" pl-48">
      <h1 className=" text-gray-800 font-bold text-xl mb-10">Dashboard</h1>
      {/* post input */}
      <div className="post-area">
        <textarea
          placeholder="Type on to post..."
          className=" bg-blue-100 border-none outline-none px-5 py-1 w-[500px] h-[150px] resize-none"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <br />
        <button
          className=" bg-teal-400 px-5 py-1 text-white font-bold hover:bg-teal-500"
          onClick={handlePost}>
          Post
        </button>
      </div>

      {/* notes */}
      <div className="notes mt-10">
        <h3 className=" text-teal-400 font-semibold">My Notes</h3>
        {
          notes.length === 0 ? <p>no data yet</p> : notes.map((item) => (
            <p>{item.text}</p>
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
