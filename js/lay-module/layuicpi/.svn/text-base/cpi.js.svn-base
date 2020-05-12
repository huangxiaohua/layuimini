layui.define(["element", "jquery"], function(exports) {
	var element = layui.element,
		$ = layui.$,
		layer = layui.layer;
	var cpi = {};

	var version = "smarteducpc2018122200858";
	var isDevelopment = true; //是否为开发环境,true=开发环境,false = 生产环境;

	cpi.initCpi = function(args) {
		/*
		 * if (projectName == "" && projectName == null && projectName ==
		 * undefined) { alert("初始化失败,没有定义全局参数projectName(项目名称)");
		 * window.close(); return; } if (projectFrameUrl == "" &&
		 * projectFrameUrl == null && projectFrameUrl == undefined) {
		 * alert("初始化失败,没有定义全局参数projectFrameUrl(frame地址)"); window.close();
		 * return; }
		 */
	};
	cpi.navigatePushHistory = function(page) {
		var state = {
			title: "title",
			url: "#" + page
		};
		window.history.pushState(state, state.title, state.url);
	};

	//创建Loading
	function createModuleLoading(moduleId) {
		var layerHtml = "<div id='moduleLoading'><img src='images/main/loading.gif' /></div>";
		$("#" + moduleId).append(layerHtml);
	}
	//销毁Loading
	function destroyModuleLoading(moduleId) {
		$("#moduleLoading").remove();
	}
	cpi.openModuleLoading = function(moduleId) {
		if(top.location == self.location) {
			createModuleLoading(moduleId);
		} else {
			window.parent.$cpi.openModuleLoading(moduleId);
		}

	};
	cpi.closeModuleLoading = function(moduleId) {
		if(top.location == self.location) {
			destroyModuleLoading(moduleId);
		} else {
			window.parent.$cpi.destroyModuleLoading(moduleId);
		}
	};

	function getIframeVersion() {
		if(isDevelopment) {
			return Math.random();
		} else {
			return version;
		}

	}
	// 打开layer,layer是否缓存?
	function createLayer(containerType, moduleId, fileUrl, param) {
		var layerId = moduleId + "_" + fileUrl;
		//如果存在就移除
		if(document.getElementById(layerId)) {
			$("#" + layerId).remove();
		}
		var menuUrl = htmlFileName[fileUrl];
		var layerHtml = "<div class='cpi_layer' id='" + layerId + "'><iframe src='" + menuUrl + "?version=" + getIframeVersion() + "' name='" + layerId + "'></iframe></div>";
		if(containerType == "module") {
			$("#module_" + moduleId).append(layerHtml);
		} else if(containerType == "dialog") {
			$("#dialog_" + moduleId).append(layerHtml);
		} else {
			$("#" + moduleId).append(layerHtml);
		}
		//参数放在结构上
		//$("#" + layerId).data(param);
		setLayerParam(moduleId, fileUrl, param);
	}
	cpi.openLayer = function(containerType, moduleId, fileUrl, param) {
		if(top.location == self.location) {
			createLayer(containerType, moduleId, fileUrl, param);
		} else {
			window.parent.$cpi.openLayer(containerType, moduleId, fileUrl, param);
		}
	};
	//获得参数
	function getLayerParam(moduleId, fileUrl) {
		var layerId = moduleId + "_" + fileUrl;
		var param = $("#" + layerId).data("param");
		//console.log("param=" + param);
		return JSON.parse(param);
	}
	cpi.getLayerParam = function(moduleId, fileUrl) {
		if(top.location == self.location) {
			return getLayerParam(moduleId, fileUrl);
		} else {
			return window.parent.$cpi.getLayerParam(moduleId, fileUrl);
		}
	};
	//设置参数
	function setLayerParam(moduleId, fileUrl, param) {
		var layerId = moduleId + "_" + fileUrl;

		$("#" + layerId).data("param", JSON.stringify(param));
	}
	cpi.setLayerParam = function(moduleId, fileUrl, param) {
		if(top.location == self.location) {
			setLayerParam(moduleId, fileUrl, param);
		} else {
			window.parent.$cpi.setLayerParam(moduleId, fileUrl, param);
		}
	};
	//打开新的窗口
	function openModuleLayer(moduleId, fileUrl, title, icon) {
		if(moduleId != "" && fileUrl != "") {
			if(!$('#moduleContainer').tabs('exists', title)) {
				$('#moduleContainer').tabs({
					onClose: function(title, index) {
						//alert(title + ":" + index + ":" + this.ids);
					},
					onAdd: function(title, index) {
						createLayer("module", moduleId, fileUrl, {});
						//bandMainPanleTabEvent();
					}
				}).tabs('add', {
					title: title,
					ids: moduleId,
					content: "<div id='module_" + moduleId + "' class='cpi_module'></div>",
					icon: icon,
					closable: true
				});
			} else {

				$('#moduleContainer').tabs('select', title);
			}
		}
	}
	cpi.openModuleLayer = function(moduleId, fileUrl, title, icon) {
		if(top.location != self.location) {
			window.parent.$cpi.openModuleLayer(moduleId, fileUrl, title, icon);
		} else {
			openModuleLayer(moduleId, fileUrl, title, icon);
		}
	};

	// 创建Dialog
	function createDialog(moduleId, fileUrl, dialogParam) {
		var layerId = moduleId + "_" + fileUrl;
		if(document.getElementById(layerId)) {
			$("#cpi_dialog_" + moduleId).dialog('destroy');
		}
		var layerHtml = "<div id='cpi_dialog_" + moduleId + "' class='cpi_dialog_container'></div>";
		//加入到容器
		$("#dialogContainer").append(layerHtml);
		//弹出
		$("#cpi_dialog_" + moduleId).dialog({
			title: dialogParam.title,
			width: dialogParam.width,
			height: dialogParam.height,
			closed: dialogParam.closed,
			resizable: dialogParam.resizable,
			iconCls: dialogParam.iconCls,
			content: "<div id='dialog_" + moduleId + "' class='cpi_dialog'></div>",
			modal: dialogParam.modal,
			onClose: function() {
				$(this).dialog('destroy');
			},
		});
		var cpiParam = dialogParam.cpiParam;
		if(cpiParam == undefined && cpiParam == null) {
			cpiParam = {}
		}
		createLayer("dialog", moduleId, fileUrl, cpiParam);
	}
	// 打开dialog
	cpi.openDialog = function(moduleId, fileUrl, dialogParam) {
		if(top.location != self.location) {
			window.parent.$cpi.openDialog(moduleId, fileUrl, dialogParam);
		} else {
			createDialog(moduleId, fileUrl, dialogParam);
		}

	};

	function closeDialog(moduleId) {
		$("#cpi_dialog_" + moduleId).dialog('destroy');
	}
	cpi.closeDialog = function(moduleId) {
		if(top.location != self.location) {
			window.parent.$cpi.closeDialog(moduleId);
		} else {
			closeDialog(moduleId);
		}
	};

	function getFrameObject(moduleId, fileUrl) {
		return window.frames[moduleId + "_" + fileUrl];
	}
	cpi.getFrameObject = function(moduleId, fileUrl) {
		if(top.location != self.location) {
			return window.parent.$cpi.getFrameObject(moduleId, fileUrl);
		} else {
			return getFrameObject(moduleId, fileUrl);
		}
	};
	//权限数据
	cpi.setAuthorityData = function(param) {
		if(top.location != self.location) {
			window.parent.$cpi.setAuthorityData(param);
		} else {
			$("#mainContainer").data("param", JSON.stringify(param));
		}
	};
	cpi.getAuthorityData = function() {
		if(top.location != self.location) {
			return window.parent.$cpi.getAuthorityData();
		} else {
			var param = $("#mainContainer").data("param");
			//console.log("param312=" + param);
			return JSON.parse(param);
		}
	};
	cpi.ajaxRequestJson = function(args, callback) {
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
	};
	cpi.messagerAlert = function(title, msg, icon) {
		if(top.location != self.location) {
			window.parent.$.messager.alert(title, msg, icon);
		} else {
			$.messager.alert(title, msg, icon);
		}
	};
	cpi.messagerShow = function(json) {
		if(top.location != self.location) {
			window.parent.$.messager.show(json);
		} else {
			$.messager.show(json);
		}
	};

	cpi.messShow = function(title, msgString) {
		if(top.location != self.location) {
			window.parent.$cpi.messShow(title, msgString);
		} else {
			$.messager.show({
				title: title,
				msg: msgString,
				timeout: 5000,
				showType: 'slide'
			});
		}

	};
	cpi.messagerConfirm = function(title, msg, fn) {
		if(top.location != self.location) {
			window.parent.$.messager.confirm(title, msg, fn);
		} else {
			$.messager.confirm(title, msg, fn);
		}
	};
	cpi.destroyLoading = function(moduleId) {
		if(top.location != self.location) {
			window.parent.$cpi.destroyLoading(moduleId);
		} else {
			$("#loading_" + moduleId).remove();
		}

	};

	/*
	function clockon() {
		var now = new Date();
		var year = now.getFullYear(); //getFullYear getYear
		var month = now.getMonth();
		var date = now.getDate();
		var day = now.getDay();
		var hour = now.getHours();
		var minu = now.getMinutes();
		var sec = now.getSeconds();
		var week;
		month = month + 1;
		if(month < 10) month = "0" + month;
		if(date < 10) date = "0" + date;
		if(hour < 10) hour = "0" + hour;
		if(minu < 10) minu = "0" + minu;
		if(sec < 10) sec = "0" + sec;
		var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
		week = arr_week[day];
		var time = "";
		time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;

		$("#bgclock").html(time);

		var timer = setTimeout("clockon()", 200);
	}
	*/
	exports("cpi", cpi);
});