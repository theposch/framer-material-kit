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
	
	contentHeadline: "Some Headline  "
	contentText: 'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor.'
	headerTitle: "The Atlantic"
	headerSubtitle: "posted 2 hours ago"
	headerImage: Utils.randomImage()
	headerImageRadius: 500
	image: Utils.randomImage()
	imageHeight: 400
	actions:["more_vert"]
	
	height: 330
	borderRadius: 2
	footer: ["Action 1", "Action 2"]
	

card1.constraints =
	top: 20
	




card2 = new m.Card
	superLayer: scroll.content
	

	
	
	
card2.constraints =
	top: [card1, 16]

card3 = new m.Card 
	superLayer: scroll.content
card3.constraints =
	top: [card2, 16]
	
m.layout.set()
scroll.updateContent()