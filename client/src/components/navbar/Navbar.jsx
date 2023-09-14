import React, { useState } from "react";
import classes from "./navbar.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { logout } from "../../redux/authSlice";
import { request } from "../../util/fetchAPI";
import { useEffect } from "react";
import { FaBorderNone } from "react-icons/fa";

const Navbar = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setState((prev) => {
      return { ...prev, continent: "delhi", type: "beach" };
    });
  }, []);

  // mobile
  const [showMobileNav, setShowMobileNav] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setPhoto(null);
    setState({});
  };

  const handleListProperty = async (e) => {
    e.preventDefault();
    let filename = null;
    if (photo) {
      const formData = new FormData();
      filename = crypto.randomUUID() + photo.name;
      formData.append("filename", filename);
      formData.append("image", photo);

      const options = {
        Authorization: `Bearer ${token}`,
      };

      await request("/upload/image", "POST", options, formData, true);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
      return;
    }

    try {
      if (
        Object.values(state).some((v) => !v) &&
        Object.values(state).length < 7
      ) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2500);
        return;
      }

      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const newProperty = await request("/property", "POST", options, {
        ...state,
        img: filename,
      });

      setShowModal(false);
      setShowForm(false);
      navigate(`/propertyDetail/${newProperty._id}`);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <Link to="/" onClick={scrollToTop} className={classes.left}>
          <BsHouseDoor className={classes.logu} />
          HomeHaven
        </Link>
        <ul className={classes.center}>
          <li
            onClick={scrollToTop}
            className={classes.listItem}
            style={{ textDecoration: "none" }}
          >
            <Link to="/">Buy</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/">Rent</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/">Featured</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/">House Prices</Link>
          </li>
        </ul>

        <div className={classes.right}>
          {!user ? (
            <>
              <Link to="/signup">Sign up</Link>
              <Link to="/signin">Sign in</Link>
            </>
          ) : (
            <>
              <span
                className={classes.username}
                onClick={() => setShowModal((prev) => !prev)}
              >
                Hello {user.username}!
              </span>
              {showModal && (
                <div className={classes.userModal}>
                  <AiOutlineClose
                    onClick={() => setShowModal((prev) => !prev)}
                    className={classes.userModalClose}
                  />
                  <span className={classes.logoutBtn} onClick={handleLogout}>
                    Logout
                  </span>
                  <Link
                    to={`/my-profile`}
                    onClick={() => setShowModal((prev) => !prev)}
                    className={classes.myProfile}
                  >
                    My Profile
                  </Link>
                  <Link
                    onClick={() => setShowForm(true)}
                    className={classes.list}
                  >
                    List your property
                  </Link>
                  <Link
                    onClick={() => setShowModal((prev) => !prev)}
                    className={classes.yachtBtn}
                    to={`/yachts`}
                  >
                    See yachts!
                  </Link>
                  <Link
                    to={`/create-yacht`}
                    onClick={() => setShowModal((prev) => !prev)}
                  >
                    List your yacht
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {
        // desktop screen
        !showMobileNav && showForm && (
          <div className={classes.listPropertyForm} onClick={handleCloseForm}>
            <div
              className={classes.listPropertyWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>List Property</h2>
              <form onSubmit={handleListProperty}>
                <input
                  value={state?.title}
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleState}
                />
                <select
                  value={state?.type}
                  required
                  name="type"
                  onChange={handleState}
                >
                  <option disabled>Select Type</option>
                  <option value="beach">Beach</option>
                  <option value="village">Village</option>
                  <option value="mountain">Mountan</option>
                </select>
                <input
                  value={state?.desc}
                  type="text"
                  placeholder="Desc"
                  name="desc"
                  onChange={handleState}
                />
                <select
                  value={state?.continent}
                  required
                  name="continent"
                  onChange={handleState}
                >
                  <option disabled>Select State</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadra and Nagar Haveli">
                    Dadra and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
                <input
                  value={state?.price}
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleState}
                />
                <input
                  value={state?.sqmeters}
                  type="number"
                  placeholder="Sq. meters"
                  name="sqmeters"
                  onChange={handleState}
                />
                <input
                  value={state?.beds}
                  type="number"
                  placeholder="Beds"
                  name="beds"
                  step={1}
                  min={1}
                  onChange={handleState}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "50%",
                  }}
                >
                  <label htmlFor="photo">
                    Property picture <AiOutlineFileImage />
                  </label>
                  <input
                    type="file"
                    id="photo"
                    style={{ display: "none" }}
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  {photo && <p>{photo.name}</p>}
                </div>
                <button>List property</button>
              </form>
              <AiOutlineClose
                onClick={handleCloseForm}
                className={classes.removeIcon}
              />
            </div>
          </div>
        )
      }
      {
        // mobile screen
        <div className={classes.mobileNav}>
          {showMobileNav && (
            <div className={classes.navigation}>
              <Link to="/" onClick={scrollToTop} className={classes.left}>
                HomeHaven <BsHouseDoor />
              </Link>
              <AiOutlineClose
                className={classes.mobileCloseIcon}
                onClick={() => setShowMobileNav(false)}
              />
              <ul className={classes.center}>
                <li onClick={scrollToTop} className={classes.listItem}>
                  Buy
                </li>
                <li className={classes.listItem}>Rent</li>
                <li className={classes.listItem}>Featured</li>
                <li className={classes.listItem}>House Prices</li>
              </ul>
              <div className={classes.right}>
                {!user ? (
                  <>
                    <Link to="/signup">Sign up</Link>
                    <Link to="/signin">Sign in</Link>
                  </>
                ) : (
                  <>
                    <span>Hello {user.username}!</span>
                    <span className={classes.logoutBtn} onClick={handleLogout}>
                      Logout
                    </span>
                    <Link
                      onClick={() => setShowForm(true)}
                      className={classes.list}
                    >
                      List your property
                    </Link>
                  </>
                )}
              </div>
              {showForm && (
                <div
                  className={classes.listPropertyForm}
                  onClick={handleCloseForm}
                >
                  <div
                    className={classes.listPropertyWrapper}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2>List Property</h2>
                    <form onSubmit={handleListProperty}>
                      <input
                        value={state?.title}
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleState}
                      />
                      <input
                        value={state?.type}
                        type="text"
                        placeholder="Type"
                        name="type"
                        onChange={handleState}
                      />
                      <input
                        value={state?.desc}
                        type="text"
                        placeholder="Desc"
                        name="desc"
                        onChange={handleState}
                      />
                      <input
                        value={state?.continent}
                        type="text"
                        placeholder="Continent"
                        name="continent"
                        onChange={handleState}
                      />
                      <input
                        value={state?.price}
                        type="number"
                        placeholder="Price"
                        name="price"
                        onChange={handleState}
                      />
                      <input
                        value={state?.sqmeters}
                        type="number"
                        placeholder="Sq. meters"
                        name="sqmeters"
                        onChange={handleState}
                      />
                      <input
                        value={state?.beds}
                        type="number"
                        placeholder="Beds"
                        name="beds"
                        step={1}
                        min={1}
                        onChange={handleState}
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          width: "50%",
                        }}
                      >
                        <label htmlFor="photo">
                          Property picture <AiOutlineFileImage />
                        </label>
                        <input
                          type="file"
                          id="photo"
                          style={{ display: "none" }}
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        {photo && <p>{photo.name}</p>}
                      </div>
                      <button>List property</button>
                    </form>
                    <AiOutlineClose
                      onClick={handleCloseForm}
                      className={classes.removeIcon}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {!showMobileNav && (
            <GiHamburgerMenu
              onClick={() => setShowMobileNav((prev) => !prev)}
              className={classes.hamburgerIcon}
            />
          )}
        </div>
      }

      {/* error */}
      {error && (
        <div className={classes.error}>
          <span>All fields must be filled!</span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
