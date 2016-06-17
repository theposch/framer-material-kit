m = require 'material-kit'

exports.defaults = {
	title:"Title"
	bodyText: "Content"
	height: 300
	type:"card"
	backgroundColor:"white"
	titleColor:"black"
	actionColor:"black"
	actions:undefined
	buttonText:  undefined
	image: undefined
	imageHeight: undefined
	superLayer:undefined
	borderRadius: undefined


}

exports.defaults.props = Object.keys(exports.defaults)

exports.create = (array) ->
	setup = m.utils.setupComponent(array, exports.defaults)
	card = new Layer
		name:"Card"
		backgroundColor:m.color(setup.backgroundColor)
		shadowColor: "rgba(0, 0, 0, .12)"
		shadowBlur: m.px(4)
		shadowY: m.px(2)
		superLayer: setup.superLayer
		borderRadius: setup.borderRadius

	card.constraints =
		leading:16
		trailing:16
		top:0
		height: setup.height


	title = new m.Text
		superLayer:card
		text:setup.title
		fontWeight:"semibold"
		fontSize:20
		name:"title"
		lineHeight:20
		constraints:
			top:20
			width:220
			leading:16




	if setup.image
		thumbnail = new Layer
				superLayer: card
				image: setup.image
				height: setup.imageHeight

		thumbnail.constraints =
				leading:0
				trailing:0
				top: [title, 16]

		cardText = new m.Text
			name:"content"
			superLayer: card
			text:setup.bodyText

		cardText.constraints =
			top: [thumbnail, 16]
			leading: 16
			trailing: 16

		m.utils.inky
			layer:thumbnail
			moveToTap:true
			color:"white"
			opacity:.4
			scale: 2
			startScale:.7
	else
		cardText = new m.Text
			name:"content"
			superLayer: card
			text:setup.bodyText

		cardText.constraints =
			top: [title, 16]
			leading: 16
			trailing: 16




	if setup.buttonText
		cardActions = new Layer
			superLayer: card

			backgroundColor: 'transparent'
			name: 'cardActions'

		cardActions.constraints =
			height: 56
			bottom: 0
			leading: 0
			trailing: 0



		button = new m.Button
			name: 'test'
			type:"flat"
			superLayer:cardActions
			text: setup.buttonText

			backgroundColor:"#3232"
			color: setup.actionColor
		button.constraints = {bottom:8, leading:8}

	


	# SET UP ACTIONS IN HEADER
	actionsArray = []
	if setup.actions
		for act, i in setup.actions
			if i == 0
				icon = new m.Icon
					name:act
					superLayer:card
					constraints:{trailing:16, top: 16}
					color:setup.actionColor
					clip:false
				actionsArray.push icon
			else
				icon = new m.Icon
					name:act
					superLayer:card
					constraints:{trailing:[actionsArray[i - 1], 24], verticalCenter:title}
					color:setup.actionColor
					clip:false
				actionsArray.push icon

		for act in actionsArray
			m.utils.inky
				layer:act
				moveToTap:false
				color:"white"
				opacity:.4
				scale:.8
				startScale:.7


	m.layout.set()


	card.type = setup.type



	m.utils.specialChar(title)



	return card
