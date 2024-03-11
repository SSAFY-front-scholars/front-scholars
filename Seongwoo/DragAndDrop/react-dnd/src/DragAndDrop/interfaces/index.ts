interface Item {
  id: number;
  emoji: string;
  container: number;
}

interface ContainerProps {
  id: number;
  items: Item[];
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, newContainer: number) => void;
  onDragStart: (e: React.DragEvent<HTMLButtonElement>, id: number) => void;
}

interface ItemProps {
  item: Item;
  onDragStart: (e: React.DragEvent<HTMLButtonElement>, id: number) => void;
  dataItemId: number;
}

export type { Item, ContainerProps, ItemProps };
