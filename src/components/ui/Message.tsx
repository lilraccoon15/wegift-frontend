import type { FC } from "react";

interface MessageProps {
    text: string;
    type?: "error" | "success" | "info";
}

const Message: FC<MessageProps> = ({ text, type = "info" }) => {
    let colorClass = "";
    if (type === "error") colorClass = "not-valid";
    else if (type === "success") colorClass = "valid";

    return (
        <p className={`message ${colorClass}`}>
            {type === "error" && (
                <i
                    className="fa-solid fa-triangle-exclamation"
                    style={{ marginRight: "0.5rem" }}
                ></i>
            )}
            {text}
        </p>
    );
};

export default Message;
