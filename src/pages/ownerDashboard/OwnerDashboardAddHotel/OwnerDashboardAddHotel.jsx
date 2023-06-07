import LinksSwitchDashboard from "../../../components/LinksSwitchDashboard/LinksSwitchDashboard";
import OwnerDashboardAddHotelRight from "../../../components/OwnerDashboardAddHotelRight/OwnerDashboardAddHotelRight";
import SideBarDashboard from "../../../components/sideBarDashboard/SideBarDashboard";

const OwnerDashboardAddHotel = () => {
  return (
    <>
      <div
        className="owner-dashboard-hotel"
        style={{ height: "calc(100vh - 77.5px)" }}
      >
      <LinksSwitchDashboard/>
        <div className="row h-100 m-0 w-100">
          <SideBarDashboard />
          <OwnerDashboardAddHotelRight/>
        </div>
      </div>
    </>
  );
};

export default OwnerDashboardAddHotel;