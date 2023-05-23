import React from "react"

function Menubtn(props) {
    return (
        <div className="flex flex-col text-center mx-auto text-lyellow mt-3">
            <img className="bg-lyellow lg:h-28 lg:w-28 md:h-20 md:w-20 h-12 w-12 rounded-full" src={props.imgURL} alt={props.ALT}/>
            <p className="md:text-xl font-semibold ">{props.desc}</p>
        </div>
    )
}

export default Menubtn
