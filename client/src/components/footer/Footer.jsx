import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
            A Real-estate marketplace website. Add your property for sale or buy someone's property using our website as a middleware to see the type of property and its images.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone 1: +91 8291617540</span>
          <span>Phone 2: +91 7045162003</span>
          <span>Phone 3: +91 9137867059</span>
          <span>Phone 4: +91 9869635613</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: Asia</span>
          <span>Country: India</span>
          <span>Current Location: Mumbai</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer