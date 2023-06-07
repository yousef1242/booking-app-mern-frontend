import LinksSwitchDashboard from "../../../components/LinksSwitchDashboard/LinksSwitchDashboard";
import OwnerBookingDashboardRight from "../../../components/ownerBookingDashboardRight/OwnerBookingDashboardRight";
import SideBarDashboard from "../../../components/sideBarDashboard/SideBarDashboard";

const OwnerBooking = () => {
    return ( 
        <>
            <div className="owner-booking-dashboard" style={{height: "calc(100vh - 77.5px)"}}>
            <LinksSwitchDashboard/>
                <div className="row w-100 h-100">
                    <SideBarDashboard/>
                    <OwnerBookingDashboardRight/>
                </div>
            </div>
        </>
     );
}
 
export default OwnerBooking;