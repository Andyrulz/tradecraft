# AI Chat Widget Integration - TradeCraft Pro

## Overview

This document details the implementation of an AI-powered customer service chat widget integrated into the TradeCraft Pro platform. The widget provides instant support to users with platform-specific knowledge and follows modern design patterns for customer service integrations.

## Features

### 🎯 Core Functionality

- **Real-time Chat Interface**: Modern, responsive chat widget with smooth animations
- **AI-Powered Responses**: Intelligent responses based on TradeCraft platform knowledge
- **Conversation Management**: Thread-based conversation history and context retention
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support

### 🎨 Design Features

- **Floating Action Button**: Minimalist chat icon in bottom-right corner
- **Notification Indicators**: Red dot for new messages when widget is closed
- **Minimize/Maximize**: Users can minimize chat while keeping it accessible
- **Professional Styling**: Consistent with TradeCraft brand colors and design system
- **Smooth Animations**: Fade-in/out transitions and hover effects

### 🧠 AI Capabilities

- **Platform Knowledge**: Trained on TradeCraft features, tools, and processes
- **Context Awareness**: Understands trading terminology and platform navigation
- **Multi-topic Support**: Handles queries about trading tools, subscriptions, education, and support
- **Fallback Responses**: Graceful handling of unclear or out-of-scope queries

## Technical Implementation

### Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Chat Widget   │────│   API Route      │────│  Azure AI Agent │
│   (Frontend)    │    │   (/api/chat)    │    │   (Backend)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### File Structure

```
├── components/ui/ChatWidget.tsx          # Main chat widget component
├── app/api/chat/route.ts                 # API endpoint for chat processing
├── components/layout/LayoutClient.tsx    # Updated layout with widget
├── .env.example                          # Environment variables template
└── CUSTOMER_SERVICE_AGENT_KNOWLEDGE_BASE.md
```

### Dependencies Added

```json
{
  "@azure/openai": "^latest",
  "@azure/identity": "^latest"
}
```

## Component Details

### ChatWidget Component

**Location**: `components/ui/ChatWidget.tsx`

**Key Features**:

- TypeScript with full type safety
- React hooks for state management
- Tailwind CSS for responsive styling
- Lucide React icons for UI elements

**State Management**:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [isMinimized, setIsMinimized] = useState(false);
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [threadId, setThreadId] = useState<string | null>(null);
```

**Props**:

```typescript
interface ChatWidgetProps {
  className?: string; // Optional additional CSS classes
}
```

### API Route

**Location**: `app/api/chat/route.ts`

**Endpoints**:

- `POST /api/chat` - Send message and receive AI response
- `GET /api/chat` - Health check endpoint

**Request Format**:

```typescript
{
  message: string;
  threadId?: string;
  sessionId?: string;
}
```

**Response Format**:

```typescript
{
  success: boolean;
  response: string;
  threadId: string;
  conversation?: ChatMessage[];
  error?: string;
}
```

## Configuration

### Environment Variables

Add these variables to your `.env.local` file:

```bash
# Azure AI Agent Configuration
AZURE_AI_ENDPOINT=https://aabishek-aifoundry1.services.ai.azure.com/api/projects/Aifoundry
AZURE_AGENT_ID=asst_iCPILl2X9CpPcXf6MzGj4Yg8
AZURE_API_KEY=your_azure_api_key_here
```

### Azure AI Setup

1. **Create Azure AI Project**:

   ```bash
   # Your endpoint is already configured
   https://aabishek-aifoundry1.services.ai.azure.com/api/projects/Aifoundry
   ```

2. **Agent Configuration**:

   - Agent ID: `asst_iCPILl2X9CpPcXf6MzGj4Yg8`
   - Knowledge Base: Uses the comprehensive customer service knowledge base
   - Capabilities: Customer support, platform guidance, troubleshooting

3. **Authentication**:
   - Uses Azure Default Credential for production
   - Fallback to API key authentication
   - Environment-based configuration

## Usage Guide

### For Developers

1. **Installation**:

   ```bash
   npm install @azure/openai @azure/identity
   ```

2. **Environment Setup**:

   ```bash
   cp .env.example .env.local
   # Fill in your Azure credentials
   ```

3. **Development**:

   ```bash
   npm run dev
   ```

4. **Testing**:
   - Visit `http://localhost:3000`
   - Look for blue chat button in bottom-right corner
   - Test chat functionality and responses

### For Users

1. **Opening Chat**:

   - Click the blue message circle icon in bottom-right corner
   - Widget expands to show chat interface

