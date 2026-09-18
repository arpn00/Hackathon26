# Configuration Guide

This guide covers how to configure ZebraAI for different environments, including local development, staging, and production deployments.

## Configuration Overview

ZebraAI uses a hierarchical configuration system with the following priority order:
1. **User Secrets** (development only)
2. **Environment Variables**
3. **Azure Key Vault** (non-development environments)
4. **appsettings.{Environment}.json**
5. **appsettings.json** (base configuration)

## Environment Configuration Files

### Base Configuration (`appsettings.json`)
Contains settings common to all environments:

```json
{
  "DetailedErrors": true,
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  },
  "AllowedHosts": "*",
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "microsoft.onmicrosoft.com", 
    "TenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "ClientId": "07d263b0-d53c-4cd6-bede-a2d767a68762",
    "CallbackPath": "/signin-oidc",
    "Scopes": "access_as_user",
    "SignInScheme": "CustomCookies",
    "SaveTokens": true
  },
  "MicrosoftGraph": {
    "BaseUrl": "https://graph.microsoft.com/v1.0",
    "Scopes": "user.read"
  }
}
```

### Development Configuration (`appsettings.Development.json`)
Local development settings with LocalDB and development endpoints:

```json
{
  "ConnectionStrings:ZebraAIDB": "Server=(localdb)\\mssqllocaldb;Database=ZebraAI;Trusted_Connection=True;MultipleActiveResultSets=true",
  "AzureAI:BaseUrl": "https://zebra-ai-ais-dev.openai.azure.com/",
  "AzureSearch:URI": "https://zebra-ai-aas-dev.search.windows.net",
  "ZebraAI:EmailService": "DISABLED",
  "SkillsBuddy:PromptFlowScope": "https://ml.azure.com/.default",
  "SkillsBuddy:SNICertName": "DevSNIPrivate"
}
```

### Staging Configuration (`appsettings.Staging.json`)
Staging environment with Azure resources:

```json
{
  "AzureAI:BaseUrl": "https://zebra-ai-ais-staging.openai.azure.com/",
  "AzureSearch:URI": "https://zebra-ai-aas-staging.search.windows.net",
  "ApplicationInsights": {
    "ConnectionString": "{staging-app-insights-connection}"
  }
}
```

### Production Configuration (`appsettings.Production.json`)
Production environment configuration:

```json
{
  "AzureAI:BaseUrl": "https://zebra-ai-ais-prod.openai.azure.com/",
  "AzureSearch:URI": "https://zebra-ai-aas-prod.search.windows.net",
  "ApplicationInsights": {
    "ConnectionString": "{production-app-insights-connection}"
  }
}
```

## Database Configuration

### Local Development (LocalDB)
Uses SQL Server LocalDB with integrated security:

```json
{
  "ConnectionStrings": {
    "ZebraAIDB": "Server=(localdb)\\mssqllocaldb;Database=ZebraAI;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

### Azure Environments
Uses Azure SQL Database with Azure AD authentication (no connection strings in config):

```csharp
// In Program.cs - automatically configured for non-development
services.AddDbContextFactory<ZebraAiDBContext>(options =>
{
    // Connection configured via DefaultAzureCredential
    // No connection string needed - uses Azure AD tokens
});
```

## Azure Service Configuration

### Azure OpenAI Configuration
Supports multiple AI providers based on endpoint patterns:

```json
{
  "AzureAI": {
    "BaseUrl": "https://your-endpoint.openai.azure.com/",
    "ApiKey": "{stored-in-key-vault-or-user-secrets}",
    "DeploymentName": "gpt-4o",
    "ApiVersion": "2023-12-01-preview"
  }
}
```

**Supported Endpoint Types**:
- **Azure OpenAI**: `*.openai.azure.com/`
- **Azure AI Inference**: `*.services.ai.azure.com/models`
- **Local Ollama**: `http://localhost:*` or `http://127.0.0.1:*`

