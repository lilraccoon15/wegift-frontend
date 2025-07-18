import { Link } from "react-router-dom";

interface BaseCardItem {
  id: string;
  title: string;
  picture?: string | null;
}

interface CardListProps<T extends BaseCardItem> {
  items: T[];
  backendUrl: string;
  onAddClick?: () => void;
  getLink?: (item: T) => string;
  showEditMenu?: (item: T) => boolean;
  onEditClick?: (item: T) => void;
  onDeleteClick?: (item: T) => void;
  optionsItemId?: string | null;
  toggleOptions?: (id: string) => void;
  extraIcons?: (item: T) => React.ReactNode;
  getCountLabel?: (item: T) => string;
}

function CardList<T extends BaseCardItem>({
  items,
  backendUrl,
  onAddClick,
  getLink,
  showEditMenu = () => false,
  onEditClick,
  onDeleteClick,
  optionsItemId,
  toggleOptions,
  extraIcons,
  getCountLabel,
}: CardListProps<T>) {
  return (
    <ul className="card-list">
      {onAddClick && (
        <li onClick={onAddClick} className="card">
          <div className="new-card">
            <i className="fa-solid fa-plus"></i>
          </div>
          <div className="card-infos">
            <h2>Créer</h2>
          </div>
        </li>
      )}

      {items.map((item) => (
        <li key={item.id} className="card">
          {getLink ? (
            <Link to={getLink(item)}>
              <div
                className="card-picture"
                style={{
                  backgroundImage: `url('${
                    item.picture?.startsWith("http")
                      ? item.picture
                      : item.picture
                      ? `${backendUrl}${item.picture}`
                      : "/default-wishlist-picture.jpg"
                  }')`,
                }}
              ></div>
            </Link>
          ) : (
            <div
              className="card-picture"
              style={{
                backgroundImage: `url('${
                  item.picture?.startsWith("http")
                    ? item.picture
                    : item.picture
                    ? `${backendUrl}${item.picture}`
                    : "/default-wishlist-picture.jpg"
                }')`,
              }}
            ></div>
          )}

          <div className="card-infos">
            <div className="card-infos-top">
              {getLink ? (
                <Link to={getLink(item)}>
                  <h2>{item.title}</h2>
                </Link>
              ) : (
                <h2>{item.title}</h2>
              )}

              {showEditMenu(item) && (
                <div className="relative">
                  <i
                    className="fa-solid fa-ellipsis"
                    onClick={() => toggleOptions?.(item.id)}
                  ></i>

                  {optionsItemId === item.id && (
                    <div className="options-menu">
                      {onEditClick && (
                        <button onClick={() => onEditClick(item)}>
                          <i className="fa-solid fa-pen-to-square"></i> Éditer
                        </button>
                      )}
                      {onDeleteClick && (
                        <button onClick={() => onDeleteClick(item)}>
                          <i className="fa-solid fa-trash"></i> Supprimer
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {getCountLabel && <span>{getCountLabel(item)}</span>}
          </div>

          {extraIcons?.(item)}
        </li>
      ))}
    </ul>
  );
}

export default CardList;
