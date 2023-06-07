import Errorimg from "../../images/error.jpg"



const ErrorPage = () => {
    return ( 
        <>
            <div className="error-page" style={{height:"calc(100vh - 77.5px)"}}>
                <div className="container flex-column h-100 d-flex justify-content-center align-items-center">
                    <div className="image-div mb-4 text-center" style={{height:"300px",width:"100%"}}>
                        <img className="img-fluid h-100" style={{objectFit:"cover"}} src={Errorimg} alt="" />
                    </div>
                    <div className="text-div">
                    <h1 style={{fontSize:"45px"}}>We can’t seem to find the page you’re looking for</h1>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default ErrorPage;