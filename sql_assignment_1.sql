show databases;
create database e_commerce;

create table Customers(
customer_id int  primary key AUTO_INCREMENT,
name varchar(50),
email varchar(50),
mobile varchar(15));

create table Products(
id int, 
name varchar(50) not null,
description varchar(200),
price decimal(10,2) not null,
category varchar(50));


ALTER TABLE Customers 
MODIFY COLUMN name VARCHAR(50) NOT NULL, 
MODIFY COLUMN email VARCHAR(50) NOT NULL;

ALTER TABLE Customers 
ADD CONSTRAINT unique_email UNIQUE(email);

ALTER TABLE Customers
ADD COLUMN age int;

ALTER TABLE Products
CHANGE COLUMN id product_id int;

ALTER TABLE Products
MODIFY COLUMN product_id int primary key AUTO_INCREMENT;

ALTER TABLE Products
MODIFY COLUMN description text;

CREATE TABLE Orders(
order_id int primary key AUTO_INCREMENT,
customer_id int,
product_id int,
quantity int not null,
order_date date not null,
status enum('Pending', 'Success', 'Cancel'),
payment_method enum('Credit', 'Debit', 'UPI'),
total_amount decimal(10, 2) not null,
FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)
);

ALTER TABLE Orders
MODIFY COLUMN status enum('Pending', 'Success', 'Cancel') default 'pending';

ALTER TABLE Orders
MODIFY COLUMN payment_method enum('Credit', 'Debit', 'UPI', 'COD');

ALTER TABLE Orders
ADD CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES Products(product_id);


INSERT INTO Customers (name, email, mobile, age) VALUES
('John Doe', 'john.doe@example.com', '1234567890', 30),
('Jane Smith', 'jane.smith@example.com', '2345678901', 28),
('Michael Johnson', 'michael.j@example.com', '3456789012', 35),
('Emily Davis', 'emily.d@example.com', '4567890123', 27),
('David Wilson', 'david.w@example.com', '5678901234', 40),
('Sophia Martinez', 'sophia.m@example.com', '6789012345', 32),
('James Anderson', 'james.a@example.com', '7890123456', 45),
('Olivia Thomas', 'olivia.t@example.com', '8901234567', 29),
('Daniel White', 'daniel.w@example.com', '9012345678', 33),
('Emma Harris', 'emma.h@example.com', '0123456789', 26),
('William Clark', 'william.c@example.com', '1111111111', 50),
('Ava Lewis', 'ava.l@example.com', '2222222222', 22),
('Benjamin Hall', 'benjamin.h@example.com', '3333333333', 38),
('Mia Allen', 'mia.a@example.com', '4444444444', 31),
('Alexander Young', 'alex.y@example.com', '5555555555', 36),
('Charlotte King', 'charlotte.k@example.com', '6666666666', 29),
('Ethan Scott', 'ethan.s@example.com', '7777777777', 41),
('Amelia Green', 'amelia.g@example.com', '8888888888', 24),
('Mason Baker', 'mason.b@example.com', '9999999999', 39),
('Isabella Adams', 'isabella.a@example.com', '0000000000', 23);

select * from Customers;

