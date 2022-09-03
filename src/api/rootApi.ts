export default class Api {
  static BASE_URL = process.env.NODE_ENV === 'development' ? '/api/v1/' : 'http://localhost:8023/api/v1/' 
  static Headers = {
    'Content-Type': 'application/json'
  }
}