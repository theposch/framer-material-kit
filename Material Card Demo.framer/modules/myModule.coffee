m = require 'material-kit'

class exports.Card extends Layer
	constructor: () ->

	card = new Layer
		backgroundColor: "rgba(255,255,255,1)"
		shadowY: m.px(2)
		shadowColor: m.color("grey200")

	card.constraints =
		top: 10
		leading: 16
		trailing: 16
		height: 300

	m.layout.set()



	card["chevron-right"] = new m.Icon
		name: "today"
		superLayer: card
		constraints:
			leading: 16
			top:16


	text = new m.Text
		text:"Card Title"
		name: "Card Title"
		fontSize:18
		fontWeight:400
		constraints:
			align:"left"
			top: 20
			leading:[card["chevron-right"], 16]
			trailing: 16
		superLayer: card


	m.layout.set()


	thumbnail = new Layer
		superLayer: card
		image: Utils.randomImage()
		clip: true

	thumbnail.constraints =
		leading:0
		trailing:0
		bottom:60
		top:[text, 16]

	m.layout.set()

	card["subtext"] = new m.Text
		text: "Lorem Ipsum dolor sit amet penatibus magnis"
		fontSize:14
		fontWeight:300
		superLayer: card
		constraints:
			top: [thumbnail, 16]
			leading: 8
			trailing: 16

	card["footer"] = new Layer
		backgroundColor: "rgba(255,255,255,1)"
		shadowY: m.px(2)
		shadowColor: m.color("grey200")

	card["footer"].constraints =
		top: [card,1]
		trailing: 16
		leading: 16
		height: 40

	m.layout.set()

	m.utils.inky
		layer: thumbnail
		color: 'red'
