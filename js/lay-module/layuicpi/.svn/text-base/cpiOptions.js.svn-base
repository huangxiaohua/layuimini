/**
 * 初始化基础设置
 */
layui.define(function(exports) {
	/**
		 * 后台框架初始化
		 * @param options.iniUrl   后台初始化接口地址
		 * @param options.clearUrl   后台清理缓存接口
		 * @param options.urlHashLocation URL地址hash定位
		 * @param options.bgColorDefault 默认皮肤
		 * @param options.multiModule 是否开启多模块
		 * @param options.menuChildOpen 是否展开子菜单
		 * @param options.loadingTime 初始化加载时间
		 * @param options.pageAnim iframe窗口动画
		 * @param options.maxTabNum 最大的tab打开数量
		 */
	var options = {};
	    options.urlHashLocation = true; // 是否打开hash定位
		options.bgColorDefault = false; // 主题默认配置
		options.multiModule = true; // 是否开启多模块
		options.menuChildOpen = true; // 是否默认展开菜单
		options.loadingTime = 0; // 初始化加载时间
		options.pageAnim = true; // iframe窗口动画
		options.maxTabNum = 20; // 最大的tab打开数量
		options.logoInfo = {
				"title": "测试项目",
				"image": "../../../images/logo.png"
			};
		options.homeRoute = "home_index1";
	    options.menuList = [
	    {
			"route": "page_basic",
			"unfold": true,
			"child": [
			    {"route": "home_index","child": [{"route": "home_index1"},{"route": "home_index2"},{"route": "home_index3"}]},
				{"route": "menu_list"},
				{"route": "setting_list"},
				{"route": "table_list"},
				{"route": "form_menu","child": [{"route": "form_list"},{"route": "form_step"}]},
				{"route": "login_menu","child": [{"route": "login_001"},{"route": "login_002"}]},
				{"route": "error_menu","child": [{"route": "error404_01"}]},
				{"route": "other_menu","child": [{"route": "button_list"},{"route": "layer_list"}]}
			]
		},
		{
			"route": "page_menu",
			"child": [
			    {"route": "icon_list"},
			    {"route": "icon_picker"},
			    {"route": "color_select"},
				{"route": "table_select"},
				{"route": "upload_list"},
				{"route": "editor_list"},
				{"route": "area_list"}
			]
		},
		{
			"route": "page_other",
			"child": [
			    {
			    	"route": "menu_more",
			    	"child": [
			    	   {"route": "menu_more","child": [{"route": "button_list1","child": [{"route": "button_list2","child": [{"route": "button_list3"},{"route": "button_list4"}]}]}]}
			    	]
			    }
			   
			]
		},
    ];
	
	
	options.getCpiDefalutMenu = function(menuName) {

		return options.menuList[menuName];
	};
	exports("cpiOptions", options);
});