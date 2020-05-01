import React from 'react';
import { Link} from 'react-router-dom';

function Error() {
    
    //Style for the Error Page
    const cover = { backgroundColor : "black", height : "100vh" , width : "100%" , position : "absolute" , overflow: "hidden"};
    const Image = { float : "right",width : "400px" , height : "400px" }

    return (
        <div style={cover}>
        <div>
         <h1 style={{ marginTop : "75px", fontSize : "75px" ,color : "#f6d200", textAlign : "center"}}>403</h1>   
        <h1 style={{textAlign : "center" ,  color : "#f6d200"}}>CAUTION !!</h1>
        <h2 style={{color : "#f6d200", textAlign : "center"}}>Access Denied</h2>
        <Link to="/">
        <h4 style={{marginTop: "50px", color : "#f6d200", textAlign : "center"}}>Back to Home</h4>
        </Link>
        </div>
        <div>
        <img style={Image} src="https://www.wallpapermania.eu/images/lthumbs/2012-11/3787_The-door-to-the-red-room-HD-scary-wallpaper.jpg" alt=""/> 
        </div>
        </div>
    );
  }


  export default Error;