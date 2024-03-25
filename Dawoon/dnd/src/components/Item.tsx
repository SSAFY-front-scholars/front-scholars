/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode, forwardRef } from 'react';

interface ItemProps {
  children: ReactNode;
}

const Item = forwardRef<HTMLDivElement, ItemProps>((props: ItemProps, ref) => {
  return (
    <div ref={ref} css={container}>
      {props.children}
    </div>
  );
});

Item.displayName = 'Item';

const container = css`
  display: inline-block;
  margin: 0.5rem;
  padding: 0.75rem;
  background-color: rgb(52, 115, 173);
  color: #fff;
  font-size: 2rem;
  user-select: none;
`;

export default Item;
