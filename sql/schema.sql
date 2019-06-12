create database budget_app;

create table users
(
    id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(200),
    password varchar(500)
);

create table daily
(
    id serial primary key,
    daily_category text,
    description text,
    daily_expense float,
    daily_id integer references users(id)
);

create table monthly
(
    id serial primary key,
    monthly_category text,
    monthly_expense float,
    monthly_id integer references users(id)
);

create table budget
(
    id serial primary key,
    alloted_budget float,
    budget_id integer references users(id)
);