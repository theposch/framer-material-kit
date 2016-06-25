m = require 'material-kit'

exports.defaults = {
	title: undefined
	headerSubtitle: undefined
	bodyText: "Content"
	height: 300
	cardHeaderbackgroundColor:'red'

	type:"card"
	backgroundColor:"white"
	titleColor:"black"
	actionColor:"black"
	actions:undefined
	footer:  undefined
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
		backgroundColor:'m.color(setup.backgroundColor)'
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

	if setup.title
		cardHeader = new Layer
			name: "cardHeader"
			cardHeaderbackgroundColor:m.color(setup.cardHeaderbackgroundColor)
			superLayer: card
			height: 300
			cardHeader.constraints =
				width: 900
			m.layout.set(cardHeader)
		title = new m.Text
			superLayer:cardHeader
			text:setup.title
			fontWeight:"semibold"
			fontSize:14
			name:"title"
			lineHeight:20
			constraints:
				top:24
				width:220
				leading:16

	if setup.headerSubtitle
		headerSubtitle = new m.Text
			superLayer: cardHeader
			text: setup.headerSubtitle
			fontWeight:"semibold"
			fontSize:14
			name:"headerSubtitle"
			constraints:
				top:  8
				width:220
				leading:16

		title.constraints=
			top:  8










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
					constraints:{trailing:[actionsArray[i - 1], 16], verticalCenter:title}
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



	# IMAGE SETUP
	if setup.image
		thumbnail = new Layer
				superLayer: card
				image: setup.image
				height: setup.imageHeight

		thumbnail.constraints =
				leading:0
				trailing:0
				top: [cardHeader, 0]
		m.utils.inky
			layer:thumbnail
			moveToTap:true
			color:"white"
			opacity:.4
			scale: 2
			startScale:.7
		card.constraints["height"] = 20 + m.utils.pt(title.height) + 10 + m.utils.pt(thumbnail.height) + 24 + 44

	# If there is Text setup but no Image, place text under title
	if setup.bodyText and not setup.image
			bodyText = new m.Text
				name:"content"
				superLayer: card
				text:setup.bodyText
			bodyText.constraints =
				top: [title, 16]
				leading: 16
				trailing: 16

	# if there is an image & bodytext setup, place bodytext under image

	if setup.bodyText && setup.image
		bodyText = new m.Text
			name:"content"
			superLayer: card
			text:setup.bodyText

		bodyText.constraints =
			top: [thumbnail, 16]
			leading: 16
			trailing: 16







	buttonArray = []
	if setup.footer

		cardFooter = new Layer
			name: "cardFooter"
			superLayer: card
			backgroundColor: 'transparent'

		cardFooter.constraints =
			height: 56
			bottom: 0
			leading: 0
			trailing: 0


		# The main thing was giving trouble was setup.footer was the text property, so there were 3 buttons that were identical
		# To fix that, the text is set to the individual item
		# I also set the spacing for you and embedded the constraints.

		# Added i to get the index of the array. Before the i was just returning 1 for every item. I'm not sure why ¯\_(ツ)_/¯
		setup.footer.forEach (item, i) ->

			if i == 0
				button = new m.Button
					name: item
					type:"flat"
					superLayer: cardFooter
					text: item
					backgroundColor:"#3232"
					# The button layer handles constraints for you
					constraints: {bottom:8, leading:16}
				buttonArray.push button
			else
				button = new m.Button
					name: item
					type:"flat"
					superLayer: cardFooter
					text: item
					backgroundColor:"#3232"
					# Set the leading layer to be the previous layer in the array,
					constraints: {bottom:8, leading:[buttonArray[i - 1], 8]}
				buttonArray.push button

				m.layout.set()

					# this guy breaks things, i think, so commenting out.
					# constraints:{leading:[cardButtonArray[i - 1], 16]}


		for button in buttonArray
			m.utils.inky
				layer: button
				moveToTap:false
				color:"red"
				opacity:.4
				scale:.8
				startScale:.7




			m.layout.set()








	m.layout.set()


	card.type = setup.type



	m.utils.specialChar(title)



	return card
