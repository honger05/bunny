define(function(require,exports,module){
	
	require('./tab.css');
	var Tab = {};
	
	Tab.TabPanel = function(config){
		var _self = this;
		_self.$tabs = $(config.tabs);
		_self.$contents = $(config.contents);
		
		_self.$tabs.on('click',function(){
			var n = $('.clui-tab-item').index($(this));
			_self.showItem(n);
			_self.changeTab && _self.changeTab();
		});
		
		_self.showItem(0);
	}
	
	Tab.TabPanel.prototype = {
		showItem: function(n){
			this.$preTab && this.$preTab.removeClass('active');
			this.$preTab = $(this.$tabs[n]);
			this.$preTab.addClass('active');
			
			this.$preContent && this.$preContent.hide();
			this.$preContent = $(this.$contents[n]);
			this.$preContent.show();
		}
	}
	
	module.exports = Tab;
});