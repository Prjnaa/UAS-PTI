import React, { useState, useEffect } from 'react';

function Username() {
    const [user, setUser] = useState();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    let usernm = "";

    if (user && user.displayName) {
        usernm = user.displayName;
    } else if (user && user.email) {
        const email = user.email;
        usernm = email.split('@')[0];
        usernm = usernm.charAt(0).toUpperCase() + usernm.slice(1)
    }

    return <h1 className="2xl:text-3xl/6 xl:text-xl flex flex-wrap font-semibold">{usernm}</h1>;
}

export default Username;
