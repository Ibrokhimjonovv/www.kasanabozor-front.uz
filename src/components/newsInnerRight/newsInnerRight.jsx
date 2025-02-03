import React, { useContext } from "react";
import "./newsInnerRight.scss";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import { formatLink, mediaServerUrl } from "../../SuperVars";

const NewsInnerRight = () => {
  const { newsCategories, newsList } = useContext(MyContext);

  if (newsCategories.length <= 0) {
    return <></>;
  }

  return (
    <div className="right-side">
      <div className="categories categories-desktop-version">
        <h2>Katgoriyalar</h2>
        <ul>
          {
            newsCategories.map((category, index) => (
              <li key={index}>
                <Link to={`/news/${category.id}`}>{category.title}</Link>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="last-news">
        <h2>So'nggi yangilikar</h2>
        <ul>
          { newsList.slice(newsList.length - 6, newsList.length).map((value, index) => <li key={ index }>
            <Link to="#">
              <div className="row">
                <div className="row-right">
                  <img src={ `${mediaServerUrl}news${formatLink(value.thumbnail)}` } alt="" />
                </div>
                <div className="row-left" style={{ alignItems: 'start' }}>
                  <div className="row-new-title">{ value.title }</div>
                  <div className="row-new-date">
                    <div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_600_4192)">
                          <path
                            d="M10.0013 5V10L13.3346 11.6667M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_600_4192">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      {value.created_at.split('T')[0]}
                    </div>
                    <div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.832031 9.99999C0.832031 9.99999 4.16536 3.33333 9.9987 3.33333C15.832 3.33333 19.1654 9.99999 19.1654 9.99999C19.1654 9.99999 15.832 16.6667 9.9987 16.6667C4.16536 16.6667 0.832031 9.99999 0.832031 9.99999Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.9987 12.5C11.3794 12.5 12.4987 11.3807 12.4987 9.99999C12.4987 8.61928 11.3794 7.49999 9.9987 7.49999C8.61799 7.49999 7.4987 8.61928 7.4987 9.99999C7.4987 11.3807 8.61799 12.5 9.9987 12.5Z"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      { 11 + value.id }
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>) }
        </ul>
      </div>
      <div className="popularity">
        <h2>Ommabop maqolalar</h2>
        <ul>
          { newsList.slice(newsList.length / 2 - 6, newsList.length / 2).map((value, index) => <li key={ index }>
            <p>{value.title}</p>
            <div className="date">
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_600_4192)">
                    <path
                      d="M10.0013 5V10L13.3346 11.6667M18.3346 10C18.3346 14.6024 14.6037 18.3333 10.0013 18.3333C5.39893 18.3333 1.66797 14.6024 1.66797 10C1.66797 5.39763 5.39893 1.66667 10.0013 1.66667C14.6037 1.66667 18.3346 5.39763 18.3346 10Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_600_4192">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                { value.created_at.split('T')[0] }
              </div>
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.832031 9.99999C0.832031 9.99999 4.16536 3.33333 9.9987 3.33333C15.832 3.33333 19.1654 9.99999 19.1654 9.99999C19.1654 9.99999 15.832 16.6667 9.9987 16.6667C4.16536 16.6667 0.832031 9.99999 0.832031 9.99999Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.9987 12.5C11.3794 12.5 12.4987 11.3807 12.4987 9.99999C12.4987 8.61928 11.3794 7.49999 9.9987 7.49999C8.61799 7.49999 7.4987 8.61928 7.4987 9.99999C7.4987 11.3807 8.61799 12.5 9.9987 12.5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                { 13 + value.id }
              </div>
            </div>
          </li>) }
        </ul>
      </div>
    </div>
  );
};

export default NewsInnerRight;
