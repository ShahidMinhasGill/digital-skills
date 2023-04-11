import React from "react";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <div className="footer" >
      <div className="container">
        <div class="row">
          <div class="col-12 col-lg-8 d-flex flex-wrap">
            <div class="col-lg-3 col-md-6 col-sm-6 col-6 mb-3">
              <h3>Join us</h3>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-6 mb-3">
              <h3>Contact us</h3>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-6 mb-3">
              <h3>Work with us</h3>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-6 mb-3">
              <h3>Diversity and Inclusion</h3>
            </div>
          </div>
          <div class="col-12">
            <h2>Subscribe to our fortnightly newsletter, The Bolt</h2>
          </div>
          <div class="col-12 col-lg-8">
            <p>
              Join our mailing list to receive our fortnightly newsletter, The
              Bolt. By signing up, you'll get access to free resources,
              programs, and more. You can opt-out at any time. Read more here:
            </p>
            <a href="#">https://www.bethebusiness.com/privacy-notice/</a>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mt-4 d-flex justify-content-between">
            <div className="col-lg-2 col-6">
              <span>Emial Address *</span>
            </div>
            <div className="col-lg-2 col-6 text-end">
              <span>indicates required *</span>
            </div>
          </div>
          <div className="col-12 mt-1">
            <div className="Search">
              <input id="eval" type="text" placeholder="Your Email" />
            </div>
            <button>Search</button>
          </div>
          <div className="footer-end col-12 d-flex justify-content-between mt-5 mb-5 ">
            <p>
              © 2023 Be The Business. All Rights Reserved. / Terms, policies and
              notices
            </p>
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
