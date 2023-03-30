Project Requirements:

Project Description:

Convoy Commander, is and information based app that allows army leaders the ability to send out convoy specific information more efficiently. User are able to toggle between 3 main pages/components. The Information page for specific convoy notes, filtered by the speciif cconvoy selected as well as 3 note categories(safety, vehicle,concoy-checklist). Users are able to add new notes as well as update, and delete them. The chat feature allows user to converse with one another and is also full CRUD compliant. For the navigation page, I used(integrated?) Google maps API and also used an npm package (React google maps/api) in order t retrive navigation information desplyaed on a map componenet, I was also able to retrived the route directions that are displayed below the map.

Backend:
I created a custom user model and used a postgres database with django to store all the convoy information. I also created models for each app componenet such as navigation, inforation/records, and the chat group. I was able to implement full crud for the chat page and information page and hope to do the same for the navigation page. I adjusted the user views using a permission class based on the type of user. this allows users the ability to edit and delete thier own post but no anyone elses. in the future i would like to have rank based permission classes to further limit the views.I also used django to create my API end points for ech page. I used django rest framework to implemeent user authentication,and dj-rest-auth to register/activate users to allow a login/logout funtionality, and retriev/update user models.

Frontend:
My front end was built using React
Bootstrap

3rd Part API:
