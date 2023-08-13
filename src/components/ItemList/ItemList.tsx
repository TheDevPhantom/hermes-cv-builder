import { IItemListProps } from './ItemList.types';
import './_styles.item-list.scss';

const ItemList = ({ icon, title, children }: IItemListProps) => {
  return (
    <div className='item-list'>
      <div className='item-list-header'>
        <span>{icon}</span>
        <p>{title}</p>
      </div>
      {children}
    </div>
  );
};

export default ItemList;
