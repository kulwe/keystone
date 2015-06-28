var keystone = require('../../'),
	session = require('../../lib/session');

exports = module.exports = function(req, res) {
	
	var renderView = function() {
		keystone.render(req, res, 'signin', {
			submitted: req.body,
			from: req.query.from,
			logo: keystone.get('signin logo')
		});
	};

	// If a form was submitted, process the login attempt
	if (req.method === 'POST') {

		if (!keystone.security.csrf.validate(req)) {
			req.flash('error', 'T宝觉得请求有些问题，按F5刷新一下试试。');
			return renderView();
		}
		
		if (!req.body.phone || !req.body.password) {
			req.flash('error', '手机号和密码不对，请重新输入');
			return renderView();
		}
		
		var onSuccess = function(user) {

			if (req.query.from && req.query.from.match(/^(?!http|\/\/|javascript).+/)) {
				res.redirect(req.query.from);
			} else if ('string' === typeof keystone.get('signin redirect')) {
				res.redirect(keystone.get('signin redirect'));
			} else if ('function' === typeof keystone.get('signin redirect')) {
				keystone.get('signin redirect')(user, req, res);
			} else if(checkCustomAndRedirect(req,res)){
				//普通用户跳转到首页
			} else{
				res.redirect('/keystone');
			}

		};

		var onFail = function() {
			req.flash('error', '手机号和密码不匹配！');
			renderView();
		};

		session.signin(req.body, req, res, onSuccess, onFail);

	}
	else {
		//转跳首页
		checkCustomAndRedirect(req,res)||renderView();
	}

};

function checkCustomAndRedirect(req,res){
	if(req.user&&req.user.role===0){
		res.redirect('/mhome/')
		return true;
	}
	return false;
}
