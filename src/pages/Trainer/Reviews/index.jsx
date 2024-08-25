import { ContentHeader } from '@/components/common';
import { ReviewCard } from '@/components/student/previewCourse';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useParams } from 'react-router';
import DefaultProfileImage from '@/assets/images/default/student.png';
import DefaultTrainerImage from '@/assets/images/default/trainer.png';
import Star from '/assets/images/star.png';
import StarDisabled from '/assets/images/star-disable.png';

const index = () => {
  let { classId, subjectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="px-2">
      <ContentHeader
        title="Reviews"
        backLink={`/trainer/subjects/${classId}/courses`}
      />
      <div className="card w-100 border-0 mt-0 mb-4 p-4 shadow-xss position-relative rounded-lg bg-white">
        <div className="row">
          <div className="col-5 pr-0">
            <h2 className="display3-size lh-1 m-0 text-grey-900 fw-700">4.2</h2>
          </div>
          <div className="col-7 pl-0 text-right">
            <div className="star d-flex justify-content-end w-100 text-right">
              <img src={Star} alt="star" className="w10" />
              <img src={Star} alt="star" className="w10" />
              <img src={Star} alt="star" className="w10" />
              <img src={Star} alt="star" className="w10" />
              <img src={StarDisabled} alt="star" className="w10" />
            </div>
            <h4 className="font-xsssss text-grey-600 fw-600 mt-1">
              Based on 433 rating
            </h4>
          </div>
        </div>
        <div className="bg-greylight theme-dark-bg rounded-sm p-2 mt-3 mb-4">
          <div className="row mt-3">
            <div className="col-3 pr-1 mt-0">
              <img src={Star} alt="star" className="w10 float-left" />
              <h4 className="font-xsss fw-600 text-grey-600 ml-1 float-left d-inline">
                5
              </h4>
            </div>
            <div className="col-7 pl-0 pr-2">
              <div id="bar_1" data-value="45" className="bar-container">
                <div
                  className="bar-percentage bg-yellow"
                  style={{ width: `70%` }}
                ></div>
              </div>
            </div>
            <div className="col-2 pl-0">
              <h4 className="font-xssss fw-600 text-grey-800">70%</h4>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-3 pr-1 mt-0">
              <img src={Star} alt="star" className="w10 float-left" />
              <h4 className="font-xsss fw-600 text-grey-600 ml-1 float-left d-inline">
                4
              </h4>
            </div>
            <div className="col-7 pl-0 pr-2">
              <div id="bar_2" data-value="45" className="bar-container">
                <div
                  className="bar-percentage bg-yellow"
                  style={{ width: `50%` }}
                ></div>
              </div>
            </div>
            <div className="col-2 pl-0">
              <h4 className="font-xssss fw-600 text-grey-800">50%</h4>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-3 pr-1 mt-0">
              <img src={Star} alt="star" className="w10 float-left" />
              <h4 className="font-xsss fw-600 text-grey-600 ml-1 float-left d-inline">
                3
              </h4>
            </div>
            <div className="col-7 pl-0 pr-2">
              <div id="bar_3" data-value="45" className="bar-container">
                <div
                  className="bar-percentage bg-yellow"
                  style={{ width: `40%` }}
                ></div>
              </div>
            </div>
            <div className="col-2 pl-0">
              <h4 className="font-xssss fw-600 text-grey-800">40%</h4>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-3 pr-1 mt-0">
              <img src={Star} alt="star" className="w10 float-left" />
              <h4 className="font-xsss fw-600 text-grey-600 ml-1 float-left d-inline">
                2
              </h4>
            </div>
            <div className="col-7 pl-0 pr-2">
              <div id="bar_4" data-value="45" className="bar-container">
                <div
                  className="bar-percentage bg-yellow"
                  style={{ width: `30%` }}
                ></div>
              </div>
            </div>
            <div className="col-2 pl-0">
              <h4 className="font-xssss fw-600 text-grey-800">30%</h4>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-3 pr-1 mt-0">
              <img src={Star} alt="star" className="w10 float-left" />
              <h4 className="font-xsss fw-600 text-grey-600 ml-1 float-left d-inline">
                1
              </h4>
            </div>
            <div className="col-7 pl-0 pr-2">
              <div id="bar_5" data-value="45" className="bar-container">
                <div
                  className="bar-percentage bg-yellow"
                  style={{ width: `20%` }}
                ></div>
              </div>
            </div>
            <div className="col-2 pl-0">
              <h4 className="font-xssss fw-600 text-grey-800">20%</h4>
            </div>
          </div>
        </div>

        <div className="border-bottom mb-2">
          <div className="row  mb-2">
            <div className="col-1 text-left">
              <figure className="avatar float-left mb-0">
                <img
                  src={DefaultProfileImage}
                  alt="banner"
                  className="float-right shadow-none w40 mr-2"
                />
              </figure>
            </div>
            <div className="col-10 pl-4">
              <div className="content">
                <h6 className="author-name font-xssss fw-600 mb-0 text-grey-800">
                  Sidharth
                </h6>
                <h6 className="d-block font-xsssss fw-500 text-grey-500 mt-2 mb-0">
                  July 26 at 8:20 PM
                </h6>
                <div className="star d-flex w-100 text-left">
                  <img src={Star} alt="star" className="w10" />
                  <img src={Star} alt="star" className="w10" />
                  <img src={Star} alt="star" className="w10" />
                  <img src={Star} alt="star" className="w10" />
                  <img src={StarDisabled} alt="star" className="w10" />
                </div>
                <p className="comment-text lh-24 fw-500 font-xssss text-grey-500 mt-2">
                  Enjoyed this a lot and well done. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sit exercitationem veniam
                  voluptatem eius provident neque adipisci fugit reiciendis
                  distinctio ut.{' '}
                </p>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-1"></div>
            <div className="col-1 text-left">
              <figure className="avatar float-left mb-0">
                <img
                  src={DefaultTrainerImage}
                  alt="banner"
                  className="float-right shadow-none w40 mr-2"
                />
              </figure>
            </div>
            <div className="col-10 pl-4">
              <div className="content">
                <h6 className="author-name font-xssss fw-600 mb-0 text-grey-800">
                  Trainer
                </h6>
                <h6 className="d-block font-xsssss fw-500 text-grey-500 mt-2 mb-0">
                  July 26 at 8:20 PM
                </h6>
                <p className="comment-text lh-24 fw-500 font-xssss text-grey-500 mt-2">
                  Enjoyed this a lot and well done. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sit exercitationem veniam
                  voluptatem eius provident neque adipisci fugit reiciendis
                  distinctio ut.{' '}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-1 text-left">
            <figure className="avatar float-left mb-0">
              <img
                src={DefaultProfileImage}
                alt="banner"
                className="float-right shadow-none w40 mr-2"
              />
            </figure>
          </div>
          <div className="col-11 pl-4">
            <div className="content">
              <h6 className="author-name font-xssss fw-600 mb-0 text-grey-800">
                Rishi
              </h6>
              <h6 className="d-block font-xsssss fw-500 text-grey-500 mt-2 mb-0">
                July 26 at 8:20 PM
              </h6>
              <div className="star d-flex w-100 text-left">
                <img src={Star} alt="star" className="w10" />
                <img src={Star} alt="star" className="w10" />
                <img src={Star} alt="star" className="w10" />
                <img src={Star} alt="star" className="w10" />
                <img src={StarDisabled} alt="star" className="w10" />
              </div>
              <p className="comment-text lh-24 fw-500 font-xssss text-grey-500 mt-2">
                Enjoyed this a lot and well done. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Placeat, officiis.{' '}
              </p>
            </div>
            <button
              className="btn bg-cyan px-2 text-white font-xssss fw-700 float-right mb-2"
              onClick={() => setShowModal(true)}
            >
              Reply
            </button>
          </div>
        </div>

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
                  name="note"
                  className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                  placeholder="Give Your Reply"
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="form-group mb-1">
                <button
                  type="submit"
                  className="btn text-white bg-current px-3"
                  onClick={() => setShowModal(false)}
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
