


var ReportObject = {
	on : 'pic',
	timeToFade : 30,
	from : User,
	mgs : 'this is bad!!!'
}

var pic150 = {
	title : '',
	desc : '',
	url : 'http://placehold.it/150x150'
};

var pic200 = {
	title : '',
	desc : '',
	url : 'http://placehold.it/200x200'
};

var User = {
	onlineStatus : 'offline',
	pic : pic150,
	status : 'single',
	name : 'ido bamba',
	nick : 'bamba',
	age : 27,
};

var Qustion = {
	isAnswerd : true,
	answer : 'You know the answer',
	q : 'how do you do? dude!',
}

var video = {
	name : 'YUI Open Hours: 3.5.0 Retrospective & 3.6.0 Planning',
	url : '<iframe width="640" height="360" src="http://www.youtube-nocookie.com/embed/cEqFv1xHkP4?rel=0" frameborder="0" allowfullscreen></iframe>'
}

var user = {
	onlineStatus : 'onLine',
	pic : pic150,
	status : 'single',
	name : 'barak igal',
	nick : 'bardak',
	age : 28,
	
	friends : [User, User, User, User, User],
	
	msgs : [{
			from : 'galit',
			txt : 'Hi whats up'
		}, {
			from : 'galit',
			txt : 'Hi whats up'
		}, {
			from : 'galit',
			txt : 'Hi whats up'
		}, {
			from : 'galit',
			txt : 'Hi whats up'
		}, {
			from : 'galit',
			txt : 'Hi whats up'
		}, {
			from : 'galit',
			txt : 'Hi whats up'
		}, {
			from : 'galit',
			txt : 'Hi whats up'
		}
	],
	
	reports : [ReportObject, ReportObject, ReportObject],
	
	accountSetting : {
		userID : '123',
		privecy : {},
		invitedBy : User,
		invetedFriends : [User, User, User],
		iDontWantToSee : [User],
		invisibleTo : [User, User],
	},
	profileWidgets : {
		statusQuize : {
			answerdQustions : [Qustion, Qustion, Qustion]
		},
		visitedProfile : [User],
		secretCrash : {},
		profileChat : {},
		shoutBox : [{
				txt : '',
				date : ''
			}
		],
		videos : [video, video, video, video],
		pics : [pic200, pic200, pic200, pic200, pic200, pic200, pic200, pic200, pic200]
	},
	
}

var pages = {
	myProfile : {
		elemets : ['inviteFriend', 'Nav']
	},
	aUserProfile : {},
	firstImprestion : {
		elemets : ['Login', 'regWithInvation', 'About']
	},
	regWithInvation : {
		elements : ['Title', 'Inetation Ticket', 'Form']
	},
	login : [],
	quize : {
		categories : [{
				qustions : [],
				catName : 'asd'
			}, {
				qustions : [],
				catName : 'qwe'
			}, {
				qustions : [],
				catName : 'cxz'
			}
		],
	},
	search : {
		categoris : [],
		filters : [],
		results : [User, User]
	},
	chat : {}
}

var page = {
	id : 'home',
	header : [{
			type : 'heading1',
			text : 'Build Site With Templator'
		}, {
			type : 'image',
			src : 'd.png',
			alt : 'Lorem Pix'
		}
	],
	nav : [{
			type : 'link',
			url : '#user',
			text : 'User'
		}, {
			type : 'link',
			url : '#about',
			text : 'About'
		}, {
			type : 'link',
			url : '#news',
			text : 'News'
		}, {
			type : 'link',
			url : '#download',
			text : 'Download'
		}
	],
	sidebar : [{
			type : 'link',
			url : '#home',
			text : 'Home'
		}, {
			type : 'link',
			url : '#about',
			text : 'About'
		}, {
			type : 'link',
			url : '#news',
			text : 'News'
		}, {
			type : 'link',
			url : '#download',
			text : 'Download'
		}, {
			type : 'heading',
			text : 'I am a block!'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}, {
			type : 'heading',
			text : 'I am a block!'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}, {
			type : 'heading',
			text : 'I am a block!'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}
	],
	main : [{
			type : 'heading',
			text : 'I am a block!'
		}, {
			type : 'container',
			className : 'bobmba',
			parts : [{
					type : 'heading',
					text : 'I am a block!'
				}, {
					type : 'text_block',
					text : 'I am at the block!'
				}, {
					type : 'heading',
					text : 'I am a block!'
				}, {
					type : 'container',
					className : 'bobmba',
					parts : [{
							type : 'heading',
							text : 'I am a block!'
						}, {
							type : 'text_block',
							text : 'I am at the block!'
						}, {
							type : 'heading',
							text : 'I am a block!'
						}, {
							type : 'container',
							className : 'bobmba',
							parts : [{
									type : 'heading',
									text : 'I am a block!'
								}, {
									type : 'text_block',
									text : 'I am at the block!'
								}, {
									type : 'heading',
									text : 'I am a block!'
								}, {
									type : 'text_block',
									text : 'I am at the block!'
								}, {
									type : 'heading',
									text : 'I am a block!'
								}, {
									type : 'text_block',
									text : 'I am at the block!'
								}
							]
						}, {
							type : 'text_block',
							text : 'I am at the block!'
						}, {
							type : 'heading',
							text : 'I am a block!'
						}, {
							type : 'text_block',
							text : 'I am at the block!'
						}
					]
				}, {
					type : 'text_block',
					text : 'I am at the block!'
				}, {
					type : 'heading',
					text : 'I am a block!'
				}, {
					type : 'text_block',
					text : 'I am at the block!'
				}
			]
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}, {
			type : 'heading',
			text : 'I am at the block!'
		},
		/* {type:'users', user:user},  */{
			type : 'posts',
			posts : [{
					img : {
						type : 'image',
						src : 'd.png',
						alt : 'Lorem Pix'
					},
					title : 'Demo Post',
					text : 'Hi there',
					auther : 'barak',
					jsDate : new Date()
				},
				{
					img : {
						type : 'image',
						src : 'd.png',
						alt : 'Lorem Pix'
					},
					title : 'Demo Post',
					text : 'Hi there',
					auther : 'barak',
					jsDate : new Date()
				},
				{
					img : {
						type : 'image',
						src : 'd.png',
						alt : 'Lorem Pix'
					},
					title : 'Demo Post',
					text : 'Hi there',
					auther : 'barak',
					jsDate : new Date()
				}, {
					img : {
						type : 'image',
						src : 'd.png',
						alt : 'Lorem Pix'
					},
					title : 'Demo Post',
					text : 'Hi there',
					auther : 'barak',
					jsDate : new Date()
				}, {
					img : {
						type : 'image',
						src : 'd.png',
						alt : 'Lorem Pix'
					},
					title : 'Demo Post',
					text : 'Hi there',
					auther : 'barak',
					date : new Date().toString()
				}, {
					img : {
						type : 'image',
						src : 'd.png',
						alt : 'Lorem Pix'
					},
					title : 'Demo Post',
					text : 'Hi there',
					auther : 'barak',
					date : new Date().toString()
				}, {
					img : {
						type : 'image',
						src : 'd.png',
						alt : 'Lorem Pix'
					},
					title : 'Demo Post',
					text : 'Hi there',
					auther : 'barak',
					date : new Date().toString()
				}, {
					img : {
						type : 'image',
						src : 'd.png',
						alt : 'Lorem Pix'
					},
					title : 'Demo Post',
					text : 'Hi there',
					auther : 'barak',
					date : new Date().toString()
				}
			]
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		},
	],
	footer : [{
			type : 'heading',
			text : 'Footer'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		},
	]
};

