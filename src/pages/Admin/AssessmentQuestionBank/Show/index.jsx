import PropTypes from 'prop-types';
import { ContentHeader } from '@/components/common';

function Show({ title }) {
  return (
    <div>
      <ContentHeader title={title} />
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="card border-0 mt-0 rounded-10 shadow-xs">
            <div className="card-body p-4 pb-0 border-0">
              <h4 className="fw-600 font-xss mt-4">
                Q. Which of the following sentences is grammatically correct?{' '}
              </h4>
              <p className="fw-500 font-xsss mt-3 ">
                1. Her and I went to the store.
              </p>
              <p className="fw-500 font-xsss mt-3 ">
                2. She and me went to the store.
              </p>
              <p className="fw-500 font-xsss mt-3 text-success fw-700">
                3. She and I went to the store.
              </p>
              <p className="fw-500 font-xsss mt-3 ">
                4. Her and me went to the store.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Show.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Show;
