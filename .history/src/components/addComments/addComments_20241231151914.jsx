import React, { useState, useEffect } from "react";
import "./addComments.scss";
import user from "./userImg.png";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../../context/myContext";
import { useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";


const AddComments = ({ news }) => {
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [currentReplyTo, setCurrentReplyTo] = useState(null);
  const { id } = useParams();
  const { isAuthenticated } = useContext(MyContext);

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

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

    setComments((prevComments) => {
      const updatedComments = {
        ...prevComments,
        [news.id]: [...(prevComments[news.id] || []), comment],
      };
      return updatedComments;
    });

    setNewComment("");
  };

  const handleReply = () => {
    if (newComment.trim() === "") return;

    const updatedComments = { ...comments };
    let commentToReply = null;

    if (currentReplyTo) {
      commentToReply = findCommentById(
        updatedComments[news.id],
        currentReplyTo
      );
    } else {
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
                <span>{new Date(reply.id).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="reply-button">
            <button onClick={() => setCurrentReplyTo(reply.id)}>
              Javob berish
            </button>
          </div>
        </div>
        <div className="message" dangerouslySetInnerHTML={{__html: reply.text}}></div>
        {reply.replies && renderReplies(reply.replies)}
      </div>
    ));
  };

  return (
    <div id="comments" className="news-comment">
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
                      {comment.author}{" "}
                      {comment.author === news.authorName && "(muallif)"}
                    </div>
                    <div className="date">
                      <span>{new Date(comment.id).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="reply-button">
                  <button onClick={() => setReplyingTo(comment.id)}>
                    Javob berish
                  </button>
                </div>
              </div>
              <div className="message" dangerouslySetInnerHTML={{__html: comment.text}}></div>
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
            <div className="type">
              <Editor
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
                  }`, // Placeholder qo'shildi
                }}
                value={newComment}
                onEditorChange={(content) => setNewComment(content)}
              />
              {/* <textarea
                          value={productComment}
                          onChange={(e) => setProductComment(e.target.value)}
                          placeholder={
                            currentReplyTo
                              ? "Javob yozing..."
                              : replyingTo
                              ? "Javob yozing..."
                              : "Izoh yozing..."
                          }
                        /> */}
            </div>
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
