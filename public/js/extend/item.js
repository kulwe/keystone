/**
 * Created by kule on 2015/6/14.
 */
jQuery(function(){
	var $=jQuery;
	
	var jqFaustcplus=$('#Faustcplus');
	if(jqFaustcplus.length>0){
		initFaustcplus();	
	}
	
	function getPath(str){
		return /^(http:|\/)/i.test(str)?
			str:
			'/data/'+str;
	}
	function initFaustcplus(){
		var path='/keystone/js/lib/faustcplus/';
		var defaultImg=jqFaustcplus.data('img');
		
		defaultImg=defaultImg?
			getPath(defaultImg):
			path+"default.jpg";

		var flashvars = {
			"jsfunc": "FaustCplusAjaxCallBack",
			"imgUrl": defaultImg,
			"pid": "75642723",
			"showBrow": true,
			"showCame": false,
			"uploadSrc": false,
			"pSize": '300|300|300|300',//前2个参数为裁剪窗口大小
			"uploadUrl": '/keystone/upload',
			"jslang":function(){
				return{
					"CX0193": "仅支持JPG，PNG，GIF图片文件，且文件小于2M",
					"CX0189": "您上传的图片会自动生成两种尺寸\n请注意中小尺寸的图片是否清晰"
				}
			}
		};

		var params = {
			menu: "false",
			scale: "Scale",
			allowFullscreen: "true",
			allowScriptAccess: "always",
			wmode: "transparent",
			bgcolor: "#FFFFFF"
		};

		var attributes = {
			id: "FaustCplus"
		};

		swfobject.embedSWF(path+"FaustCplus.swf", "Faustcplus", "650", "500", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
	};
	
});
function FaustCplusAjaxCallBack(res) {
	res=JSON.parse(res);
	var jqInput;
	if (res.flag) {
		$('#FaustCplus').closest('.faustcplusWrap').
			find('.faustcplusInput').
			val(res.images[0]);
		alert('上传成功');
	}
	else {
		alert('上传失败,请刷新页面后重新上传');
	}
}
