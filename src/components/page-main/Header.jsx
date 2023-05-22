function Header() {
    return(
        <div className="header flex justify-between mt-5 mb-3 text-dgreen font-normal text-xl">
            <div className="header-username">
                <p>Hello,</p>
                <h1 className="text-2xl/4 font-semibold">Nama User</h1>
            </div>
            <div className="header-date text-end">
                <p>Senin,</p>
                <h1 className="text-2xl/4 font-semibold">May 22 2023</h1>
            </div>
        </div>
    )
}

export default Header