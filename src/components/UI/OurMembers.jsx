import React from "react";
import "../../styles/our-member.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import ava05 from "../../assets/all-images/ava-5.jpg";
import ava06 from "../../assets/all-images/ava-6.jpg";
import ava07 from "../../assets/all-images/ava-7.jpg";
import ava08 from "../../assets/all-images/ava-8.jpg";

const OUR__MEMBERS = [
{
  name: "Dariana Murillo",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava05,
  },

  {
    name: "Jhon Fernández",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava06,
  },

  {
    name: "Maggi Elizondo",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava07,
  },

  {
    name: "Wendell Rojas",
    fbUrl: "#",
    instUrl: "#",
    twitUrl: "#",
    linkedinUrl: "#",
    imgUrl: ava08,
  },
];

const OurMembers = () => {
    return (
      <>
     {OUR__MEMBERS.map((item, index) => (
        <Col lg="3" md="3" sm="4" xs="6" key={index} className="mb-4">
          <div className="single__member">
            <div className="single__member-img">
            <img src={item.imgUrl} alt="" className="w-100" />
            <div className="single__member-social">
                <Link to={item.fbUrl}>
                  <i className="ri-facebook-line"></i>
                </Link>
                <Link to={item.twitUrl}>
                  <i className="ri-twitter-line"></i>
                </Link>

                <Link to={item.linkedinUrl}>
                  <i className="ri-linkedin-line"></i>
                </Link>

                <Link to={item.instUrl}>
                  <i className="ri-instagram-line"></i>
                </Link>
                </div>
            </div>

            <h6 className="text-center mb-0 mt-3">{item.name}</h6>
            </div>
          </Col>
        ))}
    </>

    );
};

export default OurMembers;
