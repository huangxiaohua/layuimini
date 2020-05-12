/**
 * date:2020/04/20
 * author:Mr.WU
 * version:2.0
 * description:layuimini 菜单框架扩展
 */
layui.define(["element", "jquery", "cpiOptions", "cpiRoute"], function(exports) {
	var element = layui.element,
		$ = layui.$,
		layer = layui.layer,
		cpiOptions = layui.cpiOptions,
		cpiRoute = layui.cpiRoute;
	var cpiMenu = {

		/**
		 * 菜单初始化
		 * @param options.menuList   菜单数据信息
		 * @param options.multiModule 是否开启多模块(单模块是指菜单全显示在左侧,多模块是一级显示在顶部)
		 * @param options.menuChildOpen 是否展开子菜单
		 */
		render: function(menuData) {
			var menuList = menuData || [];
			var multiModule = cpiOptions.multiModule || false;
			var menuChildOpen = cpiOptions.menuChildOpen || false;
			//alert("options.multiModule="+options.multiModule);
			//alert(menuList.length);

			if(multiModule) {
				cpiMenu.renderMultiModule(menuList, menuChildOpen);
			} else {
				cpiMenu.renderSingleModule(menuList, menuChildOpen);
			}
			cpiMenu.listen();
		},

		/**
		 * 单模块
		 * @param menuList 菜单数据
		 * @param menuChildOpen 是否默认展开
		 */
		renderSingleModule: function(menuList, menuChildOpen) {
			menuList = menuList || [];
			var leftMenuHtml = '';
			var childOpenClass = '';
			var leftMenuCheckDefault = 'layui-this'; //选中
			var me = this;
			if(menuChildOpen) childOpenClass = ' layui-nav-itemed'; //展开
			leftMenuHtml = this.renderLeftMenu(menuList, {
				childOpenClass: childOpenClass
			});
			$('.layui-layout-body').addClass('layuimini-single-module'); //单模块标识
			$('.layuimini-header-menu').remove();
			$('.layuimini-menu-left').html(leftMenuHtml);

			element.init();
		},

		/**
		 * 顶部一级菜单渲染
		 * @param menu 菜单
		 * @param options 设置值
		 */

		compileHeadMenu: function(menu, options) {
			var menuHtml = '';
			var menuInfo = cpiRoute.getRoute(menu.route);
			if(menuInfo != null && menuInfo != undefined) {
				var unfold = menu.unfold;
				var headerMenuCheckDefault = options.headerMenuCheckDefault;
				var menuId = options.menuId;
				var id = options.id;

				menuHtml = '<li class="layui-nav-item menu-li ' + headerMenuCheckDefault + '" data-menu="' + menuId + '" id="' + id + '">';
				menuHtml += '<a href="javascript:;">';
				if(menuInfo.icon != "") {
					menuHtml += '<i class="' + menuInfo.icon + '"></i>';
				}
				menuHtml += '<span class="layui-left-nav">' + menuInfo.title + '</span>';
				menuHtml += '</a>';
				menuHtml += '</li>';
			}
			return menuHtml;
		},
		/**
		 * 左边菜单渲染
		 * @param menu 菜单
		 * @param options 设置值
		 */
		compileLeftMenu: function(menu, options) {
			var menuHtml = '';
			var menuInfo = cpiRoute.getRoute(menu.route);
			if(menuInfo != null && menuInfo != undefined) {
				var unfold = menu.unfold;
				var childrenHtml = options.childrenHtml;
				var childOpenClass = options.childOpenClass;

				menuHtml = '<li class="layui-nav-item menu-li ' + childOpenClass + '" >';
				var routeUrl = "";
				if(menuInfo.url != "") {
					routeUrl = 'layuimini-route="' + menu.route + '"';
				}
				menuHtml += '<a href="javascript:;" ' + routeUrl + '>';
				if(menuInfo.icon != "") {
					menuHtml += '<i class="' + menuInfo.icon + '"></i>';
				}
				menuHtml += '<span class="layui-left-nav">' + menuInfo.title + '</span>';
				menuHtml += '</a>';
				if(menu.children != "") {
					menuHtml += options.childrenHtml;
				}
				menuHtml += '</li>';
			}
			return menuHtml;
		},
		/**
		 * 子菜单渲染
		 * @param menu 菜单
		 * @param options 设置值
		 */
		compileChildMenu: function(menu) {
			//alert(childrenHtml);

			var menuHtml = '';
			var menuInfo = cpiRoute.getRoute(menu.route);
			if(menuInfo != null && menuInfo != undefined) {
				var children = menu.children;
				var unfold = menu.unfold;
				var routeUrl = "";
				//' + childOpenClass + '
				menuHtml = '<dd class="menu-dd ">';
				//menuInfo.child != null && menuInfo.child.length != 0 && 
				if(menuInfo.url != "") {
					routeUrl = 'layuimini-route="' + menu.route + '"';
				}
				menuHtml += '<a href="javascript:;"  ' + routeUrl + ' >';
				if(menuInfo.icon != "") {
					menuHtml += '<i class="' + menuInfo.icon + '"></i>';
				}
				menuHtml += '<span class="layui-left-nav">' + menuInfo.title + '</span>';
				menuHtml += '</a>';
				if(menu.children && menu.children != "") {
					menuHtml += menu.children;
				}
				menuHtml += '</dd>';
				//alert(JSON.stringify(menuInfo));
			}
			return menuHtml;
		},
		/**
		 * 渲染外层容器
		 * @param menu 菜单(children为HTML)
		 * @param isSub 是否为子菜单(true为子菜单)
		 */

		compileMenuContainer: function(options, isSub) {

			var wrapperHtml = '';
			if(isSub) {
				wrapperHtml = '<dl class="layui-nav-child ">' + options.childrenHtml + '</dl>';
			} else {
				// {{d.className}}" id="{{d.id}}
				wrapperHtml = '<ul class="layui-nav layui-nav-tree layui-left-nav-tree ' + options.leftMenuCheckDefault + '" id="' + options.parentMenuId + '">' + options.childrenHtml + '</ul>';
			}
			if(!options.childrenHtml) {
				return "";
			}
			return wrapperHtml;
		},
		/*
		 * 遍历操作
		 * @param list 遍历列表
		 * @param callback 遍历回调
		 * */
		each: function(list, callback) {
			var _list = [];
			for(var i = 0, length = list.length; i < length; i++) {
				_list[i] = callback(i, list[i]);
			}
			return _list;
		},
		/*
		 * 渲染子边菜单
		 * @param menuList 遍历列表
		 * @param options 设置值
		 * */
		renderChildrenMenu: function(menuList, options) {
			var me = this;
			menuList = menuList || [];
			var childrenHtml = this.each(menuList, function(idx, menu) {
				//alert(JSON.stringify(menu));
				//alert(menu.child.length);
				if(menu.child && menu.child.length) {
					//递归调用具体菜单
					menu.children = me.renderChildrenMenu(menu.child);

				}

				//给菜单加外层包装
				return me.compileChildMenu(menu);
			}).join("");
			//alert(childrenHtml);
			return me.compileMenuContainer({
				childrenHtml: childrenHtml
			}, true)
		},
		/*渲染左边菜单*/
		renderLeftMenu: function(leftMenus, options) {
			options = options || {};
			var me = this;
			var children = "";
			var leftMenuHtml = "";

			var leftMenusHtml = me.each(leftMenus || [], function(idx, menu) { // 左侧菜单遍历

				childrenHtml = me.renderChildrenMenu(menu.child, {
					childOpenClass: options.childOpenClass
				});

				leftMenuHtml = me.compileLeftMenu(menu, {
					childOpenClass: options.childOpenClass,

					childrenHtml: childrenHtml
				});
				options.childOpenClass = "";
				return leftMenuHtml;
			}).join("");

			leftMenusHtml = me.compileMenuContainer({
				parentMenuId: options.parentMenuId || '',
				leftMenuCheckDefault: options.leftMenuCheckDefault || '',
				childrenHtml: leftMenusHtml
			}, false);
			return leftMenusHtml;
		},
		/**
		 * 多模块
		 * @param menuList 菜单数据
		 * @param menuChildOpen 是否默认展开
		 */
		renderMultiModule: function(menuList, menuChildOpen) {
			menuList = menuList || [];
			var me = this;
			var headerMenuHtml = '';
			var headerMobileMenuHtml = '';
			var leftMenuHtml = '';
			var leftMenuCheckDefault = 'layui-this';
			var childOpenClass = '';
			var headerMenuCheckDefault = 'layui-this';

			if(menuChildOpen) childOpenClass = ' layui-nav-itemed';
			//alert(menuChildOpen);
			var headerMenuHtml = this.each(menuList, function(index, menu) { //顶部菜单渲染
				var menuId = 'multi_module_' + index;
				var id = menuId + "HeaderId";
				var topMenuItemHtml = "";

				topMenuItemHtml = me.compileHeadMenu(menu, {
					headerMenuCheckDefault: headerMenuCheckDefault,
					menuId: menuId,
					id: id,

				});
				headerMenuCheckDefault = "";
				//alert(JSON.stringify(options));

				//遍历左边的
				leftMenuHtml += me.renderLeftMenu(menu.child, {
					parentMenuId: menuId,
					childOpenClass: childOpenClass,
					leftMenuCheckDefault: leftMenuCheckDefault
				});

				leftMenuCheckDefault = "layui-hide";
				headerMobileMenuHtml += me.compileChildMenu(menu);
				return topMenuItemHtml;
			}).join("");

			$('.layui-layout-body').addClass('layuimini-multi-module'); //多模块标识
			$('.layuimini-menu-header-pc').html(headerMenuHtml); //电脑
			$('.layuimini-menu-left').html(leftMenuHtml);
			$('.layuimini-menu-header-mobile').html(headerMobileMenuHtml); //手机
			element.init();
		},

		/**
		 * 监听
		 */
		listen: function() {

			/**
			 * 菜单模块切换
			 */
			$('body').on('click', '[data-menu]', function() {
				var loading = layer.load(0, {
					shade: false,
					time: 2 * 1000
				});
				var menuId = $(this).attr('data-menu');
				// header
				$(".layuimini-header-menu .layui-nav-item.layui-this").removeClass('layui-this');
				$(this).addClass('layui-this');
				// left
				$(".layuimini-menu-left .layui-nav.layui-nav-tree.layui-this").addClass('layui-hide');
				$(".layuimini-menu-left .layui-nav.layui-nav-tree.layui-this.layui-hide").removeClass('layui-this');
				$("#" + menuId).removeClass('layui-hide');
				$("#" + menuId).addClass('layui-this');
				layer.close(loading);
			});

			/**
			 * 菜单缩放
			 */
			$('body').on('click', '.layuimini-site-mobile', function() {
				var loading = layer.load(0, {
					shade: false,
					time: 2 * 1000
				});
				var isShow = $('.layuimini-tool [data-side-fold]').attr('data-side-fold');
				if(isShow == 1) { // 缩放
					$('.layuimini-tool [data-side-fold]').attr('data-side-fold', 0);
					$('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-indent');
					$('.layui-layout-body').removeClass('layuimini-all');
					$('.layui-layout-body').addClass('layuimini-mini');
				} else { // 正常
					$('.layuimini-tool [data-side-fold]').attr('data-side-fold', 1);
					$('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-outdent');
					$('.layui-layout-body').removeClass('layuimini-mini');
					$('.layui-layout-body').addClass('layuimini-all');
					layer.close(window.openTips);
				}
				element.init();
				layer.close(loading);
			});
			/**
			 * 菜单缩放
			 */
			$('body').on('click', '[data-side-fold]', function() {
				var loading = layer.load(0, {
					shade: false,
					time: 2 * 1000
				});
				var isShow = $('.layuimini-tool [data-side-fold]').attr('data-side-fold');
				if(isShow == 1) { // 缩放
					$('.layuimini-tool [data-side-fold]').attr('data-side-fold', 0);
					$('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-indent');
					$('.layui-layout-body').removeClass('layuimini-all');
					$('.layui-layout-body').addClass('layuimini-mini');
					// $(".menu-li").each(function (idx,el) {
					//     $(el).addClass("hidden-sub-menu");
					// });

				} else { // 正常
					$('.layuimini-tool [data-side-fold]').attr('data-side-fold', 1);
					$('.layuimini-tool [data-side-fold]').attr('class', 'fa fa-outdent');
					$('.layui-layout-body').removeClass('layuimini-mini');
					$('.layui-layout-body').addClass('layuimini-all');
					// $(".menu-li").each(function (idx,el) {
					//     $(el).removeClass("hidden-sub-menu");
					// });
					layer.close(window.openTips);
				}
				element.init();
				layer.close(loading);
			});

			/**
			 * 手机端点开模块
			 */
			$('body').on('click', '.layuimini-header-menu.layuimini-mobile-show dd', function() {
				var loading = layer.load(0, {
					shade: false,
					time: 2 * 1000
				});
				var check = $('.layuimini-tool [data-side-fold]').attr('data-side-fold');
				if(check === "1") {
					$('.layuimini-site-mobile').trigger("click");
					element.init();
				}
				layer.close(loading);
			});
		},

	};

	exports("cpiMenu", cpiMenu);
});