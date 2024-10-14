import { ContentHeader, ContentLoader } from '@/components/common';
import { ReviewCard } from '@/components/student/previewCourse';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router';
import DefaultProfileImage from '@/assets/images/default/student.png';
import DefaultTrainerImage from '@/assets/images/default/trainer.png';
import Star from '/assets/images/star.png';
import { formatDateTime } from '@/utils/helpers';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import { fetchRatingReview } from '@/api/student';
import { storeReviewReply, updateReviewStatus } from '@/api/trainer';
import { selectUserType } from '@/store/authSlice';
import { useSelector } from 'react-redux';
import { USER_TYPES } from '@/utils/constants';

const index = () => {
  const authenticatedUserType = useSelector(selectUserType);

  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reply, setReply] = useState('');
  const [currentReviewId, setCurrentReviewId] = useState('');
  const [ratingsData, setRatingsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  const handleReplyClick = (reviewId) => {
    setCurrentReviewId(reviewId);
    setShowModal(true);
  };

  const submitReply = async () => {
    try {
      const response = await storeReviewReply({
        reply,
        review_id: currentReviewId,
      });
      toast.success(response.message);
      setShowModal(false);
      setReply('');
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
  }, [fetchRatingReviewCallback, courseId]);

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
  const handleStatusChange = async (index, newStatus) => {
    const reviewId = reviewsData[index].id; // Get the review ID from the array
  
    // Optimistically update the frontend state

  
    try {
      // Call the API to update the review status in the backend
      const response = await updateReviewStatus({
        review_id: reviewId,
        status: newStatus,
      });
      setReviewsData((prevReviews) => {
        const updatedReviews = [...prevReviews];
        updatedReviews[index].status = newStatus;
        return updatedReviews;
      });
      toast.success(response.message || 'Review status updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update review status');
    }
  };

  if (loading) return <ContentLoader />;
  return (
    <div className="px-2">
      <ContentHeader
        title="Reviews"
      />
      <div className="card w-100 border-0 mt-0 mb-4 p-4 shadow-xss position-relative rounded-lg bg-white">
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
                    style={{
                      width: `${getPercentage(ratingsData[countKey])}%`,
                    }}
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
              <div className="col-9 pl-0">
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
              <div className="col-1">
                <select
                  value={review.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  className={`badge p-1 text-white ${
                    review.status == 0 ? 'bg-danger' : 'bg-success'
                  }`}
                >
                  <option value="0">Deactive</option>
                  <option value="1">Active</option>
                </select>

                {authenticatedUserType === USER_TYPES.TRAINER && !review.trainer_id && (
                  <button
                    className="btn bg-cyan mt-1 px-2 text-white font-xssss fw-700 float-right"
                    onClick={() => handleReplyClick(review.id)}
                  >
                    <i className="feather-message-square"></i>
                  </button>
                )}

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

        <div className="row">
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header
              closeLabel="Close"
              closeVariant="white"
              closeButton={true}
            >
              <Modal.Title className="mt-1 font-xss fw-700">
                Reply Review
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group icon-input mb-3 mt-3">
                <i className="font-sm ti-file text-grey-500 pr-0"></i>
                <input
                  type="text"
                  name="reply"
                  className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                  placeholder="Give Your Reply"
                  required
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="form-group mb-1">
                <button
                  type="submit"
                  className="btn text-white bg-current px-3"
                  onClick={submitReply}
                >
                  <i className="feather feather-save font-xsss"></i> Save
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default index;
