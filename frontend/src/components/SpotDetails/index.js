import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { getSpotDetails } from "../../store/spots";
import { getAllReviews } from "../../store/reviews";

import ReviewList from "../ReviewList";
import ReviewModal from "../ReviewModal";


import './SpotDetails.css'

const SpotDetails = () => {
  const { spotId } = useParams()
  const sessionUser = useSelector(state => state.session.user);
  const { setModalContent } = useModal()
  const dispatch = useDispatch()
  const spot = useSelector(state => state.spots[spotId])
  const reviews = useSelector(state => Object.values(state.reviews))

  const isNotOwner = sessionUser?.id !== spot?.Owner?.id
  const user = sessionUser?.id


  useEffect(() => {
    dispatch(getAllReviews(spotId))
    dispatch(getSpotDetails(spotId))
  }, [dispatch, spotId])


  const hasReviewed = reviews.find(rev => rev.userId === user && rev.spotId === spotId !== undefined)

  if (!spot) {
    return null
  }

  const postReview = () => {
    setModalContent(<ReviewModal spotId={spotId} />);
  };

  const handleClick = () => {
    alert('Feature Coming Soon...')
  }

  const { name, city, country, description, price, numReviews, avgRating, Owner, SpotImages } = spot
  const reviewCount = numReviews < 1


  return (
    <div className="details-page-container">
        <div className="details-page">

  <div className="spot-deets">
    <div className="spot-name"><h1>{name}</h1></div>
    <div className="location-deets">
      <div id="city">City: <span>{city}</span> </div>
      <div id="realm">Realm: <span>{country}</span> </div>
    </div>
  </div>

    <div className="gallery-container">
      <div className="gallery">
          {SpotImages && <img src={SpotImages.find(img => img.preview === true).url} alt="" className="hero-img" />}

        <div className="small-images-container">
          {SpotImages && SpotImages.filter(img => img.preview !== true).map(img => (
            <img src={img.url} className="small-imgs" alt="" />
          ))}
        </div>
      </div>
    </div>

  <div className="middle-box">
    <div className="host-description">
      <h2>Hosted by {Owner?.firstName} {Owner?.lastName}</h2>
      <p>{description}</p>
    </div>

    <div className="reserve-box">
      <div className="reserve-deets">

        <div className="price"><h2 className="price">${price} night</h2></div>

        <div className="rating-reviews">
          {avgRating ? <h3><i className="fa-solid fa-star fa-xs"></i> {avgRating.toFixed(1)} • {numReviews} {numReviews === 1 ? 'review' : 'reviews'}</h3> : <h3><i className="fa-solid fa-star fa-xs"></i>New</h3>}
        </div>

      </div>
      <div className="reserve-btn-box">
        <button onClick={handleClick} className="reserve-btn">Reserve</button>
      </div>
    </div>
</div>

<div className="reviews-box">

  <div className="reviews-heading">
    {avgRating ? <h3><i className="fa-solid fa-star fa-xs"></i> {avgRating.toFixed(1)} • {numReviews} {numReviews === 1 ? 'review' : 'reviews'}</h3> : <h3><i className="fa-solid fa-star fa-xs"></i>New</h3>}
    {sessionUser && user && isNotOwner && !hasReviewed ? <button id="post-review" onClick={postReview}>Post Your Review</button> : null}
    {reviewCount && user && isNotOwner && <p>Be the first to post a review!</p>}
  </div>

  <div className="review-list">
    <ReviewList spotId={spotId} />
  </div>

</div>
</div>
    </div>
  )
}

export default SpotDetails
// {SpotImages && showImgs(SpotImages)}
