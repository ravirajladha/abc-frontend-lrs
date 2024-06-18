import { Spinner } from 'react-bootstrap';

function ContentLoader() {
  return (
    <div className="text-center col-12">
      <Spinner
        className="text-current"
        animation="grow"
        size="sm"
        role="status"
      >
      </Spinner>
        <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default ContentLoader;
