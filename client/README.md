# Sport drills tool

With this tool it is possible to create and save tactics and training diagrams for different sports.

## Motivation

I was myself a goalie in inline hockey many years ago.
I have always been fascinated by the coach's point of view, and the types of training to improve the different skills of the players.

![tools](./project/readme-assets/sports.jpg)
<sub><sup>Source: shutterstock.com</sup></sub>

Some time ago I started practicing on my own again and I was looking for a tool with which I could draw my own diagrams and exercises.

After a little search on the web I found different types of online, mobile or desktop applications, some free and some paid.

- i-drills.com
- sportplan.net
- icehockeysystems.com
- online-basketball-drills.com
- breakthroughbasketball.com
- lthd.fieldhockey.ca
- planet.training
- ducth-fieldhockey-drills.com (dfp)

![tools](./project/readme-assets/tools.jpg)

  
The tools that are free are quite unlimited, not very good user interface. The best designed tools are paid and with limited access.

Any reason is good for programming, so I decided to create my own tool to suit my own needs.

## Concept

The tool should be similar to a vector editor, much more simplified and allow basic functions always related to the topic of sport, tactics and training.
That means the possibility to add and move players from different teams, position training elements and draw tactical lines for different actions like: passing, running, shooting, etc...

The design should be simple since the focus should remain on the diagram and take into account the different devices: mobile, tablet and desktop with all that implies:

- more/less screen space
- mouse / touch interaction
- dimensions of the elements: selection, displacement and visualization

![tools](./project/readme-assets/references.jpg)
<sub><sup>Source: dribbble.com</sup></sub>

## Result

After several versions and improvements, here is the result:

## Sports
- different fields for different sports:
  - hockey
  - basket
  - football
  - tennis
  

### Players
- player positions for each type of sport
- teams color
  
![tools](./project/readme-assets/drill-screenshot-003.png)

### Items
- different assets for each type of sport
- rotation

![tools](./project/readme-assets/drill-screenshot-002.png)

### Paths
- different paths types for each action: shot, pass, move with ball, etc..
- node editor

![tools](./project/readme-assets/drill-screenshot-004.png)
![tools](./project/readme-assets/drill-screenshot-001.png)

### Other Features
- element selection view
- svg/png export
- full screen mode

### Technical aspects

The tool is created in vue.js.  
The diagrams are based on svg format and completely manipulated in vanilla.

#### Why not use canvas?  
> Good question :)

## Next Steps

After the first version comes immediately a lot of ideas and possibilities:

- touch devices friendly
- analysis tools: 
  - measurement of spaces and angles
  - polygons, circles
- frames editor
- diagram customization: team/ sponsor logo
- more sports
- import tracking player position
