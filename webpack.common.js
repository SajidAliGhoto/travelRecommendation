const path = require('path');

module.exports = {
  entry: {
    app: './js/travel_Recommendation.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/travel_Recommendation.js',
  },
};
