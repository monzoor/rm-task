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
        1. Will able to write location :heavy_check_mark:
        2. Wil able to pick date range from datepicker :heavy_check_mark:
        3. Show search string in url :heavy_check_mark:

3. Listing page

    1. Design

        1. List of all properties :heavy_check_mark:
        2. Property Image slider on listing :heavy_check_mark:
        3. Property title, description, rating, price :heavy_check_mark:
        4. Pagination :heavy_check_mark:

    2. Funtionality
        1. Initally show all property listing :heavy_check_mark:
        2. Show pagination for the listing :heavy_check_mark:
        3. Navigate the pagintion :heavy_check_mark:
        4. Show search list with pagination :heavy_check_mark:
        5. Show content if there is no property :heavy_check_mark:

4. Details page

    1. Design
        1. Property Image :heavy_check_mark:
        2. Property Title, type, rating, description :heavy_check_mark:
        3. Reserve :heavy_check_mark:
        4. Comments and add comments section :heavy_check_mark:
    2. Funtionality
        1. Show property title, description, rating, review, images :heavy_check_mark:
        2. Date pick to book property :heavy_check_mark:
        3. Show already booked property :heavy_check_mark:
        4. Show comments :heavy_check_mark:
        5. Add comments :heavy_check_mark:
        6. Show average rating :heavy_check_mark:

5. Create page

    1. Desing
        1. Title, description, price, type input fields :heavy_check_mark:
        2. Image uploader :heavy_check_mark:
        3. Image preview :heavy_check_mark:
    2. Funtionality
        1. Add input datas :heavy_check_mark:
        2. Validation :heavy_check_mark:
        3. Image upload for property :heavy_check_mark:

6. Api Building
    1. Create docker container :heavy_check_mark:
    2. Create Database with mongodb :heavy_check_mark:
    3. Used CRUD application :heavy_check_mark:

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
