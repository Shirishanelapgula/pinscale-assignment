import "./index.css";

const TransactionItem = (props) => {
  const { details, activeTab, onChangeTab } = props;
  const { id, name, urlInActive, urlActive } = details;

  const clsName = id === activeTab ? "activeText" : "nav-text";
  const url = id === activeTab ? urlActive : urlInActive;

  const changeTab = () => {
    onChangeTab(id);
  };

  return (
    <li>
      <button type="button" className="nav-buttons" onClick={changeTab}>
        <div className="nav-Item">
          <img src={url} alt={id} className="icons" />
          <p className={clsName}>{name}</p>
        </div>
      </button>
    </li>
  );
};

export default TransactionItem;
