import React from "react";
import { useAuth } from "../../context/AuthContext";
import "../styles/chatItem.css";  // Adjust the path if the location is different

// Function to extract code blocks enclosed in triple backticks (```), also handle paragraphs
function extractCodeFromString(message: string) {
  const blocks = message.split("```");
  if (blocks.length > 1) {
    // Return all blocks with even indexes as code
    const codeBlocks = blocks.filter((_, index) => index % 2 === 1);
    const nonCodeBlocks = blocks.filter((_, index) => index % 2 === 0);
    return { codeBlocks, nonCodeBlocks };
  }
  return { codeBlocks: [], nonCodeBlocks: [message] }; // No code blocks
}


const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const { codeBlocks, nonCodeBlocks } = extractCodeFromString(content);
  const auth = useAuth();

  // Custom function to render code blocks with highlighting effect
  const renderCodeBlock = (code: string) => (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );

  // Render content for assistant or user
  return role === "assistant" ? (
    <div className="chat-item assistant">
      <div className="avatar">
        <img src="openai.png" alt="openai" width="30px" />
      </div>
      <div className="message-content">
        {/* Render non-code content */}
        {nonCodeBlocks.map((block, index) => (
          <p key={index}>{block.split("\n").map((line, idx) => <span key={idx}>{line}<br /></span>)}</p>
        ))}

        {/* Render code blocks */}
        {codeBlocks.map((block, index) => (
          <React.Fragment key={index}>{renderCodeBlock(block)}</React.Fragment>
        ))}
      </div>
    </div>
  ) : (
    <div className="chat-item user">
      <div className="avatar">
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </div>
      <div className="message-content">
        {/* Render non-code content */}
        {nonCodeBlocks.map((block, index) => (
          <p key={index}>{block.split("\n").map((line, idx) => <span key={idx}>{line}<br /></span>)}</p>
        ))}

        {/* Render code blocks */}
        {codeBlocks.map((block, index) => (
          <React.Fragment key={index}>{renderCodeBlock(block)}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatItem;