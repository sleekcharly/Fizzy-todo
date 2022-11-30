import React from 'react';
import Tasks from '../Tasks';
import Sidebar from './Sidebar';

type Props = {};

const Content = (props: Props) => {
  return (
    <section className="content">
      <Sidebar />
      <Tasks />
    </section>
  );
};

export default Content;
