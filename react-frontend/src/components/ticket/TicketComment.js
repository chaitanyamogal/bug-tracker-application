import { useEffect, useState } from "react";
import { getToken, getUserId } from "../../auth";
import { createComment } from "../../services/ticketService.js/createComment";
import { getTicketById } from "../../services/ticketService.js/getTicketById";

const TicketComment = (props) => {
  const userId = getUserId();
  const token = getToken();
  const ticketId = props.ticketId;

  const [comments, setComments] = useState({ comments: [] });
  const [comment, setComment] = useState({ comment: "" });

  useEffect(() => {
    getTicketById(ticketId, token).then((data) => {
      setComments({
        comments: data.comments
      });
    });
  }, []);

  function handleChange(event) {
    setComment({ comment: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createComment(userId, ticketId, comment, token).then((data) => {
      setComments((prevComment) => {
        return { comments: [...prevComment.comments, data] };
      });
      setComment({ comment: "" });
    });
  }

  return (
    <div>
      <div className="p-2">
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-3">
            <label for="comment">Add comment</label>
            <textarea
              className="form-control"
              rows="3"
              value={comment.comment}
              onChange={(event) => {
                handleChange(event);
              }}
            ></textarea>
          </div>
          <div className="text-center pt-1 mb-5 pb-1 mt-3">
            <button
              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-2 float-end"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        {comments.comments.map((comment) => {
          return (
            <div className="card mb-4">
              <div className="card-body p-2">
                <p>{comment.comment}</p>

                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <i className="bi bi-person h4 mb-0"></i>
                    <i>
                      <p className="small mb-0 ms-2">{comment.createdByUserId.name}</p>
                    </i>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <p className="small text-muted mb-0">{comment.createdDate}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketComment;
