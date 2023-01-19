import React, { Children, useState } from 'react';
import { render } from 'react-dom';
import LoadingScreen from './LoadingScreen';

const Loading = (Children) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  if (loading) {
    return <LoadingScreen />;
  }

  return Children;
};

const renderApp = () => {
  render(<Loading />, document.getElementById('root'));
};

export default 