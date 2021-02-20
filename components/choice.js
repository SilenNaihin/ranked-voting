export default function Choice ({choices,choice,removeChoice,moveUp,moveDown,hidden,voting,removechoice}) {
    let index = choices.indexOf(choice) + 1 + "."; 

    return (
        <div>
            <div className="mr-2 inline-block">{index}</div>
            <label className="" htmlFor="name">{choice}</label>
            {/* If the url is a voting url then the remove is hidden. If it is a maker then only the remove is shown.*/}
            <button className={`text-green-600 shadow rounded-sm w-4 ml-6 font-bold text-center text-lg y-auto ${voting === false ? "hidden" : ""} ${hidden === true ? "hidden" : ""}`} onClick={() => moveUp(choice)}> + </button>
            <button className={`text-red-600 shadow rounded-sm w-4 ml-2 font-bold text-center text-lg y-auto ${voting === false ? "hidden" : ""} ${hidden === true ? "hidden" : ""}`} onClick={() => moveDown(choice)}> - </button>
            <button className={`text-purple-600 shadow rounded-sm w-4 ml-2 font-bold text-center y-auto ${voting === true ? "hidden" : ""} ${removechoice === true ? "hidden" : ""}`} onClick={() => removeChoice(choice)}> x </button>
            <br></br>
        </div>
    )
}