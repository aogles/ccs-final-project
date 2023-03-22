import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";

function Homepage() {
  return (
    <>
      <Carousel id="carousel-home" fade>
        <Carousel.Item>
          <img
            id="pic1"
            className="d-block w-100"
            src="./documentation/homephotos/home1.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome to Convoy Commander</h3>
            <p>Please enjoy the helpful links and articles</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item id="pic2">
          <img
            className="Home1"
            src="frontend/static/public/Assets/F7C361DE-5EDB-4FCC-9D95-C9855DE6F8B7_1_105_c.jpeg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h2>Welcome to Convoy Commander</h2>
            <p>Please enjoy the helpful links and articles</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./documentation/homephotos/812B8DDF-F670-4BB1-ABE7-99DF69FA6C7A_1_105_c.jpeg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h2>Welcome to Convoy Commander</h2>
            <p>Please enjoy the helpful links and articles</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div id="article1">
        <Card id="article1">
          <h2>Hello</h2>
          <img
            className="articleimg"
            variant="top"
            src="https://api.army.mil/e2/c/images/2022/12/14/f0e963fa/size1.jpg"
            alt=""
          />
          <p>lorem </p>
        </Card>
      </div>
      <Card className="article2">
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>lorem</Card.Text>
        </Card.Body>
      </Card>
      <Card className="article3">
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>lorem</Card.Text>
        </Card.Body>
      </Card>
      <Card className="article4">
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>lorem</Card.Text>
        </Card.Body>
      </Card>
      <Card className="article5">
        <Card.Img variant="top" src="holder.js/100px160" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>lorem</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Homepage;
