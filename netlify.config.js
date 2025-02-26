// This is a dedicated configuration file for Netlify to ignore Python files
module.exports = {
  // Force Netlify to treat this as a Node.js project
  build: {
    environment: {
      NODE_VERSION: "18",
      // Turn off Python
      PYTHON_VERSION: "off"
    }
  }
};
