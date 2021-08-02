import react, { useCallback, useEffect, useState } from 'react';
import welcome from './Images/welcome.svg';
import cloudy from './Images/clouds.png';
import London from './Images/london.jpg';
import Montreal from './Images/mentreal.jpg';
import Milano from './Images/milano.jpg';
import Paris from './Images/paris.jpg';
import Japan from './Images/japan.jpg';
import Tajmahal from './Images/tajmahal.jpeg';
import Promo from './Images/promo.png';

import './App.css';

const initialuserData = {
  yourname: "",
  contact: "",
  email: "",
};

function App() {
  const [showweatherData, setShowweatherData] = useState([])
  const countyImages = [{ img: London, name: "London" }, { img: Paris, name: "Paris" }, { img: Milano, name: "Milano" }, { img: Montreal, name: "Montreal" }, { img: Japan, name: "Japan" }, { img: Tajmahal, name: "Tajmahal" }]
  const [userData, setUserData] = useState(initialuserData);
  const emailRegex = /\S+@\S+\.\S+/;
  const phoneNo = /^([0-9][0-9]{9})$/;
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [inputname, setInputname] = useState()
  const [required, setRequired] = useState(false)
  const [emptydata, setEmptydata] = useState([])
  const [successmsg, setSuccessmsg] = useState(false)

  useEffect(() => {
    disweatherplaydata()
  }, [successmsg])

  const validation = (name, value) => {
    console.log(name, value, "value")
    if (name === "email") {
      if (emailRegex.test(value)) {
        setInputname("")
      } else {
        setIsValid(false);
        setInputname(name)
        setMessage('Please enter a valid email!');
      }
    }

    if (name === "contact") {
      if (phoneNo.test(value)) {
        setInputname("")
      } else {
        setIsValid(false);
        setInputname(name)
        setMessage('Please enter 10 digit');
      }
    }
  }

  setTimeout(function () {
    setSuccessmsg(false)
  }, 3000);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (emptydata.length > 0) {
      emptydata.map((data, i) => {
        if (name === data) {
          delete emptydata[i];
        }
      })
    }
    validation(name, value)
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const disweatherplaydata = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch("https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576", requestOptions)
      .then((response) => response.json())
      .then(
        res => {
          setShowweatherData(res.result)
        }
      )
  }

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    Object.keys(initialuserData).map((data, i) => {
      if (userData[data] === "") {
        emptydata.push(data)
        setRequired(true)
      }
      return
    });
    if (!Object.keys(initialuserData).every((tr) => userData[tr] !== "")) {
      return
    }
    setSuccessmsg(true)
    setUserData(initialuserData)
  }, [userData, emptydata])

  return (
    <div className="App">
      <div className="header">
        <div>Book now to get exciting travel deals.Upto 40% off on credit card payments</div>
        <div>Offers ends in 1d 10h 5m 10s</div>
      </div>
      <div className="headerMenus">
        <div className="menuList">
          <div>WEATHER</div>
          <div>DESTINATIONS</div>
          <div>GET A QUOTE</div>
        </div>
      </div>
      <div className="welcomeContent">
        <div className="imageContent"><img alt="" src={welcome} className="welcomeImage" /></div>
        <div className="welcomeLines">
          <div className="slogans">Life is Short</div>
          <div className="slogans">and the world  is wide!</div>
          <div className="statement">Stay at the comfort of your homesand book a trip to travel after the post pandemic era.</div>
          <div className="playTripbtn">PLAN A TRIP</div>
        </div>
      </div>
      <div className="channelCotent">
        <div className="weatheChannel"><div className="weathershow">THE WEATHER CHANNEL</div> </div>
      </div>
      <div className="channelCotent">
        <div className="weatherDetails">
          {showweatherData && showweatherData.map((data, i) => {
            let classkey = "showweatherData"
            return (
              <div className={classkey + i}>
                <div className="cityName">{data.city}</div>
                <img alt="" src={cloudy} className="cloudView" />
                <div className="temp_Celsius">{data.temp_Celsius + "°"}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="destinationTitle">Featured Destinations</div>
      <div className="countryShow">
        <div className="imageContainer">
          {countyImages.map((val) => {
            return (
              <div>
                <img alt="" src={val.img} className="imageview" />
                <div className="countryName">{val.name} </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="promoImage">
        <img alt="" src={Promo} />
        <div className="promoinsde">
          <div className="promoTitle">PLAN A TRIP</div>
          <div className="promoSatetement">Make your vaction the most memorable one </div>
        </div>
      </div>
      <div className="inputMainContainer">
        <div className="inputContainer">
          <div className="quotesTitle">Travelling as a group? Get a Quote</div>
          <div className="inputrow">
            <label className="labelView">Your Name</label>
            <div><input type="text" className={emptydata.includes("yourname") ? "inputboxvalid" : "inputField"} name={"yourname"} value={userData.yourname} onChange={handleInputChange} />
              <div>{emptydata.includes("yourname") && <div className="errorMessege">Field required</div>}</div>
            </div>
          </div>
          <div className="inputrow">
            <label className="labelView">Contact No</label>
            <div><input type="number" className={emptydata.includes("contact") ? "inputboxvalid" : "inputField"} name="contact" value={userData.contact} onChange={handleInputChange} />
              <div>{emptydata.includes("contact") && <div className="errorMessege">Field required</div>}</div>
            </div>
          </div>
          {inputname === "contact" && <div className={isValid === false && 'errormsg'}>{message}</div>}
          <div className="inputrow">
            <label className="labelView">Email</label>
            <div><input type="email" className={emptydata.includes("email") ? "inputboxvalid" : "inputField"} name="email" value={userData.email} onChange={handleInputChange} />
              <div>{emptydata.includes("email") && <div className="errorMessege">Field required</div>}</div>
            </div>
          </div>
          {inputname === "email" && <div className={isValid === false && 'errormsg'}>{message}</div>}
          <button className="submitBtn" onClick={onSubmit}>SUBMIT</button>
          {successmsg && <div className="successmsg">Booked Successfully !!!</div>}
        </div>
      </div>
      <div className="footer">
        <div>
          <div className="footerHeading">Tripzone</div>
          <div className="footerdatas">About</div>
          <div className="footerdatas">Awards</div>
          <div className="footerdatas">Contact Us</div>
          <div className="footerdatas">Feedback</div>
        </div>
        <div>
          <div className="footerHeading">Main Offices</div>
          <div className="footerdatas">The United States</div>
          <div className="footerdatas">India</div>
          <div className="footerdatas">Brazil</div>
          <div className="footerdatas">Canada</div>
        </div>
        <div>
          <div className="footerHeading">Sub Offices</div>
          <div className="footerdatas">Australia</div>
          <div className="footerdatas">England</div>
          <div className="footerdatas">France</div>
          <div className="footerdatas">Germany</div>
        </div>
        <div>
          <div className="footerHeading">Disclaimer</div>
          <div className="footerdata">This Layout is created as a part of Recruitments.</div>
          <div className="footerdata">All the above content has no direct relation with Sirius business.</div>
        </div>
      </div>
    </div>
  );
}

export default App;
