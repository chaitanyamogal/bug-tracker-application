const Sidebar = () => {
  return (
    <div class="wrapper d-flex">
      <div class="sidebar">
        <div className="user-details-container" style={{ height: "85px", paddingLeft: "18px" }}>
          <div className="user-details">
            <p>Welcome,</p>
            <p>Chaitanya</p>
            <span class="badge text-bg-primary">Admin</span>
          </div>
        </div>
        <small class="text-muted px-3">PRODUCTIVITY TOOLS</small>
        <ul>
          <li>
            <a href="#">Dashbord</a>
          </li>
          <li>
            <a href="#">Tickets</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
          <li>
            <a href="#">Admin</a>
          </li>
          <li>
            <a href="#">Notifications</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
