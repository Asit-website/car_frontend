
import LayoutAdmin from "@/components/layout/LayoutAdmin"
export default function MyProfile() {

    const profilePic = {
        width:"100%",
        fontSize:"16px",
        lineHeight:"26px",
        fontWeight:400,
        color:"#000000",
        border:"1px solid #EBEBEB",
        borderRadius:"5px",
        padding:"15px 25px",
        backgroundColor:"white"
    }

    const sc = {
        width:"250px"
    }

    const updateUser = async ({userId, FullName, Email, phone,AccountType ,location,description,Time}) => {

        let formdata = new FormData();
        formdata.append('FullName', FullName);
        formdata.append('Email', Email);
        formdata.append('phone', phone);
        formdata.append('AccountType', AccountType);
        formdata.append('location', location);
        formdata.append("description",description);
        formdata.append("Time",Time);
        const token = localStorage.getItem('Car_token');
    
        console.log("userId" ,userId);
    
        const resp = await fetch(`${baseUrl}/user/updateUser/${userId}`, {
          method: 'PUT',
          headers: {
            // 'token': localStorage.getItem('b2b_token')
            'Authorization': `Bearer ${token}`
          },
          body: formdata
        });
        const data = await resp.json();
    
        return data;
      };

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
                     
                        className="tb-my-input"
                        name="Email"
                     
                      />
                    </fieldset>
                    </div>
                    <div className="col-md-6">
                    <fieldset>
                      <label>FullName</label>
                      <input
                        type="text"
                        name="Password" 
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
                     
                        className="tb-my-input"
                        name="Email"
                     
                      />
                    </fieldset>
                    </div>
                    <div className="col-md-6">
                    <fieldset>
                      <label>Profile Pic</label>
                      <input
                        style={profilePic}
                        type="file"
                        name="Password" 
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
                     
                        className="tb-my-input"
                        name="Email"
                     
                      />
                    </fieldset>
                    </div>
                    <div className="col-md-6">
                    <fieldset>
                      <label>Location</label>
                      <input
                        type="text"
                        name="Password" 
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
                        name="Email"
                     
                      />
                    </fieldset>
                    </div>
                  
                    </div>
                    <div className="row mt-3">
                    <div className="col-md-12">
                    <fieldset>
                      <label>Description</label>
                      <textarea style={{background:"white"}}></textarea>
                    </fieldset>
                    </div>
                  
                    </div>

                    <button style={sc} className="sc-button mt-5" name="submit" type="submit">
                      <span>Submit</span>
                    </button>

                  </form>
                </div>
            </LayoutAdmin>
        </>
    )
}