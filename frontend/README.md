# Starting Notes
I have started my project today with the folder structure, and after finshing the folder structure, and Routing, I am going to start doing coding the homepage. While doing the Routing part to different locations, the BrowserRouter is imported inside the main.jsx and I have nested the APP component inside it, and then in the APP component, I am using Routes and Route to do the Routing. 

# Homepage Creation
The home page is located inside the pages and then Home folder, and the components needed for it, they are located in the component folder. 

To start, I am going to start with coding the wallpaper component and then I will go all the way to the QuickSearches and QuickSearch.

Now in the Wallpaper component, I have a Navbar or Header according to my project. So to create the Wallpaper I have to first design the header, and then there are logo, title, select, and search bar along with the background image that will be designed in the Wallpaper component.

Start: Header --> Wallpaper --> Home --> APP
- Header Component 
There two things to do in here, the first one is to add logo on the left side and then add the login and create account on the right side. This could be achieved with display flex and then justify-content space between. Worths mentioning that for the homepage the header background will be transparent.

It was a little hard to figure out the structure of the header and wallpaper combined but at last I have create a html architecture which is looking good. Then I will add the styling to it. 

I have added the styles to the Header and Wallpaper components and now I will start the QuickSearches, after that I will go through creating the QuickSearch and I will be done with the home page frontend. 

while starting the QuickSearches, I got a problem, the problem was that my header background was scaling up to 1.1, that I had included in the css when I load my page, and that resulted to horizontal scroll bar, after removing the scaling animation, I started coding the QuickSearches, until now I have included all of the necessary elements, I will start doing the styling after create the QuickSearch.

I have created the quickSearch using the bootstrap cards, and included it in the QuickSearches, and also added the styling to my code. Now, that I am finished with the styling, I will make my home page responsive to different screen sizes and then I will move on to the filter page. 

I am done with making the homepage resposive. Now I think it needs a footer also, but I will not create it currently, I will add the footer if needed at the end of my project. For now I will start doing the filter page. 

# Filter page creation
To start the creation of the filter page, I had to include a state in the Header component to change the navbar background in filter page and also include the logo image in it. It was a little time taken task to do, and I have done it in about 30 minutes. After finishing the navbar change now it is looking much better. 

So, I worked on the frontend of the filter page for like 3 hours, and also made it responsive. I think that it looks goods, for now I don't put efforts on creation of the backend, once I am done with the frontend, only then I will start creating the backend. Now, I am doing to create the details page.

# Details page creation
Creating the details page was a bit easy with npm packages, so now that I am finished with the details page, there is one more thing to do, I can see that my pages doesn't have a footer, which is looking not good without it, so to better performance, I am not going to create a footer, I will copy my footer from Job Recruitment mini project and I will change some of the elements in it, and also change its styles. 

# Sign in and Sing up Creation
Now, I am going to create the sign up and sign in page for the user. for this in the user component, I am going to create a form and that form will correspond to sign in along with the sign up, of course for the sign in some info will be hidden from the user. 

All done with the frontend.
After all I am going to start the backend. 

# Backend
For the backend, I am going to create another folder and inside that folder I will store all of the server and database data. 

In the backend I am using express for the server, cors for the connection of frontend and backend because they have different url, I am using body-parser to get the body of the form that will be posted to the server, and I also installed nodemon to restart the server whenever I make any changes. 

I am using MongoDB Compass for the test of database, after finishing everything, I will create a claster at MongoDB Atlas and then I will export and import all the data from Compass to Atlas. 

After creating basic structure of the server, I have created a get request to add the list of food types for the Quick Searches part, after doing so, I think I am going to create the sign up and sign in requests for the user to login and logout. 

I have done the sign up and login part, and now the user can create an accound and login perfectly, I also used the bcrypt to secure the password of the user, and used jsonwebtoken to create a token in the localstorage so the browser remember the login status of the user, and I limited it to 1 hour, so after one hour, the user need to login again. 

until now I am done with the creation of the QuickSearches and Login requests. Now I will move on to create the restaurant select options in the homepage. For doing so, I need to have some restaurant names in my database, after that I will send a request and get the restaurants. 

So, I am done with adding some restaurant data to the database and displaying it in the select options, I also managed to get those data and add the funcationality to the input to get the restaurants with the selected location and search for the restaurants that were only saved in that location.


### Upadating the login pop up
Now that I am done with this part, I am going to add the funcationality to use facebook and google account to sign up or sign in to my page.

