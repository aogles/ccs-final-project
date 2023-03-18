import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ConvoyForm({ addConvoy }) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addConvoy({ text });
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        className="text"
        placeholder="Enter Note Convoy Here"
      />
      <Button type="submit" variant="primary">
        Go somewhere
      </Button>
    </Form>
  );
}

export default ConvoyForm;
