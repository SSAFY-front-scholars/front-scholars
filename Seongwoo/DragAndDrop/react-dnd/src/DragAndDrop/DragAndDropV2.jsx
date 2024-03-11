/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const DragAndDropV2 = () => {
  const [items, setItems] = useState([
    { id: 1, emoji: '🐋', container: 1 },
    { id: 2, emoji: '🐬', container: 1 },
    { id: 3, emoji: '🐳', container: 1 },
    { id: 4, emoji: '🐟', container: 1 },
    { id: 5, emoji: '🦐', container: 1 },
  ]);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('draggedItemId', id.toString());
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, newContainer) => {
    e.preventDefault();
    const draggedItemId = parseInt(e.dataTransfer.getData('draggedItemId'));
    const targetId = e.target.getAttribute('data-itemid');

    if (draggedItemId === parseInt(targetId)) {
      setItems((items) =>
        items.map((item) =>
          item.id === draggedItemId
            ? { ...item, container: newContainer }
            : item,
        ),
      );
    } else {
      setItems((currentItems) => {
        let newItems = [...currentItems];
        const draggedIndex = newItems.findIndex(
          (item) => item.id === draggedItemId,
        );
        const targetIndex = newItems.findIndex(
          (item) => item.id === parseInt(targetId),
        );

        if (
          draggedIndex !== -1 &&
          targetIndex !== -1 &&
          newItems[draggedIndex].container === newContainer
        ) {
          newItems.splice(draggedIndex, 1);
          newItems.splice(targetIndex, 0, currentItems[draggedIndex]);
        }

        return newItems.map((item) =>
          item.id === draggedItemId
            ? { ...item, container: newContainer }
            : item,
        );
      });
    }
  };

  return (
    <div css={mainCss}>
      <Container
        id={1}
        items={items.filter((item) => item.container === 1)}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragStart={onDragStart}
      />
      <Container
        id={2}
        items={items.filter((item) => item.container === 2)}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragStart={onDragStart}
      />
    </div>
  );
};

const Container = ({ id, items, onDragOver, onDrop, onDragStart }) => {
  return (
    <div
      className={`container-${id}`}
      css={containerCss}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
    >
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDragStart={onDragStart}
          dataItemId={item.id}
        />
      ))}
    </div>
  );
};

const Item = ({ item, onDragStart, dataItemId }) => {
  return (
    <button
      className="draggable"
      css={itemCss.blue}
      draggable="true"
      onDragStart={(e) => onDragStart(e, item.id)}
      data-itemid={dataItemId}
    >
      {item.emoji}
    </button>
  );
};

// --------------- CSS
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

export default DragAndDropV2;
