import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './postItem.css';
import FavoritesButton from '../FavoritesButton/FavoritesButton';

function PostsItem(props) {
  // PostsItem - карточка для отрисовки превью курса
  // props - для того, чтобы компонент отрисовывал определенный курс
  const {
    id, name, price, type,
  } = props;

  const { currentUser } = useSelector((state) => state);

  return (
    <div className="card-body card-my-style">
      {Object.keys(currentUser).length
        ? (
          <div className="favoriteButtonDiv">
            <FavoritesButton userId={currentUser.id} courseId={id} />
          </div>
        )
        : null}
      <Link className="postItemHomeLink" to={`/course/${id}`}>
        <h5 className="card-title">
          <span className="mx-1">{name}</span>
        </h5>
        <p className="card-text">
          Цена:
          &nbsp;
          {price}
          {' '}
          руб.
        </p>
        <p className="card-text">
          Форма обучения:
          &nbsp;
          {type}
        </p>
      </Link>
    </div>
  );
}

export default React.memo(PostsItem);
