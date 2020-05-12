/**
 * date:2020/02/27
 * author:Mr.Chung
 * version:2.0
 * description:layuimini 主体框架扩展
 */
layui.define(["jquery", "cpiMenu", "element", "cpiTab", "cpiTheme", "cpiOptions", "cpiRoute"], function(exports) {
	var $ = layui.$,
		layer = layui.layer,
		cpiMenu = layui.cpiMenu,
		cpiOptions = layui.cpiOptions,
		cpiTheme = layui.cpiTheme,
		element = layui.element,
		cpiRoute = layui.cpiRoute,
		cpiTab = layui.cpiTab;

	if(!/http(s*):\/\//.test(location.href)) {
		var tips = "请先将项目部署至web容器（Apache/Tomcat/Nginx/IIS/等），否则部分数据将无法显示";
		return layer.alert(tips);
	}

	var cpiAdmin = {
		/*渲染主界面*/
		renderMainIndex: function(menuList) {
			//cpiAdmin.renderClear(options.clearUrl);
			cpiAdmin.renderLogo(cpiOptions.logoInfo);
			cpiAdmin.renderHome(cpiOptions.homeRoute);
			cpiAdmin.renderAnim(cpiOptions.pageAnim);
			cpiAdmin.listen();
			cpiAdmin.deleteLoader(cpiOptions.loadingTime);
			cpiAdmin.renderMenu(menuList);
			cpiTab.render({
				filter: 'layuiminiTab',
				menuList: menuList,
				listenSwichCallback: function() {
					cpiAdmin.renderDevice();
				}
			});
			cpiTheme.render({
				bgColorDefault: cpiOptions.bgColorDefault,
				listen: true,
			});

		},
		/*渲染普通界面*/
		render: function() {
			cpiTab.listen();
		},
		/*打开新界面,并传递参数*/
		openNewPage: function(route, params) {
			cpiTab.openSystemRoute(route, params);
		},
		/*打开新对话框,并传递参数*/
		openNewDialog: function(route, params) {
			cpiTab.openSystemDialogRoute(route, params);
		},
		/*获取传递参数*/
		getRouteParams: function(route) {
			return cpiTab.getRouteParam(route);
		},
		/*创建菜单渲染*/
		renderMenu: function(menuData) {
			cpiMenu.render(menuData);
		},
		openMainIndex: function() {
			var routeInfo = cpiRoute.getRoute("main_index");
			//alert(routeInfo.url);
			if(top.location != self.location) {
				window.location = routeInfo.url;
			} else {
				parent.window.location.href = routeInfo.url;

			}
		},
		openLoginPage: function() {
			//var routeInfo = cpiRoute.getRoute("main_index");
			//alert(routeInfo.url);
			var url="../../../index.html";
			if(top.location != self.location) {
				window.location = url;
			} else {
				parent.window.location.href = url;

			}
		},
		ajaxRequestJson: function(args, callback) {
			$.ajax({
				method: args.method,
				url: projectName + args.url,
				data: args.values,
				timeout: 30000,
				cache: false,
				dataType: "json",
				beforeSend: function(request) {
					//请求前的处理
					console.log("beforeSend_request=" + request);
				},
				success: function(data, status) {
					//请求成功时处理
					console.log("success_1data=" + JSON.stringify(data));
					console.log("success_1status=" + status);
					if(data.code == 2) {
						alert(data.info);
						parent.window.location.href = frontProjectName;
					} else {
						callback(data, status);
					}
				},
				complete: function(request, status) {
					//请求完成的处理
					console.log("complete_request=" + request);
					console.log("complete_status=" + status);
				},
				error: function(request, status, error) {
					//请求出错处理
					console.log("error_request=" + request);
					console.log("error_status=" + status);
					console.log("error_error=" + error);

				}

			})
		},
		/**
		 * 初始化logo
		 * @param data
		 */
		renderLogo: function(data) {
			var html = '<a href="' + data.href + '"><img src="' + data.image + '" alt="logo"><h1>' + data.title + '</h1></a>';
			$('.layuimini-logo').html(html);
		},

		/**
		 * 初始化首页
		 * @param homeRoute
		 */
		renderHome: function(homeRoute) {
			//			var menuInfo = cpiRoute.getRoute(homeRoute);
			//			sessionStorage.setItem('layuiminiHomeHref', homeRoute);
			//			$('#layuiminiHomeTabId').html('<span class="layuimini-tab-active"></span><span class="disable-close">' + menuInfo.title + '</span><i class="layui-icon layui-unselect layui-tab-close">ဆ</i>');
			//			$('#layuiminiHomeTabId').attr('lay-id', homeRoute);
			//			$('#layuiminiHomeTabIframe').html('<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" name="' + homeRoute + '"  src="' + menuInfo.url + '"></iframe>');
			cpiTab.renderHome(homeRoute);
		},

		/**
		 * 初始化缓存地址
		 * @param clearUrl
		 */
		renderClear: function(clearUrl) {
			$('.layuimini-clear').attr('data-href', clearUrl);
		},

		/**
		 * 初始化iframe窗口动画
		 * @param anim
		 */
		renderAnim: function(anim) {
			if(anim) {
				$('#layuimini-bg-color').after('<style id="layuimini-page-anim">' +
					'.layui-tab-item.layui-show {animation:moveTop 1s;-webkit-animation:moveTop 1s;animation-fill-mode:both;-webkit-animation-fill-mode:both;position:relative;height:100%;-webkit-overflow-scrolling:touch;}\n' +
					'@keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n' +
					'    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n' +
					'}\n' +
					'@-o-keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n' +
					'    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n' +
					'}\n' +
					'@-moz-keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n' +
					'    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n' +
					'}\n' +
					'@-webkit-keyframes moveTop {0% {opacity:0;-webkit-transform:translateY(30px);-ms-transform:translateY(30px);transform:translateY(30px);}\n' +
					'    100% {opacity:1;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);}\n' +
					'}' +
					'</style>');
			}
		},

		fullScreen: function() {
			var el = document.documentElement;
			var rfs = el.requestFullScreen || el.webkitRequestFullScreen;
			if(typeof rfs != "undefined" && rfs) {
				rfs.call(el);
			} else if(typeof window.ActiveXObject != "undefined") {
				var wscript = new ActiveXObject("WScript.Shell");
				if(wscript != null) {
					wscript.SendKeys("{F11}");
				}
			} else if(el.msRequestFullscreen) {
				el.msRequestFullscreen();
			} else if(el.oRequestFullscreen) {
				el.oRequestFullscreen();
			} else if(el.webkitRequestFullscreen) {
				el.webkitRequestFullscreen();
			} else if(el.mozRequestFullScreen) {
				el.mozRequestFullScreen();
			} else {
				cpiAdmin.error('浏览器不支持全屏调用！');
			}
		},

		/**
		 * 退出全屏
		 */
		exitFullScreen: function() {
			var el = document;
			var cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.exitFullScreen;
			if(typeof cfs != "undefined" && cfs) {
				cfs.call(el);
			} else if(typeof window.ActiveXObject != "undefined") {
				var wscript = new ActiveXObject("WScript.Shell");
				if(wscript != null) {
					wscript.SendKeys("{F11}");
				}
			} else if(el.msExitFullscreen) {
				el.msExitFullscreen();
			} else if(el.oRequestFullscreen) {
				el.oCancelFullScreen();
			} else if(el.mozCancelFullScreen) {
				el.mozCancelFullScreen();
			} else if(el.webkitCancelFullScreen) {
				el.webkitCancelFullScreen();
			} else {
				cpiAdmin.error('浏览器不支持全屏调用！');
			}
		},

		/**
		 * 初始化设备端
		 */
		renderDevice: function() {
			if(cpiAdmin.checkMobile()) {
				$('.layuimini-tool i').attr('data-side-fold', 1);
				$('.layuimini-tool i').attr('class', 'fa fa-outdent');
				$('.layui-layout-body').removeClass('layuimini-mini');
				$('.layui-layout-body').addClass('layuimini-all');
			}
		},

		/**
		 * 初始化加载时间
		 * @param loadingTime
		 */
		deleteLoader: function(loadingTime) {
			setTimeout(function() {
				$('.layuimini-loader').fadeOut();
			}, loadingTime * 1000)
		},

		/**
		 * 成功
		 * @param title
		 * @returns {*}
		 */
		success: function(title) {
			return layer.msg(title, {
				icon: 1,
				shade: this.shade,
				scrollbar: false,
				time: 2000,
				shadeClose: true
			});
		},

		/**
		 * 失败
		 * @param title
		 * @returns {*}
		 */
		error: function(title) {
			return layer.msg(title, {
				icon: 2,
				shade: this.shade,
				scrollbar: false,
				time: 3000,
				shadeClose: true
			});
		},

		/**
		 * 判断是否为手机
		 * @returns {boolean}
		 */
		checkMobile: function() {
			var ua = navigator.userAgent.toLocaleLowerCase();
			var pf = navigator.platform.toLocaleLowerCase();
			var isAndroid = (/android/i).test(ua) || ((/iPhone|iPod|iPad/i).test(ua) && (/linux/i).test(pf)) ||
				(/ucweb.*linux/i.test(ua));
			var isIOS = (/iPhone|iPod|iPad/i).test(ua) && !isAndroid;
			var isWinPhone = (/Windows Phone|ZuneWP7/i).test(ua);
			var clientWidth = document.documentElement.clientWidth;
			if(!isAndroid && !isIOS && !isWinPhone && clientWidth > 1024) {
				return false;
			} else {
				return true;
			}
		},

		/**
		 * 监听
		 */
		listen: function() {

			/**
			 * 清理
			 */
			$('body').on('click', '[data-clear]', function() {
				var loading = layer.load(0, {
					shade: false,
					time: 2 * 1000
				});
				sessionStorage.clear();

				// 判断是否清理服务端
				var clearUrl = $(this).attr('data-href');
				if(clearUrl != undefined && clearUrl != '' && clearUrl != null) {
					$.getJSON(clearUrl, function(data, status) {
						layer.close(loading);
						if(data.code != 1) {
							return cpiAdmin.error(data.msg);
						} else {
							return cpiAdmin.success(data.msg);
						}
					}).fail(function() {
						layer.close(loading);
						return cpiAdmin.error('清理缓存接口有误');
					});
				} else {
					layer.close(loading);
					return cpiAdmin.success('清除缓存成功');
				}
			});

			/**
			 * 刷新
			 */
			$('body').on('click', '[data-refresh]', function() {
				$(".layui-tab-item.layui-show").find("iframe")[0].contentWindow.location.reload();
				cpiAdmin.success('刷新成功');
			});

			/**
			 * 监听提示信息
			 */
			$("body").on("mouseenter", ".layui-nav-tree .menu-li", function() {
				if(cpiAdmin.checkMobile()) {
					return false;
				}
				var classInfo = $(this).attr('class'),
					tips = $(this).prop("innerHTML"),
					isShow = $('.layuimini-tool i').attr('data-side-fold');
				if(isShow == 0 && tips) {
					tips = "<ul class='layuimini-menu-left-zoom layui-nav layui-nav-tree layui-this'><li class='layui-nav-item layui-nav-itemed'>" + tips + "</li></ul>";
					window.openTips = layer.tips(tips, $(this), {
						tips: [2, '#2f4056'],
						time: 300000,
						skin: "popup-tips",
						success: function(el) {
							var left = $(el).position().left - 10;
							$(el).css({
								left: left
							});
							element.render();
						}
					});
				}
			});

			$("body").on("mouseleave", ".popup-tips", function() {
				if(cpiAdmin.checkMobile()) {
					return false;
				}
				var isShow = $('.layuimini-tool i').attr('data-side-fold');
				if(isShow == 0) {
					try {
						layer.close(window.openTips);
					} catch(e) {
						console.log(e.message);
					}
				}
			});

			/**
			 * 全屏
			 */
			$('body').on('click', '[data-check-screen]', function() {
				var check = $(this).attr('data-check-screen');
				if(check == 'full') {
					cpiAdmin.fullScreen();
					$(this).attr('data-check-screen', 'exit');
					$(this).html('<i class="fa fa-compress"></i>');
				} else {
					cpiAdmin.exitFullScreen();
					$(this).attr('data-check-screen', 'full');
					$(this).html('<i class="fa fa-arrows-alt"></i>');
				}
			});

			/**
			 * 点击遮罩层
			 */
			$('body').on('click', '.layuimini-make', function() {
				cpiAdmin.renderDevice();
			});

		}
	};

	exports("cpiAdmin", cpiAdmin);
});