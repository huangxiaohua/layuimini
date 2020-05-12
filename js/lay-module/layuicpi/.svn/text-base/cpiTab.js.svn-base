/**
 * date:2020/02/27
 * author:Mr.Chung
 * version:2.0
 * description:layuimini tab框架扩展
 */
layui.define(["element", "layer", "jquery", "cpiOptions", "cpiRoute"], function(exports) {
	var element = layui.element,
		cpiOptions = layui.cpiOptions,
		layer = layui.layer,
		$ = layui.$,
		cpiRoute = layui.cpiRoute;

	var cpiTab = {
		/**
		 * 初始化tab
		 * @param options
		 */
		render: function(options) {
			options.filter = options.filter || null;

			options.menuList = options.menuList || []; // todo 后期菜单想改为不操作dom, 而是直接操作初始化传过来的数据

			options.listenSwichCallback = options.listenSwichCallback || function() {};
			cpiTab.listen();
			cpiTab.listenRoll();
			cpiTab.listenSwitch(options);
			cpiTab.listenHash(options);
		},
		/**
		 * 初始化首页
		 */
		renderHome: function(homeRoute) {
			var routeInfo = cpiRoute.getRoute(homeRoute);
			if(routeInfo != null && routeInfo != undefined) {
				sessionStorage.setItem('layuiminiHomeHref', homeRoute);
				$('#layuiminiHomeTabId').html('<span class="layuimini-tab-active"></span><span class="disable-close">' + routeInfo.title + '</span><i class="layui-icon layui-unselect layui-tab-close">ဆ</i>');
				$('#layuiminiHomeTabId').attr('lay-id', homeRoute);
				$('#layuiminiHomeTabIframe').html('<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" name="' + homeRoute + '"  src="' + routeInfo.url + '"></iframe>');
			} else {
				cpiTab.openSystemRoute("main_error");
			}
		},
		/**
		 * 新建tab窗口
		 */
		create: function(route, params) {
			var routeInfo = cpiRoute.getRoute(route);
			var maxTabNum = cpiOptions.maxTabNum || 20;
			if($(".layuimini-tab .layui-tab-title li").length >= maxTabNum) {
				layer.msg('Tab窗口已达到限定数量，请先关闭部分Tab');
				return false;
			}
			var ele = element;
			if(top.location != self.location) {
				ele = parent.layui.element;
			}
			ele.tabAdd('layuiminiTab', {
				title: '<span class="layuimini-tab-active"></span><span>' + routeInfo.title + '</span><i class="layui-icon layui-unselect layui-tab-close">ဆ</i>' //用于演示
					,
				content: '<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" id="params_' + route + '" name="' + route + '"  src="' + routeInfo.url + '"></iframe>',
				id: route
			});
			$('.layuimini-menu-left').attr('layuimini-tab-tag', 'add');
			sessionStorage.setItem('layuiminimenu_' + route, routeInfo.title);
			//window.frames[route].data("param","12312");
			if(params != null && params != undefined) {
				//alert(JSON.stringify(params));
				cpiTab.setRouteParam(route, params);
			}

		},
		setRouteParam: function(route, params) {
			if(top.location != self.location) {
				window.parent.$("#params_" + route).data("params", params);
			} else {
				$("#params_" + route).data("params", params);
			}
		},
		getRouteParam: function(route) {
			if(top.location != self.location) {
				return window.parent.$("#params_" + route).data("params");
			} else {
				return $("#params_" + route).data("params");
			}

		},
		/**
		 * 切换选项卡
		 * @param tabId
		 */
		change: function(tabId) {
			element.tabChange('layuiminiTab', tabId);
		},
		/**
		 * 删除tab窗口
		 
		 */
		delete: function(route) {
			// todo 未知BUG，不知道是不是layui问题，必须先删除元素
			$(".layuimini-tab .layui-tab-title .layui-unselect.layui-tab-bar").remove();
			var ele = element;
			if(top.location != self.location) {
				ele = parent.layui.element;
			}
			ele.tabDelete('layuiminiTab', route);
		},

		/**
		 * 在iframe层打开新tab方法
		 */
		//		openNewTabByIframe: function(route) {
		//			route.url = route.url || null;
		//			route.title = route.title || null;
		//			var loading = parent.layer.load(0, {
		//				shade: false,
		//				time: 2 * 1000
		//			});
		//			//if (route.href === null || route.href === undefined) route.href = new Date().getTime();
		//			var checkTab = cpiTab.check(route, true);
		//			if(!checkTab) {
		//				cpiTab.create(route);
		//			}
		//			parent.layui.element.tabChange('layuiminiTab', route);
		//			parent.layer.close(loading);
		//		},

		/**
		 * 在iframe层关闭当前tab方法
		 */
		deleteCurrentByIframe: function() {
			var ele = $(".layuimini-tab .layui-tab-title li.layui-this", parent.document);
			if(ele.length > 0) {
				var layId = $(ele[0]).attr('lay-id');
				cpiTab.delete(layId, true);
			}
		},

		/**
		 * 判断tab窗口
		 */
		check: function(route) {
			// 判断选项卡上是否有
			var checkTab = false;
			var checkTabId = "";
			var isInIframe = true;

			if(top.location != self.location) {
				isInIframe = false;

			}
			if(isInIframe) {
				$(".layui-tab-title li").each(function() {
					checkTabId = $(this).attr('lay-id');
					if(checkTabId != null && checkTabId === route) {
						checkTab = true;
					}
				});
			} else {
				parent.layui.$(".layui-tab-title li").each(function() {
					checkTabId = $(this).attr('lay-id');
					if(checkTabId != null && checkTabId === route) {
						checkTab = true;
					}
				});
			}
			return checkTab;
		},
		/**
		 * 开启tab右键菜单
		 * @param tabId
		 * @param left
		 */
		openTabRignMenu: function(tabId, left) {
			cpiTab.closeTabRignMenu();
			var menuHtml = '<div class="layui-unselect layui-form-select layui-form-selected layuimini-tab-mousedown layui-show" data-tab-id="' + tabId + '" style="left: ' + left + 'px!important">\n' +
				'<dl>\n' +
				'<dd><a href="javascript:;" layuimini-tab-menu-close="current">关 闭 当 前</a></dd>\n' +
				'<dd><a href="javascript:;" layuimini-tab-menu-close="other">关 闭 其 他</a></dd>\n' +
				'<dd><a href="javascript:;" layuimini-tab-menu-close="all">关 闭 全 部</a></dd>\n' +
				'</dl>\n' +
				'</div>';
			var makeHtml = '<div class="layuimini-tab-make"></div>';
			$('.layuimini-tab .layui-tab-title').after(menuHtml);
			$('.layuimini-tab .layui-tab-content').after(makeHtml);
		},

		/**
		 * 关闭tab右键菜单
		 */
		closeTabRignMenu: function() {
			$('.layuimini-tab-mousedown').remove();
			$('.layuimini-tab-make').remove();
		},

		/**
		 * 查询菜单信息
		 * @param href
		 * @param menuList
		 */
		searchMenu: function(href, menuList) {
			var menu;
			for(key in menuList) {
				var item = menuList[key];
				if(item.href === href) {
					menu = item;
					break;
				}
				if(item.child) {
					newMenu = cpiTab.searchMenu(href, item.child);
					if(newMenu) {
						menu = newMenu;
						break;
					}
				}
			}
			return menu;
		},
		openSystemDialogRoute: function(route, params) {
			var ele = element;
			var lay = layer;
			if(top.location != self.location) {
				ele = parent.layui.element;
				lay = parent.layer;
			}
			var loading = lay.load(0, {
				shade: false,
				time: 2 * 1000
			});
			var routeInfo = cpiRoute.getRoute(route);
			if(routeInfo != null && routeInfo != undefined) {
               var url = routeInfo.url;
				var title = routeInfo.title;
				var target = routeInfo.target;
				lay.open({
					title: '测试弹窗',
					type: 2,
					shade: 0.2,
					maxmin: true,
					id: 'params_' + route,
					shadeClose: true,
					area: ['80%', '80%'],
					content: url,
				});
				if(params != null && params != undefined) {
					//alert(JSON.stringify(params));
					cpiTab.setRouteParam(route, params);
				}
			} else {
				cpiTab.openSystemDialogRoute("main_error", {});
			}

			lay.close(loading);
		},
		openSystemRoute: function(route, params) {
			var ele = element;
			var lay = layer;
			if(top.location != self.location) {
				ele = parent.layui.element;
				lay = parent.layer;
			}
			var loading = lay.load(0, {
				shade: false,
				time: 2 * 1000
			});
			var routeInfo = cpiRoute.getRoute(route);
			if(routeInfo != null && routeInfo != undefined) {

				var href = routeInfo.url;
				var target = routeInfo.target;
				//				
				//				var title = $(this).text();
				//alert(window.openTips);
				var el = $("[layuimini-route='" + href + "']", ".layuimini-menu-left");
				lay.close(window.openTips);
				if(el.length) {
					$(el).closest(".layui-nav-tree").find(".layui-this").removeClass("layui-this");
					$(el).parent().addClass("layui-this");
				}
				//alert(target);

				if(target === null && target === undefined && target === '_blank') {
					lay.close(loading);
					window.open(href, "_blank");
					return false;
				}
				//if (route === null || route === undefined) route = new Date().getTime();
				var checkTab = cpiTab.check(route);
				if(!checkTab) {
					cpiTab.create(route, params);
				}
				ele.tabChange('layuiminiTab', route);

			} else {
				cpiTab.openSystemRoute("main_error");
			}

			lay.close(loading);
		},
		/**
		 * 监听
		 */
		listen: function() {

			/**
			 * 打开新窗口
			 */
			$('body').on('click', '[layuimini-route]', function() {
				var route = $(this).attr('layuimini-route');
				cpiTab.openSystemRoute(route);
			});

			/**
			 * 在iframe子菜单上打开新窗口
			 */
			//			$('body').on('click', '[layuimini-content-route]', function() {
			//				var loading = parent.layer.load(0, {
			//					shade: false,
			//					time: 2 * 1000
			//				});
			//				var route = $(this).attr('layuimini-content-route');
			//				//var title = $(this).attr('data-title');
			//				var routeInfo = cpiRoute.getRoute(route);
			//				var href = routeInfo.url;
			//				var target = routeInfo.target;
			//				if(target === null && target === undefined && target === '_blank') {
			//					parent.layer.close(loading);
			//					window.open(href, "_blank");
			//					return false;
			//				}
			//				//if (route === null || route === undefined) route = new Date().getTime();
			//				var checkTab = cpiTab.check(route, true);
			//				if(!checkTab) {
			//					cpiTab.create(route);
			//				}
			//				parent.layui.element.tabChange('layuiminiTab', route);
			//				parent.layer.close(loading);
			//			});

			/**
			 * 关闭选项卡
			 **/
			$('body').on('click', '.layuimini-tab .layui-tab-title .layui-tab-close', function() {
				var loading = layer.load(0, {
					shade: false,
					time: 2 * 1000
				});
				var $parent = $(this).parent();
				var tabId = $parent.attr('lay-id');
				if(tabId !== undefined || tabId !== null) {
					cpiTab.delete(tabId);
				}
				layer.close(loading);
			});

			/**
			 * 选项卡操作
			 */
			$('body').on('click', '[layuimini-tab-close]', function() {
				var loading = layer.load(0, {
					shade: false,
					time: 2 * 1000
				});
				var closeType = $(this).attr('layuimini-tab-close');
				$(".layuimini-tab .layui-tab-title li").each(function() {
					var tabId = $(this).attr('lay-id');
					var id = $(this).attr('id');
					var isCurrent = $(this).hasClass('layui-this');
					if(id !== 'layuiminiHomeTabId') {
						if(closeType === 'all') {
							cpiTab.delete(tabId);
						} else {
							if(closeType === 'current' && isCurrent) {
								cpiTab.delete(tabId);
							} else if(closeType === 'other' && !isCurrent) {
								cpiTab.delete(tabId);
							}
						}
					}
				});
				layer.close(loading);
			});

			/**
			 * 禁用网页右键
			 */
			$(".layuimini-tab .layui-tab-title").unbind("mousedown").bind("contextmenu", function(e) {
				e.preventDefault();
				return false;
			});

			/**
			 * 注册鼠标右键
			 */
			$('body').on('mousedown', '.layuimini-tab .layui-tab-title li', function(e) {
				var left = $(this).offset().left - $('.layuimini-tab ').offset().left + ($(this).width() / 2),
					tabId = $(this).attr('lay-id');
				if(e.which === 3) {
					cpiTab.openTabRignMenu(tabId, left);
				}
			});

			/**
			 * 关闭tab右键菜单
			 */
			$('body').on('click', '.layui-body,.layui-header,.layuimini-menu-left,.layuimini-tab-make', function() {
				cpiTab.closeTabRignMenu();
			});

			/**
			 * tab右键选项卡操作
			 */
			$('body').on('click', '[layuimini-tab-menu-close]', function() {
				var loading = layer.load(0, {
					shade: false,
					time: 2 * 1000
				});
				var closeType = $(this).attr('layuimini-tab-menu-close'),
					currentTabId = $('.layuimini-tab-mousedown').attr('data-tab-id');
				$(".layuimini-tab .layui-tab-title li").each(function() {
					var tabId = $(this).attr('lay-id');
					var id = $(this).attr('id');
					if(id !== 'layuiminiHomeTabId') {
						if(closeType === 'all') {
							cpiTab.delete(tabId);
						} else {
							if(closeType === 'current' && currentTabId === tabId) {
								cpiTab.delete(tabId);
							} else if(closeType === 'other' && currentTabId !== tabId) {
								cpiTab.delete(tabId);
							}
						}
					}
				});
				cpiTab.closeTabRignMenu();
				layer.close(loading);
			});
		},

		/**
		 * 监听tab切换
		 */
		listenSwitch: function(options) {
			var filter = options.filter || null;
			var multiModule = cpiOptions.multiModule || false;
			var urlHashLocation = cpiOptions.urlHashLocation || false;
			var listenSwichCallback = cpiOptions.listenSwichCallback || function() {

			};
			element.on('tab(' + filter + ')', function(data) {
				var tabId = $(this).attr('lay-id');
				var routeInfo = cpiRoute.getRoute(tabId);
				var url = routeInfo.url;
				if(urlHashLocation) {
					location.hash = '/' + tabId;
				}
				if(typeof listenSwichCallback === 'function') {
					listenSwichCallback();
				}
				// 判断是否为新增窗口
				if($('.layuimini-menu-left').attr('layuimini-tab-tag') === 'add') {
					$('.layuimini-menu-left').attr('layuimini-tab-tag', 'no')
				} else {
					$("[layuimini-route]").parent().removeClass('layui-this');
					if(multiModule) {
						cpiTab.listenSwitchMultiModule(tabId);
					} else {
						cpiTab.listenSwitchSingleModule(tabId);
					}
				}
				cpiTab.rollPosition();
			});
		},

		/**
		 * 监听hash变化
		 * @returns {boolean}
		 */
		listenHash: function(options) {
			var urlHashLocation = cpiOptions.urlHashLocation || false;
			var maxTabNum = cpiOptions.maxTabNum || 20;
			var homeRoute = cpiOptions.homeRoute || '';
			var menuList = options.menuList || [];
			if(!urlHashLocation) return false;
			var tabId = location.hash.replace(/^#\//, '');
			if(tabId === null || tabId === undefined || tabId === '') return false;

			// 判断是否为首页
			if(tabId === homeRoute) return false;

			// 判断是否为右侧菜单
			var menu = cpiTab.searchMenu(tabId, menuList);
			if(menu !== undefined) {
				cpiTab.create(tabId);
				$('.layuimini-menu-left').attr('layuimini-tab-tag', 'no');
				element.tabChange('layuiminiTab', tabId);
				return false;
			}

			// 判断是否为快捷菜单
			var isSearchMenu = false;
			$("[layuimini-content-route]").each(function() {
				if($(this).attr("layuimini-content-route") === tabId) {
					//var routeInfo = cpiRoute.getRoute(tabId);
					var title = $(this).attr("data-title");
					cpiTab.create(tabId);
					$('.layuimini-menu-left').attr('layuimini-tab-tag', 'no');
					element.tabChange('layuiminiTab', tabId);
					isSearchMenu = true;
					return false;
				}
			});
			if(isSearchMenu) return false;

			// 既不是右侧菜单、快捷菜单,就直接打开
			var title = sessionStorage.getItem('layuiminimenu_' + tabId) === null ? tabId : sessionStorage.getItem('layuiminimenu_' + tabId);
			cpiTab.create(tabId);
			element.tabChange('layuiminiTab', tabId);
			return false;
		},

		/**
		 * 监听滚动
		 */
		listenRoll: function() {
			$(".layuimini-tab-roll-left").click(function() {
				cpiTab.rollClick("left");
			});
			$(".layuimini-tab-roll-right").click(function() {
				cpiTab.rollClick("right");
			});
		},

		/**
		 * 单模块切换
		 * @param tabId
		 */
		listenSwitchSingleModule: function(tabId) {
			$("[layuimini-route]").each(function() {
				if($(this).attr("layuimini-route") === tabId) {
					// 自动展开菜单栏
					var addMenuClass = function($element, type) {
						if(type === 1) {
							$element.addClass('layui-this');
							if($element.hasClass('layui-nav-item') && $element.hasClass('layui-this')) {
								$(".layuimini-header-menu li").attr('class', 'layui-nav-item');
							} else {
								addMenuClass($element.parent().parent(), 2);
							}
						} else {
							$element.addClass('layui-nav-itemed');
							if($element.hasClass('layui-nav-item') && $element.hasClass('layui-nav-itemed')) {
								$(".layuimini-header-menu li").attr('class', 'layui-nav-item');
							} else {
								addMenuClass($element.parent().parent(), 2);
							}
						}
					};
					addMenuClass($(this).parent(), 1);
					return false;
				}
			});
		},

		/**
		 * 多模块切换
		 * @param tabId
		 */
		listenSwitchMultiModule: function(tabId) {
			$("[layuimini-route]").each(function() {
				if($(this).attr("layuimini-route") === tabId) {

					// 自动展开菜单栏
					var addMenuClass = function($element, type) {
						if(type === 1) {
							$element.addClass('layui-this');
							if($element.hasClass('layui-nav-item') && $element.hasClass('layui-this')) {
								var moduleId = $element.parent().attr('id');
								$(".layuimini-header-menu li").attr('class', 'layui-nav-item');
								$("#" + moduleId + "HeaderId").addClass("layui-this");
								$(".layuimini-menu-left .layui-nav.layui-nav-tree").attr('class', 'layui-nav layui-nav-tree layui-hide');
								$("#" + moduleId).attr('class', 'layui-nav layui-nav-tree layui-this');
							} else {
								addMenuClass($element.parent().parent(), 2);
							}
						} else {
							$element.addClass('layui-nav-itemed');
							if($element.hasClass('layui-nav-item') && $element.hasClass('layui-nav-itemed')) {
								var moduleId = $element.parent().attr('id');
								$(".layuimini-header-menu li").attr('class', 'layui-nav-item');
								$("#" + moduleId + "HeaderId").addClass("layui-this");
								$(".layuimini-menu-left .layui-nav.layui-nav-tree").attr('class', 'layui-nav layui-nav-tree layui-hide');
								$("#" + moduleId).attr('class', 'layui-nav layui-nav-tree layui-this');
							} else {
								addMenuClass($element.parent().parent(), 2);
							}
						}
					};
					addMenuClass($(this).parent(), 1);
					return false;
				}
			});
		},

		/**
		 * 自动定位
		 */
		rollPosition: function() {
			var $tabTitle = $('.layuimini-tab  .layui-tab-title');
			var autoLeft = 0;
			$tabTitle.children("li").each(function() {
				if($(this).hasClass('layui-this')) {
					return false;
				} else {
					autoLeft += $(this).outerWidth();
				}
			});
			$tabTitle.animate({
				scrollLeft: autoLeft - $tabTitle.width() / 3
			}, 200);
		},

		/**
		 * 点击滚动
		 * @param direction
		 */
		rollClick: function(direction) {
			var $tabTitle = $('.layuimini-tab  .layui-tab-title');
			var left = $tabTitle.scrollLeft();
			if('left' === direction) {
				$tabTitle.animate({
					scrollLeft: left - 450
				}, 200);
			} else {
				$tabTitle.animate({
					scrollLeft: left + 450
				}, 200);
			}
		}

	};

	exports("cpiTab", cpiTab);
});