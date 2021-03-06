/**
 * Title: css加载项配置
 * Author: honger.zheng
 * Date: 2015-01-14
 * */
define(function(require){
	require('css-bootstrap-debug');
	require('css-bootstrap-theme-debug');
	require('css-bui');
	//require('css-dpl'); 
    require('css-font-awesome');
    require('css-resetui');
    require('./clui.css');
    
    if(window.localStorage.clTheme){
    	switch(window.localStorage.clTheme){
    		case 'black':
    			require.async('css-black');
    			break;
    		case 'blue':
    			require.async('css-blue');
    			break;
    		default:
    			require.async('css-default');
    			break;
    	}
    	
    }else{
    	require.async('css-default');
    }
});



