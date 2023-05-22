import React from "react"

function Menubtn(props) {
    return (
        <div className="menubtn">
            <img src={props.imgURL}/>
            <p>{props.desc}</p>
        </div>
    )
}

export default Menubtn
