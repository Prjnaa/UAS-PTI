import React, { useEffect, useState } from "react"

function Header() {
    const [user,setUser] = useState();
    
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')));
    },[])

    const date = new Date();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let day = date.getDay();
    let month = date.getMonth()
    let currDay = days[day];
    let currMonth = months[month];


    return(
        <div className="header bg-lgreen sticky top-0 flex justify-between pb-5 pt-3 text-dgreen font-normal text-xl">
            <div className="header-username">
                <p className="tracking-wider">Hello,</p>
                <h1 className="text-3xl/6 font-semibold">{user?.email}</h1>
            </div>
            <div className="header-date text-end">
                <p className="wider">{currDay},</p>
                <h1 className="text-2xl/6 font-semibold">{currMonth} {date.getDate()} {date.getFullYear()}</h1>
            </div>
        </div>
    )
}

export default Header