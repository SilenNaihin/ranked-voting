import Choice from "../components/choice";
import {useState} from "react";

export default function Home() {
  const [choices, setChoices] = useState([]);
  const [inputtext, setinputtext] = useState("");
  const [errorelement, setErrorElement] = useState("Add Choice");

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
    // add choices to firebase
  }

  return (
    <div className="mx-96 mt-26 w-96s h-96 mt-24">
      <input className="border rounded mr-5 pl-2" type="text" value={inputtext} onChange={e => setinputtext(e.target.value)}/>
      <button className={`border rounded px-3 ${errorelement === "Add Choice" ? "text-black" : "text-red-600"}`} onClick={onSubmit}>{errorelement}</button>

      <div className="mt-4">
        {choices.map(choice => (
          <Choice key={choice} choice={choice} choices={choices} removeChoice={removeChoice} moveUp={moveUp} moveDown={moveDown}/>
        ))}
      </div>
      <button className='border rounded px-3 mt-4' type="submit" onClick={sendData}>Create Poll</button>
    </div>    
  )
}

  