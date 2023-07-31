import { Component } from "react";
import { Popup } from "reactjs-popup";

import NavItems from "../NavItems";
import LastTransactions from "../LastTransactions";
import MiniTabs from "../MiniTabs";
import CreditAndDebit from "../CreditAndDebit";
import Profile from "../Profile";

import "./index.css";

const tabs = [
  {
    id: 1,
    name: "Dashboard",
    urlInActive:
      "https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690712736/home_2_1_yezca8.png",
    urlActive:
      "https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690709060/home_2_faueea.png",
  },
  {
    id: 2,
    name: "Transactions",
    urlInActive:
      "https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690709690/transfer_1_d28fu1.png",
    urlActive:
      "https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690727604/transfer_1_1_ekgu0w.png",
  },
  {
    id: 3,
    name: "Profile",
    urlInActive:
      "https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690709756/user_3_1_jiq2p6.png",
    urlActive:
      "https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690727656/user_3_1_1_eij8ra.png",
  },
];

const miniTabs = [
  {
    id: 1,
    name: "All Transactions",
  },
  {
    id: 2,
    name: "debit",
  },
  {
    id: 3,
    name: "credit",
  },
];

class Dashboard extends Component {
  state = {
    profile: {},
    activeTab: tabs[0].id,
    allTransactions: [],
    miniActiveTab: miniTabs[0].id,
  };

  onChangeTab = (id) => {
    this.setState({ activeTab: id });
  };

  getProfile = async () => {
    const profileUrl =
      "https://bursting-gelding-24.hasura.app/api/rest/profile";
    const options = {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": 1,
      },
      method: "GET",
    };

    const response = await fetch(profileUrl, options);

    if (response.ok) {
      const data = await response.json();
      this.setState({ profile: data.users[0] });
      console.log(data);
    }
  };

  getThreeTransactions = async () => {
    const transactionUrl =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=1";

    const options = {
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": 1,
      },
      method: "GET",
    };

    const response = await fetch(transactionUrl, options);

    if (response.ok) {
      const data = await response.json();
      this.setState({ allTransactions: data.transactions });
    }
  };

  componentDidMount() {
    this.getProfile();
    this.getThreeTransactions();
  }

  renderProfile = () => {
    const { profile } = this.state;
    return (
      <div className="display-profile-container">
        <Profile data={profile} />
      </div>
    );
  };

  renderDashboard = () => {
    const { allTransactions } = this.state;

    const recentTransactions = allTransactions.slice(0, 3);

    return (
      <div>
        <div className="cards-container">
          <div className="cards">
            <div>
              <p className="credit-amount">$12,750</p>
              <p className="credit-text">credit</p>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690717573/Group_1_lkxeil.png"
                alt="credit"
                className="credit-image"
              />
            </div>
          </div>
          <div className="cards">
            <div>
              <p className="debit-amount">$12,750</p>
              <p className="credit-text">debit</p>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690718742/Group_2_avkpqd.png"
                alt="debit"
                className="credit-image"
              />
            </div>
          </div>
        </div>
        <h1 className="last-transaction">Last Transactions</h1>
        <div>
          <ul>
            {recentTransactions.map((each) => (
              <LastTransactions details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    );
  };

  renderTransactions = () => {
    const { allTransactions, miniActiveTab } = this.state;

    let newTransactions;
    if (miniActiveTab === 2) {
      newTransactions = allTransactions.filter((item) => item.type === "debit");
    } else if (miniActiveTab === 3) {
      newTransactions = allTransactions.filter(
        (item) => item.type === "credit"
      );
    } else {
      newTransactions = allTransactions;
    }

    return (
      <div className="transaction-display-container">
        <ul className="transaction-display">
          {newTransactions.map((each) => (
            <CreditAndDebit details={each} key={each.id} />
          ))}
        </ul>
      </div>
    );
  };

  changeMiniTab = (id) => {
    this.setState({ miniActiveTab: id });
  };

  renderDashboardText = () => {
    const { activeTab, miniActiveTab } = this.state;

    if (activeTab === 1) {
      return <p className="accounts-head">Accounts</p>;
    } else if (activeTab === 2) {
      return (
        <div className="mini-tabs">
          <p className="accounts-head">Transactions</p>
          <ul className="mini-tabs-container">
            {miniTabs.map((item) => (
              <MiniTabs
                key={item.id}
                details={item}
                changeMiniTab={this.changeMiniTab}
                miniActiveTab={miniActiveTab}
              />
            ))}
          </ul>
        </div>
      );
    } else {
      return <p className="accounts-head">Profile</p>;
    }
  };

  ReactPopUp = () => (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="add-trans-button ">
            <img
              src="https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690715866/plus_c4cojq.png"
              alt="plus"
              className="plus"
            />
            <p className="button-text">Add Transaction</p>
          </button>
        }
      >
        {(close) => (
          <div className="popup-container">
            <div>
              <h1>Are you sure you want to delete</h1>
              <p>This transactions will be deleted.You cant undo this action</p>
            </div>
            <div>
              <button
                type="button"
                className="trigger-button-confirm"
                onClick={() => close()}
              >
                Yes Delete
              </button>
              <button
                type="button"
                className="trigger-button-ignore"
                onClick={() => close()}
              >
                No Leaveit
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );

  render() {
    const { profile, activeTab } = this.state;
    console.log(profile);

    let renderContent;
    if (activeTab === 1) {
      renderContent = this.renderDashboard();
    } else if (activeTab === 2) {
      renderContent = this.renderTransactions();
    } else {
      renderContent = this.renderProfile();
    }

    return (
      <div className="main-container">
        <div className="navbar">
          <div className="top-nav">
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690707804/Group_kcuz0m.png"
                alt="logo"
                className="logo"
              />
              <p className="logo-head">
                <span className="logo-head logo-span-text">Money</span> patterns
              </p>
            </div>
            <div className="navbar-contents">
              <ul className="list">
                {tabs.map((each) => (
                  <NavItems
                    key={each.id}
                    details={each}
                    activeTab={activeTab}
                    onChangeTab={this.onChangeTab}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="profile">
            <img
              src="https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690712974/Avatar_ti6lya.png"
              alt="avatar"
              className="avatar"
            />
            <div className="profile-content">
              <div className="logout-container">
                <p className="profile-name">{profile.name}</p>
                <button type="button" className="logout">
                  <img
                    src="https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690714053/log-out-01_yljke3.png"
                    alt="logout"
                  />
                </button>
              </div>
              <p className="profile-mail">{profile.email}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="top-bar">
            {this.renderDashboardText()}
            {this.ReactPopUp()}
          </div>
          <div className="bottom-container">{renderContent}</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
