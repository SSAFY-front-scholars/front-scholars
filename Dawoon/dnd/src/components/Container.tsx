/** @jsxImportSource @emotion/react */
import React, { ReactNode } from 'react';

const Container = (props: { children: ReactNode | ReactNode[] }) => {
  return <>{props.children}</>;
};

export default Container;
