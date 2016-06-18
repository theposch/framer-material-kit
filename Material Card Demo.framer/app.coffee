m = require "material-kit"

background = new BackgroundLayer
	backgroundColor: "#fafafa"

# Create Scroll Component
scroll = new ScrollComponent
	width: Screen.width
	height: Screen.height
	scrollHorizontal: false
	contentInset: 
		bottom: 120


# Create first Card
card1 = new m.Card
	backgroundColor: 'white'
	title: "This is a card"
	image: Utils.randomImage()
	imageHeight: 400
	superLayer: scroll.content
	actions:["more_vert", "today"]
	bodyText: "Some text can go here"
	height: 330
	borderRadius: 2
	footer: ["Action 1", "Action 2", "Action 3"]
	

card1.constraints =
	top: 20
	


# Create second Card		
card2 = new m.Card
	superLayer: scroll.content

card2.constraints =
	top: [card1,36]

		
m.layout.set()




m.layout.set()
scroll.updateContent()