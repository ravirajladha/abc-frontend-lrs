import React, { Fragment, useCallback, useEffect, useState } from 'react';

import Star from '/assets/images/star.png';
import DefaultProfileImage from '@/assets/images/default/student.png';
import DefaultTrainerImage from '@/assets/images/default/trainer.png';
import { Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import { fetchRatingReview, storeRatingReview } from '@/api/student';
import { ContentLoader } from '@/components/common';
import { formatDateTime } from '@/utils/helpers';
import { getStudentDataFromLocalStorage } from '@/utils/services';

const index = ({ courseId }) => {
  const studentData = JSON.parse(getStudentDataFromLocalStorage());
  const isPaid = studentData.is_paid;

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [ratingsData, setRatingsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const submitReview = async () => {
    try {
      const response = await storeRatingReview({
        rating,
        review,
        course_id: courseId,
      });
      toast.success(response.message);
      setShowModal(false);
      setRating(0);
      setReview('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchRatingReviewCallback = useCallback(async () => {
    try {
      const data = await fetchRatingReview(courseId);
      setRatingsData(data.ratings);
      setReviewsData(data.reviews);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRatingReviewCallback();
  }, [courseId]);
  if (loading) return <ContentLoader />;
  // Create an array representing the star levels
  const starLevels = [
    { countKey: 'five_star_count', label: 5 },
    { countKey: 'four_star_count', label: 4 },
    { countKey: 'three_star_count', label: 3 },
    { countKey: 'two_star_count', label: 2 },
    { countKey: 'one_star_count', label: 1 },
  ];
  const getPercentage = (count) => {
    const totalRatings = ratingsData?.total_ratings || 0;
    return totalRatings > 0 ? (count / totalRatings) * 100 : 0;
  };

  return (
    <div
      className="card w-100 border-0 mt-0 mb-4 p-4 shadow-xss position-relative rounded-lg bg-white mt-3"
      style={{ maxHeight: '600px', overflowY: 'auto' }}
    >
      <div className="row">
        <div className="col-5 pr-0">
          <h2 className="display3-size lh-1 m-0 text-grey-900 fw-700">
            {Number(ratingsData?.average_rating || 0).toFixed(1)}
          </h2>
        </div>
        <div className="col-7 pl-0 text-right">
          <StarRatings
            rating={Number(ratingsData?.average_rating || 0)}
            starRatedColor="gold"
            numberOfStars={5}
            starDimension="15px"
            starSpacing="1px"
          />
          <h4 className="font-xsssss text-grey-600 fw-600 mt-1">
            Based on {ratingsData?.total_ratings} ratings
          </h4>
        </div>
      </div>

      {/* detailed rating */}
      <div className="bg-greylight theme-dark-bg rounded-sm p-2 mt-3 mb-4">
        {starLevels.map(({ countKey, label }) => (
          <div className="row mt-1" key={label}>
            <div className="col-3 pr-1 mt-0">
              <img src={Star} alt="star" className="w10 float-left" />
              <h4 className="font-xsss fw-600 text-grey-600 ml-1 float-left d-inline">
                {label}
              </h4>
            </div>
            <div className="col-7 pl-0 pr-2">
              <div id={`bar_${label}`} className="bar-container">
                <div
                  className="bar-percentage bg-yellow"
                  style={{ width: `${getPercentage(ratingsData[countKey])}%` }}
                ></div>
              </div>
            </div>
            <div className="col-2 pl-0">
              <h4 className="font-xssss fw-600 text-grey-800">
                {getPercentage(ratingsData[countKey])}%
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* reviews */}
      {reviewsData.map((review, index) => (
        <div className="border-bottom my-1" key={index}>
          <div className="row">
            <div className="col-2 text-left">
              <figure className="avatar float-left mb-0">
                <img
                  src={DefaultProfileImage}
                  alt="banner"
                  className="float-right shadow-none w40 mr-2"
                />
              </figure>
            </div>
            <div className="col-10 pl-0">
              <div className="content">
                <h6 className="author-name font-xssss fw-600 mb-0 text-grey-800">
                  {review.student_name}
                </h6>
                <h6 className="d-block font-xsssss fw-500 text-grey-500 mt-2 mb-0">
                  {formatDateTime(review.created_at)}
                </h6>
                <StarRatings
                  rating={Number(review?.rating || 0)}
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="15px"
                  starSpacing="0px"
                />
                <p className="comment-text lh-24 fw-500 font-xssss text-grey-500 mt-1">
                  {review.review}{' '}
                </p>
              </div>
            </div>
          </div>
          {review.trainer_id && (
            <div className="row my-2">
              <div className="col-1"></div>
              <div className="col-2 text-left">
                <figure className="avatar float-left mb-0">
                  <img
                    src={DefaultTrainerImage}
                    alt="banner"
                    className="float-right shadow-none w40 mr-2"
                  />
                </figure>
              </div>
              <div className="col-9 pl-0">
                <div className="content">
                  <h6 className="author-name font-xssss fw-600 mb-0 text-grey-800">
                    {review.trainer_name}
                  </h6>
                  <h6 className="d-block font-xsssss fw-500 text-grey-500 mt-2 mb-0">
                    {formatDateTime(review.updated_at)}
                  </h6>
                  <p className="comment-text lh-24 fw-500 font-xssss text-grey-500 mt-2">
                    {review.trainer_reply}{' '}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* add review */}
      <div className="row">
        {isPaid ? (
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="d-block p-2 lh-32 w-100 text-center ml-3 mr-3 mt-2 bg-grey fw-600 font-xssss text-grey-900 fw-700"
          >
            Add a Review
          </button>
        ) : (
          ''
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header
            closeLabel="Close"
            closeVariant="white"
            closeButton={true}
          >
            <Modal.Title className="mt-1 font-xss fw-700">
              Add Review
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              starHoverColor="gold"
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
              starDimension="30px"
              starSpacing="5px"
            />
            <div className="form-group icon-input mb-3 mt-3">
              <i className="font-sm ti-file text-grey-500 pr-0"></i>
              <input
                type="text"
                name="review"
                className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                placeholder="Give Your Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="form-group mb-1">
              <button
                type="submit"
                className="btn text-white bg-current px-3"
                onClick={submitReview}
              >
                <i className="feather feather-save font-xsss"></i> Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default index;
