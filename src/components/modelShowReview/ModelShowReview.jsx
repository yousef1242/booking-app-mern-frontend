import "./modelShowReview.css"


const ModelShowReview = ({ reviewDes, setOpenReview }) => {
    return ( 
        <>
            <div className="model-show-review">
                <div className="review-div-section">
                    <div className="header-title">
                        <h3>About this review</h3>
                        <i onClick={() => setOpenReview(false)} className="bi bi-x"></i>
                    </div>
                    <p className="p-review">{reviewDes}</p>
                </div>
            </div>
        </>
     );
}
 
export default ModelShowReview;