const TicketComment = (props) => {
  return (
    <div className="row d-flex ms-4 mt-3">
      <div className="col-md-8 col-lg-8">
        <div className="card shadow-0 border" style={{ backgroundColor: "#f0f2f5" }}>
          <div className="card-body p-4">
            <div className="form-outline mb-4">
              <input
                type="text"
                id="addANote"
                className="form-control"
                placeholder="Type comment..."
              />
              <label className="form-label">+ Add a note</label>
            </div>

            {props.comments.map((comment) => {
              return (
                <div className="card mb-4">
                  <div className="card-body">
                    <p>{comment.comment}</p>

                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                          alt="avatar"
                          width="25"
                          height="25"
                        />
                        <p className="small mb-0 ms-2">{comment.createdByUserId.name}</p>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <p className="small text-muted mb-0">{comment.createdDate}</p>
                        <i
                          className="far fa-thumbs-up mx-2 fa-xs text-black"
                          style={{ marginTop: "-0.16rem" }}
                        ></i>
                        <p className="small text-muted mb-0">3</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketComment;
