# About EHSchedule and GitHub

EHSchedule is a very simple static website for students and teachers at Edgewater High School to easily keep track of how much time is left in the current class period. 

Created by Stefan Lotz in 2023, the website has since become a public project for any Edgewater computer science student to contribute to. If you want to make a change or a fix, simply make a pull request on this GitHub repository!

You can view the active issues to see bugs and enhancements that need to be addressed. If you notice a bug or want to make a suggestion, submit it as an issue and hopefully someone will give it a shot!

## How to propose changes

If you see a bug or want to make a feature suggestion, create a new ```issue``` on the repository. Write down what you'd like to see changed, and anyone who wants to work on the website can see what you want and try to work on it!

## How to make changes

GitHub has a wonderful feature called "pull requests". A pull request is a proposal to merge a set of changes from one branch into another. In a pull request, collaborators can review and discuss the proposed set of changes before they integrate the changes into the main codebase. Pull requests display the differences, or diffs, between the content in the source branch and the content in the target branch.

In layman's terms, all of the website's code exists in the ```main``` branch. To make a change, you get to edit and change an indentical copy on a new branch. Once you're happy wth your changes, your branch can be merged back into the ```main``` branch and the website will be updated!

Once your pull request is finalized, I'll review your code as soon as I can get to it. If your code is accepted, you'll have contributed to the development of EHSchedule!

## Adding themes

Now you can design and submit your own custom theme to be added to EHSchedule that anyone can use! To do so, create a pull request containing these changes:

1. Copy the CSS rule sets in ```themes.css``` and adjust the color values to create your custom theme.
2. Change the ```data-theme="<theme name>"``` to your desired theme name.
3. Add the theme name to the themes list in ```theme.js```. Make sure it's exactly same as the one from the CSS file.
4. On all HTML pages, add a new ```<option>``` in the ```<select>``` tag. Make sure the ID is the same as the one used above.
