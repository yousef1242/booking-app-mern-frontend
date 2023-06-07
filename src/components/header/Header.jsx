import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutApiCall } from "../../redux/apiCalls/authApiCall";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar className=" navbar- py-3" expand="md">
        <Container>
          <Link className="logo-link" to={`/`}>
            Booking App
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className=" mt-3 mt-md-0" id="basic-navbar-nav">
            <Nav className="ms-auto  align-items-start align-items-md-center">
              {!user && (
                <>
                  <Link
                    className="link-user login-link w-100 mb-3 mb-md-0"
                    to={`/login`}
                  >
                    Login
                  </Link>
                  <Link
                    className="link-user register-link w-100"
                    to={`/signup`}
                  >
                    Register
                  </Link>
                </>
              )}
              {user && (
                <React.Fragment>
                  <span className=" fw-semibold mb-3 mb-md-0 me-0 me-md-3 fs-5 text-capitalize">
                    {user?.username}
                  </span>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2, marginLeft: 0 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar
                          src={
                              user?.userImage?.url
                          }
                          sx={{ width: 32, height: 32 }}
                        ></Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Link
                        className="link-user-info"
                        to={`/profile/${user?.id}`}
                      >
                        my account
                      </Link>
                    </MenuItem>
                    {!user?.isHotelOwner ? (
                      <>
                        <MenuItem>
                          <Link
                            className="link-user-info"
                            to={`/my-booking/${user?.id}`}
                          >
                            my booking
                          </Link>
                        </MenuItem>
                      </>
                    ) : (
                      <MenuItem>
                        <Link
                          className="link-user-info"
                          to={`/owner/dashboard`}
                        >
                          dashboard
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        dispatch(logoutApiCall());
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
