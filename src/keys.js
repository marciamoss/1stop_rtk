exports.mongo = {
  api: process.env.REACT_APP_BASE_URL
};

exports.nyt = {
  apiKey: process.env.REACT_APP_NYT_API_KEY
};

exports.movie = {
  url: process.env.REACT_APP_MOVIE_URL,
  detailsUrl: process.env.REACT_APP_MOVIE_DETAILS_URL
}

exports.imdb = {
  'X-RapidAPI-Key': process.env.REACT_APP_IMDB_API_KEY,
  'X-RapidAPI-Host': process.env.REACT_APP_IMDB_API_HOST
};

exports.gAuth = {
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID
};

exports.video = {
  apiKey: process.env.REACT_APP_VIDEOS_API_KEY
};