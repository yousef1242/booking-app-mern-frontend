import "./secondPartHomePage.css"
import img from "../../images/travel-concept-with-worldwide-landmarks.jpg"



const SecondPartHomePage = () => {
    return ( 
        <>
            <div className="second-pard-home-page">
                <div className="container">
                    <div className="row w-100 m-0">
                        <div className="col-12 col-md-6">
                            <img className="img-fluid" src={img} alt="" />
                        </div>
                        <div className="col-12 col-md-6">
                            <h1>Book now.</h1>
                            <h1>Explore more places.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default SecondPartHomePage;