import { doc, setDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

const Dashboard = () => {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [randomID, setRandomID] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const handlePost = async () => {
    setRandomID("");
    setCurrentDate("")
    // getting data from firebase firestore.
    const docRef = doc(db, "users", localStorage.currentUID);
    const docSnap = await getDoc(docRef);
    const existingData = docSnap.data();


    // this generated unique id
    const handleGenerator = () => {
      let initialForGenerator = "";
      const idLength = 10;
      for (let i = 0; i < idLength; i++) {
        let randomNumber = Math.floor(Math.random() * 10);
        initialForGenerator += randomNumber;
      }
      return initialForGenerator;
    };

    // gets the value of handleGenerator function
    // and sets to state.
    const generatedId = handleGenerator();
    setRandomID(generatedId);

    // getting todays date
    let today = new Date();
    let transformedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    setCurrentDate(transformedDate);

    // creating new post based on ID,TEXT,DATE
    const newPost = {
      id: generatedId, 
      text: noteText,
      author: localStorage.currentEmail,
      date: transformedDate,
    };

    // updates data in firebase, 
    // precisely updates the post keyvalue.
    setDoc(doc(db, "users", localStorage.currentUID), {
      ...existingData,
      posts: [...(existingData.posts || []), newPost],
    });
    setDataIsLoaded(false);
    console.log("post added");
  };

  

  // Use Effect---------------------------------------------------------

  useEffect(() => {
    const getPosts = async () => {
      const docRef = doc(db, "users", localStorage.currentUID);
      const docSnap = await getDoc(docRef);
      const snapshot = docSnap.data();
      setNotes(snapshot.posts);
      setDataIsLoaded(true);
    };
    if (dataIsLoaded === false) {
      getPosts();
    }
  }, [dataIsLoaded]);

  return (
    <div className=" pl-48">
      <h1 className=" text-gray-800 font-bold text-xl mb-10">Dashboard</h1>
      <h2>{currentDate}</h2>
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
        {notes.length === 0 ? (
          <p>no data yet</p>
        ) : (
          notes.map((item) => (
            <div
              className="note bg-blue-100 w-[500px] mb-10 px-5 py-2"
              key={item.id}>
              <p>{item.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