function now() {
	console.log('Now!!!');
}

var upage = {
	id : 'user',
	header : [{
			type : 'heading1',
			text : 'Build Site With Templator'
		}, {
			type : 'image',
			src : 'd.png',
			alt : 'Lorem Pix'
		}, {
			type : 'function',
			fn : function(){return this.type;}
		}
	],
	nav : [{
			type : 'link',
			url : '#home',
			text : 'Home'
		}, {
			type : 'link',
			url : '#about',
			text : 'About'
		}, {
			type : 'link',
			url : '#news',
			text : 'News'
		}, {
			type : 'link',
			url : '#download',
			text : 'Download'
		}
	],
	sidebar : [{
			type : 'link',
			url : '#home',
			text : 'Home'
		}, {
			type : 'link',
			url : '#about',
			text : 'About'
		}, {
			type : 'link',
			url : '#news',
			text : 'News'
		}, {
			type : 'link',
			url : '#download',
			text : 'Download'
		}, {
			type : 'heading',
			text : 'I am a block!'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}, {
			type : 'heading',
			text : 'I am a block!'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}, {
			type : 'heading',
			text : 'I am a block!'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		}
	],
	main : [{
			type : 'users',
			user : user
		}
	],
	footer : [{
			type : 'heading',
			text : 'Footer'
		}, {
			type : 'text_block',
			text : 'I am at the block!'
		},
	]
}

var bb = new STpl({
		templates : {
			/* 		user : getTpl('#_user'),
			users : getTpl('#_users'),
			friends : getTpl('#_friends'),
			reports : getTpl('#_reports'),
			msgs : getTpl('#_msgs'),
			accountSetting : getTpl('#_accountSetting'),
			profileWidgets : getTpl('#_profileWidgets'),
			pic : getTpl('#_pic'),
			video : getTpl('#_video'),
			Qustion : getTpl('#_Qustion')
			heading: getTpl('#_heading'),
			heading1: getTpl('#_heading1'),
			image: getTpl('#_image'),
			text_block: getTpl('#_text_block'),
			link: getTpl('#_link'),
			posts: getTpl('#_posts'),
			post: getTpl('#_post'),
			header: getTpl('#_header'),
			sidebar: getTpl('#_sidebar'),
			main: getTpl('#_main'),
			nav: getTpl('#_nav'),
			footer: getTpl('#_footer') */
		},
		tpl : getTpl('#_page'),
		data : [page]
	});

var homepage = bb.sTpl({
		data : page
	});
var userpage = bb.sTpl({
		data : upage
	});

window.onhashchange = function (e) {
	
	document.body.innerHTML = '';
	
	console.time('render');
	
	var hash = e.newURL.split('#').pop();
	
	hash = hash || 'home';
	
	if (hash === 'home') {
		
		document.body.innerHTML = homepage;
		
	}
	
	if (hash === 'user') {
		
		document.body.innerHTML = userpage;
		
	}
	
	if (hash === 'about') {
		
		document.body.innerHTML = userpage;
		
	}
	
	console.timeEnd('render');
	
}

window.onhashchange({
	newURL : window.location.hash
});

console.time('append');
/* document.body.innerHTML = res; */
console.timeEnd('append');
/* console.log(res); */
