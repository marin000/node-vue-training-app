const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To-do app API",
      version: "1.0.0",
      description: "A simple to-do app API",
    },
    servers: [
      {
        url: "http://localhost:4101",
      },
    ],
  },
  apis: ["./server/docs/**/*.yaml"],
};

module.exports = {
  options
};