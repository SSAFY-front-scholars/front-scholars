import { css } from '@emotion/react';

const mainCss = css`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const containerCss = css`
  background-color: #313131;
  border-radius: 0.5rem;
  width: 120px;
  height: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const commonItemStyle = css({
  color: 'white',
  width: '100%',
  height: '50px',
  textAlign: 'center',
  cursor: 'grab',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const itemCss = {
  default: css(commonItemStyle.styles, {
    backgroundColor: 'gray',
  }),
  dragOver: css(commonItemStyle.styles, {
    borderColor: 'black',
    backgroundColor: 'lightgray',
    opacity: '0.7',
  }),
};

export { mainCss, containerCss, itemCss };
