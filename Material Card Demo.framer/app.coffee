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
	superLayer: scroll.content
	
	contentHeadline: "miau miau"
	contentText: 'wo2'
	headerTitle: "This is a card"
	headerSubtitle: "MEOW"
	headerImage: Utils.randomImage()
	headerImageRadius: 500
	image: Utils.randomImage()
	imageHeight: 400
	actions:["more_vert", "face"]
	
	height: 330
	borderRadius: 2
	footer: ["Action 1", "Action 2", "Action 3"]
	

card1.constraints =
	top: 20
	




card2 = new m.Card
	superLayer: scroll.content
	headerTitle: 'hello'
	contentHeadline: "whats up"
	
card2.constraints =
	top: [card1, 16]


m.layout.set()
scroll.updateContent()