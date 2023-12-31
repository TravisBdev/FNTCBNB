import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { createASpot, createSpotImage, getSpotDetails } from '../../store/spots';
import './CreateSpot.css'


const CreateSpot = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [previewImage, setPreviewImage] = useState('')
  const [img1, setImg1] = useState('')
  const [img2, setImg2] = useState('')
  const [img3, setImg3] = useState('')
  const [img4, setImg4] = useState('')
  const [didSubmit, setDidSubmit] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const spots = useSelector(state => state.spots)



  useEffect(() => {
    const errorsObj = {}

    if (!country) errorsObj.country = 'Country is required'
    if (!address) errorsObj.address = 'Street address is required'
    if (!city) errorsObj.city = 'City is required'
    if (!state) errorsObj.state = 'State is required'
    if (description.length < 30) errorsObj.description = 'Description must be at least 30 characters'
    if (!description) errorsObj.description = 'Description is required'
    if (!name) errorsObj.name = 'Name is required'
    if (name.length > 50) errorsObj.name = 'Name must be less that 50 characters'
    if (!price) errorsObj.price = 'Price per day is required'
    if (!previewImage) errorsObj.previewImage = 'Preview image is required'
    if (previewImage && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.png') && !previewImage.endsWith('.jpeg')) errorsObj.previewImage = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img1 && !img1.endsWith('.jpg') && !img1.endsWith('.png') && !img1.endsWith('.jpeg')) errorsObj.img1 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img2 && !img2.endsWith('.jpg') && !img2.endsWith('.png') && !img2.endsWith('.jpeg')) errorsObj.img2 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img3 && !img3.endsWith('.jpg') && !img3.endsWith('.png') && !img3.endsWith('.jpeg')) errorsObj.img3 = 'Image URL must end in .png, .jpg, or .jpeg'
    if (img4 && !img4.endsWith('.jpg') && !img4.endsWith('.png') && !img4.endsWith('.jpeg')) errorsObj.img4 = 'Image URL must end in .png, .jpg, or .jpeg'

    setValidationErrors(errorsObj)

  }, [country, address, city, state, description, name, price, previewImage, img1, img2, img3, img4, spots])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setDidSubmit(true)


    if (!Object.keys(validationErrors).length) {
      const data = {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        previewImage,
        img1,
        img2,
        img3,
        img4
      }
      const createdSpot = await dispatch(createASpot(data))

      await dispatch(createSpotImage(createdSpot.id, previewImage, true))

      await dispatch(createSpotImage(createdSpot.id, img1, false))

      await dispatch(createSpotImage(createdSpot.id, img2, false))

      await dispatch(createSpotImage(createdSpot.id, img3, false))

      await dispatch(createSpotImage(createdSpot.id, img4, false))

      if (createdSpot) {
        await getSpotDetails(createdSpot.id)
        history.push(`/spots/${createdSpot.id}`)
      } else {
        const errors = createdSpot.errors
        return errors
      }
    }
  };




  return (
    <form className="create-spot-form" onSubmit={handleSubmit}>
      <div className="header-box">
        <div><h1>Create a new Spot</h1></div>
        <div><h2>Where's your place located?</h2></div>
        <div><p>Guests will only get your exact address once they book a reservation.</p></div>


        <div className="info-inputs">
          <div className='country-address-box'>
            <div> <div>Country</div> <input type="text" id='country' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />
              {didSubmit && validationErrors.country && <div className="error">{validationErrors.country}</div>}</div>
            <div><div>Address</div><input type="text" id='address' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
              {didSubmit && validationErrors.address && <div className="error">{validationErrors.address}</div>}</div>
          </div>
          <div className="city-state-box">
            <div><div>City</div><input type="text" id='city' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />,
              {didSubmit && validationErrors.city && <div className="error">{validationErrors.city}</div>}</div>

            <div><div>State</div><input type="text" id='state' placeholder='STATE' value={state} onChange={(e) => setState(e.target.value)} />
              {didSubmit && validationErrors.state && <div className="error">{validationErrors.state}</div>}</div>
          </div>
        </div>
      </div>

      <div className="description-box">
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea name="" id="description" cols="65" rows="10" placeholder='Please write at least 30 characters' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        {didSubmit && validationErrors.description && <div className="error">{validationErrors.description}</div>}
      </div>

      <div className="title-box">
        <h2>Create a title for your spot</h2>
        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

        <input type="text" id='name' placeholder='Name of your spot' value={name} onChange={(e) => setName(e.target.value)} />
        {didSubmit && validationErrors.name && <div className="error">{validationErrors.name}</div>}
      </div>

      <div className="price-box">
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div>$ <input type="number" placeholder='Price per night (USD)' id='price' value={price} onChange={(e) => setPrice(e.target.value)} />
          {didSubmit && validationErrors.price && <div className="error">{validationErrors.price}</div>}</div>
      </div>

      <div className="photo-box">
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>

        <div><input type="url" id='prev-img' placeholder='Preview Image URL' className='spot-img' value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
          {didSubmit && validationErrors.previewImage && <div className="error">{validationErrors.previewImage}</div>}</div>
        <div>
          <input type="url" id='img1' placeholder='Image URL' className='spot-img' value={img1} onChange={(e) => setImg1(e.target.value)} />
          {didSubmit && validationErrors.img1 && <div className="error">{validationErrors.img1}</div>}
        </div>
        <div>
          <input type="url" id='img2' placeholder='Image URL' className='spot-img' value={img2} onChange={(e) => setImg2(e.target.value)} />
          {didSubmit && validationErrors.img2 && <div className="error">{validationErrors.img2}</div>}
        </div>
        <div><input type="url" id='img3' placeholder='Image URL' className='spot-img' value={img3} onChange={(e) => setImg3(e.target.value)} />
          {didSubmit && validationErrors.img3 && <div className="error">{validationErrors.img3}</div>}</div>
        <input type="url" id='img4' placeholder='Image URL' className='spot-img' value={img4} onChange={(e) => setImg4(e.target.value)} />
        {didSubmit && validationErrors.img4 && <div className="error">{validationErrors.img4}</div>}
      </div>

      <div className="button-box">
        <button className='create-spot-btn' type='submit'>Create Spot</button>
      </div>

    </form>
  )
}

export default CreateSpot
