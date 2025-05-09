

import {z} from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import {apiInfo} from '../commons/api-info/index.js'

const schema = z.object({});

const inputSchema = zodToJsonSchema(schema)

function handler(args: z.infer<typeof schema>): Record<string,any> {
    return apiInfo;
}

export const apiListTool = {
    definition:{
        name:'api_list',
        description: "detail information of api",
        inputSchema:inputSchema
    },
    handler: handler
}