const axios = require('axios');

const categories = [
 'Laptop',
 'Footwear',
 'Bottom',
 'Tops',
 'Attire',
 'Camera',
 'SmartPhones',
];

const getuser = async () => {
 try {
  const response = await axios.get('http://127.0.0.1:8080/app/v1/users');
  return response.data.allUser;
 } catch (error) {
  console.error('Error fetching users:', error.message);
  throw error;
 }
};

const getrand = (a) => Math.floor(Math.random() * a);

const generateRandomParagraph = (sentenceCount, wordsPerSentence) => {
 const subjects = ['The cat', 'A dog', 'My friend', 'A tree', 'The ocean'];
 const verbs = ['runs', 'jumps', 'sleeps', 'eats', 'swims'];
 const adjectives = ['quickly', 'slowly', 'loudly', 'silently', 'happily'];
 const objects = ['on the mat', 'under the table', 'over the moon', 'in the garden', 'through the forest'];

 let paragraph = '';

 for (let i = 0; i < sentenceCount; i++) {
  let sentence = '';
  for (let j = 0; j < wordsPerSentence; j++) {
   sentence += getRandomElement([subjects, verbs, adjectives, objects]) + ' ';
  }
  paragraph += sentence.trim() + '. ';
 }

 return paragraph.trim();
};

const getRandomElement = (array) => {
 const randomIndex = Math.floor(Math.random() * array.length);
 return array[randomIndex];
};

const getrandomreview = (allUser) => {
 const total = getrand(10);
 let returnarray = [];
 let totalRating = 0
 for (let i = 0; i <= total + 2; i++) {
  let review = {};
  let person = getrand(allUser.length - 1);
  review.name = allUser[person].name;
  review.user = allUser[person]._id;
  review.comment = generateRandomParagraph(getrand(2) + 1, getrand(10) + 1);
  review.rating = getrand(5);
  totalRating += review.rating
  returnarray.push(review);
 }
 return { reviewsArray: returnarray, productRating: (returnarray.length * 5) / totalRating };
};
function getRandomWord() {
 const alphabet = 'abcdefghijklmnopqrstuvwxyz';
 let randomWord = '';

 for (let i = 0; i < 5; i++) {
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  randomWord += alphabet.charAt(randomIndex);
 }

 return randomWord;
}
const imagesArray = [
 { public_id: 'thisispubidTWO', url: 'https://media.istockphoto.com/id/1300459022/photo/natural-organic-spa-cosmetic-products-set-with-eucalyptus-leaves-top-view-herbal-skincare.jpg?s=612x612&w=0&k=20&c=_xkB2_OnFqzJKVdDCeNCPeMp4jwLTsSQy2VvRloiPgk=' },
 { public_id: 'thisispubidONE', url: 'https://i02.appmifile.com/207_operatorx_operatorx_xm/12/05/2023/eed3c0fb1341cee3ec4bd3384b86c80a.jpg?width=398&height=320' },
 { public_id: 'thisispubidTHREE', url: 'https://e1.pxfuel.com/desktop-wallpaper/254/2/desktop-wallpaper-pin-on-gamers-military-weapons-thumbnail.jpg' },
];
function shuffleArray(array) {
 for (let i = array.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [array[i], array[j]] = [array[j], array[i]];
 }
}
const createRandomProduct = async () => {
 const allUser = await getuser();
 const usersLength = allUser.length;
 let reqbody = {};

 for (let i = 0; i < 200; i++) {
  reqbody.name = getRandomWord()
  reqbody.price = getrand(2000);
  reqbody.description = generateRandomParagraph(getrand(3) + 1, getrand(10) + 1);
  reqbody.user = allUser[getrand(usersLength - 1)]._id;
  let revs = getrandomreview(allUser);
  reqbody.ratings = revs.productRating;
  reqbody.reviews = revs.reviewsArray
  reqbody.stock = getrand(5);
  reqbody.category = categories[getrand(categories.length - 1)];
  reqbody.numOfReviews = revs.reviewsArray.length;
  shuffleArray(imagesArray)
  reqbody.images = imagesArray

  try {
   const response = await axios.post('http://127.0.0.1:8080/app/v1/products/new', reqbody);
   console.log('Product created:', response.data);
  } catch (error) {
   console.error('Error creating product:', error.message);
  }
  // await new Promise(resolve => setTimeout(resolve, 1000))
 }
};

// Call the function to create random products
createRandomProduct();
