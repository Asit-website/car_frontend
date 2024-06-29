import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

export default function ModalToggle2({
  handleToggle1,
  isToggled2,
  handleToggle2,
  handleToggle3, setUser
}) {

  const baseUrl = "http://localhost:4000";

  const [value, setValue] = useState({
    Email: "",
    Password: "",
  
  });

  const router = useRouter();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const {  Email, Password } = value;

    try {
      const response = await axios.post(`${baseUrl}/user/login`, {
        Email,
        Password, 
      });

      const data = await response?.data;


      if (data?.status) {
        toast.success("Successfuly Login");
        handleToggle1(false);
        handleToggle2(false);
        localStorage.setItem("Car_token" , data?.token);
        localStorage.setItem('Car_user', JSON.stringify(data?.user));
        setUser(data?.user);
        // router.push('/',{scroll:false});
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error?.response?.data?.message);
      } else if (error.request) {
        toast.error("Request error: No response received");
      } else {
        toast.error("Intenal server error ");
      }
    }
  };

  return (
    <>
      <div className={`modal fade ${isToggled2 ? "show d-block" : ""}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="content-re-lo">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleToggle2}
              />
              <div className="title">Login</div>

              <div className="register-form">

                <div className="respond-register-form">

                  <form
                    method="post"
                    className="comment-form form-submit"
                    action="#"
                    onSubmit={handleSubmit}
                    acceptCharset="utf-8"
                  >
                    <fieldset>
                      <label>Account</label>
                      <input
                        type="email"
                        onChange={handleChange}
                        className="tb-my-input"
                        name="Email"
                        placeholder="Email or user name"
                        value={value.Email}
                      />
                    </fieldset>

                    <fieldset>
                      <label>Password</label>
                      <input
                        type="password"
                        name="Password" 
                        onChange={handleChange}
                        value={value.Password}
                        className="input-form password-input"
                        placeholder="Your password"
                      />
                    </fieldset>

                    <div className="title-forgot t-al-right mb-20">
                      <a
                        className="t-al-right"
                        data-bs-target="#exampleModalToggle3"
                        onClick={() => {
                          handleToggle2();
                          handleToggle3();
                        }}
                      >
                        Forgot password
                      </a>
                    </div>

                    <button onClick={() => router.push('/')} className="sc-button" name="submit" type="submit">
                      <span>Login</span>
                    </button>

                  </form>
                </div>
              </div>
              <div className="text-box text-center mt-30">
                Don’t you have an account?{" "}
                <a
                  className="color-popup"
                  data-bs-target="#exampleModalToggle"
                  onClick={() => {
                    handleToggle1();
                    handleToggle2();
                  }}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isToggled2 && (
        <div className="modal-backdrop fade show" onClick={handleToggle2} />
      )}
    </>
  );
}
