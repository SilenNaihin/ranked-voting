import Choice from "../components/choice";
import {useState, useEffect} from "react";
import uuid from 'react-uuid';

const uniqueLink =  uuid()

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [inputtext, setinputtext] = useState("");
  const [errorelement, setErrorElement] = useState("Add Choice");
  const [createpoll, setCreatePoll] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [voting, setVoting] = useState(false);
  let url = `https://ranked-voting.vercel.app/${uniqueLink}`;

  useEffect(()=> {
    if (url == window.location.href){
      setVoting(true)
    }
  });

  function removeChoice (choice) {
      setChoices(choices.filter(c => c !== choice))
  }

  function onSubmit () {
      if (choices.includes(inputtext)){
        setErrorElement("Choice Already Exists!")
      } else if (inputtext === "") { 
        setErrorElement("Enter Something")
      } else {
        setChoices([...choices, inputtext])
        setErrorElement("Add Choice")
      }  
  }

  function moveUp (choice) {
    let addIn = choices.indexOf(choice);
    let string = choices[choices.indexOf(choice)];
    let newChoices = choices.slice(0);
    newChoices.splice(addIn,1)
    newChoices.splice(addIn - 1,0,string)
    setChoices(newChoices)
  }

  
  function moveDown (choice) {
    let addIn = choices.indexOf(choice);
    let string = choices[choices.indexOf(choice)];
    let newChoices = choices.slice(0);
    newChoices.splice(addIn,1)
    newChoices.splice(addIn + 1,0,string)
    setChoices(newChoices)
  }

  
  function sendData () {
    setCreatePoll(false)
    setHidden(true)
    

    // block the input
    // block the ability to execute moveUp, moveDown, remove
    // set Id to uniqueLink

    // pull existing values
    // push choices #s to firebase

  }

  return (
    <>
    <div className="text-center text-5xl bold mt-24">Ranked Voting</div>
    <div className="text-center mt-26 w-96s h-96 mt-24">
      <input className={`border rounded mr-5 pl-2 ${voting === true ? "hidden" : ""} ${hidden === true ? "hidden" : ""}`} placeholder="Start typing..." type="text" value={inputtext} onChange={e => setinputtext(e.target.value)}/>
      <button className={`border rounded px-3 ${voting === true ? "hidden" : ""} ${hidden === true ? "hidden" : ""} ${errorelement === "Add Choice" ? "text-black" : "text-red-600"}`} onClick={onSubmit}>{errorelement}</button>

      <div className="mt-4">
        {choices.map(choice => (
          <Choice key={choice} choice={choice} choices={choices} removeChoice={removeChoice} moveUp={moveUp} moveDown={moveDown} hidden={hidden} voting={voting}/>
        ))}
      </div>
      {createpoll ? (
        <button className={`border rounded px-3 mt-4 text-center mx-auto ${choices.length < 2 ? 'hidden' : ''}`} type="submit" onClick={sendData}>Create Poll</button>
      ) : (
        <div className="mt-4 mx-auto">Send this link to your friends: {url}</div>
      )}
    </div>    
    </>
  )
}

  