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
  getDefaultPicture?: () => string;
  getPictureUrl?: (item: T) => string;
  getItemClassName?: (item: T) => string;
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
  getDefaultPicture,
  getPictureUrl,
  getItemClassName,
}: CardListProps<T>) {
  const getFinalPictureUrl = (item: T) => {
    if (getPictureUrl) return getPictureUrl(item);
    if (item.picture?.startsWith("http")) return item.picture;
    if (item.picture) return `${backendUrl}${item.picture}`;
    return getDefaultPicture?.() ?? "/default-picture.jpg";
  };

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
        <li
          key={item.id}
          className={`card ${
            getItemClassName ? getItemClassName(item) : ""
          }`.trim()}
        >
          {getLink ? (
            <Link to={getLink(item)}>
              <div
                className="card-picture"
                style={{
                  backgroundImage: `url('${getFinalPictureUrl(item)}')`,
                }}
              ></div>
            </Link>
          ) : (
            <div
              className="card-picture"
              style={{
                backgroundImage: `url('${getFinalPictureUrl(item)}')`,
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
                        <button
                          className="delete"
                          onClick={() => onDeleteClick(item)}
                        >
                          <i className="fa-solid fa-trash"></i> Supprimer
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {getCountLabel && <small>{getCountLabel(item)}</small>}
          </div>

          {extraIcons?.(item)}
        </li>
      ))}
    </ul>
  );
}

export default CardList;
