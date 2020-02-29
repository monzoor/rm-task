# rm-task

---

### Task List

---

1. Landing Page

    1. Design

        1. Top Header :heavy_check_mark:
        2. Navigation :heavy_check_mark:
        3. Search panel :heavy_check_mark:
        4. List of peroperties :heavy_check_mark:

    2. Funtionality
        1. Link to Create Property page :heavy_check_mark:
        2. Link to listing page :heavy_check_mark:
        3. List of properties :heavy_check_mark:
        4. Property will show top rated comment with rating if any :heavy_check_mark:
        5. Property will show title of no comments found :heavy_check_mark:

2. Search

    1. Desing

        1. Input box for search string :heavy_check_mark:
        2. Date picker :heavy_check_mark:
        3. Search Button :heavy_check_mark:

    2. Funtionality
        1. Will able to write location
        2. Wil able to pick date range from datepicker
        3. Show search string in url

3. Listing page

    1. Design

        1. List of all properties
        2. Property Image slider on listing
        3. Property title, description, rating, price
        4. Pagination

    2. Funtionality
        1. Initally show all property listing
        2. Show pagination for the listing
        3. Navigate the pagintion
        4. Show search list with pagination
        5. Show content if there is no property

4. Details page

    1. Design
        1. Property Image
        2. Property Title, type, rating, description
        3. Reserve
        4. Comments and add comments section
    2. Funtionality
        1. Show property title, description, rating, review, images
        2. Date pick to book property
        3. Show already booked property
        4. Show comments
        5. Add comments
        6. Show average rating

5. Create page
    1. Desing
        1. Title, description, price, type input fields
        2. Image uploader
        3. Image preview
    2. Funtionality
        1. Add input datas
        2. Validation
        3. Image upload for property

### Start project

How to run the project for production

Requirment: Docker

```
docker-compose up -d --build
```

the project will run on `http://localhost:8080`

To run react development go to `./client` folder and run

```
yarn start
```

**Note:** `Stop` docker before starting and restart it after react dev started.
