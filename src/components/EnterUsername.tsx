import React from "react";

const EnterUsername = (props: {
  username: string;
  setUsername: Function;
  handleConnection: Function;
}) => {
  return (
    <form
      className="enter-username-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.handleConnection();
      }}
    >
      <input
        type="text"
        value={props.username}
        onChange={(e) => props.setUsername(e.target.value)}
        placeholder="Enter your username..."
        required={true}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default EnterUsername;
