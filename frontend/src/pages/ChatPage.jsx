import AuthenticatedChatWindow from '../components/AuthenticatedChatWindow'

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-gray-900 p-4">
            <div className="max-w-7xl mx-auto">
                <AuthenticatedChatWindow />
            </div>
        </div>
    );
} 