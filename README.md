Book Search and Management Web Application

Overview

This is a simple web application that allows users to search for books and manage their book list. Users can search for books by title using an API, view results with pagination, filtering, and sorting, add books to a list, and edit book details. The application has a responsive design suitable for both desktop and mobile devices.

Features

Search Books: Users can search for books by title using an API.

Results List: Displays search results with pagination, filtering, and sorting.

Add to Books List: Users can add books to a database.

Edit Books: Users can edit book details.

Responsive Layout: Works well on both desktop and mobile devices.

API Endpoints

1. Search Books (GET Request)

http://64.227.142.191:8080/application-test-v1.1/books?title=ab

Parameters:

title: The book title to search for.

DIR: Sorting order (Possible values: ASC, DESC).

2. Add a Book (POST Request)

http://64.227.142.191:8080/application-test-v1.1/books

Payload Example:

{
  "author": "hhtrgefgsd",
  "country": "uytrf",
  "language": "rdgrdsa",
  "link": "ggrfds",
  "pages": "9087",
  "title": "tyred",
  "year": "tffd",
  "id": 556
}

3. Update Book Details (PUT Request)

http://64.227.142.191:8080/application-test-v1.1/books/{id}

Payload Example:

{
  "author": "Updated Author",
  "country": "Updated Country",
  "language": "Updated Language",
  "link": "Updated Link",
  "pages": "1234",
  "title": "Updated Title",
  "year": "2023",
  "id": 556
}

Technologies & Libraries Used

React JS: For building the UI.

Fetch: For making API requests.

Redux: For state management.

HTML & CSS: For structuring and styling the application.

Tailwind CSS: Used to create common reusable UI components.

Common Components Built Using Tailwind CSS

Button: Reusable button component with different variants.

Input: Common input field component.

Modal: Used for adding and editing books.

Pagination: Component for handling paginated results.

Installation & Setup

Clone the repository:

git clone [https://github.com/your-repo/book-search-app.git](https://github.com/Saloni-hub/dataweaver-search-book-assignemnt.git)

Navigate to the project directory:

cd book-search-app

Install dependencies:

npm install

Start the application:

npm run dev

Conclusion

This application provides an intuitive interface for users to search, add, and edit books efficiently. With a well-structured API and responsive design, it ensures a smooth user experience across different devices.

