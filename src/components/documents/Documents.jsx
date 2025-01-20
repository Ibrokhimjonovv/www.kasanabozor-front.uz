import React, { useContext, useEffect } from "react";
import "./Documents.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import {
  eCommerseServerUrl,
  formatLink,
  mediaServerUrl,
} from "../../SuperVars";

function getDomain(url, subdomain) {
  subdomain = subdomain || false;

  url = url.replace(/(https?:\/\/)?(www.)?/i, "");

  if (!subdomain) {
    url = url.split(".");

    url = url.slice(url.length - 2).join(".");
  }

  if (url.indexOf("/") !== -1) {
    return url.split("/")[0];
  }

  return url;
}

const Documents = () => {
  const { legislativeDoc, bussinessDoc } = useContext(MyContext);

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".doc-cont:not(.revealed)");
      reveals.forEach((revealElement) => {
        const windowHeight = window.innerHeight;
        const revealTop = revealElement.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.9;
        if (
          revealTop < revealPoint &&
          !revealElement.classList.contains("revealed")
        ) {
          revealElement.classList.add("revealed");
        }
      });
    };

    window.addEventListener("scroll", reveal);
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, []);

  return (
    <div id="documents">
      <div className="left-side">
        <div className="title-link">
          <div>
            <h2>Qonunchilik hujjatlari</h2>
            <p>Kasanachilik sohasidagi qonunchilik hujjatlari</p>
          </div>
          <Link to={``}>Ko'proq ko'rish</Link>
        </div>

        {legislativeDoc.map((doc, index) => (
          <div id="top" className={`container doc-cont`} key={index}>
            <p>{doc.title}</p>
            <p>{doc.subtitle}</p>
            <div className="links">
              <a
                href={`${mediaServerUrl}news${formatLink(doc.file)}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="hover-effect"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 10.5V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V10.5M4.66667 7.16667L8 10.5M8 10.5L11.3333 7.16667M8 10.5V2.5"
                    stroke="#41A58D"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Yuklab olish
              </a>
              <Link to="#">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.666992 8.49996C0.666992 8.49996 3.33366 3.16663 8.00033 3.16663C12.667 3.16663 15.3337 8.49996 15.3337 8.49996C15.3337 8.49996 12.667 13.8333 8.00033 13.8333C3.33366 13.8333 0.666992 8.49996 0.666992 8.49996Z"
                    stroke="#0678FA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.00033 10.5C9.10489 10.5 10.0003 9.60453 10.0003 8.49996C10.0003 7.39539 9.10489 6.49996 8.00033 6.49996C6.89576 6.49996 6.00033 7.39539 6.00033 8.49996C6.00033 9.60453 6.89576 10.5 8.00033 10.5Z"
                    stroke="#0678FA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Lex.uz
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="doc-right-side">
        <div className="title-link">
          <div>
            <h2>Kichik biznes loyihalar</h2>
            <p>Turli darajadagi kichik biznes loyihalar</p>
          </div>
          <Link to={``}>Ko'proq ko'rish</Link>
        </div>

        {bussinessDoc.map((doc, index) => (<div id="top" className={`container doc-cont`} key={index}>
              <p>{doc.title}</p>
              <p>{doc.subtitle}</p>
              <div className="links">
                <a
                  href={`${mediaServerUrl}news${formatLink(doc.file)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className="hover-effect"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 10.5V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V10.5M4.66667 7.16667L8 10.5M8 10.5L11.3333 7.16667M8 10.5V2.5"
                      stroke="#41A58D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Yuklab olish
                </a>
                <a href={doc.link} target="_blank" rel="noreferrer">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.666992 8.49996C0.666992 8.49996 3.33366 3.16663 8.00033 3.16663C12.667 3.16663 15.3337 8.49996 15.3337 8.49996C15.3337 8.49996 12.667 13.8333 8.00033 13.8333C3.33366 13.8333 0.666992 8.49996 0.666992 8.49996Z"
                      stroke="#0678FA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.00033 10.5C9.10489 10.5 10.0003 9.60453 10.0003 8.49996C10.0003 7.39539 9.10489 6.49996 8.00033 6.49996C6.89576 6.49996 6.00033 7.39539 6.00033 8.49996C6.00033 9.60453 6.89576 10.5 8.00033 10.5Z"
                      stroke="#0678FA"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {getDomain(doc.link)}
                </a>
              </div>
            </div>))}
      </div>
    </div>
  );
};

export default Documents;
