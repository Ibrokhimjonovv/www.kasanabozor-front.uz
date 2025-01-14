import React, { useState, useEffect } from "react";
import "../addComments/addComments.scss";
import user from "../addComments/userImg.png";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import { useContext } from "react";
import axios from 'axios';
import { eCommerseServerUrl } from '../../SuperVars';


const AddProductsComments = ({ com }) => {
  const [comments, setComments] = useState([]);
  const [productComment, setProductComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [currentReplyTo, setCurrentReplyTo] = useState(null);
  const { id } = useParams();
  const { isAuthenticated } = useContext(MyContext);

  const loadData = async () => {
    const response = await axios.post(`${eCommerseServerUrl}products/comments/list/`, {'id': id});
    if (response.data.status === "ok") {
      console.log(response.data.results, "product comments");
      setComments(response.data.results);
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      await loadData();
    };
    fetchComments();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(loadData, 15000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAddComment = async () => {
    if (productComment.trim() === "") return;

    const comment = {
      text: productComment,
      product: com.id
    };

    try {
      const response = await axios.post(`${eCommerseServerUrl}products/comments/create/`, comment);
      console.log(response);
      if (response.data.status === "ok") {
        setComments((prevComments) => {
          return [...prevComments, response.data.results]
        });
      }
    } catch (err) {
      console.log(err);
    }

    setProductComment("");
  };
  
  const handleReply = async () => {
    if (productComment.trim() === "") return;

    if (replyingTo) {
      const comment = {
        text: productComment,
        product: com.id,
        reply_to: replyingTo
      };

      try {
        const response = await axios.post(`${eCommerseServerUrl}products/comments/reply/`, comment);
        console.log(response);
        if (response.data.status === "ok") {
          loadData();
        }
      } catch (err) {
        console.log(err);
      }
    }

    setProductComment("");
    setReplyingTo(null);
    setCurrentReplyTo(null);
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
    setReplyingTo(null); 
    setCurrentReplyTo(null);
    setProductComment("");
  };
  
  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <div key={reply.id} className="replied-messages">
        <div className="who">
          <div className="user">
          <img src={`http://5.75.178.236:4900${reply.user.pfp}`} alt="" />
            <div className="texts">
              <div className="name">
              {reply.user.first_name} {reply.user.last_name} {reply.user.id === com.user.id && "(muallif)"}
              </div>
              <div className="date">
              <span>{new Date(reply.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="message">{reply.text}</div>
      </div>
    ));
  };

  return (
    <div id="comments">
      <h2>Izohlar</h2>
      <div className="commentsInner">
        {comments.length > 0 ? <>{comments.map((comment) => <div className="user-comment" key={comment.id}>
            <div className="who">
              <div className="user">
                <img src={`http://5.75.178.236:4900${comment.user.pfp}`} alt="" />
                <div className="texts">
                  <div className="name">
                    {comment.user.first_name} {comment.user.last_name} {comment.user.id === com.user.id && "(muallif)"}
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
            {comment.product_comment_Ecommerce_comment_replies && renderReplies(comment.product_comment_Ecommerce_comment_replies)}
          </div>)}</> : <div>Birinch izohni bildiring!</div>
        }
      </div>
      <div className="addComment">
        <div className="title">
          <span>Izoh matni</span>
          {isAuthenticated ? <></> : <Link to="/login">Kirish</Link>}
        </div>
        {(replyingTo || currentReplyTo) && (
          <button
            type="button"
            className="cancel-reply"
            onClick={handleCancelReply}
          >
            Javobdan voz kechish
          </button>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (productComment.trim() === "") return;
            if (currentReplyTo) {
              handleReply(); 
            } else if (replyingTo) {
              handleReply(); 
            } else {
              handleAddComment();
            }
          }}
        >
          <div className="type">
            {/* <Editor
              id="Editor"
              apiKey="qdqrf5hsllrkplvd2x0u6imudcp9wj4dz3xw9ezkm8awydo8"
              init={{
                plugins: [
                  "anchor",
                  "autolink",
                  "charmap",
                  "codesample",
                  "emoticons",
                  "image",
                  "link",
                  "lists",
                  "media",
                  "searchreplace",
                  "table",
                  "visualblocks",
                  "wordcount",
                  "checklist",
                  "mediaembed",
                  "casechange",
                  "export",
                  "formatpainter",
                  "pageembed",
                  "a11ychecker",
                  "tinymcespellchecker",
                  "permanentpen",
                  "powerpaste",
                  "advtable",
                  "advcode",
                  "editimage",
                  "advtemplate",
                  "mentions",
                  "tinycomments",
                  "tableofcontents",
                  "footnotes",
                  "mergetags",
                  "autocorrect",
                  "typography",
                  "inlinecss",
                  "markdown",
                  "importword",
                  "exportword",
                  "exportpdf",
                ],
                toolbar:
                  "bold italic underline strikethrough link numlist bullist",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
                mergetags_list: [],
                placeholder: `${
                  currentReplyTo
                    ? "Javob yozing..."
                    : replyingTo
                    ? "Javob yozing..."
                    : "Izoh yozing..."
                }`,
              }}
              value={productComment}
              onEditorChange={(content) => setProductComment(content)}
            /> */}
            <textarea
              value={productComment}
              onChange={(e) => setProductComment(e.target.value)}
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

export default AddProductsComments;
