import imgLogin from "../../images/people-traveling.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginApiCall } from "../../redux/apiCalls/authApiCall";
import {useDispatch} from "react-redux"

const LoginOwner = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formHandlerSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    if (password.length < 8) return toast.error("Minmum 8 characters");
    if (!password.includes(1,2,3,4,5,6,7,8,9,0)) return toast.error("At least one number");
    dispatch(loginApiCall({email, password}))
  };
  return (
    <>
      <div className="login-page">
        <div className="row h-100 w-100">
          <div className="col-5 d-none d-md-flex">
            <img src={imgLogin} className="img-fluid h-100" alt="" />
          </div>
          <div style={{padding:"145px 0px"}} className="col-12 ps-4 ps-md-2 col-md-7 d-block flex-column ps-3 align-items-center">
          <h1 className="text-center fw-bold">Login like an owner</h1>
            <form className="w-100" onSubmit={formHandlerSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                placeholder="Your email"
                  type="email"
                  id="email"
                  className="form-input mb-3"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                placeholder="Your password"
                  type="password"
                  id="password"
                  className="form-input mb-5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="form-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginOwner;
