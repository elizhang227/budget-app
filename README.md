# CommonCents - Budget & Track Expenses Effortlessly!

### A Digital Crafts Project Created by Eli Zhang and Jeong Jin Tak

**Click Here: [CommonCents - Website](http://ec2-3-19-73-90.us-east-2.compute.amazonaws.com//)**


## Sample Search for a Movie Soundtrack

![](./videos/cc.gif)

## Description

CommonCents is an application that helps people track their expenses and budget accordingly. Having a breakdown and being able to physically see a number representing how much you spend will help users better manage their money and be smarter about their spending.

Even though we live in a digital age now, cash is still king and keeping all your physical receipts sounds like a hassle. With the help of this app, you can log all of your cash transactions and essentially have a permanent digital database for your receipts. 

## Walkthrough

* Landing page prompts user to login, if user is new, there is a link to signup. After successful signup, redirects to signin page.
* Once logged in, if user is brand new, redirected to setup page where user sets their desired weekly budget.
* If user has already set up budget it redirects to expenses page where they can see their transactions for the week, percentage of budget spent on that expense, add expense, and see the remaining balance from the budget set.
* Clicking on the category of an expense redirects user to a page where it only shows transactions within that category.
* Every week the budget resets to the previously set amount unless user changes it. All weekly transactions and remaining balance gets cleared out and moved to the ALL HISTORY section.
* There is an 'All History' tab on the navbar that shows ALL HISTORY, so that the user can see transactions from more than just the current weeks.

## Technologies Used

* HTML
* CSS
* JavaScript
* PostgreSQL
* Node.js
* Express
* ES6 Renderer

## Challenges and Struggles

1. ***Architecture***:

The most challenging part of this project was thinking about the architecture and data flow. I just kept building small little features, and after I implemented a feature I would realize I needed another feature to work in tandem with that feature. I think that spending time analyzing what things are necessary and how the data should flow is really important and it would have saved a lot of headaches trying to figure out why things didn't work in the code. 

## Stretch Goals

1. Add a feature that shows the percentage of each category, not just every single transaction. Seeing that one transaction was 2% of your budget does not relay any information of value as opposed to one for a breakdown of categories.

2. Integrate real bank accounts so we can track digital transactions. New technologies would need to be introduced to get this feature implemented but it would provide a more clearer picture of expenses since most transactions are done digitally nowadays.

3. Restyle the look of the website. Color schemes and overall look of things could use some work.