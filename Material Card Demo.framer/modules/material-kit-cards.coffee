m = require 'material-kit'

exports.defaults = {

	height: 300
	type:"card"
	backgroundColor:"white"

	headerTitle: undefined
	headerSubtitle: undefined
	headerImage: undefined
	headerImageRadius: 400
	headerBackgroundColor: 'red'

	contentHeadline: undefined
	contentText: undefined

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


# -------  CREATE CARD HEADER -----------------

	if setup.headerTitle
		cardHeader = new Layer
			name: "cardHeader"
			backgroundColor:m.color(setup.headerBackgroundColor)
			superLayer: card
			height: 128


		cardHeader.constraints =
			leading: 0
			trailing: 0

		headerTitle = new m.Text
			superLayer:cardHeader
			text: setup.headerTitle
			fontWeight:"semibold"
			fontSize:14
			name:"headerTitle"
			lineHeight:20

			constraints:
				top:16
				width:220
				leading:16
		m.layout.set()


	if setup.headerSubtitle
		headerSubtitle = new m.Text
			superLayer: cardHeader
			text: setup.headerSubtitle
			fontWeight:"semibold"
			fontSize:14
			name:"headerSubtitle"
			constraints:
				top: [headerTitle, 4]
				width:220
				leading:16
			m.layout.set()

	if setup.headerImage
			headerImage = new Layer
				superLayer: cardHeader
				name: "headerImage"
				width: 80
				height: 80
				image: setup.headerImage
				borderRadius: setup.headerImageRadius
			headerImage.constraints =
				top: 16
				leading: 16
			m.layout.set()

	if headerImage && setup.headertitle && setup.headerSubtitle

			headerTitle.constraints.leading = [headerImage, 16]

			headerSubtitle.constraints =
				leading:  72
			m.layout.set()




# -------  CREATE CONTENT AREA -----------------


	if setup.contentHeadline or setup.contentText
		contentArea = new Layer
			name: "contentArea"
			superLayer: card

		contentArea.constraints =
			leading: 0
			trailing: 0
			top: [cardHeader,0]
		m.layout.set()

	if setup.contentHeadline
		contentHeadline = new m.Text
			name:"contentHeadline"
			superLayer: contentArea
			text:setup.contentHeadline
			fontWeight: 'Regular'
			fontSize: 24
		contentHeadline.constraints =
			top: 16
			leading: 16
			trailing: 16
		m.layout.set()


	if setup.contentText
		contentText = new m.Text
			name:"contentText"
			superLayer: contentArea
			text:setup.contentText
		contentTextconstraints =
			top: 16
			leading: 16
			trailing: 16
		m.layout.set()

	if setup.contentHeadline && setup.contentText
			contentHeadline.constraints =
				top: 16
				leading: 16
				trailing: 162
			contentText.constraints =
				top: [contentHeadline, 8]
				leading: 16
				trailing: 16
			m.layout.set()

	if cardHeader
		contentArea.constraints =
			top: [cardHeader,0]
		m.layout.set()

	if setup.image
		thumbnail = new Layer
				superLayer: card
				image: setup.image
				height: setup.imageHeight
		m.layout.set()


	if thumbnail && cardHeader

		contentArea.constraints =
			top: [thumbnail, 0]

		thumbnail.constraints =
					top: [cardHeader,0]
					leading: 0
					trailing: 0
		m.layout.set()




	# SET UP ACTIONS IN HEADER
	actionsArray = []
	if setup.actions
		for act, i in setup.actions
			if i == 0
				icon = new m.Icon
					name:act
					superLayer:cardHeader
					constraints:{trailing:16, top: 16}
					color:setup.actionColor
					clip:false
				actionsArray.push icon
			else
				icon = new m.Icon
					name:act
					superLayer:cardHeader
					constraints:{trailing:[actionsArray[i - 1], 16], top: 16}
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



	m.utils.specialChar(headerTitle)



	return card
