var faustcplus=require('faustcplus-node');
var keystone = require('../../'),

exports = module.exports = function(req, res) {

	var sendResponse = function(status) {
		res.json(status);
	};

	var sendError = function(key, err, msg) {
		msg = msg || 'API Error';
		key = key || 'unknown error';
		msg += ' (' + key + ')';
		console.log(msg + (err ? ':' : ''));
		if (err) {
			console.log(err);
		}
		res.status(500);
		sendResponse({ error: key || 'error', detail: err ? err.message : '' });
	};
	//先保存到临时目录
	faustcplus.saveImages(req,keystone.get('tempUpload')).done(function(images){
		sendResponse({
			flag:true,
			images:images.names
		});		
	});
};
