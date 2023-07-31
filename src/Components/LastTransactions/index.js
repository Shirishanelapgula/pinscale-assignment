import "./index.css";

const LastTransactions = (props) => {
  const { details } = props;
  const { id, amount, category, date, transaction_name, type } = details;

  const formatAMPM = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const newDate = new Date(date);
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();
    let day = newDate.getDate();
    let month = newDate.getMonth();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime =
      day + " " + months[month + 1] + " " + hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const newDate = formatAMPM(date);

  const debitUrl =
    "https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690793971/Group_328_hntzhw.png";
  const creditUrl =
    "https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690794041/Group_326_sl12dp.png";

  const url = type === "debit" ? debitUrl : creditUrl;

  const amountColor =
    type === "debit" ? "amount-text-debit" : "amount-text-credit";

  return (
    <div className="transaction-container">
      <div className="icon-text-container">
        <img src={url} alt={id} className="transactions-icon" />
        <p className="transaction-type">{transaction_name}</p>
      </div>
      <p className="cat-dat">{category}</p>
      <p className="cat-dat">{newDate}</p>
      <p className={amountColor}>${amount}</p>
      <div className="icons-container">
        <button type="button" className="icon-buttons">
          <img
            src="https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690795340/pencil-02_wn3oly.png"
            alt="edit"
            className="mini"
          />
        </button>
        <button type="button" className="icon-buttons">
          <img
            src="https://res.cloudinary.com/dqfmzzr5g/image/upload/v1690797124/trash-01_kwxu8a.png"
            alt="delete"
            className="mini"
          />
        </button>
      </div>
    </div>
  );
};

export default LastTransactions;
