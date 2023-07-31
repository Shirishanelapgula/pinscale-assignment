import "./index.css";

const MiniTabs = (props) => {
  const { details, changeMiniTab, miniActiveTab } = props;
  const { name } = details;

  const buttonStyles =
    miniActiveTab === details.id ? "mini-tabs-button-a" : "mini-tabs-button";

  const miniTabChange = () => {
    changeMiniTab(details.id);
  };

  return (
    <li>
      <button type="button" className={buttonStyles} onClick={miniTabChange}>
        {name}
      </button>
    </li>
  );
};

export default MiniTabs;
