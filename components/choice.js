export default function Choice ({choices,choice,removeChoice,removechoice}) {
    let index = choices.indexOf(choice) + 1 + "."; 

    return (
        <div>
            <div className="mr-2 inline-block">{index}</div>
            <label className="" htmlFor="name">{choice}</label>
            <button className={`text-purple-600 shadow rounded-sm w-4 ml-2 font-bold text-center y-auto ${removechoice === true ? "hidden" : ""}`} onClick={() => removeChoice(choice)}> x </button>
            <br></br>
        </div>
    )
}