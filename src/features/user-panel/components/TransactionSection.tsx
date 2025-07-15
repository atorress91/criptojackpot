import { ArrowsDownUp, Check, DotsThree, Wallet } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const TransactionSection = () => {
  return (
    <div className="col-xxl-9 col-xl-8 col-lg-8">
      <div className="cmn-box-addingbg mb-6 win40-ragba border radius24 py-xxl-10 py-xl-8 py-5 px-xxl-10 px-xl-8 px-5">
        <div className="d-flex flex-sm-nowrap flex-wrap align-items-center justify-content-sm-between justify-content-center gap-3">
          <div className="trans-pribox d-flex align-items-center border radius24 px-xxl-10 px-4 py-4">
            <div className="box">
              <h3 className="n4-clr mb-2">$2956.00</h3>
              <span className="fw_600 n3-clr">Available Balance</span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-xl-6 gap-4">
            <Link href="#0" className="deposit-box text-center d-center border radius24 d-center">
              <span className="box">
                <span className="icon mb-xxl-5 mb-xl-4 mb-lg-3 mb-2 s1-bg radius-circle d-center">
                  <Wallet className="ph ph-wallet fs-three n0-clr"></Wallet>
                </span>
                <span className="n3-clr fw_600">Deposit</span>
              </span>
            </Link>
            <Link href="#0" className="deposit-box text-center d-center border radius24 d-center">
              <span className="box">
                <span className="icon mb-xxl-5 mb-xl-4 mb-lg-3 mb-2 s1-bg radius-circle d-center">
                  <ArrowsDownUp className="ph ph-arrows-down-up fs-three n0-clr"></ArrowsDownUp>
                </span>
                <span className="n3-clr fw_600">Withdraw</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="cmn-box-addingbg win40-ragba border radius24 pt-xxl-10 pt-xl-8 pt-lg-6 pt-5 pb-5">
        <div className="mb-xxl-10 mb-xl-8 mb-lg-6 mb-5 d-flex align-items-center justify-content-between flex-wrap gap-3 px-xxl-10 px-xl-8 px-5">
          <h3 className="user-title n4-clr">All Transactions</h3>
          <form action="#0" className="min-maxdate">
            <input type="text" placeholder="min - max date" />
          </form>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span className="n4-clr fs20 fw_700">Date</span>
                </th>
                <th>
                  <span className="n4-clr fs20 fw_700">Description</span>
                </th>
                <th>
                  <span className="n4-clr fs20 fw_700">Pay. Method</span>
                </th>
                <th>
                  <span className="n4-clr fs20 fw_700">Amount</span>
                </th>
                <th>
                  <span className="n4-clr fs20 fw_700">Status</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={`transaction-${index}`}>
                  <td>
                    <span className="n3-clr">{transaction.date}</span>
                  </td>
                  <td>
                    <span className="n3-clr">{transaction.description}</span>
                  </td>
                  <td>
                    <span className="n3-clr">{transaction.method}</span>
                  </td>
                  <td>
                    <span className="n3-clr">{transaction.amount}</span>
                  </td>
                  <td>
                    {transaction.actions ? (
                      <div className="n3-clr">
                        <div className="dropdown dropstart">
                          <button className="s1-clr" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <DotsThree weight="bold" className="ph-bold ph-dots-three fs-four" />
                          </button>
                          <ul className="dropdown-menu">
                            {transaction.actions.map((action, actionIndex) => (
                              <li key={actionIndex}>
                                <Link className="dropdown-item" href={action.link}>
                                  {action.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="table-check position-relative">
                        <label className="checkbox-single">
                          <input type="checkbox" name="checkbox" readOnly checked={transaction.checkbox} className="d-none" />
                          <span className="checkmark d-center">{transaction.checkbox && <Check />}</span>
                        </label>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionSection;

const transactions = [
  {
    date: "01 April",
    description: "Withdraw",
    method: "Visa",
    amount: "$760 (USD)",
    actions: [
      { label: "Action", link: "#" },
      { label: "$545", link: "#" },
      { label: "$874", link: "#" },
    ],
  },
  {
    date: "02 April",
    description: "Lottery Purchase",
    method: "PayPal",
    amount: "$760 (USD)",
    checkbox: true,
  },
  {
    date: "03 April",
    description: "Deposit",
    method: "Visa",
    amount: "$760 (USD)",
    checkbox: true,
  },
  {
    date: "04 April",
    description: "Withdraw",
    method: "Visa",
    amount: "$760 (USD)",
    checkbox: true,
  },
  {
    date: "05 April",
    description: "Lottery Purchase",
    method: "PayPal",
    amount: "$760 (USD)",
    checkbox: true,
  },
  {
    date: "06 April",
    description: "Deposit",
    method: "Visa",
    amount: "$760 (USD)",
    checkbox: true,
  },
  {
    date: "07 April",
    description: "Withdraw",
    method: "Visa",
    amount: "$760 (USD)",
    checkbox: true,
  },
  {
    date: "08 April",
    description: "Lottery Purchase",
    method: "PayPal",
    amount: "$760 (USD)",
    checkbox: true,
  },
  {
    date: "09 April",
    description: "Deposit",
    method: "Visa",
    amount: "$760 (USD)",
    checkbox: true,
  },
  {
    date: "10 April",
    description: "Withdraw",
    method: "Visa",
    amount: "$760 (USD)",
    checkbox: true,
  },
];
