/**
 * Title: 系统UI入口 工厂模式
 * Author: honger.zheng
 * Date: 2015-01-14
 * */
define('cl-ued/clui/1.0.0/clui',function(require,exports,module){

    require('./css');
    var $ = require('$'),
    	Utils = require('utils');
    	
    window.$ = window.jQuery = $;
    
    var C = require('./code');
    
    var Clui = function(){};
    
    Clui.C = C;
    
    /**
     * tab 选项卡
     * @param config
     */
    Clui.createTabPanel = function(config){
    	return $.Deferred(function(dfd){
	    	require.async('./tab',function(Tab){
	    		config = $.extend({
	                tabs : '.clui-tab-item',
	                contents : '.clui-panel-content',
	            },config);
	            
	            var tabPanel = new Tab.TabPanel(config);
	            
	        	tabPanel.changeTab = function(){
	        		Utils.checkLay();
	        	}
	        	
	        	dfd.resolve(tabPanel);
	    	});
    	});
    };
    
    /**
     * dialog 公共业务
     * @param config
     */
    Clui.createDialog = function(config){
    	var Overlay = require('bui/overlay');
		config = $.extend({
    		title: '公共业务',
    		contentId: '',
    		width:500,
            height:250,
            buttons:[{
            	text:'保存',
            	elCls : 'btn',
            	handler : function(){
            		this.saveHandler && this.saveHandler();
            	}
            },{
            	text:'取消',
            	elCls : 'btn',
            	handler : function(){
            		this.closeHandler && this.closeHandler();
            		this.close();
            	}
            }],
//            cancel: function(){//取消事件
//            },
//            closeable: false
    	},config);
    	
    	var dialog = new Overlay.Dialog(config);
		
    	return dialog;
    };
    
    /**
     * alert 公共模块
     * @param msg,callback,type
     */
    Clui.alert = function(msg,callback,type){
    	return $.Deferred(function(dfd){
	    	require.async('./overlay',function(Olay){
	    		type = type || 'success';
	    		Olay.Message.alert(msg,function(){
	        		callback && callback.call();
	        		dfd.resolve();
	            },type);
	    	});
    	});
    };
    
    /**
     * confirm 公共模块
     * @param msg,callback,type
     */
    Clui.confirm = function(msg,callbackSuc,callbackCan,type){
    	return $.Deferred(function(dfd){
    		require.async('./overlay',function(Olay){
    	    	type = type || 'question';
    	    	Olay.Message.confirm(msg,function(){
    	    		callbackSuc && callbackSuc.call();
    	    		dfd.resolve();
    	        },function(){
    	        	callbackCan && callbackCan.call();
    	        	dfd.reject()
    	        },type);
        	});
    	});
    };
    
    /**
     * show 公共模块 会自动消失的提示信息
     * @param config
     */
    Clui.show = function(msg,type){
    	return $.Deferred(function(dfd){
    		require.async('./overlay',function(Olay){
    	    	type = type || 'info';
    	    	config = {
    				msg : msg,
    	          	type : type,
    	          	delay : 2000,
    	        };
    	    	Olay.Message.show(config);
    	    	dfd.resolve();
        	});
    	})
    };
    
    /**
     * dialog 公告dialog
     * @param config
     */
    Clui.createNoticeDialog = function(config){
    	return $.Deferred(function(dfd){
    		require.async('bui/overlay',function(Overlay){
        		config = $.extend({
            		title:'公告',
                    width:500,
                    height:250,
                    bodyContent:'',
                    bodyContents: [],
                    indexNew: 0,
                    buttons:[{
                        text:'已阅读',
                        elCls : 'btn btn-default el-center',
                        handler : function(){
                        	this.callback(this.indexNew);
                        	var len = this.bodyContents.length;
                    		if(this.indexNew >= len){
                    			this.close();
                    			return;
                    		}
                        	this.changeBdyCnt(this.indexNew);
                        	this.indexNew++
                        }
                    }]
            	},config);
            	
            	Overlay.Dialog.prototype.changeBdyCnt = function(n){
            		var len = this.bodyContents.length;
            		if(n >= len) return;
            		$('.bui-dialog .bui-stdmod-body p').html(this.bodyContents[n]);
            	};
            	
            	var noticeDialog = new Overlay.Dialog(config);
            	
            	dfd.resolve(noticeDialog);
        	});
    	});
    };
    
    /**
     * 图片预览
     */
    Clui.previewImage = function(url){
    	return $.Deferred(function(dfd){
    		require.async('bui/overlay',function(Overlay){
        		var config = $.extend({
            		title:'图片预览',
                    width:600,
                    height:450,
                    bodyContent:'<img src="'+url+'">',
                    buttons:[]
            	});
            	
            	var imgDialog = new Overlay.Dialog(config);
            	imgDialog.show();
            	
            	dfd.resolve(imgDialog);
        	});
    	});
    }
    
    /**
     * custom plupload 上传组件
     * @param config
     */
    Clui.createCusUpload = function(config){
    	return $.Deferred(function(dfd){
    		require.async('plupload',function(Plupload){
        		config = $.extend({
            		runtimes: 'gears,html5,flash,silverlight,browserplus',
            		browse_button: 'pickfiles',
            		container: 'container',
            		filelist: 'filelist',
            		max_file_size: '10mb',
            		url: '/cl-restapi/filer/upload.do',
            		multipart: true,
            		multipart_params: {
            		},
            		file_data_name: 'file',
            		resize: {width: 320, height: 240, quality: 90},
            		flash_swf_url: 'plupload.flash.swf',
            		filters: [
            			{title: 'Image files', extensions: 'jpg,gif,png,bmp,BMP,JPG,JPEG,PNG,GIF'},
            			{title: 'Zip files', extensions: 'zip,rar,7z'},
            			{title: 'word files', extensions: 'word,excel,doc,docx'}
            		],
            		deletes: function(){},
            		limits: 1
            	},config);
            	
            	var uploader = new Plupload.Uploader(config);

            	uploader.bind('Init', function(up, params) {
            		$('#'+config.filelist).html('<span style="color:rgb(203, 197, 197)">最大上传'+config.max_file_size+'，限制数量'+config.limits+'</span>');
            	});

            	uploader.init();

            	uploader.bind('FilesAdded', function(up, files) {
            		
        			while(config.limits < up.files.length){
        				files.shift();
        				up.files.shift();
        			}
        			
        			var $fl = $('#'+config.filelist);
        			plupload.each(files, function(file,index) {
        				if(index == 0) $fl.html('');
        				$fl.append('<span class="fn-mr5" id="' + file.id + '"><a target="_blank" data-filename="'+file.name+'">' + file.name + '</a> (' + plupload.formatSize(file.size) + ') <b></b></span>');
        			});
        				
        			//选中文件后立刻上传
        			uploader.start();
        			return false;
            	});

            	uploader.bind('UploadProgress', function(up, file) {
            		$('#'+file.id).find('b').html('<span>' + file.percent + '%</span>&nbsp;&nbsp;');
            	});
            	
            	uploader.bind('Error', function(up, file) {
            		//'上传图片服务器异常！请稍后重试...'
            		Clui.alert(C.E002).done(function(){
            			var file = up.files.pop();
            			$('#'+file.id).remove();
            		});
            	});
            	
            	uploader.bind('FileUploaded', function(up,file,result) {
            		
        			var url=result.response.replace(/\"/g,'');
        			
        			if(!url){
        				var file = up.files.pop();
        				//'上传失败，请重新上传。'
        				Clui.alert(C.E003);
        				$('#'+file.id).remove();
        				return;
        			}
            		
        			var extension = ['jpg','gif','png','bmp','BMP','JPG','JPEG','PNG','GIF'];
        			var ext = Utils.parseURL(url).file.split('.')[1];
        			
        			var $a = $('#'+file.id).find('a');
        			if($.inArray(ext,extension) !== -1){
        				$a.on('click',function(){
            				Clui.previewImage(url);
            			}).data('dhref',url);
        			}else{
        				$a.attr('href',url);
        				$a.attr('download','download');
        			}
        			
            		var deletes = $('<a href="javascript:void(0);" class="delupload" title="删除"><i class="fa fa-times"></i></a>');
            		$('#'+file.id).find('b').after(deletes).remove();
            		
            		deletes.on('click',function(){
            			var $this = $(this),
            				url = $this.prev().data('dhref'),
            				fileName = $this.prev().attr('data-filename');
            			
            			Utils.ajax({
            				url: '/cl-restapi/filer/delete.do',
            				data: {url:url},
            				successHandler: function(data){
            					console.log(data);
        		    			$this.parent().remove();
        		    			
        		    			for(var i in up.files){
        		    				if(up.files[i].name == fileName){
        		    					up.files.splice(i,1);
        		    				}
        		    			}
        		    			
        		    			if(up.files.length == 0) 
        		    				$('#'+config.filelist).html('<span style="color:rgb(203, 197, 197)">最大上传'+config.max_file_size+'，限制数量'+config.limits+'</span>');
        		    			
        		    			config.deletes.call(this,url,fileName);
            				}
            			});
            		});
            		
            		$('.delupload').on('del.upload',function(){
            			$(this).parent().remove();
            			up.files = [];
            		});
            		
            	});
            	
            	//模拟上传
            	uploader.bind('moniupload', function(up,file,result) {
            		var url = up.files[0].url,
            			fileName = up.files[0].filename;
            		
            		up.del.on('click',function(){
            			$this = $(this);
            			Utils.ajax({
            				url: '/cl-restapi/filer/delete.do',
            				data: {url:url},
            				successHandler: function(data){
            					console.log(data);
        		    			$this.parent().remove();
        		    			for(var i in up.files){
        		    				if(up.files[i].url == url){
        		    					up.files.splice(i,1);
        		    				}
        		    			}
        		    			
        		    			if(up.files.length == 0) 
        		    				$('#'+config.filelist).html('<span style="color:rgb(203, 197, 197)">最大上传'+config.max_file_size+'，限制数量'+config.limits+'</span>');
        		    			
        		    			config.deletes.call(this,url,fileName);
            				}
            			});
            		});
            		
            		$('.delupload').on('del.upload',function(){
            			$(this).parent().remove();
            			up.files = [];
            		});
            	});
            	
            	dfd.resolve(uploader);
    		});
    	});
    };
    
    /**
     * queue plupload 上传组件
     * @param config
     */
    Clui.createQueUpload = function(config){
    	return $.Deferred(function(dfd){
    		require.async(['queue','plupload'],function(){
        		config = $.extend({
            		runtimes : 'html5,flash',
            		url : '../upload.do',
            		max_file_size : '10mb',
            		chunk_size : '1mb',
            		unique_names : true,
            		flash_swf_url : 'plupload.flash.swf',
            		filters : [
            			{title : 'Image files', extensions : 'jpg,gif,png'},
            			{title : 'Zip files', extensions : 'zip,rar'}
            		],
            		resize : {width : 320, height : 240, quality : 90}
            	},config);
            	$("#"+config.browse_button).pluploadQueue(config);
            	dfd.resolve();
        	});
    	});
    };
    
    /**
     * 导出dialog
     * @param config
     */
    Clui.exports = function(downURL){
    	return $.Deferred(function(dfd){
    		require.async('./overlay',function(Olay){
        		Olay.Message.exports(downURL);
        		dfd.resolve();
        	});
    	});
    };
    
    /**
     * 创建导航
     */
    Clui.createTabNav = function(config){
    	return $.Deferred(function(dfd){
    		require.async("bui/tab",function(Tab){
    			var wh = $(window).height()-98;
        		config = $.extend({
                	autoRender: true,
                    render:'#tab',
                    height:wh,
                    listeners: {
                    	itemclick : function(ev){
                    		//console.log(ev)
                    	}
                    }
                },config);
        		var tab = new Tab.NavTab(config);
        		tab.on('activedchange',function(obj){
        			if(obj.item.updated){
        				obj.item.bizEvents.call();
        			}
        		});
        		
        		dfd.resolve(tab);
        	});
    	});
    };
    
    module.exports = Clui;

});