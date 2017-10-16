# Dependencies

- sqlite3
- node
- npm

# Getting Started

###### Install npm dependencies
`npm install`

###### Run the node server
`node app.js`

###### Viewing the application in your browser
`http://localhost:8000`

# Schema

## Customers

- id (integer)
- name (string)
- address (string)
- phone (string)


## Products

- id (integer)
- name (string)
- price (decimal)

## Invoices

- id (integer)
- customer_id (integer)
- discount (decimal)
- total (decimal)

## InvoiceItems

- id (integer)
- invoice_id (integer)
- product_id (integer)
- quantity (decimal)


# Resources

## Customers
```
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}
```

## Products
```
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}
```
## Invoices
```
GET|POST          /api/invoices
GET|PUT|DELETE    /api/invoices/{id}
```

## InvoiceItems
```
GET|POST          /api/invoices/{id}/items
GET|PUT|DELETE    /api/invoices/{invoice_id}/items/{id}
```


Use standard Bootstrap components for the UI
Place all assets inside the /public directory. Do not create a separate application to serve your assets.
The default page should be a list of existing invoices. This page should have a button for creating a new invoice.
The invoice form should support selecting an existing Customer
The invoice form should make it easy to browse and add existing Products (you should be able to add any number of products)
When a Product is added there should be a way to edit the quantity
There should be a place to enter a discount for the invoice (a percentage discount)
At the bottom of the page you should show a dynamically calculated invoice total. This total should take into account the quantity and price of each product and the invoice discount
As changes are made on the invoice form they should be automatically saved through the API (don't require use of a Save button)

When you are done, please upload the result to Git and send the link to hr@codemotion.eu with list of included bonus deliverables.

Bonus deliverables
The following deliverables are not required but are nice-to-haves. If you choose to implement them, it should take around 1 hour but you should complete this section within 2 hours. You can complete any number of the bonus deliverables; you don't need to complete all of them.

From the invoice form, make it possible to add a new Customer that is not already in the system. It should be possible to add a name and all other fields.
From the invoice form, make it possible to add a new Product. It should be possible to add a name and price.
Make it possible to edit existing invoices.
Create a page that lists existing customers with the ability to edit them
Create a page that lists existing products with the ability to edit them
Extra bonus task (really not required, only if you want to)
You can change backend database storage to mongoDB and rewrite code to work with mongoDB collections.


When you are done, please upload the result to Git and send the link to hr@codemotion.eu with list of included bonus deliverables.

