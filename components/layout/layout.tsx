import React, { Fragment } from 'react';
import MainHeader from './main-header';
import MainNavigation from './main-navigation';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      <MainNavigation />
    </Fragment>
  );
}
