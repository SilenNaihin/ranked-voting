export default function Choice ({choices,choice,removeChoice,moveUp,moveDown}) {
    let index = choices.indexOf(choice) + 1 + "."; 

    return (
        <div>
            <div className="mr-2 inline-block">{index}</div>
            <label className="" htmlFor="name">{choice}</label>
            <button className="text-green-600 shadow rounded-sm w-4 ml-6 font-bold text-center text-lg y-auto" onClick={() => moveUp(choice)}> + </button>
            <button className="text-red-600 shadow rounded-sm w-4 ml-2 font-bold text-center text-lg y-auto" onClick={() => moveDown(choice)}> - </button>
            <button className="text-purple-600 shadow rounded-sm w-4 ml-2 font-bold text-center y-auto" onClick={() => removeChoice(choice)}> x </button>
            <br></br>
        </div>
    )
}