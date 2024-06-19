// This mock function simulates the AI response
const getAIPredictions = async (query) => {
  // Mock response for testing purposes
  return {
    keywords: [query],
  };
};

module.exports = { getAIPredictions };
