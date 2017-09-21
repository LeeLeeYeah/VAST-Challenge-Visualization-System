# Visualization-System
The project is an interesting problem from [IEEE VIS VAST Challenge 2015](http://ieeevis.org/year/2015/info/call-participation/vast-challenge). To summarize the problem, a thief stole something important from a theme park, and we have the GPS data of all the visitors that day, and we need to use visualization methods to find out the thief.
![](http://www.yejunli.com/wp-content/uploads/Visualization9-494x350.png)

To begin with we draw a heat map to analyze the overall traffic of the theme park.
![](http://www.yejunli.com/wp-content/uploads/Visualization6.gif)

Then we used the GPS data to calculates 12 features: mean speed, maximum speed,  total staying time, proportion of times that the visitor spent in every zone and every attraction, and so on.
Afterwards, we used PCA to do dimensionality reduction, and use K-MEANS for classification and find out some abnormal visitors in the database.
![](http://www.yejunli.com/wp-content/uploads/Visualization7.gif)

Then we build a path tracker to track those abnormal visitors, here is an example of the tracker:
![](http://www.yejunli.com/wp-content/uploads/Visualization8-649x336.jpg)
![](http://www.yejunli.com/wp-content/uploads/Visualization4.gif)

And we found a suspect, who went to the crime scene directly and leave the park.
![](http://www.yejunli.com/wp-content/uploads/Visualization2.gif)

And we found a suspect that seemed had hacked the tracking system and produce a tracking bug.
![](http://www.yejunli.com/wp-content/uploads/Visualization3.gif)

# How to run the code
Please download the code and open index.html. Please make sure that your browser support local data reading. Firefox is strongly recommended.