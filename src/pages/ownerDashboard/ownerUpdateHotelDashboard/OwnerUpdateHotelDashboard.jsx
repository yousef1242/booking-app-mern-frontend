import LinksSwitchDashboard from "../../../components/LinksSwitchDashboard/LinksSwitchDashboard";
import OwnerDashboardUpdateHotelRight from "../../../components/ownerUpdateHotelDashboardRight/OwnerUpdateHotelDashboardRight";
import SideBarDashboard from "../../../components/sideBarDashboard/SideBarDashboard";

const OwnerUpdateHotelDashboard = () => {
  return (
    <>
      <div
        className="owner-dashboard-update-hotel"
        style={{ height: "calc(100vh - 77.5px)" }}
      >
      <LinksSwitchDashboard/>
        <div className="row h-100 m-0 w-100">
          <SideBarDashboard />
          <OwnerDashboardUpdateHotelRight/>
        </div>
      </div>
    </>
  );
};

export default OwnerUpdateHotelDashboard;
