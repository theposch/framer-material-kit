require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"material-kit-app-bar":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  title: "Title",
  menu: void 0,
  type: "appbar",
  backgroundColor: "white",
  tabs: void 0,
  titleColor: "black",
  actionColor: "black",
  tabs: void 0,
  tabsColor: void 0,
  tabsInk: {
    color: "blueGrey",
    scale: 8
  },
  tabsBarColor: "yellow",
  tabsAlt: {
    color: void 0,
    opacity: .7
  },
  tabIcons: void 0,
  actions: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var act, actionsArray, bar, barArea, handleTabStates, i, icon, j, k, l, label, layer, len, len1, len2, len3, n, ref, ref1, ref2, setup, t, tab, tabsActiveBar, title, titleLeading, view;
  setup = m.utils.setupComponent(array, exports.defaults);
  bar = new Layer({
    name: "App Bar",
    backgroundColor: m.color(setup.backgroundColor),
    shadowColor: "rgba(0, 0, 0, .12)",
    shadowBlur: m.px(4),
    shadowY: m.px(2)
  });
  bar.constraints = {
    leading: 0,
    trailing: 0,
    top: 0,
    height: 80
  };
  if (setup.tabs) {
    bar.constraints.height = 128;
  }
  barArea = new Layer({
    superLayer: bar,
    backgroundColor: "transparent",
    name: "barArea"
  });
  barArea.constraints = {
    leading: 0,
    trailing: 0,
    height: 56,
    bottom: 0
  };
  if (setup.tabs && setup.tabs.length > 2) {
    barArea.constraints.bottom = 48;
  }
  if (setup.superLayer) {
    setup.superLayer.addSubLayer(bar);
  }
  m.layout.set([bar, barArea]);
  bar.type = setup.type;
  ref = Framer.CurrentContext.layers;
  for (j = 0, len = ref.length; j < len; j++) {
    layer = ref[j];
    if (layer.type === "statusBar") {
      this.statusBar = layer;
      bar.placeBehind(this.statusBar);
    }
  }
  if (setup.titleColor === "black") {
    setup.titleColor = m.utils.autoColor(bar.backgroundColor).toHexString();
  }
  if (setup.actionColor === "black") {
    setup.actionColor = m.utils.autoColor(bar.backgroundColor).toHexString();
  }
  if (typeof setup.title === "string") {
    title = new m.Text({
      color: setup.titleColor,
      fontWeight: 500,
      superLayer: barArea,
      text: setup.title,
      fontSize: 20
    });
  }
  m.utils.specialChar(title);
  titleLeading = 16;
  if (setup.menu) {
    bar.menu = new m.Icon({
      name: setup.menu,
      color: setup.actionColor,
      superLayer: barArea,
      constraints: {
        leading: 16,
        verticalCenter: title
      },
      clip: false
    });
    titleLeading = [bar.menu, 16];
    m.utils.inky({
      layer: bar.menu,
      moveToTap: false,
      color: "white",
      opacity: .4,
      scale: .7,
      startScale: .7
    });
  }
  title.constraints = {
    bottom: 12,
    leading: titleLeading
  };
  if (setup.leftAction) {
    title.constraints.leading = 73;
  }
  m.layout.set({
    target: [title]
  });
  actionsArray = [];
  if (setup.actions) {
    ref1 = setup.actions;
    for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
      act = ref1[i];
      if (i === 0) {
        icon = new m.Icon({
          name: act,
          superLayer: barArea,
          constraints: {
            trailing: 24,
            verticalCenter: title
          },
          color: setup.actionColor,
          clip: false
        });
        actionsArray.push(icon);
      } else {
        icon = new m.Icon({
          name: act,
          superLayer: barArea,
          constraints: {
            trailing: [actionsArray[i - 1], 24],
            verticalCenter: title
          },
          color: setup.actionColor,
          clip: false
        });
        actionsArray.push(icon);
      }
    }
    for (l = 0, len2 = actionsArray.length; l < len2; l++) {
      act = actionsArray[l];
      m.utils.inky({
        layer: act,
        moveToTap: false,
        color: "white",
        opacity: .4,
        scale: .8,
        startScale: .7
      });
    }
  }
  if (setup.tabs && setup.tabs.length > 2) {
    handleTabStates = function(bar, layer) {
      var activeTabIndex, color, len3, n, opacity, results, t, tab, tabsArray;
      tabsArray = Object.keys(bar.tabs);
      activeTabIndex = void 0;
      results = [];
      for (i = n = 0, len3 = tabsArray.length; n < len3; i = ++n) {
        t = tabsArray[i];
        tab = bar.tabs[t];
        if (tab === bar.activeTab) {
          activeTabIndex = i;
          bar.views[t].animate({
            properties: {
              x: 0
            },
            time: .25
          });
          tab.label.opacity = 1;
          tab.label.color = setup.tabsColor;
          bar.activeBar.animate({
            properties: {
              x: layer.x
            },
            time: .25,
            curve: "bezier-curve(.2, 0.4, 0.4, 1.0)"
          });
          results.push(m.utils.update(title, [
            {
              text: m.utils.capitalize(bar.activeTab.label.name)
            }
          ]));
        } else {
          if (activeTabIndex === void 0) {
            bar.views[t].animate({
              properties: {
                x: m.device.width * -1
              },
              time: .25,
              curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
            });
          } else {
            bar.views[t].animate({
              properties: {
                x: m.device.width
              },
              time: .25,
              curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
            });
          }
          opacity = 1;
          color = tab.label.color;
          if (setup.tabsAlt.opacity !== void 0) {
            opacity = setup.tabsAlt.opacity;
          }
          if (setup.tabsAlt.color !== void 0) {
            color = setup.tabsAlt.color;
          }
          tab.label.opacity = opacity;
          results.push(tab.label.color = color);
        }
      }
      return results;
    };
    tabsActiveBar = new Layer({
      height: m.px(2),
      width: m.device.width / setup.tabs.length,
      backgroundColor: m.color(setup.tabsBarColor),
      superLayer: bar
    });
    tabsActiveBar.constraints = {
      bottom: 0
    };
    bar.activeBar = tabsActiveBar;
    bar.tabs = {};
    bar.views = {};
    if (setup.tabs.length < 5) {
      ref2 = setup.tabs;
      for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
        t = ref2[i];
        view = new Layer({
          name: "View " + t,
          backgroundColor: "transparent"
        });
        view.constraints = {
          top: bar,
          bottom: 0,
          width: m.dp(m.device.width)
        };
        bar.views[t] = view;
        if (i > 0) {
          view.x = m.device.width;
        }
        tab = new Layer({
          width: m.device.width / setup.tabs.length,
          height: m.px(48),
          x: (m.device.width / setup.tabs.length) * i,
          superLayer: bar,
          backgroundColor: "transparent",
          clip: true,
          name: "tab "
        });
        tab.constraints = {
          bottom: 0
        };
        m.layout.set(tab);
        if (setup.tabsColor === void 0) {
          setup.tabsColor = m.utils.autoColor(bar.backgroundColor).toHexString();
        }
        label = "";
        if (setup.tabIcons) {
          icon = setup.tabIcons[i];
          label = new m.Icon({
            name: icon,
            superLayer: tab,
            color: setup.tabsColor,
            constraints: {
              align: "center"
            }
          });
        } else {
          label = new m.Text({
            superLayer: tab,
            constraints: {
              align: "center"
            },
            text: t,
            textTransform: 'Uppercase',
            fontSize: 14,
            color: setup.tabsColor
          });
        }
        label.name = t;
        tab.label = label;
        setup.tabsInk["layer"] = tab;
        m.utils.inky(setup.tabsInk);
        bar.tabs[t] = tab;
        tab.on(Events.TouchEnd, function() {
          bar.activeTab = this;
          return handleTabStates(bar, this);
        });
      }
    }
  }
  if (setup.tabs) {
    if (setup.tabs.length > 2) {
      bar.activeTab = bar.tabs[setup.tabs[0]];
      handleTabStates(bar, bar.activeTab);
    }
  }
  bar.title = title;
  return bar;
};


},{"material-kit":"material-kit"}],"material-kit-banner":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  app: "App",
  title: "Title",
  message: "Message",
  action: "Action",
  time: "• now",
  icon: void 0,
  duration: 7,
  animated: true
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var app, banner, bannerBuffer, message, setup, time, title;
  setup = m.utils.setupComponent(array, exports.defaults);
  banner = new Layer({
    backgroundColor: "white",
    name: "banner",
    shadowColor: "rgba(0,0,0,.24)",
    shadowBlur: m.px(2),
    shadowY: m.px(2)
  });
  banner.constraints = {
    leading: 0,
    trailing: 0,
    top: 0,
    height: 74
  };
  switch (m.device.name) {
    case "ipad":
      this.leadingIcon = 200;
      this.topIcon = 15;
      this.topTitle = 11;
      break;
    case "ipad-pro":
      this.leadingIcon = 192;
      this.topIcon = 12;
      this.topTitle = 9;
      break;
    case "iphone-6s-plus":
      this.leadingIcon = 15;
      this.topIcon = 12;
      this.topTitle = 10;
      break;
    default:
      this.leadingIcon = 15;
      this.topIcon = 8;
      this.topTitle = 6;
  }
  if (setup.icon === void 0) {
    setup.icon = new Layer({
      superLayer: banner
    });
    setup.icon.style["background"] = "linear-gradient(-180deg, #67FF81 0%, #01B41F 100%)";
  } else {
    banner.addSubLayer(setup.icon);
  }
  setup.icon.borderRadius = m.utils.px(4.5);
  setup.icon.name = "icon";
  setup.icon.constraints = {
    height: 16,
    width: 16,
    leading: this.leadingIcon,
    top: this.topIcon
  };
  app = new m.Text({
    style: "app",
    text: setup.app,
    color: "blue",
    fontWeight: "medium",
    fontSize: 11,
    superLayer: banner,
    name: "title"
  });
  app.constraints = {
    verticalCenter: setup.icon,
    leading: [setup.icon, 5]
  };
  title = new m.Text({
    style: "title",
    text: setup.title,
    color: "black",
    fontSize: 13,
    superLayer: banner,
    name: "title"
  });
  title.constraints = {
    leadingEdges: setup.icon,
    top: [setup.icon, 7]
  };
  message = new m.Text({
    style: "title",
    text: setup.message,
    color: "grey",
    fontSize: 13,
    superLayer: banner,
    name: "title"
  });
  message.constraints = {
    leadingEdges: setup.icon,
    top: [title, 5]
  };
  time = new m.Text({
    style: "time",
    text: setup.time,
    color: "grey",
    fontSize: 11,
    superLayer: banner,
    name: "time"
  });
  time.constraints = {
    leading: [app, 3],
    bottomEdges: app
  };
  m.layout.set();
  m.utils.bgBlur(banner);
  banner.draggable = true;
  banner.draggable.horizontal = false;
  banner.draggable.constraints = {
    y: 0
  };
  banner.draggable.bounceOptions = {
    friction: 25,
    tension: 250
  };
  banner.on(Events.DragEnd, function() {
    if (banner.maxY < m.utils.px(68)) {
      banner.animate({
        properties: {
          maxY: 0
        },
        time: .15,
        curve: "ease-in-out"
      });
      return Utils.delay(.25, function() {
        return banner.destroy();
      });
    }
  });
  bannerBuffer = new Layer({
    maxY: 0,
    name: "buffer",
    backgroundColor: "#1B1B1C",
    opacity: .9,
    superLayer: banner,
    width: m.device.width,
    maxY: banner.y,
    height: m.device.height
  });
  m.utils.bgBlur(bannerBuffer);
  if (setup.animated === true) {
    banner.y = 0 - banner.height;
    banner.animate({
      properties: {
        y: 0
      },
      time: .25,
      curve: "spring(400,20,0)"
    });
  }
  if (setup.duration) {
    Utils.delay(setup.duration, function() {
      return banner.animate({
        properties: {
          maxY: 0
        },
        time: .25,
        curve: "ease-in-out"
      });
    });
    Utils.delay(setup.duration + .25, function() {
      return banner.destroy();
    });
  }
  banner.icon = setup.icon;
  banner.app = app;
  banner.title = title;
  banner.message = message;
  return banner;
};


},{"material-kit":"material-kit"}],"material-kit-bottom-nav":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  backgroundColor: "grey100",
  tabsColor: "grey900",
  tabs: void 0,
  tabIcons: void 0,
  labels: true,
  inactiveTabOpacity: .6
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var bottomNav, handleTabStates, i, icon, iconName, j, label, len, ref, setup, t, tab, view;
  setup = m.utils.setupComponent(array, exports.defaults);
  bottomNav = new Layer({
    name: "bottomNav",
    backgroundColor: m.color(setup.backgroundColor)
  });
  ({
    shadowColor: "rgba(0, 0, 0, .12)",
    shadowBlur: m.px(4),
    shadowY: -m.px(2)
  });
  bottomNav.constraints = {
    leading: 0,
    trailing: 0,
    bottom: 46,
    height: 56
  };
  m.layout.set(bottomNav);
  handleTabStates = function(bottomNav, layer) {
    var activeTabIndex, i, j, len, results, t, tab, tabsArray;
    tabsArray = Object.keys(bottomNav.tabs);
    activeTabIndex = void 0;
    results = [];
    for (i = j = 0, len = tabsArray.length; j < len; i = ++j) {
      t = tabsArray[i];
      tab = bottomNav.tabs[t];
      if (tab === bottomNav.activeTab) {
        activeTabIndex = i;
        tab.icon.opacity = 1;
        tab.icon.constraints.top = 6;
        tab.label.opacity = 1;
        tab.label.constraints.top = tab.icon;
        bottomNav.views[t].animate({
          properties: {
            x: 0
          },
          time: .25
        });
      } else {
        tab.icon.opacity = setup.inactiveTabOpacity;
        tab.icon.constraints.top = 16;
        tab.label.opacity = 0;
        tab.label.constraints.top = 21;
        if (activeTabIndex === void 0) {
          bottomNav.views[t].animate({
            properties: {
              x: m.device.width * -1
            },
            time: .25,
            curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
          });
        } else {
          bottomNav.views[t].animate({
            properties: {
              x: m.device.width
            },
            time: .25,
            curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
          });
        }
      }
      results.push(m.layout.animate({
        time: .1
      }));
    }
    return results;
  };
  bottomNav.tabs = {};
  bottomNav.views = {};
  if (setup.tabs.length < 6) {
    ref = setup.tabs;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      t = ref[i];
      view = new Layer({
        name: "View" + t,
        backgroundColor: "transparent"
      });
      view.constraints = {
        bottom: bottomNav,
        top: 0,
        width: m.dp(m.device.width)
      };
      view.sendToBack();
      bottomNav.views[t] = view;
      if (i > 0) {
        view.x = m.device.width;
      }
      tab = new Layer({
        width: m.device.width / setup.tabs.length,
        height: m.px(56),
        x: (m.device.width / setup.tabs.length) * i,
        superLayer: bottomNav,
        backgroundColor: "transparent",
        clip: true,
        name: "tab" + t
      });
      m.layout.set(tab);
      iconName = setup.tabIcons[i];
      icon = new m.Icon({
        name: iconName,
        superLayer: tab,
        color: setup.tabsColor,
        constraints: {
          top: 16
        }
      });
      icon.opacity = setup.inactiveTabOpacity;
      icon.centerX();
      label = new m.Text({
        name: t,
        superLayer: tab,
        text: t,
        fontSize: 14,
        color: setup.tabsColor,
        constraints: {
          top: 21
        }
      });
      label.opacity = 0;
      label.centerX();
      tab.icon = icon;
      tab.label = label;
      bottomNav.tabs[t] = tab;
      tab.on(Events.TouchEnd, function() {
        bottomNav.activeTab = this;
        return handleTabStates(bottomNav, this);
      });
    }
  }
  bottomNav.activeTab = bottomNav.tabs[setup.tabs[0]];
  handleTabStates(bottomNav, bottomNav.activeTab);
  return bottomNav;
};


},{"material-kit":"material-kit"}],"material-kit-button":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  text: "text",
  type: "flat",
  backgroundColor: "white",
  color: "teal300",
  name: "button",
  superLayer: void 0,
  constraints: void 0,
  icon: "star",
  clip: true,
  ink: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var button, icon, label, passedInk, pressedBGC, setup;
  setup = m.utils.setupComponent(array, exports.defaults);
  button = new Layer({
    name: setup.name,
    clip: setup.clip
  });
  if (setup.superLayer) {
    setup.superLayer.addSubLayer(button);
  }
  button.type = setup.type;
  switch (setup.type) {
    case "floating":
      button.constraints = {
        width: 56,
        height: 56,
        bottom: 64,
        trailing: 17
      };
      if (m.device.scale < 4) {
        button.constraints.width = 64;
        button.constraints.height = 64;
      }
      button.borderRadius = m.px(32);
      button.shadowColor = "rgba(0,0,0,.12)";
      button.shadowY = m.px(2);
      button.shadowBlur = m.px(6);
      button.backgroundColor = m.color(setup.backgroundColor);
      if (typeof setup.icon === "string") {
        icon = m.Icon({
          name: setup.icon,
          color: setup.color,
          superLayer: button,
          constraints: {
            align: "center"
          }
        });
      }
      m.layout.set({
        target: [button]
      });
      m.layout.set({
        target: [icon]
      });
      break;
    default:
      label = new m.Text({
        text: setup.text,
        superLayer: button,
        textTransform: "uppercase",
        color: setup.color,
        fontSize: 14,
        lineHeight: 14,
        fontWeight: 500
      });
      label.constraints = {
        align: "center"
      };
      button.props = {
        backgroundColor: m.color(setup.backgroundColor),
        height: m.px(36),
        width: label.width + m.px(16),
        borderRadius: m.px(2),
        clip: setup.clip
      };
      if (button.width < m.px(64)) {
        button.width = m.px(64);
      }
      switch (setup.type) {
        case "raised":
          button.origBGC = button.backgroundColor;
          button.shadowColor = "rgba(0,0,0,.24)";
          button.shadowY = m.px(2);
          button.shadowBlur = m.px(2);
          pressedBGC = button.backgroundColor.lighten(10);
          button.on(Events.TouchStart, function() {
            return button.animate({
              properties: {
                backgroundColor: pressedBGC,
                shadowY: m.px(8),
                shadowBlur: m.px(8)
              }
            });
          });
          button.on(Events.TouchEnd, function() {
            return button.animate({
              properties: {
                backgroundColor: button.origBGC,
                shadowY: m.px(2),
                shadowBlur: m.px(2)
              }
            });
          });
          break;
        case "flat":
          button.origBGC = button.backgroundColor;
          pressedBGC = button.backgroundColor.darken(5);
          button.on(Events.TouchStart, function() {
            return button.animate({
              properties: {
                backgroundColor: pressedBGC
              }
            });
          });
          button.on(Events.TouchEnd, function() {
            return button.animate({
              properties: {
                backgroundColor: button.origBGC
              }
            });
          });
      }
      if (setup.constraints) {
        button.constraints = setup.constraints;
      }
      m.layout.set({
        target: [button, label]
      });
  }
  if (setup.ink) {
    passedInk = setup.ink;
    passedInk.layer = button;
    m.utils.inky(passedInk);
  }
  button.label = label;
  return button;
};


},{"material-kit":"material-kit"}],"material-kit-cards2":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  title: void 0,
  headerSubtitle: void 0,
  bodyText: "Content",
  height: 300,
  cardHeaderbackgroundColor: 'red',
  type: "card",
  backgroundColor: "white",
  titleColor: "black",
  actionColor: "black",
  actions: void 0,
  footer: void 0,
  image: void 0,
  imageHeight: void 0,
  superLayer: void 0,
  borderRadius: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var act, actionsArray, bodyText, button, buttonArray, card, cardFooter, cardHeader, headerSubtitle, i, icon, j, k, l, len, len1, len2, ref, setup, thumbnail, title;
  setup = m.utils.setupComponent(array, exports.defaults);
  card = new Layer({
    name: "Card",
    backgroundColor: 'm.color(setup.backgroundColor)',
    shadowColor: "rgba(0, 0, 0, .12)",
    shadowBlur: m.px(4),
    shadowY: m.px(2),
    superLayer: setup.superLayer,
    borderRadius: setup.borderRadius
  });
  card.constraints = {
    leading: 16,
    trailing: 16,
    top: 0,
    height: setup.height
  };
  if (setup.title) {
    cardHeader = new Layer({
      name: "cardHeader",
      cardHeaderbackgroundColor: m.color(setup.cardHeaderbackgroundColor),
      superLayer: card,
      height: 300
    }, cardHeader.constraints = {
      width: 900
    }, m.layout.set(cardHeader));
    title = new m.Text({
      superLayer: cardHeader,
      text: setup.title,
      fontWeight: "semibold",
      fontSize: 14,
      name: "title",
      lineHeight: 20,
      constraints: {
        top: 24,
        width: 220,
        leading: 16
      }
    });
  }
  if (setup.headerSubtitle) {
    headerSubtitle = new m.Text({
      superLayer: cardHeader,
      text: setup.headerSubtitle,
      fontWeight: "semibold",
      fontSize: 14,
      name: "headerSubtitle",
      constraints: {
        top: 8,
        width: 220,
        leading: 16
      }
    });
    title.constraints = {
      top: 8
    };
  }
  actionsArray = [];
  if (setup.actions) {
    ref = setup.actions;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      act = ref[i];
      if (i === 0) {
        icon = new m.Icon({
          name: act,
          superLayer: card,
          constraints: {
            trailing: 16,
            top: 16
          },
          color: setup.actionColor,
          clip: false
        });
        actionsArray.push(icon);
      } else {
        icon = new m.Icon({
          name: act,
          superLayer: card,
          constraints: {
            trailing: [actionsArray[i - 1], 16],
            verticalCenter: title
          },
          color: setup.actionColor,
          clip: false
        });
        actionsArray.push(icon);
      }
    }
    for (k = 0, len1 = actionsArray.length; k < len1; k++) {
      act = actionsArray[k];
      m.utils.inky({
        layer: act,
        moveToTap: false,
        color: "white",
        opacity: .4,
        scale: .8,
        startScale: .7
      });
    }
  }
  if (setup.image) {
    thumbnail = new Layer({
      superLayer: card,
      image: setup.image,
      height: setup.imageHeight
    });
    thumbnail.constraints = {
      leading: 0,
      trailing: 0,
      top: [cardHeader, 0]
    };
    m.utils.inky({
      layer: thumbnail,
      moveToTap: true,
      color: "white",
      opacity: .4,
      scale: 2,
      startScale: .7
    });
    card.constraints["height"] = 20 + m.utils.pt(title.height) + 10 + m.utils.pt(thumbnail.height) + 24 + 44;
  }
  if (setup.bodyText && !setup.image) {
    bodyText = new m.Text({
      name: "content",
      superLayer: card,
      text: setup.bodyText
    });
    bodyText.constraints = {
      top: [title, 16],
      leading: 16,
      trailing: 16
    };
  }
  if (setup.bodyText && setup.image) {
    bodyText = new m.Text({
      name: "content",
      superLayer: card,
      text: setup.bodyText
    });
    bodyText.constraints = {
      top: [thumbnail, 16],
      leading: 16,
      trailing: 16
    };
  }
  buttonArray = [];
  if (setup.footer) {
    cardFooter = new Layer({
      name: "cardFooter",
      superLayer: card,
      backgroundColor: 'transparent'
    });
    cardFooter.constraints = {
      height: 56,
      bottom: 0,
      leading: 0,
      trailing: 0
    };
    setup.footer.forEach(function(item, i) {
      var button;
      if (i === 0) {
        button = new m.Button({
          name: item,
          type: "flat",
          superLayer: cardFooter,
          text: item,
          backgroundColor: "#3232",
          constraints: {
            bottom: 8,
            leading: 16
          }
        });
        return buttonArray.push(button);
      } else {
        button = new m.Button({
          name: item,
          type: "flat",
          superLayer: cardFooter,
          text: item,
          backgroundColor: "#3232",
          constraints: {
            bottom: 8,
            leading: [buttonArray[i - 1], 8]
          }
        });
        buttonArray.push(button);
        return m.layout.set();
      }
    });
    for (l = 0, len2 = buttonArray.length; l < len2; l++) {
      button = buttonArray[l];
      m.utils.inky({
        layer: button,
        moveToTap: false,
        color: "red",
        opacity: .4,
        scale: .8,
        startScale: .7
      });
      m.layout.set();
    }
  }
  m.layout.set();
  card.type = setup.type;
  m.utils.specialChar(title);
  return card;
};


},{"material-kit":"material-kit"}],"material-kit-cards":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  height: 300,
  type: "card",
  backgroundColor: "white",
  headerTitle: void 0,
  headerSubtitle: void 0,
  headerImage: void 0,
  headerImageRadius: 400,
  headerBackgroundColor: 'red',
  contentHeadline: void 0,
  contentText: void 0,
  titleColor: "black",
  actionColor: "black",
  actions: void 0,
  footer: void 0,
  image: void 0,
  imageHeight: void 0,
  superLayer: void 0,
  borderRadius: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var act, actionsArray, button, buttonArray, card, cardFooter, cardHeader, contentArea, contentHeadline, contentText, contentTextconstraints, headerImage, headerSubtitle, headerTitle, i, icon, j, k, l, len, len1, len2, ref, setup, thumbnail;
  setup = m.utils.setupComponent(array, exports.defaults);
  card = new Layer({
    name: "Card",
    backgroundColor: m.color(setup.backgroundColor),
    shadowColor: "rgba(0, 0, 0, .12)",
    shadowBlur: m.px(4),
    shadowY: m.px(2),
    superLayer: setup.superLayer,
    borderRadius: setup.borderRadius
  });
  card.constraints = {
    leading: 16,
    trailing: 16,
    top: 0,
    height: setup.height
  };
  if (setup.headerTitle) {
    cardHeader = new Layer({
      name: "cardHeader",
      backgroundColor: m.color(setup.headerBackgroundColor),
      superLayer: card,
      height: 128
    });
    cardHeader.constraints = {
      leading: 0,
      trailing: 0
    };
    headerTitle = new m.Text({
      superLayer: cardHeader,
      text: setup.headerTitle,
      fontWeight: "semibold",
      fontSize: 14,
      name: "headerTitle",
      lineHeight: 20,
      constraints: {
        top: 16,
        width: 220,
        leading: 16
      }
    });
    m.layout.set();
  }
  if (setup.headerSubtitle) {
    headerSubtitle = new m.Text({
      superLayer: cardHeader,
      text: setup.headerSubtitle,
      fontWeight: "semibold",
      fontSize: 14,
      name: "headerSubtitle",
      constraints: {
        top: [headerTitle, 4],
        width: 220,
        leading: 16
      }
    }, m.layout.set());
  }
  if (setup.headerImage) {
    headerImage = new Layer({
      superLayer: cardHeader,
      name: "headerImage",
      width: 80,
      height: 80,
      image: setup.headerImage,
      borderRadius: setup.headerImageRadius
    });
    headerImage.constraints = {
      top: 16,
      leading: 16
    };
    m.layout.set();
  }
  if (headerImage && setup.headertitle && setup.headerSubtitle) {
    headerTitle.constraints.leading = [headerImage, 16];
    headerSubtitle.constraints = {
      leading: 72
    };
    m.layout.set();
  }
  if (setup.contentHeadline || setup.contentText) {
    contentArea = new Layer({
      name: "contentArea",
      superLayer: card
    });
    contentArea.constraints = {
      leading: 0,
      trailing: 0,
      top: [cardHeader, 0]
    };
    m.layout.set();
  }
  if (setup.contentHeadline) {
    contentHeadline = new m.Text({
      name: "contentHeadline",
      superLayer: contentArea,
      text: setup.contentHeadline,
      fontWeight: 'Regular',
      fontSize: 24
    });
    contentHeadline.constraints = {
      top: 16,
      leading: 16,
      trailing: 16
    };
    m.layout.set();
  }
  if (setup.contentText) {
    contentText = new m.Text({
      name: "contentText",
      superLayer: contentArea,
      text: setup.contentText
    });
    contentTextconstraints = {
      top: 16,
      leading: 16,
      trailing: 16
    };
    m.layout.set();
  }
  if (setup.contentHeadline && setup.contentText) {
    contentHeadline.constraints = {
      top: 16,
      leading: 16,
      trailing: 162
    };
    contentText.constraints = {
      top: [contentHeadline, 8],
      leading: 16,
      trailing: 16
    };
    m.layout.set();
  }
  if (cardHeader) {
    contentArea.constraints = {
      top: [cardHeader, 0]
    };
    m.layout.set();
  }
  if (setup.image) {
    thumbnail = new Layer({
      superLayer: card,
      image: setup.image,
      height: setup.imageHeight
    });
    m.layout.set();
  }
  if (thumbnail && cardHeader) {
    contentArea.constraints = {
      top: [thumbnail, 0]
    };
    thumbnail.constraints = {
      top: [cardHeader, 0],
      leading: 0,
      trailing: 0
    };
    m.layout.set();
  }
  actionsArray = [];
  if (setup.actions) {
    ref = setup.actions;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      act = ref[i];
      if (i === 0) {
        icon = new m.Icon({
          name: act,
          superLayer: cardHeader,
          constraints: {
            trailing: 16,
            top: 16
          },
          color: setup.actionColor,
          clip: false
        });
        actionsArray.push(icon);
      } else {
        icon = new m.Icon({
          name: act,
          superLayer: cardHeader,
          constraints: {
            trailing: [actionsArray[i - 1], 16],
            top: 16
          },
          color: setup.actionColor,
          clip: false
        });
        actionsArray.push(icon);
      }
    }
    for (k = 0, len1 = actionsArray.length; k < len1; k++) {
      act = actionsArray[k];
      m.utils.inky({
        layer: act,
        moveToTap: false,
        color: "white",
        opacity: .4,
        scale: .8,
        startScale: .7
      });
    }
  }
  buttonArray = [];
  if (setup.footer) {
    cardFooter = new Layer({
      name: "cardFooter",
      superLayer: card,
      backgroundColor: 'transparent'
    });
    cardFooter.constraints = {
      height: 56,
      bottom: 0,
      leading: 0,
      trailing: 0
    };
    setup.footer.forEach(function(item, i) {
      var button;
      if (i === 0) {
        button = new m.Button({
          name: item,
          type: "flat",
          superLayer: cardFooter,
          text: item,
          backgroundColor: "#3232",
          constraints: {
            bottom: 8,
            leading: 16
          }
        });
        return buttonArray.push(button);
      } else {
        button = new m.Button({
          name: item,
          type: "flat",
          superLayer: cardFooter,
          text: item,
          backgroundColor: "#3232",
          constraints: {
            bottom: 8,
            leading: [buttonArray[i - 1], 8]
          }
        });
        buttonArray.push(button);
        return m.layout.set();
      }
    });
    for (l = 0, len2 = buttonArray.length; l < len2; l++) {
      button = buttonArray[l];
      m.utils.inky({
        layer: button,
        moveToTap: false,
        color: "red",
        opacity: .4,
        scale: .8,
        startScale: .7
      });
      m.layout.set();
    }
  }
  m.layout.set();
  card.type = setup.type;
  m.utils.specialChar(headerTitle);
  return card;
};


},{"material-kit":"material-kit"}],"material-kit-dialog":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  title: "Title",
  message: "Message",
  actions: ["Agree", "Decline"]
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var act, actions, button, charCount, dialog, i, index, j, k, largestButton, largestLabel, len, len1, len2, message, modal, overlay, ref, ref1, setup, title;
  setup = m.utils.setupComponent(array, exports.defaults);
  dialog = new Layer({
    backgroundColor: "transparent",
    name: "dialog"
  });
  dialog.constraints = {
    leading: 0,
    trailing: 0,
    top: 0,
    bottom: 0
  };
  overlay = new Layer({
    backgroundColor: "#5E5E5E",
    superLayer: dialog,
    name: "overlay",
    opacity: .6
  });
  overlay.constraints = {
    leading: 0,
    trailing: 0,
    top: 0,
    bottom: 0
  };
  modal = new Layer({
    backgroundColor: "white",
    superLayer: dialog,
    borderRadius: m.utils.px(2),
    name: "modal",
    shadowColor: "rgba(0,0,0,.2)",
    shadowY: 24,
    shadowBlur: 24,
    clip: true
  });
  modal.constraints = {
    align: "center",
    width: 280,
    height: 400
  };
  title = new m.Text({
    superLayer: modal,
    text: setup.title,
    fontWeight: "semibold",
    fontSize: 20,
    name: "title",
    lineHeight: 20,
    constraints: {
      top: 20,
      width: 220,
      leading: 24
    }
  });
  message = new m.Text({
    superLayer: modal,
    text: setup.message,
    fontSize: 13,
    name: "message",
    lineHeight: 16,
    constraints: {
      top: [title, 10],
      leading: 24,
      width: 220
    }
  });
  m.layout.set({
    target: [dialog, overlay, modal, title, message]
  });
  modal.constraints["height"] = 20 + m.utils.pt(title.height) + 10 + m.utils.pt(message.height) + 24 + 44;
  m.layout.set({
    target: [overlay, modal]
  });
  dialog.actions = {};
  actions = [];
  charCount = 0;
  if (setup.actions.length > 1) {
    charCount = setup.actions[0].length + setup.actions[1].length;
  }
  if (setup.actions.length < 3 && charCount < 24) {
    ref = setup.actions;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      act = ref[index];
      button = new m.Button({
        superLayer: modal,
        text: setup.actions[index],
        color: "blue"
      });
      if (index === 0) {
        button.constraints = {
          bottom: 8,
          trailing: 8
        };
      } else {
        button.constraints = {
          bottom: 8,
          trailing: [actions[index - 1], 8]
        };
      }
      dialog.actions[setup.actions[index]] = button;
      actions.push(button);
      m.layout.set({
        target: button
      });
    }
  } else {
    modal.constraints["height"] = 20 + m.utils.pt(title.height) + 10 + m.utils.pt(message.height) + 32 + (setup.actions.length * 36);
    m.layout.set({
      target: modal
    });
    largestLabel = 0;
    largestButton = 0;
    ref1 = setup.actions;
    for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
      act = ref1[index];
      button = new m.Button({
        superLayer: modal,
        text: setup.actions[index],
        color: "blue"
      });
      if (index === 0) {
        button.constraints = {
          top: [message, 24],
          trailing: 8
        };
      } else {
        button.constraints = {
          trailing: 8,
          top: actions[index - 1]
        };
      }
      dialog.actions[setup.actions[index]] = button;
      actions.push(button);
      m.layout.set({
        target: button
      });
      if (largestLabel < button.label.width) {
        largestLabel = button.label.width;
        largestButton = button.width;
      }
    }
    for (k = 0, len2 = actions.length; k < len2; k++) {
      act = actions[k];
      act.label.style.textAlign = "right";
      act.label.width = largestLabel;
      act.width = largestButton;
      m.layout.set({
        target: [act, act.label]
      });
    }
  }
  dialog.overlay = overlay;
  dialog.modal = modal;
  dialog.title = title;
  dialog.message = message;
  return dialog;
};


},{"material-kit":"material-kit"}],"material-kit-icon":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  name: "star",
  scale: m.device.scale,
  color: m.color("black"),
  superLayer: void 0,
  constraints: void 0,
  clip: true
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var frame, iconLayer, paddingRight, paddingTop, setup;
  setup = m.utils.setupComponent(array, exports.defaults);
  if (typeof setup.name === "string") {
    iconLayer = new Layer({
      html: "<i class='material-icons md-24'>" + setup.name + "</i>",
      color: m.color(setup.color),
      backgroundColor: "transparent",
      clip: setup.clip,
      name: setup.name,
      superLayer: setup.superLayer
    });
    paddingRight = 0;
    paddingTop = 0;
    switch (m.device.scale) {
      case 4:
        paddingTop = m.px(12) + "px";
        paddingRight = m.px(2) + "px";
        break;
      case 3:
        paddingTop = m.px(10) + "px";
        paddingRight = m.px(6) + "px";
        break;
      case 2:
        paddingTop = m.px(8) + "px";
        paddingRight = m.px(8) + "px";
        break;
      case 1:
        paddingTop = m.px(16) + "px";
        paddingRight = m.px(7) + "px";
    }
    frame = m.utils.textAutoSize(iconLayer);
    iconLayer.html = ("<span style='-webkit-transform: scale(" + setup.scale + "); position: absolute;'>") + iconLayer.html;
    iconLayer.width = m.px(24);
    iconLayer.height = m.px(frame.height);
    iconLayer.style = {
      "display": "inline-block",
      "padding-top": paddingTop,
      "padding-right": paddingRight,
      "text-align": "center"
    };
    if (setup.constraints) {
      iconLayer.constraints = setup.constraints;
      m.layout.set({
        target: iconLayer
      });
    }
    return iconLayer;
  } else {
    iconLayer = setup.layer;
    return iconLayer;
  }
};


},{"material-kit":"material-kit"}],"material-kit-layout":[function(require,module,exports){
var layout, m;

m = require('material-kit');

exports.defaults = {
  animations: {
    target: void 0,
    constraints: void 0,
    curve: "ease-in-out",
    curveOptions: void 0,
    time: 1,
    delay: 0,
    repeat: void 0,
    colorModel: void 0,
    stagger: void 0,
    fadeOut: false,
    fadeIn: false
  }
};

layout = function(array) {
  var blueprint, i, index, j, k, l, layer, len, len1, len2, newConstraint, props, ref, ref1, setup, targetLayers;
  setup = {};
  targetLayers = [];
  blueprint = [];
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  if (setup.target) {
    if (setup.target.length) {
      targetLayers = setup.target;
    } else {
      targetLayers.push(setup.target);
    }
  } else {
    targetLayers = Framer.CurrentContext.layers;
  }
  if (setup.target) {
    if (setup.constraints) {
      ref1 = Object.keys(setup.constraints);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        newConstraint = ref1[k];
        setup.target.constraints[newConstraint] = setup.constraints[newConstraint];
      }
    }
  }
  for (index = l = 0, len2 = targetLayers.length; l < len2; index = ++l) {
    layer = targetLayers[index];
    layer.calculatedPosition = {};
    if (layer.constraints) {
      props = {};
      layer.superFrame = {};
      if (layer.superLayer) {
        layer.superFrame.height = layer.superLayer.height;
        layer.superFrame.width = layer.superLayer.width;
      } else {
        layer.superFrame.height = m.device.height;
        layer.superFrame.width = m.device.width;
      }
      if (layer.constraints.leading !== void 0 && layer.constraints.trailing !== void 0) {
        layer.constraints.autoWidth = {};
      }
      if (layer.constraints.top !== void 0 && layer.constraints.bottom !== void 0) {
        layer.constraints.autoHeight = {};
      }
      if (layer.constraints.width !== void 0) {
        props.width = m.utils.px(layer.constraints.width);
      } else {
        props.width = layer.width;
      }
      if (layer.constraints.height !== void 0) {
        props.height = m.utils.px(layer.constraints.height);
      } else {
        props.height = layer.height;
      }
      if (layer.constraints.leadingEdges !== void 0) {
        if (layer.constraints.leadingEdges.calculatedPosition.x === void 0) {
          layer.constraints.leadingEdges.calculatedPosition.x = layer.constraints.leadingEdges.x;
        }
        props.x = layer.constraints.leadingEdges.calculatedPosition.x;
      }
      if (layer.constraints.trailingEdges !== void 0) {
        if (layer.constraints.trailingEdges.calculatedPosition.x === void 0) {
          layer.constraints.trailingEdges.calculatedPosition.x = layer.constraints.trailingEdges.x;
        }
        props.x = layer.constraints.trailingEdges.calculatedPosition.x - props.width + layer.constraints.trailingEdges.calculatedPosition.width;
      }
      if (layer.constraints.topEdges !== void 0) {
        if (layer.constraints.topEdges.calculatedPosition.y === void 0) {
          layer.constraints.topEdges.calculatedPosition.y = layer.constraints.topEdges.y;
        }
        props.y = layer.constraints.topEdges.calculatedPosition.y;
      }
      if (layer.constraints.bottomEdges !== void 0) {
        if (layer.constraints.bottomEdges.calculatedPosition.y === void 0) {
          layer.constraints.bottomEdges.calculatedPosition.y = layer.constraints.bottomEdges.y;
        }
        props.y = layer.constraints.bottomEdges.calculatedPosition.y - props.height + layer.constraints.bottomEdges.calculatedPosition.height;
      }
      if (layer.constraints.leading !== void 0) {
        if (layer.constraints.leading === parseInt(layer.constraints.leading, 10)) {
          props.x = m.utils.px(layer.constraints.leading);
        } else {
          if (layer.constraints.leading.length === void 0) {
            if (layer.constraints.leading.calculatedPosition.x === void 0) {
              layer.constraints.leading.calculatedPosition.x = layer.constraints.leading.x;
            }
            props.x = layer.constraints.leading.calculatedPosition.x + layer.constraints.leading.calculatedPosition.width;
          } else {
            if (layer.constraints.leading[0].calculatedPosition.x === void 0) {
              layer.constraints.leading[0].calculatedPosition.x = layer.constraints.leading[0].x;
            }
            props.x = layer.constraints.leading[0].calculatedPosition.x + layer.constraints.leading[0].calculatedPosition.width + m.utils.px(layer.constraints.leading[1]);
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.startX = props.x;
      }
      if (layer.constraints.trailing !== void 0) {
        if (layer.constraints.trailing === parseInt(layer.constraints.trailing, 10)) {
          props.x = layer.superFrame.width - m.utils.px(layer.constraints.trailing) - props.width;
        } else {
          if (layer.constraints.trailing.length === void 0) {
            if (layer.constraints.trailing.calculatedPosition.x === void 0) {
              layer.constraints.trailing.calculatedPosition.x = layer.constraints.trailing.x;
            }
            props.x = layer.constraints.trailing.calculatedPosition.x - props.width;
          } else {
            if (layer.constraints.trailing[0].calculatedPosition.x === void 0) {
              layer.constraints.trailing[0].calculatedPosition.x = layer.constraints.trailing[0].x;
            }
            props.x = layer.constraints.trailing[0].calculatedPosition.x - m.utils.px(layer.constraints.trailing[1]) - props.width;
          }
        }
      }
      if (layer.constraints.autoWidth !== void 0) {
        layer.constraints.autoWidth.calculatedPositionX = props.x;
        props.x = layer.constraints.autoWidth.startX;
        props.width = layer.constraints.autoWidth.calculatedPositionX - layer.constraints.autoWidth.startX + props.width;
      }
      if (layer.constraints.top !== void 0) {
        if (layer.constraints.top === parseInt(layer.constraints.top, 10)) {
          props.y = m.utils.px(layer.constraints.top);
        } else {
          if (layer.constraints.top.length === void 0) {
            if (layer.constraints.top.calculatedPosition.y === void 0) {
              layer.constraints.top.calculatedPosition.y = layer.constraints.top.y;
            }
            props.y = layer.constraints.top.calculatedPosition.y + layer.constraints.top.calculatedPosition.height;
          } else {
            if (layer.constraints.top[0].calculatedPosition.y === void 0) {
              layer.constraints.top[0].calculatedPosition.y = layer.constraints.top[0].y;
            }
            props.y = layer.constraints.top[0].calculatedPosition.y + layer.constraints.top[0].calculatedPosition.height + m.utils.px(layer.constraints.top[1]);
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.startY = props.y;
      }
      if (layer.constraints.bottom !== void 0) {
        if (layer.constraints.bottom === parseInt(layer.constraints.bottom, 10)) {
          props.y = layer.superFrame.height - m.utils.px(layer.constraints.bottom) - props.height;
        } else {
          if (layer.constraints.bottom.length === void 0) {
            if (layer.constraints.bottom.calculatedPosition.y === void 0) {
              layer.constraints.bottom.calculatedPosition.y = layer.constraints.bottom.y;
            }
            props.y = layer.constraints.bottom.calculatedPosition.y - props.height;
          } else {
            if (layer.constraints.bottom[0].calculatedPosition.y === void 0) {
              layer.constraints.bottom[0].calculatedPosition.y = layer.constraints.bottom[0].y;
            }
            props.y = layer.constraints.bottom[0].calculatedPosition.y - m.utils.px(layer.constraints.bottom[1]) - props.height;
          }
        }
      }
      if (layer.constraints.autoHeight !== void 0) {
        layer.constraints.autoHeight.calculatedPositionY = props.y;
        props.height = layer.constraints.autoHeight.calculatedPositionY - layer.constraints.autoHeight.startY + props.height;
        props.y = layer.constraints.autoHeight.startY;
      }
      if (layer.constraints.align !== void 0) {
        if (layer.constraints.align === "horizontal") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
        }
        if (layer.constraints.align === "vertical") {
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
        if (layer.constraints.align === "center") {
          props.x = layer.superFrame.width / 2 - props.width / 2;
          props.y = layer.superFrame.height / 2 - props.height / 2;
        }
      }
      if (layer.constraints.horizontalCenter !== void 0) {
        props.x = layer.constraints.horizontalCenter.calculatedPosition.x + (layer.constraints.horizontalCenter.calculatedPosition.width - props.width) / 2;
      }
      if (layer.constraints.verticalCenter !== void 0) {
        props.y = layer.constraints.verticalCenter.calculatedPosition.y + (layer.constraints.verticalCenter.calculatedPosition.height - props.height) / 2;
      }
      if (layer.constraints.center !== void 0) {
        props.x = layer.constraints.center.calculatedPosition.x + (layer.constraints.center.calculatedPosition.width - props.width) / 2;
        props.y = layer.constraints.center.calculatedPosition.y + (layer.constraints.center.calculatedPosition.height - props.height) / 2;
      }
      layer.calculatedPosition = props;
    } else {
      layer.calculatedPosition = layer.props;
    }
    blueprint.push(layer);
  }
  return blueprint;
};

exports.set = function(array) {
  var blueprint, i, index, j, k, key, layer, len, len1, props, ref, results, setup;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    results.push((function() {
      var l, len2, ref1, results1;
      ref1 = Object.keys(layer.calculatedPosition);
      results1 = [];
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        key = ref1[l];
        results1.push(layer[key] = layer.calculatedPosition[key]);
      }
      return results1;
    })());
  }
  return results;
};

exports.animate = function(array) {
  var blueprint, delay, i, index, j, k, layer, len, len1, props, ref, results, setup, stag;
  setup = {};
  props = {};
  if (array) {
    ref = Object.keys(exports.defaults.animations);
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      if (array[i]) {
        setup[i] = array[i];
      } else {
        setup[i] = exports.defaults.animations[i];
      }
    }
  }
  blueprint = layout(array);
  results = [];
  for (index = k = 0, len1 = blueprint.length; k < len1; index = ++k) {
    layer = blueprint[index];
    delay = setup.delay;
    if (setup.stagger) {
      stag = setup.stagger;
      delay = (index * stag) + delay;
    }
    if (setup.fadeOut) {
      if (layer === setup.fadeOut) {
        layer.calculatedPosition.opacity = 0;
      }
    }
    if (setup.fadeIn) {
      layer.calculatedPosition.opacity = 1;
    }
    layer.animate({
      properties: layer.calculatedPosition,
      time: setup.time,
      delay: delay,
      curve: setup.curve,
      repeat: setup.repeat,
      colorModel: setup.colorModel,
      curveOptions: setup.curveOptions
    });
    results.push(layer.calculatedPosition = props);
  }
  return results;
};


},{"material-kit":"material-kit"}],"material-kit-library":[function(require,module,exports){
var layer, m;

m = require("material-kit");

layer = new Layer;

exports.layerProps = Object.keys(layer.props);

exports.layerProps.push("superLayer");

exports.layerProps.push("constraints");

exports.layerStyles = Object.keys(layer.style);

layer.destroy();

exports.assets = {
  home: "<svg width='16px' height='16px' viewBox='172 16 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <ellipse id='path-1' cx='180' cy='24' rx='8' ry='8'></ellipse> <mask id='mask-2' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='16' height='16' fill='white'> <use xlink:href='#path-1'></use> </mask> </defs> <use id='home' stroke='#FFFFFF' mask='url(#mask-2)' stroke-width='4' fill='none' xlink:href='#path-1'></use> </svg>",
  back: "<svg width='16px' height='19px' viewBox='301 14 16 19' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <path d='M307.029383,17.7671733 C307.580027,16.8035453 308.510292,16.7750713 309.112023,17.7110976 L315.940802,28.3336435 C316.540368,29.2663017 316.136354,30.0223706 315.026306,30.0223706 L302.026519,30.0223706 C300.921891,30.0223706 300.467923,29.249728 301.023443,28.2775679 L307.029383,17.7671733 Z' id='Triangle-1' stroke='#FFFFFF' stroke-width='2' fill='none' transform='translate(308.502021, 23.524391) rotate(-90.000000) translate(-308.502021, -23.524391) '></path> </svg>",
  cellular: "<svg width='16px' height='16px' viewBox='35 4 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <g id='cellular' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(35.000000, 4.000000)'> <polygon id='bounds' points='0 0 16 0 16 16 0 16'></polygon> <polygon id='Shape' fill='#000000' points='0 15 14 15 14 1'></polygon> </g> </svg>",
  batteryHigh: "<svg width='9px' height='14px' viewBox='3 1 9 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <polygon id='Shape' stroke='none' fill='#000000' fill-rule='evenodd' points='9 1.875 9 1 6 1 6 1.875 3 1.875 3 15 12 15 12 1.875'></polygon> </svg>",
  bannerBG: {
    "iphone-5": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='320px' height='68px' viewBox='0 0 320 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>iphone5</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPhone-5/5S/5C' fill='#1A1A1C'> <path d='M0,0 L320,0 L320,68 L0,68 L0,0 Z M142,61.0048815 C142,59.897616 142.896279,59 144.0024,59 L176.9976,59 C178.103495,59 179,59.8938998 179,61.0048815 L179,61.9951185 C179,63.102384 178.103721,64 176.9976,64 L144.0024,64 C142.896505,64 142,63.1061002 142,61.9951185 L142,61.0048815 Z' id='iphone5'></path> </g> </g> </svg>",
    "iphone-6s": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='375px' height='68px' viewBox='0 0 375 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-58.000000, -23.000000)' fill='#1A1A1C'> <g transform='translate(58.000000, 7.000000)' id='Notification-container'> <g> <path d='M0,16 L375,16 L375,84 L0,84 L0,16 Z M169,77.0048815 C169,75.897616 169.896279,75 171.0024,75 L203.9976,75 C205.103495,75 206,75.8938998 206,77.0048815 L206,77.9951185 C206,79.102384 205.103721,80 203.9976,80 L171.0024,80 C169.896505,80 169,79.1061002 169,77.9951185 L169,77.0048815 Z' id='Notification-background'></path> </g> </g> </g> </g> </svg>",
    "iphone-6s-plus": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='414px' height='68px' viewBox='0 0 414 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6 (26304) - http://www.bohemiancoding.com/sketch --> <title>Notification background Copy</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iOS8-Push-Notification' transform='translate(-43.000000, -74.000000)' fill='#1A1A1C'> <g transform='translate(43.000000, 74.000000)' id='Notification-container'> <g> <path d='M0,0 L414,0 L414,68 L0,68 L0,0 Z M189,61.0048815 C189,59.897616 189.896279,59 191.0024,59 L223.9976,59 C225.103495,59 226,59.8938998 226,61.0048815 L226,61.9951185 C226,63.102384 225.103721,64 223.9976,64 L191.0024,64 C189.896505,64 189,63.1061002 189,61.9951185 L189,61.0048815 Z' id='Notification-background-Copy'></path> </g> </g> </g> </g> </svg>",
    "ipad": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='768px' height='68px' viewBox='0 0 768 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Portrait' fill='#1A1A1C'> <path d='M0,0 L768,0 L768,68 L0,68 L0,0 Z M366,61.0048815 C366,59.897616 366.896279,59 368.0024,59 L400.9976,59 C402.103495,59 403,59.8938998 403,61.0048815 L403,61.9951185 C403,63.102384 402.103721,64 400.9976,64 L368.0024,64 C366.896505,64 366,63.1061002 366,61.9951185 L366,61.0048815 Z' id='ipad-portrait'></path> </g> </g> </svg>",
    "ipad-pro": "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='1024px' height='68px' viewBox='0 0 1024 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>ipad-pro-portrait</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0.9'> <g id='iPad-Pro-Portrait' fill='#1A1A1C'> <path d='M0,0 L1024,0 L1024,68 L0,68 L0,0 Z M494,61.0048815 C494,59.897616 494.896279,59 496.0024,59 L528.9976,59 C530.103495,59 531,59.8938998 531,61.0048815 L531,61.9951185 C531,63.102384 530.103721,64 528.9976,64 L496.0024,64 C494.896505,64 494,63.1061002 494,61.9951185 L494,61.0048815 Z' id='ipad-pro-portrait'></path> </g> </g> </svg>"
  },
  wifi: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='18px' height='14px' viewBox='0 0 18 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <title>Shape</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Material-Design-Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Material/Android/Status-bar-content-light' transform='translate(-15.000000, -5.000000)' fill='#000000'> <g id='wifi' transform='translate(14.000000, 4.000000)'> <path d='M19.0226279,4.01593123 C16.5117809,2.12256382 13.3869849,1 10,1 C6.61301513,1 3.48821908,2.12256382 0.977372085,4.01593123 L10,15 L19.0226279,4.01593123 Z' id='Shape'></path> </g> </g> </g> </svg>",
  signalHigh: "<svg width='14px' height='14px' viewBox='0 1 14 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs></defs> <polygon id='Shape' stroke='none' fill='#FFFFFF' fill-rule='evenodd' points='0 15 14 15 14 1'></polygon> </svg>",
  activity: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Soccer Ball</title> <desc>Created with Sketch.</desc> <defs> <circle id='path-1' cx='8' cy='8' r='8'></circle> </defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-179.000000, -639.000000)'> <g id='Soccer-Ball' sketch:type='MSLayerGroup' transform='translate(179.000000, 639.000000)'> <mask id='mask-2' sketch:name='Mask' fill='white'> <use xlink:href='#path-1'></use> </mask> <use id='Mask' stroke='#4A5361' sketch:type='MSShapeGroup' xlink:href='#path-1'></use> <path d='M6,12.1203046 L12.8573384,8 L13.3723765,8.8571673 L6.51503807,12.9774719 L6,12.1203046 L6,12.1203046 Z' id='Rectangle-47' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.849648,8.7260551 L19.1001103,5.34510901 L19.5227285,6.2514168 L12.2722662,9.63236289 L11.849648,8.7260551 L11.849648,8.7260551 Z' id='Rectangle-47-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M6,3.1203046 L12.8573384,-1 L13.3723765,-0.142832699 L6.51503807,3.9774719 L6,3.1203046 L6,3.1203046 Z' id='Rectangle-47-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M-1,7.1203046 L5.85733841,3 L6.37237648,3.8571673 L-0.484961925,7.9774719 L-1,7.1203046 L-1,7.1203046 Z' id='Rectangle-47-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <rect id='Rectangle-50' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='4' y='6' width='1' height='5'></rect> <rect id='Rectangle-51' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)' x='11.5' y='3' width='1' height='12'></rect> <path d='M5,4.8571673 L11.8573384,8.9774719 L12.3723765,8.1203046 L5.51503807,4 L5,4.8571673' id='Rectangle-47-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M5,12.8571673 L11.8573384,16.9774719 L12.3723765,16.1203046 L5.51503807,12 L5,12.8571673' id='Rectangle-47-Copy-5' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1' fill='#D8D8D8' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M11.9048972,6.14766064 L13.8714227,8.33170849 L12.4019596,10.8768933 L9.52725589,10.2658562 L9.22005445,7.34302965 L11.9048972,6.14766064' id='Polygon-1-Copy' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,3.19504739 L7.35514484,6.13218333 L4.5300676,6.9422612 L2.88664089,4.5057809 L4.69602457,2.18987541 L7.45771189,3.19504739' id='Polygon-1-Copy-2' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M7.45771189,11.1950474 L7.35514484,14.1321833 L4.5300676,14.9422612 L2.88664089,12.5057809 L4.69602457,10.1898754 L7.45771189,11.1950474' id='Polygon-1-Copy-3' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> <path d='M14.5431701,0.0725939314 L14.4406031,3.00972988 L11.6155258,3.81980774 L9.97209912,1.38332745 L11.7814828,-0.93257805 L14.5431701,0.0725939314' id='Polygon-1-Copy-4' fill='#4A5361' sketch:type='MSShapeGroup' mask='url(#mask-2)'></path> </g> </g> </g> </svg>",
  animals: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Group</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-117.000000, -639.000000)' stroke='#4A5361'> <g id='ic_Food' sketch:type='MSLayerGroup' transform='translate(118.000000, 640.000000)'> <g id='Group' sketch:type='MSShapeGroup'> <path d='M5.68377537,1.38156646 C6.23926066,1.13624 6.85372005,1 7.5,1 C8.14627995,1 8.76073934,1.13624 9.31622463,1.38156646 C9.80879275,0.562359019 10.8255888,0 12,0 C13.6568542,0 15,1.11928813 15,2.5 C15,3.5571398 14.2126246,4.46102843 13.0999226,4.82662514 C14.2496528,5.64185422 15,6.98330062 15,8.5 C15,10.7167144 13.3971873,12.5590719 11.2872671,12.9313673 C10.4867248,14.1757703 9.08961696,15 7.5,15 C5.91038304,15 4.51327524,14.1757703 3.71273291,12.9313673 C1.60281268,12.5590719 0,10.7167144 0,8.5 C0,6.98330062 0.750347244,5.64185422 1.90007741,4.82662514 C0.787375445,4.46102843 0,3.5571398 0,2.5 C0,1.11928813 1.34314575,0 3,0 C4.17441122,0 5.19120725,0.562359019 5.68377537,1.38156646 Z' id='Oval-8'></path> <path d='M5.73834228,12 C5.86290979,12 6.14642353,12 6.14642353,12 C6.14642353,12 6.43215696,12.4426123 6.5246582,12.4919739 C6.66455601,12.5666277 7,12.4919739 7,12.4919739 L7,12 L8,12 L8,12.4919739 L8.49799228,12.4919739 L8.84301769,12 L9.3918457,12 C9.3918457,12 8.99598457,12.9839478 8.49799228,12.9839478 L6.60702407,12.9839478 C6.21404813,12.9839478 5.45996094,12 5.73834228,12 Z' id='Rectangle-44-Copy-2'></path> <circle id='Oval-14' cx='10.5' cy='7.5' r='0.5'></circle> <circle id='Oval-14-Copy' cx='4.5' cy='7.5' r='0.5'></circle> <path d='M12.6999969,5 C12.6999969,3.06700338 11.1329936,1.5 9.19999695,1.5' id='Oval-16'></path> <path d='M5.5,5 C5.5,3.06700338 3.93299662,1.5 2,1.5' id='Oval-16-Copy' transform='translate(3.750000, 3.250000) scale(-1, 1) translate(-3.750000, -3.250000) '></path> <rect id='Rectangle-44-Copy' x='7' y='11' width='1' height='1'></rect> <path d='M6,10 L6.5,10 L6.49999999,9.5 L8.50000005,9.5 L8.50000005,10 L9,10 L9,10.5 L8.5,10.5 L8.5,11 L6.5,11 L6.5,10.5 L6,10.5 L6,10 Z' id='Path'></path> </g> </g> </g> </g> </svg>",
  chevron: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='13px' height='22px' viewBox='0 0 13 22' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Back Chevron</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='Navigation-Bar/Back' transform='translate(-8.000000, -31.000000)' fill='#0076FF'> <path d='M8.5,42 L19,31.5 L21,33.5 L12.5,42 L21,50.5 L19,52.5 L8.5,42 Z' id='Back-Chevron'></path> </g> </g> </svg>",
  emoji: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='20px' viewBox='0 0 20 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Emoji</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-60.000000, -181.000000)' fill='#030303'> <g id='Bottom-Row' transform='translate(3.000000, 170.000000)' sketch:type='MSShapeGroup'> <path d='M66.75,30.5 C72.1347763,30.5 76.5,26.1347763 76.5,20.75 C76.5,15.3652237 72.1347763,11 66.75,11 C61.3652237,11 57,15.3652237 57,20.75 C57,26.1347763 61.3652237,30.5 66.75,30.5 Z M66.75,29.5 C71.5824916,29.5 75.5,25.5824916 75.5,20.75 C75.5,15.9175084 71.5824916,12 66.75,12 C61.9175084,12 58,15.9175084 58,20.75 C58,25.5824916 61.9175084,29.5 66.75,29.5 Z M63.75,19 C64.4403559,19 65,18.4403559 65,17.75 C65,17.0596441 64.4403559,16.5 63.75,16.5 C63.0596441,16.5 62.5,17.0596441 62.5,17.75 C62.5,18.4403559 63.0596441,19 63.75,19 Z M69.75,19 C70.4403559,19 71,18.4403559 71,17.75 C71,17.0596441 70.4403559,16.5 69.75,16.5 C69.0596441,16.5 68.5,17.0596441 68.5,17.75 C68.5,18.4403559 69.0596441,19 69.75,19 Z M59.8876334,22.1641444 C59.6390316,21.383134 60.065918,20.9785156 60.8530951,21.2329304 C60.8530951,21.2329304 63.0937503,22.2125 66.7500001,22.2125 C70.4062499,22.2125 72.6469047,21.2329304 72.6469047,21.2329304 C73.4287162,20.9662153 73.8812463,21.4044097 73.6058477,22.1807437 C73.6058477,22.1807437 72.6,27.575 66.75,27.575 C60.9,27.575 59.8876334,22.1641444 59.8876334,22.1641444 Z M66.75,23.1875 C64.06875,23.1875 61.8544055,22.4737821 61.8544055,22.4737821 C61.3273019,22.32948 61.1781233,22.5721615 61.5639555,22.957075 C61.5639555,22.957075 62.3625,24.65 66.75,24.65 C71.1375,24.65 71.9508503,22.9438304 71.9508503,22.9438304 C72.3093659,22.5399278 72.1690793,22.3359844 71.6354273,22.476349 C71.6354273,22.476349 69.43125,23.1875 66.75,23.1875 Z' id='Emoji'></path> </g> </g> </g> </svg>",
  "delete": {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z' id='Back'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='24px' height='18px' viewBox='0 0 24 18' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Back</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-339.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M337.059345,22.0593445 C336.474285,21.4742847 336.481351,20.5186489 337.059345,19.9406555 L343.789915,13.2100853 C344.182084,12.817916 344.94892,12.5 345.507484,12.5 L356.002098,12.5 C357.933936,12.5 359.5,14.0688477 359.5,16.0017983 L359.5,25.9982017 C359.5,27.9321915 357.923088,29.5 356.002098,29.5 L345.507484,29.5 C344.951066,29.5 344.177169,29.1771693 343.789915,28.7899148 L337.059345,22.0593445 Z M351.642663,20.9776903 L354.466795,18.1535585 C354.760106,17.8602476 354.763983,17.3814962 354.47109,17.088603 C354.176155,16.7936677 353.7014,16.7976328 353.406135,17.0928983 L350.582003,19.9170301 L347.757871,17.0928983 C347.46456,16.7995874 346.985809,16.7957097 346.692916,17.088603 C346.39798,17.3835382 346.401945,17.858293 346.697211,18.1535585 L349.521343,20.9776903 L346.697211,23.801822 C346.4039,24.0951329 346.400022,24.5738843 346.692916,24.8667776 C346.987851,25.1617128 347.462606,25.1577477 347.757871,24.8624822 L350.582003,22.0383504 L353.406135,24.8624822 C353.699445,25.1557931 354.178197,25.1596708 354.47109,24.8667776 C354.766025,24.5718423 354.76206,24.0970875 354.466795,23.801822 L351.642663,20.9776903 Z M338.70972,21.7097195 C338.317752,21.3177522 338.318965,20.6810349 338.70972,20.2902805 L344.643245,14.3567547 C344.840276,14.1597245 345.225639,14 345.493741,14 L355.997239,14 C357.103333,14 357.999999,14.8970601 357.999999,16.0058586 L357.999999,25.9941412 C357.999999,27.1019464 357.106457,27.9999999 355.997239,27.9999999 L345.493741,28 C345.221056,28 344.840643,27.8406431 344.643246,27.6432453 L338.70972,21.7097195 Z' id='Back'></path> </g> </g> </g> </svg>"
  },
  food: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Food</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-148.000000, -637.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Food' transform='translate(149.500000, 229.500000)' sketch:type='MSShapeGroup'> <path d='M5.5,15.5 L1,15.5 L0,5 L6.5,5 L6.26360933,7.48210202' id='Drink' stroke='#4A5461'></path> <path d='M6.01077545,1.96930098 L6.51571352,5.22270539 L5.71908184,5.67947812 L5.0389009,1.96930098 L4.85557247,1.96930098 L4.85557247,0.96930098 L8.85557247,0.96930098 L8.85557247,1.96930098 L6.01077545,1.96930098 Z' id='Straw' fill='#4A5461' transform='translate(6.855572, 3.324390) rotate(24.000000) translate(-6.855572, -3.324390) '></path> <rect id='Bottom-Bun' stroke='#4A5461' x='3' y='14' width='10.5' height='1.5' rx='1'></rect> <path d='M1.5,12.5024408 C1.5,11.948808 1.94916916,11.5 2.49268723,11.5 L14.0073128,11.5 C14.5555588,11.5 15,11.9469499 15,12.5024408 L15,12.9975592 C15,13.551192 14.5508308,14 14.0073128,14 L2.49268723,14 C1.94444121,14 1.5,13.5530501 1.5,12.9975592 L1.5,12.5024408 Z M3.93300003,11.8392727 C3.41771834,11.6518976 3.44483697,11.5 3.9955775,11.5 L13.0044225,11.5 C13.5542648,11.5 13.5866061,11.6503251 13.067,11.8392727 L8.5,13.5 L3.93300003,11.8392727 Z' id='&quot;Patty&quot;' fill='#4A5461'></path> <path d='M2.5,10.5 L13.5,10.5 L15,11.5 L1,11.5 L2.5,10.5 Z' id='Cheese' fill='#4A5461'></path> <path d='M8.25,10.5 C11.4256373,10.5 14,10.3284271 14,9.5 C14,8.67157288 11.4256373,8 8.25,8 C5.07436269,8 2.5,8.67157288 2.5,9.5 C2.5,10.3284271 5.07436269,10.5 8.25,10.5 Z' id='Top-Bun' stroke='#4A5461' stroke-width='0.75'></path> </g> </g> </g> </g> </svg>",
  flags: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='15px' viewBox='0 0 11 15' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Flag</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-275.000000, -639.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Flag' transform='translate(275.000000, 231.500000)' sketch:type='MSShapeGroup'> <rect id='Pole' fill='#4A5461' x='0' y='0' width='1' height='14'></rect> <path d='M1,1 C1,1 1.25,2 3.5,2 C5.75,2 6,0.749999998 8,0.75 C10,0.749999998 10,1.5 10,1.5 L10,7.5 C10,7.5 10,6.5 8,6.5 C6,6.5 4.80623911,8 3.5,8 C2.19376089,8 1,7 1,7 L1,1 Z' stroke='#4A5461' stroke-linejoin='round'></path> </g> </g> </g> </g> </svg>",
  frequent: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Recent</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-55.000000, -638.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Recent' transform='translate(55.500000, 230.000000)' sketch:type='MSShapeGroup'> <circle id='Body' stroke='#4A5461' cx='8' cy='8' r='8'></circle> <path d='M7.5,7.5 L7.5,8.5 L8.5,8.5 L8.5,2 L7.5,2 L7.5,7.5 L4,7.5 L4,8.5 L8.5,8.5 L8.5,7.5 L7.5,7.5 Z' id='Hands' fill='#4A5461'></path> </g> </g> </g> </g> </svg>",
  keyboard: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='32.5px' height='23.5px' viewBox='0 0 65 47' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.6.1 (26313) - http://www.bohemiancoding.com/sketch --> <title>Shape</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'> <g id='iPad-Portrait' transform='translate(-1436.000000, -1956.000000)' fill='#000000'> <g id='Keyboard-Light' transform='translate(0.000000, 1422.000000)'> <g id='Keyboard-down' transform='translate(1412.000000, 500.000000)'> <path d='M87.001332,34 C88.1051659,34 89,34.8997127 89,35.9932874 L89,61.0067126 C89,62.1075748 88.1058759,63 87.001332,63 L25.998668,63 C24.8948341,63 24,62.1002873 24,61.0067126 L24,35.9932874 C24,34.8924252 24.8941241,34 25.998668,34 L87.001332,34 Z M26,36 L26,61 L87,61 L87,36 L26,36 Z M79,40 L83,40 L83,44 L79,44 L79,40 Z M72,40 L76,40 L76,44 L72,44 L72,40 Z M65,40 L69,40 L69,44 L65,44 L65,40 Z M58,40 L62,40 L62,44 L58,44 L58,40 Z M51,40 L55,40 L55,44 L51,44 L51,40 Z M44,40 L48,40 L48,44 L44,44 L44,40 Z M37,40 L41,40 L41,44 L37,44 L37,40 Z M30,40 L34,40 L34,44 L30,44 L30,40 Z M79,47 L83,47 L83,51 L79,51 L79,47 Z M72,47 L76,47 L76,51 L72,51 L72,47 Z M65,47 L69,47 L69,51 L65,51 L65,47 Z M58,47 L62,47 L62,51 L58,51 L58,47 Z M51,47 L55,47 L55,51 L51,51 L51,47 Z M44,47 L48,47 L48,51 L44,51 L44,47 Z M37,47 L41,47 L41,51 L37,51 L37,47 Z M30,47 L34,47 L34,51 L30,51 L30,47 Z M79,54 L83,54 L83,58 L79,58 L79,54 Z M72,54 L76,54 L76,58 L72,58 L72,54 Z M44,54 L69,54 L69,58 L44,58 L44,54 Z M37,54 L41,54 L41,58 L37,58 L37,54 Z M30,54 L34,54 L34,58 L30,58 L30,54 Z M44.3163498,69.9771047 C43.3684225,70.5420342 43.3338721,71.5096495 44.2378217,72.1373912 L55.3621539,79.8626088 C56.2667113,80.4907726 57.7338965,80.4903505 58.6378461,79.8626088 L69.7621783,72.1373912 C70.6667357,71.5092274 70.648012,70.5205204 69.7115187,69.9234166 L69.9825731,70.0962396 C69.5181333,69.800115 68.7782557,69.8126493 68.3261307,70.1269323 L57.8154999,77.4331263 C57.3651117,77.746202 56.628165,77.7381786 56.1762103,77.4199424 L45.8386137,70.1408977 C45.3836472,69.8205407 44.6375039,69.7857088 44.1566393,70.0722862 L44.3163498,69.9771047 Z' id='Shape'></path> </g> </g> </g> </g> </svg>",
  keyPopUp: {
    "iphone-5": "<svg width='55px' height='92px' viewBox='53 316 55 92' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.34173231,40.9391701 C0.517466128,40.20589 0,39.1374251 0,37.9477635 L0,4.00345598 C0,1.78917136 1.79528248,0 4.00987566,0 L44.9901243,0 C47.2125608,0 49,1.7924083 49,4.00345598 L49,37.9477635 C49,38.9124051 48.6592798,39.7963659 48.0916041,40.4868665 C48.0414233,40.9032289 47.7111888,41.4074672 47.0825908,41.95225 C47.0825908,41.95225 38.5299145,49.0643362 38.5299145,51.1526424 C38.5299145,61.6497561 38.1770099,82.0025406 38.1770099,82.0025406 C38.1412304,84.2024354 36.3210284,86 34.1128495,86 L15.3059539,86 C13.10796,86 11.2781884,84.2100789 11.2417936,82.0020993 C11.2417936,82.0020993 10.8888889,61.6470852 10.8888889,51.1486361 C10.8888889,49.0616654 2.34143662,42.238655 2.34143662,42.238655 C1.77827311,41.7641365 1.44881354,41.3204237 1.34173231,40.9391701 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='49' height='86' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(56.000000, 318.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
    "iphone-6s": "<svg width='64px' height='107px' viewBox='24 387 64 107' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.48647646,48.3779947 C0.58026649,47.6464296 0,46.529587 0,45.2781948 L0,3.99009787 C0,1.7825912 1.79509577,0 4.00945862,0 L53.9905414,0 C56.2005746,0 58,1.78642767 58,3.99009787 L58,45.2781948 C58,46.1833004 57.6982258,47.0169733 57.1895097,47.6856325 C57.0396865,48.0212497 56.7360098,48.3972834 56.2718363,48.7950661 C56.2718363,48.7950661 45.6068376,57.6220693 45.6068376,60.0746149 C45.6068376,72.4026205 45.177967,96.9923164 45.177967,96.9923164 C45.1413748,99.2122214 43.3193065,101 41.1090035,101 L17.386723,101 C15.1812722,101 13.354683,99.2055009 13.3177595,96.9918741 C13.3177595,96.9918741 12.8888889,72.3994838 12.8888889,60.0699099 C12.8888889,57.6189326 2.22673437,49.1462936 2.22673437,49.1462936 C1.90524087,48.8788327 1.65911655,48.620733 1.48647646,48.3779947 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='58' height='101' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(27.000000, 389.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>",
    "iphone-6s-plus": "<svg width='70px' height='119px' viewBox='28 450 70 119' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch --> <desc>Created with Sketch.</desc> <defs> <filter x='-50%' y='-50%' width='200%' height='200%' filterUnits='objectBoundingBox' id='filter-1'> <feOffset dx='0' dy='1' in='SourceAlpha' result='shadowOffsetOuter1'></feOffset> <feGaussianBlur stdDeviation='1.5' in='shadowOffsetOuter1' result='shadowBlurOuter1'></feGaussianBlur> <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.4 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1'></feColorMatrix> <feMerge> <feMergeNode in='shadowMatrixOuter1'></feMergeNode> <feMergeNode in='SourceGraphic'></feMergeNode> </feMerge> </filter> <path d='M1.95729395,54.0728304 C0.785911132,53.3757699 0,52.098776 0,50.6389022 L0,3.99524419 C0,1.78671428 1.79242202,0 4.00348663,0 L59.9965134,0 C62.2046235,0 64,1.78873175 64,3.99524419 L64,50.6389022 C64,51.9233686 63.3937116,53.0651556 62.451391,53.795754 C62.4427752,53.8032433 62.4341019,53.8107404 62.4253709,53.8182454 C62.4253709,53.8182454 50.3247863,63.8977402 50.3247863,66.6173947 C50.3247863,80.2880544 49.8443049,108.002007 49.8443049,108.002007 C49.8079665,110.210234 47.9874232,112 45.7789089,112 L18.7680997,112 C16.5534397,112 14.7394456,110.20984 14.7027037,108.001566 C14.7027037,108.001566 14.2222222,80.2845761 14.2222222,66.6121773 C14.2222222,63.8942619 2.14081422,54.2321337 2.14081422,54.2321337 C2.07664913,54.1786298 2.01548111,54.1255134 1.95729395,54.0728304 Z' id='path-2'></path> <mask id='mask-3' maskContentUnits='userSpaceOnUse' maskUnits='objectBoundingBox' x='0' y='0' width='64' height='112' fill='white'> <use xlink:href='#path-2'></use> </mask> </defs> <g id='Popover' filter='url(#filter-1)' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' transform='translate(31.000000, 452.000000)'> <use id='Rectangle-14' stroke='#B2B4B9' mask='url(#mask-3)' fill='#FCFCFC' xlink:href='#path-2'></use> </g> </svg>"
  },
  objects: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='11px' height='16px' viewBox='0 0 11 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Lightbulb</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6' sketch:type='MSArtboardGroup' transform='translate(-244.000000, -639.000000)' stroke='#4A5361'> <g id='Lightbulb' sketch:type='MSLayerGroup' transform='translate(244.000000, 639.000000)'> <path d='M8,10.4002904 C9.78083795,9.48993491 11,7.63734273 11,5.5 C11,2.46243388 8.53756612,0 5.5,0 C2.46243388,0 0,2.46243388 0,5.5 C0,7.63734273 1.21916205,9.48993491 3,10.4002904 L3,14.0020869 C3,15.1017394 3.89761602,16 5.0048815,16 L5.9951185,16 C7.1061002,16 8,15.1055038 8,14.0020869 L8,10.4002904 Z' id='Oval-17' sketch:type='MSShapeGroup'></path> <rect id='Rectangle-50' sketch:type='MSShapeGroup' x='3' y='12' width='5' height='1'></rect> <rect id='Rectangle-51' sketch:type='MSShapeGroup' x='4' y='13.5' width='1.5' height='1'></rect> <path d='M5,8.5 C5,8.5 3.49999999,7.50000001 4,7 C4.50000001,6.49999999 5,7.66666667 5.5,8 C5.5,8 6.5,6.50000001 7,7 C7.5,7.49999999 6,8.5 6,8.5 L6,11 L5,11 L5,8.5 Z' id='Rectangle-52' sketch:type='MSShapeGroup'></path> </g> </g> </g> </svg>",
  shift: {
    on: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Upper' sketch:type='MSLayerGroup' transform='translate(-14.000000, -130.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.7052388,13.2052388 C21.3157462,12.8157462 20.6857559,12.8142441 20.2947612,13.2052388 L11.9160767,21.5839233 C11.1339991,22.3660009 11.3982606,23 12.4979131,23 L16.5,23 L16.5,28.009222 C16.5,28.5564136 16.9463114,29 17.4975446,29 L24.5024554,29 C25.053384,29 25.5,28.5490248 25.5,28.009222 L25.5,23 L29.5020869,23 C30.6055038,23 30.866824,22.366824 30.0839233,21.5839233 L21.7052388,13.2052388 Z' id='Shift'></path> </g> </g> </g> </svg>",
    off: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='20px' height='18px' viewBox='0 0 20 19' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Shift</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='Keyboard/Light/Lower' sketch:type='MSLayerGroup' transform='translate(-14.000000, -129.000000)' fill='#030303'> <g id='Third-Row' transform='translate(3.000000, 118.000000)' sketch:type='MSShapeGroup'> <path d='M21.6719008,12.2325898 C21.301032,11.8279916 20.6946892,11.8334731 20.3288195,12.2325898 L11.6947023,21.6512983 C10.7587441,22.672308 11.1285541,23.5 12.5097751,23.5 L15.9999999,23.5000002 L15.9999999,28.0014241 C15.9999999,28.8290648 16.6716559,29.5000001 17.497101,29.5000001 L24.5028992,29.5000001 C25.3297253,29.5000001 26.0000003,28.8349703 26.0000003,28.0014241 L26.0000003,23.5000001 L29.4902251,23.5000002 C30.8763357,23.5000002 31.2439521,22.6751916 30.3054161,21.6512985 L21.6719008,12.2325898 Z M21.341748,14.3645316 C21.1530056,14.1632064 20.8433515,14.1670914 20.6582514,14.3645316 L13.5,21.9999998 L17.5000001,21.9999999 L17.5000002,27.5089956 C17.5000002,27.7801703 17.7329027,28.0000008 18.0034229,28.0000008 L23.996577,28.0000008 C24.2746097,28.0000008 24.4999997,27.7721203 24.4999997,27.5089956 L24.4999997,21.9999999 L28.5,21.9999999 L21.341748,14.3645316 Z' id='Shift'></path> </g> </g> </g> </svg>"
  },
  smileys: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>:D</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-86.000000, -638.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id=':D' transform='translate(87.000000, 230.500000)' sketch:type='MSShapeGroup'> <circle id='Head' stroke='#4A5461' stroke-width='0.789473684' cx='7.5' cy='7.5' r='7.5'></circle> <path d='M7.5,13.5263158 C10.2686907,13.5263158 12.5131579,10.3684212 12.5131579,9.18421045 C12.5131579,7.60526317 11.4389098,9.18421043 7.5,9.18421053 C3.56109023,9.18421062 2.48684211,7.60526317 2.48684211,9.18421045 C2.48684211,10.368421 4.73130935,13.5263158 7.5,13.5263158 Z M7.5,10.9605263 C8.93233083,11.1578947 11.7969925,10.368421 11.7969925,9.44423552 C11.7969925,8.78947368 10.8762084,9.57894727 7.5,9.77631579 C4.12379162,9.57894743 3.20300872,8.78947369 3.20300752,9.44423552 C3.20300582,10.368421 6.06766917,11.1578947 7.5,10.9605263 Z' id='Smile' fill='#4A5461'></path> <path d='M5.23684211,6.3236598 C5.64378876,6.3236598 5.97368421,5.88183554 5.97368421,5.33681769 C5.97368421,4.79179985 5.64378876,4.34997559 5.23684211,4.34997559 C4.82989545,4.34997559 4.5,4.79179985 4.5,5.33681769 C4.5,5.88183554 4.82989545,6.3236598 5.23684211,6.3236598 Z M9.73684211,6.3236598 C10.1437888,6.3236598 10.4736842,5.88183554 10.4736842,5.33681769 C10.4736842,4.79179985 10.1437888,4.34997559 9.73684211,4.34997559 C9.32989545,4.34997559 9,4.79179985 9,5.33681769 C9,5.88183554 9.32989545,6.3236598 9.73684211,6.3236598 Z' id='Eyes' fill='#4A5461'></path> </g> </g> </g> </g> </svg>",
  symbols: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='16px' height='17px' viewBox='0 0 15 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Objects &amp; Symbols</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-304.000000, -638.000000)' fill='#4A5461'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Objects-&amp;-Symbols' transform='translate(304.000000, 230.000000)'> <g id='Thing' transform='translate(0.000000, 0.500000)' sketch:type='MSShapeGroup'> <rect id='Rectangle-1209' x='0' y='0' width='7' height='1'></rect> <rect id='Rectangle-1209' x='0' y='2' width='7' height='1'></rect> <rect id='Rectangle-1211' x='3' y='3' width='1' height='4'></rect> </g> <path d='M11.75,0.159263978 L11.75,0 L11,0 L11,5.091493 C10.59344,4.94221392 10.0639662,4.96453224 9.55715399,5.19017957 C8.69849293,5.5724801 8.23003835,6.39365621 8.51083141,7.02432774 C8.79162447,7.65499928 9.71533454,7.85634375 10.5739956,7.47404321 C11.2761183,7.16143803 11.7173393,6.55538972 11.7013595,6 L11.75,6 L11.75,1.39385056 C12.3175908,1.59590037 13,2.0817456 13,3.25 C13,4.25 12.75,5.5 12.75,5.5 C12.75,5.5 13.75,4.75 13.75,2.5 C13.75,1.02256101 12.5642674,0.407473019 11.75,0.159263978 Z' id='Note' sketch:type='MSShapeGroup'></path> <text id='&amp;' sketch:type='MSTextLayer' font-family='SF UI Display' font-size='9.5' font-weight='normal'> <tspan x='0.25' y='16'>&amp;</tspan> </text> <text id='%' sketch:type='MSTextLayer' font-family='SF UI Display' font-size='9.5' font-weight='normal'> <tspan x='7.75' y='16'>%</tspan> </text> </g> </g> </g> </g> </svg>",
  travel: "<?xml version='1.0' encoding='UTF-8' standalone='no'?> <svg width='17px' height='16px' viewBox='0 0 17 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'> <!-- Generator: Sketch 3.5.2 (25235) - http://www.bohemiancoding.com/sketch --> <title>Transport</title> <desc>Created with Sketch.</desc> <defs></defs> <g id='iOS-9-Keyboards' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'> <g id='iPhone-6-Portrait-Light-Copy' sketch:type='MSArtboardGroup' transform='translate(-241.000000, -638.000000)'> <g id='Keyboards' sketch:type='MSLayerGroup' transform='translate(0.000000, 408.000000)'> <g id='Transport' transform='translate(241.500000, 230.000000)' sketch:type='MSShapeGroup'> <path d='M0,6 L1,6 L1,15 L0,15 L0,6 Z M15,4 L16,4 L16,15 L15,15 L15,4 Z M3.5,0 L4.5,0 L4.5,7 L3.5,7 L3.5,0 Z M1,6 L3.5,6 L3.5,7 L1,7 L1,6 Z M4.5,0 L9.5,0 L9.5,1 L4.5,1 L4.5,0 Z M9.5,0 L10.5,0 L10.5,6 L9.5,6 L9.5,0 Z M10.5,4 L15,4 L15,5 L10.5,5 L10.5,4 Z' id='Skyline' fill='#4A5461'></path> <g id='Windows' transform='translate(2.000000, 2.000000)' fill='#4A5461'> <rect id='Window' x='0' y='6' width='1' height='1'></rect> <rect id='Window' x='3.5' y='0' width='1' height='1'></rect> <rect id='Window' x='5.5' y='0' width='1' height='1'></rect> <rect id='Window' x='5.5' y='2' width='1' height='1'></rect> <rect id='Window' x='3.5' y='2' width='1' height='1'></rect> <rect id='Window' x='11' y='4' width='1' height='1'></rect> <rect id='Window' x='11' y='6' width='1' height='1'></rect> </g> <g id='Car' transform='translate(2.500000, 6.500000)'> <path d='M8.5,8 L2.5,8 L2.5,9.5 L0.5,9.5 L0.5,7.8681145 C0.201202192,7.69582702 0,7.37091363 0,6.9906311 L0,5.0093689 C0,4.45190985 0.444836974,4 0.995577499,4 L10.0044225,4 C10.5542648,4 11,4.44335318 11,5.0093689 L11,6.9906311 C11,7.3653315 10.7990244,7.69234519 10.5,7.86649002 L10.5,9.5 L8.5,9.5 L8.5,8 Z M1.75,6.5 C2.16421356,6.5 2.5,6.16421356 2.5,5.75 C2.5,5.33578644 2.16421356,5 1.75,5 C1.33578644,5 1,5.33578644 1,5.75 C1,6.16421356 1.33578644,6.5 1.75,6.5 Z M9.25,6.5 C9.66421356,6.5 10,6.16421356 10,5.75 C10,5.33578644 9.66421356,5 9.25,5 C8.83578644,5 8.5,5.33578644 8.5,5.75 C8.5,6.16421356 8.83578644,6.5 9.25,6.5 Z M0.5,7 L10.5,7 L10.5,7.5 L0.5,7.5 L0.5,7 Z M3,6.5 L8,6.5 L8,7 L3,7 L3,6.5 Z' id='Body' fill='#4A5461'></path> <path d='M1.5,4.5 L1.5,3 C1.5,1.34314575 2.83902013,0 4.50166547,0 L6.49833453,0 C8.15610859,0 9.5,1.34651712 9.5,3 L9.5,5' id='Roof' stroke='#4A5461'></path> </g> </g> </g> </g> </g> </svg>"
};

exports.framerFrames = {
  640: 2,
  750: 2,
  768: 2,
  1080: 3,
  1242: 3,
  1440: 4,
  1536: 2
};

exports.realDevices = {
  320: {
    480: {
      name: "iPhone",
      width: 320,
      height: 480,
      scale: 1
    }
  },
  480: {
    854: {
      name: "Android One",
      width: 480,
      height: 854,
      scale: 1.5
    }
  },
  640: {
    960: {
      name: "iPhone 4",
      width: 640,
      height: 960,
      scale: 2
    },
    1136: {
      name: "iPhone 5",
      width: 640,
      height: 1136,
      scale: 2
    }
  },
  720: {
    1280: {
      name: "XHDPI",
      width: 720,
      height: 1280,
      scale: 2
    }
  },
  750: {
    1118: {
      name: "iPhone 6",
      width: 750,
      height: 1118,
      scale: 2
    },
    1334: {
      name: "iPhone 6",
      width: 750,
      height: 1334,
      scale: 2
    }
  },
  768: {
    1024: {
      name: "iPad",
      width: 768,
      height: 1024,
      scale: 1
    },
    1280: {
      name: "Nexus 4",
      width: 768,
      height: 1280,
      scale: 2
    }
  },
  800: {
    1280: {
      name: "Nexus 7",
      width: 800,
      height: 1280,
      scale: 1
    }
  },
  1080: {
    1920: {
      name: "XXHDPI",
      width: 1080,
      height: 1920,
      scale: 3
    }
  },
  1200: {
    1920: {
      name: "Nexus 7",
      width: 1200,
      height: 1920,
      scale: 2
    }
  },
  1242: {
    2208: {
      name: "iPhone 6 Plus",
      width: 1242,
      height: 2208,
      scale: 3
    }
  },
  1440: {
    2560: {
      name: "XXXHDPI",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1441: {
    2561: {
      name: "Nexus 6",
      width: 1440,
      height: 2560,
      scale: 4
    }
  },
  1536: {
    2048: {
      name: "iPad",
      width: 1536,
      height: 2048,
      scale: 2
    }
  },
  1600: {
    2056: {
      name: "Nexus 10",
      width: 1600,
      height: 2056,
      scale: 2
    }
  },
  2048: {
    1536: {
      name: "Nexus 9",
      width: 2048,
      height: 1536,
      scale: 2
    },
    2732: {
      name: "iPad Pro",
      width: 2048,
      height: 2732,
      scale: 2
    }
  },
  2560: {
    1600: {
      name: "Nexus 10",
      width: 2560,
      height: 1600,
      scale: 2
    }
  },
  2732: {
    2048: {
      name: "iPad Pro",
      width: 2732,
      height: 2048,
      scale: 2
    }
  }
};

exports.colors = {
  red: "#F44336",
  red50: "#FFEBEE",
  red100: "#FFCDD2",
  red200: "#EF9A9A",
  red300: "#E57373",
  red400: "#EF5350",
  red500: "#F44336",
  red600: "#E53935",
  red700: "#D32F2F",
  red800: "#C62828",
  red900: "#B71C1C",
  redA100: "#FF8A80",
  redA200: "#FF5252",
  redA400: "#FF1744",
  redA700: "#D50000",
  pink: "#E91E63",
  pink50: "#FCE4EC",
  pink100: "#F8BBD0",
  pink200: "#F48FB1",
  pink300: "#F06292",
  pink400: "#EC407A",
  pink500: "#E91E63",
  pink600: "#D81B60",
  pink700: "#C2185B",
  pink800: "#AD1457",
  pink900: "#880E4F",
  pinkA100: "#FF80AB",
  pinkA200: "#FF4081",
  pinkA400: "#F50057",
  pinkA700: "#C51162",
  purple: "#9C27B0",
  purple50: "#F3E5F5",
  purple100: "#E1BEE7",
  purple200: "#CE93D8",
  purple300: "#BA68C8",
  purple400: "#AB47BC",
  purple500: "#9C27B0",
  purple600: "#8E24AA",
  purple700: "#7B1FA2",
  purple800: "#6A1B9A",
  purple900: "#4A148C",
  purpleA100: "#EA80FC",
  purpleA200: "#E040FB",
  purpleA400: "#D500F9",
  purpleA700: "#AA00FF",
  deepPurple: "#673AB7",
  deepPurple50: "#EDE7F6",
  deepPurple100: "#D1C4E9",
  deepPurple200: "#B39DDB",
  deepPurple300: "#9575CD",
  deepPurple400: "#7E57C2",
  deepPurple500: "#673AB7",
  deepPurple600: "#5E35B1",
  deepPurple700: "#512DA8",
  deepPurple800: "#4527A0",
  deepPurple900: "#311B92",
  deepPurpleA100: "#B388FF",
  deepPurpleA200: "#7C4DFF",
  deepPurpleA400: "#651FFF",
  deepPurpleA700: "#6200EA",
  indigo: "#3F51B5",
  indigo50: "#E8EAF6",
  indigo100: "#C5CAE9",
  indigo200: "#9FA8DA",
  indigo300: "#7986CB",
  indigo400: "#5C6BC0",
  indigo500: "#3F51B5",
  indigo600: "#3949AB",
  indigo700: "#303F9F",
  indigo800: "#283593",
  indigo900: "#1A237E",
  indigoA100: "#8C9EFF",
  indigoA200: "#536DFE",
  indigoA400: "#3D5AFE",
  indigoA700: "#304FFE",
  blue: "#2196F3",
  blue50: "#E3F2FD",
  blue100: "#BBDEFB",
  blue200: "#90CAF9",
  blue300: "#64B5F6",
  blue400: "#42A5F5",
  blue500: "#2196F3",
  blue600: "#1E88E5",
  blue700: "#1976D2",
  blue800: "#1565C0",
  blue900: "#0D47A1",
  blueA100: "#82B1FF",
  blueA200: "#448AFF",
  blueA400: "#2979FF",
  blueA700: "#2962FF",
  lightBlue: "#03A9F4",
  lightBlue50: "#E1F5FE",
  lightBlue100: "#B3E5FC",
  lightBlue200: "#81D4FA",
  lightBlue300: "#4FC3F7",
  lightBlue400: "#29B6F6",
  lightBlue500: "#03A9F4",
  lightBlue600: "#039BE5",
  lightBlue700: "#0288D1",
  lightBlue800: "#0277BD",
  lightBlue900: "#01579B",
  lightBlueA100: "#80D8FF",
  lightBlueA200: "#40C4FF",
  lightBlueA400: "#00B0FF",
  lightBlueA700: "#0091EA",
  cyan: "#00BCD4",
  cyan50: "#E0F7FA",
  cyan100: "#B2EBF2",
  cyan200: "#80DEEA",
  cyan300: "#4DD0E1",
  cyan400: "#26C6DA",
  cyan500: "#00BCD4",
  cyan600: "#00ACC1",
  cyan700: "#0097A7",
  cyan800: "#00838F",
  cyan900: "#006064",
  cyanA100: "#84FFFF",
  cyanA200: "#18FFFF",
  cyanA400: "#00E5FF",
  cyanA700: "#00B8D4",
  teal: "#009688",
  teal50: "#E0F2F1",
  teal100: "#B2DFDB",
  teal200: "#80CBC4",
  teal300: "#4DB6AC",
  teal400: "#26A69A",
  teal500: "#009688",
  teal600: "#00897B",
  teal700: "#00796B",
  teal800: "#00695C",
  teal900: "#004D40",
  tealA100: "#A7FFEB",
  tealA200: "#64FFDA",
  tealA400: "#1DE9B6",
  tealA700: "#00BFA5",
  green: "#4CAF50",
  green50: "#E8F5E9",
  green100: "#C8E6C9",
  green200: "#A5D6A7",
  green300: "#81C784",
  green400: "#66BB6A",
  green500: "#4CAF50",
  green600: "#43A047",
  green700: "#388E3C",
  green800: "#2E7D32",
  green900: "#1B5E20",
  greenA100: "#B9F6CA",
  greenA200: "#69F0AE",
  greenA400: "#00E676",
  greenA700: "#00C853",
  lightGreen: "#8BC34A",
  lightGreen50: "#F1F8E9",
  lightGreen100: "#DCEDC8",
  lightGreen200: "#C5E1A5",
  lightGreen300: "#AED581",
  lightGreen400: "#9CCC65",
  lightGreen500: "#8BC34A",
  lightGreen600: "#7CB342",
  lightGreen700: "#689F38",
  lightGreen800: "#558B2F",
  lightGreen900: "#33691E",
  lightGreenA100: "#CCFF90",
  lightGreenA200: "#B2FF59",
  lightGreenA400: "#76FF03",
  lightGreenA700: "#64DD17",
  lime: "#CDDC39",
  lime50: "#F9FBE7",
  lime100: "#F0F4C3",
  lime200: "#E6EE9C",
  lime300: "#DCE775",
  lime400: "#D4E157",
  lime500: "#CDDC39",
  lime600: "#C0CA33",
  lime700: "#AFB42B",
  lime800: "#9E9D24",
  lime900: "#827717",
  limeA100: "#F4FF81",
  limeA200: "#EEFF41",
  limeA400: "#C6FF00",
  limeA700: "#AEEA00",
  yellow: "#FFEB3B",
  yellow50: "#FFFDE7",
  yellow100: "#FFF9C4",
  yellow200: "#FFF59D",
  yellow300: "#FFF176",
  yellow400: "#FFEE58",
  yellow500: "#FFEB3B",
  yellow600: "#FDD835",
  yellow700: "#FBC02D",
  yellow800: "#F9A825",
  yellow900: "#F57F17",
  yellowA100: "#FFFF8D",
  yellowA200: "#FFFF00",
  yellowA400: "#FFEA00",
  yellowA700: "#FFD600",
  amber: "#FFC107",
  amber50: "#FFF8E1",
  amber100: "#FFECB3",
  amber200: "#FFE082",
  amber300: "#FFD54F",
  amber400: "#FFCA28",
  amber500: "#FFC107",
  amber600: "#FFB300",
  amber700: "#FFA000",
  amber800: "#FF8F00",
  amber900: "#FF6F00",
  amberA100: "#FFE57F",
  amberA200: "#FFD740",
  amberA400: "#FFC400",
  amberA700: "#FFAB00",
  orange: "#FF9800",
  orange50: "#FFF3E0",
  orange100: "#FFE0B2",
  orange200: "#FFCC80",
  orange300: "#FFB74D",
  orange400: "#FFA726",
  orange500: "#FF9800",
  orange600: "#FB8C00",
  orange700: "#F57C00",
  orange800: "#EF6C00",
  orange900: "#E65100",
  orangeA100: "#FFD180",
  orangeA200: "#FFAB40",
  orangeA400: "#FF9100",
  orangeA700: "#FF6D00",
  deepOrange: "#FF5722",
  deepOrange50: "#FBE9E7",
  deepOrange100: "#FFCCBC",
  deepOrange200: "#FFAB91",
  deepOrange300: "#FF8A65",
  deepOrange400: "#FF7043",
  deepOrange500: "#FF5722",
  deepOrange600: "#F4511E",
  deepOrange700: "#E64A19",
  deepOrange800: "#D84315",
  deepOrange900: "#BF360C",
  deepOrangeA100: "#FF9E80",
  deepOrangeA200: "#FF6E40",
  deepOrangeA400: "#FF3D00",
  deepOrangeA700: "#DD2C00",
  brown: "#795548",
  brown50: "#EFEBE9",
  brown100: "#D7CCC8",
  brown200: "#BCAAA4",
  brown300: "#A1887F",
  brown400: "#8D6E63",
  brown500: "#795548",
  brown600: "#6D4C41",
  brown700: "#5D4037",
  brown800: "#4E342E",
  brown900: "#3E2723",
  grey: "#9E9E9E",
  grey50: "#FAFAFA",
  grey100: "#F5F5F5",
  grey200: "#EEEEEE",
  grey300: "#E0E0E0",
  grey400: "#BDBDBD",
  grey500: "#9E9E9E",
  grey600: "#757575",
  grey700: "#616161",
  grey800: "#424242",
  grey900: "#212121",
  blueGrey: "#607D8B",
  blueGrey50: "#ECEFF1",
  blueGrey100: "#CFD8DC",
  blueGrey200: "#B0BEC5",
  blueGrey300: "#90A4AE",
  blueGrey400: "#78909C",
  blueGrey500: "#607D8B",
  blueGrey600: "#546E7A",
  blueGrey700: "#455A64",
  blueGrey800: "#37474F",
  blueGrey900: "#263238",
  black: "#000000",
  white: "#FFFFFF"
};


},{"material-kit":"material-kit"}],"material-kit-nav-bar":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var backButton, backIcon, homeButton, homeIcon, navbar, recentButton, recentIcon, setup, svgBack, svgHome;
  setup = m.utils.setupComponent(array, exports.defaults);
  navbar = new Layer({
    backgroundColor: "black"
  });
  navbar.type = "navbar";
  navbar.constraints = {
    bottom: -1,
    leading: 0,
    trailing: 0,
    height: 48
  };
  svgHome = m.utils.svg(m.assets.home);
  svgBack = m.utils.svg(m.assets.back);
  homeButton = new Layer({
    superLayer: navbar,
    borderRadius: m.utils.px(21),
    backgroundColor: "transparent",
    name: "home",
    clip: true
  });
  homeButton.constraints = {
    top: 3,
    height: 42,
    width: 94,
    align: "horizontal"
  };
  homeIcon = new Layer({
    superLayer: homeButton,
    width: svgHome.width,
    height: svgHome.height,
    html: svgHome.svg,
    backgroundColor: "transparent",
    name: "icon"
  });
  homeIcon.constraints = {
    align: "center"
  };
  recentButton = new Layer({
    superLayer: navbar,
    borderRadius: m.utils.px(21),
    backgroundColor: "transparent",
    name: "recent",
    clip: true
  });
  recentButton.constraints = {
    top: 3,
    height: 42,
    width: 94,
    leading: [homeButton, 6]
  };
  recentIcon = new Layer({
    superLayer: recentButton,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: m.utils.px(2),
    borderRadius: m.utils.px(2),
    name: "icon"
  });
  recentIcon.constraints = {
    align: "center",
    width: 16,
    height: 16
  };
  backButton = new Layer({
    superLayer: navbar,
    borderRadius: m.utils.px(21),
    backgroundColor: "transparent",
    name: "back",
    clip: true
  });
  backButton.constraints = {
    top: 3,
    height: 42,
    width: 94,
    trailing: [homeButton, 6]
  };
  backIcon = new Layer({
    superLayer: backButton,
    width: svgBack.width,
    height: svgBack.height,
    html: svgBack.svg,
    backgroundColor: "transparent",
    name: "icon"
  });
  backIcon.constraints = {
    align: "center"
  };
  m.layout.set({
    target: [navbar, homeButton, recentButton, backButton, homeIcon, backIcon, recentIcon]
  });
  m.utils.inky({
    layer: homeButton,
    moveToTap: false,
    color: "white",
    scale: 20,
    curve: "bezier-curve(1, 0.4, 0.4, 1.0)",
    opacity: .3
  });
  m.utils.inky({
    layer: backButton,
    moveToTap: false,
    color: "white",
    scale: 20,
    curve: "bezier-curve(1, 0.4, 0.4, 1.0)",
    opacity: .3
  });
  m.utils.inky({
    layer: recentButton,
    moveToTap: false,
    color: "white",
    scale: 20,
    curve: "bezier-curve(1, 0.4, 0.4, 1.0)",
    opacity: .3
  });
  backButton.on(Events.TouchEnd, function() {
    return m.removeFromStack();
  });
  navbar.back = backButton;
  navbar.back.backIcon = backIcon;
  navbar.home = homeButton;
  navbar.home.icon = homeIcon;
  navbar.recent = recentButton;
  navbar.recent.icon = recentIcon;
  Utils.interval(.05, function() {
    return navbar.bringToFront();
  });
  m.layout.set(navbar);
  return navbar;
};


},{"material-kit":"material-kit"}],"material-kit-snack-bar":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  animated: true,
  text: "Snackbar Text",
  action: void 0,
  actionColor: "limeA200",
  duration: 5
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var actionWidth, bar, barHeight, fabExists, i, l, len, navbarExists, ref, setup;
  setup = m.utils.setupComponent(array, exports.defaults);
  bar = new Layer({
    name: "snackbar",
    backgroundColor: "transparent",
    clip: true
  });
  bar.type = "snackbar";
  bar.bg = new Layer({
    backgroundColor: "#323232",
    superLayer: bar,
    name: "bg"
  });
  navbarExists = 0;
  fabExists = void 0;
  ref = Framer.CurrentContext.layers;
  for (i = 0, len = ref.length; i < len; i++) {
    l = ref[i];
    if (l.type === "navbar") {
      navbarExists = l;
    }
    if (l.type === "floating") {
      fabExists = l;
    }
    if (l.type === "snackbar" && l !== bar) {
      l.bg.animate({
        properties: {
          y: bar.height
        },
        time: .3,
        curve: "bezier-curve(.2, 0.4, 0.4, 1.0)"
      }, l.fabMoved ? (l.fabMoved.halted = true, l.fabMoved.constraints.bottom = fabExists.previousBottom, m.layout.animate({
        target: fabExists,
        curve: "bezier-curve(.2, 0.4, 0.4, 1.0)",
        time: .3
      }), Utils.delay(setup.duration, function() {
        fabExists.constraints.bottom = fabExists.previousBottom;
        return m.layout.animate({
          target: fabExists,
          curve: "bezier-curve(.2, 0.4, 0.4, 1.0)",
          time: .3
        });
      })) : void 0);
    }
  }
  bar.bringToFront();
  bar.constraints = {
    leading: 0,
    trailing: 0,
    bottom: [navbarExists, -1],
    height: 48
  };
  m.layout.set({
    target: [bar]
  });
  bar.bg.props = {
    width: bar.width,
    height: bar.height
  };
  actionWidth = m.px(24);
  if (setup.action) {
    bar.action = new m.Button({
      type: "flat",
      superLayer: bar.bg,
      text: setup.action,
      constraints: {
        trailing: 24,
        align: "vertical"
      },
      backgroundColor: "#3232",
      color: setup.actionColor
    });
    actionWidth = bar.action.width + m.px(48);
  }
  bar.text = new m.Text({
    fontSize: 14,
    color: "white",
    superLayer: bar.bg,
    constraints: {
      leading: 24,
      align: "vertical"
    },
    text: setup.text,
    name: "text",
    lineHeight: 18
  });
  if (m.device.width < actionWidth + bar.text.width + m.px(24)) {
    bar.text.constraints.width = m.dp(m.device.width) - (m.dp(actionWidth) + 24);
    m.utils.update(bar.text);
    m.layout.set(bar.text);
    bar.constraints.height = m.dp(bar.text.height) + 48;
    bar.bg.height = bar.text.height + m.px(48);
    m.layout.set({
      target: [bar, bar.text]
    });
    if (setup.action) {
      m.layout.set(bar.action);
    }
  }
  barHeight = bar.bg.height;
  if (fabExists) {
    bar.fabMoved = fabExists;
    fabExists.previousBottom = fabExists.constraints.bottom;
    fabExists.constraints.bottom = fabExists.constraints.bottom + m.dp(barHeight);
  }
  if (setup.animated) {
    bar.bg.y = bar.bg.height;
    bar.text.opacity = 0;
    bar.bg.animate({
      properties: {
        y: 0
      },
      time: .3,
      curve: "bezier-curve(.2, 0.4, 0.4, 1.0)"
    });
    bar.text.animate({
      properties: {
        opacity: 1
      },
      time: .3
    });
    if (setup.action) {
      bar.action.animate({
        properties: {
          opacity: 1
        },
        time: .3
      });
    }
    if (fabExists) {
      m.layout.animate({
        target: fabExists,
        curve: "bezier-curve(.2, 0.4, 0.4, 1.0)",
        time: .3
      });
    }
  }
  Utils.delay(setup.duration, function() {
    bar.bg.animate({
      properties: {
        y: bar.height
      },
      time: .3,
      curve: "bezier-curve(.2, 0.4, 0.4, 1.0)"
    });
    bar.text.animate({
      properties: {
        opacity: 0
      },
      time: .3
    });
    if (setup.action) {
      bar.action.animate({
        properties: {
          opacity: 0
        },
        time: .3
      });
    }
    if (fabExists && fabExists.halted !== true) {
      fabExists.constraints.bottom = fabExists.previousBottom;
      return m.layout.animate({
        target: fabExists,
        curve: "bezier-curve(.2, 0.4, 0.4, 1.0)",
        time: .3
      });
    }
  });
  Utils.delay(setup.duration + .3, function() {
    return bar.destroy();
  });
  return bar;
};


},{"material-kit":"material-kit"}],"material-kit-stack":[function(require,module,exports){
var m, stack;

m = require('material-kit');

exports.stack = stack = [];

exports.addToStack = function(layer) {
  if (stack.indexOf(layer) === -1) {
    return stack.push(layer);
  }
};

exports.removeFromStack = function(layer) {
  var layerToleave, overlay;
  if (stack.length > 0) {
    layerToleave = stack[stack.length - 1];
    if (layerToleave.exit !== void 0) {
      layerToleave.exit();
    } else {
      overlay = new Layer({
        backgroundColor: m.color("black"),
        width: m.device.width,
        height: m.device.height
      });
      overlay.placeBehind(layerToleave);
      layerToleave.constraints = {
        leading: m.dp(m.device.width)
      };
      m.layout.animate({
        target: layerToleave,
        time: .3
      });
      overlay.animate({
        properties: {
          opacity: 0
        },
        time: .5,
        delay: .2
      });
      Utils.delay(.6, function() {
        layerToleave.destroy();
        return overlay.destroy();
      });
    }
    return stack.pop();
  }
};


},{"material-kit":"material-kit"}],"material-kit-status-bar":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  carrier: "",
  network: "LTE",
  battery: 100,
  cellular: 2,
  style: "light",
  clock24: false,
  type: "statusBar",
  backgroundColor: "rgba(0,0,0,.1)",
  color: "black",
  opacity: .6
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var batteryIcon, cellular, cellularIcon, highBattery, lowBattery, midBattery, setup, statusBar, time, wifi, wifiIcon;
  setup = m.utils.setupComponent(array, exports.defaults);
  statusBar = new Layer({
    backgroundColor: setup.backgroundColor,
    name: "statusBar.all"
  });
  if (setup.style === "dark") {
    if (setup.backgroundColor === "rgba(0,0,0,.1)") {
      statusBar.backgroundColor = m.utils.color("black");
    }
    if (setup.color === "black") {
      setup.color = "white";
    }
    if (setup.opacity === .6) {
      setup.opacity = 1;
    }
  }
  if (setup.style === "light" && setup.color !== "black") {
    setup.opacity = 1;
  }
  statusBar.type = setup.type;
  statusBar.constraints = {
    leading: 0,
    trailing: 0,
    height: 24
  };
  switch (m.device.name) {
    case "iphone-6s-plus":
      this.topConstraint = 5;
      this.bluetooth = 5;
      break;
    case "fullscreen":
      this.topConstraint = 5;
      this.bluetooth = -10;
      break;
    default:
      this.topConstraint = 3;
      this.bluetooth = 3;
  }
  this.time = m.utils.getTime();
  time = new m.Text({
    style: "statusBarTime",
    text: m.utils.timeFormatter(this.time, setup.clock24),
    fontSize: 14,
    fontWeight: 500,
    superLayer: statusBar,
    color: setup.color,
    name: "time",
    opacity: setup.opacity
  });
  time.constraints = {
    trailing: 8,
    align: "vertical"
  };
  m.utils.timeDelegate(time, setup.clock24);
  batteryIcon = new Layer({
    superLayer: statusBar,
    backgroundColor: "transparent",
    name: "batteryIcon"
  });
  if (setup.battery > 70) {
    highBattery = m.utils.svg(m.assets.batteryHigh);
    batteryIcon.html = highBattery.svg;
    batteryIcon.height = highBattery.height;
    batteryIcon.width = highBattery.width;
    m.utils.changeFill(batteryIcon, setup.color);
    batteryIcon.opacity = setup.opacity;
  }
  if (setup.battery <= 70 && setup.battery > 20) {
    midBattery = m.utils.svg(m.assets.batteryMid);
    batteryIcon.html = midBattery.svg;
    m.utils.changeFill(batteryIcon, setup.color);
  }
  if (setup.battery <= 20) {
    lowBattery = m.utils.svg(m.assets.batteryLow);
    batteryIcon.html = lowBattery.svg;
    m.utils.changeFill(batteryIcon, setup.color);
  }
  batteryIcon.constraints = {
    trailing: [time, 7],
    align: "vertical"
  };
  cellularIcon = m.utils.svg(m.assets.cellular);
  cellular = new Layer({
    width: cellularIcon.width,
    height: cellularIcon.height,
    html: cellularIcon.svg,
    superLayer: statusBar,
    backgroundColor: "transparent",
    opacity: setup.opacity,
    name: "cellular"
  });
  cellular.constraints = {
    trailing: [batteryIcon, 7],
    align: "vertical"
  };
  m.utils.changeFill(cellular, setup.color);
  wifiIcon = m.utils.svg(m.assets.wifi, setup.color);
  wifi = new Layer({
    width: wifiIcon.width,
    height: wifiIcon.height,
    superLayer: statusBar,
    backgroundColor: "transparent",
    name: "wifi",
    html: wifiIcon.svg,
    opacity: setup.opacity
  });
  m.utils.changeFill(wifi, setup.color);
  wifi.constraints = {
    trailing: [cellular, 4],
    align: "vertical"
  };
  m.layout.set();
  statusBar.battery = {};
  statusBar.battery.icon = batteryIcon;
  statusBar.time = time;
  statusBar.cellular = cellular;
  m.layout.set({
    target: [statusBar, time, batteryIcon, cellular, wifi]
  });
  return statusBar;
};


},{"material-kit":"material-kit"}],"material-kit-text":[function(require,module,exports){
var m, style;

m = require('material-kit');

exports.defaults = {
  constraints: {},
  text: "Material Text Layer",
  type: "text",
  x: 0,
  y: 0,
  width: -1,
  height: -1,
  superLayer: void 0,
  style: "default",
  lines: 1,
  textAlign: "left",
  backgroundColor: "transparent",
  color: "black",
  fontSize: 17,
  fontStyle: "regular",
  fontFamily: "Roboto",
  fontWeight: "regular",
  lineHeight: "auto",
  name: "text layer",
  opacity: 1,
  textTransform: "none",
  letterSpacing: 0,
  name: "text layer"
};

exports.defaults.props = Object.keys(exports.defaults);

style = document.createElement('style');

style.type = 'text/css';

style.appendChild(document.createTextNode("@import url(https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic);\n @import url(https://fonts.googleapis.com/icon?family=Material+Icons); \n"));

document.getElementsByTagName('head')[0].appendChild(style);

exports.create = function(array) {
  var exceptions, i, j, len, len1, prop, ref, ref1, setup, textFrame, textLayer;
  setup = m.utils.setupComponent(array, exports.defaults);
  exceptions = Object.keys(setup);
  textLayer = new Layer({
    backgroundColor: "transparent",
    name: setup.name
  });
  textLayer.type = "text";
  textLayer.html = setup.text;
  ref = m.lib.layerProps;
  for (i = 0, len = ref.length; i < len; i++) {
    prop = ref[i];
    if (setup[prop]) {
      if (prop === "color") {
        setup[prop] = m.utils.color(setup[prop]);
      }
      textLayer[prop] = setup[prop];
    }
  }
  ref1 = m.lib.layerStyles;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    prop = ref1[j];
    if (setup[prop]) {
      if (prop === "lineHeight" && setup[prop] === "auto") {
        textLayer.style.lineHeight = setup.fontSize;
      }
      if (prop === "fontWeight") {
        switch (setup[prop]) {
          case "ultrathin":
            setup[prop] = 100;
            break;
          case "thin":
            setup[prop] = 200;
            break;
          case "light":
            setup[prop] = 300;
            break;
          case "regular":
            setup[prop] = 400;
            break;
          case "medium":
            setup[prop] = 500;
            break;
          case "semibold":
            setup[prop] = 600;
            break;
          case "bold":
            setup[prop] = 700;
            break;
          case "black":
            setup[prop] = 800;
        }
      }
      if (prop === "fontSize" || prop === "lineHeight" || prop === "letterSpacing") {
        setup[prop] = m.utils.px(setup[prop]) + "px";
      }
      textLayer.style[prop] = setup[prop];
    }
  }
  textFrame = m.utils.textAutoSize(textLayer);
  textLayer.props = {
    height: textFrame.height,
    width: textFrame.width
  };
  textLayer.constraints = setup.constraints;
  m.layout.set({
    target: textLayer
  });
  return textLayer;
};


},{"material-kit":"material-kit"}],"material-kit-utils":[function(require,module,exports){
var m;

m = require('material-kit');

exports.pt = function(px) {
  var pt;
  pt = px / m.device.scale;
  pt = Math.round(pt);
  return pt;
};

exports.px = function(pt) {
  var px;
  px = pt * m.device.scale;
  px = Math.round(px);
  return px;
};

exports.color = function(colorString) {
  var color;
  if (colorString[0] === "#") {
    return colorString;
  } else {
    color = new Color(m.lib.colors[colorString]);
    if (colorString === "transparent") {
      color = "transparent";
    }
    return color;
  }
};

exports.clean = function(string) {
  string = string.replace(/[&]nbsp[;]/gi, " ").replace(/[<]br[>]/gi, "");
  return string;
};

exports.svg = function(svg) {
  var endIndex, hEndIndex, hStartIndex, height, heightString, newHeight, newString, newWidth, startIndex, string, wEndIndex, wStartIndex, width;
  startIndex = svg.search("<svg width=");
  endIndex = svg.search(" viewBox");
  string = svg.slice(startIndex, endIndex);
  wStartIndex = string.search("=") + 2;
  wEndIndex = string.search("px");
  width = string.slice(wStartIndex, wEndIndex);
  newWidth = exports.px(width);
  heightString = string.slice(wEndIndex + 4, string.length);
  hStartIndex = heightString.search("=") + 2;
  hEndIndex = heightString.search("px");
  height = heightString.slice(hStartIndex, hEndIndex);
  newHeight = exports.px(height);
  newString = string.replace(width, newWidth);
  newString = newString.replace(height, newHeight);
  svg = svg.replace(string, newString);
  return {
    svg: svg,
    width: newWidth,
    height: newHeight
  };
};

exports.changeFill = function(layer, color) {
  var endIndex, fillString, newString, startIndex, string;
  if (typeof color !== "object") {
    color = exports.color(color);
  }
  startIndex = layer.html.search("fill=\"#");
  fillString = layer.html.slice(startIndex, layer.html.length);
  endIndex = fillString.search("\"") + 8;
  string = fillString.slice(0, endIndex);
  newString = "fill=\"" + color;
  return layer.html = layer.html.replace(string, newString);
};

exports.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.getTime = function() {
  var date, dateObj, day, daysOfTheWeek, hours, mins, month, monthsOfTheYear, secs;
  daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dateObj = new Date();
  month = monthsOfTheYear[dateObj.getMonth()];
  date = dateObj.getDate();
  day = daysOfTheWeek[dateObj.getDay()];
  hours = dateObj.getHours();
  mins = dateObj.getMinutes();
  secs = dateObj.getSeconds();
  return {
    month: month,
    date: date,
    day: day,
    hours: hours,
    mins: mins,
    secs: secs
  };
};

exports.bgBlur = function(layer) {
  layer.style["-webkit-backdrop-filter"] = "blur(" + (exports.px(5)) + "px)";
  return layer;
};

exports.textAutoSize = function(textLayer) {
  var constraints, styles, textFrame;
  constraints = {};
  if (textLayer.constraints) {
    if (textLayer.constraints.height) {
      constraints.height = exports.px(textLayer.constraints.height);
    }
    if (textLayer.constraints.width) {
      constraints.width = exports.px(textLayer.constraints.width);
    }
  }
  styles = {
    fontSize: textLayer.style.fontSize,
    fontFamily: textLayer.style.fontFamily,
    fontWeight: textLayer.style.fontWeight,
    fontStyle: textLayer.style.fontStyle,
    lineHeight: textLayer.style.lineHeight,
    letterSpacing: textLayer.style.letterSpacing,
    textTransform: textLayer.style.textTransform
  };
  textFrame = Utils.textSize(textLayer.html, styles, constraints);
  return {
    width: textFrame.width,
    height: textFrame.height
  };
};

exports.getDevice = function() {
  var device, frame;
  device = "";
  frame = true;
  if (m.lib.realDevices[innerWidth] && m.lib.realDevices[innerWidth][innerHeight]) {
    device = m.lib.realDevices[innerWidth][innerHeight];
    frame = false;
    Framer.Device.deviceType = "fullscreen";
  }
  if (frame) {
    device = {
      name: Framer.Device.deviceType,
      width: Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth,
      height: Framer.DeviceView.Devices[Framer.Device.deviceType].screenHeight,
      scale: m.lib.framerFrames[Framer.DeviceView.Devices[Framer.Device.deviceType].screenWidth]
    };
  }
  if (device.scale === void 0) {
    device.scale = 2;
  }
  if (device.width === void 0) {
    device.width = innerWidth;
  }
  if (device.height === void 0) {
    device.height = innerHeight;
  }
  return device;
};

exports.specialChar = function(layer) {
  var chosenColor, newText, text;
  text = layer;
  if (layer.type === "button") {
    text = layer.label;
  }
  if (text.html.indexOf("-b") !== -1) {
    newText = text.html.replace("-b ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        fontWeight: 600
      }
    ]);
  }
  if (text.html.indexOf("-r") !== -1) {
    newText = text.html.replace("-r ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "red"
      }
    ]);
  }
  if (text.html.indexOf("-rb") !== -1) {
    newText = text.html.replace("-rb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "blue"
      }
    ]);
  }
  if (text.html.indexOf("-lb") !== -1) {
    newText = text.html.replace("-lb ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "light-blue"
      }
    ]);
  }
  if (text.html.indexOf("-g") !== -1) {
    newText = text.html.replace("-g ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "green"
      }
    ]);
  }
  if (text.html.indexOf("-o") !== -1) {
    newText = text.html.replace("-o ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-p") !== -1) {
    newText = text.html.replace("-p ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "orange"
      }
    ]);
  }
  if (text.html.indexOf("-y") !== -1) {
    newText = text.html.replace("-y ", "");
    exports.update(text, [
      {
        text: newText
      }, {
        color: "yellow"
      }
    ]);
  }
  if (text.html.indexOf("-#") !== -1) {
    chosenColor = text.html.slice(1, 8);
    newText = text.html.slice(9, text.html.length);
    exports.update(text, [
      {
        text: newText
      }, {
        color: chosenColor
      }
    ]);
  }
  if (text.html.indexOf("-") !== -1) {
    newText = text.html.replace("- ", "");
    exports.update(text, [
      {
        text: newText
      }
    ]);
  }
  if (layer.buttonType === "text") {
    layer.width = text.width;
  }
  return m.layout.set();
};

exports.update = function(layer, array) {
  var change, j, key, len, textFrame, value;
  if (array === void 0) {
    array = [];
  }
  if (layer.type === "text") {
    for (j = 0, len = array.length; j < len; j++) {
      change = array[j];
      key = Object.keys(change)[0];
      value = change[key];
      if (key === "text") {
        layer.html = value;
      }
      if (key === "fontWeight") {
        layer.style[key] = value;
      }
      if (key === "color") {
        layer.color = exports.color(value);
      }
    }
    textFrame = exports.textAutoSize(layer);
    layer.width = textFrame.width;
    layer.height = textFrame.height;
  }
  return m.layout.set();
};

exports.autoColor = function(colorObject) {
  var blue, color, green, red, rgb;
  rgb = colorObject.toRgbString();
  rgb = rgb.substring(4, rgb.length - 1);
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.replace(/ /g, '');
  rgb = rgb.split(',');
  red = rgb[0];
  green = rgb[1];
  blue = rgb[2];
  color = "";
  if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
    color = exports.color("black");
  } else {
    color = exports.color("white");
  }
  return color;
};

exports.sameParent = function(layer1, layer2) {
  var parentOne, parentTwo;
  parentOne = layer1.superLayer;
  parentTwo = layer2.superLayer;
  if (parentOne === parentTwo) {
    return true;
  } else {
    return false;
  }
};

exports.timeDelegate = function(layer, clockType) {
  this.time = exports.getTime();
  return Utils.delay(60 - this.time.secs, function() {
    this.time = exports.getTime();
    exports.update(layer, [
      {
        text: exports.timeFormatter(this.time, clockType)
      }
    ]);
    return Utils.interval(60, function() {
      this.time = exports.getTime();
      return exports.update(layer, [
        {
          text: exports.timeFormatter(this.time, clockType)
        }
      ]);
    });
  });
};

exports.timeFormatter = function(timeObj, clockType) {
  if (clockType === false) {
    if (timeObj.hours > 12) {
      timeObj.hours = timeObj.hours - 12;
    }
    if (timeObj.hours === 0) {
      timeObj.hours = 12;
    }
  }
  if (timeObj.mins < 10) {
    timeObj.mins = "0" + timeObj.mins;
  }
  return timeObj.hours + ":" + timeObj.mins;
};

exports.setupComponent = function(array, defaults) {
  var i, j, len, obj, ref;
  if (array === void 0) {
    array = [];
  }
  obj = {};
  ref = defaults.props;
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    if (array[i] !== void 0) {
      obj[i] = array[i];
    } else {
      obj[i] = defaults[i];
    }
  }
  return obj;
};

exports.emojiFormatter = function(string) {
  var arrayOfCodes, code, decoded, j, k, len, len1, unicodeFormat;
  unicodeFormat = "";
  if (string[0] === "E" || string[0] === "3" || string[0] === "2" || string[0] === "C") {
    arrayOfCodes = string.split(" ");
    for (j = 0, len = arrayOfCodes.length; j < len; j++) {
      code = arrayOfCodes[j];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  } else {
    arrayOfCodes = string.split(" ");
    unicodeFormat = "%F0%9F";
    for (k = 0, len1 = arrayOfCodes.length; k < len1; k++) {
      code = arrayOfCodes[k];
      unicodeFormat = unicodeFormat + "%" + code;
    }
  }
  decoded = decodeURIComponent(unicodeFormat);
  return decoded;
};

exports.buildEmojisObject = function() {
  var code, emoji, emojis, index, j, len, ref, results;
  emojis = [];
  ref = m.assets.emojiCodes;
  results = [];
  for (index = j = 0, len = ref.length; j < len; index = ++j) {
    code = ref[index];
    emoji = exports.emojiFormatter(code);
    results.push(emojis.push(emoji));
  }
  return results;
};

exports.toHHMMSS = function(int) {
  var hours, minutes, sec_num, seconds, timeString;
  sec_num = parseInt(int, 10);
  hours = Math.floor(sec_num / 3600);
  minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timeString = "";
  if (hours !== "00") {
    timeString = hours + ':' + minutes + ':' + seconds;
  } else {
    timeString = minutes + ':' + seconds;
  }
  return timeString;
};

exports.inky = function(setup) {
  var inkColor, inkCurve, inkOpacity, inkScale, inkStartScale, inkyEffect, moveToTap, startX, startY;
  startX = setup.layer.width / 2;
  startY = setup.layer.height / 2;
  inkColor = "#0A0A0A";
  inkStartScale = .1;
  inkScale = 3;
  inkCurve = "bezier-curve(.2, 0.4, 0.4, 1.0)";
  inkOpacity = 1;
  moveToTap = true;
  if (setup.moveToTap !== void 0) {
    moveToTap = setup.moveToTap;
  }
  if (setup.color !== void 0) {
    inkColor = m.color(setup.color);
  }
  if (setup.scale !== void 0) {
    inkScale = setup.scale;
  }
  if (setup.startScale !== void 0) {
    inkStartScale = setup.startScale;
  }
  if (setup.curve !== void 0) {
    inkCurve = setup.curve;
  }
  if (setup.opacity !== void 0) {
    inkOpacity = setup.opacity;
  }
  inkyEffect = function(event, layer) {
    var circle;
    if (moveToTap === true) {
      startX = event.offsetX;
      startY = event.offsetY;
      if (Utils.isChrome() === false && Utils.isTouch()) {
        startX = event.touchCenter.x - layer.x;
        startY = event.touchCenter.y - layer.y;
      }
    }
    circle = new Layer({
      backgroundColor: inkColor,
      midX: startX,
      midY: startY,
      superLayer: layer,
      borderRadius: m.utils.px(50),
      opacity: inkOpacity
    });
    circle.scale = inkStartScale;
    circle.animate({
      properties: {
        scale: inkScale,
        opacity: 0
      },
      curve: inkCurve,
      time: .5
    });
    return Utils.delay(1, function() {
      return circle.destroy();
    });
  };
  if (Utils.isChrome() && Utils.isTouch()) {
    setup.layer.on(Events.DoubleTap, function(event) {
      return inkyEffect(event, this);
    });
  }
  if (Utils.isChrome() === false && Utils.isTouch()) {
    setup.layer.on(Events.Tap, function(event) {
      return inkyEffect(event, this);
    });
  }
  if (Utils.isDesktop()) {
    return setup.layer.on(Events.TouchEnd, function(event) {
      return inkyEffect(event, this);
    });
  }
};


},{"material-kit":"material-kit"}],"material-kit-video":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  video: void 0,
  superLayer: void 0,
  height: m.px(205),
  width: m.px(100),
  backgroundColor: "transparent",
  autoplay: true,
  constraints: {
    top: 0
  },
  max: true,
  progressColor: "blue800",
  mute: false,
  loop: false,
  idleLimit: 3,
  showPlayStop: true,
  image: void 0
};

exports.defaults.props = Object.keys(exports.defaults);

exports.create = function(array) {
  var UIdelegate, UIset, ratio, setup, videoLayer;
  setup = m.utils.setupComponent(array, exports.defaults);
  if (setup.max) {
    ratio = 0.5625;
    setup.width = m.device.width;
    setup.height = setup.width * 0.5625;
  }
  videoLayer = new VideoLayer({
    superLayer: setup.superLayer,
    video: setup.video,
    height: setup.height,
    width: setup.width,
    backgroundColor: setup.backgroundColor,
    name: "video"
  });
  if (setup.image) {
    videoLayer.image = setup.image;
  }
  videoLayer.player.autoplay = setup.autoplay;
  videoLayer.player.muted = setup.mute;
  videoLayer.player.loop = setup.loop;
  if (setup.constraints) {
    videoLayer.constraints = setup.constraints;
    m.layout.set(videoLayer);
  }
  videoLayer.controls = new Layer({
    height: videoLayer.height,
    width: videoLayer.width,
    superLayer: videoLayer,
    backgroundColor: "transparent",
    name: "controls"
  });
  UIset = function() {
    var idleTime;
    videoLayer.isFullScreen = false;
    videoLayer.playstop = new Layer({
      backgroundColor: m.color("black"),
      superLayer: videoLayer.controls,
      borderRadius: m.px(50),
      height: m.px(50),
      width: m.px(50),
      opacity: .6,
      name: "play/stop"
    });
    if (setup.showPlayStop === false) {
      videoLayer.playstop.opacity = 0;
    }
    videoLayer.playstop.center();
    videoLayer.pause = new m.Icon({
      name: "pause",
      color: "white"
    });
    videoLayer.play = new m.Icon({
      name: "play_arrow",
      color: "white"
    });
    videoLayer.fullscreen = new m.Icon({
      name: "fullscreen",
      color: "white"
    });
    videoLayer.fullscreen.constraints = {
      bottom: 0,
      trailing: 10
    };
    videoLayer.fullscreenExit = new m.Icon({
      name: "fullscreen_exit",
      color: "white"
    });
    videoLayer.fullscreenExit.constraints = {
      bottom: 0,
      trailing: 10
    };
    m.layout.set(videoLayer.fullscreen);
    videoLayer.play.visible = false;
    videoLayer.fullscreenExit.visible = false;
    videoLayer.controls.addSubLayer(videoLayer.pause);
    videoLayer.controls.addSubLayer(videoLayer.play);
    videoLayer.controls.addSubLayer(videoLayer.fullscreen);
    videoLayer.controls.addSubLayer(videoLayer.fullscreenExit);
    videoLayer.pause.center();
    videoLayer.play.center();
    videoLayer.currentTime = new m.Text({
      text: m.utils.toHHMMSS(videoLayer.player.currentTime),
      color: "white",
      constraints: {
        bottom: 8,
        leading: 17
      },
      superLayer: videoLayer.controls,
      fontSize: 14,
      name: "currentTime"
    });
    videoLayer.endTime = new m.Text({
      text: m.utils.toHHMMSS(videoLayer.player.duration),
      color: "white",
      constraints: {
        bottomEdges: videoLayer.currentTime,
        trailing: [videoLayer.fullscreen, 10]
      },
      superLayer: videoLayer.controls,
      fontSize: 14,
      name: "endTime"
    });
    videoLayer.timebar = new Layer({
      superLayer: videoLayer.controls,
      backgroundColor: m.color("grey300"),
      name: "timebar",
      opacity: .7
    });
    videoLayer.timebar.constraints = {
      leading: [videoLayer.currentTime, 20],
      trailing: [videoLayer.endTime, 20],
      height: 3,
      verticalCenter: videoLayer.currentTime
    };
    m.layout.set(videoLayer.timebar);
    videoLayer.seeker = new Layer({
      backgroundColor: "transparent",
      superLayer: videoLayer.controls,
      name: "seeker"
    });
    videoLayer.seeker.constraints = {
      width: 50,
      height: 50,
      verticalCenter: videoLayer.currentTime
    };
    m.layout.set(videoLayer.seeker);
    videoLayer.seekerDot = new Layer({
      width: m.px(15),
      height: m.px(15),
      borderRadius: m.px(15),
      backgroundColor: m.color(setup.progressColor),
      superLayer: videoLayer.seeker,
      name: "seekerDot"
    });
    videoLayer.seekerDot.center();
    videoLayer.progressBar = new Layer({
      backgroundColor: m.color(setup.progressColor),
      width: 0,
      superLayer: videoLayer.controls,
      name: "progress bar"
    });
    videoLayer.progressBar.constraints = {
      height: 3,
      verticalCenter: videoLayer.timebar
    };
    m.layout.set({
      target: [videoLayer.seeker, videoLayer.progressBar]
    });
    videoLayer.seekerOffset = videoLayer.seeker.width / 2 - videoLayer.seekerDot.width / 2;
    videoLayer.seeker.x = videoLayer.timebar.x - videoLayer.seekerOffset;
    videoLayer.progressBar.x = videoLayer.timebar.x;
    idleTime = 0;
    Utils.interval(1, function() {
      idleTime++;
      if (idleTime > setup.idleLimit && videoLayer.player.paused === false && videoLayer.seeker.working !== true) {
        videoLayer.controls.animate({
          properties: {
            opacity: 0
          },
          time: .25
        });
        return videoLayer.playstop.visible = false;
      } else {
        videoLayer.controls.opacity = 1;
        return videoLayer.playstop.visible = true;
      }
    });
    videoLayer.controls.on(Events.TouchStart, function() {
      if (idleTime > setup.idleLimit) {
        return idleTime = 0;
      } else {
        return idleTime = 5;
      }
    });
    videoLayer.playstop.on(Events.TouchEnd, function() {
      if (videoLayer.player.paused) {
        videoLayer.play.visible = false;
        videoLayer.pause.visible = true;
        return videoLayer.player.play();
      } else {
        videoLayer.play.visible = true;
        videoLayer.pause.visible = false;
        return videoLayer.player.pause();
      }
    });
    videoLayer.fullscreen.on(Events.TouchEnd, function() {
      videoLayer.fullscreen.visible = false;
      videoLayer.fullscreenExit.visible = true;
      videoLayer.cacheProps = videoLayer.props;
      videoLayer.cacheAlign = videoLayer.constraints.align;
      if (videoLayer.onFullScreen) {
        videoLayer.onFullScreen();
      }
      idleTime = 0;
      videoLayer.backdrop = new Layer({
        backgroundColor: "black",
        width: m.device.width,
        height: m.device.height,
        name: "backdrop"
      });
      videoLayer.constraints.align = "center";
      videoLayer.animate({
        properties: {
          width: m.device.width,
          height: m.device.width * 0.5625
        },
        time: .5
      });
      m.layout.animate({
        target: videoLayer,
        time: .5
      });
      if (setup.superLayer) {
        videoLayer.backdrop.superLayer = setup.superLayer;
        videoLayer.backdrop.placeBehind(videoLayer);
      } else {
        videoLayer.backdrop.placeBehind(videoLayer);
      }
      return m.addToStack(videoLayer);
    });
    videoLayer.fullscreenExit.on(Events.TouchEnd, function() {
      videoLayer.fullscreen.visible = true;
      videoLayer.fullscreenExit.visible = false;
      idleTime = 0;
      return m.removeFromStack();
    });
    videoLayer.exit = function() {
      videoLayer.animate({
        properties: {
          x: videoLayer.cacheProps.x,
          y: videoLayer.cacheProps.y,
          width: videoLayer.cacheProps.width,
          height: videoLayer.cacheProps.height
        },
        time: .5
      });
      videoLayer.constraints.align = videoLayer.cacheAlign;
      videoLayer.backdrop.animate({
        properties: {
          opacity: 0
        },
        time: .5,
        delay: .2
      });
      Utils.delay(.7, function() {
        return videoLayer.backdrop.destroy();
      });
      videoLayer.fullscreen.visible = true;
      videoLayer.fullscreenExit.visible = false;
      if (videoLayer.onFullScreenExit) {
        return videoLayer.onFullScreenExit();
      }
    };
    videoLayer.seeker.draggable.enabled = true;
    videoLayer.seeker.draggable.speedY = 0;
    videoLayer.seeker.draggable.speedX = 1;
    videoLayer.seeker.draggable.momentum = false;
    videoLayer.seeker.draggable.bounce = false;
    videoLayer.seeker.on(Events.TouchStart, function() {
      videoLayer.seeker.scale = 1.2;
      return videoLayer.seeker.working = true;
    });
    videoLayer.seeker.on(Events.DragMove, function() {
      var newCT;
      videoLayer.seeker.working = true;
      if (videoLayer.seeker.x + videoLayer.seekerOffset < videoLayer.timebar.x) {
        videoLayer.seeker.x = videoLayer.timebar.x - videoLayer.seekerOffset;
      }
      if (videoLayer.seeker.maxX > videoLayer.timebar.maxX + videoLayer.seekerOffset) {
        videoLayer.seeker.maxX = videoLayer.timebar.maxX + videoLayer.seekerOffset;
      }
      newCT = videoLayer.player.duration * ((videoLayer.seeker.x + videoLayer.seekerOffset - videoLayer.timebar.x) / videoLayer.timebar.width);
      if (newCT < 0) {
        newCT = 0;
      }
      if (newCT > videoLayer.player.duration) {
        newCT = videoLayer.player.duration;
      }
      return m.utils.update(videoLayer.currentTime, [
        {
          text: m.utils.toHHMMSS(newCT)
        }
      ]);
    });
    return videoLayer.seeker.on(Events.DragEnd, function() {
      var et, newCT;
      videoLayer.seeker.scale = 1;
      videoLayer.seeker.working = false;
      et = videoLayer.player.duration;
      newCT = et * ((videoLayer.seeker.x + videoLayer.seekerOffset - videoLayer.timebar.x) / videoLayer.timebar.width);
      if (newCT < 0) {
        newCT = 0;
      }
      if (newCT > videoLayer.player.duration) {
        newCT = videoLayer.player.duration;
      }
      newCT = Math.round(newCT);
      return videoLayer.player.currentTime = newCT;
    });
  };
  UIdelegate = function() {
    var ct, et;
    ct = videoLayer.player.currentTime;
    et = videoLayer.player.duration;
    if (videoLayer.seeker.working) {

    } else {
      m.utils.update(videoLayer.currentTime, [
        {
          text: m.utils.toHHMMSS(videoLayer.player.currentTime)
        }
      ]);
      videoLayer.seeker.x = videoLayer.timebar.x + (videoLayer.timebar.width * ct / et) - videoLayer.seekerOffset;
      return videoLayer.progressBar.width = videoLayer.seeker.x + videoLayer.seekerOffset - videoLayer.timebar.x;
    }
  };
  videoLayer.player.addEventListener("loadeddata", UIset);
  videoLayer.player.addEventListener("timeupdate", UIdelegate);
  return videoLayer;
};


},{"material-kit":"material-kit"}],"material-kit":[function(require,module,exports){
var appbar, banner, bottomnav, button, card, dialog, icon, layout, library, nav, snackbar, stack, status, text, utils, video;

exports.layout = layout = require('material-kit-layout');

exports.lib = library = require('material-kit-library');

exports.utils = utils = require('material-kit-utils');

exports.stack = stack = require('material-kit-stack');

exports.device = utils.getDevice();

exports.assets = library.assets;

exports.color = function(colorString) {
  return exports.utils.color(colorString);
};

exports.dp = function(px) {
  return exports.utils.pt(px);
};

exports.px = function(dp) {
  return exports.utils.px(dp);
};

exports.stack = stack.stack;

exports.addToStack = function(layer) {
  return stack.addToStack(layer);
};

exports.removeFromStack = function(layer) {
  return stack.removeFromStack(layer);
};

appbar = require('material-kit-app-bar');

banner = require('material-kit-banner');

button = require('material-kit-button');

dialog = require('material-kit-dialog');

icon = require('material-kit-icon');

nav = require('material-kit-nav-bar');

snackbar = require('material-kit-snack-bar');

status = require('material-kit-status-bar');

text = require('material-kit-text');

video = require('material-kit-video');

bottomnav = require('material-kit-bottom-nav');

card = require('material-kit-cards');

exports.AppBar = appbar.create;

exports.Banner = banner.create;

exports.Button = button.create;

exports.Dialog = dialog.create;

exports.Icon = icon.create;

exports.NavBar = nav.create;

exports.SnackBar = snackbar.create;

exports.StatusBar = status.create;

exports.Text = text.create;

exports.Video = video.create;

exports.BottomNav = bottomnav.create;

exports.Card = card.create;


},{"material-kit-app-bar":"material-kit-app-bar","material-kit-banner":"material-kit-banner","material-kit-bottom-nav":"material-kit-bottom-nav","material-kit-button":"material-kit-button","material-kit-cards":"material-kit-cards","material-kit-dialog":"material-kit-dialog","material-kit-icon":"material-kit-icon","material-kit-layout":"material-kit-layout","material-kit-library":"material-kit-library","material-kit-nav-bar":"material-kit-nav-bar","material-kit-snack-bar":"material-kit-snack-bar","material-kit-stack":"material-kit-stack","material-kit-status-bar":"material-kit-status-bar","material-kit-text":"material-kit-text","material-kit-utils":"material-kit-utils","material-kit-video":"material-kit-video"}],"myModule":[function(require,module,exports){
var m,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

m = require('material-kit');

exports.Card = (function(superClass) {
  var card, text, thumbnail;

  extend(Card, superClass);

  function Card() {}

  card = new Layer({
    backgroundColor: "rgba(255,255,255,1)",
    shadowY: m.px(2),
    shadowColor: m.color("grey200")
  });

  card.constraints = {
    top: 10,
    leading: 16,
    trailing: 16,
    height: 300
  };

  m.layout.set();

  card["chevron-right"] = new m.Icon({
    name: "today",
    superLayer: card,
    constraints: {
      leading: 16,
      top: 16
    }
  });

  text = new m.Text({
    text: "Card Title",
    name: "Card Title",
    fontSize: 18,
    fontWeight: 400,
    constraints: {
      align: "left",
      top: 20,
      leading: [card["chevron-right"], 16],
      trailing: 16
    },
    superLayer: card
  });

  m.layout.set();

  thumbnail = new Layer({
    superLayer: card,
    image: Utils.randomImage(),
    clip: true
  });

  thumbnail.constraints = {
    leading: 0,
    trailing: 0,
    bottom: 60,
    top: [text, 16]
  };

  m.layout.set();

  card["subtext"] = new m.Text({
    text: "Lorem Ipsum dolor sit amet penatibus magnis",
    fontSize: 14,
    fontWeight: 300,
    superLayer: card,
    constraints: {
      top: [thumbnail, 16],
      leading: 8,
      trailing: 16
    }
  });

  card["footer"] = new Layer({
    backgroundColor: "rgba(255,255,255,1)",
    shadowY: m.px(2),
    shadowColor: m.color("grey200")
  });

  card["footer"].constraints = {
    top: [card, 1],
    trailing: 16,
    leading: 16,
    height: 40
  };

  m.layout.set();

  m.utils.inky({
    layer: thumbnail,
    color: 'red'
  });

  return Card;

})(Layer);


},{"material-kit":"material-kit"}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtYXBwLWJhci5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtYmFubmVyLmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1ib3R0b20tbmF2LmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1idXR0b24uY29mZmVlIiwiL1VzZXJzL2NocmlzdGlhbnBvc2NobWFubi9Eb2N1bWVudHMvZnJhbWVyLW1hdGVyaWFsLWtpdC9NYXRlcmlhbCBDYXJkIERlbW8uZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LWNhcmRzMi5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtY2FyZHMuY29mZmVlIiwiL1VzZXJzL2NocmlzdGlhbnBvc2NobWFubi9Eb2N1bWVudHMvZnJhbWVyLW1hdGVyaWFsLWtpdC9NYXRlcmlhbCBDYXJkIERlbW8uZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LWRpYWxvZy5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtaWNvbi5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtbGF5b3V0LmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1saWJyYXJ5LmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1uYXYtYmFyLmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1zbmFjay1iYXIuY29mZmVlIiwiL1VzZXJzL2NocmlzdGlhbnBvc2NobWFubi9Eb2N1bWVudHMvZnJhbWVyLW1hdGVyaWFsLWtpdC9NYXRlcmlhbCBDYXJkIERlbW8uZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LXN0YWNrLmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1zdGF0dXMtYmFyLmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC10ZXh0LmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC11dGlscy5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtdmlkZW8uY29mZmVlIiwiL1VzZXJzL2NocmlzdGlhbnBvc2NobWFubi9Eb2N1bWVudHMvZnJhbWVyLW1hdGVyaWFsLWtpdC9NYXRlcmlhbCBDYXJkIERlbW8uZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2xCLEtBQUEsRUFBTSxPQURZO0VBRWxCLElBQUEsRUFBSyxNQUZhO0VBSWxCLElBQUEsRUFBSyxRQUphO0VBS2xCLGVBQUEsRUFBZ0IsT0FMRTtFQU1sQixJQUFBLEVBQUssTUFOYTtFQU9sQixVQUFBLEVBQVcsT0FQTztFQVFsQixXQUFBLEVBQVksT0FSTTtFQVNsQixJQUFBLEVBQUssTUFUYTtFQVVsQixTQUFBLEVBQVUsTUFWUTtFQVdsQixPQUFBLEVBQVE7SUFBQyxLQUFBLEVBQU0sVUFBUDtJQUFtQixLQUFBLEVBQU0sQ0FBekI7R0FYVTtFQVlsQixZQUFBLEVB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RUFBSyxDQUFDLFNBQUQsRUFBWSxFQUFaLENBQUw7TUFDQSxPQUFBLEVBQVMsQ0FEVDtNQUVBLFFBQUEsRUFBVSxFQUZWO0tBTEQ7R0FEcUI7O0VBVXRCLElBQUssQ0FBQSxRQUFBLENBQUwsR0FBcUIsSUFBQSxLQUFBLENBQ3BCO0lBQUEsZUFBQSxFQUFpQixxQkFBakI7SUFDQSxPQUFBLEVBQVMsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBRFQ7SUFFQSxXQUFBLEVBQWEsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxTQUFSLENBRmI7R0FEb0I7O0VBS3JCLElBQUssQ0FBQSxRQUFBLENBQVMsQ0FBQyxXQUFmLEdBQ0M7SUFBQSxHQUFBLEVBQUssQ0FBQyxJQUFELEVBQU0sQ0FBTixDQUFMO0lBQ0EsUUFBQSxFQUFVLEVBRFY7SUFFQSxPQUFBLEVBQVMsRUFGVDtJQUdBLE1BQUEsRUFBUSxFQUhSOzs7RUFLRCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBQTs7RUFFQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FDQztJQUFBLEtBQUEsRUFBTyxTQUFQO0lBQ0EsS0FBQSxFQUFPLEtBRFA7R0FERDs7OztHQTlFMEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0dGl0bGU6XCJUaXRsZVwiXG5cdG1lbnU6dW5kZWZpbmVkXG5cblx0dHlwZTpcImFwcGJhclwiXG5cdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0dGFiczp1bmRlZmluZWRcblx0dGl0bGVDb2xvcjpcImJsYWNrXCJcblx0YWN0aW9uQ29sb3I6XCJibGFja1wiXG5cdHRhYnM6dW5kZWZpbmVkXG5cdHRhYnNDb2xvcjp1bmRlZmluZWRcblx0dGFic0luazp7Y29sb3I6XCJibHVlR3JleVwiLCBzY2FsZTo4fVxuXHR0YWJzQmFyQ29sb3I6XCJ5ZWxsb3dcIlxuXHR0YWJzQWx0Ontjb2xvcjp1bmRlZmluZWQsIG9wYWNpdHk6Ljd9XG5cdHRhYkljb25zOnVuZGVmaW5lZFxuXHRhY3Rpb25zOnVuZGVmaW5lZFxufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0YmFyID0gbmV3IExheWVyXG5cdFx0bmFtZTpcIkFwcCBCYXJcIlxuXHRcdGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4xMilcIlxuXHRcdHNoYWRvd0JsdXI6IG0ucHgoNClcblx0XHRzaGFkb3dZOiBtLnB4KDIpXG5cblx0YmFyLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0dG9wOjBcblx0XHRoZWlnaHQ6ODBcblxuXHRpZiBzZXR1cC50YWJzXG5cdFx0YmFyLmNvbnN0cmFpbnRzLmhlaWdodCA9IDEyOFxuXG5cdGJhckFyZWEgPSBuZXcgTGF5ZXIgc3VwZXJMYXllcjpiYXIsIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG5hbWU6XCJiYXJBcmVhXCJcblx0YmFyQXJlYS5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdGhlaWdodDo1NlxuXHRcdGJvdHRvbTowXG5cblx0aWYgc2V0dXAudGFicyAmJiBzZXR1cC50YWJzLmxlbmd0aCA+IDJcblx0XHRiYXJBcmVhLmNvbnN0cmFpbnRzLmJvdHRvbSA9IDQ4XG5cblx0aWYgc2V0dXAuc3VwZXJMYXllclxuXHRcdHNldHVwLnN1cGVyTGF5ZXIuYWRkU3ViTGF5ZXIoYmFyKVxuXG5cdG0ubGF5b3V0LnNldChbYmFyLCBiYXJBcmVhXSlcblxuXHRiYXIudHlwZSA9IHNldHVwLnR5cGVcblxuXHRmb3IgbGF5ZXIgaW4gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmxheWVyc1xuXHRcdGlmIGxheWVyLnR5cGUgPT0gXCJzdGF0dXNCYXJcIlxuXHRcdFx0QHN0YXR1c0JhciA9IGxheWVyXG5cdFx0XHRiYXIucGxhY2VCZWhpbmQoQHN0YXR1c0JhcilcblxuXHRpZiBzZXR1cC50aXRsZUNvbG9yID09IFwiYmxhY2tcIlxuXHRcdHNldHVwLnRpdGxlQ29sb3IgPSBtLnV0aWxzLmF1dG9Db2xvcihiYXIuYmFja2dyb3VuZENvbG9yKS50b0hleFN0cmluZygpXG5cblx0aWYgc2V0dXAuYWN0aW9uQ29sb3IgPT0gXCJibGFja1wiXG5cdFx0c2V0dXAuYWN0aW9uQ29sb3IgPSBtLnV0aWxzLmF1dG9Db2xvcihiYXIuYmFja2dyb3VuZENvbG9yKS50b0hleFN0cmluZygpXG5cblx0aWYgdHlwZW9mIHNldHVwLnRpdGxlID09IFwic3RyaW5nXCJcblx0XHR0aXRsZSA9IG5ldyBtLlRleHRcblx0XHRcdGNvbG9yOnNldHVwLnRpdGxlQ29sb3Jcblx0XHRcdGZvbnRXZWlnaHQ6NTAwXG5cdFx0XHRzdXBlckxheWVyOmJhckFyZWFcblx0XHRcdHRleHQ6c2V0dXAudGl0bGVcblx0XHRcdGZvbnRTaXplOjIwXG5cblx0bS51dGlscy5zcGVjaWFsQ2hhcih0aXRsZSlcblxuXG5cdHRpdGxlTGVhZGluZyA9IDE2XG5cdGlmIHNldHVwLm1lbnVcblx0XHRiYXIubWVudSA9IG5ldyBtLkljb25cblx0XHRcdG5hbWU6c2V0dXAubWVudVxuXHRcdFx0Y29sb3I6c2V0dXAuYWN0aW9uQ29sb3Jcblx0XHRcdHN1cGVyTGF5ZXI6YmFyQXJlYVxuXHRcdFx0Y29uc3RyYWludHM6e2xlYWRpbmc6MTYsIHZlcnRpY2FsQ2VudGVyOnRpdGxlfVxuXHRcdFx0Y2xpcDpmYWxzZVxuXHRcdHRpdGxlTGVhZGluZyA9IFtiYXIubWVudSwgMTZdXG5cblx0XHRtLnV0aWxzLmlua3lcblx0XHRcdGxheWVyOmJhci5tZW51XG5cdFx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRcdGNvbG9yOlwid2hpdGVcIlxuXHRcdFx0b3BhY2l0eTouNFxuXHRcdFx0c2NhbGU6Ljdcblx0XHRcdHN0YXJ0U2NhbGU6LjdcblxuXG5cdHRpdGxlLmNvbnN0cmFpbnRzID1cblx0XHRib3R0b206MTJcblx0XHRsZWFkaW5nOnRpdGxlTGVhZGluZ1xuXG5cdGlmIHNldHVwLmxlZnRBY3Rpb25cblx0XHR0aXRsZS5jb25zdHJhaW50cy5sZWFkaW5nID0gNzNcblxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbdGl0bGVdXG5cblx0YWN0aW9uc0FycmF5ID0gW11cblx0aWYgc2V0dXAuYWN0aW9uc1xuXHRcdGZvciBhY3QsIGkgaW4gc2V0dXAuYWN0aW9uc1xuXHRcdFx0aWYgaSA9PSAwXG5cdFx0XHRcdGljb24gPSBuZXcgbS5JY29uXG5cdFx0XHRcdFx0bmFtZTphY3Rcblx0XHRcdFx0XHRzdXBlckxheWVyOmJhckFyZWFcblx0XHRcdFx0XHRjb25zdHJhaW50czp7dHJhaWxpbmc6MjQsIHZlcnRpY2FsQ2VudGVyOnRpdGxlfVxuXHRcdFx0XHRcdGNvbG9yOnNldHVwLmFjdGlvbkNvbG9yXG5cdFx0XHRcdFx0Y2xpcDpmYWxzZVxuXHRcdFx0XHRhY3Rpb25zQXJyYXkucHVzaCBpY29uXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGljb24gPSBuZXcgbS5JY29uXG5cdFx0XHRcdFx0bmFtZTphY3Rcblx0XHRcdFx0XHRzdXBlckxheWVyOmJhckFyZWFcblx0XHRcdFx0XHRjb25zdHJhaW50czp7dHJhaWxpbmc6W2FjdGlvbnNBcnJheVtpIC0gMV0sIDI0XSwgdmVydGljYWxDZW50ZXI6dGl0bGV9XG5cdFx0XHRcdFx0Y29sb3I6c2V0dXAuYWN0aW9uQ29sb3Jcblx0XHRcdFx0XHRjbGlwOmZhbHNlXG5cdFx0XHRcdGFjdGlvbnNBcnJheS5wdXNoIGljb25cblxuXHRcdGZvciBhY3QgaW4gYWN0aW9uc0FycmF5XG5cdFx0XHRtLnV0aWxzLmlua3lcblx0XHRcdFx0bGF5ZXI6YWN0XG5cdFx0XHRcdG1vdmVUb1RhcDpmYWxzZVxuXHRcdFx0XHRjb2xvcjpcIndoaXRlXCJcblx0XHRcdFx0b3BhY2l0eTouNFxuXHRcdFx0XHRzY2FsZTouOFxuXHRcdFx0XHRzdGFydFNjYWxlOi43XG5cblxuXHRpZiBzZXR1cC50YWJzICYmIHNldHVwLnRhYnMubGVuZ3RoID4gMlxuXG5cdFx0aGFuZGxlVGFiU3RhdGVzID0gKGJhciwgbGF5ZXIpIC0+XG5cdFx0XHR0YWJzQXJyYXkgPSBPYmplY3Qua2V5cyhiYXIudGFicylcblx0XHRcdGFjdGl2ZVRhYkluZGV4ID0gdW5kZWZpbmVkXG5cdFx0XHRmb3IgdCwgaSBpbiB0YWJzQXJyYXlcblx0XHRcdFx0dGFiID0gYmFyLnRhYnNbdF1cblxuXHRcdFx0XHRpZiB0YWIgPT0gYmFyLmFjdGl2ZVRhYlxuXHRcdFx0XHRcdGFjdGl2ZVRhYkluZGV4ID0gaVxuXHRcdFx0XHRcdGJhci52aWV3c1t0XS5hbmltYXRlXG5cdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOih4OjApXG5cdFx0XHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0XHRcdHRhYi5sYWJlbC5vcGFjaXR5ID0gMVxuXHRcdFx0XHRcdHRhYi5sYWJlbC5jb2xvciA9IHNldHVwLnRhYnNDb2xvclxuXHRcdFx0XHRcdGJhci5hY3RpdmVCYXIuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0cHJvcGVydGllczooeDpsYXllci54KVxuXHRcdFx0XHRcdFx0dGltZTouMjVcblx0XHRcdFx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0XHRcdFx0bS51dGlscy51cGRhdGUodGl0bGUsIFt7dGV4dDptLnV0aWxzLmNhcGl0YWxpemUoYmFyLmFjdGl2ZVRhYi5sYWJlbC5uYW1lKX1dKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0aWYgYWN0aXZlVGFiSW5kZXggPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRiYXIudmlld3NbdF0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOih4Om0uZGV2aWNlLndpZHRoICogLTEpXG5cdFx0XHRcdFx0XHRcdHRpbWU6LjI1XG5cdFx0XHRcdFx0XHRcdGN1cnZlOlwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRiYXIudmlld3NbdF0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOih4Om0uZGV2aWNlLndpZHRoKVxuXHRcdFx0XHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0XHRcdFx0XHRjdXJ2ZTpcImN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKVwiXG5cblx0XHRcdFx0XHRvcGFjaXR5ID0gMVxuXHRcdFx0XHRcdGNvbG9yID0gdGFiLmxhYmVsLmNvbG9yXG5cdFx0XHRcdFx0aWYgc2V0dXAudGFic0FsdC5vcGFjaXR5ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0b3BhY2l0eSA9IHNldHVwLnRhYnNBbHQub3BhY2l0eVxuXG5cdFx0XHRcdFx0aWYgc2V0dXAudGFic0FsdC5jb2xvciAhPSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdGNvbG9yID0gc2V0dXAudGFic0FsdC5jb2xvclxuXG5cdFx0XHRcdFx0dGFiLmxhYmVsLm9wYWNpdHkgPSBvcGFjaXR5XG5cdFx0XHRcdFx0dGFiLmxhYmVsLmNvbG9yID0gY29sb3JcblxuXHRcdHRhYnNBY3RpdmVCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdGhlaWdodDptLnB4KDIpXG5cdFx0XHR3aWR0aDptLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOm0uY29sb3Ioc2V0dXAudGFic0JhckNvbG9yKVxuXHRcdFx0c3VwZXJMYXllcjpiYXJcblx0XHR0YWJzQWN0aXZlQmFyLmNvbnN0cmFpbnRzID1cblx0XHRcdGJvdHRvbTowXG5cdFx0YmFyLmFjdGl2ZUJhciA9IHRhYnNBY3RpdmVCYXJcblxuXHRcdGJhci50YWJzID0ge31cblx0XHRiYXIudmlld3MgPSB7fVxuXHRcdGlmIHNldHVwLnRhYnMubGVuZ3RoIDwgNVxuXHRcdFx0Zm9yIHQsIGkgaW4gc2V0dXAudGFic1xuXHRcdFx0XHR2aWV3ID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTpcIlZpZXcgXCIgKyB0XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdFx0XHR2aWV3LmNvbnN0cmFpbnRzID1cblx0XHRcdFx0XHR0b3A6YmFyXG5cdFx0XHRcdFx0Ym90dG9tOjBcblx0XHRcdFx0XHR3aWR0aDptLmRwKG0uZGV2aWNlLndpZHRoKVxuXHRcdFx0XHRiYXIudmlld3NbdF0gPSB2aWV3XG5cdFx0XHRcdGlmIGkgPiAwXG5cdFx0XHRcdFx0dmlldy54ID0gbS5kZXZpY2Uud2lkdGhcblx0XHRcdFx0dGFiID0gbmV3IExheWVyXG5cdFx0XHRcdFx0d2lkdGg6bS5kZXZpY2Uud2lkdGgvc2V0dXAudGFicy5sZW5ndGhcblx0XHRcdFx0XHRoZWlnaHQ6bS5weCg0OClcblx0XHRcdFx0XHR4OihtLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aCkgKiBpXG5cdFx0XHRcdFx0c3VwZXJMYXllcjpiYXJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRcdFx0Y2xpcDp0cnVlXG5cdFx0XHRcdFx0bmFtZTpcInRhYiBcIlxuXHRcdFx0XHR0YWIuY29uc3RyYWludHMgPVxuXHRcdFx0XHRcdGJvdHRvbTowXG5cdFx0XHRcdG0ubGF5b3V0LnNldCh0YWIpXG5cdFx0XHRcdGlmIHNldHVwLnRhYnNDb2xvciA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRzZXR1cC50YWJzQ29sb3IgPSBtLnV0aWxzLmF1dG9Db2xvcihiYXIuYmFja2dyb3VuZENvbG9yKS50b0hleFN0cmluZygpXG5cdFx0XHRcdGxhYmVsID0gXCJcIlxuXHRcdFx0XHRpZiBzZXR1cC50YWJJY29uc1xuXHRcdFx0XHRcdGljb24gPSBzZXR1cC50YWJJY29uc1tpXVxuXHRcdFx0XHRcdGxhYmVsID0gbmV3IG0uSWNvblxuXHRcdFx0XHRcdFx0bmFtZTppY29uXG5cdFx0XHRcdFx0XHRzdXBlckxheWVyOnRhYlxuXHRcdFx0XHRcdFx0Y29sb3I6c2V0dXAudGFic0NvbG9yXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50czp7YWxpZ246XCJjZW50ZXJcIn1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGxhYmVsID0gbmV3IG0uVGV4dFxuXHRcdFx0XHRcdFx0c3VwZXJMYXllcjp0YWJcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnRzOnthbGlnbjpcImNlbnRlclwifVxuXHRcdFx0XHRcdFx0dGV4dDp0XG5cdFx0XHRcdFx0XHR0ZXh0VHJhbnNmb3JtOidVcHBlcmNhc2UnXG5cdFx0XHRcdFx0XHRmb250U2l6ZToxNFxuXHRcdFx0XHRcdFx0Y29sb3I6c2V0dXAudGFic0NvbG9yXG5cdFx0XHRcdGxhYmVsLm5hbWUgPSB0XG5cblx0XHRcdFx0dGFiLmxhYmVsID0gbGFiZWxcblxuXHRcdFx0XHRzZXR1cC50YWJzSW5rW1wibGF5ZXJcIl0gPSB0YWJcblx0XHRcdFx0bS51dGlscy5pbmt5KHNldHVwLnRhYnNJbmspXG5cdFx0XHRcdGJhci50YWJzW3RdID0gdGFiXG5cblx0XHRcdFx0dGFiLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdFx0XHRiYXIuYWN0aXZlVGFiID0gQFxuXHRcdFx0XHRcdGhhbmRsZVRhYlN0YXRlcyhiYXIsIEApXG5cdGlmIHNldHVwLnRhYnNcblx0XHRpZiBzZXR1cC50YWJzLmxlbmd0aCA+IDJcblx0XHRcdGJhci5hY3RpdmVUYWIgPSBiYXIudGFic1tzZXR1cC50YWJzWzBdXVxuXHRcdFx0aGFuZGxlVGFiU3RhdGVzKGJhciwgYmFyLmFjdGl2ZVRhYilcblx0YmFyLnRpdGxlID0gdGl0bGVcblxuXG5cblx0cmV0dXJuIGJhclxuIiwiIyBCYW5uZXJcbm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGFwcDogXCJBcHBcIlxuXHR0aXRsZTpcIlRpdGxlXCJcblx0bWVzc2FnZTpcIk1lc3NhZ2VcIlxuXHRhY3Rpb246XCJBY3Rpb25cIlxuXHR0aW1lOlwi4oCiIG5vd1wiXG5cdGljb246dW5kZWZpbmVkXG5cdGR1cmF0aW9uOjdcblx0YW5pbWF0ZWQ6dHJ1ZVxufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0YmFubmVyID0gbmV3IExheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXHRcdG5hbWU6XCJiYW5uZXJcIlxuXHRcdHNoYWRvd0NvbG9yOiBcInJnYmEoMCwwLDAsLjI0KVwiXG5cdFx0c2hhZG93Qmx1cjogbS5weCgyKVxuXHRcdHNoYWRvd1k6IG0ucHgoMilcblx0YmFubmVyLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0dG9wOjBcblx0XHRoZWlnaHQ6NzRcblxuXHQjIERpZmZlcmVudCBwb3NpdGlvbmluZ3MgZm9yIGVhY2ggZGV2aWNlXG5cdHN3aXRjaCBtLmRldmljZS5uYW1lXG5cdFx0d2hlbiBcImlwYWRcIlxuXHRcdFx0QGxlYWRpbmdJY29uID0gMjAwXG5cdFx0XHRAdG9wSWNvbiA9IDE1XG5cdFx0XHRAdG9wVGl0bGUgPSAxMVxuXHRcdHdoZW4gXCJpcGFkLXByb1wiXG5cdFx0XHRAbGVhZGluZ0ljb24gPSAxOTJcblx0XHRcdEB0b3BJY29uID0gMTJcblx0XHRcdEB0b3BUaXRsZSA9IDlcblx0XHR3aGVuIFwiaXBob25lLTZzLXBsdXNcIlxuXHRcdFx0QGxlYWRpbmdJY29uID0gMTVcblx0XHRcdEB0b3BJY29uID0gMTJcblx0XHRcdEB0b3BUaXRsZSA9IDEwXG5cdFx0ZWxzZVxuXHRcdFx0QGxlYWRpbmdJY29uID0gMTVcblx0XHRcdEB0b3BJY29uID0gOFxuXHRcdFx0QHRvcFRpdGxlID0gNlxuXG5cdGlmIHNldHVwLmljb24gPT0gdW5kZWZpbmVkXG5cdFx0c2V0dXAuaWNvbiA9IG5ldyBMYXllciBzdXBlckxheWVyOmJhbm5lclxuXHRcdHNldHVwLmljb24uc3R5bGVbXCJiYWNrZ3JvdW5kXCJdID0gXCJsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgIzY3RkY4MSAwJSwgIzAxQjQxRiAxMDAlKVwiXG5cdGVsc2Vcblx0XHRiYW5uZXIuYWRkU3ViTGF5ZXIoc2V0dXAuaWNvbilcblxuXHRzZXR1cC5pY29uLmJvcmRlclJhZGl1cyA9IG0udXRpbHMucHgoNC41KVxuXHRzZXR1cC5pY29uLm5hbWUgPSBcImljb25cIlxuXHRzZXR1cC5pY29uLmNvbnN0cmFpbnRzID1cblx0XHRoZWlnaHQ6MTZcblx0XHR3aWR0aDoxNlxuXHRcdGxlYWRpbmc6QGxlYWRpbmdJY29uXG5cdFx0dG9wOkB0b3BJY29uXG5cblx0YXBwID0gbmV3IG0uVGV4dCBzdHlsZTpcImFwcFwiLCB0ZXh0OnNldHVwLmFwcCwgY29sb3I6XCJibHVlXCIsIGZvbnRXZWlnaHQ6XCJtZWRpdW1cIiwgZm9udFNpemU6MTEsIHN1cGVyTGF5ZXI6YmFubmVyLCBuYW1lOlwidGl0bGVcIlxuXHRhcHAuY29uc3RyYWludHMgPVxuXHRcdHZlcnRpY2FsQ2VudGVyOnNldHVwLmljb25cblx0XHRsZWFkaW5nOltzZXR1cC5pY29uLCA1XVxuXHR0aXRsZSA9IG5ldyBtLlRleHQgc3R5bGU6XCJ0aXRsZVwiLCB0ZXh0OnNldHVwLnRpdGxlLCBjb2xvcjpcImJsYWNrXCIsIGZvbnRTaXplOjEzLCBzdXBlckxheWVyOmJhbm5lciwgbmFtZTpcInRpdGxlXCJcblx0dGl0bGUuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmdFZGdlczpzZXR1cC5pY29uXG5cdFx0dG9wOltzZXR1cC5pY29uLCA3XVxuXG5cdG1lc3NhZ2UgPSBuZXcgbS5UZXh0IHN0eWxlOlwidGl0bGVcIiwgdGV4dDpzZXR1cC5tZXNzYWdlLCBjb2xvcjpcImdyZXlcIiwgZm9udFNpemU6MTMsIHN1cGVyTGF5ZXI6YmFubmVyLCBuYW1lOlwidGl0bGVcIlxuXHRtZXNzYWdlLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nRWRnZXM6c2V0dXAuaWNvblxuXHRcdHRvcDpbdGl0bGUsIDVdXG5cblx0dGltZSA9IG5ldyBtLlRleHQgc3R5bGU6XCJ0aW1lXCIsIHRleHQ6c2V0dXAudGltZSwgY29sb3I6XCJncmV5XCIsIGZvbnRTaXplOjExLCBzdXBlckxheWVyOmJhbm5lciwgbmFtZTpcInRpbWVcIlxuXHR0aW1lLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOlthcHAsIDNdXG5cdFx0Ym90dG9tRWRnZXM6IGFwcFxuXG5cdG0ubGF5b3V0LnNldCgpXG5cdG0udXRpbHMuYmdCbHVyKGJhbm5lcilcblxuXHQjIyBCYW5uZXIgRHJhZyBzZXR0aW5nc1xuXHRiYW5uZXIuZHJhZ2dhYmxlID0gdHJ1ZVxuXHRiYW5uZXIuZHJhZ2dhYmxlLmhvcml6b250YWwgPSBmYWxzZVxuXHRiYW5uZXIuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID1cblx0XHR5OjBcblxuXHRiYW5uZXIuZHJhZ2dhYmxlLmJvdW5jZU9wdGlvbnMgPVxuXHQgICAgZnJpY3Rpb246IDI1XG5cdCAgICB0ZW5zaW9uOiAyNTBcblxuXHRiYW5uZXIub24gRXZlbnRzLkRyYWdFbmQsIC0+XG5cdFx0aWYgYmFubmVyLm1heFkgPCBtLnV0aWxzLnB4KDY4KVxuXHRcdFx0YmFubmVyLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczoobWF4WTowKVxuXHRcdFx0XHR0aW1lOi4xNVxuXHRcdFx0XHRjdXJ2ZTpcImVhc2UtaW4tb3V0XCJcblx0XHRcdFV0aWxzLmRlbGF5IC4yNSwgLT5cblx0XHRcdFx0YmFubmVyLmRlc3Ryb3koKVxuXG5cdCMgQnVmZmVyIHRoYXQgc2l0cyBhYm92ZSB0aGUgYmFubmVyXG5cdGJhbm5lckJ1ZmZlciA9IG5ldyBMYXllciBtYXhZOjAsIG5hbWU6XCJidWZmZXJcIiwgYmFja2dyb3VuZENvbG9yOlwiIzFCMUIxQ1wiLCBvcGFjaXR5Oi45LCBzdXBlckxheWVyOmJhbm5lciwgd2lkdGg6bS5kZXZpY2Uud2lkdGgsIG1heFk6YmFubmVyLnksIGhlaWdodDptLmRldmljZS5oZWlnaHRcblx0bS51dGlscy5iZ0JsdXIoYmFubmVyQnVmZmVyKVxuXG5cdCMgQW5pbWF0ZS1pblxuXHRpZiBzZXR1cC5hbmltYXRlZCA9PSB0cnVlXG5cdFx0YmFubmVyLnkgPSAwIC0gYmFubmVyLmhlaWdodFxuXHRcdGJhbm5lci5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOih5OjApXG5cdFx0XHR0aW1lOi4yNVxuXHRcdFx0Y3VydmU6XCJzcHJpbmcoNDAwLDIwLDApXCJcblxuXHQjIEFuaW1hdGUtb3V0XG5cdGlmIHNldHVwLmR1cmF0aW9uXG5cdFx0VXRpbHMuZGVsYXkgc2V0dXAuZHVyYXRpb24sIC0+XG5cdFx0XHRiYW5uZXIuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihtYXhZOjApXG5cdFx0XHRcdHRpbWU6LjI1XG5cdFx0XHRcdGN1cnZlOlwiZWFzZS1pbi1vdXRcIlxuXHRcdFV0aWxzLmRlbGF5IHNldHVwLmR1cmF0aW9uICsgLjI1LCAtPlxuXHRcdFx0YmFubmVyLmRlc3Ryb3koKVxuXG5cdCMgRXhwb3J0IEJhbm5lclxuXHRiYW5uZXIuaWNvbiA9IHNldHVwLmljb25cblx0YmFubmVyLmFwcCA9IGFwcFxuXHRiYW5uZXIudGl0bGUgPSB0aXRsZVxuXHRiYW5uZXIubWVzc2FnZSA9IG1lc3NhZ2Vcblx0cmV0dXJuIGJhbm5lclxuIiwiIyMgQWxsb3dzIHlvdSB0byB1c2UgYWxsIHRoZSBNYXRlcmlhbCBLaXQgY29tcG9uZW50cyAmIGxvZ2ljXG5tID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6IFwiZ3JleTEwMFwiXG4gIHRhYnNDb2xvcjogXCJncmV5OTAwXCJcbiAgdGFiczogdW5kZWZpbmVkXG4gIHRhYkljb25zOiB1bmRlZmluZWRcbiAgbGFiZWxzOiB0cnVlXG4gIGluYWN0aXZlVGFiT3BhY2l0eTogLjZcbn1cblxuIyMgQ3JlYXRlcyBhIHByb3BlcnR5IGxpc3RcbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblxuICAjIyBDcmVhdGVzIGEgc2V0dXAgb2JqZWN0IHRoYXQgaGFzIGRlZmF1bHRzICsgYW55IGN1c3RvbSBwcm9wcy5cbiAgc2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXG4gICMgQ3JlYXRlIGJvdHRvbSBuYXZcbiAgYm90dG9tTmF2ID0gbmV3IExheWVyXG4gICAgbmFtZTogXCJib3R0b21OYXZcIlxuICAgIGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4xMilcIlxuXHRcdHNoYWRvd0JsdXI6IG0ucHgoNClcblx0XHRzaGFkb3dZOiAtbS5weCgyKVxuICBib3R0b21OYXYuY29uc3RyYWludHMgPVxuICAgIGxlYWRpbmc6IDBcbiAgICB0cmFpbGluZzogMFxuICAgIGJvdHRvbTogNDZcbiAgICBoZWlnaHQ6IDU2XG4gIG0ubGF5b3V0LnNldChib3R0b21OYXYpXG5cbiAgIyBIYW5kbGUgdGFicyBzdGF0ZXNcbiAgaGFuZGxlVGFiU3RhdGVzID0gKGJvdHRvbU5hdiwgbGF5ZXIpIC0+XG5cbiAgICAjIFB1dCB0YWIgb2JqZWN0cyBpbnRvIGFycmF5XG4gICAgdGFic0FycmF5ID0gT2JqZWN0LmtleXMoYm90dG9tTmF2LnRhYnMpXG4gICAgYWN0aXZlVGFiSW5kZXggPSB1bmRlZmluZWRcblxuICAgIGZvciB0LCBpIGluIHRhYnNBcnJheVxuICAgICAgdGFiID0gYm90dG9tTmF2LnRhYnNbdF1cblxuICAgICAgIyBJZiB0aGlzIGlzIGlzIGFjdGl2ZSB0YWJcbiAgICAgIGlmIHRhYiA9PSBib3R0b21OYXYuYWN0aXZlVGFiXG5cbiAgICAgICAgYWN0aXZlVGFiSW5kZXggPSBpXG4gICAgICAgIHRhYi5pY29uLm9wYWNpdHkgPSAxXG4gICAgICAgIHRhYi5pY29uLmNvbnN0cmFpbnRzLnRvcCA9IDZcbiAgICAgICAgdGFiLmxhYmVsLm9wYWNpdHkgPSAxXG4gICAgICAgIHRhYi5sYWJlbC5jb25zdHJhaW50cy50b3AgPSB0YWIuaWNvblxuXG4gICAgICAgIGJvdHRvbU5hdi52aWV3c1t0XS5hbmltYXRlXG4gICAgICAgICAgcHJvcGVydGllczooeDowKVxuICAgICAgICAgIHRpbWU6LjI1XG5cbiAgICAgIGVsc2VcblxuICAgICAgICB0YWIuaWNvbi5vcGFjaXR5ID0gc2V0dXAuaW5hY3RpdmVUYWJPcGFjaXR5XG4gICAgICAgIHRhYi5pY29uLmNvbnN0cmFpbnRzLnRvcCA9IDE2XG4gICAgICAgIHRhYi5sYWJlbC5vcGFjaXR5ID0gMFxuICAgICAgICB0YWIubGFiZWwuY29uc3RyYWludHMudG9wID0gMjFcblxuICAgICAgICBpZiBhY3RpdmVUYWJJbmRleCA9PSB1bmRlZmluZWRcbiAgICAgICAgICBib3R0b21OYXYudmlld3NbdF0uYW5pbWF0ZVxuICAgICAgICAgICAgcHJvcGVydGllczooeDptLmRldmljZS53aWR0aCAqIC0xKVxuICAgICAgICAgICAgdGltZTouMjVcbiAgICAgICAgICAgIGN1cnZlOlwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGJvdHRvbU5hdi52aWV3c1t0XS5hbmltYXRlXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOih4Om0uZGV2aWNlLndpZHRoKVxuICAgICAgICAgICAgdGltZTouMjVcbiAgICAgICAgICAgIGN1cnZlOlwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcblxuICAgICAgbS5sYXlvdXQuYW5pbWF0ZSh0aW1lOiAuMSlcblxuICAjIFByZXBhcmUgb2JqZWN0cyB0byBwdXQgdGFicyBhbmQgdmlld3MgaW50b1xuICBib3R0b21OYXYudGFicyA9IHt9XG4gIGJvdHRvbU5hdi52aWV3cyA9IHt9XG5cbiAgIyBDcmVhdGUgdGFicyBpZiB5b3UgaGF2ZSBubyBtb3JlIHRoYW4gNSBkZXN0aW5hdGlvbnNcbiAgaWYgc2V0dXAudGFicy5sZW5ndGggPCA2XG4gICAgICBmb3IgdCwgaSBpbiBzZXR1cC50YWJzXG5cbiAgICAgICAgIyBDcmVhdGUgdmlld3NcbiAgICAgICAgdmlldyA9IG5ldyBMYXllclxuICAgICAgICAgIG5hbWU6IFwiVmlld1wiICsgdFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgICAgIHZpZXcuY29uc3RyYWludHMgPVxuICAgICAgICAgIGJvdHRvbTogYm90dG9tTmF2XG4gICAgICAgICAgdG9wOiAwXG4gICAgICAgICAgd2lkdGg6bS5kcChtLmRldmljZS53aWR0aClcbiAgICAgICAgdmlldy5zZW5kVG9CYWNrKClcblxuICAgICAgICAjIFB1dCB2aWV3IGludG8gb2JqZWN0XG4gICAgICAgIGJvdHRvbU5hdi52aWV3c1t0XSA9IHZpZXdcblxuICAgICAgICAjIEFsbCBvdGhlciB2aWV3cyBleGNlcHQgb2YgZmlyc3QgdG8gdGhlIHJpZ2h0XG4gICAgICAgIGlmIGkgPiAwXG4gICAgICAgICAgdmlldy54ID0gbS5kZXZpY2Uud2lkdGhcblxuICAgICAgICAjIENyZWF0ZSB0YWIgY29udGFpbmVyc1xuICAgICAgICB0YWIgPSBuZXcgTGF5ZXJcbiAgICAgICAgICB3aWR0aDptLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aFxuICAgICAgICAgIGhlaWdodDogbS5weCg1NilcbiAgICAgICAgICB4OihtLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aCkgKiBpXG4gICAgICAgICAgc3VwZXJMYXllcjogYm90dG9tTmF2XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiAgICAgICAgICBjbGlwOiB0cnVlXG4gICAgICAgICAgbmFtZTogXCJ0YWJcIiArIHRcbiAgICAgICAgbS5sYXlvdXQuc2V0KHRhYilcblxuICAgICAgICAjIENyZWF0ZSBpY29uc1xuICAgICAgICBpY29uTmFtZSA9IHNldHVwLnRhYkljb25zW2ldXG4gICAgICAgIGljb24gPSBuZXcgbS5JY29uXG4gICAgICAgICAgbmFtZTogaWNvbk5hbWVcbiAgICAgICAgICBzdXBlckxheWVyOiB0YWJcbiAgICAgICAgICBjb2xvcjogc2V0dXAudGFic0NvbG9yXG4gICAgICAgICAgY29uc3RyYWludHM6IHt0b3A6IDE2fVxuICAgICAgICBpY29uLm9wYWNpdHkgPSBzZXR1cC5pbmFjdGl2ZVRhYk9wYWNpdHlcbiAgICAgICAgaWNvbi5jZW50ZXJYKClcblxuICAgICAgICAjIENyZWF0ZSBsYWJlbHNcbiAgICAgICAgbGFiZWwgPSBuZXcgbS5UZXh0XG4gICAgICAgICAgbmFtZTogdFxuICAgICAgICAgIHN1cGVyTGF5ZXI6IHRhYlxuICAgICAgICAgIHRleHQ6IHRcbiAgICAgICAgICBmb250U2l6ZTogMTRcbiAgICAgICAgICBjb2xvcjogc2V0dXAudGFic0NvbG9yXG4gICAgICAgICAgY29uc3RyYWludHM6IHt0b3A6IDIxfVxuICAgICAgICBsYWJlbC5vcGFjaXR5ID0gMFxuICAgICAgICBsYWJlbC5jZW50ZXJYKClcblxuICAgICAgICAjIFB1dCB0aGlzIGljb24gYW5kIGxhYmVsIGFzIGEgcHJvcGVydHlcbiAgICAgICAgdGFiLmljb24gPSBpY29uXG4gICAgICAgIHRhYi5sYWJlbCA9IGxhYmVsXG4gICAgICAgICMgUHV0IHRhYiBpbnRvIHRhYnMgb2JqZWN0XG4gICAgICAgIGJvdHRvbU5hdi50YWJzW3RdID0gdGFiXG5cbiAgICAgICAgdGFiLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgICAgICBib3R0b21OYXYuYWN0aXZlVGFiID0gQFxuICAgICAgICAgIGhhbmRsZVRhYlN0YXRlcyhib3R0b21OYXYsIEApXG5cbiAgYm90dG9tTmF2LmFjdGl2ZVRhYiA9IGJvdHRvbU5hdi50YWJzW3NldHVwLnRhYnNbMF1dXG4gIGhhbmRsZVRhYlN0YXRlcyhib3R0b21OYXYsIGJvdHRvbU5hdi5hY3RpdmVUYWIpXG5cbiAgcmV0dXJuIGJvdHRvbU5hdlxuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0XHR0ZXh0OlwidGV4dFwiXG5cdFx0dHlwZTpcImZsYXRcIlxuXHRcdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0XHRjb2xvcjpcInRlYWwzMDBcIlxuXHRcdG5hbWU6XCJidXR0b25cIlxuXHRcdHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG5cdFx0Y29uc3RyYWludHM6dW5kZWZpbmVkXG5cdFx0aWNvbjpcInN0YXJcIlxuXHRcdGNsaXA6dHJ1ZVxuXHRcdGluazp1bmRlZmluZWRcblx0fVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblxuXHRidXR0b24gPSBuZXcgTGF5ZXJcblx0XHRuYW1lOnNldHVwLm5hbWVcblx0XHRjbGlwOnNldHVwLmNsaXBcblxuXHRpZiBzZXR1cC5zdXBlckxheWVyXG5cdFx0c2V0dXAuc3VwZXJMYXllci5hZGRTdWJMYXllcihidXR0b24pXG5cblx0YnV0dG9uLnR5cGUgPSBzZXR1cC50eXBlXG5cdHN3aXRjaCBzZXR1cC50eXBlXG5cdFx0d2hlbiBcImZsb2F0aW5nXCJcblx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cyA9XG5cdFx0XHRcdCB3aWR0aDo1NlxuXHRcdFx0XHQgaGVpZ2h0OjU2XG5cdFx0XHRcdCBib3R0b206NjRcblx0XHRcdFx0IHRyYWlsaW5nOjE3XG5cdFx0XHRpZiBtLmRldmljZS5zY2FsZSA8IDRcblx0XHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzLndpZHRoID0gNjRcblx0XHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzLmhlaWdodCA9IDY0XG5cdFx0XHRidXR0b24uYm9yZGVyUmFkaXVzID0gbS5weCgzMilcblx0XHRcdGJ1dHRvbi5zaGFkb3dDb2xvciA9IFwicmdiYSgwLDAsMCwuMTIpXCJcblx0XHRcdGJ1dHRvbi5zaGFkb3dZID0gbS5weCgyKVxuXHRcdFx0YnV0dG9uLnNoYWRvd0JsdXIgPSBtLnB4KDYpXG5cdFx0XHRidXR0b24uYmFja2dyb3VuZENvbG9yID0gbS5jb2xvcihzZXR1cC5iYWNrZ3JvdW5kQ29sb3IpXG5cdFx0XHRpZiB0eXBlb2Ygc2V0dXAuaWNvbiA9PSBcInN0cmluZ1wiXG5cdFx0XHRcdGljb24gPSBtLkljb25cblx0XHRcdFx0XHRuYW1lOnNldHVwLmljb25cblx0XHRcdFx0XHRjb2xvcjpzZXR1cC5jb2xvclxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6YnV0dG9uXG5cdFx0XHRcdFx0Y29uc3RyYWludHM6e2FsaWduOlwiY2VudGVyXCJ9XG5cblx0XHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0XHR0YXJnZXQ6W2J1dHRvbl1cblx0XHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0XHR0YXJnZXQ6W2ljb25dXG5cblx0XHRlbHNlXG5cdFx0XHRsYWJlbCA9IG5ldyBtLlRleHRcblx0XHRcdFx0dGV4dDpzZXR1cC50ZXh0XG5cdFx0XHRcdHN1cGVyTGF5ZXI6YnV0dG9uXG5cdFx0XHRcdHRleHRUcmFuc2Zvcm06XCJ1cHBlcmNhc2VcIlxuXHRcdFx0XHRjb2xvcjpzZXR1cC5jb2xvclxuXHRcdFx0XHRmb250U2l6ZToxNFxuXHRcdFx0XHRsaW5lSGVpZ2h0OjE0XG5cdFx0XHRcdGZvbnRXZWlnaHQ6NTAwXG5cdFx0XHRsYWJlbC5jb25zdHJhaW50cyA9XG5cdFx0XHRcdGFsaWduOlwiY2VudGVyXCJcblx0XHRcdGJ1dHRvbi5wcm9wcyA9XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblx0XHRcdFx0aGVpZ2h0Om0ucHgoMzYpXG5cdFx0XHRcdHdpZHRoOmxhYmVsLndpZHRoICsgbS5weCgxNilcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOm0ucHgoMilcblx0XHRcdFx0Y2xpcDpzZXR1cC5jbGlwXG5cblx0XHRcdGlmIGJ1dHRvbi53aWR0aCA8IG0ucHgoNjQpXG5cdFx0XHRcdGJ1dHRvbi53aWR0aCA9IG0ucHgoNjQpXG5cblx0XHRcdHN3aXRjaCBzZXR1cC50eXBlXG5cdFx0XHRcdHdoZW4gXCJyYWlzZWRcIlxuXHRcdFx0XHRcdGJ1dHRvbi5vcmlnQkdDID0gYnV0dG9uLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRcdGJ1dHRvbi5zaGFkb3dDb2xvciA9IFwicmdiYSgwLDAsMCwuMjQpXCJcblx0XHRcdFx0XHRidXR0b24uc2hhZG93WSA9IG0ucHgoMilcblx0XHRcdFx0XHRidXR0b24uc2hhZG93Qmx1ciA9IG0ucHgoMilcblx0XHRcdFx0XHRwcmVzc2VkQkdDID0gYnV0dG9uLmJhY2tncm91bmRDb2xvci5saWdodGVuKDEwKVxuXHRcdFx0XHRcdGJ1dHRvbi5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdFx0XHRcdGJ1dHRvbi5hbmltYXRlXG5cdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOnByZXNzZWRCR0Ncblx0XHRcdFx0XHRcdFx0XHRzaGFkb3dZOm0ucHgoOClcblx0XHRcdFx0XHRcdFx0XHRzaGFkb3dCbHVyOm0ucHgoOClcblx0XHRcdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXHRcdFx0XHRcdFx0YnV0dG9uLmFuaW1hdGVcblx0XHRcdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGJ1dHRvbi5vcmlnQkdDXG5cdFx0XHRcdFx0XHRcdFx0c2hhZG93WTptLnB4KDIpXG5cdFx0XHRcdFx0XHRcdFx0c2hhZG93Qmx1cjptLnB4KDIpXG5cdFx0XHRcdHdoZW4gXCJmbGF0XCJcblx0XHRcdFx0XHRidXR0b24ub3JpZ0JHQyA9IGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0XHRwcmVzc2VkQkdDID0gYnV0dG9uLmJhY2tncm91bmRDb2xvci5kYXJrZW4oNSlcblx0XHRcdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHRcdFx0XHRidXR0b24uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpwcmVzc2VkQkdDXG5cdFx0XHRcdFx0YnV0dG9uLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdFx0XHRcdGJ1dHRvbi5hbmltYXRlXG5cdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBidXR0b24ub3JpZ0JHQ1xuXG5cblx0XHRcdGlmIHNldHVwLmNvbnN0cmFpbnRzXG5cdFx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cyA9IHNldHVwLmNvbnN0cmFpbnRzXG5cblx0XHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0XHR0YXJnZXQ6W2J1dHRvbiwgbGFiZWxdXG5cblx0aWYgc2V0dXAuaW5rXG5cdFx0cGFzc2VkSW5rID0gc2V0dXAuaW5rXG5cdFx0cGFzc2VkSW5rLmxheWVyID0gYnV0dG9uXG5cblx0XHRtLnV0aWxzLmlua3kocGFzc2VkSW5rKVxuXHRidXR0b24ubGFiZWwgPSBsYWJlbFxuXHRyZXR1cm4gYnV0dG9uXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHR0aXRsZTogdW5kZWZpbmVkXG5cdGhlYWRlclN1YnRpdGxlOiB1bmRlZmluZWRcblx0Ym9keVRleHQ6IFwiQ29udGVudFwiXG5cdGhlaWdodDogMzAwXG5cdGNhcmRIZWFkZXJiYWNrZ3JvdW5kQ29sb3I6J3JlZCdcblxuXHR0eXBlOlwiY2FyZFwiXG5cdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0dGl0bGVDb2xvcjpcImJsYWNrXCJcblx0YWN0aW9uQ29sb3I6XCJibGFja1wiXG5cdGFjdGlvbnM6dW5kZWZpbmVkXG5cdGZvb3RlcjogIHVuZGVmaW5lZFxuXHRpbWFnZTogdW5kZWZpbmVkXG5cdGltYWdlSGVpZ2h0OiB1bmRlZmluZWRcblx0c3VwZXJMYXllcjp1bmRlZmluZWRcblx0Ym9yZGVyUmFkaXVzOiB1bmRlZmluZWRcblxuXG59XG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXG5cdGNhcmQgPSBuZXcgTGF5ZXJcblx0XHRuYW1lOlwiQ2FyZFwiXG5cdFx0YmFja2dyb3VuZENvbG9yOidtLmNvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvciknXG5cdFx0c2hhZG93Q29sb3I6IFwicmdiYSgwLCAwLCAwLCAuMTIpXCJcblx0XHRzaGFkb3dCbHVyOiBtLnB4KDQpXG5cdFx0c2hhZG93WTogbS5weCgyKVxuXHRcdHN1cGVyTGF5ZXI6IHNldHVwLnN1cGVyTGF5ZXJcblx0XHRib3JkZXJSYWRpdXM6IHNldHVwLmJvcmRlclJhZGl1c1xuXG5cdGNhcmQuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmc6MTZcblx0XHR0cmFpbGluZzoxNlxuXHRcdHRvcDowXG5cdFx0aGVpZ2h0OiBzZXR1cC5oZWlnaHRcblxuXHRpZiBzZXR1cC50aXRsZVxuXHRcdGNhcmRIZWFkZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiY2FyZEhlYWRlclwiXG5cdFx0XHRjYXJkSGVhZGVyYmFja2dyb3VuZENvbG9yOm0uY29sb3Ioc2V0dXAuY2FyZEhlYWRlcmJhY2tncm91bmRDb2xvcilcblx0XHRcdHN1cGVyTGF5ZXI6IGNhcmRcblx0XHRcdGhlaWdodDogMzAwXG5cdFx0XHRjYXJkSGVhZGVyLmNvbnN0cmFpbnRzID1cblx0XHRcdFx0d2lkdGg6IDkwMFxuXHRcdFx0bS5sYXlvdXQuc2V0KGNhcmRIZWFkZXIpXG5cdFx0dGl0bGUgPSBuZXcgbS5UZXh0XG5cdFx0XHRzdXBlckxheWVyOmNhcmRIZWFkZXJcblx0XHRcdHRleHQ6c2V0dXAudGl0bGVcblx0XHRcdGZvbnRXZWlnaHQ6XCJzZW1pYm9sZFwiXG5cdFx0XHRmb250U2l6ZToxNFxuXHRcdFx0bmFtZTpcInRpdGxlXCJcblx0XHRcdGxpbmVIZWlnaHQ6MjBcblx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHR0b3A6MjRcblx0XHRcdFx0d2lkdGg6MjIwXG5cdFx0XHRcdGxlYWRpbmc6MTZcblxuXHRpZiBzZXR1cC5oZWFkZXJTdWJ0aXRsZVxuXHRcdGhlYWRlclN1YnRpdGxlID0gbmV3IG0uVGV4dFxuXHRcdFx0c3VwZXJMYXllcjogY2FyZEhlYWRlclxuXHRcdFx0dGV4dDogc2V0dXAuaGVhZGVyU3VidGl0bGVcblx0XHRcdGZvbnRXZWlnaHQ6XCJzZW1pYm9sZFwiXG5cdFx0XHRmb250U2l6ZToxNFxuXHRcdFx0bmFtZTpcImhlYWRlclN1YnRpdGxlXCJcblx0XHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0XHR0b3A6ICA4XG5cdFx0XHRcdHdpZHRoOjIyMFxuXHRcdFx0XHRsZWFkaW5nOjE2XG5cblx0XHR0aXRsZS5jb25zdHJhaW50cz1cblx0XHRcdHRvcDogIDhcblxuXG5cblxuXG5cblxuXG5cblxuXHQjIFNFVCBVUCBBQ1RJT05TIElOIEhFQURFUlxuXHRhY3Rpb25zQXJyYXkgPSBbXVxuXHRpZiBzZXR1cC5hY3Rpb25zXG5cdFx0Zm9yIGFjdCwgaSBpbiBzZXR1cC5hY3Rpb25zXG5cdFx0XHRpZiBpID09IDBcblx0XHRcdFx0aWNvbiA9IG5ldyBtLkljb25cblx0XHRcdFx0XHRuYW1lOmFjdFxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6Y2FyZFxuXHRcdFx0XHRcdGNvbnN0cmFpbnRzOnt0cmFpbGluZzoxNiwgdG9wOiAxNn1cblx0XHRcdFx0XHRjb2xvcjpzZXR1cC5hY3Rpb25Db2xvclxuXHRcdFx0XHRcdGNsaXA6ZmFsc2Vcblx0XHRcdFx0YWN0aW9uc0FycmF5LnB1c2ggaWNvblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRpY29uID0gbmV3IG0uSWNvblxuXHRcdFx0XHRcdG5hbWU6YWN0XG5cdFx0XHRcdFx0c3VwZXJMYXllcjpjYXJkXG5cdFx0XHRcdFx0Y29uc3RyYWludHM6e3RyYWlsaW5nOlthY3Rpb25zQXJyYXlbaSAtIDFdLCAxNl0sIHZlcnRpY2FsQ2VudGVyOnRpdGxlfVxuXHRcdFx0XHRcdGNvbG9yOnNldHVwLmFjdGlvbkNvbG9yXG5cdFx0XHRcdFx0Y2xpcDpmYWxzZVxuXHRcdFx0XHRhY3Rpb25zQXJyYXkucHVzaCBpY29uXG5cblx0XHRmb3IgYWN0IGluIGFjdGlvbnNBcnJheVxuXHRcdFx0bS51dGlscy5pbmt5XG5cdFx0XHRcdGxheWVyOmFjdFxuXHRcdFx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRcdFx0Y29sb3I6XCJ3aGl0ZVwiXG5cdFx0XHRcdG9wYWNpdHk6LjRcblx0XHRcdFx0c2NhbGU6Ljhcblx0XHRcdFx0c3RhcnRTY2FsZTouN1xuXG5cblxuXHQjIElNQUdFIFNFVFVQXG5cdGlmIHNldHVwLmltYWdlXG5cdFx0dGh1bWJuYWlsID0gbmV3IExheWVyXG5cdFx0XHRcdHN1cGVyTGF5ZXI6IGNhcmRcblx0XHRcdFx0aW1hZ2U6IHNldHVwLmltYWdlXG5cdFx0XHRcdGhlaWdodDogc2V0dXAuaW1hZ2VIZWlnaHRcblxuXHRcdHRodW1ibmFpbC5jb25zdHJhaW50cyA9XG5cdFx0XHRcdGxlYWRpbmc6MFxuXHRcdFx0XHR0cmFpbGluZzowXG5cdFx0XHRcdHRvcDogW2NhcmRIZWFkZXIsIDBdXG5cdFx0bS51dGlscy5pbmt5XG5cdFx0XHRsYXllcjp0aHVtYm5haWxcblx0XHRcdG1vdmVUb1RhcDp0cnVlXG5cdFx0XHRjb2xvcjpcIndoaXRlXCJcblx0XHRcdG9wYWNpdHk6LjRcblx0XHRcdHNjYWxlOiAyXG5cdFx0XHRzdGFydFNjYWxlOi43XG5cdFx0Y2FyZC5jb25zdHJhaW50c1tcImhlaWdodFwiXSA9IDIwICsgbS51dGlscy5wdCh0aXRsZS5oZWlnaHQpICsgMTAgKyBtLnV0aWxzLnB0KHRodW1ibmFpbC5oZWlnaHQpICsgMjQgKyA0NFxuXG5cdCMgSWYgdGhlcmUgaXMgVGV4dCBzZXR1cCBidXQgbm8gSW1hZ2UsIHBsYWNlIHRleHQgdW5kZXIgdGl0bGVcblx0aWYgc2V0dXAuYm9keVRleHQgYW5kIG5vdCBzZXR1cC5pbWFnZVxuXHRcdFx0Ym9keVRleHQgPSBuZXcgbS5UZXh0XG5cdFx0XHRcdG5hbWU6XCJjb250ZW50XCJcblx0XHRcdFx0c3VwZXJMYXllcjogY2FyZFxuXHRcdFx0XHR0ZXh0OnNldHVwLmJvZHlUZXh0XG5cdFx0XHRib2R5VGV4dC5jb25zdHJhaW50cyA9XG5cdFx0XHRcdHRvcDogW3RpdGxlLCAxNl1cblx0XHRcdFx0bGVhZGluZzogMTZcblx0XHRcdFx0dHJhaWxpbmc6IDE2XG5cblx0IyBpZiB0aGVyZSBpcyBhbiBpbWFnZSAmIGJvZHl0ZXh0IHNldHVwLCBwbGFjZSBib2R5dGV4dCB1bmRlciBpbWFnZVxuXG5cdGlmIHNldHVwLmJvZHlUZXh0ICYmIHNldHVwLmltYWdlXG5cdFx0Ym9keVRleHQgPSBuZXcgbS5UZXh0XG5cdFx0XHRuYW1lOlwiY29udGVudFwiXG5cdFx0XHRzdXBlckxheWVyOiBjYXJkXG5cdFx0XHR0ZXh0OnNldHVwLmJvZHlUZXh0XG5cblx0XHRib2R5VGV4dC5jb25zdHJhaW50cyA9XG5cdFx0XHR0b3A6IFt0aHVtYm5haWwsIDE2XVxuXHRcdFx0bGVhZGluZzogMTZcblx0XHRcdHRyYWlsaW5nOiAxNlxuXG5cblxuXG5cblxuXG5cdGJ1dHRvbkFycmF5ID0gW11cblx0aWYgc2V0dXAuZm9vdGVyXG5cblx0XHRjYXJkRm9vdGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcImNhcmRGb290ZXJcIlxuXHRcdFx0c3VwZXJMYXllcjogY2FyZFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG5cblx0XHRjYXJkRm9vdGVyLmNvbnN0cmFpbnRzID1cblx0XHRcdGhlaWdodDogNTZcblx0XHRcdGJvdHRvbTogMFxuXHRcdFx0bGVhZGluZzogMFxuXHRcdFx0dHJhaWxpbmc6IDBcblxuXG5cdFx0IyBUaGUgbWFpbiB0aGluZyB3YXMgZ2l2aW5nIHRyb3VibGUgd2FzIHNldHVwLmZvb3RlciB3YXMgdGhlIHRleHQgcHJvcGVydHksIHNvIHRoZXJlIHdlcmUgMyBidXR0b25zIHRoYXQgd2VyZSBpZGVudGljYWxcblx0XHQjIFRvIGZpeCB0aGF0LCB0aGUgdGV4dCBpcyBzZXQgdG8gdGhlIGluZGl2aWR1YWwgaXRlbVxuXHRcdCMgSSBhbHNvIHNldCB0aGUgc3BhY2luZyBmb3IgeW91IGFuZCBlbWJlZGRlZCB0aGUgY29uc3RyYWludHMuXG5cblx0XHQjIEFkZGVkIGkgdG8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgYXJyYXkuIEJlZm9yZSB0aGUgaSB3YXMganVzdCByZXR1cm5pbmcgMSBmb3IgZXZlcnkgaXRlbS4gSSdtIG5vdCBzdXJlIHdoeSDCr1xcXyjjg4QpXy/Cr1xuXHRcdHNldHVwLmZvb3Rlci5mb3JFYWNoIChpdGVtLCBpKSAtPlxuXG5cdFx0XHRpZiBpID09IDBcblx0XHRcdFx0YnV0dG9uID0gbmV3IG0uQnV0dG9uXG5cdFx0XHRcdFx0bmFtZTogaXRlbVxuXHRcdFx0XHRcdHR5cGU6XCJmbGF0XCJcblx0XHRcdFx0XHRzdXBlckxheWVyOiBjYXJkRm9vdGVyXG5cdFx0XHRcdFx0dGV4dDogaXRlbVxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcIiMzMjMyXCJcblx0XHRcdFx0XHQjIFRoZSBidXR0b24gbGF5ZXIgaGFuZGxlcyBjb25zdHJhaW50cyBmb3IgeW91XG5cdFx0XHRcdFx0Y29uc3RyYWludHM6IHtib3R0b206OCwgbGVhZGluZzoxNn1cblx0XHRcdFx0YnV0dG9uQXJyYXkucHVzaCBidXR0b25cblx0XHRcdGVsc2Vcblx0XHRcdFx0YnV0dG9uID0gbmV3IG0uQnV0dG9uXG5cdFx0XHRcdFx0bmFtZTogaXRlbVxuXHRcdFx0XHRcdHR5cGU6XCJmbGF0XCJcblx0XHRcdFx0XHRzdXBlckxheWVyOiBjYXJkRm9vdGVyXG5cdFx0XHRcdFx0dGV4dDogaXRlbVxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcIiMzMjMyXCJcblx0XHRcdFx0XHQjIFNldCB0aGUgbGVhZGluZyBsYXllciB0byBiZSB0aGUgcHJldmlvdXMgbGF5ZXIgaW4gdGhlIGFycmF5LFxuXHRcdFx0XHRcdGNvbnN0cmFpbnRzOiB7Ym90dG9tOjgsIGxlYWRpbmc6W2J1dHRvbkFycmF5W2kgLSAxXSwgOF19XG5cdFx0XHRcdGJ1dHRvbkFycmF5LnB1c2ggYnV0dG9uXG5cblx0XHRcdFx0bS5sYXlvdXQuc2V0KClcblxuXHRcdFx0XHRcdCMgdGhpcyBndXkgYnJlYWtzIHRoaW5ncywgaSB0aGluaywgc28gY29tbWVudGluZyBvdXQuXG5cdFx0XHRcdFx0IyBjb25zdHJhaW50czp7bGVhZGluZzpbY2FyZEJ1dHRvbkFycmF5W2kgLSAxXSwgMTZdfVxuXG5cblx0XHRmb3IgYnV0dG9uIGluIGJ1dHRvbkFycmF5XG5cdFx0XHRtLnV0aWxzLmlua3lcblx0XHRcdFx0bGF5ZXI6IGJ1dHRvblxuXHRcdFx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRcdFx0Y29sb3I6XCJyZWRcIlxuXHRcdFx0XHRvcGFjaXR5Oi40XG5cdFx0XHRcdHNjYWxlOi44XG5cdFx0XHRcdHN0YXJ0U2NhbGU6LjdcblxuXG5cblxuXHRcdFx0bS5sYXlvdXQuc2V0KClcblxuXG5cblxuXG5cblxuXG5cdG0ubGF5b3V0LnNldCgpXG5cblxuXHRjYXJkLnR5cGUgPSBzZXR1cC50eXBlXG5cblxuXG5cdG0udXRpbHMuc3BlY2lhbENoYXIodGl0bGUpXG5cblxuXG5cdHJldHVybiBjYXJkXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXG5cdGhlaWdodDogMzAwXG5cdHR5cGU6XCJjYXJkXCJcblx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXG5cdGhlYWRlclRpdGxlOiB1bmRlZmluZWRcblx0aGVhZGVyU3VidGl0bGU6IHVuZGVmaW5lZFxuXHRoZWFkZXJJbWFnZTogdW5kZWZpbmVkXG5cdGhlYWRlckltYWdlUmFkaXVzOiA0MDBcblx0aGVhZGVyQmFja2dyb3VuZENvbG9yOiAncmVkJ1xuXG5cdGNvbnRlbnRIZWFkbGluZTogdW5kZWZpbmVkXG5cdGNvbnRlbnRUZXh0OiB1bmRlZmluZWRcblxuXHR0aXRsZUNvbG9yOlwiYmxhY2tcIlxuXHRhY3Rpb25Db2xvcjpcImJsYWNrXCJcblxuXHRhY3Rpb25zOnVuZGVmaW5lZFxuXHRmb290ZXI6ICB1bmRlZmluZWRcblx0aW1hZ2U6IHVuZGVmaW5lZFxuXG5cblx0aW1hZ2VIZWlnaHQ6IHVuZGVmaW5lZFxuXHRzdXBlckxheWVyOnVuZGVmaW5lZFxuXHRib3JkZXJSYWRpdXM6IHVuZGVmaW5lZFxuXG5cbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cblx0Y2FyZCA9IG5ldyBMYXllclxuXHRcdG5hbWU6XCJDYXJkXCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6bS5jb2xvcihzZXR1cC5iYWNrZ3JvdW5kQ29sb3IpXG5cdFx0c2hhZG93Q29sb3I6IFwicmdiYSgwLCAwLCAwLCAuMTIpXCJcblx0XHRzaGFkb3dCbHVyOiBtLnB4KDQpXG5cdFx0c2hhZG93WTogbS5weCgyKVxuXHRcdHN1cGVyTGF5ZXI6IHNldHVwLnN1cGVyTGF5ZXJcblx0XHRib3JkZXJSYWRpdXM6IHNldHVwLmJvcmRlclJhZGl1c1xuXG5cdGNhcmQuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmc6MTZcblx0XHR0cmFpbGluZzoxNlxuXHRcdHRvcDowXG5cdFx0aGVpZ2h0OiBzZXR1cC5oZWlnaHRcblxuXG4jIC0tLS0tLS0gIENSRUFURSBDQVJEIEhFQURFUiAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGlmIHNldHVwLmhlYWRlclRpdGxlXG5cdFx0Y2FyZEhlYWRlciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJjYXJkSGVhZGVyXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLmhlYWRlckJhY2tncm91bmRDb2xvcilcblx0XHRcdHN1cGVyTGF5ZXI6IGNhcmRcblx0XHRcdGhlaWdodDogMTI4XG5cblxuXHRcdGNhcmRIZWFkZXIuY29uc3RyYWludHMgPVxuXHRcdFx0bGVhZGluZzogMFxuXHRcdFx0dHJhaWxpbmc6IDBcblxuXHRcdGhlYWRlclRpdGxlID0gbmV3IG0uVGV4dFxuXHRcdFx0c3VwZXJMYXllcjpjYXJkSGVhZGVyXG5cdFx0XHR0ZXh0OiBzZXR1cC5oZWFkZXJUaXRsZVxuXHRcdFx0Zm9udFdlaWdodDpcInNlbWlib2xkXCJcblx0XHRcdGZvbnRTaXplOjE0XG5cdFx0XHRuYW1lOlwiaGVhZGVyVGl0bGVcIlxuXHRcdFx0bGluZUhlaWdodDoyMFxuXG5cdFx0XHRjb25zdHJhaW50czpcblx0XHRcdFx0dG9wOjE2XG5cdFx0XHRcdHdpZHRoOjIyMFxuXHRcdFx0XHRsZWFkaW5nOjE2XG5cdFx0bS5sYXlvdXQuc2V0KClcblxuXG5cdGlmIHNldHVwLmhlYWRlclN1YnRpdGxlXG5cdFx0aGVhZGVyU3VidGl0bGUgPSBuZXcgbS5UZXh0XG5cdFx0XHRzdXBlckxheWVyOiBjYXJkSGVhZGVyXG5cdFx0XHR0ZXh0OiBzZXR1cC5oZWFkZXJTdWJ0aXRsZVxuXHRcdFx0Zm9udFdlaWdodDpcInNlbWlib2xkXCJcblx0XHRcdGZvbnRTaXplOjE0XG5cdFx0XHRuYW1lOlwiaGVhZGVyU3VidGl0bGVcIlxuXHRcdFx0Y29uc3RyYWludHM6XG5cdFx0XHRcdHRvcDogW2hlYWRlclRpdGxlLCA0XVxuXHRcdFx0XHR3aWR0aDoyMjBcblx0XHRcdFx0bGVhZGluZzoxNlxuXHRcdFx0bS5sYXlvdXQuc2V0KClcblxuXHRpZiBzZXR1cC5oZWFkZXJJbWFnZVxuXHRcdFx0aGVhZGVySW1hZ2UgPSBuZXcgTGF5ZXJcblx0XHRcdFx0c3VwZXJMYXllcjogY2FyZEhlYWRlclxuXHRcdFx0XHRuYW1lOiBcImhlYWRlckltYWdlXCJcblx0XHRcdFx0d2lkdGg6IDgwXG5cdFx0XHRcdGhlaWdodDogODBcblx0XHRcdFx0aW1hZ2U6IHNldHVwLmhlYWRlckltYWdlXG5cdFx0XHRcdGJvcmRlclJhZGl1czogc2V0dXAuaGVhZGVySW1hZ2VSYWRpdXNcblx0XHRcdGhlYWRlckltYWdlLmNvbnN0cmFpbnRzID1cblx0XHRcdFx0dG9wOiAxNlxuXHRcdFx0XHRsZWFkaW5nOiAxNlxuXHRcdFx0bS5sYXlvdXQuc2V0KClcblxuXHRpZiBoZWFkZXJJbWFnZSAmJiBzZXR1cC5oZWFkZXJ0aXRsZSAmJiBzZXR1cC5oZWFkZXJTdWJ0aXRsZVxuXG5cdFx0XHRoZWFkZXJUaXRsZS5jb25zdHJhaW50cy5sZWFkaW5nID0gW2hlYWRlckltYWdlLCAxNl1cblxuXHRcdFx0aGVhZGVyU3VidGl0bGUuY29uc3RyYWludHMgPVxuXHRcdFx0XHRsZWFkaW5nOiAgNzJcblx0XHRcdG0ubGF5b3V0LnNldCgpXG5cblxuXG5cbiMgLS0tLS0tLSAgQ1JFQVRFIENPTlRFTlQgQVJFQSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5cblx0aWYgc2V0dXAuY29udGVudEhlYWRsaW5lIG9yIHNldHVwLmNvbnRlbnRUZXh0XG5cdFx0Y29udGVudEFyZWEgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiY29udGVudEFyZWFcIlxuXHRcdFx0c3VwZXJMYXllcjogY2FyZFxuXG5cdFx0Y29udGVudEFyZWEuY29uc3RyYWludHMgPVxuXHRcdFx0bGVhZGluZzogMFxuXHRcdFx0dHJhaWxpbmc6IDBcblx0XHRcdHRvcDogW2NhcmRIZWFkZXIsMF1cblx0XHRtLmxheW91dC5zZXQoKVxuXG5cdGlmIHNldHVwLmNvbnRlbnRIZWFkbGluZVxuXHRcdGNvbnRlbnRIZWFkbGluZSA9IG5ldyBtLlRleHRcblx0XHRcdG5hbWU6XCJjb250ZW50SGVhZGxpbmVcIlxuXHRcdFx0c3VwZXJMYXllcjogY29udGVudEFyZWFcblx0XHRcdHRleHQ6c2V0dXAuY29udGVudEhlYWRsaW5lXG5cdFx0XHRmb250V2VpZ2h0OiAnUmVndWxhcidcblx0XHRcdGZvbnRTaXplOiAyNFxuXHRcdGNvbnRlbnRIZWFkbGluZS5jb25zdHJhaW50cyA9XG5cdFx0XHR0b3A6IDE2XG5cdFx0XHRsZWFkaW5nOiAxNlxuXHRcdFx0dHJhaWxpbmc6IDE2XG5cdFx0bS5sYXlvdXQuc2V0KClcblxuXG5cdGlmIHNldHVwLmNvbnRlbnRUZXh0XG5cdFx0Y29udGVudFRleHQgPSBuZXcgbS5UZXh0XG5cdFx0XHRuYW1lOlwiY29udGVudFRleHRcIlxuXHRcdFx0c3VwZXJMYXllcjogY29udGVudEFyZWFcblx0XHRcdHRleHQ6c2V0dXAuY29udGVudFRleHRcblx0XHRjb250ZW50VGV4dGNvbnN0cmFpbnRzID1cblx0XHRcdHRvcDogMTZcblx0XHRcdGxlYWRpbmc6IDE2XG5cdFx0XHR0cmFpbGluZzogMTZcblx0XHRtLmxheW91dC5zZXQoKVxuXG5cdGlmIHNldHVwLmNvbnRlbnRIZWFkbGluZSAmJiBzZXR1cC5jb250ZW50VGV4dFxuXHRcdFx0Y29udGVudEhlYWRsaW5lLmNvbnN0cmFpbnRzID1cblx0XHRcdFx0dG9wOiAxNlxuXHRcdFx0XHRsZWFkaW5nOiAxNlxuXHRcdFx0XHR0cmFpbGluZzogMTYyXG5cdFx0XHRjb250ZW50VGV4dC5jb25zdHJhaW50cyA9XG5cdFx0XHRcdHRvcDogW2NvbnRlbnRIZWFkbGluZSwgOF1cblx0XHRcdFx0bGVhZGluZzogMTZcblx0XHRcdFx0dHJhaWxpbmc6IDE2XG5cdFx0XHRtLmxheW91dC5zZXQoKVxuXG5cdGlmIGNhcmRIZWFkZXJcblx0XHRjb250ZW50QXJlYS5jb25zdHJhaW50cyA9XG5cdFx0XHR0b3A6IFtjYXJkSGVhZGVyLDBdXG5cdFx0bS5sYXlvdXQuc2V0KClcblxuXHRpZiBzZXR1cC5pbWFnZVxuXHRcdHRodW1ibmFpbCA9IG5ldyBMYXllclxuXHRcdFx0XHRzdXBlckxheWVyOiBjYXJkXG5cdFx0XHRcdGltYWdlOiBzZXR1cC5pbWFnZVxuXHRcdFx0XHRoZWlnaHQ6IHNldHVwLmltYWdlSGVpZ2h0XG5cdFx0bS5sYXlvdXQuc2V0KClcblxuXG5cdGlmIHRodW1ibmFpbCAmJiBjYXJkSGVhZGVyXG5cblx0XHRjb250ZW50QXJlYS5jb25zdHJhaW50cyA9XG5cdFx0XHR0b3A6IFt0aHVtYm5haWwsIDBdXG5cblx0XHR0aHVtYm5haWwuY29uc3RyYWludHMgPVxuXHRcdFx0XHRcdHRvcDogW2NhcmRIZWFkZXIsMF1cblx0XHRcdFx0XHRsZWFkaW5nOiAwXG5cdFx0XHRcdFx0dHJhaWxpbmc6IDBcblx0XHRtLmxheW91dC5zZXQoKVxuXG5cblxuXG5cdCMgU0VUIFVQIEFDVElPTlMgSU4gSEVBREVSXG5cdGFjdGlvbnNBcnJheSA9IFtdXG5cdGlmIHNldHVwLmFjdGlvbnNcblx0XHRmb3IgYWN0LCBpIGluIHNldHVwLmFjdGlvbnNcblx0XHRcdGlmIGkgPT0gMFxuXHRcdFx0XHRpY29uID0gbmV3IG0uSWNvblxuXHRcdFx0XHRcdG5hbWU6YWN0XG5cdFx0XHRcdFx0c3VwZXJMYXllcjpjYXJkSGVhZGVyXG5cdFx0XHRcdFx0Y29uc3RyYWludHM6e3RyYWlsaW5nOjE2LCB0b3A6IDE2fVxuXHRcdFx0XHRcdGNvbG9yOnNldHVwLmFjdGlvbkNvbG9yXG5cdFx0XHRcdFx0Y2xpcDpmYWxzZVxuXHRcdFx0XHRhY3Rpb25zQXJyYXkucHVzaCBpY29uXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGljb24gPSBuZXcgbS5JY29uXG5cdFx0XHRcdFx0bmFtZTphY3Rcblx0XHRcdFx0XHRzdXBlckxheWVyOmNhcmRIZWFkZXJcblx0XHRcdFx0XHRjb25zdHJhaW50czp7dHJhaWxpbmc6W2FjdGlvbnNBcnJheVtpIC0gMV0sIDE2XSwgdG9wOiAxNn1cblx0XHRcdFx0XHRjb2xvcjpzZXR1cC5hY3Rpb25Db2xvclxuXHRcdFx0XHRcdGNsaXA6ZmFsc2Vcblx0XHRcdFx0YWN0aW9uc0FycmF5LnB1c2ggaWNvblxuXG5cdFx0Zm9yIGFjdCBpbiBhY3Rpb25zQXJyYXlcblx0XHRcdG0udXRpbHMuaW5reVxuXHRcdFx0XHRsYXllcjphY3Rcblx0XHRcdFx0bW92ZVRvVGFwOmZhbHNlXG5cdFx0XHRcdGNvbG9yOlwid2hpdGVcIlxuXHRcdFx0XHRvcGFjaXR5Oi40XG5cdFx0XHRcdHNjYWxlOi44XG5cdFx0XHRcdHN0YXJ0U2NhbGU6LjdcblxuXG5cblxuXG5cblx0YnV0dG9uQXJyYXkgPSBbXVxuXHRpZiBzZXR1cC5mb290ZXJcblxuXHRcdGNhcmRGb290ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiY2FyZEZvb3RlclwiXG5cdFx0XHRzdXBlckxheWVyOiBjYXJkXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcblxuXHRcdGNhcmRGb290ZXIuY29uc3RyYWludHMgPVxuXHRcdFx0aGVpZ2h0OiA1NlxuXHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRsZWFkaW5nOiAwXG5cdFx0XHR0cmFpbGluZzogMFxuXG5cblx0XHQjIFRoZSBtYWluIHRoaW5nIHdhcyBnaXZpbmcgdHJvdWJsZSB3YXMgc2V0dXAuZm9vdGVyIHdhcyB0aGUgdGV4dCBwcm9wZXJ0eSwgc28gdGhlcmUgd2VyZSAzIGJ1dHRvbnMgdGhhdCB3ZXJlIGlkZW50aWNhbFxuXHRcdCMgVG8gZml4IHRoYXQsIHRoZSB0ZXh0IGlzIHNldCB0byB0aGUgaW5kaXZpZHVhbCBpdGVtXG5cdFx0IyBJIGFsc28gc2V0IHRoZSBzcGFjaW5nIGZvciB5b3UgYW5kIGVtYmVkZGVkIHRoZSBjb25zdHJhaW50cy5cblxuXHRcdCMgQWRkZWQgaSB0byBnZXQgdGhlIGluZGV4IG9mIHRoZSBhcnJheS4gQmVmb3JlIHRoZSBpIHdhcyBqdXN0IHJldHVybmluZyAxIGZvciBldmVyeSBpdGVtLiBJJ20gbm90IHN1cmUgd2h5IMKvXFxfKOODhClfL8KvXG5cdFx0c2V0dXAuZm9vdGVyLmZvckVhY2ggKGl0ZW0sIGkpIC0+XG5cblx0XHRcdGlmIGkgPT0gMFxuXHRcdFx0XHRidXR0b24gPSBuZXcgbS5CdXR0b25cblx0XHRcdFx0XHRuYW1lOiBpdGVtXG5cdFx0XHRcdFx0dHlwZTpcImZsYXRcIlxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6IGNhcmRGb290ZXJcblx0XHRcdFx0XHR0ZXh0OiBpdGVtXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwiIzMyMzJcIlxuXHRcdFx0XHRcdCMgVGhlIGJ1dHRvbiBsYXllciBoYW5kbGVzIGNvbnN0cmFpbnRzIGZvciB5b3Vcblx0XHRcdFx0XHRjb25zdHJhaW50czoge2JvdHRvbTo4LCBsZWFkaW5nOjE2fVxuXHRcdFx0XHRidXR0b25BcnJheS5wdXNoIGJ1dHRvblxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRidXR0b24gPSBuZXcgbS5CdXR0b25cblx0XHRcdFx0XHRuYW1lOiBpdGVtXG5cdFx0XHRcdFx0dHlwZTpcImZsYXRcIlxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6IGNhcmRGb290ZXJcblx0XHRcdFx0XHR0ZXh0OiBpdGVtXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwiIzMyMzJcIlxuXHRcdFx0XHRcdCMgU2V0IHRoZSBsZWFkaW5nIGxheWVyIHRvIGJlIHRoZSBwcmV2aW91cyBsYXllciBpbiB0aGUgYXJyYXksXG5cdFx0XHRcdFx0Y29uc3RyYWludHM6IHtib3R0b206OCwgbGVhZGluZzpbYnV0dG9uQXJyYXlbaSAtIDFdLCA4XX1cblx0XHRcdFx0YnV0dG9uQXJyYXkucHVzaCBidXR0b25cblxuXHRcdFx0XHRtLmxheW91dC5zZXQoKVxuXG5cdFx0XHRcdFx0IyB0aGlzIGd1eSBicmVha3MgdGhpbmdzLCBpIHRoaW5rLCBzbyBjb21tZW50aW5nIG91dC5cblx0XHRcdFx0XHQjIGNvbnN0cmFpbnRzOntsZWFkaW5nOltjYXJkQnV0dG9uQXJyYXlbaSAtIDFdLCAxNl19XG5cblxuXHRcdGZvciBidXR0b24gaW4gYnV0dG9uQXJyYXlcblx0XHRcdG0udXRpbHMuaW5reVxuXHRcdFx0XHRsYXllcjogYnV0dG9uXG5cdFx0XHRcdG1vdmVUb1RhcDpmYWxzZVxuXHRcdFx0XHRjb2xvcjpcInJlZFwiXG5cdFx0XHRcdG9wYWNpdHk6LjRcblx0XHRcdFx0c2NhbGU6Ljhcblx0XHRcdFx0c3RhcnRTY2FsZTouN1xuXG5cblx0XHRcdG0ubGF5b3V0LnNldCgpXG5cblxuXG5cblxuXG5cblxuXHRtLmxheW91dC5zZXQoKVxuXG5cblx0Y2FyZC50eXBlID0gc2V0dXAudHlwZVxuXG5cblxuXHRtLnV0aWxzLnNwZWNpYWxDaGFyKGhlYWRlclRpdGxlKVxuXG5cblxuXHRyZXR1cm4gY2FyZFxuIiwiIyBBbGVydFxubSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0dGl0bGU6IFwiVGl0bGVcIlxuXHRtZXNzYWdlOlwiTWVzc2FnZVwiXG5cdGFjdGlvbnM6W1wiQWdyZWVcIiwgXCJEZWNsaW5lXCJdXG59XG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXG5cdGRpYWxvZyA9IG5ldyBMYXllciBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiLCBuYW1lOlwiZGlhbG9nXCJcblx0ZGlhbG9nLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0dG9wOjBcblx0XHRib3R0b206MFxuXG5cdG92ZXJsYXkgPSBuZXcgTGF5ZXIgYmFja2dyb3VuZENvbG9yOlwiIzVFNUU1RVwiLCBzdXBlckxheWVyOmRpYWxvZywgbmFtZTpcIm92ZXJsYXlcIiwgb3BhY2l0eTouNlxuXHRvdmVybGF5LmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0dG9wOjBcblx0XHRib3R0b206MFxuXG5cdG1vZGFsID0gbmV3IExheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXHRcdHN1cGVyTGF5ZXI6ZGlhbG9nXG5cdFx0Ym9yZGVyUmFkaXVzOm0udXRpbHMucHgoMilcblx0XHRuYW1lOlwibW9kYWxcIlxuXHRcdHNoYWRvd0NvbG9yOlwicmdiYSgwLDAsMCwuMilcIlxuXHRcdHNoYWRvd1k6MjRcblx0XHRzaGFkb3dCbHVyOjI0XG5cdFx0Y2xpcDp0cnVlXG5cdG1vZGFsLmNvbnN0cmFpbnRzID1cblx0XHRhbGlnbjpcImNlbnRlclwiXG5cdFx0d2lkdGg6MjgwXG5cdFx0aGVpZ2h0OjQwMFxuXG5cdHRpdGxlID0gbmV3IG0uVGV4dFxuXHRcdHN1cGVyTGF5ZXI6bW9kYWxcblx0XHR0ZXh0OnNldHVwLnRpdGxlXG5cdFx0Zm9udFdlaWdodDpcInNlbWlib2xkXCJcblx0XHRmb250U2l6ZToyMFxuXHRcdG5hbWU6XCJ0aXRsZVwiXG5cdFx0bGluZUhlaWdodDoyMFxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0dG9wOjIwXG5cdFx0XHR3aWR0aDoyMjBcblx0XHRcdGxlYWRpbmc6MjRcblxuXHRtZXNzYWdlID0gbmV3IG0uVGV4dFxuXHRcdHN1cGVyTGF5ZXI6bW9kYWxcblx0XHR0ZXh0OnNldHVwLm1lc3NhZ2Vcblx0XHRmb250U2l6ZToxM1xuXHRcdG5hbWU6XCJtZXNzYWdlXCJcblx0XHRsaW5lSGVpZ2h0OjE2XG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6IFt0aXRsZSwgMTBdXG5cdFx0XHRsZWFkaW5nOjI0XG5cdFx0XHR3aWR0aDogMjIwXG5cblx0bS5sYXlvdXQuc2V0XG5cdFx0dGFyZ2V0OltkaWFsb2csIG92ZXJsYXksIG1vZGFsLCB0aXRsZSwgbWVzc2FnZV1cblxuXHQjVGl0bGUgKyBNZXNzYWdlICsgMSBzZXQgb2YgYWN0aW9uc1xuXHRtb2RhbC5jb25zdHJhaW50c1tcImhlaWdodFwiXSA9IDIwICsgbS51dGlscy5wdCh0aXRsZS5oZWlnaHQpICsgMTAgKyBtLnV0aWxzLnB0KG1lc3NhZ2UuaGVpZ2h0KSArIDI0ICsgNDRcblxuXHRtLmxheW91dC5zZXRcblx0XHR0YXJnZXQ6W292ZXJsYXksIG1vZGFsXVxuXHRkaWFsb2cuYWN0aW9ucyA9IHt9XG5cdGFjdGlvbnMgPSBbXVxuXHRjaGFyQ291bnQgPSAwXG5cdGlmIHNldHVwLmFjdGlvbnMubGVuZ3RoID4gMVxuXHRcdGNoYXJDb3VudCA9IHNldHVwLmFjdGlvbnNbMF0ubGVuZ3RoICsgc2V0dXAuYWN0aW9uc1sxXS5sZW5ndGhcblx0aWYgc2V0dXAuYWN0aW9ucy5sZW5ndGggPCAzICYmIGNoYXJDb3VudCA8IDI0XG5cdFx0Zm9yIGFjdCwgaW5kZXggaW4gc2V0dXAuYWN0aW9uc1xuXHRcdFx0YnV0dG9uID0gbmV3IG0uQnV0dG9uXG5cdFx0XHRcdHN1cGVyTGF5ZXI6bW9kYWxcblx0XHRcdFx0dGV4dDpzZXR1cC5hY3Rpb25zW2luZGV4XVxuXHRcdFx0XHRjb2xvcjpcImJsdWVcIlxuXHRcdFx0aWYgaW5kZXggPT0gMFxuXHRcdFx0XHRidXR0b24uY29uc3RyYWludHMgPSB7Ym90dG9tOjgsIHRyYWlsaW5nOjh9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cyA9IHtib3R0b206OCwgdHJhaWxpbmc6W2FjdGlvbnNbaW5kZXggLSAxXSwgOF19XG5cdFx0XHRkaWFsb2cuYWN0aW9uc1tzZXR1cC5hY3Rpb25zW2luZGV4XV0gPSBidXR0b25cblx0XHRcdGFjdGlvbnMucHVzaCBidXR0b25cblx0XHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0XHR0YXJnZXQ6YnV0dG9uXG5cdGVsc2Vcblx0XHRtb2RhbC5jb25zdHJhaW50c1tcImhlaWdodFwiXSA9IDIwICsgbS51dGlscy5wdCh0aXRsZS5oZWlnaHQpICsgMTAgKyBtLnV0aWxzLnB0KG1lc3NhZ2UuaGVpZ2h0KSArIDMyICsgKHNldHVwLmFjdGlvbnMubGVuZ3RoICogMzYpXG5cdFx0bS5sYXlvdXQuc2V0XG5cdFx0XHR0YXJnZXQ6bW9kYWxcblx0XHRsYXJnZXN0TGFiZWwgPSAwXG5cdFx0bGFyZ2VzdEJ1dHRvbiA9IDBcblx0XHRmb3IgYWN0LCBpbmRleCBpbiBzZXR1cC5hY3Rpb25zXG5cdFx0XHRidXR0b24gPSBuZXcgbS5CdXR0b25cblx0XHRcdFx0c3VwZXJMYXllcjptb2RhbFxuXHRcdFx0XHR0ZXh0OnNldHVwLmFjdGlvbnNbaW5kZXhdXG5cdFx0XHRcdGNvbG9yOlwiYmx1ZVwiXG5cdFx0XHRpZiBpbmRleCA9PSAwXG5cdFx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cyA9IHt0b3A6W21lc3NhZ2UsIDI0XSwgdHJhaWxpbmc6OH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzID0ge3RyYWlsaW5nOjgsIHRvcDphY3Rpb25zW2luZGV4IC0gMV19XG5cdFx0XHRkaWFsb2cuYWN0aW9uc1tzZXR1cC5hY3Rpb25zW2luZGV4XV0gPSBidXR0b25cblx0XHRcdGFjdGlvbnMucHVzaCBidXR0b25cblx0XHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0XHR0YXJnZXQ6YnV0dG9uXG5cblx0XHRcdGlmIGxhcmdlc3RMYWJlbCA8IGJ1dHRvbi5sYWJlbC53aWR0aFxuXHRcdFx0XHRsYXJnZXN0TGFiZWwgPSBidXR0b24ubGFiZWwud2lkdGhcblx0XHRcdFx0bGFyZ2VzdEJ1dHRvbiA9IGJ1dHRvbi53aWR0aFxuXG5cdFx0Zm9yIGFjdCBpbiBhY3Rpb25zXG5cdFx0XHRhY3QubGFiZWwuc3R5bGUudGV4dEFsaWduID0gXCJyaWdodFwiXG5cdFx0XHRhY3QubGFiZWwud2lkdGggPSBsYXJnZXN0TGFiZWxcblx0XHRcdGFjdC53aWR0aCA9IGxhcmdlc3RCdXR0b25cblx0XHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0XHR0YXJnZXQ6W2FjdCwgYWN0LmxhYmVsXVxuXG5cdCMgRXhwb3J0IGRpYWxvZ1xuXHRkaWFsb2cub3ZlcmxheSA9IG92ZXJsYXlcblx0ZGlhbG9nLm1vZGFsID0gbW9kYWxcblx0ZGlhbG9nLnRpdGxlID0gdGl0bGVcblx0ZGlhbG9nLm1lc3NhZ2UgPSBtZXNzYWdlXG5cblx0cmV0dXJuIGRpYWxvZ1xuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcbiAgbmFtZTogXCJzdGFyXCJcbiAgc2NhbGU6IG0uZGV2aWNlLnNjYWxlXG4gIGNvbG9yOiBtLmNvbG9yKFwiYmxhY2tcIilcbiAgc3VwZXJMYXllcjogdW5kZWZpbmVkXG4gIGNvbnN0cmFpbnRzOiB1bmRlZmluZWRcbiAgY2xpcDp0cnVlXG59XG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cbiAgc2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuICBpZiB0eXBlb2Ygc2V0dXAubmFtZSA9PSBcInN0cmluZ1wiXG4gICAgaWNvbkxheWVyID0gbmV3IExheWVyXG4gICAgICBodG1sOlwiPGkgY2xhc3M9J21hdGVyaWFsLWljb25zIG1kLTI0Jz4je3NldHVwLm5hbWV9PC9pPlwiXG4gICAgICBjb2xvcjptLmNvbG9yKHNldHVwLmNvbG9yKVxuICAgICAgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuICAgICAgY2xpcDpzZXR1cC5jbGlwXG4gICAgICBuYW1lOnNldHVwLm5hbWVcbiAgICAgIHN1cGVyTGF5ZXI6c2V0dXAuc3VwZXJMYXllclxuXG4gICAgcGFkZGluZ1JpZ2h0ID0gMFxuICAgIHBhZGRpbmdUb3AgPSAwXG5cbiAgICBzd2l0Y2ggbS5kZXZpY2Uuc2NhbGVcbiAgICAgIHdoZW4gNFxuICAgICAgICBwYWRkaW5nVG9wID0gbS5weCgxMikgKyBcInB4XCJcbiAgICAgICAgcGFkZGluZ1JpZ2h0ID0gbS5weCgyKSArIFwicHhcIlxuICAgICAgd2hlbiAzXG4gICAgICAgIHBhZGRpbmdUb3AgPSBtLnB4KDEwKSArIFwicHhcIlxuICAgICAgICBwYWRkaW5nUmlnaHQgPSBtLnB4KDYpICsgXCJweFwiXG4gICAgICB3aGVuIDJcbiAgICAgICAgcGFkZGluZ1RvcCA9IG0ucHgoOCkgKyBcInB4XCJcbiAgICAgICAgcGFkZGluZ1JpZ2h0ID0gbS5weCg4KSArIFwicHhcIlxuICAgICAgd2hlbiAxXG4gICAgICAgIHBhZGRpbmdUb3AgPSBtLnB4KDE2KSArIFwicHhcIlxuICAgICAgICBwYWRkaW5nUmlnaHQgPSBtLnB4KDcpICsgXCJweFwiXG5cblxuICAgIGZyYW1lID0gbS51dGlscy50ZXh0QXV0b1NpemUoaWNvbkxheWVyKVxuICAgIGljb25MYXllci5odG1sID0gXCI8c3BhbiBzdHlsZT0nLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKCN7c2V0dXAuc2NhbGV9KTsgcG9zaXRpb246IGFic29sdXRlOyc+XCIgKyBpY29uTGF5ZXIuaHRtbFxuICAgIGljb25MYXllci53aWR0aCA9IG0ucHgoMjQpXG4gICAgaWNvbkxheWVyLmhlaWdodCA9IG0ucHgoZnJhbWUuaGVpZ2h0KVxuXG4gICAgaWNvbkxheWVyLnN0eWxlID1cbiAgICAgIFwiZGlzcGxheVwiIDogXCJpbmxpbmUtYmxvY2tcIlxuICAgICAgXCJwYWRkaW5nLXRvcFwiIDogcGFkZGluZ1RvcFxuICAgICAgXCJwYWRkaW5nLXJpZ2h0XCIgOiBwYWRkaW5nUmlnaHRcbiAgICAgIFwidGV4dC1hbGlnblwiIDogXCJjZW50ZXJcIlxuICAgIGlmIHNldHVwLmNvbnN0cmFpbnRzXG4gICAgICBpY29uTGF5ZXIuY29uc3RyYWludHMgPSBzZXR1cC5jb25zdHJhaW50c1xuICAgICAgbS5sYXlvdXQuc2V0XG4gICAgICAgIHRhcmdldDppY29uTGF5ZXJcblxuICAgIHJldHVybiBpY29uTGF5ZXJcbiAgZWxzZVxuICAgIGljb25MYXllciA9IHNldHVwLmxheWVyXG4gICAgcmV0dXJuIGljb25MYXllclxuIiwiIyBVdGlsc1xuXG5tID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHRhbmltYXRpb25zOiB7XG5cdFx0dGFyZ2V0OnVuZGVmaW5lZFxuXHRcdGNvbnN0cmFpbnRzOiB1bmRlZmluZWRcblx0XHRjdXJ2ZSA6IFwiZWFzZS1pbi1vdXRcIlxuXHRcdGN1cnZlT3B0aW9uczogdW5kZWZpbmVkXG5cdFx0dGltZToxXG5cdFx0ZGVsYXk6MFxuXHRcdHJlcGVhdDp1bmRlZmluZWRcblx0XHRjb2xvck1vZGVsOnVuZGVmaW5lZFxuXHRcdHN0YWdnZXI6dW5kZWZpbmVkXG5cdFx0ZmFkZU91dDpmYWxzZVxuXHRcdGZhZGVJbjpmYWxzZVxuXHR9XG59XG5cbmxheW91dCA9IChhcnJheSkgLT5cblx0c2V0dXAgPSB7fVxuXHR0YXJnZXRMYXllcnMgPSBbXVxuXHRibHVlcHJpbnQgPSBbXVxuXHRpZiBhcnJheVxuXHRcdGZvciBpIGluIE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9ucylcblx0XHRcdGlmIGFycmF5W2ldXG5cdFx0XHRcdHNldHVwW2ldID0gYXJyYXlbaV1cblx0XHRcdGVsc2Vcblx0XHRcdFx0c2V0dXBbaV0gPSBleHBvcnRzLmRlZmF1bHRzLmFuaW1hdGlvbnNbaV1cblxuXHRpZiBzZXR1cC50YXJnZXRcblx0XHRpZiBzZXR1cC50YXJnZXQubGVuZ3RoXG5cdFx0XHR0YXJnZXRMYXllcnMgPSBzZXR1cC50YXJnZXRcblx0XHRlbHNlXG5cdFx0XHR0YXJnZXRMYXllcnMucHVzaCBzZXR1cC50YXJnZXRcblx0ZWxzZVxuXHRcdHRhcmdldExheWVycyA9IEZyYW1lci5DdXJyZW50Q29udGV4dC5sYXllcnNcblxuXHRpZiBzZXR1cC50YXJnZXRcblx0XHRpZiBzZXR1cC5jb25zdHJhaW50c1xuXHRcdFx0Zm9yIG5ld0NvbnN0cmFpbnQgaW4gT2JqZWN0LmtleXMoc2V0dXAuY29uc3RyYWludHMpXG5cdFx0XHRcdHNldHVwLnRhcmdldC5jb25zdHJhaW50c1tuZXdDb25zdHJhaW50XSA9IHNldHVwLmNvbnN0cmFpbnRzW25ld0NvbnN0cmFpbnRdXG5cblxuXHQjVHJhbnNsYXRlIG5ldyBjb25zdHJhaW50c1xuXHRmb3IgbGF5ZXIsIGluZGV4IGluIHRhcmdldExheWVyc1xuXHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbiA9IHt9XG5cdFx0aWYgbGF5ZXIuY29uc3RyYWludHNcblxuXHRcdFx0cHJvcHMgPSB7fVxuXHRcdFx0bGF5ZXIuc3VwZXJGcmFtZSA9IHt9XG5cblx0XHRcdGlmIGxheWVyLnN1cGVyTGF5ZXJcblx0XHRcdFx0bGF5ZXIuc3VwZXJGcmFtZS5oZWlnaHQgPSBsYXllci5zdXBlckxheWVyLmhlaWdodFxuXHRcdFx0XHRsYXllci5zdXBlckZyYW1lLndpZHRoID0gbGF5ZXIuc3VwZXJMYXllci53aWR0aFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRsYXllci5zdXBlckZyYW1lLmhlaWdodCA9IG0uZGV2aWNlLmhlaWdodFxuXHRcdFx0XHRsYXllci5zdXBlckZyYW1lLndpZHRoID0gbS5kZXZpY2Uud2lkdGhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZyAhPSB1bmRlZmluZWQgJiYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aCA9IHt9XG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcCAhPSB1bmRlZmluZWQgJiYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0ID0ge31cblxuXHRcdFx0IyBTaXplIGNvbnN0cmFpbnRzXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy53aWR0aCAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMud2lkdGggPSBtLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLndpZHRoKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRwcm9wcy53aWR0aCA9IGxheWVyLndpZHRoXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmhlaWdodCAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMuaGVpZ2h0ID0gbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy5oZWlnaHQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHByb3BzLmhlaWdodCA9IGxheWVyLmhlaWdodFxuXG5cblx0XHRcdCMgQWxpZ25pbmcgY29uc3RyYWludHNcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdFZGdlcyAhPSB1bmRlZmluZWRcblxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnggPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMubGVhZGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ0VkZ2VzLnhcblxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi54XG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nRWRnZXMgIT0gdW5kZWZpbmVkXG5cblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy50cmFpbGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID0gbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdFZGdlcy54XG5cblx0XHRcdFx0cHJvcHMueCA9IGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnggLSBwcm9wcy53aWR0aCArIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcEVkZ2VzICE9IHVuZGVmaW5lZFxuXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcEVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLnRvcEVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMudG9wRWRnZXMueVxuXG5cdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy50b3BFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueVxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcyAhPSB1bmRlZmluZWRcblxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueSA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueSA9IGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbUVkZ2VzLnlcblxuXHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnkgLSBwcm9wcy5oZWlnaHQgKyBsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0XG5cblxuXHRcdFx0IyBQb3NpdGlvbmluZyBjb25zdHJhaW50c1xuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZyAhPSB1bmRlZmluZWRcblx0XHRcdFx0I0lmIGl0J3MgYSBudW1iZXJgXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcgPT0gcGFyc2VJbnQobGF5ZXIuY29uc3RyYWludHMubGVhZGluZywgMTApXG5cdFx0XHRcdFx0cHJvcHMueCA9IG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMubGVhZGluZylcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgbGF5ZXJcblx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nLmxlbmd0aCA9PSB1bmRlZmluZWRcblxuXHRcdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMubGVhZGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCA9IGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcueFxuXG5cdFx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCArIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoXG5cblx0XHRcdFx0XHQjSWYgaXQncyBhIHJlbGF0aW9uc2hpcFxuXHRcdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMubGVhZGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCA9IGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdbMF0ueFxuXG5cdFx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCArIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdbMF0uY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoICsgbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy5sZWFkaW5nWzFdKVxuXG5cdFx0XHQjIE9wcG9zaW5nIGNvbnN0cmFpbnRzIGhhbmRsZXJcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aCAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLnN0YXJ0WCA9IHByb3BzLnhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdCNJZiBpdCdzIGEgbnVtYmVyXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nID09IHBhcnNlSW50KGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nLCAxMClcblx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuc3VwZXJGcmFtZS53aWR0aCAtIG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcpIC0gcHJvcHMud2lkdGhcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSBsYXllclxuXHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nLmxlbmd0aCA9PSB1bmRlZmluZWRcblxuXHRcdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLnggPT0gdW5kZWZpbmVkXG5cblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZy54XG5cdFx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcuY2FsY3VsYXRlZFBvc2l0aW9uLnggLSBwcm9wcy53aWR0aFxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgcmVsYXRpb25zaGlwXG5cdFx0XHRcdFx0ZWxzZVxuXG5cdFx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdbMF0uY2FsY3VsYXRlZFBvc2l0aW9uLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1swXS54XG5cblx0XHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCAtIG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdbMV0pIC0gcHJvcHMud2lkdGhcblxuXHRcdFx0IyBPcHBvc2luZyBjb25zdHJhaW50cyBoYW5kbGVyXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hdXRvV2lkdGggIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aC5jYWxjdWxhdGVkUG9zaXRpb25YID0gcHJvcHMueFxuXG5cdFx0XHRcdCMjcGVyZm9ybSBhdXRvc2l6ZVxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLnN0YXJ0WFxuXHRcdFx0XHRwcm9wcy53aWR0aCA9IGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aC5jYWxjdWxhdGVkUG9zaXRpb25YIC0gbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLnN0YXJ0WCArIHByb3BzLndpZHRoXG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcCAhPSB1bmRlZmluZWRcblx0XHRcdFx0I0lmIGl0J3MgYSBudW1iZXJcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wID09IHBhcnNlSW50KGxheWVyLmNvbnN0cmFpbnRzLnRvcCwgMTApXG5cdFx0XHRcdFx0cHJvcHMueSA9IG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMudG9wKVxuXG5cdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgbGF5ZXJcblx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50b3AubGVuZ3RoID09IHVuZGVmaW5lZFxuXG5cdFx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50b3AuY2FsY3VsYXRlZFBvc2l0aW9uLnkgPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLnRvcC5jYWxjdWxhdGVkUG9zaXRpb24ueSA9IGxheWVyLmNvbnN0cmFpbnRzLnRvcC55XG5cblx0XHRcdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy50b3AuY2FsY3VsYXRlZFBvc2l0aW9uLnkgKyBsYXllci5jb25zdHJhaW50cy50b3AuY2FsY3VsYXRlZFBvc2l0aW9uLmhlaWdodFxuXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSByZWxhdGlvbnNoaXBcblx0XHRcdFx0XHRlbHNlXG5cblx0XHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcFswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMudG9wWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMudG9wWzBdLnlcblxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLnRvcFswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSArIGxheWVyLmNvbnN0cmFpbnRzLnRvcFswXS5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0ICsgbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy50b3BbMV0pXG5cblx0XHRcdCMgT3Bwb3NpbmcgY29uc3RyYWludHMgaGFuZGxlclxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodCAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodC5zdGFydFkgPSBwcm9wcy55XG5cblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tICE9IHVuZGVmaW5lZFxuXHRcdFx0XHQjSWYgaXQncyBhIG51bWJlclxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ib3R0b20gPT0gcGFyc2VJbnQobGF5ZXIuY29uc3RyYWludHMuYm90dG9tLCAxMClcblx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuc3VwZXJGcmFtZS5oZWlnaHQgLSBtLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbSkgLSBwcm9wcy5oZWlnaHRcblxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSBsYXllclxuXHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbS5sZW5ndGggPT0gdW5kZWZpbmVkXG5cblx0XHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbS5jYWxjdWxhdGVkUG9zaXRpb24ueSA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYm90dG9tLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tLnlcblxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbS5jYWxjdWxhdGVkUG9zaXRpb24ueSAtIHByb3BzLmhlaWdodFxuXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSByZWxhdGlvbnNoaXBcblx0XHRcdFx0XHRlbHNlXG5cblx0XHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbVswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYm90dG9tWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tWzBdLnlcblxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbVswXS5jYWxjdWxhdGVkUG9zaXRpb24ueSAtICBtLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbVsxXSkgLSBwcm9wcy5oZWlnaHRcblxuXHRcdFx0IyBPcHBvc2luZyBjb25zdHJhaW50cyBoYW5kbGVyXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0LmNhbGN1bGF0ZWRQb3NpdGlvblkgPSBwcm9wcy55XG5cdFx0XHRcdCMjIHBlcmZvcm0gYXV0b3NpemVcblx0XHRcdFx0cHJvcHMuaGVpZ2h0ID0gbGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodC5jYWxjdWxhdGVkUG9zaXRpb25ZIC0gbGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodC5zdGFydFkgKyBwcm9wcy5oZWlnaHRcblx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQuc3RhcnRZXG5cblxuXHRcdFx0IyBBbGlnbm1lbnQgY29uc3RyYWludHNcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmFsaWduICE9IHVuZGVmaW5lZFxuXHRcdFx0XHQjU2V0IHRoZSBjZW50ZXJpbmcgZnJhbWVcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYWxpZ24gPT0gXCJob3Jpem9udGFsXCJcblx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuc3VwZXJGcmFtZS53aWR0aCAvIDIgLSBwcm9wcy53aWR0aCAvIDJcblxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hbGlnbiA9PSBcInZlcnRpY2FsXCJcblx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuc3VwZXJGcmFtZS5oZWlnaHQgLyAyIC0gcHJvcHMuaGVpZ2h0IC8gMlxuXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmFsaWduID09IFwiY2VudGVyXCJcblx0XHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuc3VwZXJGcmFtZS53aWR0aCAvIDIgLSBwcm9wcy53aWR0aCAvIDJcblx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuc3VwZXJGcmFtZS5oZWlnaHQgLyAyIC0gcHJvcHMuaGVpZ2h0IC8gMlxuXG5cblx0XHRcdCMgQ2VudGVyaW5nIGNvbnN0cmFpbnRzXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ob3Jpem9udGFsQ2VudGVyICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMuaG9yaXpvbnRhbENlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ueCArIChsYXllci5jb25zdHJhaW50cy5ob3Jpem9udGFsQ2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi53aWR0aCAtIHByb3BzLndpZHRoKSAvIDJcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudmVydGljYWxDZW50ZXIgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy52ZXJ0aWNhbENlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ueSArIChsYXllci5jb25zdHJhaW50cy52ZXJ0aWNhbENlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0IC0gcHJvcHMuaGVpZ2h0KSAvIDJcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuY2VudGVyICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMuY2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi54ICsgKGxheWVyLmNvbnN0cmFpbnRzLmNlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ud2lkdGggLSBwcm9wcy53aWR0aCkgLyAyXG5cdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy5jZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLnkgKyAobGF5ZXIuY29uc3RyYWludHMuY2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi5oZWlnaHQgLSBwcm9wcy5oZWlnaHQpIC8gMlxuXG5cdFx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24gPSBwcm9wc1xuXHRcdGVsc2Vcblx0XHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbiA9IGxheWVyLnByb3BzXG5cblx0XHRibHVlcHJpbnQucHVzaCBsYXllclxuXG5cblx0cmV0dXJuIGJsdWVwcmludFxuXG5leHBvcnRzLnNldCA9IChhcnJheSkgLT5cblx0c2V0dXAgPSB7fVxuXHRwcm9wcyA9IHt9XG5cdGlmIGFycmF5XG5cdFx0Zm9yIGkgaW4gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zKVxuXHRcdFx0aWYgYXJyYXlbaV1cblx0XHRcdFx0c2V0dXBbaV0gPSBhcnJheVtpXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzZXR1cFtpXSA9IGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9uc1tpXVxuXG5cdGJsdWVwcmludCA9IGxheW91dChhcnJheSlcblxuXHRmb3IgbGF5ZXIsIGluZGV4IGluIGJsdWVwcmludFxuXHRcdGZvciBrZXkgaW4gT2JqZWN0LmtleXMobGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uKVxuXHRcdFx0bGF5ZXJba2V5XSA9IGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbltrZXldXG5cbmV4cG9ydHMuYW5pbWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSB7fVxuXHRwcm9wcyA9IHt9XG5cdGlmIGFycmF5XG5cdFx0Zm9yIGkgaW4gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zKVxuXHRcdFx0aWYgYXJyYXlbaV1cblx0XHRcdFx0c2V0dXBbaV0gPSBhcnJheVtpXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzZXR1cFtpXSA9IGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9uc1tpXVxuXG5cdGJsdWVwcmludCA9IGxheW91dChhcnJheSlcblxuXHRmb3IgbGF5ZXIsIGluZGV4IGluIGJsdWVwcmludFxuXHRcdCNUaW1pbmdcblx0XHRkZWxheSA9IHNldHVwLmRlbGF5XG5cdFx0aWYgc2V0dXAuc3RhZ2dlclxuXHRcdFx0c3RhZyA9IHNldHVwLnN0YWdnZXJcblx0XHRcdGRlbGF5ID0gKChpbmRleCkgKiBzdGFnKSArIGRlbGF5XG5cblx0XHRpZiBzZXR1cC5mYWRlT3V0XG5cdFx0XHRpZiBsYXllciA9PSBzZXR1cC5mYWRlT3V0XG5cdFx0XHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbi5vcGFjaXR5ID0gMFxuXG5cdFx0aWYgc2V0dXAuZmFkZUluXG5cdFx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24ub3BhY2l0eSA9IDFcblxuXHRcdGxheWVyLmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uXG5cdFx0XHR0aW1lOnNldHVwLnRpbWVcblx0XHRcdGRlbGF5OmRlbGF5XG5cdFx0XHRjdXJ2ZTpzZXR1cC5jdXJ2ZVxuXHRcdFx0cmVwZWF0OnNldHVwLnJlcGVhdFxuXHRcdFx0Y29sb3JNb2RlbDpzZXR1cC5jb2xvck1vZGVsXG5cdFx0XHRjdXJ2ZU9wdGlvbnM6c2V0dXAuY3VydmVPcHRpb25zXG5cblx0XHRsYXllci5jYWxjdWxhdGVkUG9zaXRpb24gPSBwcm9wc1xuIiwibSA9IHJlcXVpcmUgXCJtYXRlcmlhbC1raXRcIlxuXG4jIEJ1aWxkIExpYnJhcnkgIFByb3BlcnRpZXNcbmxheWVyID0gbmV3IExheWVyXG5leHBvcnRzLmxheWVyUHJvcHMgPSBPYmplY3Qua2V5cyhsYXllci5wcm9wcylcbmV4cG9ydHMubGF5ZXJQcm9wcy5wdXNoIFwic3VwZXJMYXllclwiXG5leHBvcnRzLmxheWVyUHJvcHMucHVzaCBcImNvbnN0cmFpbnRzXCJcbmV4cG9ydHMubGF5ZXJTdHlsZXMgPSBPYmplY3Qua2V5cyhsYXllci5zdHlsZSlcbmxheWVyLmRlc3Ryb3koKVxuXG5leHBvcnRzLmFzc2V0cyA9IHtcblx0aG9tZTpcIjxzdmcgd2lkdGg9JzE2cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMTcyIDE2IDE2IDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdCAgICA8ZGVmcz5cblx0XHQgICAgICAgIDxlbGxpcHNlIGlkPSdwYXRoLTEnIGN4PScxODAnIGN5PScyNCcgcng9JzgnIHJ5PSc4Jz48L2VsbGlwc2U+XG5cdFx0ICAgICAgICA8bWFzayBpZD0nbWFzay0yJyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzE2JyBoZWlnaHQ9JzE2JyBmaWxsPSd3aGl0ZSc+XG5cdFx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0xJz48L3VzZT5cblx0XHQgICAgICAgIDwvbWFzaz5cblx0XHQgICAgPC9kZWZzPlxuXHRcdCAgICA8dXNlIGlkPSdob21lJyBzdHJva2U9JyNGRkZGRkYnIG1hc2s9J3VybCgjbWFzay0yKScgc3Ryb2tlLXdpZHRoPSc0JyBmaWxsPSdub25lJyB4bGluazpocmVmPScjcGF0aC0xJz48L3VzZT5cblx0XHQ8L3N2Zz5cIlxuXHRiYWNrOlwiPHN2ZyB3aWR0aD0nMTZweCcgaGVpZ2h0PScxOXB4JyB2aWV3Qm94PSczMDEgMTQgMTYgMTknIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG4gICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuICAgIDxkZWZzPjwvZGVmcz5cbiAgICA8cGF0aCBkPSdNMzA3LjAyOTM4MywxNy43NjcxNzMzIEMzMDcuNTgwMDI3LDE2LjgwMzU0NTMgMzA4LjUxMDI5MiwxNi43NzUwNzEzIDMwOS4xMTIwMjMsMTcuNzExMDk3NiBMMzE1Ljk0MDgwMiwyOC4zMzM2NDM1IEMzMTYuNTQwMzY4LDI5LjI2NjMwMTcgMzE2LjEzNjM1NCwzMC4wMjIzNzA2IDMxNS4wMjYzMDYsMzAuMDIyMzcwNiBMMzAyLjAyNjUxOSwzMC4wMjIzNzA2IEMzMDAuOTIxODkxLDMwLjAyMjM3MDYgMzAwLjQ2NzkyMywyOS4yNDk3MjggMzAxLjAyMzQ0MywyOC4yNzc1Njc5IEwzMDcuMDI5MzgzLDE3Ljc2NzE3MzMgWicgaWQ9J1RyaWFuZ2xlLTEnIHN0cm9rZT0nI0ZGRkZGRicgc3Ryb2tlLXdpZHRoPScyJyBmaWxsPSdub25lJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzMDguNTAyMDIxLCAyMy41MjQzOTEpIHJvdGF0ZSgtOTAuMDAwMDAwKSB0cmFuc2xhdGUoLTMwOC41MDIwMjEsIC0yMy41MjQzOTEpICc+PC9wYXRoPlxuXHRcdDwvc3ZnPlwiXG5cdGNlbGx1bGFyOlwiPHN2ZyB3aWR0aD0nMTZweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PSczNSA0IDE2IDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cbiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cbiAgICA8ZGVmcz48L2RlZnM+XG4gICAgPGcgaWQ9J2NlbGx1bGFyJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzNS4wMDAwMDAsIDQuMDAwMDAwKSc+XG4gICAgICAgIDxwb2x5Z29uIGlkPSdib3VuZHMnIHBvaW50cz0nMCAwIDE2IDAgMTYgMTYgMCAxNic+PC9wb2x5Z29uPlxuICAgICAgICA8cG9seWdvbiBpZD0nU2hhcGUnIGZpbGw9JyMwMDAwMDAnIHBvaW50cz0nMCAxNSAxNCAxNSAxNCAxJz48L3BvbHlnb24+XG4gICAgPC9nPlxuXHRcdDwvc3ZnPlwiXG5cdGJhdHRlcnlIaWdoIDogXCI8c3ZnIHdpZHRoPSc5cHgnIGhlaWdodD0nMTRweCcgdmlld0JveD0nMyAxIDkgMTQnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0ICAgIDxkZWZzPjwvZGVmcz5cblx0ICAgIDxwb2x5Z29uIGlkPSdTaGFwZScgc3Ryb2tlPSdub25lJyBmaWxsPScjMDAwMDAwJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHBvaW50cz0nOSAxLjg3NSA5IDEgNiAxIDYgMS44NzUgMyAxLjg3NSAzIDE1IDEyIDE1IDEyIDEuODc1Jz48L3BvbHlnb24+XG5cdDwvc3ZnPlwiXG5cdGJhbm5lckJHIDoge1xuXHRcdFwiaXBob25lLTVcIjogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzMyMHB4JyBoZWlnaHQ9JzY4cHgnIHZpZXdCb3g9JzAgMCAzMjAgNjgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0ICAgIDx0aXRsZT5pcGhvbmU1PC90aXRsZT5cblx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdCAgICA8ZGVmcz48L2RlZnM+XG5cdFx0XHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScwLjknPlxuXHRcdFx0ICAgICAgICA8ZyBpZD0naVBob25lLTUvNVMvNUMnIGZpbGw9JyMxQTFBMUMnPlxuXHRcdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTAsMCBMMzIwLDAgTDMyMCw2OCBMMCw2OCBMMCwwIFogTTE0Miw2MS4wMDQ4ODE1IEMxNDIsNTkuODk3NjE2IDE0Mi44OTYyNzksNTkgMTQ0LjAwMjQsNTkgTDE3Ni45OTc2LDU5IEMxNzguMTAzNDk1LDU5IDE3OSw1OS44OTM4OTk4IDE3OSw2MS4wMDQ4ODE1IEwxNzksNjEuOTk1MTE4NSBDMTc5LDYzLjEwMjM4NCAxNzguMTAzNzIxLDY0IDE3Ni45OTc2LDY0IEwxNDQuMDAyNCw2NCBDMTQyLjg5NjUwNSw2NCAxNDIsNjMuMTA2MTAwMiAxNDIsNjEuOTk1MTE4NSBMMTQyLDYxLjAwNDg4MTUgWicgaWQ9J2lwaG9uZTUnPjwvcGF0aD5cblx0XHRcdCAgICAgICAgPC9nPlxuXHRcdFx0ICAgIDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGhvbmUtNnNcIjogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMzc1cHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDM3NSA2OCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNiAoMjYzMDQpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHRcdDx0aXRsZT5Ob3RpZmljYXRpb24gYmFja2dyb3VuZDwvdGl0bGU+XG5cdFx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGZpbGwtb3BhY2l0eT0nMC45Jz5cblx0XHRcdFx0XHRcdDxnIGlkPSdpT1M4LVB1c2gtTm90aWZpY2F0aW9uJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNTguMDAwMDAwLCAtMjMuMDAwMDAwKScgZmlsbD0nIzFBMUExQyc+XG5cdFx0XHRcdFx0XHRcdDxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDU4LjAwMDAwMCwgNy4wMDAwMDApJyBpZD0nTm90aWZpY2F0aW9uLWNvbnRhaW5lcic+XG5cdFx0XHRcdFx0XHRcdFx0PGc+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMCwxNiBMMzc1LDE2IEwzNzUsODQgTDAsODQgTDAsMTYgWiBNMTY5LDc3LjAwNDg4MTUgQzE2OSw3NS44OTc2MTYgMTY5Ljg5NjI3OSw3NSAxNzEuMDAyNCw3NSBMMjAzLjk5NzYsNzUgQzIwNS4xMDM0OTUsNzUgMjA2LDc1Ljg5Mzg5OTggMjA2LDc3LjAwNDg4MTUgTDIwNiw3Ny45OTUxMTg1IEMyMDYsNzkuMTAyMzg0IDIwNS4xMDM3MjEsODAgMjAzLjk5NzYsODAgTDE3MS4wMDI0LDgwIEMxNjkuODk2NTA1LDgwIDE2OSw3OS4xMDYxMDAyIDE2OSw3Ny45OTUxMTg1IEwxNjksNzcuMDA0ODgxNSBaJyBpZD0nTm90aWZpY2F0aW9uLWJhY2tncm91bmQnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGhvbmUtNnMtcGx1c1wiIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nNDE0cHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDQxNCA2OCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYgKDI2MzA0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPk5vdGlmaWNhdGlvbiBiYWNrZ3JvdW5kIENvcHk8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzAuOSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lPUzgtUHVzaC1Ob3RpZmljYXRpb24nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC00My4wMDAwMDAsIC03NC4wMDAwMDApJyBmaWxsPScjMUExQTFDJz5cblx0XHRcdFx0XHRcdDxnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDQzLjAwMDAwMCwgNzQuMDAwMDAwKScgaWQ9J05vdGlmaWNhdGlvbi1jb250YWluZXInPlxuXHRcdFx0XHRcdFx0XHQ8Zz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMCwwIEw0MTQsMCBMNDE0LDY4IEwwLDY4IEwwLDAgWiBNMTg5LDYxLjAwNDg4MTUgQzE4OSw1OS44OTc2MTYgMTg5Ljg5NjI3OSw1OSAxOTEuMDAyNCw1OSBMMjIzLjk5NzYsNTkgQzIyNS4xMDM0OTUsNTkgMjI2LDU5Ljg5Mzg5OTggMjI2LDYxLjAwNDg4MTUgTDIyNiw2MS45OTUxMTg1IEMyMjYsNjMuMTAyMzg0IDIyNS4xMDM3MjEsNjQgMjIzLjk5NzYsNjQgTDE5MS4wMDI0LDY0IEMxODkuODk2NTA1LDY0IDE4OSw2My4xMDYxMDAyIDE4OSw2MS45OTUxMTg1IEwxODksNjEuMDA0ODgxNSBaJyBpZD0nTm90aWZpY2F0aW9uLWJhY2tncm91bmQtQ29weSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRcdFwiaXBhZFwiIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nNzY4cHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDc2OCA2OCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0ICAgIDx0aXRsZT5pcGFkLXBvcnRyYWl0PC90aXRsZT5cblx0XHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScwLjknPlxuXHRcdFx0XHQgICAgICAgIDxnIGlkPSdpUGFkLVBvcnRyYWl0JyBmaWxsPScjMUExQTFDJz5cblx0XHRcdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTAsMCBMNzY4LDAgTDc2OCw2OCBMMCw2OCBMMCwwIFogTTM2Niw2MS4wMDQ4ODE1IEMzNjYsNTkuODk3NjE2IDM2Ni44OTYyNzksNTkgMzY4LjAwMjQsNTkgTDQwMC45OTc2LDU5IEM0MDIuMTAzNDk1LDU5IDQwMyw1OS44OTM4OTk4IDQwMyw2MS4wMDQ4ODE1IEw0MDMsNjEuOTk1MTE4NSBDNDAzLDYzLjEwMjM4NCA0MDIuMTAzNzIxLDY0IDQwMC45OTc2LDY0IEwzNjguMDAyNCw2NCBDMzY2Ljg5NjUwNSw2NCAzNjYsNjMuMTA2MTAwMiAzNjYsNjEuOTk1MTE4NSBMMzY2LDYxLjAwNDg4MTUgWicgaWQ9J2lwYWQtcG9ydHJhaXQnPjwvcGF0aD5cblx0XHRcdFx0ICAgICAgICA8L2c+XG5cdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGFkLXByb1wiIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdFx0PHN2ZyB3aWR0aD0nMTAyNHB4JyBoZWlnaHQ9JzY4cHgnIHZpZXdCb3g9JzAgMCAxMDI0IDY4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQgICAgPHRpdGxlPmlwYWQtcHJvLXBvcnRyYWl0PC90aXRsZT5cblx0XHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScwLjknPlxuXHRcdFx0XHQgICAgICAgIDxnIGlkPSdpUGFkLVByby1Qb3J0cmFpdCcgZmlsbD0nIzFBMUExQyc+XG5cdFx0XHRcdCAgICAgICAgICAgIDxwYXRoIGQ9J00wLDAgTDEwMjQsMCBMMTAyNCw2OCBMMCw2OCBMMCwwIFogTTQ5NCw2MS4wMDQ4ODE1IEM0OTQsNTkuODk3NjE2IDQ5NC44OTYyNzksNTkgNDk2LjAwMjQsNTkgTDUyOC45OTc2LDU5IEM1MzAuMTAzNDk1LDU5IDUzMSw1OS44OTM4OTk4IDUzMSw2MS4wMDQ4ODE1IEw1MzEsNjEuOTk1MTE4NSBDNTMxLDYzLjEwMjM4NCA1MzAuMTAzNzIxLDY0IDUyOC45OTc2LDY0IEw0OTYuMDAyNCw2NCBDNDk0Ljg5NjUwNSw2NCA0OTQsNjMuMTA2MTAwMiA0OTQsNjEuOTk1MTE4NSBMNDk0LDYxLjAwNDg4MTUgWicgaWQ9J2lwYWQtcHJvLXBvcnRyYWl0Jz48L3BhdGg+XG5cdFx0XHRcdCAgICAgICAgPC9nPlxuXHRcdFx0XHQgICAgPC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHR9XG5cdHdpZmk6XCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cbjxzdmcgd2lkdGg9JzE4cHgnIGhlaWdodD0nMTRweCcgdmlld0JveD0nMCAwIDE4IDE0JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cbiAgICA8dGl0bGU+U2hhcGU8L3RpdGxlPlxuICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuICAgIDxkZWZzPjwvZGVmcz5cbiAgICA8ZyBpZD0nTWF0ZXJpYWwtRGVzaWduLVN5bWJvbHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuICAgICAgICA8ZyBpZD0nTWF0ZXJpYWwvQW5kcm9pZC9TdGF0dXMtYmFyLWNvbnRlbnQtbGlnaHQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNS4wMDAwMDAsIC01LjAwMDAwMCknIGZpbGw9JyMwMDAwMDAnPlxuICAgICAgICAgICAgPGcgaWQ9J3dpZmknIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE0LjAwMDAwMCwgNC4wMDAwMDApJz5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPSdNMTkuMDIyNjI3OSw0LjAxNTkzMTIzIEMxNi41MTE3ODA5LDIuMTIyNTYzODIgMTMuMzg2OTg0OSwxIDEwLDEgQzYuNjEzMDE1MTMsMSAzLjQ4ODIxOTA4LDIuMTIyNTYzODIgMC45NzczNzIwODUsNC4wMTU5MzEyMyBMMTAsMTUgTDE5LjAyMjYyNzksNC4wMTU5MzEyMyBaJyBpZD0nU2hhcGUnPjwvcGF0aD5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgPC9nPlxuICAgIDwvZz5cbjwvc3ZnPlwiXG5cdHNpZ25hbEhpZ2g6IFwiXG48c3ZnIHdpZHRoPScxNHB4JyBoZWlnaHQ9JzE0cHgnIHZpZXdCb3g9JzAgMSAxNCAxNCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cbiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG4gICAgPGRlZnM+PC9kZWZzPlxuICAgIDxwb2x5Z29uIGlkPSdTaGFwZScgc3Ryb2tlPSdub25lJyBmaWxsPScjRkZGRkZGJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHBvaW50cz0nMCAxNSAxNCAxNSAxNCAxJz48L3BvbHlnb24+XG48L3N2Zz5cIlxuXHRhY3Rpdml0eTogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzE2cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDE2IDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+U29jY2VyIEJhbGw8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+XG5cdFx0XHRcdFx0PGNpcmNsZSBpZD0ncGF0aC0xJyBjeD0nOCcgY3k9JzgnIHI9JzgnPjwvY2lyY2xlPlxuXHRcdFx0XHQ8L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNicgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE3OS4wMDAwMDAsIC02MzkuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nU29jY2VyLUJhbGwnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE3OS4wMDAwMDAsIDYzOS4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PG1hc2sgaWQ9J21hc2stMicgc2tldGNoOm5hbWU9J01hc2snIGZpbGw9J3doaXRlJz5cblx0XHRcdFx0XHRcdFx0XHQ8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHRcdFx0XHRcdFx0XHQ8L21hc2s+XG5cdFx0XHRcdFx0XHRcdDx1c2UgaWQ9J01hc2snIHN0cm9rZT0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgeGxpbms6aHJlZj0nI3BhdGgtMSc+PC91c2U+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J002LDEyLjEyMDMwNDYgTDEyLjg1NzMzODQsOCBMMTMuMzcyMzc2NSw4Ljg1NzE2NzMgTDYuNTE1MDM4MDcsMTIuOTc3NDcxOSBMNiwxMi4xMjAzMDQ2IEw2LDEyLjEyMDMwNDYgWicgaWQ9J1JlY3RhbmdsZS00NycgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xMS44NDk2NDgsOC43MjYwNTUxIEwxOS4xMDAxMTAzLDUuMzQ1MTA5MDEgTDE5LjUyMjcyODUsNi4yNTE0MTY4IEwxMi4yNzIyNjYyLDkuNjMyMzYyODkgTDExLjg0OTY0OCw4LjcyNjA1NTEgTDExLjg0OTY0OCw4LjcyNjA1NTEgWicgaWQ9J1JlY3RhbmdsZS00Ny1Db3B5LTMnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNiwzLjEyMDMwNDYgTDEyLjg1NzMzODQsLTEgTDEzLjM3MjM3NjUsLTAuMTQyODMyNjk5IEw2LjUxNTAzODA3LDMuOTc3NDcxOSBMNiwzLjEyMDMwNDYgTDYsMy4xMjAzMDQ2IFonIGlkPSdSZWN0YW5nbGUtNDctQ29weS0yJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTS0xLDcuMTIwMzA0NiBMNS44NTczMzg0MSwzIEw2LjM3MjM3NjQ4LDMuODU3MTY3MyBMLTAuNDg0OTYxOTI1LDcuOTc3NDcxOSBMLTEsNy4xMjAzMDQ2IEwtMSw3LjEyMDMwNDYgWicgaWQ9J1JlY3RhbmdsZS00Ny1Db3B5LTQnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTUwJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknIHg9JzQnIHk9JzYnIHdpZHRoPScxJyBoZWlnaHQ9JzUnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS01MScgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJyB4PScxMS41JyB5PSczJyB3aWR0aD0nMScgaGVpZ2h0PScxMic+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNSw0Ljg1NzE2NzMgTDExLjg1NzMzODQsOC45Nzc0NzE5IEwxMi4zNzIzNzY1LDguMTIwMzA0NiBMNS41MTUwMzgwNyw0IEw1LDQuODU3MTY3MycgaWQ9J1JlY3RhbmdsZS00Ny1Db3B5JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUsMTIuODU3MTY3MyBMMTEuODU3MzM4NCwxNi45Nzc0NzE5IEwxMi4zNzIzNzY1LDE2LjEyMDMwNDYgTDUuNTE1MDM4MDcsMTIgTDUsMTIuODU3MTY3MycgaWQ9J1JlY3RhbmdsZS00Ny1Db3B5LTUnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMTEuOTA0ODk3Miw2LjE0NzY2MDY0IEwxMy44NzE0MjI3LDguMzMxNzA4NDkgTDEyLjQwMTk1OTYsMTAuODc2ODkzMyBMOS41MjcyNTU4OSwxMC4yNjU4NTYyIEw5LjIyMDA1NDQ1LDcuMzQzMDI5NjUgTDExLjkwNDg5NzIsNi4xNDc2NjA2NCcgaWQ9J1BvbHlnb24tMScgZmlsbD0nI0Q4RDhEOCcgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xMS45MDQ4OTcyLDYuMTQ3NjYwNjQgTDEzLjg3MTQyMjcsOC4zMzE3MDg0OSBMMTIuNDAxOTU5NiwxMC44NzY4OTMzIEw5LjUyNzI1NTg5LDEwLjI2NTg1NjIgTDkuMjIwMDU0NDUsNy4zNDMwMjk2NSBMMTEuOTA0ODk3Miw2LjE0NzY2MDY0JyBpZD0nUG9seWdvbi0xLUNvcHknIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNy40NTc3MTE4OSwzLjE5NTA0NzM5IEw3LjM1NTE0NDg0LDYuMTMyMTgzMzMgTDQuNTMwMDY3Niw2Ljk0MjI2MTIgTDIuODg2NjQwODksNC41MDU3ODA5IEw0LjY5NjAyNDU3LDIuMTg5ODc1NDEgTDcuNDU3NzExODksMy4xOTUwNDczOScgaWQ9J1BvbHlnb24tMS1Db3B5LTInIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNy40NTc3MTE4OSwxMS4xOTUwNDc0IEw3LjM1NTE0NDg0LDE0LjEzMjE4MzMgTDQuNTMwMDY3NiwxNC45NDIyNjEyIEwyLjg4NjY0MDg5LDEyLjUwNTc4MDkgTDQuNjk2MDI0NTcsMTAuMTg5ODc1NCBMNy40NTc3MTE4OSwxMS4xOTUwNDc0JyBpZD0nUG9seWdvbi0xLUNvcHktMycgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xNC41NDMxNzAxLDAuMDcyNTkzOTMxNCBMMTQuNDQwNjAzMSwzLjAwOTcyOTg4IEwxMS42MTU1MjU4LDMuODE5ODA3NzQgTDkuOTcyMDk5MTIsMS4zODMzMjc0NSBMMTEuNzgxNDgyOCwtMC45MzI1NzgwNSBMMTQuNTQzMTcwMSwwLjA3MjU5MzkzMTQnIGlkPSdQb2x5Z29uLTEtQ29weS00JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGFuaW1hbHM6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxN3B4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNyAxNycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPkdyb3VwPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTE3LjAwMDAwMCwgLTYzOS4wMDAwMDApJyBzdHJva2U9JyM0QTUzNjEnPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J2ljX0Zvb2QnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDExOC4wMDAwMDAsIDY0MC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J0dyb3VwJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNS42ODM3NzUzNywxLjM4MTU2NjQ2IEM2LjIzOTI2MDY2LDEuMTM2MjQgNi44NTM3MjAwNSwxIDcuNSwxIEM4LjE0NjI3OTk1LDEgOC43NjA3MzkzNCwxLjEzNjI0IDkuMzE2MjI0NjMsMS4zODE1NjY0NiBDOS44MDg3OTI3NSwwLjU2MjM1OTAxOSAxMC44MjU1ODg4LDAgMTIsMCBDMTMuNjU2ODU0MiwwIDE1LDEuMTE5Mjg4MTMgMTUsMi41IEMxNSwzLjU1NzEzOTggMTQuMjEyNjI0Niw0LjQ2MTAyODQzIDEzLjA5OTkyMjYsNC44MjY2MjUxNCBDMTQuMjQ5NjUyOCw1LjY0MTg1NDIyIDE1LDYuOTgzMzAwNjIgMTUsOC41IEMxNSwxMC43MTY3MTQ0IDEzLjM5NzE4NzMsMTIuNTU5MDcxOSAxMS4yODcyNjcxLDEyLjkzMTM2NzMgQzEwLjQ4NjcyNDgsMTQuMTc1NzcwMyA5LjA4OTYxNjk2LDE1IDcuNSwxNSBDNS45MTAzODMwNCwxNSA0LjUxMzI3NTI0LDE0LjE3NTc3MDMgMy43MTI3MzI5MSwxMi45MzEzNjczIEMxLjYwMjgxMjY4LDEyLjU1OTA3MTkgMCwxMC43MTY3MTQ0IDAsOC41IEMwLDYuOTgzMzAwNjIgMC43NTAzNDcyNDQsNS42NDE4NTQyMiAxLjkwMDA3NzQxLDQuODI2NjI1MTQgQzAuNzg3Mzc1NDQ1LDQuNDYxMDI4NDMgMCwzLjU1NzEzOTggMCwyLjUgQzAsMS4xMTkyODgxMyAxLjM0MzE0NTc1LDAgMywwIEM0LjE3NDQxMTIyLDAgNS4xOTEyMDcyNSwwLjU2MjM1OTAxOSA1LjY4Mzc3NTM3LDEuMzgxNTY2NDYgWicgaWQ9J092YWwtOCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LjczODM0MjI4LDEyIEM1Ljg2MjkwOTc5LDEyIDYuMTQ2NDIzNTMsMTIgNi4xNDY0MjM1MywxMiBDNi4xNDY0MjM1MywxMiA2LjQzMjE1Njk2LDEyLjQ0MjYxMjMgNi41MjQ2NTgyLDEyLjQ5MTk3MzkgQzYuNjY0NTU2MDEsMTIuNTY2NjI3NyA3LDEyLjQ5MTk3MzkgNywxMi40OTE5NzM5IEw3LDEyIEw4LDEyIEw4LDEyLjQ5MTk3MzkgTDguNDk3OTkyMjgsMTIuNDkxOTczOSBMOC44NDMwMTc2OSwxMiBMOS4zOTE4NDU3LDEyIEM5LjM5MTg0NTcsMTIgOC45OTU5ODQ1NywxMi45ODM5NDc4IDguNDk3OTkyMjgsMTIuOTgzOTQ3OCBMNi42MDcwMjQwNywxMi45ODM5NDc4IEM2LjIxNDA0ODEzLDEyLjk4Mzk0NzggNS40NTk5NjA5NCwxMiA1LjczODM0MjI4LDEyIFonIGlkPSdSZWN0YW5nbGUtNDQtQ29weS0yJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PGNpcmNsZSBpZD0nT3ZhbC0xNCcgY3g9JzEwLjUnIGN5PSc3LjUnIHI9JzAuNSc+PC9jaXJjbGU+XG5cdFx0XHRcdFx0XHRcdFx0PGNpcmNsZSBpZD0nT3ZhbC0xNC1Db3B5JyBjeD0nNC41JyBjeT0nNy41JyByPScwLjUnPjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xMi42OTk5OTY5LDUgQzEyLjY5OTk5NjksMy4wNjcwMDMzOCAxMS4xMzI5OTM2LDEuNSA5LjE5OTk5Njk1LDEuNScgaWQ9J092YWwtMTYnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNS41LDUgQzUuNSwzLjA2NzAwMzM4IDMuOTMyOTk2NjIsMS41IDIsMS41JyBpZD0nT3ZhbC0xNi1Db3B5JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjc1MDAwMCwgMy4yNTAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTMuNzUwMDAwLCAtMy4yNTAwMDApICc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtNDQtQ29weScgeD0nNycgeT0nMTEnIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNiwxMCBMNi41LDEwIEw2LjQ5OTk5OTk5LDkuNSBMOC41MDAwMDAwNSw5LjUgTDguNTAwMDAwMDUsMTAgTDksMTAgTDksMTAuNSBMOC41LDEwLjUgTDguNSwxMSBMNi41LDExIEw2LjUsMTAuNSBMNiwxMC41IEw2LDEwIFonIGlkPSdQYXRoJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGNoZXZyb24gOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzEzcHgnIGhlaWdodD0nMjJweCcgdmlld0JveD0nMCAwIDEzIDIyJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0ICAgIDx0aXRsZT5CYWNrIENoZXZyb248L3RpdGxlPlxuXHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHQgICAgPGRlZnM+PC9kZWZzPlxuXHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0XHQgICAgICAgIDxnIGlkPSdOYXZpZ2F0aW9uLUJhci9CYWNrJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtOC4wMDAwMDAsIC0zMS4wMDAwMDApJyBmaWxsPScjMDA3NkZGJz5cblx0XHQgICAgICAgICAgICA8cGF0aCBkPSdNOC41LDQyIEwxOSwzMS41IEwyMSwzMy41IEwxMi41LDQyIEwyMSw1MC41IEwxOSw1Mi41IEw4LjUsNDIgWicgaWQ9J0JhY2stQ2hldnJvbic+PC9wYXRoPlxuXHRcdCAgICAgICAgPC9nPlxuXHRcdCAgICA8L2c+XG5cdFx0PC9zdmc+XCJcblx0ZW1vamkgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzIwcHgnIGhlaWdodD0nMjBweCcgdmlld0JveD0nMCAwIDIwIDIwJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdDx0aXRsZT5FbW9qaTwvdGl0bGU+XG5cdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmQvTGlnaHQvTG93ZXInIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC02MC4wMDAwMDAsIC0xODEuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0XHRcdFx0PGcgaWQ9J0JvdHRvbS1Sb3cnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMuMDAwMDAwLCAxNzAuMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNjYuNzUsMzAuNSBDNzIuMTM0Nzc2MywzMC41IDc2LjUsMjYuMTM0Nzc2MyA3Ni41LDIwLjc1IEM3Ni41LDE1LjM2NTIyMzcgNzIuMTM0Nzc2MywxMSA2Ni43NSwxMSBDNjEuMzY1MjIzNywxMSA1NywxNS4zNjUyMjM3IDU3LDIwLjc1IEM1NywyNi4xMzQ3NzYzIDYxLjM2NTIyMzcsMzAuNSA2Ni43NSwzMC41IFogTTY2Ljc1LDI5LjUgQzcxLjU4MjQ5MTYsMjkuNSA3NS41LDI1LjU4MjQ5MTYgNzUuNSwyMC43NSBDNzUuNSwxNS45MTc1MDg0IDcxLjU4MjQ5MTYsMTIgNjYuNzUsMTIgQzYxLjkxNzUwODQsMTIgNTgsMTUuOTE3NTA4NCA1OCwyMC43NSBDNTgsMjUuNTgyNDkxNiA2MS45MTc1MDg0LDI5LjUgNjYuNzUsMjkuNSBaIE02My43NSwxOSBDNjQuNDQwMzU1OSwxOSA2NSwxOC40NDAzNTU5IDY1LDE3Ljc1IEM2NSwxNy4wNTk2NDQxIDY0LjQ0MDM1NTksMTYuNSA2My43NSwxNi41IEM2My4wNTk2NDQxLDE2LjUgNjIuNSwxNy4wNTk2NDQxIDYyLjUsMTcuNzUgQzYyLjUsMTguNDQwMzU1OSA2My4wNTk2NDQxLDE5IDYzLjc1LDE5IFogTTY5Ljc1LDE5IEM3MC40NDAzNTU5LDE5IDcxLDE4LjQ0MDM1NTkgNzEsMTcuNzUgQzcxLDE3LjA1OTY0NDEgNzAuNDQwMzU1OSwxNi41IDY5Ljc1LDE2LjUgQzY5LjA1OTY0NDEsMTYuNSA2OC41LDE3LjA1OTY0NDEgNjguNSwxNy43NSBDNjguNSwxOC40NDAzNTU5IDY5LjA1OTY0NDEsMTkgNjkuNzUsMTkgWiBNNTkuODg3NjMzNCwyMi4xNjQxNDQ0IEM1OS42MzkwMzE2LDIxLjM4MzEzNCA2MC4wNjU5MTgsMjAuOTc4NTE1NiA2MC44NTMwOTUxLDIxLjIzMjkzMDQgQzYwLjg1MzA5NTEsMjEuMjMyOTMwNCA2My4wOTM3NTAzLDIyLjIxMjUgNjYuNzUwMDAwMSwyMi4yMTI1IEM3MC40MDYyNDk5LDIyLjIxMjUgNzIuNjQ2OTA0NywyMS4yMzI5MzA0IDcyLjY0NjkwNDcsMjEuMjMyOTMwNCBDNzMuNDI4NzE2MiwyMC45NjYyMTUzIDczLjg4MTI0NjMsMjEuNDA0NDA5NyA3My42MDU4NDc3LDIyLjE4MDc0MzcgQzczLjYwNTg0NzcsMjIuMTgwNzQzNyA3Mi42LDI3LjU3NSA2Ni43NSwyNy41NzUgQzYwLjksMjcuNTc1IDU5Ljg4NzYzMzQsMjIuMTY0MTQ0NCA1OS44ODc2MzM0LDIyLjE2NDE0NDQgWiBNNjYuNzUsMjMuMTg3NSBDNjQuMDY4NzUsMjMuMTg3NSA2MS44NTQ0MDU1LDIyLjQ3Mzc4MjEgNjEuODU0NDA1NSwyMi40NzM3ODIxIEM2MS4zMjczMDE5LDIyLjMyOTQ4IDYxLjE3ODEyMzMsMjIuNTcyMTYxNSA2MS41NjM5NTU1LDIyLjk1NzA3NSBDNjEuNTYzOTU1NSwyMi45NTcwNzUgNjIuMzYyNSwyNC42NSA2Ni43NSwyNC42NSBDNzEuMTM3NSwyNC42NSA3MS45NTA4NTAzLDIyLjk0MzgzMDQgNzEuOTUwODUwMywyMi45NDM4MzA0IEM3Mi4zMDkzNjU5LDIyLjUzOTkyNzggNzIuMTY5MDc5MywyMi4zMzU5ODQ0IDcxLjYzNTQyNzMsMjIuNDc2MzQ5IEM3MS42MzU0MjczLDIyLjQ3NjM0OSA2OS40MzEyNSwyMy4xODc1IDY2Ljc1LDIzLjE4NzUgWicgaWQ9J0Vtb2ppJz48L3BhdGg+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L2c+XG5cdFx0PC9zdmc+XCJcblx0ZGVsZXRlOiB7XG5cdFx0b24gOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPScyNHB4JyBoZWlnaHQ9JzE4cHgnIHZpZXdCb3g9JzAgMCAyNCAxOCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHRcdDx0aXRsZT5CYWNrPC90aXRsZT5cblx0XHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmQvTGlnaHQvVXBwZXInIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0zMzkuMDAwMDAwLCAtMTMwLjAwMDAwMCknIGZpbGw9JyMwMzAzMDMnPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nVGhpcmQtUm93JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjAwMDAwMCwgMTE4LjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00zNTEuNjQyNjYzLDIwLjk3NzY5MDMgTDM1NC40NjY3OTUsMTguMTUzNTU4NSBDMzU0Ljc2MDEwNiwxNy44NjAyNDc2IDM1NC43NjM5ODMsMTcuMzgxNDk2MiAzNTQuNDcxMDksMTcuMDg4NjAzIEMzNTQuMTc2MTU1LDE2Ljc5MzY2NzcgMzUzLjcwMTQsMTYuNzk3NjMyOCAzNTMuNDA2MTM1LDE3LjA5Mjg5ODMgTDM1MC41ODIwMDMsMTkuOTE3MDMwMSBMMzQ3Ljc1Nzg3MSwxNy4wOTI4OTgzIEMzNDcuNDY0NTYsMTYuNzk5NTg3NCAzNDYuOTg1ODA5LDE2Ljc5NTcwOTcgMzQ2LjY5MjkxNiwxNy4wODg2MDMgQzM0Ni4zOTc5OCwxNy4zODM1MzgyIDM0Ni40MDE5NDUsMTcuODU4MjkzIDM0Ni42OTcyMTEsMTguMTUzNTU4NSBMMzQ5LjUyMTM0MywyMC45Nzc2OTAzIEwzNDYuNjk3MjExLDIzLjgwMTgyMiBDMzQ2LjQwMzksMjQuMDk1MTMyOSAzNDYuNDAwMDIyLDI0LjU3Mzg4NDMgMzQ2LjY5MjkxNiwyNC44NjY3Nzc2IEMzNDYuOTg3ODUxLDI1LjE2MTcxMjggMzQ3LjQ2MjYwNiwyNS4xNTc3NDc3IDM0Ny43NTc4NzEsMjQuODYyNDgyMiBMMzUwLjU4MjAwMywyMi4wMzgzNTA0IEwzNTMuNDA2MTM1LDI0Ljg2MjQ4MjIgQzM1My42OTk0NDUsMjUuMTU1NzkzMSAzNTQuMTc4MTk3LDI1LjE1OTY3MDggMzU0LjQ3MTA5LDI0Ljg2Njc3NzYgQzM1NC43NjYwMjUsMjQuNTcxODQyMyAzNTQuNzYyMDYsMjQuMDk3MDg3NSAzNTQuNDY2Nzk1LDIzLjgwMTgyMiBMMzUxLjY0MjY2MywyMC45Nzc2OTAzIFogTTMzNy4wNTkzNDUsMjIuMDU5MzQ0NSBDMzM2LjQ3NDI4NSwyMS40NzQyODQ3IDMzNi40ODEzNTEsMjAuNTE4NjQ4OSAzMzcuMDU5MzQ1LDE5Ljk0MDY1NTUgTDM0My43ODk5MTUsMTMuMjEwMDg1MyBDMzQ0LjE4MjA4NCwxMi44MTc5MTYgMzQ0Ljk0ODkyLDEyLjUgMzQ1LjUwNzQ4NCwxMi41IEwzNTYuMDAyMDk4LDEyLjUgQzM1Ny45MzM5MzYsMTIuNSAzNTkuNSwxNC4wNjg4NDc3IDM1OS41LDE2LjAwMTc5ODMgTDM1OS41LDI1Ljk5ODIwMTcgQzM1OS41LDI3LjkzMjE5MTUgMzU3LjkyMzA4OCwyOS41IDM1Ni4wMDIwOTgsMjkuNSBMMzQ1LjUwNzQ4NCwyOS41IEMzNDQuOTUxMDY2LDI5LjUgMzQ0LjE3NzE2OSwyOS4xNzcxNjkzIDM0My43ODk5MTUsMjguNzg5OTE0OCBMMzM3LjA1OTM0NSwyMi4wNTkzNDQ1IFonIGlkPSdCYWNrJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdFx0b2ZmIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHQ8c3ZnIHdpZHRoPScyNHB4JyBoZWlnaHQ9JzE4cHgnIHZpZXdCb3g9JzAgMCAyNCAxOCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHQ8dGl0bGU+QmFjazwvdGl0bGU+XG5cdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmQvTGlnaHQvVXBwZXInIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0zMzkuMDAwMDAwLCAtMTMwLjAwMDAwMCknIGZpbGw9JyMwMzAzMDMnPlxuXHRcdFx0XHRcdDxnIGlkPSdUaGlyZC1Sb3cnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMuMDAwMDAwLCAxMTguMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMzM3LjA1OTM0NSwyMi4wNTkzNDQ1IEMzMzYuNDc0Mjg1LDIxLjQ3NDI4NDcgMzM2LjQ4MTM1MSwyMC41MTg2NDg5IDMzNy4wNTkzNDUsMTkuOTQwNjU1NSBMMzQzLjc4OTkxNSwxMy4yMTAwODUzIEMzNDQuMTgyMDg0LDEyLjgxNzkxNiAzNDQuOTQ4OTIsMTIuNSAzNDUuNTA3NDg0LDEyLjUgTDM1Ni4wMDIwOTgsMTIuNSBDMzU3LjkzMzkzNiwxMi41IDM1OS41LDE0LjA2ODg0NzcgMzU5LjUsMTYuMDAxNzk4MyBMMzU5LjUsMjUuOTk4MjAxNyBDMzU5LjUsMjcuOTMyMTkxNSAzNTcuOTIzMDg4LDI5LjUgMzU2LjAwMjA5OCwyOS41IEwzNDUuNTA3NDg0LDI5LjUgQzM0NC45NTEwNjYsMjkuNSAzNDQuMTc3MTY5LDI5LjE3NzE2OTMgMzQzLjc4OTkxNSwyOC43ODk5MTQ4IEwzMzcuMDU5MzQ1LDIyLjA1OTM0NDUgWiBNMzUxLjY0MjY2MywyMC45Nzc2OTAzIEwzNTQuNDY2Nzk1LDE4LjE1MzU1ODUgQzM1NC43NjAxMDYsMTcuODYwMjQ3NiAzNTQuNzYzOTgzLDE3LjM4MTQ5NjIgMzU0LjQ3MTA5LDE3LjA4ODYwMyBDMzU0LjE3NjE1NSwxNi43OTM2Njc3IDM1My43MDE0LDE2Ljc5NzYzMjggMzUzLjQwNjEzNSwxNy4wOTI4OTgzIEwzNTAuNTgyMDAzLDE5LjkxNzAzMDEgTDM0Ny43NTc4NzEsMTcuMDkyODk4MyBDMzQ3LjQ2NDU2LDE2Ljc5OTU4NzQgMzQ2Ljk4NTgwOSwxNi43OTU3MDk3IDM0Ni42OTI5MTYsMTcuMDg4NjAzIEMzNDYuMzk3OTgsMTcuMzgzNTM4MiAzNDYuNDAxOTQ1LDE3Ljg1ODI5MyAzNDYuNjk3MjExLDE4LjE1MzU1ODUgTDM0OS41MjEzNDMsMjAuOTc3NjkwMyBMMzQ2LjY5NzIxMSwyMy44MDE4MjIgQzM0Ni40MDM5LDI0LjA5NTEzMjkgMzQ2LjQwMDAyMiwyNC41NzM4ODQzIDM0Ni42OTI5MTYsMjQuODY2Nzc3NiBDMzQ2Ljk4Nzg1MSwyNS4xNjE3MTI4IDM0Ny40NjI2MDYsMjUuMTU3NzQ3NyAzNDcuNzU3ODcxLDI0Ljg2MjQ4MjIgTDM1MC41ODIwMDMsMjIuMDM4MzUwNCBMMzUzLjQwNjEzNSwyNC44NjI0ODIyIEMzNTMuNjk5NDQ1LDI1LjE1NTc5MzEgMzU0LjE3ODE5NywyNS4xNTk2NzA4IDM1NC40NzEwOSwyNC44NjY3Nzc2IEMzNTQuNzY2MDI1LDI0LjU3MTg0MjMgMzU0Ljc2MjA2LDI0LjA5NzA4NzUgMzU0LjQ2Njc5NSwyMy44MDE4MjIgTDM1MS42NDI2NjMsMjAuOTc3NjkwMyBaIE0zMzguNzA5NzIsMjEuNzA5NzE5NSBDMzM4LjMxNzc1MiwyMS4zMTc3NTIyIDMzOC4zMTg5NjUsMjAuNjgxMDM0OSAzMzguNzA5NzIsMjAuMjkwMjgwNSBMMzQ0LjY0MzI0NSwxNC4zNTY3NTQ3IEMzNDQuODQwMjc2LDE0LjE1OTcyNDUgMzQ1LjIyNTYzOSwxNCAzNDUuNDkzNzQxLDE0IEwzNTUuOTk3MjM5LDE0IEMzNTcuMTAzMzMzLDE0IDM1Ny45OTk5OTksMTQuODk3MDYwMSAzNTcuOTk5OTk5LDE2LjAwNTg1ODYgTDM1Ny45OTk5OTksMjUuOTk0MTQxMiBDMzU3Ljk5OTk5OSwyNy4xMDE5NDY0IDM1Ny4xMDY0NTcsMjcuOTk5OTk5OSAzNTUuOTk3MjM5LDI3Ljk5OTk5OTkgTDM0NS40OTM3NDEsMjggQzM0NS4yMjEwNTYsMjggMzQ0Ljg0MDY0MywyNy44NDA2NDMxIDM0NC42NDMyNDYsMjcuNjQzMjQ1MyBMMzM4LjcwOTcyLDIxLjcwOTcxOTUgWicgaWQ9J0JhY2snPjwvcGF0aD5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvZz5cblx0XHQ8L3N2Zz5cIlxuXHR9XG5cdGZvb2QgOiAgXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzE3cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDE3IDE3JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+Rm9vZDwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdpT1MtOS1LZXlib2FyZHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNi1Qb3J0cmFpdC1MaWdodC1Db3B5JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTQ4LjAwMDAwMCwgLTYzNy4wMDAwMDApJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZHMnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCA0MDguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdGb29kJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNDkuNTAwMDAwLCAyMjkuNTAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUuNSwxNS41IEwxLDE1LjUgTDAsNSBMNi41LDUgTDYuMjYzNjA5MzMsNy40ODIxMDIwMicgaWQ9J0RyaW5rJyBzdHJva2U9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNi4wMTA3NzU0NSwxLjk2OTMwMDk4IEw2LjUxNTcxMzUyLDUuMjIyNzA1MzkgTDUuNzE5MDgxODQsNS42Nzk0NzgxMiBMNS4wMzg5MDA5LDEuOTY5MzAwOTggTDQuODU1NTcyNDcsMS45NjkzMDA5OCBMNC44NTU1NzI0NywwLjk2OTMwMDk4IEw4Ljg1NTU3MjQ3LDAuOTY5MzAwOTggTDguODU1NTcyNDcsMS45NjkzMDA5OCBMNi4wMTA3NzU0NSwxLjk2OTMwMDk4IFonIGlkPSdTdHJhdycgZmlsbD0nIzRBNTQ2MScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNi44NTU1NzIsIDMuMzI0MzkwKSByb3RhdGUoMjQuMDAwMDAwKSB0cmFuc2xhdGUoLTYuODU1NTcyLCAtMy4zMjQzOTApICc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdCb3R0b20tQnVuJyBzdHJva2U9JyM0QTU0NjEnIHg9JzMnIHk9JzE0JyB3aWR0aD0nMTAuNScgaGVpZ2h0PScxLjUnIHJ4PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTEuNSwxMi41MDI0NDA4IEMxLjUsMTEuOTQ4ODA4IDEuOTQ5MTY5MTYsMTEuNSAyLjQ5MjY4NzIzLDExLjUgTDE0LjAwNzMxMjgsMTEuNSBDMTQuNTU1NTU4OCwxMS41IDE1LDExLjk0Njk0OTkgMTUsMTIuNTAyNDQwOCBMMTUsMTIuOTk3NTU5MiBDMTUsMTMuNTUxMTkyIDE0LjU1MDgzMDgsMTQgMTQuMDA3MzEyOCwxNCBMMi40OTI2ODcyMywxNCBDMS45NDQ0NDEyMSwxNCAxLjUsMTMuNTUzMDUwMSAxLjUsMTIuOTk3NTU5MiBMMS41LDEyLjUwMjQ0MDggWiBNMy45MzMwMDAwMywxMS44MzkyNzI3IEMzLjQxNzcxODM0LDExLjY1MTg5NzYgMy40NDQ4MzY5NywxMS41IDMuOTk1NTc3NSwxMS41IEwxMy4wMDQ0MjI1LDExLjUgQzEzLjU1NDI2NDgsMTEuNSAxMy41ODY2MDYxLDExLjY1MDMyNTEgMTMuMDY3LDExLjgzOTI3MjcgTDguNSwxMy41IEwzLjkzMzAwMDAzLDExLjgzOTI3MjcgWicgaWQ9JyZxdW90O1BhdHR5JnF1b3Q7JyBmaWxsPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTIuNSwxMC41IEwxMy41LDEwLjUgTDE1LDExLjUgTDEsMTEuNSBMMi41LDEwLjUgWicgaWQ9J0NoZWVzZScgZmlsbD0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J004LjI1LDEwLjUgQzExLjQyNTYzNzMsMTAuNSAxNCwxMC4zMjg0MjcxIDE0LDkuNSBDMTQsOC42NzE1NzI4OCAxMS40MjU2MzczLDggOC4yNSw4IEM1LjA3NDM2MjY5LDggMi41LDguNjcxNTcyODggMi41LDkuNSBDMi41LDEwLjMyODQyNzEgNS4wNzQzNjI2OSwxMC41IDguMjUsMTAuNSBaJyBpZD0nVG9wLUJ1bicgc3Ryb2tlPScjNEE1NDYxJyBzdHJva2Utd2lkdGg9JzAuNzUnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0ZmxhZ3M6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxMXB4JyBoZWlnaHQ9JzE1cHgnIHZpZXdCb3g9JzAgMCAxMSAxNScgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPkZsYWc8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0naU9TLTktS2V5Ym9hcmRzJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYtUG9ydHJhaXQtTGlnaHQtQ29weScgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTI3NS4wMDAwMDAsIC02MzkuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmRzJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgNDA4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nRmxhZycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjc1LjAwMDAwMCwgMjMxLjUwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdQb2xlJyBmaWxsPScjNEE1NDYxJyB4PScwJyB5PScwJyB3aWR0aD0nMScgaGVpZ2h0PScxNCc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xLDEgQzEsMSAxLjI1LDIgMy41LDIgQzUuNzUsMiA2LDAuNzQ5OTk5OTk4IDgsMC43NSBDMTAsMC43NDk5OTk5OTggMTAsMS41IDEwLDEuNSBMMTAsNy41IEMxMCw3LjUgMTAsNi41IDgsNi41IEM2LDYuNSA0LjgwNjIzOTExLDggMy41LDggQzIuMTkzNzYwODksOCAxLDcgMSw3IEwxLDEgWicgc3Ryb2tlPScjNEE1NDYxJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGZyZXF1ZW50OiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTdweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTcgMTYnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5SZWNlbnQ8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0naU9TLTktS2V5Ym9hcmRzJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYtUG9ydHJhaXQtTGlnaHQtQ29weScgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTU1LjAwMDAwMCwgLTYzOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZHMnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCA0MDguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdSZWNlbnQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDU1LjUwMDAwMCwgMjMwLjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdDxjaXJjbGUgaWQ9J0JvZHknIHN0cm9rZT0nIzRBNTQ2MScgY3g9JzgnIGN5PSc4JyByPSc4Jz48L2NpcmNsZT5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNy41LDcuNSBMNy41LDguNSBMOC41LDguNSBMOC41LDIgTDcuNSwyIEw3LjUsNy41IEw0LDcuNSBMNCw4LjUgTDguNSw4LjUgTDguNSw3LjUgTDcuNSw3LjUgWicgaWQ9J0hhbmRzJyBmaWxsPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdGtleWJvYXJkIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzMyLjVweCcgaGVpZ2h0PScyMy41cHgnIHZpZXdCb3g9JzAgMCA2NSA0NycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHQgICAgPHRpdGxlPlNoYXBlPC90aXRsZT5cblx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdCAgICA8ZGVmcz48L2RlZnM+XG5cdFx0XHQgICAgPGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG5cdFx0XHQgICAgICAgIDxnIGlkPSdpUGFkLVBvcnRyYWl0JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTQzNi4wMDAwMDAsIC0xOTU2LjAwMDAwMCknIGZpbGw9JyMwMDAwMDAnPlxuXHRcdFx0ICAgICAgICAgICAgPGcgaWQ9J0tleWJvYXJkLUxpZ2h0JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMTQyMi4wMDAwMDApJz5cblx0XHRcdCAgICAgICAgICAgICAgICA8ZyBpZD0nS2V5Ym9hcmQtZG93bicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTQxMi4wMDAwMDAsIDUwMC4wMDAwMDApJz5cblx0XHRcdCAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0nTTg3LjAwMTMzMiwzNCBDODguMTA1MTY1OSwzNCA4OSwzNC44OTk3MTI3IDg5LDM1Ljk5MzI4NzQgTDg5LDYxLjAwNjcxMjYgQzg5LDYyLjEwNzU3NDggODguMTA1ODc1OSw2MyA4Ny4wMDEzMzIsNjMgTDI1Ljk5ODY2OCw2MyBDMjQuODk0ODM0MSw2MyAyNCw2Mi4xMDAyODczIDI0LDYxLjAwNjcxMjYgTDI0LDM1Ljk5MzI4NzQgQzI0LDM0Ljg5MjQyNTIgMjQuODk0MTI0MSwzNCAyNS45OTg2NjgsMzQgTDg3LjAwMTMzMiwzNCBaIE0yNiwzNiBMMjYsNjEgTDg3LDYxIEw4NywzNiBMMjYsMzYgWiBNNzksNDAgTDgzLDQwIEw4Myw0NCBMNzksNDQgTDc5LDQwIFogTTcyLDQwIEw3Niw0MCBMNzYsNDQgTDcyLDQ0IEw3Miw0MCBaIE02NSw0MCBMNjksNDAgTDY5LDQ0IEw2NSw0NCBMNjUsNDAgWiBNNTgsNDAgTDYyLDQwIEw2Miw0NCBMNTgsNDQgTDU4LDQwIFogTTUxLDQwIEw1NSw0MCBMNTUsNDQgTDUxLDQ0IEw1MSw0MCBaIE00NCw0MCBMNDgsNDAgTDQ4LDQ0IEw0NCw0NCBMNDQsNDAgWiBNMzcsNDAgTDQxLDQwIEw0MSw0NCBMMzcsNDQgTDM3LDQwIFogTTMwLDQwIEwzNCw0MCBMMzQsNDQgTDMwLDQ0IEwzMCw0MCBaIE03OSw0NyBMODMsNDcgTDgzLDUxIEw3OSw1MSBMNzksNDcgWiBNNzIsNDcgTDc2LDQ3IEw3Niw1MSBMNzIsNTEgTDcyLDQ3IFogTTY1LDQ3IEw2OSw0NyBMNjksNTEgTDY1LDUxIEw2NSw0NyBaIE01OCw0NyBMNjIsNDcgTDYyLDUxIEw1OCw1MSBMNTgsNDcgWiBNNTEsNDcgTDU1LDQ3IEw1NSw1MSBMNTEsNTEgTDUxLDQ3IFogTTQ0LDQ3IEw0OCw0NyBMNDgsNTEgTDQ0LDUxIEw0NCw0NyBaIE0zNyw0NyBMNDEsNDcgTDQxLDUxIEwzNyw1MSBMMzcsNDcgWiBNMzAsNDcgTDM0LDQ3IEwzNCw1MSBMMzAsNTEgTDMwLDQ3IFogTTc5LDU0IEw4Myw1NCBMODMsNTggTDc5LDU4IEw3OSw1NCBaIE03Miw1NCBMNzYsNTQgTDc2LDU4IEw3Miw1OCBMNzIsNTQgWiBNNDQsNTQgTDY5LDU0IEw2OSw1OCBMNDQsNTggTDQ0LDU0IFogTTM3LDU0IEw0MSw1NCBMNDEsNTggTDM3LDU4IEwzNyw1NCBaIE0zMCw1NCBMMzQsNTQgTDM0LDU4IEwzMCw1OCBMMzAsNTQgWiBNNDQuMzE2MzQ5OCw2OS45NzcxMDQ3IEM0My4zNjg0MjI1LDcwLjU0MjAzNDIgNDMuMzMzODcyMSw3MS41MDk2NDk1IDQ0LjIzNzgyMTcsNzIuMTM3MzkxMiBMNTUuMzYyMTUzOSw3OS44NjI2MDg4IEM1Ni4yNjY3MTEzLDgwLjQ5MDc3MjYgNTcuNzMzODk2NSw4MC40OTAzNTA1IDU4LjYzNzg0NjEsNzkuODYyNjA4OCBMNjkuNzYyMTc4Myw3Mi4xMzczOTEyIEM3MC42NjY3MzU3LDcxLjUwOTIyNzQgNzAuNjQ4MDEyLDcwLjUyMDUyMDQgNjkuNzExNTE4Nyw2OS45MjM0MTY2IEw2OS45ODI1NzMxLDcwLjA5NjIzOTYgQzY5LjUxODEzMzMsNjkuODAwMTE1IDY4Ljc3ODI1NTcsNjkuODEyNjQ5MyA2OC4zMjYxMzA3LDcwLjEyNjkzMjMgTDU3LjgxNTQ5OTksNzcuNDMzMTI2MyBDNTcuMzY1MTExNyw3Ny43NDYyMDIgNTYuNjI4MTY1LDc3LjczODE3ODYgNTYuMTc2MjEwMyw3Ny40MTk5NDI0IEw0NS44Mzg2MTM3LDcwLjE0MDg5NzcgQzQ1LjM4MzY0NzIsNjkuODIwNTQwNyA0NC42Mzc1MDM5LDY5Ljc4NTcwODggNDQuMTU2NjM5Myw3MC4wNzIyODYyIEw0NC4zMTYzNDk4LDY5Ljk3NzEwNDcgWicgaWQ9J1NoYXBlJz48L3BhdGg+XG5cdFx0XHQgICAgICAgICAgICAgICAgPC9nPlxuXHRcdFx0ICAgICAgICAgICAgPC9nPlxuXHRcdFx0ICAgICAgICA8L2c+XG5cdFx0XHQgICAgPC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0a2V5UG9wVXA6XG5cdFx0XCJpcGhvbmUtNVwiIDogXCI8c3ZnIHdpZHRoPSc1NXB4JyBoZWlnaHQ9JzkycHgnIHZpZXdCb3g9JzUzIDMxNiA1NSA5MicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQgICAgPGRlZnM+XG5cdFx0XHRcdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMSc+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC40IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnIHJlc3VsdD0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZU1lcmdlPlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J1NvdXJjZUdyYXBoaWMnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdCAgICAgICAgICAgIDwvZmVNZXJnZT5cblx0XHRcdFx0ICAgICAgICA8L2ZpbHRlcj5cblx0XHRcdFx0ICAgICAgICA8cGF0aCBkPSdNMS4zNDE3MzIzMSw0MC45MzkxNzAxIEMwLjUxNzQ2NjEyOCw0MC4yMDU4OSAwLDM5LjEzNzQyNTEgMCwzNy45NDc3NjM1IEwwLDQuMDAzNDU1OTggQzAsMS43ODkxNzEzNiAxLjc5NTI4MjQ4LDAgNC4wMDk4NzU2NiwwIEw0NC45OTAxMjQzLDAgQzQ3LjIxMjU2MDgsMCA0OSwxLjc5MjQwODMgNDksNC4wMDM0NTU5OCBMNDksMzcuOTQ3NzYzNSBDNDksMzguOTEyNDA1MSA0OC42NTkyNzk4LDM5Ljc5NjM2NTkgNDguMDkxNjA0MSw0MC40ODY4NjY1IEM0OC4wNDE0MjMzLDQwLjkwMzIyODkgNDcuNzExMTg4OCw0MS40MDc0NjcyIDQ3LjA4MjU5MDgsNDEuOTUyMjUgQzQ3LjA4MjU5MDgsNDEuOTUyMjUgMzguNTI5OTE0NSw0OS4wNjQzMzYyIDM4LjUyOTkxNDUsNTEuMTUyNjQyNCBDMzguNTI5OTE0NSw2MS42NDk3NTYxIDM4LjE3NzAwOTksODIuMDAyNTQwNiAzOC4xNzcwMDk5LDgyLjAwMjU0MDYgQzM4LjE0MTIzMDQsODQuMjAyNDM1NCAzNi4zMjEwMjg0LDg2IDM0LjExMjg0OTUsODYgTDE1LjMwNTk1MzksODYgQzEzLjEwNzk2LDg2IDExLjI3ODE4ODQsODQuMjEwMDc4OSAxMS4yNDE3OTM2LDgyLjAwMjA5OTMgQzExLjI0MTc5MzYsODIuMDAyMDk5MyAxMC44ODg4ODg5LDYxLjY0NzA4NTIgMTAuODg4ODg4OSw1MS4xNDg2MzYxIEMxMC44ODg4ODg5LDQ5LjA2MTY2NTQgMi4zNDE0MzY2Miw0Mi4yMzg2NTUgMi4zNDE0MzY2Miw0Mi4yMzg2NTUgQzEuNzc4MjczMTEsNDEuNzY0MTM2NSAxLjQ0ODgxMzU0LDQxLjMyMDQyMzcgMS4zNDE3MzIzMSw0MC45MzkxNzAxIFonIGlkPSdwYXRoLTInPjwvcGF0aD5cblx0XHRcdFx0ICAgICAgICA8bWFzayBpZD0nbWFzay0zJyBtYXNrQ29udGVudFVuaXRzPSd1c2VyU3BhY2VPblVzZScgbWFza1VuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgeD0nMCcgeT0nMCcgd2lkdGg9JzQ5JyBoZWlnaHQ9Jzg2JyBmaWxsPSd3aGl0ZSc+XG5cdFx0XHRcdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdCAgICAgICAgPC9tYXNrPlxuXHRcdFx0XHQgICAgPC9kZWZzPlxuXHRcdFx0XHQgICAgPGcgaWQ9J1BvcG92ZXInIGZpbHRlcj0ndXJsKCNmaWx0ZXItMSknIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDU2LjAwMDAwMCwgMzE4LjAwMDAwMCknPlxuXHRcdFx0XHQgICAgICAgIDx1c2UgaWQ9J1JlY3RhbmdsZS0xNCcgc3Ryb2tlPScjQjJCNEI5JyBtYXNrPSd1cmwoI21hc2stMyknIGZpbGw9JyNGQ0ZDRkMnIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHQgICAgPC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdFwiaXBob25lLTZzXCIgOiBcIjxzdmcgd2lkdGg9JzY0cHgnIGhlaWdodD0nMTA3cHgnIHZpZXdCb3g9JzI0IDM4NyA2NCAxMDcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdCAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0ICAgIDxkZWZzPlxuXHRcdFx0XHQgICAgICAgIDxmaWx0ZXIgeD0nLTUwJScgeT0nLTUwJScgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJScgZmlsdGVyVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyBpZD0nZmlsdGVyLTEnPlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVPZmZzZXQgZHg9JzAnIGR5PScxJyBpbj0nU291cmNlQWxwaGEnIHJlc3VsdD0nc2hhZG93T2Zmc2V0T3V0ZXIxJz48L2ZlT2Zmc2V0PlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPScxLjUnIGluPSdzaGFkb3dPZmZzZXRPdXRlcjEnIHJlc3VsdD0nc2hhZG93Qmx1ck91dGVyMSc+PC9mZUdhdXNzaWFuQmx1cj5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPScwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNCAwJyB0eXBlPSdtYXRyaXgnIGluPSdzaGFkb3dCbHVyT3V0ZXIxJyByZXN1bHQ9J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZUNvbG9yTWF0cml4PlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVNZXJnZT5cblx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdTb3VyY2VHcmFwaGljJz48L2ZlTWVyZ2VOb2RlPlxuXHRcdFx0XHQgICAgICAgICAgICA8L2ZlTWVyZ2U+XG5cdFx0XHRcdCAgICAgICAgPC9maWx0ZXI+XG5cdFx0XHRcdCAgICAgICAgPHBhdGggZD0nTTEuNDg2NDc2NDYsNDguMzc3OTk0NyBDMC41ODAyNjY0OSw0Ny42NDY0Mjk2IDAsNDYuNTI5NTg3IDAsNDUuMjc4MTk0OCBMMCwzLjk5MDA5Nzg3IEMwLDEuNzgyNTkxMiAxLjc5NTA5NTc3LDAgNC4wMDk0NTg2MiwwIEw1My45OTA1NDE0LDAgQzU2LjIwMDU3NDYsMCA1OCwxLjc4NjQyNzY3IDU4LDMuOTkwMDk3ODcgTDU4LDQ1LjI3ODE5NDggQzU4LDQ2LjE4MzMwMDQgNTcuNjk4MjI1OCw0Ny4wMTY5NzMzIDU3LjE4OTUwOTcsNDcuNjg1NjMyNSBDNTcuMDM5Njg2NSw0OC4wMjEyNDk3IDU2LjczNjAwOTgsNDguMzk3MjgzNCA1Ni4yNzE4MzYzLDQ4Ljc5NTA2NjEgQzU2LjI3MTgzNjMsNDguNzk1MDY2MSA0NS42MDY4Mzc2LDU3LjYyMjA2OTMgNDUuNjA2ODM3Niw2MC4wNzQ2MTQ5IEM0NS42MDY4Mzc2LDcyLjQwMjYyMDUgNDUuMTc3OTY3LDk2Ljk5MjMxNjQgNDUuMTc3OTY3LDk2Ljk5MjMxNjQgQzQ1LjE0MTM3NDgsOTkuMjEyMjIxNCA0My4zMTkzMDY1LDEwMSA0MS4xMDkwMDM1LDEwMSBMMTcuMzg2NzIzLDEwMSBDMTUuMTgxMjcyMiwxMDEgMTMuMzU0NjgzLDk5LjIwNTUwMDkgMTMuMzE3NzU5NSw5Ni45OTE4NzQxIEMxMy4zMTc3NTk1LDk2Ljk5MTg3NDEgMTIuODg4ODg4OSw3Mi4zOTk0ODM4IDEyLjg4ODg4ODksNjAuMDY5OTA5OSBDMTIuODg4ODg4OSw1Ny42MTg5MzI2IDIuMjI2NzM0MzcsNDkuMTQ2MjkzNiAyLjIyNjczNDM3LDQ5LjE0NjI5MzYgQzEuOTA1MjQwODcsNDguODc4ODMyNyAxLjY1OTExNjU1LDQ4LjYyMDczMyAxLjQ4NjQ3NjQ2LDQ4LjM3Nzk5NDcgWicgaWQ9J3BhdGgtMic+PC9wYXRoPlxuXHRcdFx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nNTgnIGhlaWdodD0nMTAxJyBmaWxsPSd3aGl0ZSc+XG5cdFx0XHRcdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdCAgICAgICAgPC9tYXNrPlxuXHRcdFx0XHQgICAgPC9kZWZzPlxuXHRcdFx0XHQgICAgPGcgaWQ9J1BvcG92ZXInIGZpbHRlcj0ndXJsKCNmaWx0ZXItMSknIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDI3LjAwMDAwMCwgMzg5LjAwMDAwMCknPlxuXHRcdFx0XHQgICAgICAgIDx1c2UgaWQ9J1JlY3RhbmdsZS0xNCcgc3Ryb2tlPScjQjJCNEI5JyBtYXNrPSd1cmwoI21hc2stMyknIGZpbGw9JyNGQ0ZDRkMnIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHQgICAgPC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHRcdFwiaXBob25lLTZzLXBsdXNcIiA6IFwiPHN2ZyB3aWR0aD0nNzBweCcgaGVpZ2h0PScxMTlweCcgdmlld0JveD0nMjggNDUwIDcwIDExOScgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQgICAgPGRlZnM+XG5cdFx0XHRcdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMSc+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC40IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnIHJlc3VsdD0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZU1lcmdlPlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J1NvdXJjZUdyYXBoaWMnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdCAgICAgICAgICAgIDwvZmVNZXJnZT5cblx0XHRcdFx0ICAgICAgICA8L2ZpbHRlcj5cblx0XHRcdFx0ICAgICAgICA8cGF0aCBkPSdNMS45NTcyOTM5NSw1NC4wNzI4MzA0IEMwLjc4NTkxMTEzMiw1My4zNzU3Njk5IDAsNTIuMDk4Nzc2IDAsNTAuNjM4OTAyMiBMMCwzLjk5NTI0NDE5IEMwLDEuNzg2NzE0MjggMS43OTI0MjIwMiwwIDQuMDAzNDg2NjMsMCBMNTkuOTk2NTEzNCwwIEM2Mi4yMDQ2MjM1LDAgNjQsMS43ODg3MzE3NSA2NCwzLjk5NTI0NDE5IEw2NCw1MC42Mzg5MDIyIEM2NCw1MS45MjMzNjg2IDYzLjM5MzcxMTYsNTMuMDY1MTU1NiA2Mi40NTEzOTEsNTMuNzk1NzU0IEM2Mi40NDI3NzUyLDUzLjgwMzI0MzMgNjIuNDM0MTAxOSw1My44MTA3NDA0IDYyLjQyNTM3MDksNTMuODE4MjQ1NCBDNjIuNDI1MzcwOSw1My44MTgyNDU0IDUwLjMyNDc4NjMsNjMuODk3NzQwMiA1MC4zMjQ3ODYzLDY2LjYxNzM5NDcgQzUwLjMyNDc4NjMsODAuMjg4MDU0NCA0OS44NDQzMDQ5LDEwOC4wMDIwMDcgNDkuODQ0MzA0OSwxMDguMDAyMDA3IEM0OS44MDc5NjY1LDExMC4yMTAyMzQgNDcuOTg3NDIzMiwxMTIgNDUuNzc4OTA4OSwxMTIgTDE4Ljc2ODA5OTcsMTEyIEMxNi41NTM0Mzk3LDExMiAxNC43Mzk0NDU2LDExMC4yMDk4NCAxNC43MDI3MDM3LDEwOC4wMDE1NjYgQzE0LjcwMjcwMzcsMTA4LjAwMTU2NiAxNC4yMjIyMjIyLDgwLjI4NDU3NjEgMTQuMjIyMjIyMiw2Ni42MTIxNzczIEMxNC4yMjIyMjIyLDYzLjg5NDI2MTkgMi4xNDA4MTQyMiw1NC4yMzIxMzM3IDIuMTQwODE0MjIsNTQuMjMyMTMzNyBDMi4wNzY2NDkxMyw1NC4xNzg2Mjk4IDIuMDE1NDgxMTEsNTQuMTI1NTEzNCAxLjk1NzI5Mzk1LDU0LjA3MjgzMDQgWicgaWQ9J3BhdGgtMic+PC9wYXRoPlxuXHRcdFx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nNjQnIGhlaWdodD0nMTEyJyBmaWxsPSd3aGl0ZSc+XG5cdFx0XHRcdCAgICAgICAgICAgIDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdCAgICAgICAgPC9tYXNrPlxuXHRcdFx0XHQgICAgPC9kZWZzPlxuXHRcdFx0XHQgICAgPGcgaWQ9J1BvcG92ZXInIGZpbHRlcj0ndXJsKCNmaWx0ZXItMSknIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMxLjAwMDAwMCwgNDUyLjAwMDAwMCknPlxuXHRcdFx0XHQgICAgICAgIDx1c2UgaWQ9J1JlY3RhbmdsZS0xNCcgc3Ryb2tlPScjQjJCNEI5JyBtYXNrPSd1cmwoI21hc2stMyknIGZpbGw9JyNGQ0ZDRkMnIHhsaW5rOmhyZWY9JyNwYXRoLTInPjwvdXNlPlxuXHRcdFx0XHQgICAgPC9nPlxuXHRcdFx0XHQ8L3N2Zz5cIlxuXHRvYmplY3RzIDpcblx0XHRcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPScxMXB4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxMSAxNicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPkxpZ2h0YnVsYjwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNicgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTI0NC4wMDAwMDAsIC02MzkuMDAwMDAwKScgc3Ryb2tlPScjNEE1MzYxJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdMaWdodGJ1bGInIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDI0NC4wMDAwMDAsIDYzOS4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTgsMTAuNDAwMjkwNCBDOS43ODA4Mzc5NSw5LjQ4OTkzNDkxIDExLDcuNjM3MzQyNzMgMTEsNS41IEMxMSwyLjQ2MjQzMzg4IDguNTM3NTY2MTIsMCA1LjUsMCBDMi40NjI0MzM4OCwwIDAsMi40NjI0MzM4OCAwLDUuNSBDMCw3LjYzNzM0MjczIDEuMjE5MTYyMDUsOS40ODk5MzQ5MSAzLDEwLjQwMDI5MDQgTDMsMTQuMDAyMDg2OSBDMywxNS4xMDE3Mzk0IDMuODk3NjE2MDIsMTYgNS4wMDQ4ODE1LDE2IEw1Ljk5NTExODUsMTYgQzcuMTA2MTAwMiwxNiA4LDE1LjEwNTUwMzggOCwxNC4wMDIwODY5IEw4LDEwLjQwMDI5MDQgWicgaWQ9J092YWwtMTcnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS01MCcgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgeD0nMycgeT0nMTInIHdpZHRoPSc1JyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS01MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgeD0nNCcgeT0nMTMuNScgd2lkdGg9JzEuNScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LDguNSBDNSw4LjUgMy40OTk5OTk5OSw3LjUwMDAwMDAxIDQsNyBDNC41MDAwMDAwMSw2LjQ5OTk5OTk5IDUsNy42NjY2NjY2NyA1LjUsOCBDNS41LDggNi41LDYuNTAwMDAwMDEgNyw3IEM3LjUsNy40OTk5OTk5OSA2LDguNSA2LDguNSBMNiwxMSBMNSwxMSBMNSw4LjUgWicgaWQ9J1JlY3RhbmdsZS01Micgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0c2hpZnQgOiB7XG5cdFx0b24gOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPScyMHB4JyBoZWlnaHQ9JzE4cHgnIHZpZXdCb3g9JzAgMCAyMCAxNycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHRcdDx0aXRsZT5TaGlmdDwvdGl0bGU+XG5cdFx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkL0xpZ2h0L1VwcGVyJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTQuMDAwMDAwLCAtMTMwLjAwMDAwMCknIGZpbGw9JyMwMzAzMDMnPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nVGhpcmQtUm93JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzLjAwMDAwMCwgMTE4LjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00yMS43MDUyMzg4LDEzLjIwNTIzODggQzIxLjMxNTc0NjIsMTIuODE1NzQ2MiAyMC42ODU3NTU5LDEyLjgxNDI0NDEgMjAuMjk0NzYxMiwxMy4yMDUyMzg4IEwxMS45MTYwNzY3LDIxLjU4MzkyMzMgQzExLjEzMzk5OTEsMjIuMzY2MDAwOSAxMS4zOTgyNjA2LDIzIDEyLjQ5NzkxMzEsMjMgTDE2LjUsMjMgTDE2LjUsMjguMDA5MjIyIEMxNi41LDI4LjU1NjQxMzYgMTYuOTQ2MzExNCwyOSAxNy40OTc1NDQ2LDI5IEwyNC41MDI0NTU0LDI5IEMyNS4wNTMzODQsMjkgMjUuNSwyOC41NDkwMjQ4IDI1LjUsMjguMDA5MjIyIEwyNS41LDIzIEwyOS41MDIwODY5LDIzIEMzMC42MDU1MDM4LDIzIDMwLjg2NjgyNCwyMi4zNjY4MjQgMzAuMDgzOTIzMywyMS41ODM5MjMzIEwyMS43MDUyMzg4LDEzLjIwNTIzODggWicgaWQ9J1NoaWZ0Jz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdFx0b2ZmIDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHQ8c3ZnIHdpZHRoPScyMHB4JyBoZWlnaHQ9JzE4cHgnIHZpZXdCb3g9JzAgMCAyMCAxOScgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHQ8dGl0bGU+U2hpZnQ8L3RpdGxlPlxuXHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkL0xpZ2h0L0xvd2VyJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTQuMDAwMDAwLCAtMTI5LjAwMDAwMCknIGZpbGw9JyMwMzAzMDMnPlxuXHRcdFx0XHRcdDxnIGlkPSdUaGlyZC1Sb3cnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMuMDAwMDAwLCAxMTguMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMjEuNjcxOTAwOCwxMi4yMzI1ODk4IEMyMS4zMDEwMzIsMTEuODI3OTkxNiAyMC42OTQ2ODkyLDExLjgzMzQ3MzEgMjAuMzI4ODE5NSwxMi4yMzI1ODk4IEwxMS42OTQ3MDIzLDIxLjY1MTI5ODMgQzEwLjc1ODc0NDEsMjIuNjcyMzA4IDExLjEyODU1NDEsMjMuNSAxMi41MDk3NzUxLDIzLjUgTDE1Ljk5OTk5OTksMjMuNTAwMDAwMiBMMTUuOTk5OTk5OSwyOC4wMDE0MjQxIEMxNS45OTk5OTk5LDI4LjgyOTA2NDggMTYuNjcxNjU1OSwyOS41MDAwMDAxIDE3LjQ5NzEwMSwyOS41MDAwMDAxIEwyNC41MDI4OTkyLDI5LjUwMDAwMDEgQzI1LjMyOTcyNTMsMjkuNTAwMDAwMSAyNi4wMDAwMDAzLDI4LjgzNDk3MDMgMjYuMDAwMDAwMywyOC4wMDE0MjQxIEwyNi4wMDAwMDAzLDIzLjUwMDAwMDEgTDI5LjQ5MDIyNTEsMjMuNTAwMDAwMiBDMzAuODc2MzM1NywyMy41MDAwMDAyIDMxLjI0Mzk1MjEsMjIuNjc1MTkxNiAzMC4zMDU0MTYxLDIxLjY1MTI5ODUgTDIxLjY3MTkwMDgsMTIuMjMyNTg5OCBaIE0yMS4zNDE3NDgsMTQuMzY0NTMxNiBDMjEuMTUzMDA1NiwxNC4xNjMyMDY0IDIwLjg0MzM1MTUsMTQuMTY3MDkxNCAyMC42NTgyNTE0LDE0LjM2NDUzMTYgTDEzLjUsMjEuOTk5OTk5OCBMMTcuNTAwMDAwMSwyMS45OTk5OTk5IEwxNy41MDAwMDAyLDI3LjUwODk5NTYgQzE3LjUwMDAwMDIsMjcuNzgwMTcwMyAxNy43MzI5MDI3LDI4LjAwMDAwMDggMTguMDAzNDIyOSwyOC4wMDAwMDA4IEwyMy45OTY1NzcsMjguMDAwMDAwOCBDMjQuMjc0NjA5NywyOC4wMDAwMDA4IDI0LjQ5OTk5OTcsMjcuNzcyMTIwMyAyNC40OTk5OTk3LDI3LjUwODk5NTYgTDI0LjQ5OTk5OTcsMjEuOTk5OTk5OSBMMjguNSwyMS45OTk5OTk5IEwyMS4zNDE3NDgsMTQuMzY0NTMxNiBaJyBpZD0nU2hpZnQnPjwvcGF0aD5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvZz5cblx0XHQ8L3N2Zz5cIlxuXHR9XG5cdHNtaWxleXM6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxN3B4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNyAxNicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPjpEPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J2lPUy05LUtleWJvYXJkcycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02LVBvcnRyYWl0LUxpZ2h0LUNvcHknIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC04Ni4wMDAwMDAsIC02MzguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmRzJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgNDA4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nOkQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDg3LjAwMDAwMCwgMjMwLjUwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdDxjaXJjbGUgaWQ9J0hlYWQnIHN0cm9rZT0nIzRBNTQ2MScgc3Ryb2tlLXdpZHRoPScwLjc4OTQ3MzY4NCcgY3g9JzcuNScgY3k9JzcuNScgcj0nNy41Jz48L2NpcmNsZT5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNy41LDEzLjUyNjMxNTggQzEwLjI2ODY5MDcsMTMuNTI2MzE1OCAxMi41MTMxNTc5LDEwLjM2ODQyMTIgMTIuNTEzMTU3OSw5LjE4NDIxMDQ1IEMxMi41MTMxNTc5LDcuNjA1MjYzMTcgMTEuNDM4OTA5OCw5LjE4NDIxMDQzIDcuNSw5LjE4NDIxMDUzIEMzLjU2MTA5MDIzLDkuMTg0MjEwNjIgMi40ODY4NDIxMSw3LjYwNTI2MzE3IDIuNDg2ODQyMTEsOS4xODQyMTA0NSBDMi40ODY4NDIxMSwxMC4zNjg0MjEgNC43MzEzMDkzNSwxMy41MjYzMTU4IDcuNSwxMy41MjYzMTU4IFogTTcuNSwxMC45NjA1MjYzIEM4LjkzMjMzMDgzLDExLjE1Nzg5NDcgMTEuNzk2OTkyNSwxMC4zNjg0MjEgMTEuNzk2OTkyNSw5LjQ0NDIzNTUyIEMxMS43OTY5OTI1LDguNzg5NDczNjggMTAuODc2MjA4NCw5LjU3ODk0NzI3IDcuNSw5Ljc3NjMxNTc5IEM0LjEyMzc5MTYyLDkuNTc4OTQ3NDMgMy4yMDMwMDg3Miw4Ljc4OTQ3MzY5IDMuMjAzMDA3NTIsOS40NDQyMzU1MiBDMy4yMDMwMDU4MiwxMC4zNjg0MjEgNi4wNjc2NjkxNywxMS4xNTc4OTQ3IDcuNSwxMC45NjA1MjYzIFonIGlkPSdTbWlsZScgZmlsbD0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LjIzNjg0MjExLDYuMzIzNjU5OCBDNS42NDM3ODg3Niw2LjMyMzY1OTggNS45NzM2ODQyMSw1Ljg4MTgzNTU0IDUuOTczNjg0MjEsNS4zMzY4MTc2OSBDNS45NzM2ODQyMSw0Ljc5MTc5OTg1IDUuNjQzNzg4NzYsNC4zNDk5NzU1OSA1LjIzNjg0MjExLDQuMzQ5OTc1NTkgQzQuODI5ODk1NDUsNC4zNDk5NzU1OSA0LjUsNC43OTE3OTk4NSA0LjUsNS4zMzY4MTc2OSBDNC41LDUuODgxODM1NTQgNC44Mjk4OTU0NSw2LjMyMzY1OTggNS4yMzY4NDIxMSw2LjMyMzY1OTggWiBNOS43MzY4NDIxMSw2LjMyMzY1OTggQzEwLjE0Mzc4ODgsNi4zMjM2NTk4IDEwLjQ3MzY4NDIsNS44ODE4MzU1NCAxMC40NzM2ODQyLDUuMzM2ODE3NjkgQzEwLjQ3MzY4NDIsNC43OTE3OTk4NSAxMC4xNDM3ODg4LDQuMzQ5OTc1NTkgOS43MzY4NDIxMSw0LjM0OTk3NTU5IEM5LjMyOTg5NTQ1LDQuMzQ5OTc1NTkgOSw0Ljc5MTc5OTg1IDksNS4zMzY4MTc2OSBDOSw1Ljg4MTgzNTU0IDkuMzI5ODk1NDUsNi4zMjM2NTk4IDkuNzM2ODQyMTEsNi4zMjM2NTk4IFonIGlkPSdFeWVzJyBmaWxsPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cblx0c3ltYm9sczogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzE2cHgnIGhlaWdodD0nMTdweCcgdmlld0JveD0nMCAwIDE1IDE3JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+T2JqZWN0cyAmYW1wOyBTeW1ib2xzPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J2lPUy05LUtleWJvYXJkcycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02LVBvcnRyYWl0LUxpZ2h0LUNvcHknIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0zMDQuMDAwMDAwLCAtNjM4LjAwMDAwMCknIGZpbGw9JyM0QTU0NjEnPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkcycgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDQwOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J09iamVjdHMtJmFtcDstU3ltYm9scycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMzA0LjAwMDAwMCwgMjMwLjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHRcdDxnIGlkPSdUaGluZycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDAuNTAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTEyMDknIHg9JzAnIHk9JzAnIHdpZHRoPSc3JyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtMTIwOScgeD0nMCcgeT0nMicgd2lkdGg9JzcnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS0xMjExJyB4PSczJyB5PSczJyB3aWR0aD0nMScgaGVpZ2h0PSc0Jz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xMS43NSwwLjE1OTI2Mzk3OCBMMTEuNzUsMCBMMTEsMCBMMTEsNS4wOTE0OTMgQzEwLjU5MzQ0LDQuOTQyMjEzOTIgMTAuMDYzOTY2Miw0Ljk2NDUzMjI0IDkuNTU3MTUzOTksNS4xOTAxNzk1NyBDOC42OTg0OTI5Myw1LjU3MjQ4MDEgOC4yMzAwMzgzNSw2LjM5MzY1NjIxIDguNTEwODMxNDEsNy4wMjQzMjc3NCBDOC43OTE2MjQ0Nyw3LjY1NDk5OTI4IDkuNzE1MzM0NTQsNy44NTYzNDM3NSAxMC41NzM5OTU2LDcuNDc0MDQzMjEgQzExLjI3NjExODMsNy4xNjE0MzgwMyAxMS43MTczMzkzLDYuNTU1Mzg5NzIgMTEuNzAxMzU5NSw2IEwxMS43NSw2IEwxMS43NSwxLjM5Mzg1MDU2IEMxMi4zMTc1OTA4LDEuNTk1OTAwMzcgMTMsMi4wODE3NDU2IDEzLDMuMjUgQzEzLDQuMjUgMTIuNzUsNS41IDEyLjc1LDUuNSBDMTIuNzUsNS41IDEzLjc1LDQuNzUgMTMuNzUsMi41IEMxMy43NSwxLjAyMjU2MTAxIDEyLjU2NDI2NzQsMC40MDc0NzMwMTkgMTEuNzUsMC4xNTkyNjM5NzggWicgaWQ9J05vdGUnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8dGV4dCBpZD0nJmFtcDsnIHNrZXRjaDp0eXBlPSdNU1RleHRMYXllcicgZm9udC1mYW1pbHk9J1NGIFVJIERpc3BsYXknIGZvbnQtc2l6ZT0nOS41JyBmb250LXdlaWdodD0nbm9ybWFsJz5cblx0XHRcdFx0XHRcdFx0XHRcdDx0c3BhbiB4PScwLjI1JyB5PScxNic+JmFtcDs8L3RzcGFuPlxuXHRcdFx0XHRcdFx0XHRcdDwvdGV4dD5cblx0XHRcdFx0XHRcdFx0XHQ8dGV4dCBpZD0nJScgc2tldGNoOnR5cGU9J01TVGV4dExheWVyJyBmb250LWZhbWlseT0nU0YgVUkgRGlzcGxheScgZm9udC1zaXplPSc5LjUnIGZvbnQtd2VpZ2h0PSdub3JtYWwnPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHRzcGFuIHg9JzcuNzUnIHk9JzE2Jz4lPC90c3Bhbj5cblx0XHRcdFx0XHRcdFx0XHQ8L3RleHQ+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdHRyYXZlbDogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzE3cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDE3IDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+VHJhbnNwb3J0PC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J2lPUy05LUtleWJvYXJkcycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02LVBvcnRyYWl0LUxpZ2h0LUNvcHknIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yNDEuMDAwMDAwLCAtNjM4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkcycgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDQwOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J1RyYW5zcG9ydCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjQxLjUwMDAwMCwgMjMwLjAwMDAwMCknIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00wLDYgTDEsNiBMMSwxNSBMMCwxNSBMMCw2IFogTTE1LDQgTDE2LDQgTDE2LDE1IEwxNSwxNSBMMTUsNCBaIE0zLjUsMCBMNC41LDAgTDQuNSw3IEwzLjUsNyBMMy41LDAgWiBNMSw2IEwzLjUsNiBMMy41LDcgTDEsNyBMMSw2IFogTTQuNSwwIEw5LjUsMCBMOS41LDEgTDQuNSwxIEw0LjUsMCBaIE05LjUsMCBMMTAuNSwwIEwxMC41LDYgTDkuNSw2IEw5LjUsMCBaIE0xMC41LDQgTDE1LDQgTDE1LDUgTDEwLjUsNSBMMTAuNSw0IFonIGlkPSdTa3lsaW5lJyBmaWxsPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PGcgaWQ9J1dpbmRvd3MnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDIuMDAwMDAwLCAyLjAwMDAwMCknIGZpbGw9JyM0QTU0NjEnPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1dpbmRvdycgeD0nMCcgeT0nNicgd2lkdGg9JzEnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1dpbmRvdycgeD0nMy41JyB5PScwJyB3aWR0aD0nMScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nV2luZG93JyB4PSc1LjUnIHk9JzAnIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdXaW5kb3cnIHg9JzUuNScgeT0nMicgd2lkdGg9JzEnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1dpbmRvdycgeD0nMy41JyB5PScyJyB3aWR0aD0nMScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nV2luZG93JyB4PScxMScgeT0nNCcgd2lkdGg9JzEnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1dpbmRvdycgeD0nMTEnIHk9JzYnIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHRcdFx0PGcgaWQ9J0NhcicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMi41MDAwMDAsIDYuNTAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNOC41LDggTDIuNSw4IEwyLjUsOS41IEwwLjUsOS41IEwwLjUsNy44NjgxMTQ1IEMwLjIwMTIwMjE5Miw3LjY5NTgyNzAyIDAsNy4zNzA5MTM2MyAwLDYuOTkwNjMxMSBMMCw1LjAwOTM2ODkgQzAsNC40NTE5MDk4NSAwLjQ0NDgzNjk3NCw0IDAuOTk1NTc3NDk5LDQgTDEwLjAwNDQyMjUsNCBDMTAuNTU0MjY0OCw0IDExLDQuNDQzMzUzMTggMTEsNS4wMDkzNjg5IEwxMSw2Ljk5MDYzMTEgQzExLDcuMzY1MzMxNSAxMC43OTkwMjQ0LDcuNjkyMzQ1MTkgMTAuNSw3Ljg2NjQ5MDAyIEwxMC41LDkuNSBMOC41LDkuNSBMOC41LDggWiBNMS43NSw2LjUgQzIuMTY0MjEzNTYsNi41IDIuNSw2LjE2NDIxMzU2IDIuNSw1Ljc1IEMyLjUsNS4zMzU3ODY0NCAyLjE2NDIxMzU2LDUgMS43NSw1IEMxLjMzNTc4NjQ0LDUgMSw1LjMzNTc4NjQ0IDEsNS43NSBDMSw2LjE2NDIxMzU2IDEuMzM1Nzg2NDQsNi41IDEuNzUsNi41IFogTTkuMjUsNi41IEM5LjY2NDIxMzU2LDYuNSAxMCw2LjE2NDIxMzU2IDEwLDUuNzUgQzEwLDUuMzM1Nzg2NDQgOS42NjQyMTM1Niw1IDkuMjUsNSBDOC44MzU3ODY0NCw1IDguNSw1LjMzNTc4NjQ0IDguNSw1Ljc1IEM4LjUsNi4xNjQyMTM1NiA4LjgzNTc4NjQ0LDYuNSA5LjI1LDYuNSBaIE0wLjUsNyBMMTAuNSw3IEwxMC41LDcuNSBMMC41LDcuNSBMMC41LDcgWiBNMyw2LjUgTDgsNi41IEw4LDcgTDMsNyBMMyw2LjUgWicgaWQ9J0JvZHknIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xLjUsNC41IEwxLjUsMyBDMS41LDEuMzQzMTQ1NzUgMi44MzkwMjAxMywwIDQuNTAxNjY1NDcsMCBMNi40OTgzMzQ1MywwIEM4LjE1NjEwODU5LDAgOS41LDEuMzQ2NTE3MTIgOS41LDMgTDkuNSw1JyBpZD0nUm9vZicgc3Ryb2tlPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxufVxuXG5cbmV4cG9ydHMuZnJhbWVyRnJhbWVzID1cblx0NjQwOjJcblx0NzUwOjJcblx0NzY4OjJcblx0MTA4MDozXG5cdDEyNDI6M1xuXHQxNDQwOjRcblx0MTUzNjoyXG5cbiMgRGV2aWNlIGZyYW1lc1xuZXhwb3J0cy5yZWFsRGV2aWNlcyA9XG5cdDMyMDpcblx0XHQ0ODA6XG5cdFx0XHRuYW1lOlwiaVBob25lXCJcblx0XHRcdHdpZHRoOjMyMFxuXHRcdFx0aGVpZ2h0OjQ4MFxuXHRcdFx0c2NhbGU6MVxuXHQ0ODA6XG5cdFx0ODU0OlxuXHRcdFx0bmFtZTpcIkFuZHJvaWQgT25lXCJcblx0XHRcdHdpZHRoOjQ4MFxuXHRcdFx0aGVpZ2h0Ojg1NFxuXHRcdFx0c2NhbGU6MS41XG5cblx0NjQwOlxuXHRcdDk2MDpcblx0XHRcdG5hbWU6XCJpUGhvbmUgNFwiXG5cdFx0XHR3aWR0aDo2NDBcblx0XHRcdGhlaWdodDo5NjBcblx0XHRcdHNjYWxlOjJcblx0XHQxMTM2OlxuXHRcdFx0bmFtZTpcImlQaG9uZSA1XCJcblx0XHRcdHdpZHRoOjY0MFxuXHRcdFx0aGVpZ2h0OjExMzZcblx0XHRcdHNjYWxlOjJcblx0NzIwOlxuXHRcdDEyODA6XG5cdFx0XHRuYW1lOlwiWEhEUElcIlxuXHRcdFx0d2lkdGg6NzIwXG5cdFx0XHRoZWlnaHQ6MTI4MFxuXHRcdFx0c2NhbGU6MlxuXHQ3NTA6XG5cdFx0MTExODpcblx0XHRcdG5hbWU6XCJpUGhvbmUgNlwiXG5cdFx0XHR3aWR0aDo3NTBcblx0XHRcdGhlaWdodDoxMTE4XG5cdFx0XHRzY2FsZToyXG5cdFx0MTMzNDpcblx0XHRcdG5hbWU6XCJpUGhvbmUgNlwiXG5cdFx0XHR3aWR0aDo3NTBcblx0XHRcdGhlaWdodDoxMzM0XG5cdFx0XHRzY2FsZToyXG5cdDc2ODpcblx0XHQxMDI0OlxuXHRcdFx0bmFtZTpcImlQYWRcIlxuXHRcdFx0d2lkdGg6NzY4XG5cdFx0XHRoZWlnaHQ6MTAyNFxuXHRcdFx0c2NhbGU6MVxuXHRcdDEyODA6XG5cdFx0XHRuYW1lOlwiTmV4dXMgNFwiXG5cdFx0XHR3aWR0aDo3Njhcblx0XHRcdGhlaWdodDoxMjgwXG5cdFx0XHRzY2FsZToyXG5cdDgwMDpcblx0XHQxMjgwOlxuXHRcdFx0bmFtZTpcIk5leHVzIDdcIlxuXHRcdFx0d2lkdGg6ODAwXG5cdFx0XHRoZWlnaHQ6MTI4MFxuXHRcdFx0c2NhbGU6MVxuXHQxMDgwOlxuXHRcdDE5MjA6XG5cdFx0XHRuYW1lOlwiWFhIRFBJXCJcblx0XHRcdHdpZHRoOjEwODBcblx0XHRcdGhlaWdodDoxOTIwXG5cdFx0XHRzY2FsZTozXG5cdDEyMDA6XG5cdFx0MTkyMDpcblx0XHRcdG5hbWU6XCJOZXh1cyA3XCJcblx0XHRcdHdpZHRoOjEyMDBcblx0XHRcdGhlaWdodDoxOTIwXG5cdFx0XHRzY2FsZToyXG5cdDEyNDI6XG5cdFx0MjIwODpcblx0XHRcdG5hbWU6XCJpUGhvbmUgNiBQbHVzXCJcblx0XHRcdHdpZHRoOjEyNDJcblx0XHRcdGhlaWdodDoyMjA4XG5cdFx0XHRzY2FsZTozXG5cdDE0NDA6XG5cdFx0MjU2MDpcblx0XHRcdG5hbWU6XCJYWFhIRFBJXCJcblx0XHRcdHdpZHRoOjE0NDBcblx0XHRcdGhlaWdodDoyNTYwXG5cdFx0XHRzY2FsZTo0XG5cdDE0NDE6XG5cdFx0MjU2MTpcblx0XHRcdG5hbWU6XCJOZXh1cyA2XCJcblx0XHRcdHdpZHRoOjE0NDBcblx0XHRcdGhlaWdodDoyNTYwXG5cdFx0XHRzY2FsZTo0XG5cdDE1MzY6XG5cdFx0MjA0ODpcblx0XHRcdG5hbWU6XCJpUGFkXCJcblx0XHRcdHdpZHRoOjE1MzZcblx0XHRcdGhlaWdodDoyMDQ4XG5cdFx0XHRzY2FsZToyXG5cdDE2MDA6XG5cdFx0MjA1Njpcblx0XHRcdG5hbWU6XCJOZXh1cyAxMFwiXG5cdFx0XHR3aWR0aDoxNjAwXG5cdFx0XHRoZWlnaHQ6MjA1NlxuXHRcdFx0c2NhbGU6MlxuXHQyMDQ4OlxuXHRcdDE1MzY6XG5cdFx0XHRuYW1lOlwiTmV4dXMgOVwiXG5cdFx0XHR3aWR0aDoyMDQ4XG5cdFx0XHRoZWlnaHQ6MTUzNlxuXHRcdFx0c2NhbGU6MlxuXHRcdDI3MzI6XG5cdFx0XHRuYW1lOlwiaVBhZCBQcm9cIlxuXHRcdFx0d2lkdGg6MjA0OFxuXHRcdFx0aGVpZ2h0OjI3MzJcblx0XHRcdHNjYWxlOjJcblx0MjU2MDpcblx0XHQxNjAwOlxuXHRcdFx0bmFtZTpcIk5leHVzIDEwXCJcblx0XHRcdHdpZHRoOjI1NjBcblx0XHRcdGhlaWdodDoxNjAwXG5cdFx0XHRzY2FsZToyXG5cdDI3MzI6XG5cdFx0MjA0ODpcblx0XHRcdG5hbWU6XCJpUGFkIFByb1wiXG5cdFx0XHR3aWR0aDoyNzMyXG5cdFx0XHRoZWlnaHQ6MjA0OFxuXHRcdFx0c2NhbGU6MlxuXG5cbmV4cG9ydHMuY29sb3JzID1cblx0cmVkOlwiI0Y0NDMzNlwiXG5cdHJlZDUwOlwiI0ZGRUJFRVwiXG5cdHJlZDEwMDpcIiNGRkNERDJcIlxuXHRyZWQyMDA6XCIjRUY5QTlBXCJcblx0cmVkMzAwOlwiI0U1NzM3M1wiXG5cdHJlZDQwMDpcIiNFRjUzNTBcIlxuXHRyZWQ1MDA6XCIjRjQ0MzM2XCJcblx0cmVkNjAwOlwiI0U1MzkzNVwiXG5cdHJlZDcwMDpcIiNEMzJGMkZcIlxuXHRyZWQ4MDA6XCIjQzYyODI4XCJcblx0cmVkOTAwOlwiI0I3MUMxQ1wiXG5cdHJlZEExMDA6XCIjRkY4QTgwXCJcblx0cmVkQTIwMDpcIiNGRjUyNTJcIlxuXHRyZWRBNDAwOlwiI0ZGMTc0NFwiXG5cdHJlZEE3MDA6XCIjRDUwMDAwXCJcblx0cGluazpcIiNFOTFFNjNcIlxuXHRwaW5rNTA6XCIjRkNFNEVDXCJcblx0cGluazEwMDpcIiNGOEJCRDBcIlxuXHRwaW5rMjAwOlwiI0Y0OEZCMVwiXG5cdHBpbmszMDA6XCIjRjA2MjkyXCJcblx0cGluazQwMDpcIiNFQzQwN0FcIlxuXHRwaW5rNTAwOlwiI0U5MUU2M1wiXG5cdHBpbms2MDA6XCIjRDgxQjYwXCJcblx0cGluazcwMDpcIiNDMjE4NUJcIlxuXHRwaW5rODAwOlwiI0FEMTQ1N1wiXG5cdHBpbms5MDA6XCIjODgwRTRGXCJcblx0cGlua0ExMDA6XCIjRkY4MEFCXCJcblx0cGlua0EyMDA6XCIjRkY0MDgxXCJcblx0cGlua0E0MDA6XCIjRjUwMDU3XCJcblx0cGlua0E3MDA6XCIjQzUxMTYyXCJcblx0cHVycGxlOlwiIzlDMjdCMFwiXG5cdHB1cnBsZTUwOlwiI0YzRTVGNVwiXG5cdHB1cnBsZTEwMDpcIiNFMUJFRTdcIlxuXHRwdXJwbGUyMDA6XCIjQ0U5M0Q4XCJcblx0cHVycGxlMzAwOlwiI0JBNjhDOFwiXG5cdHB1cnBsZTQwMDpcIiNBQjQ3QkNcIlxuXHRwdXJwbGU1MDA6XCIjOUMyN0IwXCJcblx0cHVycGxlNjAwOlwiIzhFMjRBQVwiXG5cdHB1cnBsZTcwMDpcIiM3QjFGQTJcIlxuXHRwdXJwbGU4MDA6XCIjNkExQjlBXCJcblx0cHVycGxlOTAwOlwiIzRBMTQ4Q1wiXG5cdHB1cnBsZUExMDA6XCIjRUE4MEZDXCJcblx0cHVycGxlQTIwMDpcIiNFMDQwRkJcIlxuXHRwdXJwbGVBNDAwOlwiI0Q1MDBGOVwiXG5cdHB1cnBsZUE3MDA6XCIjQUEwMEZGXCJcblx0ZGVlcFB1cnBsZTpcIiM2NzNBQjdcIlxuXHRkZWVwUHVycGxlNTA6XCIjRURFN0Y2XCJcblx0ZGVlcFB1cnBsZTEwMDpcIiNEMUM0RTlcIlxuXHRkZWVwUHVycGxlMjAwOlwiI0IzOUREQlwiXG5cdGRlZXBQdXJwbGUzMDA6XCIjOTU3NUNEXCJcblx0ZGVlcFB1cnBsZTQwMDpcIiM3RTU3QzJcIlxuXHRkZWVwUHVycGxlNTAwOlwiIzY3M0FCN1wiXG5cdGRlZXBQdXJwbGU2MDA6XCIjNUUzNUIxXCJcblx0ZGVlcFB1cnBsZTcwMDpcIiM1MTJEQThcIlxuXHRkZWVwUHVycGxlODAwOlwiIzQ1MjdBMFwiXG5cdGRlZXBQdXJwbGU5MDA6XCIjMzExQjkyXCJcblx0ZGVlcFB1cnBsZUExMDA6XCIjQjM4OEZGXCJcblx0ZGVlcFB1cnBsZUEyMDA6XCIjN0M0REZGXCJcblx0ZGVlcFB1cnBsZUE0MDA6XCIjNjUxRkZGXCJcblx0ZGVlcFB1cnBsZUE3MDA6XCIjNjIwMEVBXCJcblx0aW5kaWdvOlwiIzNGNTFCNVwiXG5cdGluZGlnbzUwOlwiI0U4RUFGNlwiXG5cdGluZGlnbzEwMDpcIiNDNUNBRTlcIlxuXHRpbmRpZ28yMDA6XCIjOUZBOERBXCJcblx0aW5kaWdvMzAwOlwiIzc5ODZDQlwiXG5cdGluZGlnbzQwMDpcIiM1QzZCQzBcIlxuXHRpbmRpZ281MDA6XCIjM0Y1MUI1XCJcblx0aW5kaWdvNjAwOlwiIzM5NDlBQlwiXG5cdGluZGlnbzcwMDpcIiMzMDNGOUZcIlxuXHRpbmRpZ284MDA6XCIjMjgzNTkzXCJcblx0aW5kaWdvOTAwOlwiIzFBMjM3RVwiXG5cdGluZGlnb0ExMDA6XCIjOEM5RUZGXCJcblx0aW5kaWdvQTIwMDpcIiM1MzZERkVcIlxuXHRpbmRpZ29BNDAwOlwiIzNENUFGRVwiXG5cdGluZGlnb0E3MDA6XCIjMzA0RkZFXCJcblx0Ymx1ZTpcIiMyMTk2RjNcIlxuXHRibHVlNTA6XCIjRTNGMkZEXCJcblx0Ymx1ZTEwMDpcIiNCQkRFRkJcIlxuXHRibHVlMjAwOlwiIzkwQ0FGOVwiXG5cdGJsdWUzMDA6XCIjNjRCNUY2XCJcblx0Ymx1ZTQwMDpcIiM0MkE1RjVcIlxuXHRibHVlNTAwOlwiIzIxOTZGM1wiXG5cdGJsdWU2MDA6XCIjMUU4OEU1XCJcblx0Ymx1ZTcwMDpcIiMxOTc2RDJcIlxuXHRibHVlODAwOlwiIzE1NjVDMFwiXG5cdGJsdWU5MDA6XCIjMEQ0N0ExXCJcblx0Ymx1ZUExMDA6XCIjODJCMUZGXCJcblx0Ymx1ZUEyMDA6XCIjNDQ4QUZGXCJcblx0Ymx1ZUE0MDA6XCIjMjk3OUZGXCJcblx0Ymx1ZUE3MDA6XCIjMjk2MkZGXCJcblx0bGlnaHRCbHVlOlwiIzAzQTlGNFwiXG5cdGxpZ2h0Qmx1ZTUwOlwiI0UxRjVGRVwiXG5cdGxpZ2h0Qmx1ZTEwMDpcIiNCM0U1RkNcIlxuXHRsaWdodEJsdWUyMDA6XCIjODFENEZBXCJcblx0bGlnaHRCbHVlMzAwOlwiIzRGQzNGN1wiXG5cdGxpZ2h0Qmx1ZTQwMDpcIiMyOUI2RjZcIlxuXHRsaWdodEJsdWU1MDA6XCIjMDNBOUY0XCJcblx0bGlnaHRCbHVlNjAwOlwiIzAzOUJFNVwiXG5cdGxpZ2h0Qmx1ZTcwMDpcIiMwMjg4RDFcIlxuXHRsaWdodEJsdWU4MDA6XCIjMDI3N0JEXCJcblx0bGlnaHRCbHVlOTAwOlwiIzAxNTc5QlwiXG5cdGxpZ2h0Qmx1ZUExMDA6XCIjODBEOEZGXCJcblx0bGlnaHRCbHVlQTIwMDpcIiM0MEM0RkZcIlxuXHRsaWdodEJsdWVBNDAwOlwiIzAwQjBGRlwiXG5cdGxpZ2h0Qmx1ZUE3MDA6XCIjMDA5MUVBXCJcblx0Y3lhbjpcIiMwMEJDRDRcIlxuXHRjeWFuNTA6XCIjRTBGN0ZBXCJcblx0Y3lhbjEwMDpcIiNCMkVCRjJcIlxuXHRjeWFuMjAwOlwiIzgwREVFQVwiXG5cdGN5YW4zMDA6XCIjNEREMEUxXCJcblx0Y3lhbjQwMDpcIiMyNkM2REFcIlxuXHRjeWFuNTAwOlwiIzAwQkNENFwiXG5cdGN5YW42MDA6XCIjMDBBQ0MxXCJcblx0Y3lhbjcwMDpcIiMwMDk3QTdcIlxuXHRjeWFuODAwOlwiIzAwODM4RlwiXG5cdGN5YW45MDA6XCIjMDA2MDY0XCJcblx0Y3lhbkExMDA6XCIjODRGRkZGXCJcblx0Y3lhbkEyMDA6XCIjMThGRkZGXCJcblx0Y3lhbkE0MDA6XCIjMDBFNUZGXCJcblx0Y3lhbkE3MDA6XCIjMDBCOEQ0XCJcblx0dGVhbDpcIiMwMDk2ODhcIlxuXHR0ZWFsNTA6XCIjRTBGMkYxXCJcblx0dGVhbDEwMDpcIiNCMkRGREJcIlxuXHR0ZWFsMjAwOlwiIzgwQ0JDNFwiXG5cdHRlYWwzMDA6XCIjNERCNkFDXCJcblx0dGVhbDQwMDpcIiMyNkE2OUFcIlxuXHR0ZWFsNTAwOlwiIzAwOTY4OFwiXG5cdHRlYWw2MDA6XCIjMDA4OTdCXCJcblx0dGVhbDcwMDpcIiMwMDc5NkJcIlxuXHR0ZWFsODAwOlwiIzAwNjk1Q1wiXG5cdHRlYWw5MDA6XCIjMDA0RDQwXCJcblx0dGVhbEExMDA6XCIjQTdGRkVCXCJcblx0dGVhbEEyMDA6XCIjNjRGRkRBXCJcblx0dGVhbEE0MDA6XCIjMURFOUI2XCJcblx0dGVhbEE3MDA6XCIjMDBCRkE1XCJcblx0Z3JlZW46XCIjNENBRjUwXCJcblx0Z3JlZW41MDpcIiNFOEY1RTlcIlxuXHRncmVlbjEwMDpcIiNDOEU2QzlcIlxuXHRncmVlbjIwMDpcIiNBNUQ2QTdcIlxuXHRncmVlbjMwMDpcIiM4MUM3ODRcIlxuXHRncmVlbjQwMDpcIiM2NkJCNkFcIlxuXHRncmVlbjUwMDpcIiM0Q0FGNTBcIlxuXHRncmVlbjYwMDpcIiM0M0EwNDdcIlxuXHRncmVlbjcwMDpcIiMzODhFM0NcIlxuXHRncmVlbjgwMDpcIiMyRTdEMzJcIlxuXHRncmVlbjkwMDpcIiMxQjVFMjBcIlxuXHRncmVlbkExMDA6XCIjQjlGNkNBXCJcblx0Z3JlZW5BMjAwOlwiIzY5RjBBRVwiXG5cdGdyZWVuQTQwMDpcIiMwMEU2NzZcIlxuXHRncmVlbkE3MDA6XCIjMDBDODUzXCJcblx0bGlnaHRHcmVlbjpcIiM4QkMzNEFcIlxuXHRsaWdodEdyZWVuNTA6XCIjRjFGOEU5XCJcblx0bGlnaHRHcmVlbjEwMDpcIiNEQ0VEQzhcIlxuXHRsaWdodEdyZWVuMjAwOlwiI0M1RTFBNVwiXG5cdGxpZ2h0R3JlZW4zMDA6XCIjQUVENTgxXCJcblx0bGlnaHRHcmVlbjQwMDpcIiM5Q0NDNjVcIlxuXHRsaWdodEdyZWVuNTAwOlwiIzhCQzM0QVwiXG5cdGxpZ2h0R3JlZW42MDA6XCIjN0NCMzQyXCJcblx0bGlnaHRHcmVlbjcwMDpcIiM2ODlGMzhcIlxuXHRsaWdodEdyZWVuODAwOlwiIzU1OEIyRlwiXG5cdGxpZ2h0R3JlZW45MDA6XCIjMzM2OTFFXCJcblx0bGlnaHRHcmVlbkExMDA6XCIjQ0NGRjkwXCJcblx0bGlnaHRHcmVlbkEyMDA6XCIjQjJGRjU5XCJcblx0bGlnaHRHcmVlbkE0MDA6XCIjNzZGRjAzXCJcblx0bGlnaHRHcmVlbkE3MDA6XCIjNjRERDE3XCJcblx0bGltZTpcIiNDRERDMzlcIlxuXHRsaW1lNTA6XCIjRjlGQkU3XCJcblx0bGltZTEwMDpcIiNGMEY0QzNcIlxuXHRsaW1lMjAwOlwiI0U2RUU5Q1wiXG5cdGxpbWUzMDA6XCIjRENFNzc1XCJcblx0bGltZTQwMDpcIiNENEUxNTdcIlxuXHRsaW1lNTAwOlwiI0NEREMzOVwiXG5cdGxpbWU2MDA6XCIjQzBDQTMzXCJcblx0bGltZTcwMDpcIiNBRkI0MkJcIlxuXHRsaW1lODAwOlwiIzlFOUQyNFwiXG5cdGxpbWU5MDA6XCIjODI3NzE3XCJcblx0bGltZUExMDA6XCIjRjRGRjgxXCJcblx0bGltZUEyMDA6XCIjRUVGRjQxXCJcblx0bGltZUE0MDA6XCIjQzZGRjAwXCJcblx0bGltZUE3MDA6XCIjQUVFQTAwXCJcblx0eWVsbG93OlwiI0ZGRUIzQlwiXG5cdHllbGxvdzUwOlwiI0ZGRkRFN1wiXG5cdHllbGxvdzEwMDpcIiNGRkY5QzRcIlxuXHR5ZWxsb3cyMDA6XCIjRkZGNTlEXCJcblx0eWVsbG93MzAwOlwiI0ZGRjE3NlwiXG5cdHllbGxvdzQwMDpcIiNGRkVFNThcIlxuXHR5ZWxsb3c1MDA6XCIjRkZFQjNCXCJcblx0eWVsbG93NjAwOlwiI0ZERDgzNVwiXG5cdHllbGxvdzcwMDpcIiNGQkMwMkRcIlxuXHR5ZWxsb3c4MDA6XCIjRjlBODI1XCJcblx0eWVsbG93OTAwOlwiI0Y1N0YxN1wiXG5cdHllbGxvd0ExMDA6XCIjRkZGRjhEXCJcblx0eWVsbG93QTIwMDpcIiNGRkZGMDBcIlxuXHR5ZWxsb3dBNDAwOlwiI0ZGRUEwMFwiXG5cdHllbGxvd0E3MDA6XCIjRkZENjAwXCJcblx0YW1iZXI6XCIjRkZDMTA3XCJcblx0YW1iZXI1MDpcIiNGRkY4RTFcIlxuXHRhbWJlcjEwMDpcIiNGRkVDQjNcIlxuXHRhbWJlcjIwMDpcIiNGRkUwODJcIlxuXHRhbWJlcjMwMDpcIiNGRkQ1NEZcIlxuXHRhbWJlcjQwMDpcIiNGRkNBMjhcIlxuXHRhbWJlcjUwMDpcIiNGRkMxMDdcIlxuXHRhbWJlcjYwMDpcIiNGRkIzMDBcIlxuXHRhbWJlcjcwMDpcIiNGRkEwMDBcIlxuXHRhbWJlcjgwMDpcIiNGRjhGMDBcIlxuXHRhbWJlcjkwMDpcIiNGRjZGMDBcIlxuXHRhbWJlckExMDA6XCIjRkZFNTdGXCJcblx0YW1iZXJBMjAwOlwiI0ZGRDc0MFwiXG5cdGFtYmVyQTQwMDpcIiNGRkM0MDBcIlxuXHRhbWJlckE3MDA6XCIjRkZBQjAwXCJcblx0b3JhbmdlOlwiI0ZGOTgwMFwiXG5cdG9yYW5nZTUwOlwiI0ZGRjNFMFwiXG5cdG9yYW5nZTEwMDpcIiNGRkUwQjJcIlxuXHRvcmFuZ2UyMDA6XCIjRkZDQzgwXCJcblx0b3JhbmdlMzAwOlwiI0ZGQjc0RFwiXG5cdG9yYW5nZTQwMDpcIiNGRkE3MjZcIlxuXHRvcmFuZ2U1MDA6XCIjRkY5ODAwXCJcblx0b3JhbmdlNjAwOlwiI0ZCOEMwMFwiXG5cdG9yYW5nZTcwMDpcIiNGNTdDMDBcIlxuXHRvcmFuZ2U4MDA6XCIjRUY2QzAwXCJcblx0b3JhbmdlOTAwOlwiI0U2NTEwMFwiXG5cdG9yYW5nZUExMDA6XCIjRkZEMTgwXCJcblx0b3JhbmdlQTIwMDpcIiNGRkFCNDBcIlxuXHRvcmFuZ2VBNDAwOlwiI0ZGOTEwMFwiXG5cdG9yYW5nZUE3MDA6XCIjRkY2RDAwXCJcblx0ZGVlcE9yYW5nZTpcIiNGRjU3MjJcIlxuXHRkZWVwT3JhbmdlNTA6XCIjRkJFOUU3XCJcblx0ZGVlcE9yYW5nZTEwMDpcIiNGRkNDQkNcIlxuXHRkZWVwT3JhbmdlMjAwOlwiI0ZGQUI5MVwiXG5cdGRlZXBPcmFuZ2UzMDA6XCIjRkY4QTY1XCJcblx0ZGVlcE9yYW5nZTQwMDpcIiNGRjcwNDNcIlxuXHRkZWVwT3JhbmdlNTAwOlwiI0ZGNTcyMlwiXG5cdGRlZXBPcmFuZ2U2MDA6XCIjRjQ1MTFFXCJcblx0ZGVlcE9yYW5nZTcwMDpcIiNFNjRBMTlcIlxuXHRkZWVwT3JhbmdlODAwOlwiI0Q4NDMxNVwiXG5cdGRlZXBPcmFuZ2U5MDA6XCIjQkYzNjBDXCJcblx0ZGVlcE9yYW5nZUExMDA6XCIjRkY5RTgwXCJcblx0ZGVlcE9yYW5nZUEyMDA6XCIjRkY2RTQwXCJcblx0ZGVlcE9yYW5nZUE0MDA6XCIjRkYzRDAwXCJcblx0ZGVlcE9yYW5nZUE3MDA6XCIjREQyQzAwXCJcblx0YnJvd246XCIjNzk1NTQ4XCJcblx0YnJvd241MDpcIiNFRkVCRTlcIlxuXHRicm93bjEwMDpcIiNEN0NDQzhcIlxuXHRicm93bjIwMDpcIiNCQ0FBQTRcIlxuXHRicm93bjMwMDpcIiNBMTg4N0ZcIlxuXHRicm93bjQwMDpcIiM4RDZFNjNcIlxuXHRicm93bjUwMDpcIiM3OTU1NDhcIlxuXHRicm93bjYwMDpcIiM2RDRDNDFcIlxuXHRicm93bjcwMDpcIiM1RDQwMzdcIlxuXHRicm93bjgwMDpcIiM0RTM0MkVcIlxuXHRicm93bjkwMDpcIiMzRTI3MjNcIlxuXHRncmV5OlwiIzlFOUU5RVwiXG5cdGdyZXk1MDpcIiNGQUZBRkFcIlxuXHRncmV5MTAwOlwiI0Y1RjVGNVwiXG5cdGdyZXkyMDA6XCIjRUVFRUVFXCJcblx0Z3JleTMwMDpcIiNFMEUwRTBcIlxuXHRncmV5NDAwOlwiI0JEQkRCRFwiXG5cdGdyZXk1MDA6XCIjOUU5RTlFXCJcblx0Z3JleTYwMDpcIiM3NTc1NzVcIlxuXHRncmV5NzAwOlwiIzYxNjE2MVwiXG5cdGdyZXk4MDA6XCIjNDI0MjQyXCJcblx0Z3JleTkwMDpcIiMyMTIxMjFcIlxuXHRibHVlR3JleTpcIiM2MDdEOEJcIlxuXHRibHVlR3JleTUwOlwiI0VDRUZGMVwiXG5cdGJsdWVHcmV5MTAwOlwiI0NGRDhEQ1wiXG5cdGJsdWVHcmV5MjAwOlwiI0IwQkVDNVwiXG5cdGJsdWVHcmV5MzAwOlwiIzkwQTRBRVwiXG5cdGJsdWVHcmV5NDAwOlwiIzc4OTA5Q1wiXG5cdGJsdWVHcmV5NTAwOlwiIzYwN0Q4QlwiXG5cdGJsdWVHcmV5NjAwOlwiIzU0NkU3QVwiXG5cdGJsdWVHcmV5NzAwOlwiIzQ1NUE2NFwiXG5cdGJsdWVHcmV5ODAwOlwiIzM3NDc0RlwiXG5cdGJsdWVHcmV5OTAwOlwiIzI2MzIzOFwiXG5cdGJsYWNrOlwiIzAwMDAwMFwiXG5cdHdoaXRlOlwiI0ZGRkZGRlwiXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblxuXHRuYXZiYXIgPSBuZXcgTGF5ZXJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJibGFja1wiXG5cblx0bmF2YmFyLnR5cGUgPSBcIm5hdmJhclwiXG5cblx0bmF2YmFyLmNvbnN0cmFpbnRzID1cblx0XHRib3R0b206LTFcblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0aGVpZ2h0OjQ4XG5cblx0c3ZnSG9tZSA9IG0udXRpbHMuc3ZnKG0uYXNzZXRzLmhvbWUpXG5cdHN2Z0JhY2sgPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy5iYWNrKVxuXG5cdGhvbWVCdXR0b24gPSBuZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOm5hdmJhclxuXHRcdGJvcmRlclJhZGl1czptLnV0aWxzLnB4KDIxKVxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwiaG9tZVwiXG5cdFx0Y2xpcDp0cnVlXG5cblx0aG9tZUJ1dHRvbi5jb25zdHJhaW50cyA9XG5cdFx0dG9wOjNcblx0XHRoZWlnaHQ6NDJcblx0XHR3aWR0aDo5NFxuXHRcdGFsaWduOlwiaG9yaXpvbnRhbFwiXG5cblx0aG9tZUljb24gPSBuZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOmhvbWVCdXR0b25cblx0XHR3aWR0aDpzdmdIb21lLndpZHRoXG5cdFx0aGVpZ2h0OnN2Z0hvbWUuaGVpZ2h0XG5cdFx0aHRtbDpzdmdIb21lLnN2Z1xuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwiaWNvblwiXG5cblx0aG9tZUljb24uY29uc3RyYWludHMgPVxuXHRcdGFsaWduOlwiY2VudGVyXCJcblxuXHRyZWNlbnRCdXR0b24gPSBuZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOm5hdmJhclxuXHRcdGJvcmRlclJhZGl1czptLnV0aWxzLnB4KDIxKVxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwicmVjZW50XCJcblx0XHRjbGlwOnRydWVcblxuXHRyZWNlbnRCdXR0b24uY29uc3RyYWludHMgPVxuXHRcdHRvcDozXG5cdFx0aGVpZ2h0OjQyXG5cdFx0d2lkdGg6OTRcblx0XHRsZWFkaW5nOltob21lQnV0dG9uLCA2XVxuXG5cdHJlY2VudEljb24gPSBuZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOnJlY2VudEJ1dHRvblxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRib3JkZXJDb2xvcjpcIndoaXRlXCJcblx0XHRib3JkZXJXaWR0aDptLnV0aWxzLnB4KDIpXG5cdFx0Ym9yZGVyUmFkaXVzOm0udXRpbHMucHgoMilcblx0XHRuYW1lOlwiaWNvblwiXG5cblx0cmVjZW50SWNvbi5jb25zdHJhaW50cyA9XG5cdFx0YWxpZ246XCJjZW50ZXJcIlxuXHRcdHdpZHRoOjE2XG5cdFx0aGVpZ2h0OjE2XG5cblx0YmFja0J1dHRvbiA9IG5ldyBMYXllclxuXHRcdHN1cGVyTGF5ZXI6bmF2YmFyXG5cdFx0Ym9yZGVyUmFkaXVzOm0udXRpbHMucHgoMjEpXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJiYWNrXCJcblx0XHRjbGlwOnRydWVcblxuXHRiYWNrQnV0dG9uLmNvbnN0cmFpbnRzID1cblx0XHR0b3A6M1xuXHRcdGhlaWdodDo0MlxuXHRcdHdpZHRoOjk0XG5cdFx0dHJhaWxpbmc6W2hvbWVCdXR0b24sIDZdXG5cblxuXHRiYWNrSWNvbiA9IG5ldyBMYXllclxuXHRcdHN1cGVyTGF5ZXI6YmFja0J1dHRvblxuXHRcdHdpZHRoOnN2Z0JhY2sud2lkdGhcblx0XHRoZWlnaHQ6c3ZnQmFjay5oZWlnaHRcblx0XHRodG1sOnN2Z0JhY2suc3ZnXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJpY29uXCJcblxuXHRiYWNrSWNvbi5jb25zdHJhaW50cyA9XG5cdFx0YWxpZ246XCJjZW50ZXJcIlxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbbmF2YmFyLCBob21lQnV0dG9uLCByZWNlbnRCdXR0b24sIGJhY2tCdXR0b24sIGhvbWVJY29uLCBiYWNrSWNvbiwgcmVjZW50SWNvbl1cblxuXHRtLnV0aWxzLmlua3lcblx0XHRsYXllcjpob21lQnV0dG9uXG5cdFx0bW92ZVRvVGFwOmZhbHNlXG5cdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdHNjYWxlOiAyMFxuXHRcdGN1cnZlOiBcImJlemllci1jdXJ2ZSgxLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0b3BhY2l0eTogLjNcblx0bS51dGlscy5pbmt5XG5cdFx0XHRsYXllcjpiYWNrQnV0dG9uXG5cdFx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHNjYWxlOiAyMFxuXHRcdFx0Y3VydmU6IFwiYmV6aWVyLWN1cnZlKDEsIDAuNCwgMC40LCAxLjApXCJcblx0XHRcdG9wYWNpdHk6IC4zXG5cdG0udXRpbHMuaW5reVxuXHRcdFx0bGF5ZXI6cmVjZW50QnV0dG9uXG5cdFx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdHNjYWxlOiAyMFxuXHRcdFx0Y3VydmU6IFwiYmV6aWVyLWN1cnZlKDEsIDAuNCwgMC40LCAxLjApXCJcblx0XHRcdG9wYWNpdHk6IC4zXG5cblx0YmFja0J1dHRvbi5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG5cdFx0bS5yZW1vdmVGcm9tU3RhY2soKVxuXG5cdG5hdmJhci5iYWNrID0gYmFja0J1dHRvblxuXHRuYXZiYXIuYmFjay5iYWNrSWNvbiA9IGJhY2tJY29uXG5cdG5hdmJhci5ob21lID0gaG9tZUJ1dHRvblxuXHRuYXZiYXIuaG9tZS5pY29uID0gaG9tZUljb25cblx0bmF2YmFyLnJlY2VudCA9IHJlY2VudEJ1dHRvblxuXHRuYXZiYXIucmVjZW50Lmljb24gPSByZWNlbnRJY29uXG5cblx0VXRpbHMuaW50ZXJ2YWwgLjA1LCAtPlxuXHRcdG5hdmJhci5icmluZ1RvRnJvbnQoKVxuXG5cdG0ubGF5b3V0LnNldChuYXZiYXIpXG5cdHJldHVybiBuYXZiYXJcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGFuaW1hdGVkOnRydWVcblx0dGV4dDpcIlNuYWNrYmFyIFRleHRcIlxuXHRhY3Rpb246dW5kZWZpbmVkXG5cdGFjdGlvbkNvbG9yOlwibGltZUEyMDBcIlxuXHRkdXJhdGlvbjo1XG59XG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXG5cdGJhciA9IG5ldyBMYXllclxuXHRcdG5hbWU6XCJzbmFja2JhclwiXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdGNsaXA6dHJ1ZVxuXG5cdGJhci50eXBlID0gXCJzbmFja2JhclwiXG5cdGJhci5iZyA9IG5ldyBMYXllclxuXHRcdGJhY2tncm91bmRDb2xvcjpcIiMzMjMyMzJcIlxuXHRcdHN1cGVyTGF5ZXI6YmFyXG5cdFx0bmFtZTpcImJnXCJcblxuXHRuYXZiYXJFeGlzdHMgPSAwXG5cdGZhYkV4aXN0cyA9IHVuZGVmaW5lZFxuXG5cdGZvciBsIGluIEZyYW1lci5DdXJyZW50Q29udGV4dC5sYXllcnNcblx0XHRpZiBsLnR5cGUgPT0gXCJuYXZiYXJcIlxuXHRcdFx0bmF2YmFyRXhpc3RzID0gbFxuXG5cdFx0aWYgbC50eXBlID09IFwiZmxvYXRpbmdcIlxuXHRcdFx0ZmFiRXhpc3RzID0gbFxuXG5cdFx0aWYgbC50eXBlID09IFwic25hY2tiYXJcIiAmJiBsICE9IGJhclxuXHRcdFx0bC5iZy5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6KHk6YmFyLmhlaWdodClcblx0XHRcdFx0dGltZTouM1xuXHRcdFx0XHRjdXJ2ZTpcImJlemllci1jdXJ2ZSguMiwgMC40LCAwLjQsIDEuMClcIlxuXHRcdFx0XHRpZiBsLmZhYk1vdmVkXG5cdFx0XHRcdFx0bC5mYWJNb3ZlZC5oYWx0ZWQgPSB0cnVlXG5cdFx0XHRcdFx0bC5mYWJNb3ZlZC5jb25zdHJhaW50cy5ib3R0b20gPSBmYWJFeGlzdHMucHJldmlvdXNCb3R0b21cblx0XHRcdFx0XHRtLmxheW91dC5hbmltYXRlXG5cdFx0XHRcdFx0XHR0YXJnZXQ6ZmFiRXhpc3RzXG5cdFx0XHRcdFx0XHRjdXJ2ZTpcImJlemllci1jdXJ2ZSguMiwgMC40LCAwLjQsIDEuMClcIlxuXHRcdFx0XHRcdFx0dGltZTouM1xuXHRcdFx0XHRcdFV0aWxzLmRlbGF5IHNldHVwLmR1cmF0aW9uLCAtPlxuXHRcdFx0XHRcdFx0ZmFiRXhpc3RzLmNvbnN0cmFpbnRzLmJvdHRvbSA9IGZhYkV4aXN0cy5wcmV2aW91c0JvdHRvbVxuXHRcdFx0XHRcdFx0bS5sYXlvdXQuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6ZmFiRXhpc3RzXG5cdFx0XHRcdFx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0XHRcdFx0XHRcdHRpbWU6LjNcblxuXHRiYXIuYnJpbmdUb0Zyb250KClcblxuXHRiYXIuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmc6MFxuXHRcdHRyYWlsaW5nOjBcblx0XHRib3R0b206W25hdmJhckV4aXN0cywgLTFdXG5cdFx0aGVpZ2h0OjQ4XG5cblx0bS5sYXlvdXQuc2V0XG5cdFx0dGFyZ2V0OltiYXJdXG5cblx0YmFyLmJnLnByb3BzID0ge3dpZHRoOmJhci53aWR0aCwgaGVpZ2h0OmJhci5oZWlnaHR9XG5cdGFjdGlvbldpZHRoID0gbS5weCgyNClcblxuXHRpZiBzZXR1cC5hY3Rpb25cblx0XHRiYXIuYWN0aW9uID0gbmV3IG0uQnV0dG9uXG5cdFx0XHR0eXBlOlwiZmxhdFwiXG5cdFx0XHRzdXBlckxheWVyOmJhci5iZ1xuXHRcdFx0dGV4dDpzZXR1cC5hY3Rpb25cblx0XHRcdGNvbnN0cmFpbnRzOnt0cmFpbGluZzoyNCwgYWxpZ246XCJ2ZXJ0aWNhbFwifVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOlwiIzMyMzJcIlxuXHRcdFx0Y29sb3I6c2V0dXAuYWN0aW9uQ29sb3Jcblx0XHRhY3Rpb25XaWR0aCA9IGJhci5hY3Rpb24ud2lkdGggKyBtLnB4KDQ4KVxuXG5cdGJhci50ZXh0ID0gbmV3IG0uVGV4dFxuXHRcdGZvbnRTaXplOjE0XG5cdFx0Y29sb3I6XCJ3aGl0ZVwiXG5cdFx0c3VwZXJMYXllcjpiYXIuYmdcblx0XHRjb25zdHJhaW50czp7bGVhZGluZzoyNCwgYWxpZ246XCJ2ZXJ0aWNhbFwifVxuXHRcdHRleHQ6c2V0dXAudGV4dFxuXHRcdG5hbWU6XCJ0ZXh0XCJcblx0XHRsaW5lSGVpZ2h0OjE4XG5cblx0aWYgbS5kZXZpY2Uud2lkdGggPCBhY3Rpb25XaWR0aCArIGJhci50ZXh0LndpZHRoICsgbS5weCgyNClcblx0XHRiYXIudGV4dC5jb25zdHJhaW50cy53aWR0aCA9IG0uZHAobS5kZXZpY2Uud2lkdGgpIC0gKG0uZHAoYWN0aW9uV2lkdGgpICsgMjQpXG5cdFx0bS51dGlscy51cGRhdGUoYmFyLnRleHQpXG5cdFx0bS5sYXlvdXQuc2V0KGJhci50ZXh0KVxuXHRcdGJhci5jb25zdHJhaW50cy5oZWlnaHQgPSBtLmRwKGJhci50ZXh0LmhlaWdodCkgKyA0OFxuXHRcdGJhci5iZy5oZWlnaHQgPSBiYXIudGV4dC5oZWlnaHQgKyBtLnB4KDQ4KVxuXG5cdFx0bS5sYXlvdXQuc2V0XG5cdFx0XHR0YXJnZXQ6W2JhciwgYmFyLnRleHRdXG5cblx0XHRpZiBzZXR1cC5hY3Rpb25cblx0XHRcdG0ubGF5b3V0LnNldChiYXIuYWN0aW9uKVxuXG5cdGJhckhlaWdodCA9IGJhci5iZy5oZWlnaHRcblxuXHRpZiBmYWJFeGlzdHNcblx0XHRiYXIuZmFiTW92ZWQgPSBmYWJFeGlzdHNcblx0XHRmYWJFeGlzdHMucHJldmlvdXNCb3R0b20gPSBmYWJFeGlzdHMuY29uc3RyYWludHMuYm90dG9tXG5cdFx0ZmFiRXhpc3RzLmNvbnN0cmFpbnRzLmJvdHRvbSA9IGZhYkV4aXN0cy5jb25zdHJhaW50cy5ib3R0b20gKyBtLmRwKGJhckhlaWdodClcblxuXHRpZiBzZXR1cC5hbmltYXRlZFxuXHRcdGJhci5iZy55ID0gYmFyLmJnLmhlaWdodFxuXHRcdGJhci50ZXh0Lm9wYWNpdHkgPSAwXG5cdFx0YmFyLmJnLmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6KHk6MClcblx0XHRcdHRpbWU6LjNcblx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0YmFyLnRleHQuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczoob3BhY2l0eToxKVxuXHRcdFx0dGltZTouM1xuXHRcdGlmIHNldHVwLmFjdGlvblxuXHRcdFx0YmFyLmFjdGlvbi5hbmltYXRlXG5cdFx0XHRcdHByb3BlcnRpZXM6KG9wYWNpdHk6MSlcblx0XHRcdFx0dGltZTouM1xuXHRcdGlmIGZhYkV4aXN0c1xuXHRcdFx0bS5sYXlvdXQuYW5pbWF0ZVxuXHRcdFx0XHR0YXJnZXQ6ZmFiRXhpc3RzXG5cdFx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0XHRcdHRpbWU6LjNcblxuXHRVdGlscy5kZWxheSBzZXR1cC5kdXJhdGlvbiwgLT5cblx0XHRiYXIuYmcuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczooeTpiYXIuaGVpZ2h0KVxuXHRcdFx0dGltZTouM1xuXHRcdFx0Y3VydmU6XCJiZXppZXItY3VydmUoLjIsIDAuNCwgMC40LCAxLjApXCJcblx0XHRiYXIudGV4dC5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOihvcGFjaXR5OjApXG5cdFx0XHR0aW1lOi4zXG5cdFx0aWYgc2V0dXAuYWN0aW9uXG5cdFx0XHRiYXIuYWN0aW9uLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczoob3BhY2l0eTowKVxuXHRcdFx0XHR0aW1lOi4zXG5cdFx0aWYgZmFiRXhpc3RzICYmIGZhYkV4aXN0cy5oYWx0ZWQgIT0gdHJ1ZVxuXHRcdFx0ZmFiRXhpc3RzLmNvbnN0cmFpbnRzLmJvdHRvbSA9IGZhYkV4aXN0cy5wcmV2aW91c0JvdHRvbVxuXHRcdFx0bS5sYXlvdXQuYW5pbWF0ZVxuXHRcdFx0XHR0YXJnZXQ6ZmFiRXhpc3RzXG5cdFx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0XHRcdHRpbWU6LjNcblx0VXRpbHMuZGVsYXkgc2V0dXAuZHVyYXRpb24gKyAuMywgLT5cblx0XHRiYXIuZGVzdHJveSgpXG5cdHJldHVybiBiYXJcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuc3RhY2sgPSBzdGFjayA9IFtdXG5cblxuZXhwb3J0cy5hZGRUb1N0YWNrID0gKGxheWVyKSAtPlxuICBpZiBzdGFjay5pbmRleE9mKGxheWVyKSA9PSAtMVxuICAgIHN0YWNrLnB1c2ggbGF5ZXJcblxuZXhwb3J0cy5yZW1vdmVGcm9tU3RhY2sgPSAobGF5ZXIpIC0+XG4gIGlmIHN0YWNrLmxlbmd0aCA+IDBcbiAgICBsYXllclRvbGVhdmUgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXVxuICAgIGlmIGxheWVyVG9sZWF2ZS5leGl0ICE9IHVuZGVmaW5lZFxuICAgICAgbGF5ZXJUb2xlYXZlLmV4aXQoKVxuICAgIGVsc2VcbiAgICAgIG92ZXJsYXkgPSBuZXcgTGF5ZXJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOm0uY29sb3IoXCJibGFja1wiKVxuICAgICAgICB3aWR0aDptLmRldmljZS53aWR0aFxuICAgICAgICBoZWlnaHQ6bS5kZXZpY2UuaGVpZ2h0XG4gICAgICBvdmVybGF5LnBsYWNlQmVoaW5kKGxheWVyVG9sZWF2ZSlcbiAgICAgIGxheWVyVG9sZWF2ZS5jb25zdHJhaW50cyA9XG4gICAgICAgIGxlYWRpbmc6bS5kcChtLmRldmljZS53aWR0aClcbiAgICAgIG0ubGF5b3V0LmFuaW1hdGVcbiAgICAgICAgdGFyZ2V0OmxheWVyVG9sZWF2ZVxuICAgICAgICB0aW1lOi4zXG4gICAgICBvdmVybGF5LmFuaW1hdGVcbiAgICAgICAgcHJvcGVydGllczoob3BhY2l0eTowKVxuICAgICAgICB0aW1lOi41XG4gICAgICAgIGRlbGF5Oi4yXG4gICAgICBVdGlscy5kZWxheSAuNiwgLT5cbiAgICAgICAgbGF5ZXJUb2xlYXZlLmRlc3Ryb3koKVxuICAgICAgICBvdmVybGF5LmRlc3Ryb3koKVxuICAgIHN0YWNrLnBvcCgpXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHRjYXJyaWVyOlwiXCJcblx0bmV0d29yazpcIkxURVwiXG5cdGJhdHRlcnk6MTAwXG5cdGNlbGx1bGFyOjJcblx0c3R5bGU6XCJsaWdodFwiXG5cdGNsb2NrMjQ6ZmFsc2Vcblx0dHlwZTpcInN0YXR1c0JhclwiXG5cdGJhY2tncm91bmRDb2xvcjpcInJnYmEoMCwwLDAsLjEpXCJcblx0Y29sb3I6IFwiYmxhY2tcIlxuXHRvcGFjaXR5Oi42XG59XG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXHRzdGF0dXNCYXIgPSBuZXcgTGF5ZXIgYmFja2dyb3VuZENvbG9yOnNldHVwLmJhY2tncm91bmRDb2xvciwgbmFtZTpcInN0YXR1c0Jhci5hbGxcIlxuXG5cdGlmIHNldHVwLnN0eWxlID09IFwiZGFya1wiXG5cdFx0aWYgc2V0dXAuYmFja2dyb3VuZENvbG9yID09IFwicmdiYSgwLDAsMCwuMSlcIlxuXHRcdFx0c3RhdHVzQmFyLmJhY2tncm91bmRDb2xvciA9IG0udXRpbHMuY29sb3IoXCJibGFja1wiKVxuXHRcdGlmIHNldHVwLmNvbG9yID09IFwiYmxhY2tcIlxuXHRcdFx0c2V0dXAuY29sb3IgPSBcIndoaXRlXCJcblx0XHRpZiBzZXR1cC5vcGFjaXR5ID09IC42XG5cdFx0XHRzZXR1cC5vcGFjaXR5ID0gMVxuXG5cdGlmIHNldHVwLnN0eWxlID09IFwibGlnaHRcIiAmJiBzZXR1cC5jb2xvciAhPSBcImJsYWNrXCJcblx0XHRzZXR1cC5vcGFjaXR5ID0gMVxuXG5cdHN0YXR1c0Jhci50eXBlID0gc2V0dXAudHlwZVxuXHRzdGF0dXNCYXIuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmc6MFxuXHRcdHRyYWlsaW5nOjBcblx0XHRoZWlnaHQ6MjRcblxuXHRzd2l0Y2ggbS5kZXZpY2UubmFtZVxuXHRcdHdoZW4gXCJpcGhvbmUtNnMtcGx1c1wiXG5cdFx0XHRAdG9wQ29uc3RyYWludCA9IDVcblx0XHRcdEBibHVldG9vdGggPSA1XG5cblx0XHR3aGVuIFwiZnVsbHNjcmVlblwiXG5cdFx0XHRAdG9wQ29uc3RyYWludCA9IDVcblx0XHRcdEBibHVldG9vdGggPSAtIDEwXG5cdFx0ZWxzZVxuXHRcdFx0QHRvcENvbnN0cmFpbnQgPSAzXG5cdFx0XHRAYmx1ZXRvb3RoID0gM1xuXG5cblxuXHRAdGltZSA9IG0udXRpbHMuZ2V0VGltZSgpXG5cdHRpbWUgPSBuZXcgbS5UZXh0IHN0eWxlOlwic3RhdHVzQmFyVGltZVwiLCB0ZXh0Om0udXRpbHMudGltZUZvcm1hdHRlcihAdGltZSwgc2V0dXAuY2xvY2syNCksIGZvbnRTaXplOjE0LCBmb250V2VpZ2h0OjUwMCwgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGNvbG9yOnNldHVwLmNvbG9yLCBuYW1lOlwidGltZVwiLCBvcGFjaXR5OnNldHVwLm9wYWNpdHlcblx0dGltZS5jb25zdHJhaW50cyA9XG5cdFx0dHJhaWxpbmc6OFxuXHRcdGFsaWduOlwidmVydGljYWxcIlxuXHRtLnV0aWxzLnRpbWVEZWxlZ2F0ZSh0aW1lLCBzZXR1cC5jbG9jazI0KVxuXG5cblx0YmF0dGVyeUljb24gPSBuZXcgTGF5ZXIgc3VwZXJMYXllcjpzdGF0dXNCYXIsIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG5hbWU6XCJiYXR0ZXJ5SWNvblwiXG5cdGlmIHNldHVwLmJhdHRlcnkgPiA3MFxuXHRcdGhpZ2hCYXR0ZXJ5ID0gbS51dGlscy5zdmcobS5hc3NldHMuYmF0dGVyeUhpZ2gpXG5cdFx0YmF0dGVyeUljb24uaHRtbCA9IGhpZ2hCYXR0ZXJ5LnN2Z1xuXHRcdGJhdHRlcnlJY29uLmhlaWdodCA9IGhpZ2hCYXR0ZXJ5LmhlaWdodFxuXHRcdGJhdHRlcnlJY29uLndpZHRoID0gaGlnaEJhdHRlcnkud2lkdGhcblx0XHRtLnV0aWxzLmNoYW5nZUZpbGwoYmF0dGVyeUljb24sIHNldHVwLmNvbG9yKVxuXHRcdGJhdHRlcnlJY29uLm9wYWNpdHkgPSBzZXR1cC5vcGFjaXR5XG5cblx0aWYgc2V0dXAuYmF0dGVyeSA8PSA3MCAmJiBzZXR1cC5iYXR0ZXJ5ID4gMjBcblx0XHRtaWRCYXR0ZXJ5ID0gbS51dGlscy5zdmcobS5hc3NldHMuYmF0dGVyeU1pZClcblx0XHRiYXR0ZXJ5SWNvbi5odG1sID0gbWlkQmF0dGVyeS5zdmdcblx0XHRtLnV0aWxzLmNoYW5nZUZpbGwoYmF0dGVyeUljb24sIHNldHVwLmNvbG9yKVxuXG5cdGlmIHNldHVwLmJhdHRlcnkgPD0gMjBcblx0XHRsb3dCYXR0ZXJ5ID0gbS51dGlscy5zdmcobS5hc3NldHMuYmF0dGVyeUxvdylcblx0XHRiYXR0ZXJ5SWNvbi5odG1sID0gbG93QmF0dGVyeS5zdmdcblx0XHRtLnV0aWxzLmNoYW5nZUZpbGwoYmF0dGVyeUljb24sIHNldHVwLmNvbG9yKVxuXG5cblx0YmF0dGVyeUljb24uY29uc3RyYWludHMgPVxuXHRcdHRyYWlsaW5nIDogW3RpbWUsIDddXG5cdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cblxuXHRjZWxsdWxhckljb24gPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy5jZWxsdWxhcilcblx0Y2VsbHVsYXIgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDpjZWxsdWxhckljb24ud2lkdGhcblx0XHRoZWlnaHQ6Y2VsbHVsYXJJY29uLmhlaWdodFxuXHRcdGh0bWw6Y2VsbHVsYXJJY29uLnN2Z1xuXHRcdHN1cGVyTGF5ZXI6c3RhdHVzQmFyXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG9wYWNpdHk6IHNldHVwLm9wYWNpdHlcblx0XHRuYW1lOlwiY2VsbHVsYXJcIlxuXG5cdGNlbGx1bGFyLmNvbnN0cmFpbnRzID1cblx0XHR0cmFpbGluZzogW2JhdHRlcnlJY29uLCA3XVxuXHRcdGFsaWduOlwidmVydGljYWxcIlxuXG5cdG0udXRpbHMuY2hhbmdlRmlsbChjZWxsdWxhciwgc2V0dXAuY29sb3IpXG5cblx0d2lmaUljb24gPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy53aWZpLCBzZXR1cC5jb2xvcilcblxuXHR3aWZpID0gbmV3IExheWVyXG5cdFx0d2lkdGg6d2lmaUljb24ud2lkdGhcblx0XHRoZWlnaHQ6d2lmaUljb24uaGVpZ2h0XG5cdFx0c3VwZXJMYXllcjpzdGF0dXNCYXJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0bmFtZTpcIndpZmlcIlxuXHRcdGh0bWw6IHdpZmlJY29uLnN2Z1xuXHRcdG9wYWNpdHk6IHNldHVwLm9wYWNpdHlcblxuXHRtLnV0aWxzLmNoYW5nZUZpbGwod2lmaSwgc2V0dXAuY29sb3IpXG5cblx0d2lmaS5jb25zdHJhaW50cyA9XG5cdFx0dHJhaWxpbmc6W2NlbGx1bGFyLCA0XVxuXHRcdGFsaWduOlwidmVydGljYWxcIlxuXG5cdG0ubGF5b3V0LnNldCgpXG5cblx0IyBFeHBvcnQgc3RhdHVzQmFyXG5cdHN0YXR1c0Jhci5iYXR0ZXJ5ID0ge31cblx0IyBzdGF0dXNCYXIuYmF0dGVyeS5wZXJjZW50ID0gYmF0dGVyeVBlcmNlbnRcblx0c3RhdHVzQmFyLmJhdHRlcnkuaWNvbiA9IGJhdHRlcnlJY29uXG5cdCMgc3RhdHVzQmFyLmJsdWV0b290aCA9IGJsdWV0b290aFxuXHRzdGF0dXNCYXIudGltZSA9IHRpbWVcblx0IyBzdGF0dXNCYXIud2lmaSA9IHdpZmlcblx0c3RhdHVzQmFyLmNlbGx1bGFyID0gY2VsbHVsYXJcblxuXHRtLmxheW91dC5zZXRcblx0XHR0YXJnZXQ6W3N0YXR1c0JhciwgdGltZSwgYmF0dGVyeUljb24sIGNlbGx1bGFyLCB3aWZpXVxuXHRyZXR1cm4gc3RhdHVzQmFyXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGNvbnN0cmFpbnRzOnt9XG5cdHRleHQ6IFwiTWF0ZXJpYWwgVGV4dCBMYXllclwiXG5cdHR5cGU6XCJ0ZXh0XCJcblx0eDowXG5cdHk6MFxuXHR3aWR0aDotMVxuXHRoZWlnaHQ6LTFcblx0c3VwZXJMYXllcjp1bmRlZmluZWRcblx0c3R5bGU6XCJkZWZhdWx0XCJcblx0bGluZXM6MVxuXHR0ZXh0QWxpZ246XCJsZWZ0XCJcblx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRjb2xvcjpcImJsYWNrXCJcblx0Zm9udFNpemU6IDE3XG5cdGZvbnRTdHlsZTpcInJlZ3VsYXJcIlxuXHRmb250RmFtaWx5OlwiUm9ib3RvXCJcblx0Zm9udFdlaWdodDpcInJlZ3VsYXJcIlxuXHRsaW5lSGVpZ2h0OlwiYXV0b1wiXG5cdG5hbWU6XCJ0ZXh0IGxheWVyXCJcblx0b3BhY2l0eToxXG5cdHRleHRUcmFuc2Zvcm06XCJub25lXCJcblx0bGV0dGVyU3BhY2luZzowXG5cdG5hbWU6XCJ0ZXh0IGxheWVyXCJcbn1cblxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG5zdHlsZS50eXBlID0gJ3RleHQvY3NzJ1xuXG5zdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG86NDAwLDEwMCwxMDBpdGFsaWMsMzAwLDMwMGl0YWxpYyw0MDBpdGFsaWMsNTAwLDUwMGl0YWxpYyw3MDAsNzAwaXRhbGljLDkwMCw5MDBpdGFsaWMpO1xcbiBAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zKTsgXFxuXCIpKVxuXG5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cdGV4Y2VwdGlvbnMgPSBPYmplY3Qua2V5cyhzZXR1cClcblx0dGV4dExheWVyID0gbmV3IExheWVyIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG5hbWU6c2V0dXAubmFtZVxuXHR0ZXh0TGF5ZXIudHlwZSA9IFwidGV4dFwiXG5cdHRleHRMYXllci5odG1sID0gc2V0dXAudGV4dFxuXHRmb3IgcHJvcCBpbiBtLmxpYi5sYXllclByb3BzXG5cdFx0aWYgc2V0dXBbcHJvcF1cblx0XHRcdGlmIHByb3AgPT0gXCJjb2xvclwiXG5cdFx0XHRcdHNldHVwW3Byb3BdID0gbS51dGlscy5jb2xvcihzZXR1cFtwcm9wXSlcblx0XHRcdHRleHRMYXllcltwcm9wXSA9IHNldHVwW3Byb3BdXG5cdGZvciBwcm9wIGluIG0ubGliLmxheWVyU3R5bGVzXG5cdFx0aWYgc2V0dXBbcHJvcF1cblx0XHRcdGlmIHByb3AgPT0gXCJsaW5lSGVpZ2h0XCIgJiYgc2V0dXBbcHJvcF0gPT0gXCJhdXRvXCJcblx0XHRcdFx0dGV4dExheWVyLnN0eWxlLmxpbmVIZWlnaHQgPSAgc2V0dXAuZm9udFNpemVcblx0XHRcdGlmIHByb3AgPT0gXCJmb250V2VpZ2h0XCJcblx0XHRcdFx0c3dpdGNoIHNldHVwW3Byb3BdXG5cdFx0XHRcdFx0d2hlbiBcInVsdHJhdGhpblwiIHRoZW4gc2V0dXBbcHJvcF0gPSAxMDBcblx0XHRcdFx0XHR3aGVuIFwidGhpblwiIHRoZW4gc2V0dXBbcHJvcF0gPSAyMDBcblx0XHRcdFx0XHR3aGVuIFwibGlnaHRcIiB0aGVuIHNldHVwW3Byb3BdID0gMzAwXG5cdFx0XHRcdFx0d2hlbiBcInJlZ3VsYXJcIiB0aGVuIHNldHVwW3Byb3BdID0gNDAwXG5cdFx0XHRcdFx0d2hlbiBcIm1lZGl1bVwiIHRoZW4gc2V0dXBbcHJvcF0gPSA1MDBcblx0XHRcdFx0XHR3aGVuIFwic2VtaWJvbGRcIiB0aGVuIHNldHVwW3Byb3BdID0gNjAwXG5cdFx0XHRcdFx0d2hlbiBcImJvbGRcIiB0aGVuIHNldHVwW3Byb3BdID0gNzAwXG5cdFx0XHRcdFx0d2hlbiBcImJsYWNrXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDgwMFxuXHRcdFx0aWYgcHJvcCA9PSBcImZvbnRTaXplXCIgfHwgcHJvcCA9PSBcImxpbmVIZWlnaHRcIiB8fCBwcm9wID09IFwibGV0dGVyU3BhY2luZ1wiXG5cdFx0XHRcdHNldHVwW3Byb3BdID0gbS51dGlscy5weChzZXR1cFtwcm9wXSkgKyBcInB4XCJcblx0XHRcdHRleHRMYXllci5zdHlsZVtwcm9wXSA9IHNldHVwW3Byb3BdXG5cblx0dGV4dEZyYW1lID0gbS51dGlscy50ZXh0QXV0b1NpemUodGV4dExheWVyKVxuXHR0ZXh0TGF5ZXIucHJvcHMgPSAoaGVpZ2h0OnRleHRGcmFtZS5oZWlnaHQsIHdpZHRoOnRleHRGcmFtZS53aWR0aClcblx0dGV4dExheWVyLmNvbnN0cmFpbnRzID0gc2V0dXAuY29uc3RyYWludHNcblx0bS5sYXlvdXQuc2V0XG5cdFx0dGFyZ2V0OnRleHRMYXllclxuXHRyZXR1cm4gdGV4dExheWVyXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG4jIyBDb252ZXJ0cyBweCB0byBwdFxuZXhwb3J0cy5wdCA9IChweCkgLT5cblx0cHQgPSBweC9tLmRldmljZS5zY2FsZVxuXHRwdCA9IE1hdGgucm91bmQocHQpXG5cdHJldHVybiBwdFxuXG4jIyBDb252ZXJ0cyBwdCB0byBweFxuZXhwb3J0cy5weCA9IChwdCkgLT5cblx0cHggPSBwdCAqIG0uZGV2aWNlLnNjYWxlXG5cdHB4ID0gTWF0aC5yb3VuZChweClcblx0cmV0dXJuIHB4XG5cbiMjIGlPUyBDb2xvciDigJMgVGhpcyB3aWxsIHN0b3JlIGFsbCBvZiB0aGUgZGVmYXVsdCBpT1MgY29sb3JzIGludGVhZCBvZiB0aGUgZGVmYXVsdCBDU1MgY29sb3JzLiAqVGhpcyBpcyBvbmx5IHVwIGhlcmUgYmVjYXVzZSBJIHJlZmVyIHRvIGl0IGluIHRoZSBkZWZhdWx0cy4qXG5leHBvcnRzLmNvbG9yID0gKGNvbG9yU3RyaW5nKSAtPlxuXHRpZiBjb2xvclN0cmluZ1swXSA9PSBcIiNcIlxuXHRcdHJldHVybiBjb2xvclN0cmluZ1xuXHRlbHNlXG5cdFx0Y29sb3IgPSAgbmV3IENvbG9yKG0ubGliLmNvbG9yc1tjb2xvclN0cmluZ10pXG5cdFx0aWYgY29sb3JTdHJpbmcgPT0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRjb2xvciA9IFwidHJhbnNwYXJlbnRcIlxuXHRcdHJldHVybiBjb2xvclxuXG4jIFN1cHBvcnRpbmcgRnVuY3Rpb25zXG4jIFV0aWxzXG5cbiMgQ2xlYW5zIGEgc3RyaW5nIG9mIDxicj4gYW5kICZuYnNwO1xuZXhwb3J0cy5jbGVhbiA9IChzdHJpbmcpIC0+XG5cdCMjIHJlbW92ZSB3aGl0ZSBzcGFjZVxuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvWyZdbmJzcFs7XS9naSwgXCIgXCIpLnJlcGxhY2UoL1s8XWJyWz5dL2dpLCBcIlwiKVxuXHRyZXR1cm4gc3RyaW5nXG5cbiMgQ29udmVydHMgcHgncyBvZiBhbiBTVkcgdG8gc2NhbGFibGUgdmFyaWFibGVzXG5leHBvcnRzLnN2ZyA9IChzdmcpIC0+XG5cdCMgRmluZCBTdHJpbmdcblx0c3RhcnRJbmRleCA9IHN2Zy5zZWFyY2goXCI8c3ZnIHdpZHRoPVwiKVxuXHRlbmRJbmRleCA9IHN2Zy5zZWFyY2goXCIgdmlld0JveFwiKVxuXHRzdHJpbmcgPSBzdmcuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpXG5cblx0I0ZpbmQgd2lkdGhcblx0d1N0YXJ0SW5kZXggPSBzdHJpbmcuc2VhcmNoKFwiPVwiKSArIDJcblx0d0VuZEluZGV4ID0gIHN0cmluZy5zZWFyY2goXCJweFwiKVxuXHR3aWR0aCA9IHN0cmluZy5zbGljZSh3U3RhcnRJbmRleCwgd0VuZEluZGV4KVxuXHRuZXdXaWR0aCA9IGV4cG9ydHMucHgod2lkdGgpXG5cblx0IyBGaW5kIEhlaWdodFxuXHRoZWlnaHRTdHJpbmcgPSBzdHJpbmcuc2xpY2Uod0VuZEluZGV4ICsgNCwgc3RyaW5nLmxlbmd0aClcblx0aFN0YXJ0SW5kZXggPSBoZWlnaHRTdHJpbmcuc2VhcmNoKFwiPVwiKSsgMlxuXHRoRW5kSW5kZXggPSBoZWlnaHRTdHJpbmcuc2VhcmNoKFwicHhcIilcblx0aGVpZ2h0ID0gaGVpZ2h0U3RyaW5nLnNsaWNlKGhTdGFydEluZGV4LCBoRW5kSW5kZXgpXG5cdG5ld0hlaWdodCA9IGV4cG9ydHMucHgoaGVpZ2h0KVxuXG5cdCNDcmVhdGUgbmV3IHN0cmluZ1xuXHRuZXdTdHJpbmcgPSBzdHJpbmcucmVwbGFjZSh3aWR0aCwgbmV3V2lkdGgpXG5cdG5ld1N0cmluZyA9IG5ld1N0cmluZy5yZXBsYWNlKGhlaWdodCwgbmV3SGVpZ2h0KVxuXG5cdCNSZXBsYWNlIHN0cmluZ3Ncblx0c3ZnID0gc3ZnLnJlcGxhY2Uoc3RyaW5nLCBuZXdTdHJpbmcpXG5cblx0cmV0dXJuIHtcblx0XHRzdmc6c3ZnXG5cdFx0d2lkdGg6bmV3V2lkdGhcblx0XHRoZWlnaHQ6bmV3SGVpZ2h0XG5cdH1cblxuIyBDaGFuZ2VzIHRoZSBmaWxsIG9mIGFuIFNWR1xuZXhwb3J0cy5jaGFuZ2VGaWxsID0gKGxheWVyLCBjb2xvcikgLT5cblx0aWYgdHlwZW9mIGNvbG9yICE9IFwib2JqZWN0XCJcblx0XHRjb2xvciA9IGV4cG9ydHMuY29sb3IoY29sb3IpXG5cdHN0YXJ0SW5kZXggPSBsYXllci5odG1sLnNlYXJjaChcImZpbGw9XFxcIiNcIilcblx0ZmlsbFN0cmluZyA9IGxheWVyLmh0bWwuc2xpY2Uoc3RhcnRJbmRleCwgbGF5ZXIuaHRtbC5sZW5ndGgpXG5cdGVuZEluZGV4ID0gZmlsbFN0cmluZy5zZWFyY2goXCJcXFwiXCIpICsgOFxuXHRzdHJpbmcgPSBmaWxsU3RyaW5nLnNsaWNlKDAsIGVuZEluZGV4KVxuXHRuZXdTdHJpbmcgPSBcImZpbGw9XFxcIlwiICsgY29sb3Jcblx0bGF5ZXIuaHRtbCA9IGxheWVyLmh0bWwucmVwbGFjZShzdHJpbmcsIG5ld1N0cmluZylcblxuZXhwb3J0cy5jYXBpdGFsaXplID0gKHN0cmluZykgLT5cblx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKVxuXG4jIFJldHVybnMgdGhlIGN1cnJlbnQgdGltZVxuZXhwb3J0cy5nZXRUaW1lID0gLT5cblx0ZGF5c09mVGhlV2VlayA9IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdXG5cdG1vbnRoc09mVGhlWWVhciA9IFtcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJdXG5cdGRhdGVPYmogPSBuZXcgRGF0ZSgpXG5cdG1vbnRoID0gbW9udGhzT2ZUaGVZZWFyW2RhdGVPYmouZ2V0TW9udGgoKV1cblx0ZGF0ZSA9IGRhdGVPYmouZ2V0RGF0ZSgpXG5cdGRheSA9IGRheXNPZlRoZVdlZWtbZGF0ZU9iai5nZXREYXkoKV1cblx0aG91cnMgPSBkYXRlT2JqLmdldEhvdXJzKClcblx0bWlucyA9IGRhdGVPYmouZ2V0TWludXRlcygpXG5cdHNlY3MgPSBkYXRlT2JqLmdldFNlY29uZHMoKVxuXHRyZXR1cm4ge1xuXHRcdG1vbnRoOm1vbnRoXG5cdFx0ZGF0ZTpkYXRlXG5cdFx0ZGF5OmRheVxuXHRcdGhvdXJzOmhvdXJzXG5cdFx0bWluczptaW5zXG5cdFx0c2VjczpzZWNzXG5cdH1cblxuZXhwb3J0cy5iZ0JsdXIgPSAobGF5ZXIpIC0+XG5cdGxheWVyLnN0eWxlW1wiLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXJcIl0gPSBcImJsdXIoI3tleHBvcnRzLnB4KDUpfXB4KVwiXG5cdHJldHVybiBsYXllclxuXG5leHBvcnRzLnRleHRBdXRvU2l6ZSA9ICh0ZXh0TGF5ZXIpIC0+XG5cdCNEZWZpbmUgV2lkdGhcblx0Y29uc3RyYWludHMgPSB7fVxuXHRpZiB0ZXh0TGF5ZXIuY29uc3RyYWludHNcblx0XHRpZiB0ZXh0TGF5ZXIuY29uc3RyYWludHMuaGVpZ2h0XG5cdFx0XHRjb25zdHJhaW50cy5oZWlnaHQgPSBleHBvcnRzLnB4KHRleHRMYXllci5jb25zdHJhaW50cy5oZWlnaHQpXG5cdFx0aWYgdGV4dExheWVyLmNvbnN0cmFpbnRzLndpZHRoXG5cdFx0XHRjb25zdHJhaW50cy53aWR0aCA9IGV4cG9ydHMucHgodGV4dExheWVyLmNvbnN0cmFpbnRzLndpZHRoKVxuXG5cdHN0eWxlcyA9XG5cdFx0Zm9udFNpemU6IHRleHRMYXllci5zdHlsZS5mb250U2l6ZVxuXHRcdGZvbnRGYW1pbHk6IHRleHRMYXllci5zdHlsZS5mb250RmFtaWx5XG5cdFx0Zm9udFdlaWdodDogdGV4dExheWVyLnN0eWxlLmZvbnRXZWlnaHRcblx0XHRmb250U3R5bGU6IHRleHRMYXllci5zdHlsZS5mb250U3R5bGVcblx0XHRsaW5lSGVpZ2h0OiB0ZXh0TGF5ZXIuc3R5bGUubGluZUhlaWdodFxuXHRcdGxldHRlclNwYWNpbmc6IHRleHRMYXllci5zdHlsZS5sZXR0ZXJTcGFjaW5nXG5cdFx0dGV4dFRyYW5zZm9ybTogdGV4dExheWVyLnN0eWxlLnRleHRUcmFuc2Zvcm1cblx0dGV4dEZyYW1lID0gVXRpbHMudGV4dFNpemUodGV4dExheWVyLmh0bWwsIHN0eWxlcywgY29uc3RyYWludHMpXG5cdHJldHVybiB7XG5cdFx0d2lkdGggOiB0ZXh0RnJhbWUud2lkdGhcblx0XHRoZWlnaHQ6IHRleHRGcmFtZS5oZWlnaHRcblx0fVxuXG5leHBvcnRzLmdldERldmljZSA9IC0+XG5cdCMgTG9hZHMgdGhlIGluaXRpYWwgZnJhbWVcblx0ZGV2aWNlID0gXCJcIlxuXHRmcmFtZSA9IHRydWVcblx0aWYgbS5saWIucmVhbERldmljZXNbaW5uZXJXaWR0aF0gJiYgbS5saWIucmVhbERldmljZXNbaW5uZXJXaWR0aF1baW5uZXJIZWlnaHRdXG5cdFx0ZGV2aWNlID0gbS5saWIucmVhbERldmljZXNbaW5uZXJXaWR0aF1baW5uZXJIZWlnaHRdXG5cdFx0ZnJhbWUgPSBmYWxzZVxuXHRcdEZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZSA9IFwiZnVsbHNjcmVlblwiXG5cblx0aWYgZnJhbWVcblx0XHRkZXZpY2UgPVxuXHRcdFx0bmFtZTogRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXG5cdFx0XHR3aWR0aCA6ICBGcmFtZXIuRGV2aWNlVmlldy5EZXZpY2VzW0ZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZV0uc2NyZWVuV2lkdGhcblx0XHRcdGhlaWdodDogIEZyYW1lci5EZXZpY2VWaWV3LkRldmljZXNbRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXS5zY3JlZW5IZWlnaHRcblx0XHRcdHNjYWxlOiBtLmxpYi5mcmFtZXJGcmFtZXNbRnJhbWVyLkRldmljZVZpZXcuRGV2aWNlc1tGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVdLnNjcmVlbldpZHRoXVxuXG5cdGlmIGRldmljZS5zY2FsZSA9PSB1bmRlZmluZWRcblx0XHRkZXZpY2Uuc2NhbGUgPSAyXG5cdGlmIGRldmljZS53aWR0aCA9PSB1bmRlZmluZWRcblx0XHRkZXZpY2Uud2lkdGggPSBpbm5lcldpZHRoXG5cdGlmIGRldmljZS5oZWlnaHQgPT0gdW5kZWZpbmVkXG5cdFx0ZGV2aWNlLmhlaWdodCA9IGlubmVySGVpZ2h0XG5cblx0cmV0dXJuIGRldmljZVxuXG5cbiMgU3BlY2lhbCBDaGFyYWN0ZXJzXG5leHBvcnRzLnNwZWNpYWxDaGFyID0gKGxheWVyKSAtPlxuXHR0ZXh0ID0gbGF5ZXJcblx0aWYgbGF5ZXIudHlwZSA9PSBcImJ1dHRvblwiXG5cdFx0dGV4dCA9IGxheWVyLmxhYmVsXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLWJcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItYiBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtmb250V2VpZ2h0OjYwMH1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1yXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLXIgXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6XCJyZWRcIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1yYlwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1yYiBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcImJsdWVcIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1sYlwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1sYiBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcImxpZ2h0LWJsdWVcIn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1nXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLWcgXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9LCB7Y29sb3I6XCJncmVlblwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLW9cIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItbyBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcIm9yYW5nZVwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLXBcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItcCBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcIm9yYW5nZVwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLXlcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCIteSBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcInllbGxvd1wifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLSNcIikgIT0gLTFcblx0XHRjaG9zZW5Db2xvciA9IHRleHQuaHRtbC5zbGljZSgxLCA4KVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwuc2xpY2UoOSwgdGV4dC5odG1sLmxlbmd0aClcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpjaG9zZW5Db2xvcn1dKVxuXHRpZiB0ZXh0Lmh0bWwuaW5kZXhPZihcIi1cIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fV0pXG5cdGlmIGxheWVyLmJ1dHRvblR5cGUgPT0gXCJ0ZXh0XCJcblx0XHRsYXllci53aWR0aCA9IHRleHQud2lkdGhcblx0bS5sYXlvdXQuc2V0KClcblxuZXhwb3J0cy51cGRhdGUgPSAobGF5ZXIsIGFycmF5KSAtPlxuXHRpZiBhcnJheSA9PSB1bmRlZmluZWRcblx0XHRhcnJheSA9IFtdXG5cdGlmIGxheWVyLnR5cGUgPT0gXCJ0ZXh0XCJcblx0XHRmb3IgY2hhbmdlIGluIGFycmF5XG5cdFx0XHRrZXkgPSBPYmplY3Qua2V5cyhjaGFuZ2UpWzBdXG5cdFx0XHR2YWx1ZSA9IGNoYW5nZVtrZXldXG5cdFx0XHRpZiBrZXkgPT0gXCJ0ZXh0XCJcblx0XHRcdFx0bGF5ZXIuaHRtbCA9IHZhbHVlXG5cdFx0XHRpZiBrZXkgPT0gXCJmb250V2VpZ2h0XCJcblx0XHRcdFx0bGF5ZXIuc3R5bGVba2V5XSA9IHZhbHVlXG5cdFx0XHRpZiBrZXkgPT0gXCJjb2xvclwiXG5cdFx0XHRcdGxheWVyLmNvbG9yID0gZXhwb3J0cy5jb2xvcih2YWx1ZSlcblxuXHRcdHRleHRGcmFtZSA9IGV4cG9ydHMudGV4dEF1dG9TaXplKGxheWVyKVxuXHRcdGxheWVyLndpZHRoID0gdGV4dEZyYW1lLndpZHRoXG5cdFx0bGF5ZXIuaGVpZ2h0ID0gdGV4dEZyYW1lLmhlaWdodFxuXG5cblx0bS5sYXlvdXQuc2V0KClcblxuIyBEZWNpZGVzIGlmIGl0IHNob3VsZCBiZSB3aGl0ZS9ibGFjayB0ZXh0XG5leHBvcnRzLmF1dG9Db2xvciA9IChjb2xvck9iamVjdCkgLT5cblx0cmdiID0gY29sb3JPYmplY3QudG9SZ2JTdHJpbmcoKVxuXHRyZ2IgPSByZ2Iuc3Vic3RyaW5nKDQsIHJnYi5sZW5ndGgtMSlcblx0cmdiID0gcmdiLnJlcGxhY2UoLyAvZywgJycpXG5cdHJnYiA9IHJnYi5yZXBsYWNlKC8gL2csICcnKVxuXHRyZ2IgPSByZ2Iuc3BsaXQoJywnKVxuXHRyZWQgPSByZ2JbMF1cblx0Z3JlZW4gPSByZ2JbMV1cblx0Ymx1ZSA9IHJnYlsyXVxuXHRjb2xvciA9IFwiXCJcblx0aWYgKHJlZCowLjI5OSArIGdyZWVuKjAuNTg3ICsgYmx1ZSowLjExNCkgPiAxODZcblx0XHRjb2xvciA9IGV4cG9ydHMuY29sb3IoXCJibGFja1wiKVxuXHRlbHNlXG5cdFx0Y29sb3IgPSBleHBvcnRzLmNvbG9yKFwid2hpdGVcIilcblx0cmV0dXJuIGNvbG9yXG5cbmV4cG9ydHMuc2FtZVBhcmVudCA9IChsYXllcjEsIGxheWVyMikgLT5cblx0cGFyZW50T25lID0gbGF5ZXIxLnN1cGVyTGF5ZXJcblx0cGFyZW50VHdvID0gbGF5ZXIyLnN1cGVyTGF5ZXJcblx0aWYgcGFyZW50T25lID09IHBhcmVudFR3b1xuXHRcdHJldHVybiB0cnVlXG5cdGVsc2Vcblx0XHRyZXR1cm4gZmFsc2VcblxuXG5leHBvcnRzLnRpbWVEZWxlZ2F0ZSA9IChsYXllciwgY2xvY2tUeXBlKSAtPlxuXHRAdGltZSA9IGV4cG9ydHMuZ2V0VGltZSgpXG5cdFV0aWxzLmRlbGF5IDYwIC0gQHRpbWUuc2VjcywgLT5cblx0XHRAdGltZSA9IGV4cG9ydHMuZ2V0VGltZSgpXG5cdFx0ZXhwb3J0cy51cGRhdGUobGF5ZXIsIFt0ZXh0OmV4cG9ydHMudGltZUZvcm1hdHRlcihAdGltZSwgY2xvY2tUeXBlKV0pXG5cdFx0VXRpbHMuaW50ZXJ2YWwgNjAsIC0+XG5cdFx0XHRAdGltZSA9IGV4cG9ydHMuZ2V0VGltZSgpXG5cdFx0XHRleHBvcnRzLnVwZGF0ZShsYXllciwgW3RleHQ6ZXhwb3J0cy50aW1lRm9ybWF0dGVyKEB0aW1lLCBjbG9ja1R5cGUpXSlcblxuZXhwb3J0cy50aW1lRm9ybWF0dGVyID0gKHRpbWVPYmosIGNsb2NrVHlwZSkgLT5cblx0aWYgY2xvY2tUeXBlID09IGZhbHNlXG5cdFx0aWYgdGltZU9iai5ob3VycyA+IDEyXG5cdFx0XHR0aW1lT2JqLmhvdXJzID0gdGltZU9iai5ob3VycyAtIDEyXG5cdFx0aWYgdGltZU9iai5ob3VycyA9PSAwIHRoZW4gdGltZU9iai5ob3VycyA9IDEyXG5cdGlmIHRpbWVPYmoubWlucyA8IDEwXG5cdFx0dGltZU9iai5taW5zID0gXCIwXCIgKyB0aW1lT2JqLm1pbnNcblx0cmV0dXJuIHRpbWVPYmouaG91cnMgKyBcIjpcIiArIHRpbWVPYmoubWluc1xuXG5leHBvcnRzLnNldHVwQ29tcG9uZW50ID0gKGFycmF5LCBkZWZhdWx0cykgLT5cblx0aWYgYXJyYXkgPT0gdW5kZWZpbmVkXG5cdFx0YXJyYXkgPSBbXVxuXHRvYmogPSB7fVxuXHRmb3IgaSBpbiBkZWZhdWx0cy5wcm9wc1xuXHRcdGlmIGFycmF5W2ldICE9IHVuZGVmaW5lZFxuXHRcdFx0b2JqW2ldID0gYXJyYXlbaV1cblx0XHRlbHNlXG5cdFx0XHRvYmpbaV0gPSBkZWZhdWx0c1tpXVxuXHRyZXR1cm4gb2JqXG5cblxuZXhwb3J0cy5lbW9qaUZvcm1hdHRlciA9IChzdHJpbmcpIC0+XG5cdFx0dW5pY29kZUZvcm1hdCA9IFwiXCJcblx0XHRpZiBzdHJpbmdbMF0gPT0gXCJFXCIgfHwgc3RyaW5nWzBdID09IFwiM1wiIHx8IHN0cmluZ1swXSA9PSBcIjJcIiB8fCBzdHJpbmdbMF0gPT0gXCJDXCJcblx0XHRcdGFycmF5T2ZDb2RlcyA9IHN0cmluZy5zcGxpdChcIiBcIilcblx0XHRcdGZvciBjb2RlIGluIGFycmF5T2ZDb2Rlc1xuXHRcdFx0XHR1bmljb2RlRm9ybWF0ID0gdW5pY29kZUZvcm1hdCArIFwiJVwiICsgY29kZVxuXHRcdGVsc2Vcblx0XHRcdGFycmF5T2ZDb2RlcyA9IHN0cmluZy5zcGxpdChcIiBcIilcblx0XHRcdHVuaWNvZGVGb3JtYXQgPSBcIiVGMCU5RlwiXG5cdFx0XHRmb3IgY29kZSBpbiBhcnJheU9mQ29kZXNcblx0XHRcdFx0dW5pY29kZUZvcm1hdCA9IHVuaWNvZGVGb3JtYXQgKyBcIiVcIiArIGNvZGVcblx0XHRkZWNvZGVkID0gZGVjb2RlVVJJQ29tcG9uZW50KHVuaWNvZGVGb3JtYXQpXG5cdFx0cmV0dXJuIGRlY29kZWRcblxuZXhwb3J0cy5idWlsZEVtb2ppc09iamVjdCA9ICgpIC0+XG5cdGVtb2ppcyA9IFtdXG5cdGZvciBjb2RlLCBpbmRleCBpbiBtLmFzc2V0cy5lbW9qaUNvZGVzXG5cdFx0ZW1vamkgPSBleHBvcnRzLmVtb2ppRm9ybWF0dGVyKGNvZGUpXG5cdFx0ZW1vamlzLnB1c2ggZW1vamlcblxuZXhwb3J0cy50b0hITU1TUyA9IChpbnQpIC0+XG4gIHNlY19udW0gPSBwYXJzZUludChpbnQsIDEwKVxuICBob3VycyAgID0gTWF0aC5mbG9vcihzZWNfbnVtIC8gMzYwMCk7XG4gIG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNfbnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICBzZWNvbmRzID0gc2VjX251bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cbiAgaWYgKGhvdXJzICAgPCAxMCkgdGhlbiBob3VycyAgID0gXCIwXCIraG91cnNcbiAgaWYgKG1pbnV0ZXMgPCAxMCkgdGhlbiBtaW51dGVzID0gXCJcIittaW51dGVzXG4gIGlmIChzZWNvbmRzIDwgMTApIHRoZW4gc2Vjb25kcyA9IFwiMFwiK3NlY29uZHNcbiAgdGltZVN0cmluZyA9IFwiXCJcbiAgaWYgaG91cnMgIT0gXCIwMFwiXG4gICAgdGltZVN0cmluZyA9IGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzXG4gIGVsc2VcbiAgICB0aW1lU3RyaW5nID0gbWludXRlcysnOicrc2Vjb25kc1xuXG4gIHJldHVybiB0aW1lU3RyaW5nXG5cbiNsYXllciwgbW92ZVRvVGFwLCBjb2xvciwgc2NhbGUsIGN1cnZlXG5leHBvcnRzLmlua3kgPSAoc2V0dXApIC0+XG5cdHN0YXJ0WCA9IHNldHVwLmxheWVyLndpZHRoLzJcblx0c3RhcnRZID0gc2V0dXAubGF5ZXIuaGVpZ2h0LzJcblxuXHRpbmtDb2xvciA9IFwiIzBBMEEwQVwiXG5cdGlua1N0YXJ0U2NhbGUgPSAuMVxuXHRpbmtTY2FsZSA9IDNcblx0aW5rQ3VydmUgPSBcImJlemllci1jdXJ2ZSguMiwgMC40LCAwLjQsIDEuMClcIlxuXHRpbmtPcGFjaXR5ID0gMVxuXHRtb3ZlVG9UYXAgPSB0cnVlXG5cblx0aWYgc2V0dXAubW92ZVRvVGFwICE9IHVuZGVmaW5lZFxuXHRcdG1vdmVUb1RhcCA9IHNldHVwLm1vdmVUb1RhcFxuXG5cdGlmIHNldHVwLmNvbG9yICE9IHVuZGVmaW5lZFxuXHRcdGlua0NvbG9yID0gbS5jb2xvcihzZXR1cC5jb2xvcilcblxuXHRpZiBzZXR1cC5zY2FsZSAhPSB1bmRlZmluZWRcblx0XHRpbmtTY2FsZSA9IHNldHVwLnNjYWxlXG5cblx0aWYgc2V0dXAuc3RhcnRTY2FsZSAhPSB1bmRlZmluZWRcblx0XHRpbmtTdGFydFNjYWxlID0gc2V0dXAuc3RhcnRTY2FsZVxuXG5cdGlmIHNldHVwLmN1cnZlICE9IHVuZGVmaW5lZFxuXHRcdGlua0N1cnZlID0gc2V0dXAuY3VydmVcblxuXHRpZiBzZXR1cC5vcGFjaXR5ICE9IHVuZGVmaW5lZFxuXHRcdGlua09wYWNpdHkgPSBzZXR1cC5vcGFjaXR5XG5cblx0aW5reUVmZmVjdCA9IChldmVudCwgbGF5ZXIpIC0+XG5cdFx0aWYgbW92ZVRvVGFwID09IHRydWVcblx0XHRcdHN0YXJ0WCA9IGV2ZW50Lm9mZnNldFhcblx0XHRcdHN0YXJ0WSA9IGV2ZW50Lm9mZnNldFlcblxuXHRcdFx0aWYgVXRpbHMuaXNDaHJvbWUoKSA9PSBmYWxzZSAmJiBVdGlscy5pc1RvdWNoKClcblx0XHRcdFx0c3RhcnRYID0gZXZlbnQudG91Y2hDZW50ZXIueCAtIGxheWVyLnhcblx0XHRcdFx0c3RhcnRZID0gZXZlbnQudG91Y2hDZW50ZXIueSAtIGxheWVyLnlcblxuXHRcdGNpcmNsZSA9IG5ldyBMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOmlua0NvbG9yXG5cdFx0XHRtaWRYOnN0YXJ0WFxuXHRcdFx0bWlkWTpzdGFydFlcblx0XHRcdHN1cGVyTGF5ZXI6bGF5ZXJcblx0XHRcdGJvcmRlclJhZGl1czptLnV0aWxzLnB4KDUwKVxuXHRcdFx0b3BhY2l0eTogaW5rT3BhY2l0eVxuXG5cdFx0Y2lyY2xlLnNjYWxlID0gaW5rU3RhcnRTY2FsZVxuXHRcdGNpcmNsZS5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOihzY2FsZTppbmtTY2FsZSwgb3BhY2l0eTowKVxuXHRcdFx0Y3VydmU6aW5rQ3VydmVcblx0XHRcdHRpbWU6LjVcblx0XHRVdGlscy5kZWxheSAxLCAtPlxuXHRcdFx0Y2lyY2xlLmRlc3Ryb3koKVxuXG5cdGlmIFV0aWxzLmlzQ2hyb21lKCkgJiYgVXRpbHMuaXNUb3VjaCgpXG5cdFx0c2V0dXAubGF5ZXIub24gRXZlbnRzLkRvdWJsZVRhcCwgKGV2ZW50KSAtPlxuXHRcdFx0aW5reUVmZmVjdChldmVudCwgQClcblx0aWYgVXRpbHMuaXNDaHJvbWUoKSA9PSBmYWxzZSAmJiBVdGlscy5pc1RvdWNoKClcblx0XHRzZXR1cC5sYXllci5vbiBFdmVudHMuVGFwLCAoZXZlbnQpIC0+XG5cdFx0XHRpbmt5RWZmZWN0KGV2ZW50LCBAKVxuXHRpZiBVdGlscy5pc0Rlc2t0b3AoKVxuXHRcdHNldHVwLmxheWVyLm9uIEV2ZW50cy5Ub3VjaEVuZCwgKGV2ZW50KSAtPlxuXHRcdFx0aW5reUVmZmVjdChldmVudCwgQClcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG4gIHZpZGVvOnVuZGVmaW5lZFxuICBzdXBlckxheWVyOnVuZGVmaW5lZFxuICBoZWlnaHQ6bS5weCgyMDUpXG4gIHdpZHRoOm0ucHgoMTAwKVxuICBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG4gIGF1dG9wbGF5OnRydWVcbiAgY29uc3RyYWludHM6e3RvcDowfVxuICBtYXg6dHJ1ZVxuICBwcm9ncmVzc0NvbG9yOiBcImJsdWU4MDBcIlxuICBtdXRlOmZhbHNlXG4gIGxvb3A6ZmFsc2VcbiAgaWRsZUxpbWl0OjNcbiAgc2hvd1BsYXlTdG9wOnRydWVcbiAgaW1hZ2U6dW5kZWZpbmVkXG59XG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cbiAgc2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuICBpZiBzZXR1cC5tYXhcbiAgICAgIHJhdGlvID0gMC41NjI1XG4gICAgICBzZXR1cC53aWR0aCA9IG0uZGV2aWNlLndpZHRoXG4gICAgICBzZXR1cC5oZWlnaHQgPSBzZXR1cC53aWR0aCAqIDAuNTYyNVxuXG4gIHZpZGVvTGF5ZXIgPSBuZXcgVmlkZW9MYXllclxuICAgIHN1cGVyTGF5ZXI6c2V0dXAuc3VwZXJMYXllclxuICAgIHZpZGVvOnNldHVwLnZpZGVvXG4gICAgaGVpZ2h0OnNldHVwLmhlaWdodFxuICAgIHdpZHRoOnNldHVwLndpZHRoXG4gICAgYmFja2dyb3VuZENvbG9yOnNldHVwLmJhY2tncm91bmRDb2xvclxuICAgIG5hbWU6XCJ2aWRlb1wiXG5cbiAgaWYgc2V0dXAuaW1hZ2VcbiAgICB2aWRlb0xheWVyLmltYWdlID0gc2V0dXAuaW1hZ2VcblxuICB2aWRlb0xheWVyLnBsYXllci5hdXRvcGxheSA9IHNldHVwLmF1dG9wbGF5XG4gIHZpZGVvTGF5ZXIucGxheWVyLm11dGVkID0gc2V0dXAubXV0ZVxuICB2aWRlb0xheWVyLnBsYXllci5sb29wID0gc2V0dXAubG9vcFxuXG4gIGlmIHNldHVwLmNvbnN0cmFpbnRzXG4gICAgdmlkZW9MYXllci5jb25zdHJhaW50cyA9IHNldHVwLmNvbnN0cmFpbnRzXG4gICAgbS5sYXlvdXQuc2V0KHZpZGVvTGF5ZXIpXG5cbiAgdmlkZW9MYXllci5jb250cm9scyA9IG5ldyBMYXllclxuICAgIGhlaWdodDp2aWRlb0xheWVyLmhlaWdodFxuICAgIHdpZHRoOnZpZGVvTGF5ZXIud2lkdGhcbiAgICBzdXBlckxheWVyOnZpZGVvTGF5ZXJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG4gICAgbmFtZTpcImNvbnRyb2xzXCJcblxuICBVSXNldCA9IC0+XG4gICAgdmlkZW9MYXllci5pc0Z1bGxTY3JlZW4gPSBmYWxzZVxuICAgIHZpZGVvTGF5ZXIucGxheXN0b3AgPSBuZXcgTGF5ZXJcbiAgICAgIGJhY2tncm91bmRDb2xvcjptLmNvbG9yKFwiYmxhY2tcIilcbiAgICAgIHN1cGVyTGF5ZXI6dmlkZW9MYXllci5jb250cm9sc1xuICAgICAgYm9yZGVyUmFkaXVzOm0ucHgoNTApXG4gICAgICBoZWlnaHQ6bS5weCg1MClcbiAgICAgIHdpZHRoOm0ucHgoNTApXG4gICAgICBvcGFjaXR5Oi42XG4gICAgICBuYW1lOlwicGxheS9zdG9wXCJcbiAgICBpZiBzZXR1cC5zaG93UGxheVN0b3AgPT0gZmFsc2VcbiAgICAgIHZpZGVvTGF5ZXIucGxheXN0b3Aub3BhY2l0eSA9IDBcbiAgICB2aWRlb0xheWVyLnBsYXlzdG9wLmNlbnRlcigpXG5cbiAgICB2aWRlb0xheWVyLnBhdXNlID0gbmV3IG0uSWNvblxuICAgIFx0bmFtZTpcInBhdXNlXCJcbiAgICBcdGNvbG9yOlwid2hpdGVcIlxuXG4gICAgdmlkZW9MYXllci5wbGF5ID0gbmV3IG0uSWNvblxuICAgIFx0bmFtZTpcInBsYXlfYXJyb3dcIlxuICAgIFx0Y29sb3I6XCJ3aGl0ZVwiXG5cbiAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW4gPSBuZXcgbS5JY29uXG4gICAgXHRuYW1lOlwiZnVsbHNjcmVlblwiXG4gICAgXHRjb2xvcjpcIndoaXRlXCJcblxuICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbi5jb25zdHJhaW50cyA9XG4gICAgICBib3R0b206MFxuICAgICAgdHJhaWxpbmc6MTBcblxuICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbkV4aXQgPSBuZXcgbS5JY29uXG4gICAgXHRuYW1lOlwiZnVsbHNjcmVlbl9leGl0XCJcbiAgICBcdGNvbG9yOlwid2hpdGVcIlxuXG4gICAgdmlkZW9MYXllci5mdWxsc2NyZWVuRXhpdC5jb25zdHJhaW50cyA9XG4gICAgICBib3R0b206MFxuICAgICAgdHJhaWxpbmc6MTBcblxuICAgIG0ubGF5b3V0LnNldCh2aWRlb0xheWVyLmZ1bGxzY3JlZW4pXG5cbiAgICB2aWRlb0xheWVyLnBsYXkudmlzaWJsZSA9IGZhbHNlXG4gICAgdmlkZW9MYXllci5mdWxsc2NyZWVuRXhpdC52aXNpYmxlID0gZmFsc2VcblxuICAgIHZpZGVvTGF5ZXIuY29udHJvbHMuYWRkU3ViTGF5ZXIodmlkZW9MYXllci5wYXVzZSlcbiAgICB2aWRlb0xheWVyLmNvbnRyb2xzLmFkZFN1YkxheWVyKHZpZGVvTGF5ZXIucGxheSlcbiAgICB2aWRlb0xheWVyLmNvbnRyb2xzLmFkZFN1YkxheWVyKHZpZGVvTGF5ZXIuZnVsbHNjcmVlbilcbiAgICB2aWRlb0xheWVyLmNvbnRyb2xzLmFkZFN1YkxheWVyKHZpZGVvTGF5ZXIuZnVsbHNjcmVlbkV4aXQpXG4gICAgdmlkZW9MYXllci5wYXVzZS5jZW50ZXIoKVxuICAgIHZpZGVvTGF5ZXIucGxheS5jZW50ZXIoKVxuXG5cbiAgICB2aWRlb0xheWVyLmN1cnJlbnRUaW1lID0gbmV3IG0uVGV4dFxuICAgICAgdGV4dDptLnV0aWxzLnRvSEhNTVNTKHZpZGVvTGF5ZXIucGxheWVyLmN1cnJlbnRUaW1lKVxuICAgICAgY29sb3I6XCJ3aGl0ZVwiXG4gICAgICBjb25zdHJhaW50czp7Ym90dG9tOjgsIGxlYWRpbmc6MTd9XG4gICAgICBzdXBlckxheWVyOnZpZGVvTGF5ZXIuY29udHJvbHNcbiAgICAgIGZvbnRTaXplOjE0XG4gICAgICBuYW1lOlwiY3VycmVudFRpbWVcIlxuXG4gICAgdmlkZW9MYXllci5lbmRUaW1lID0gbmV3IG0uVGV4dFxuICAgICAgdGV4dDptLnV0aWxzLnRvSEhNTVNTKHZpZGVvTGF5ZXIucGxheWVyLmR1cmF0aW9uKVxuICAgICAgY29sb3I6XCJ3aGl0ZVwiXG4gICAgICBjb25zdHJhaW50czp7Ym90dG9tRWRnZXM6dmlkZW9MYXllci5jdXJyZW50VGltZSwgdHJhaWxpbmc6W3ZpZGVvTGF5ZXIuZnVsbHNjcmVlbiwgMTBdfVxuICAgICAgc3VwZXJMYXllcjp2aWRlb0xheWVyLmNvbnRyb2xzXG4gICAgICBmb250U2l6ZToxNFxuICAgICAgbmFtZTpcImVuZFRpbWVcIlxuXG4gICAgdmlkZW9MYXllci50aW1lYmFyID0gbmV3IExheWVyXG4gICAgICBzdXBlckxheWVyOnZpZGVvTGF5ZXIuY29udHJvbHNcbiAgICAgIGJhY2tncm91bmRDb2xvcjptLmNvbG9yKFwiZ3JleTMwMFwiKVxuICAgICAgbmFtZTpcInRpbWViYXJcIlxuICAgICAgb3BhY2l0eTouN1xuXG4gICAgdmlkZW9MYXllci50aW1lYmFyLmNvbnN0cmFpbnRzID1cbiAgICAgIGxlYWRpbmc6W3ZpZGVvTGF5ZXIuY3VycmVudFRpbWUsIDIwXVxuICAgICAgdHJhaWxpbmc6W3ZpZGVvTGF5ZXIuZW5kVGltZSwgMjBdXG4gICAgICBoZWlnaHQ6M1xuICAgICAgdmVydGljYWxDZW50ZXI6dmlkZW9MYXllci5jdXJyZW50VGltZVxuICAgIG0ubGF5b3V0LnNldCh2aWRlb0xheWVyLnRpbWViYXIpXG5cbiAgICB2aWRlb0xheWVyLnNlZWtlciA9IG5ldyBMYXllclxuICAgICAgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuICAgICAgc3VwZXJMYXllcjp2aWRlb0xheWVyLmNvbnRyb2xzXG4gICAgICBuYW1lOlwic2Vla2VyXCJcblxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyLmNvbnN0cmFpbnRzID1cbiAgICAgIHdpZHRoOjUwXG4gICAgICBoZWlnaHQ6NTBcbiAgICAgIHZlcnRpY2FsQ2VudGVyOnZpZGVvTGF5ZXIuY3VycmVudFRpbWVcbiAgICBtLmxheW91dC5zZXQodmlkZW9MYXllci5zZWVrZXIpXG5cbiAgICB2aWRlb0xheWVyLnNlZWtlckRvdCA9IG5ldyBMYXllclxuICAgICAgd2lkdGg6bS5weCgxNSlcbiAgICAgIGhlaWdodDptLnB4KDE1KVxuICAgICAgYm9yZGVyUmFkaXVzOm0ucHgoMTUpXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6bS5jb2xvcihzZXR1cC5wcm9ncmVzc0NvbG9yKVxuICAgICAgc3VwZXJMYXllcjp2aWRlb0xheWVyLnNlZWtlclxuICAgICAgbmFtZTpcInNlZWtlckRvdFwiXG5cbiAgICB2aWRlb0xheWVyLnNlZWtlckRvdC5jZW50ZXIoKVxuXG4gICAgdmlkZW9MYXllci5wcm9ncmVzc0JhciA9IG5ldyBMYXllclxuICAgICAgYmFja2dyb3VuZENvbG9yOm0uY29sb3Ioc2V0dXAucHJvZ3Jlc3NDb2xvcilcbiAgICAgIHdpZHRoOjBcbiAgICAgIHN1cGVyTGF5ZXI6dmlkZW9MYXllci5jb250cm9sc1xuICAgICAgbmFtZTpcInByb2dyZXNzIGJhclwiXG5cbiAgICB2aWRlb0xheWVyLnByb2dyZXNzQmFyLmNvbnN0cmFpbnRzID1cbiAgICAgIGhlaWdodDozXG4gICAgICB2ZXJ0aWNhbENlbnRlcjp2aWRlb0xheWVyLnRpbWViYXJcblxuICAgIG0ubGF5b3V0LnNldCh0YXJnZXQ6W3ZpZGVvTGF5ZXIuc2Vla2VyLCB2aWRlb0xheWVyLnByb2dyZXNzQmFyXSlcblxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0ID0gKHZpZGVvTGF5ZXIuc2Vla2VyLndpZHRoLzIgLSB2aWRlb0xheWVyLnNlZWtlckRvdC53aWR0aC8yKVxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyLnggPSB2aWRlb0xheWVyLnRpbWViYXIueCAtIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0XG4gICAgdmlkZW9MYXllci5wcm9ncmVzc0Jhci54ID0gdmlkZW9MYXllci50aW1lYmFyLnhcblxuICAgICNIYW5kbGUgSWRlbG5lc3NcbiAgICBpZGxlVGltZSA9IDBcbiAgICBVdGlscy5pbnRlcnZhbCAxLCAtPlxuICAgICAgaWRsZVRpbWUrK1xuICAgICAgaWYgaWRsZVRpbWUgPiBzZXR1cC5pZGxlTGltaXQgJiYgdmlkZW9MYXllci5wbGF5ZXIucGF1c2VkID09IGZhbHNlICYmIHZpZGVvTGF5ZXIuc2Vla2VyLndvcmtpbmcgIT0gdHJ1ZVxuICAgICAgICB2aWRlb0xheWVyLmNvbnRyb2xzLmFuaW1hdGVcbiAgICAgICAgICBwcm9wZXJ0aWVzOihvcGFjaXR5OjApXG4gICAgICAgICAgdGltZTouMjVcbiAgICAgICAgdmlkZW9MYXllci5wbGF5c3RvcC52aXNpYmxlID0gZmFsc2VcbiAgICAgIGVsc2VcbiAgICAgICAgdmlkZW9MYXllci5jb250cm9scy5vcGFjaXR5ID0gMVxuICAgICAgICB2aWRlb0xheWVyLnBsYXlzdG9wLnZpc2libGUgPSB0cnVlXG5cbiAgICB2aWRlb0xheWVyLmNvbnRyb2xzLm9uIEV2ZW50cy5Ub3VjaFN0YXJ0LCAtPlxuICAgICAgaWYgaWRsZVRpbWUgPiBzZXR1cC5pZGxlTGltaXRcbiAgICAgICAgaWRsZVRpbWUgPSAwXG4gICAgICBlbHNlXG4gICAgICAgIGlkbGVUaW1lID0gNVxuXG4gICAgdmlkZW9MYXllci5wbGF5c3RvcC5vbiBFdmVudHMuVG91Y2hFbmQsIC0+XG4gICAgICBpZiB2aWRlb0xheWVyLnBsYXllci5wYXVzZWRcbiAgICAgICAgdmlkZW9MYXllci5wbGF5LnZpc2libGUgPSBmYWxzZVxuICAgICAgICB2aWRlb0xheWVyLnBhdXNlLnZpc2libGUgPSB0cnVlXG4gICAgICAgIHZpZGVvTGF5ZXIucGxheWVyLnBsYXkoKVxuICAgICAgZWxzZVxuICAgICAgICB2aWRlb0xheWVyLnBsYXkudmlzaWJsZSA9IHRydWVcbiAgICAgICAgdmlkZW9MYXllci5wYXVzZS52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgdmlkZW9MYXllci5wbGF5ZXIucGF1c2UoKVxuXG4gICAgdmlkZW9MYXllci5mdWxsc2NyZWVuLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgICAgdmlkZW9MYXllci5mdWxsc2NyZWVuLnZpc2libGUgPSBmYWxzZVxuICAgICAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW5FeGl0LnZpc2libGUgPSB0cnVlXG4gICAgICAgIHZpZGVvTGF5ZXIuY2FjaGVQcm9wcyA9IHZpZGVvTGF5ZXIucHJvcHNcbiAgICAgICAgdmlkZW9MYXllci5jYWNoZUFsaWduID0gdmlkZW9MYXllci5jb25zdHJhaW50cy5hbGlnblxuXG4gICAgICAgIGlmIHZpZGVvTGF5ZXIub25GdWxsU2NyZWVuXG4gICAgICAgICAgdmlkZW9MYXllci5vbkZ1bGxTY3JlZW4oKVxuXG4gICAgICAgIGlkbGVUaW1lID0gMFxuICAgICAgICB2aWRlb0xheWVyLmJhY2tkcm9wID0gbmV3IExheWVyXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOlwiYmxhY2tcIlxuICAgICAgICAgIHdpZHRoOm0uZGV2aWNlLndpZHRoXG4gICAgICAgICAgaGVpZ2h0Om0uZGV2aWNlLmhlaWdodFxuICAgICAgICAgIG5hbWU6XCJiYWNrZHJvcFwiXG4gICAgICAgIHZpZGVvTGF5ZXIuY29uc3RyYWludHMuYWxpZ24gPSBcImNlbnRlclwiXG5cbiAgICAgICAgdmlkZW9MYXllci5hbmltYXRlXG4gICAgICAgICAgcHJvcGVydGllczpcbiAgICAgICAgICAgIHdpZHRoOiBtLmRldmljZS53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0OiBtLmRldmljZS53aWR0aCAqIDAuNTYyNVxuICAgICAgICAgIHRpbWU6LjVcbiAgICAgICAgbS5sYXlvdXQuYW5pbWF0ZVxuICAgICAgICAgIHRhcmdldDp2aWRlb0xheWVyXG4gICAgICAgICAgdGltZTouNVxuICAgICAgICBpZiBzZXR1cC5zdXBlckxheWVyXG4gICAgICAgICAgdmlkZW9MYXllci5iYWNrZHJvcC5zdXBlckxheWVyID0gc2V0dXAuc3VwZXJMYXllclxuICAgICAgICAgIHZpZGVvTGF5ZXIuYmFja2Ryb3AucGxhY2VCZWhpbmQodmlkZW9MYXllcilcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHZpZGVvTGF5ZXIuYmFja2Ryb3AucGxhY2VCZWhpbmQodmlkZW9MYXllcilcbiAgICAgICAgbS5hZGRUb1N0YWNrKHZpZGVvTGF5ZXIpXG5cbiAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW5FeGl0Lm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgICAgdmlkZW9MYXllci5mdWxsc2NyZWVuLnZpc2libGUgPSB0cnVlXG4gICAgICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbkV4aXQudmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIGlkbGVUaW1lID0gMFxuICAgICAgICBtLnJlbW92ZUZyb21TdGFjaygpXG5cblxuXG4gICAgdmlkZW9MYXllci5leGl0ID0gKCkgLT5cbiAgICAgICAgdmlkZW9MYXllci5hbmltYXRlXG4gICAgICAgICAgcHJvcGVydGllczooeDp2aWRlb0xheWVyLmNhY2hlUHJvcHMueCwgeTp2aWRlb0xheWVyLmNhY2hlUHJvcHMueSwgd2lkdGg6dmlkZW9MYXllci5jYWNoZVByb3BzLndpZHRoLCBoZWlnaHQ6dmlkZW9MYXllci5jYWNoZVByb3BzLmhlaWdodClcbiAgICAgICAgICB0aW1lOi41XG5cbiAgICAgICAgdmlkZW9MYXllci5jb25zdHJhaW50cy5hbGlnbiA9IHZpZGVvTGF5ZXIuY2FjaGVBbGlnblxuXG4gICAgICAgIHZpZGVvTGF5ZXIuYmFja2Ryb3AuYW5pbWF0ZVxuICAgICAgICAgIHByb3BlcnRpZXM6KG9wYWNpdHk6MClcbiAgICAgICAgICB0aW1lOi41XG4gICAgICAgICAgZGVsYXk6LjJcbiAgICAgICAgVXRpbHMuZGVsYXkgLjcsIC0+XG4gICAgICAgICAgdmlkZW9MYXllci5iYWNrZHJvcC5kZXN0cm95KClcblxuICAgICAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW4udmlzaWJsZSA9IHRydWVcbiAgICAgICAgdmlkZW9MYXllci5mdWxsc2NyZWVuRXhpdC52aXNpYmxlID0gZmFsc2VcblxuICAgICAgICBpZiB2aWRlb0xheWVyLm9uRnVsbFNjcmVlbkV4aXRcbiAgICAgICAgICB2aWRlb0xheWVyLm9uRnVsbFNjcmVlbkV4aXQoKVxuXG4gICAgI1NlZWtlciBDb250cm9sc1xuICAgIHZpZGVvTGF5ZXIuc2Vla2VyLmRyYWdnYWJsZS5lbmFibGVkID0gdHJ1ZVxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyLmRyYWdnYWJsZS5zcGVlZFkgPSAwXG4gICAgdmlkZW9MYXllci5zZWVrZXIuZHJhZ2dhYmxlLnNwZWVkWCA9IDFcbiAgICB2aWRlb0xheWVyLnNlZWtlci5kcmFnZ2FibGUubW9tZW50dW0gPSBmYWxzZVxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyLmRyYWdnYWJsZS5ib3VuY2UgPSBmYWxzZVxuXG4gICAgdmlkZW9MYXllci5zZWVrZXIub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG4gICAgICB2aWRlb0xheWVyLnNlZWtlci5zY2FsZSA9IDEuMlxuICAgICAgdmlkZW9MYXllci5zZWVrZXIud29ya2luZyA9IHRydWVcblxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyLm9uIEV2ZW50cy5EcmFnTW92ZSwgLT5cbiAgICAgIHZpZGVvTGF5ZXIuc2Vla2VyLndvcmtpbmcgPSB0cnVlXG4gICAgICBpZiB2aWRlb0xheWVyLnNlZWtlci54ICsgdmlkZW9MYXllci5zZWVrZXJPZmZzZXQgPCB2aWRlb0xheWVyLnRpbWViYXIueFxuICAgICAgICB2aWRlb0xheWVyLnNlZWtlci54ID0gdmlkZW9MYXllci50aW1lYmFyLnggLSB2aWRlb0xheWVyLnNlZWtlck9mZnNldFxuICAgICAgaWYgdmlkZW9MYXllci5zZWVrZXIubWF4WCA+IHZpZGVvTGF5ZXIudGltZWJhci5tYXhYICsgdmlkZW9MYXllci5zZWVrZXJPZmZzZXRcbiAgICAgICAgdmlkZW9MYXllci5zZWVrZXIubWF4WCA9IHZpZGVvTGF5ZXIudGltZWJhci5tYXhYICsgdmlkZW9MYXllci5zZWVrZXJPZmZzZXRcbiAgICAgIG5ld0NUID0gdmlkZW9MYXllci5wbGF5ZXIuZHVyYXRpb24gKiAoKHZpZGVvTGF5ZXIuc2Vla2VyLnggKyB2aWRlb0xheWVyLnNlZWtlck9mZnNldCAtIHZpZGVvTGF5ZXIudGltZWJhci54KS92aWRlb0xheWVyLnRpbWViYXIud2lkdGgpXG4gICAgICBpZiBuZXdDVCA8IDBcbiAgICAgICAgbmV3Q1QgPSAwXG4gICAgICBpZiBuZXdDVCA+IHZpZGVvTGF5ZXIucGxheWVyLmR1cmF0aW9uXG4gICAgICAgIG5ld0NUID0gdmlkZW9MYXllci5wbGF5ZXIuZHVyYXRpb25cbiAgICAgIG0udXRpbHMudXBkYXRlKHZpZGVvTGF5ZXIuY3VycmVudFRpbWUsIFt7dGV4dDptLnV0aWxzLnRvSEhNTVNTKG5ld0NUKX1dKVxuXG4gICAgdmlkZW9MYXllci5zZWVrZXIub24gRXZlbnRzLkRyYWdFbmQsIC0+XG4gICAgICB2aWRlb0xheWVyLnNlZWtlci5zY2FsZSA9IDFcbiAgICAgIHZpZGVvTGF5ZXIuc2Vla2VyLndvcmtpbmcgPSBmYWxzZVxuICAgICAgZXQgPSB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvblxuICAgICAgbmV3Q1QgPSBldCAqICgodmlkZW9MYXllci5zZWVrZXIueCArIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0IC0gdmlkZW9MYXllci50aW1lYmFyLngpL3ZpZGVvTGF5ZXIudGltZWJhci53aWR0aClcbiAgICAgIGlmIG5ld0NUIDwgMFxuICAgICAgICBuZXdDVCA9IDBcbiAgICAgIGlmIG5ld0NUID4gdmlkZW9MYXllci5wbGF5ZXIuZHVyYXRpb25cbiAgICAgICAgbmV3Q1QgPSB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvblxuICAgICAgbmV3Q1QgPSBNYXRoLnJvdW5kKG5ld0NUKVxuICAgICAgdmlkZW9MYXllci5wbGF5ZXIuY3VycmVudFRpbWUgPSBuZXdDVFxuXG5cbiAgVUlkZWxlZ2F0ZSA9IC0+XG4gICAgY3QgPSB2aWRlb0xheWVyLnBsYXllci5jdXJyZW50VGltZVxuICAgIGV0ID0gdmlkZW9MYXllci5wbGF5ZXIuZHVyYXRpb25cbiAgICBpZiB2aWRlb0xheWVyLnNlZWtlci53b3JraW5nXG4gICAgICAgICMgRG8gbm90aGluZ1xuICAgIGVsc2VcbiAgICAgIG0udXRpbHMudXBkYXRlKHZpZGVvTGF5ZXIuY3VycmVudFRpbWUsIFt7dGV4dDptLnV0aWxzLnRvSEhNTVNTKHZpZGVvTGF5ZXIucGxheWVyLmN1cnJlbnRUaW1lKX1dKVxuICAgICAgdmlkZW9MYXllci5zZWVrZXIueCA9IHZpZGVvTGF5ZXIudGltZWJhci54ICsgKHZpZGVvTGF5ZXIudGltZWJhci53aWR0aCAqIGN0L2V0KSAtIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0XG4gICAgICB2aWRlb0xheWVyLnByb2dyZXNzQmFyLndpZHRoID0gIHZpZGVvTGF5ZXIuc2Vla2VyLnggKyB2aWRlb0xheWVyLnNlZWtlck9mZnNldCAtIHZpZGVvTGF5ZXIudGltZWJhci54XG5cbiAgdmlkZW9MYXllci5wbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlZGRhdGFcIiwgVUlzZXQpXG4gIHZpZGVvTGF5ZXIucGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIFVJZGVsZWdhdGUpXG5cblxuICByZXR1cm4gdmlkZW9MYXllclxuIiwiI21hdGVyaWFsS2l0IE1vZHVsZVxuI0J5IEtldnluIEFybm90dFxuXG4jIEltcG9ydCBmcmFtZXdvcmtcbmV4cG9ydHMubGF5b3V0ID0gbGF5b3V0ID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LWxheW91dCdcbmV4cG9ydHMubGliID0gbGlicmFyeSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1saWJyYXJ5J1xuZXhwb3J0cy51dGlscyA9IHV0aWxzID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LXV0aWxzJ1xuZXhwb3J0cy5zdGFjayA9IHN0YWNrID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LXN0YWNrJ1xuXG4jIFNldHVwIHJlc291cmNlc1xuZXhwb3J0cy5kZXZpY2UgPSB1dGlscy5nZXREZXZpY2UoKVxuZXhwb3J0cy5hc3NldHMgPSBsaWJyYXJ5LmFzc2V0c1xuXG4jIyBTaG9ydGN1dHNcbmV4cG9ydHMuY29sb3IgPSAoY29sb3JTdHJpbmcpIC0+XG4gIHJldHVybiBleHBvcnRzLnV0aWxzLmNvbG9yKGNvbG9yU3RyaW5nKVxuXG5leHBvcnRzLmRwID0gKHB4KSAtPlxuICByZXR1cm4gZXhwb3J0cy51dGlscy5wdChweClcblxuZXhwb3J0cy5weCA9IChkcCkgLT5cbiAgcmV0dXJuIGV4cG9ydHMudXRpbHMucHgoZHApXG5cbmV4cG9ydHMuc3RhY2sgPSBzdGFjay5zdGFja1xuXG5leHBvcnRzLmFkZFRvU3RhY2sgPSAobGF5ZXIpIC0+XG4gIHN0YWNrLmFkZFRvU3RhY2sobGF5ZXIpXG5cbmV4cG9ydHMucmVtb3ZlRnJvbVN0YWNrID0gKGxheWVyKSAtPlxuICBzdGFjay5yZW1vdmVGcm9tU3RhY2sobGF5ZXIpXG5cblxuIyBJbXBvcnQgQ29tcG9uZW50c1xuYXBwYmFyID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LWFwcC1iYXInXG5iYW5uZXIgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtYmFubmVyJ1xuYnV0dG9uID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LWJ1dHRvbidcbmRpYWxvZyA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1kaWFsb2cnXG5pY29uID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LWljb24nXG5uYXYgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtbmF2LWJhcidcbnNuYWNrYmFyID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LXNuYWNrLWJhcidcbnN0YXR1cyA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1zdGF0dXMtYmFyJ1xudGV4dCA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC10ZXh0J1xudmlkZW8gPSByZXF1aXJlICdtYXRlcmlhbC1raXQtdmlkZW8nXG5ib3R0b21uYXYgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtYm90dG9tLW5hdidcbmNhcmQgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtY2FyZHMnXG5cbiMjIFNldHVwIENvbXBvbmVudHNcbmV4cG9ydHMuQXBwQmFyID0gYXBwYmFyLmNyZWF0ZVxuZXhwb3J0cy5CYW5uZXIgPSBiYW5uZXIuY3JlYXRlXG5leHBvcnRzLkJ1dHRvbiA9IGJ1dHRvbi5jcmVhdGVcbmV4cG9ydHMuRGlhbG9nID0gZGlhbG9nLmNyZWF0ZVxuZXhwb3J0cy5JY29uID0gaWNvbi5jcmVhdGVcbmV4cG9ydHMuTmF2QmFyID0gbmF2LmNyZWF0ZVxuZXhwb3J0cy5TbmFja0JhciA9IHNuYWNrYmFyLmNyZWF0ZVxuZXhwb3J0cy5TdGF0dXNCYXIgPSBzdGF0dXMuY3JlYXRlXG5leHBvcnRzLlRleHQgPSB0ZXh0LmNyZWF0ZVxuZXhwb3J0cy5WaWRlbyA9IHZpZGVvLmNyZWF0ZVxuZXhwb3J0cy5Cb3R0b21OYXYgPSBib3R0b21uYXYuY3JlYXRlXG5leHBvcnRzLkNhcmQgPSBjYXJkLmNyZWF0ZVxuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuY2xhc3MgZXhwb3J0cy5DYXJkIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6ICgpIC0+XG5cblx0Y2FyZCA9IG5ldyBMYXllclxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LDEpXCJcblx0XHRzaGFkb3dZOiBtLnB4KDIpXG5cdFx0c2hhZG93Q29sb3I6IG0uY29sb3IoXCJncmV5MjAwXCIpXG5cblx0Y2FyZC5jb25zdHJhaW50cyA9XG5cdFx0dG9wOiAxMFxuXHRcdGxlYWRpbmc6IDE2XG5cdFx0dHJhaWxpbmc6IDE2XG5cdFx0aGVpZ2h0OiAzMDBcblxuXHRtLmxheW91dC5zZXQoKVxuXG5cblxuXHRjYXJkW1wiY2hldnJvbi1yaWdodFwiXSA9IG5ldyBtLkljb25cblx0XHRuYW1lOiBcInRvZGF5XCJcblx0XHRzdXBlckxheWVyOiBjYXJkXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHRsZWFkaW5nOiAxNlxuXHRcdFx0dG9wOjE2XG5cblxuXHR0ZXh0ID0gbmV3IG0uVGV4dFxuXHRcdHRleHQ6XCJDYXJkIFRpdGxlXCJcblx0XHRuYW1lOiBcIkNhcmQgVGl0bGVcIlxuXHRcdGZvbnRTaXplOjE4XG5cdFx0Zm9udFdlaWdodDo0MDBcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGFsaWduOlwibGVmdFwiXG5cdFx0XHR0b3A6IDIwXG5cdFx0XHRsZWFkaW5nOltjYXJkW1wiY2hldnJvbi1yaWdodFwiXSwgMTZdXG5cdFx0XHR0cmFpbGluZzogMTZcblx0XHRzdXBlckxheWVyOiBjYXJkXG5cblxuXHRtLmxheW91dC5zZXQoKVxuXG5cblx0dGh1bWJuYWlsID0gbmV3IExheWVyXG5cdFx0c3VwZXJMYXllcjogY2FyZFxuXHRcdGltYWdlOiBVdGlscy5yYW5kb21JbWFnZSgpXG5cdFx0Y2xpcDogdHJ1ZVxuXG5cdHRodW1ibmFpbC5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdGJvdHRvbTo2MFxuXHRcdHRvcDpbdGV4dCwgMTZdXG5cblx0bS5sYXlvdXQuc2V0KClcblxuXHRjYXJkW1wic3VidGV4dFwiXSA9IG5ldyBtLlRleHRcblx0XHR0ZXh0OiBcIkxvcmVtIElwc3VtIGRvbG9yIHNpdCBhbWV0IHBlbmF0aWJ1cyBtYWduaXNcIlxuXHRcdGZvbnRTaXplOjE0XG5cdFx0Zm9udFdlaWdodDozMDBcblx0XHRzdXBlckxheWVyOiBjYXJkXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6IFt0aHVtYm5haWwsIDE2XVxuXHRcdFx0bGVhZGluZzogOFxuXHRcdFx0dHJhaWxpbmc6IDE2XG5cblx0Y2FyZFtcImZvb3RlclwiXSA9IG5ldyBMYXllclxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LDEpXCJcblx0XHRzaGFkb3dZOiBtLnB4KDIpXG5cdFx0c2hhZG93Q29sb3I6IG0uY29sb3IoXCJncmV5MjAwXCIpXG5cblx0Y2FyZFtcImZvb3RlclwiXS5jb25zdHJhaW50cyA9XG5cdFx0dG9wOiBbY2FyZCwxXVxuXHRcdHRyYWlsaW5nOiAxNlxuXHRcdGxlYWRpbmc6IDE2XG5cdFx0aGVpZ2h0OiA0MFxuXG5cdG0ubGF5b3V0LnNldCgpXG5cblx0bS51dGlscy5pbmt5XG5cdFx0bGF5ZXI6IHRodW1ibmFpbFxuXHRcdGNvbG9yOiAncmVkJ1xuIl19
