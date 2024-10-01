import React, { Fragment } from "react";
import moment from "moment";
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = (props) => {
  return (
    <Fragment>
      <footer
        style={{ background: "#288eca", color: "#fff" }}
        className="z-10 py-8 px-4 md:px-12 text-center"
      >
        <div className="flex flex-col md:flex-row justify-around items-center mb-6">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-lg font-bold mb-2">Contact Us</h4>
            <p className="flex items-center justify-center md:justify-start mb-1">
              <FaEnvelope className="mr-2" /> info@example.com
            </p>
            <p className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-2" /> +1 (123) 456-7890
            </p>
          </div>

          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-lg font-bold mb-2">Our Address</h4>
            <p className="flex items-center justify-center md:justify-start mb-1">
              <FaMapMarkerAlt className="mr-2" /> 123 Main Street,
            </p>
            <p>City, State, ZIP</p>
            <p>Country</p>
          </div>

          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-lg font-bold mb-2">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <p>@Sparsh Creation © {moment().format("YYYY")}</p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