INSERT INTO Products (name, description, price, category) VALUES
('iPhone 14', 'Apple smartphone with A15 Bionic chip', 799.99, 'Electronics'),
('Samsung Galaxy S23', 'Flagship Samsung smartphone', 899.99, 'Electronics'),
('MacBook Air M2', 'Apple laptop with M2 chip', 1199.99, 'Computers'),
('Dell XPS 15', 'High-performance Dell laptop', 1299.99, 'Computers'),
('Sony WH-1000XM5', 'Noise-canceling wireless headphones', 399.99, 'Audio'),
('Bose QuietComfort 45', 'Premium noise-canceling headphones', 329.99, 'Audio'),
('Nike Air Max 270', 'Popular Nike running shoes', 149.99, 'Fashion'),
('Adidas Ultraboost', 'High-performance running shoes', 179.99, 'Fashion'),
('Rolex Submariner', 'Luxury diving watch', 8999.99, 'Watches'),
('Casio G-Shock', 'Durable digital watch', 99.99, 'Watches'),
('Sony PlayStation 5', 'Next-gen gaming console', 499.99, 'Gaming'),
('Xbox Series X', 'Microsoft gaming console', 499.99, 'Gaming'),
('Nintendo Switch', 'Hybrid gaming console', 299.99, 'Gaming'),
('Samsung 55" QLED TV', 'Smart TV with 4K resolution', 999.99, 'Electronics'),
('LG OLED C2 65"', 'Premium OLED Smart TV', 1599.99, 'Electronics'),
('Apple iPad Air', 'Lightweight Apple tablet', 599.99, 'Tablets'),
('Amazon Kindle Paperwhite', 'E-reader with high-resolution display', 129.99, 'Books'),
('GoPro Hero 11', 'Action camera for adventure', 449.99, 'Cameras'),
('Canon EOS R5', 'High-end mirrorless camera', 3899.99, 'Cameras'),
('Levi’s 501 Jeans', 'Classic straight-fit jeans', 89.99, 'Fashion');

select * from Products;

INSERT INTO Orders (customer_id, product_id, quantity, order_date, status, payment_method, total_amount) VALUES
(1, 5, 2, '2024-02-01', 'Success', 'Credit', 799.98),
(2, 3, 1, '2024-02-02', 'Pending', 'Debit', 1199.99),
(3, 8, 3, '2024-02-03', 'Success', 'UPI', 539.97),
(4, 12, 1, '2024-02-04', 'Cancel', 'COD', 499.99),
(5, 14, 2, '2024-02-05', 'Success', 'UPI', 1999.98),
(6, 6, 1, '2024-02-06', 'Pending', 'Debit', 329.99),
(7, 9, 1, '2024-02-07', 'Success', 'Credit', 8999.99),
(8, 15, 2, '2024-02-08', 'Pending', 'COD', 3199.98),
(9, 2, 1, '2024-02-09', 'Success', 'UPI', 899.99),
(10, 10, 3, '2024-02-10', 'Cancel', 'Credit', 299.97),
(11, 1, 1, '2024-02-11', 'Pending', 'Debit', 799.99),
(12, 7, 2, '2024-02-12', 'Success', 'UPI', 299.98),
(13, 13, 1, '2024-02-13', 'Pending', 'COD', 299.99),
(14, 4, 2, '2024-02-14', 'Success', 'Credit', 2599.98),
(15, 11, 1, '2024-02-15', 'Cancel', 'Debit', 499.99),
(16, 16, 1, '2024-02-16', 'Success', 'UPI', 599.99),
(17, 18, 1, '2024-02-17', 'Pending', 'COD', 449.99),
(18, 20, 2, '2024-02-18', 'Success', 'Credit', 179.98),
(19, 17, 3, '2024-02-19', 'Cancel', 'Debit', 389.97),
(20, 19, 1, '2024-02-20', 'Success', 'UPI', 3899.99);

select * from Orders;

select category, count(product_id) as product_count from Products
group by category;

select count(product_id) from Products 
where category = 'Electronics' and name like '%a%';

select * 
from Products 
where category = 'Electronics' 
order by price desc 
limit 5 offset 2;

SELECT c.*
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
WHERE o.customer_id IS NULL;

SELECT customer_id, AVG(total_amount) AS average_spent
FROM Orders
GROUP BY customer_id;

SELECT * 
FROM Products 
WHERE price < (SELECT AVG(price) FROM Products);

SELECT customer_id, SUM(quantity) AS total_quantity_ordered
FROM Orders
GROUP BY customer_id;

SELECT o.order_id, c.name AS customer_name, p.name AS product_name, 
       o.quantity, o.order_date, o.status, o.payment_method, o.total_amount
FROM Orders o
JOIN Customers c ON o.customer_id = c.customer_id
JOIN Products p ON o.product_id = p.product_id;

SELECT p.*
FROM Products p
LEFT JOIN Orders o ON p.product_id = o.product_id
WHERE o.product_id IS NULL;









