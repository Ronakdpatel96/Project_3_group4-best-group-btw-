import React from 'react';
import PropTypes from 'prop-types';

export default function LeaderRow(props) {
  const { user } = props;
  const { score } = props;
  return (
    <tr>
      <td>{user}</td>
      <td>{score}</td>
    </tr>
  );
}

LeaderRow.propTypes = {
  user: PropTypes.string,
  score: PropTypes.number,
};

LeaderRow.defaultProps = {
  user: '',
  score: 0,
};
