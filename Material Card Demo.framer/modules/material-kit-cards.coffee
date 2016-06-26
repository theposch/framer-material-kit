m = require 'material-kit'

exports.defaults = {

	height: 300
	type:"card"
	backgroundColor:"white"

	headerTitle: 'title'
	headerSubtitle: undefined
	headerImage: undefined
	headerImageRadius: 400
	headerBackgroundColor: undefined

	contentHeadline: "Headline"
	contentText: "Text"

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
			backgroundColor: 'transparent'
			superLayer: card
			height: 128


		cardHeader.constraints =
			leading: 0
			trailing: 0

		headerTitle = new m.Text
			superLayer:cardHeader
			text: setup.headerTitle
			fontWeight:"medium"
			fontSize:14
			name:"headerTitle"
			lineHeight:18

			constraints:
				top:16
				width:220
				leading:16

		m.layout.set()




	if setup.headerSubtitle
		headerSubtitle = new m.Text
			superLayer: cardHeader
			text: setup.headerSubtitle
			fontWeight:"regular"
			fontSize:14
			opacity: 0.5
			name:"headerSubtitle"
			constraints:
				top: [headerTitle,2]
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


	if headerImage && headerTitle
			headerTitle.constraints =
				leading: [headerImage, 16]
				verticalAlign: headerImage
			m.layout.set()



	if headerImage && headerTitle && headerSubtitle
			headerTitle.constraints =
				leading: [headerImage, 16]


			headerSubtitle.constraints =
				leading: [headerImage, 16]
			m.layout.set()




# -------  CREATE CONTENT AREA -----------------


	if setup.contentHeadline or setup.contentText
		contentArea = new Layer
			name: "contentArea"
			superLayer: card
			backgroundColor: 'transparent'

		contentArea.constraints =
			leading: 0
			trailing: 0
			top: [cardHeader,0]


		m.layout.set()

	if setup.contentHeadline

		contentHeadline = new m.Text
			superLayer:contentArea
			text:setup.contentHeadline
			fontWeight:"semibold"
			fontSize:20
			name:"Content Headline"
			lineHeight:20
			constraints:
				top:16
				width:220
				leading:24
		m.layout.set()


	if setup.contentText

		contentText = new m.Text
			superLayer:contentArea
			text:setup.contentText
			fontSize:13
			name:"Content Text"
			lineHeight:16
			constraints:
				top: 16
				leading:24
				width: 220



		m.layout.set()

	if setup.contentHeadline && setup.contentText
			contentHeadline.constraints =
				top: 16
				leading: 16
				trailing: 16
			contentText.constraints =
				top: [contentHeadline, 8]
				leading: 16
				trailing: 16

			contentArea.constraints["height"] =  m.utils.pt(contentText.height)+ m.utils.pt(contentHeadline.height)+16
			m.layout.set()



	if cardHeader
		contentArea.constraints =
			top: [cardHeader,0]
		m.layout.set()
		card.constraints["height"] = 20 + m.utils.pt(cardHeader.height) + 16 + m.utils.pt(contentArea.height)

	if setup.image
		thumbnail = new Layer
				superLayer: card
				image: setup.image
				height: setup.imageHeight
		m.layout.set()

		card.constraints["height"] = 20 + m.utils.pt(thumbnail.height) + 24

	if thumbnail && cardHeader

		contentArea.constraints =
			top: [thumbnail, 0]

		thumbnail.constraints =
					top: [cardHeader,0]
					leading: 0
					trailing: 0
		m.layout.set()

		card.constraints["height"] = 20 + m.utils.pt(cardHeader.height) + 10 + m.utils.pt(thumbnail.height) + 24 + 44


	if setup.image && not cardHeader
		thumbnail = new Layer
				superLayer: card
				image: setup.image
				height: setup.imageHeight
				constraints:
					top: 0
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

		if setup.footer && contentArea && thumbnail && cardHeader
			cardFooter.constraints =
				top: [contentArea,0]
			card.constraints["height"] = m.utils.pt(cardHeader.height) + m.utils.pt(thumbnail.height) + m.utils.pt(cardFooter.height) + m.utils.pt(contentArea.height)
			m.layout.set()






	m.layout.set()


	card.type = setup.type



	m.utils.specialChar(headerTitle)



	return card
