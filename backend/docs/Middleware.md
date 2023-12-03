# What Is Middleware?
- A request handler with access to the application's request-response cycle is known as middleware.
- It's a function that holds the request object, the response object, and the middleware function.
- Middleware can also send the response to the server before the request.
- The next middleware function is commonly represented as a variable named next.
- Simply middleware is a function that can only be applied using routes.
- We can access and modify request and response data using middleware.

![Alt text](https://www.simplilearn.com/ice9/free_resources_article_thumb/ExpressJS_Middleware_1.png)
## Functions of Middleware
- Executes any code
- We can make changes to the request-response objects
- Middleware can also End the request-response cycle
- Middleware can call the next middleware function in a stack
We use these functions to modify our middleware to perform many tasks. If we want to block our site for some country or if we're going to check the authentication of a user etc., we use middleware for that.

## Creating Middleware
Now we will create an Express middleware for that we will create a simple Express API. We can create middleware in a router file, but the easiest method is to create a separate middleware file and then execute it; creating and using middleware is very simple.

So to create middleware, we need to install all the packages to run express middleware.
![Alt text](https://www.simplilearn.com/ice9/free_resources_article_thumb/ExpressJS_Middleware_2.png)
- Now open your terminal and run this file we will see our server is running.
- After this, go to the local server and type localhost:4000
- Now we will call our next parameter,
- In express framework, next is a function
![Alt text](https://www.simplilearn.com/ice9/free_resources_article_thumb/ExpressJS_Middleware_3.png)![Alt text](https://www.simplilearn.com/ice9/free_resources_article_thumb/ExpressJS_Middleware_4.png)
Now we will go to the home page that we have created.
![Alt text](https://www.simplilearn.com/ice9/free_resources_article_thumb/ExpressJS_Middleware_5.png)
