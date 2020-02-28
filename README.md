# Installation and running the code

I have made my changes in the git branch - 'dev-ujjaini'. 
Please unzip the code and go to the branch
Then go to src/client and run 'npm install'
Then go to src/server and run 'npm install'
Now type 'npm start' inside the server. The server starts at localhost:5000.
Now type 'npm start' inside the client. The client code will start at localhost:3000 and you can see the app

I have been able to successfully test with the follwing planetIds - 25, 34 nd 44
To test please type 'http://localhost:3000/planets/44' in the url field.

# Unit testing

To run unit testing in client or server, please run 'npm test'
To see coverage reports for server, please run 'npm run cov'

# Integration testing

I have done unit testing for the individual files. Integration testing could have been possible by checking a complete flow through all the components. This was not possible due to time constraint.

# Assumptions

* I have assumed that the SWAPI api will always give same data for the same planetId and the data will not change. So, the data in the DB does not need to be purged. The planet cache will always query the DB first for data if not in inner cache(node-cache) that has already been fetched from the API

* Since this was a simple click event to toggle between showing/hiding the terrain value, I did not use any state management tool like Redux. However for a large project which has multiple API calls and other user interactions and complex data manipulations, a state management tool would be ideal (eg. Redux ), as well as Redux Saga for API calls

# Design Decisions

* I have used 'react-router-dom' for Routing. This helped me get the planetId from the url. This also made the app more extensible for changes in case new routes were added

* I had to add a new field to the DB called 'terrain' so that it may be stored and fetched 

* For caching I used an external library called 'node-cache'. This was done both to save time and also to get a robust, clean and well tested library for caching

* I have tried the Test Driven Approach as much as possible

# External npm modules used

* 'node-cache'

* 'react-router-dom'

* 'enzyme' for React testing

* 'sleep' for server side testing 








