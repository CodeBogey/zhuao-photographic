// 二维码链接
var qr_url = window.location.href;
// 加载路径
var path = ['imgs/'];
// 资源文件数组
var manifest = [
		{src:  path[0]+"back-img.png"},
		{src:  path[0]+"decoration.png"},
		{src:  path[0]+"detail-text.png"},
		// {src:  path[0]+"draw1.gif"},
		{src:  path[0]+"getdraw-img.png"},
		{src:  path[0]+"gift.png"},
		{src:  path[0]+"gold-img.png"},
		{src:  path[0]+"guanbi.png"},
		// {src:  path[0]+"guanbi1.png"},
		{src:  path[0]+"guanbi2.png"},
		// {src:  path[0]+"landscape.gif"},
		// {src:  path[0]+"portrait.gif"},
		{src:  path[0]+"red-body.png"},
		{src:  path[0]+"red-card.png"},
		{src:  path[0]+"red-head.png"},
		{src:  path[0]+"ribbon.png"},
		{src:  path[0]+"rules-img.png"},
		{src:  path[0]+"search-img.png"},
		// {src:  path[0]+"thumb.png"},
		{src:  path[0]+"title-img.png"},
		{src:  path[0]+"video-details-img.png"},
	];
// 预加载对象
var preload;
$(function() {
  window.onorientationchange =orientationChange
  $('.rules').click(function() {
    $('.activity-rules').fadeIn()
  })
  $('.close').click(function() {
    $('.activity-rules').fadeOut()
  })
  $('.back').click(function() {
    $('.loading').fadeIn()
    $('.sign-up').fadeOut()
    $('.square').fadeIn()
    $('.loading').fadeOut()
  })
  // 安卓解决微信内置浏览器打开字体变大
	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
		handleFontSize();
	} else {
		if (document.addEventListener) {
			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
		} else if (document.attachEvent) {
			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  
		}
  }
  // 开始加载图片资源
	setTimeout(function() {
		// 提示在手机端打开
		if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
			startPreload();
		} else {
			$('.loading').hide();
			// 提示非手机端
			$('.cr-page-qr-hint').show();
			$('.cr-ab-qr-hint').qrcode(qr_url);
		}
	}, 100);


})
/**
 * 安卓解决微信内置浏览器打开字体变大
 */
function handleFontSize() {
	// 设置网页字体为默认大小
	WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
	// 重写设置网页字体大小的事件
	WeixinJSBridge.on('menu:setfont', function() {
		WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
	});
}
/**
 * 判断横屏竖屏
 */
function orientationChange() {
	switch(window.orientation) {
	  case -90: 
      $('.cr-page-screen-hint').show();
      $('.home').hide()
			break;
	  case 90:
      $('.cr-page-screen-hint').show();
      $('.home').hide()    
			break;
	  case 0:
	  case 180:
      $('.cr-page-screen-hint').hide();
      $('.home').show()  
			break;
	}
}
/**
 * 开始预加载
 */
function startPreload() {
	preload = new createjs.LoadQueue(true);
	//注意加载音频文件需要调用如下代码行
	preload.installPlugin(createjs.Sound);         
	preload.on("fileload", handleFileLoad);
	preload.on("progress", handleFileProgress);
	preload.on("complete", loadComplete);
	preload.on("error", loadError);
	preload.loadManifest(manifest);
}
/**
 * 处理单个文件加载
 * @param {Object} event
 */
function handleFileLoad(event) {
	// console.log("文件类型: " + event.item.type);
}
 
/**
 * 处理加载错误：大家可以修改成错误的文件地址，可在控制台看到此方法调用
 * @param {Object} evt
 */
function loadError(evt) {
	console.log("加载出错！",evt.text);
}
/**
 * 已加载完毕进度 
 * @param {Object} event
 */
function handleFileProgress(event) {
	var loading_num = preload.progress*100|0;
	$('.cr-loading-number').html('页面加载中 '+loading_num + '%');
	$('.cr-loading-rate').css('width', loading_num + '%');
}
/**
 * 全度资源加载完毕
 * @param {Object} event
 */
function loadComplete(event) {
	console.log("已加载完毕全部资源");
	$('.loading').fadeOut();
	$('.home').fadeIn();
	// $('.lucky-draw').fadeIn();
	// $('.mask').fadeIn();
	// $('.app-login').fadeIn()
}