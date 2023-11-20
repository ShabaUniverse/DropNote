import { doc, setDoc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";

const Dashboard = () => {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [randomID, setRandomID] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [deleteProcess, setDeleteProcess] = useState(false);


  // POSTING --------------------------------------------------------
  const handlePost = async () => {
    setRandomID("");
    setCurrentDate("");
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
    let transformedDate = `${today.getDate()}-${
      today.getMonth() + 1
    }-${today.getFullYear()}`;
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
    setNoteText("");
    console.log("post added");
  };

  // DELETING ------------------------------------------------------
  const handleDelete = async (id) => {
    setDeleteProcess(true);
    const docRef = doc(db, 'users', localStorage.currentUID);
    const docSnap = await getDoc(docRef);
    const snapshot = docSnap.data();
    const posts = snapshot.posts;
    let filteredPosts = posts.filter(item => item.id !== id);
    
    setDoc(doc(db, 'users', localStorage.currentUID), {
      ...snapshot,
      posts: filteredPosts
    })

    setDeleteProcess(false);
    console.log("post deleted")
  }

  // Use Effect---------------------------------------------------------

  useEffect(() => {
    const getPosts = async () => {
      const docRef = doc(db, "users", localStorage.currentUID);
      const docSnap = await getDoc(docRef);
      const snapshot = docSnap.data();
      setNotes(snapshot.posts.reverse());
      setDataIsLoaded(true);
    };
    if (dataIsLoaded === false || deleteProcess === false) {
      getPosts();
    }
  }, [dataIsLoaded, deleteProcess]);





  return (
    <div className=" pl-48">
      <h1 className=" text-gray-800 font-bold text-xl mb-10">Dashboard</h1>
      {/* post input */}
      <div className="post-area">
        <textarea
          placeholder="What you wanna share today...?"
          className=" bg-blue-100 border-none outline-none px-5 py-1 w-[500px] h-[150px] resize-none rounded-md"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <br />
        <button
          className=" bg-teal-400 px-5 py-1 text-white font-bold hover:bg-teal-500 rounded-md"
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
              className="note bg-blue-100 w-[500px] mb-10 px-5 py-2 rounded-md grid grid-cols-8"
              key={item.id}>
              <div className=" leftside col-span-7">
                <p className=" font-medium">{item.text}</p>
                <span className=" text-white text-sm font-semibold">
                  {item.date}
                </span>
              </div>

              <div className="rightside col-span-1 flex justify-end items-start">
                <svg
                  onClick={() => handleDelete(item.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  width="15px"
                  height="15px"
                  fill="white"
                  cursor="pointer"
                  viewBox="0 0 109.484 122.88"
                  enableBackground="new 0 0 109.484 122.88"
                  xmlSpace="preserve">
                  <g>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
