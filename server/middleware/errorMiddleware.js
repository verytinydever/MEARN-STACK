const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(400)
  next(error)
}
const errorHandling = (err, req, res, next) => {
  //500 server error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? s : err.stack,
  })
}
export {notFound,errorHandling}