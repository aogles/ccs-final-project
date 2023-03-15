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
            className="d-block w-100"
            src="./documentation/homephotos/812B8DDF-F670-4BB1-ABE7-99DF69FA6C7A_1_105_c.jpeg"
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

      <div className="article-section">
        <Row xs={1} md={1} className="g-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Col>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Homepage;
