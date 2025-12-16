import { Link } from "react-router-dom";

export function ServiceCard(props) {
  return (
    <>
      <div
        class="card"
        style={{ width: "18rem", boxShadow: "2px 1px 3px 1px #b12d51" }}
      >
        <img
          src={props.img}
          class="card-img-top"
          style={{
            height: "170px",
            marginLeft: "20px",
            marginRight: "20px",
            width: "230px",
          }}
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card’s content.
          </p>
          <Link
            to="/appointment"
            class="btn "
            style={{ backgroundColor: "#b12d51" }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </>
  );
}
