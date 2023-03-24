import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

function Homepage() {
  return (
    <>
      <Card>
        <Card.Header id="homeheading">
          <h1>
            <span>☆</span>CONVOY COMMANDER
          </h1>
        </Card.Header>
        <Card.Body
          style={{
            backgroundImage:
              "url(https://www.goarmy.com/content/dam/goarmy/callout/Version-B-Desktop.webp)",
          }}
          className="homedeaderimage sticky-top"
        >
          <h1 className="headingtext">BE ALL YOU CAN BE</h1>
        </Card.Body>
      </Card>
      <div id="homearticles">
        <Card id="card1" className="summarycard" style={{ width: "30rem" }}>
          <h2>Brief Summary</h2>
          <p>
            The Convoy Commander app is a mobile application designed to provide
            training for convoy commanders. The app offers various features to
            help convoy commanders learn and practice their skills, such as a
            virtual map that simulates convoy routes and a communication
            platform for coordinating with other members of the convoy.
          </p>
          <p>
            The app includes an information page where leaders can plan, and
            disseminate notes to soldiers that can help mitigate risks. This can
            also help convoy commanders track their progress and identify areas
            for improvement.
          </p>
          <p>
            Overall, the army app provides a valuable tool for training convoy
            commanders and improving their readiness for real-world missions.
          </p>
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/03/15/a32ad678/size1.jpg"
          />
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/02/27/8142bc32/size1.jpg"
          />
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/02/13/2dbab785/size1.jpg"
          />
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2022/12/21/25a08dab/size1.jpg"
          />
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/01/13/4b65823e/size1.jpg"
          />
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/02/24/309ce66b/size1.jpg"
          />
        </Card>
      </div>
    </>
  );
}

export default Homepage;
