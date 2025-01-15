import React, { useState, useEffect } from "react";
import "./addComments.scss";
import user from "./userImg.png";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import { useContext } from "react";
import axios from "axios";
import { eCommerseServerUrl } from "../../SuperVars";

const AddComments = ({ news }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [currentReplyTo, setCurrentReplyTo] = useState(null);
  const { id } = useParams();
  const { isAuthenticated } = useContext(MyContext);

  // Fetch comments from the server
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.post(
          `${eCommerseServerUrl}lessons/exact/comments/list/`,
          { id: news.id }
        );
        if (response.data.status === "ok") {
          setComments(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [news.id]);

  // Add a new comment
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const comment = {
      text: newComment,
      course: news.id,
    };

    try {
      const response = await axios.post(
        `${eCommerseServerUrl}lessons/exact/comments/create/`,
        comment
      );
      if (response.data.status === "ok") {
        setComments((prevComments) => [...prevComments, response.data.results]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Reply to an existing comment
  const handleReply = async () => {
    if (newComment.trim() === "") return;

    const comment = {
      text: newComment,
      course: news.id,
      reply_to: replyingTo || currentReplyTo,
    };

    try {
      const response = await axios.post(
        `${eCommerseServerUrl}lessons/exact/comments/reply/`,
        comment
      );
      if (response.data.status === "ok") {
        setComments(response.data.results); // Assume server returns updated comments
        setNewComment("");
        setReplyingTo(null);
        setCurrentReplyTo(null);
      }
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setCurrentReplyTo(null);
    setNewComment("");
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
                <span>{new Date(reply.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="reply-button">
            <button onClick={() => setCurrentReplyTo(reply.id)}>
              Javob berish
            </button>
          </div>
        </div>
        <div className="message">{reply.text}</div>
        {reply.replies && renderReplies(reply.replies)}
      </div>
    ));
  };

  return (
    <div id="comments" className="news-comment">
      <h2>Izohlar</h2>
      <div className="commentsInner">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div className="user-comment" key={comment.id}>
              <div className="who">
                <div className="user">
                  <img src={user} alt="" />
                  <div className="texts">
                    <div className="name">
                      {comment.author}{" "}
                      {comment.author === news.authorName && "(muallif)"}
                    </div>
                    <div className="date">
                      <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="reply-button">
                  <button onClick={() => setReplyingTo(comment.id)}>
                    Javob berish
                  </button>
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
          {isAuthenticated ? null : <Link to="/login">Kirish</Link>}
        </div>
        {(replyingTo || currentReplyTo) && (
          <button type="button" className="cancel-reply" onClick={handleCancelReply}>
            Javobdan voz kechish
          </button>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (newComment.trim() === "") return;
            if (currentReplyTo || replyingTo) {
              handleReply();
            } else {
              handleAddComment();
            }
          }}
        >
          <div className="type">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={
                currentReplyTo
                  ? "Javob yozing..."
                  : replyingTo
                  ? "Javob yozing..."
                  : "Izoh yozing..."
              }
            />
          </div>
          {isAuthenticated ? (
            <button id="submit" type="submit">
              Yuborish
            </button>
          ) : (
            <div style={{ marginTop: "20px" }}>
              <Link to="/login" id="submit">
                Iltimos xisobingizga kiring
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddComments;

