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
	actions:["more_vert"]
	bodyText: "Wow, it's a text layer. so cool! "
	height: 400
	borderRadius: 16
	buttonText: ['Action1','Action 2']

	
card1.constraints =
	top: 20
	


# Create second Card		
card2 = new m.Card

	superLayer: scroll.content

card2.constraints =
	top: [card1,36]

		
m.layout.set()
scroll.updateContent()
