function Imagebox(props) {
    return(
        <div className="img-box bg-dgreen w-150px aspect-video rounded-xl">
            <img src={props.imgURL} alt=""/>
        </div>
    )
}

export default Imagebox