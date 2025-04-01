import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const UserPanelSection = () => {
  return (
    <div className="col-xxl-9 col-xl-8 col-lg-8">
      <div className="cmn-box-addingbg win40-ragba border radius24 py-xxl-10 py-xl-8 py-lg-6 py-5 px-xxl-8 px-xl-6 px-sm-5 px-4">
        <h3 className="user-title n4-clr mb-xxl-10 mb-xl-8 mb-lg-6 mb-5">My ticket number</h3>
        <div className="row g-xl-6 g-4">
          {tickets.map((ticket) => (
            <div key={`ticket-${ticket.id}`} className="col-lg-6 col-md-6">
              <div className="my-ticket-boxwrap position-relative overflow-hidden">
                <div className="my-ticket-box n0-bg d-grid align-items-center h-100 overflow-hidden border radius12 py-xxl-5 py-4 position-relative">
                  <div className="d-flex align-items-center justify-content-between gap-3 mb-12 px-xxl-8 px-xl-6 px-sm-5 px-3">
                    <span className="fs20 fw_700 n4-clr">Ticket#_{ticket.ticketNumber}</span>
                    <span className="fw_600 n4-clr">Contest No: {ticket.contestNumber}</span>
                  </div>
                  <div className="ticket-border position-relative"></div>
                  <div className="d-flex align-items-center justify-content-between gap-3 pt-xl-3 pt-5 px-xxl-8 px-xl-6 px-sm-5 px-3">
                    <div className="ticket-in text-center">
                      <span className="fs18 fw_600 n4-clr d-block mb-2">Ticket No:</span>
                      <span className="s1-clr fw_600">{ticket.ticketNo}</span>
                    </div>
                    <div className="ticket-in text-center">
                      <span className="fs18 fw_600 n4-clr d-block mb-2">Answer</span>
                      <span className="s1-clr fw_600">{ticket.answer}</span>
                    </div>
                    <div className="ticket-in text-center">
                      <span className="fs18 fw_600 n4-clr d-block mb-2">Order</span>
                      <span className="s1-clr fw_600 text-decoration-underline">{ticket.order}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ul className="custom-pagination pt-xxl-15 pt-xl-10 pt-8 d-flex align-items-center justify-content-center gap-xxl-3 gap-2">
          <li>
            <Link href="#0" className="cmn-60 d-center radius-circle nw1-clr n2-bg fs20 fw_700">
              1
            </Link>
          </li>
          <li>
            <Link href="#0" className="cmn-60 d-center radius-circle nw1-clr n2-bg fs20 fw_700 active">
              2
            </Link>
          </li>
          <li>
            <Link href="#0" className="cmn-60 d-center radius-circle nw1-clr n2-bg fs20 fw_700">
              3
            </Link>
          </li>
          <li>
            <Link href="#0" className="cmn-60 d-center radius-circle nw1-clr n2-bg">
              <CaretRight className="ph ph-caret-right nw1-clr fs20"></CaretRight>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserPanelSection;

const tickets = [
  {
    id: 1,
    ticketNumber: "01",
    contestNumber: "R10F",
    ticketNo: "11",
    answer: "Aisa",
    order: "41340",
  },
  {
    id: 2,
    ticketNumber: "02",
    contestNumber: "S11P",
    ticketNo: "71",
    answer: "Aisa",
    order: "41372",
  },
  {
    id: 3,
    ticketNumber: "03",
    contestNumber: "S11P",
    ticketNo: "71",
    answer: "Aisa",
    order: "41340",
  },
  {
    id: 4,
    ticketNumber: "04",
    contestNumber: "S11P",
    ticketNo: "71",
    answer: "Aisa",
    order: "41341",
  },
  {
    id: 5,
    ticketNumber: "05",
    contestNumber: "S11P",
    ticketNo: "71",
    answer: "Aisa",
    order: "41347",
  },
  {
    id: 6,
    ticketNumber: "06",
    contestNumber: "S11P",
    ticketNo: "71",
    answer: "Aisa",
    order: "41302",
  },
];
