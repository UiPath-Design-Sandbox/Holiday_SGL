import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Envelope3D from './Envelope';
import { TEAM_NAMES } from '../teamNames';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    sender: string;
    postcardImage?: string;
    wishes?: string;
    presentId?: string;
    onSend?: (presentId: string) => void;
    isAlreadySent?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, sender, postcardImage, wishes, presentId, onSend, isAlreadySent = false }) => {
    const [recipient, setRecipient] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPlane, setShowPlane] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setRecipient('');
            setShowPlane(false);
        }
    }, [isOpen]);

    const generateRecipient = () => {
        setIsGenerating(true);
        // Filter out the sender from available recipients
        const availableRecipients = TEAM_NAMES.filter(name => name !== sender);
        
        // If no other recipients available, show sender (edge case)
        if (availableRecipients.length === 0) {
            setRecipient(sender);
            setIsGenerating(false);
            return;
        }
        
        // Simulate a quick generation animation
        let count = 0;
        const interval = setInterval(() => {
            // Randomly select from available recipients (excluding sender)
            const randomIndex = Math.floor(Math.random() * availableRecipients.length);
            setRecipient(availableRecipients[randomIndex]);
            count++;
            if (count >= 8) {
                clearInterval(interval);
                setIsGenerating(false);
            }
        }, 100);
    };

    const handleSend = () => {
        // Mark present as sent if presentId and onSend are provided
        if (presentId && onSend) {
            onSend(presentId);
        }
        // Close modal first
        onClose();
        // Then show the 3D paper plane animation
        setTimeout(() => {
            setShowPlane(true);
        }, 300); // Small delay to let modal close animation complete
    };

    const handlePlaneComplete = () => {
        setShowPlane(false);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-2xl w-full shadow-2xl relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Title - Top Left */}
                            <div className="absolute top-4 left-4 z-10">
                                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                                    🎄 Holiday Wishes
                                </h2>
                            </div>

                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-600 hover:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                            >
                                ✕
                            </button>

                            {/* Postcard Image with Wishes Overlay */}
                            <div className="relative w-full h-96 bg-gradient-to-br from-red-100 to-green-100 overflow-hidden">
                                {postcardImage ? (
                                    <>
                                        <img
                                            src={postcardImage}
                                            alt="Holiday Postcard"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Gradient overlay for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl">
                                        🎄
                                    </div>
                                )}

                                {/* Wishes Text Overlay */}
                                {wishes && (
                                    <div className="absolute inset-0 flex items-end p-6">
                                        <div className="w-full">
                                            <p className="text-white text-lg md:text-xl leading-relaxed drop-shadow-lg" style={{ fontFamily: "'Kalam', cursive" }}>
                                                <span className="text-3xl md:text-4xl leading-none">"</span>
                                                {wishes}
                                                <span className="text-3xl md:text-4xl leading-none">"</span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-8">

                                {/* Sender and Recipient - Horizontal Layout with Enhanced Typography */}
                                <div className="flex items-center justify-between gap-8">
                                    {/* Sender */}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">From</span>
                                        <span className="text-2xl md:text-3xl font-bold text-gray-800">{sender}</span>
                                    </div>

                                    {/* Recipient with Generate Button */}
                                    <div className="flex flex-col gap-1 items-end">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">To</span>
                                        <div className="flex items-center gap-2">
                                            {isAlreadySent ? (
                                                <motion.span
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="text-2xl md:text-3xl font-bold text-gray-800"
                                                >
                                                    {recipient || 'Already sent!'}
                                                </motion.span>
                                            ) : recipient ? (
                                                <motion.span
                                                    key={recipient}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="text-2xl md:text-3xl font-bold text-gray-800"
                                                >
                                                    {recipient}
                                                </motion.span>
                                            ) : (
                                                <>
                                                    <span className="text-sm text-gray-400 italic">Not selected</span>
                                                    <button
                                                        onClick={generateRecipient}
                                                        disabled={isGenerating}
                                                        className="ml-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isGenerating ? '🎲' : 'Generate'}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Send Button - Hidden if already sent */}
                                {!isAlreadySent && (
                                    <motion.button
                                        onClick={handleSend}
                                        disabled={!sender || !recipient}
                                        whileHover={{ scale: sender && recipient ? 1.02 : 1 }}
                                        whileTap={{ scale: sender && recipient ? 0.98 : 1 }}
                                        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${sender && recipient
                                            ? 'bg-gradient-to-r from-[#d6eef2] via-[#e8d5f2] to-[#f2d6e8] hover:from-[#c0e0e8] hover:via-[#d8c5e8] hover:to-[#e8c0d8] text-gray-800 shadow-lg hover:shadow-xl'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {sender && recipient ? '✈️ Send Wishes' : '🔒 Complete Details to Send'}
                                    </motion.button>
                                )}
                                
                                {/* Already Sent Message */}
                                {isAlreadySent && (
                                    <div className="w-full py-4 px-6 rounded-lg font-semibold text-lg bg-gray-200 text-gray-600 text-center">
                                        ✅ Wishes Already Sent!
                                    </div>
                                )}


                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* 3D Envelope Animation */}
            <Envelope3D isVisible={showPlane} onComplete={handlePlaneComplete} />
        </>
    );
};
