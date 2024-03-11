/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { ReactNode, forwardRef } from 'react'

interface ItemProps {
  children: ReactNode
}

const Item = forwardRef<HTMLDivElement, ItemProps>((props: ItemProps, ref) => {
  return (
    <div ref={ref} css={container} draggable={true}>
      {props.children}
    </div>
  )
})

Item.displayName = 'Item'

const container = css`
  padding: 0.75rem;
  background-color: rgb(80, 80, 80);
  color: #fff;
  font-size: 2rem;
  user-select: none;
  :nth-of-type(even) {
    background-color: rgb(52, 115, 173);
  }
`

export default Item
