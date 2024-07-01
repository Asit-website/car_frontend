"use client";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

const baseUrl = "http://localhost:4000";


export default function MyProfile() {

  const profilePic2 = {
    width: "100%",
    fontSize: "16px",
    lineHeight: "26px",
    fontWeight: 400,
    color: "#000000",
    border: "1px solid #EBEBEB",
    borderRadius: "5px",
    padding: "15px 25px",
    backgroundColor: "white",
  };

  const sc = {
    width: "250px",
  };
  
  const [user , setUser] = useState(null);

  

  const [userDetail, setUserDetail] = useState({
    AccountType: "",
    FullName: "",
    Email: "",
    ProfilePic: "",
    Phone: "",
    Location: "",
    Time: "",
    Description: "",
  });

  const changeHandler = async (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeHandler2 = async (e) => {
    const { name, files } = e.target;

    setUserDetail((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { AccountType, FullName, Email, ProfilePic, Phone, Location, Time, Description } = userDetail;
  
    if (!user) {
      alert("USER NOT LOGIN");
      return;
    }
  
    const formData = new FormData();
    formData.append('AccountType', AccountType);
    formData.append('FullName', FullName);
    formData.append('Email', Email);
    formData.append('ProfilePic', ProfilePic);  // Ensure ProfilePic is a File object
    formData.append('Phone', Phone);
    formData.append('Location', Location);
    formData.append('Time', Time);
    formData.append('Description', Description);
  
    try {
      const response = await axios.post(`${baseUrl}/user/updateProfile/${user?._id}`, formData);
  
      const data = response.data;
  
      if (data?.status) {
        localStorage.setItem('Car_user', JSON.stringify(data?.user));
        alert("Successfully updated");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Request error: No response received");
      } else {
        toast.error("Internal server error");
      }
    }
  };
  
  useEffect(() => {
    const car_user = JSON.parse(localStorage.getItem("Car_user"));
    setUser(car_user);

    setUserDetail(car_user);
  
}, []);

  return (
    <>
      <LayoutAdmin headerStyle={1} footerStyle={1}>
        <div className="row">
          <div className="col-md-6">
            <h4 className="title-dashboard">Create Profile</h4>
          </div>
        </div>
        <div className="show-dashboard">
          <span className="btn-show-dashboard">
            <i className="icon-th-list" />
            Show Dashboard
          </span>
        </div>
        <div className="table-listing-inventory">
          <form
          onSubmit={handleSubmit}
            method="post"
            className="comment-form form-submit"
            action="#"
            acceptCharset="utf-8"
          >
            <div className="row">
              <div className="col-md-6">
                <fieldset>
                  <label>Account</label>
                  <input
                    type="text"
                    value={userDetail?.AccountType}
                    name="AccountType"
                    onChange={changeHandler}
                    className="tb-my-input"
                  />
                </fieldset>
              </div>

              <div className="col-md-6">
                <fieldset>
                  <label>FullName</label>
                  <input
                    type="text"
                    value={userDetail?.FullName}
                    name="FullName"
                    onChange={changeHandler}
                    className="input-form password-input"
                  />
                </fieldset>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <fieldset>
                  <label>Email</label>
                  <input
                    type="email"
                    value={userDetail?.Email}
                    name="Email"
                    onChange={changeHandler}
                    className="tb-my-input"
                  />
                </fieldset>
              </div>

              <div className="col-md-6">
                <fieldset>
                  <label>Profile Pic</label>
                  <input
                    style={profilePic2}
                    name="ProfilePic"
                    onChange={changeHandler2}
                    type="file"
                    className="input-form password-input jk"
                  />
                </fieldset>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <fieldset>
                  <label>Phone</label>
                  <input
                    type="number"
                    value={userDetail?.Phone}
                    onChange={changeHandler}
                    name="Phone"
                    className="tb-my-input"
                  />
                </fieldset>
              </div>
              <div className="col-md-6">
                <fieldset>
                  <label>Location</label>
                  <input
                    type="text"
                    value={userDetail?.Location}
                    onChange={changeHandler}
                    name="Location"
                    className="input-form password-input jk"
                  />
                </fieldset>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <fieldset>
                  <label>Hours</label>
                  <input
                    type="time"
                    className="tb-my-input"
                    value={userDetail?.Hours}
                    onChange={changeHandler}
                    name="Hours"
                  />
                </fieldset>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <fieldset>
                  <label>Description</label>
                  <textarea
                    value={userDetail?.Description}
                    onChange={changeHandler}
                    name="Description"
                    style={{ background: "white" }}
                  ></textarea>
                </fieldset>
              </div>
            </div>

            <button
              style={sc}
              className="sc-button mt-5"
              name="submit"
              type="submit"
            >
              <span>Submit</span>
            </button>
          </form>
        </div>
      </LayoutAdmin>
    </>
  );
}
