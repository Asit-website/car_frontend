"use client"
import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";


export default function ModalToggle({
  isToggled1,
  handleToggle1,
  handleToggle2,
  user , setUser
}) {

  const baseUrl = "http://localhost:4000";

  const [value, setValue] = useState({
    FullName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    AccountType: "User",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {   FullName,  Email,  Password,  confirmPassword,  AccountType} = value;

     if(Password !== confirmPassword){
        toast.error("Password do not match");
     }
    
    try {
        const response = await axios.post(`${baseUrl}/user/signin`, {
          FullName,
          Email,
          Password,
          confirmPassword,
          AccountType,
        });
    
    
        const data = await response?.data;
         if(data?.success){
            toast.success('Successfuly Register');
            handleToggle1(false);
            setUser(data);
         }
         else {
            toast.error(data?.message)
         }

    
      } catch (error) {
        if (error.response) {
                       toast.error(error?.response?.data?.message);
          } else if (error.request) {
          
            toast.error('Request error: No response received');
          } else {
         
            toast.error("Intenal server error ");
          }
      }
  };

  return (
    <>
      <div className={`modal fade ${isToggled1 ? "show d-block" : ""}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="content-re-lo">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleToggle1}
              />
              <div className="title">Register</div>
              <div className="register-form">
                <div className="respond-register-form">
                  <form
                    onSubmit={handleSubmit}
                    className="comment-form form-submit"
                  >
                    <fieldset>
                      <label>AccountType</label>
                     <select name="AccountType" onChange={handleChange} value={value.AccountType}>
                        <option value="User">User</option>
                        <option value="Seller">Seller</option>
                        <option value="Broker">Broker</option>
                        <option value="Admin">Admin</option>
                     </select>
                    </fieldset>

                    <fieldset>
                      <label>User name</label>
                      <input
                        onChange={handleChange}
                        value={value.FullName}
                        type="text"
                        className="tb-my-input"
                        name="FullName"
                        placeholder="User name"
                      />
                    </fieldset>

                    <fieldset>
                      <label>Email</label>
                      <input
                        onChange={handleChange}
                        value={value.Email}
                        type="email"
                        className="tb-my-input"
                        name="Email"
                        placeholder="Email"
                      />
                    </fieldset>

                    <fieldset>
                      <label>Password</label>
                      <input
                        onChange={handleChange}
                        value={value.Password}
                        type="password"
                        name="Password"
                        className="input-form password-input"
                        placeholder="Your password"
                      />
                    </fieldset>

                    <fieldset>
                      <label>Confirm password</label>
                      <input
                        name="confirmPassword"
                        onChange={handleChange}
                        value={value.confirmPassword}
                        type="password"
                        className="input-form password-input"
                        placeholder="Confirm password"
                      />
                    </fieldset>

                    <button className="sc-button" name="submit" type="submit">
                      <span>Sign Up</span>
                    </button>

                  </form>
                </div>
              </div>

              <div className="text-box text-center mt-30">
                Allready have an account?{" "}
                <a
                  className="color-popup "
                  data-bs-target="#exampleModalToggle2"
                  onClick={() => {
                    handleToggle1();
                    handleToggle2();
                  }}
                >
                  Login
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
      {isToggled1 && (
        <div className="modal-backdrop fade show" onClick={handleToggle1} />
      )}
    </>
  );
}
