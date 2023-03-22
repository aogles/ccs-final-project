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
          <h2>
            <span>☆</span>CONVOY COMMANDER
          </h2>
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
        <Card.Header id="homesubheading">
          <h2>Latest Army News </h2>
          <Card className="subcard1" style={{ width: "10rem" }}>
            <Card.Body
              style={{
                backgroundImage:
                  "url(https://www.goarmy.com/content/dam/goarmy/callout/Version-B-Desktop.webp)",
              }}
            >
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quick example</Card.Text>
            </Card.Body>
          </Card>
          <Card className="subcard2" style={{ width: "10rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quick example</Card.Text>
            </Card.Body>
          </Card>
          <Card className="subcard3" style={{ width: "10rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>Some quick example</Card.Text>
            </Card.Body>
          </Card>
        </Card.Header>
      </Card>
      <div id="homearticles">
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/03/15/a32ad678/size1.jpg"
          />
          <Card.Body>
            <Card.Title>
              <h2>Card Title </h2>
              <h3>Bulk of the card's content</h3>
            </Card.Title>
            <Card.Text>
              There are two ways to write error-free programs; only the third
              one works. (Alan J. Perlis) In C++ it’s harder to shoot yourself
              in the foot, but when you do, you blow off your whole leg. (Bjarne
              Stroustrup) The most amazing achievement of the computer software
              industry is its continuing cancellation of the steady and
              staggering gains made by the computer hardware industry. (Henry
              Petroski) Come to think of it, there are already a million monkeys
              on a million typewriters, and Usenet is nothing like Shakespeare.
              (Blair Houghton) Optimism is an occupational hazard of
              programming; feedback is the treatment. (Kent Beck).
            </Card.Text>
            <Button variant="primary">Continue Reading</Button>
          </Card.Body>
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/02/27/8142bc32/size1.jpg"
          />
          <Card.Body>
            <Card.Title>
              <h2>Card Title </h2>
              <h3>Bulk of the card's content</h3>
            </Card.Title>
            <Card.Text>
              There are two ways to write error-free programs; only the third
              one works. (Alan J. Perlis) In C++ it’s harder to shoot yourself
              in the foot, but when you do, you blow off your whole leg. (Bjarne
              Stroustrup) The most amazing achievement of the computer software
              industry is its continuing cancellation of the steady and
              staggering gains made by the computer hardware industry. (Henry
              Petroski) Come to think of it, there are already a million monkeys
              on a million typewriters, and Usenet is nothing like Shakespeare.
              (Blair Houghton) Optimism is an occupational hazard of
              programming; feedback is the treatment. (Kent Beck)
            </Card.Text>
            <Button variant="primary">Continue Reading</Button>
          </Card.Body>
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/02/13/2dbab785/size1.jpg"
          />
          <Card.Body>
            <Card.Title>
              <h2>Card Title </h2>
              <h3>Bulk of the card's content</h3>
            </Card.Title>
            <Card.Text>
              There are two ways to write error-free programs; only the third
              one works. (Alan J. Perlis) In C++ it’s harder to shoot yourself
              in the foot, but when you do, you blow off your whole leg. (Bjarne
              Stroustrup) The most amazing achievement of the computer software
              industry is its continuing cancellation of the steady and
              staggering gains made by the computer hardware industry. (Henry
              Petroski) Come to think of it, there are already a million monkeys
              on a million typewriters, and Usenet is nothing like Shakespeare.
              (Blair Houghton) Optimism is an occupational hazard of
              programming; feedback is the treatment. (Kent Beck).
            </Card.Text>
            <Button variant="primary">Continue Reading</Button>
          </Card.Body>
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2022/12/21/25a08dab/size1.jpg"
          />
          <Card.Body>
            <Card.Title>
              <h2>Card Title </h2>
              <h3>Bulk of the card's content</h3>
            </Card.Title>
            <Card.Text>
              There are two ways to write error-free programs; only the third
              one works. (Alan J. Perlis) In C++ it’s harder to shoot yourself
              in the foot, but when you do, you blow off your whole leg. (Bjarne
              Stroustrup) The most amazing achievement of the computer software
              industry is its continuing cancellation of the steady and
              staggering gains made by the computer hardware industry. (Henry
              Petroski) Come to think of it, there are already a million monkeys
              on a million typewriters, and Usenet is nothing like Shakespeare.
              (Blair Houghton) Optimism is an occupational hazard of
              programming; feedback is the treatment. (Kent Beck)
            </Card.Text>
            <Button variant="primary">Continue Reading</Button>
          </Card.Body>
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/01/13/4b65823e/size1.jpg"
          />
          <Card.Body>
            <h2>Card Title </h2>
            <h3>Bulk of the card's content</h3>

            <Card.Text>
              There are two ways to write error-free programs; only the third
              one works. (Alan J. Perlis) In C++ it’s harder to shoot yourself
              in the foot, but when you do, you blow off your whole leg. (Bjarne
              Stroustrup) The most amazing achievement of the computer software
              industry is its continuing cancellation of the steady and
              staggering gains made by the computer hardware industry. (Henry
              Petroski) Come to think of it, there are already a million monkeys
              on a million typewriters, and Usenet is nothing like Shakespeare.
              (Blair Houghton) Optimism is an occupational hazard of
              programming; feedback is the treatment. (Kent Beck)
            </Card.Text>
            <Button variant="primary">Continue Reading</Button>
          </Card.Body>
        </Card>
        <Card id="card1" style={{ width: "30rem" }}>
          <Card.Img
            variant="top"
            src="https://api.army.mil/e2/c/images/2023/02/24/309ce66b/size1.jpg"
          />
          <Card.Body>
            <Card.Title>
              <h2>Card Title </h2>
              <h3>Bulk of the card's content</h3>
            </Card.Title>
            <Card.Text>
              Shell-ear sea dragon elasmobranch, escolar Oregon chub snubnose
              eel nurse shark spearfish Pacific cod spookfish sculpin crocodile
              shark. Yellow-edged moray threadsail mackerel stoneroller minnow
              pilchard ruffe Black tetra, desert pupfish. Sandroller Blacksmelt
              round stingray sand tiger, javelin treefish, snakehead shiner
              dhufish moray eel warty angler; cornetfish, longnose whiptail
              catfish. California halibut torrent catfish tripod fish trout cod
            </Card.Text>
            <Button variant="primary">Continue Reading</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Homepage;
