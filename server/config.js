module.exports = {

  MONGO:"mongodb",
  MONGO_HOST:'mongodb://localhost/cinema',
  SECRET:"miasama",
  HOST:process.env.NODE_ENV === 'development' ? "localhost" : "myfirstcluster.ie0tay.0001.usw2.cache.amazonaws.com",
  PORT:"6379"

}
