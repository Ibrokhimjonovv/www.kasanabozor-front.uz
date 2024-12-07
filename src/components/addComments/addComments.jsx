import React, { useState, useEffect } from "react";
import "./addComments.scss";
import user from "./userImg.png";
import { Link, useParams } from "react-router-dom";

const AddComments = ({ news }) => {
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // reply uchun yangi holat
  const [currentReplyTo, setCurrentReplyTo] = useState(null); // replyga reply yozish uchun
  const { id } = useParams();

  // Izohlarni localStorage'dan olish
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Izohlarni localStorage'ga saqlash
  useEffect(() => {
    if (Object.keys(comments).length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  useEffect(() => {
    if (news) {
      setComments((prevComments) => ({
        ...prevComments,
        [news.id]: prevComments[news.id] || [],
      }));
    }
  }, [id, news]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment = {
      id: Date.now(),
      text: newComment,
      author: "Foydalanuvchi",
      replies: [],
    };

    // Asosiy izohni qo'shish
    setComments((prevComments) => {
      const updatedComments = {
        ...prevComments,
        [news.id]: [...(prevComments[news.id] || []), comment],
      };
      return updatedComments;
    });

    setNewComment(""); // Inputni tozalash
  };

  const handleReply = () => {
    if (newComment.trim() === "") return;

    const updatedComments = { ...comments };
    let commentToReply = null;

    if (currentReplyTo) {
      // Replyga reply qo'shish
      commentToReply = findCommentById(updatedComments[news.id], currentReplyTo);
    } else {
      // Asosiy reply
      commentToReply = findCommentById(updatedComments[news.id], replyingTo);
    }

    if (commentToReply) {
      commentToReply.replies.push({
        id: Date.now(),
        text: newComment,
        author: "Foydalanuvchi",
        replies: [],
      });
    }

    setComments(updatedComments);
    setNewComment(""); // Inputni tozalash
    setReplyingTo(null); // reply holatini tozalash
    setCurrentReplyTo(null); // current reply holatini tozalash
  };

  const findCommentById = (commentsArray, commentId) => {
    for (let comment of commentsArray) {
      if (comment.id === commentId) {
        return comment;
      }
      if (comment.replies.length > 0) {
        const foundReply = findCommentById(comment.replies, commentId);
        if (foundReply) return foundReply;
      }
    }
    return null;
  };

  const handleCancelReply = () => {
    setReplyingTo(null); // Javobni bekor qilish
    setCurrentReplyTo(null); // Replyga reply holatini bekor qilish
    setNewComment(""); // Inputni tozalash
  };


  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <div key={reply.id} className="replied-messages">
        <div className="who">
          <div className="user">
            <img src={user} alt="" />
            <div className="texts">
              <div className="name">
                {reply.author} {reply.author === news.authorName && "(muallif)"}
              </div>
              <div className="date">
                <span>{new Date(reply.id).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="reply-button">
            <button onClick={() => setCurrentReplyTo(reply.id)}>Javob berish</button>
          </div>
        </div>
        <div className="message">{reply.text}</div>
        {reply.replies && renderReplies(reply.replies)}
      </div>
    ));
  };

  return (
    <div id="comments">
      <h2>Izohlar</h2>
      <div className="commentsInner">
        {comments[news.id] && comments[news.id].length > 0 ? (
          comments[news.id].map((comment) => (
            <div className="user-comment" key={comment.id}>
              <div className="who">
                <div className="user">
                  <img src={user} alt="" />
                  <div className="texts">
                    <div className="name">
                    {comment.author} {comment.author === news.authorName && "(muallif)"}
                    </div>
                    <div className="date">
                      <span>{new Date(comment.id).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="reply-button">
                  <button onClick={() => setReplyingTo(comment.id)}>Javob berish</button>
                </div>
              </div>
              <div className="message">{comment.text}</div>
              {comment.replies && renderReplies(comment.replies)}
            </div>
          ))
        ) : (
          <div>Birinch izohni bildiring!</div>
        )}
      </div>
      <div className="addComment">
        <div className="title">
          <span>Izoh matni</span>
          <Link to="#">Kirish</Link>
        </div>
        {(replyingTo || currentReplyTo) && (
            <button type="button" className="cancel-reply" onClick={handleCancelReply}>
              Javobdan voz kechish
            </button>
          )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newComment.trim() === "") return; // Izoh bo'sh bo'lsa hech narsa qilmasin
            if (currentReplyTo) {
              handleReply(); // Agar javobga reply qo'shish bo'lsa
            } else if (replyingTo) {
              handleReply(); // Agar replyga javob berish bo'lsa
            } else {
              handleAddComment(); // Asosiy izohni qo'shish
            }
          }}
        >
          <div className="type">
            
            <div className="btns">
              <button>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_642_10792)">
                    <path
                      d="M9.05741 5.55655C9.74922 4.97823 10.1992 4.1202 10.1992 3.15C10.1992 1.41295 8.78627 0 7.04922 0H1.79929C1.46805 0 1.19922 0.268176 1.19922 0.599963C1.19922 0.93175 1.46805 1.20004 1.79929 1.20004H2.39926V10.8H1.79929C1.46805 10.8 1.19922 11.0682 1.19922 11.4C1.19922 11.7318 1.46805 12 1.79929 12H7.34925C9.25121 12 10.7993 10.4526 10.7993 8.55C10.7993 7.26899 10.0961 6.15179 9.05741 5.55655ZM7.04922 1.20004C8.12445 1.20004 8.99929 2.07477 8.99929 3.15C8.99929 4.22523 8.12445 5.09996 7.04922 5.09996H3.59929V1.20004H7.04922ZM7.34925 10.8H3.59929V6.3H7.34925C8.59005 6.3 9.59925 7.30975 9.59925 8.55C9.59925 9.79025 8.59005 10.8 7.34925 10.8Z"
                      fill="#353A3E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_642_10792">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" fill="#F8F8F8" />
                  <g clip-path="url(#clip0_642_10794)">
                    <path
                      d="M12.4 4H10.6C10.2689 4 10 4.26818 10 4.59996C10 4.93175 10.2689 5.20004 10.6 5.20004H10.7111L8.04403 14.8H7.60007C7.26884 14.8 7 15.0682 7 15.4C7 15.7318 7.26884 16 7.60007 16H9.40007C9.7312 16 10 15.7318 10 15.4C10 15.0682 9.7312 14.8 9.40007 14.8H9.289L11.956 5.20004H12.4C12.7312 5.20004 13.0001 4.93175 13.0001 4.59996C13.0001 4.26818 12.7312 4 12.4 4Z"
                      fill="#353A3E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_642_10794">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" fill="#F8F8F8" />
                  <g clip-path="url(#clip0_642_10797)">
                    <path
                      d="M14.1992 9.4H9.99925C8.67562 9.4 7.59929 8.45803 7.59929 7.29996C7.59929 6.142 8.67562 5.20004 9.99925 5.20004C11.3229 5.20004 12.3992 6.142 12.3992 7.29996C12.3992 7.63175 12.6681 7.90004 12.9993 7.90004C13.3304 7.90004 13.5993 7.63175 13.5993 7.29996C13.5993 5.48085 11.9847 4 9.99925 4C8.01381 4 6.39926 5.48085 6.39926 7.29996C6.39926 8.0968 6.70951 8.82882 7.22422 9.4H5.79929C5.46805 9.4 5.19922 9.66818 5.19922 9.99996C5.19922 10.3318 5.46805 10.6 5.79929 10.6H9.99925C11.3229 10.6 12.3992 11.542 12.3992 12.7C12.3992 13.858 11.3229 14.8 9.99925 14.8C8.67562 14.8 7.59929 13.858 7.59929 12.7C7.59929 12.3682 7.33046 12.1 6.99922 12.1C6.66809 12.1 6.39926 12.3682 6.39926 12.7C6.39926 14.5192 8.01381 16 9.99925 16C11.9847 16 13.5993 14.5192 13.5993 12.7C13.5993 11.9032 13.289 11.1712 12.7743 10.6H14.1992C14.5305 10.6 14.7993 10.3318 14.7993 9.99996C14.7993 9.66818 14.5305 9.4 14.1992 9.4Z"
                      fill="#353A3E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_642_10797">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" fill="#F8F8F8" />
                  <g clip-path="url(#clip0_642_10800)">
                    <path
                      d="M14.8094 4H12.4094C12.0782 4 11.8094 4.26818 11.8094 4.59996C11.8094 4.93175 12.0782 5.20004 12.4094 5.20004H13.0094V9.99996C13.0094 11.6542 11.6636 13 10.0094 13C8.35516 13 7.00945 11.6542 7.00945 9.99996V5.20004H7.60941C7.94065 5.20004 8.20937 4.93175 8.20937 4.59996C8.20937 4.26818 7.94065 4 7.60941 4H5.20945C4.87821 4 4.60938 4.26818 4.60938 4.59996C4.60938 4.93175 4.87821 5.20004 5.20945 5.20004H5.80941V9.99996C5.80941 12.3154 7.69346 14.2 10.0094 14.2C12.3254 14.2 14.2094 12.3154 14.2094 9.99996V5.20004H14.8094C15.1406 5.20004 15.4094 4.93175 15.4094 4.59996C15.4094 4.26818 15.1406 4 14.8094 4Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M14.2109 14.8H5.8109C5.47966 14.8 5.21094 15.0682 5.21094 15.4C5.21094 15.7318 5.47966 16.0001 5.8109 16.0001H14.2109C14.5421 16.0001 14.8109 15.7318 14.8109 15.4C14.8109 15.0682 14.5421 14.8 14.2109 14.8Z"
                      fill="#353A3E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_642_10800">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" fill="#F8F8F8" />
                  <g clip-path="url(#clip0_642_10804)">
                    <path
                      d="M5.99997 6.00784C5.99997 6.56009 5.55228 7.00778 5.00003 7.00778C4.44769 7.00778 4 6.56009 4 6.00784C4 5.45551 4.44769 5.00781 5.00003 5.00781C5.55228 5.00781 5.99997 5.45551 5.99997 6.00784Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M5.99997 10.0078C5.99997 10.5601 5.55228 11.0078 5.00003 11.0078C4.44769 11.0078 4 10.5601 4 10.0078C4 9.45551 4.44769 9.00781 5.00003 9.00781C5.55228 9.00781 5.99997 9.45551 5.99997 10.0078Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M5.99997 14.0078C5.99997 14.5601 5.55228 15.0079 5.00003 15.0079C4.44769 15.0079 4 14.5601 4 14.0078C4 13.4556 4.44769 13.0078 5.00003 13.0078C5.55228 13.0078 5.99997 13.4556 5.99997 14.0078Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M8.00006 6.50784H15.5001C15.7766 6.50784 16 6.28436 16 6.00787C16 5.73138 15.7766 5.50781 15.5001 5.50781H8.00006C7.72357 5.50781 7.5 5.73138 7.5 6.00787C7.5 6.28436 7.72357 6.50784 8.00006 6.50784Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M15.5001 9.50781H8.00006C7.72357 9.50781 7.5 9.73129 7.5 10.0078C7.5 10.2843 7.72357 10.5078 8.00006 10.5078H15.5001C15.7766 10.5078 16 10.2843 16 10.0078C16 9.73129 15.7766 9.50781 15.5001 9.50781Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M15.5001 13.5078H8.00006C7.72357 13.5078 7.5 13.7313 7.5 14.0078C7.5 14.2843 7.72357 14.5078 8.00006 14.5078H15.5001C15.7766 14.5078 16 14.2843 16 14.0078C16 13.7313 15.7766 13.5078 15.5001 13.5078Z"
                      fill="#353A3E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_642_10804">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" fill="#F8F8F8" />
                  <g clip-path="url(#clip0_642_10812)">
                    <path
                      d="M5.17391 8.43481H4.3913C4.1753 8.43481 4 8.61012 4 8.82612C4 9.04212 4.1753 9.21742 4.3913 9.21742H5.17391C5.24594 9.21742 5.30432 9.27589 5.30432 9.34783V9.47832C5.30432 9.55026 5.24594 9.60873 5.17391 9.60873H4.91301C4.40955 9.60873 4 10.0183 4 10.5217V11.1739C4 11.3899 4.1753 11.5652 4.3913 11.5652H5.69562C5.91162 11.5652 6.08692 11.3899 6.08692 11.1739C6.08692 10.9579 5.91162 10.7826 5.69562 10.7826H4.78261V10.5217C4.78261 10.4498 4.84108 10.3913 4.91301 10.3913H5.17391C5.67737 10.3913 6.08692 9.98179 6.08692 9.47832V9.34783C6.08692 8.84437 5.67737 8.43481 5.17391 8.43481Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M5.17391 12.6086H4.3913C4.1753 12.6086 4 12.7839 4 12.9999C4 13.2159 4.1753 13.3913 4.3913 13.3913H5.17391C5.24594 13.3913 5.30432 13.4496 5.30432 13.5217V13.6521C5.30432 13.7241 5.24594 13.7826 5.17391 13.7826H4.65221C4.4362 13.7826 4.2609 13.9579 4.2609 14.1739C4.2609 14.3899 4.4362 14.5652 4.65221 14.5652H5.17391C5.24594 14.5652 5.30432 14.6235 5.30432 14.6956V14.826C5.30432 14.898 5.24594 14.9565 5.17391 14.9565H4.3913C4.1753 14.9565 4 15.1318 4 15.3478C4 15.5638 4.1753 15.7391 4.3913 15.7391H5.17391C5.67737 15.7391 6.08692 15.3295 6.08692 14.826V14.6956C6.08692 14.5014 6.02483 14.322 5.92108 14.1739C6.02483 14.0257 6.08692 13.8462 6.08692 13.6521V13.5217C6.08692 13.0182 5.67737 12.6086 5.17391 12.6086Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M4.3913 5.04335H4.78261V6.99987C4.78261 7.21587 4.95791 7.39118 5.17391 7.39118C5.38991 7.39118 5.56522 7.21587 5.56522 6.99987V4.65205C5.56522 4.43605 5.38991 4.26074 5.17391 4.26074H4.3913C4.1753 4.26074 4 4.43605 4 4.65205C4 4.86805 4.1753 5.04335 4.3913 5.04335Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M7.65061 6.34795H15.4767C15.7652 6.34795 15.9985 6.11466 15.9985 5.82615C15.9985 5.53764 15.7652 5.30444 15.4767 5.30444H7.65061C7.3621 5.30444 7.12891 5.53764 7.12891 5.82615C7.12891 6.11466 7.3621 6.34795 7.65061 6.34795Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M15.4767 9.47827H7.65061C7.3621 9.47827 7.12891 9.71147 7.12891 9.99998C7.12891 10.2885 7.3621 10.5217 7.65061 10.5217H15.4767C15.7652 10.5217 15.9985 10.2885 15.9985 9.99998C15.9985 9.71147 15.7652 9.47827 15.4767 9.47827Z"
                      fill="#353A3E"
                    />
                    <path
                      d="M15.4767 13.6521H7.65061C7.3621 13.6521 7.12891 13.8854 7.12891 14.1739C7.12891 14.4624 7.3621 14.6956 7.65061 14.6956H15.4767C15.7652 14.6956 15.9985 14.4624 15.9985 14.1739C15.9985 13.8854 15.7652 13.6521 15.4767 13.6521Z"
                      fill="#353A3E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_642_10812">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" fill="#F8F8F8" />
                  <g clip-path="url(#clip0_642_10820)">
                    <path
                      d="M13.0647 11.9969C12.9251 11.9969 12.7855 11.9434 12.6791 11.837C12.4658 11.6238 12.4658 11.279 12.6791 11.0658L14.1327 9.61222C14.6346 9.11523 14.91 8.45086 14.91 7.74015C14.91 6.27946 13.7214 5.09094 12.2607 5.09094C11.5505 5.09094 10.8861 5.3664 10.3904 5.86658L8.93507 7.32187C8.72184 7.5351 8.37707 7.5351 8.16383 7.32187C7.9506 7.10853 7.9506 6.76386 8.16383 6.55053L9.61742 5.09694C10.3179 4.39001 11.2571 4 12.2607 4C14.3231 4 16.0009 5.67781 16.0009 7.74015C16.0009 8.7444 15.6109 9.68363 14.9018 10.3857L13.4499 11.837C13.3435 11.9434 13.2044 11.9969 13.0647 11.9969Z"
                      fill="#AFB3B5"
                    />
                    <path
                      d="M7.74015 15.9999C5.67781 15.9999 4 14.3221 4 12.2598C4 11.2556 4.39001 10.3163 5.09913 9.61435L6.55113 8.16286C6.76436 7.94962 7.10913 7.94962 7.32237 8.16286C7.5356 8.37609 7.5356 8.72086 7.32237 8.9341L5.86877 10.3878C5.3664 10.8847 5.09094 11.549 5.09094 12.2598C5.09094 13.7204 6.27946 14.9091 7.74015 14.9091C8.45036 14.9091 9.11474 14.6336 9.61052 14.1334L11.0658 12.6781C11.279 12.4648 11.6238 12.4648 11.837 12.6781C12.0504 12.8914 12.0504 13.2361 11.837 13.4494L10.3835 14.9031C9.68313 15.6099 8.7438 15.9999 7.74015 15.9999Z"
                      fill="#AFB3B5"
                    />
                    <path
                      d="M7.81898 12.7273C7.67936 12.7273 7.53973 12.6739 7.43336 12.5675C7.22013 12.3543 7.22013 12.0095 7.43336 11.7963L11.797 7.43263C12.0103 7.2194 12.355 7.2194 12.5683 7.43263C12.7816 7.64597 12.7816 7.99064 12.5683 8.20387L8.2046 12.5675C8.09834 12.6739 7.95861 12.7273 7.81898 12.7273Z"
                      fill="#AFB3B5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_642_10820">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" fill="#F8F8F8" />
                  <g clip-path="url(#clip0_642_10825)">
                    <path
                      d="M13.4134 11.6559C13.2738 11.6559 13.1341 11.6025 13.0278 11.4961C12.8144 11.2829 12.8144 10.9381 13.0278 10.7249L14.1296 9.62308C14.6319 9.12561 14.9079 8.46125 14.9079 7.75055C14.9079 6.2893 13.7188 5.09971 12.257 5.09971C11.5468 5.09971 10.8825 5.37566 10.3862 5.87642L9.28271 6.97982C9.06948 7.19315 8.72471 7.19315 8.51148 6.97982C8.29826 6.76659 8.29826 6.42183 8.51148 6.2086L9.61329 5.1063C10.3147 4.39939 11.254 4.00879 12.257 4.00879C14.3204 4.00879 15.9988 5.68716 15.9988 7.75055C15.9988 8.75468 15.6082 9.69339 14.8986 10.3965L13.7985 11.4961C13.6921 11.6025 13.553 11.6559 13.4134 11.6559Z"
                      fill="#AFB3B5"
                    />
                    <path
                      d="M7.74176 16.0088C5.67837 16.0088 4 14.3304 4 12.267C4 11.2629 4.39061 10.3242 5.10021 9.6211L6.20031 8.52149C6.41364 8.30826 6.7583 8.30826 6.97163 8.52149C7.18486 8.73472 7.18486 9.07949 6.97163 9.29272L5.86983 10.3945C5.36687 10.892 5.09092 11.5563 5.09092 12.267C5.09092 13.7283 6.28001 14.9179 7.74176 14.9179C8.45196 14.9179 9.11632 14.6419 9.61259 14.1412L10.7161 13.0378C10.9293 12.8244 11.2741 12.8244 11.4873 13.0378C11.7005 13.251 11.7005 13.5958 11.4873 13.809L10.3855 14.9114C9.6841 15.6182 8.74489 16.0088 7.74176 16.0088Z"
                      fill="#AFB3B5"
                    />
                    <path
                      d="M11.1549 9.39791C11.0153 9.39791 10.8757 9.34448 10.7693 9.23811C10.5561 9.02489 10.5561 8.68012 10.7693 8.46689L11.7947 7.44149C12.008 7.22816 12.3527 7.22816 12.566 7.44149C12.7793 7.65472 12.7793 7.99948 12.566 8.21271L11.5405 9.23811C11.4342 9.34448 11.2945 9.39791 11.1549 9.39791Z"
                      fill="#AFB3B5"
                    />
                    <path
                      d="M7.81905 12.7361C7.67942 12.7361 7.5397 12.6826 7.43343 12.5763C7.22011 12.3629 7.22011 12.0183 7.43343 11.805L8.45884 10.7796C8.67207 10.5663 9.01683 10.5663 9.23006 10.7796C9.44339 10.9928 9.44339 11.3375 9.23006 11.5508L8.20466 12.5763C8.09829 12.6826 7.95867 12.7361 7.81905 12.7361Z"
                      fill="#AFB3B5"
                    />
                    <path
                      d="M15.4544 16.0087C15.3148 16.0087 15.1751 15.9553 15.0688 15.8489L4.16 4.94001C3.94667 4.72678 3.94667 4.38202 4.16 4.16879C4.37323 3.95546 4.71789 3.95546 4.93122 4.16879L15.8401 15.0776C16.0533 15.2909 16.0533 15.6356 15.8401 15.8489C15.7337 15.9553 15.594 16.0087 15.4544 16.0087Z"
                      fill="#AFB3B5"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_642_10825">
                      <rect
                        width="12"
                        height="12"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={currentReplyTo ? "Javob yozing..." : replyingTo ? "Javob yozing..." : "Izoh yozing..."}
            />
          </div>
          <button id="submit" type="submit">
            Yuborish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComments;
