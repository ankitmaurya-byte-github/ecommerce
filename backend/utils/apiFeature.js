class apiFeature {

 constructor(product, query) {

  this.product = product
  this.query = query
 }

 search() {
  const keyword = this.query.keyword ? {
   name: {
    $regex: this.query.keyword,
    $options: "i" //case insensitive
   }
  } : {}
  this.product = this.product.find({ ...keyword })
  return this
 }
 filter() {
  const queryCopy = { ...this.query }
  const array = ["keyword", "limit", "page"]
  array.forEach(key => {
   delete queryCopy[key]
  })
  let str = JSON.stringify(queryCopy)
  str = str.replace(/\b(gt|gte|in|lt|lte)\b/g, (key) => `$${key}`)
  console.log(this.query);//here i am getting string array
  this.product = this.product.find(JSON.parse(str))
  return this
 }
 pagination(dataPerPage) {
  let skip = dataPerPage * ((this.query.page ? this.query.page : 1) - 1)
  this.product = this.product.limit(dataPerPage).skip(skip)
  return this
 }

}
module.exports = apiFeature