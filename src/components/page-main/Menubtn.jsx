import React from "react"

function Menubtn(props) {
    return (
        <div className="flex flex-col text-center mx-auto text-lyellow mt-3">
            <img className="bg-lyellow md:h-28 md:w-28 h-16 w-16 rounded-full" src={props.imgURL}/>
            <p className="md:text-xl font-semibold ">{props.desc}</p>
        </div>
    )
}

export default Menubtn
