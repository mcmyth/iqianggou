
var map = new BMap.Map("allmap");
var point = new BMap.Point(108.95,34.27);
map.centerAndZoom(point,12);
var geolocation = new BMap.Geolocation();
function GetLocation()
{var id = null;
    if(navigator.geolocation) {
         id = navigator.geolocation.watchPosition(function(position){
            //  console.log("纬度" + position.coords.latitude + "经度" + position.coords.longitude)
            GetLocationBaidu( position.coords.longitude,position.coords.latitude)

             navigator.geolocation.clearWatch(id);
        }, function(err){
            switch(err.code) {
                case err.PERMISSION_DENIED:      navigator.geolocation.clearWatch(id);GetLocationBaidu(); return "PERMISSION_DENIED";
                case err.POSITION_UNAVAILABLE:      navigator.geolocation.clearWatch(id);GetLocationBaidu(); return "POSITION_UNAVAILABLE";
                case err.TIMEOUT:      navigator.geolocation.clearWatch(id); GetLocationBaidu();return "TIMEOUT";
                default: navigator.geolocation.clearWatch(id);GetLocationBaidu(); return "UNKNOWN_ERROR";
            }
        });

    }else {
        console.log("你的浏览器不支持geolocation");
        navigator.geolocation.clearWatch(id);   GetLocationBaidu();
    }

}

function SetLocation(info)
{
   // console.log(info);
    lat=info.lat;
    lng=info.lng;
    address = info.address;
    document.getElementById("location").innerHTML=address;
    GetItem();
}

function GetLocationBaidu(lng,lat)
{

    geolocation.getCurrentPosition(function(r){
        //console.log(r.point);
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);//标出所在地
            map.panTo(r.point);//地图中心移动
            // alert('您的位置：'+r.point.lng+','+r.point.lat);
            var point=null;
            if(lng==null || lat==null)
                point = new BMap.Point(r.point.lng,r.point.lat);//用所定位的经纬度查找所在地省市街道等信息
            else
                point = new BMap.Point(lng,lat);//用所定位的经纬度查找所在地省市街道等信 息
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function(rs){
                var addComp = rs.addressComponents;
                //  console.log(rs.address);//地址信息
                //  alert(rs.address + " "+point.lng + " "+point.lat );//弹出所在地址
                var location= new Array();
                //console.log("地址："+rs.address);
                location["address"]=rs.address;
                location["lng"]=point.lng;
                location["lat"]=point.lat;
                SetLocation(location);


            });
        }else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true})

}
