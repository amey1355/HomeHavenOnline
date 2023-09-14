import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import classes from './hero.module.css'

const Hero = () => {
  const [type, setType] = useState("beach")
  const [continent, setContinent] = useState("0")
  const [priceRange, setPriceRange] = useState("0")
  const navigate = useNavigate()

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`)
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.dream1}>Find and choose where you will live</h2>
        <h5  className={classes.dream}>Search the best selection of luxury real estate</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">0-100,0000</option>
            <option value="1">100,0000-200,0000</option>
            <option value="2">200,0000-300,0000</option>
            <option value="3">300,0000-400,0000</option>
            <option value="4">400,0000-500,0000</option>
          </select>
          <select onChange={(e) => setContinent(e.target.value)}>
            <option disabled>Select State</option>
                        <option value='0'>Andaman and Nicobar Islands</option>
                        <option value='1'>Andhra Pradesh</option>
                        <option value='2'>Arunachal Pradesh</option>
                        <option value='3'>Assam</option>
                        <option value='4'>Bihar</option>
                        <option value='5'>Chandigarh</option>
                        <option value='6'>Chhattisgarh</option>
                        <option value='7'>Dadra and Nagar Haveli</option>
                        <option value='8'>Daman and Diu</option>
                        <option value='9'>Delhi</option>
                        <option value='10'>Goa</option>
                        <option value='11'>Gujarat</option>
                        <option value='12'>Haryana</option>
                        <option value='13'>Himachal Pradesh</option>
                        <option value='14'>Jammu and Kashmir</option>
                        <option value='15'>Jharkhand</option>
                        <option value='16'>Karnataka</option>
                        <option value='17'>Kerala</option>
                        <option value='18'>Ladakh</option>
                        <option value='19'>Lakshadweep</option>
                        <option value='20'>Madhya Pradesh</option>
                        <option value='21'>Maharashtra</option>
                        <option value='22'>Manipur</option>
                        <option value='23'>Meghalaya</option>
                        <option value='24'>Mizoram</option>
                        <option value='25'>Nagaland</option>
                        <option value='26'>Odisha</option>
                        <option value='27'>Puducherry</option>
                        <option value='28'>Punjab</option>
                        <option value='29'>Rajasthan</option>
                        <option value='30'>Sikkim</option>
                        <option value='31'>Tamil Nadu</option>
                        <option value='32'>Telangana</option>
                        <option value='33'>Tripura</option>
                        <option value='34'>Uttar Pradesh</option>
                        <option value='35'>Uttarakhand</option>
                        <option value='36'>West Bengal</option>
          </select>
          <AiOutlineSearch className={classes.searchIcon} onClick={handleSearch} />
        </div>
      </div>
    </div>
  )
}

export default Hero