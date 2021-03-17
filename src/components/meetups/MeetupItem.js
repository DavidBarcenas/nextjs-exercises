import { useContext } from 'react';
import FavoritesContext from '../../store/favorites-context';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

export default function MeetupItem({ image, title, address, description, id }) {
  const { itemIsFavorite, removeFavorite, addFavorite } = useContext(
    FavoritesContext
  );

  const isFavorite = itemIsFavorite(id);

  function toggleFavoriteStatusHandler() {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite({
        id,
        title,
        description,
        image,
        address,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {isFavorite ? 'Remove from Favorites' : 'To Favorites'}
          </button>
        </div>
      </Card>
    </li>
  );
}
