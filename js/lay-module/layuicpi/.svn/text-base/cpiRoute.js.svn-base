/**
 * date:2020/04/19
 * author:Mr.Wu
 * version:2.0
 * description:layuicpi路由
 *             包含:
 */
layui.define(function(exports) {
	var route = {};
	var pathName = window.document.location.pathname;
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	
	route.routeList = {
		"page_basic": {
			"title": "常规管理",
			"icon": "fa fa-address-book",
			"url": ""
		},
		"main_index": {
			"title": "首页",
			"icon": "fa fa-address-book",
			"url": "html/system/main/main_index.html"
		},
		"main_error": {
			"title": "页面错误",
			"icon": "fa fa-address-book",
			"url": "../../../html/system/main/main_error.html"
		},
		"user_password": {
			"title": "修改密码",
			"icon": "fa fa-address-book",
			"url": "../../../html/system/main/user_password.html"
		},
		"user_setting": {
			"title": "基本资料",
			"icon": "fa fa-address-book",
			"url": "../../../html/system/main/user_setting.html"
		},
		"home_index": {
			"title": "主页模板",
			"icon": "fa fa-home",
			"url": ""
		},
		"home_index1": {
			"title": "主页一",
			"icon": "fa fa-tachometer",
			"url": "../../../html/system/home/home_index1.html"
		},
		"home_index2": {
			"title": "主页二",
			"icon": "fa fa-tachometer",
			"url": "../../../html/system/home/home_index2.html"
		},
		"home_index3": {
			"title": "主页三",
			"icon": "fa fa-tachometer",
			"url": "../../../html/system/home/home_index3.html"
		},
		"menu_list": {
			"title": "菜单管理",
			"icon": "fa fa-window-maximize",
			"url": "../../../html/module/menu/menu_list.html"
		},
		"setting_list": {
			"title": "系统设置",
			"icon": "fa fa-gears",
			"url": "../../../html/module/setting/setting_list.html"
		},
		"table_list": {
			"title": "表格示例",
			"icon": "fa fa-file-text",
			"url": "../../../html/module/table/table_list.html"
		},
		"form_menu": {
			"title": "表单示例",
			"icon": "fa fa-calendar",
			"url": ""
		},
        "form_list": {
			"title": "普通表单",
			"icon": "fa fa-list-alt",
			"url": "../../../html/module/form/form_list.html"
		},
		"form_step": {
			"title": "分步表单",
			"icon": "fa fa-navicon",
			"url": "../../../html/module/form/form_step.html"
		},
		"login_menu": {
			"title": "登录模板",
			"icon": "fa fa-flag-o",
			"url": ""
		},
		"login_001": {
			"title": "登录-001",
			"icon": "fa fa-stumbleupon-circle",
			"url": "../../../html/module/login/login_001.html",
			"target": "_blank"
		},
		"login_002": {
			"title": "登录-002",
			"icon": "fa fa-viacoin",
			"url": "../../../html/module/login/login_002.html",
			"target": "_blank"
		},
		"error_menu": {
			"title": "异常页面",
			"icon": "fa fa-home",
			"url": ""
		},
		"error404_01": {
			"title": "404页面",
			"icon": "fa fa-hourglass-end",
			"url": "../../../html/module/error/error404_01.html"
		},
		"other_menu": {
			"title": "其它界面",
			"icon": "fa fa-snowflake-o",
			"url": ""
		},
		"button_list": {
			"title": "按钮示例",
			"icon": "fa fa-snowflake-o",
			"url": "../../../html/module/other/button_list.html"
		},
		"layer_list": {
			"title": "弹出层",
			"icon": "fa fa-shield",
			"url": "../../../html/module/other/layer_list.html"
		},
		"page_menu": {
			"title": "组件管理",
			"icon": "fa fa-lemon-o",
			"url": ""
		},
		"icon_list": {
			"title": "图标列表",
			"icon": "fa fa-dot-circle-o",
			"url": "../../../html/module/page/icon_list.html"
		},
		"icon_picker": {
			"title": "图标选择",
			"icon": "fa fa-adn",
			"url": "../../../html/module/page/icon_picker.html"
		},
		"color_select": {
			"title": "颜色选择",
			"icon": "fa fa-dashboard",
			"url": "../../../html/module/page/color_select.html"
		},
		"table_select": {
			"title": "下拉选择",
			"icon": "fa fa-angle-double-down",
			"url": "../../../html/module/page/table_select.html"
		},
		"upload_list": {
			"title": "文件上传",
			"icon": "fa fa-arrow-up",
			"url": "../../../html/module/page/upload_list.html"
		},
		"editor_list": {
			"title": "富文本编辑器",
			"icon": "fa fa-rocket",
			"url": "../../../html/module/page/editor_list.html"
		},
		"area_list": {
			"title": "省市县区选择器",
			"icon": "fa fa-rocket",
			"url": "../../../html/module/page/area_list.html"
		},
		"page_other": {
			"title": "其他管理",
			"icon": "fa fa-slideshare",
			"url": ""
		},
		"menu_more": {
			"title": "多级菜单",
			"icon": "fa fa-meetup",
			"url": ""
		},
		"button_list1": {
			"title": "按钮1",
			"icon": "fa fa-calendar",
			"url": "../../../html/module/other/button_list.html"
		},
		"button_list2": {
			"title": "按钮1",
			"icon": "fa fa-calendar",
			"url": "../../../html/module/other/button_list.html"
		},
		"button_list3": {
			"title": "按钮1",
			"icon": "fa fa-calendar",
			"url": "../../../html/module/other/button_list.html"
		},
		"button_list4": {
			"title": "按钮1",
			"icon": "fa fa-calendar",
			"url": "../../../html/module/other/button_list.html"
		},
	};
	route.getRoute = function(routeName) {

		return route.routeList[routeName];
	};
	exports("cpiRoute", route);
});