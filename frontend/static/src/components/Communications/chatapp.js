import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConvoyChat() {
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [channels, setChannels] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    const getChannels = async () => {
      const response = await fetch("/api_v1/channels/");

      if (!response.ok) {
        throw new Error("Network response was not OK");
      }

      const data = await response.json();
      setChannels(data);
      setSelectedChannel(data[0].id);
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

  const editMessage = async (id, newCaption) => {
    const updatedMessage = {
      text: newCaption,
    };

    const response = await fetch(`/api_v1/messages/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(updatedMessage),
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

  const messagesHTML = messages.map((message) => (
    <div
      key={message.id}
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog className="messagemodal">
        <Modal.Body>
          <h2>{message.username}</h2>
          <p>{message.text}</p>
          {(message.role === "user" || message.role === "admin") && (
            <Button
              variant="secondary"
              type="button"
              onClick={() => deleteMessage(message.id)}
            >
              Delete Message
            </Button>
          )}
          {message.role === "user" && (
            <Button
              variant="primary"
              type="button"
              onClick={() =>
                editMessage(
                  message.id,
                  prompt("Enter the new caption for this message:")
                )
              }
            >
              {" "}
              Edit
            </Button>
          )}
        </Modal.Body>
      </Modal.Dialog>
    </div>
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
      <form
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
      </form>

      {messagesHTML}
    </div>
  );
}

export default ConvoyChat;
