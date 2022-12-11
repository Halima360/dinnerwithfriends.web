import React, {useState, useEffect} from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import avatar from "../../assets/img/Avatar.png";
import SettingsFooter from "../../components/settingsPage/setFooter";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {Link, useNavigate} from "react-router-dom"
import "./profileTwo.css";
import CreateEventNavbar from "../../components/CreateEvent/CreateEventNavbar";
import userServices from "../../services/userServices.js";

const UserProfile = () => {
  const [isSubmit, setIsSubmit] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailure, setIsFailure] = useState(false);
  const [formError, setFormError] = useState({});
  const [validEmail, setValidEmail] = useState(false);
  const [user, setUser] = useState({
		
		name: '',
    email: '',
    birthday:'' ,
		gender: '',
		mobile: '',
	});

	const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
  
  const navigate = useNavigate()

  useEffect(() => {
		if (Object.keys(formError).length === 0) {
			setValidEmail(true);
		}


    if (Object.keys(formError).length !== 0) {
			setIsSubmit(false);
      
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formError]);
  useEffect(() => {
		


    if (Object.keys(formError).length !== 0) {
			setIsSubmit(false);
      
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formError]);
  const validate = (values) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		const errors = {};

		if (!regex.test(values)) {
			errors.email = "This is not a valid email format!";
			setValidEmail(false);
		} else {
			setValidEmail(true);
		}
		return errors;
	};

  const fetchData = async() => {
    const data = await userServices.getUser()
    
    setUser(data)
  }
  useEffect(() => {
   
    fetchData(); 
  }, [])
  
  const updateAccount = async(e) => {
    setIsSubmit(true)
    fetchData() 
    e.preventDefault()
    setFormError(validate(user.email));
    const data = await userServices.updateUser(user)
    if (data.status === "fail") {
      setIsSubmit(false);
      setIsFailure(true);
    }

   

		if (data.status === "success" && validEmail === false ) {
      setUser(data)
			setIsSuccess(true);
	    setIsSubmit(false)

      setTimeout(() => {
        setIsSuccess(false)
        setIsFailure(false)
        navigate('/profile')
       }, 2000);

		}
  }

  const errorMsg = () => {
		let element;
		if (isSuccess) {
			element = (
				<p className='mt-4 text-xl text-green-600 text-center'>
					Profile successfully updated!
				</p>
			);
		} else if (isFailure) {
			element = (
				<p className='mt-4 text-xl text-red-600 text-center'>
					Profile update failed, try again!
				</p>
			);
		}
		return element;
	};

  return (
    <div>

      <CreateEventNavbar />

      <div id="main-body">
        <div className="body_title_wrapper">
        <Link to="/settings">  <div className="body_title">
            <MdOutlineArrowBack />
           <h1>Account Settings</h1>
          </div></Link>
          <div className="body_subtitles">
            <h5>Profile</h5>
            <Link to='/notification'><span className="notification_tab">Notifications</span></Link>
          </div>
        </div>
        <p>{errorMsg()}</p>
        <div className="user_details_field">
      
          <div className="avatar_fullName">
            <img src={avatar} alt="" className="avatar" />
            <div className="fullName">
              <h1>Change Profile photo</h1>
              <p>Recommended Square JPG,</p>
              <p>PNG, at least 1000 x 1000 photo</p>
            </div>
          </div>
        </div>

        <div className="the-container">
          <form action="#" onSubmit={updateAccount}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input  type="name" onChange={onChange} value={user.name} name="name" placeholder="Femi Femo" required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email" onChange={onChange} value={user.email} 
                  name="email" placeholder="femiodeyinka@examplemail.com"
                  required
                />
                 <small className='text-red-500'>{formError.email}</small>
              </div>
            </div>
            
            <div className="user-details">
              <div className="input-box">
                <span className="details">Mobile Number</span>
                <input type="tel" onChange={onChange} value={user.mobile} name="mobile" placeholder="+234 801 234 5678" required />
              </div>
              <div className="input-box">
                <span className="details">Birthday</span>
                <div className="date_input">
                  <input type="date" onChange={onChange} value={user.birthday} name="birthday" />
                </div>
              </div>
              
            </div>
            
            <div className="user-details">
              <div className="input-box">
                <span className="details">Gender</span>
                <select
                  type="select" onChange={onChange} value={user.gender} name="gender"
                  placeholder="Femi Femo"
                  className="select"
                >
                  <option disabled value=''>Select gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              </div>
             
            </div>
        
            <div className="edit-btn">
              <button type="submit" className="edit_btn" >
                {isSubmit?'loading ...': 'Save'} 
              </button>

            </div>
          </form>
        </div>

        
      </div>
      <SettingsFooter className="settings-footer" />
      <div id="main_footer">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;