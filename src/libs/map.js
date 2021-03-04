import {BaiduMap} from 'vue-baidu-map'
const map = {}
var mapObj = {} 
var zoom = 6;
map.setZoom=  function setZoom(points){
	mapObj = new BMap.Map('container');
	if(points.length>0){
		var maxLng = points[0].lng;
		var minLng = points[0].lng;
		var maxLat = points[0].lat;
		var minLat = points[0].lat;
		var res;
		for (var i = points.length - 1; i >= 0; i--) {
			res = points[i];
			if(res.lng > maxLng) maxLng =res.lng;
			if(res.lng < minLng) minLng =res.lng;
			if(res.lat > maxLat) maxLat =res.lat;
			if(res.lat < minLat) minLat =res.lat;
		};
		var cenLng =(parseFloat(maxLng)+parseFloat(minLng))/2;
		var cenLat = (parseFloat(maxLat)+parseFloat(minLat))/2;
		zoom = getZoom(maxLng, minLng, maxLat, minLat);
		// mapObj.centerAndZoom(new BMap.Point(cenLng,cenLat), zoom);  
	}else{
		//没有坐标，显示全中国
		// mapObj.centerAndZoom(new BMap.Point(103.388611,35.563611), 5);  
	}
	return zoom;
}
function getZoom (maxLng, minLng, maxLat, minLat) {
	var zoomObj = ["50","100","200","500","1000","2000","5000","10000","20000","25000","50000","100000","200000","500000","1000000","2000000"]//级别18到3。
	var pointA = new BMap.Point(maxLng,maxLat);  // 创建点坐标A
	var pointB = new BMap.Point(minLng,minLat);  // 创建点坐标B
	var distance = mapObj.getDistance(pointA,pointB).toFixed(1);  //获取两点距离,保留小数点后两位
	for (var i = 0,zoomLen = zoomObj.length; i < zoomLen; i++) {
		if(zoomObj[i] - distance > 0){
			return 18-i+3;//之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
		}
	};
}
export default map;