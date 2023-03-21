import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { text } from "@fortawesome/fontawesome-svg-core";
import { Alert } from "react-bootstrap";

function Message({ message, ...props }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(message.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.editMessage({ id: message.id, text });
    setIsEditing(false);
  };

  const editHTML = (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter new message </Form.Label>
        <input
          id={message.id}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
      <Button type="button" onClick={() => setIsEditing(false)}>
        Cancel{" "}
      </Button>
    </Form>
  );

  const previewHTML = (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      {message.role === "user" && (
        <Alert
          className="chat-bubble-user  col-md-4 float-md-end offset-m-1"
          role="alert"
        >
          <h4>{message.username}</h4>
          <p>{message.text}</p>
          {(message.role === "user" || message.role === "admin") && (
            <Button
              variant="secondary"
              type="button"
              onClick={() => props.deleteMessage(message.id)}
            >
              Delete Message
            </Button>
          )}
          {(message.role === "user" || message.role === "admin") && (
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit Message
            </Button>
          )}
        </Alert>
      )}
      {message.role !== "user" && (
        <Alert
          id="chat-message"
          key={message.id}
          className="chat-bubble-other col-md-4 float-md-start  offset-md-1"
        >
          <h4>{message.username}</h4>
          <p>{message.text}</p>
        </Alert>
      )}
    </div>
  );

  return <>{isEditing ? editHTML : previewHTML}</>;
}

function ConvoyChat() {
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [channels, setChannels] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [updatedCaption, setUpdatedCaption] = useState(caption);

  useEffect(() => {
    const getChannels = async () => {
      const response = await fetch("/api_v1/channels/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setChannels(data);
    };
    getChannels();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetch(
        `/api_v1/messages/?channel=${selectedChannel}`
      );
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setMessages(data);
    };

    if (!!selectedChannel) {
      getMessages();
    }
  }, [selectedChannel]);

  const addChannel = async () => {
    const channel = {
      title: title,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(channel),
    };
    const response = await fetch("/api_v1/channels/", options);
    if (!response.ok) {
      throw new Error("network repsonse not ok.");
    }
    const data = await response.json();

    setChannels([...channels, data]);
  };

  const addMessage = async (channel) => {
    const newMessage = {
      text: caption,
      channel: selectedChannel,
    };

    const response = await fetch(`/api_v1/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(newMessage),
    }).catch((err) => console.warn(err));

    if (!response.ok) {
      throw new Error("Failed to add message");
    }

    const data = await response.json();

    setMessages([...messages, data]);
    setCaption("");
  };

  const deleteMessage = async (id) => {
    const response = await fetch(`/api_v1/messages/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete message");
    }

    setMessages(messages.filter((message) => message.id !== id));
  };

  const editMessage = async ({ id, text }) => {
    // setIsEditing(true);

    const response = await fetch(`/api_v1/messages/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({ text }),
    }).catch((err) => console.warn(err));

    if (!response.ok) {
      throw new Error("Failed to update message");
    }

    const data = await response.json();

    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, text: data.text } : message
      )
    );
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const updatedMessage = {
  //     text: updatedCaption,
  //   };

  //   editMessage();
  //   setIsEditing(false);
  // };

  const channelsHTML = channels?.map((channel) => (
    <Dropdown.Item
      key={channel.id}
      type="button"
      onClick={() => setSelectedChannel(channel.id)}
    >
      {" "}
      {channel.title}
    </Dropdown.Item>
  ));

  //END EDIT MESSAGE FUNCTIONALITY//

  const messagesHTML = messages.map((message) => (
    <Message
      message={message}
      deleteMessage={deleteMessage}
      editMessage={editMessage}
    />
  ));

  return (
    <div className="App">
      {title}
      {selectedChannel}

      <Card className="channelform">
        <Card.Header>
          <Dropdown>
            <input
              className="channelinput"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
              name="title"
              placeholder="add a chat group"
            ></input>
            <button
              className="channelbutton"
              type="button"
              onClick={addChannel}
            >
              Add a Chat Group
            </button>
            <Dropdown.Toggle
              className="togglebutton"
              variant="success"
              id="dropdown-basic"
            >
              Chat Groups
            </Dropdown.Toggle>

            <Dropdown.Menu>{channelsHTML}</Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <Form.Label></Form.Label>
        </Card.Body>
      </Card>
      <Form
        className="fixed-bottom addMessageForm"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
      >
        <div id="addMessage" className="toast-body">
          <input
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            type="text"
            name="caption"
            placeholder="Enter your message here"
          />
          <div className="mt-2 pt-2 border-top">
            <img src="" />
            <button type="button" onClick={addMessage}>
              add message
            </button>
          </div>
        </div>
      </Form>

      {messagesHTML}
    </div>
  );
}

export default ConvoyChat;
