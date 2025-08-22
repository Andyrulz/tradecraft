# Azure API Key Setup Guide - TradeCraft AI Chat Widget

## Overview

This guide will help you obtain the necessary Azure API credentials to integrate your AI agent with the TradeCraft chat widget.

## Option 1: Using Azure AI Foundry (Recommended)

### Step 1: Access Azure AI Foundry

1. Go to [Azure AI Foundry](https://ai.azure.com)
2. Sign in with your Azure account
3. Navigate to your project: `https://ai.azure.com/build/projects/Aifoundry`

### Step 2: Get API Keys

1. In your Azure AI Foundry project dashboard
2. Click on **"Settings"** or **"Keys and Endpoint"** section
3. Look for **"API Keys"** or **"Access Keys"**
4. Copy the **Primary Key** or **Key 1**

### Step 3: Get Connection Information

From the same settings page, you'll also need:

- **Endpoint URL**: Should be `https://aabishek-aifoundry1.services.ai.azure.com/api/projects/Aifoundry`
- **Agent ID**: You mentioned this is `asst_iCPILl2X9CpPcXf6MzGj4Yg8`

## Option 2: Using Azure Portal

### Step 1: Access Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Sign in with your Azure account

### Step 2: Find Your AI Resource

1. Search for "AI services" or "Cognitive Services" in the search bar
2. Look for your AI resource (likely named something like "aabishek-aifoundry1")
3. Click on the resource

### Step 3: Get Keys and Endpoint

1. In the left sidebar, click **"Keys and Endpoint"**
2. Copy **Key 1** or **Key 2**
3. Copy the **Endpoint** URL

## Option 3: Using Azure CLI

If you have Azure CLI installed:

```bash
# Login to Azure
az login

# List AI resources
az cognitiveservices account list

# Get keys for your resource
az cognitiveservices account keys list --name "your-resource-name" --resource-group "your-resource-group"

# Get endpoint
az cognitiveservices account show --name "your-resource-name" --resource-group "your-resource-group" --query "properties.endpoint"
```

## Environment Configuration

Once you have your API key, add it to your `.env.local` file:

```bash
# Azure AI Agent Configuration
AZURE_AI_ENDPOINT=https://aabishek-aifoundry1.services.ai.azure.com/api/projects/Aifoundry
AZURE_AGENT_ID=asst_iCPILl2X9CpPcXf6MzGj4Yg8
AZURE_API_KEY=your_actual_api_key_here
```

## Testing Your Configuration

### Test 1: Health Check

Visit: `http://localhost:3000/api/chat`

You should see:

```json
{
  "status": "healthy",
  "service": "TradeCraft AI Chat Agent",
  "timestamp": "2025-01-22T05:45:32.123Z"
}
```

### Test 2: Send a Test Message

Use curl or Postman to test:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, can you help me with trading?"}'
```

## Alternative: Using Service Principal (Production)

For production environments, it's recommended to use Service Principal authentication:

### Step 1: Create Service Principal

```bash
az ad sp create-for-rbac --name "tradecraft-chat-sp" --role "Cognitive Services User"
```

### Step 2: Set Environment Variables

```bash
AZURE_CLIENT_ID=your_client_id
AZURE_CLIENT_SECRET=your_client_secret
AZURE_TENANT_ID=your_tenant_id
```

### Step 3: Update API Code

The current implementation already supports this via `DefaultAzureCredential()`.

## Troubleshooting

### Common Issues

#### 1. "401 Unauthorized" Error

- **Cause**: Invalid API key or expired credentials
- **Solution**: Regenerate API key from Azure portal

#### 2. "403 Forbidden" Error

- **Cause**: Insufficient permissions
- **Solution**: Ensure your account has "Cognitive Services User" role

#### 3. "404 Not Found" Error

- **Cause**: Incorrect endpoint URL
- **Solution**: Verify endpoint URL in Azure portal

#### 4. Agent ID Not Found

- **Cause**: Agent ID might be incorrect
- **Solution**: Check your Azure AI Foundry project for the correct agent ID

### Getting Agent ID

If you need to find your Agent ID:

1. **Azure AI Foundry Method**:

   - Go to your project dashboard
   - Click on "Agents" or "Models"
   - Find your agent and copy its ID

2. **API Method**:
   ```bash
   curl -X GET "https://aabishek-aifoundry1.services.ai.azure.com/api/projects/Aifoundry/agents" \
     -H "Authorization: Bearer YOUR_API_KEY"
   ```

## Security Best Practices

### 1. Environment Variables

- Never commit API keys to version control
- Use `.env.local` for local development
- Use Azure Key Vault for production

### 2. Key Rotation

- Rotate API keys regularly
- Use Key 2 while rotating Key 1
- Update all applications when rotating

### 3. Access Control

- Use least privilege principle
- Create dedicated service principals for different environments
- Monitor API usage and access logs

## Production Deployment

### Vercel Deployment

Add environment variables in Vercel dashboard:

1. Go to your Vercel project settings
2. Click "Environment Variables"
3. Add:
   - `AZURE_AI_ENDPOINT`
   - `AZURE_AGENT_ID`
   - `AZURE_API_KEY`

### Azure App Service

```bash
az webapp config appsettings set --resource-group myResourceGroup --name myAppName --settings AZURE_API_KEY="your_key"
```

### Docker

```dockerfile
ENV AZURE_API_KEY=your_key
ENV AZURE_AI_ENDPOINT=your_endpoint
ENV AZURE_AGENT_ID=your_agent_id
```

## Support Resources

### Documentation

- [Azure AI Services Documentation](https://docs.microsoft.com/en-us/azure/ai-services/)
- [Azure AI Foundry Documentation](https://docs.microsoft.com/en-us/azure/ai-studio/)
- [Azure CLI Reference](https://docs.microsoft.com/en-us/cli/azure/)

### Contact Support

- Azure Support Portal: [support.microsoft.com](https://support.microsoft.com)
- Azure AI Community: [Microsoft Q&A](https://docs.microsoft.com/en-us/answers/topics/azure-ai-services.html)

## Quick Setup Checklist

- [ ] Access Azure AI Foundry or Azure Portal
- [ ] Copy API Key (Key 1 or Primary Key)
- [ ] Copy Endpoint URL
- [ ] Verify Agent ID
- [ ] Add to `.env.local` file
- [ ] Test with health check endpoint
- [ ] Test with chat message
- [ ] Deploy to production with environment variables

---

**Need Help?** If you're still having trouble finding your API key, please share a screenshot of your Azure AI Foundry dashboard or Azure Portal resource page, and I can provide more specific guidance.
