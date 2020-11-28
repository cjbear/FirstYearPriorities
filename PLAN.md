# Flashcard Study App

## Features

1. Create SMART Goals: 
    - show addCardButton, button {badButton, goodButton, greatButton}, card (viewForm), form, label, input
model includes:
    goals
    smartGoals array [], which are composed of questions and answers
    rank, which starts at 0 but changes based on button input
    nextId, starts at 0 and increments to assign an id# to each new card
    editId, starts at null, for editing question or answer, maintains state?
grid
    - display cards in grid divided in fours: 'fl w-25'
    - flexable 

goal
    - goal background color light yellow: 'bg-light-yellow'
    - goal border all around: 'ba' default border width is 0 
buttons
    - setButton function

Messages, need:
- msg for goal input
- msg for badButton
- msg for goodButton
- msg for greatButton

2. Edit Goals
3. Delete Goals
4. Ability to rank your goal, priority?
6. Sort goals rank ascending
   Low rank => Rank = 0
   Medium rank => Rank = Rank + 1
   High rank => Rank = Rank + 2

## Tips

* Look at plain html and css in ./design/index.html file
  * `npm run design` command will show html and css in browser
* For sorting look at the following Ramda functions:
  [sortWith](http://ramdajs.com/docs/#sortWith)
  [ascend](http://ramdajs.com/docs/#ascend)
  [descend](http://ramdajs.com/docs/#descend)

## Model

## Update Functions

## View Functions
