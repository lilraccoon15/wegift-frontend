interface MessageProps {
  text: string;
  type?: "error" | "success" | "info";
}

const Message: React.FC<MessageProps> = ({ text, type = "info" }) => {
  let colorClass = "text-gray-700";
  if (type === "error") colorClass = "text-red-500";
  else if (type === "success") colorClass = "text-green-500";

  return <p className={`${colorClass} my-2`}>{text}</p>;
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