I am having trouble with implementing the facebook and google account login. Also I have created my login page manually without using the modal package of react, maybe that is the problem, if it wasn't then I am going to find another way to add the facebook and google account login to my page. 

Now, I am going to convert my page to use react modal for the login popup. 

I think the issue was not with the modal, but the way I have created the structure of the facebook login. For the google, I have done some changes to the project credentials, like changing the address of the origin, now I think I have to wait for a few hours until the changes get updated. Until then I am going to create the functionality of select and input on the wallpaper to show the expected output in the details page. 


# functionality of wallpaper component
It was a little hard to implement, but after searching for how to do this, I finally was able to use the Link and state attribute of it to send the data from the user to the details page and display details with the fetched value. Worths mentioning that at first I was sending data through url, and I succeeded but it looked a little not in a good shape, so I just changed my way.



# functionality of quicksearches part component
Now, I am going to create funtionality of the filter page, for the quicksearches part. 

I have added the funcationality for the filter page. Now, all of the page is working, I have divided the page to only show 4 items and added the funcationlity for the time where we have more than 4 items on the page. I also created the filter section funcational, now it filters the items perfectly. On each item of the page, I have added a link for the details page, and that link will work just like the wallpaper page. 

Now, everything is working good but I am having trouble to add images to my items, and also the google login still doesn't work, so I have to fix that, along with that I have to create a modal for the payment, and also connect it to paytm, and I will be done after these steps.


# Fixing images 
First step I am going to fix the images then I will leave the google login to last step. 

Finally, I manage to fix the images by manually searching for them and saving them in the assets folder and then import them in the assets.js and export them as foodItemImg, and then use them in my project, of course for the generative part of my project, I have saved just the name of the image in the database and from there I access them using there name. 


# place-order funcationality
After finishing the images part, it is time to create the place-order funcationality. 

I have completed the place-order funcationality, in the process I have generated 6 items for each of the restauarants using ai, and add them to the database and I have created a menu with them, so, now in the details page when you click on the place-order button it will popup a page which contains all the menu items along with the add button and then a subtotal which will change when the a one of the menu item is selected but it is not changing with a constant number, every menu item has different prices. it will change with there price. 

I wanted to add the funcationality of paytm, so, in the menu after selecting all the items and changing the subtotal, it will go the payment page to make an order, but I couldn't sign up to paytm because I don't have an Indian phone number, and I have raised a ticket for that, until I get a response, I am going to work on google account sign in.

# fixing google login issue
I have searched a little on and findout that the reason that I had issue with google login was that I didn't included the http://localhost in Authorized JavaScript origins part, once I did it, I was able to login using google account. 


# Changing profile picture with google account profile functionality
After solving the goole login issue that I had, I created another funcationality, so when a user login in with google, there will a token created in the localStorage, so when the user refresh the page, it doesn't remove the login status, and then decode the credentials of the response that I got from google back using jwt-decode package and then I fetch the profile link of the user, and after that I saved it in the local storage and I updated the header component so when there is a profile, it show profile of the user and when there is not, it show a font-awesome basic profile icon. 

Everything is done according to the instructions, just the payment connection is left that I will do it, once I get a response to my ticket.

# Fixing filter's page sort section 
I wanted to do a little check up of my site, when I went through the filter page, it click on sort high to low or sort low to high, it wasn't working fine, so I was working on it, for about three hours, and finally, I found a solution that now works, the logic I was using was a little not much robust, so I tried different approaches, in the way I also remembered that I was saving it in string format in database, so I used the parseInt method to convert it to integer value, and then compare it. 


# Adding payment option
It is been 2 days, I am waiting for an answer to my ticket, but I didn't got it, in the first day, I got an answer that it will be answered in 6-12 hours. Anyway, I am going to add one of the other api to my website, and then submit my project. 

For the payment option, I have added stripe API to handle the payment option, now it is a full functional website with the orders and everything. 

Now, I think my website meet with all the requirements, and the payment is also funcational, meaning that when a user places an order, it will check if the order the backend will save the order in the database, if any order occur, it will delete it, and if the user payment was not successful, it will also delete the order from the database. 

I am ready to submit my project now, further than this, I am going to create the funcationality for the user to add their home address before placing an order, and then save that home address in database. Also for the adding restaurants to the database, I need a page, so I don't need to manually add restaurants to the database, I will add that. 

It was a great experience creating this website, at first I was having negative thought of not being able to create it, but by taking steps each day in the last 10 days, I finally was able to finish this project, and now this gives me more confidence to keep creating new things.

## End of the Project