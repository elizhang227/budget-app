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

create table budget_timestamp
(
    id serial primary key,
    set_budget float,
    timestamp varchar(200),
    reset_time varchar(200),
    reset_id integer references users(id)
);

create table budget
(
    id serial primary key,
    alloted_budget float,
    budget_id integer references users(id)
);