const development = {
  backendUrl: "http://localhost:4000",
};

const production = {
  backendUrl: "https://[insert website name].com",
};

module.exports =
  process.env.NODE_ENV === "production" ? production : development;
