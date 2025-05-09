export const posts = {
    "/posts/{id}":{
        GET: {
            description: "get post",
            params: {
                id: {
                    type: 'int',
                    description: 'post id',
                    required: true
                }
            }
        },
        PUT: {
            description: "update a post",
            params: {
                id: {
                    type: 'int',
                    required: true,
                },
                title: {
                    type: 'string',
                    required: true,
                },
                body: {
                    type: 'string',
                    required: true,
                },
                userId: {
                    type: 'int',
                    required: true,
                }
            }
        },
        PATCH: {
            description: "update part of a post",
            params: {
                id: {
                    type: 'int',
                    required: true,
                },
                title: {
                    type: 'string',
                },
                body: {
                    type: 'string',
                },
                userId: {
                    type: 'int',
                }
            }
        },
    },
    "/posts": {
        GET: {
            description: "get posts",
        },
        POST: {
            description: "create a post",
            params: {
                title: {
                    type: 'string',
                    required: true,
                },
                body: {
                    type: 'string',
                    required: true,
                },
                userId: {
                    type: 'int',
                    required: true
                }
            }
        }
    }
}
