import LinksSwitchDashboard from "../../../components/LinksSwitchDashboard/LinksSwitchDashboard";
import OwnerHotelDashboardRight from "../../../components/OwnerHotelDashboardRight/OwnerHotelDashboardRight";
import SideBarDashboard from "../../../components/sideBarDashboard/SideBarDashboard";

const OwnerHotelDashboard = () => {
  return (
    <>
      <div
        className="owner-dashboard-hotel"
        style={{ height: "calc(100vh - 77.5px)" }}
      >
      <LinksSwitchDashboard/>
        <div className="row h-100 m-0 w-100">
          <SideBarDashboard />
          <OwnerHotelDashboardRight />
        </div>
      </div>
    </>
  );
};

export default OwnerHotelDashboard;