2. **Sending Messages**:

   - Type message in text area
   - Press Enter to send (Shift+Enter for new line)
   - Click send button

3. **Widget Controls**:
   - **Minimize**: Click minimize icon to collapse while keeping accessible
   - **Close**: Click X to close completely
   - **Notification**: Red dot appears when new messages arrive while closed

## Supported Query Types

### 🔧 Platform Features

- "How do I use the stock screener?"
- "What tools are available?"
- "How does trade plan generation work?"

### 💰 Subscription & Billing

- "What's included in premium?"
- "How do I upgrade my account?"
- "How do I cancel my subscription?"

### 📚 Education & Learning

- "I'm a beginner, where should I start?"
- "What trading strategies do you teach?"
- "Do you have educational content?"

### 🔧 Technical Support

- "My data isn't loading"
- "Charts aren't displaying correctly"
- "I can't log into my account"

### 📊 Trading Questions

- "How accurate are trading plans?"
- "Why are stock prices different from other platforms?"
- "How do I find good stocks to trade?"

## Customization

### Styling

The widget uses Tailwind CSS classes and can be customized by modifying:

```typescript
// Color scheme
"bg-blue-600 hover:bg-blue-700"; // Change primary color
"bg-gray-100 text-gray-800"; // Message bubbles
"border-gray-200"; // Borders

// Sizing
"w-80 h-96 sm:w-96 sm:h-[500px]"; // Widget dimensions
"bottom-4 right-4"; // Position
```

### Behavior

Modify these constants in `ChatWidget.tsx`:

```typescript
const INITIAL_MESSAGE = "Hello! Welcome to TradeCraft Pro! 👋...";
const MAX_MESSAGE_LENGTH = 1000;
const CONVERSATION_HISTORY_LIMIT = 10;
```

### Response Logic

Enhance the AI responses by modifying `generateTradeCraftResponse()` in `app/api/chat/route.ts`:

```typescript
function generateTradeCraftResponse(
  message: string,
  conversation: ChatMessage[]
): string {
  // Add new response patterns
  // Modify existing logic
  // Enhance context awareness
}
```

## Performance Considerations

### Optimization Features

1. **Lazy Loading**: Widget only loads when first opened
2. **Message Limits**: Conversations capped at 20 messages per thread
3. **Input Validation**: Message length limits and sanitization
4. **Error Handling**: Graceful degradation on API failures
5. **Local Storage**: Thread IDs persisted across sessions

### Monitoring

- API response times logged
- Error rates tracked
- User interaction analytics
- Performance metrics available

## Security

### Data Protection

- No sensitive data stored in chat
- Thread IDs are randomly generated
- Messages encrypted in transit
- GDPR compliant data handling

### Input Sanitization

- XSS prevention
- Message length limits
- Content filtering
- Rate limiting ready

## Troubleshooting

### Common Issues

1. **Widget Not Appearing**:

   ```bash
   # Check console for errors
   # Verify ChatWidget import in LayoutClient.tsx
   # Ensure Tailwind CSS is working
   ```

2. **API Errors**:

   ```bash
   # Check environment variables
   # Verify Azure credentials
   # Test /api/chat endpoint directly
   ```

3. **Styling Issues**:
   ```bash
   # Ensure Tailwind CSS classes are available
   # Check for conflicting CSS
   # Verify responsive design
   ```

### Debug Mode

Enable debug logging:

```typescript
// In ChatWidget.tsx
const DEBUG = process.env.NODE_ENV === "development";
if (DEBUG) console.log("Chat Debug:", data);
```

## Future Enhancements

### Planned Features

- **File Upload**: Allow users to share screenshots
- **Voice Messages**: Audio input/output capability
- **Multi-language**: Internationalization support
- **Analytics**: Detailed usage analytics
- **Admin Panel**: Chat management dashboard

### Integration Options

- **CRM Integration**: Connect to customer management systems
- **Email Fallback**: Escalation to email support
- **Live Agent**: Handoff to human agents
- **Knowledge Base**: Direct links to help articles

## Support

For technical issues with the chat widget:

1. Check the console for error messages
2. Verify environment configuration
3. Test API endpoints independently
4. Review Azure AI agent configuration
5. Contact development team for assistance

## Changelog

### Version 1.0.0 (Current)

- ✅ Initial chat widget implementation
- ✅ Azure AI agent integration
- ✅ Mobile responsive design
- ✅ Basic conversation management
- ✅ TradeCraft-specific responses
- ✅ Error handling and fallbacks

---

**Last Updated**: January 2025  
**Maintained By**: TradeCraft Development Team  
**Version**: 1.0.0
