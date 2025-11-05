import React, { useState, useEffect, useRef } from "react";
import { usePlayer, usePlayers, useGame } from "@empirica/core/player/classic/react";

export function DyadicChat() {
  const player = usePlayer();
  const players = usePlayers();
  const game = useGame();

  const myPlayerNumber = player.get("playerNumber");

  // Get other players (excluding self)
  const otherPlayers = players.filter(p => p.get("playerNumber") !== myPlayerNumber)
    .sort((a, b) => a.get("playerNumber") - b.get("playerNumber"));

  // Default to first other player
  const [activePartnerId, setActivePartnerId] = useState(
    otherPlayers.length > 0 ? otherPlayers[0].id : null
  );

  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  // Create unique dyad key (always sort player IDs to ensure consistency)
  const getDyadKey = (partnerId) => {
    const ids = [player.id, partnerId].sort();
    return `chat_${ids[0]}_${ids[1]}`;
  };

  // Get messages for current dyad
  const currentDyadKey = activePartnerId ? getDyadKey(activePartnerId) : null;
  const messages = currentDyadKey ? (game.get(currentDyadKey) || []) : [];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!messageInput.trim() || !activePartnerId) return;

    const newMessage = {
      id: `${Date.now()}_${Math.random()}`,
      senderId: player.id,
      senderName: `Player ${myPlayerNumber}`,
      text: messageInput.trim(),
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, newMessage];
    game.set(currentDyadKey, updatedMessages);

    setMessageInput("");
  };

  // Get active partner
  const activePartner = otherPlayers.find(p => p.id === activePartnerId);

  if (otherPlayers.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No other players available
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden p-4">
      <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Tabs for switching between dyadic chats */}
        <div className="bg-gray-100 border-b border-gray-300 rounded-t-lg">
          <div className="flex">
            {otherPlayers.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePartnerId(p.id)}
                className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                  activePartnerId === p.id
                    ? "bg-white text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                Consultant {p.get("playerNumber")}
              </button>
            ))}
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isMyMessage = msg.senderId === player.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    isMyMessage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <div className="text-xs opacity-75 mb-1">
                    {msg.senderName}
                  </div>
                  <div>{msg.text}</div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-300 p-4 bg-gray-50"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={`Message consultant ${activePartner?.get("playerNumber")}...`}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            title="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
