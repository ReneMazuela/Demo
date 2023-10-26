import React, { useState, useEffect } from 'react';
import { Fragment } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    XMarkIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'

import LogoDefault from "../assets/default.png"
import LogoBot from "../assets/botlogo.png"
import CiolImg from "../assets/ciol.png"
import performApiCall from '../api/api';

const Chatbot = () => {
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [sources, setSources] = useState([]);
    const [sourcesMap, setSourcesMap] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSources, setShowSources] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { text: inputText, isUser: true },
        ]);

        try {
            const { text: responseData, sources: responseSources } = await performApiCall(inputText);
            console.log(responseData, responseSources);
            setChatHistory((prevChatHistory) => [
                ...prevChatHistory,
                { text: responseData, isUser: false },
            ]);

            setInputText('');
            setResponseMessage('');
            setErrorMessage('');

            setSourcesMap(prevSourcesMap => ({
                ...prevSourcesMap,
                [responseData]: responseSources,
            }));


            setSources(responseSources); // Set the sources separately


            typeResponse(responseData);
        } catch (error) {
            console.error(error);
            setErrorMessage('Error occurred while processing the request');
        }
    };



    const typeResponse = (message) => {
        setResponseMessage(message);
    };;

    useEffect(() => {
        setResponseMessage(''); // Reset response message
    }, [inputText]);

    return (
        <div className='relative px-4 py-10 sm:px-6 lg:px-8 lg:py-2 w-full h-[950px] flex flex-col'>
            <div className="border-b border-gray-200 px-4 py-8 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-center py-10 min-w-0 flex-1 flex-col">
                    <img src={CiolImg} alt="" className="justify-center h-60 w-auto mb-4" />
                </div>
            </div>

            <div className="w-full flex-grow overflow-y-auto">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`message ${message.isUser ? 'user' : 'bot'} w-full border-b border-gray-200 px-4 py-4 sm:flex sm:items-start sm:justify-between sm:px-6 lg:px-8`}>
                        {/* Profile Image and Message Sender's Name */}
                        <div className="flex-shrink-0 flex items-center space-x-4">
                            <div className="relative">
                                <img
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                    src={message.isUser ? LogoDefault : LogoBot}
                                    alt=""
                                />
                                <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">

                                </span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-gray-900">
                                            {message.isUser ? 'MDC User' : 'CIOL Assistant'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Message Text */}
                        <div className="text-gray-700 mt-2 sm:mt-0">
                            {message.text}
                        </div>
                        {message.isUser === false && (  // Check if the message is from the bot
                            <div className="query__sources flex flex-wrap">
                                {sourcesMap[message.text]?.map((source, index) => (  // Use optional chaining in case sourcesMap[message.text] is undefined
                                    <button
                                        key={index}
                                        className="query__sources__item bg-white rounded-md text-sm font-semibold text-gray-900 shadow-sm px-4 py-2 m-1"
                                        onClick={() => handleSourceClick(source)}
                                    >
                                        {source.page_label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {responseMessage && (
                    <div className="w-full border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                        {responseMessage}
                        <div className="query__sources flex flex-wrap">
                            {sources.map((source, index) => (
                                <button
                                    key={index}
                                    className="query__sources__item bg-white rounded-md text-sm font-semibold text-gray-900 shadow-sm px-4 py-2 m-1"
                                    onClick={() => handleSourceClick(source)}
                                >
                                    {source.page_label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
hlogan@mdc.edu
samir@cenango.com

            <div className="query__sources">
                <div className="query__title">
                    <button onClick={() => setShowSources(!showSources)}>
                        {showSources ? 'Hide Sources' : 'Show Sources'}
                    </button>
                </div>
                {showSources && (
                    <div className="query__results">
                        {sourcesMap[message.text].map((source, index) => (
                            <div key={index} className="query__sources__item">
                                <p className="query__sources__item__text">
                                    <span>Page Label: {source.page_label}</span>
                                    <span>File Name: {source.file_name}</span>
                                    <span>Relationships: {source.relationships}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-6 flex gap-x-3 border-t border-gray-200 py-4">
                <form onSubmit={handleSubmit} action="#" className="relative flex-auto">
                    <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-blue-900">
                        <label htmlFor="comment" className="sr-only">
                            Enter a prompt
                        </label>
                        <textarea
                            rows={1}
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="block w-full resize-none border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                            placeholder="How can I see my classes on Canvas?"
                        />
                    </div>

                    <div className="absolute inset-x-0 bottom-4 flex justify-between py-2 pl-3 pr-2">
                        <div className="flex items-center space-x-5">

                        </div>
                        <button
                            type="submit"
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-blue-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"

                        >
                            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </form>
            </div>


            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};
export default Chatbot;

