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


},{"material-kit":"material-kit"}],"material-kit-cards":[function(require,module,exports){
var m;

m = require('material-kit');

exports.defaults = {
  title: "Title",
  bodyText: "Content",
  height: 300,
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
  var act, actionsArray, bodyText, button, card, cardButtonArray, cardFooter, i, icon, j, k, l, len, len1, len2, len3, n, ref, ref1, setup, thumbnail, title;
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
  title = new m.Text({
    superLayer: card,
    text: setup.title,
    fontWeight: "semibold",
    fontSize: 20,
    name: "title",
    lineHeight: 20,
    constraints: {
      top: 20,
      width: 220,
      leading: 16
    }
  });
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
      top: [title, 16]
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
  cardButtonArray = [];
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
    ref1 = setup.footer;
    for (i = l = 0, len2 = ref1.length; l < len2; i = ++l) {
      button = ref1[i];
      if (i === 0) {
        button = new m.Button({
          name: button,
          type: "flat",
          superLayer: cardFooter,
          text: setup.footer,
          backgroundColor: "#3232"
        });
        button.constraints = {
          bottom: 8,
          leading: 16
        };
        cardButtonArray.push(button);
      } else {
        button = new m.Button({
          name: button,
          type: "raised",
          superLayer: cardFooter,
          text: setup.footer,
          backgroundColor: "#3232",
          constraints: {
            trailing: [cardButtonArray[i - 1], 16]
          }
        });
        cardButtonArray.push(button);
      }
    }
    for (n = 0, len3 = cardButtonArray.length; n < len3; n++) {
      button = cardButtonArray[n];
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtYXBwLWJhci5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtYmFubmVyLmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1ib3R0b20tbmF2LmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1idXR0b24uY29mZmVlIiwiL1VzZXJzL2NocmlzdGlhbnBvc2NobWFubi9Eb2N1bWVudHMvZnJhbWVyLW1hdGVyaWFsLWtpdC9NYXRlcmlhbCBDYXJkIERlbW8uZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LWNhcmRzLmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1kaWFsb2cuY29mZmVlIiwiL1VzZXJzL2NocmlzdGlhbnBvc2NobWFubi9Eb2N1bWVudHMvZnJhbWVyLW1hdGVyaWFsLWtpdC9NYXRlcmlhbCBDYXJkIERlbW8uZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LWljb24uY29mZmVlIiwiL1VzZXJzL2NocmlzdGlhbnBvc2NobWFubi9Eb2N1bWVudHMvZnJhbWVyLW1hdGVyaWFsLWtpdC9NYXRlcmlhbCBDYXJkIERlbW8uZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LWxheW91dC5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtbGlicmFyeS5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtbmF2LWJhci5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtc25hY2stYmFyLmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC1zdGFjay5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtc3RhdHVzLWJhci5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtdGV4dC5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9tYXRlcmlhbC1raXQtdXRpbHMuY29mZmVlIiwiL1VzZXJzL2NocmlzdGlhbnBvc2NobWFubi9Eb2N1bWVudHMvZnJhbWVyLW1hdGVyaWFsLWtpdC9NYXRlcmlhbCBDYXJkIERlbW8uZnJhbWVyL21vZHVsZXMvbWF0ZXJpYWwta2l0LXZpZGVvLmNvZmZlZSIsIi9Vc2Vycy9jaHJpc3RpYW5wb3NjaG1hbm4vRG9jdW1lbnRzL2ZyYW1lci1tYXRlcmlhbC1raXQvTWF0ZXJpYWwgQ2FyZCBEZW1vLmZyYW1lci9tb2R1bGVzL21hdGVyaWFsLWtpdC5jb2ZmZWUiLCIvVXNlcnMvY2hyaXN0aWFucG9zY2htYW5uL0RvY3VtZW50cy9mcmFtZXItbWF0ZXJpYWwta2l0L01hdGVyaWFsIENhcmQgRGVtby5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFFSixPQUFPLENBQUMsUUFBUixHQUFtQjtFQUNsQixLQUFBLEVBQU0sT0FEWTtFQUVsQixJQUFBLEVBQUssTUFGYTtFQUlsQixJQUFBLEVBQUssUUFKYTtFQUtsQixlQUFBLEVBQWdCLE9BTEU7RUFNbEIsSUFBQSxFQUFLLE1BTmE7RUFPbEIsVUFBQSxFQUFXLE9BUE87RUFRbEIsV0FBQSxFQUFZLE9BUk07RUFTbEIsSUFBQSxFQUFLLE1BVGE7RUFVbEIsU0FBQSxFQUFVLE1BVlE7RUFXbEIsT0FBQSxFQUFRO0lBQUMsS0FBQSxFQUFNLFVBQVA7SUFBbUIsS0FBQSxFQUFNLENBQXpCO0dBWFU7RUFZbEIsWUFBQSxFQUFhLFFBWks7RUFhbEIsT0FBQSxFQUFRO0lBQUMsS0FBQSxFQUFNLE1BQVA7SUFBa0IsT0FBQSxFQUFRLEVBQTFCO0dBYlU7RUFjbEIsUUFBQSxFQUFTLE1BZFM7RUFlbEIsT0FBQSxFQUFRLE1BZlU7OztBQWtCbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0FBQ2hCLE1BQUE7RUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFSLENBQXVCLEtBQXZCLEVBQThCLE9BQU8sQ0FBQyxRQUF0QztFQUNSLEdBQUEsR0FBVSxJQUFBLEtBQUEsQ0FDVDtJQUFBLElBQUEsRUFBSyxTQUFMO0lBQ0EsZUFBQSxFQUFnQixDQUFDLENBQUMsS0FBRixDQUFRLEtBQUssQ0FBQyxlQUFkLENBRGhCO0lBRUEsV0FBQSxFQUFhLG9CQUZiO0lBR0EsVUFBQSxFQUFZLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUhaO0lBSUEsT0FBQSxFQUFTLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUpUO0dBRFM7RUFPVixHQUFHLENBQUMsV0FBSixHQUNDO0lBQUEsT0FBQSxFQUFRLENBQVI7SUFDQSxRQUFBLEVBQVMsQ0FEVDtJQUVBLEdBQUEsRUFBSSxDQUZKO0lBR0EsTUFBQSxFQUFPLEVBSFA7O0VBS0QsSUFBRyxLQUFLLENBQUMsSUFBVDtJQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBaEIsR0FBeUIsSUFEMUI7O0VBR0EsT0FBQSxHQUFjLElBQUEsS0FBQSxDQUFNO0lBQUEsVUFBQSxFQUFXLEdBQVg7SUFBZ0IsZUFBQSxFQUFnQixhQUFoQztJQUErQyxJQUFBLEVBQUssU0FBcEQ7R0FBTjtFQUNkLE9BQU8sQ0FBQyxXQUFSLEdBQ0M7SUFBQSxPQUFBLEVBQVEsQ0FBUjtJQUNBLFFBQUEsRUFBUyxDQURUO0lBRUEsTUFBQSxFQUFPLEVBRlA7SUFHQSxNQUFBLEVBQU8sQ0FIUDs7RUFLRCxJQUFHLEtBQUssQ0FBQyxJQUFOLElBQWMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFYLEdBQW9CLENBQXJDO0lBQ0MsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFwQixHQUE2QixHQUQ5Qjs7RUFHQSxJQUFHLEtBQUssQ0FBQyxVQUFUO0lBQ0MsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFqQixDQUE2QixHQUE3QixFQUREOztFQUdBLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhLENBQUMsR0FBRCxFQUFNLE9BQU4sQ0FBYjtFQUVBLEdBQUcsQ0FBQyxJQUFKLEdBQVcsS0FBSyxDQUFDO0FBRWpCO0FBQUEsT0FBQSxxQ0FBQTs7SUFDQyxJQUFHLEtBQUssQ0FBQyxJQUFOLEtBQWMsV0FBakI7TUFDQyxJQUFDLENBQUEsU0FBRCxHQUFhO01BQ2IsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsSUFBQyxDQUFBLFNBQWpCLEVBRkQ7O0FBREQ7RUFLQSxJQUFHLEtBQUssQ0FBQyxVQUFOLEtBQW9CLE9BQXZCO0lBQ0MsS0FBSyxDQUFDLFVBQU4sR0FBbUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFSLENBQWtCLEdBQUcsQ0FBQyxlQUF0QixDQUFzQyxDQUFDLFdBQXZDLENBQUEsRUFEcEI7O0VBR0EsSUFBRyxLQUFLLENBQUMsV0FBTixLQUFxQixPQUF4QjtJQUNDLEtBQUssQ0FBQyxXQUFOLEdBQW9CLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUixDQUFrQixHQUFHLENBQUMsZUFBdEIsQ0FBc0MsQ0FBQyxXQUF2QyxDQUFBLEVBRHJCOztFQUdBLElBQUcsT0FBTyxLQUFLLENBQUMsS0FBYixLQUFzQixRQUF6QjtJQUNDLEtBQUEsR0FBWSxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ1g7TUFBQSxLQUFBLEVBQU0sS0FBSyxDQUFDLFVBQVo7TUFDQSxVQUFBLEVBQVcsR0FEWDtNQUVBLFVBQUEsRUFBVyxPQUZYO01BR0EsSUFBQSxFQUFLLEtBQUssQ0FBQyxLQUhYO01BSUEsUUFBQSxFQUFTLEVBSlQ7S0FEVyxFQURiOztFQVFBLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBUixDQUFvQixLQUFwQjtFQUdBLFlBQUEsR0FBZTtFQUNmLElBQUcsS0FBSyxDQUFDLElBQVQ7SUFDQyxHQUFHLENBQUMsSUFBSixHQUFlLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDZDtNQUFBLElBQUEsRUFBSyxLQUFLLENBQUMsSUFBWDtNQUNBLEtBQUEsRUFBTSxLQUFLLENBQUMsV0FEWjtNQUVBLFVBQUEsRUFBVyxPQUZYO01BR0EsV0FBQSxFQUFZO1FBQUMsT0FBQSxFQUFRLEVBQVQ7UUFBYSxjQUFBLEVBQWUsS0FBNUI7T0FIWjtNQUlBLElBQUEsRUFBSyxLQUpMO0tBRGM7SUFNZixZQUFBLEdBQWUsQ0FBQyxHQUFHLENBQUMsSUFBTCxFQUFXLEVBQVg7SUFFZixDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FDQztNQUFBLEtBQUEsRUFBTSxHQUFHLENBQUMsSUFBVjtNQUNBLFNBQUEsRUFBVSxLQURWO01BRUEsS0FBQSxFQUFNLE9BRk47TUFHQSxPQUFBLEVBQVEsRUFIUjtNQUlBLEtBQUEsRUFBTSxFQUpOO01BS0EsVUFBQSxFQUFXLEVBTFg7S0FERCxFQVREOztFQWtCQSxLQUFLLENBQUMsV0FBTixHQUNDO0lBQUEsTUFBQSxFQUFPLEVBQVA7SUFDQSxPQUFBLEVBQVEsWUFEUjs7RUFHRCxJQUFHLEtBQUssQ0FBQyxVQUFUO0lBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFsQixHQUE0QixHQUQ3Qjs7RUFJQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztJQUFBLE1BQUEsRUFBTyxDQUFDLEtBQUQsQ0FBUDtHQUREO0VBR0EsWUFBQSxHQUFlO0VBQ2YsSUFBRyxLQUFLLENBQUMsT0FBVDtBQUNDO0FBQUEsU0FBQSxnREFBQTs7TUFDQyxJQUFHLENBQUEsS0FBSyxDQUFSO1FBQ0MsSUFBQSxHQUFXLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDVjtVQUFBLElBQUEsRUFBSyxHQUFMO1VBQ0EsVUFBQSxFQUFXLE9BRFg7VUFFQSxXQUFBLEVBQVk7WUFBQyxRQUFBLEVBQVMsRUFBVjtZQUFjLGNBQUEsRUFBZSxLQUE3QjtXQUZaO1VBR0EsS0FBQSxFQUFNLEtBQUssQ0FBQyxXQUhaO1VBSUEsSUFBQSxFQUFLLEtBSkw7U0FEVTtRQU1YLFlBQVksQ0FBQyxJQUFiLENBQWtCLElBQWxCLEVBUEQ7T0FBQSxNQUFBO1FBU0MsSUFBQSxHQUFXLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDVjtVQUFBLElBQUEsRUFBSyxHQUFMO1VBQ0EsVUFBQSxFQUFXLE9BRFg7VUFFQSxXQUFBLEVBQVk7WUFBQyxRQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsQ0FBQSxHQUFJLENBQUosQ0FBZCxFQUFzQixFQUF0QixDQUFWO1lBQXFDLGNBQUEsRUFBZSxLQUFwRDtXQUZaO1VBR0EsS0FBQSxFQUFNLEtBQUssQ0FBQyxXQUhaO1VBSUEsSUFBQSxFQUFLLEtBSkw7U0FEVTtRQU1YLFlBQVksQ0FBQyxJQUFiLENBQWtCLElBQWxCLEVBZkQ7O0FBREQ7QUFrQkEsU0FBQSxnREFBQTs7TUFDQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FDQztRQUFBLEtBQUEsRUFBTSxHQUFOO1FBQ0EsU0FBQSxFQUFVLEtBRFY7UUFFQSxLQUFBLEVBQU0sT0FGTjtRQUdBLE9BQUEsRUFBUSxFQUhSO1FBSUEsS0FBQSxFQUFNLEVBSk47UUFLQSxVQUFBLEVBQVcsRUFMWDtPQUREO0FBREQsS0FuQkQ7O0VBNkJBLElBQUcsS0FBSyxDQUFDLElBQU4sSUFBYyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQVgsR0FBb0IsQ0FBckM7SUFFQyxlQUFBLEdBQWtCLFNBQUMsR0FBRCxFQUFNLEtBQU47QUFDakIsVUFBQTtNQUFBLFNBQUEsR0FBWSxNQUFNLENBQUMsSUFBUCxDQUFZLEdBQUcsQ0FBQyxJQUFoQjtNQUNaLGNBQUEsR0FBaUI7QUFDakI7V0FBQSxxREFBQTs7UUFDQyxHQUFBLEdBQU0sR0FBRyxDQUFDLElBQUssQ0FBQSxDQUFBO1FBRWYsSUFBRyxHQUFBLEtBQU8sR0FBRyxDQUFDLFNBQWQ7VUFDQyxjQUFBLEdBQWlCO1VBQ2pCLEdBQUcsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBYixDQUNDO1lBQUEsVUFBQSxFQUFZO2NBQUEsQ0FBQSxFQUFFLENBQUY7YUFBWjtZQUNBLElBQUEsRUFBSyxHQURMO1dBREQ7VUFHQSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQVYsR0FBb0I7VUFDcEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFWLEdBQWtCLEtBQUssQ0FBQztVQUN4QixHQUFHLENBQUMsU0FBUyxDQUFDLE9BQWQsQ0FDQztZQUFBLFVBQUEsRUFBWTtjQUFBLENBQUEsRUFBRSxLQUFLLENBQUMsQ0FBUjthQUFaO1lBQ0EsSUFBQSxFQUFLLEdBREw7WUFFQSxLQUFBLEVBQU0saUNBRk47V0FERDt1QkFJQSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQVIsQ0FBZSxLQUFmLEVBQXNCO1lBQUM7Y0FBQyxJQUFBLEVBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFSLENBQW1CLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQXZDLENBQU47YUFBRDtXQUF0QixHQVhEO1NBQUEsTUFBQTtVQWFDLElBQUcsY0FBQSxLQUFrQixNQUFyQjtZQUNDLEdBQUcsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBYixDQUNDO2NBQUEsVUFBQSxFQUFZO2dCQUFBLENBQUEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsR0FBaUIsQ0FBQyxDQUFwQjtlQUFaO2NBQ0EsSUFBQSxFQUFLLEdBREw7Y0FFQSxLQUFBLEVBQU0sZ0NBRk47YUFERCxFQUREO1dBQUEsTUFBQTtZQU1DLEdBQUcsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBYixDQUNDO2NBQUEsVUFBQSxFQUFZO2dCQUFBLENBQUEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVg7ZUFBWjtjQUNBLElBQUEsRUFBSyxHQURMO2NBRUEsS0FBQSxFQUFNLGdDQUZOO2FBREQsRUFORDs7VUFXQSxPQUFBLEdBQVU7VUFDVixLQUFBLEdBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQztVQUNsQixJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZCxLQUF5QixNQUE1QjtZQUNDLE9BQUEsR0FBVSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBRHpCOztVQUdBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFkLEtBQXVCLE1BQTFCO1lBQ0MsS0FBQSxHQUFRLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFEdkI7O1VBR0EsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFWLEdBQW9CO3VCQUNwQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQVYsR0FBa0IsT0FqQ25COztBQUhEOztJQUhpQjtJQXlDbEIsYUFBQSxHQUFvQixJQUFBLEtBQUEsQ0FDbkI7TUFBQSxNQUFBLEVBQU8sQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBQVA7TUFDQSxLQUFBLEVBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULEdBQWUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQURoQztNQUVBLGVBQUEsRUFBZ0IsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxLQUFLLENBQUMsWUFBZCxDQUZoQjtNQUdBLFVBQUEsRUFBVyxHQUhYO0tBRG1CO0lBS3BCLGFBQWEsQ0FBQyxXQUFkLEdBQ0M7TUFBQSxNQUFBLEVBQU8sQ0FBUDs7SUFDRCxHQUFHLENBQUMsU0FBSixHQUFnQjtJQUVoQixHQUFHLENBQUMsSUFBSixHQUFXO0lBQ1gsR0FBRyxDQUFDLEtBQUosR0FBWTtJQUNaLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFYLEdBQW9CLENBQXZCO0FBQ0M7QUFBQSxXQUFBLGdEQUFBOztRQUNDLElBQUEsR0FBVyxJQUFBLEtBQUEsQ0FDVjtVQUFBLElBQUEsRUFBSyxPQUFBLEdBQVUsQ0FBZjtVQUNBLGVBQUEsRUFBZ0IsYUFEaEI7U0FEVTtRQUdYLElBQUksQ0FBQyxXQUFMLEdBQ0M7VUFBQSxHQUFBLEVBQUksR0FBSjtVQUNBLE1BQUEsRUFBTyxDQURQO1VBRUEsS0FBQSxFQUFNLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFkLENBRk47O1FBR0QsR0FBRyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQVYsR0FBZTtRQUNmLElBQUcsQ0FBQSxHQUFJLENBQVA7VUFDQyxJQUFJLENBQUMsQ0FBTCxHQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFEbkI7O1FBRUEsR0FBQSxHQUFVLElBQUEsS0FBQSxDQUNUO1VBQUEsS0FBQSxFQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxHQUFlLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBaEM7VUFDQSxNQUFBLEVBQU8sQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMLENBRFA7VUFFQSxDQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsR0FBZSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQTNCLENBQUEsR0FBcUMsQ0FGdkM7VUFHQSxVQUFBLEVBQVcsR0FIWDtVQUlBLGVBQUEsRUFBZ0IsYUFKaEI7VUFLQSxJQUFBLEVBQUssSUFMTDtVQU1BLElBQUEsRUFBSyxNQU5MO1NBRFM7UUFRVixHQUFHLENBQUMsV0FBSixHQUNDO1VBQUEsTUFBQSxFQUFPLENBQVA7O1FBQ0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQWEsR0FBYjtRQUNBLElBQUcsS0FBSyxDQUFDLFNBQU4sS0FBbUIsTUFBdEI7VUFDQyxLQUFLLENBQUMsU0FBTixHQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVIsQ0FBa0IsR0FBRyxDQUFDLGVBQXRCLENBQXNDLENBQUMsV0FBdkMsQ0FBQSxFQURuQjs7UUFFQSxLQUFBLEdBQVE7UUFDUixJQUFHLEtBQUssQ0FBQyxRQUFUO1VBQ0MsSUFBQSxHQUFPLEtBQUssQ0FBQyxRQUFTLENBQUEsQ0FBQTtVQUN0QixLQUFBLEdBQVksSUFBQSxDQUFDLENBQUMsSUFBRixDQUNYO1lBQUEsSUFBQSxFQUFLLElBQUw7WUFDQSxVQUFBLEVBQVcsR0FEWDtZQUVBLEtBQUEsRUFBTSxLQUFLLENBQUMsU0FGWjtZQUdBLFdBQUEsRUFBWTtjQUFDLEtBQUEsRUFBTSxRQUFQO2FBSFo7V0FEVyxFQUZiO1NBQUEsTUFBQTtVQVFDLEtBQUEsR0FBWSxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ1g7WUFBQSxVQUFBLEVBQVcsR0FBWDtZQUNBLFdBQUEsRUFBWTtjQUFDLEtBQUEsRUFBTSxRQUFQO2FBRFo7WUFFQSxJQUFBLEVBQUssQ0FGTDtZQUdBLGFBQUEsRUFBYyxXQUhkO1lBSUEsUUFBQSxFQUFTLEVBSlQ7WUFLQSxLQUFBLEVBQU0sS0FBSyxDQUFDLFNBTFo7V0FEVyxFQVJiOztRQWVBLEtBQUssQ0FBQyxJQUFOLEdBQWE7UUFFYixHQUFHLENBQUMsS0FBSixHQUFZO1FBRVosS0FBSyxDQUFDLE9BQVEsQ0FBQSxPQUFBLENBQWQsR0FBeUI7UUFDekIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFSLENBQWEsS0FBSyxDQUFDLE9BQW5CO1FBQ0EsR0FBRyxDQUFDLElBQUssQ0FBQSxDQUFBLENBQVQsR0FBYztRQUVkLEdBQUcsQ0FBQyxFQUFKLENBQU8sTUFBTSxDQUFDLFFBQWQsRUFBd0IsU0FBQTtVQUN2QixHQUFHLENBQUMsU0FBSixHQUFnQjtpQkFDaEIsZUFBQSxDQUFnQixHQUFoQixFQUFxQixJQUFyQjtRQUZ1QixDQUF4QjtBQWhERCxPQUREO0tBdEREOztFQTBHQSxJQUFHLEtBQUssQ0FBQyxJQUFUO0lBQ0MsSUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQVgsR0FBb0IsQ0FBdkI7TUFDQyxHQUFHLENBQUMsU0FBSixHQUFnQixHQUFHLENBQUMsSUFBSyxDQUFBLEtBQUssQ0FBQyxJQUFLLENBQUEsQ0FBQSxDQUFYO01BQ3pCLGVBQUEsQ0FBZ0IsR0FBaEIsRUFBcUIsR0FBRyxDQUFDLFNBQXpCLEVBRkQ7S0FERDs7RUFJQSxHQUFHLENBQUMsS0FBSixHQUFZO0FBSVosU0FBTztBQXZPUzs7OztBQ3JCakIsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGNBQVI7O0FBRUosT0FBTyxDQUFDLFFBQVIsR0FBbUI7RUFDbEIsR0FBQSxFQUFLLEtBRGE7RUFFbEIsS0FBQSxFQUFNLE9BRlk7RUFHbEIsT0FBQSxFQUFRLFNBSFU7RUFJbEIsTUFBQSxFQUFPLFFBSlc7RUFLbEIsSUFBQSxFQUFLLE9BTGE7RUFNbEIsSUFBQSxFQUFLLE1BTmE7RUFPbEIsUUFBQSxFQUFTLENBUFM7RUFRbEIsUUFBQSxFQUFTLElBUlM7OztBQVduQixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQWpCLEdBQXlCLE1BQU0sQ0FBQyxJQUFQLENBQVksT0FBTyxDQUFDLFFBQXBCOztBQUV6QixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQ7QUFDaEIsTUFBQTtFQUFBLEtBQUEsR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQVIsQ0FBdUIsS0FBdkIsRUFBOEIsT0FBTyxDQUFDLFFBQXRDO0VBQ1IsTUFBQSxHQUFhLElBQUEsS0FBQSxDQUNaO0lBQUEsZUFBQSxFQUFnQixPQUFoQjtJQUNBLElBQUEsRUFBSyxRQURMO0lBRUEsV0FBQSxFQUFhLGlCQUZiO0lBR0EsVUFBQSxFQUFZLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUhaO0lBSUEsT0FBQSxFQUFTLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUpUO0dBRFk7RUFNYixNQUFNLENBQUMsV0FBUCxHQUNDO0lBQUEsT0FBQSxFQUFRLENBQVI7SUFDQSxRQUFBLEVBQVMsQ0FEVDtJQUVBLEdBQUEsRUFBSSxDQUZKO0lBR0EsTUFBQSxFQUFPLEVBSFA7O0FBTUQsVUFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQWhCO0FBQUEsU0FDTSxNQUROO01BRUUsSUFBQyxDQUFBLFdBQUQsR0FBZTtNQUNmLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFDWCxJQUFDLENBQUEsUUFBRCxHQUFZO0FBSFI7QUFETixTQUtNLFVBTE47TUFNRSxJQUFDLENBQUEsV0FBRCxHQUFlO01BQ2YsSUFBQyxDQUFBLE9BQUQsR0FBVztNQUNYLElBQUMsQ0FBQSxRQUFELEdBQVk7QUFIUjtBQUxOLFNBU00sZ0JBVE47TUFVRSxJQUFDLENBQUEsV0FBRCxHQUFlO01BQ2YsSUFBQyxDQUFBLE9BQUQsR0FBVztNQUNYLElBQUMsQ0FBQSxRQUFELEdBQVk7QUFIUjtBQVROO01BY0UsSUFBQyxDQUFBLFdBQUQsR0FBZTtNQUNmLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFDWCxJQUFDLENBQUEsUUFBRCxHQUFZO0FBaEJkO0VBa0JBLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxNQUFqQjtJQUNDLEtBQUssQ0FBQyxJQUFOLEdBQWlCLElBQUEsS0FBQSxDQUFNO01BQUEsVUFBQSxFQUFXLE1BQVg7S0FBTjtJQUNqQixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQU0sQ0FBQSxZQUFBLENBQWpCLEdBQWlDLHFEQUZsQztHQUFBLE1BQUE7SUFJQyxNQUFNLENBQUMsV0FBUCxDQUFtQixLQUFLLENBQUMsSUFBekIsRUFKRDs7RUFNQSxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVgsR0FBMEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsR0FBWDtFQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQVgsR0FBa0I7RUFDbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFYLEdBQ0M7SUFBQSxNQUFBLEVBQU8sRUFBUDtJQUNBLEtBQUEsRUFBTSxFQUROO0lBRUEsT0FBQSxFQUFRLElBQUMsQ0FBQSxXQUZUO0lBR0EsR0FBQSxFQUFJLElBQUMsQ0FBQSxPQUhMOztFQUtELEdBQUEsR0FBVSxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQU87SUFBQSxLQUFBLEVBQU0sS0FBTjtJQUFhLElBQUEsRUFBSyxLQUFLLENBQUMsR0FBeEI7SUFBNkIsS0FBQSxFQUFNLE1BQW5DO0lBQTJDLFVBQUEsRUFBVyxRQUF0RDtJQUFnRSxRQUFBLEVBQVMsRUFBekU7SUFBNkUsVUFBQSxFQUFXLE1BQXhGO0lBQWdHLElBQUEsRUFBSyxPQUFyRztHQUFQO0VBQ1YsR0FBRyxDQUFDLFdBQUosR0FDQztJQUFBLGNBQUEsRUFBZSxLQUFLLENBQUMsSUFBckI7SUFDQSxPQUFBLEVBQVEsQ0FBQyxLQUFLLENBQUMsSUFBUCxFQUFhLENBQWIsQ0FEUjs7RUFFRCxLQUFBLEdBQVksSUFBQSxDQUFDLENBQUMsSUFBRixDQUFPO0lBQUEsS0FBQSxFQUFNLE9BQU47SUFBZSxJQUFBLEVBQUssS0FBSyxDQUFDLEtBQTFCO0lBQWlDLEtBQUEsRUFBTSxPQUF2QztJQUFnRCxRQUFBLEVBQVMsRUFBekQ7SUFBNkQsVUFBQSxFQUFXLE1BQXhFO0lBQWdGLElBQUEsRUFBSyxPQUFyRjtHQUFQO0VBQ1osS0FBSyxDQUFDLFdBQU4sR0FDQztJQUFBLFlBQUEsRUFBYSxLQUFLLENBQUMsSUFBbkI7SUFDQSxHQUFBLEVBQUksQ0FBQyxLQUFLLENBQUMsSUFBUCxFQUFhLENBQWIsQ0FESjs7RUFHRCxPQUFBLEdBQWMsSUFBQSxDQUFDLENBQUMsSUFBRixDQUFPO0lBQUEsS0FBQSxFQUFNLE9BQU47SUFBZSxJQUFBLEVBQUssS0FBSyxDQUFDLE9BQTFCO0lBQW1DLEtBQUEsRUFBTSxNQUF6QztJQUFpRCxRQUFBLEVBQVMsRUFBMUQ7SUFBOEQsVUFBQSxFQUFXLE1BQXpFO0lBQWlGLElBQUEsRUFBSyxPQUF0RjtHQUFQO0VBQ2QsT0FBTyxDQUFDLFdBQVIsR0FDQztJQUFBLFlBQUEsRUFBYSxLQUFLLENBQUMsSUFBbkI7SUFDQSxHQUFBLEVBQUksQ0FBQyxLQUFELEVBQVEsQ0FBUixDQURKOztFQUdELElBQUEsR0FBVyxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQU87SUFBQSxLQUFBLEVBQU0sTUFBTjtJQUFjLElBQUEsRUFBSyxLQUFLLENBQUMsSUFBekI7SUFBK0IsS0FBQSxFQUFNLE1BQXJDO0lBQTZDLFFBQUEsRUFBUyxFQUF0RDtJQUEwRCxVQUFBLEVBQVcsTUFBckU7SUFBNkUsSUFBQSxFQUFLLE1BQWxGO0dBQVA7RUFDWCxJQUFJLENBQUMsV0FBTCxHQUNDO0lBQUEsT0FBQSxFQUFRLENBQUMsR0FBRCxFQUFNLENBQU4sQ0FBUjtJQUNBLFdBQUEsRUFBYSxHQURiOztFQUdELENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFBO0VBQ0EsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFSLENBQWUsTUFBZjtFQUdBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CO0VBQ25CLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBakIsR0FBOEI7RUFDOUIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFqQixHQUNDO0lBQUEsQ0FBQSxFQUFFLENBQUY7O0VBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFqQixHQUNJO0lBQUEsUUFBQSxFQUFVLEVBQVY7SUFDQSxPQUFBLEVBQVMsR0FEVDs7RUFHSixNQUFNLENBQUMsRUFBUCxDQUFVLE1BQU0sQ0FBQyxPQUFqQixFQUEwQixTQUFBO0lBQ3pCLElBQUcsTUFBTSxDQUFDLElBQVAsR0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxFQUFYLENBQWpCO01BQ0MsTUFBTSxDQUFDLE9BQVAsQ0FDQztRQUFBLFVBQUEsRUFBWTtVQUFBLElBQUEsRUFBSyxDQUFMO1NBQVo7UUFDQSxJQUFBLEVBQUssR0FETDtRQUVBLEtBQUEsRUFBTSxhQUZOO09BREQ7YUFJQSxLQUFLLENBQUMsS0FBTixDQUFZLEdBQVosRUFBaUIsU0FBQTtlQUNoQixNQUFNLENBQUMsT0FBUCxDQUFBO01BRGdCLENBQWpCLEVBTEQ7O0VBRHlCLENBQTFCO0VBVUEsWUFBQSxHQUFtQixJQUFBLEtBQUEsQ0FBTTtJQUFBLElBQUEsRUFBSyxDQUFMO0lBQVEsSUFBQSxFQUFLLFFBQWI7SUFBdUIsZUFBQSxFQUFnQixTQUF2QztJQUFrRCxPQUFBLEVBQVEsRUFBMUQ7SUFBOEQsVUFBQSxFQUFXLE1BQXpFO0lBQWlGLEtBQUEsRUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQWhHO0lBQXVHLElBQUEsRUFBSyxNQUFNLENBQUMsQ0FBbkg7SUFBc0gsTUFBQSxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBdEk7R0FBTjtFQUNuQixDQUFDLENBQUMsS0FBSyxDQUFDLE1BQVIsQ0FBZSxZQUFmO0VBR0EsSUFBRyxLQUFLLENBQUMsUUFBTixLQUFrQixJQUFyQjtJQUNDLE1BQU0sQ0FBQyxDQUFQLEdBQVcsQ0FBQSxHQUFJLE1BQU0sQ0FBQztJQUN0QixNQUFNLENBQUMsT0FBUCxDQUNDO01BQUEsVUFBQSxFQUFZO1FBQUEsQ0FBQSxFQUFFLENBQUY7T0FBWjtNQUNBLElBQUEsRUFBSyxHQURMO01BRUEsS0FBQSxFQUFNLGtCQUZOO0tBREQsRUFGRDs7RUFRQSxJQUFHLEtBQUssQ0FBQyxRQUFUO0lBQ0MsS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFLLENBQUMsUUFBbEIsRUFBNEIsU0FBQTthQUMzQixNQUFNLENBQUMsT0FBUCxDQUNDO1FBQUEsVUFBQSxFQUFZO1VBQUEsSUFBQSxFQUFLLENBQUw7U0FBWjtRQUNBLElBQUEsRUFBSyxHQURMO1FBRUEsS0FBQSxFQUFNLGFBRk47T0FERDtJQUQyQixDQUE1QjtJQUtBLEtBQUssQ0FBQyxLQUFOLENBQVksS0FBSyxDQUFDLFFBQU4sR0FBaUIsR0FBN0IsRUFBa0MsU0FBQTthQUNqQyxNQUFNLENBQUMsT0FBUCxDQUFBO0lBRGlDLENBQWxDLEVBTkQ7O0VBVUEsTUFBTSxDQUFDLElBQVAsR0FBYyxLQUFLLENBQUM7RUFDcEIsTUFBTSxDQUFDLEdBQVAsR0FBYTtFQUNiLE1BQU0sQ0FBQyxLQUFQLEdBQWU7RUFDZixNQUFNLENBQUMsT0FBUCxHQUFpQjtBQUNqQixTQUFPO0FBbkhTOzs7O0FDZmpCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2pCLGVBQUEsRUFBaUIsU0FEQTtFQUVqQixTQUFBLEVBQVcsU0FGTTtFQUdqQixJQUFBLEVBQU0sTUFIVztFQUlqQixRQUFBLEVBQVUsTUFKTztFQUtqQixNQUFBLEVBQVEsSUFMUztFQU1qQixrQkFBQSxFQUFvQixFQU5IOzs7QUFVbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0FBR2YsTUFBQTtFQUFBLEtBQUEsR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQVIsQ0FBdUIsS0FBdkIsRUFBOEIsT0FBTyxDQUFDLFFBQXRDO0VBR1IsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FDZDtJQUFBLElBQUEsRUFBTSxXQUFOO0lBQ0EsZUFBQSxFQUFnQixDQUFDLENBQUMsS0FBRixDQUFRLEtBQUssQ0FBQyxlQUFkLENBRGhCO0dBRGM7RUFHaEIsQ0FBQTtJQUFBLFdBQUEsRUFBYSxvQkFBYjtJQUNBLFVBQUEsRUFBWSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FEWjtJQUVBLE9BQUEsRUFBUyxDQUFDLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUZWO0dBQUE7RUFHQSxTQUFTLENBQUMsV0FBVixHQUNFO0lBQUEsT0FBQSxFQUFTLENBQVQ7SUFDQSxRQUFBLEVBQVUsQ0FEVjtJQUVBLE1BQUEsRUFBUSxFQUZSO0lBR0EsTUFBQSxFQUFRLEVBSFI7O0VBSUYsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQWEsU0FBYjtFQUdBLGVBQUEsR0FBa0IsU0FBQyxTQUFELEVBQVksS0FBWjtBQUdoQixRQUFBO0lBQUEsU0FBQSxHQUFZLE1BQU0sQ0FBQyxJQUFQLENBQVksU0FBUyxDQUFDLElBQXRCO0lBQ1osY0FBQSxHQUFpQjtBQUVqQjtTQUFBLG1EQUFBOztNQUNFLEdBQUEsR0FBTSxTQUFTLENBQUMsSUFBSyxDQUFBLENBQUE7TUFHckIsSUFBRyxHQUFBLEtBQU8sU0FBUyxDQUFDLFNBQXBCO1FBRUUsY0FBQSxHQUFpQjtRQUNqQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQVQsR0FBbUI7UUFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBckIsR0FBMkI7UUFDM0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFWLEdBQW9CO1FBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQXRCLEdBQTRCLEdBQUcsQ0FBQztRQUVoQyxTQUFTLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BQW5CLENBQ0U7VUFBQSxVQUFBLEVBQVk7WUFBQSxDQUFBLEVBQUUsQ0FBRjtXQUFaO1VBQ0EsSUFBQSxFQUFLLEdBREw7U0FERixFQVJGO09BQUEsTUFBQTtRQWNFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBVCxHQUFtQixLQUFLLENBQUM7UUFDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBckIsR0FBMkI7UUFDM0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFWLEdBQW9CO1FBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQXRCLEdBQTRCO1FBRTVCLElBQUcsY0FBQSxLQUFrQixNQUFyQjtVQUNFLFNBQVMsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBbkIsQ0FDRTtZQUFBLFVBQUEsRUFBWTtjQUFBLENBQUEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsR0FBaUIsQ0FBQyxDQUFwQjthQUFaO1lBQ0EsSUFBQSxFQUFLLEdBREw7WUFFQSxLQUFBLEVBQU0sZ0NBRk47V0FERixFQURGO1NBQUEsTUFBQTtVQU1FLFNBQVMsQ0FBQyxLQUFNLENBQUEsQ0FBQSxDQUFFLENBQUMsT0FBbkIsQ0FDRTtZQUFBLFVBQUEsRUFBWTtjQUFBLENBQUEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVg7YUFBWjtZQUNBLElBQUEsRUFBSyxHQURMO1lBRUEsS0FBQSxFQUFNLGdDQUZOO1dBREYsRUFORjtTQW5CRjs7bUJBOEJBLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBVCxDQUFpQjtRQUFBLElBQUEsRUFBTSxFQUFOO09BQWpCO0FBbENGOztFQU5nQjtFQTJDbEIsU0FBUyxDQUFDLElBQVYsR0FBaUI7RUFDakIsU0FBUyxDQUFDLEtBQVYsR0FBa0I7RUFHbEIsSUFBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQVgsR0FBb0IsQ0FBdkI7QUFDSTtBQUFBLFNBQUEsNkNBQUE7O01BR0UsSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNUO1FBQUEsSUFBQSxFQUFNLE1BQUEsR0FBUyxDQUFmO1FBQ0EsZUFBQSxFQUFpQixhQURqQjtPQURTO01BR1gsSUFBSSxDQUFDLFdBQUwsR0FDRTtRQUFBLE1BQUEsRUFBUSxTQUFSO1FBQ0EsR0FBQSxFQUFLLENBREw7UUFFQSxLQUFBLEVBQU0sQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQWQsQ0FGTjs7TUFHRixJQUFJLENBQUMsVUFBTCxDQUFBO01BR0EsU0FBUyxDQUFDLEtBQU0sQ0FBQSxDQUFBLENBQWhCLEdBQXFCO01BR3JCLElBQUcsQ0FBQSxHQUFJLENBQVA7UUFDRSxJQUFJLENBQUMsQ0FBTCxHQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFEcEI7O01BSUEsR0FBQSxHQUFVLElBQUEsS0FBQSxDQUNSO1FBQUEsS0FBQSxFQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBVCxHQUFlLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBaEM7UUFDQSxNQUFBLEVBQVEsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMLENBRFI7UUFFQSxDQUFBLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsR0FBZSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQTNCLENBQUEsR0FBcUMsQ0FGdkM7UUFHQSxVQUFBLEVBQVksU0FIWjtRQUlBLGVBQUEsRUFBaUIsYUFKakI7UUFLQSxJQUFBLEVBQU0sSUFMTjtRQU1BLElBQUEsRUFBTSxLQUFBLEdBQVEsQ0FOZDtPQURRO01BUVYsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQWEsR0FBYjtNQUdBLFFBQUEsR0FBVyxLQUFLLENBQUMsUUFBUyxDQUFBLENBQUE7TUFDMUIsSUFBQSxHQUFXLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDVDtRQUFBLElBQUEsRUFBTSxRQUFOO1FBQ0EsVUFBQSxFQUFZLEdBRFo7UUFFQSxLQUFBLEVBQU8sS0FBSyxDQUFDLFNBRmI7UUFHQSxXQUFBLEVBQWE7VUFBQyxHQUFBLEVBQUssRUFBTjtTQUhiO09BRFM7TUFLWCxJQUFJLENBQUMsT0FBTCxHQUFlLEtBQUssQ0FBQztNQUNyQixJQUFJLENBQUMsT0FBTCxDQUFBO01BR0EsS0FBQSxHQUFZLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDVjtRQUFBLElBQUEsRUFBTSxDQUFOO1FBQ0EsVUFBQSxFQUFZLEdBRFo7UUFFQSxJQUFBLEVBQU0sQ0FGTjtRQUdBLFFBQUEsRUFBVSxFQUhWO1FBSUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxTQUpiO1FBS0EsV0FBQSxFQUFhO1VBQUMsR0FBQSxFQUFLLEVBQU47U0FMYjtPQURVO01BT1osS0FBSyxDQUFDLE9BQU4sR0FBZ0I7TUFDaEIsS0FBSyxDQUFDLE9BQU4sQ0FBQTtNQUdBLEdBQUcsQ0FBQyxJQUFKLEdBQVc7TUFDWCxHQUFHLENBQUMsS0FBSixHQUFZO01BRVosU0FBUyxDQUFDLElBQUssQ0FBQSxDQUFBLENBQWYsR0FBb0I7TUFFcEIsR0FBRyxDQUFDLEVBQUosQ0FBTyxNQUFNLENBQUMsUUFBZCxFQUF3QixTQUFBO1FBQ3RCLFNBQVMsQ0FBQyxTQUFWLEdBQXNCO2VBQ3RCLGVBQUEsQ0FBZ0IsU0FBaEIsRUFBMkIsSUFBM0I7TUFGc0IsQ0FBeEI7QUF6REYsS0FESjs7RUE4REEsU0FBUyxDQUFDLFNBQVYsR0FBc0IsU0FBUyxDQUFDLElBQUssQ0FBQSxLQUFLLENBQUMsSUFBSyxDQUFBLENBQUEsQ0FBWDtFQUNyQyxlQUFBLENBQWdCLFNBQWhCLEVBQTJCLFNBQVMsQ0FBQyxTQUFyQztBQUVBLFNBQU87QUFwSVE7Ozs7QUNmakIsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGNBQVI7O0FBRUosT0FBTyxDQUFDLFFBQVIsR0FBbUI7RUFDakIsSUFBQSxFQUFLLE1BRFk7RUFFakIsSUFBQSxFQUFLLE1BRlk7RUFHakIsZUFBQSxFQUFnQixPQUhDO0VBSWpCLEtBQUEsRUFBTSxTQUpXO0VBS2pCLElBQUEsRUFBSyxRQUxZO0VBTWpCLFVBQUEsRUFBVyxNQU5NO0VBT2pCLFdBQUEsRUFBWSxNQVBLO0VBUWpCLElBQUEsRUFBSyxNQVJZO0VBU2pCLElBQUEsRUFBSyxJQVRZO0VBVWpCLEdBQUEsRUFBSSxNQVZhOzs7QUFhbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0FBQ2hCLE1BQUE7RUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFSLENBQXVCLEtBQXZCLEVBQThCLE9BQU8sQ0FBQyxRQUF0QztFQUVSLE1BQUEsR0FBYSxJQUFBLEtBQUEsQ0FDWjtJQUFBLElBQUEsRUFBSyxLQUFLLENBQUMsSUFBWDtJQUNBLElBQUEsRUFBSyxLQUFLLENBQUMsSUFEWDtHQURZO0VBSWIsSUFBRyxLQUFLLENBQUMsVUFBVDtJQUNDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBakIsQ0FBNkIsTUFBN0IsRUFERDs7RUFHQSxNQUFNLENBQUMsSUFBUCxHQUFjLEtBQUssQ0FBQztBQUNwQixVQUFPLEtBQUssQ0FBQyxJQUFiO0FBQUEsU0FDTSxVQUROO01BRUUsTUFBTSxDQUFDLFdBQVAsR0FDRTtRQUFBLEtBQUEsRUFBTSxFQUFOO1FBQ0EsTUFBQSxFQUFPLEVBRFA7UUFFQSxNQUFBLEVBQU8sRUFGUDtRQUdBLFFBQUEsRUFBUyxFQUhUOztNQUlGLElBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULEdBQWlCLENBQXBCO1FBQ0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFuQixHQUEyQjtRQUMzQixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQW5CLEdBQTRCLEdBRjdCOztNQUdBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTDtNQUN0QixNQUFNLENBQUMsV0FBUCxHQUFxQjtNQUNyQixNQUFNLENBQUMsT0FBUCxHQUFpQixDQUFDLENBQUMsRUFBRixDQUFLLENBQUw7TUFDakIsTUFBTSxDQUFDLFVBQVAsR0FBb0IsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMO01BQ3BCLE1BQU0sQ0FBQyxlQUFQLEdBQXlCLENBQUMsQ0FBQyxLQUFGLENBQVEsS0FBSyxDQUFDLGVBQWQ7TUFDekIsSUFBRyxPQUFPLEtBQUssQ0FBQyxJQUFiLEtBQXFCLFFBQXhCO1FBQ0MsSUFBQSxHQUFPLENBQUMsQ0FBQyxJQUFGLENBQ047VUFBQSxJQUFBLEVBQUssS0FBSyxDQUFDLElBQVg7VUFDQSxLQUFBLEVBQU0sS0FBSyxDQUFDLEtBRFo7VUFFQSxVQUFBLEVBQVcsTUFGWDtVQUdBLFdBQUEsRUFBWTtZQUFDLEtBQUEsRUFBTSxRQUFQO1dBSFo7U0FETSxFQURSOztNQU9BLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUNDO1FBQUEsTUFBQSxFQUFPLENBQUMsTUFBRCxDQUFQO09BREQ7TUFFQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztRQUFBLE1BQUEsRUFBTyxDQUFDLElBQUQsQ0FBUDtPQUREO0FBdkJJO0FBRE47TUE0QkUsS0FBQSxHQUFZLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDWDtRQUFBLElBQUEsRUFBSyxLQUFLLENBQUMsSUFBWDtRQUNBLFVBQUEsRUFBVyxNQURYO1FBRUEsYUFBQSxFQUFjLFdBRmQ7UUFHQSxLQUFBLEVBQU0sS0FBSyxDQUFDLEtBSFo7UUFJQSxRQUFBLEVBQVMsRUFKVDtRQUtBLFVBQUEsRUFBVyxFQUxYO1FBTUEsVUFBQSxFQUFXLEdBTlg7T0FEVztNQVFaLEtBQUssQ0FBQyxXQUFOLEdBQ0M7UUFBQSxLQUFBLEVBQU0sUUFBTjs7TUFDRCxNQUFNLENBQUMsS0FBUCxHQUNDO1FBQUEsZUFBQSxFQUFnQixDQUFDLENBQUMsS0FBRixDQUFRLEtBQUssQ0FBQyxlQUFkLENBQWhCO1FBQ0EsTUFBQSxFQUFPLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQURQO1FBRUEsS0FBQSxFQUFNLEtBQUssQ0FBQyxLQUFOLEdBQWMsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxFQUFMLENBRnBCO1FBR0EsWUFBQSxFQUFhLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUhiO1FBSUEsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQUpYOztNQU1ELElBQUcsTUFBTSxDQUFDLEtBQVAsR0FBZSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FBbEI7UUFDQyxNQUFNLENBQUMsS0FBUCxHQUFlLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxFQURoQjs7QUFHQSxjQUFPLEtBQUssQ0FBQyxJQUFiO0FBQUEsYUFDTSxRQUROO1VBRUUsTUFBTSxDQUFDLE9BQVAsR0FBaUIsTUFBTSxDQUFDO1VBQ3hCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCO1VBQ3JCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTDtVQUNqQixNQUFNLENBQUMsVUFBUCxHQUFvQixDQUFDLENBQUMsRUFBRixDQUFLLENBQUw7VUFDcEIsVUFBQSxHQUFhLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBdkIsQ0FBK0IsRUFBL0I7VUFDYixNQUFNLENBQUMsRUFBUCxDQUFVLE1BQU0sQ0FBQyxVQUFqQixFQUE2QixTQUFBO21CQUM1QixNQUFNLENBQUMsT0FBUCxDQUNDO2NBQUEsVUFBQSxFQUNDO2dCQUFBLGVBQUEsRUFBZ0IsVUFBaEI7Z0JBQ0EsT0FBQSxFQUFRLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQURSO2dCQUVBLFVBQUEsRUFBVyxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FGWDtlQUREO2FBREQ7VUFENEIsQ0FBN0I7VUFNQSxNQUFNLENBQUMsRUFBUCxDQUFVLE1BQU0sQ0FBQyxRQUFqQixFQUEyQixTQUFBO21CQUMxQixNQUFNLENBQUMsT0FBUCxDQUNDO2NBQUEsVUFBQSxFQUNDO2dCQUFBLGVBQUEsRUFBaUIsTUFBTSxDQUFDLE9BQXhCO2dCQUNBLE9BQUEsRUFBUSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FEUjtnQkFFQSxVQUFBLEVBQVcsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBRlg7ZUFERDthQUREO1VBRDBCLENBQTNCO0FBWkk7QUFETixhQW1CTSxNQW5CTjtVQW9CRSxNQUFNLENBQUMsT0FBUCxHQUFpQixNQUFNLENBQUM7VUFDeEIsVUFBQSxHQUFhLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBdkIsQ0FBOEIsQ0FBOUI7VUFDYixNQUFNLENBQUMsRUFBUCxDQUFVLE1BQU0sQ0FBQyxVQUFqQixFQUE2QixTQUFBO21CQUM1QixNQUFNLENBQUMsT0FBUCxDQUNDO2NBQUEsVUFBQSxFQUNDO2dCQUFBLGVBQUEsRUFBZ0IsVUFBaEI7ZUFERDthQUREO1VBRDRCLENBQTdCO1VBSUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxNQUFNLENBQUMsUUFBakIsRUFBMkIsU0FBQTttQkFDMUIsTUFBTSxDQUFDLE9BQVAsQ0FDQztjQUFBLFVBQUEsRUFDQztnQkFBQSxlQUFBLEVBQWlCLE1BQU0sQ0FBQyxPQUF4QjtlQUREO2FBREQ7VUFEMEIsQ0FBM0I7QUExQkY7TUFnQ0EsSUFBRyxLQUFLLENBQUMsV0FBVDtRQUNDLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLEtBQUssQ0FBQyxZQUQ1Qjs7TUFHQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztRQUFBLE1BQUEsRUFBTyxDQUFDLE1BQUQsRUFBUyxLQUFULENBQVA7T0FERDtBQW5GRjtFQXNGQSxJQUFHLEtBQUssQ0FBQyxHQUFUO0lBQ0MsU0FBQSxHQUFZLEtBQUssQ0FBQztJQUNsQixTQUFTLENBQUMsS0FBVixHQUFrQjtJQUVsQixDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FBYSxTQUFiLEVBSkQ7O0VBS0EsTUFBTSxDQUFDLEtBQVAsR0FBZTtBQUNmLFNBQU87QUF2R1M7Ozs7QUNqQmpCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2xCLEtBQUEsRUFBTSxPQURZO0VBRWxCLFFBQUEsRUFBVSxTQUZRO0VBR2xCLE1BQUEsRUFBUSxHQUhVO0VBSWxCLElBQUEsRUFBSyxNQUphO0VBS2xCLGVBQUEsRUFBZ0IsT0FMRTtFQU1sQixVQUFBLEVBQVcsT0FOTztFQU9sQixXQUFBLEVBQVksT0FQTTtFQVFsQixPQUFBLEVBQVEsTUFSVTtFQVNsQixNQUFBLEVBQVMsTUFUUztFQVVsQixLQUFBLEVBQU8sTUFWVztFQVdsQixXQUFBLEVBQWEsTUFYSztFQVlsQixVQUFBLEVBQVcsTUFaTztFQWFsQixZQUFBLEVBQWMsTUFiSTs7O0FBa0JuQixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQWpCLEdBQXlCLE1BQU0sQ0FBQyxJQUFQLENBQVksT0FBTyxDQUFDLFFBQXBCOztBQUV6QixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQ7QUFDaEIsTUFBQTtFQUFBLEtBQUEsR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQVIsQ0FBdUIsS0FBdkIsRUFBOEIsT0FBTyxDQUFDLFFBQXRDO0VBQ1IsSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNWO0lBQUEsSUFBQSxFQUFLLE1BQUw7SUFDQSxlQUFBLEVBQWdCLENBQUMsQ0FBQyxLQUFGLENBQVEsS0FBSyxDQUFDLGVBQWQsQ0FEaEI7SUFFQSxXQUFBLEVBQWEsb0JBRmI7SUFHQSxVQUFBLEVBQVksQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBSFo7SUFJQSxPQUFBLEVBQVMsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBSlQ7SUFLQSxVQUFBLEVBQVksS0FBSyxDQUFDLFVBTGxCO0lBTUEsWUFBQSxFQUFjLEtBQUssQ0FBQyxZQU5wQjtHQURVO0VBU1gsSUFBSSxDQUFDLFdBQUwsR0FDQztJQUFBLE9BQUEsRUFBUSxFQUFSO0lBQ0EsUUFBQSxFQUFTLEVBRFQ7SUFFQSxHQUFBLEVBQUksQ0FGSjtJQUdBLE1BQUEsRUFBUSxLQUFLLENBQUMsTUFIZDs7RUFNRCxLQUFBLEdBQVksSUFBQSxDQUFDLENBQUMsSUFBRixDQUNYO0lBQUEsVUFBQSxFQUFXLElBQVg7SUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLEtBRFg7SUFFQSxVQUFBLEVBQVcsVUFGWDtJQUdBLFFBQUEsRUFBUyxFQUhUO0lBSUEsSUFBQSxFQUFLLE9BSkw7SUFLQSxVQUFBLEVBQVcsRUFMWDtJQU1BLFdBQUEsRUFDQztNQUFBLEdBQUEsRUFBSSxFQUFKO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxPQUFBLEVBQVEsRUFGUjtLQVBEO0dBRFc7RUFlWixZQUFBLEdBQWU7RUFDZixJQUFHLEtBQUssQ0FBQyxPQUFUO0FBQ0M7QUFBQSxTQUFBLDZDQUFBOztNQUNDLElBQUcsQ0FBQSxLQUFLLENBQVI7UUFDQyxJQUFBLEdBQVcsSUFBQSxDQUFDLENBQUMsSUFBRixDQUNWO1VBQUEsSUFBQSxFQUFLLEdBQUw7VUFDQSxVQUFBLEVBQVcsSUFEWDtVQUVBLFdBQUEsRUFBWTtZQUFDLFFBQUEsRUFBUyxFQUFWO1lBQWMsR0FBQSxFQUFLLEVBQW5CO1dBRlo7VUFHQSxLQUFBLEVBQU0sS0FBSyxDQUFDLFdBSFo7VUFJQSxJQUFBLEVBQUssS0FKTDtTQURVO1FBTVgsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEIsRUFQRDtPQUFBLE1BQUE7UUFTQyxJQUFBLEdBQVcsSUFBQSxDQUFDLENBQUMsSUFBRixDQUNWO1VBQUEsSUFBQSxFQUFLLEdBQUw7VUFDQSxVQUFBLEVBQVcsSUFEWDtVQUVBLFdBQUEsRUFBWTtZQUFDLFFBQUEsRUFBUyxDQUFDLFlBQWEsQ0FBQSxDQUFBLEdBQUksQ0FBSixDQUFkLEVBQXNCLEVBQXRCLENBQVY7WUFBcUMsY0FBQSxFQUFlLEtBQXBEO1dBRlo7VUFHQSxLQUFBLEVBQU0sS0FBSyxDQUFDLFdBSFo7VUFJQSxJQUFBLEVBQUssS0FKTDtTQURVO1FBTVgsWUFBWSxDQUFDLElBQWIsQ0FBa0IsSUFBbEIsRUFmRDs7QUFERDtBQWtCQSxTQUFBLGdEQUFBOztNQUNDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBUixDQUNDO1FBQUEsS0FBQSxFQUFNLEdBQU47UUFDQSxTQUFBLEVBQVUsS0FEVjtRQUVBLEtBQUEsRUFBTSxPQUZOO1FBR0EsT0FBQSxFQUFRLEVBSFI7UUFJQSxLQUFBLEVBQU0sRUFKTjtRQUtBLFVBQUEsRUFBVyxFQUxYO09BREQ7QUFERCxLQW5CRDs7RUErQkEsSUFBRyxLQUFLLENBQUMsS0FBVDtJQUNDLFNBQUEsR0FBZ0IsSUFBQSxLQUFBLENBQ2Q7TUFBQSxVQUFBLEVBQVksSUFBWjtNQUNBLEtBQUEsRUFBTyxLQUFLLENBQUMsS0FEYjtNQUVBLE1BQUEsRUFBUSxLQUFLLENBQUMsV0FGZDtLQURjO0lBS2hCLFNBQVMsQ0FBQyxXQUFWLEdBQ0U7TUFBQSxPQUFBLEVBQVEsQ0FBUjtNQUNBLFFBQUEsRUFBUyxDQURUO01BRUEsR0FBQSxFQUFLLENBQUMsS0FBRCxFQUFRLEVBQVIsQ0FGTDs7SUFHRixDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FDQztNQUFBLEtBQUEsRUFBTSxTQUFOO01BQ0EsU0FBQSxFQUFVLElBRFY7TUFFQSxLQUFBLEVBQU0sT0FGTjtNQUdBLE9BQUEsRUFBUSxFQUhSO01BSUEsS0FBQSxFQUFPLENBSlA7TUFLQSxVQUFBLEVBQVcsRUFMWDtLQUREO0lBT0EsSUFBSSxDQUFDLFdBQVksQ0FBQSxRQUFBLENBQWpCLEdBQTZCLEVBQUEsR0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxLQUFLLENBQUMsTUFBakIsQ0FBTCxHQUFnQyxFQUFoQyxHQUFxQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxTQUFTLENBQUMsTUFBckIsQ0FBckMsR0FBb0UsRUFBcEUsR0FBeUUsR0FqQnZHOztFQW9CQSxJQUFHLEtBQUssQ0FBQyxRQUFOLElBQW1CLENBQUksS0FBSyxDQUFDLEtBQWhDO0lBQ0UsUUFBQSxHQUFlLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDZDtNQUFBLElBQUEsRUFBSyxTQUFMO01BQ0EsVUFBQSxFQUFZLElBRFo7TUFFQSxJQUFBLEVBQUssS0FBSyxDQUFDLFFBRlg7S0FEYztJQUlmLFFBQVEsQ0FBQyxXQUFULEdBQ0M7TUFBQSxHQUFBLEVBQUssQ0FBQyxLQUFELEVBQVEsRUFBUixDQUFMO01BQ0EsT0FBQSxFQUFTLEVBRFQ7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQU5IOztFQVdBLElBQUcsS0FBSyxDQUFDLFFBQU4sSUFBa0IsS0FBSyxDQUFDLEtBQTNCO0lBQ0MsUUFBQSxHQUFlLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDZDtNQUFBLElBQUEsRUFBSyxTQUFMO01BQ0EsVUFBQSxFQUFZLElBRFo7TUFFQSxJQUFBLEVBQUssS0FBSyxDQUFDLFFBRlg7S0FEYztJQUtmLFFBQVEsQ0FBQyxXQUFULEdBQ0M7TUFBQSxHQUFBLEVBQUssQ0FBQyxTQUFELEVBQVksRUFBWixDQUFMO01BQ0EsT0FBQSxFQUFTLEVBRFQ7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQVBGOztFQWlCQSxlQUFBLEdBQWtCO0VBRWxCLElBQUcsS0FBSyxDQUFDLE1BQVQ7SUFDQyxVQUFBLEdBQWlCLElBQUEsS0FBQSxDQUNoQjtNQUFBLElBQUEsRUFBTSxZQUFOO01BQ0EsVUFBQSxFQUFZLElBRFo7TUFFQSxlQUFBLEVBQWlCLGFBRmpCO0tBRGdCO0lBS2pCLFVBQVUsQ0FBQyxXQUFYLEdBQ0M7TUFBQSxNQUFBLEVBQVEsRUFBUjtNQUNBLE1BQUEsRUFBUSxDQURSO01BRUEsT0FBQSxFQUFTLENBRlQ7TUFHQSxRQUFBLEVBQVUsQ0FIVjs7QUFLRDtBQUFBLFNBQUEsZ0RBQUE7O01BQ0MsSUFBRyxDQUFBLEtBQUssQ0FBUjtRQUNDLE1BQUEsR0FBYSxJQUFBLENBQUMsQ0FBQyxNQUFGLENBQ1o7VUFBQSxJQUFBLEVBQU0sTUFBTjtVQUNBLElBQUEsRUFBSyxNQURMO1VBRUEsVUFBQSxFQUFZLFVBRlo7VUFHQSxJQUFBLEVBQU0sS0FBSyxDQUFDLE1BSFo7VUFJQSxlQUFBLEVBQWdCLE9BSmhCO1NBRFk7UUFNYixNQUFNLENBQUMsV0FBUCxHQUFxQjtVQUFDLE1BQUEsRUFBTyxDQUFSO1VBQVcsT0FBQSxFQUFRLEVBQW5COztRQUNyQixlQUFlLENBQUMsSUFBaEIsQ0FBcUIsTUFBckIsRUFSRDtPQUFBLE1BQUE7UUFVQyxNQUFBLEdBQWEsSUFBQSxDQUFDLENBQUMsTUFBRixDQUNaO1VBQUEsSUFBQSxFQUFNLE1BQU47VUFDQSxJQUFBLEVBQUssUUFETDtVQUVBLFVBQUEsRUFBWSxVQUZaO1VBR0EsSUFBQSxFQUFNLEtBQUssQ0FBQyxNQUhaO1VBSUEsZUFBQSxFQUFnQixPQUpoQjtVQUtBLFdBQUEsRUFBWTtZQUFDLFFBQUEsRUFBUyxDQUFDLGVBQWdCLENBQUEsQ0FBQSxHQUFJLENBQUosQ0FBakIsRUFBeUIsRUFBekIsQ0FBVjtXQUxaO1NBRFk7UUFPYixlQUFlLENBQUMsSUFBaEIsQ0FBcUIsTUFBckIsRUFqQkQ7O0FBREQ7QUFvQkEsU0FBQSxtREFBQTs7TUFDQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FDQztRQUFBLEtBQUEsRUFBTyxNQUFQO1FBQ0EsU0FBQSxFQUFVLEtBRFY7UUFFQSxLQUFBLEVBQU0sS0FGTjtRQUdBLE9BQUEsRUFBUSxFQUhSO1FBSUEsS0FBQSxFQUFNLEVBSk47UUFLQSxVQUFBLEVBQVcsRUFMWDtPQUREO01BVUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQUE7QUFYRCxLQWhDRDs7RUFvREEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQUE7RUFHQSxJQUFJLENBQUMsSUFBTCxHQUFZLEtBQUssQ0FBQztFQUlsQixDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVIsQ0FBb0IsS0FBcEI7QUFJQSxTQUFPO0FBbExTOzs7O0FDckJqQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFFSixPQUFPLENBQUMsUUFBUixHQUFtQjtFQUNsQixLQUFBLEVBQU8sT0FEVztFQUVsQixPQUFBLEVBQVEsU0FGVTtFQUdsQixPQUFBLEVBQVEsQ0FBQyxPQUFELEVBQVUsU0FBVixDQUhVOzs7QUFNbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0FBQ2hCLE1BQUE7RUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFSLENBQXVCLEtBQXZCLEVBQThCLE9BQU8sQ0FBQyxRQUF0QztFQUVSLE1BQUEsR0FBYSxJQUFBLEtBQUEsQ0FBTTtJQUFBLGVBQUEsRUFBZ0IsYUFBaEI7SUFBK0IsSUFBQSxFQUFLLFFBQXBDO0dBQU47RUFDYixNQUFNLENBQUMsV0FBUCxHQUNDO0lBQUEsT0FBQSxFQUFRLENBQVI7SUFDQSxRQUFBLEVBQVMsQ0FEVDtJQUVBLEdBQUEsRUFBSSxDQUZKO0lBR0EsTUFBQSxFQUFPLENBSFA7O0VBS0QsT0FBQSxHQUFjLElBQUEsS0FBQSxDQUFNO0lBQUEsZUFBQSxFQUFnQixTQUFoQjtJQUEyQixVQUFBLEVBQVcsTUFBdEM7SUFBOEMsSUFBQSxFQUFLLFNBQW5EO0lBQThELE9BQUEsRUFBUSxFQUF0RTtHQUFOO0VBQ2QsT0FBTyxDQUFDLFdBQVIsR0FDQztJQUFBLE9BQUEsRUFBUSxDQUFSO0lBQ0EsUUFBQSxFQUFTLENBRFQ7SUFFQSxHQUFBLEVBQUksQ0FGSjtJQUdBLE1BQUEsRUFBTyxDQUhQOztFQUtELEtBQUEsR0FBWSxJQUFBLEtBQUEsQ0FDWDtJQUFBLGVBQUEsRUFBZ0IsT0FBaEI7SUFDQSxVQUFBLEVBQVcsTUFEWDtJQUVBLFlBQUEsRUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxDQUFYLENBRmI7SUFHQSxJQUFBLEVBQUssT0FITDtJQUlBLFdBQUEsRUFBWSxnQkFKWjtJQUtBLE9BQUEsRUFBUSxFQUxSO0lBTUEsVUFBQSxFQUFXLEVBTlg7SUFPQSxJQUFBLEVBQUssSUFQTDtHQURXO0VBU1osS0FBSyxDQUFDLFdBQU4sR0FDQztJQUFBLEtBQUEsRUFBTSxRQUFOO0lBQ0EsS0FBQSxFQUFNLEdBRE47SUFFQSxNQUFBLEVBQU8sR0FGUDs7RUFJRCxLQUFBLEdBQVksSUFBQSxDQUFDLENBQUMsSUFBRixDQUNYO0lBQUEsVUFBQSxFQUFXLEtBQVg7SUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLEtBRFg7SUFFQSxVQUFBLEVBQVcsVUFGWDtJQUdBLFFBQUEsRUFBUyxFQUhUO0lBSUEsSUFBQSxFQUFLLE9BSkw7SUFLQSxVQUFBLEVBQVcsRUFMWDtJQU1BLFdBQUEsRUFDQztNQUFBLEdBQUEsRUFBSSxFQUFKO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxPQUFBLEVBQVEsRUFGUjtLQVBEO0dBRFc7RUFZWixPQUFBLEdBQWMsSUFBQSxDQUFDLENBQUMsSUFBRixDQUNiO0lBQUEsVUFBQSxFQUFXLEtBQVg7SUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLE9BRFg7SUFFQSxRQUFBLEVBQVMsRUFGVDtJQUdBLElBQUEsRUFBSyxTQUhMO0lBSUEsVUFBQSxFQUFXLEVBSlg7SUFLQSxXQUFBLEVBQ0M7TUFBQSxHQUFBLEVBQUssQ0FBQyxLQUFELEVBQVEsRUFBUixDQUFMO01BQ0EsT0FBQSxFQUFRLEVBRFI7TUFFQSxLQUFBLEVBQU8sR0FGUDtLQU5EO0dBRGE7RUFXZCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztJQUFBLE1BQUEsRUFBTyxDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLEtBQWxCLEVBQXlCLEtBQXpCLEVBQWdDLE9BQWhDLENBQVA7R0FERDtFQUlBLEtBQUssQ0FBQyxXQUFZLENBQUEsUUFBQSxDQUFsQixHQUE4QixFQUFBLEdBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLE1BQWpCLENBQUwsR0FBZ0MsRUFBaEMsR0FBcUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsT0FBTyxDQUFDLE1BQW5CLENBQXJDLEdBQWtFLEVBQWxFLEdBQXVFO0VBRXJHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUNDO0lBQUEsTUFBQSxFQUFPLENBQUMsT0FBRCxFQUFVLEtBQVYsQ0FBUDtHQUREO0VBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUI7RUFDakIsT0FBQSxHQUFVO0VBQ1YsU0FBQSxHQUFZO0VBQ1osSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7SUFDQyxTQUFBLEdBQVksS0FBSyxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFqQixHQUEwQixLQUFLLENBQUMsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLE9BRHhEOztFQUVBLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFkLEdBQXVCLENBQXZCLElBQTRCLFNBQUEsR0FBWSxFQUEzQztBQUNDO0FBQUEsU0FBQSxxREFBQTs7TUFDQyxNQUFBLEdBQWEsSUFBQSxDQUFDLENBQUMsTUFBRixDQUNaO1FBQUEsVUFBQSxFQUFXLEtBQVg7UUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLE9BQVEsQ0FBQSxLQUFBLENBRG5CO1FBRUEsS0FBQSxFQUFNLE1BRk47T0FEWTtNQUliLElBQUcsS0FBQSxLQUFTLENBQVo7UUFDQyxNQUFNLENBQUMsV0FBUCxHQUFxQjtVQUFDLE1BQUEsRUFBTyxDQUFSO1VBQVcsUUFBQSxFQUFTLENBQXBCO1VBRHRCO09BQUEsTUFBQTtRQUdDLE1BQU0sQ0FBQyxXQUFQLEdBQXFCO1VBQUMsTUFBQSxFQUFPLENBQVI7VUFBVyxRQUFBLEVBQVMsQ0FBQyxPQUFRLENBQUEsS0FBQSxHQUFRLENBQVIsQ0FBVCxFQUFxQixDQUFyQixDQUFwQjtVQUh0Qjs7TUFJQSxNQUFNLENBQUMsT0FBUSxDQUFBLEtBQUssQ0FBQyxPQUFRLENBQUEsS0FBQSxDQUFkLENBQWYsR0FBdUM7TUFDdkMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiO01BQ0EsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQ0M7UUFBQSxNQUFBLEVBQU8sTUFBUDtPQUREO0FBWEQsS0FERDtHQUFBLE1BQUE7SUFlQyxLQUFLLENBQUMsV0FBWSxDQUFBLFFBQUEsQ0FBbEIsR0FBOEIsRUFBQSxHQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEtBQUssQ0FBQyxNQUFqQixDQUFMLEdBQWdDLEVBQWhDLEdBQXFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLE9BQU8sQ0FBQyxNQUFuQixDQUFyQyxHQUFrRSxFQUFsRSxHQUF1RSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBZCxHQUF1QixFQUF4QjtJQUNyRyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztNQUFBLE1BQUEsRUFBTyxLQUFQO0tBREQ7SUFFQSxZQUFBLEdBQWU7SUFDZixhQUFBLEdBQWdCO0FBQ2hCO0FBQUEsU0FBQSx3REFBQTs7TUFDQyxNQUFBLEdBQWEsSUFBQSxDQUFDLENBQUMsTUFBRixDQUNaO1FBQUEsVUFBQSxFQUFXLEtBQVg7UUFDQSxJQUFBLEVBQUssS0FBSyxDQUFDLE9BQVEsQ0FBQSxLQUFBLENBRG5CO1FBRUEsS0FBQSxFQUFNLE1BRk47T0FEWTtNQUliLElBQUcsS0FBQSxLQUFTLENBQVo7UUFDQyxNQUFNLENBQUMsV0FBUCxHQUFxQjtVQUFDLEdBQUEsRUFBSSxDQUFDLE9BQUQsRUFBVSxFQUFWLENBQUw7VUFBb0IsUUFBQSxFQUFTLENBQTdCO1VBRHRCO09BQUEsTUFBQTtRQUdDLE1BQU0sQ0FBQyxXQUFQLEdBQXFCO1VBQUMsUUFBQSxFQUFTLENBQVY7VUFBYSxHQUFBLEVBQUksT0FBUSxDQUFBLEtBQUEsR0FBUSxDQUFSLENBQXpCO1VBSHRCOztNQUlBLE1BQU0sQ0FBQyxPQUFRLENBQUEsS0FBSyxDQUFDLE9BQVEsQ0FBQSxLQUFBLENBQWQsQ0FBZixHQUF1QztNQUN2QyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWI7TUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztRQUFBLE1BQUEsRUFBTyxNQUFQO09BREQ7TUFHQSxJQUFHLFlBQUEsR0FBZSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQS9CO1FBQ0MsWUFBQSxHQUFlLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDNUIsYUFBQSxHQUFnQixNQUFNLENBQUMsTUFGeEI7O0FBZEQ7QUFrQkEsU0FBQSwyQ0FBQTs7TUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFoQixHQUE0QjtNQUM1QixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQVYsR0FBa0I7TUFDbEIsR0FBRyxDQUFDLEtBQUosR0FBWTtNQUNaLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUNDO1FBQUEsTUFBQSxFQUFPLENBQUMsR0FBRCxFQUFNLEdBQUcsQ0FBQyxLQUFWLENBQVA7T0FERDtBQUpELEtBdENEOztFQThDQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtFQUNqQixNQUFNLENBQUMsS0FBUCxHQUFlO0VBQ2YsTUFBTSxDQUFDLEtBQVAsR0FBZTtFQUNmLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0FBRWpCLFNBQU87QUF0SFM7Ozs7QUNYakIsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGNBQVI7O0FBRUosT0FBTyxDQUFDLFFBQVIsR0FBbUI7RUFDakIsSUFBQSxFQUFNLE1BRFc7RUFFakIsS0FBQSxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FGQztFQUdqQixLQUFBLEVBQU8sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxPQUFSLENBSFU7RUFJakIsVUFBQSxFQUFZLE1BSks7RUFLakIsV0FBQSxFQUFhLE1BTEk7RUFNakIsSUFBQSxFQUFLLElBTlk7OztBQVNuQixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQWpCLEdBQXlCLE1BQU0sQ0FBQyxJQUFQLENBQVksT0FBTyxDQUFDLFFBQXBCOztBQUV6QixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQ7QUFDZixNQUFBO0VBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBUixDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQUMsUUFBdEM7RUFDUixJQUFHLE9BQU8sS0FBSyxDQUFDLElBQWIsS0FBcUIsUUFBeEI7SUFDRSxTQUFBLEdBQWdCLElBQUEsS0FBQSxDQUNkO01BQUEsSUFBQSxFQUFLLGtDQUFBLEdBQW1DLEtBQUssQ0FBQyxJQUF6QyxHQUE4QyxNQUFuRDtNQUNBLEtBQUEsRUFBTSxDQUFDLENBQUMsS0FBRixDQUFRLEtBQUssQ0FBQyxLQUFkLENBRE47TUFFQSxlQUFBLEVBQWdCLGFBRmhCO01BR0EsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQUhYO01BSUEsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQUpYO01BS0EsVUFBQSxFQUFXLEtBQUssQ0FBQyxVQUxqQjtLQURjO0lBUWhCLFlBQUEsR0FBZTtJQUNmLFVBQUEsR0FBYTtBQUViLFlBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFoQjtBQUFBLFdBQ08sQ0FEUDtRQUVJLFVBQUEsR0FBYSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FBQSxHQUFXO1FBQ3hCLFlBQUEsR0FBZSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FBQSxHQUFVO0FBRnRCO0FBRFAsV0FJTyxDQUpQO1FBS0ksVUFBQSxHQUFhLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQUFBLEdBQVc7UUFDeEIsWUFBQSxHQUFlLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBTCxDQUFBLEdBQVU7QUFGdEI7QUFKUCxXQU9PLENBUFA7UUFRSSxVQUFBLEdBQWEsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBQUEsR0FBVTtRQUN2QixZQUFBLEdBQWUsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBQUEsR0FBVTtBQUZ0QjtBQVBQLFdBVU8sQ0FWUDtRQVdJLFVBQUEsR0FBYSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FBQSxHQUFXO1FBQ3hCLFlBQUEsR0FBZSxDQUFDLENBQUMsRUFBRixDQUFLLENBQUwsQ0FBQSxHQUFVO0FBWjdCO0lBZUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBUixDQUFxQixTQUFyQjtJQUNSLFNBQVMsQ0FBQyxJQUFWLEdBQWlCLENBQUEsd0NBQUEsR0FBeUMsS0FBSyxDQUFDLEtBQS9DLEdBQXFELDBCQUFyRCxDQUFBLEdBQWlGLFNBQVMsQ0FBQztJQUM1RyxTQUFTLENBQUMsS0FBVixHQUFrQixDQUFDLENBQUMsRUFBRixDQUFLLEVBQUw7SUFDbEIsU0FBUyxDQUFDLE1BQVYsR0FBbUIsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxLQUFLLENBQUMsTUFBWDtJQUVuQixTQUFTLENBQUMsS0FBVixHQUNFO01BQUEsU0FBQSxFQUFZLGNBQVo7TUFDQSxhQUFBLEVBQWdCLFVBRGhCO01BRUEsZUFBQSxFQUFrQixZQUZsQjtNQUdBLFlBQUEsRUFBZSxRQUhmOztJQUlGLElBQUcsS0FBSyxDQUFDLFdBQVQ7TUFDRSxTQUFTLENBQUMsV0FBVixHQUF3QixLQUFLLENBQUM7TUFDOUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQ0U7UUFBQSxNQUFBLEVBQU8sU0FBUDtPQURGLEVBRkY7O0FBS0EsV0FBTyxVQTFDVDtHQUFBLE1BQUE7SUE0Q0UsU0FBQSxHQUFZLEtBQUssQ0FBQztBQUNsQixXQUFPLFVBN0NUOztBQUZlOzs7O0FDWGpCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2xCLFVBQUEsRUFBWTtJQUNYLE1BQUEsRUFBTyxNQURJO0lBRVgsV0FBQSxFQUFhLE1BRkY7SUFHWCxLQUFBLEVBQVEsYUFIRztJQUlYLFlBQUEsRUFBYyxNQUpIO0lBS1gsSUFBQSxFQUFLLENBTE07SUFNWCxLQUFBLEVBQU0sQ0FOSztJQU9YLE1BQUEsRUFBTyxNQVBJO0lBUVgsVUFBQSxFQUFXLE1BUkE7SUFTWCxPQUFBLEVBQVEsTUFURztJQVVYLE9BQUEsRUFBUSxLQVZHO0lBV1gsTUFBQSxFQUFPLEtBWEk7R0FETTs7O0FBZ0JuQixNQUFBLEdBQVMsU0FBQyxLQUFEO0FBQ1IsTUFBQTtFQUFBLEtBQUEsR0FBUTtFQUNSLFlBQUEsR0FBZTtFQUNmLFNBQUEsR0FBWTtFQUNaLElBQUcsS0FBSDtBQUNDO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFHLEtBQU0sQ0FBQSxDQUFBLENBQVQ7UUFDQyxLQUFNLENBQUEsQ0FBQSxDQUFOLEdBQVcsS0FBTSxDQUFBLENBQUEsRUFEbEI7T0FBQSxNQUFBO1FBR0MsS0FBTSxDQUFBLENBQUEsQ0FBTixHQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVyxDQUFBLENBQUEsRUFIeEM7O0FBREQsS0FERDs7RUFPQSxJQUFHLEtBQUssQ0FBQyxNQUFUO0lBQ0MsSUFBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQWhCO01BQ0MsWUFBQSxHQUFlLEtBQUssQ0FBQyxPQUR0QjtLQUFBLE1BQUE7TUFHQyxZQUFZLENBQUMsSUFBYixDQUFrQixLQUFLLENBQUMsTUFBeEIsRUFIRDtLQUREO0dBQUEsTUFBQTtJQU1DLFlBQUEsR0FBZSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BTnRDOztFQVFBLElBQUcsS0FBSyxDQUFDLE1BQVQ7SUFDQyxJQUFHLEtBQUssQ0FBQyxXQUFUO0FBQ0M7QUFBQSxXQUFBLHdDQUFBOztRQUNDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBWSxDQUFBLGFBQUEsQ0FBekIsR0FBMEMsS0FBSyxDQUFDLFdBQVksQ0FBQSxhQUFBO0FBRDdELE9BREQ7S0FERDs7QUFPQSxPQUFBLGdFQUFBOztJQUNDLEtBQUssQ0FBQyxrQkFBTixHQUEyQjtJQUMzQixJQUFHLEtBQUssQ0FBQyxXQUFUO01BRUMsS0FBQSxHQUFRO01BQ1IsS0FBSyxDQUFDLFVBQU4sR0FBbUI7TUFFbkIsSUFBRyxLQUFLLENBQUMsVUFBVDtRQUNDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBakIsR0FBMEIsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUMzQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQWpCLEdBQXlCLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFGM0M7T0FBQSxNQUFBO1FBSUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFqQixHQUEwQixDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25DLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBakIsR0FBeUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUxuQzs7TUFPQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBbEIsS0FBNkIsTUFBN0IsSUFBMEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFsQixLQUE4QixNQUEzRTtRQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBbEIsR0FBOEIsR0FEL0I7O01BR0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQWxCLEtBQXlCLE1BQXpCLElBQXNDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBbEIsS0FBNEIsTUFBckU7UUFDQyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQWxCLEdBQStCLEdBRGhDOztNQUlBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFsQixLQUEyQixNQUE5QjtRQUNDLEtBQUssQ0FBQyxLQUFOLEdBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUE3QixFQURmO09BQUEsTUFBQTtRQUdDLEtBQUssQ0FBQyxLQUFOLEdBQWMsS0FBSyxDQUFDLE1BSHJCOztNQUtBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFsQixLQUE0QixNQUEvQjtRQUNDLEtBQUssQ0FBQyxNQUFOLEdBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUE3QixFQURoQjtPQUFBLE1BQUE7UUFHQyxLQUFLLENBQUMsTUFBTixHQUFlLEtBQUssQ0FBQyxPQUh0Qjs7TUFPQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBbEIsS0FBa0MsTUFBckM7UUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQWxELEtBQXVELE1BQTFEO1VBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBbEQsR0FBc0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFEdEY7O1FBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUw3RDs7TUFPQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBbEIsS0FBbUMsTUFBdEM7UUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQW5ELEtBQXdELE1BQTNEO1VBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBbkQsR0FBdUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFEeEY7O1FBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFuRCxHQUF1RCxLQUFLLENBQUMsS0FBN0QsR0FBcUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsTUFMbkk7O01BT0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQWxCLEtBQThCLE1BQWpDO1FBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUE5QyxLQUFtRCxNQUF0RDtVQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQTlDLEdBQWtELEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBRDlFOztRQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFMekQ7O01BT0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQWxCLEtBQWlDLE1BQXBDO1FBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFqRCxLQUFzRCxNQUF6RDtVQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQWpELEdBQXFELEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBRHBGOztRQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBakQsR0FBcUQsS0FBSyxDQUFDLE1BQTNELEdBQW9FLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLE9BTGhJOztNQVNBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFsQixLQUE2QixNQUFoQztRQUVDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFsQixLQUE2QixRQUFBLENBQVMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUEzQixFQUFvQyxFQUFwQyxDQUFoQztVQUNDLEtBQUssQ0FBQyxDQUFOLEdBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUE3QixFQURYO1NBQUEsTUFBQTtVQUlDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBMUIsS0FBb0MsTUFBdkM7WUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQTdDLEtBQWtELE1BQXJEO2NBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBN0MsR0FBaUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFENUU7O1lBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUE3QyxHQUFpRCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUx6RztXQUFBLE1BQUE7WUFVQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBUSxDQUFBLENBQUEsQ0FBRSxDQUFDLGtCQUFrQixDQUFDLENBQWhELEtBQXFELE1BQXhEO2NBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBaEQsR0FBb0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFRLENBQUEsQ0FBQSxDQUFFLENBQUMsRUFEbEY7O1lBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFoRCxHQUFvRCxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFwRyxHQUE0RyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQXJDLEVBYnZIO1dBSkQ7U0FGRDs7TUFzQkEsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQWxCLEtBQStCLE1BQWxDO1FBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBNUIsR0FBcUMsS0FBSyxDQUFDLEVBRDVDOztNQUdBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFsQixLQUE4QixNQUFqQztRQUVDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFsQixLQUE4QixRQUFBLENBQVMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUEzQixFQUFxQyxFQUFyQyxDQUFqQztVQUNDLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFqQixHQUF5QixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQTdCLENBQXpCLEdBQWtFLEtBQUssQ0FBQyxNQURuRjtTQUFBLE1BQUE7VUFLQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQTNCLEtBQXFDLE1BQXhDO1lBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUE5QyxLQUFtRCxNQUF0RDtjQUVDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQTlDLEdBQWtELEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBRjlFOztZQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBOUMsR0FBa0QsS0FBSyxDQUFDLE1BTG5FO1dBQUEsTUFBQTtZQVNDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBakQsS0FBc0QsTUFBekQ7Y0FDQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFqRCxHQUFxRCxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxFQURwRjs7WUFHQSxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRSxDQUFDLGtCQUFrQixDQUFDLENBQWpELEdBQXFELENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBdEMsQ0FBckQsR0FBaUcsS0FBSyxDQUFDLE1BWmxIO1dBTEQ7U0FGRDs7TUFzQkEsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQWxCLEtBQStCLE1BQWxDO1FBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsbUJBQTVCLEdBQWtELEtBQUssQ0FBQztRQUd4RCxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxLQUFOLEdBQWMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsbUJBQTVCLEdBQWtELEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQTlFLEdBQXVGLEtBQUssQ0FBQyxNQUw1Rzs7TUFPQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBbEIsS0FBeUIsTUFBNUI7UUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBbEIsS0FBeUIsUUFBQSxDQUFTLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBM0IsRUFBZ0MsRUFBaEMsQ0FBNUI7VUFDQyxLQUFLLENBQUMsQ0FBTixHQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBN0IsRUFEWDtTQUFBLE1BQUE7VUFNQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQXRCLEtBQWdDLE1BQW5DO1lBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUF6QyxLQUE4QyxNQUFqRDtjQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQXpDLEdBQTZDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBRHBFOztZQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBekMsR0FBNkMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsT0FMakc7V0FBQSxNQUFBO1lBVUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUksQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUE1QyxLQUFpRCxNQUFwRDtjQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBSSxDQUFBLENBQUEsQ0FBRSxDQUFDLGtCQUFrQixDQUFDLENBQTVDLEdBQWdELEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBSSxDQUFBLENBQUEsQ0FBRSxDQUFDLEVBRDFFOztZQUdBLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFJLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBNUMsR0FBZ0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFJLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsTUFBNUYsR0FBcUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFJLENBQUEsQ0FBQSxDQUFqQyxFQWJoSDtXQU5EO1NBRkQ7O01Bd0JBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFsQixLQUFnQyxNQUFuQztRQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQTdCLEdBQXNDLEtBQUssQ0FBQyxFQUQ3Qzs7TUFJQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBbEIsS0FBNEIsTUFBL0I7UUFFQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBbEIsS0FBNEIsUUFBQSxDQUFTLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBM0IsRUFBbUMsRUFBbkMsQ0FBL0I7VUFDQyxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBakIsR0FBMEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUE3QixDQUExQixHQUFpRSxLQUFLLENBQUMsT0FEbEY7U0FBQSxNQUFBO1VBS0MsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUF6QixLQUFtQyxNQUF0QztZQUVDLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBNUMsS0FBaUQsTUFBcEQ7Y0FDQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUE1QyxHQUFnRCxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUQxRTs7WUFHQSxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQTVDLEdBQWdELEtBQUssQ0FBQyxPQUxqRTtXQUFBLE1BQUE7WUFVQyxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTyxDQUFBLENBQUEsQ0FBRSxDQUFDLGtCQUFrQixDQUFDLENBQS9DLEtBQW9ELE1BQXZEO2NBQ0MsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBL0MsR0FBbUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFPLENBQUEsQ0FBQSxDQUFFLENBQUMsRUFEaEY7O1lBR0EsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU8sQ0FBQSxDQUFBLENBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUEvQyxHQUFvRCxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU8sQ0FBQSxDQUFBLENBQXBDLENBQXBELEdBQThGLEtBQUssQ0FBQyxPQWIvRztXQUxEO1NBRkQ7O01BdUJBLElBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFsQixLQUFnQyxNQUFuQztRQUNDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLG1CQUE3QixHQUFtRCxLQUFLLENBQUM7UUFFekQsS0FBSyxDQUFDLE1BQU4sR0FBZSxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxtQkFBN0IsR0FBbUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsTUFBaEYsR0FBeUYsS0FBSyxDQUFDO1FBQzlHLEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FKeEM7O01BUUEsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWxCLEtBQTJCLE1BQTlCO1FBRUMsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWxCLEtBQTJCLFlBQTlCO1VBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQWpCLEdBQXlCLENBQXpCLEdBQTZCLEtBQUssQ0FBQyxLQUFOLEdBQWMsRUFEdEQ7O1FBR0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWxCLEtBQTJCLFVBQTlCO1VBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWpCLEdBQTBCLENBQTFCLEdBQThCLEtBQUssQ0FBQyxNQUFOLEdBQWUsRUFEeEQ7O1FBR0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWxCLEtBQTJCLFFBQTlCO1VBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQWpCLEdBQXlCLENBQXpCLEdBQTZCLEtBQUssQ0FBQyxLQUFOLEdBQWM7VUFDckQsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWpCLEdBQTBCLENBQTFCLEdBQThCLEtBQUssQ0FBQyxNQUFOLEdBQWUsRUFGeEQ7U0FSRDs7TUFjQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQWxCLEtBQXNDLE1BQXpDO1FBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQXRELEdBQTBELENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUF0RCxHQUE4RCxLQUFLLENBQUMsS0FBckUsQ0FBQSxHQUE4RSxFQURuSjs7TUFHQSxJQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBbEIsS0FBb0MsTUFBdkM7UUFDQyxLQUFLLENBQUMsQ0FBTixHQUFVLEtBQUssQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQXBELEdBQXdELENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsTUFBcEQsR0FBNkQsS0FBSyxDQUFDLE1BQXBFLENBQUEsR0FBOEUsRUFEako7O01BR0EsSUFBRyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQWxCLEtBQTRCLE1BQS9CO1FBQ0MsS0FBSyxDQUFDLENBQU4sR0FBVSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUE1QyxHQUFnRCxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEtBQTVDLEdBQW9ELEtBQUssQ0FBQyxLQUEzRCxDQUFBLEdBQW9FO1FBQzlILEtBQUssQ0FBQyxDQUFOLEdBQVUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBNUMsR0FBZ0QsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUE1QyxHQUFxRCxLQUFLLENBQUMsTUFBNUQsQ0FBQSxHQUFzRSxFQUZqSTs7TUFJQSxLQUFLLENBQUMsa0JBQU4sR0FBMkIsTUF0TTVCO0tBQUEsTUFBQTtNQXdNQyxLQUFLLENBQUMsa0JBQU4sR0FBMkIsS0FBSyxDQUFDLE1BeE1sQzs7SUEwTUEsU0FBUyxDQUFDLElBQVYsQ0FBZSxLQUFmO0FBNU1EO0FBK01BLFNBQU87QUF6T0M7O0FBMk9ULE9BQU8sQ0FBQyxHQUFSLEdBQWMsU0FBQyxLQUFEO0FBQ2IsTUFBQTtFQUFBLEtBQUEsR0FBUTtFQUNSLEtBQUEsR0FBUTtFQUNSLElBQUcsS0FBSDtBQUNDO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFHLEtBQU0sQ0FBQSxDQUFBLENBQVQ7UUFDQyxLQUFNLENBQUEsQ0FBQSxDQUFOLEdBQVcsS0FBTSxDQUFBLENBQUEsRUFEbEI7T0FBQSxNQUFBO1FBR0MsS0FBTSxDQUFBLENBQUEsQ0FBTixHQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVyxDQUFBLENBQUEsRUFIeEM7O0FBREQsS0FERDs7RUFPQSxTQUFBLEdBQVksTUFBQSxDQUFPLEtBQVA7QUFFWjtPQUFBLDZEQUFBOzs7O0FBQ0M7QUFBQTtXQUFBLHdDQUFBOztzQkFDQyxLQUFNLENBQUEsR0FBQSxDQUFOLEdBQWEsS0FBSyxDQUFDLGtCQUFtQixDQUFBLEdBQUE7QUFEdkM7OztBQUREOztBQVphOztBQWdCZCxPQUFPLENBQUMsT0FBUixHQUFrQixTQUFDLEtBQUQ7QUFDakIsTUFBQTtFQUFBLEtBQUEsR0FBUTtFQUNSLEtBQUEsR0FBUTtFQUNSLElBQUcsS0FBSDtBQUNDO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxJQUFHLEtBQU0sQ0FBQSxDQUFBLENBQVQ7UUFDQyxLQUFNLENBQUEsQ0FBQSxDQUFOLEdBQVcsS0FBTSxDQUFBLENBQUEsRUFEbEI7T0FBQSxNQUFBO1FBR0MsS0FBTSxDQUFBLENBQUEsQ0FBTixHQUFXLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVyxDQUFBLENBQUEsRUFIeEM7O0FBREQsS0FERDs7RUFPQSxTQUFBLEdBQVksTUFBQSxDQUFPLEtBQVA7QUFFWjtPQUFBLDZEQUFBOztJQUVDLEtBQUEsR0FBUSxLQUFLLENBQUM7SUFDZCxJQUFHLEtBQUssQ0FBQyxPQUFUO01BQ0MsSUFBQSxHQUFPLEtBQUssQ0FBQztNQUNiLEtBQUEsR0FBUSxDQUFFLEtBQUQsR0FBVSxJQUFYLENBQUEsR0FBbUIsTUFGNUI7O0lBSUEsSUFBRyxLQUFLLENBQUMsT0FBVDtNQUNDLElBQUcsS0FBQSxLQUFTLEtBQUssQ0FBQyxPQUFsQjtRQUNDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUF6QixHQUFtQyxFQURwQztPQUREOztJQUlBLElBQUcsS0FBSyxDQUFDLE1BQVQ7TUFDQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBekIsR0FBbUMsRUFEcEM7O0lBR0EsS0FBSyxDQUFDLE9BQU4sQ0FDQztNQUFBLFVBQUEsRUFBVyxLQUFLLENBQUMsa0JBQWpCO01BQ0EsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQURYO01BRUEsS0FBQSxFQUFNLEtBRk47TUFHQSxLQUFBLEVBQU0sS0FBSyxDQUFDLEtBSFo7TUFJQSxNQUFBLEVBQU8sS0FBSyxDQUFDLE1BSmI7TUFLQSxVQUFBLEVBQVcsS0FBSyxDQUFDLFVBTGpCO01BTUEsWUFBQSxFQUFhLEtBQUssQ0FBQyxZQU5uQjtLQUREO2lCQVNBLEtBQUssQ0FBQyxrQkFBTixHQUEyQjtBQXZCNUI7O0FBWmlCOzs7O0FDL1FsQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFHSixLQUFBLEdBQVEsSUFBSTs7QUFDWixPQUFPLENBQUMsVUFBUixHQUFxQixNQUFNLENBQUMsSUFBUCxDQUFZLEtBQUssQ0FBQyxLQUFsQjs7QUFDckIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFuQixDQUF3QixZQUF4Qjs7QUFDQSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQW5CLENBQXdCLGFBQXhCOztBQUNBLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBSyxDQUFDLEtBQWxCOztBQUN0QixLQUFLLENBQUMsT0FBTixDQUFBOztBQUVBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCO0VBQ2hCLElBQUEsRUFBSyxxbkJBRFc7RUFZaEIsSUFBQSxFQUFLLHN2QkFaVztFQWtCaEIsUUFBQSxFQUFTLCtoQkFsQk87RUEyQmhCLFdBQUEsRUFBYyxvYUEzQkU7RUFpQ2hCLFFBQUEsRUFBVztJQUNWLFVBQUEsRUFBWSxvekJBREY7SUFhVixXQUFBLEVBQWEsbytCQWJIO0lBNkJWLGdCQUFBLEVBQW1CLDQrQkE3QlQ7SUE2Q1YsTUFBQSxFQUFTLCt6QkE3Q0M7SUF5RFYsVUFBQSxFQUFhLCswQkF6REg7R0FqQ0s7RUF1R2hCLElBQUEsRUFBSyxvekJBdkdXO0VBcUhoQixVQUFBLEVBQVksa1lBckhJO0VBNEhoQixRQUFBLEVBQVUsd2pIQTVITTtFQTRKaEIsT0FBQSxFQUFTLG8rRUE1Sk87RUFtTGhCLE9BQUEsRUFBVSxpb0JBbkxNO0VBK0xoQixLQUFBLEVBQVEsc3JFQS9MUTtFQTZNaEIsUUFBQSxFQUFRO0lBQ1AsRUFBQSxFQUFLLDQyREFERTtJQWVQLEdBQUEsRUFBTSxveEVBZkM7R0E3TVE7RUEyT2hCLElBQUEsRUFBUSx3cEVBM09RO0VBZ1FoQixLQUFBLEVBQU8sMm1DQWhRUztFQWlSaEIsUUFBQSxFQUFVLDZnQ0FqUk07RUFrU2hCLFFBQUEsRUFBVywreEVBbFNLO0VBa1RoQixRQUFBLEVBQ0M7SUFBQSxVQUFBLEVBQWEscWlFQUFiO0lBc0JBLFdBQUEsRUFBYywraUVBdEJkO0lBNENBLGdCQUFBLEVBQW1CLG1qRUE1Q25CO0dBblRlO0VBcVhoQixPQUFBLEVBQ0MsKzlDQXRYZTtFQXVZaEIsS0FBQSxFQUFRO0lBQ1AsRUFBQSxFQUFLLDZvQ0FERTtJQWVQLEdBQUEsRUFBTSwybURBZkM7R0F2WVE7RUFxYWhCLE9BQUEsRUFBUyxtaUVBcmFPO0VBd2JoQixPQUFBLEVBQVMsNDhEQXhiTztFQW1kaEIsTUFBQSxFQUFRLHFpRkFuZFE7OztBQW1makIsT0FBTyxDQUFDLFlBQVIsR0FDQztFQUFBLEdBQUEsRUFBSSxDQUFKO0VBQ0EsR0FBQSxFQUFJLENBREo7RUFFQSxHQUFBLEVBQUksQ0FGSjtFQUdBLElBQUEsRUFBSyxDQUhMO0VBSUEsSUFBQSxFQUFLLENBSkw7RUFLQSxJQUFBLEVBQUssQ0FMTDtFQU1BLElBQUEsRUFBSyxDQU5MOzs7QUFTRCxPQUFPLENBQUMsV0FBUixHQUNDO0VBQUEsR0FBQSxFQUNDO0lBQUEsR0FBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFFBQUw7TUFDQSxLQUFBLEVBQU0sR0FETjtNQUVBLE1BQUEsRUFBTyxHQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtHQUREO0VBTUEsR0FBQSxFQUNDO0lBQUEsR0FBQSxFQUNDO01BQUEsSUFBQSxFQUFLLGFBQUw7TUFDQSxLQUFBLEVBQU0sR0FETjtNQUVBLE1BQUEsRUFBTyxHQUZQO01BR0EsS0FBQSxFQUFNLEdBSE47S0FERDtHQVBEO0VBYUEsR0FBQSxFQUNDO0lBQUEsR0FBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFVBQUw7TUFDQSxLQUFBLEVBQU0sR0FETjtNQUVBLE1BQUEsRUFBTyxHQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtJQUtBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxVQUFMO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBTkQ7R0FkRDtFQXdCQSxHQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssT0FBTDtNQUNBLEtBQUEsRUFBTSxHQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0dBekJEO0VBOEJBLEdBQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxVQUFMO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7SUFLQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssVUFBTDtNQUNBLEtBQUEsRUFBTSxHQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQU5EO0dBL0JEO0VBeUNBLEdBQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxNQUFMO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7SUFLQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssU0FBTDtNQUNBLEtBQUEsRUFBTSxHQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQU5EO0dBMUNEO0VBb0RBLEdBQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxTQUFMO01BQ0EsS0FBQSxFQUFNLEdBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7R0FyREQ7RUEwREEsSUFBQSxFQUNDO0lBQUEsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFFBQUw7TUFDQSxLQUFBLEVBQU0sSUFETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtHQTNERDtFQWdFQSxJQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssU0FBTDtNQUNBLEtBQUEsRUFBTSxJQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0dBakVEO0VBc0VBLElBQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxlQUFMO01BQ0EsS0FBQSxFQUFNLElBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7R0F2RUQ7RUE0RUEsSUFBQSxFQUNDO0lBQUEsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFNBQUw7TUFDQSxLQUFBLEVBQU0sSUFETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtHQTdFRDtFQWtGQSxJQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssU0FBTDtNQUNBLEtBQUEsRUFBTSxJQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0dBbkZEO0VBd0ZBLElBQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxNQUFMO01BQ0EsS0FBQSxFQUFNLElBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7R0F6RkQ7RUE4RkEsSUFBQSxFQUNDO0lBQUEsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFVBQUw7TUFDQSxLQUFBLEVBQU0sSUFETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FERDtHQS9GRDtFQW9HQSxJQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssU0FBTDtNQUNBLEtBQUEsRUFBTSxJQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0lBS0EsSUFBQSxFQUNDO01BQUEsSUFBQSxFQUFLLFVBQUw7TUFDQSxLQUFBLEVBQU0sSUFETjtNQUVBLE1BQUEsRUFBTyxJQUZQO01BR0EsS0FBQSxFQUFNLENBSE47S0FORDtHQXJHRDtFQStHQSxJQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQ0M7TUFBQSxJQUFBLEVBQUssVUFBTDtNQUNBLEtBQUEsRUFBTSxJQUROO01BRUEsTUFBQSxFQUFPLElBRlA7TUFHQSxLQUFBLEVBQU0sQ0FITjtLQUREO0dBaEhEO0VBcUhBLElBQUEsRUFDQztJQUFBLElBQUEsRUFDQztNQUFBLElBQUEsRUFBSyxVQUFMO01BQ0EsS0FBQSxFQUFNLElBRE47TUFFQSxNQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTSxDQUhOO0tBREQ7R0F0SEQ7OztBQTZIRCxPQUFPLENBQUMsTUFBUixHQUNDO0VBQUEsR0FBQSxFQUFJLFNBQUo7RUFDQSxLQUFBLEVBQU0sU0FETjtFQUVBLE1BQUEsRUFBTyxTQUZQO0VBR0EsTUFBQSxFQUFPLFNBSFA7RUFJQSxNQUFBLEVBQU8sU0FKUDtFQUtBLE1BQUEsRUFBTyxTQUxQO0VBTUEsTUFBQSxFQUFPLFNBTlA7RUFPQSxNQUFBLEVBQU8sU0FQUDtFQVFBLE1BQUEsRUFBTyxTQVJQO0VBU0EsTUFBQSxFQUFPLFNBVFA7RUFVQSxNQUFBLEVBQU8sU0FWUDtFQVdBLE9BQUEsRUFBUSxTQVhSO0VBWUEsT0FBQSxFQUFRLFNBWlI7RUFhQSxPQUFBLEVBQVEsU0FiUjtFQWNBLE9BQUEsRUFBUSxTQWRSO0VBZUEsSUFBQSxFQUFLLFNBZkw7RUFnQkEsTUFBQSxFQUFPLFNBaEJQO0VBaUJBLE9BQUEsRUFBUSxTQWpCUjtFQWtCQSxPQUFBLEVBQVEsU0FsQlI7RUFtQkEsT0FBQSxFQUFRLFNBbkJSO0VBb0JBLE9BQUEsRUFBUSxTQXBCUjtFQXFCQSxPQUFBLEVBQVEsU0FyQlI7RUFzQkEsT0FBQSxFQUFRLFNBdEJSO0VBdUJBLE9BQUEsRUFBUSxTQXZCUjtFQXdCQSxPQUFBLEVBQVEsU0F4QlI7RUF5QkEsT0FBQSxFQUFRLFNBekJSO0VBMEJBLFFBQUEsRUFBUyxTQTFCVDtFQTJCQSxRQUFBLEVBQVMsU0EzQlQ7RUE0QkEsUUFBQSxFQUFTLFNBNUJUO0VBNkJBLFFBQUEsRUFBUyxTQTdCVDtFQThCQSxNQUFBLEVBQU8sU0E5QlA7RUErQkEsUUFBQSxFQUFTLFNBL0JUO0VBZ0NBLFNBQUEsRUFBVSxTQWhDVjtFQWlDQSxTQUFBLEVBQVUsU0FqQ1Y7RUFrQ0EsU0FBQSxFQUFVLFNBbENWO0VBbUNBLFNBQUEsRUFBVSxTQW5DVjtFQW9DQSxTQUFBLEVBQVUsU0FwQ1Y7RUFxQ0EsU0FBQSxFQUFVLFNBckNWO0VBc0NBLFNBQUEsRUFBVSxTQXRDVjtFQXVDQSxTQUFBLEVBQVUsU0F2Q1Y7RUF3Q0EsU0FBQSxFQUFVLFNBeENWO0VBeUNBLFVBQUEsRUFBVyxTQXpDWDtFQTBDQSxVQUFBLEVBQVcsU0ExQ1g7RUEyQ0EsVUFBQSxFQUFXLFNBM0NYO0VBNENBLFVBQUEsRUFBVyxTQTVDWDtFQTZDQSxVQUFBLEVBQVcsU0E3Q1g7RUE4Q0EsWUFBQSxFQUFhLFNBOUNiO0VBK0NBLGFBQUEsRUFBYyxTQS9DZDtFQWdEQSxhQUFBLEVBQWMsU0FoRGQ7RUFpREEsYUFBQSxFQUFjLFNBakRkO0VBa0RBLGFBQUEsRUFBYyxTQWxEZDtFQW1EQSxhQUFBLEVBQWMsU0FuRGQ7RUFvREEsYUFBQSxFQUFjLFNBcERkO0VBcURBLGFBQUEsRUFBYyxTQXJEZDtFQXNEQSxhQUFBLEVBQWMsU0F0RGQ7RUF1REEsYUFBQSxFQUFjLFNBdkRkO0VBd0RBLGNBQUEsRUFBZSxTQXhEZjtFQXlEQSxjQUFBLEVBQWUsU0F6RGY7RUEwREEsY0FBQSxFQUFlLFNBMURmO0VBMkRBLGNBQUEsRUFBZSxTQTNEZjtFQTREQSxNQUFBLEVBQU8sU0E1RFA7RUE2REEsUUFBQSxFQUFTLFNBN0RUO0VBOERBLFNBQUEsRUFBVSxTQTlEVjtFQStEQSxTQUFBLEVBQVUsU0EvRFY7RUFnRUEsU0FBQSxFQUFVLFNBaEVWO0VBaUVBLFNBQUEsRUFBVSxTQWpFVjtFQWtFQSxTQUFBLEVBQVUsU0FsRVY7RUFtRUEsU0FBQSxFQUFVLFNBbkVWO0VBb0VBLFNBQUEsRUFBVSxTQXBFVjtFQXFFQSxTQUFBLEVBQVUsU0FyRVY7RUFzRUEsU0FBQSxFQUFVLFNBdEVWO0VBdUVBLFVBQUEsRUFBVyxTQXZFWDtFQXdFQSxVQUFBLEVBQVcsU0F4RVg7RUF5RUEsVUFBQSxFQUFXLFNBekVYO0VBMEVBLFVBQUEsRUFBVyxTQTFFWDtFQTJFQSxJQUFBLEVBQUssU0EzRUw7RUE0RUEsTUFBQSxFQUFPLFNBNUVQO0VBNkVBLE9BQUEsRUFBUSxTQTdFUjtFQThFQSxPQUFBLEVBQVEsU0E5RVI7RUErRUEsT0FBQSxFQUFRLFNBL0VSO0VBZ0ZBLE9BQUEsRUFBUSxTQWhGUjtFQWlGQSxPQUFBLEVBQVEsU0FqRlI7RUFrRkEsT0FBQSxFQUFRLFNBbEZSO0VBbUZBLE9BQUEsRUFBUSxTQW5GUjtFQW9GQSxPQUFBLEVBQVEsU0FwRlI7RUFxRkEsT0FBQSxFQUFRLFNBckZSO0VBc0ZBLFFBQUEsRUFBUyxTQXRGVDtFQXVGQSxRQUFBLEVBQVMsU0F2RlQ7RUF3RkEsUUFBQSxFQUFTLFNBeEZUO0VBeUZBLFFBQUEsRUFBUyxTQXpGVDtFQTBGQSxTQUFBLEVBQVUsU0ExRlY7RUEyRkEsV0FBQSxFQUFZLFNBM0ZaO0VBNEZBLFlBQUEsRUFBYSxTQTVGYjtFQTZGQSxZQUFBLEVBQWEsU0E3RmI7RUE4RkEsWUFBQSxFQUFhLFNBOUZiO0VBK0ZBLFlBQUEsRUFBYSxTQS9GYjtFQWdHQSxZQUFBLEVBQWEsU0FoR2I7RUFpR0EsWUFBQSxFQUFhLFNBakdiO0VBa0dBLFlBQUEsRUFBYSxTQWxHYjtFQW1HQSxZQUFBLEVBQWEsU0FuR2I7RUFvR0EsWUFBQSxFQUFhLFNBcEdiO0VBcUdBLGFBQUEsRUFBYyxTQXJHZDtFQXNHQSxhQUFBLEVBQWMsU0F0R2Q7RUF1R0EsYUFBQSxFQUFjLFNBdkdkO0VBd0dBLGFBQUEsRUFBYyxTQXhHZDtFQXlHQSxJQUFBLEVBQUssU0F6R0w7RUEwR0EsTUFBQSxFQUFPLFNBMUdQO0VBMkdBLE9BQUEsRUFBUSxTQTNHUjtFQTRHQSxPQUFBLEVBQVEsU0E1R1I7RUE2R0EsT0FBQSxFQUFRLFNBN0dSO0VBOEdBLE9BQUEsRUFBUSxTQTlHUjtFQStHQSxPQUFBLEVBQVEsU0EvR1I7RUFnSEEsT0FBQSxFQUFRLFNBaEhSO0VBaUhBLE9BQUEsRUFBUSxTQWpIUjtFQWtIQSxPQUFBLEVBQVEsU0FsSFI7RUFtSEEsT0FBQSxFQUFRLFNBbkhSO0VBb0hBLFFBQUEsRUFBUyxTQXBIVDtFQXFIQSxRQUFBLEVBQVMsU0FySFQ7RUFzSEEsUUFBQSxFQUFTLFNBdEhUO0VBdUhBLFFBQUEsRUFBUyxTQXZIVDtFQXdIQSxJQUFBLEVBQUssU0F4SEw7RUF5SEEsTUFBQSxFQUFPLFNBekhQO0VBMEhBLE9BQUEsRUFBUSxTQTFIUjtFQTJIQSxPQUFBLEVBQVEsU0EzSFI7RUE0SEEsT0FBQSxFQUFRLFNBNUhSO0VBNkhBLE9BQUEsRUFBUSxTQTdIUjtFQThIQSxPQUFBLEVBQVEsU0E5SFI7RUErSEEsT0FBQSxFQUFRLFNBL0hSO0VBZ0lBLE9BQUEsRUFBUSxTQWhJUjtFQWlJQSxPQUFBLEVBQVEsU0FqSVI7RUFrSUEsT0FBQSxFQUFRLFNBbElSO0VBbUlBLFFBQUEsRUFBUyxTQW5JVDtFQW9JQSxRQUFBLEVBQVMsU0FwSVQ7RUFxSUEsUUFBQSxFQUFTLFNBcklUO0VBc0lBLFFBQUEsRUFBUyxTQXRJVDtFQXVJQSxLQUFBLEVBQU0sU0F2SU47RUF3SUEsT0FBQSxFQUFRLFNBeElSO0VBeUlBLFFBQUEsRUFBUyxTQXpJVDtFQTBJQSxRQUFBLEVBQVMsU0ExSVQ7RUEySUEsUUFBQSxFQUFTLFNBM0lUO0VBNElBLFFBQUEsRUFBUyxTQTVJVDtFQTZJQSxRQUFBLEVBQVMsU0E3SVQ7RUE4SUEsUUFBQSxFQUFTLFNBOUlUO0VBK0lBLFFBQUEsRUFBUyxTQS9JVDtFQWdKQSxRQUFBLEVBQVMsU0FoSlQ7RUFpSkEsUUFBQSxFQUFTLFNBakpUO0VBa0pBLFNBQUEsRUFBVSxTQWxKVjtFQW1KQSxTQUFBLEVBQVUsU0FuSlY7RUFvSkEsU0FBQSxFQUFVLFNBcEpWO0VBcUpBLFNBQUEsRUFBVSxTQXJKVjtFQXNKQSxVQUFBLEVBQVcsU0F0Slg7RUF1SkEsWUFBQSxFQUFhLFNBdkpiO0VBd0pBLGFBQUEsRUFBYyxTQXhKZDtFQXlKQSxhQUFBLEVBQWMsU0F6SmQ7RUEwSkEsYUFBQSxFQUFjLFNBMUpkO0VBMkpBLGFBQUEsRUFBYyxTQTNKZDtFQTRKQSxhQUFBLEVBQWMsU0E1SmQ7RUE2SkEsYUFBQSxFQUFjLFNBN0pkO0VBOEpBLGFBQUEsRUFBYyxTQTlKZDtFQStKQSxhQUFBLEVBQWMsU0EvSmQ7RUFnS0EsYUFBQSxFQUFjLFNBaEtkO0VBaUtBLGNBQUEsRUFBZSxTQWpLZjtFQWtLQSxjQUFBLEVBQWUsU0FsS2Y7RUFtS0EsY0FBQSxFQUFlLFNBbktmO0VBb0tBLGNBQUEsRUFBZSxTQXBLZjtFQXFLQSxJQUFBLEVBQUssU0FyS0w7RUFzS0EsTUFBQSxFQUFPLFNBdEtQO0VBdUtBLE9BQUEsRUFBUSxTQXZLUjtFQXdLQSxPQUFBLEVBQVEsU0F4S1I7RUF5S0EsT0FBQSxFQUFRLFNBektSO0VBMEtBLE9BQUEsRUFBUSxTQTFLUjtFQTJLQSxPQUFBLEVBQVEsU0EzS1I7RUE0S0EsT0FBQSxFQUFRLFNBNUtSO0VBNktBLE9BQUEsRUFBUSxTQTdLUjtFQThLQSxPQUFBLEVBQVEsU0E5S1I7RUErS0EsT0FBQSxFQUFRLFNBL0tSO0VBZ0xBLFFBQUEsRUFBUyxTQWhMVDtFQWlMQSxRQUFBLEVBQVMsU0FqTFQ7RUFrTEEsUUFBQSxFQUFTLFNBbExUO0VBbUxBLFFBQUEsRUFBUyxTQW5MVDtFQW9MQSxNQUFBLEVBQU8sU0FwTFA7RUFxTEEsUUFBQSxFQUFTLFNBckxUO0VBc0xBLFNBQUEsRUFBVSxTQXRMVjtFQXVMQSxTQUFBLEVBQVUsU0F2TFY7RUF3TEEsU0FBQSxFQUFVLFNBeExWO0VBeUxBLFNBQUEsRUFBVSxTQXpMVjtFQTBMQSxTQUFBLEVBQVUsU0ExTFY7RUEyTEEsU0FBQSxFQUFVLFNBM0xWO0VBNExBLFNBQUEsRUFBVSxTQTVMVjtFQTZMQSxTQUFBLEVBQVUsU0E3TFY7RUE4TEEsU0FBQSxFQUFVLFNBOUxWO0VBK0xBLFVBQUEsRUFBVyxTQS9MWDtFQWdNQSxVQUFBLEVBQVcsU0FoTVg7RUFpTUEsVUFBQSxFQUFXLFNBak1YO0VBa01BLFVBQUEsRUFBVyxTQWxNWDtFQW1NQSxLQUFBLEVBQU0sU0FuTU47RUFvTUEsT0FBQSxFQUFRLFNBcE1SO0VBcU1BLFFBQUEsRUFBUyxTQXJNVDtFQXNNQSxRQUFBLEVBQVMsU0F0TVQ7RUF1TUEsUUFBQSxFQUFTLFNBdk1UO0VBd01BLFFBQUEsRUFBUyxTQXhNVDtFQXlNQSxRQUFBLEVBQVMsU0F6TVQ7RUEwTUEsUUFBQSxFQUFTLFNBMU1UO0VBMk1BLFFBQUEsRUFBUyxTQTNNVDtFQTRNQSxRQUFBLEVBQVMsU0E1TVQ7RUE2TUEsUUFBQSxFQUFTLFNBN01UO0VBOE1BLFNBQUEsRUFBVSxTQTlNVjtFQStNQSxTQUFBLEVBQVUsU0EvTVY7RUFnTkEsU0FBQSxFQUFVLFNBaE5WO0VBaU5BLFNBQUEsRUFBVSxTQWpOVjtFQWtOQSxNQUFBLEVBQU8sU0FsTlA7RUFtTkEsUUFBQSxFQUFTLFNBbk5UO0VBb05BLFNBQUEsRUFBVSxTQXBOVjtFQXFOQSxTQUFBLEVBQVUsU0FyTlY7RUFzTkEsU0FBQSxFQUFVLFNBdE5WO0VBdU5BLFNBQUEsRUFBVSxTQXZOVjtFQXdOQSxTQUFBLEVBQVUsU0F4TlY7RUF5TkEsU0FBQSxFQUFVLFNBek5WO0VBME5BLFNBQUEsRUFBVSxTQTFOVjtFQTJOQSxTQUFBLEVBQVUsU0EzTlY7RUE0TkEsU0FBQSxFQUFVLFNBNU5WO0VBNk5BLFVBQUEsRUFBVyxTQTdOWDtFQThOQSxVQUFBLEVBQVcsU0E5Tlg7RUErTkEsVUFBQSxFQUFXLFNBL05YO0VBZ09BLFVBQUEsRUFBVyxTQWhPWDtFQWlPQSxVQUFBLEVBQVcsU0FqT1g7RUFrT0EsWUFBQSxFQUFhLFNBbE9iO0VBbU9BLGFBQUEsRUFBYyxTQW5PZDtFQW9PQSxhQUFBLEVBQWMsU0FwT2Q7RUFxT0EsYUFBQSxFQUFjLFNBck9kO0VBc09BLGFBQUEsRUFBYyxTQXRPZDtFQXVPQSxhQUFBLEVBQWMsU0F2T2Q7RUF3T0EsYUFBQSxFQUFjLFNBeE9kO0VBeU9BLGFBQUEsRUFBYyxTQXpPZDtFQTBPQSxhQUFBLEVBQWMsU0ExT2Q7RUEyT0EsYUFBQSxFQUFjLFNBM09kO0VBNE9BLGNBQUEsRUFBZSxTQTVPZjtFQTZPQSxjQUFBLEVBQWUsU0E3T2Y7RUE4T0EsY0FBQSxFQUFlLFNBOU9mO0VBK09BLGNBQUEsRUFBZSxTQS9PZjtFQWdQQSxLQUFBLEVBQU0sU0FoUE47RUFpUEEsT0FBQSxFQUFRLFNBalBSO0VBa1BBLFFBQUEsRUFBUyxTQWxQVDtFQW1QQSxRQUFBLEVBQVMsU0FuUFQ7RUFvUEEsUUFBQSxFQUFTLFNBcFBUO0VBcVBBLFFBQUEsRUFBUyxTQXJQVDtFQXNQQSxRQUFBLEVBQVMsU0F0UFQ7RUF1UEEsUUFBQSxFQUFTLFNBdlBUO0VBd1BBLFFBQUEsRUFBUyxTQXhQVDtFQXlQQSxRQUFBLEVBQVMsU0F6UFQ7RUEwUEEsUUFBQSxFQUFTLFNBMVBUO0VBMlBBLElBQUEsRUFBSyxTQTNQTDtFQTRQQSxNQUFBLEVBQU8sU0E1UFA7RUE2UEEsT0FBQSxFQUFRLFNBN1BSO0VBOFBBLE9BQUEsRUFBUSxTQTlQUjtFQStQQSxPQUFBLEVBQVEsU0EvUFI7RUFnUUEsT0FBQSxFQUFRLFNBaFFSO0VBaVFBLE9BQUEsRUFBUSxTQWpRUjtFQWtRQSxPQUFBLEVBQVEsU0FsUVI7RUFtUUEsT0FBQSxFQUFRLFNBblFSO0VBb1FBLE9BQUEsRUFBUSxTQXBRUjtFQXFRQSxPQUFBLEVBQVEsU0FyUVI7RUFzUUEsUUFBQSxFQUFTLFNBdFFUO0VBdVFBLFVBQUEsRUFBVyxTQXZRWDtFQXdRQSxXQUFBLEVBQVksU0F4UVo7RUF5UUEsV0FBQSxFQUFZLFNBelFaO0VBMFFBLFdBQUEsRUFBWSxTQTFRWjtFQTJRQSxXQUFBLEVBQVksU0EzUVo7RUE0UUEsV0FBQSxFQUFZLFNBNVFaO0VBNlFBLFdBQUEsRUFBWSxTQTdRWjtFQThRQSxXQUFBLEVBQVksU0E5UVo7RUErUUEsV0FBQSxFQUFZLFNBL1FaO0VBZ1JBLFdBQUEsRUFBWSxTQWhSWjtFQWlSQSxLQUFBLEVBQU0sU0FqUk47RUFrUkEsS0FBQSxFQUFNLFNBbFJOOzs7OztBQ3RvQkQsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGNBQVI7O0FBRUosT0FBTyxDQUFDLFFBQVIsR0FBbUI7O0FBR25CLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBakIsR0FBeUIsTUFBTSxDQUFDLElBQVAsQ0FBWSxPQUFPLENBQUMsUUFBcEI7O0FBRXpCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLFNBQUMsS0FBRDtBQUNoQixNQUFBO0VBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBUixDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQUMsUUFBdEM7RUFFUixNQUFBLEdBQWEsSUFBQSxLQUFBLENBQ1o7SUFBQSxlQUFBLEVBQWdCLE9BQWhCO0dBRFk7RUFHYixNQUFNLENBQUMsSUFBUCxHQUFjO0VBRWQsTUFBTSxDQUFDLFdBQVAsR0FDQztJQUFBLE1BQUEsRUFBTyxDQUFDLENBQVI7SUFDQSxPQUFBLEVBQVEsQ0FEUjtJQUVBLFFBQUEsRUFBUyxDQUZUO0lBR0EsTUFBQSxFQUFPLEVBSFA7O0VBS0QsT0FBQSxHQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBUixDQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBckI7RUFDVixPQUFBLEdBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFSLENBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFyQjtFQUVWLFVBQUEsR0FBaUIsSUFBQSxLQUFBLENBQ2hCO0lBQUEsVUFBQSxFQUFXLE1BQVg7SUFDQSxZQUFBLEVBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsRUFBWCxDQURiO0lBRUEsZUFBQSxFQUFnQixhQUZoQjtJQUdBLElBQUEsRUFBSyxNQUhMO0lBSUEsSUFBQSxFQUFLLElBSkw7R0FEZ0I7RUFPakIsVUFBVSxDQUFDLFdBQVgsR0FDQztJQUFBLEdBQUEsRUFBSSxDQUFKO0lBQ0EsTUFBQSxFQUFPLEVBRFA7SUFFQSxLQUFBLEVBQU0sRUFGTjtJQUdBLEtBQUEsRUFBTSxZQUhOOztFQUtELFFBQUEsR0FBZSxJQUFBLEtBQUEsQ0FDZDtJQUFBLFVBQUEsRUFBVyxVQUFYO0lBQ0EsS0FBQSxFQUFNLE9BQU8sQ0FBQyxLQURkO0lBRUEsTUFBQSxFQUFPLE9BQU8sQ0FBQyxNQUZmO0lBR0EsSUFBQSxFQUFLLE9BQU8sQ0FBQyxHQUhiO0lBSUEsZUFBQSxFQUFnQixhQUpoQjtJQUtBLElBQUEsRUFBSyxNQUxMO0dBRGM7RUFRZixRQUFRLENBQUMsV0FBVCxHQUNDO0lBQUEsS0FBQSxFQUFNLFFBQU47O0VBRUQsWUFBQSxHQUFtQixJQUFBLEtBQUEsQ0FDbEI7SUFBQSxVQUFBLEVBQVcsTUFBWDtJQUNBLFlBQUEsRUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxFQUFYLENBRGI7SUFFQSxlQUFBLEVBQWdCLGFBRmhCO0lBR0EsSUFBQSxFQUFLLFFBSEw7SUFJQSxJQUFBLEVBQUssSUFKTDtHQURrQjtFQU9uQixZQUFZLENBQUMsV0FBYixHQUNDO0lBQUEsR0FBQSxFQUFJLENBQUo7SUFDQSxNQUFBLEVBQU8sRUFEUDtJQUVBLEtBQUEsRUFBTSxFQUZOO0lBR0EsT0FBQSxFQUFRLENBQUMsVUFBRCxFQUFhLENBQWIsQ0FIUjs7RUFLRCxVQUFBLEdBQWlCLElBQUEsS0FBQSxDQUNoQjtJQUFBLFVBQUEsRUFBVyxZQUFYO0lBQ0EsZUFBQSxFQUFnQixhQURoQjtJQUVBLFdBQUEsRUFBWSxPQUZaO0lBR0EsV0FBQSxFQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLENBQVgsQ0FIWjtJQUlBLFlBQUEsRUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBVyxDQUFYLENBSmI7SUFLQSxJQUFBLEVBQUssTUFMTDtHQURnQjtFQVFqQixVQUFVLENBQUMsV0FBWCxHQUNDO0lBQUEsS0FBQSxFQUFNLFFBQU47SUFDQSxLQUFBLEVBQU0sRUFETjtJQUVBLE1BQUEsRUFBTyxFQUZQOztFQUlELFVBQUEsR0FBaUIsSUFBQSxLQUFBLENBQ2hCO0lBQUEsVUFBQSxFQUFXLE1BQVg7SUFDQSxZQUFBLEVBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVcsRUFBWCxDQURiO0lBRUEsZUFBQSxFQUFnQixhQUZoQjtJQUdBLElBQUEsRUFBSyxNQUhMO0lBSUEsSUFBQSxFQUFLLElBSkw7R0FEZ0I7RUFPakIsVUFBVSxDQUFDLFdBQVgsR0FDQztJQUFBLEdBQUEsRUFBSSxDQUFKO0lBQ0EsTUFBQSxFQUFPLEVBRFA7SUFFQSxLQUFBLEVBQU0sRUFGTjtJQUdBLFFBQUEsRUFBUyxDQUFDLFVBQUQsRUFBYSxDQUFiLENBSFQ7O0VBTUQsUUFBQSxHQUFlLElBQUEsS0FBQSxDQUNkO0lBQUEsVUFBQSxFQUFXLFVBQVg7SUFDQSxLQUFBLEVBQU0sT0FBTyxDQUFDLEtBRGQ7SUFFQSxNQUFBLEVBQU8sT0FBTyxDQUFDLE1BRmY7SUFHQSxJQUFBLEVBQUssT0FBTyxDQUFDLEdBSGI7SUFJQSxlQUFBLEVBQWdCLGFBSmhCO0lBS0EsSUFBQSxFQUFLLE1BTEw7R0FEYztFQVFmLFFBQVEsQ0FBQyxXQUFULEdBQ0M7SUFBQSxLQUFBLEVBQU0sUUFBTjs7RUFFRCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FDQztJQUFBLE1BQUEsRUFBTyxDQUFDLE1BQUQsRUFBUyxVQUFULEVBQXFCLFlBQXJCLEVBQW1DLFVBQW5DLEVBQStDLFFBQS9DLEVBQXlELFFBQXpELEVBQW1FLFVBQW5FLENBQVA7R0FERDtFQUdBLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBUixDQUNDO0lBQUEsS0FBQSxFQUFNLFVBQU47SUFDQSxTQUFBLEVBQVUsS0FEVjtJQUVBLEtBQUEsRUFBTyxPQUZQO0lBR0EsS0FBQSxFQUFPLEVBSFA7SUFJQSxLQUFBLEVBQU8sZ0NBSlA7SUFLQSxPQUFBLEVBQVMsRUFMVDtHQUREO0VBT0EsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFSLENBQ0U7SUFBQSxLQUFBLEVBQU0sVUFBTjtJQUNBLFNBQUEsRUFBVSxLQURWO0lBRUEsS0FBQSxFQUFPLE9BRlA7SUFHQSxLQUFBLEVBQU8sRUFIUDtJQUlBLEtBQUEsRUFBTyxnQ0FKUDtJQUtBLE9BQUEsRUFBUyxFQUxUO0dBREY7RUFPQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FDRTtJQUFBLEtBQUEsRUFBTSxZQUFOO0lBQ0EsU0FBQSxFQUFVLEtBRFY7SUFFQSxLQUFBLEVBQU8sT0FGUDtJQUdBLEtBQUEsRUFBTyxFQUhQO0lBSUEsS0FBQSxFQUFPLGdDQUpQO0lBS0EsT0FBQSxFQUFTLEVBTFQ7R0FERjtFQVFBLFVBQVUsQ0FBQyxFQUFYLENBQWMsTUFBTSxDQUFDLFFBQXJCLEVBQStCLFNBQUE7V0FDOUIsQ0FBQyxDQUFDLGVBQUYsQ0FBQTtFQUQ4QixDQUEvQjtFQUdBLE1BQU0sQ0FBQyxJQUFQLEdBQWM7RUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVosR0FBdUI7RUFDdkIsTUFBTSxDQUFDLElBQVAsR0FBYztFQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBWixHQUFtQjtFQUNuQixNQUFNLENBQUMsTUFBUCxHQUFnQjtFQUNoQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQWQsR0FBcUI7RUFFckIsS0FBSyxDQUFDLFFBQU4sQ0FBZSxHQUFmLEVBQW9CLFNBQUE7V0FDbkIsTUFBTSxDQUFDLFlBQVAsQ0FBQTtFQURtQixDQUFwQjtFQUdBLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhLE1BQWI7QUFDQSxTQUFPO0FBbklTOzs7O0FDUGpCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxRQUFSLEdBQW1CO0VBQ2xCLFFBQUEsRUFBUyxJQURTO0VBRWxCLElBQUEsRUFBSyxlQUZhO0VBR2xCLE1BQUEsRUFBTyxNQUhXO0VBSWxCLFdBQUEsRUFBWSxVQUpNO0VBS2xCLFFBQUEsRUFBUyxDQUxTOzs7QUFRbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0FBQ2hCLE1BQUE7RUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFSLENBQXVCLEtBQXZCLEVBQThCLE9BQU8sQ0FBQyxRQUF0QztFQUVSLEdBQUEsR0FBVSxJQUFBLEtBQUEsQ0FDVDtJQUFBLElBQUEsRUFBSyxVQUFMO0lBQ0EsZUFBQSxFQUFnQixhQURoQjtJQUVBLElBQUEsRUFBSyxJQUZMO0dBRFM7RUFLVixHQUFHLENBQUMsSUFBSixHQUFXO0VBQ1gsR0FBRyxDQUFDLEVBQUosR0FBYSxJQUFBLEtBQUEsQ0FDWjtJQUFBLGVBQUEsRUFBZ0IsU0FBaEI7SUFDQSxVQUFBLEVBQVcsR0FEWDtJQUVBLElBQUEsRUFBSyxJQUZMO0dBRFk7RUFLYixZQUFBLEdBQWU7RUFDZixTQUFBLEdBQVk7QUFFWjtBQUFBLE9BQUEscUNBQUE7O0lBQ0MsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLFFBQWI7TUFDQyxZQUFBLEdBQWUsRUFEaEI7O0lBR0EsSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLFVBQWI7TUFDQyxTQUFBLEdBQVksRUFEYjs7SUFHQSxJQUFHLENBQUMsQ0FBQyxJQUFGLEtBQVUsVUFBVixJQUF3QixDQUFBLEtBQUssR0FBaEM7TUFDQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQUwsQ0FDQztRQUFBLFVBQUEsRUFBWTtVQUFBLENBQUEsRUFBRSxHQUFHLENBQUMsTUFBTjtTQUFaO1FBQ0EsSUFBQSxFQUFLLEVBREw7UUFFQSxLQUFBLEVBQU0saUNBRk47T0FERCxFQUlJLENBQUMsQ0FBQyxRQUFMLEdBQ0MsQ0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQVgsR0FBb0IsSUFBcEIsRUFDQSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUF2QixHQUFnQyxTQUFTLENBQUMsY0FEMUMsRUFFQSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQVQsQ0FDQztRQUFBLE1BQUEsRUFBTyxTQUFQO1FBQ0EsS0FBQSxFQUFNLGlDQUROO1FBRUEsSUFBQSxFQUFLLEVBRkw7T0FERCxDQUZBLEVBTUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFLLENBQUMsUUFBbEIsRUFBNEIsU0FBQTtRQUMzQixTQUFTLENBQUMsV0FBVyxDQUFDLE1BQXRCLEdBQStCLFNBQVMsQ0FBQztlQUN6QyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQVQsQ0FDQztVQUFBLE1BQUEsRUFBTyxTQUFQO1VBQ0EsS0FBQSxFQUFNLGlDQUROO1VBRUEsSUFBQSxFQUFLLEVBRkw7U0FERDtNQUYyQixDQUE1QixDQU5BLENBREQsR0FBQSxNQUpELEVBREQ7O0FBUEQ7RUEwQkEsR0FBRyxDQUFDLFlBQUosQ0FBQTtFQUVBLEdBQUcsQ0FBQyxXQUFKLEdBQ0M7SUFBQSxPQUFBLEVBQVEsQ0FBUjtJQUNBLFFBQUEsRUFBUyxDQURUO0lBRUEsTUFBQSxFQUFPLENBQUMsWUFBRCxFQUFlLENBQUMsQ0FBaEIsQ0FGUDtJQUdBLE1BQUEsRUFBTyxFQUhQOztFQUtELENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUNDO0lBQUEsTUFBQSxFQUFPLENBQUMsR0FBRCxDQUFQO0dBREQ7RUFHQSxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQVAsR0FBZTtJQUFDLEtBQUEsRUFBTSxHQUFHLENBQUMsS0FBWDtJQUFrQixNQUFBLEVBQU8sR0FBRyxDQUFDLE1BQTdCOztFQUNmLFdBQUEsR0FBYyxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUw7RUFFZCxJQUFHLEtBQUssQ0FBQyxNQUFUO0lBQ0MsR0FBRyxDQUFDLE1BQUosR0FBaUIsSUFBQSxDQUFDLENBQUMsTUFBRixDQUNoQjtNQUFBLElBQUEsRUFBSyxNQUFMO01BQ0EsVUFBQSxFQUFXLEdBQUcsQ0FBQyxFQURmO01BRUEsSUFBQSxFQUFLLEtBQUssQ0FBQyxNQUZYO01BR0EsV0FBQSxFQUFZO1FBQUMsUUFBQSxFQUFTLEVBQVY7UUFBYyxLQUFBLEVBQU0sVUFBcEI7T0FIWjtNQUlBLGVBQUEsRUFBZ0IsT0FKaEI7TUFLQSxLQUFBLEVBQU0sS0FBSyxDQUFDLFdBTFo7S0FEZ0I7SUFPakIsV0FBQSxHQUFjLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBWCxHQUFtQixDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsRUFSbEM7O0VBVUEsR0FBRyxDQUFDLElBQUosR0FBZSxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ2Q7SUFBQSxRQUFBLEVBQVMsRUFBVDtJQUNBLEtBQUEsRUFBTSxPQUROO0lBRUEsVUFBQSxFQUFXLEdBQUcsQ0FBQyxFQUZmO0lBR0EsV0FBQSxFQUFZO01BQUMsT0FBQSxFQUFRLEVBQVQ7TUFBYSxLQUFBLEVBQU0sVUFBbkI7S0FIWjtJQUlBLElBQUEsRUFBSyxLQUFLLENBQUMsSUFKWDtJQUtBLElBQUEsRUFBSyxNQUxMO0lBTUEsVUFBQSxFQUFXLEVBTlg7R0FEYztFQVNmLElBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFULEdBQWlCLFdBQUEsR0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQXZCLEdBQStCLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQUFuRDtJQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQXJCLEdBQTZCLENBQUMsQ0FBQyxFQUFGLENBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFkLENBQUEsR0FBdUIsQ0FBQyxDQUFDLENBQUMsRUFBRixDQUFLLFdBQUwsQ0FBQSxHQUFvQixFQUFyQjtJQUNwRCxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQVIsQ0FBZSxHQUFHLENBQUMsSUFBbkI7SUFDQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBYSxHQUFHLENBQUMsSUFBakI7SUFDQSxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQWhCLEdBQXlCLENBQUMsQ0FBQyxFQUFGLENBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFkLENBQUEsR0FBd0I7SUFDakQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFQLEdBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBVCxHQUFrQixDQUFDLENBQUMsRUFBRixDQUFLLEVBQUw7SUFFbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQ0M7TUFBQSxNQUFBLEVBQU8sQ0FBQyxHQUFELEVBQU0sR0FBRyxDQUFDLElBQVYsQ0FBUDtLQUREO0lBR0EsSUFBRyxLQUFLLENBQUMsTUFBVDtNQUNDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhLEdBQUcsQ0FBQyxNQUFqQixFQUREO0tBVkQ7O0VBYUEsU0FBQSxHQUFZLEdBQUcsQ0FBQyxFQUFFLENBQUM7RUFFbkIsSUFBRyxTQUFIO0lBQ0MsR0FBRyxDQUFDLFFBQUosR0FBZTtJQUNmLFNBQVMsQ0FBQyxjQUFWLEdBQTJCLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDakQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUF0QixHQUErQixTQUFTLENBQUMsV0FBVyxDQUFDLE1BQXRCLEdBQStCLENBQUMsQ0FBQyxFQUFGLENBQUssU0FBTCxFQUgvRDs7RUFLQSxJQUFHLEtBQUssQ0FBQyxRQUFUO0lBQ0MsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFQLEdBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQVQsR0FBbUI7SUFDbkIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFQLENBQ0M7TUFBQSxVQUFBLEVBQVk7UUFBQSxDQUFBLEVBQUUsQ0FBRjtPQUFaO01BQ0EsSUFBQSxFQUFLLEVBREw7TUFFQSxLQUFBLEVBQU0saUNBRk47S0FERDtJQUlBLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBVCxDQUNDO01BQUEsVUFBQSxFQUFZO1FBQUEsT0FBQSxFQUFRLENBQVI7T0FBWjtNQUNBLElBQUEsRUFBSyxFQURMO0tBREQ7SUFHQSxJQUFHLEtBQUssQ0FBQyxNQUFUO01BQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFYLENBQ0M7UUFBQSxVQUFBLEVBQVk7VUFBQSxPQUFBLEVBQVEsQ0FBUjtTQUFaO1FBQ0EsSUFBQSxFQUFLLEVBREw7T0FERCxFQUREOztJQUlBLElBQUcsU0FBSDtNQUNDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBVCxDQUNDO1FBQUEsTUFBQSxFQUFPLFNBQVA7UUFDQSxLQUFBLEVBQU0saUNBRE47UUFFQSxJQUFBLEVBQUssRUFGTDtPQURELEVBREQ7S0FkRDs7RUFvQkEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFLLENBQUMsUUFBbEIsRUFBNEIsU0FBQTtJQUMzQixHQUFHLENBQUMsRUFBRSxDQUFDLE9BQVAsQ0FDQztNQUFBLFVBQUEsRUFBWTtRQUFBLENBQUEsRUFBRSxHQUFHLENBQUMsTUFBTjtPQUFaO01BQ0EsSUFBQSxFQUFLLEVBREw7TUFFQSxLQUFBLEVBQU0saUNBRk47S0FERDtJQUlBLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBVCxDQUNDO01BQUEsVUFBQSxFQUFZO1FBQUEsT0FBQSxFQUFRLENBQVI7T0FBWjtNQUNBLElBQUEsRUFBSyxFQURMO0tBREQ7SUFHQSxJQUFHLEtBQUssQ0FBQyxNQUFUO01BQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFYLENBQ0M7UUFBQSxVQUFBLEVBQVk7VUFBQSxPQUFBLEVBQVEsQ0FBUjtTQUFaO1FBQ0EsSUFBQSxFQUFLLEVBREw7T0FERCxFQUREOztJQUlBLElBQUcsU0FBQSxJQUFhLFNBQVMsQ0FBQyxNQUFWLEtBQW9CLElBQXBDO01BQ0MsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUF0QixHQUErQixTQUFTLENBQUM7YUFDekMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFULENBQ0M7UUFBQSxNQUFBLEVBQU8sU0FBUDtRQUNBLEtBQUEsRUFBTSxpQ0FETjtRQUVBLElBQUEsRUFBSyxFQUZMO09BREQsRUFGRDs7RUFaMkIsQ0FBNUI7RUFrQkEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxLQUFLLENBQUMsUUFBTixHQUFpQixFQUE3QixFQUFpQyxTQUFBO1dBQ2hDLEdBQUcsQ0FBQyxPQUFKLENBQUE7RUFEZ0MsQ0FBakM7QUFFQSxTQUFPO0FBeElTOzs7O0FDWmpCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVKLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEtBQUEsR0FBUTs7QUFHeEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQyxLQUFEO0VBQ25CLElBQUcsS0FBSyxDQUFDLE9BQU4sQ0FBYyxLQUFkLENBQUEsS0FBd0IsQ0FBQyxDQUE1QjtXQUNFLEtBQUssQ0FBQyxJQUFOLENBQVcsS0FBWCxFQURGOztBQURtQjs7QUFJckIsT0FBTyxDQUFDLGVBQVIsR0FBMEIsU0FBQyxLQUFEO0FBQ3hCLE1BQUE7RUFBQSxJQUFHLEtBQUssQ0FBQyxNQUFOLEdBQWUsQ0FBbEI7SUFDRSxZQUFBLEdBQWUsS0FBTSxDQUFBLEtBQUssQ0FBQyxNQUFOLEdBQWUsQ0FBZjtJQUNyQixJQUFHLFlBQVksQ0FBQyxJQUFiLEtBQXFCLE1BQXhCO01BQ0UsWUFBWSxDQUFDLElBQWIsQ0FBQSxFQURGO0tBQUEsTUFBQTtNQUdFLE9BQUEsR0FBYyxJQUFBLEtBQUEsQ0FDWjtRQUFBLGVBQUEsRUFBZ0IsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxPQUFSLENBQWhCO1FBQ0EsS0FBQSxFQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FEZjtRQUVBLE1BQUEsRUFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BRmhCO09BRFk7TUFJZCxPQUFPLENBQUMsV0FBUixDQUFvQixZQUFwQjtNQUNBLFlBQVksQ0FBQyxXQUFiLEdBQ0U7UUFBQSxPQUFBLEVBQVEsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQWQsQ0FBUjs7TUFDRixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQVQsQ0FDRTtRQUFBLE1BQUEsRUFBTyxZQUFQO1FBQ0EsSUFBQSxFQUFLLEVBREw7T0FERjtNQUdBLE9BQU8sQ0FBQyxPQUFSLENBQ0U7UUFBQSxVQUFBLEVBQVk7VUFBQSxPQUFBLEVBQVEsQ0FBUjtTQUFaO1FBQ0EsSUFBQSxFQUFLLEVBREw7UUFFQSxLQUFBLEVBQU0sRUFGTjtPQURGO01BSUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxFQUFaLEVBQWdCLFNBQUE7UUFDZCxZQUFZLENBQUMsT0FBYixDQUFBO2VBQ0EsT0FBTyxDQUFDLE9BQVIsQ0FBQTtNQUZjLENBQWhCLEVBakJGOztXQW9CQSxLQUFLLENBQUMsR0FBTixDQUFBLEVBdEJGOztBQUR3Qjs7OztBQ1QxQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsY0FBUjs7QUFFSixPQUFPLENBQUMsUUFBUixHQUFtQjtFQUNsQixPQUFBLEVBQVEsRUFEVTtFQUVsQixPQUFBLEVBQVEsS0FGVTtFQUdsQixPQUFBLEVBQVEsR0FIVTtFQUlsQixRQUFBLEVBQVMsQ0FKUztFQUtsQixLQUFBLEVBQU0sT0FMWTtFQU1sQixPQUFBLEVBQVEsS0FOVTtFQU9sQixJQUFBLEVBQUssV0FQYTtFQVFsQixlQUFBLEVBQWdCLGdCQVJFO0VBU2xCLEtBQUEsRUFBTyxPQVRXO0VBVWxCLE9BQUEsRUFBUSxFQVZVOzs7QUFhbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxLQUFEO0FBQ2hCLE1BQUE7RUFBQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFSLENBQXVCLEtBQXZCLEVBQThCLE9BQU8sQ0FBQyxRQUF0QztFQUNSLFNBQUEsR0FBZ0IsSUFBQSxLQUFBLENBQU07SUFBQSxlQUFBLEVBQWdCLEtBQUssQ0FBQyxlQUF0QjtJQUF1QyxJQUFBLEVBQUssZUFBNUM7R0FBTjtFQUVoQixJQUFHLEtBQUssQ0FBQyxLQUFOLEtBQWUsTUFBbEI7SUFDQyxJQUFHLEtBQUssQ0FBQyxlQUFOLEtBQXlCLGdCQUE1QjtNQUNDLFNBQVMsQ0FBQyxlQUFWLEdBQTRCLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBUixDQUFjLE9BQWQsRUFEN0I7O0lBRUEsSUFBRyxLQUFLLENBQUMsS0FBTixLQUFlLE9BQWxCO01BQ0MsS0FBSyxDQUFDLEtBQU4sR0FBYyxRQURmOztJQUVBLElBQUcsS0FBSyxDQUFDLE9BQU4sS0FBaUIsRUFBcEI7TUFDQyxLQUFLLENBQUMsT0FBTixHQUFnQixFQURqQjtLQUxEOztFQVFBLElBQUcsS0FBSyxDQUFDLEtBQU4sS0FBZSxPQUFmLElBQTBCLEtBQUssQ0FBQyxLQUFOLEtBQWUsT0FBNUM7SUFDQyxLQUFLLENBQUMsT0FBTixHQUFnQixFQURqQjs7RUFHQSxTQUFTLENBQUMsSUFBVixHQUFpQixLQUFLLENBQUM7RUFDdkIsU0FBUyxDQUFDLFdBQVYsR0FDQztJQUFBLE9BQUEsRUFBUSxDQUFSO0lBQ0EsUUFBQSxFQUFTLENBRFQ7SUFFQSxNQUFBLEVBQU8sRUFGUDs7QUFJRCxVQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBaEI7QUFBQSxTQUNNLGdCQUROO01BRUUsSUFBQyxDQUFBLGFBQUQsR0FBaUI7TUFDakIsSUFBQyxDQUFBLFNBQUQsR0FBYTtBQUZUO0FBRE4sU0FLTSxZQUxOO01BTUUsSUFBQyxDQUFBLGFBQUQsR0FBaUI7TUFDakIsSUFBQyxDQUFBLFNBQUQsR0FBYSxDQUFFO0FBRlg7QUFMTjtNQVNFLElBQUMsQ0FBQSxhQUFELEdBQWlCO01BQ2pCLElBQUMsQ0FBQSxTQUFELEdBQWE7QUFWZjtFQWNBLElBQUMsQ0FBQSxJQUFELEdBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFSLENBQUE7RUFDUixJQUFBLEdBQVcsSUFBQSxDQUFDLENBQUMsSUFBRixDQUFPO0lBQUEsS0FBQSxFQUFNLGVBQU47SUFBdUIsSUFBQSxFQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBUixDQUFzQixJQUFDLENBQUEsSUFBdkIsRUFBNkIsS0FBSyxDQUFDLE9BQW5DLENBQTVCO0lBQXlFLFFBQUEsRUFBUyxFQUFsRjtJQUFzRixVQUFBLEVBQVcsR0FBakc7SUFBc0csVUFBQSxFQUFXLFNBQWpIO0lBQTRILEtBQUEsRUFBTSxLQUFLLENBQUMsS0FBeEk7SUFBK0ksSUFBQSxFQUFLLE1BQXBKO0lBQTRKLE9BQUEsRUFBUSxLQUFLLENBQUMsT0FBMUs7R0FBUDtFQUNYLElBQUksQ0FBQyxXQUFMLEdBQ0M7SUFBQSxRQUFBLEVBQVMsQ0FBVDtJQUNBLEtBQUEsRUFBTSxVQUROOztFQUVELENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBUixDQUFxQixJQUFyQixFQUEyQixLQUFLLENBQUMsT0FBakM7RUFHQSxXQUFBLEdBQWtCLElBQUEsS0FBQSxDQUFNO0lBQUEsVUFBQSxFQUFXLFNBQVg7SUFBc0IsZUFBQSxFQUFnQixhQUF0QztJQUFxRCxJQUFBLEVBQUssYUFBMUQ7R0FBTjtFQUNsQixJQUFHLEtBQUssQ0FBQyxPQUFOLEdBQWdCLEVBQW5CO0lBQ0MsV0FBQSxHQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBUixDQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBckI7SUFDZCxXQUFXLENBQUMsSUFBWixHQUFtQixXQUFXLENBQUM7SUFDL0IsV0FBVyxDQUFDLE1BQVosR0FBcUIsV0FBVyxDQUFDO0lBQ2pDLFdBQVcsQ0FBQyxLQUFaLEdBQW9CLFdBQVcsQ0FBQztJQUNoQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVIsQ0FBbUIsV0FBbkIsRUFBZ0MsS0FBSyxDQUFDLEtBQXRDO0lBQ0EsV0FBVyxDQUFDLE9BQVosR0FBc0IsS0FBSyxDQUFDLFFBTjdCOztFQVFBLElBQUcsS0FBSyxDQUFDLE9BQU4sSUFBaUIsRUFBakIsSUFBdUIsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsRUFBMUM7SUFDQyxVQUFBLEdBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFSLENBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFyQjtJQUNiLFdBQVcsQ0FBQyxJQUFaLEdBQW1CLFVBQVUsQ0FBQztJQUM5QixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVIsQ0FBbUIsV0FBbkIsRUFBZ0MsS0FBSyxDQUFDLEtBQXRDLEVBSEQ7O0VBS0EsSUFBRyxLQUFLLENBQUMsT0FBTixJQUFpQixFQUFwQjtJQUNDLFVBQUEsR0FBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQVIsQ0FBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQXJCO0lBQ2IsV0FBVyxDQUFDLElBQVosR0FBbUIsVUFBVSxDQUFDO0lBQzlCLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUixDQUFtQixXQUFuQixFQUFnQyxLQUFLLENBQUMsS0FBdEMsRUFIRDs7RUFNQSxXQUFXLENBQUMsV0FBWixHQUNDO0lBQUEsUUFBQSxFQUFXLENBQUMsSUFBRCxFQUFPLENBQVAsQ0FBWDtJQUNBLEtBQUEsRUFBTSxVQUROOztFQUlELFlBQUEsR0FBZSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQVIsQ0FBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQXJCO0VBQ2YsUUFBQSxHQUFlLElBQUEsS0FBQSxDQUNkO0lBQUEsS0FBQSxFQUFNLFlBQVksQ0FBQyxLQUFuQjtJQUNBLE1BQUEsRUFBTyxZQUFZLENBQUMsTUFEcEI7SUFFQSxJQUFBLEVBQUssWUFBWSxDQUFDLEdBRmxCO0lBR0EsVUFBQSxFQUFXLFNBSFg7SUFJQSxlQUFBLEVBQWdCLGFBSmhCO0lBS0EsT0FBQSxFQUFTLEtBQUssQ0FBQyxPQUxmO0lBTUEsSUFBQSxFQUFLLFVBTkw7R0FEYztFQVNmLFFBQVEsQ0FBQyxXQUFULEdBQ0M7SUFBQSxRQUFBLEVBQVUsQ0FBQyxXQUFELEVBQWMsQ0FBZCxDQUFWO0lBQ0EsS0FBQSxFQUFNLFVBRE47O0VBR0QsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFSLENBQW1CLFFBQW5CLEVBQTZCLEtBQUssQ0FBQyxLQUFuQztFQUVBLFFBQUEsR0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQVIsQ0FBWSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQXJCLEVBQTJCLEtBQUssQ0FBQyxLQUFqQztFQUVYLElBQUEsR0FBVyxJQUFBLEtBQUEsQ0FDVjtJQUFBLEtBQUEsRUFBTSxRQUFRLENBQUMsS0FBZjtJQUNBLE1BQUEsRUFBTyxRQUFRLENBQUMsTUFEaEI7SUFFQSxVQUFBLEVBQVcsU0FGWDtJQUdBLGVBQUEsRUFBZ0IsYUFIaEI7SUFJQSxJQUFBLEVBQUssTUFKTDtJQUtBLElBQUEsRUFBTSxRQUFRLENBQUMsR0FMZjtJQU1BLE9BQUEsRUFBUyxLQUFLLENBQUMsT0FOZjtHQURVO0VBU1gsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFSLENBQW1CLElBQW5CLEVBQXlCLEtBQUssQ0FBQyxLQUEvQjtFQUVBLElBQUksQ0FBQyxXQUFMLEdBQ0M7SUFBQSxRQUFBLEVBQVMsQ0FBQyxRQUFELEVBQVcsQ0FBWCxDQUFUO0lBQ0EsS0FBQSxFQUFNLFVBRE47O0VBR0QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQUE7RUFHQSxTQUFTLENBQUMsT0FBVixHQUFvQjtFQUVwQixTQUFTLENBQUMsT0FBTyxDQUFDLElBQWxCLEdBQXlCO0VBRXpCLFNBQVMsQ0FBQyxJQUFWLEdBQWlCO0VBRWpCLFNBQVMsQ0FBQyxRQUFWLEdBQXFCO0VBRXJCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUNDO0lBQUEsTUFBQSxFQUFPLENBQUMsU0FBRCxFQUFZLElBQVosRUFBa0IsV0FBbEIsRUFBK0IsUUFBL0IsRUFBeUMsSUFBekMsQ0FBUDtHQUREO0FBRUEsU0FBTztBQWxIUzs7OztBQ2pCakIsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGNBQVI7O0FBR0osT0FBTyxDQUFDLFFBQVIsR0FBbUI7RUFDbEIsV0FBQSxFQUFZLEVBRE07RUFFbEIsSUFBQSxFQUFNLHFCQUZZO0VBR2xCLElBQUEsRUFBSyxNQUhhO0VBSWxCLENBQUEsRUFBRSxDQUpnQjtFQUtsQixDQUFBLEVBQUUsQ0FMZ0I7RUFNbEIsS0FBQSxFQUFNLENBQUMsQ0FOVztFQU9sQixNQUFBLEVBQU8sQ0FBQyxDQVBVO0VBUWxCLFVBQUEsRUFBVyxNQVJPO0VBU2xCLEtBQUEsRUFBTSxTQVRZO0VBVWxCLEtBQUEsRUFBTSxDQVZZO0VBV2xCLFNBQUEsRUFBVSxNQVhRO0VBWWxCLGVBQUEsRUFBZ0IsYUFaRTtFQWFsQixLQUFBLEVBQU0sT0FiWTtFQWNsQixRQUFBLEVBQVUsRUFkUTtFQWVsQixTQUFBLEVBQVUsU0FmUTtFQWdCbEIsVUFBQSxFQUFXLFFBaEJPO0VBaUJsQixVQUFBLEVBQVcsU0FqQk87RUFrQmxCLFVBQUEsRUFBVyxNQWxCTztFQW1CbEIsSUFBQSxFQUFLLFlBbkJhO0VBb0JsQixPQUFBLEVBQVEsQ0FwQlU7RUFxQmxCLGFBQUEsRUFBYyxNQXJCSTtFQXNCbEIsYUFBQSxFQUFjLENBdEJJO0VBdUJsQixJQUFBLEVBQUssWUF2QmE7OztBQTJCbkIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFqQixHQUF5QixNQUFNLENBQUMsSUFBUCxDQUFZLE9BQU8sQ0FBQyxRQUFwQjs7QUFFekIsS0FBQSxHQUFRLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCOztBQUNSLEtBQUssQ0FBQyxJQUFOLEdBQWE7O0FBRWIsS0FBSyxDQUFDLFdBQU4sQ0FBa0IsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsNk5BQXhCLENBQWxCOztBQUVBLFFBQVEsQ0FBQyxvQkFBVCxDQUE4QixNQUE5QixDQUFzQyxDQUFBLENBQUEsQ0FBRSxDQUFDLFdBQXpDLENBQXFELEtBQXJEOztBQUdBLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLFNBQUMsS0FBRDtBQUNoQixNQUFBO0VBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBUixDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQUMsUUFBdEM7RUFDUixVQUFBLEdBQWEsTUFBTSxDQUFDLElBQVAsQ0FBWSxLQUFaO0VBQ2IsU0FBQSxHQUFnQixJQUFBLEtBQUEsQ0FBTTtJQUFBLGVBQUEsRUFBZ0IsYUFBaEI7SUFBK0IsSUFBQSxFQUFLLEtBQUssQ0FBQyxJQUExQztHQUFOO0VBQ2hCLFNBQVMsQ0FBQyxJQUFWLEdBQWlCO0VBQ2pCLFNBQVMsQ0FBQyxJQUFWLEdBQWlCLEtBQUssQ0FBQztBQUN2QjtBQUFBLE9BQUEscUNBQUE7O0lBQ0MsSUFBRyxLQUFNLENBQUEsSUFBQSxDQUFUO01BQ0MsSUFBRyxJQUFBLEtBQVEsT0FBWDtRQUNDLEtBQU0sQ0FBQSxJQUFBLENBQU4sR0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQVIsQ0FBYyxLQUFNLENBQUEsSUFBQSxDQUFwQixFQURmOztNQUVBLFNBQVUsQ0FBQSxJQUFBLENBQVYsR0FBa0IsS0FBTSxDQUFBLElBQUEsRUFIekI7O0FBREQ7QUFLQTtBQUFBLE9BQUEsd0NBQUE7O0lBQ0MsSUFBRyxLQUFNLENBQUEsSUFBQSxDQUFUO01BQ0MsSUFBRyxJQUFBLEtBQVEsWUFBUixJQUF3QixLQUFNLENBQUEsSUFBQSxDQUFOLEtBQWUsTUFBMUM7UUFDQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQWhCLEdBQThCLEtBQUssQ0FBQyxTQURyQzs7TUFFQSxJQUFHLElBQUEsS0FBUSxZQUFYO0FBQ0MsZ0JBQU8sS0FBTSxDQUFBLElBQUEsQ0FBYjtBQUFBLGVBQ00sV0FETjtZQUN1QixLQUFNLENBQUEsSUFBQSxDQUFOLEdBQWM7QUFBL0I7QUFETixlQUVNLE1BRk47WUFFa0IsS0FBTSxDQUFBLElBQUEsQ0FBTixHQUFjO0FBQTFCO0FBRk4sZUFHTSxPQUhOO1lBR21CLEtBQU0sQ0FBQSxJQUFBLENBQU4sR0FBYztBQUEzQjtBQUhOLGVBSU0sU0FKTjtZQUlxQixLQUFNLENBQUEsSUFBQSxDQUFOLEdBQWM7QUFBN0I7QUFKTixlQUtNLFFBTE47WUFLb0IsS0FBTSxDQUFBLElBQUEsQ0FBTixHQUFjO0FBQTVCO0FBTE4sZUFNTSxVQU5OO1lBTXNCLEtBQU0sQ0FBQSxJQUFBLENBQU4sR0FBYztBQUE5QjtBQU5OLGVBT00sTUFQTjtZQU9rQixLQUFNLENBQUEsSUFBQSxDQUFOLEdBQWM7QUFBMUI7QUFQTixlQVFNLE9BUk47WUFRbUIsS0FBTSxDQUFBLElBQUEsQ0FBTixHQUFjO0FBUmpDLFNBREQ7O01BVUEsSUFBRyxJQUFBLEtBQVEsVUFBUixJQUFzQixJQUFBLEtBQVEsWUFBOUIsSUFBOEMsSUFBQSxLQUFRLGVBQXpEO1FBQ0MsS0FBTSxDQUFBLElBQUEsQ0FBTixHQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEtBQU0sQ0FBQSxJQUFBLENBQWpCLENBQUEsR0FBMEIsS0FEekM7O01BRUEsU0FBUyxDQUFDLEtBQU0sQ0FBQSxJQUFBLENBQWhCLEdBQXdCLEtBQU0sQ0FBQSxJQUFBLEVBZi9COztBQUREO0VBa0JBLFNBQUEsR0FBWSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVIsQ0FBcUIsU0FBckI7RUFDWixTQUFTLENBQUMsS0FBVixHQUFtQjtJQUFBLE1BQUEsRUFBTyxTQUFTLENBQUMsTUFBakI7SUFBeUIsS0FBQSxFQUFNLFNBQVMsQ0FBQyxLQUF6Qzs7RUFDbkIsU0FBUyxDQUFDLFdBQVYsR0FBd0IsS0FBSyxDQUFDO0VBQzlCLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUNDO0lBQUEsTUFBQSxFQUFPLFNBQVA7R0FERDtBQUVBLFNBQU87QUFsQ1M7Ozs7QUN4Q2pCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUdKLE9BQU8sQ0FBQyxFQUFSLEdBQWEsU0FBQyxFQUFEO0FBQ1osTUFBQTtFQUFBLEVBQUEsR0FBSyxFQUFBLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztFQUNqQixFQUFBLEdBQUssSUFBSSxDQUFDLEtBQUwsQ0FBVyxFQUFYO0FBQ0wsU0FBTztBQUhLOztBQU1iLE9BQU8sQ0FBQyxFQUFSLEdBQWEsU0FBQyxFQUFEO0FBQ1osTUFBQTtFQUFBLEVBQUEsR0FBSyxFQUFBLEdBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztFQUNuQixFQUFBLEdBQUssSUFBSSxDQUFDLEtBQUwsQ0FBVyxFQUFYO0FBQ0wsU0FBTztBQUhLOztBQU1iLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLFNBQUMsV0FBRDtBQUNmLE1BQUE7RUFBQSxJQUFHLFdBQVksQ0FBQSxDQUFBLENBQVosS0FBa0IsR0FBckI7QUFDQyxXQUFPLFlBRFI7R0FBQSxNQUFBO0lBR0MsS0FBQSxHQUFhLElBQUEsS0FBQSxDQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFBLFdBQUEsQ0FBbkI7SUFDYixJQUFHLFdBQUEsS0FBZSxhQUFsQjtNQUNDLEtBQUEsR0FBUSxjQURUOztBQUVBLFdBQU8sTUFOUjs7QUFEZTs7QUFhaEIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsU0FBQyxNQUFEO0VBRWYsTUFBQSxHQUFTLE1BQU0sQ0FBQyxPQUFQLENBQWUsY0FBZixFQUErQixHQUEvQixDQUFtQyxDQUFDLE9BQXBDLENBQTRDLFlBQTVDLEVBQTBELEVBQTFEO0FBQ1QsU0FBTztBQUhROztBQU1oQixPQUFPLENBQUMsR0FBUixHQUFjLFNBQUMsR0FBRDtBQUViLE1BQUE7RUFBQSxVQUFBLEdBQWEsR0FBRyxDQUFDLE1BQUosQ0FBVyxhQUFYO0VBQ2IsUUFBQSxHQUFXLEdBQUcsQ0FBQyxNQUFKLENBQVcsVUFBWDtFQUNYLE1BQUEsR0FBUyxHQUFHLENBQUMsS0FBSixDQUFVLFVBQVYsRUFBc0IsUUFBdEI7RUFHVCxXQUFBLEdBQWMsTUFBTSxDQUFDLE1BQVAsQ0FBYyxHQUFkLENBQUEsR0FBcUI7RUFDbkMsU0FBQSxHQUFhLE1BQU0sQ0FBQyxNQUFQLENBQWMsSUFBZDtFQUNiLEtBQUEsR0FBUSxNQUFNLENBQUMsS0FBUCxDQUFhLFdBQWIsRUFBMEIsU0FBMUI7RUFDUixRQUFBLEdBQVcsT0FBTyxDQUFDLEVBQVIsQ0FBVyxLQUFYO0VBR1gsWUFBQSxHQUFlLE1BQU0sQ0FBQyxLQUFQLENBQWEsU0FBQSxHQUFZLENBQXpCLEVBQTRCLE1BQU0sQ0FBQyxNQUFuQztFQUNmLFdBQUEsR0FBYyxZQUFZLENBQUMsTUFBYixDQUFvQixHQUFwQixDQUFBLEdBQTBCO0VBQ3hDLFNBQUEsR0FBWSxZQUFZLENBQUMsTUFBYixDQUFvQixJQUFwQjtFQUNaLE1BQUEsR0FBUyxZQUFZLENBQUMsS0FBYixDQUFtQixXQUFuQixFQUFnQyxTQUFoQztFQUNULFNBQUEsR0FBWSxPQUFPLENBQUMsRUFBUixDQUFXLE1BQVg7RUFHWixTQUFBLEdBQVksTUFBTSxDQUFDLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLFFBQXRCO0VBQ1osU0FBQSxHQUFZLFNBQVMsQ0FBQyxPQUFWLENBQWtCLE1BQWxCLEVBQTBCLFNBQTFCO0VBR1osR0FBQSxHQUFNLEdBQUcsQ0FBQyxPQUFKLENBQVksTUFBWixFQUFvQixTQUFwQjtBQUVOLFNBQU87SUFDTixHQUFBLEVBQUksR0FERTtJQUVOLEtBQUEsRUFBTSxRQUZBO0lBR04sTUFBQSxFQUFPLFNBSEQ7O0FBMUJNOztBQWlDZCxPQUFPLENBQUMsVUFBUixHQUFxQixTQUFDLEtBQUQsRUFBUSxLQUFSO0FBQ3BCLE1BQUE7RUFBQSxJQUFHLE9BQU8sS0FBUCxLQUFnQixRQUFuQjtJQUNDLEtBQUEsR0FBUSxPQUFPLENBQUMsS0FBUixDQUFjLEtBQWQsRUFEVDs7RUFFQSxVQUFBLEdBQWEsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFYLENBQWtCLFVBQWxCO0VBQ2IsVUFBQSxHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBWCxDQUFpQixVQUFqQixFQUE2QixLQUFLLENBQUMsSUFBSSxDQUFDLE1BQXhDO0VBQ2IsUUFBQSxHQUFXLFVBQVUsQ0FBQyxNQUFYLENBQWtCLElBQWxCLENBQUEsR0FBMEI7RUFDckMsTUFBQSxHQUFTLFVBQVUsQ0FBQyxLQUFYLENBQWlCLENBQWpCLEVBQW9CLFFBQXBCO0VBQ1QsU0FBQSxHQUFZLFNBQUEsR0FBWTtTQUN4QixLQUFLLENBQUMsSUFBTixHQUFhLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBWCxDQUFtQixNQUFuQixFQUEyQixTQUEzQjtBQVJPOztBQVVyQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFDLE1BQUQ7QUFDcEIsU0FBTyxNQUFNLENBQUMsTUFBUCxDQUFjLENBQWQsQ0FBZ0IsQ0FBQyxXQUFqQixDQUFBLENBQUEsR0FBaUMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxDQUFiO0FBRHBCOztBQUlyQixPQUFPLENBQUMsT0FBUixHQUFrQixTQUFBO0FBQ2pCLE1BQUE7RUFBQSxhQUFBLEdBQWdCLENBQUMsUUFBRCxFQUFXLFFBQVgsRUFBcUIsU0FBckIsRUFBZ0MsV0FBaEMsRUFBNkMsVUFBN0MsRUFBeUQsUUFBekQsRUFBbUUsVUFBbkU7RUFDaEIsZUFBQSxHQUFrQixDQUFDLFNBQUQsRUFBWSxVQUFaLEVBQXdCLE9BQXhCLEVBQWlDLE9BQWpDLEVBQTBDLEtBQTFDLEVBQWlELE1BQWpELEVBQXlELE1BQXpELEVBQWlFLFFBQWpFLEVBQTJFLFdBQTNFLEVBQXdGLFNBQXhGLEVBQW1HLFVBQW5HLEVBQStHLFVBQS9HO0VBQ2xCLE9BQUEsR0FBYyxJQUFBLElBQUEsQ0FBQTtFQUNkLEtBQUEsR0FBUSxlQUFnQixDQUFBLE9BQU8sQ0FBQyxRQUFSLENBQUEsQ0FBQTtFQUN4QixJQUFBLEdBQU8sT0FBTyxDQUFDLE9BQVIsQ0FBQTtFQUNQLEdBQUEsR0FBTSxhQUFjLENBQUEsT0FBTyxDQUFDLE1BQVIsQ0FBQSxDQUFBO0VBQ3BCLEtBQUEsR0FBUSxPQUFPLENBQUMsUUFBUixDQUFBO0VBQ1IsSUFBQSxHQUFPLE9BQU8sQ0FBQyxVQUFSLENBQUE7RUFDUCxJQUFBLEdBQU8sT0FBTyxDQUFDLFVBQVIsQ0FBQTtBQUNQLFNBQU87SUFDTixLQUFBLEVBQU0sS0FEQTtJQUVOLElBQUEsRUFBSyxJQUZDO0lBR04sR0FBQSxFQUFJLEdBSEU7SUFJTixLQUFBLEVBQU0sS0FKQTtJQUtOLElBQUEsRUFBSyxJQUxDO0lBTU4sSUFBQSxFQUFLLElBTkM7O0FBVlU7O0FBbUJsQixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQ7RUFDaEIsS0FBSyxDQUFDLEtBQU0sQ0FBQSx5QkFBQSxDQUFaLEdBQXlDLE9BQUEsR0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFSLENBQVcsQ0FBWCxDQUFELENBQVAsR0FBc0I7QUFDL0QsU0FBTztBQUZTOztBQUlqQixPQUFPLENBQUMsWUFBUixHQUF1QixTQUFDLFNBQUQ7QUFFdEIsTUFBQTtFQUFBLFdBQUEsR0FBYztFQUNkLElBQUcsU0FBUyxDQUFDLFdBQWI7SUFDQyxJQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBekI7TUFDQyxXQUFXLENBQUMsTUFBWixHQUFxQixPQUFPLENBQUMsRUFBUixDQUFXLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBakMsRUFEdEI7O0lBRUEsSUFBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQXpCO01BQ0MsV0FBVyxDQUFDLEtBQVosR0FBb0IsT0FBTyxDQUFDLEVBQVIsQ0FBVyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQWpDLEVBRHJCO0tBSEQ7O0VBTUEsTUFBQSxHQUNDO0lBQUEsUUFBQSxFQUFVLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBMUI7SUFDQSxVQUFBLEVBQVksU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUQ1QjtJQUVBLFVBQUEsRUFBWSxTQUFTLENBQUMsS0FBSyxDQUFDLFVBRjVCO0lBR0EsU0FBQSxFQUFXLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FIM0I7SUFJQSxVQUFBLEVBQVksU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUo1QjtJQUtBLGFBQUEsRUFBZSxTQUFTLENBQUMsS0FBSyxDQUFDLGFBTC9CO0lBTUEsYUFBQSxFQUFlLFNBQVMsQ0FBQyxLQUFLLENBQUMsYUFOL0I7O0VBT0QsU0FBQSxHQUFZLEtBQUssQ0FBQyxRQUFOLENBQWUsU0FBUyxDQUFDLElBQXpCLEVBQStCLE1BQS9CLEVBQXVDLFdBQXZDO0FBQ1osU0FBTztJQUNOLEtBQUEsRUFBUSxTQUFTLENBQUMsS0FEWjtJQUVOLE1BQUEsRUFBUSxTQUFTLENBQUMsTUFGWjs7QUFsQmU7O0FBdUJ2QixPQUFPLENBQUMsU0FBUixHQUFvQixTQUFBO0FBRW5CLE1BQUE7RUFBQSxNQUFBLEdBQVM7RUFDVCxLQUFBLEdBQVE7RUFDUixJQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBWSxDQUFBLFVBQUEsQ0FBbEIsSUFBaUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFZLENBQUEsVUFBQSxDQUFZLENBQUEsV0FBQSxDQUFsRTtJQUNDLE1BQUEsR0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVksQ0FBQSxVQUFBLENBQVksQ0FBQSxXQUFBO0lBQ3ZDLEtBQUEsR0FBUTtJQUNSLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBZCxHQUEyQixhQUg1Qjs7RUFLQSxJQUFHLEtBQUg7SUFDQyxNQUFBLEdBQ0M7TUFBQSxJQUFBLEVBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFwQjtNQUNBLEtBQUEsRUFBUyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQVEsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQWQsQ0FBeUIsQ0FBQyxXQUQ3RDtNQUVBLE1BQUEsRUFBUyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQVEsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQWQsQ0FBeUIsQ0FBQyxZQUY3RDtNQUdBLEtBQUEsRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQWEsQ0FBQSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQVEsQ0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQWQsQ0FBeUIsQ0FBQyxXQUFwRCxDQUgxQjtNQUZGOztFQU9BLElBQUcsTUFBTSxDQUFDLEtBQVAsS0FBZ0IsTUFBbkI7SUFDQyxNQUFNLENBQUMsS0FBUCxHQUFlLEVBRGhCOztFQUVBLElBQUcsTUFBTSxDQUFDLEtBQVAsS0FBZ0IsTUFBbkI7SUFDQyxNQUFNLENBQUMsS0FBUCxHQUFlLFdBRGhCOztFQUVBLElBQUcsTUFBTSxDQUFDLE1BQVAsS0FBaUIsTUFBcEI7SUFDQyxNQUFNLENBQUMsTUFBUCxHQUFnQixZQURqQjs7QUFHQSxTQUFPO0FBdkJZOztBQTJCcEIsT0FBTyxDQUFDLFdBQVIsR0FBc0IsU0FBQyxLQUFEO0FBQ3JCLE1BQUE7RUFBQSxJQUFBLEdBQU87RUFDUCxJQUFHLEtBQUssQ0FBQyxJQUFOLEtBQWMsUUFBakI7SUFDQyxJQUFBLEdBQU8sS0FBSyxDQUFDLE1BRGQ7O0VBRUEsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsSUFBbEIsQ0FBQSxLQUEyQixDQUFDLENBQS9CO0lBQ0MsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixLQUFsQixFQUF5QixFQUF6QjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRCxFQUFpQjtRQUFDLFVBQUEsRUFBVyxHQUFaO09BQWpCO0tBQXJCLEVBRkQ7O0VBR0EsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsSUFBbEIsQ0FBQSxLQUEyQixDQUFDLENBQS9CO0lBQ0MsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixLQUFsQixFQUF5QixFQUF6QjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRCxFQUFpQjtRQUFDLEtBQUEsRUFBTSxLQUFQO09BQWpCO0tBQXJCLEVBRkQ7O0VBR0EsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsQ0FBQSxLQUE0QixDQUFDLENBQWhDO0lBQ0MsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixNQUFsQixFQUEwQixFQUExQjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRCxFQUFpQjtRQUFDLEtBQUEsRUFBTSxNQUFQO09BQWpCO0tBQXJCLEVBRkQ7O0VBR0EsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsS0FBbEIsQ0FBQSxLQUE0QixDQUFDLENBQWhDO0lBQ0MsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixNQUFsQixFQUEwQixFQUExQjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRCxFQUFpQjtRQUFDLEtBQUEsRUFBTSxZQUFQO09BQWpCO0tBQXJCLEVBRkQ7O0VBR0EsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsSUFBbEIsQ0FBQSxLQUEyQixDQUFDLENBQS9CO0lBQ0MsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixLQUFsQixFQUF5QixFQUF6QjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRCxFQUFpQjtRQUFDLEtBQUEsRUFBTSxPQUFQO09BQWpCO0tBQXJCLEVBRkQ7O0VBR0EsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsSUFBbEIsQ0FBQSxLQUEyQixDQUFDLENBQS9CO0lBQ0MsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixLQUFsQixFQUF5QixFQUF6QjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRCxFQUFpQjtRQUFDLEtBQUEsRUFBTSxRQUFQO09BQWpCO0tBQXJCLEVBRkQ7O0VBR0EsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsSUFBbEIsQ0FBQSxLQUEyQixDQUFDLENBQS9CO0lBQ0MsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixLQUFsQixFQUF5QixFQUF6QjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRCxFQUFpQjtRQUFDLEtBQUEsRUFBTSxRQUFQO09BQWpCO0tBQXJCLEVBRkQ7O0VBR0EsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsSUFBbEIsQ0FBQSxLQUEyQixDQUFDLENBQS9CO0lBQ0MsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixLQUFsQixFQUF5QixFQUF6QjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRCxFQUFpQjtRQUFDLEtBQUEsRUFBTSxRQUFQO09BQWpCO0tBQXJCLEVBRkQ7O0VBR0EsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsSUFBbEIsQ0FBQSxLQUEyQixDQUFDLENBQS9CO0lBQ0MsV0FBQSxHQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFuQjtJQUNkLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUE3QjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRCxFQUFpQjtRQUFDLEtBQUEsRUFBTSxXQUFQO09BQWpCO0tBQXJCLEVBSEQ7O0VBSUEsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQVYsQ0FBa0IsR0FBbEIsQ0FBQSxLQUEwQixDQUFDLENBQTlCO0lBQ0MsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBVixDQUFrQixJQUFsQixFQUF3QixFQUF4QjtJQUNWLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixFQUFxQjtNQUFDO1FBQUMsSUFBQSxFQUFLLE9BQU47T0FBRDtLQUFyQixFQUZEOztFQUdBLElBQUcsS0FBSyxDQUFDLFVBQU4sS0FBb0IsTUFBdkI7SUFDQyxLQUFLLENBQUMsS0FBTixHQUFjLElBQUksQ0FBQyxNQURwQjs7U0FFQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBQTtBQXJDcUI7O0FBdUN0QixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQsRUFBUSxLQUFSO0FBQ2hCLE1BQUE7RUFBQSxJQUFHLEtBQUEsS0FBUyxNQUFaO0lBQ0MsS0FBQSxHQUFRLEdBRFQ7O0VBRUEsSUFBRyxLQUFLLENBQUMsSUFBTixLQUFjLE1BQWpCO0FBQ0MsU0FBQSx1Q0FBQTs7TUFDQyxHQUFBLEdBQU0sTUFBTSxDQUFDLElBQVAsQ0FBWSxNQUFaLENBQW9CLENBQUEsQ0FBQTtNQUMxQixLQUFBLEdBQVEsTUFBTyxDQUFBLEdBQUE7TUFDZixJQUFHLEdBQUEsS0FBTyxNQUFWO1FBQ0MsS0FBSyxDQUFDLElBQU4sR0FBYSxNQURkOztNQUVBLElBQUcsR0FBQSxLQUFPLFlBQVY7UUFDQyxLQUFLLENBQUMsS0FBTSxDQUFBLEdBQUEsQ0FBWixHQUFtQixNQURwQjs7TUFFQSxJQUFHLEdBQUEsS0FBTyxPQUFWO1FBQ0MsS0FBSyxDQUFDLEtBQU4sR0FBYyxPQUFPLENBQUMsS0FBUixDQUFjLEtBQWQsRUFEZjs7QUFQRDtJQVVBLFNBQUEsR0FBWSxPQUFPLENBQUMsWUFBUixDQUFxQixLQUFyQjtJQUNaLEtBQUssQ0FBQyxLQUFOLEdBQWMsU0FBUyxDQUFDO0lBQ3hCLEtBQUssQ0FBQyxNQUFOLEdBQWUsU0FBUyxDQUFDLE9BYjFCOztTQWdCQSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBQTtBQW5CZ0I7O0FBc0JqQixPQUFPLENBQUMsU0FBUixHQUFvQixTQUFDLFdBQUQ7QUFDbkIsTUFBQTtFQUFBLEdBQUEsR0FBTSxXQUFXLENBQUMsV0FBWixDQUFBO0VBQ04sR0FBQSxHQUFNLEdBQUcsQ0FBQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixHQUFHLENBQUMsTUFBSixHQUFXLENBQTVCO0VBQ04sR0FBQSxHQUFNLEdBQUcsQ0FBQyxPQUFKLENBQVksSUFBWixFQUFrQixFQUFsQjtFQUNOLEdBQUEsR0FBTSxHQUFHLENBQUMsT0FBSixDQUFZLElBQVosRUFBa0IsRUFBbEI7RUFDTixHQUFBLEdBQU0sR0FBRyxDQUFDLEtBQUosQ0FBVSxHQUFWO0VBQ04sR0FBQSxHQUFNLEdBQUksQ0FBQSxDQUFBO0VBQ1YsS0FBQSxHQUFRLEdBQUksQ0FBQSxDQUFBO0VBQ1osSUFBQSxHQUFPLEdBQUksQ0FBQSxDQUFBO0VBQ1gsS0FBQSxHQUFRO0VBQ1IsSUFBRyxDQUFDLEdBQUEsR0FBSSxLQUFKLEdBQVksS0FBQSxHQUFNLEtBQWxCLEdBQTBCLElBQUEsR0FBSyxLQUFoQyxDQUFBLEdBQXlDLEdBQTVDO0lBQ0MsS0FBQSxHQUFRLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxFQURUO0dBQUEsTUFBQTtJQUdDLEtBQUEsR0FBUSxPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsRUFIVDs7QUFJQSxTQUFPO0FBZFk7O0FBZ0JwQixPQUFPLENBQUMsVUFBUixHQUFxQixTQUFDLE1BQUQsRUFBUyxNQUFUO0FBQ3BCLE1BQUE7RUFBQSxTQUFBLEdBQVksTUFBTSxDQUFDO0VBQ25CLFNBQUEsR0FBWSxNQUFNLENBQUM7RUFDbkIsSUFBRyxTQUFBLEtBQWEsU0FBaEI7QUFDQyxXQUFPLEtBRFI7R0FBQSxNQUFBO0FBR0MsV0FBTyxNQUhSOztBQUhvQjs7QUFTckIsT0FBTyxDQUFDLFlBQVIsR0FBdUIsU0FBQyxLQUFELEVBQVEsU0FBUjtFQUN0QixJQUFDLENBQUEsSUFBRCxHQUFRLE9BQU8sQ0FBQyxPQUFSLENBQUE7U0FDUixLQUFLLENBQUMsS0FBTixDQUFZLEVBQUEsR0FBSyxJQUFDLENBQUEsSUFBSSxDQUFDLElBQXZCLEVBQTZCLFNBQUE7SUFDNUIsSUFBQyxDQUFBLElBQUQsR0FBUSxPQUFPLENBQUMsT0FBUixDQUFBO0lBQ1IsT0FBTyxDQUFDLE1BQVIsQ0FBZSxLQUFmLEVBQXNCO01BQUM7UUFBQSxJQUFBLEVBQUssT0FBTyxDQUFDLGFBQVIsQ0FBc0IsSUFBQyxDQUFBLElBQXZCLEVBQTZCLFNBQTdCLENBQUw7T0FBRDtLQUF0QjtXQUNBLEtBQUssQ0FBQyxRQUFOLENBQWUsRUFBZixFQUFtQixTQUFBO01BQ2xCLElBQUMsQ0FBQSxJQUFELEdBQVEsT0FBTyxDQUFDLE9BQVIsQ0FBQTthQUNSLE9BQU8sQ0FBQyxNQUFSLENBQWUsS0FBZixFQUFzQjtRQUFDO1VBQUEsSUFBQSxFQUFLLE9BQU8sQ0FBQyxhQUFSLENBQXNCLElBQUMsQ0FBQSxJQUF2QixFQUE2QixTQUE3QixDQUFMO1NBQUQ7T0FBdEI7SUFGa0IsQ0FBbkI7RUFINEIsQ0FBN0I7QUFGc0I7O0FBU3ZCLE9BQU8sQ0FBQyxhQUFSLEdBQXdCLFNBQUMsT0FBRCxFQUFVLFNBQVY7RUFDdkIsSUFBRyxTQUFBLEtBQWEsS0FBaEI7SUFDQyxJQUFHLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEVBQW5CO01BQ0MsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsR0FEakM7O0lBRUEsSUFBRyxPQUFPLENBQUMsS0FBUixLQUFpQixDQUFwQjtNQUEyQixPQUFPLENBQUMsS0FBUixHQUFnQixHQUEzQztLQUhEOztFQUlBLElBQUcsT0FBTyxDQUFDLElBQVIsR0FBZSxFQUFsQjtJQUNDLE9BQU8sQ0FBQyxJQUFSLEdBQWUsR0FBQSxHQUFNLE9BQU8sQ0FBQyxLQUQ5Qjs7QUFFQSxTQUFPLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEdBQWhCLEdBQXNCLE9BQU8sQ0FBQztBQVBkOztBQVN4QixPQUFPLENBQUMsY0FBUixHQUF5QixTQUFDLEtBQUQsRUFBUSxRQUFSO0FBQ3hCLE1BQUE7RUFBQSxJQUFHLEtBQUEsS0FBUyxNQUFaO0lBQ0MsS0FBQSxHQUFRLEdBRFQ7O0VBRUEsR0FBQSxHQUFNO0FBQ047QUFBQSxPQUFBLHFDQUFBOztJQUNDLElBQUcsS0FBTSxDQUFBLENBQUEsQ0FBTixLQUFZLE1BQWY7TUFDQyxHQUFJLENBQUEsQ0FBQSxDQUFKLEdBQVMsS0FBTSxDQUFBLENBQUEsRUFEaEI7S0FBQSxNQUFBO01BR0MsR0FBSSxDQUFBLENBQUEsQ0FBSixHQUFTLFFBQVMsQ0FBQSxDQUFBLEVBSG5COztBQUREO0FBS0EsU0FBTztBQVRpQjs7QUFZekIsT0FBTyxDQUFDLGNBQVIsR0FBeUIsU0FBQyxNQUFEO0FBQ3ZCLE1BQUE7RUFBQSxhQUFBLEdBQWdCO0VBQ2hCLElBQUcsTUFBTyxDQUFBLENBQUEsQ0FBUCxLQUFhLEdBQWIsSUFBb0IsTUFBTyxDQUFBLENBQUEsQ0FBUCxLQUFhLEdBQWpDLElBQXdDLE1BQU8sQ0FBQSxDQUFBLENBQVAsS0FBYSxHQUFyRCxJQUE0RCxNQUFPLENBQUEsQ0FBQSxDQUFQLEtBQWEsR0FBNUU7SUFDQyxZQUFBLEdBQWUsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiO0FBQ2YsU0FBQSw4Q0FBQTs7TUFDQyxhQUFBLEdBQWdCLGFBQUEsR0FBZ0IsR0FBaEIsR0FBc0I7QUFEdkMsS0FGRDtHQUFBLE1BQUE7SUFLQyxZQUFBLEdBQWUsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiO0lBQ2YsYUFBQSxHQUFnQjtBQUNoQixTQUFBLGdEQUFBOztNQUNDLGFBQUEsR0FBZ0IsYUFBQSxHQUFnQixHQUFoQixHQUFzQjtBQUR2QyxLQVBEOztFQVNBLE9BQUEsR0FBVSxrQkFBQSxDQUFtQixhQUFuQjtBQUNWLFNBQU87QUFaZ0I7O0FBY3pCLE9BQU8sQ0FBQyxpQkFBUixHQUE0QixTQUFBO0FBQzNCLE1BQUE7RUFBQSxNQUFBLEdBQVM7QUFDVDtBQUFBO09BQUEscURBQUE7O0lBQ0MsS0FBQSxHQUFRLE9BQU8sQ0FBQyxjQUFSLENBQXVCLElBQXZCO2lCQUNSLE1BQU0sQ0FBQyxJQUFQLENBQVksS0FBWjtBQUZEOztBQUYyQjs7QUFNNUIsT0FBTyxDQUFDLFFBQVIsR0FBbUIsU0FBQyxHQUFEO0FBQ2pCLE1BQUE7RUFBQSxPQUFBLEdBQVUsUUFBQSxDQUFTLEdBQVQsRUFBYyxFQUFkO0VBQ1YsS0FBQSxHQUFVLElBQUksQ0FBQyxLQUFMLENBQVcsT0FBQSxHQUFVLElBQXJCO0VBQ1YsT0FBQSxHQUFVLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQyxPQUFBLEdBQVUsQ0FBQyxLQUFBLEdBQVEsSUFBVCxDQUFYLENBQUEsR0FBNkIsRUFBeEM7RUFDVixPQUFBLEdBQVUsT0FBQSxHQUFVLENBQUMsS0FBQSxHQUFRLElBQVQsQ0FBVixHQUEyQixDQUFDLE9BQUEsR0FBVSxFQUFYO0VBRXJDLElBQUksS0FBQSxHQUFVLEVBQWQ7SUFBdUIsS0FBQSxHQUFVLEdBQUEsR0FBSSxNQUFyQzs7RUFDQSxJQUFJLE9BQUEsR0FBVSxFQUFkO0lBQXVCLE9BQUEsR0FBVSxFQUFBLEdBQUcsUUFBcEM7O0VBQ0EsSUFBSSxPQUFBLEdBQVUsRUFBZDtJQUF1QixPQUFBLEdBQVUsR0FBQSxHQUFJLFFBQXJDOztFQUNBLFVBQUEsR0FBYTtFQUNiLElBQUcsS0FBQSxLQUFTLElBQVo7SUFDRSxVQUFBLEdBQWEsS0FBQSxHQUFNLEdBQU4sR0FBVSxPQUFWLEdBQWtCLEdBQWxCLEdBQXNCLFFBRHJDO0dBQUEsTUFBQTtJQUdFLFVBQUEsR0FBYSxPQUFBLEdBQVEsR0FBUixHQUFZLFFBSDNCOztBQUtBLFNBQU87QUFmVTs7QUFrQm5CLE9BQU8sQ0FBQyxJQUFSLEdBQWUsU0FBQyxLQUFEO0FBQ2QsTUFBQTtFQUFBLE1BQUEsR0FBUyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQVosR0FBa0I7RUFDM0IsTUFBQSxHQUFTLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBWixHQUFtQjtFQUU1QixRQUFBLEdBQVc7RUFDWCxhQUFBLEdBQWdCO0VBQ2hCLFFBQUEsR0FBVztFQUNYLFFBQUEsR0FBVztFQUNYLFVBQUEsR0FBYTtFQUNiLFNBQUEsR0FBWTtFQUVaLElBQUcsS0FBSyxDQUFDLFNBQU4sS0FBbUIsTUFBdEI7SUFDQyxTQUFBLEdBQVksS0FBSyxDQUFDLFVBRG5COztFQUdBLElBQUcsS0FBSyxDQUFDLEtBQU4sS0FBZSxNQUFsQjtJQUNDLFFBQUEsR0FBVyxDQUFDLENBQUMsS0FBRixDQUFRLEtBQUssQ0FBQyxLQUFkLEVBRFo7O0VBR0EsSUFBRyxLQUFLLENBQUMsS0FBTixLQUFlLE1BQWxCO0lBQ0MsUUFBQSxHQUFXLEtBQUssQ0FBQyxNQURsQjs7RUFHQSxJQUFHLEtBQUssQ0FBQyxVQUFOLEtBQW9CLE1BQXZCO0lBQ0MsYUFBQSxHQUFnQixLQUFLLENBQUMsV0FEdkI7O0VBR0EsSUFBRyxLQUFLLENBQUMsS0FBTixLQUFlLE1BQWxCO0lBQ0MsUUFBQSxHQUFXLEtBQUssQ0FBQyxNQURsQjs7RUFHQSxJQUFHLEtBQUssQ0FBQyxPQUFOLEtBQWlCLE1BQXBCO0lBQ0MsVUFBQSxHQUFhLEtBQUssQ0FBQyxRQURwQjs7RUFHQSxVQUFBLEdBQWEsU0FBQyxLQUFELEVBQVEsS0FBUjtBQUNaLFFBQUE7SUFBQSxJQUFHLFNBQUEsS0FBYSxJQUFoQjtNQUNDLE1BQUEsR0FBUyxLQUFLLENBQUM7TUFDZixNQUFBLEdBQVMsS0FBSyxDQUFDO01BRWYsSUFBRyxLQUFLLENBQUMsUUFBTixDQUFBLENBQUEsS0FBb0IsS0FBcEIsSUFBNkIsS0FBSyxDQUFDLE9BQU4sQ0FBQSxDQUFoQztRQUNDLE1BQUEsR0FBUyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQWxCLEdBQXNCLEtBQUssQ0FBQztRQUNyQyxNQUFBLEdBQVMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFsQixHQUFzQixLQUFLLENBQUMsRUFGdEM7T0FKRDs7SUFRQSxNQUFBLEdBQWEsSUFBQSxLQUFBLENBQ1o7TUFBQSxlQUFBLEVBQWdCLFFBQWhCO01BQ0EsSUFBQSxFQUFLLE1BREw7TUFFQSxJQUFBLEVBQUssTUFGTDtNQUdBLFVBQUEsRUFBVyxLQUhYO01BSUEsWUFBQSxFQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBUixDQUFXLEVBQVgsQ0FKYjtNQUtBLE9BQUEsRUFBUyxVQUxUO0tBRFk7SUFRYixNQUFNLENBQUMsS0FBUCxHQUFlO0lBQ2YsTUFBTSxDQUFDLE9BQVAsQ0FDQztNQUFBLFVBQUEsRUFBWTtRQUFBLEtBQUEsRUFBTSxRQUFOO1FBQWdCLE9BQUEsRUFBUSxDQUF4QjtPQUFaO01BQ0EsS0FBQSxFQUFNLFFBRE47TUFFQSxJQUFBLEVBQUssRUFGTDtLQUREO1dBSUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFaLEVBQWUsU0FBQTthQUNkLE1BQU0sQ0FBQyxPQUFQLENBQUE7SUFEYyxDQUFmO0VBdEJZO0VBeUJiLElBQUcsS0FBSyxDQUFDLFFBQU4sQ0FBQSxDQUFBLElBQW9CLEtBQUssQ0FBQyxPQUFOLENBQUEsQ0FBdkI7SUFDQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQVosQ0FBZSxNQUFNLENBQUMsU0FBdEIsRUFBaUMsU0FBQyxLQUFEO2FBQ2hDLFVBQUEsQ0FBVyxLQUFYLEVBQWtCLElBQWxCO0lBRGdDLENBQWpDLEVBREQ7O0VBR0EsSUFBRyxLQUFLLENBQUMsUUFBTixDQUFBLENBQUEsS0FBb0IsS0FBcEIsSUFBNkIsS0FBSyxDQUFDLE9BQU4sQ0FBQSxDQUFoQztJQUNDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBWixDQUFlLE1BQU0sQ0FBQyxHQUF0QixFQUEyQixTQUFDLEtBQUQ7YUFDMUIsVUFBQSxDQUFXLEtBQVgsRUFBa0IsSUFBbEI7SUFEMEIsQ0FBM0IsRUFERDs7RUFHQSxJQUFHLEtBQUssQ0FBQyxTQUFOLENBQUEsQ0FBSDtXQUNDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBWixDQUFlLE1BQU0sQ0FBQyxRQUF0QixFQUFnQyxTQUFDLEtBQUQ7YUFDL0IsVUFBQSxDQUFXLEtBQVgsRUFBa0IsSUFBbEI7SUFEK0IsQ0FBaEMsRUFERDs7QUE1RGM7Ozs7QUNwVGYsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGNBQVI7O0FBRUosT0FBTyxDQUFDLFFBQVIsR0FBbUI7RUFDakIsS0FBQSxFQUFNLE1BRFc7RUFFakIsVUFBQSxFQUFXLE1BRk07RUFHakIsTUFBQSxFQUFPLENBQUMsQ0FBQyxFQUFGLENBQUssR0FBTCxDQUhVO0VBSWpCLEtBQUEsRUFBTSxDQUFDLENBQUMsRUFBRixDQUFLLEdBQUwsQ0FKVztFQUtqQixlQUFBLEVBQWdCLGFBTEM7RUFNakIsUUFBQSxFQUFTLElBTlE7RUFPakIsV0FBQSxFQUFZO0lBQUMsR0FBQSxFQUFJLENBQUw7R0FQSztFQVFqQixHQUFBLEVBQUksSUFSYTtFQVNqQixhQUFBLEVBQWUsU0FURTtFQVVqQixJQUFBLEVBQUssS0FWWTtFQVdqQixJQUFBLEVBQUssS0FYWTtFQVlqQixTQUFBLEVBQVUsQ0FaTztFQWFqQixZQUFBLEVBQWEsSUFiSTtFQWNqQixLQUFBLEVBQU0sTUFkVzs7O0FBaUJuQixPQUFPLENBQUMsUUFBUSxDQUFDLEtBQWpCLEdBQXlCLE1BQU0sQ0FBQyxJQUFQLENBQVksT0FBTyxDQUFDLFFBQXBCOztBQUV6QixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQ7QUFDZixNQUFBO0VBQUEsS0FBQSxHQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBUixDQUF1QixLQUF2QixFQUE4QixPQUFPLENBQUMsUUFBdEM7RUFDUixJQUFHLEtBQUssQ0FBQyxHQUFUO0lBQ0ksS0FBQSxHQUFRO0lBQ1IsS0FBSyxDQUFDLEtBQU4sR0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLEtBQUssQ0FBQyxNQUFOLEdBQWUsS0FBSyxDQUFDLEtBQU4sR0FBYyxPQUhqQzs7RUFLQSxVQUFBLEdBQWlCLElBQUEsVUFBQSxDQUNmO0lBQUEsVUFBQSxFQUFXLEtBQUssQ0FBQyxVQUFqQjtJQUNBLEtBQUEsRUFBTSxLQUFLLENBQUMsS0FEWjtJQUVBLE1BQUEsRUFBTyxLQUFLLENBQUMsTUFGYjtJQUdBLEtBQUEsRUFBTSxLQUFLLENBQUMsS0FIWjtJQUlBLGVBQUEsRUFBZ0IsS0FBSyxDQUFDLGVBSnRCO0lBS0EsSUFBQSxFQUFLLE9BTEw7R0FEZTtFQVFqQixJQUFHLEtBQUssQ0FBQyxLQUFUO0lBQ0UsVUFBVSxDQUFDLEtBQVgsR0FBbUIsS0FBSyxDQUFDLE1BRDNCOztFQUdBLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBbEIsR0FBNkIsS0FBSyxDQUFDO0VBQ25DLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBbEIsR0FBMEIsS0FBSyxDQUFDO0VBQ2hDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBbEIsR0FBeUIsS0FBSyxDQUFDO0VBRS9CLElBQUcsS0FBSyxDQUFDLFdBQVQ7SUFDRSxVQUFVLENBQUMsV0FBWCxHQUF5QixLQUFLLENBQUM7SUFDL0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQWEsVUFBYixFQUZGOztFQUlBLFVBQVUsQ0FBQyxRQUFYLEdBQTBCLElBQUEsS0FBQSxDQUN4QjtJQUFBLE1BQUEsRUFBTyxVQUFVLENBQUMsTUFBbEI7SUFDQSxLQUFBLEVBQU0sVUFBVSxDQUFDLEtBRGpCO0lBRUEsVUFBQSxFQUFXLFVBRlg7SUFHQSxlQUFBLEVBQWdCLGFBSGhCO0lBSUEsSUFBQSxFQUFLLFVBSkw7R0FEd0I7RUFPMUIsS0FBQSxHQUFRLFNBQUE7QUFDTixRQUFBO0lBQUEsVUFBVSxDQUFDLFlBQVgsR0FBMEI7SUFDMUIsVUFBVSxDQUFDLFFBQVgsR0FBMEIsSUFBQSxLQUFBLENBQ3hCO01BQUEsZUFBQSxFQUFnQixDQUFDLENBQUMsS0FBRixDQUFRLE9BQVIsQ0FBaEI7TUFDQSxVQUFBLEVBQVcsVUFBVSxDQUFDLFFBRHRCO01BRUEsWUFBQSxFQUFhLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQUZiO01BR0EsTUFBQSxFQUFPLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQUhQO01BSUEsS0FBQSxFQUFNLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTCxDQUpOO01BS0EsT0FBQSxFQUFRLEVBTFI7TUFNQSxJQUFBLEVBQUssV0FOTDtLQUR3QjtJQVExQixJQUFHLEtBQUssQ0FBQyxZQUFOLEtBQXNCLEtBQXpCO01BQ0UsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFwQixHQUE4QixFQURoQzs7SUFFQSxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQXBCLENBQUE7SUFFQSxVQUFVLENBQUMsS0FBWCxHQUF1QixJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ3RCO01BQUEsSUFBQSxFQUFLLE9BQUw7TUFDQSxLQUFBLEVBQU0sT0FETjtLQURzQjtJQUl2QixVQUFVLENBQUMsSUFBWCxHQUFzQixJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ3JCO01BQUEsSUFBQSxFQUFLLFlBQUw7TUFDQSxLQUFBLEVBQU0sT0FETjtLQURxQjtJQUl0QixVQUFVLENBQUMsVUFBWCxHQUE0QixJQUFBLENBQUMsQ0FBQyxJQUFGLENBQzNCO01BQUEsSUFBQSxFQUFLLFlBQUw7TUFDQSxLQUFBLEVBQU0sT0FETjtLQUQyQjtJQUk1QixVQUFVLENBQUMsVUFBVSxDQUFDLFdBQXRCLEdBQ0U7TUFBQSxNQUFBLEVBQU8sQ0FBUDtNQUNBLFFBQUEsRUFBUyxFQURUOztJQUdGLFVBQVUsQ0FBQyxjQUFYLEdBQWdDLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDL0I7TUFBQSxJQUFBLEVBQUssaUJBQUw7TUFDQSxLQUFBLEVBQU0sT0FETjtLQUQrQjtJQUloQyxVQUFVLENBQUMsY0FBYyxDQUFDLFdBQTFCLEdBQ0U7TUFBQSxNQUFBLEVBQU8sQ0FBUDtNQUNBLFFBQUEsRUFBUyxFQURUOztJQUdGLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhLFVBQVUsQ0FBQyxVQUF4QjtJQUVBLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBaEIsR0FBMEI7SUFDMUIsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUExQixHQUFvQztJQUVwQyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQXBCLENBQWdDLFVBQVUsQ0FBQyxLQUEzQztJQUNBLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBcEIsQ0FBZ0MsVUFBVSxDQUFDLElBQTNDO0lBQ0EsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFwQixDQUFnQyxVQUFVLENBQUMsVUFBM0M7SUFDQSxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQXBCLENBQWdDLFVBQVUsQ0FBQyxjQUEzQztJQUNBLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBakIsQ0FBQTtJQUNBLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBaEIsQ0FBQTtJQUdBLFVBQVUsQ0FBQyxXQUFYLEdBQTZCLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDM0I7TUFBQSxJQUFBLEVBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFSLENBQWlCLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBbkMsQ0FBTDtNQUNBLEtBQUEsRUFBTSxPQUROO01BRUEsV0FBQSxFQUFZO1FBQUMsTUFBQSxFQUFPLENBQVI7UUFBVyxPQUFBLEVBQVEsRUFBbkI7T0FGWjtNQUdBLFVBQUEsRUFBVyxVQUFVLENBQUMsUUFIdEI7TUFJQSxRQUFBLEVBQVMsRUFKVDtNQUtBLElBQUEsRUFBSyxhQUxMO0tBRDJCO0lBUTdCLFVBQVUsQ0FBQyxPQUFYLEdBQXlCLElBQUEsQ0FBQyxDQUFDLElBQUYsQ0FDdkI7TUFBQSxJQUFBLEVBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFSLENBQWlCLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBbkMsQ0FBTDtNQUNBLEtBQUEsRUFBTSxPQUROO01BRUEsV0FBQSxFQUFZO1FBQUMsV0FBQSxFQUFZLFVBQVUsQ0FBQyxXQUF4QjtRQUFxQyxRQUFBLEVBQVMsQ0FBQyxVQUFVLENBQUMsVUFBWixFQUF3QixFQUF4QixDQUE5QztPQUZaO01BR0EsVUFBQSxFQUFXLFVBQVUsQ0FBQyxRQUh0QjtNQUlBLFFBQUEsRUFBUyxFQUpUO01BS0EsSUFBQSxFQUFLLFNBTEw7S0FEdUI7SUFRekIsVUFBVSxDQUFDLE9BQVgsR0FBeUIsSUFBQSxLQUFBLENBQ3ZCO01BQUEsVUFBQSxFQUFXLFVBQVUsQ0FBQyxRQUF0QjtNQUNBLGVBQUEsRUFBZ0IsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxTQUFSLENBRGhCO01BRUEsSUFBQSxFQUFLLFNBRkw7TUFHQSxPQUFBLEVBQVEsRUFIUjtLQUR1QjtJQU16QixVQUFVLENBQUMsT0FBTyxDQUFDLFdBQW5CLEdBQ0U7TUFBQSxPQUFBLEVBQVEsQ0FBQyxVQUFVLENBQUMsV0FBWixFQUF5QixFQUF6QixDQUFSO01BQ0EsUUFBQSxFQUFTLENBQUMsVUFBVSxDQUFDLE9BQVosRUFBcUIsRUFBckIsQ0FEVDtNQUVBLE1BQUEsRUFBTyxDQUZQO01BR0EsY0FBQSxFQUFlLFVBQVUsQ0FBQyxXQUgxQjs7SUFJRixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBYSxVQUFVLENBQUMsT0FBeEI7SUFFQSxVQUFVLENBQUMsTUFBWCxHQUF3QixJQUFBLEtBQUEsQ0FDdEI7TUFBQSxlQUFBLEVBQWdCLGFBQWhCO01BQ0EsVUFBQSxFQUFXLFVBQVUsQ0FBQyxRQUR0QjtNQUVBLElBQUEsRUFBSyxRQUZMO0tBRHNCO0lBS3hCLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBbEIsR0FDRTtNQUFBLEtBQUEsRUFBTSxFQUFOO01BQ0EsTUFBQSxFQUFPLEVBRFA7TUFFQSxjQUFBLEVBQWUsVUFBVSxDQUFDLFdBRjFCOztJQUdGLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFhLFVBQVUsQ0FBQyxNQUF4QjtJQUVBLFVBQVUsQ0FBQyxTQUFYLEdBQTJCLElBQUEsS0FBQSxDQUN6QjtNQUFBLEtBQUEsRUFBTSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FBTjtNQUNBLE1BQUEsRUFBTyxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FEUDtNQUVBLFlBQUEsRUFBYSxDQUFDLENBQUMsRUFBRixDQUFLLEVBQUwsQ0FGYjtNQUdBLGVBQUEsRUFBZ0IsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxLQUFLLENBQUMsYUFBZCxDQUhoQjtNQUlBLFVBQUEsRUFBVyxVQUFVLENBQUMsTUFKdEI7TUFLQSxJQUFBLEVBQUssV0FMTDtLQUR5QjtJQVEzQixVQUFVLENBQUMsU0FBUyxDQUFDLE1BQXJCLENBQUE7SUFFQSxVQUFVLENBQUMsV0FBWCxHQUE2QixJQUFBLEtBQUEsQ0FDM0I7TUFBQSxlQUFBLEVBQWdCLENBQUMsQ0FBQyxLQUFGLENBQVEsS0FBSyxDQUFDLGFBQWQsQ0FBaEI7TUFDQSxLQUFBLEVBQU0sQ0FETjtNQUVBLFVBQUEsRUFBVyxVQUFVLENBQUMsUUFGdEI7TUFHQSxJQUFBLEVBQUssY0FITDtLQUQyQjtJQU03QixVQUFVLENBQUMsV0FBVyxDQUFDLFdBQXZCLEdBQ0U7TUFBQSxNQUFBLEVBQU8sQ0FBUDtNQUNBLGNBQUEsRUFBZSxVQUFVLENBQUMsT0FEMUI7O0lBR0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFULENBQWE7TUFBQSxNQUFBLEVBQU8sQ0FBQyxVQUFVLENBQUMsTUFBWixFQUFvQixVQUFVLENBQUMsV0FBL0IsQ0FBUDtLQUFiO0lBRUEsVUFBVSxDQUFDLFlBQVgsR0FBMkIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFsQixHQUF3QixDQUF4QixHQUE0QixVQUFVLENBQUMsU0FBUyxDQUFDLEtBQXJCLEdBQTJCO0lBQ2xGLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBbEIsR0FBc0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFuQixHQUF1QixVQUFVLENBQUM7SUFDeEQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUF2QixHQUEyQixVQUFVLENBQUMsT0FBTyxDQUFDO0lBRzlDLFFBQUEsR0FBVztJQUNYLEtBQUssQ0FBQyxRQUFOLENBQWUsQ0FBZixFQUFrQixTQUFBO01BQ2hCLFFBQUE7TUFDQSxJQUFHLFFBQUEsR0FBVyxLQUFLLENBQUMsU0FBakIsSUFBOEIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFsQixLQUE0QixLQUExRCxJQUFtRSxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQWxCLEtBQTZCLElBQW5HO1FBQ0UsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFwQixDQUNFO1VBQUEsVUFBQSxFQUFZO1lBQUEsT0FBQSxFQUFRLENBQVI7V0FBWjtVQUNBLElBQUEsRUFBSyxHQURMO1NBREY7ZUFHQSxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQXBCLEdBQThCLE1BSmhDO09BQUEsTUFBQTtRQU1FLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBcEIsR0FBOEI7ZUFDOUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFwQixHQUE4QixLQVBoQzs7SUFGZ0IsQ0FBbEI7SUFXQSxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQXBCLENBQXVCLE1BQU0sQ0FBQyxVQUE5QixFQUEwQyxTQUFBO01BQ3hDLElBQUcsUUFBQSxHQUFXLEtBQUssQ0FBQyxTQUFwQjtlQUNFLFFBQUEsR0FBVyxFQURiO09BQUEsTUFBQTtlQUdFLFFBQUEsR0FBVyxFQUhiOztJQUR3QyxDQUExQztJQU1BLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBcEIsQ0FBdUIsTUFBTSxDQUFDLFFBQTlCLEVBQXdDLFNBQUE7TUFDdEMsSUFBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQXJCO1FBQ0UsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFoQixHQUEwQjtRQUMxQixVQUFVLENBQUMsS0FBSyxDQUFDLE9BQWpCLEdBQTJCO2VBQzNCLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBbEIsQ0FBQSxFQUhGO09BQUEsTUFBQTtRQUtFLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBaEIsR0FBMEI7UUFDMUIsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFqQixHQUEyQjtlQUMzQixVQUFVLENBQUMsTUFBTSxDQUFDLEtBQWxCLENBQUEsRUFQRjs7SUFEc0MsQ0FBeEM7SUFVQSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQXRCLENBQXlCLE1BQU0sQ0FBQyxRQUFoQyxFQUEwQyxTQUFBO01BQ3RDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBdEIsR0FBZ0M7TUFDaEMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUExQixHQUFvQztNQUNwQyxVQUFVLENBQUMsVUFBWCxHQUF3QixVQUFVLENBQUM7TUFDbkMsVUFBVSxDQUFDLFVBQVgsR0FBd0IsVUFBVSxDQUFDLFdBQVcsQ0FBQztNQUUvQyxJQUFHLFVBQVUsQ0FBQyxZQUFkO1FBQ0UsVUFBVSxDQUFDLFlBQVgsQ0FBQSxFQURGOztNQUdBLFFBQUEsR0FBVztNQUNYLFVBQVUsQ0FBQyxRQUFYLEdBQTBCLElBQUEsS0FBQSxDQUN4QjtRQUFBLGVBQUEsRUFBZ0IsT0FBaEI7UUFDQSxLQUFBLEVBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQURmO1FBRUEsTUFBQSxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFGaEI7UUFHQSxJQUFBLEVBQUssVUFITDtPQUR3QjtNQUsxQixVQUFVLENBQUMsV0FBVyxDQUFDLEtBQXZCLEdBQStCO01BRS9CLFVBQVUsQ0FBQyxPQUFYLENBQ0U7UUFBQSxVQUFBLEVBQ0U7VUFBQSxLQUFBLEVBQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFoQjtVQUNBLE1BQUEsRUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVQsR0FBaUIsTUFEekI7U0FERjtRQUdBLElBQUEsRUFBSyxFQUhMO09BREY7TUFLQSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQVQsQ0FDRTtRQUFBLE1BQUEsRUFBTyxVQUFQO1FBQ0EsSUFBQSxFQUFLLEVBREw7T0FERjtNQUdBLElBQUcsS0FBSyxDQUFDLFVBQVQ7UUFDRSxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQXBCLEdBQWlDLEtBQUssQ0FBQztRQUN2QyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQXBCLENBQWdDLFVBQWhDLEVBRkY7T0FBQSxNQUFBO1FBSUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxXQUFwQixDQUFnQyxVQUFoQyxFQUpGOzthQUtBLENBQUMsQ0FBQyxVQUFGLENBQWEsVUFBYjtJQTlCc0MsQ0FBMUM7SUFnQ0EsVUFBVSxDQUFDLGNBQWMsQ0FBQyxFQUExQixDQUE2QixNQUFNLENBQUMsUUFBcEMsRUFBOEMsU0FBQTtNQUMxQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQXRCLEdBQWdDO01BQ2hDLFVBQVUsQ0FBQyxjQUFjLENBQUMsT0FBMUIsR0FBb0M7TUFDcEMsUUFBQSxHQUFXO2FBQ1gsQ0FBQyxDQUFDLGVBQUYsQ0FBQTtJQUowQyxDQUE5QztJQVFBLFVBQVUsQ0FBQyxJQUFYLEdBQWtCLFNBQUE7TUFDZCxVQUFVLENBQUMsT0FBWCxDQUNFO1FBQUEsVUFBQSxFQUFZO1VBQUEsQ0FBQSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBeEI7VUFBMkIsQ0FBQSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBbkQ7VUFBc0QsS0FBQSxFQUFNLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBbEY7VUFBeUYsTUFBQSxFQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBdEg7U0FBWjtRQUNBLElBQUEsRUFBSyxFQURMO09BREY7TUFJQSxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQXZCLEdBQStCLFVBQVUsQ0FBQztNQUUxQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQXBCLENBQ0U7UUFBQSxVQUFBLEVBQVk7VUFBQSxPQUFBLEVBQVEsQ0FBUjtTQUFaO1FBQ0EsSUFBQSxFQUFLLEVBREw7UUFFQSxLQUFBLEVBQU0sRUFGTjtPQURGO01BSUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSxFQUFaLEVBQWdCLFNBQUE7ZUFDZCxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQXBCLENBQUE7TUFEYyxDQUFoQjtNQUdBLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBdEIsR0FBZ0M7TUFDaEMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUExQixHQUFvQztNQUVwQyxJQUFHLFVBQVUsQ0FBQyxnQkFBZDtlQUNFLFVBQVUsQ0FBQyxnQkFBWCxDQUFBLEVBREY7O0lBakJjO0lBcUJsQixVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUE1QixHQUFzQztJQUN0QyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUE1QixHQUFxQztJQUNyQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUE1QixHQUFxQztJQUNyQyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUE1QixHQUF1QztJQUN2QyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUE1QixHQUFxQztJQUVyQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQWxCLENBQXFCLE1BQU0sQ0FBQyxVQUE1QixFQUF3QyxTQUFBO01BQ3RDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBbEIsR0FBMEI7YUFDMUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFsQixHQUE0QjtJQUZVLENBQXhDO0lBSUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFsQixDQUFxQixNQUFNLENBQUMsUUFBNUIsRUFBc0MsU0FBQTtBQUNwQyxVQUFBO01BQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFsQixHQUE0QjtNQUM1QixJQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBbEIsR0FBc0IsVUFBVSxDQUFDLFlBQWpDLEdBQWdELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBdEU7UUFDRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQWxCLEdBQXNCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBbkIsR0FBdUIsVUFBVSxDQUFDLGFBRDFEOztNQUVBLElBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFsQixHQUF5QixVQUFVLENBQUMsT0FBTyxDQUFDLElBQW5CLEdBQTBCLFVBQVUsQ0FBQyxZQUFqRTtRQUNFLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBbEIsR0FBeUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFuQixHQUEwQixVQUFVLENBQUMsYUFEaEU7O01BRUEsS0FBQSxHQUFRLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBbEIsR0FBNkIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBbEIsR0FBc0IsVUFBVSxDQUFDLFlBQWpDLEdBQWdELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBcEUsQ0FBQSxHQUF1RSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQTNGO01BQ3JDLElBQUcsS0FBQSxHQUFRLENBQVg7UUFDRSxLQUFBLEdBQVEsRUFEVjs7TUFFQSxJQUFHLEtBQUEsR0FBUSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQTdCO1FBQ0UsS0FBQSxHQUFRLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FENUI7O2FBRUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFSLENBQWUsVUFBVSxDQUFDLFdBQTFCLEVBQXVDO1FBQUM7VUFBQyxJQUFBLEVBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFSLENBQWlCLEtBQWpCLENBQU47U0FBRDtPQUF2QztJQVhvQyxDQUF0QztXQWFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBbEIsQ0FBcUIsTUFBTSxDQUFDLE9BQTVCLEVBQXFDLFNBQUE7QUFDbkMsVUFBQTtNQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBbEIsR0FBMEI7TUFDMUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFsQixHQUE0QjtNQUM1QixFQUFBLEdBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQztNQUN2QixLQUFBLEdBQVEsRUFBQSxHQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQWxCLEdBQXNCLFVBQVUsQ0FBQyxZQUFqQyxHQUFnRCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQXBFLENBQUEsR0FBdUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUEzRjtNQUNiLElBQUcsS0FBQSxHQUFRLENBQVg7UUFDRSxLQUFBLEdBQVEsRUFEVjs7TUFFQSxJQUFHLEtBQUEsR0FBUSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQTdCO1FBQ0UsS0FBQSxHQUFRLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FENUI7O01BRUEsS0FBQSxHQUFRLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBWDthQUNSLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBbEIsR0FBZ0M7SUFWRyxDQUFyQztFQXRPTTtFQW1QUixVQUFBLEdBQWEsU0FBQTtBQUNYLFFBQUE7SUFBQSxFQUFBLEdBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUN2QixFQUFBLEdBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUN2QixJQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBckI7QUFBQTtLQUFBLE1BQUE7TUFHRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQVIsQ0FBZSxVQUFVLENBQUMsV0FBMUIsRUFBdUM7UUFBQztVQUFDLElBQUEsRUFBSyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVIsQ0FBaUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxXQUFuQyxDQUFOO1NBQUQ7T0FBdkM7TUFDQSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQWxCLEdBQXNCLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBbkIsR0FBdUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQW5CLEdBQTJCLEVBQTNCLEdBQThCLEVBQS9CLENBQXZCLEdBQTRELFVBQVUsQ0FBQzthQUM3RixVQUFVLENBQUMsV0FBVyxDQUFDLEtBQXZCLEdBQWdDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBbEIsR0FBc0IsVUFBVSxDQUFDLFlBQWpDLEdBQWdELFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFMckc7O0VBSFc7RUFVYixVQUFVLENBQUMsTUFBTSxDQUFDLGdCQUFsQixDQUFtQyxZQUFuQyxFQUFpRCxLQUFqRDtFQUNBLFVBQVUsQ0FBQyxNQUFNLENBQUMsZ0JBQWxCLENBQW1DLFlBQW5DLEVBQWlELFVBQWpEO0FBR0EsU0FBTztBQWxTUTs7OztBQ2pCakIsSUFBQTs7QUFBQSxPQUFPLENBQUMsTUFBUixHQUFpQixNQUFBLEdBQVMsT0FBQSxDQUFRLHFCQUFSOztBQUMxQixPQUFPLENBQUMsR0FBUixHQUFjLE9BQUEsR0FBVSxPQUFBLENBQVEsc0JBQVI7O0FBQ3hCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEtBQUEsR0FBUSxPQUFBLENBQVEsb0JBQVI7O0FBQ3hCLE9BQU8sQ0FBQyxLQUFSLEdBQWdCLEtBQUEsR0FBUSxPQUFBLENBQVEsb0JBQVI7O0FBR3hCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLEtBQUssQ0FBQyxTQUFOLENBQUE7O0FBQ2pCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLE9BQU8sQ0FBQzs7QUFHekIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsU0FBQyxXQUFEO0FBQ2QsU0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQWQsQ0FBb0IsV0FBcEI7QUFETzs7QUFHaEIsT0FBTyxDQUFDLEVBQVIsR0FBYSxTQUFDLEVBQUQ7QUFDWCxTQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBZCxDQUFpQixFQUFqQjtBQURJOztBQUdiLE9BQU8sQ0FBQyxFQUFSLEdBQWEsU0FBQyxFQUFEO0FBQ1gsU0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQWQsQ0FBaUIsRUFBakI7QUFESTs7QUFHYixPQUFPLENBQUMsS0FBUixHQUFnQixLQUFLLENBQUM7O0FBRXRCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUMsS0FBRDtTQUNuQixLQUFLLENBQUMsVUFBTixDQUFpQixLQUFqQjtBQURtQjs7QUFHckIsT0FBTyxDQUFDLGVBQVIsR0FBMEIsU0FBQyxLQUFEO1NBQ3hCLEtBQUssQ0FBQyxlQUFOLENBQXNCLEtBQXRCO0FBRHdCOztBQUsxQixNQUFBLEdBQVMsT0FBQSxDQUFRLHNCQUFSOztBQUNULE1BQUEsR0FBUyxPQUFBLENBQVEscUJBQVI7O0FBQ1QsTUFBQSxHQUFTLE9BQUEsQ0FBUSxxQkFBUjs7QUFDVCxNQUFBLEdBQVMsT0FBQSxDQUFRLHFCQUFSOztBQUNULElBQUEsR0FBTyxPQUFBLENBQVEsbUJBQVI7O0FBQ1AsR0FBQSxHQUFNLE9BQUEsQ0FBUSxzQkFBUjs7QUFDTixRQUFBLEdBQVcsT0FBQSxDQUFRLHdCQUFSOztBQUNYLE1BQUEsR0FBUyxPQUFBLENBQVEseUJBQVI7O0FBQ1QsSUFBQSxHQUFPLE9BQUEsQ0FBUSxtQkFBUjs7QUFDUCxLQUFBLEdBQVEsT0FBQSxDQUFRLG9CQUFSOztBQUNSLFNBQUEsR0FBWSxPQUFBLENBQVEseUJBQVI7O0FBQ1osSUFBQSxHQUFPLE9BQUEsQ0FBUSxvQkFBUjs7QUFHUCxPQUFPLENBQUMsTUFBUixHQUFpQixNQUFNLENBQUM7O0FBQ3hCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLE1BQU0sQ0FBQzs7QUFDeEIsT0FBTyxDQUFDLE1BQVIsR0FBaUIsTUFBTSxDQUFDOztBQUN4QixPQUFPLENBQUMsTUFBUixHQUFpQixNQUFNLENBQUM7O0FBQ3hCLE9BQU8sQ0FBQyxJQUFSLEdBQWUsSUFBSSxDQUFDOztBQUNwQixPQUFPLENBQUMsTUFBUixHQUFpQixHQUFHLENBQUM7O0FBQ3JCLE9BQU8sQ0FBQyxRQUFSLEdBQW1CLFFBQVEsQ0FBQzs7QUFDNUIsT0FBTyxDQUFDLFNBQVIsR0FBb0IsTUFBTSxDQUFDOztBQUMzQixPQUFPLENBQUMsSUFBUixHQUFlLElBQUksQ0FBQzs7QUFDcEIsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsS0FBSyxDQUFDOztBQUN0QixPQUFPLENBQUMsU0FBUixHQUFvQixTQUFTLENBQUM7O0FBQzlCLE9BQU8sQ0FBQyxJQUFSLEdBQWUsSUFBSSxDQUFDOzs7O0FDMURwQixJQUFBLENBQUE7RUFBQTs7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxjQUFSOztBQUVFLE9BQU8sQ0FBQztBQUNiLE1BQUE7Ozs7RUFBYSxjQUFBLEdBQUE7O0VBRWIsSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNWO0lBQUEsZUFBQSxFQUFpQixxQkFBakI7SUFDQSxPQUFBLEVBQVMsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBRFQ7SUFFQSxXQUFBLEVBQWEsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxTQUFSLENBRmI7R0FEVTs7RUFLWCxJQUFJLENBQUMsV0FBTCxHQUNDO0lBQUEsR0FBQSxFQUFLLEVBQUw7SUFDQSxPQUFBLEVBQVMsRUFEVDtJQUVBLFFBQUEsRUFBVSxFQUZWO0lBR0EsTUFBQSxFQUFRLEdBSFI7OztFQUtELENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFBOztFQUlBLElBQUssQ0FBQSxlQUFBLENBQUwsR0FBNEIsSUFBQSxDQUFDLENBQUMsSUFBRixDQUMzQjtJQUFBLElBQUEsRUFBTSxPQUFOO0lBQ0EsVUFBQSxFQUFZLElBRFo7SUFFQSxXQUFBLEVBQ0M7TUFBQSxPQUFBLEVBQVMsRUFBVDtNQUNBLEdBQUEsRUFBSSxFQURKO0tBSEQ7R0FEMkI7O0VBUTVCLElBQUEsR0FBVyxJQUFBLENBQUMsQ0FBQyxJQUFGLENBQ1Y7SUFBQSxJQUFBLEVBQUssWUFBTDtJQUNBLElBQUEsRUFBTSxZQUROO0lBRUEsUUFBQSxFQUFTLEVBRlQ7SUFHQSxVQUFBLEVBQVcsR0FIWDtJQUlBLFdBQUEsRUFDQztNQUFBLEtBQUEsRUFBTSxNQUFOO01BQ0EsR0FBQSxFQUFLLEVBREw7TUFFQSxPQUFBLEVBQVEsQ0FBQyxJQUFLLENBQUEsZUFBQSxDQUFOLEVBQXdCLEVBQXhCLENBRlI7TUFHQSxRQUFBLEVBQVUsRUFIVjtLQUxEO0lBU0EsVUFBQSxFQUFZLElBVFo7R0FEVTs7RUFhWCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBQTs7RUFHQSxTQUFBLEdBQWdCLElBQUEsS0FBQSxDQUNmO0lBQUEsVUFBQSxFQUFZLElBQVo7SUFDQSxLQUFBLEVBQU8sS0FBSyxDQUFDLFdBQU4sQ0FBQSxDQURQO0lBRUEsSUFBQSxFQUFNLElBRk47R0FEZTs7RUFLaEIsU0FBUyxDQUFDLFdBQVYsR0FDQztJQUFBLE9BQUEsRUFBUSxDQUFSO0lBQ0EsUUFBQSxFQUFTLENBRFQ7SUFFQSxNQUFBLEVBQU8sRUFGUDtJQUdBLEdBQUEsRUFBSSxDQUFDLElBQUQsRUFBTyxFQUFQLENBSEo7OztFQUtELENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBVCxDQUFBOztFQUVBLElBQUssQ0FBQSxTQUFBLENBQUwsR0FBc0IsSUFBQSxDQUFDLENBQUMsSUFBRixDQUNyQjtJQUFBLElBQUEsRUFBTSw2Q0FBTjtJQUNBLFFBQUEsRUFBUyxFQURUO0lBRUEsVUFBQSxFQUFXLEdBRlg7SUFHQSxVQUFBLEVBQVksSUFIWjtJQUlBLFdBQUEsRUFDQztNQUFBLEdBQUEsRUFBSyxDQUFDLFNBQUQsRUFBWSxFQUFaLENBQUw7TUFDQSxPQUFBLEVBQVMsQ0FEVDtNQUVBLFFBQUEsRUFBVSxFQUZWO0tBTEQ7R0FEcUI7O0VBVXRCLElBQUssQ0FBQSxRQUFBLENBQUwsR0FBcUIsSUFBQSxLQUFBLENBQ3BCO0lBQUEsZUFBQSxFQUFpQixxQkFBakI7SUFDQSxPQUFBLEVBQVMsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxDQUFMLENBRFQ7SUFFQSxXQUFBLEVBQWEsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxTQUFSLENBRmI7R0FEb0I7O0VBS3JCLElBQUssQ0FBQSxRQUFBLENBQVMsQ0FBQyxXQUFmLEdBQ0M7SUFBQSxHQUFBLEVBQUssQ0FBQyxJQUFELEVBQU0sQ0FBTixDQUFMO0lBQ0EsUUFBQSxFQUFVLEVBRFY7SUFFQSxPQUFBLEVBQVMsRUFGVDtJQUdBLE1BQUEsRUFBUSxFQUhSOzs7RUFLRCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQVQsQ0FBQTs7RUFFQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQVIsQ0FDQztJQUFBLEtBQUEsRUFBTyxTQUFQO0lBQ0EsS0FBQSxFQUFPLEtBRFA7R0FERDs7OztHQTlFMEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0dGl0bGU6XCJUaXRsZVwiXG5cdG1lbnU6dW5kZWZpbmVkXG5cblx0dHlwZTpcImFwcGJhclwiXG5cdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0dGFiczp1bmRlZmluZWRcblx0dGl0bGVDb2xvcjpcImJsYWNrXCJcblx0YWN0aW9uQ29sb3I6XCJibGFja1wiXG5cdHRhYnM6dW5kZWZpbmVkXG5cdHRhYnNDb2xvcjp1bmRlZmluZWRcblx0dGFic0luazp7Y29sb3I6XCJibHVlR3JleVwiLCBzY2FsZTo4fVxuXHR0YWJzQmFyQ29sb3I6XCJ5ZWxsb3dcIlxuXHR0YWJzQWx0Ontjb2xvcjp1bmRlZmluZWQsIG9wYWNpdHk6Ljd9XG5cdHRhYkljb25zOnVuZGVmaW5lZFxuXHRhY3Rpb25zOnVuZGVmaW5lZFxufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0YmFyID0gbmV3IExheWVyXG5cdFx0bmFtZTpcIkFwcCBCYXJcIlxuXHRcdGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4xMilcIlxuXHRcdHNoYWRvd0JsdXI6IG0ucHgoNClcblx0XHRzaGFkb3dZOiBtLnB4KDIpXG5cblx0YmFyLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0dG9wOjBcblx0XHRoZWlnaHQ6ODBcblxuXHRpZiBzZXR1cC50YWJzXG5cdFx0YmFyLmNvbnN0cmFpbnRzLmhlaWdodCA9IDEyOFxuXG5cdGJhckFyZWEgPSBuZXcgTGF5ZXIgc3VwZXJMYXllcjpiYXIsIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG5hbWU6XCJiYXJBcmVhXCJcblx0YmFyQXJlYS5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdGhlaWdodDo1NlxuXHRcdGJvdHRvbTowXG5cblx0aWYgc2V0dXAudGFicyAmJiBzZXR1cC50YWJzLmxlbmd0aCA+IDJcblx0XHRiYXJBcmVhLmNvbnN0cmFpbnRzLmJvdHRvbSA9IDQ4XG5cblx0aWYgc2V0dXAuc3VwZXJMYXllclxuXHRcdHNldHVwLnN1cGVyTGF5ZXIuYWRkU3ViTGF5ZXIoYmFyKVxuXG5cdG0ubGF5b3V0LnNldChbYmFyLCBiYXJBcmVhXSlcblxuXHRiYXIudHlwZSA9IHNldHVwLnR5cGVcblxuXHRmb3IgbGF5ZXIgaW4gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmxheWVyc1xuXHRcdGlmIGxheWVyLnR5cGUgPT0gXCJzdGF0dXNCYXJcIlxuXHRcdFx0QHN0YXR1c0JhciA9IGxheWVyXG5cdFx0XHRiYXIucGxhY2VCZWhpbmQoQHN0YXR1c0JhcilcblxuXHRpZiBzZXR1cC50aXRsZUNvbG9yID09IFwiYmxhY2tcIlxuXHRcdHNldHVwLnRpdGxlQ29sb3IgPSBtLnV0aWxzLmF1dG9Db2xvcihiYXIuYmFja2dyb3VuZENvbG9yKS50b0hleFN0cmluZygpXG5cblx0aWYgc2V0dXAuYWN0aW9uQ29sb3IgPT0gXCJibGFja1wiXG5cdFx0c2V0dXAuYWN0aW9uQ29sb3IgPSBtLnV0aWxzLmF1dG9Db2xvcihiYXIuYmFja2dyb3VuZENvbG9yKS50b0hleFN0cmluZygpXG5cblx0aWYgdHlwZW9mIHNldHVwLnRpdGxlID09IFwic3RyaW5nXCJcblx0XHR0aXRsZSA9IG5ldyBtLlRleHRcblx0XHRcdGNvbG9yOnNldHVwLnRpdGxlQ29sb3Jcblx0XHRcdGZvbnRXZWlnaHQ6NTAwXG5cdFx0XHRzdXBlckxheWVyOmJhckFyZWFcblx0XHRcdHRleHQ6c2V0dXAudGl0bGVcblx0XHRcdGZvbnRTaXplOjIwXG5cblx0bS51dGlscy5zcGVjaWFsQ2hhcih0aXRsZSlcblxuXG5cdHRpdGxlTGVhZGluZyA9IDE2XG5cdGlmIHNldHVwLm1lbnVcblx0XHRiYXIubWVudSA9IG5ldyBtLkljb25cblx0XHRcdG5hbWU6c2V0dXAubWVudVxuXHRcdFx0Y29sb3I6c2V0dXAuYWN0aW9uQ29sb3Jcblx0XHRcdHN1cGVyTGF5ZXI6YmFyQXJlYVxuXHRcdFx0Y29uc3RyYWludHM6e2xlYWRpbmc6MTYsIHZlcnRpY2FsQ2VudGVyOnRpdGxlfVxuXHRcdFx0Y2xpcDpmYWxzZVxuXHRcdHRpdGxlTGVhZGluZyA9IFtiYXIubWVudSwgMTZdXG5cblx0XHRtLnV0aWxzLmlua3lcblx0XHRcdGxheWVyOmJhci5tZW51XG5cdFx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRcdGNvbG9yOlwid2hpdGVcIlxuXHRcdFx0b3BhY2l0eTouNFxuXHRcdFx0c2NhbGU6Ljdcblx0XHRcdHN0YXJ0U2NhbGU6LjdcblxuXG5cdHRpdGxlLmNvbnN0cmFpbnRzID1cblx0XHRib3R0b206MTJcblx0XHRsZWFkaW5nOnRpdGxlTGVhZGluZ1xuXG5cdGlmIHNldHVwLmxlZnRBY3Rpb25cblx0XHR0aXRsZS5jb25zdHJhaW50cy5sZWFkaW5nID0gNzNcblxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbdGl0bGVdXG5cblx0YWN0aW9uc0FycmF5ID0gW11cblx0aWYgc2V0dXAuYWN0aW9uc1xuXHRcdGZvciBhY3QsIGkgaW4gc2V0dXAuYWN0aW9uc1xuXHRcdFx0aWYgaSA9PSAwXG5cdFx0XHRcdGljb24gPSBuZXcgbS5JY29uXG5cdFx0XHRcdFx0bmFtZTphY3Rcblx0XHRcdFx0XHRzdXBlckxheWVyOmJhckFyZWFcblx0XHRcdFx0XHRjb25zdHJhaW50czp7dHJhaWxpbmc6MjQsIHZlcnRpY2FsQ2VudGVyOnRpdGxlfVxuXHRcdFx0XHRcdGNvbG9yOnNldHVwLmFjdGlvbkNvbG9yXG5cdFx0XHRcdFx0Y2xpcDpmYWxzZVxuXHRcdFx0XHRhY3Rpb25zQXJyYXkucHVzaCBpY29uXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGljb24gPSBuZXcgbS5JY29uXG5cdFx0XHRcdFx0bmFtZTphY3Rcblx0XHRcdFx0XHRzdXBlckxheWVyOmJhckFyZWFcblx0XHRcdFx0XHRjb25zdHJhaW50czp7dHJhaWxpbmc6W2FjdGlvbnNBcnJheVtpIC0gMV0sIDI0XSwgdmVydGljYWxDZW50ZXI6dGl0bGV9XG5cdFx0XHRcdFx0Y29sb3I6c2V0dXAuYWN0aW9uQ29sb3Jcblx0XHRcdFx0XHRjbGlwOmZhbHNlXG5cdFx0XHRcdGFjdGlvbnNBcnJheS5wdXNoIGljb25cblxuXHRcdGZvciBhY3QgaW4gYWN0aW9uc0FycmF5XG5cdFx0XHRtLnV0aWxzLmlua3lcblx0XHRcdFx0bGF5ZXI6YWN0XG5cdFx0XHRcdG1vdmVUb1RhcDpmYWxzZVxuXHRcdFx0XHRjb2xvcjpcIndoaXRlXCJcblx0XHRcdFx0b3BhY2l0eTouNFxuXHRcdFx0XHRzY2FsZTouOFxuXHRcdFx0XHRzdGFydFNjYWxlOi43XG5cblxuXHRpZiBzZXR1cC50YWJzICYmIHNldHVwLnRhYnMubGVuZ3RoID4gMlxuXG5cdFx0aGFuZGxlVGFiU3RhdGVzID0gKGJhciwgbGF5ZXIpIC0+XG5cdFx0XHR0YWJzQXJyYXkgPSBPYmplY3Qua2V5cyhiYXIudGFicylcblx0XHRcdGFjdGl2ZVRhYkluZGV4ID0gdW5kZWZpbmVkXG5cdFx0XHRmb3IgdCwgaSBpbiB0YWJzQXJyYXlcblx0XHRcdFx0dGFiID0gYmFyLnRhYnNbdF1cblxuXHRcdFx0XHRpZiB0YWIgPT0gYmFyLmFjdGl2ZVRhYlxuXHRcdFx0XHRcdGFjdGl2ZVRhYkluZGV4ID0gaVxuXHRcdFx0XHRcdGJhci52aWV3c1t0XS5hbmltYXRlXG5cdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOih4OjApXG5cdFx0XHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0XHRcdHRhYi5sYWJlbC5vcGFjaXR5ID0gMVxuXHRcdFx0XHRcdHRhYi5sYWJlbC5jb2xvciA9IHNldHVwLnRhYnNDb2xvclxuXHRcdFx0XHRcdGJhci5hY3RpdmVCYXIuYW5pbWF0ZVxuXHRcdFx0XHRcdFx0cHJvcGVydGllczooeDpsYXllci54KVxuXHRcdFx0XHRcdFx0dGltZTouMjVcblx0XHRcdFx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0XHRcdFx0bS51dGlscy51cGRhdGUodGl0bGUsIFt7dGV4dDptLnV0aWxzLmNhcGl0YWxpemUoYmFyLmFjdGl2ZVRhYi5sYWJlbC5uYW1lKX1dKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0aWYgYWN0aXZlVGFiSW5kZXggPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0XHRiYXIudmlld3NbdF0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOih4Om0uZGV2aWNlLndpZHRoICogLTEpXG5cdFx0XHRcdFx0XHRcdHRpbWU6LjI1XG5cdFx0XHRcdFx0XHRcdGN1cnZlOlwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRiYXIudmlld3NbdF0uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOih4Om0uZGV2aWNlLndpZHRoKVxuXHRcdFx0XHRcdFx0XHR0aW1lOi4yNVxuXHRcdFx0XHRcdFx0XHRjdXJ2ZTpcImN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKVwiXG5cblx0XHRcdFx0XHRvcGFjaXR5ID0gMVxuXHRcdFx0XHRcdGNvbG9yID0gdGFiLmxhYmVsLmNvbG9yXG5cdFx0XHRcdFx0aWYgc2V0dXAudGFic0FsdC5vcGFjaXR5ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0b3BhY2l0eSA9IHNldHVwLnRhYnNBbHQub3BhY2l0eVxuXG5cdFx0XHRcdFx0aWYgc2V0dXAudGFic0FsdC5jb2xvciAhPSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdGNvbG9yID0gc2V0dXAudGFic0FsdC5jb2xvclxuXG5cdFx0XHRcdFx0dGFiLmxhYmVsLm9wYWNpdHkgPSBvcGFjaXR5XG5cdFx0XHRcdFx0dGFiLmxhYmVsLmNvbG9yID0gY29sb3JcblxuXHRcdHRhYnNBY3RpdmVCYXIgPSBuZXcgTGF5ZXJcblx0XHRcdGhlaWdodDptLnB4KDIpXG5cdFx0XHR3aWR0aDptLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOm0uY29sb3Ioc2V0dXAudGFic0JhckNvbG9yKVxuXHRcdFx0c3VwZXJMYXllcjpiYXJcblx0XHR0YWJzQWN0aXZlQmFyLmNvbnN0cmFpbnRzID1cblx0XHRcdGJvdHRvbTowXG5cdFx0YmFyLmFjdGl2ZUJhciA9IHRhYnNBY3RpdmVCYXJcblxuXHRcdGJhci50YWJzID0ge31cblx0XHRiYXIudmlld3MgPSB7fVxuXHRcdGlmIHNldHVwLnRhYnMubGVuZ3RoIDwgNVxuXHRcdFx0Zm9yIHQsIGkgaW4gc2V0dXAudGFic1xuXHRcdFx0XHR2aWV3ID0gbmV3IExheWVyXG5cdFx0XHRcdFx0bmFtZTpcIlZpZXcgXCIgKyB0XG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdFx0XHR2aWV3LmNvbnN0cmFpbnRzID1cblx0XHRcdFx0XHR0b3A6YmFyXG5cdFx0XHRcdFx0Ym90dG9tOjBcblx0XHRcdFx0XHR3aWR0aDptLmRwKG0uZGV2aWNlLndpZHRoKVxuXHRcdFx0XHRiYXIudmlld3NbdF0gPSB2aWV3XG5cdFx0XHRcdGlmIGkgPiAwXG5cdFx0XHRcdFx0dmlldy54ID0gbS5kZXZpY2Uud2lkdGhcblx0XHRcdFx0dGFiID0gbmV3IExheWVyXG5cdFx0XHRcdFx0d2lkdGg6bS5kZXZpY2Uud2lkdGgvc2V0dXAudGFicy5sZW5ndGhcblx0XHRcdFx0XHRoZWlnaHQ6bS5weCg0OClcblx0XHRcdFx0XHR4OihtLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aCkgKiBpXG5cdFx0XHRcdFx0c3VwZXJMYXllcjpiYXJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRcdFx0Y2xpcDp0cnVlXG5cdFx0XHRcdFx0bmFtZTpcInRhYiBcIlxuXHRcdFx0XHR0YWIuY29uc3RyYWludHMgPVxuXHRcdFx0XHRcdGJvdHRvbTowXG5cdFx0XHRcdG0ubGF5b3V0LnNldCh0YWIpXG5cdFx0XHRcdGlmIHNldHVwLnRhYnNDb2xvciA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRzZXR1cC50YWJzQ29sb3IgPSBtLnV0aWxzLmF1dG9Db2xvcihiYXIuYmFja2dyb3VuZENvbG9yKS50b0hleFN0cmluZygpXG5cdFx0XHRcdGxhYmVsID0gXCJcIlxuXHRcdFx0XHRpZiBzZXR1cC50YWJJY29uc1xuXHRcdFx0XHRcdGljb24gPSBzZXR1cC50YWJJY29uc1tpXVxuXHRcdFx0XHRcdGxhYmVsID0gbmV3IG0uSWNvblxuXHRcdFx0XHRcdFx0bmFtZTppY29uXG5cdFx0XHRcdFx0XHRzdXBlckxheWVyOnRhYlxuXHRcdFx0XHRcdFx0Y29sb3I6c2V0dXAudGFic0NvbG9yXG5cdFx0XHRcdFx0XHRjb25zdHJhaW50czp7YWxpZ246XCJjZW50ZXJcIn1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGxhYmVsID0gbmV3IG0uVGV4dFxuXHRcdFx0XHRcdFx0c3VwZXJMYXllcjp0YWJcblx0XHRcdFx0XHRcdGNvbnN0cmFpbnRzOnthbGlnbjpcImNlbnRlclwifVxuXHRcdFx0XHRcdFx0dGV4dDp0XG5cdFx0XHRcdFx0XHR0ZXh0VHJhbnNmb3JtOidVcHBlcmNhc2UnXG5cdFx0XHRcdFx0XHRmb250U2l6ZToxNFxuXHRcdFx0XHRcdFx0Y29sb3I6c2V0dXAudGFic0NvbG9yXG5cdFx0XHRcdGxhYmVsLm5hbWUgPSB0XG5cblx0XHRcdFx0dGFiLmxhYmVsID0gbGFiZWxcblxuXHRcdFx0XHRzZXR1cC50YWJzSW5rW1wibGF5ZXJcIl0gPSB0YWJcblx0XHRcdFx0bS51dGlscy5pbmt5KHNldHVwLnRhYnNJbmspXG5cdFx0XHRcdGJhci50YWJzW3RdID0gdGFiXG5cblx0XHRcdFx0dGFiLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdFx0XHRiYXIuYWN0aXZlVGFiID0gQFxuXHRcdFx0XHRcdGhhbmRsZVRhYlN0YXRlcyhiYXIsIEApXG5cdGlmIHNldHVwLnRhYnNcblx0XHRpZiBzZXR1cC50YWJzLmxlbmd0aCA+IDJcblx0XHRcdGJhci5hY3RpdmVUYWIgPSBiYXIudGFic1tzZXR1cC50YWJzWzBdXVxuXHRcdFx0aGFuZGxlVGFiU3RhdGVzKGJhciwgYmFyLmFjdGl2ZVRhYilcblx0YmFyLnRpdGxlID0gdGl0bGVcblxuXG5cblx0cmV0dXJuIGJhclxuIiwiIyBCYW5uZXJcbm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGFwcDogXCJBcHBcIlxuXHR0aXRsZTpcIlRpdGxlXCJcblx0bWVzc2FnZTpcIk1lc3NhZ2VcIlxuXHRhY3Rpb246XCJBY3Rpb25cIlxuXHR0aW1lOlwi4oCiIG5vd1wiXG5cdGljb246dW5kZWZpbmVkXG5cdGR1cmF0aW9uOjdcblx0YW5pbWF0ZWQ6dHJ1ZVxufVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0YmFubmVyID0gbmV3IExheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXHRcdG5hbWU6XCJiYW5uZXJcIlxuXHRcdHNoYWRvd0NvbG9yOiBcInJnYmEoMCwwLDAsLjI0KVwiXG5cdFx0c2hhZG93Qmx1cjogbS5weCgyKVxuXHRcdHNoYWRvd1k6IG0ucHgoMilcblx0YmFubmVyLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0dG9wOjBcblx0XHRoZWlnaHQ6NzRcblxuXHQjIERpZmZlcmVudCBwb3NpdGlvbmluZ3MgZm9yIGVhY2ggZGV2aWNlXG5cdHN3aXRjaCBtLmRldmljZS5uYW1lXG5cdFx0d2hlbiBcImlwYWRcIlxuXHRcdFx0QGxlYWRpbmdJY29uID0gMjAwXG5cdFx0XHRAdG9wSWNvbiA9IDE1XG5cdFx0XHRAdG9wVGl0bGUgPSAxMVxuXHRcdHdoZW4gXCJpcGFkLXByb1wiXG5cdFx0XHRAbGVhZGluZ0ljb24gPSAxOTJcblx0XHRcdEB0b3BJY29uID0gMTJcblx0XHRcdEB0b3BUaXRsZSA9IDlcblx0XHR3aGVuIFwiaXBob25lLTZzLXBsdXNcIlxuXHRcdFx0QGxlYWRpbmdJY29uID0gMTVcblx0XHRcdEB0b3BJY29uID0gMTJcblx0XHRcdEB0b3BUaXRsZSA9IDEwXG5cdFx0ZWxzZVxuXHRcdFx0QGxlYWRpbmdJY29uID0gMTVcblx0XHRcdEB0b3BJY29uID0gOFxuXHRcdFx0QHRvcFRpdGxlID0gNlxuXG5cdGlmIHNldHVwLmljb24gPT0gdW5kZWZpbmVkXG5cdFx0c2V0dXAuaWNvbiA9IG5ldyBMYXllciBzdXBlckxheWVyOmJhbm5lclxuXHRcdHNldHVwLmljb24uc3R5bGVbXCJiYWNrZ3JvdW5kXCJdID0gXCJsaW5lYXItZ3JhZGllbnQoLTE4MGRlZywgIzY3RkY4MSAwJSwgIzAxQjQxRiAxMDAlKVwiXG5cdGVsc2Vcblx0XHRiYW5uZXIuYWRkU3ViTGF5ZXIoc2V0dXAuaWNvbilcblxuXHRzZXR1cC5pY29uLmJvcmRlclJhZGl1cyA9IG0udXRpbHMucHgoNC41KVxuXHRzZXR1cC5pY29uLm5hbWUgPSBcImljb25cIlxuXHRzZXR1cC5pY29uLmNvbnN0cmFpbnRzID1cblx0XHRoZWlnaHQ6MTZcblx0XHR3aWR0aDoxNlxuXHRcdGxlYWRpbmc6QGxlYWRpbmdJY29uXG5cdFx0dG9wOkB0b3BJY29uXG5cblx0YXBwID0gbmV3IG0uVGV4dCBzdHlsZTpcImFwcFwiLCB0ZXh0OnNldHVwLmFwcCwgY29sb3I6XCJibHVlXCIsIGZvbnRXZWlnaHQ6XCJtZWRpdW1cIiwgZm9udFNpemU6MTEsIHN1cGVyTGF5ZXI6YmFubmVyLCBuYW1lOlwidGl0bGVcIlxuXHRhcHAuY29uc3RyYWludHMgPVxuXHRcdHZlcnRpY2FsQ2VudGVyOnNldHVwLmljb25cblx0XHRsZWFkaW5nOltzZXR1cC5pY29uLCA1XVxuXHR0aXRsZSA9IG5ldyBtLlRleHQgc3R5bGU6XCJ0aXRsZVwiLCB0ZXh0OnNldHVwLnRpdGxlLCBjb2xvcjpcImJsYWNrXCIsIGZvbnRTaXplOjEzLCBzdXBlckxheWVyOmJhbm5lciwgbmFtZTpcInRpdGxlXCJcblx0dGl0bGUuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmdFZGdlczpzZXR1cC5pY29uXG5cdFx0dG9wOltzZXR1cC5pY29uLCA3XVxuXG5cdG1lc3NhZ2UgPSBuZXcgbS5UZXh0IHN0eWxlOlwidGl0bGVcIiwgdGV4dDpzZXR1cC5tZXNzYWdlLCBjb2xvcjpcImdyZXlcIiwgZm9udFNpemU6MTMsIHN1cGVyTGF5ZXI6YmFubmVyLCBuYW1lOlwidGl0bGVcIlxuXHRtZXNzYWdlLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nRWRnZXM6c2V0dXAuaWNvblxuXHRcdHRvcDpbdGl0bGUsIDVdXG5cblx0dGltZSA9IG5ldyBtLlRleHQgc3R5bGU6XCJ0aW1lXCIsIHRleHQ6c2V0dXAudGltZSwgY29sb3I6XCJncmV5XCIsIGZvbnRTaXplOjExLCBzdXBlckxheWVyOmJhbm5lciwgbmFtZTpcInRpbWVcIlxuXHR0aW1lLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOlthcHAsIDNdXG5cdFx0Ym90dG9tRWRnZXM6IGFwcFxuXG5cdG0ubGF5b3V0LnNldCgpXG5cdG0udXRpbHMuYmdCbHVyKGJhbm5lcilcblxuXHQjIyBCYW5uZXIgRHJhZyBzZXR0aW5nc1xuXHRiYW5uZXIuZHJhZ2dhYmxlID0gdHJ1ZVxuXHRiYW5uZXIuZHJhZ2dhYmxlLmhvcml6b250YWwgPSBmYWxzZVxuXHRiYW5uZXIuZHJhZ2dhYmxlLmNvbnN0cmFpbnRzID1cblx0XHR5OjBcblxuXHRiYW5uZXIuZHJhZ2dhYmxlLmJvdW5jZU9wdGlvbnMgPVxuXHQgICAgZnJpY3Rpb246IDI1XG5cdCAgICB0ZW5zaW9uOiAyNTBcblxuXHRiYW5uZXIub24gRXZlbnRzLkRyYWdFbmQsIC0+XG5cdFx0aWYgYmFubmVyLm1heFkgPCBtLnV0aWxzLnB4KDY4KVxuXHRcdFx0YmFubmVyLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczoobWF4WTowKVxuXHRcdFx0XHR0aW1lOi4xNVxuXHRcdFx0XHRjdXJ2ZTpcImVhc2UtaW4tb3V0XCJcblx0XHRcdFV0aWxzLmRlbGF5IC4yNSwgLT5cblx0XHRcdFx0YmFubmVyLmRlc3Ryb3koKVxuXG5cdCMgQnVmZmVyIHRoYXQgc2l0cyBhYm92ZSB0aGUgYmFubmVyXG5cdGJhbm5lckJ1ZmZlciA9IG5ldyBMYXllciBtYXhZOjAsIG5hbWU6XCJidWZmZXJcIiwgYmFja2dyb3VuZENvbG9yOlwiIzFCMUIxQ1wiLCBvcGFjaXR5Oi45LCBzdXBlckxheWVyOmJhbm5lciwgd2lkdGg6bS5kZXZpY2Uud2lkdGgsIG1heFk6YmFubmVyLnksIGhlaWdodDptLmRldmljZS5oZWlnaHRcblx0bS51dGlscy5iZ0JsdXIoYmFubmVyQnVmZmVyKVxuXG5cdCMgQW5pbWF0ZS1pblxuXHRpZiBzZXR1cC5hbmltYXRlZCA9PSB0cnVlXG5cdFx0YmFubmVyLnkgPSAwIC0gYmFubmVyLmhlaWdodFxuXHRcdGJhbm5lci5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOih5OjApXG5cdFx0XHR0aW1lOi4yNVxuXHRcdFx0Y3VydmU6XCJzcHJpbmcoNDAwLDIwLDApXCJcblxuXHQjIEFuaW1hdGUtb3V0XG5cdGlmIHNldHVwLmR1cmF0aW9uXG5cdFx0VXRpbHMuZGVsYXkgc2V0dXAuZHVyYXRpb24sIC0+XG5cdFx0XHRiYW5uZXIuYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihtYXhZOjApXG5cdFx0XHRcdHRpbWU6LjI1XG5cdFx0XHRcdGN1cnZlOlwiZWFzZS1pbi1vdXRcIlxuXHRcdFV0aWxzLmRlbGF5IHNldHVwLmR1cmF0aW9uICsgLjI1LCAtPlxuXHRcdFx0YmFubmVyLmRlc3Ryb3koKVxuXG5cdCMgRXhwb3J0IEJhbm5lclxuXHRiYW5uZXIuaWNvbiA9IHNldHVwLmljb25cblx0YmFubmVyLmFwcCA9IGFwcFxuXHRiYW5uZXIudGl0bGUgPSB0aXRsZVxuXHRiYW5uZXIubWVzc2FnZSA9IG1lc3NhZ2Vcblx0cmV0dXJuIGJhbm5lclxuIiwiIyMgQWxsb3dzIHlvdSB0byB1c2UgYWxsIHRoZSBNYXRlcmlhbCBLaXQgY29tcG9uZW50cyAmIGxvZ2ljXG5tID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6IFwiZ3JleTEwMFwiXG4gIHRhYnNDb2xvcjogXCJncmV5OTAwXCJcbiAgdGFiczogdW5kZWZpbmVkXG4gIHRhYkljb25zOiB1bmRlZmluZWRcbiAgbGFiZWxzOiB0cnVlXG4gIGluYWN0aXZlVGFiT3BhY2l0eTogLjZcbn1cblxuIyMgQ3JlYXRlcyBhIHByb3BlcnR5IGxpc3RcbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblxuICAjIyBDcmVhdGVzIGEgc2V0dXAgb2JqZWN0IHRoYXQgaGFzIGRlZmF1bHRzICsgYW55IGN1c3RvbSBwcm9wcy5cbiAgc2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXG4gICMgQ3JlYXRlIGJvdHRvbSBuYXZcbiAgYm90dG9tTmF2ID0gbmV3IExheWVyXG4gICAgbmFtZTogXCJib3R0b21OYXZcIlxuICAgIGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblx0XHRzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4xMilcIlxuXHRcdHNoYWRvd0JsdXI6IG0ucHgoNClcblx0XHRzaGFkb3dZOiAtbS5weCgyKVxuICBib3R0b21OYXYuY29uc3RyYWludHMgPVxuICAgIGxlYWRpbmc6IDBcbiAgICB0cmFpbGluZzogMFxuICAgIGJvdHRvbTogNDZcbiAgICBoZWlnaHQ6IDU2XG4gIG0ubGF5b3V0LnNldChib3R0b21OYXYpXG5cbiAgIyBIYW5kbGUgdGFicyBzdGF0ZXNcbiAgaGFuZGxlVGFiU3RhdGVzID0gKGJvdHRvbU5hdiwgbGF5ZXIpIC0+XG5cbiAgICAjIFB1dCB0YWIgb2JqZWN0cyBpbnRvIGFycmF5XG4gICAgdGFic0FycmF5ID0gT2JqZWN0LmtleXMoYm90dG9tTmF2LnRhYnMpXG4gICAgYWN0aXZlVGFiSW5kZXggPSB1bmRlZmluZWRcblxuICAgIGZvciB0LCBpIGluIHRhYnNBcnJheVxuICAgICAgdGFiID0gYm90dG9tTmF2LnRhYnNbdF1cblxuICAgICAgIyBJZiB0aGlzIGlzIGlzIGFjdGl2ZSB0YWJcbiAgICAgIGlmIHRhYiA9PSBib3R0b21OYXYuYWN0aXZlVGFiXG5cbiAgICAgICAgYWN0aXZlVGFiSW5kZXggPSBpXG4gICAgICAgIHRhYi5pY29uLm9wYWNpdHkgPSAxXG4gICAgICAgIHRhYi5pY29uLmNvbnN0cmFpbnRzLnRvcCA9IDZcbiAgICAgICAgdGFiLmxhYmVsLm9wYWNpdHkgPSAxXG4gICAgICAgIHRhYi5sYWJlbC5jb25zdHJhaW50cy50b3AgPSB0YWIuaWNvblxuXG4gICAgICAgIGJvdHRvbU5hdi52aWV3c1t0XS5hbmltYXRlXG4gICAgICAgICAgcHJvcGVydGllczooeDowKVxuICAgICAgICAgIHRpbWU6LjI1XG5cbiAgICAgIGVsc2VcblxuICAgICAgICB0YWIuaWNvbi5vcGFjaXR5ID0gc2V0dXAuaW5hY3RpdmVUYWJPcGFjaXR5XG4gICAgICAgIHRhYi5pY29uLmNvbnN0cmFpbnRzLnRvcCA9IDE2XG4gICAgICAgIHRhYi5sYWJlbC5vcGFjaXR5ID0gMFxuICAgICAgICB0YWIubGFiZWwuY29uc3RyYWludHMudG9wID0gMjFcblxuICAgICAgICBpZiBhY3RpdmVUYWJJbmRleCA9PSB1bmRlZmluZWRcbiAgICAgICAgICBib3R0b21OYXYudmlld3NbdF0uYW5pbWF0ZVxuICAgICAgICAgICAgcHJvcGVydGllczooeDptLmRldmljZS53aWR0aCAqIC0xKVxuICAgICAgICAgICAgdGltZTouMjVcbiAgICAgICAgICAgIGN1cnZlOlwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGJvdHRvbU5hdi52aWV3c1t0XS5hbmltYXRlXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOih4Om0uZGV2aWNlLndpZHRoKVxuICAgICAgICAgICAgdGltZTouMjVcbiAgICAgICAgICAgIGN1cnZlOlwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcblxuICAgICAgbS5sYXlvdXQuYW5pbWF0ZSh0aW1lOiAuMSlcblxuICAjIFByZXBhcmUgb2JqZWN0cyB0byBwdXQgdGFicyBhbmQgdmlld3MgaW50b1xuICBib3R0b21OYXYudGFicyA9IHt9XG4gIGJvdHRvbU5hdi52aWV3cyA9IHt9XG5cbiAgIyBDcmVhdGUgdGFicyBpZiB5b3UgaGF2ZSBubyBtb3JlIHRoYW4gNSBkZXN0aW5hdGlvbnNcbiAgaWYgc2V0dXAudGFicy5sZW5ndGggPCA2XG4gICAgICBmb3IgdCwgaSBpbiBzZXR1cC50YWJzXG5cbiAgICAgICAgIyBDcmVhdGUgdmlld3NcbiAgICAgICAgdmlldyA9IG5ldyBMYXllclxuICAgICAgICAgIG5hbWU6IFwiVmlld1wiICsgdFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgICAgIHZpZXcuY29uc3RyYWludHMgPVxuICAgICAgICAgIGJvdHRvbTogYm90dG9tTmF2XG4gICAgICAgICAgdG9wOiAwXG4gICAgICAgICAgd2lkdGg6bS5kcChtLmRldmljZS53aWR0aClcbiAgICAgICAgdmlldy5zZW5kVG9CYWNrKClcblxuICAgICAgICAjIFB1dCB2aWV3IGludG8gb2JqZWN0XG4gICAgICAgIGJvdHRvbU5hdi52aWV3c1t0XSA9IHZpZXdcblxuICAgICAgICAjIEFsbCBvdGhlciB2aWV3cyBleGNlcHQgb2YgZmlyc3QgdG8gdGhlIHJpZ2h0XG4gICAgICAgIGlmIGkgPiAwXG4gICAgICAgICAgdmlldy54ID0gbS5kZXZpY2Uud2lkdGhcblxuICAgICAgICAjIENyZWF0ZSB0YWIgY29udGFpbmVyc1xuICAgICAgICB0YWIgPSBuZXcgTGF5ZXJcbiAgICAgICAgICB3aWR0aDptLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aFxuICAgICAgICAgIGhlaWdodDogbS5weCg1NilcbiAgICAgICAgICB4OihtLmRldmljZS53aWR0aC9zZXR1cC50YWJzLmxlbmd0aCkgKiBpXG4gICAgICAgICAgc3VwZXJMYXllcjogYm90dG9tTmF2XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCJcbiAgICAgICAgICBjbGlwOiB0cnVlXG4gICAgICAgICAgbmFtZTogXCJ0YWJcIiArIHRcbiAgICAgICAgbS5sYXlvdXQuc2V0KHRhYilcblxuICAgICAgICAjIENyZWF0ZSBpY29uc1xuICAgICAgICBpY29uTmFtZSA9IHNldHVwLnRhYkljb25zW2ldXG4gICAgICAgIGljb24gPSBuZXcgbS5JY29uXG4gICAgICAgICAgbmFtZTogaWNvbk5hbWVcbiAgICAgICAgICBzdXBlckxheWVyOiB0YWJcbiAgICAgICAgICBjb2xvcjogc2V0dXAudGFic0NvbG9yXG4gICAgICAgICAgY29uc3RyYWludHM6IHt0b3A6IDE2fVxuICAgICAgICBpY29uLm9wYWNpdHkgPSBzZXR1cC5pbmFjdGl2ZVRhYk9wYWNpdHlcbiAgICAgICAgaWNvbi5jZW50ZXJYKClcblxuICAgICAgICAjIENyZWF0ZSBsYWJlbHNcbiAgICAgICAgbGFiZWwgPSBuZXcgbS5UZXh0XG4gICAgICAgICAgbmFtZTogdFxuICAgICAgICAgIHN1cGVyTGF5ZXI6IHRhYlxuICAgICAgICAgIHRleHQ6IHRcbiAgICAgICAgICBmb250U2l6ZTogMTRcbiAgICAgICAgICBjb2xvcjogc2V0dXAudGFic0NvbG9yXG4gICAgICAgICAgY29uc3RyYWludHM6IHt0b3A6IDIxfVxuICAgICAgICBsYWJlbC5vcGFjaXR5ID0gMFxuICAgICAgICBsYWJlbC5jZW50ZXJYKClcblxuICAgICAgICAjIFB1dCB0aGlzIGljb24gYW5kIGxhYmVsIGFzIGEgcHJvcGVydHlcbiAgICAgICAgdGFiLmljb24gPSBpY29uXG4gICAgICAgIHRhYi5sYWJlbCA9IGxhYmVsXG4gICAgICAgICMgUHV0IHRhYiBpbnRvIHRhYnMgb2JqZWN0XG4gICAgICAgIGJvdHRvbU5hdi50YWJzW3RdID0gdGFiXG5cbiAgICAgICAgdGFiLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgICAgICBib3R0b21OYXYuYWN0aXZlVGFiID0gQFxuICAgICAgICAgIGhhbmRsZVRhYlN0YXRlcyhib3R0b21OYXYsIEApXG5cbiAgYm90dG9tTmF2LmFjdGl2ZVRhYiA9IGJvdHRvbU5hdi50YWJzW3NldHVwLnRhYnNbMF1dXG4gIGhhbmRsZVRhYlN0YXRlcyhib3R0b21OYXYsIGJvdHRvbU5hdi5hY3RpdmVUYWIpXG5cbiAgcmV0dXJuIGJvdHRvbU5hdlxuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0XHR0ZXh0OlwidGV4dFwiXG5cdFx0dHlwZTpcImZsYXRcIlxuXHRcdGJhY2tncm91bmRDb2xvcjpcIndoaXRlXCJcblx0XHRjb2xvcjpcInRlYWwzMDBcIlxuXHRcdG5hbWU6XCJidXR0b25cIlxuXHRcdHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG5cdFx0Y29uc3RyYWludHM6dW5kZWZpbmVkXG5cdFx0aWNvbjpcInN0YXJcIlxuXHRcdGNsaXA6dHJ1ZVxuXHRcdGluazp1bmRlZmluZWRcblx0fVxuXG5leHBvcnRzLmRlZmF1bHRzLnByb3BzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cylcblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblxuXHRidXR0b24gPSBuZXcgTGF5ZXJcblx0XHRuYW1lOnNldHVwLm5hbWVcblx0XHRjbGlwOnNldHVwLmNsaXBcblxuXHRpZiBzZXR1cC5zdXBlckxheWVyXG5cdFx0c2V0dXAuc3VwZXJMYXllci5hZGRTdWJMYXllcihidXR0b24pXG5cblx0YnV0dG9uLnR5cGUgPSBzZXR1cC50eXBlXG5cdHN3aXRjaCBzZXR1cC50eXBlXG5cdFx0d2hlbiBcImZsb2F0aW5nXCJcblx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cyA9XG5cdFx0XHRcdCB3aWR0aDo1NlxuXHRcdFx0XHQgaGVpZ2h0OjU2XG5cdFx0XHRcdCBib3R0b206NjRcblx0XHRcdFx0IHRyYWlsaW5nOjE3XG5cdFx0XHRpZiBtLmRldmljZS5zY2FsZSA8IDRcblx0XHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzLndpZHRoID0gNjRcblx0XHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzLmhlaWdodCA9IDY0XG5cdFx0XHRidXR0b24uYm9yZGVyUmFkaXVzID0gbS5weCgzMilcblx0XHRcdGJ1dHRvbi5zaGFkb3dDb2xvciA9IFwicmdiYSgwLDAsMCwuMTIpXCJcblx0XHRcdGJ1dHRvbi5zaGFkb3dZID0gbS5weCgyKVxuXHRcdFx0YnV0dG9uLnNoYWRvd0JsdXIgPSBtLnB4KDYpXG5cdFx0XHRidXR0b24uYmFja2dyb3VuZENvbG9yID0gbS5jb2xvcihzZXR1cC5iYWNrZ3JvdW5kQ29sb3IpXG5cdFx0XHRpZiB0eXBlb2Ygc2V0dXAuaWNvbiA9PSBcInN0cmluZ1wiXG5cdFx0XHRcdGljb24gPSBtLkljb25cblx0XHRcdFx0XHRuYW1lOnNldHVwLmljb25cblx0XHRcdFx0XHRjb2xvcjpzZXR1cC5jb2xvclxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6YnV0dG9uXG5cdFx0XHRcdFx0Y29uc3RyYWludHM6e2FsaWduOlwiY2VudGVyXCJ9XG5cblx0XHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0XHR0YXJnZXQ6W2J1dHRvbl1cblx0XHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0XHR0YXJnZXQ6W2ljb25dXG5cblx0XHRlbHNlXG5cdFx0XHRsYWJlbCA9IG5ldyBtLlRleHRcblx0XHRcdFx0dGV4dDpzZXR1cC50ZXh0XG5cdFx0XHRcdHN1cGVyTGF5ZXI6YnV0dG9uXG5cdFx0XHRcdHRleHRUcmFuc2Zvcm06XCJ1cHBlcmNhc2VcIlxuXHRcdFx0XHRjb2xvcjpzZXR1cC5jb2xvclxuXHRcdFx0XHRmb250U2l6ZToxNFxuXHRcdFx0XHRsaW5lSGVpZ2h0OjE0XG5cdFx0XHRcdGZvbnRXZWlnaHQ6NTAwXG5cdFx0XHRsYWJlbC5jb25zdHJhaW50cyA9XG5cdFx0XHRcdGFsaWduOlwiY2VudGVyXCJcblx0XHRcdGJ1dHRvbi5wcm9wcyA9XG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLmJhY2tncm91bmRDb2xvcilcblx0XHRcdFx0aGVpZ2h0Om0ucHgoMzYpXG5cdFx0XHRcdHdpZHRoOmxhYmVsLndpZHRoICsgbS5weCgxNilcblx0XHRcdFx0Ym9yZGVyUmFkaXVzOm0ucHgoMilcblx0XHRcdFx0Y2xpcDpzZXR1cC5jbGlwXG5cblx0XHRcdGlmIGJ1dHRvbi53aWR0aCA8IG0ucHgoNjQpXG5cdFx0XHRcdGJ1dHRvbi53aWR0aCA9IG0ucHgoNjQpXG5cblx0XHRcdHN3aXRjaCBzZXR1cC50eXBlXG5cdFx0XHRcdHdoZW4gXCJyYWlzZWRcIlxuXHRcdFx0XHRcdGJ1dHRvbi5vcmlnQkdDID0gYnV0dG9uLmJhY2tncm91bmRDb2xvclxuXHRcdFx0XHRcdGJ1dHRvbi5zaGFkb3dDb2xvciA9IFwicmdiYSgwLDAsMCwuMjQpXCJcblx0XHRcdFx0XHRidXR0b24uc2hhZG93WSA9IG0ucHgoMilcblx0XHRcdFx0XHRidXR0b24uc2hhZG93Qmx1ciA9IG0ucHgoMilcblx0XHRcdFx0XHRwcmVzc2VkQkdDID0gYnV0dG9uLmJhY2tncm91bmRDb2xvci5saWdodGVuKDEwKVxuXHRcdFx0XHRcdGJ1dHRvbi5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cblx0XHRcdFx0XHRcdGJ1dHRvbi5hbmltYXRlXG5cdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOnByZXNzZWRCR0Ncblx0XHRcdFx0XHRcdFx0XHRzaGFkb3dZOm0ucHgoOClcblx0XHRcdFx0XHRcdFx0XHRzaGFkb3dCbHVyOm0ucHgoOClcblx0XHRcdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuXHRcdFx0XHRcdFx0YnV0dG9uLmFuaW1hdGVcblx0XHRcdFx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGJ1dHRvbi5vcmlnQkdDXG5cdFx0XHRcdFx0XHRcdFx0c2hhZG93WTptLnB4KDIpXG5cdFx0XHRcdFx0XHRcdFx0c2hhZG93Qmx1cjptLnB4KDIpXG5cdFx0XHRcdHdoZW4gXCJmbGF0XCJcblx0XHRcdFx0XHRidXR0b24ub3JpZ0JHQyA9IGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3Jcblx0XHRcdFx0XHRwcmVzc2VkQkdDID0gYnV0dG9uLmJhY2tncm91bmRDb2xvci5kYXJrZW4oNSlcblx0XHRcdFx0XHRidXR0b24ub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG5cdFx0XHRcdFx0XHRidXR0b24uYW5pbWF0ZVxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpwcmVzc2VkQkdDXG5cdFx0XHRcdFx0YnV0dG9uLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRcdFx0XHRcdGJ1dHRvbi5hbmltYXRlXG5cdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBidXR0b24ub3JpZ0JHQ1xuXG5cblx0XHRcdGlmIHNldHVwLmNvbnN0cmFpbnRzXG5cdFx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cyA9IHNldHVwLmNvbnN0cmFpbnRzXG5cblx0XHRcdG0ubGF5b3V0LnNldFxuXHRcdFx0XHR0YXJnZXQ6W2J1dHRvbiwgbGFiZWxdXG5cblx0aWYgc2V0dXAuaW5rXG5cdFx0cGFzc2VkSW5rID0gc2V0dXAuaW5rXG5cdFx0cGFzc2VkSW5rLmxheWVyID0gYnV0dG9uXG5cblx0XHRtLnV0aWxzLmlua3kocGFzc2VkSW5rKVxuXHRidXR0b24ubGFiZWwgPSBsYWJlbFxuXHRyZXR1cm4gYnV0dG9uXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHR0aXRsZTpcIlRpdGxlXCJcblx0Ym9keVRleHQ6IFwiQ29udGVudFwiXG5cdGhlaWdodDogMzAwXG5cdHR5cGU6XCJjYXJkXCJcblx0YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIlxuXHR0aXRsZUNvbG9yOlwiYmxhY2tcIlxuXHRhY3Rpb25Db2xvcjpcImJsYWNrXCJcblx0YWN0aW9uczp1bmRlZmluZWRcblx0Zm9vdGVyOiAgdW5kZWZpbmVkXG5cdGltYWdlOiB1bmRlZmluZWRcblx0aW1hZ2VIZWlnaHQ6IHVuZGVmaW5lZFxuXHRzdXBlckxheWVyOnVuZGVmaW5lZFxuXHRib3JkZXJSYWRpdXM6IHVuZGVmaW5lZFxuXG5cbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cdGNhcmQgPSBuZXcgTGF5ZXJcblx0XHRuYW1lOlwiQ2FyZFwiXG5cdFx0YmFja2dyb3VuZENvbG9yOm0uY29sb3Ioc2V0dXAuYmFja2dyb3VuZENvbG9yKVxuXHRcdHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgMCwgMCwgLjEyKVwiXG5cdFx0c2hhZG93Qmx1cjogbS5weCg0KVxuXHRcdHNoYWRvd1k6IG0ucHgoMilcblx0XHRzdXBlckxheWVyOiBzZXR1cC5zdXBlckxheWVyXG5cdFx0Ym9yZGVyUmFkaXVzOiBzZXR1cC5ib3JkZXJSYWRpdXNcblxuXHRjYXJkLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjE2XG5cdFx0dHJhaWxpbmc6MTZcblx0XHR0b3A6MFxuXHRcdGhlaWdodDogc2V0dXAuaGVpZ2h0XG5cblxuXHR0aXRsZSA9IG5ldyBtLlRleHRcblx0XHRzdXBlckxheWVyOmNhcmRcblx0XHR0ZXh0OnNldHVwLnRpdGxlXG5cdFx0Zm9udFdlaWdodDpcInNlbWlib2xkXCJcblx0XHRmb250U2l6ZToyMFxuXHRcdG5hbWU6XCJ0aXRsZVwiXG5cdFx0bGluZUhlaWdodDoyMFxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0dG9wOjIwXG5cdFx0XHR3aWR0aDoyMjBcblx0XHRcdGxlYWRpbmc6MTZcblxuXG5cblx0IyBTRVQgVVAgQUNUSU9OUyBJTiBIRUFERVJcblx0YWN0aW9uc0FycmF5ID0gW11cblx0aWYgc2V0dXAuYWN0aW9uc1xuXHRcdGZvciBhY3QsIGkgaW4gc2V0dXAuYWN0aW9uc1xuXHRcdFx0aWYgaSA9PSAwXG5cdFx0XHRcdGljb24gPSBuZXcgbS5JY29uXG5cdFx0XHRcdFx0bmFtZTphY3Rcblx0XHRcdFx0XHRzdXBlckxheWVyOmNhcmRcblx0XHRcdFx0XHRjb25zdHJhaW50czp7dHJhaWxpbmc6MTYsIHRvcDogMTZ9XG5cdFx0XHRcdFx0Y29sb3I6c2V0dXAuYWN0aW9uQ29sb3Jcblx0XHRcdFx0XHRjbGlwOmZhbHNlXG5cdFx0XHRcdGFjdGlvbnNBcnJheS5wdXNoIGljb25cblx0XHRcdGVsc2Vcblx0XHRcdFx0aWNvbiA9IG5ldyBtLkljb25cblx0XHRcdFx0XHRuYW1lOmFjdFxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6Y2FyZFxuXHRcdFx0XHRcdGNvbnN0cmFpbnRzOnt0cmFpbGluZzpbYWN0aW9uc0FycmF5W2kgLSAxXSwgMTZdLCB2ZXJ0aWNhbENlbnRlcjp0aXRsZX1cblx0XHRcdFx0XHRjb2xvcjpzZXR1cC5hY3Rpb25Db2xvclxuXHRcdFx0XHRcdGNsaXA6ZmFsc2Vcblx0XHRcdFx0YWN0aW9uc0FycmF5LnB1c2ggaWNvblxuXG5cdFx0Zm9yIGFjdCBpbiBhY3Rpb25zQXJyYXlcblx0XHRcdG0udXRpbHMuaW5reVxuXHRcdFx0XHRsYXllcjphY3Rcblx0XHRcdFx0bW92ZVRvVGFwOmZhbHNlXG5cdFx0XHRcdGNvbG9yOlwid2hpdGVcIlxuXHRcdFx0XHRvcGFjaXR5Oi40XG5cdFx0XHRcdHNjYWxlOi44XG5cdFx0XHRcdHN0YXJ0U2NhbGU6LjdcblxuXG5cblx0IyBJTUFHRSBTRVRVUFxuXHRpZiBzZXR1cC5pbWFnZVxuXHRcdHRodW1ibmFpbCA9IG5ldyBMYXllclxuXHRcdFx0XHRzdXBlckxheWVyOiBjYXJkXG5cdFx0XHRcdGltYWdlOiBzZXR1cC5pbWFnZVxuXHRcdFx0XHRoZWlnaHQ6IHNldHVwLmltYWdlSGVpZ2h0XG5cblx0XHR0aHVtYm5haWwuY29uc3RyYWludHMgPVxuXHRcdFx0XHRsZWFkaW5nOjBcblx0XHRcdFx0dHJhaWxpbmc6MFxuXHRcdFx0XHR0b3A6IFt0aXRsZSwgMTZdXG5cdFx0bS51dGlscy5pbmt5XG5cdFx0XHRsYXllcjp0aHVtYm5haWxcblx0XHRcdG1vdmVUb1RhcDp0cnVlXG5cdFx0XHRjb2xvcjpcIndoaXRlXCJcblx0XHRcdG9wYWNpdHk6LjRcblx0XHRcdHNjYWxlOiAyXG5cdFx0XHRzdGFydFNjYWxlOi43XG5cdFx0Y2FyZC5jb25zdHJhaW50c1tcImhlaWdodFwiXSA9IDIwICsgbS51dGlscy5wdCh0aXRsZS5oZWlnaHQpICsgMTAgKyBtLnV0aWxzLnB0KHRodW1ibmFpbC5oZWlnaHQpICsgMjQgKyA0NFxuXG5cdCMgSWYgdGhlcmUgaXMgVGV4dCBzZXR1cCBidXQgbm8gSW1hZ2UsIHBsYWNlIHRleHQgdW5kZXIgdGl0bGVcblx0aWYgc2V0dXAuYm9keVRleHQgYW5kIG5vdCBzZXR1cC5pbWFnZVxuXHRcdFx0Ym9keVRleHQgPSBuZXcgbS5UZXh0XG5cdFx0XHRcdG5hbWU6XCJjb250ZW50XCJcblx0XHRcdFx0c3VwZXJMYXllcjogY2FyZFxuXHRcdFx0XHR0ZXh0OnNldHVwLmJvZHlUZXh0XG5cdFx0XHRib2R5VGV4dC5jb25zdHJhaW50cyA9XG5cdFx0XHRcdHRvcDogW3RpdGxlLCAxNl1cblx0XHRcdFx0bGVhZGluZzogMTZcblx0XHRcdFx0dHJhaWxpbmc6IDE2XG5cblx0IyBpZiB0aGVyZSBpcyBhbiBpbWFnZSAmIGJvZHl0ZXh0IHNldHVwLCBwbGFjZSBib2R5dGV4dCB1bmRlciBpbWFnZVxuXHRpZiBzZXR1cC5ib2R5VGV4dCAmJiBzZXR1cC5pbWFnZVxuXHRcdGJvZHlUZXh0ID0gbmV3IG0uVGV4dFxuXHRcdFx0bmFtZTpcImNvbnRlbnRcIlxuXHRcdFx0c3VwZXJMYXllcjogY2FyZFxuXHRcdFx0dGV4dDpzZXR1cC5ib2R5VGV4dFxuXG5cdFx0Ym9keVRleHQuY29uc3RyYWludHMgPVxuXHRcdFx0dG9wOiBbdGh1bWJuYWlsLCAxNl1cblx0XHRcdGxlYWRpbmc6IDE2XG5cdFx0XHR0cmFpbGluZzogMTZcblxuXG5cblxuXG5cblxuXHRjYXJkQnV0dG9uQXJyYXkgPSBbXVxuXG5cdGlmIHNldHVwLmZvb3RlclxuXHRcdGNhcmRGb290ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiY2FyZEZvb3RlclwiXG5cdFx0XHRzdXBlckxheWVyOiBjYXJkXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcblxuXHRcdGNhcmRGb290ZXIuY29uc3RyYWludHMgPVxuXHRcdFx0aGVpZ2h0OiA1NlxuXHRcdFx0Ym90dG9tOiAwXG5cdFx0XHRsZWFkaW5nOiAwXG5cdFx0XHR0cmFpbGluZzogMFxuXG5cdFx0Zm9yIGJ1dHRvbiwgaSBpbiBzZXR1cC5mb290ZXJcblx0XHRcdGlmIGkgPT0gMFxuXHRcdFx0XHRidXR0b24gPSBuZXcgbS5CdXR0b25cblx0XHRcdFx0XHRuYW1lOiBidXR0b25cblx0XHRcdFx0XHR0eXBlOlwiZmxhdFwiXG5cdFx0XHRcdFx0c3VwZXJMYXllcjogY2FyZEZvb3RlclxuXHRcdFx0XHRcdHRleHQ6IHNldHVwLmZvb3RlclxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcIiMzMjMyXCJcblx0XHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzID0ge2JvdHRvbTo4LCBsZWFkaW5nOjE2LH1cblx0XHRcdFx0Y2FyZEJ1dHRvbkFycmF5LnB1c2ggYnV0dG9uXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGJ1dHRvbiA9IG5ldyBtLkJ1dHRvblxuXHRcdFx0XHRcdG5hbWU6IGJ1dHRvblxuXHRcdFx0XHRcdHR5cGU6XCJyYWlzZWRcIlxuXHRcdFx0XHRcdHN1cGVyTGF5ZXI6IGNhcmRGb290ZXJcblx0XHRcdFx0XHR0ZXh0OiBzZXR1cC5mb290ZXJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCIjMzIzMlwiXG5cdFx0XHRcdFx0Y29uc3RyYWludHM6e3RyYWlsaW5nOltjYXJkQnV0dG9uQXJyYXlbaSAtIDFdLCAxNl19XG5cdFx0XHRcdGNhcmRCdXR0b25BcnJheS5wdXNoIGJ1dHRvblxuXG5cdFx0Zm9yIGJ1dHRvbiBpbiBjYXJkQnV0dG9uQXJyYXlcblx0XHRcdG0udXRpbHMuaW5reVxuXHRcdFx0XHRsYXllcjogYnV0dG9uXG5cdFx0XHRcdG1vdmVUb1RhcDpmYWxzZVxuXHRcdFx0XHRjb2xvcjpcInJlZFwiXG5cdFx0XHRcdG9wYWNpdHk6LjRcblx0XHRcdFx0c2NhbGU6Ljhcblx0XHRcdFx0c3RhcnRTY2FsZTouN1xuXG5cblxuXHRcdFx0bS5sYXlvdXQuc2V0KClcblxuXG5cblxuXG5cblxuXG5cdG0ubGF5b3V0LnNldCgpXG5cblxuXHRjYXJkLnR5cGUgPSBzZXR1cC50eXBlXG5cblxuXG5cdG0udXRpbHMuc3BlY2lhbENoYXIodGl0bGUpXG5cblxuXG5cdHJldHVybiBjYXJkXG4iLCIjIEFsZXJ0XG5tID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuXHR0aXRsZTogXCJUaXRsZVwiXG5cdG1lc3NhZ2U6XCJNZXNzYWdlXCJcblx0YWN0aW9uczpbXCJBZ3JlZVwiLCBcIkRlY2xpbmVcIl1cbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cblx0ZGlhbG9nID0gbmV3IExheWVyIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsIG5hbWU6XCJkaWFsb2dcIlxuXHRkaWFsb2cuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmc6MFxuXHRcdHRyYWlsaW5nOjBcblx0XHR0b3A6MFxuXHRcdGJvdHRvbTowXG5cblx0b3ZlcmxheSA9IG5ldyBMYXllciBiYWNrZ3JvdW5kQ29sb3I6XCIjNUU1RTVFXCIsIHN1cGVyTGF5ZXI6ZGlhbG9nLCBuYW1lOlwib3ZlcmxheVwiLCBvcGFjaXR5Oi42XG5cdG92ZXJsYXkuY29uc3RyYWludHMgPVxuXHRcdGxlYWRpbmc6MFxuXHRcdHRyYWlsaW5nOjBcblx0XHR0b3A6MFxuXHRcdGJvdHRvbTowXG5cblx0bW9kYWwgPSBuZXcgTGF5ZXJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ3aGl0ZVwiXG5cdFx0c3VwZXJMYXllcjpkaWFsb2dcblx0XHRib3JkZXJSYWRpdXM6bS51dGlscy5weCgyKVxuXHRcdG5hbWU6XCJtb2RhbFwiXG5cdFx0c2hhZG93Q29sb3I6XCJyZ2JhKDAsMCwwLC4yKVwiXG5cdFx0c2hhZG93WToyNFxuXHRcdHNoYWRvd0JsdXI6MjRcblx0XHRjbGlwOnRydWVcblx0bW9kYWwuY29uc3RyYWludHMgPVxuXHRcdGFsaWduOlwiY2VudGVyXCJcblx0XHR3aWR0aDoyODBcblx0XHRoZWlnaHQ6NDAwXG5cblx0dGl0bGUgPSBuZXcgbS5UZXh0XG5cdFx0c3VwZXJMYXllcjptb2RhbFxuXHRcdHRleHQ6c2V0dXAudGl0bGVcblx0XHRmb250V2VpZ2h0Olwic2VtaWJvbGRcIlxuXHRcdGZvbnRTaXplOjIwXG5cdFx0bmFtZTpcInRpdGxlXCJcblx0XHRsaW5lSGVpZ2h0OjIwXG5cdFx0Y29uc3RyYWludHM6XG5cdFx0XHR0b3A6MjBcblx0XHRcdHdpZHRoOjIyMFxuXHRcdFx0bGVhZGluZzoyNFxuXG5cdG1lc3NhZ2UgPSBuZXcgbS5UZXh0XG5cdFx0c3VwZXJMYXllcjptb2RhbFxuXHRcdHRleHQ6c2V0dXAubWVzc2FnZVxuXHRcdGZvbnRTaXplOjEzXG5cdFx0bmFtZTpcIm1lc3NhZ2VcIlxuXHRcdGxpbmVIZWlnaHQ6MTZcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHRvcDogW3RpdGxlLCAxMF1cblx0XHRcdGxlYWRpbmc6MjRcblx0XHRcdHdpZHRoOiAyMjBcblxuXHRtLmxheW91dC5zZXRcblx0XHR0YXJnZXQ6W2RpYWxvZywgb3ZlcmxheSwgbW9kYWwsIHRpdGxlLCBtZXNzYWdlXVxuXG5cdCNUaXRsZSArIE1lc3NhZ2UgKyAxIHNldCBvZiBhY3Rpb25zXG5cdG1vZGFsLmNvbnN0cmFpbnRzW1wiaGVpZ2h0XCJdID0gMjAgKyBtLnV0aWxzLnB0KHRpdGxlLmhlaWdodCkgKyAxMCArIG0udXRpbHMucHQobWVzc2FnZS5oZWlnaHQpICsgMjQgKyA0NFxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbb3ZlcmxheSwgbW9kYWxdXG5cdGRpYWxvZy5hY3Rpb25zID0ge31cblx0YWN0aW9ucyA9IFtdXG5cdGNoYXJDb3VudCA9IDBcblx0aWYgc2V0dXAuYWN0aW9ucy5sZW5ndGggPiAxXG5cdFx0Y2hhckNvdW50ID0gc2V0dXAuYWN0aW9uc1swXS5sZW5ndGggKyBzZXR1cC5hY3Rpb25zWzFdLmxlbmd0aFxuXHRpZiBzZXR1cC5hY3Rpb25zLmxlbmd0aCA8IDMgJiYgY2hhckNvdW50IDwgMjRcblx0XHRmb3IgYWN0LCBpbmRleCBpbiBzZXR1cC5hY3Rpb25zXG5cdFx0XHRidXR0b24gPSBuZXcgbS5CdXR0b25cblx0XHRcdFx0c3VwZXJMYXllcjptb2RhbFxuXHRcdFx0XHR0ZXh0OnNldHVwLmFjdGlvbnNbaW5kZXhdXG5cdFx0XHRcdGNvbG9yOlwiYmx1ZVwiXG5cdFx0XHRpZiBpbmRleCA9PSAwXG5cdFx0XHRcdGJ1dHRvbi5jb25zdHJhaW50cyA9IHtib3R0b206OCwgdHJhaWxpbmc6OH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzID0ge2JvdHRvbTo4LCB0cmFpbGluZzpbYWN0aW9uc1tpbmRleCAtIDFdLCA4XX1cblx0XHRcdGRpYWxvZy5hY3Rpb25zW3NldHVwLmFjdGlvbnNbaW5kZXhdXSA9IGJ1dHRvblxuXHRcdFx0YWN0aW9ucy5wdXNoIGJ1dHRvblxuXHRcdFx0bS5sYXlvdXQuc2V0XG5cdFx0XHRcdHRhcmdldDpidXR0b25cblx0ZWxzZVxuXHRcdG1vZGFsLmNvbnN0cmFpbnRzW1wiaGVpZ2h0XCJdID0gMjAgKyBtLnV0aWxzLnB0KHRpdGxlLmhlaWdodCkgKyAxMCArIG0udXRpbHMucHQobWVzc2FnZS5oZWlnaHQpICsgMzIgKyAoc2V0dXAuYWN0aW9ucy5sZW5ndGggKiAzNilcblx0XHRtLmxheW91dC5zZXRcblx0XHRcdHRhcmdldDptb2RhbFxuXHRcdGxhcmdlc3RMYWJlbCA9IDBcblx0XHRsYXJnZXN0QnV0dG9uID0gMFxuXHRcdGZvciBhY3QsIGluZGV4IGluIHNldHVwLmFjdGlvbnNcblx0XHRcdGJ1dHRvbiA9IG5ldyBtLkJ1dHRvblxuXHRcdFx0XHRzdXBlckxheWVyOm1vZGFsXG5cdFx0XHRcdHRleHQ6c2V0dXAuYWN0aW9uc1tpbmRleF1cblx0XHRcdFx0Y29sb3I6XCJibHVlXCJcblx0XHRcdGlmIGluZGV4ID09IDBcblx0XHRcdFx0YnV0dG9uLmNvbnN0cmFpbnRzID0ge3RvcDpbbWVzc2FnZSwgMjRdLCB0cmFpbGluZzo4fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRidXR0b24uY29uc3RyYWludHMgPSB7dHJhaWxpbmc6OCwgdG9wOmFjdGlvbnNbaW5kZXggLSAxXX1cblx0XHRcdGRpYWxvZy5hY3Rpb25zW3NldHVwLmFjdGlvbnNbaW5kZXhdXSA9IGJ1dHRvblxuXHRcdFx0YWN0aW9ucy5wdXNoIGJ1dHRvblxuXHRcdFx0bS5sYXlvdXQuc2V0XG5cdFx0XHRcdHRhcmdldDpidXR0b25cblxuXHRcdFx0aWYgbGFyZ2VzdExhYmVsIDwgYnV0dG9uLmxhYmVsLndpZHRoXG5cdFx0XHRcdGxhcmdlc3RMYWJlbCA9IGJ1dHRvbi5sYWJlbC53aWR0aFxuXHRcdFx0XHRsYXJnZXN0QnV0dG9uID0gYnV0dG9uLndpZHRoXG5cblx0XHRmb3IgYWN0IGluIGFjdGlvbnNcblx0XHRcdGFjdC5sYWJlbC5zdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCJcblx0XHRcdGFjdC5sYWJlbC53aWR0aCA9IGxhcmdlc3RMYWJlbFxuXHRcdFx0YWN0LndpZHRoID0gbGFyZ2VzdEJ1dHRvblxuXHRcdFx0bS5sYXlvdXQuc2V0XG5cdFx0XHRcdHRhcmdldDpbYWN0LCBhY3QubGFiZWxdXG5cblx0IyBFeHBvcnQgZGlhbG9nXG5cdGRpYWxvZy5vdmVybGF5ID0gb3ZlcmxheVxuXHRkaWFsb2cubW9kYWwgPSBtb2RhbFxuXHRkaWFsb2cudGl0bGUgPSB0aXRsZVxuXHRkaWFsb2cubWVzc2FnZSA9IG1lc3NhZ2VcblxuXHRyZXR1cm4gZGlhbG9nXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5leHBvcnRzLmRlZmF1bHRzID0ge1xuICBuYW1lOiBcInN0YXJcIlxuICBzY2FsZTogbS5kZXZpY2Uuc2NhbGVcbiAgY29sb3I6IG0uY29sb3IoXCJibGFja1wiKVxuICBzdXBlckxheWVyOiB1bmRlZmluZWRcbiAgY29uc3RyYWludHM6IHVuZGVmaW5lZFxuICBjbGlwOnRydWVcbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuICBzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG4gIGlmIHR5cGVvZiBzZXR1cC5uYW1lID09IFwic3RyaW5nXCJcbiAgICBpY29uTGF5ZXIgPSBuZXcgTGF5ZXJcbiAgICAgIGh0bWw6XCI8aSBjbGFzcz0nbWF0ZXJpYWwtaWNvbnMgbWQtMjQnPiN7c2V0dXAubmFtZX08L2k+XCJcbiAgICAgIGNvbG9yOm0uY29sb3Ioc2V0dXAuY29sb3IpXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG4gICAgICBjbGlwOnNldHVwLmNsaXBcbiAgICAgIG5hbWU6c2V0dXAubmFtZVxuICAgICAgc3VwZXJMYXllcjpzZXR1cC5zdXBlckxheWVyXG5cbiAgICBwYWRkaW5nUmlnaHQgPSAwXG4gICAgcGFkZGluZ1RvcCA9IDBcblxuICAgIHN3aXRjaCBtLmRldmljZS5zY2FsZVxuICAgICAgd2hlbiA0XG4gICAgICAgIHBhZGRpbmdUb3AgPSBtLnB4KDEyKSArIFwicHhcIlxuICAgICAgICBwYWRkaW5nUmlnaHQgPSBtLnB4KDIpICsgXCJweFwiXG4gICAgICB3aGVuIDNcbiAgICAgICAgcGFkZGluZ1RvcCA9IG0ucHgoMTApICsgXCJweFwiXG4gICAgICAgIHBhZGRpbmdSaWdodCA9IG0ucHgoNikgKyBcInB4XCJcbiAgICAgIHdoZW4gMlxuICAgICAgICBwYWRkaW5nVG9wID0gbS5weCg4KSArIFwicHhcIlxuICAgICAgICBwYWRkaW5nUmlnaHQgPSBtLnB4KDgpICsgXCJweFwiXG4gICAgICB3aGVuIDFcbiAgICAgICAgcGFkZGluZ1RvcCA9IG0ucHgoMTYpICsgXCJweFwiXG4gICAgICAgIHBhZGRpbmdSaWdodCA9IG0ucHgoNykgKyBcInB4XCJcblxuXG4gICAgZnJhbWUgPSBtLnV0aWxzLnRleHRBdXRvU2l6ZShpY29uTGF5ZXIpXG4gICAgaWNvbkxheWVyLmh0bWwgPSBcIjxzcGFuIHN0eWxlPSctd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoI3tzZXR1cC5zY2FsZX0pOyBwb3NpdGlvbjogYWJzb2x1dGU7Jz5cIiArIGljb25MYXllci5odG1sXG4gICAgaWNvbkxheWVyLndpZHRoID0gbS5weCgyNClcbiAgICBpY29uTGF5ZXIuaGVpZ2h0ID0gbS5weChmcmFtZS5oZWlnaHQpXG5cbiAgICBpY29uTGF5ZXIuc3R5bGUgPVxuICAgICAgXCJkaXNwbGF5XCIgOiBcImlubGluZS1ibG9ja1wiXG4gICAgICBcInBhZGRpbmctdG9wXCIgOiBwYWRkaW5nVG9wXG4gICAgICBcInBhZGRpbmctcmlnaHRcIiA6IHBhZGRpbmdSaWdodFxuICAgICAgXCJ0ZXh0LWFsaWduXCIgOiBcImNlbnRlclwiXG4gICAgaWYgc2V0dXAuY29uc3RyYWludHNcbiAgICAgIGljb25MYXllci5jb25zdHJhaW50cyA9IHNldHVwLmNvbnN0cmFpbnRzXG4gICAgICBtLmxheW91dC5zZXRcbiAgICAgICAgdGFyZ2V0Omljb25MYXllclxuXG4gICAgcmV0dXJuIGljb25MYXllclxuICBlbHNlXG4gICAgaWNvbkxheWVyID0gc2V0dXAubGF5ZXJcbiAgICByZXR1cm4gaWNvbkxheWVyXG4iLCIjIFV0aWxzXG5cbm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGFuaW1hdGlvbnM6IHtcblx0XHR0YXJnZXQ6dW5kZWZpbmVkXG5cdFx0Y29uc3RyYWludHM6IHVuZGVmaW5lZFxuXHRcdGN1cnZlIDogXCJlYXNlLWluLW91dFwiXG5cdFx0Y3VydmVPcHRpb25zOiB1bmRlZmluZWRcblx0XHR0aW1lOjFcblx0XHRkZWxheTowXG5cdFx0cmVwZWF0OnVuZGVmaW5lZFxuXHRcdGNvbG9yTW9kZWw6dW5kZWZpbmVkXG5cdFx0c3RhZ2dlcjp1bmRlZmluZWRcblx0XHRmYWRlT3V0OmZhbHNlXG5cdFx0ZmFkZUluOmZhbHNlXG5cdH1cbn1cblxubGF5b3V0ID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IHt9XG5cdHRhcmdldExheWVycyA9IFtdXG5cdGJsdWVwcmludCA9IFtdXG5cdGlmIGFycmF5XG5cdFx0Zm9yIGkgaW4gT2JqZWN0LmtleXMoZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zKVxuXHRcdFx0aWYgYXJyYXlbaV1cblx0XHRcdFx0c2V0dXBbaV0gPSBhcnJheVtpXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzZXR1cFtpXSA9IGV4cG9ydHMuZGVmYXVsdHMuYW5pbWF0aW9uc1tpXVxuXG5cdGlmIHNldHVwLnRhcmdldFxuXHRcdGlmIHNldHVwLnRhcmdldC5sZW5ndGhcblx0XHRcdHRhcmdldExheWVycyA9IHNldHVwLnRhcmdldFxuXHRcdGVsc2Vcblx0XHRcdHRhcmdldExheWVycy5wdXNoIHNldHVwLnRhcmdldFxuXHRlbHNlXG5cdFx0dGFyZ2V0TGF5ZXJzID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmxheWVyc1xuXG5cdGlmIHNldHVwLnRhcmdldFxuXHRcdGlmIHNldHVwLmNvbnN0cmFpbnRzXG5cdFx0XHRmb3IgbmV3Q29uc3RyYWludCBpbiBPYmplY3Qua2V5cyhzZXR1cC5jb25zdHJhaW50cylcblx0XHRcdFx0c2V0dXAudGFyZ2V0LmNvbnN0cmFpbnRzW25ld0NvbnN0cmFpbnRdID0gc2V0dXAuY29uc3RyYWludHNbbmV3Q29uc3RyYWludF1cblxuXG5cdCNUcmFuc2xhdGUgbmV3IGNvbnN0cmFpbnRzXG5cdGZvciBsYXllciwgaW5kZXggaW4gdGFyZ2V0TGF5ZXJzXG5cdFx0bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uID0ge31cblx0XHRpZiBsYXllci5jb25zdHJhaW50c1xuXG5cdFx0XHRwcm9wcyA9IHt9XG5cdFx0XHRsYXllci5zdXBlckZyYW1lID0ge31cblxuXHRcdFx0aWYgbGF5ZXIuc3VwZXJMYXllclxuXHRcdFx0XHRsYXllci5zdXBlckZyYW1lLmhlaWdodCA9IGxheWVyLnN1cGVyTGF5ZXIuaGVpZ2h0XG5cdFx0XHRcdGxheWVyLnN1cGVyRnJhbWUud2lkdGggPSBsYXllci5zdXBlckxheWVyLndpZHRoXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGxheWVyLnN1cGVyRnJhbWUuaGVpZ2h0ID0gbS5kZXZpY2UuaGVpZ2h0XG5cdFx0XHRcdGxheWVyLnN1cGVyRnJhbWUud2lkdGggPSBtLmRldmljZS53aWR0aFxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nICE9IHVuZGVmaW5lZCAmJiBsYXllci5jb25zdHJhaW50cy50cmFpbGluZyAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoID0ge31cblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wICE9IHVuZGVmaW5lZCAmJiBsYXllci5jb25zdHJhaW50cy5ib3R0b20gIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQgPSB7fVxuXG5cdFx0XHQjIFNpemUgY29uc3RyYWludHNcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLndpZHRoICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy53aWR0aCA9IG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMud2lkdGgpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHByb3BzLndpZHRoID0gbGF5ZXIud2lkdGhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuaGVpZ2h0ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRwcm9wcy5oZWlnaHQgPSBtLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLmhlaWdodClcblx0XHRcdGVsc2Vcblx0XHRcdFx0cHJvcHMuaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cblxuXHRcdFx0IyBBbGlnbmluZyBjb25zdHJhaW50c1xuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ0VkZ2VzICE9IHVuZGVmaW5lZFxuXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5sZWFkaW5nRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnggPSBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nRWRnZXMueFxuXG5cdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdFZGdlcyAhPSB1bmRlZmluZWRcblxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ0VkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZ0VkZ2VzLnhcblxuXHRcdFx0XHRwcm9wcy54ID0gbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueCAtIHByb3BzLndpZHRoICsgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmdFZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ud2lkdGhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wRWRnZXMgIT0gdW5kZWZpbmVkXG5cblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnkgPT0gdW5kZWZpbmVkXG5cdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMudG9wRWRnZXMuY2FsY3VsYXRlZFBvc2l0aW9uLnkgPSBsYXllci5jb25zdHJhaW50cy50b3BFZGdlcy55XG5cblx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLnRvcEVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi55XG5cblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbUVkZ2VzICE9IHVuZGVmaW5lZFxuXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbUVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbUVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tRWRnZXMueVxuXG5cdFx0XHRcdHByb3BzLnkgPSBsYXllci5jb25zdHJhaW50cy5ib3R0b21FZGdlcy5jYWxjdWxhdGVkUG9zaXRpb24ueSAtIHByb3BzLmhlaWdodCArIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbUVkZ2VzLmNhbGN1bGF0ZWRQb3NpdGlvbi5oZWlnaHRcblxuXG5cdFx0XHQjIFBvc2l0aW9uaW5nIGNvbnN0cmFpbnRzXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nICE9IHVuZGVmaW5lZFxuXHRcdFx0XHQjSWYgaXQncyBhIG51bWJlcmBcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZyA9PSBwYXJzZUludChsYXllci5jb25zdHJhaW50cy5sZWFkaW5nLCAxMClcblx0XHRcdFx0XHRwcm9wcy54ID0gbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy5sZWFkaW5nKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSBsYXllclxuXHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmcubGVuZ3RoID09IHVuZGVmaW5lZFxuXG5cdFx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5sZWFkaW5nLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZy54XG5cblx0XHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nLmNhbGN1bGF0ZWRQb3NpdGlvbi54ICsgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZy5jYWxjdWxhdGVkUG9zaXRpb24ud2lkdGhcblxuXHRcdFx0XHRcdCNJZiBpdCdzIGEgcmVsYXRpb25zaGlwXG5cdFx0XHRcdFx0ZWxzZVxuXG5cdFx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5sZWFkaW5nWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID0gbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ1swXS54XG5cblx0XHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy5sZWFkaW5nWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi54ICsgbGF5ZXIuY29uc3RyYWludHMubGVhZGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ud2lkdGggKyBtLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLmxlYWRpbmdbMV0pXG5cblx0XHRcdCMgT3Bwb3NpbmcgY29uc3RyYWludHMgaGFuZGxlclxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5hdXRvV2lkdGguc3RhcnRYID0gcHJvcHMueFxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50cmFpbGluZyAhPSB1bmRlZmluZWRcblx0XHRcdFx0I0lmIGl0J3MgYSBudW1iZXJcblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcgPT0gcGFyc2VJbnQobGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcsIDEwKVxuXHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5zdXBlckZyYW1lLndpZHRoIC0gbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy50cmFpbGluZykgLSBwcm9wcy53aWR0aFxuXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHQjSWYgaXQncyBhIGxheWVyXG5cdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudHJhaWxpbmcubGVuZ3RoID09IHVuZGVmaW5lZFxuXG5cdFx0XHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50cmFpbGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCA9PSB1bmRlZmluZWRcblxuXHRcdFx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy50cmFpbGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCA9IGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nLnhcblx0XHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy50cmFpbGluZy5jYWxjdWxhdGVkUG9zaXRpb24ueCAtIHByb3BzLndpZHRoXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSByZWxhdGlvbnNoaXBcblx0XHRcdFx0XHRlbHNlXG5cblx0XHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi54ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1swXS5jYWxjdWxhdGVkUG9zaXRpb24ueCA9IGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nWzBdLnhcblxuXHRcdFx0XHRcdFx0cHJvcHMueCA9IGxheWVyLmNvbnN0cmFpbnRzLnRyYWlsaW5nWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi54IC0gbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy50cmFpbGluZ1sxXSkgLSBwcm9wcy53aWR0aFxuXG5cdFx0XHQjIE9wcG9zaW5nIGNvbnN0cmFpbnRzIGhhbmRsZXJcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmF1dG9XaWR0aCAhPSB1bmRlZmluZWRcblx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLmNhbGN1bGF0ZWRQb3NpdGlvblggPSBwcm9wcy54XG5cblx0XHRcdFx0IyNwZXJmb3JtIGF1dG9zaXplXG5cdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy5hdXRvV2lkdGguc3RhcnRYXG5cdFx0XHRcdHByb3BzLndpZHRoID0gbGF5ZXIuY29uc3RyYWludHMuYXV0b1dpZHRoLmNhbGN1bGF0ZWRQb3NpdGlvblggLSBsYXllci5jb25zdHJhaW50cy5hdXRvV2lkdGguc3RhcnRYICsgcHJvcHMud2lkdGhcblxuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wICE9IHVuZGVmaW5lZFxuXHRcdFx0XHQjSWYgaXQncyBhIG51bWJlclxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy50b3AgPT0gcGFyc2VJbnQobGF5ZXIuY29uc3RyYWludHMudG9wLCAxMClcblx0XHRcdFx0XHRwcm9wcy55ID0gbS51dGlscy5weChsYXllci5jb25zdHJhaW50cy50b3ApXG5cblx0XHRcdFx0ZWxzZVxuXG5cdFx0XHRcdFx0I0lmIGl0J3MgYSBsYXllclxuXHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcC5sZW5ndGggPT0gdW5kZWZpbmVkXG5cblx0XHRcdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLnRvcC5jYWxjdWxhdGVkUG9zaXRpb24ueSA9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdFx0bGF5ZXIuY29uc3RyYWludHMudG9wLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID0gbGF5ZXIuY29uc3RyYWludHMudG9wLnlcblxuXHRcdFx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLnRvcC5jYWxjdWxhdGVkUG9zaXRpb24ueSArIGxheWVyLmNvbnN0cmFpbnRzLnRvcC5jYWxjdWxhdGVkUG9zaXRpb24uaGVpZ2h0XG5cblx0XHRcdFx0XHQjSWYgaXQncyBhIHJlbGF0aW9uc2hpcFxuXHRcdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMudG9wWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy50b3BbMF0uY2FsY3VsYXRlZFBvc2l0aW9uLnkgPSBsYXllci5jb25zdHJhaW50cy50b3BbMF0ueVxuXG5cdFx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMudG9wWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55ICsgbGF5ZXIuY29uc3RyYWludHMudG9wWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi5oZWlnaHQgKyBtLnV0aWxzLnB4KGxheWVyLmNvbnN0cmFpbnRzLnRvcFsxXSlcblxuXHRcdFx0IyBPcHBvc2luZyBjb25zdHJhaW50cyBoYW5kbGVyXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0LnN0YXJ0WSA9IHByb3BzLnlcblxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5ib3R0b20gIT0gdW5kZWZpbmVkXG5cdFx0XHRcdCNJZiBpdCdzIGEgbnVtYmVyXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmJvdHRvbSA9PSBwYXJzZUludChsYXllci5jb25zdHJhaW50cy5ib3R0b20sIDEwKVxuXHRcdFx0XHRcdHByb3BzLnkgPSBsYXllci5zdXBlckZyYW1lLmhlaWdodCAtIG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMuYm90dG9tKSAtIHByb3BzLmhlaWdodFxuXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHQjSWYgaXQncyBhIGxheWVyXG5cdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tLmxlbmd0aCA9PSB1bmRlZmluZWRcblxuXHRcdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5ib3R0b20uY2FsY3VsYXRlZFBvc2l0aW9uLnkgPSBsYXllci5jb25zdHJhaW50cy5ib3R0b20ueVxuXG5cdFx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tLmNhbGN1bGF0ZWRQb3NpdGlvbi55IC0gcHJvcHMuaGVpZ2h0XG5cblx0XHRcdFx0XHQjSWYgaXQncyBhIHJlbGF0aW9uc2hpcFxuXHRcdFx0XHRcdGVsc2VcblxuXHRcdFx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYm90dG9tWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55ID09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHRsYXllci5jb25zdHJhaW50cy5ib3R0b21bMF0uY2FsY3VsYXRlZFBvc2l0aW9uLnkgPSBsYXllci5jb25zdHJhaW50cy5ib3R0b21bMF0ueVxuXG5cdFx0XHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuYm90dG9tWzBdLmNhbGN1bGF0ZWRQb3NpdGlvbi55IC0gIG0udXRpbHMucHgobGF5ZXIuY29uc3RyYWludHMuYm90dG9tWzFdKSAtIHByb3BzLmhlaWdodFxuXG5cdFx0XHQjIE9wcG9zaW5nIGNvbnN0cmFpbnRzIGhhbmRsZXJcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdGxheWVyLmNvbnN0cmFpbnRzLmF1dG9IZWlnaHQuY2FsY3VsYXRlZFBvc2l0aW9uWSA9IHByb3BzLnlcblx0XHRcdFx0IyMgcGVyZm9ybSBhdXRvc2l6ZVxuXHRcdFx0XHRwcm9wcy5oZWlnaHQgPSBsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0LmNhbGN1bGF0ZWRQb3NpdGlvblkgLSBsYXllci5jb25zdHJhaW50cy5hdXRvSGVpZ2h0LnN0YXJ0WSArIHByb3BzLmhlaWdodFxuXHRcdFx0XHRwcm9wcy55ID0gbGF5ZXIuY29uc3RyYWludHMuYXV0b0hlaWdodC5zdGFydFlcblxuXG5cdFx0XHQjIEFsaWdubWVudCBjb25zdHJhaW50c1xuXHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYWxpZ24gIT0gdW5kZWZpbmVkXG5cdFx0XHRcdCNTZXQgdGhlIGNlbnRlcmluZyBmcmFtZVxuXHRcdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5hbGlnbiA9PSBcImhvcml6b250YWxcIlxuXHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5zdXBlckZyYW1lLndpZHRoIC8gMiAtIHByb3BzLndpZHRoIC8gMlxuXG5cdFx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmFsaWduID09IFwidmVydGljYWxcIlxuXHRcdFx0XHRcdHByb3BzLnkgPSBsYXllci5zdXBlckZyYW1lLmhlaWdodCAvIDIgLSBwcm9wcy5oZWlnaHQgLyAyXG5cblx0XHRcdFx0aWYgbGF5ZXIuY29uc3RyYWludHMuYWxpZ24gPT0gXCJjZW50ZXJcIlxuXHRcdFx0XHRcdHByb3BzLnggPSBsYXllci5zdXBlckZyYW1lLndpZHRoIC8gMiAtIHByb3BzLndpZHRoIC8gMlxuXHRcdFx0XHRcdHByb3BzLnkgPSBsYXllci5zdXBlckZyYW1lLmhlaWdodCAvIDIgLSBwcm9wcy5oZWlnaHQgLyAyXG5cblxuXHRcdFx0IyBDZW50ZXJpbmcgY29uc3RyYWludHNcblx0XHRcdGlmIGxheWVyLmNvbnN0cmFpbnRzLmhvcml6b250YWxDZW50ZXIgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy5ob3Jpem9udGFsQ2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi54ICsgKGxheWVyLmNvbnN0cmFpbnRzLmhvcml6b250YWxDZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLndpZHRoIC0gcHJvcHMud2lkdGgpIC8gMlxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy52ZXJ0aWNhbENlbnRlciAhPSB1bmRlZmluZWRcblx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLnZlcnRpY2FsQ2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi55ICsgKGxheWVyLmNvbnN0cmFpbnRzLnZlcnRpY2FsQ2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi5oZWlnaHQgLSBwcm9wcy5oZWlnaHQpIC8gMlxuXG5cdFx0XHRpZiBsYXllci5jb25zdHJhaW50cy5jZW50ZXIgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdHByb3BzLnggPSBsYXllci5jb25zdHJhaW50cy5jZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLnggKyAobGF5ZXIuY29uc3RyYWludHMuY2VudGVyLmNhbGN1bGF0ZWRQb3NpdGlvbi53aWR0aCAtIHByb3BzLndpZHRoKSAvIDJcblx0XHRcdFx0cHJvcHMueSA9IGxheWVyLmNvbnN0cmFpbnRzLmNlbnRlci5jYWxjdWxhdGVkUG9zaXRpb24ueSArIChsYXllci5jb25zdHJhaW50cy5jZW50ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLmhlaWdodCAtIHByb3BzLmhlaWdodCkgLyAyXG5cblx0XHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbiA9IHByb3BzXG5cdFx0ZWxzZVxuXHRcdFx0bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uID0gbGF5ZXIucHJvcHNcblxuXHRcdGJsdWVwcmludC5wdXNoIGxheWVyXG5cblxuXHRyZXR1cm4gYmx1ZXByaW50XG5cbmV4cG9ydHMuc2V0ID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IHt9XG5cdHByb3BzID0ge31cblx0aWYgYXJyYXlcblx0XHRmb3IgaSBpbiBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzLmFuaW1hdGlvbnMpXG5cdFx0XHRpZiBhcnJheVtpXVxuXHRcdFx0XHRzZXR1cFtpXSA9IGFycmF5W2ldXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHNldHVwW2ldID0gZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zW2ldXG5cblx0Ymx1ZXByaW50ID0gbGF5b3V0KGFycmF5KVxuXG5cdGZvciBsYXllciwgaW5kZXggaW4gYmx1ZXByaW50XG5cdFx0Zm9yIGtleSBpbiBPYmplY3Qua2V5cyhsYXllci5jYWxjdWxhdGVkUG9zaXRpb24pXG5cdFx0XHRsYXllcltrZXldID0gbGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uW2tleV1cblxuZXhwb3J0cy5hbmltYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IHt9XG5cdHByb3BzID0ge31cblx0aWYgYXJyYXlcblx0XHRmb3IgaSBpbiBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzLmFuaW1hdGlvbnMpXG5cdFx0XHRpZiBhcnJheVtpXVxuXHRcdFx0XHRzZXR1cFtpXSA9IGFycmF5W2ldXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHNldHVwW2ldID0gZXhwb3J0cy5kZWZhdWx0cy5hbmltYXRpb25zW2ldXG5cblx0Ymx1ZXByaW50ID0gbGF5b3V0KGFycmF5KVxuXG5cdGZvciBsYXllciwgaW5kZXggaW4gYmx1ZXByaW50XG5cdFx0I1RpbWluZ1xuXHRcdGRlbGF5ID0gc2V0dXAuZGVsYXlcblx0XHRpZiBzZXR1cC5zdGFnZ2VyXG5cdFx0XHRzdGFnID0gc2V0dXAuc3RhZ2dlclxuXHRcdFx0ZGVsYXkgPSAoKGluZGV4KSAqIHN0YWcpICsgZGVsYXlcblxuXHRcdGlmIHNldHVwLmZhZGVPdXRcblx0XHRcdGlmIGxheWVyID09IHNldHVwLmZhZGVPdXRcblx0XHRcdFx0bGF5ZXIuY2FsY3VsYXRlZFBvc2l0aW9uLm9wYWNpdHkgPSAwXG5cblx0XHRpZiBzZXR1cC5mYWRlSW5cblx0XHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbi5vcGFjaXR5ID0gMVxuXG5cdFx0bGF5ZXIuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczpsYXllci5jYWxjdWxhdGVkUG9zaXRpb25cblx0XHRcdHRpbWU6c2V0dXAudGltZVxuXHRcdFx0ZGVsYXk6ZGVsYXlcblx0XHRcdGN1cnZlOnNldHVwLmN1cnZlXG5cdFx0XHRyZXBlYXQ6c2V0dXAucmVwZWF0XG5cdFx0XHRjb2xvck1vZGVsOnNldHVwLmNvbG9yTW9kZWxcblx0XHRcdGN1cnZlT3B0aW9uczpzZXR1cC5jdXJ2ZU9wdGlvbnNcblxuXHRcdGxheWVyLmNhbGN1bGF0ZWRQb3NpdGlvbiA9IHByb3BzXG4iLCJtID0gcmVxdWlyZSBcIm1hdGVyaWFsLWtpdFwiXG5cbiMgQnVpbGQgTGlicmFyeSAgUHJvcGVydGllc1xubGF5ZXIgPSBuZXcgTGF5ZXJcbmV4cG9ydHMubGF5ZXJQcm9wcyA9IE9iamVjdC5rZXlzKGxheWVyLnByb3BzKVxuZXhwb3J0cy5sYXllclByb3BzLnB1c2ggXCJzdXBlckxheWVyXCJcbmV4cG9ydHMubGF5ZXJQcm9wcy5wdXNoIFwiY29uc3RyYWludHNcIlxuZXhwb3J0cy5sYXllclN0eWxlcyA9IE9iamVjdC5rZXlzKGxheWVyLnN0eWxlKVxubGF5ZXIuZGVzdHJveSgpXG5cbmV4cG9ydHMuYXNzZXRzID0ge1xuXHRob21lOlwiPHN2ZyB3aWR0aD0nMTZweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScxNzIgMTYgMTYgMTYnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0ICAgIDxkZWZzPlxuXHRcdCAgICAgICAgPGVsbGlwc2UgaWQ9J3BhdGgtMScgY3g9JzE4MCcgY3k9JzI0JyByeD0nOCcgcnk9JzgnPjwvZWxsaXBzZT5cblx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTInIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nMTYnIGhlaWdodD0nMTYnIGZpbGw9J3doaXRlJz5cblx0XHQgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHRcdCAgICAgICAgPC9tYXNrPlxuXHRcdCAgICA8L2RlZnM+XG5cdFx0ICAgIDx1c2UgaWQ9J2hvbWUnIHN0cm9rZT0nI0ZGRkZGRicgbWFzaz0ndXJsKCNtYXNrLTIpJyBzdHJva2Utd2lkdGg9JzQnIGZpbGw9J25vbmUnIHhsaW5rOmhyZWY9JyNwYXRoLTEnPjwvdXNlPlxuXHRcdDwvc3ZnPlwiXG5cdGJhY2s6XCI8c3ZnIHdpZHRoPScxNnB4JyBoZWlnaHQ9JzE5cHgnIHZpZXdCb3g9JzMwMSAxNCAxNiAxOScgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cbiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNy4yICgyODI3NikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG4gICAgPGRlZnM+PC9kZWZzPlxuICAgIDxwYXRoIGQ9J00zMDcuMDI5MzgzLDE3Ljc2NzE3MzMgQzMwNy41ODAwMjcsMTYuODAzNTQ1MyAzMDguNTEwMjkyLDE2Ljc3NTA3MTMgMzA5LjExMjAyMywxNy43MTEwOTc2IEwzMTUuOTQwODAyLDI4LjMzMzY0MzUgQzMxNi41NDAzNjgsMjkuMjY2MzAxNyAzMTYuMTM2MzU0LDMwLjAyMjM3MDYgMzE1LjAyNjMwNiwzMC4wMjIzNzA2IEwzMDIuMDI2NTE5LDMwLjAyMjM3MDYgQzMwMC45MjE4OTEsMzAuMDIyMzcwNiAzMDAuNDY3OTIzLDI5LjI0OTcyOCAzMDEuMDIzNDQzLDI4LjI3NzU2NzkgTDMwNy4wMjkzODMsMTcuNzY3MTczMyBaJyBpZD0nVHJpYW5nbGUtMScgc3Ryb2tlPScjRkZGRkZGJyBzdHJva2Utd2lkdGg9JzInIGZpbGw9J25vbmUnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMwOC41MDIwMjEsIDIzLjUyNDM5MSkgcm90YXRlKC05MC4wMDAwMDApIHRyYW5zbGF0ZSgtMzA4LjUwMjAyMSwgLTIzLjUyNDM5MSkgJz48L3BhdGg+XG5cdFx0PC9zdmc+XCJcblx0Y2VsbHVsYXI6XCI8c3ZnIHdpZHRoPScxNnB4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzM1IDQgMTYgMTYnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG4gICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuICAgIDxkZWZzPjwvZGVmcz5cbiAgICA8ZyBpZD0nY2VsbHVsYXInIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDM1LjAwMDAwMCwgNC4wMDAwMDApJz5cbiAgICAgICAgPHBvbHlnb24gaWQ9J2JvdW5kcycgcG9pbnRzPScwIDAgMTYgMCAxNiAxNiAwIDE2Jz48L3BvbHlnb24+XG4gICAgICAgIDxwb2x5Z29uIGlkPSdTaGFwZScgZmlsbD0nIzAwMDAwMCcgcG9pbnRzPScwIDE1IDE0IDE1IDE0IDEnPjwvcG9seWdvbj5cbiAgICA8L2c+XG5cdFx0PC9zdmc+XCJcblx0YmF0dGVyeUhpZ2ggOiBcIjxzdmcgd2lkdGg9JzlweCcgaGVpZ2h0PScxNHB4JyB2aWV3Qm94PSczIDEgOSAxNCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHQgICAgPGRlZnM+PC9kZWZzPlxuXHQgICAgPHBvbHlnb24gaWQ9J1NoYXBlJyBzdHJva2U9J25vbmUnIGZpbGw9JyMwMDAwMDAnIGZpbGwtcnVsZT0nZXZlbm9kZCcgcG9pbnRzPSc5IDEuODc1IDkgMSA2IDEgNiAxLjg3NSAzIDEuODc1IDMgMTUgMTIgMTUgMTIgMS44NzUnPjwvcG9seWdvbj5cblx0PC9zdmc+XCJcblx0YmFubmVyQkcgOiB7XG5cdFx0XCJpcGhvbmUtNVwiOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMzIwcHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDMyMCA2OCcgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHQgICAgPHRpdGxlPmlwaG9uZTU8L3RpdGxlPlxuXHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzAuOSc+XG5cdFx0XHQgICAgICAgIDxnIGlkPSdpUGhvbmUtNS81Uy81QycgZmlsbD0nIzFBMUExQyc+XG5cdFx0XHQgICAgICAgICAgICA8cGF0aCBkPSdNMCwwIEwzMjAsMCBMMzIwLDY4IEwwLDY4IEwwLDAgWiBNMTQyLDYxLjAwNDg4MTUgQzE0Miw1OS44OTc2MTYgMTQyLjg5NjI3OSw1OSAxNDQuMDAyNCw1OSBMMTc2Ljk5NzYsNTkgQzE3OC4xMDM0OTUsNTkgMTc5LDU5Ljg5Mzg5OTggMTc5LDYxLjAwNDg4MTUgTDE3OSw2MS45OTUxMTg1IEMxNzksNjMuMTAyMzg0IDE3OC4xMDM3MjEsNjQgMTc2Ljk5NzYsNjQgTDE0NC4wMDI0LDY0IEMxNDIuODk2NTA1LDY0IDE0Miw2My4xMDYxMDAyIDE0Miw2MS45OTUxMTg1IEwxNDIsNjEuMDA0ODgxNSBaJyBpZD0naXBob25lNSc+PC9wYXRoPlxuXHRcdFx0ICAgICAgICA8L2c+XG5cdFx0XHQgICAgPC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0XHRcImlwaG9uZS02c1wiOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPSczNzVweCcgaGVpZ2h0PSc2OHB4JyB2aWV3Qm94PScwIDAgMzc1IDY4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42ICgyNjMwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdFx0PHRpdGxlPk5vdGlmaWNhdGlvbiBiYWNrZ3JvdW5kPC90aXRsZT5cblx0XHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgZmlsbC1vcGFjaXR5PScwLjknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J2lPUzgtUHVzaC1Ob3RpZmljYXRpb24nIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC01OC4wMDAwMDAsIC0yMy4wMDAwMDApJyBmaWxsPScjMUExQTFDJz5cblx0XHRcdFx0XHRcdFx0PGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNTguMDAwMDAwLCA3LjAwMDAwMCknIGlkPSdOb3RpZmljYXRpb24tY29udGFpbmVyJz5cblx0XHRcdFx0XHRcdFx0XHQ8Zz5cblx0XHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00wLDE2IEwzNzUsMTYgTDM3NSw4NCBMMCw4NCBMMCwxNiBaIE0xNjksNzcuMDA0ODgxNSBDMTY5LDc1Ljg5NzYxNiAxNjkuODk2Mjc5LDc1IDE3MS4wMDI0LDc1IEwyMDMuOTk3Niw3NSBDMjA1LjEwMzQ5NSw3NSAyMDYsNzUuODkzODk5OCAyMDYsNzcuMDA0ODgxNSBMMjA2LDc3Ljk5NTExODUgQzIwNiw3OS4xMDIzODQgMjA1LjEwMzcyMSw4MCAyMDMuOTk3Niw4MCBMMTcxLjAwMjQsODAgQzE2OS44OTY1MDUsODAgMTY5LDc5LjEwNjEwMDIgMTY5LDc3Ljk5NTExODUgTDE2OSw3Ny4wMDQ4ODE1IFonIGlkPSdOb3RpZmljYXRpb24tYmFja2dyb3VuZCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRcImlwaG9uZS02cy1wbHVzXCIgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPSc0MTRweCcgaGVpZ2h0PSc2OHB4JyB2aWV3Qm94PScwIDAgNDE0IDY4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNiAoMjYzMDQpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+Tm90aWZpY2F0aW9uIGJhY2tncm91bmQgQ29weTwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGZpbGwtb3BhY2l0eT0nMC45Jz5cblx0XHRcdFx0XHQ8ZyBpZD0naU9TOC1QdXNoLU5vdGlmaWNhdGlvbicgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTQzLjAwMDAwMCwgLTc0LjAwMDAwMCknIGZpbGw9JyMxQTFBMUMnPlxuXHRcdFx0XHRcdFx0PGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNDMuMDAwMDAwLCA3NC4wMDAwMDApJyBpZD0nTm90aWZpY2F0aW9uLWNvbnRhaW5lcic+XG5cdFx0XHRcdFx0XHRcdDxnPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00wLDAgTDQxNCwwIEw0MTQsNjggTDAsNjggTDAsMCBaIE0xODksNjEuMDA0ODgxNSBDMTg5LDU5Ljg5NzYxNiAxODkuODk2Mjc5LDU5IDE5MS4wMDI0LDU5IEwyMjMuOTk3Niw1OSBDMjI1LjEwMzQ5NSw1OSAyMjYsNTkuODkzODk5OCAyMjYsNjEuMDA0ODgxNSBMMjI2LDYxLjk5NTExODUgQzIyNiw2My4xMDIzODQgMjI1LjEwMzcyMSw2NCAyMjMuOTk3Niw2NCBMMTkxLjAwMjQsNjQgQzE4OS44OTY1MDUsNjQgMTg5LDYzLjEwNjEwMDIgMTg5LDYxLjk5NTExODUgTDE4OSw2MS4wMDQ4ODE1IFonIGlkPSdOb3RpZmljYXRpb24tYmFja2dyb3VuZC1Db3B5Jz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGFkXCIgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPSc3NjhweCcgaGVpZ2h0PSc2OHB4JyB2aWV3Qm94PScwIDAgNzY4IDY4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjYuMSAoMjYzMTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQgICAgPHRpdGxlPmlwYWQtcG9ydHJhaXQ8L3RpdGxlPlxuXHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdCAgICA8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzAuOSc+XG5cdFx0XHRcdCAgICAgICAgPGcgaWQ9J2lQYWQtUG9ydHJhaXQnIGZpbGw9JyMxQTFBMUMnPlxuXHRcdFx0XHQgICAgICAgICAgICA8cGF0aCBkPSdNMCwwIEw3NjgsMCBMNzY4LDY4IEwwLDY4IEwwLDAgWiBNMzY2LDYxLjAwNDg4MTUgQzM2Niw1OS44OTc2MTYgMzY2Ljg5NjI3OSw1OSAzNjguMDAyNCw1OSBMNDAwLjk5NzYsNTkgQzQwMi4xMDM0OTUsNTkgNDAzLDU5Ljg5Mzg5OTggNDAzLDYxLjAwNDg4MTUgTDQwMyw2MS45OTUxMTg1IEM0MDMsNjMuMTAyMzg0IDQwMi4xMDM3MjEsNjQgNDAwLjk5NzYsNjQgTDM2OC4wMDI0LDY0IEMzNjYuODk2NTA1LDY0IDM2Niw2My4xMDYxMDAyIDM2Niw2MS45OTUxMTg1IEwzNjYsNjEuMDA0ODgxNSBaJyBpZD0naXBhZC1wb3J0cmFpdCc+PC9wYXRoPlxuXHRcdFx0XHQgICAgICAgIDwvZz5cblx0XHRcdFx0ICAgIDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRcImlwYWQtcHJvXCIgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0XHQ8c3ZnIHdpZHRoPScxMDI0cHgnIGhlaWdodD0nNjhweCcgdmlld0JveD0nMCAwIDEwMjQgNjgnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0XHRcdCAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNi4xICgyNjMxMykgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdCAgICA8dGl0bGU+aXBhZC1wcm8tcG9ydHJhaXQ8L3RpdGxlPlxuXHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdCAgICA8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBmaWxsLW9wYWNpdHk9JzAuOSc+XG5cdFx0XHRcdCAgICAgICAgPGcgaWQ9J2lQYWQtUHJvLVBvcnRyYWl0JyBmaWxsPScjMUExQTFDJz5cblx0XHRcdFx0ICAgICAgICAgICAgPHBhdGggZD0nTTAsMCBMMTAyNCwwIEwxMDI0LDY4IEwwLDY4IEwwLDAgWiBNNDk0LDYxLjAwNDg4MTUgQzQ5NCw1OS44OTc2MTYgNDk0Ljg5NjI3OSw1OSA0OTYuMDAyNCw1OSBMNTI4Ljk5NzYsNTkgQzUzMC4xMDM0OTUsNTkgNTMxLDU5Ljg5Mzg5OTggNTMxLDYxLjAwNDg4MTUgTDUzMSw2MS45OTUxMTg1IEM1MzEsNjMuMTAyMzg0IDUzMC4xMDM3MjEsNjQgNTI4Ljk5NzYsNjQgTDQ5Ni4wMDI0LDY0IEM0OTQuODk2NTA1LDY0IDQ5NCw2My4xMDYxMDAyIDQ5NCw2MS45OTUxMTg1IEw0OTQsNjEuMDA0ODgxNSBaJyBpZD0naXBhZC1wcm8tcG9ydHJhaXQnPjwvcGF0aD5cblx0XHRcdFx0ICAgICAgICA8L2c+XG5cdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdH1cblx0d2lmaTpcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuPHN2ZyB3aWR0aD0nMThweCcgaGVpZ2h0PScxNHB4JyB2aWV3Qm94PScwIDAgMTggMTQnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG4gICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuICAgIDx0aXRsZT5TaGFwZTwvdGl0bGU+XG4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG4gICAgPGRlZnM+PC9kZWZzPlxuICAgIDxnIGlkPSdNYXRlcmlhbC1EZXNpZ24tU3ltYm9scycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCc+XG4gICAgICAgIDxnIGlkPSdNYXRlcmlhbC9BbmRyb2lkL1N0YXR1cy1iYXItY29udGVudC1saWdodCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTE1LjAwMDAwMCwgLTUuMDAwMDAwKScgZmlsbD0nIzAwMDAwMCc+XG4gICAgICAgICAgICA8ZyBpZD0nd2lmaScgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTQuMDAwMDAwLCA0LjAwMDAwMCknPlxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9J00xOS4wMjI2Mjc5LDQuMDE1OTMxMjMgQzE2LjUxMTc4MDksMi4xMjI1NjM4MiAxMy4zODY5ODQ5LDEgMTAsMSBDNi42MTMwMTUxMywxIDMuNDg4MjE5MDgsMi4xMjI1NjM4MiAwLjk3NzM3MjA4NSw0LjAxNTkzMTIzIEwxMCwxNSBMMTkuMDIyNjI3OSw0LjAxNTkzMTIzIFonIGlkPSdTaGFwZSc+PC9wYXRoPlxuICAgICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgPC9nPlxuPC9zdmc+XCJcblx0c2lnbmFsSGlnaDogXCJcbjxzdmcgd2lkdGg9JzE0cHgnIGhlaWdodD0nMTRweCcgdmlld0JveD0nMCAxIDE0IDE0JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cbiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cbiAgICA8ZGVmcz48L2RlZnM+XG4gICAgPHBvbHlnb24gaWQ9J1NoYXBlJyBzdHJva2U9J25vbmUnIGZpbGw9JyNGRkZGRkYnIGZpbGwtcnVsZT0nZXZlbm9kZCcgcG9pbnRzPScwIDE1IDE0IDE1IDE0IDEnPjwvcG9seWdvbj5cbjwvc3ZnPlwiXG5cdGFjdGl2aXR5OiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTZweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTYgMTYnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5Tb2NjZXIgQmFsbDwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz5cblx0XHRcdFx0XHQ8Y2lyY2xlIGlkPSdwYXRoLTEnIGN4PSc4JyBjeT0nOCcgcj0nOCc+PC9jaXJjbGU+XG5cdFx0XHRcdDwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMTc5LjAwMDAwMCwgLTYzOS4wMDAwMDApJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdTb2NjZXItQmFsbCcgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTc5LjAwMDAwMCwgNjM5LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8bWFzayBpZD0nbWFzay0yJyBza2V0Y2g6bmFtZT0nTWFzaycgZmlsbD0nd2hpdGUnPlxuXHRcdFx0XHRcdFx0XHRcdDx1c2UgeGxpbms6aHJlZj0nI3BhdGgtMSc+PC91c2U+XG5cdFx0XHRcdFx0XHRcdDwvbWFzaz5cblx0XHRcdFx0XHRcdFx0PHVzZSBpZD0nTWFzaycgc3Ryb2tlPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyB4bGluazpocmVmPScjcGF0aC0xJz48L3VzZT5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTYsMTIuMTIwMzA0NiBMMTIuODU3MzM4NCw4IEwxMy4zNzIzNzY1LDguODU3MTY3MyBMNi41MTUwMzgwNywxMi45Nzc0NzE5IEw2LDEyLjEyMDMwNDYgTDYsMTIuMTIwMzA0NiBaJyBpZD0nUmVjdGFuZ2xlLTQ3JyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTExLjg0OTY0OCw4LjcyNjA1NTEgTDE5LjEwMDExMDMsNS4zNDUxMDkwMSBMMTkuNTIyNzI4NSw2LjI1MTQxNjggTDEyLjI3MjI2NjIsOS42MzIzNjI4OSBMMTEuODQ5NjQ4LDguNzI2MDU1MSBMMTEuODQ5NjQ4LDguNzI2MDU1MSBaJyBpZD0nUmVjdGFuZ2xlLTQ3LUNvcHktMycgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J002LDMuMTIwMzA0NiBMMTIuODU3MzM4NCwtMSBMMTMuMzcyMzc2NSwtMC4xNDI4MzI2OTkgTDYuNTE1MDM4MDcsMy45Nzc0NzE5IEw2LDMuMTIwMzA0NiBMNiwzLjEyMDMwNDYgWicgaWQ9J1JlY3RhbmdsZS00Ny1Db3B5LTInIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNLTEsNy4xMjAzMDQ2IEw1Ljg1NzMzODQxLDMgTDYuMzcyMzc2NDgsMy44NTcxNjczIEwtMC40ODQ5NjE5MjUsNy45Nzc0NzE5IEwtMSw3LjEyMDMwNDYgTC0xLDcuMTIwMzA0NiBaJyBpZD0nUmVjdGFuZ2xlLTQ3LUNvcHktNCcgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtNTAnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKScgeD0nNCcgeT0nNicgd2lkdGg9JzEnIGhlaWdodD0nNSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTUxJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknIHg9JzExLjUnIHk9JzMnIHdpZHRoPScxJyBoZWlnaHQ9JzEyJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LDQuODU3MTY3MyBMMTEuODU3MzM4NCw4Ljk3NzQ3MTkgTDEyLjM3MjM3NjUsOC4xMjAzMDQ2IEw1LjUxNTAzODA3LDQgTDUsNC44NTcxNjczJyBpZD0nUmVjdGFuZ2xlLTQ3LUNvcHknIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNSwxMi44NTcxNjczIEwxMS44NTczMzg0LDE2Ljk3NzQ3MTkgTDEyLjM3MjM3NjUsMTYuMTIwMzA0NiBMNS41MTUwMzgwNywxMiBMNSwxMi44NTcxNjczJyBpZD0nUmVjdGFuZ2xlLTQ3LUNvcHktNScgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J00xMS45MDQ4OTcyLDYuMTQ3NjYwNjQgTDEzLjg3MTQyMjcsOC4zMzE3MDg0OSBMMTIuNDAxOTU5NiwxMC44NzY4OTMzIEw5LjUyNzI1NTg5LDEwLjI2NTg1NjIgTDkuMjIwMDU0NDUsNy4zNDMwMjk2NSBMMTEuOTA0ODk3Miw2LjE0NzY2MDY0JyBpZD0nUG9seWdvbi0xJyBmaWxsPScjRDhEOEQ4JyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTExLjkwNDg5NzIsNi4xNDc2NjA2NCBMMTMuODcxNDIyNyw4LjMzMTcwODQ5IEwxMi40MDE5NTk2LDEwLjg3Njg5MzMgTDkuNTI3MjU1ODksMTAuMjY1ODU2MiBMOS4yMjAwNTQ0NSw3LjM0MzAyOTY1IEwxMS45MDQ4OTcyLDYuMTQ3NjYwNjQnIGlkPSdQb2x5Z29uLTEtQ29weScgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J003LjQ1NzcxMTg5LDMuMTk1MDQ3MzkgTDcuMzU1MTQ0ODQsNi4xMzIxODMzMyBMNC41MzAwNjc2LDYuOTQyMjYxMiBMMi44ODY2NDA4OSw0LjUwNTc4MDkgTDQuNjk2MDI0NTcsMi4xODk4NzU0MSBMNy40NTc3MTE4OSwzLjE5NTA0NzM5JyBpZD0nUG9seWdvbi0xLUNvcHktMicgZmlsbD0nIzRBNTM2MScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCcgbWFzaz0ndXJsKCNtYXNrLTIpJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J003LjQ1NzcxMTg5LDExLjE5NTA0NzQgTDcuMzU1MTQ0ODQsMTQuMTMyMTgzMyBMNC41MzAwNjc2LDE0Ljk0MjI2MTIgTDIuODg2NjQwODksMTIuNTA1NzgwOSBMNC42OTYwMjQ1NywxMC4xODk4NzU0IEw3LjQ1NzcxMTg5LDExLjE5NTA0NzQnIGlkPSdQb2x5Z29uLTEtQ29weS0zJyBmaWxsPScjNEE1MzYxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyBtYXNrPSd1cmwoI21hc2stMiknPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTE0LjU0MzE3MDEsMC4wNzI1OTM5MzE0IEwxNC40NDA2MDMxLDMuMDA5NzI5ODggTDExLjYxNTUyNTgsMy44MTk4MDc3NCBMOS45NzIwOTkxMiwxLjM4MzMyNzQ1IEwxMS43ODE0ODI4LC0wLjkzMjU3ODA1IEwxNC41NDMxNzAxLDAuMDcyNTkzOTMxNCcgaWQ9J1BvbHlnb24tMS1Db3B5LTQnIGZpbGw9JyM0QTUzNjEnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnIG1hc2s9J3VybCgjbWFzay0yKSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0YW5pbWFsczogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzE3cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDE3IDE3JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+R3JvdXA8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYnIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xMTcuMDAwMDAwLCAtNjM5LjAwMDAwMCknIHN0cm9rZT0nIzRBNTM2MSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0naWNfRm9vZCcgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTE4LjAwMDAwMCwgNjQwLjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nR3JvdXAnIHNrZXRjaDp0eXBlPSdNU1NoYXBlR3JvdXAnPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LjY4Mzc3NTM3LDEuMzgxNTY2NDYgQzYuMjM5MjYwNjYsMS4xMzYyNCA2Ljg1MzcyMDA1LDEgNy41LDEgQzguMTQ2Mjc5OTUsMSA4Ljc2MDczOTM0LDEuMTM2MjQgOS4zMTYyMjQ2MywxLjM4MTU2NjQ2IEM5LjgwODc5Mjc1LDAuNTYyMzU5MDE5IDEwLjgyNTU4ODgsMCAxMiwwIEMxMy42NTY4NTQyLDAgMTUsMS4xMTkyODgxMyAxNSwyLjUgQzE1LDMuNTU3MTM5OCAxNC4yMTI2MjQ2LDQuNDYxMDI4NDMgMTMuMDk5OTIyNiw0LjgyNjYyNTE0IEMxNC4yNDk2NTI4LDUuNjQxODU0MjIgMTUsNi45ODMzMDA2MiAxNSw4LjUgQzE1LDEwLjcxNjcxNDQgMTMuMzk3MTg3MywxMi41NTkwNzE5IDExLjI4NzI2NzEsMTIuOTMxMzY3MyBDMTAuNDg2NzI0OCwxNC4xNzU3NzAzIDkuMDg5NjE2OTYsMTUgNy41LDE1IEM1LjkxMDM4MzA0LDE1IDQuNTEzMjc1MjQsMTQuMTc1NzcwMyAzLjcxMjczMjkxLDEyLjkzMTM2NzMgQzEuNjAyODEyNjgsMTIuNTU5MDcxOSAwLDEwLjcxNjcxNDQgMCw4LjUgQzAsNi45ODMzMDA2MiAwLjc1MDM0NzI0NCw1LjY0MTg1NDIyIDEuOTAwMDc3NDEsNC44MjY2MjUxNCBDMC43ODczNzU0NDUsNC40NjEwMjg0MyAwLDMuNTU3MTM5OCAwLDIuNSBDMCwxLjExOTI4ODEzIDEuMzQzMTQ1NzUsMCAzLDAgQzQuMTc0NDExMjIsMCA1LjE5MTIwNzI1LDAuNTYyMzU5MDE5IDUuNjgzNzc1MzcsMS4zODE1NjY0NiBaJyBpZD0nT3ZhbC04Jz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUuNzM4MzQyMjgsMTIgQzUuODYyOTA5NzksMTIgNi4xNDY0MjM1MywxMiA2LjE0NjQyMzUzLDEyIEM2LjE0NjQyMzUzLDEyIDYuNDMyMTU2OTYsMTIuNDQyNjEyMyA2LjUyNDY1ODIsMTIuNDkxOTczOSBDNi42NjQ1NTYwMSwxMi41NjY2Mjc3IDcsMTIuNDkxOTczOSA3LDEyLjQ5MTk3MzkgTDcsMTIgTDgsMTIgTDgsMTIuNDkxOTczOSBMOC40OTc5OTIyOCwxMi40OTE5NzM5IEw4Ljg0MzAxNzY5LDEyIEw5LjM5MTg0NTcsMTIgQzkuMzkxODQ1NywxMiA4Ljk5NTk4NDU3LDEyLjk4Mzk0NzggOC40OTc5OTIyOCwxMi45ODM5NDc4IEw2LjYwNzAyNDA3LDEyLjk4Mzk0NzggQzYuMjE0MDQ4MTMsMTIuOTgzOTQ3OCA1LjQ1OTk2MDk0LDEyIDUuNzM4MzQyMjgsMTIgWicgaWQ9J1JlY3RhbmdsZS00NC1Db3B5LTInPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8Y2lyY2xlIGlkPSdPdmFsLTE0JyBjeD0nMTAuNScgY3k9JzcuNScgcj0nMC41Jz48L2NpcmNsZT5cblx0XHRcdFx0XHRcdFx0XHQ8Y2lyY2xlIGlkPSdPdmFsLTE0LUNvcHknIGN4PSc0LjUnIGN5PSc3LjUnIHI9JzAuNSc+PC9jaXJjbGU+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTEyLjY5OTk5NjksNSBDMTIuNjk5OTk2OSwzLjA2NzAwMzM4IDExLjEzMjk5MzYsMS41IDkuMTk5OTk2OTUsMS41JyBpZD0nT3ZhbC0xNic+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J001LjUsNSBDNS41LDMuMDY3MDAzMzggMy45MzI5OTY2MiwxLjUgMiwxLjUnIGlkPSdPdmFsLTE2LUNvcHknIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMuNzUwMDAwLCAzLjI1MDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtMy43NTAwMDAsIC0zLjI1MDAwMCkgJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS00NC1Db3B5JyB4PSc3JyB5PScxMScgd2lkdGg9JzEnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J002LDEwIEw2LjUsMTAgTDYuNDk5OTk5OTksOS41IEw4LjUwMDAwMDA1LDkuNSBMOC41MDAwMDAwNSwxMCBMOSwxMCBMOSwxMC41IEw4LjUsMTAuNSBMOC41LDExIEw2LjUsMTEgTDYuNSwxMC41IEw2LDEwLjUgTDYsMTAgWicgaWQ9J1BhdGgnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0Y2hldnJvbiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nMTNweCcgaGVpZ2h0PScyMnB4JyB2aWV3Qm94PScwIDAgMTMgMjInIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc+XG5cdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHQgICAgPHRpdGxlPkJhY2sgQ2hldnJvbjwvdGl0bGU+XG5cdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdCAgICA8ZGVmcz48L2RlZnM+XG5cdFx0ICAgIDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPlxuXHRcdCAgICAgICAgPGcgaWQ9J05hdmlnYXRpb24tQmFyL0JhY2snIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC04LjAwMDAwMCwgLTMxLjAwMDAwMCknIGZpbGw9JyMwMDc2RkYnPlxuXHRcdCAgICAgICAgICAgIDxwYXRoIGQ9J004LjUsNDIgTDE5LDMxLjUgTDIxLDMzLjUgTDEyLjUsNDIgTDIxLDUwLjUgTDE5LDUyLjUgTDguNSw0MiBaJyBpZD0nQmFjay1DaGV2cm9uJz48L3BhdGg+XG5cdFx0ICAgICAgICA8L2c+XG5cdFx0ICAgIDwvZz5cblx0XHQ8L3N2Zz5cIlxuXHRlbW9qaSA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0PHN2ZyB3aWR0aD0nMjBweCcgaGVpZ2h0PScyMHB4JyB2aWV3Qm94PScwIDAgMjAgMjAnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0PHRpdGxlPkVtb2ppPC90aXRsZT5cblx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9Mb3dlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTYwLjAwMDAwMCwgLTE4MS4wMDAwMDApJyBmaWxsPScjMDMwMzAzJz5cblx0XHRcdFx0XHQ8ZyBpZD0nQm90dG9tLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDE3MC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdDxwYXRoIGQ9J002Ni43NSwzMC41IEM3Mi4xMzQ3NzYzLDMwLjUgNzYuNSwyNi4xMzQ3NzYzIDc2LjUsMjAuNzUgQzc2LjUsMTUuMzY1MjIzNyA3Mi4xMzQ3NzYzLDExIDY2Ljc1LDExIEM2MS4zNjUyMjM3LDExIDU3LDE1LjM2NTIyMzcgNTcsMjAuNzUgQzU3LDI2LjEzNDc3NjMgNjEuMzY1MjIzNywzMC41IDY2Ljc1LDMwLjUgWiBNNjYuNzUsMjkuNSBDNzEuNTgyNDkxNiwyOS41IDc1LjUsMjUuNTgyNDkxNiA3NS41LDIwLjc1IEM3NS41LDE1LjkxNzUwODQgNzEuNTgyNDkxNiwxMiA2Ni43NSwxMiBDNjEuOTE3NTA4NCwxMiA1OCwxNS45MTc1MDg0IDU4LDIwLjc1IEM1OCwyNS41ODI0OTE2IDYxLjkxNzUwODQsMjkuNSA2Ni43NSwyOS41IFogTTYzLjc1LDE5IEM2NC40NDAzNTU5LDE5IDY1LDE4LjQ0MDM1NTkgNjUsMTcuNzUgQzY1LDE3LjA1OTY0NDEgNjQuNDQwMzU1OSwxNi41IDYzLjc1LDE2LjUgQzYzLjA1OTY0NDEsMTYuNSA2Mi41LDE3LjA1OTY0NDEgNjIuNSwxNy43NSBDNjIuNSwxOC40NDAzNTU5IDYzLjA1OTY0NDEsMTkgNjMuNzUsMTkgWiBNNjkuNzUsMTkgQzcwLjQ0MDM1NTksMTkgNzEsMTguNDQwMzU1OSA3MSwxNy43NSBDNzEsMTcuMDU5NjQ0MSA3MC40NDAzNTU5LDE2LjUgNjkuNzUsMTYuNSBDNjkuMDU5NjQ0MSwxNi41IDY4LjUsMTcuMDU5NjQ0MSA2OC41LDE3Ljc1IEM2OC41LDE4LjQ0MDM1NTkgNjkuMDU5NjQ0MSwxOSA2OS43NSwxOSBaIE01OS44ODc2MzM0LDIyLjE2NDE0NDQgQzU5LjYzOTAzMTYsMjEuMzgzMTM0IDYwLjA2NTkxOCwyMC45Nzg1MTU2IDYwLjg1MzA5NTEsMjEuMjMyOTMwNCBDNjAuODUzMDk1MSwyMS4yMzI5MzA0IDYzLjA5Mzc1MDMsMjIuMjEyNSA2Ni43NTAwMDAxLDIyLjIxMjUgQzcwLjQwNjI0OTksMjIuMjEyNSA3Mi42NDY5MDQ3LDIxLjIzMjkzMDQgNzIuNjQ2OTA0NywyMS4yMzI5MzA0IEM3My40Mjg3MTYyLDIwLjk2NjIxNTMgNzMuODgxMjQ2MywyMS40MDQ0MDk3IDczLjYwNTg0NzcsMjIuMTgwNzQzNyBDNzMuNjA1ODQ3NywyMi4xODA3NDM3IDcyLjYsMjcuNTc1IDY2Ljc1LDI3LjU3NSBDNjAuOSwyNy41NzUgNTkuODg3NjMzNCwyMi4xNjQxNDQ0IDU5Ljg4NzYzMzQsMjIuMTY0MTQ0NCBaIE02Ni43NSwyMy4xODc1IEM2NC4wNjg3NSwyMy4xODc1IDYxLjg1NDQwNTUsMjIuNDczNzgyMSA2MS44NTQ0MDU1LDIyLjQ3Mzc4MjEgQzYxLjMyNzMwMTksMjIuMzI5NDggNjEuMTc4MTIzMywyMi41NzIxNjE1IDYxLjU2Mzk1NTUsMjIuOTU3MDc1IEM2MS41NjM5NTU1LDIyLjk1NzA3NSA2Mi4zNjI1LDI0LjY1IDY2Ljc1LDI0LjY1IEM3MS4xMzc1LDI0LjY1IDcxLjk1MDg1MDMsMjIuOTQzODMwNCA3MS45NTA4NTAzLDIyLjk0MzgzMDQgQzcyLjMwOTM2NTksMjIuNTM5OTI3OCA3Mi4xNjkwNzkzLDIyLjMzNTk4NDQgNzEuNjM1NDI3MywyMi40NzYzNDkgQzcxLjYzNTQyNzMsMjIuNDc2MzQ5IDY5LjQzMTI1LDIzLjE4NzUgNjYuNzUsMjMuMTg3NSBaJyBpZD0nRW1vamknPjwvcGF0aD5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvZz5cblx0XHQ8L3N2Zz5cIlxuXHRkZWxldGU6IHtcblx0XHRvbiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9JzI0cHgnIGhlaWdodD0nMThweCcgdmlld0JveD0nMCAwIDI0IDE4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdFx0PHRpdGxlPkJhY2s8L3RpdGxlPlxuXHRcdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0XHQ8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9VcHBlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTMzOS4wMDAwMDAsIC0xMzAuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdUaGlyZC1Sb3cnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMuMDAwMDAwLCAxMTguMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTM1MS42NDI2NjMsMjAuOTc3NjkwMyBMMzU0LjQ2Njc5NSwxOC4xNTM1NTg1IEMzNTQuNzYwMTA2LDE3Ljg2MDI0NzYgMzU0Ljc2Mzk4MywxNy4zODE0OTYyIDM1NC40NzEwOSwxNy4wODg2MDMgQzM1NC4xNzYxNTUsMTYuNzkzNjY3NyAzNTMuNzAxNCwxNi43OTc2MzI4IDM1My40MDYxMzUsMTcuMDkyODk4MyBMMzUwLjU4MjAwMywxOS45MTcwMzAxIEwzNDcuNzU3ODcxLDE3LjA5Mjg5ODMgQzM0Ny40NjQ1NiwxNi43OTk1ODc0IDM0Ni45ODU4MDksMTYuNzk1NzA5NyAzNDYuNjkyOTE2LDE3LjA4ODYwMyBDMzQ2LjM5Nzk4LDE3LjM4MzUzODIgMzQ2LjQwMTk0NSwxNy44NTgyOTMgMzQ2LjY5NzIxMSwxOC4xNTM1NTg1IEwzNDkuNTIxMzQzLDIwLjk3NzY5MDMgTDM0Ni42OTcyMTEsMjMuODAxODIyIEMzNDYuNDAzOSwyNC4wOTUxMzI5IDM0Ni40MDAwMjIsMjQuNTczODg0MyAzNDYuNjkyOTE2LDI0Ljg2Njc3NzYgQzM0Ni45ODc4NTEsMjUuMTYxNzEyOCAzNDcuNDYyNjA2LDI1LjE1Nzc0NzcgMzQ3Ljc1Nzg3MSwyNC44NjI0ODIyIEwzNTAuNTgyMDAzLDIyLjAzODM1MDQgTDM1My40MDYxMzUsMjQuODYyNDgyMiBDMzUzLjY5OTQ0NSwyNS4xNTU3OTMxIDM1NC4xNzgxOTcsMjUuMTU5NjcwOCAzNTQuNDcxMDksMjQuODY2Nzc3NiBDMzU0Ljc2NjAyNSwyNC41NzE4NDIzIDM1NC43NjIwNiwyNC4wOTcwODc1IDM1NC40NjY3OTUsMjMuODAxODIyIEwzNTEuNjQyNjYzLDIwLjk3NzY5MDMgWiBNMzM3LjA1OTM0NSwyMi4wNTkzNDQ1IEMzMzYuNDc0Mjg1LDIxLjQ3NDI4NDcgMzM2LjQ4MTM1MSwyMC41MTg2NDg5IDMzNy4wNTkzNDUsMTkuOTQwNjU1NSBMMzQzLjc4OTkxNSwxMy4yMTAwODUzIEMzNDQuMTgyMDg0LDEyLjgxNzkxNiAzNDQuOTQ4OTIsMTIuNSAzNDUuNTA3NDg0LDEyLjUgTDM1Ni4wMDIwOTgsMTIuNSBDMzU3LjkzMzkzNiwxMi41IDM1OS41LDE0LjA2ODg0NzcgMzU5LjUsMTYuMDAxNzk4MyBMMzU5LjUsMjUuOTk4MjAxNyBDMzU5LjUsMjcuOTMyMTkxNSAzNTcuOTIzMDg4LDI5LjUgMzU2LjAwMjA5OCwyOS41IEwzNDUuNTA3NDg0LDI5LjUgQzM0NC45NTEwNjYsMjkuNSAzNDQuMTc3MTY5LDI5LjE3NzE2OTMgMzQzLjc4OTkxNSwyOC43ODk5MTQ4IEwzMzcuMDU5MzQ1LDIyLjA1OTM0NDUgWicgaWQ9J0JhY2snPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRvZmYgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzI0cHgnIGhlaWdodD0nMThweCcgdmlld0JveD0nMCAwIDI0IDE4JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdDx0aXRsZT5CYWNrPC90aXRsZT5cblx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdDxnIGlkPSdLZXlib2FyZC9MaWdodC9VcHBlcicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTMzOS4wMDAwMDAsIC0xMzAuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0XHRcdFx0PGcgaWQ9J1RoaXJkLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDExOC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdDxwYXRoIGQ9J00zMzcuMDU5MzQ1LDIyLjA1OTM0NDUgQzMzNi40NzQyODUsMjEuNDc0Mjg0NyAzMzYuNDgxMzUxLDIwLjUxODY0ODkgMzM3LjA1OTM0NSwxOS45NDA2NTU1IEwzNDMuNzg5OTE1LDEzLjIxMDA4NTMgQzM0NC4xODIwODQsMTIuODE3OTE2IDM0NC45NDg5MiwxMi41IDM0NS41MDc0ODQsMTIuNSBMMzU2LjAwMjA5OCwxMi41IEMzNTcuOTMzOTM2LDEyLjUgMzU5LjUsMTQuMDY4ODQ3NyAzNTkuNSwxNi4wMDE3OTgzIEwzNTkuNSwyNS45OTgyMDE3IEMzNTkuNSwyNy45MzIxOTE1IDM1Ny45MjMwODgsMjkuNSAzNTYuMDAyMDk4LDI5LjUgTDM0NS41MDc0ODQsMjkuNSBDMzQ0Ljk1MTA2NiwyOS41IDM0NC4xNzcxNjksMjkuMTc3MTY5MyAzNDMuNzg5OTE1LDI4Ljc4OTkxNDggTDMzNy4wNTkzNDUsMjIuMDU5MzQ0NSBaIE0zNTEuNjQyNjYzLDIwLjk3NzY5MDMgTDM1NC40NjY3OTUsMTguMTUzNTU4NSBDMzU0Ljc2MDEwNiwxNy44NjAyNDc2IDM1NC43NjM5ODMsMTcuMzgxNDk2MiAzNTQuNDcxMDksMTcuMDg4NjAzIEMzNTQuMTc2MTU1LDE2Ljc5MzY2NzcgMzUzLjcwMTQsMTYuNzk3NjMyOCAzNTMuNDA2MTM1LDE3LjA5Mjg5ODMgTDM1MC41ODIwMDMsMTkuOTE3MDMwMSBMMzQ3Ljc1Nzg3MSwxNy4wOTI4OTgzIEMzNDcuNDY0NTYsMTYuNzk5NTg3NCAzNDYuOTg1ODA5LDE2Ljc5NTcwOTcgMzQ2LjY5MjkxNiwxNy4wODg2MDMgQzM0Ni4zOTc5OCwxNy4zODM1MzgyIDM0Ni40MDE5NDUsMTcuODU4MjkzIDM0Ni42OTcyMTEsMTguMTUzNTU4NSBMMzQ5LjUyMTM0MywyMC45Nzc2OTAzIEwzNDYuNjk3MjExLDIzLjgwMTgyMiBDMzQ2LjQwMzksMjQuMDk1MTMyOSAzNDYuNDAwMDIyLDI0LjU3Mzg4NDMgMzQ2LjY5MjkxNiwyNC44NjY3Nzc2IEMzNDYuOTg3ODUxLDI1LjE2MTcxMjggMzQ3LjQ2MjYwNiwyNS4xNTc3NDc3IDM0Ny43NTc4NzEsMjQuODYyNDgyMiBMMzUwLjU4MjAwMywyMi4wMzgzNTA0IEwzNTMuNDA2MTM1LDI0Ljg2MjQ4MjIgQzM1My42OTk0NDUsMjUuMTU1NzkzMSAzNTQuMTc4MTk3LDI1LjE1OTY3MDggMzU0LjQ3MTA5LDI0Ljg2Njc3NzYgQzM1NC43NjYwMjUsMjQuNTcxODQyMyAzNTQuNzYyMDYsMjQuMDk3MDg3NSAzNTQuNDY2Nzk1LDIzLjgwMTgyMiBMMzUxLjY0MjY2MywyMC45Nzc2OTAzIFogTTMzOC43MDk3MiwyMS43MDk3MTk1IEMzMzguMzE3NzUyLDIxLjMxNzc1MjIgMzM4LjMxODk2NSwyMC42ODEwMzQ5IDMzOC43MDk3MiwyMC4yOTAyODA1IEwzNDQuNjQzMjQ1LDE0LjM1Njc1NDcgQzM0NC44NDAyNzYsMTQuMTU5NzI0NSAzNDUuMjI1NjM5LDE0IDM0NS40OTM3NDEsMTQgTDM1NS45OTcyMzksMTQgQzM1Ny4xMDMzMzMsMTQgMzU3Ljk5OTk5OSwxNC44OTcwNjAxIDM1Ny45OTk5OTksMTYuMDA1ODU4NiBMMzU3Ljk5OTk5OSwyNS45OTQxNDEyIEMzNTcuOTk5OTk5LDI3LjEwMTk0NjQgMzU3LjEwNjQ1NywyNy45OTk5OTk5IDM1NS45OTcyMzksMjcuOTk5OTk5OSBMMzQ1LjQ5Mzc0MSwyOCBDMzQ1LjIyMTA1NiwyOCAzNDQuODQwNjQzLDI3Ljg0MDY0MzEgMzQ0LjY0MzI0NiwyNy42NDMyNDUzIEwzMzguNzA5NzIsMjEuNzA5NzE5NSBaJyBpZD0nQmFjayc+PC9wYXRoPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9nPlxuXHRcdDwvc3ZnPlwiXG5cdH1cblx0Zm9vZCA6ICBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTdweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTcgMTcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5Gb29kPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J2lPUy05LUtleWJvYXJkcycgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02LVBvcnRyYWl0LUxpZ2h0LUNvcHknIHNrZXRjaDp0eXBlPSdNU0FydGJvYXJkR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNDguMDAwMDAwLCAtNjM3LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkcycgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDQwOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J0Zvb2QnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDE0OS41MDAwMDAsIDIyOS41MDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNNS41LDE1LjUgTDEsMTUuNSBMMCw1IEw2LjUsNSBMNi4yNjM2MDkzMyw3LjQ4MjEwMjAyJyBpZD0nRHJpbmsnIHN0cm9rZT0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J002LjAxMDc3NTQ1LDEuOTY5MzAwOTggTDYuNTE1NzEzNTIsNS4yMjI3MDUzOSBMNS43MTkwODE4NCw1LjY3OTQ3ODEyIEw1LjAzODkwMDksMS45NjkzMDA5OCBMNC44NTU1NzI0NywxLjk2OTMwMDk4IEw0Ljg1NTU3MjQ3LDAuOTY5MzAwOTggTDguODU1NTcyNDcsMC45NjkzMDA5OCBMOC44NTU1NzI0NywxLjk2OTMwMDk4IEw2LjAxMDc3NTQ1LDEuOTY5MzAwOTggWicgaWQ9J1N0cmF3JyBmaWxsPScjNEE1NDYxJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSg2Ljg1NTU3MiwgMy4zMjQzOTApIHJvdGF0ZSgyNC4wMDAwMDApIHRyYW5zbGF0ZSgtNi44NTU1NzIsIC0zLjMyNDM5MCkgJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J0JvdHRvbS1CdW4nIHN0cm9rZT0nIzRBNTQ2MScgeD0nMycgeT0nMTQnIHdpZHRoPScxMC41JyBoZWlnaHQ9JzEuNScgcng9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMS41LDEyLjUwMjQ0MDggQzEuNSwxMS45NDg4MDggMS45NDkxNjkxNiwxMS41IDIuNDkyNjg3MjMsMTEuNSBMMTQuMDA3MzEyOCwxMS41IEMxNC41NTU1NTg4LDExLjUgMTUsMTEuOTQ2OTQ5OSAxNSwxMi41MDI0NDA4IEwxNSwxMi45OTc1NTkyIEMxNSwxMy41NTExOTIgMTQuNTUwODMwOCwxNCAxNC4wMDczMTI4LDE0IEwyLjQ5MjY4NzIzLDE0IEMxLjk0NDQ0MTIxLDE0IDEuNSwxMy41NTMwNTAxIDEuNSwxMi45OTc1NTkyIEwxLjUsMTIuNTAyNDQwOCBaIE0zLjkzMzAwMDAzLDExLjgzOTI3MjcgQzMuNDE3NzE4MzQsMTEuNjUxODk3NiAzLjQ0NDgzNjk3LDExLjUgMy45OTU1Nzc1LDExLjUgTDEzLjAwNDQyMjUsMTEuNSBDMTMuNTU0MjY0OCwxMS41IDEzLjU4NjYwNjEsMTEuNjUwMzI1MSAxMy4wNjcsMTEuODM5MjcyNyBMOC41LDEzLjUgTDMuOTMzMDAwMDMsMTEuODM5MjcyNyBaJyBpZD0nJnF1b3Q7UGF0dHkmcXVvdDsnIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNMi41LDEwLjUgTDEzLjUsMTAuNSBMMTUsMTEuNSBMMSwxMS41IEwyLjUsMTAuNSBaJyBpZD0nQ2hlZXNlJyBmaWxsPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTguMjUsMTAuNSBDMTEuNDI1NjM3MywxMC41IDE0LDEwLjMyODQyNzEgMTQsOS41IEMxNCw4LjY3MTU3Mjg4IDExLjQyNTYzNzMsOCA4LjI1LDggQzUuMDc0MzYyNjksOCAyLjUsOC42NzE1NzI4OCAyLjUsOS41IEMyLjUsMTAuMzI4NDI3MSA1LjA3NDM2MjY5LDEwLjUgOC4yNSwxMC41IFonIGlkPSdUb3AtQnVuJyBzdHJva2U9JyM0QTU0NjEnIHN0cm9rZS13aWR0aD0nMC43NSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRmbGFnczogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzExcHgnIGhlaWdodD0nMTVweCcgdmlld0JveD0nMCAwIDExIDE1JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+RmxhZzwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdpT1MtOS1LZXlib2FyZHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNi1Qb3J0cmFpdC1MaWdodC1Db3B5JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjc1LjAwMDAwMCwgLTYzOS4wMDAwMDApJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZHMnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCA0MDguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdGbGFnJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyNzUuMDAwMDAwLCAyMzEuNTAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1BvbGUnIGZpbGw9JyM0QTU0NjEnIHg9JzAnIHk9JzAnIHdpZHRoPScxJyBoZWlnaHQ9JzE0Jz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTEsMSBDMSwxIDEuMjUsMiAzLjUsMiBDNS43NSwyIDYsMC43NDk5OTk5OTggOCwwLjc1IEMxMCwwLjc0OTk5OTk5OCAxMCwxLjUgMTAsMS41IEwxMCw3LjUgQzEwLDcuNSAxMCw2LjUgOCw2LjUgQzYsNi41IDQuODA2MjM5MTEsOCAzLjUsOCBDMi4xOTM3NjA4OSw4IDEsNyAxLDcgTDEsMSBaJyBzdHJva2U9JyM0QTU0NjEnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0ZnJlcXVlbnQ6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHQ8c3ZnIHdpZHRoPScxN3B4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9JzAgMCAxNyAxNicgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyB4bWxuczpza2V0Y2g9J2h0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyc+XG5cdFx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0PHRpdGxlPlJlY2VudDwvdGl0bGU+XG5cdFx0XHRcdDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdDxnIGlkPSdpT1MtOS1LZXlib2FyZHMnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHRcdDxnIGlkPSdpUGhvbmUtNi1Qb3J0cmFpdC1MaWdodC1Db3B5JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtNTUuMDAwMDAwLCAtNjM4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0tleWJvYXJkcycgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMC4wMDAwMDAsIDQwOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdFx0PGcgaWQ9J1JlY2VudCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNTUuNTAwMDAwLCAyMzAuMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PGNpcmNsZSBpZD0nQm9keScgc3Ryb2tlPScjNEE1NDYxJyBjeD0nOCcgY3k9JzgnIHI9JzgnPjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J003LjUsNy41IEw3LjUsOC41IEw4LjUsOC41IEw4LjUsMiBMNy41LDIgTDcuNSw3LjUgTDQsNy41IEw0LDguNSBMOC41LDguNSBMOC41LDcuNSBMNy41LDcuNSBaJyBpZD0nSGFuZHMnIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0a2V5Ym9hcmQgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMzIuNXB4JyBoZWlnaHQ9JzIzLjVweCcgdmlld0JveD0nMCAwIDY1IDQ3JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy42LjEgKDI2MzEzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdCAgICA8dGl0bGU+U2hhcGU8L3RpdGxlPlxuXHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0ICAgIDxkZWZzPjwvZGVmcz5cblx0XHRcdCAgICA8ZyBpZD0nUGFnZS0xJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz5cblx0XHRcdCAgICAgICAgPGcgaWQ9J2lQYWQtUG9ydHJhaXQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNDM2LjAwMDAwMCwgLTE5NTYuMDAwMDAwKScgZmlsbD0nIzAwMDAwMCc+XG5cdFx0XHQgICAgICAgICAgICA8ZyBpZD0nS2V5Ym9hcmQtTGlnaHQnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCAxNDIyLjAwMDAwMCknPlxuXHRcdFx0ICAgICAgICAgICAgICAgIDxnIGlkPSdLZXlib2FyZC1kb3duJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgxNDEyLjAwMDAwMCwgNTAwLjAwMDAwMCknPlxuXHRcdFx0ICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSdNODcuMDAxMzMyLDM0IEM4OC4xMDUxNjU5LDM0IDg5LDM0Ljg5OTcxMjcgODksMzUuOTkzMjg3NCBMODksNjEuMDA2NzEyNiBDODksNjIuMTA3NTc0OCA4OC4xMDU4NzU5LDYzIDg3LjAwMTMzMiw2MyBMMjUuOTk4NjY4LDYzIEMyNC44OTQ4MzQxLDYzIDI0LDYyLjEwMDI4NzMgMjQsNjEuMDA2NzEyNiBMMjQsMzUuOTkzMjg3NCBDMjQsMzQuODkyNDI1MiAyNC44OTQxMjQxLDM0IDI1Ljk5ODY2OCwzNCBMODcuMDAxMzMyLDM0IFogTTI2LDM2IEwyNiw2MSBMODcsNjEgTDg3LDM2IEwyNiwzNiBaIE03OSw0MCBMODMsNDAgTDgzLDQ0IEw3OSw0NCBMNzksNDAgWiBNNzIsNDAgTDc2LDQwIEw3Niw0NCBMNzIsNDQgTDcyLDQwIFogTTY1LDQwIEw2OSw0MCBMNjksNDQgTDY1LDQ0IEw2NSw0MCBaIE01OCw0MCBMNjIsNDAgTDYyLDQ0IEw1OCw0NCBMNTgsNDAgWiBNNTEsNDAgTDU1LDQwIEw1NSw0NCBMNTEsNDQgTDUxLDQwIFogTTQ0LDQwIEw0OCw0MCBMNDgsNDQgTDQ0LDQ0IEw0NCw0MCBaIE0zNyw0MCBMNDEsNDAgTDQxLDQ0IEwzNyw0NCBMMzcsNDAgWiBNMzAsNDAgTDM0LDQwIEwzNCw0NCBMMzAsNDQgTDMwLDQwIFogTTc5LDQ3IEw4Myw0NyBMODMsNTEgTDc5LDUxIEw3OSw0NyBaIE03Miw0NyBMNzYsNDcgTDc2LDUxIEw3Miw1MSBMNzIsNDcgWiBNNjUsNDcgTDY5LDQ3IEw2OSw1MSBMNjUsNTEgTDY1LDQ3IFogTTU4LDQ3IEw2Miw0NyBMNjIsNTEgTDU4LDUxIEw1OCw0NyBaIE01MSw0NyBMNTUsNDcgTDU1LDUxIEw1MSw1MSBMNTEsNDcgWiBNNDQsNDcgTDQ4LDQ3IEw0OCw1MSBMNDQsNTEgTDQ0LDQ3IFogTTM3LDQ3IEw0MSw0NyBMNDEsNTEgTDM3LDUxIEwzNyw0NyBaIE0zMCw0NyBMMzQsNDcgTDM0LDUxIEwzMCw1MSBMMzAsNDcgWiBNNzksNTQgTDgzLDU0IEw4Myw1OCBMNzksNTggTDc5LDU0IFogTTcyLDU0IEw3Niw1NCBMNzYsNTggTDcyLDU4IEw3Miw1NCBaIE00NCw1NCBMNjksNTQgTDY5LDU4IEw0NCw1OCBMNDQsNTQgWiBNMzcsNTQgTDQxLDU0IEw0MSw1OCBMMzcsNTggTDM3LDU0IFogTTMwLDU0IEwzNCw1NCBMMzQsNTggTDMwLDU4IEwzMCw1NCBaIE00NC4zMTYzNDk4LDY5Ljk3NzEwNDcgQzQzLjM2ODQyMjUsNzAuNTQyMDM0MiA0My4zMzM4NzIxLDcxLjUwOTY0OTUgNDQuMjM3ODIxNyw3Mi4xMzczOTEyIEw1NS4zNjIxNTM5LDc5Ljg2MjYwODggQzU2LjI2NjcxMTMsODAuNDkwNzcyNiA1Ny43MzM4OTY1LDgwLjQ5MDM1MDUgNTguNjM3ODQ2MSw3OS44NjI2MDg4IEw2OS43NjIxNzgzLDcyLjEzNzM5MTIgQzcwLjY2NjczNTcsNzEuNTA5MjI3NCA3MC42NDgwMTIsNzAuNTIwNTIwNCA2OS43MTE1MTg3LDY5LjkyMzQxNjYgTDY5Ljk4MjU3MzEsNzAuMDk2MjM5NiBDNjkuNTE4MTMzMyw2OS44MDAxMTUgNjguNzc4MjU1Nyw2OS44MTI2NDkzIDY4LjMyNjEzMDcsNzAuMTI2OTMyMyBMNTcuODE1NDk5OSw3Ny40MzMxMjYzIEM1Ny4zNjUxMTE3LDc3Ljc0NjIwMiA1Ni42MjgxNjUsNzcuNzM4MTc4NiA1Ni4xNzYyMTAzLDc3LjQxOTk0MjQgTDQ1LjgzODYxMzcsNzAuMTQwODk3NyBDNDUuMzgzNjQ3Miw2OS44MjA1NDA3IDQ0LjYzNzUwMzksNjkuNzg1NzA4OCA0NC4xNTY2MzkzLDcwLjA3MjI4NjIgTDQ0LjMxNjM0OTgsNjkuOTc3MTA0NyBaJyBpZD0nU2hhcGUnPjwvcGF0aD5cblx0XHRcdCAgICAgICAgICAgICAgICA8L2c+XG5cdFx0XHQgICAgICAgICAgICA8L2c+XG5cdFx0XHQgICAgICAgIDwvZz5cblx0XHRcdCAgICA8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRrZXlQb3BVcDpcblx0XHRcImlwaG9uZS01XCIgOiBcIjxzdmcgd2lkdGg9JzU1cHgnIGhlaWdodD0nOTJweCcgdmlld0JveD0nNTMgMzE2IDU1IDkyJyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdCAgICA8ZGVmcz5cblx0XHRcdFx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xJz5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMS41JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjQgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMScgcmVzdWx0PSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlTWVyZ2U+XG5cdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nU291cmNlR3JhcGhpYyc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0ICAgICAgICAgICAgPC9mZU1lcmdlPlxuXHRcdFx0XHQgICAgICAgIDwvZmlsdGVyPlxuXHRcdFx0XHQgICAgICAgIDxwYXRoIGQ9J00xLjM0MTczMjMxLDQwLjkzOTE3MDEgQzAuNTE3NDY2MTI4LDQwLjIwNTg5IDAsMzkuMTM3NDI1MSAwLDM3Ljk0Nzc2MzUgTDAsNC4wMDM0NTU5OCBDMCwxLjc4OTE3MTM2IDEuNzk1MjgyNDgsMCA0LjAwOTg3NTY2LDAgTDQ0Ljk5MDEyNDMsMCBDNDcuMjEyNTYwOCwwIDQ5LDEuNzkyNDA4MyA0OSw0LjAwMzQ1NTk4IEw0OSwzNy45NDc3NjM1IEM0OSwzOC45MTI0MDUxIDQ4LjY1OTI3OTgsMzkuNzk2MzY1OSA0OC4wOTE2MDQxLDQwLjQ4Njg2NjUgQzQ4LjA0MTQyMzMsNDAuOTAzMjI4OSA0Ny43MTExODg4LDQxLjQwNzQ2NzIgNDcuMDgyNTkwOCw0MS45NTIyNSBDNDcuMDgyNTkwOCw0MS45NTIyNSAzOC41Mjk5MTQ1LDQ5LjA2NDMzNjIgMzguNTI5OTE0NSw1MS4xNTI2NDI0IEMzOC41Mjk5MTQ1LDYxLjY0OTc1NjEgMzguMTc3MDA5OSw4Mi4wMDI1NDA2IDM4LjE3NzAwOTksODIuMDAyNTQwNiBDMzguMTQxMjMwNCw4NC4yMDI0MzU0IDM2LjMyMTAyODQsODYgMzQuMTEyODQ5NSw4NiBMMTUuMzA1OTUzOSw4NiBDMTMuMTA3OTYsODYgMTEuMjc4MTg4NCw4NC4yMTAwNzg5IDExLjI0MTc5MzYsODIuMDAyMDk5MyBDMTEuMjQxNzkzNiw4Mi4wMDIwOTkzIDEwLjg4ODg4ODksNjEuNjQ3MDg1MiAxMC44ODg4ODg5LDUxLjE0ODYzNjEgQzEwLjg4ODg4ODksNDkuMDYxNjY1NCAyLjM0MTQzNjYyLDQyLjIzODY1NSAyLjM0MTQzNjYyLDQyLjIzODY1NSBDMS43NzgyNzMxMSw0MS43NjQxMzY1IDEuNDQ4ODEzNTQsNDEuMzIwNDIzNyAxLjM0MTczMjMxLDQwLjkzOTE3MDEgWicgaWQ9J3BhdGgtMic+PC9wYXRoPlxuXHRcdFx0XHQgICAgICAgIDxtYXNrIGlkPSdtYXNrLTMnIG1hc2tDb250ZW50VW5pdHM9J3VzZXJTcGFjZU9uVXNlJyBtYXNrVW5pdHM9J29iamVjdEJvdW5kaW5nQm94JyB4PScwJyB5PScwJyB3aWR0aD0nNDknIGhlaWdodD0nODYnIGZpbGw9J3doaXRlJz5cblx0XHRcdFx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0ICAgICAgICA8L21hc2s+XG5cdFx0XHRcdCAgICA8L2RlZnM+XG5cdFx0XHRcdCAgICA8ZyBpZD0nUG9wb3ZlcicgZmlsdGVyPSd1cmwoI2ZpbHRlci0xKScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoNTYuMDAwMDAwLCAzMTguMDAwMDAwKSc+XG5cdFx0XHRcdCAgICAgICAgPHVzZSBpZD0nUmVjdGFuZ2xlLTE0JyBzdHJva2U9JyNCMkI0QjknIG1hc2s9J3VybCgjbWFzay0zKScgZmlsbD0nI0ZDRkNGQycgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGhvbmUtNnNcIiA6IFwiPHN2ZyB3aWR0aD0nNjRweCcgaGVpZ2h0PScxMDdweCcgdmlld0JveD0nMjQgMzg3IDY0IDEwNycgdmVyc2lvbj0nMS4xJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHhtbG5zOnhsaW5rPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJz5cblx0XHRcdFx0ICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy43LjIgKDI4Mjc2KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdFx0ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPlxuXHRcdFx0XHQgICAgPGRlZnM+XG5cdFx0XHRcdCAgICAgICAgPGZpbHRlciB4PSctNTAlJyB5PSctNTAlJyB3aWR0aD0nMjAwJScgaGVpZ2h0PScyMDAlJyBmaWx0ZXJVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIGlkPSdmaWx0ZXItMSc+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZU9mZnNldCBkeD0nMCcgZHk9JzEnIGluPSdTb3VyY2VBbHBoYScgcmVzdWx0PSdzaGFkb3dPZmZzZXRPdXRlcjEnPjwvZmVPZmZzZXQ+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzEuNScgaW49J3NoYWRvd09mZnNldE91dGVyMScgcmVzdWx0PSdzaGFkb3dCbHVyT3V0ZXIxJz48L2ZlR2F1c3NpYW5CbHVyPlxuXHRcdFx0XHQgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9JzAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC40IDAnIHR5cGU9J21hdHJpeCcgaW49J3NoYWRvd0JsdXJPdXRlcjEnIHJlc3VsdD0nc2hhZG93TWF0cml4T3V0ZXIxJz48L2ZlQ29sb3JNYXRyaXg+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZU1lcmdlPlxuXHRcdFx0XHQgICAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J1NvdXJjZUdyYXBoaWMnPjwvZmVNZXJnZU5vZGU+XG5cdFx0XHRcdCAgICAgICAgICAgIDwvZmVNZXJnZT5cblx0XHRcdFx0ICAgICAgICA8L2ZpbHRlcj5cblx0XHRcdFx0ICAgICAgICA8cGF0aCBkPSdNMS40ODY0NzY0Niw0OC4zNzc5OTQ3IEMwLjU4MDI2NjQ5LDQ3LjY0NjQyOTYgMCw0Ni41Mjk1ODcgMCw0NS4yNzgxOTQ4IEwwLDMuOTkwMDk3ODcgQzAsMS43ODI1OTEyIDEuNzk1MDk1NzcsMCA0LjAwOTQ1ODYyLDAgTDUzLjk5MDU0MTQsMCBDNTYuMjAwNTc0NiwwIDU4LDEuNzg2NDI3NjcgNTgsMy45OTAwOTc4NyBMNTgsNDUuMjc4MTk0OCBDNTgsNDYuMTgzMzAwNCA1Ny42OTgyMjU4LDQ3LjAxNjk3MzMgNTcuMTg5NTA5Nyw0Ny42ODU2MzI1IEM1Ny4wMzk2ODY1LDQ4LjAyMTI0OTcgNTYuNzM2MDA5OCw0OC4zOTcyODM0IDU2LjI3MTgzNjMsNDguNzk1MDY2MSBDNTYuMjcxODM2Myw0OC43OTUwNjYxIDQ1LjYwNjgzNzYsNTcuNjIyMDY5MyA0NS42MDY4Mzc2LDYwLjA3NDYxNDkgQzQ1LjYwNjgzNzYsNzIuNDAyNjIwNSA0NS4xNzc5NjcsOTYuOTkyMzE2NCA0NS4xNzc5NjcsOTYuOTkyMzE2NCBDNDUuMTQxMzc0OCw5OS4yMTIyMjE0IDQzLjMxOTMwNjUsMTAxIDQxLjEwOTAwMzUsMTAxIEwxNy4zODY3MjMsMTAxIEMxNS4xODEyNzIyLDEwMSAxMy4zNTQ2ODMsOTkuMjA1NTAwOSAxMy4zMTc3NTk1LDk2Ljk5MTg3NDEgQzEzLjMxNzc1OTUsOTYuOTkxODc0MSAxMi44ODg4ODg5LDcyLjM5OTQ4MzggMTIuODg4ODg4OSw2MC4wNjk5MDk5IEMxMi44ODg4ODg5LDU3LjYxODkzMjYgMi4yMjY3MzQzNyw0OS4xNDYyOTM2IDIuMjI2NzM0MzcsNDkuMTQ2MjkzNiBDMS45MDUyNDA4Nyw0OC44Nzg4MzI3IDEuNjU5MTE2NTUsNDguNjIwNzMzIDEuNDg2NDc2NDYsNDguMzc3OTk0NyBaJyBpZD0ncGF0aC0yJz48L3BhdGg+XG5cdFx0XHRcdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMycgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc1OCcgaGVpZ2h0PScxMDEnIGZpbGw9J3doaXRlJz5cblx0XHRcdFx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0ICAgICAgICA8L21hc2s+XG5cdFx0XHRcdCAgICA8L2RlZnM+XG5cdFx0XHRcdCAgICA8ZyBpZD0nUG9wb3ZlcicgZmlsdGVyPSd1cmwoI2ZpbHRlci0xKScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjcuMDAwMDAwLCAzODkuMDAwMDAwKSc+XG5cdFx0XHRcdCAgICAgICAgPHVzZSBpZD0nUmVjdGFuZ2xlLTE0JyBzdHJva2U9JyNCMkI0QjknIG1hc2s9J3VybCgjbWFzay0zKScgZmlsbD0nI0ZDRkNGQycgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdFx0XCJpcGhvbmUtNnMtcGx1c1wiIDogXCI8c3ZnIHdpZHRoPSc3MHB4JyBoZWlnaHQ9JzExOXB4JyB2aWV3Qm94PScyOCA0NTAgNzAgMTE5JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPlxuXHRcdFx0XHQgICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjcuMiAoMjgyNzYpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQgICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdCAgICA8ZGVmcz5cblx0XHRcdFx0ICAgICAgICA8ZmlsdGVyIHg9Jy01MCUnIHk9Jy01MCUnIHdpZHRoPScyMDAlJyBoZWlnaHQ9JzIwMCUnIGZpbHRlclVuaXRzPSdvYmplY3RCb3VuZGluZ0JveCcgaWQ9J2ZpbHRlci0xJz5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PScwJyBkeT0nMScgaW49J1NvdXJjZUFscGhhJyByZXN1bHQ9J3NoYWRvd09mZnNldE91dGVyMSc+PC9mZU9mZnNldD5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0nMS41JyBpbj0nc2hhZG93T2Zmc2V0T3V0ZXIxJyByZXN1bHQ9J3NoYWRvd0JsdXJPdXRlcjEnPjwvZmVHYXVzc2lhbkJsdXI+XG5cdFx0XHRcdCAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0nMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjQgMCcgdHlwZT0nbWF0cml4JyBpbj0nc2hhZG93Qmx1ck91dGVyMScgcmVzdWx0PSdzaGFkb3dNYXRyaXhPdXRlcjEnPjwvZmVDb2xvck1hdHJpeD5cblx0XHRcdFx0ICAgICAgICAgICAgPGZlTWVyZ2U+XG5cdFx0XHRcdCAgICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49J3NoYWRvd01hdHJpeE91dGVyMSc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0ICAgICAgICAgICAgICAgIDxmZU1lcmdlTm9kZSBpbj0nU291cmNlR3JhcGhpYyc+PC9mZU1lcmdlTm9kZT5cblx0XHRcdFx0ICAgICAgICAgICAgPC9mZU1lcmdlPlxuXHRcdFx0XHQgICAgICAgIDwvZmlsdGVyPlxuXHRcdFx0XHQgICAgICAgIDxwYXRoIGQ9J00xLjk1NzI5Mzk1LDU0LjA3MjgzMDQgQzAuNzg1OTExMTMyLDUzLjM3NTc2OTkgMCw1Mi4wOTg3NzYgMCw1MC42Mzg5MDIyIEwwLDMuOTk1MjQ0MTkgQzAsMS43ODY3MTQyOCAxLjc5MjQyMjAyLDAgNC4wMDM0ODY2MywwIEw1OS45OTY1MTM0LDAgQzYyLjIwNDYyMzUsMCA2NCwxLjc4ODczMTc1IDY0LDMuOTk1MjQ0MTkgTDY0LDUwLjYzODkwMjIgQzY0LDUxLjkyMzM2ODYgNjMuMzkzNzExNiw1My4wNjUxNTU2IDYyLjQ1MTM5MSw1My43OTU3NTQgQzYyLjQ0Mjc3NTIsNTMuODAzMjQzMyA2Mi40MzQxMDE5LDUzLjgxMDc0MDQgNjIuNDI1MzcwOSw1My44MTgyNDU0IEM2Mi40MjUzNzA5LDUzLjgxODI0NTQgNTAuMzI0Nzg2Myw2My44OTc3NDAyIDUwLjMyNDc4NjMsNjYuNjE3Mzk0NyBDNTAuMzI0Nzg2Myw4MC4yODgwNTQ0IDQ5Ljg0NDMwNDksMTA4LjAwMjAwNyA0OS44NDQzMDQ5LDEwOC4wMDIwMDcgQzQ5LjgwNzk2NjUsMTEwLjIxMDIzNCA0Ny45ODc0MjMyLDExMiA0NS43Nzg5MDg5LDExMiBMMTguNzY4MDk5NywxMTIgQzE2LjU1MzQzOTcsMTEyIDE0LjczOTQ0NTYsMTEwLjIwOTg0IDE0LjcwMjcwMzcsMTA4LjAwMTU2NiBDMTQuNzAyNzAzNywxMDguMDAxNTY2IDE0LjIyMjIyMjIsODAuMjg0NTc2MSAxNC4yMjIyMjIyLDY2LjYxMjE3NzMgQzE0LjIyMjIyMjIsNjMuODk0MjYxOSAyLjE0MDgxNDIyLDU0LjIzMjEzMzcgMi4xNDA4MTQyMiw1NC4yMzIxMzM3IEMyLjA3NjY0OTEzLDU0LjE3ODYyOTggMi4wMTU0ODExMSw1NC4xMjU1MTM0IDEuOTU3MjkzOTUsNTQuMDcyODMwNCBaJyBpZD0ncGF0aC0yJz48L3BhdGg+XG5cdFx0XHRcdCAgICAgICAgPG1hc2sgaWQ9J21hc2stMycgbWFza0NvbnRlbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIG1hc2tVbml0cz0nb2JqZWN0Qm91bmRpbmdCb3gnIHg9JzAnIHk9JzAnIHdpZHRoPSc2NCcgaGVpZ2h0PScxMTInIGZpbGw9J3doaXRlJz5cblx0XHRcdFx0ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPScjcGF0aC0yJz48L3VzZT5cblx0XHRcdFx0ICAgICAgICA8L21hc2s+XG5cdFx0XHRcdCAgICA8L2RlZnM+XG5cdFx0XHRcdCAgICA8ZyBpZD0nUG9wb3ZlcicgZmlsdGVyPSd1cmwoI2ZpbHRlci0xKScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMzEuMDAwMDAwLCA0NTIuMDAwMDAwKSc+XG5cdFx0XHRcdCAgICAgICAgPHVzZSBpZD0nUmVjdGFuZ2xlLTE0JyBzdHJva2U9JyNCMkI0QjknIG1hc2s9J3VybCgjbWFzay0zKScgZmlsbD0nI0ZDRkNGQycgeGxpbms6aHJlZj0nI3BhdGgtMic+PC91c2U+XG5cdFx0XHRcdCAgICA8L2c+XG5cdFx0XHRcdDwvc3ZnPlwiXG5cdG9iamVjdHMgOlxuXHRcdFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9JzExcHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDExIDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+TGlnaHRidWxiPC90aXRsZT5cblx0XHRcdFx0PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+XG5cdFx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0PGcgaWQ9J2lQaG9uZS02JyBza2V0Y2g6dHlwZT0nTVNBcnRib2FyZEdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjQ0LjAwMDAwMCwgLTYzOS4wMDAwMDApJyBzdHJva2U9JyM0QTUzNjEnPlxuXHRcdFx0XHRcdFx0PGcgaWQ9J0xpZ2h0YnVsYicgc2tldGNoOnR5cGU9J01TTGF5ZXJHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMjQ0LjAwMDAwMCwgNjM5LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8cGF0aCBkPSdNOCwxMC40MDAyOTA0IEM5Ljc4MDgzNzk1LDkuNDg5OTM0OTEgMTEsNy42MzczNDI3MyAxMSw1LjUgQzExLDIuNDYyNDMzODggOC41Mzc1NjYxMiwwIDUuNSwwIEMyLjQ2MjQzMzg4LDAgMCwyLjQ2MjQzMzg4IDAsNS41IEMwLDcuNjM3MzQyNzMgMS4yMTkxNjIwNSw5LjQ4OTkzNDkxIDMsMTAuNDAwMjkwNCBMMywxNC4wMDIwODY5IEMzLDE1LjEwMTczOTQgMy44OTc2MTYwMiwxNiA1LjAwNDg4MTUsMTYgTDUuOTk1MTE4NSwxNiBDNy4xMDYxMDAyLDE2IDgsMTUuMTA1NTAzOCA4LDE0LjAwMjA4NjkgTDgsMTAuNDAwMjkwNCBaJyBpZD0nT3ZhbC0xNycgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTUwJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyB4PSczJyB5PScxMicgd2lkdGg9JzUnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTUxJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJyB4PSc0JyB5PScxMy41JyB3aWR0aD0nMS41JyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUsOC41IEM1LDguNSAzLjQ5OTk5OTk5LDcuNTAwMDAwMDEgNCw3IEM0LjUwMDAwMDAxLDYuNDk5OTk5OTkgNSw3LjY2NjY2NjY3IDUuNSw4IEM1LjUsOCA2LjUsNi41MDAwMDAwMSA3LDcgQzcuNSw3LjQ5OTk5OTk5IDYsOC41IDYsOC41IEw2LDExIEw1LDExIEw1LDguNSBaJyBpZD0nUmVjdGFuZ2xlLTUyJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz48L3BhdGg+XG5cdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L3N2Zz5cIlxuXHRzaGlmdCA6IHtcblx0XHRvbiA6IFwiPD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+XG5cdFx0XHRcdDxzdmcgd2lkdGg9JzIwcHgnIGhlaWdodD0nMThweCcgdmlld0JveD0nMCAwIDIwIDE3JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdFx0PHRpdGxlPlNoaWZ0PC90aXRsZT5cblx0XHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0XHQ8ZGVmcz48L2RlZnM+XG5cdFx0XHRcdFx0PGcgaWQ9J1BhZ2UtMScgc3Ryb2tlPSdub25lJyBzdHJva2Utd2lkdGg9JzEnIGZpbGw9J25vbmUnIGZpbGwtcnVsZT0nZXZlbm9kZCcgc2tldGNoOnR5cGU9J01TUGFnZSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmQvTGlnaHQvVXBwZXInIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNC4wMDAwMDAsIC0xMzAuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSdUaGlyZC1Sb3cnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDMuMDAwMDAwLCAxMTguMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTIxLjcwNTIzODgsMTMuMjA1MjM4OCBDMjEuMzE1NzQ2MiwxMi44MTU3NDYyIDIwLjY4NTc1NTksMTIuODE0MjQ0MSAyMC4yOTQ3NjEyLDEzLjIwNTIzODggTDExLjkxNjA3NjcsMjEuNTgzOTIzMyBDMTEuMTMzOTk5MSwyMi4zNjYwMDA5IDExLjM5ODI2MDYsMjMgMTIuNDk3OTEzMSwyMyBMMTYuNSwyMyBMMTYuNSwyOC4wMDkyMjIgQzE2LjUsMjguNTU2NDEzNiAxNi45NDYzMTE0LDI5IDE3LjQ5NzU0NDYsMjkgTDI0LjUwMjQ1NTQsMjkgQzI1LjA1MzM4NCwyOSAyNS41LDI4LjU0OTAyNDggMjUuNSwyOC4wMDkyMjIgTDI1LjUsMjMgTDI5LjUwMjA4NjksMjMgQzMwLjYwNTUwMzgsMjMgMzAuODY2ODI0LDIyLjM2NjgyNCAzMC4wODM5MjMzLDIxLjU4MzkyMzMgTDIxLjcwNTIzODgsMTMuMjA1MjM4OCBaJyBpZD0nU2hpZnQnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9zdmc+XCJcblx0XHRvZmYgOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdDxzdmcgd2lkdGg9JzIwcHgnIGhlaWdodD0nMThweCcgdmlld0JveD0nMCAwIDIwIDE5JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy41LjIgKDI1MjM1KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT5cblx0XHRcdDx0aXRsZT5TaGlmdDwvdGl0bGU+XG5cdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdDxkZWZzPjwvZGVmcz5cblx0XHRcdDxnIGlkPSdQYWdlLTEnIHN0cm9rZT0nbm9uZScgc3Ryb2tlLXdpZHRoPScxJyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnIHNrZXRjaDp0eXBlPSdNU1BhZ2UnPlxuXHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmQvTGlnaHQvTG93ZXInIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0xNC4wMDAwMDAsIC0xMjkuMDAwMDAwKScgZmlsbD0nIzAzMDMwMyc+XG5cdFx0XHRcdFx0PGcgaWQ9J1RoaXJkLVJvdycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMy4wMDAwMDAsIDExOC4wMDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdDxwYXRoIGQ9J00yMS42NzE5MDA4LDEyLjIzMjU4OTggQzIxLjMwMTAzMiwxMS44Mjc5OTE2IDIwLjY5NDY4OTIsMTEuODMzNDczMSAyMC4zMjg4MTk1LDEyLjIzMjU4OTggTDExLjY5NDcwMjMsMjEuNjUxMjk4MyBDMTAuNzU4NzQ0MSwyMi42NzIzMDggMTEuMTI4NTU0MSwyMy41IDEyLjUwOTc3NTEsMjMuNSBMMTUuOTk5OTk5OSwyMy41MDAwMDAyIEwxNS45OTk5OTk5LDI4LjAwMTQyNDEgQzE1Ljk5OTk5OTksMjguODI5MDY0OCAxNi42NzE2NTU5LDI5LjUwMDAwMDEgMTcuNDk3MTAxLDI5LjUwMDAwMDEgTDI0LjUwMjg5OTIsMjkuNTAwMDAwMSBDMjUuMzI5NzI1MywyOS41MDAwMDAxIDI2LjAwMDAwMDMsMjguODM0OTcwMyAyNi4wMDAwMDAzLDI4LjAwMTQyNDEgTDI2LjAwMDAwMDMsMjMuNTAwMDAwMSBMMjkuNDkwMjI1MSwyMy41MDAwMDAyIEMzMC44NzYzMzU3LDIzLjUwMDAwMDIgMzEuMjQzOTUyMSwyMi42NzUxOTE2IDMwLjMwNTQxNjEsMjEuNjUxMjk4NSBMMjEuNjcxOTAwOCwxMi4yMzI1ODk4IFogTTIxLjM0MTc0OCwxNC4zNjQ1MzE2IEMyMS4xNTMwMDU2LDE0LjE2MzIwNjQgMjAuODQzMzUxNSwxNC4xNjcwOTE0IDIwLjY1ODI1MTQsMTQuMzY0NTMxNiBMMTMuNSwyMS45OTk5OTk4IEwxNy41MDAwMDAxLDIxLjk5OTk5OTkgTDE3LjUwMDAwMDIsMjcuNTA4OTk1NiBDMTcuNTAwMDAwMiwyNy43ODAxNzAzIDE3LjczMjkwMjcsMjguMDAwMDAwOCAxOC4wMDM0MjI5LDI4LjAwMDAwMDggTDIzLjk5NjU3NywyOC4wMDAwMDA4IEMyNC4yNzQ2MDk3LDI4LjAwMDAwMDggMjQuNDk5OTk5NywyNy43NzIxMjAzIDI0LjQ5OTk5OTcsMjcuNTA4OTk1NiBMMjQuNDk5OTk5NywyMS45OTk5OTk5IEwyOC41LDIxLjk5OTk5OTkgTDIxLjM0MTc0OCwxNC4zNjQ1MzE2IFonIGlkPSdTaGlmdCc+PC9wYXRoPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9nPlxuXHRcdDwvc3ZnPlwiXG5cdH1cblx0c21pbGV5czogXCI8P3htbCB2ZXJzaW9uPScxLjAnIGVuY29kaW5nPSdVVEYtOCcgc3RhbmRhbG9uZT0nbm8nPz5cblx0XHRcdDxzdmcgd2lkdGg9JzE3cHgnIGhlaWdodD0nMTZweCcgdmlld0JveD0nMCAwIDE3IDE2JyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHhtbG5zOnNrZXRjaD0naHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zJz5cblx0XHRcdFx0PCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjUuMiAoMjUyMzUpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPlxuXHRcdFx0XHQ8dGl0bGU+OkQ8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0naU9TLTktS2V5Ym9hcmRzJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYtUG9ydHJhaXQtTGlnaHQtQ29weScgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTg2LjAwMDAwMCwgLTYzOC4wMDAwMDApJz5cblx0XHRcdFx0XHRcdDxnIGlkPSdLZXlib2FyZHMnIHNrZXRjaDp0eXBlPSdNU0xheWVyR3JvdXAnIHRyYW5zZm9ybT0ndHJhbnNsYXRlKDAuMDAwMDAwLCA0MDguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdDxnIGlkPSc6RCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoODcuMDAwMDAwLCAyMzAuNTAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PGNpcmNsZSBpZD0nSGVhZCcgc3Ryb2tlPScjNEE1NDYxJyBzdHJva2Utd2lkdGg9JzAuNzg5NDczNjg0JyBjeD0nNy41JyBjeT0nNy41JyByPSc3LjUnPjwvY2lyY2xlPlxuXHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J003LjUsMTMuNTI2MzE1OCBDMTAuMjY4NjkwNywxMy41MjYzMTU4IDEyLjUxMzE1NzksMTAuMzY4NDIxMiAxMi41MTMxNTc5LDkuMTg0MjEwNDUgQzEyLjUxMzE1NzksNy42MDUyNjMxNyAxMS40Mzg5MDk4LDkuMTg0MjEwNDMgNy41LDkuMTg0MjEwNTMgQzMuNTYxMDkwMjMsOS4xODQyMTA2MiAyLjQ4Njg0MjExLDcuNjA1MjYzMTcgMi40ODY4NDIxMSw5LjE4NDIxMDQ1IEMyLjQ4Njg0MjExLDEwLjM2ODQyMSA0LjczMTMwOTM1LDEzLjUyNjMxNTggNy41LDEzLjUyNjMxNTggWiBNNy41LDEwLjk2MDUyNjMgQzguOTMyMzMwODMsMTEuMTU3ODk0NyAxMS43OTY5OTI1LDEwLjM2ODQyMSAxMS43OTY5OTI1LDkuNDQ0MjM1NTIgQzExLjc5Njk5MjUsOC43ODk0NzM2OCAxMC44NzYyMDg0LDkuNTc4OTQ3MjcgNy41LDkuNzc2MzE1NzkgQzQuMTIzNzkxNjIsOS41Nzg5NDc0MyAzLjIwMzAwODcyLDguNzg5NDczNjkgMy4yMDMwMDc1Miw5LjQ0NDIzNTUyIEMzLjIwMzAwNTgyLDEwLjM2ODQyMSA2LjA2NzY2OTE3LDExLjE1Nzg5NDcgNy41LDEwLjk2MDUyNjMgWicgaWQ9J1NtaWxlJyBmaWxsPScjNEE1NDYxJz48L3BhdGg+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTUuMjM2ODQyMTEsNi4zMjM2NTk4IEM1LjY0Mzc4ODc2LDYuMzIzNjU5OCA1Ljk3MzY4NDIxLDUuODgxODM1NTQgNS45NzM2ODQyMSw1LjMzNjgxNzY5IEM1Ljk3MzY4NDIxLDQuNzkxNzk5ODUgNS42NDM3ODg3Niw0LjM0OTk3NTU5IDUuMjM2ODQyMTEsNC4zNDk5NzU1OSBDNC44Mjk4OTU0NSw0LjM0OTk3NTU5IDQuNSw0Ljc5MTc5OTg1IDQuNSw1LjMzNjgxNzY5IEM0LjUsNS44ODE4MzU1NCA0LjgyOTg5NTQ1LDYuMzIzNjU5OCA1LjIzNjg0MjExLDYuMzIzNjU5OCBaIE05LjczNjg0MjExLDYuMzIzNjU5OCBDMTAuMTQzNzg4OCw2LjMyMzY1OTggMTAuNDczNjg0Miw1Ljg4MTgzNTU0IDEwLjQ3MzY4NDIsNS4zMzY4MTc2OSBDMTAuNDczNjg0Miw0Ljc5MTc5OTg1IDEwLjE0Mzc4ODgsNC4zNDk5NzU1OSA5LjczNjg0MjExLDQuMzQ5OTc1NTkgQzkuMzI5ODk1NDUsNC4zNDk5NzU1OSA5LDQuNzkxNzk5ODUgOSw1LjMzNjgxNzY5IEM5LDUuODgxODM1NTQgOS4zMjk4OTU0NSw2LjMyMzY1OTggOS43MzY4NDIxMSw2LjMyMzY1OTggWicgaWQ9J0V5ZXMnIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblxuXHRzeW1ib2xzOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTZweCcgaGVpZ2h0PScxN3B4JyB2aWV3Qm94PScwIDAgMTUgMTcnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5PYmplY3RzICZhbXA7IFN5bWJvbHM8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0naU9TLTktS2V5Ym9hcmRzJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYtUG9ydHJhaXQtTGlnaHQtQ29weScgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTMwNC4wMDAwMDAsIC02MzguMDAwMDAwKScgZmlsbD0nIzRBNTQ2MSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmRzJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgNDA4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nT2JqZWN0cy0mYW1wOy1TeW1ib2xzJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgzMDQuMDAwMDAwLCAyMzAuMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHRcdFx0PGcgaWQ9J1RoaW5nJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgMC41MDAwMDApJyBza2V0Y2g6dHlwZT0nTVNTaGFwZUdyb3VwJz5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdSZWN0YW5nbGUtMTIwOScgeD0nMCcgeT0nMCcgd2lkdGg9JzcnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1JlY3RhbmdsZS0xMjA5JyB4PScwJyB5PScyJyB3aWR0aD0nNycgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nUmVjdGFuZ2xlLTEyMTEnIHg9JzMnIHk9JzMnIHdpZHRoPScxJyBoZWlnaHQ9JzQnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTExLjc1LDAuMTU5MjYzOTc4IEwxMS43NSwwIEwxMSwwIEwxMSw1LjA5MTQ5MyBDMTAuNTkzNDQsNC45NDIyMTM5MiAxMC4wNjM5NjYyLDQuOTY0NTMyMjQgOS41NTcxNTM5OSw1LjE5MDE3OTU3IEM4LjY5ODQ5MjkzLDUuNTcyNDgwMSA4LjIzMDAzODM1LDYuMzkzNjU2MjEgOC41MTA4MzE0MSw3LjAyNDMyNzc0IEM4Ljc5MTYyNDQ3LDcuNjU0OTk5MjggOS43MTUzMzQ1NCw3Ljg1NjM0Mzc1IDEwLjU3Mzk5NTYsNy40NzQwNDMyMSBDMTEuMjc2MTE4Myw3LjE2MTQzODAzIDExLjcxNzMzOTMsNi41NTUzODk3MiAxMS43MDEzNTk1LDYgTDExLjc1LDYgTDExLjc1LDEuMzkzODUwNTYgQzEyLjMxNzU5MDgsMS41OTU5MDAzNyAxMywyLjA4MTc0NTYgMTMsMy4yNSBDMTMsNC4yNSAxMi43NSw1LjUgMTIuNzUsNS41IEMxMi43NSw1LjUgMTMuNzUsNC43NSAxMy43NSwyLjUgQzEzLjc1LDEuMDIyNTYxMDEgMTIuNTY0MjY3NCwwLjQwNzQ3MzAxOSAxMS43NSwwLjE1OTI2Mzk3OCBaJyBpZD0nTm90ZScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdDx0ZXh0IGlkPScmYW1wOycgc2tldGNoOnR5cGU9J01TVGV4dExheWVyJyBmb250LWZhbWlseT0nU0YgVUkgRGlzcGxheScgZm9udC1zaXplPSc5LjUnIGZvbnQtd2VpZ2h0PSdub3JtYWwnPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHRzcGFuIHg9JzAuMjUnIHk9JzE2Jz4mYW1wOzwvdHNwYW4+XG5cdFx0XHRcdFx0XHRcdFx0PC90ZXh0PlxuXHRcdFx0XHRcdFx0XHRcdDx0ZXh0IGlkPSclJyBza2V0Y2g6dHlwZT0nTVNUZXh0TGF5ZXInIGZvbnQtZmFtaWx5PSdTRiBVSSBEaXNwbGF5JyBmb250LXNpemU9JzkuNScgZm9udC13ZWlnaHQ9J25vcm1hbCc+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8dHNwYW4geD0nNy43NScgeT0nMTYnPiU8L3RzcGFuPlxuXHRcdFx0XHRcdFx0XHRcdDwvdGV4dD5cblx0XHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdFx0PC9nPlxuXHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0PC9nPlxuXHRcdFx0PC9zdmc+XCJcblx0dHJhdmVsOiBcIjw/eG1sIHZlcnNpb249JzEuMCcgZW5jb2Rpbmc9J1VURi04JyBzdGFuZGFsb25lPSdubyc/PlxuXHRcdFx0PHN2ZyB3aWR0aD0nMTdweCcgaGVpZ2h0PScxNnB4JyB2aWV3Qm94PScwIDAgMTcgMTYnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgeG1sbnM6c2tldGNoPSdodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMnPlxuXHRcdFx0XHQ8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuNS4yICgyNTIzNSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+XG5cdFx0XHRcdDx0aXRsZT5UcmFuc3BvcnQ8L3RpdGxlPlxuXHRcdFx0XHQ8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz5cblx0XHRcdFx0PGRlZnM+PC9kZWZzPlxuXHRcdFx0XHQ8ZyBpZD0naU9TLTktS2V5Ym9hcmRzJyBzdHJva2U9J25vbmUnIHN0cm9rZS13aWR0aD0nMScgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJyBza2V0Y2g6dHlwZT0nTVNQYWdlJz5cblx0XHRcdFx0XHQ8ZyBpZD0naVBob25lLTYtUG9ydHJhaXQtTGlnaHQtQ29weScgc2tldGNoOnR5cGU9J01TQXJ0Ym9hcmRHcm91cCcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoLTI0MS4wMDAwMDAsIC02MzguMDAwMDAwKSc+XG5cdFx0XHRcdFx0XHQ8ZyBpZD0nS2V5Ym9hcmRzJyBza2V0Y2g6dHlwZT0nTVNMYXllckdyb3VwJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgwLjAwMDAwMCwgNDA4LjAwMDAwMCknPlxuXHRcdFx0XHRcdFx0XHQ8ZyBpZD0nVHJhbnNwb3J0JyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyNDEuNTAwMDAwLCAyMzAuMDAwMDAwKScgc2tldGNoOnR5cGU9J01TU2hhcGVHcm91cCc+XG5cdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTAsNiBMMSw2IEwxLDE1IEwwLDE1IEwwLDYgWiBNMTUsNCBMMTYsNCBMMTYsMTUgTDE1LDE1IEwxNSw0IFogTTMuNSwwIEw0LjUsMCBMNC41LDcgTDMuNSw3IEwzLjUsMCBaIE0xLDYgTDMuNSw2IEwzLjUsNyBMMSw3IEwxLDYgWiBNNC41LDAgTDkuNSwwIEw5LjUsMSBMNC41LDEgTDQuNSwwIFogTTkuNSwwIEwxMC41LDAgTDEwLjUsNiBMOS41LDYgTDkuNSwwIFogTTEwLjUsNCBMMTUsNCBMMTUsNSBMMTAuNSw1IEwxMC41LDQgWicgaWQ9J1NreWxpbmUnIGZpbGw9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8ZyBpZD0nV2luZG93cycgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMi4wMDAwMDAsIDIuMDAwMDAwKScgZmlsbD0nIzRBNTQ2MSc+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nV2luZG93JyB4PScwJyB5PSc2JyB3aWR0aD0nMScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nV2luZG93JyB4PSczLjUnIHk9JzAnIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdXaW5kb3cnIHg9JzUuNScgeT0nMCcgd2lkdGg9JzEnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdFx0PHJlY3QgaWQ9J1dpbmRvdycgeD0nNS41JyB5PScyJyB3aWR0aD0nMScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nV2luZG93JyB4PSczLjUnIHk9JzInIHdpZHRoPScxJyBoZWlnaHQ9JzEnPjwvcmVjdD5cblx0XHRcdFx0XHRcdFx0XHRcdDxyZWN0IGlkPSdXaW5kb3cnIHg9JzExJyB5PSc0JyB3aWR0aD0nMScgaGVpZ2h0PScxJz48L3JlY3Q+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8cmVjdCBpZD0nV2luZG93JyB4PScxMScgeT0nNicgd2lkdGg9JzEnIGhlaWdodD0nMSc+PC9yZWN0PlxuXHRcdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdFx0XHQ8ZyBpZD0nQ2FyJyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgyLjUwMDAwMCwgNi41MDAwMDApJz5cblx0XHRcdFx0XHRcdFx0XHRcdDxwYXRoIGQ9J004LjUsOCBMMi41LDggTDIuNSw5LjUgTDAuNSw5LjUgTDAuNSw3Ljg2ODExNDUgQzAuMjAxMjAyMTkyLDcuNjk1ODI3MDIgMCw3LjM3MDkxMzYzIDAsNi45OTA2MzExIEwwLDUuMDA5MzY4OSBDMCw0LjQ1MTkwOTg1IDAuNDQ0ODM2OTc0LDQgMC45OTU1Nzc0OTksNCBMMTAuMDA0NDIyNSw0IEMxMC41NTQyNjQ4LDQgMTEsNC40NDMzNTMxOCAxMSw1LjAwOTM2ODkgTDExLDYuOTkwNjMxMSBDMTEsNy4zNjUzMzE1IDEwLjc5OTAyNDQsNy42OTIzNDUxOSAxMC41LDcuODY2NDkwMDIgTDEwLjUsOS41IEw4LjUsOS41IEw4LjUsOCBaIE0xLjc1LDYuNSBDMi4xNjQyMTM1Niw2LjUgMi41LDYuMTY0MjEzNTYgMi41LDUuNzUgQzIuNSw1LjMzNTc4NjQ0IDIuMTY0MjEzNTYsNSAxLjc1LDUgQzEuMzM1Nzg2NDQsNSAxLDUuMzM1Nzg2NDQgMSw1Ljc1IEMxLDYuMTY0MjEzNTYgMS4zMzU3ODY0NCw2LjUgMS43NSw2LjUgWiBNOS4yNSw2LjUgQzkuNjY0MjEzNTYsNi41IDEwLDYuMTY0MjEzNTYgMTAsNS43NSBDMTAsNS4zMzU3ODY0NCA5LjY2NDIxMzU2LDUgOS4yNSw1IEM4LjgzNTc4NjQ0LDUgOC41LDUuMzM1Nzg2NDQgOC41LDUuNzUgQzguNSw2LjE2NDIxMzU2IDguODM1Nzg2NDQsNi41IDkuMjUsNi41IFogTTAuNSw3IEwxMC41LDcgTDEwLjUsNy41IEwwLjUsNy41IEwwLjUsNyBaIE0zLDYuNSBMOCw2LjUgTDgsNyBMMyw3IEwzLDYuNSBaJyBpZD0nQm9keScgZmlsbD0nIzRBNTQ2MSc+PC9wYXRoPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHBhdGggZD0nTTEuNSw0LjUgTDEuNSwzIEMxLjUsMS4zNDMxNDU3NSAyLjgzOTAyMDEzLDAgNC41MDE2NjU0NywwIEw2LjQ5ODMzNDUzLDAgQzguMTU2MTA4NTksMCA5LjUsMS4zNDY1MTcxMiA5LjUsMyBMOS41LDUnIGlkPSdSb29mJyBzdHJva2U9JyM0QTU0NjEnPjwvcGF0aD5cblx0XHRcdFx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHRcdDwvZz5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdDwvZz5cblx0XHRcdDwvc3ZnPlwiXG59XG5cblxuZXhwb3J0cy5mcmFtZXJGcmFtZXMgPVxuXHQ2NDA6MlxuXHQ3NTA6MlxuXHQ3Njg6MlxuXHQxMDgwOjNcblx0MTI0MjozXG5cdDE0NDA6NFxuXHQxNTM2OjJcblxuIyBEZXZpY2UgZnJhbWVzXG5leHBvcnRzLnJlYWxEZXZpY2VzID1cblx0MzIwOlxuXHRcdDQ4MDpcblx0XHRcdG5hbWU6XCJpUGhvbmVcIlxuXHRcdFx0d2lkdGg6MzIwXG5cdFx0XHRoZWlnaHQ6NDgwXG5cdFx0XHRzY2FsZToxXG5cdDQ4MDpcblx0XHQ4NTQ6XG5cdFx0XHRuYW1lOlwiQW5kcm9pZCBPbmVcIlxuXHRcdFx0d2lkdGg6NDgwXG5cdFx0XHRoZWlnaHQ6ODU0XG5cdFx0XHRzY2FsZToxLjVcblxuXHQ2NDA6XG5cdFx0OTYwOlxuXHRcdFx0bmFtZTpcImlQaG9uZSA0XCJcblx0XHRcdHdpZHRoOjY0MFxuXHRcdFx0aGVpZ2h0Ojk2MFxuXHRcdFx0c2NhbGU6MlxuXHRcdDExMzY6XG5cdFx0XHRuYW1lOlwiaVBob25lIDVcIlxuXHRcdFx0d2lkdGg6NjQwXG5cdFx0XHRoZWlnaHQ6MTEzNlxuXHRcdFx0c2NhbGU6MlxuXHQ3MjA6XG5cdFx0MTI4MDpcblx0XHRcdG5hbWU6XCJYSERQSVwiXG5cdFx0XHR3aWR0aDo3MjBcblx0XHRcdGhlaWdodDoxMjgwXG5cdFx0XHRzY2FsZToyXG5cdDc1MDpcblx0XHQxMTE4OlxuXHRcdFx0bmFtZTpcImlQaG9uZSA2XCJcblx0XHRcdHdpZHRoOjc1MFxuXHRcdFx0aGVpZ2h0OjExMThcblx0XHRcdHNjYWxlOjJcblx0XHQxMzM0OlxuXHRcdFx0bmFtZTpcImlQaG9uZSA2XCJcblx0XHRcdHdpZHRoOjc1MFxuXHRcdFx0aGVpZ2h0OjEzMzRcblx0XHRcdHNjYWxlOjJcblx0NzY4OlxuXHRcdDEwMjQ6XG5cdFx0XHRuYW1lOlwiaVBhZFwiXG5cdFx0XHR3aWR0aDo3Njhcblx0XHRcdGhlaWdodDoxMDI0XG5cdFx0XHRzY2FsZToxXG5cdFx0MTI4MDpcblx0XHRcdG5hbWU6XCJOZXh1cyA0XCJcblx0XHRcdHdpZHRoOjc2OFxuXHRcdFx0aGVpZ2h0OjEyODBcblx0XHRcdHNjYWxlOjJcblx0ODAwOlxuXHRcdDEyODA6XG5cdFx0XHRuYW1lOlwiTmV4dXMgN1wiXG5cdFx0XHR3aWR0aDo4MDBcblx0XHRcdGhlaWdodDoxMjgwXG5cdFx0XHRzY2FsZToxXG5cdDEwODA6XG5cdFx0MTkyMDpcblx0XHRcdG5hbWU6XCJYWEhEUElcIlxuXHRcdFx0d2lkdGg6MTA4MFxuXHRcdFx0aGVpZ2h0OjE5MjBcblx0XHRcdHNjYWxlOjNcblx0MTIwMDpcblx0XHQxOTIwOlxuXHRcdFx0bmFtZTpcIk5leHVzIDdcIlxuXHRcdFx0d2lkdGg6MTIwMFxuXHRcdFx0aGVpZ2h0OjE5MjBcblx0XHRcdHNjYWxlOjJcblx0MTI0Mjpcblx0XHQyMjA4OlxuXHRcdFx0bmFtZTpcImlQaG9uZSA2IFBsdXNcIlxuXHRcdFx0d2lkdGg6MTI0MlxuXHRcdFx0aGVpZ2h0OjIyMDhcblx0XHRcdHNjYWxlOjNcblx0MTQ0MDpcblx0XHQyNTYwOlxuXHRcdFx0bmFtZTpcIlhYWEhEUElcIlxuXHRcdFx0d2lkdGg6MTQ0MFxuXHRcdFx0aGVpZ2h0OjI1NjBcblx0XHRcdHNjYWxlOjRcblx0MTQ0MTpcblx0XHQyNTYxOlxuXHRcdFx0bmFtZTpcIk5leHVzIDZcIlxuXHRcdFx0d2lkdGg6MTQ0MFxuXHRcdFx0aGVpZ2h0OjI1NjBcblx0XHRcdHNjYWxlOjRcblx0MTUzNjpcblx0XHQyMDQ4OlxuXHRcdFx0bmFtZTpcImlQYWRcIlxuXHRcdFx0d2lkdGg6MTUzNlxuXHRcdFx0aGVpZ2h0OjIwNDhcblx0XHRcdHNjYWxlOjJcblx0MTYwMDpcblx0XHQyMDU2OlxuXHRcdFx0bmFtZTpcIk5leHVzIDEwXCJcblx0XHRcdHdpZHRoOjE2MDBcblx0XHRcdGhlaWdodDoyMDU2XG5cdFx0XHRzY2FsZToyXG5cdDIwNDg6XG5cdFx0MTUzNjpcblx0XHRcdG5hbWU6XCJOZXh1cyA5XCJcblx0XHRcdHdpZHRoOjIwNDhcblx0XHRcdGhlaWdodDoxNTM2XG5cdFx0XHRzY2FsZToyXG5cdFx0MjczMjpcblx0XHRcdG5hbWU6XCJpUGFkIFByb1wiXG5cdFx0XHR3aWR0aDoyMDQ4XG5cdFx0XHRoZWlnaHQ6MjczMlxuXHRcdFx0c2NhbGU6MlxuXHQyNTYwOlxuXHRcdDE2MDA6XG5cdFx0XHRuYW1lOlwiTmV4dXMgMTBcIlxuXHRcdFx0d2lkdGg6MjU2MFxuXHRcdFx0aGVpZ2h0OjE2MDBcblx0XHRcdHNjYWxlOjJcblx0MjczMjpcblx0XHQyMDQ4OlxuXHRcdFx0bmFtZTpcImlQYWQgUHJvXCJcblx0XHRcdHdpZHRoOjI3MzJcblx0XHRcdGhlaWdodDoyMDQ4XG5cdFx0XHRzY2FsZToyXG5cblxuZXhwb3J0cy5jb2xvcnMgPVxuXHRyZWQ6XCIjRjQ0MzM2XCJcblx0cmVkNTA6XCIjRkZFQkVFXCJcblx0cmVkMTAwOlwiI0ZGQ0REMlwiXG5cdHJlZDIwMDpcIiNFRjlBOUFcIlxuXHRyZWQzMDA6XCIjRTU3MzczXCJcblx0cmVkNDAwOlwiI0VGNTM1MFwiXG5cdHJlZDUwMDpcIiNGNDQzMzZcIlxuXHRyZWQ2MDA6XCIjRTUzOTM1XCJcblx0cmVkNzAwOlwiI0QzMkYyRlwiXG5cdHJlZDgwMDpcIiNDNjI4MjhcIlxuXHRyZWQ5MDA6XCIjQjcxQzFDXCJcblx0cmVkQTEwMDpcIiNGRjhBODBcIlxuXHRyZWRBMjAwOlwiI0ZGNTI1MlwiXG5cdHJlZEE0MDA6XCIjRkYxNzQ0XCJcblx0cmVkQTcwMDpcIiNENTAwMDBcIlxuXHRwaW5rOlwiI0U5MUU2M1wiXG5cdHBpbms1MDpcIiNGQ0U0RUNcIlxuXHRwaW5rMTAwOlwiI0Y4QkJEMFwiXG5cdHBpbmsyMDA6XCIjRjQ4RkIxXCJcblx0cGluazMwMDpcIiNGMDYyOTJcIlxuXHRwaW5rNDAwOlwiI0VDNDA3QVwiXG5cdHBpbms1MDA6XCIjRTkxRTYzXCJcblx0cGluazYwMDpcIiNEODFCNjBcIlxuXHRwaW5rNzAwOlwiI0MyMTg1QlwiXG5cdHBpbms4MDA6XCIjQUQxNDU3XCJcblx0cGluazkwMDpcIiM4ODBFNEZcIlxuXHRwaW5rQTEwMDpcIiNGRjgwQUJcIlxuXHRwaW5rQTIwMDpcIiNGRjQwODFcIlxuXHRwaW5rQTQwMDpcIiNGNTAwNTdcIlxuXHRwaW5rQTcwMDpcIiNDNTExNjJcIlxuXHRwdXJwbGU6XCIjOUMyN0IwXCJcblx0cHVycGxlNTA6XCIjRjNFNUY1XCJcblx0cHVycGxlMTAwOlwiI0UxQkVFN1wiXG5cdHB1cnBsZTIwMDpcIiNDRTkzRDhcIlxuXHRwdXJwbGUzMDA6XCIjQkE2OEM4XCJcblx0cHVycGxlNDAwOlwiI0FCNDdCQ1wiXG5cdHB1cnBsZTUwMDpcIiM5QzI3QjBcIlxuXHRwdXJwbGU2MDA6XCIjOEUyNEFBXCJcblx0cHVycGxlNzAwOlwiIzdCMUZBMlwiXG5cdHB1cnBsZTgwMDpcIiM2QTFCOUFcIlxuXHRwdXJwbGU5MDA6XCIjNEExNDhDXCJcblx0cHVycGxlQTEwMDpcIiNFQTgwRkNcIlxuXHRwdXJwbGVBMjAwOlwiI0UwNDBGQlwiXG5cdHB1cnBsZUE0MDA6XCIjRDUwMEY5XCJcblx0cHVycGxlQTcwMDpcIiNBQTAwRkZcIlxuXHRkZWVwUHVycGxlOlwiIzY3M0FCN1wiXG5cdGRlZXBQdXJwbGU1MDpcIiNFREU3RjZcIlxuXHRkZWVwUHVycGxlMTAwOlwiI0QxQzRFOVwiXG5cdGRlZXBQdXJwbGUyMDA6XCIjQjM5RERCXCJcblx0ZGVlcFB1cnBsZTMwMDpcIiM5NTc1Q0RcIlxuXHRkZWVwUHVycGxlNDAwOlwiIzdFNTdDMlwiXG5cdGRlZXBQdXJwbGU1MDA6XCIjNjczQUI3XCJcblx0ZGVlcFB1cnBsZTYwMDpcIiM1RTM1QjFcIlxuXHRkZWVwUHVycGxlNzAwOlwiIzUxMkRBOFwiXG5cdGRlZXBQdXJwbGU4MDA6XCIjNDUyN0EwXCJcblx0ZGVlcFB1cnBsZTkwMDpcIiMzMTFCOTJcIlxuXHRkZWVwUHVycGxlQTEwMDpcIiNCMzg4RkZcIlxuXHRkZWVwUHVycGxlQTIwMDpcIiM3QzRERkZcIlxuXHRkZWVwUHVycGxlQTQwMDpcIiM2NTFGRkZcIlxuXHRkZWVwUHVycGxlQTcwMDpcIiM2MjAwRUFcIlxuXHRpbmRpZ286XCIjM0Y1MUI1XCJcblx0aW5kaWdvNTA6XCIjRThFQUY2XCJcblx0aW5kaWdvMTAwOlwiI0M1Q0FFOVwiXG5cdGluZGlnbzIwMDpcIiM5RkE4REFcIlxuXHRpbmRpZ28zMDA6XCIjNzk4NkNCXCJcblx0aW5kaWdvNDAwOlwiIzVDNkJDMFwiXG5cdGluZGlnbzUwMDpcIiMzRjUxQjVcIlxuXHRpbmRpZ282MDA6XCIjMzk0OUFCXCJcblx0aW5kaWdvNzAwOlwiIzMwM0Y5RlwiXG5cdGluZGlnbzgwMDpcIiMyODM1OTNcIlxuXHRpbmRpZ285MDA6XCIjMUEyMzdFXCJcblx0aW5kaWdvQTEwMDpcIiM4QzlFRkZcIlxuXHRpbmRpZ29BMjAwOlwiIzUzNkRGRVwiXG5cdGluZGlnb0E0MDA6XCIjM0Q1QUZFXCJcblx0aW5kaWdvQTcwMDpcIiMzMDRGRkVcIlxuXHRibHVlOlwiIzIxOTZGM1wiXG5cdGJsdWU1MDpcIiNFM0YyRkRcIlxuXHRibHVlMTAwOlwiI0JCREVGQlwiXG5cdGJsdWUyMDA6XCIjOTBDQUY5XCJcblx0Ymx1ZTMwMDpcIiM2NEI1RjZcIlxuXHRibHVlNDAwOlwiIzQyQTVGNVwiXG5cdGJsdWU1MDA6XCIjMjE5NkYzXCJcblx0Ymx1ZTYwMDpcIiMxRTg4RTVcIlxuXHRibHVlNzAwOlwiIzE5NzZEMlwiXG5cdGJsdWU4MDA6XCIjMTU2NUMwXCJcblx0Ymx1ZTkwMDpcIiMwRDQ3QTFcIlxuXHRibHVlQTEwMDpcIiM4MkIxRkZcIlxuXHRibHVlQTIwMDpcIiM0NDhBRkZcIlxuXHRibHVlQTQwMDpcIiMyOTc5RkZcIlxuXHRibHVlQTcwMDpcIiMyOTYyRkZcIlxuXHRsaWdodEJsdWU6XCIjMDNBOUY0XCJcblx0bGlnaHRCbHVlNTA6XCIjRTFGNUZFXCJcblx0bGlnaHRCbHVlMTAwOlwiI0IzRTVGQ1wiXG5cdGxpZ2h0Qmx1ZTIwMDpcIiM4MUQ0RkFcIlxuXHRsaWdodEJsdWUzMDA6XCIjNEZDM0Y3XCJcblx0bGlnaHRCbHVlNDAwOlwiIzI5QjZGNlwiXG5cdGxpZ2h0Qmx1ZTUwMDpcIiMwM0E5RjRcIlxuXHRsaWdodEJsdWU2MDA6XCIjMDM5QkU1XCJcblx0bGlnaHRCbHVlNzAwOlwiIzAyODhEMVwiXG5cdGxpZ2h0Qmx1ZTgwMDpcIiMwMjc3QkRcIlxuXHRsaWdodEJsdWU5MDA6XCIjMDE1NzlCXCJcblx0bGlnaHRCbHVlQTEwMDpcIiM4MEQ4RkZcIlxuXHRsaWdodEJsdWVBMjAwOlwiIzQwQzRGRlwiXG5cdGxpZ2h0Qmx1ZUE0MDA6XCIjMDBCMEZGXCJcblx0bGlnaHRCbHVlQTcwMDpcIiMwMDkxRUFcIlxuXHRjeWFuOlwiIzAwQkNENFwiXG5cdGN5YW41MDpcIiNFMEY3RkFcIlxuXHRjeWFuMTAwOlwiI0IyRUJGMlwiXG5cdGN5YW4yMDA6XCIjODBERUVBXCJcblx0Y3lhbjMwMDpcIiM0REQwRTFcIlxuXHRjeWFuNDAwOlwiIzI2QzZEQVwiXG5cdGN5YW41MDA6XCIjMDBCQ0Q0XCJcblx0Y3lhbjYwMDpcIiMwMEFDQzFcIlxuXHRjeWFuNzAwOlwiIzAwOTdBN1wiXG5cdGN5YW44MDA6XCIjMDA4MzhGXCJcblx0Y3lhbjkwMDpcIiMwMDYwNjRcIlxuXHRjeWFuQTEwMDpcIiM4NEZGRkZcIlxuXHRjeWFuQTIwMDpcIiMxOEZGRkZcIlxuXHRjeWFuQTQwMDpcIiMwMEU1RkZcIlxuXHRjeWFuQTcwMDpcIiMwMEI4RDRcIlxuXHR0ZWFsOlwiIzAwOTY4OFwiXG5cdHRlYWw1MDpcIiNFMEYyRjFcIlxuXHR0ZWFsMTAwOlwiI0IyREZEQlwiXG5cdHRlYWwyMDA6XCIjODBDQkM0XCJcblx0dGVhbDMwMDpcIiM0REI2QUNcIlxuXHR0ZWFsNDAwOlwiIzI2QTY5QVwiXG5cdHRlYWw1MDA6XCIjMDA5Njg4XCJcblx0dGVhbDYwMDpcIiMwMDg5N0JcIlxuXHR0ZWFsNzAwOlwiIzAwNzk2QlwiXG5cdHRlYWw4MDA6XCIjMDA2OTVDXCJcblx0dGVhbDkwMDpcIiMwMDRENDBcIlxuXHR0ZWFsQTEwMDpcIiNBN0ZGRUJcIlxuXHR0ZWFsQTIwMDpcIiM2NEZGREFcIlxuXHR0ZWFsQTQwMDpcIiMxREU5QjZcIlxuXHR0ZWFsQTcwMDpcIiMwMEJGQTVcIlxuXHRncmVlbjpcIiM0Q0FGNTBcIlxuXHRncmVlbjUwOlwiI0U4RjVFOVwiXG5cdGdyZWVuMTAwOlwiI0M4RTZDOVwiXG5cdGdyZWVuMjAwOlwiI0E1RDZBN1wiXG5cdGdyZWVuMzAwOlwiIzgxQzc4NFwiXG5cdGdyZWVuNDAwOlwiIzY2QkI2QVwiXG5cdGdyZWVuNTAwOlwiIzRDQUY1MFwiXG5cdGdyZWVuNjAwOlwiIzQzQTA0N1wiXG5cdGdyZWVuNzAwOlwiIzM4OEUzQ1wiXG5cdGdyZWVuODAwOlwiIzJFN0QzMlwiXG5cdGdyZWVuOTAwOlwiIzFCNUUyMFwiXG5cdGdyZWVuQTEwMDpcIiNCOUY2Q0FcIlxuXHRncmVlbkEyMDA6XCIjNjlGMEFFXCJcblx0Z3JlZW5BNDAwOlwiIzAwRTY3NlwiXG5cdGdyZWVuQTcwMDpcIiMwMEM4NTNcIlxuXHRsaWdodEdyZWVuOlwiIzhCQzM0QVwiXG5cdGxpZ2h0R3JlZW41MDpcIiNGMUY4RTlcIlxuXHRsaWdodEdyZWVuMTAwOlwiI0RDRURDOFwiXG5cdGxpZ2h0R3JlZW4yMDA6XCIjQzVFMUE1XCJcblx0bGlnaHRHcmVlbjMwMDpcIiNBRUQ1ODFcIlxuXHRsaWdodEdyZWVuNDAwOlwiIzlDQ0M2NVwiXG5cdGxpZ2h0R3JlZW41MDA6XCIjOEJDMzRBXCJcblx0bGlnaHRHcmVlbjYwMDpcIiM3Q0IzNDJcIlxuXHRsaWdodEdyZWVuNzAwOlwiIzY4OUYzOFwiXG5cdGxpZ2h0R3JlZW44MDA6XCIjNTU4QjJGXCJcblx0bGlnaHRHcmVlbjkwMDpcIiMzMzY5MUVcIlxuXHRsaWdodEdyZWVuQTEwMDpcIiNDQ0ZGOTBcIlxuXHRsaWdodEdyZWVuQTIwMDpcIiNCMkZGNTlcIlxuXHRsaWdodEdyZWVuQTQwMDpcIiM3NkZGMDNcIlxuXHRsaWdodEdyZWVuQTcwMDpcIiM2NEREMTdcIlxuXHRsaW1lOlwiI0NEREMzOVwiXG5cdGxpbWU1MDpcIiNGOUZCRTdcIlxuXHRsaW1lMTAwOlwiI0YwRjRDM1wiXG5cdGxpbWUyMDA6XCIjRTZFRTlDXCJcblx0bGltZTMwMDpcIiNEQ0U3NzVcIlxuXHRsaW1lNDAwOlwiI0Q0RTE1N1wiXG5cdGxpbWU1MDA6XCIjQ0REQzM5XCJcblx0bGltZTYwMDpcIiNDMENBMzNcIlxuXHRsaW1lNzAwOlwiI0FGQjQyQlwiXG5cdGxpbWU4MDA6XCIjOUU5RDI0XCJcblx0bGltZTkwMDpcIiM4Mjc3MTdcIlxuXHRsaW1lQTEwMDpcIiNGNEZGODFcIlxuXHRsaW1lQTIwMDpcIiNFRUZGNDFcIlxuXHRsaW1lQTQwMDpcIiNDNkZGMDBcIlxuXHRsaW1lQTcwMDpcIiNBRUVBMDBcIlxuXHR5ZWxsb3c6XCIjRkZFQjNCXCJcblx0eWVsbG93NTA6XCIjRkZGREU3XCJcblx0eWVsbG93MTAwOlwiI0ZGRjlDNFwiXG5cdHllbGxvdzIwMDpcIiNGRkY1OURcIlxuXHR5ZWxsb3czMDA6XCIjRkZGMTc2XCJcblx0eWVsbG93NDAwOlwiI0ZGRUU1OFwiXG5cdHllbGxvdzUwMDpcIiNGRkVCM0JcIlxuXHR5ZWxsb3c2MDA6XCIjRkREODM1XCJcblx0eWVsbG93NzAwOlwiI0ZCQzAyRFwiXG5cdHllbGxvdzgwMDpcIiNGOUE4MjVcIlxuXHR5ZWxsb3c5MDA6XCIjRjU3RjE3XCJcblx0eWVsbG93QTEwMDpcIiNGRkZGOERcIlxuXHR5ZWxsb3dBMjAwOlwiI0ZGRkYwMFwiXG5cdHllbGxvd0E0MDA6XCIjRkZFQTAwXCJcblx0eWVsbG93QTcwMDpcIiNGRkQ2MDBcIlxuXHRhbWJlcjpcIiNGRkMxMDdcIlxuXHRhbWJlcjUwOlwiI0ZGRjhFMVwiXG5cdGFtYmVyMTAwOlwiI0ZGRUNCM1wiXG5cdGFtYmVyMjAwOlwiI0ZGRTA4MlwiXG5cdGFtYmVyMzAwOlwiI0ZGRDU0RlwiXG5cdGFtYmVyNDAwOlwiI0ZGQ0EyOFwiXG5cdGFtYmVyNTAwOlwiI0ZGQzEwN1wiXG5cdGFtYmVyNjAwOlwiI0ZGQjMwMFwiXG5cdGFtYmVyNzAwOlwiI0ZGQTAwMFwiXG5cdGFtYmVyODAwOlwiI0ZGOEYwMFwiXG5cdGFtYmVyOTAwOlwiI0ZGNkYwMFwiXG5cdGFtYmVyQTEwMDpcIiNGRkU1N0ZcIlxuXHRhbWJlckEyMDA6XCIjRkZENzQwXCJcblx0YW1iZXJBNDAwOlwiI0ZGQzQwMFwiXG5cdGFtYmVyQTcwMDpcIiNGRkFCMDBcIlxuXHRvcmFuZ2U6XCIjRkY5ODAwXCJcblx0b3JhbmdlNTA6XCIjRkZGM0UwXCJcblx0b3JhbmdlMTAwOlwiI0ZGRTBCMlwiXG5cdG9yYW5nZTIwMDpcIiNGRkNDODBcIlxuXHRvcmFuZ2UzMDA6XCIjRkZCNzREXCJcblx0b3JhbmdlNDAwOlwiI0ZGQTcyNlwiXG5cdG9yYW5nZTUwMDpcIiNGRjk4MDBcIlxuXHRvcmFuZ2U2MDA6XCIjRkI4QzAwXCJcblx0b3JhbmdlNzAwOlwiI0Y1N0MwMFwiXG5cdG9yYW5nZTgwMDpcIiNFRjZDMDBcIlxuXHRvcmFuZ2U5MDA6XCIjRTY1MTAwXCJcblx0b3JhbmdlQTEwMDpcIiNGRkQxODBcIlxuXHRvcmFuZ2VBMjAwOlwiI0ZGQUI0MFwiXG5cdG9yYW5nZUE0MDA6XCIjRkY5MTAwXCJcblx0b3JhbmdlQTcwMDpcIiNGRjZEMDBcIlxuXHRkZWVwT3JhbmdlOlwiI0ZGNTcyMlwiXG5cdGRlZXBPcmFuZ2U1MDpcIiNGQkU5RTdcIlxuXHRkZWVwT3JhbmdlMTAwOlwiI0ZGQ0NCQ1wiXG5cdGRlZXBPcmFuZ2UyMDA6XCIjRkZBQjkxXCJcblx0ZGVlcE9yYW5nZTMwMDpcIiNGRjhBNjVcIlxuXHRkZWVwT3JhbmdlNDAwOlwiI0ZGNzA0M1wiXG5cdGRlZXBPcmFuZ2U1MDA6XCIjRkY1NzIyXCJcblx0ZGVlcE9yYW5nZTYwMDpcIiNGNDUxMUVcIlxuXHRkZWVwT3JhbmdlNzAwOlwiI0U2NEExOVwiXG5cdGRlZXBPcmFuZ2U4MDA6XCIjRDg0MzE1XCJcblx0ZGVlcE9yYW5nZTkwMDpcIiNCRjM2MENcIlxuXHRkZWVwT3JhbmdlQTEwMDpcIiNGRjlFODBcIlxuXHRkZWVwT3JhbmdlQTIwMDpcIiNGRjZFNDBcIlxuXHRkZWVwT3JhbmdlQTQwMDpcIiNGRjNEMDBcIlxuXHRkZWVwT3JhbmdlQTcwMDpcIiNERDJDMDBcIlxuXHRicm93bjpcIiM3OTU1NDhcIlxuXHRicm93bjUwOlwiI0VGRUJFOVwiXG5cdGJyb3duMTAwOlwiI0Q3Q0NDOFwiXG5cdGJyb3duMjAwOlwiI0JDQUFBNFwiXG5cdGJyb3duMzAwOlwiI0ExODg3RlwiXG5cdGJyb3duNDAwOlwiIzhENkU2M1wiXG5cdGJyb3duNTAwOlwiIzc5NTU0OFwiXG5cdGJyb3duNjAwOlwiIzZENEM0MVwiXG5cdGJyb3duNzAwOlwiIzVENDAzN1wiXG5cdGJyb3duODAwOlwiIzRFMzQyRVwiXG5cdGJyb3duOTAwOlwiIzNFMjcyM1wiXG5cdGdyZXk6XCIjOUU5RTlFXCJcblx0Z3JleTUwOlwiI0ZBRkFGQVwiXG5cdGdyZXkxMDA6XCIjRjVGNUY1XCJcblx0Z3JleTIwMDpcIiNFRUVFRUVcIlxuXHRncmV5MzAwOlwiI0UwRTBFMFwiXG5cdGdyZXk0MDA6XCIjQkRCREJEXCJcblx0Z3JleTUwMDpcIiM5RTlFOUVcIlxuXHRncmV5NjAwOlwiIzc1NzU3NVwiXG5cdGdyZXk3MDA6XCIjNjE2MTYxXCJcblx0Z3JleTgwMDpcIiM0MjQyNDJcIlxuXHRncmV5OTAwOlwiIzIxMjEyMVwiXG5cdGJsdWVHcmV5OlwiIzYwN0Q4QlwiXG5cdGJsdWVHcmV5NTA6XCIjRUNFRkYxXCJcblx0Ymx1ZUdyZXkxMDA6XCIjQ0ZEOERDXCJcblx0Ymx1ZUdyZXkyMDA6XCIjQjBCRUM1XCJcblx0Ymx1ZUdyZXkzMDA6XCIjOTBBNEFFXCJcblx0Ymx1ZUdyZXk0MDA6XCIjNzg5MDlDXCJcblx0Ymx1ZUdyZXk1MDA6XCIjNjA3RDhCXCJcblx0Ymx1ZUdyZXk2MDA6XCIjNTQ2RTdBXCJcblx0Ymx1ZUdyZXk3MDA6XCIjNDU1QTY0XCJcblx0Ymx1ZUdyZXk4MDA6XCIjMzc0NzRGXCJcblx0Ymx1ZUdyZXk5MDA6XCIjMjYzMjM4XCJcblx0YmxhY2s6XCIjMDAwMDAwXCJcblx0d2hpdGU6XCIjRkZGRkZGXCJcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG59XG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5leHBvcnRzLmNyZWF0ZSA9IChhcnJheSkgLT5cblx0c2V0dXAgPSBtLnV0aWxzLnNldHVwQ29tcG9uZW50KGFycmF5LCBleHBvcnRzLmRlZmF1bHRzKVxuXG5cdG5hdmJhciA9IG5ldyBMYXllclxuXHRcdGJhY2tncm91bmRDb2xvcjpcImJsYWNrXCJcblxuXHRuYXZiYXIudHlwZSA9IFwibmF2YmFyXCJcblxuXHRuYXZiYXIuY29uc3RyYWludHMgPVxuXHRcdGJvdHRvbTotMVxuXHRcdGxlYWRpbmc6MFxuXHRcdHRyYWlsaW5nOjBcblx0XHRoZWlnaHQ6NDhcblxuXHRzdmdIb21lID0gbS51dGlscy5zdmcobS5hc3NldHMuaG9tZSlcblx0c3ZnQmFjayA9IG0udXRpbHMuc3ZnKG0uYXNzZXRzLmJhY2spXG5cblx0aG9tZUJ1dHRvbiA9IG5ldyBMYXllclxuXHRcdHN1cGVyTGF5ZXI6bmF2YmFyXG5cdFx0Ym9yZGVyUmFkaXVzOm0udXRpbHMucHgoMjEpXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJob21lXCJcblx0XHRjbGlwOnRydWVcblxuXHRob21lQnV0dG9uLmNvbnN0cmFpbnRzID1cblx0XHR0b3A6M1xuXHRcdGhlaWdodDo0MlxuXHRcdHdpZHRoOjk0XG5cdFx0YWxpZ246XCJob3Jpem9udGFsXCJcblxuXHRob21lSWNvbiA9IG5ldyBMYXllclxuXHRcdHN1cGVyTGF5ZXI6aG9tZUJ1dHRvblxuXHRcdHdpZHRoOnN2Z0hvbWUud2lkdGhcblx0XHRoZWlnaHQ6c3ZnSG9tZS5oZWlnaHRcblx0XHRodG1sOnN2Z0hvbWUuc3ZnXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJpY29uXCJcblxuXHRob21lSWNvbi5jb25zdHJhaW50cyA9XG5cdFx0YWxpZ246XCJjZW50ZXJcIlxuXG5cdHJlY2VudEJ1dHRvbiA9IG5ldyBMYXllclxuXHRcdHN1cGVyTGF5ZXI6bmF2YmFyXG5cdFx0Ym9yZGVyUmFkaXVzOm0udXRpbHMucHgoMjEpXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdG5hbWU6XCJyZWNlbnRcIlxuXHRcdGNsaXA6dHJ1ZVxuXG5cdHJlY2VudEJ1dHRvbi5jb25zdHJhaW50cyA9XG5cdFx0dG9wOjNcblx0XHRoZWlnaHQ6NDJcblx0XHR3aWR0aDo5NFxuXHRcdGxlYWRpbmc6W2hvbWVCdXR0b24sIDZdXG5cblx0cmVjZW50SWNvbiA9IG5ldyBMYXllclxuXHRcdHN1cGVyTGF5ZXI6cmVjZW50QnV0dG9uXG5cdFx0YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIlxuXHRcdGJvcmRlckNvbG9yOlwid2hpdGVcIlxuXHRcdGJvcmRlcldpZHRoOm0udXRpbHMucHgoMilcblx0XHRib3JkZXJSYWRpdXM6bS51dGlscy5weCgyKVxuXHRcdG5hbWU6XCJpY29uXCJcblxuXHRyZWNlbnRJY29uLmNvbnN0cmFpbnRzID1cblx0XHRhbGlnbjpcImNlbnRlclwiXG5cdFx0d2lkdGg6MTZcblx0XHRoZWlnaHQ6MTZcblxuXHRiYWNrQnV0dG9uID0gbmV3IExheWVyXG5cdFx0c3VwZXJMYXllcjpuYXZiYXJcblx0XHRib3JkZXJSYWRpdXM6bS51dGlscy5weCgyMSlcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0bmFtZTpcImJhY2tcIlxuXHRcdGNsaXA6dHJ1ZVxuXG5cdGJhY2tCdXR0b24uY29uc3RyYWludHMgPVxuXHRcdHRvcDozXG5cdFx0aGVpZ2h0OjQyXG5cdFx0d2lkdGg6OTRcblx0XHR0cmFpbGluZzpbaG9tZUJ1dHRvbiwgNl1cblxuXG5cdGJhY2tJY29uID0gbmV3IExheWVyXG5cdFx0c3VwZXJMYXllcjpiYWNrQnV0dG9uXG5cdFx0d2lkdGg6c3ZnQmFjay53aWR0aFxuXHRcdGhlaWdodDpzdmdCYWNrLmhlaWdodFxuXHRcdGh0bWw6c3ZnQmFjay5zdmdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0bmFtZTpcImljb25cIlxuXG5cdGJhY2tJY29uLmNvbnN0cmFpbnRzID1cblx0XHRhbGlnbjpcImNlbnRlclwiXG5cblx0bS5sYXlvdXQuc2V0XG5cdFx0dGFyZ2V0OltuYXZiYXIsIGhvbWVCdXR0b24sIHJlY2VudEJ1dHRvbiwgYmFja0J1dHRvbiwgaG9tZUljb24sIGJhY2tJY29uLCByZWNlbnRJY29uXVxuXG5cdG0udXRpbHMuaW5reVxuXHRcdGxheWVyOmhvbWVCdXR0b25cblx0XHRtb3ZlVG9UYXA6ZmFsc2Vcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0c2NhbGU6IDIwXG5cdFx0Y3VydmU6IFwiYmV6aWVyLWN1cnZlKDEsIDAuNCwgMC40LCAxLjApXCJcblx0XHRvcGFjaXR5OiAuM1xuXHRtLnV0aWxzLmlua3lcblx0XHRcdGxheWVyOmJhY2tCdXR0b25cblx0XHRcdG1vdmVUb1RhcDpmYWxzZVxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0c2NhbGU6IDIwXG5cdFx0XHRjdXJ2ZTogXCJiZXppZXItY3VydmUoMSwgMC40LCAwLjQsIDEuMClcIlxuXHRcdFx0b3BhY2l0eTogLjNcblx0bS51dGlscy5pbmt5XG5cdFx0XHRsYXllcjpyZWNlbnRCdXR0b25cblx0XHRcdG1vdmVUb1RhcDpmYWxzZVxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0c2NhbGU6IDIwXG5cdFx0XHRjdXJ2ZTogXCJiZXppZXItY3VydmUoMSwgMC40LCAwLjQsIDEuMClcIlxuXHRcdFx0b3BhY2l0eTogLjNcblxuXHRiYWNrQnV0dG9uLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cblx0XHRtLnJlbW92ZUZyb21TdGFjaygpXG5cblx0bmF2YmFyLmJhY2sgPSBiYWNrQnV0dG9uXG5cdG5hdmJhci5iYWNrLmJhY2tJY29uID0gYmFja0ljb25cblx0bmF2YmFyLmhvbWUgPSBob21lQnV0dG9uXG5cdG5hdmJhci5ob21lLmljb24gPSBob21lSWNvblxuXHRuYXZiYXIucmVjZW50ID0gcmVjZW50QnV0dG9uXG5cdG5hdmJhci5yZWNlbnQuaWNvbiA9IHJlY2VudEljb25cblxuXHRVdGlscy5pbnRlcnZhbCAuMDUsIC0+XG5cdFx0bmF2YmFyLmJyaW5nVG9Gcm9udCgpXG5cblx0bS5sYXlvdXQuc2V0KG5hdmJhcilcblx0cmV0dXJuIG5hdmJhclxuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0YW5pbWF0ZWQ6dHJ1ZVxuXHR0ZXh0OlwiU25hY2tiYXIgVGV4dFwiXG5cdGFjdGlvbjp1bmRlZmluZWRcblx0YWN0aW9uQ29sb3I6XCJsaW1lQTIwMFwiXG5cdGR1cmF0aW9uOjVcbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cblx0YmFyID0gbmV3IExheWVyXG5cdFx0bmFtZTpcInNuYWNrYmFyXCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0Y2xpcDp0cnVlXG5cblx0YmFyLnR5cGUgPSBcInNuYWNrYmFyXCJcblx0YmFyLmJnID0gbmV3IExheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOlwiIzMyMzIzMlwiXG5cdFx0c3VwZXJMYXllcjpiYXJcblx0XHRuYW1lOlwiYmdcIlxuXG5cdG5hdmJhckV4aXN0cyA9IDBcblx0ZmFiRXhpc3RzID0gdW5kZWZpbmVkXG5cblx0Zm9yIGwgaW4gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmxheWVyc1xuXHRcdGlmIGwudHlwZSA9PSBcIm5hdmJhclwiXG5cdFx0XHRuYXZiYXJFeGlzdHMgPSBsXG5cblx0XHRpZiBsLnR5cGUgPT0gXCJmbG9hdGluZ1wiXG5cdFx0XHRmYWJFeGlzdHMgPSBsXG5cblx0XHRpZiBsLnR5cGUgPT0gXCJzbmFja2JhclwiICYmIGwgIT0gYmFyXG5cdFx0XHRsLmJnLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczooeTpiYXIuaGVpZ2h0KVxuXHRcdFx0XHR0aW1lOi4zXG5cdFx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0XHRcdGlmIGwuZmFiTW92ZWRcblx0XHRcdFx0XHRsLmZhYk1vdmVkLmhhbHRlZCA9IHRydWVcblx0XHRcdFx0XHRsLmZhYk1vdmVkLmNvbnN0cmFpbnRzLmJvdHRvbSA9IGZhYkV4aXN0cy5wcmV2aW91c0JvdHRvbVxuXHRcdFx0XHRcdG0ubGF5b3V0LmFuaW1hdGVcblx0XHRcdFx0XHRcdHRhcmdldDpmYWJFeGlzdHNcblx0XHRcdFx0XHRcdGN1cnZlOlwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdFx0XHRcdFx0XHR0aW1lOi4zXG5cdFx0XHRcdFx0VXRpbHMuZGVsYXkgc2V0dXAuZHVyYXRpb24sIC0+XG5cdFx0XHRcdFx0XHRmYWJFeGlzdHMuY29uc3RyYWludHMuYm90dG9tID0gZmFiRXhpc3RzLnByZXZpb3VzQm90dG9tXG5cdFx0XHRcdFx0XHRtLmxheW91dC5hbmltYXRlXG5cdFx0XHRcdFx0XHRcdHRhcmdldDpmYWJFeGlzdHNcblx0XHRcdFx0XHRcdFx0Y3VydmU6XCJiZXppZXItY3VydmUoLjIsIDAuNCwgMC40LCAxLjApXCJcblx0XHRcdFx0XHRcdFx0dGltZTouM1xuXG5cdGJhci5icmluZ1RvRnJvbnQoKVxuXG5cdGJhci5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdGJvdHRvbTpbbmF2YmFyRXhpc3RzLCAtMV1cblx0XHRoZWlnaHQ6NDhcblxuXHRtLmxheW91dC5zZXRcblx0XHR0YXJnZXQ6W2Jhcl1cblxuXHRiYXIuYmcucHJvcHMgPSB7d2lkdGg6YmFyLndpZHRoLCBoZWlnaHQ6YmFyLmhlaWdodH1cblx0YWN0aW9uV2lkdGggPSBtLnB4KDI0KVxuXG5cdGlmIHNldHVwLmFjdGlvblxuXHRcdGJhci5hY3Rpb24gPSBuZXcgbS5CdXR0b25cblx0XHRcdHR5cGU6XCJmbGF0XCJcblx0XHRcdHN1cGVyTGF5ZXI6YmFyLmJnXG5cdFx0XHR0ZXh0OnNldHVwLmFjdGlvblxuXHRcdFx0Y29uc3RyYWludHM6e3RyYWlsaW5nOjI0LCBhbGlnbjpcInZlcnRpY2FsXCJ9XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6XCIjMzIzMlwiXG5cdFx0XHRjb2xvcjpzZXR1cC5hY3Rpb25Db2xvclxuXHRcdGFjdGlvbldpZHRoID0gYmFyLmFjdGlvbi53aWR0aCArIG0ucHgoNDgpXG5cblx0YmFyLnRleHQgPSBuZXcgbS5UZXh0XG5cdFx0Zm9udFNpemU6MTRcblx0XHRjb2xvcjpcIndoaXRlXCJcblx0XHRzdXBlckxheWVyOmJhci5iZ1xuXHRcdGNvbnN0cmFpbnRzOntsZWFkaW5nOjI0LCBhbGlnbjpcInZlcnRpY2FsXCJ9XG5cdFx0dGV4dDpzZXR1cC50ZXh0XG5cdFx0bmFtZTpcInRleHRcIlxuXHRcdGxpbmVIZWlnaHQ6MThcblxuXHRpZiBtLmRldmljZS53aWR0aCA8IGFjdGlvbldpZHRoICsgYmFyLnRleHQud2lkdGggKyBtLnB4KDI0KVxuXHRcdGJhci50ZXh0LmNvbnN0cmFpbnRzLndpZHRoID0gbS5kcChtLmRldmljZS53aWR0aCkgLSAobS5kcChhY3Rpb25XaWR0aCkgKyAyNClcblx0XHRtLnV0aWxzLnVwZGF0ZShiYXIudGV4dClcblx0XHRtLmxheW91dC5zZXQoYmFyLnRleHQpXG5cdFx0YmFyLmNvbnN0cmFpbnRzLmhlaWdodCA9IG0uZHAoYmFyLnRleHQuaGVpZ2h0KSArIDQ4XG5cdFx0YmFyLmJnLmhlaWdodCA9IGJhci50ZXh0LmhlaWdodCArIG0ucHgoNDgpXG5cblx0XHRtLmxheW91dC5zZXRcblx0XHRcdHRhcmdldDpbYmFyLCBiYXIudGV4dF1cblxuXHRcdGlmIHNldHVwLmFjdGlvblxuXHRcdFx0bS5sYXlvdXQuc2V0KGJhci5hY3Rpb24pXG5cblx0YmFySGVpZ2h0ID0gYmFyLmJnLmhlaWdodFxuXG5cdGlmIGZhYkV4aXN0c1xuXHRcdGJhci5mYWJNb3ZlZCA9IGZhYkV4aXN0c1xuXHRcdGZhYkV4aXN0cy5wcmV2aW91c0JvdHRvbSA9IGZhYkV4aXN0cy5jb25zdHJhaW50cy5ib3R0b21cblx0XHRmYWJFeGlzdHMuY29uc3RyYWludHMuYm90dG9tID0gZmFiRXhpc3RzLmNvbnN0cmFpbnRzLmJvdHRvbSArIG0uZHAoYmFySGVpZ2h0KVxuXG5cdGlmIHNldHVwLmFuaW1hdGVkXG5cdFx0YmFyLmJnLnkgPSBiYXIuYmcuaGVpZ2h0XG5cdFx0YmFyLnRleHQub3BhY2l0eSA9IDBcblx0XHRiYXIuYmcuYW5pbWF0ZVxuXHRcdFx0cHJvcGVydGllczooeTowKVxuXHRcdFx0dGltZTouM1xuXHRcdFx0Y3VydmU6XCJiZXppZXItY3VydmUoLjIsIDAuNCwgMC40LCAxLjApXCJcblx0XHRiYXIudGV4dC5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOihvcGFjaXR5OjEpXG5cdFx0XHR0aW1lOi4zXG5cdFx0aWYgc2V0dXAuYWN0aW9uXG5cdFx0XHRiYXIuYWN0aW9uLmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczoob3BhY2l0eToxKVxuXHRcdFx0XHR0aW1lOi4zXG5cdFx0aWYgZmFiRXhpc3RzXG5cdFx0XHRtLmxheW91dC5hbmltYXRlXG5cdFx0XHRcdHRhcmdldDpmYWJFeGlzdHNcblx0XHRcdFx0Y3VydmU6XCJiZXppZXItY3VydmUoLjIsIDAuNCwgMC40LCAxLjApXCJcblx0XHRcdFx0dGltZTouM1xuXG5cdFV0aWxzLmRlbGF5IHNldHVwLmR1cmF0aW9uLCAtPlxuXHRcdGJhci5iZy5hbmltYXRlXG5cdFx0XHRwcm9wZXJ0aWVzOih5OmJhci5oZWlnaHQpXG5cdFx0XHR0aW1lOi4zXG5cdFx0XHRjdXJ2ZTpcImJlemllci1jdXJ2ZSguMiwgMC40LCAwLjQsIDEuMClcIlxuXHRcdGJhci50ZXh0LmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6KG9wYWNpdHk6MClcblx0XHRcdHRpbWU6LjNcblx0XHRpZiBzZXR1cC5hY3Rpb25cblx0XHRcdGJhci5hY3Rpb24uYW5pbWF0ZVxuXHRcdFx0XHRwcm9wZXJ0aWVzOihvcGFjaXR5OjApXG5cdFx0XHRcdHRpbWU6LjNcblx0XHRpZiBmYWJFeGlzdHMgJiYgZmFiRXhpc3RzLmhhbHRlZCAhPSB0cnVlXG5cdFx0XHRmYWJFeGlzdHMuY29uc3RyYWludHMuYm90dG9tID0gZmFiRXhpc3RzLnByZXZpb3VzQm90dG9tXG5cdFx0XHRtLmxheW91dC5hbmltYXRlXG5cdFx0XHRcdHRhcmdldDpmYWJFeGlzdHNcblx0XHRcdFx0Y3VydmU6XCJiZXppZXItY3VydmUoLjIsIDAuNCwgMC40LCAxLjApXCJcblx0XHRcdFx0dGltZTouM1xuXHRVdGlscy5kZWxheSBzZXR1cC5kdXJhdGlvbiArIC4zLCAtPlxuXHRcdGJhci5kZXN0cm95KClcblx0cmV0dXJuIGJhclxuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5zdGFjayA9IHN0YWNrID0gW11cblxuXG5leHBvcnRzLmFkZFRvU3RhY2sgPSAobGF5ZXIpIC0+XG4gIGlmIHN0YWNrLmluZGV4T2YobGF5ZXIpID09IC0xXG4gICAgc3RhY2sucHVzaCBsYXllclxuXG5leHBvcnRzLnJlbW92ZUZyb21TdGFjayA9IChsYXllcikgLT5cbiAgaWYgc3RhY2subGVuZ3RoID4gMFxuICAgIGxheWVyVG9sZWF2ZSA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdXG4gICAgaWYgbGF5ZXJUb2xlYXZlLmV4aXQgIT0gdW5kZWZpbmVkXG4gICAgICBsYXllclRvbGVhdmUuZXhpdCgpXG4gICAgZWxzZVxuICAgICAgb3ZlcmxheSA9IG5ldyBMYXllclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6bS5jb2xvcihcImJsYWNrXCIpXG4gICAgICAgIHdpZHRoOm0uZGV2aWNlLndpZHRoXG4gICAgICAgIGhlaWdodDptLmRldmljZS5oZWlnaHRcbiAgICAgIG92ZXJsYXkucGxhY2VCZWhpbmQobGF5ZXJUb2xlYXZlKVxuICAgICAgbGF5ZXJUb2xlYXZlLmNvbnN0cmFpbnRzID1cbiAgICAgICAgbGVhZGluZzptLmRwKG0uZGV2aWNlLndpZHRoKVxuICAgICAgbS5sYXlvdXQuYW5pbWF0ZVxuICAgICAgICB0YXJnZXQ6bGF5ZXJUb2xlYXZlXG4gICAgICAgIHRpbWU6LjNcbiAgICAgIG92ZXJsYXkuYW5pbWF0ZVxuICAgICAgICBwcm9wZXJ0aWVzOihvcGFjaXR5OjApXG4gICAgICAgIHRpbWU6LjVcbiAgICAgICAgZGVsYXk6LjJcbiAgICAgIFV0aWxzLmRlbGF5IC42LCAtPlxuICAgICAgICBsYXllclRvbGVhdmUuZGVzdHJveSgpXG4gICAgICAgIG92ZXJsYXkuZGVzdHJveSgpXG4gICAgc3RhY2sucG9wKClcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbmV4cG9ydHMuZGVmYXVsdHMgPSB7XG5cdGNhcnJpZXI6XCJcIlxuXHRuZXR3b3JrOlwiTFRFXCJcblx0YmF0dGVyeToxMDBcblx0Y2VsbHVsYXI6MlxuXHRzdHlsZTpcImxpZ2h0XCJcblx0Y2xvY2syNDpmYWxzZVxuXHR0eXBlOlwic3RhdHVzQmFyXCJcblx0YmFja2dyb3VuZENvbG9yOlwicmdiYSgwLDAsMCwuMSlcIlxuXHRjb2xvcjogXCJibGFja1wiXG5cdG9wYWNpdHk6LjZcbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuXHRzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG5cdHN0YXR1c0JhciA9IG5ldyBMYXllciBiYWNrZ3JvdW5kQ29sb3I6c2V0dXAuYmFja2dyb3VuZENvbG9yLCBuYW1lOlwic3RhdHVzQmFyLmFsbFwiXG5cblx0aWYgc2V0dXAuc3R5bGUgPT0gXCJkYXJrXCJcblx0XHRpZiBzZXR1cC5iYWNrZ3JvdW5kQ29sb3IgPT0gXCJyZ2JhKDAsMCwwLC4xKVwiXG5cdFx0XHRzdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yID0gbS51dGlscy5jb2xvcihcImJsYWNrXCIpXG5cdFx0aWYgc2V0dXAuY29sb3IgPT0gXCJibGFja1wiXG5cdFx0XHRzZXR1cC5jb2xvciA9IFwid2hpdGVcIlxuXHRcdGlmIHNldHVwLm9wYWNpdHkgPT0gLjZcblx0XHRcdHNldHVwLm9wYWNpdHkgPSAxXG5cblx0aWYgc2V0dXAuc3R5bGUgPT0gXCJsaWdodFwiICYmIHNldHVwLmNvbG9yICE9IFwiYmxhY2tcIlxuXHRcdHNldHVwLm9wYWNpdHkgPSAxXG5cblx0c3RhdHVzQmFyLnR5cGUgPSBzZXR1cC50eXBlXG5cdHN0YXR1c0Jhci5jb25zdHJhaW50cyA9XG5cdFx0bGVhZGluZzowXG5cdFx0dHJhaWxpbmc6MFxuXHRcdGhlaWdodDoyNFxuXG5cdHN3aXRjaCBtLmRldmljZS5uYW1lXG5cdFx0d2hlbiBcImlwaG9uZS02cy1wbHVzXCJcblx0XHRcdEB0b3BDb25zdHJhaW50ID0gNVxuXHRcdFx0QGJsdWV0b290aCA9IDVcblxuXHRcdHdoZW4gXCJmdWxsc2NyZWVuXCJcblx0XHRcdEB0b3BDb25zdHJhaW50ID0gNVxuXHRcdFx0QGJsdWV0b290aCA9IC0gMTBcblx0XHRlbHNlXG5cdFx0XHRAdG9wQ29uc3RyYWludCA9IDNcblx0XHRcdEBibHVldG9vdGggPSAzXG5cblxuXG5cdEB0aW1lID0gbS51dGlscy5nZXRUaW1lKClcblx0dGltZSA9IG5ldyBtLlRleHQgc3R5bGU6XCJzdGF0dXNCYXJUaW1lXCIsIHRleHQ6bS51dGlscy50aW1lRm9ybWF0dGVyKEB0aW1lLCBzZXR1cC5jbG9jazI0KSwgZm9udFNpemU6MTQsIGZvbnRXZWlnaHQ6NTAwLCBzdXBlckxheWVyOnN0YXR1c0JhciwgY29sb3I6c2V0dXAuY29sb3IsIG5hbWU6XCJ0aW1lXCIsIG9wYWNpdHk6c2V0dXAub3BhY2l0eVxuXHR0aW1lLmNvbnN0cmFpbnRzID1cblx0XHR0cmFpbGluZzo4XG5cdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cdG0udXRpbHMudGltZURlbGVnYXRlKHRpbWUsIHNldHVwLmNsb2NrMjQpXG5cblxuXHRiYXR0ZXJ5SWNvbiA9IG5ldyBMYXllciBzdXBlckxheWVyOnN0YXR1c0JhciwgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIiwgbmFtZTpcImJhdHRlcnlJY29uXCJcblx0aWYgc2V0dXAuYmF0dGVyeSA+IDcwXG5cdFx0aGlnaEJhdHRlcnkgPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy5iYXR0ZXJ5SGlnaClcblx0XHRiYXR0ZXJ5SWNvbi5odG1sID0gaGlnaEJhdHRlcnkuc3ZnXG5cdFx0YmF0dGVyeUljb24uaGVpZ2h0ID0gaGlnaEJhdHRlcnkuaGVpZ2h0XG5cdFx0YmF0dGVyeUljb24ud2lkdGggPSBoaWdoQmF0dGVyeS53aWR0aFxuXHRcdG0udXRpbHMuY2hhbmdlRmlsbChiYXR0ZXJ5SWNvbiwgc2V0dXAuY29sb3IpXG5cdFx0YmF0dGVyeUljb24ub3BhY2l0eSA9IHNldHVwLm9wYWNpdHlcblxuXHRpZiBzZXR1cC5iYXR0ZXJ5IDw9IDcwICYmIHNldHVwLmJhdHRlcnkgPiAyMFxuXHRcdG1pZEJhdHRlcnkgPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy5iYXR0ZXJ5TWlkKVxuXHRcdGJhdHRlcnlJY29uLmh0bWwgPSBtaWRCYXR0ZXJ5LnN2Z1xuXHRcdG0udXRpbHMuY2hhbmdlRmlsbChiYXR0ZXJ5SWNvbiwgc2V0dXAuY29sb3IpXG5cblx0aWYgc2V0dXAuYmF0dGVyeSA8PSAyMFxuXHRcdGxvd0JhdHRlcnkgPSBtLnV0aWxzLnN2ZyhtLmFzc2V0cy5iYXR0ZXJ5TG93KVxuXHRcdGJhdHRlcnlJY29uLmh0bWwgPSBsb3dCYXR0ZXJ5LnN2Z1xuXHRcdG0udXRpbHMuY2hhbmdlRmlsbChiYXR0ZXJ5SWNvbiwgc2V0dXAuY29sb3IpXG5cblxuXHRiYXR0ZXJ5SWNvbi5jb25zdHJhaW50cyA9XG5cdFx0dHJhaWxpbmcgOiBbdGltZSwgN11cblx0XHRhbGlnbjpcInZlcnRpY2FsXCJcblxuXG5cdGNlbGx1bGFySWNvbiA9IG0udXRpbHMuc3ZnKG0uYXNzZXRzLmNlbGx1bGFyKVxuXHRjZWxsdWxhciA9IG5ldyBMYXllclxuXHRcdHdpZHRoOmNlbGx1bGFySWNvbi53aWR0aFxuXHRcdGhlaWdodDpjZWxsdWxhckljb24uaGVpZ2h0XG5cdFx0aHRtbDpjZWxsdWxhckljb24uc3ZnXG5cdFx0c3VwZXJMYXllcjpzdGF0dXNCYXJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdFx0b3BhY2l0eTogc2V0dXAub3BhY2l0eVxuXHRcdG5hbWU6XCJjZWxsdWxhclwiXG5cblx0Y2VsbHVsYXIuY29uc3RyYWludHMgPVxuXHRcdHRyYWlsaW5nOiBbYmF0dGVyeUljb24sIDddXG5cdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cblx0bS51dGlscy5jaGFuZ2VGaWxsKGNlbGx1bGFyLCBzZXR1cC5jb2xvcilcblxuXHR3aWZpSWNvbiA9IG0udXRpbHMuc3ZnKG0uYXNzZXRzLndpZmksIHNldHVwLmNvbG9yKVxuXG5cdHdpZmkgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDp3aWZpSWNvbi53aWR0aFxuXHRcdGhlaWdodDp3aWZpSWNvbi5oZWlnaHRcblx0XHRzdXBlckxheWVyOnN0YXR1c0JhclxuXHRcdGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcblx0XHRuYW1lOlwid2lmaVwiXG5cdFx0aHRtbDogd2lmaUljb24uc3ZnXG5cdFx0b3BhY2l0eTogc2V0dXAub3BhY2l0eVxuXG5cdG0udXRpbHMuY2hhbmdlRmlsbCh3aWZpLCBzZXR1cC5jb2xvcilcblxuXHR3aWZpLmNvbnN0cmFpbnRzID1cblx0XHR0cmFpbGluZzpbY2VsbHVsYXIsIDRdXG5cdFx0YWxpZ246XCJ2ZXJ0aWNhbFwiXG5cblx0bS5sYXlvdXQuc2V0KClcblxuXHQjIEV4cG9ydCBzdGF0dXNCYXJcblx0c3RhdHVzQmFyLmJhdHRlcnkgPSB7fVxuXHQjIHN0YXR1c0Jhci5iYXR0ZXJ5LnBlcmNlbnQgPSBiYXR0ZXJ5UGVyY2VudFxuXHRzdGF0dXNCYXIuYmF0dGVyeS5pY29uID0gYmF0dGVyeUljb25cblx0IyBzdGF0dXNCYXIuYmx1ZXRvb3RoID0gYmx1ZXRvb3RoXG5cdHN0YXR1c0Jhci50aW1lID0gdGltZVxuXHQjIHN0YXR1c0Jhci53aWZpID0gd2lmaVxuXHRzdGF0dXNCYXIuY2VsbHVsYXIgPSBjZWxsdWxhclxuXG5cdG0ubGF5b3V0LnNldFxuXHRcdHRhcmdldDpbc3RhdHVzQmFyLCB0aW1lLCBiYXR0ZXJ5SWNvbiwgY2VsbHVsYXIsIHdpZmldXG5cdHJldHVybiBzdGF0dXNCYXJcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcblx0Y29uc3RyYWludHM6e31cblx0dGV4dDogXCJNYXRlcmlhbCBUZXh0IExheWVyXCJcblx0dHlwZTpcInRleHRcIlxuXHR4OjBcblx0eTowXG5cdHdpZHRoOi0xXG5cdGhlaWdodDotMVxuXHRzdXBlckxheWVyOnVuZGVmaW5lZFxuXHRzdHlsZTpcImRlZmF1bHRcIlxuXHRsaW5lczoxXG5cdHRleHRBbGlnbjpcImxlZnRcIlxuXHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG5cdGNvbG9yOlwiYmxhY2tcIlxuXHRmb250U2l6ZTogMTdcblx0Zm9udFN0eWxlOlwicmVndWxhclwiXG5cdGZvbnRGYW1pbHk6XCJSb2JvdG9cIlxuXHRmb250V2VpZ2h0OlwicmVndWxhclwiXG5cdGxpbmVIZWlnaHQ6XCJhdXRvXCJcblx0bmFtZTpcInRleHQgbGF5ZXJcIlxuXHRvcGFjaXR5OjFcblx0dGV4dFRyYW5zZm9ybTpcIm5vbmVcIlxuXHRsZXR0ZXJTcGFjaW5nOjBcblx0bmFtZTpcInRleHQgbGF5ZXJcIlxufVxuXG5cbmV4cG9ydHMuZGVmYXVsdHMucHJvcHMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmRlZmF1bHRzKVxuXG5zdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbnN0eWxlLnR5cGUgPSAndGV4dC9jc3MnXG5cbnN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzo0MDAsMTAwLDEwMGl0YWxpYywzMDAsMzAwaXRhbGljLDQwMGl0YWxpYyw1MDAsNTAwaXRhbGljLDcwMCw3MDBpdGFsaWMsOTAwLDkwMGl0YWxpYyk7XFxuIEBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vaWNvbj9mYW1pbHk9TWF0ZXJpYWwrSWNvbnMpOyBcXG5cIikpXG5cbmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cblxuZXhwb3J0cy5jcmVhdGUgPSAoYXJyYXkpIC0+XG5cdHNldHVwID0gbS51dGlscy5zZXR1cENvbXBvbmVudChhcnJheSwgZXhwb3J0cy5kZWZhdWx0cylcblx0ZXhjZXB0aW9ucyA9IE9iamVjdC5rZXlzKHNldHVwKVxuXHR0ZXh0TGF5ZXIgPSBuZXcgTGF5ZXIgYmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIiwgbmFtZTpzZXR1cC5uYW1lXG5cdHRleHRMYXllci50eXBlID0gXCJ0ZXh0XCJcblx0dGV4dExheWVyLmh0bWwgPSBzZXR1cC50ZXh0XG5cdGZvciBwcm9wIGluIG0ubGliLmxheWVyUHJvcHNcblx0XHRpZiBzZXR1cFtwcm9wXVxuXHRcdFx0aWYgcHJvcCA9PSBcImNvbG9yXCJcblx0XHRcdFx0c2V0dXBbcHJvcF0gPSBtLnV0aWxzLmNvbG9yKHNldHVwW3Byb3BdKVxuXHRcdFx0dGV4dExheWVyW3Byb3BdID0gc2V0dXBbcHJvcF1cblx0Zm9yIHByb3AgaW4gbS5saWIubGF5ZXJTdHlsZXNcblx0XHRpZiBzZXR1cFtwcm9wXVxuXHRcdFx0aWYgcHJvcCA9PSBcImxpbmVIZWlnaHRcIiAmJiBzZXR1cFtwcm9wXSA9PSBcImF1dG9cIlxuXHRcdFx0XHR0ZXh0TGF5ZXIuc3R5bGUubGluZUhlaWdodCA9ICBzZXR1cC5mb250U2l6ZVxuXHRcdFx0aWYgcHJvcCA9PSBcImZvbnRXZWlnaHRcIlxuXHRcdFx0XHRzd2l0Y2ggc2V0dXBbcHJvcF1cblx0XHRcdFx0XHR3aGVuIFwidWx0cmF0aGluXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDEwMFxuXHRcdFx0XHRcdHdoZW4gXCJ0aGluXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDIwMFxuXHRcdFx0XHRcdHdoZW4gXCJsaWdodFwiIHRoZW4gc2V0dXBbcHJvcF0gPSAzMDBcblx0XHRcdFx0XHR3aGVuIFwicmVndWxhclwiIHRoZW4gc2V0dXBbcHJvcF0gPSA0MDBcblx0XHRcdFx0XHR3aGVuIFwibWVkaXVtXCIgdGhlbiBzZXR1cFtwcm9wXSA9IDUwMFxuXHRcdFx0XHRcdHdoZW4gXCJzZW1pYm9sZFwiIHRoZW4gc2V0dXBbcHJvcF0gPSA2MDBcblx0XHRcdFx0XHR3aGVuIFwiYm9sZFwiIHRoZW4gc2V0dXBbcHJvcF0gPSA3MDBcblx0XHRcdFx0XHR3aGVuIFwiYmxhY2tcIiB0aGVuIHNldHVwW3Byb3BdID0gODAwXG5cdFx0XHRpZiBwcm9wID09IFwiZm9udFNpemVcIiB8fCBwcm9wID09IFwibGluZUhlaWdodFwiIHx8IHByb3AgPT0gXCJsZXR0ZXJTcGFjaW5nXCJcblx0XHRcdFx0c2V0dXBbcHJvcF0gPSBtLnV0aWxzLnB4KHNldHVwW3Byb3BdKSArIFwicHhcIlxuXHRcdFx0dGV4dExheWVyLnN0eWxlW3Byb3BdID0gc2V0dXBbcHJvcF1cblxuXHR0ZXh0RnJhbWUgPSBtLnV0aWxzLnRleHRBdXRvU2l6ZSh0ZXh0TGF5ZXIpXG5cdHRleHRMYXllci5wcm9wcyA9IChoZWlnaHQ6dGV4dEZyYW1lLmhlaWdodCwgd2lkdGg6dGV4dEZyYW1lLndpZHRoKVxuXHR0ZXh0TGF5ZXIuY29uc3RyYWludHMgPSBzZXR1cC5jb25zdHJhaW50c1xuXHRtLmxheW91dC5zZXRcblx0XHR0YXJnZXQ6dGV4dExheWVyXG5cdHJldHVybiB0ZXh0TGF5ZXJcbiIsIm0gPSByZXF1aXJlICdtYXRlcmlhbC1raXQnXG5cbiMjIENvbnZlcnRzIHB4IHRvIHB0XG5leHBvcnRzLnB0ID0gKHB4KSAtPlxuXHRwdCA9IHB4L20uZGV2aWNlLnNjYWxlXG5cdHB0ID0gTWF0aC5yb3VuZChwdClcblx0cmV0dXJuIHB0XG5cbiMjIENvbnZlcnRzIHB0IHRvIHB4XG5leHBvcnRzLnB4ID0gKHB0KSAtPlxuXHRweCA9IHB0ICogbS5kZXZpY2Uuc2NhbGVcblx0cHggPSBNYXRoLnJvdW5kKHB4KVxuXHRyZXR1cm4gcHhcblxuIyMgaU9TIENvbG9yIOKAkyBUaGlzIHdpbGwgc3RvcmUgYWxsIG9mIHRoZSBkZWZhdWx0IGlPUyBjb2xvcnMgaW50ZWFkIG9mIHRoZSBkZWZhdWx0IENTUyBjb2xvcnMuICpUaGlzIGlzIG9ubHkgdXAgaGVyZSBiZWNhdXNlIEkgcmVmZXIgdG8gaXQgaW4gdGhlIGRlZmF1bHRzLipcbmV4cG9ydHMuY29sb3IgPSAoY29sb3JTdHJpbmcpIC0+XG5cdGlmIGNvbG9yU3RyaW5nWzBdID09IFwiI1wiXG5cdFx0cmV0dXJuIGNvbG9yU3RyaW5nXG5cdGVsc2Vcblx0XHRjb2xvciA9ICBuZXcgQ29sb3IobS5saWIuY29sb3JzW2NvbG9yU3RyaW5nXSlcblx0XHRpZiBjb2xvclN0cmluZyA9PSBcInRyYW5zcGFyZW50XCJcblx0XHRcdGNvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0cmV0dXJuIGNvbG9yXG5cbiMgU3VwcG9ydGluZyBGdW5jdGlvbnNcbiMgVXRpbHNcblxuIyBDbGVhbnMgYSBzdHJpbmcgb2YgPGJyPiBhbmQgJm5ic3A7XG5leHBvcnRzLmNsZWFuID0gKHN0cmluZykgLT5cblx0IyMgcmVtb3ZlIHdoaXRlIHNwYWNlXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9bJl1uYnNwWztdL2dpLCBcIiBcIikucmVwbGFjZSgvWzxdYnJbPl0vZ2ksIFwiXCIpXG5cdHJldHVybiBzdHJpbmdcblxuIyBDb252ZXJ0cyBweCdzIG9mIGFuIFNWRyB0byBzY2FsYWJsZSB2YXJpYWJsZXNcbmV4cG9ydHMuc3ZnID0gKHN2ZykgLT5cblx0IyBGaW5kIFN0cmluZ1xuXHRzdGFydEluZGV4ID0gc3ZnLnNlYXJjaChcIjxzdmcgd2lkdGg9XCIpXG5cdGVuZEluZGV4ID0gc3ZnLnNlYXJjaChcIiB2aWV3Qm94XCIpXG5cdHN0cmluZyA9IHN2Zy5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleClcblxuXHQjRmluZCB3aWR0aFxuXHR3U3RhcnRJbmRleCA9IHN0cmluZy5zZWFyY2goXCI9XCIpICsgMlxuXHR3RW5kSW5kZXggPSAgc3RyaW5nLnNlYXJjaChcInB4XCIpXG5cdHdpZHRoID0gc3RyaW5nLnNsaWNlKHdTdGFydEluZGV4LCB3RW5kSW5kZXgpXG5cdG5ld1dpZHRoID0gZXhwb3J0cy5weCh3aWR0aClcblxuXHQjIEZpbmQgSGVpZ2h0XG5cdGhlaWdodFN0cmluZyA9IHN0cmluZy5zbGljZSh3RW5kSW5kZXggKyA0LCBzdHJpbmcubGVuZ3RoKVxuXHRoU3RhcnRJbmRleCA9IGhlaWdodFN0cmluZy5zZWFyY2goXCI9XCIpKyAyXG5cdGhFbmRJbmRleCA9IGhlaWdodFN0cmluZy5zZWFyY2goXCJweFwiKVxuXHRoZWlnaHQgPSBoZWlnaHRTdHJpbmcuc2xpY2UoaFN0YXJ0SW5kZXgsIGhFbmRJbmRleClcblx0bmV3SGVpZ2h0ID0gZXhwb3J0cy5weChoZWlnaHQpXG5cblx0I0NyZWF0ZSBuZXcgc3RyaW5nXG5cdG5ld1N0cmluZyA9IHN0cmluZy5yZXBsYWNlKHdpZHRoLCBuZXdXaWR0aClcblx0bmV3U3RyaW5nID0gbmV3U3RyaW5nLnJlcGxhY2UoaGVpZ2h0LCBuZXdIZWlnaHQpXG5cblx0I1JlcGxhY2Ugc3RyaW5nc1xuXHRzdmcgPSBzdmcucmVwbGFjZShzdHJpbmcsIG5ld1N0cmluZylcblxuXHRyZXR1cm4ge1xuXHRcdHN2Zzpzdmdcblx0XHR3aWR0aDpuZXdXaWR0aFxuXHRcdGhlaWdodDpuZXdIZWlnaHRcblx0fVxuXG4jIENoYW5nZXMgdGhlIGZpbGwgb2YgYW4gU1ZHXG5leHBvcnRzLmNoYW5nZUZpbGwgPSAobGF5ZXIsIGNvbG9yKSAtPlxuXHRpZiB0eXBlb2YgY29sb3IgIT0gXCJvYmplY3RcIlxuXHRcdGNvbG9yID0gZXhwb3J0cy5jb2xvcihjb2xvcilcblx0c3RhcnRJbmRleCA9IGxheWVyLmh0bWwuc2VhcmNoKFwiZmlsbD1cXFwiI1wiKVxuXHRmaWxsU3RyaW5nID0gbGF5ZXIuaHRtbC5zbGljZShzdGFydEluZGV4LCBsYXllci5odG1sLmxlbmd0aClcblx0ZW5kSW5kZXggPSBmaWxsU3RyaW5nLnNlYXJjaChcIlxcXCJcIikgKyA4XG5cdHN0cmluZyA9IGZpbGxTdHJpbmcuc2xpY2UoMCwgZW5kSW5kZXgpXG5cdG5ld1N0cmluZyA9IFwiZmlsbD1cXFwiXCIgKyBjb2xvclxuXHRsYXllci5odG1sID0gbGF5ZXIuaHRtbC5yZXBsYWNlKHN0cmluZywgbmV3U3RyaW5nKVxuXG5leHBvcnRzLmNhcGl0YWxpemUgPSAoc3RyaW5nKSAtPlxuXHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpXG5cbiMgUmV0dXJucyB0aGUgY3VycmVudCB0aW1lXG5leHBvcnRzLmdldFRpbWUgPSAtPlxuXHRkYXlzT2ZUaGVXZWVrID0gW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl1cblx0bW9udGhzT2ZUaGVZZWFyID0gW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIl1cblx0ZGF0ZU9iaiA9IG5ldyBEYXRlKClcblx0bW9udGggPSBtb250aHNPZlRoZVllYXJbZGF0ZU9iai5nZXRNb250aCgpXVxuXHRkYXRlID0gZGF0ZU9iai5nZXREYXRlKClcblx0ZGF5ID0gZGF5c09mVGhlV2Vla1tkYXRlT2JqLmdldERheSgpXVxuXHRob3VycyA9IGRhdGVPYmouZ2V0SG91cnMoKVxuXHRtaW5zID0gZGF0ZU9iai5nZXRNaW51dGVzKClcblx0c2VjcyA9IGRhdGVPYmouZ2V0U2Vjb25kcygpXG5cdHJldHVybiB7XG5cdFx0bW9udGg6bW9udGhcblx0XHRkYXRlOmRhdGVcblx0XHRkYXk6ZGF5XG5cdFx0aG91cnM6aG91cnNcblx0XHRtaW5zOm1pbnNcblx0XHRzZWNzOnNlY3Ncblx0fVxuXG5leHBvcnRzLmJnQmx1ciA9IChsYXllcikgLT5cblx0bGF5ZXIuc3R5bGVbXCItd2Via2l0LWJhY2tkcm9wLWZpbHRlclwiXSA9IFwiYmx1cigje2V4cG9ydHMucHgoNSl9cHgpXCJcblx0cmV0dXJuIGxheWVyXG5cbmV4cG9ydHMudGV4dEF1dG9TaXplID0gKHRleHRMYXllcikgLT5cblx0I0RlZmluZSBXaWR0aFxuXHRjb25zdHJhaW50cyA9IHt9XG5cdGlmIHRleHRMYXllci5jb25zdHJhaW50c1xuXHRcdGlmIHRleHRMYXllci5jb25zdHJhaW50cy5oZWlnaHRcblx0XHRcdGNvbnN0cmFpbnRzLmhlaWdodCA9IGV4cG9ydHMucHgodGV4dExheWVyLmNvbnN0cmFpbnRzLmhlaWdodClcblx0XHRpZiB0ZXh0TGF5ZXIuY29uc3RyYWludHMud2lkdGhcblx0XHRcdGNvbnN0cmFpbnRzLndpZHRoID0gZXhwb3J0cy5weCh0ZXh0TGF5ZXIuY29uc3RyYWludHMud2lkdGgpXG5cblx0c3R5bGVzID1cblx0XHRmb250U2l6ZTogdGV4dExheWVyLnN0eWxlLmZvbnRTaXplXG5cdFx0Zm9udEZhbWlseTogdGV4dExheWVyLnN0eWxlLmZvbnRGYW1pbHlcblx0XHRmb250V2VpZ2h0OiB0ZXh0TGF5ZXIuc3R5bGUuZm9udFdlaWdodFxuXHRcdGZvbnRTdHlsZTogdGV4dExheWVyLnN0eWxlLmZvbnRTdHlsZVxuXHRcdGxpbmVIZWlnaHQ6IHRleHRMYXllci5zdHlsZS5saW5lSGVpZ2h0XG5cdFx0bGV0dGVyU3BhY2luZzogdGV4dExheWVyLnN0eWxlLmxldHRlclNwYWNpbmdcblx0XHR0ZXh0VHJhbnNmb3JtOiB0ZXh0TGF5ZXIuc3R5bGUudGV4dFRyYW5zZm9ybVxuXHR0ZXh0RnJhbWUgPSBVdGlscy50ZXh0U2l6ZSh0ZXh0TGF5ZXIuaHRtbCwgc3R5bGVzLCBjb25zdHJhaW50cylcblx0cmV0dXJuIHtcblx0XHR3aWR0aCA6IHRleHRGcmFtZS53aWR0aFxuXHRcdGhlaWdodDogdGV4dEZyYW1lLmhlaWdodFxuXHR9XG5cbmV4cG9ydHMuZ2V0RGV2aWNlID0gLT5cblx0IyBMb2FkcyB0aGUgaW5pdGlhbCBmcmFtZVxuXHRkZXZpY2UgPSBcIlwiXG5cdGZyYW1lID0gdHJ1ZVxuXHRpZiBtLmxpYi5yZWFsRGV2aWNlc1tpbm5lcldpZHRoXSAmJiBtLmxpYi5yZWFsRGV2aWNlc1tpbm5lcldpZHRoXVtpbm5lckhlaWdodF1cblx0XHRkZXZpY2UgPSBtLmxpYi5yZWFsRGV2aWNlc1tpbm5lcldpZHRoXVtpbm5lckhlaWdodF1cblx0XHRmcmFtZSA9IGZhbHNlXG5cdFx0RnJhbWVyLkRldmljZS5kZXZpY2VUeXBlID0gXCJmdWxsc2NyZWVuXCJcblxuXHRpZiBmcmFtZVxuXHRcdGRldmljZSA9XG5cdFx0XHRuYW1lOiBGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVcblx0XHRcdHdpZHRoIDogIEZyYW1lci5EZXZpY2VWaWV3LkRldmljZXNbRnJhbWVyLkRldmljZS5kZXZpY2VUeXBlXS5zY3JlZW5XaWR0aFxuXHRcdFx0aGVpZ2h0OiAgRnJhbWVyLkRldmljZVZpZXcuRGV2aWNlc1tGcmFtZXIuRGV2aWNlLmRldmljZVR5cGVdLnNjcmVlbkhlaWdodFxuXHRcdFx0c2NhbGU6IG0ubGliLmZyYW1lckZyYW1lc1tGcmFtZXIuRGV2aWNlVmlldy5EZXZpY2VzW0ZyYW1lci5EZXZpY2UuZGV2aWNlVHlwZV0uc2NyZWVuV2lkdGhdXG5cblx0aWYgZGV2aWNlLnNjYWxlID09IHVuZGVmaW5lZFxuXHRcdGRldmljZS5zY2FsZSA9IDJcblx0aWYgZGV2aWNlLndpZHRoID09IHVuZGVmaW5lZFxuXHRcdGRldmljZS53aWR0aCA9IGlubmVyV2lkdGhcblx0aWYgZGV2aWNlLmhlaWdodCA9PSB1bmRlZmluZWRcblx0XHRkZXZpY2UuaGVpZ2h0ID0gaW5uZXJIZWlnaHRcblxuXHRyZXR1cm4gZGV2aWNlXG5cblxuIyBTcGVjaWFsIENoYXJhY3RlcnNcbmV4cG9ydHMuc3BlY2lhbENoYXIgPSAobGF5ZXIpIC0+XG5cdHRleHQgPSBsYXllclxuXHRpZiBsYXllci50eXBlID09IFwiYnV0dG9uXCJcblx0XHR0ZXh0ID0gbGF5ZXIubGFiZWxcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItYlwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1iIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2ZvbnRXZWlnaHQ6NjAwfV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLXJcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItciBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcInJlZFwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLXJiXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLXJiIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwiYmx1ZVwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLWxiXCIpICE9IC0xXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5yZXBsYWNlKFwiLWxiIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwibGlnaHQtYmx1ZVwifV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLWdcIikgIT0gLTFcblx0XHRuZXdUZXh0ID0gdGV4dC5odG1sLnJlcGxhY2UoXCItZyBcIiwgXCJcIilcblx0XHRleHBvcnRzLnVwZGF0ZSh0ZXh0LCBbe3RleHQ6bmV3VGV4dH0sIHtjb2xvcjpcImdyZWVuXCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItb1wiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1vIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwib3JhbmdlXCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItcFwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi1wIFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwib3JhbmdlXCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCIteVwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi15IFwiLCBcIlwiKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOlwieWVsbG93XCJ9XSlcblx0aWYgdGV4dC5odG1sLmluZGV4T2YoXCItI1wiKSAhPSAtMVxuXHRcdGNob3NlbkNvbG9yID0gdGV4dC5odG1sLnNsaWNlKDEsIDgpXG5cdFx0bmV3VGV4dCA9IHRleHQuaHRtbC5zbGljZSg5LCB0ZXh0Lmh0bWwubGVuZ3RoKVxuXHRcdGV4cG9ydHMudXBkYXRlKHRleHQsIFt7dGV4dDpuZXdUZXh0fSwge2NvbG9yOmNob3NlbkNvbG9yfV0pXG5cdGlmIHRleHQuaHRtbC5pbmRleE9mKFwiLVwiKSAhPSAtMVxuXHRcdG5ld1RleHQgPSB0ZXh0Lmh0bWwucmVwbGFjZShcIi0gXCIsIFwiXCIpXG5cdFx0ZXhwb3J0cy51cGRhdGUodGV4dCwgW3t0ZXh0Om5ld1RleHR9XSlcblx0aWYgbGF5ZXIuYnV0dG9uVHlwZSA9PSBcInRleHRcIlxuXHRcdGxheWVyLndpZHRoID0gdGV4dC53aWR0aFxuXHRtLmxheW91dC5zZXQoKVxuXG5leHBvcnRzLnVwZGF0ZSA9IChsYXllciwgYXJyYXkpIC0+XG5cdGlmIGFycmF5ID09IHVuZGVmaW5lZFxuXHRcdGFycmF5ID0gW11cblx0aWYgbGF5ZXIudHlwZSA9PSBcInRleHRcIlxuXHRcdGZvciBjaGFuZ2UgaW4gYXJyYXlcblx0XHRcdGtleSA9IE9iamVjdC5rZXlzKGNoYW5nZSlbMF1cblx0XHRcdHZhbHVlID0gY2hhbmdlW2tleV1cblx0XHRcdGlmIGtleSA9PSBcInRleHRcIlxuXHRcdFx0XHRsYXllci5odG1sID0gdmFsdWVcblx0XHRcdGlmIGtleSA9PSBcImZvbnRXZWlnaHRcIlxuXHRcdFx0XHRsYXllci5zdHlsZVtrZXldID0gdmFsdWVcblx0XHRcdGlmIGtleSA9PSBcImNvbG9yXCJcblx0XHRcdFx0bGF5ZXIuY29sb3IgPSBleHBvcnRzLmNvbG9yKHZhbHVlKVxuXG5cdFx0dGV4dEZyYW1lID0gZXhwb3J0cy50ZXh0QXV0b1NpemUobGF5ZXIpXG5cdFx0bGF5ZXIud2lkdGggPSB0ZXh0RnJhbWUud2lkdGhcblx0XHRsYXllci5oZWlnaHQgPSB0ZXh0RnJhbWUuaGVpZ2h0XG5cblxuXHRtLmxheW91dC5zZXQoKVxuXG4jIERlY2lkZXMgaWYgaXQgc2hvdWxkIGJlIHdoaXRlL2JsYWNrIHRleHRcbmV4cG9ydHMuYXV0b0NvbG9yID0gKGNvbG9yT2JqZWN0KSAtPlxuXHRyZ2IgPSBjb2xvck9iamVjdC50b1JnYlN0cmluZygpXG5cdHJnYiA9IHJnYi5zdWJzdHJpbmcoNCwgcmdiLmxlbmd0aC0xKVxuXHRyZ2IgPSByZ2IucmVwbGFjZSgvIC9nLCAnJylcblx0cmdiID0gcmdiLnJlcGxhY2UoLyAvZywgJycpXG5cdHJnYiA9IHJnYi5zcGxpdCgnLCcpXG5cdHJlZCA9IHJnYlswXVxuXHRncmVlbiA9IHJnYlsxXVxuXHRibHVlID0gcmdiWzJdXG5cdGNvbG9yID0gXCJcIlxuXHRpZiAocmVkKjAuMjk5ICsgZ3JlZW4qMC41ODcgKyBibHVlKjAuMTE0KSA+IDE4NlxuXHRcdGNvbG9yID0gZXhwb3J0cy5jb2xvcihcImJsYWNrXCIpXG5cdGVsc2Vcblx0XHRjb2xvciA9IGV4cG9ydHMuY29sb3IoXCJ3aGl0ZVwiKVxuXHRyZXR1cm4gY29sb3JcblxuZXhwb3J0cy5zYW1lUGFyZW50ID0gKGxheWVyMSwgbGF5ZXIyKSAtPlxuXHRwYXJlbnRPbmUgPSBsYXllcjEuc3VwZXJMYXllclxuXHRwYXJlbnRUd28gPSBsYXllcjIuc3VwZXJMYXllclxuXHRpZiBwYXJlbnRPbmUgPT0gcGFyZW50VHdvXG5cdFx0cmV0dXJuIHRydWVcblx0ZWxzZVxuXHRcdHJldHVybiBmYWxzZVxuXG5cbmV4cG9ydHMudGltZURlbGVnYXRlID0gKGxheWVyLCBjbG9ja1R5cGUpIC0+XG5cdEB0aW1lID0gZXhwb3J0cy5nZXRUaW1lKClcblx0VXRpbHMuZGVsYXkgNjAgLSBAdGltZS5zZWNzLCAtPlxuXHRcdEB0aW1lID0gZXhwb3J0cy5nZXRUaW1lKClcblx0XHRleHBvcnRzLnVwZGF0ZShsYXllciwgW3RleHQ6ZXhwb3J0cy50aW1lRm9ybWF0dGVyKEB0aW1lLCBjbG9ja1R5cGUpXSlcblx0XHRVdGlscy5pbnRlcnZhbCA2MCwgLT5cblx0XHRcdEB0aW1lID0gZXhwb3J0cy5nZXRUaW1lKClcblx0XHRcdGV4cG9ydHMudXBkYXRlKGxheWVyLCBbdGV4dDpleHBvcnRzLnRpbWVGb3JtYXR0ZXIoQHRpbWUsIGNsb2NrVHlwZSldKVxuXG5leHBvcnRzLnRpbWVGb3JtYXR0ZXIgPSAodGltZU9iaiwgY2xvY2tUeXBlKSAtPlxuXHRpZiBjbG9ja1R5cGUgPT0gZmFsc2Vcblx0XHRpZiB0aW1lT2JqLmhvdXJzID4gMTJcblx0XHRcdHRpbWVPYmouaG91cnMgPSB0aW1lT2JqLmhvdXJzIC0gMTJcblx0XHRpZiB0aW1lT2JqLmhvdXJzID09IDAgdGhlbiB0aW1lT2JqLmhvdXJzID0gMTJcblx0aWYgdGltZU9iai5taW5zIDwgMTBcblx0XHR0aW1lT2JqLm1pbnMgPSBcIjBcIiArIHRpbWVPYmoubWluc1xuXHRyZXR1cm4gdGltZU9iai5ob3VycyArIFwiOlwiICsgdGltZU9iai5taW5zXG5cbmV4cG9ydHMuc2V0dXBDb21wb25lbnQgPSAoYXJyYXksIGRlZmF1bHRzKSAtPlxuXHRpZiBhcnJheSA9PSB1bmRlZmluZWRcblx0XHRhcnJheSA9IFtdXG5cdG9iaiA9IHt9XG5cdGZvciBpIGluIGRlZmF1bHRzLnByb3BzXG5cdFx0aWYgYXJyYXlbaV0gIT0gdW5kZWZpbmVkXG5cdFx0XHRvYmpbaV0gPSBhcnJheVtpXVxuXHRcdGVsc2Vcblx0XHRcdG9ialtpXSA9IGRlZmF1bHRzW2ldXG5cdHJldHVybiBvYmpcblxuXG5leHBvcnRzLmVtb2ppRm9ybWF0dGVyID0gKHN0cmluZykgLT5cblx0XHR1bmljb2RlRm9ybWF0ID0gXCJcIlxuXHRcdGlmIHN0cmluZ1swXSA9PSBcIkVcIiB8fCBzdHJpbmdbMF0gPT0gXCIzXCIgfHwgc3RyaW5nWzBdID09IFwiMlwiIHx8IHN0cmluZ1swXSA9PSBcIkNcIlxuXHRcdFx0YXJyYXlPZkNvZGVzID0gc3RyaW5nLnNwbGl0KFwiIFwiKVxuXHRcdFx0Zm9yIGNvZGUgaW4gYXJyYXlPZkNvZGVzXG5cdFx0XHRcdHVuaWNvZGVGb3JtYXQgPSB1bmljb2RlRm9ybWF0ICsgXCIlXCIgKyBjb2RlXG5cdFx0ZWxzZVxuXHRcdFx0YXJyYXlPZkNvZGVzID0gc3RyaW5nLnNwbGl0KFwiIFwiKVxuXHRcdFx0dW5pY29kZUZvcm1hdCA9IFwiJUYwJTlGXCJcblx0XHRcdGZvciBjb2RlIGluIGFycmF5T2ZDb2Rlc1xuXHRcdFx0XHR1bmljb2RlRm9ybWF0ID0gdW5pY29kZUZvcm1hdCArIFwiJVwiICsgY29kZVxuXHRcdGRlY29kZWQgPSBkZWNvZGVVUklDb21wb25lbnQodW5pY29kZUZvcm1hdClcblx0XHRyZXR1cm4gZGVjb2RlZFxuXG5leHBvcnRzLmJ1aWxkRW1vamlzT2JqZWN0ID0gKCkgLT5cblx0ZW1vamlzID0gW11cblx0Zm9yIGNvZGUsIGluZGV4IGluIG0uYXNzZXRzLmVtb2ppQ29kZXNcblx0XHRlbW9qaSA9IGV4cG9ydHMuZW1vamlGb3JtYXR0ZXIoY29kZSlcblx0XHRlbW9qaXMucHVzaCBlbW9qaVxuXG5leHBvcnRzLnRvSEhNTVNTID0gKGludCkgLT5cbiAgc2VjX251bSA9IHBhcnNlSW50KGludCwgMTApXG4gIGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY19udW0gLyAzNjAwKTtcbiAgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY19udW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gIHNlY29uZHMgPSBzZWNfbnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICBpZiAoaG91cnMgICA8IDEwKSB0aGVuIGhvdXJzICAgPSBcIjBcIitob3Vyc1xuICBpZiAobWludXRlcyA8IDEwKSB0aGVuIG1pbnV0ZXMgPSBcIlwiK21pbnV0ZXNcbiAgaWYgKHNlY29uZHMgPCAxMCkgdGhlbiBzZWNvbmRzID0gXCIwXCIrc2Vjb25kc1xuICB0aW1lU3RyaW5nID0gXCJcIlxuICBpZiBob3VycyAhPSBcIjAwXCJcbiAgICB0aW1lU3RyaW5nID0gaG91cnMrJzonK21pbnV0ZXMrJzonK3NlY29uZHNcbiAgZWxzZVxuICAgIHRpbWVTdHJpbmcgPSBtaW51dGVzKyc6JytzZWNvbmRzXG5cbiAgcmV0dXJuIHRpbWVTdHJpbmdcblxuI2xheWVyLCBtb3ZlVG9UYXAsIGNvbG9yLCBzY2FsZSwgY3VydmVcbmV4cG9ydHMuaW5reSA9IChzZXR1cCkgLT5cblx0c3RhcnRYID0gc2V0dXAubGF5ZXIud2lkdGgvMlxuXHRzdGFydFkgPSBzZXR1cC5sYXllci5oZWlnaHQvMlxuXG5cdGlua0NvbG9yID0gXCIjMEEwQTBBXCJcblx0aW5rU3RhcnRTY2FsZSA9IC4xXG5cdGlua1NjYWxlID0gM1xuXHRpbmtDdXJ2ZSA9IFwiYmV6aWVyLWN1cnZlKC4yLCAwLjQsIDAuNCwgMS4wKVwiXG5cdGlua09wYWNpdHkgPSAxXG5cdG1vdmVUb1RhcCA9IHRydWVcblxuXHRpZiBzZXR1cC5tb3ZlVG9UYXAgIT0gdW5kZWZpbmVkXG5cdFx0bW92ZVRvVGFwID0gc2V0dXAubW92ZVRvVGFwXG5cblx0aWYgc2V0dXAuY29sb3IgIT0gdW5kZWZpbmVkXG5cdFx0aW5rQ29sb3IgPSBtLmNvbG9yKHNldHVwLmNvbG9yKVxuXG5cdGlmIHNldHVwLnNjYWxlICE9IHVuZGVmaW5lZFxuXHRcdGlua1NjYWxlID0gc2V0dXAuc2NhbGVcblxuXHRpZiBzZXR1cC5zdGFydFNjYWxlICE9IHVuZGVmaW5lZFxuXHRcdGlua1N0YXJ0U2NhbGUgPSBzZXR1cC5zdGFydFNjYWxlXG5cblx0aWYgc2V0dXAuY3VydmUgIT0gdW5kZWZpbmVkXG5cdFx0aW5rQ3VydmUgPSBzZXR1cC5jdXJ2ZVxuXG5cdGlmIHNldHVwLm9wYWNpdHkgIT0gdW5kZWZpbmVkXG5cdFx0aW5rT3BhY2l0eSA9IHNldHVwLm9wYWNpdHlcblxuXHRpbmt5RWZmZWN0ID0gKGV2ZW50LCBsYXllcikgLT5cblx0XHRpZiBtb3ZlVG9UYXAgPT0gdHJ1ZVxuXHRcdFx0c3RhcnRYID0gZXZlbnQub2Zmc2V0WFxuXHRcdFx0c3RhcnRZID0gZXZlbnQub2Zmc2V0WVxuXG5cdFx0XHRpZiBVdGlscy5pc0Nocm9tZSgpID09IGZhbHNlICYmIFV0aWxzLmlzVG91Y2goKVxuXHRcdFx0XHRzdGFydFggPSBldmVudC50b3VjaENlbnRlci54IC0gbGF5ZXIueFxuXHRcdFx0XHRzdGFydFkgPSBldmVudC50b3VjaENlbnRlci55IC0gbGF5ZXIueVxuXG5cdFx0Y2lyY2xlID0gbmV3IExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6aW5rQ29sb3Jcblx0XHRcdG1pZFg6c3RhcnRYXG5cdFx0XHRtaWRZOnN0YXJ0WVxuXHRcdFx0c3VwZXJMYXllcjpsYXllclxuXHRcdFx0Ym9yZGVyUmFkaXVzOm0udXRpbHMucHgoNTApXG5cdFx0XHRvcGFjaXR5OiBpbmtPcGFjaXR5XG5cblx0XHRjaXJjbGUuc2NhbGUgPSBpbmtTdGFydFNjYWxlXG5cdFx0Y2lyY2xlLmFuaW1hdGVcblx0XHRcdHByb3BlcnRpZXM6KHNjYWxlOmlua1NjYWxlLCBvcGFjaXR5OjApXG5cdFx0XHRjdXJ2ZTppbmtDdXJ2ZVxuXHRcdFx0dGltZTouNVxuXHRcdFV0aWxzLmRlbGF5IDEsIC0+XG5cdFx0XHRjaXJjbGUuZGVzdHJveSgpXG5cblx0aWYgVXRpbHMuaXNDaHJvbWUoKSAmJiBVdGlscy5pc1RvdWNoKClcblx0XHRzZXR1cC5sYXllci5vbiBFdmVudHMuRG91YmxlVGFwLCAoZXZlbnQpIC0+XG5cdFx0XHRpbmt5RWZmZWN0KGV2ZW50LCBAKVxuXHRpZiBVdGlscy5pc0Nocm9tZSgpID09IGZhbHNlICYmIFV0aWxzLmlzVG91Y2goKVxuXHRcdHNldHVwLmxheWVyLm9uIEV2ZW50cy5UYXAsIChldmVudCkgLT5cblx0XHRcdGlua3lFZmZlY3QoZXZlbnQsIEApXG5cdGlmIFV0aWxzLmlzRGVza3RvcCgpXG5cdFx0c2V0dXAubGF5ZXIub24gRXZlbnRzLlRvdWNoRW5kLCAoZXZlbnQpIC0+XG5cdFx0XHRpbmt5RWZmZWN0KGV2ZW50LCBAKVxuIiwibSA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdCdcblxuZXhwb3J0cy5kZWZhdWx0cyA9IHtcbiAgdmlkZW86dW5kZWZpbmVkXG4gIHN1cGVyTGF5ZXI6dW5kZWZpbmVkXG4gIGhlaWdodDptLnB4KDIwNSlcbiAgd2lkdGg6bS5weCgxMDApXG4gIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcbiAgYXV0b3BsYXk6dHJ1ZVxuICBjb25zdHJhaW50czp7dG9wOjB9XG4gIG1heDp0cnVlXG4gIHByb2dyZXNzQ29sb3I6IFwiYmx1ZTgwMFwiXG4gIG11dGU6ZmFsc2VcbiAgbG9vcDpmYWxzZVxuICBpZGxlTGltaXQ6M1xuICBzaG93UGxheVN0b3A6dHJ1ZVxuICBpbWFnZTp1bmRlZmluZWRcbn1cblxuZXhwb3J0cy5kZWZhdWx0cy5wcm9wcyA9IE9iamVjdC5rZXlzKGV4cG9ydHMuZGVmYXVsdHMpXG5cbmV4cG9ydHMuY3JlYXRlID0gKGFycmF5KSAtPlxuICBzZXR1cCA9IG0udXRpbHMuc2V0dXBDb21wb25lbnQoYXJyYXksIGV4cG9ydHMuZGVmYXVsdHMpXG4gIGlmIHNldHVwLm1heFxuICAgICAgcmF0aW8gPSAwLjU2MjVcbiAgICAgIHNldHVwLndpZHRoID0gbS5kZXZpY2Uud2lkdGhcbiAgICAgIHNldHVwLmhlaWdodCA9IHNldHVwLndpZHRoICogMC41NjI1XG5cbiAgdmlkZW9MYXllciA9IG5ldyBWaWRlb0xheWVyXG4gICAgc3VwZXJMYXllcjpzZXR1cC5zdXBlckxheWVyXG4gICAgdmlkZW86c2V0dXAudmlkZW9cbiAgICBoZWlnaHQ6c2V0dXAuaGVpZ2h0XG4gICAgd2lkdGg6c2V0dXAud2lkdGhcbiAgICBiYWNrZ3JvdW5kQ29sb3I6c2V0dXAuYmFja2dyb3VuZENvbG9yXG4gICAgbmFtZTpcInZpZGVvXCJcblxuICBpZiBzZXR1cC5pbWFnZVxuICAgIHZpZGVvTGF5ZXIuaW1hZ2UgPSBzZXR1cC5pbWFnZVxuXG4gIHZpZGVvTGF5ZXIucGxheWVyLmF1dG9wbGF5ID0gc2V0dXAuYXV0b3BsYXlcbiAgdmlkZW9MYXllci5wbGF5ZXIubXV0ZWQgPSBzZXR1cC5tdXRlXG4gIHZpZGVvTGF5ZXIucGxheWVyLmxvb3AgPSBzZXR1cC5sb29wXG5cbiAgaWYgc2V0dXAuY29uc3RyYWludHNcbiAgICB2aWRlb0xheWVyLmNvbnN0cmFpbnRzID0gc2V0dXAuY29uc3RyYWludHNcbiAgICBtLmxheW91dC5zZXQodmlkZW9MYXllcilcblxuICB2aWRlb0xheWVyLmNvbnRyb2xzID0gbmV3IExheWVyXG4gICAgaGVpZ2h0OnZpZGVvTGF5ZXIuaGVpZ2h0XG4gICAgd2lkdGg6dmlkZW9MYXllci53aWR0aFxuICAgIHN1cGVyTGF5ZXI6dmlkZW9MYXllclxuICAgIGJhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCJcbiAgICBuYW1lOlwiY29udHJvbHNcIlxuXG4gIFVJc2V0ID0gLT5cbiAgICB2aWRlb0xheWVyLmlzRnVsbFNjcmVlbiA9IGZhbHNlXG4gICAgdmlkZW9MYXllci5wbGF5c3RvcCA9IG5ldyBMYXllclxuICAgICAgYmFja2dyb3VuZENvbG9yOm0uY29sb3IoXCJibGFja1wiKVxuICAgICAgc3VwZXJMYXllcjp2aWRlb0xheWVyLmNvbnRyb2xzXG4gICAgICBib3JkZXJSYWRpdXM6bS5weCg1MClcbiAgICAgIGhlaWdodDptLnB4KDUwKVxuICAgICAgd2lkdGg6bS5weCg1MClcbiAgICAgIG9wYWNpdHk6LjZcbiAgICAgIG5hbWU6XCJwbGF5L3N0b3BcIlxuICAgIGlmIHNldHVwLnNob3dQbGF5U3RvcCA9PSBmYWxzZVxuICAgICAgdmlkZW9MYXllci5wbGF5c3RvcC5vcGFjaXR5ID0gMFxuICAgIHZpZGVvTGF5ZXIucGxheXN0b3AuY2VudGVyKClcblxuICAgIHZpZGVvTGF5ZXIucGF1c2UgPSBuZXcgbS5JY29uXG4gICAgXHRuYW1lOlwicGF1c2VcIlxuICAgIFx0Y29sb3I6XCJ3aGl0ZVwiXG5cbiAgICB2aWRlb0xheWVyLnBsYXkgPSBuZXcgbS5JY29uXG4gICAgXHRuYW1lOlwicGxheV9hcnJvd1wiXG4gICAgXHRjb2xvcjpcIndoaXRlXCJcblxuICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbiA9IG5ldyBtLkljb25cbiAgICBcdG5hbWU6XCJmdWxsc2NyZWVuXCJcbiAgICBcdGNvbG9yOlwid2hpdGVcIlxuXG4gICAgdmlkZW9MYXllci5mdWxsc2NyZWVuLmNvbnN0cmFpbnRzID1cbiAgICAgIGJvdHRvbTowXG4gICAgICB0cmFpbGluZzoxMFxuXG4gICAgdmlkZW9MYXllci5mdWxsc2NyZWVuRXhpdCA9IG5ldyBtLkljb25cbiAgICBcdG5hbWU6XCJmdWxsc2NyZWVuX2V4aXRcIlxuICAgIFx0Y29sb3I6XCJ3aGl0ZVwiXG5cbiAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW5FeGl0LmNvbnN0cmFpbnRzID1cbiAgICAgIGJvdHRvbTowXG4gICAgICB0cmFpbGluZzoxMFxuXG4gICAgbS5sYXlvdXQuc2V0KHZpZGVvTGF5ZXIuZnVsbHNjcmVlbilcblxuICAgIHZpZGVvTGF5ZXIucGxheS52aXNpYmxlID0gZmFsc2VcbiAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW5FeGl0LnZpc2libGUgPSBmYWxzZVxuXG4gICAgdmlkZW9MYXllci5jb250cm9scy5hZGRTdWJMYXllcih2aWRlb0xheWVyLnBhdXNlKVxuICAgIHZpZGVvTGF5ZXIuY29udHJvbHMuYWRkU3ViTGF5ZXIodmlkZW9MYXllci5wbGF5KVxuICAgIHZpZGVvTGF5ZXIuY29udHJvbHMuYWRkU3ViTGF5ZXIodmlkZW9MYXllci5mdWxsc2NyZWVuKVxuICAgIHZpZGVvTGF5ZXIuY29udHJvbHMuYWRkU3ViTGF5ZXIodmlkZW9MYXllci5mdWxsc2NyZWVuRXhpdClcbiAgICB2aWRlb0xheWVyLnBhdXNlLmNlbnRlcigpXG4gICAgdmlkZW9MYXllci5wbGF5LmNlbnRlcigpXG5cblxuICAgIHZpZGVvTGF5ZXIuY3VycmVudFRpbWUgPSBuZXcgbS5UZXh0XG4gICAgICB0ZXh0Om0udXRpbHMudG9ISE1NU1ModmlkZW9MYXllci5wbGF5ZXIuY3VycmVudFRpbWUpXG4gICAgICBjb2xvcjpcIndoaXRlXCJcbiAgICAgIGNvbnN0cmFpbnRzOntib3R0b206OCwgbGVhZGluZzoxN31cbiAgICAgIHN1cGVyTGF5ZXI6dmlkZW9MYXllci5jb250cm9sc1xuICAgICAgZm9udFNpemU6MTRcbiAgICAgIG5hbWU6XCJjdXJyZW50VGltZVwiXG5cbiAgICB2aWRlb0xheWVyLmVuZFRpbWUgPSBuZXcgbS5UZXh0XG4gICAgICB0ZXh0Om0udXRpbHMudG9ISE1NU1ModmlkZW9MYXllci5wbGF5ZXIuZHVyYXRpb24pXG4gICAgICBjb2xvcjpcIndoaXRlXCJcbiAgICAgIGNvbnN0cmFpbnRzOntib3R0b21FZGdlczp2aWRlb0xheWVyLmN1cnJlbnRUaW1lLCB0cmFpbGluZzpbdmlkZW9MYXllci5mdWxsc2NyZWVuLCAxMF19XG4gICAgICBzdXBlckxheWVyOnZpZGVvTGF5ZXIuY29udHJvbHNcbiAgICAgIGZvbnRTaXplOjE0XG4gICAgICBuYW1lOlwiZW5kVGltZVwiXG5cbiAgICB2aWRlb0xheWVyLnRpbWViYXIgPSBuZXcgTGF5ZXJcbiAgICAgIHN1cGVyTGF5ZXI6dmlkZW9MYXllci5jb250cm9sc1xuICAgICAgYmFja2dyb3VuZENvbG9yOm0uY29sb3IoXCJncmV5MzAwXCIpXG4gICAgICBuYW1lOlwidGltZWJhclwiXG4gICAgICBvcGFjaXR5Oi43XG5cbiAgICB2aWRlb0xheWVyLnRpbWViYXIuY29uc3RyYWludHMgPVxuICAgICAgbGVhZGluZzpbdmlkZW9MYXllci5jdXJyZW50VGltZSwgMjBdXG4gICAgICB0cmFpbGluZzpbdmlkZW9MYXllci5lbmRUaW1lLCAyMF1cbiAgICAgIGhlaWdodDozXG4gICAgICB2ZXJ0aWNhbENlbnRlcjp2aWRlb0xheWVyLmN1cnJlbnRUaW1lXG4gICAgbS5sYXlvdXQuc2V0KHZpZGVvTGF5ZXIudGltZWJhcilcblxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyID0gbmV3IExheWVyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiXG4gICAgICBzdXBlckxheWVyOnZpZGVvTGF5ZXIuY29udHJvbHNcbiAgICAgIG5hbWU6XCJzZWVrZXJcIlxuXG4gICAgdmlkZW9MYXllci5zZWVrZXIuY29uc3RyYWludHMgPVxuICAgICAgd2lkdGg6NTBcbiAgICAgIGhlaWdodDo1MFxuICAgICAgdmVydGljYWxDZW50ZXI6dmlkZW9MYXllci5jdXJyZW50VGltZVxuICAgIG0ubGF5b3V0LnNldCh2aWRlb0xheWVyLnNlZWtlcilcblxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyRG90ID0gbmV3IExheWVyXG4gICAgICB3aWR0aDptLnB4KDE1KVxuICAgICAgaGVpZ2h0Om0ucHgoMTUpXG4gICAgICBib3JkZXJSYWRpdXM6bS5weCgxNSlcbiAgICAgIGJhY2tncm91bmRDb2xvcjptLmNvbG9yKHNldHVwLnByb2dyZXNzQ29sb3IpXG4gICAgICBzdXBlckxheWVyOnZpZGVvTGF5ZXIuc2Vla2VyXG4gICAgICBuYW1lOlwic2Vla2VyRG90XCJcblxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyRG90LmNlbnRlcigpXG5cbiAgICB2aWRlb0xheWVyLnByb2dyZXNzQmFyID0gbmV3IExheWVyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6bS5jb2xvcihzZXR1cC5wcm9ncmVzc0NvbG9yKVxuICAgICAgd2lkdGg6MFxuICAgICAgc3VwZXJMYXllcjp2aWRlb0xheWVyLmNvbnRyb2xzXG4gICAgICBuYW1lOlwicHJvZ3Jlc3MgYmFyXCJcblxuICAgIHZpZGVvTGF5ZXIucHJvZ3Jlc3NCYXIuY29uc3RyYWludHMgPVxuICAgICAgaGVpZ2h0OjNcbiAgICAgIHZlcnRpY2FsQ2VudGVyOnZpZGVvTGF5ZXIudGltZWJhclxuXG4gICAgbS5sYXlvdXQuc2V0KHRhcmdldDpbdmlkZW9MYXllci5zZWVrZXIsIHZpZGVvTGF5ZXIucHJvZ3Jlc3NCYXJdKVxuXG4gICAgdmlkZW9MYXllci5zZWVrZXJPZmZzZXQgPSAodmlkZW9MYXllci5zZWVrZXIud2lkdGgvMiAtIHZpZGVvTGF5ZXIuc2Vla2VyRG90LndpZHRoLzIpXG4gICAgdmlkZW9MYXllci5zZWVrZXIueCA9IHZpZGVvTGF5ZXIudGltZWJhci54IC0gdmlkZW9MYXllci5zZWVrZXJPZmZzZXRcbiAgICB2aWRlb0xheWVyLnByb2dyZXNzQmFyLnggPSB2aWRlb0xheWVyLnRpbWViYXIueFxuXG4gICAgI0hhbmRsZSBJZGVsbmVzc1xuICAgIGlkbGVUaW1lID0gMFxuICAgIFV0aWxzLmludGVydmFsIDEsIC0+XG4gICAgICBpZGxlVGltZSsrXG4gICAgICBpZiBpZGxlVGltZSA+IHNldHVwLmlkbGVMaW1pdCAmJiB2aWRlb0xheWVyLnBsYXllci5wYXVzZWQgPT0gZmFsc2UgJiYgdmlkZW9MYXllci5zZWVrZXIud29ya2luZyAhPSB0cnVlXG4gICAgICAgIHZpZGVvTGF5ZXIuY29udHJvbHMuYW5pbWF0ZVxuICAgICAgICAgIHByb3BlcnRpZXM6KG9wYWNpdHk6MClcbiAgICAgICAgICB0aW1lOi4yNVxuICAgICAgICB2aWRlb0xheWVyLnBsYXlzdG9wLnZpc2libGUgPSBmYWxzZVxuICAgICAgZWxzZVxuICAgICAgICB2aWRlb0xheWVyLmNvbnRyb2xzLm9wYWNpdHkgPSAxXG4gICAgICAgIHZpZGVvTGF5ZXIucGxheXN0b3AudmlzaWJsZSA9IHRydWVcblxuICAgIHZpZGVvTGF5ZXIuY29udHJvbHMub24gRXZlbnRzLlRvdWNoU3RhcnQsIC0+XG4gICAgICBpZiBpZGxlVGltZSA+IHNldHVwLmlkbGVMaW1pdFxuICAgICAgICBpZGxlVGltZSA9IDBcbiAgICAgIGVsc2VcbiAgICAgICAgaWRsZVRpbWUgPSA1XG5cbiAgICB2aWRlb0xheWVyLnBsYXlzdG9wLm9uIEV2ZW50cy5Ub3VjaEVuZCwgLT5cbiAgICAgIGlmIHZpZGVvTGF5ZXIucGxheWVyLnBhdXNlZFxuICAgICAgICB2aWRlb0xheWVyLnBsYXkudmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIHZpZGVvTGF5ZXIucGF1c2UudmlzaWJsZSA9IHRydWVcbiAgICAgICAgdmlkZW9MYXllci5wbGF5ZXIucGxheSgpXG4gICAgICBlbHNlXG4gICAgICAgIHZpZGVvTGF5ZXIucGxheS52aXNpYmxlID0gdHJ1ZVxuICAgICAgICB2aWRlb0xheWVyLnBhdXNlLnZpc2libGUgPSBmYWxzZVxuICAgICAgICB2aWRlb0xheWVyLnBsYXllci5wYXVzZSgpXG5cbiAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW4ub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuICAgICAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW4udmlzaWJsZSA9IGZhbHNlXG4gICAgICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbkV4aXQudmlzaWJsZSA9IHRydWVcbiAgICAgICAgdmlkZW9MYXllci5jYWNoZVByb3BzID0gdmlkZW9MYXllci5wcm9wc1xuICAgICAgICB2aWRlb0xheWVyLmNhY2hlQWxpZ24gPSB2aWRlb0xheWVyLmNvbnN0cmFpbnRzLmFsaWduXG5cbiAgICAgICAgaWYgdmlkZW9MYXllci5vbkZ1bGxTY3JlZW5cbiAgICAgICAgICB2aWRlb0xheWVyLm9uRnVsbFNjcmVlbigpXG5cbiAgICAgICAgaWRsZVRpbWUgPSAwXG4gICAgICAgIHZpZGVvTGF5ZXIuYmFja2Ryb3AgPSBuZXcgTGF5ZXJcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6XCJibGFja1wiXG4gICAgICAgICAgd2lkdGg6bS5kZXZpY2Uud2lkdGhcbiAgICAgICAgICBoZWlnaHQ6bS5kZXZpY2UuaGVpZ2h0XG4gICAgICAgICAgbmFtZTpcImJhY2tkcm9wXCJcbiAgICAgICAgdmlkZW9MYXllci5jb25zdHJhaW50cy5hbGlnbiA9IFwiY2VudGVyXCJcblxuICAgICAgICB2aWRlb0xheWVyLmFuaW1hdGVcbiAgICAgICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICAgICAgd2lkdGg6IG0uZGV2aWNlLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ6IG0uZGV2aWNlLndpZHRoICogMC41NjI1XG4gICAgICAgICAgdGltZTouNVxuICAgICAgICBtLmxheW91dC5hbmltYXRlXG4gICAgICAgICAgdGFyZ2V0OnZpZGVvTGF5ZXJcbiAgICAgICAgICB0aW1lOi41XG4gICAgICAgIGlmIHNldHVwLnN1cGVyTGF5ZXJcbiAgICAgICAgICB2aWRlb0xheWVyLmJhY2tkcm9wLnN1cGVyTGF5ZXIgPSBzZXR1cC5zdXBlckxheWVyXG4gICAgICAgICAgdmlkZW9MYXllci5iYWNrZHJvcC5wbGFjZUJlaGluZCh2aWRlb0xheWVyKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgdmlkZW9MYXllci5iYWNrZHJvcC5wbGFjZUJlaGluZCh2aWRlb0xheWVyKVxuICAgICAgICBtLmFkZFRvU3RhY2sodmlkZW9MYXllcilcblxuICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbkV4aXQub24gRXZlbnRzLlRvdWNoRW5kLCAtPlxuICAgICAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW4udmlzaWJsZSA9IHRydWVcbiAgICAgICAgdmlkZW9MYXllci5mdWxsc2NyZWVuRXhpdC52aXNpYmxlID0gZmFsc2VcbiAgICAgICAgaWRsZVRpbWUgPSAwXG4gICAgICAgIG0ucmVtb3ZlRnJvbVN0YWNrKClcblxuXG5cbiAgICB2aWRlb0xheWVyLmV4aXQgPSAoKSAtPlxuICAgICAgICB2aWRlb0xheWVyLmFuaW1hdGVcbiAgICAgICAgICBwcm9wZXJ0aWVzOih4OnZpZGVvTGF5ZXIuY2FjaGVQcm9wcy54LCB5OnZpZGVvTGF5ZXIuY2FjaGVQcm9wcy55LCB3aWR0aDp2aWRlb0xheWVyLmNhY2hlUHJvcHMud2lkdGgsIGhlaWdodDp2aWRlb0xheWVyLmNhY2hlUHJvcHMuaGVpZ2h0KVxuICAgICAgICAgIHRpbWU6LjVcblxuICAgICAgICB2aWRlb0xheWVyLmNvbnN0cmFpbnRzLmFsaWduID0gdmlkZW9MYXllci5jYWNoZUFsaWduXG5cbiAgICAgICAgdmlkZW9MYXllci5iYWNrZHJvcC5hbmltYXRlXG4gICAgICAgICAgcHJvcGVydGllczoob3BhY2l0eTowKVxuICAgICAgICAgIHRpbWU6LjVcbiAgICAgICAgICBkZWxheTouMlxuICAgICAgICBVdGlscy5kZWxheSAuNywgLT5cbiAgICAgICAgICB2aWRlb0xheWVyLmJhY2tkcm9wLmRlc3Ryb3koKVxuXG4gICAgICAgIHZpZGVvTGF5ZXIuZnVsbHNjcmVlbi52aXNpYmxlID0gdHJ1ZVxuICAgICAgICB2aWRlb0xheWVyLmZ1bGxzY3JlZW5FeGl0LnZpc2libGUgPSBmYWxzZVxuXG4gICAgICAgIGlmIHZpZGVvTGF5ZXIub25GdWxsU2NyZWVuRXhpdFxuICAgICAgICAgIHZpZGVvTGF5ZXIub25GdWxsU2NyZWVuRXhpdCgpXG5cbiAgICAjU2Vla2VyIENvbnRyb2xzXG4gICAgdmlkZW9MYXllci5zZWVrZXIuZHJhZ2dhYmxlLmVuYWJsZWQgPSB0cnVlXG4gICAgdmlkZW9MYXllci5zZWVrZXIuZHJhZ2dhYmxlLnNwZWVkWSA9IDBcbiAgICB2aWRlb0xheWVyLnNlZWtlci5kcmFnZ2FibGUuc3BlZWRYID0gMVxuICAgIHZpZGVvTGF5ZXIuc2Vla2VyLmRyYWdnYWJsZS5tb21lbnR1bSA9IGZhbHNlXG4gICAgdmlkZW9MYXllci5zZWVrZXIuZHJhZ2dhYmxlLmJvdW5jZSA9IGZhbHNlXG5cbiAgICB2aWRlb0xheWVyLnNlZWtlci5vbiBFdmVudHMuVG91Y2hTdGFydCwgLT5cbiAgICAgIHZpZGVvTGF5ZXIuc2Vla2VyLnNjYWxlID0gMS4yXG4gICAgICB2aWRlb0xheWVyLnNlZWtlci53b3JraW5nID0gdHJ1ZVxuXG4gICAgdmlkZW9MYXllci5zZWVrZXIub24gRXZlbnRzLkRyYWdNb3ZlLCAtPlxuICAgICAgdmlkZW9MYXllci5zZWVrZXIud29ya2luZyA9IHRydWVcbiAgICAgIGlmIHZpZGVvTGF5ZXIuc2Vla2VyLnggKyB2aWRlb0xheWVyLnNlZWtlck9mZnNldCA8IHZpZGVvTGF5ZXIudGltZWJhci54XG4gICAgICAgIHZpZGVvTGF5ZXIuc2Vla2VyLnggPSB2aWRlb0xheWVyLnRpbWViYXIueCAtIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0XG4gICAgICBpZiB2aWRlb0xheWVyLnNlZWtlci5tYXhYID4gdmlkZW9MYXllci50aW1lYmFyLm1heFggKyB2aWRlb0xheWVyLnNlZWtlck9mZnNldFxuICAgICAgICB2aWRlb0xheWVyLnNlZWtlci5tYXhYID0gdmlkZW9MYXllci50aW1lYmFyLm1heFggKyB2aWRlb0xheWVyLnNlZWtlck9mZnNldFxuICAgICAgbmV3Q1QgPSB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvbiAqICgodmlkZW9MYXllci5zZWVrZXIueCArIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0IC0gdmlkZW9MYXllci50aW1lYmFyLngpL3ZpZGVvTGF5ZXIudGltZWJhci53aWR0aClcbiAgICAgIGlmIG5ld0NUIDwgMFxuICAgICAgICBuZXdDVCA9IDBcbiAgICAgIGlmIG5ld0NUID4gdmlkZW9MYXllci5wbGF5ZXIuZHVyYXRpb25cbiAgICAgICAgbmV3Q1QgPSB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvblxuICAgICAgbS51dGlscy51cGRhdGUodmlkZW9MYXllci5jdXJyZW50VGltZSwgW3t0ZXh0Om0udXRpbHMudG9ISE1NU1MobmV3Q1QpfV0pXG5cbiAgICB2aWRlb0xheWVyLnNlZWtlci5vbiBFdmVudHMuRHJhZ0VuZCwgLT5cbiAgICAgIHZpZGVvTGF5ZXIuc2Vla2VyLnNjYWxlID0gMVxuICAgICAgdmlkZW9MYXllci5zZWVrZXIud29ya2luZyA9IGZhbHNlXG4gICAgICBldCA9IHZpZGVvTGF5ZXIucGxheWVyLmR1cmF0aW9uXG4gICAgICBuZXdDVCA9IGV0ICogKCh2aWRlb0xheWVyLnNlZWtlci54ICsgdmlkZW9MYXllci5zZWVrZXJPZmZzZXQgLSB2aWRlb0xheWVyLnRpbWViYXIueCkvdmlkZW9MYXllci50aW1lYmFyLndpZHRoKVxuICAgICAgaWYgbmV3Q1QgPCAwXG4gICAgICAgIG5ld0NUID0gMFxuICAgICAgaWYgbmV3Q1QgPiB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvblxuICAgICAgICBuZXdDVCA9IHZpZGVvTGF5ZXIucGxheWVyLmR1cmF0aW9uXG4gICAgICBuZXdDVCA9IE1hdGgucm91bmQobmV3Q1QpXG4gICAgICB2aWRlb0xheWVyLnBsYXllci5jdXJyZW50VGltZSA9IG5ld0NUXG5cblxuICBVSWRlbGVnYXRlID0gLT5cbiAgICBjdCA9IHZpZGVvTGF5ZXIucGxheWVyLmN1cnJlbnRUaW1lXG4gICAgZXQgPSB2aWRlb0xheWVyLnBsYXllci5kdXJhdGlvblxuICAgIGlmIHZpZGVvTGF5ZXIuc2Vla2VyLndvcmtpbmdcbiAgICAgICAgIyBEbyBub3RoaW5nXG4gICAgZWxzZVxuICAgICAgbS51dGlscy51cGRhdGUodmlkZW9MYXllci5jdXJyZW50VGltZSwgW3t0ZXh0Om0udXRpbHMudG9ISE1NU1ModmlkZW9MYXllci5wbGF5ZXIuY3VycmVudFRpbWUpfV0pXG4gICAgICB2aWRlb0xheWVyLnNlZWtlci54ID0gdmlkZW9MYXllci50aW1lYmFyLnggKyAodmlkZW9MYXllci50aW1lYmFyLndpZHRoICogY3QvZXQpIC0gdmlkZW9MYXllci5zZWVrZXJPZmZzZXRcbiAgICAgIHZpZGVvTGF5ZXIucHJvZ3Jlc3NCYXIud2lkdGggPSAgdmlkZW9MYXllci5zZWVrZXIueCArIHZpZGVvTGF5ZXIuc2Vla2VyT2Zmc2V0IC0gdmlkZW9MYXllci50aW1lYmFyLnhcblxuICB2aWRlb0xheWVyLnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkZGF0YVwiLCBVSXNldClcbiAgdmlkZW9MYXllci5wbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgVUlkZWxlZ2F0ZSlcblxuXG4gIHJldHVybiB2aWRlb0xheWVyXG4iLCIjbWF0ZXJpYWxLaXQgTW9kdWxlXG4jQnkgS2V2eW4gQXJub3R0XG5cbiMgSW1wb3J0IGZyYW1ld29ya1xuZXhwb3J0cy5sYXlvdXQgPSBsYXlvdXQgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtbGF5b3V0J1xuZXhwb3J0cy5saWIgPSBsaWJyYXJ5ID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LWxpYnJhcnknXG5leHBvcnRzLnV0aWxzID0gdXRpbHMgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtdXRpbHMnXG5leHBvcnRzLnN0YWNrID0gc3RhY2sgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtc3RhY2snXG5cbiMgU2V0dXAgcmVzb3VyY2VzXG5leHBvcnRzLmRldmljZSA9IHV0aWxzLmdldERldmljZSgpXG5leHBvcnRzLmFzc2V0cyA9IGxpYnJhcnkuYXNzZXRzXG5cbiMjIFNob3J0Y3V0c1xuZXhwb3J0cy5jb2xvciA9IChjb2xvclN0cmluZykgLT5cbiAgcmV0dXJuIGV4cG9ydHMudXRpbHMuY29sb3IoY29sb3JTdHJpbmcpXG5cbmV4cG9ydHMuZHAgPSAocHgpIC0+XG4gIHJldHVybiBleHBvcnRzLnV0aWxzLnB0KHB4KVxuXG5leHBvcnRzLnB4ID0gKGRwKSAtPlxuICByZXR1cm4gZXhwb3J0cy51dGlscy5weChkcClcblxuZXhwb3J0cy5zdGFjayA9IHN0YWNrLnN0YWNrXG5cbmV4cG9ydHMuYWRkVG9TdGFjayA9IChsYXllcikgLT5cbiAgc3RhY2suYWRkVG9TdGFjayhsYXllcilcblxuZXhwb3J0cy5yZW1vdmVGcm9tU3RhY2sgPSAobGF5ZXIpIC0+XG4gIHN0YWNrLnJlbW92ZUZyb21TdGFjayhsYXllcilcblxuXG4jIEltcG9ydCBDb21wb25lbnRzXG5hcHBiYXIgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtYXBwLWJhcidcbmJhbm5lciA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1iYW5uZXInXG5idXR0b24gPSByZXF1aXJlICdtYXRlcmlhbC1raXQtYnV0dG9uJ1xuZGlhbG9nID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LWRpYWxvZydcbmljb24gPSByZXF1aXJlICdtYXRlcmlhbC1raXQtaWNvbidcbm5hdiA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1uYXYtYmFyJ1xuc25hY2tiYXIgPSByZXF1aXJlICdtYXRlcmlhbC1raXQtc25hY2stYmFyJ1xuc3RhdHVzID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LXN0YXR1cy1iYXInXG50ZXh0ID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0LXRleHQnXG52aWRlbyA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC12aWRlbydcbmJvdHRvbW5hdiA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1ib3R0b20tbmF2J1xuY2FyZCA9IHJlcXVpcmUgJ21hdGVyaWFsLWtpdC1jYXJkcydcblxuIyMgU2V0dXAgQ29tcG9uZW50c1xuZXhwb3J0cy5BcHBCYXIgPSBhcHBiYXIuY3JlYXRlXG5leHBvcnRzLkJhbm5lciA9IGJhbm5lci5jcmVhdGVcbmV4cG9ydHMuQnV0dG9uID0gYnV0dG9uLmNyZWF0ZVxuZXhwb3J0cy5EaWFsb2cgPSBkaWFsb2cuY3JlYXRlXG5leHBvcnRzLkljb24gPSBpY29uLmNyZWF0ZVxuZXhwb3J0cy5OYXZCYXIgPSBuYXYuY3JlYXRlXG5leHBvcnRzLlNuYWNrQmFyID0gc25hY2tiYXIuY3JlYXRlXG5leHBvcnRzLlN0YXR1c0JhciA9IHN0YXR1cy5jcmVhdGVcbmV4cG9ydHMuVGV4dCA9IHRleHQuY3JlYXRlXG5leHBvcnRzLlZpZGVvID0gdmlkZW8uY3JlYXRlXG5leHBvcnRzLkJvdHRvbU5hdiA9IGJvdHRvbW5hdi5jcmVhdGVcbmV4cG9ydHMuQ2FyZCA9IGNhcmQuY3JlYXRlXG4iLCJtID0gcmVxdWlyZSAnbWF0ZXJpYWwta2l0J1xuXG5jbGFzcyBleHBvcnRzLkNhcmQgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKCkgLT5cblxuXHRjYXJkID0gbmV3IExheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsMSlcIlxuXHRcdHNoYWRvd1k6IG0ucHgoMilcblx0XHRzaGFkb3dDb2xvcjogbS5jb2xvcihcImdyZXkyMDBcIilcblxuXHRjYXJkLmNvbnN0cmFpbnRzID1cblx0XHR0b3A6IDEwXG5cdFx0bGVhZGluZzogMTZcblx0XHR0cmFpbGluZzogMTZcblx0XHRoZWlnaHQ6IDMwMFxuXG5cdG0ubGF5b3V0LnNldCgpXG5cblxuXG5cdGNhcmRbXCJjaGV2cm9uLXJpZ2h0XCJdID0gbmV3IG0uSWNvblxuXHRcdG5hbWU6IFwidG9kYXlcIlxuXHRcdHN1cGVyTGF5ZXI6IGNhcmRcblx0XHRjb25zdHJhaW50czpcblx0XHRcdGxlYWRpbmc6IDE2XG5cdFx0XHR0b3A6MTZcblxuXG5cdHRleHQgPSBuZXcgbS5UZXh0XG5cdFx0dGV4dDpcIkNhcmQgVGl0bGVcIlxuXHRcdG5hbWU6IFwiQ2FyZCBUaXRsZVwiXG5cdFx0Zm9udFNpemU6MThcblx0XHRmb250V2VpZ2h0OjQwMFxuXHRcdGNvbnN0cmFpbnRzOlxuXHRcdFx0YWxpZ246XCJsZWZ0XCJcblx0XHRcdHRvcDogMjBcblx0XHRcdGxlYWRpbmc6W2NhcmRbXCJjaGV2cm9uLXJpZ2h0XCJdLCAxNl1cblx0XHRcdHRyYWlsaW5nOiAxNlxuXHRcdHN1cGVyTGF5ZXI6IGNhcmRcblxuXG5cdG0ubGF5b3V0LnNldCgpXG5cblxuXHR0aHVtYm5haWwgPSBuZXcgTGF5ZXJcblx0XHRzdXBlckxheWVyOiBjYXJkXG5cdFx0aW1hZ2U6IFV0aWxzLnJhbmRvbUltYWdlKClcblx0XHRjbGlwOiB0cnVlXG5cblx0dGh1bWJuYWlsLmNvbnN0cmFpbnRzID1cblx0XHRsZWFkaW5nOjBcblx0XHR0cmFpbGluZzowXG5cdFx0Ym90dG9tOjYwXG5cdFx0dG9wOlt0ZXh0LCAxNl1cblxuXHRtLmxheW91dC5zZXQoKVxuXG5cdGNhcmRbXCJzdWJ0ZXh0XCJdID0gbmV3IG0uVGV4dFxuXHRcdHRleHQ6IFwiTG9yZW0gSXBzdW0gZG9sb3Igc2l0IGFtZXQgcGVuYXRpYnVzIG1hZ25pc1wiXG5cdFx0Zm9udFNpemU6MTRcblx0XHRmb250V2VpZ2h0OjMwMFxuXHRcdHN1cGVyTGF5ZXI6IGNhcmRcblx0XHRjb25zdHJhaW50czpcblx0XHRcdHRvcDogW3RodW1ibmFpbCwgMTZdXG5cdFx0XHRsZWFkaW5nOiA4XG5cdFx0XHR0cmFpbGluZzogMTZcblxuXHRjYXJkW1wiZm9vdGVyXCJdID0gbmV3IExheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsMSlcIlxuXHRcdHNoYWRvd1k6IG0ucHgoMilcblx0XHRzaGFkb3dDb2xvcjogbS5jb2xvcihcImdyZXkyMDBcIilcblxuXHRjYXJkW1wiZm9vdGVyXCJdLmNvbnN0cmFpbnRzID1cblx0XHR0b3A6IFtjYXJkLDFdXG5cdFx0dHJhaWxpbmc6IDE2XG5cdFx0bGVhZGluZzogMTZcblx0XHRoZWlnaHQ6IDQwXG5cblx0bS5sYXlvdXQuc2V0KClcblxuXHRtLnV0aWxzLmlua3lcblx0XHRsYXllcjogdGh1bWJuYWlsXG5cdFx0Y29sb3I6ICdyZWQnXG4iXX0=
