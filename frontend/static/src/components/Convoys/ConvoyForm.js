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
    <Form className="convoyaddform" onSubmit={handleSubmit}>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        className="text"
        placeholder="Create a new convoy"
      />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
}

export default ConvoyForm;
