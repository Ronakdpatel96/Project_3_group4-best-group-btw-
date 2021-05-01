import React from 'react';
import PropTypes from 'prop-types';

export default function LeaderRow(props) {
  const { user } = props;
  const { score } = props;
  const { win } = props;
  const { loss } = props;
  const { tie } = props;
  return (
    <tr>
      <td>{user}</td>
      <td>{score}</td>
      <td>{win}</td>
      <td>{loss}</td>
      <td>{tie}</td>
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
