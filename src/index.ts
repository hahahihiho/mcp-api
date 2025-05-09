import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema
} from "@modelcontextprotocol/sdk/types.js";

import {tools} from './tools/index.js';

import * as dotenv from 'dotenv';


export async function main() {
  dotenv.config();

  const server = new Server(
    {
      name: "example-server",
      version: "1.0.0"
    },
    {
      capabilities: {
        tools: {}
      }
    }
  );


  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [...tools.map((tool) => tool.definition)],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {

    try {
      const tool = <any>tools.find(tool => tool.definition.name == request.params.name)?.handler;
      if (!tool) {
        throw new Error(`Tool ${request.params.name} not found`);
      }

      const result = await tool(request.params.arguments);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result),
          },
        ],
      };
    } catch (error) {
      throw new Error(`Tool ${request.params.name} failed: ${error}`);
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main()