### Azure AI Search Configuration
```json
{
  "AzureSearch": {
    "URI": "https://your-search-service.search.windows.net",
    "ApiKey": "{stored-in-key-vault-or-user-secrets}",
    "IndexName": "zebra-ai-index"
  }
}
```

### Skills Buddy Configuration
```json
{
  "SkillsBuddy": {
    "PromptFlowScope": "https://ml.azure.com/.default",
    "SNICertName": "ProductionSNIPrivate",
    "EndpointUrl": "https://your-prompt-flow-endpoint.azureml.net"
  }
}
```

## Authentication Configuration

### Azure AD Settings
```json
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "microsoft.onmicrosoft.com",
    "TenantId": "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "ClientId": "07d263b0-d53c-4cd6-bede-a2d767a68762",
    "CallbackPath": "/signin-oidc",
    "Scopes": "access_as_user",
    "SignInScheme": "CustomCookies",
    "SaveTokens": true
  }
}
```

### Claims Transformation (Development Only)
In development, `ClaimTransformer.cs` maps various claim types to `preferred_username`:

```csharp
// Supported claim types for development
var claimMappings = new[]
{
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    "upn",
    "unique_name", 
    "azp",
    "appid"
};
```

## User Secrets (Development)

### Setting Up User Secrets
```bash
# Navigate to the Web project
cd ZebraAI.Web

# Initialize user secrets
dotnet user-secrets init

# Add secrets
dotnet user-secrets set "AzureAI:ApiKey" "your-api-key"
dotnet user-secrets set "AzureSearch:ApiKey" "your-search-key"
```

### Required Development Secrets
```json
{
  "AzureAI:ApiKey": "your-azure-openai-api-key",
  "AzureSearch:ApiKey": "your-azure-search-api-key",
  "ZebraAI:EmailService": "smtp-settings-if-needed"
}
```

## Azure Key Vault Integration

### Key Vault Configuration (Non-Development)
In `Program.cs`, Key Vault is automatically configured:

```csharp
if (!isDevelopment)
{
    // Key Vault integration using DefaultAzureCredential
    builder.Configuration.AddAzureKeyVault(
        new Uri($"https://{keyVaultName}.vault.azure.net/"),
        new DefaultAzureCredential()
    );
}
```

### Required Key Vault Secrets
| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `AzureAI--ApiKey` | Azure OpenAI API Key | `abc123...` |
| `AzureSearch--ApiKey` | Azure AI Search API Key | `def456...` |
| `ConnectionStrings--ZebraAIDB` | Database connection (if needed) | `Server=...` |
| `ZebraAI--EmailService` | Email service settings | `smtp://...` |

### Key Vault Access Requirements
- **Managed Identity**: Application must have managed identity enabled
- **Access Policy**: Identity needs `Get` and `List` permissions for secrets
- **RBAC**: Or use Azure RBAC with `Key Vault Secrets User` role

## Environment Variables

### Setting Environment Variables
```bash
# Windows Command Prompt
set ASPNETCORE_ENVIRONMENT=Development
set AzureAI__ApiKey=your-key

# Windows PowerShell
$env:ASPNETCORE_ENVIRONMENT="Development"
$env:AzureAI__ApiKey="your-key"

# Linux/macOS
export ASPNETCORE_ENVIRONMENT=Development
export AzureAI__ApiKey=your-key
```

### Configuration Binding
Environment variables use double underscore (`__`) as section separators:

```bash
# Maps to AzureAI:ApiKey in configuration
AzureAI__ApiKey=value

# Maps to ConnectionStrings:ZebraAIDB
ConnectionStrings__ZebraAIDB=value
```

## Model Endpoint Configuration

### Auto-Detection Logic
The system automatically detects AI provider types based on BaseUrl patterns:

