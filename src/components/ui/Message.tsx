interface MessageProps {
  text: string;
  type?: "error" | "success" | "info";
}

const Message: React.FC<MessageProps> = ({ text, type = "info" }) => {
  let colorClass = "text-gray-700";
  if (type === "error") colorClass = "not-valid";
  else if (type === "success") colorClass = "valid";

  return <p className={`${colorClass}`}>{text}</p>;
};

export default Message;

// import styles from "./Message.module.scss";

// interface MessageProps {
//   text: string;
//   type?: "error" | "success" | "info";
// }

// const Message: React.FC<MessageProps> = ({ text, type = "info" }) => {
//   let className = styles.message;

//   if (type === "error") className += ` ${styles.error}`;
//   else if (type === "success") className += ` ${styles.success}`;
//   else if (type === "info") className += ` ${styles.info}`;

//   return <p className={className}>{text}</p>;
// };

// export default Message;
