import LinksSwitchDashboard from "../../../components/LinksSwitchDashboard/LinksSwitchDashboard";
import OwnerDashoardRight from "../../../components/ownerDashboardRight/OwnerDashoardRight";
import SideBarDashboard from "../../../components/sideBarDashboard/SideBarDashboard";
import "./ownerDashboard.css"


const OwnerDashboard = () => {
    return ( 
        <>
            <div className="owner-dashboard">
            <LinksSwitchDashboard/>
                <div className="row h-100 m-0 w-100">
                    <SideBarDashboard/>
                    <OwnerDashoardRight/>
                </div>
            </div>
        </>
     );
}
 
export default OwnerDashboard;