```csharp
// In OpenAIBroker.cs
if (endpoint.Contains(".openai.azure.com/"))
{
    // Azure OpenAI configuration
}
else if (endpoint.Contains(".services.ai.azure.com/models"))
{
    // Azure AI Inference configuration  
}
else if (endpoint.StartsWith("http://localhost:") || 
         endpoint.StartsWith("http://127.0.0.1:"))
{
    // Local Ollama configuration
}
```

### Example Endpoint Configurations

**Azure OpenAI**:
```json
{
  "AzureAI": {
    "BaseUrl": "https://zebra-ai-ais.openai.azure.com/",
    "ApiKey": "key-from-vault",
    "DeploymentName": "gpt-4o"
  }
}
```

**Azure AI Inference (Phi-4)**:
```json
{
  "AzureAI": {
    "BaseUrl": "https://zebra-ai-phi4.services.ai.azure.com/models",
    "ApiKey": "key-from-vault",
    "ModelName": "phi-4"
  }
}
```

**Local Ollama**:
```json
{
  "AzureAI": {
    "BaseUrl": "http://localhost:11434",
    "ModelName": "llama2"
  }
}
```

## Deployment Configuration

### Azure App Service Settings
Configure these application settings in Azure App Service:

| Setting Name | Value | Purpose |
|--------------|-------|---------|
| `ASPNETCORE_ENVIRONMENT` | `Staging` or `Production` | Environment detection |
| `WEBSITE_LOAD_USER_PROFILE` | `1` | Enable user profile loading |
| `WEBSITE_LOAD_CERTIFICATES` | `1` | Enable certificate loading |
| `KeyVaultName` | `zebra-ai-kv-{env}` | Key Vault name |

### Managed Identity Configuration
Ensure the App Service has:
- **System-assigned managed identity** enabled
- **Key Vault access policy** or RBAC permissions
- **SQL Database access** (if using Azure SQL)

## Logging Configuration

### Application Insights
```json
{
  "ApplicationInsights": {
    "ConnectionString": "InstrumentationKey=...;IngestionEndpoint=...;LiveEndpoint=..."
  },
  "Logging": {
    "ApplicationInsights": {
      "LogLevel": {
        "Default": "Information",
        "Microsoft.AspNetCore": "Warning"
      }
    }
  }
}
```

### Console Logging (Development)
```json
{
  "Logging": {
    "Console": {
      "LogLevel": {
        "Default": "Information",
        "Microsoft.EntityFrameworkCore": "Information"
      }
    }
  }
}
```

## Validation and Troubleshooting

### Configuration Validation
Add this to `Program.cs` for configuration validation:

```csharp
// Validate required configuration
var requiredSettings = new[]
{
    "AzureAd:TenantId",
    "AzureAd:ClientId", 
    "AzureAI:BaseUrl"
};

foreach (var setting in requiredSettings)
{
    if (string.IsNullOrEmpty(builder.Configuration[setting]))
    {
        throw new InvalidOperationException($"Required setting '{setting}' is missing");
    }
}
```

### Common Configuration Issues

**Issue**: Database connection fails
**Solution**: Verify LocalDB is running or Azure SQL access is configured

**Issue**: Azure AD authentication fails  
**Solution**: Check TenantId and ClientId are correct for environment

**Issue**: AI service calls fail
**Solution**: Verify API keys are correctly stored and BaseUrl format

**Issue**: Key Vault access denied
**Solution**: Check managed identity permissions and Key Vault access policies

### Configuration Debugging
Enable detailed configuration logging:

```json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.Extensions.Configuration": "Debug"
    }
  }
}
```

## Security Best Practices

### Secret Management
- **Never commit secrets** to source control
- **Use Key Vault** for non-development environments  
- **Use User Secrets** for local development only
- **Rotate keys regularly** and update in Key Vault

### Network Security
- **VPN required** for development access
- **Private endpoints** for production Azure services
- **Network security groups** to restrict access

### Authentication
- **Azure AD only** - no local accounts
- **Managed identities** for service-to-service auth
- **Least privilege** access for users and services

---

*This configuration guide is maintained by the ZebraAI development team. Update when configuration changes are made.*
