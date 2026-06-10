# AI-Usability Proxy

## Description
A tooling system to make existing products AI-usable, since AI is becoming the primary consumer of products (rather than humans using AI skills to navigate terrible human-facing products).

## Architecture
```mermaid
sequenceDiagram
    participant AI as AI Agent
    participant Proxy as AI-Usability Proxy
    participant Legacy as Legacy Product API/UI
    AI->>Proxy: Request Capability (via MCP)
    Proxy->>Legacy: Execute Human-Targeted Action
    Legacy-->>Proxy: Return Result
    Proxy-->>AI: Return Machine-Readable Data
```

## Technical Summary
The AI-Usability Proxy acts as a translation layer between legacy human-facing interfaces and AI agents. It leverages the Model Context Protocol (MCP) to expose product features as structured tools, enabling seamless machine-to-machine interoperability.