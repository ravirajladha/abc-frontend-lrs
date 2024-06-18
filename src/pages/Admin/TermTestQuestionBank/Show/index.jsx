import PropTypes from 'prop-types';
import { ContentHeader } from '@/components/common';

function Show({ title }) {
  return (
    <div>
      <ContentHeader title={title} />
    </div>
  );
}

Show.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Show;
