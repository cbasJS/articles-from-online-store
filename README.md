**articles-from-online-store**
----
  _This project is just an example of API REST from an online store :blush:_

* **Methods:**
  
  * /createProduct   
  * /getProducts
  * /updateProduct
  * /deleteProduct     


  
* **Method Params**
  
  _/createProduct_
  <br />
   **Required:**
   <br />
   `productImage=[string]`
   <br />
   `productName=[string]`
   <br />
   `productPrice=[number]`   
  
  _/updateProduct_
   <br />
   **Required:**
   <br />
   `productId=[string]`
   <br />
   **Optional:**
   <br />
   `productImage=[string]`
   <br />
   `productName=[number]`
   <br />
   `productPrice=[number]`   
   
   _/deleteProduct_
   <br />
   **Required:**
   <br />
   `productId=[string]`   

* **Success Response:**
  >`{ 
    statusCode : 20,
    message: "done"
  }`   

* **Sample Call:**
  ```jsx
  fetch('https://api.example/getProducts')
  .then(response => response.json())
  .then(data => {
    console.log(data) // Prints result from `response.json()` in getRequest
  })
  .catch(error => console.error(error))
  ```