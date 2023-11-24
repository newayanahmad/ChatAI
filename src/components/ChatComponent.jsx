"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";


const ChatComponent = ({ fileId }) => {
    const [chats, setChats] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getMessages = async () => {
        const response = await fetch("/api/get-messages", {
            method: "POST",
            body: JSON.stringify({
                id: fileId
            })
        });
        const d = await response.json()
        setChats(d.messages)
    }

    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: "/api/chat",
        body: {
            fileId,
        },
        initialMessages: chats || [],
    });
    useEffect(() => {
        const messageContainer = document.getElementById("message-container");
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);
    useEffect(() => {
        getMessages()
        setIsLoading(false)
    }, [])
    return (
        <div
            className="relative max-h-screen overflow-scroll"
            id="message-container"
        >
            {/* header */}
            <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
                <h3 className="text-xl font-bold">Chat</h3>
            </div>

            {/* message list */}
            <MessageList messages={messages} isLoading={isLoading} />

            <form
                onSubmit={handleSubmit}
                className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
            >
                <div className="flex">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask any question..."
                        className="w-full"
                    />
                    <Button className="bg-blue-600 ml-2">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChatComponent;