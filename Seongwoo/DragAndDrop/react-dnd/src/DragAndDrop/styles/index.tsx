import { css } from '@emotion/react';

const mainCss = css`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const containerCss = css`
  background-color: gray;
  border-radius: 1rem;
  width: 120px;
  height: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const itemCss = {
  blue: css({
    color: 'white',
    borderRadius: '1rem',
    backgroundColor: 'blue',
    width: '50px',
    height: '50px',
    textAlign: 'center',
    cursor: 'grab',
  }),
};

export { mainCss, containerCss, itemCss };
