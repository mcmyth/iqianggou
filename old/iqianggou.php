<?php
/**
 * Created by PhpStorm.
 * User: MC_Myth
 * Date: 2019/3/23
 * Time: 13:00
 */

set_time_limit(180);
$item=null;
$lng=null;
$lat=null;
$page=0;
if(@$_GET["lng"]==null || @$_GET["lat"]==null)
{
    if(@$_GET["address"]!=null)
        $location=$_GET["address"];
    else
$location=urlencode("广州市");
$baidumapLocationSearchSrc =file_get_contents("http://api.map.baidu.com/geocoder/v2/?address=$location&output=json&ak=fgOYMhzeFGT1tIy745aXKmyzTGqABU6h") ;
$baidumapLocationSearchArr = json_decode($baidumapLocationSearchSrc,true);

$lng=@$baidumapLocationSearchArr["result"]["location"]["lng"];
$lat=@$baidumapLocationSearchArr["result"]["location"]["lat"];
}else
{
    $lng=$_GET["lng"];
    $lat=$_GET["lat"];
}
$srcArr=null;
$srcArr["status"]["code"]=0;

$key=0;
$count=0;
$id_list=array();
$srcArr["data"] =array();

$ch = curl_init();
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);    //禁止 cURL 验证对等证书
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);    //是否检测服务器的域名与证书上的是否一致
while($page==0 || $srcArr["status"]["code"]==10000 )
{
$last_id=$page*20;
curl_setopt($ch,CURLOPT_URL,"https://api.v3.iqianggou.com/api/item?channel=h5&zone_id=4401&last_id=$last_id&lng=$lng&lat=$lat");

$src = curl_exec($ch);

$srcArr=json_decode($src,true);
//echo "https://api.v3.iqianggou.com/api/item?channel=h5&zone_id=4401&last_id=$last_id&lng=$lng&lat=$lat"."\n";
if( $srcArr["status"]["code"]!=10000 ) break;


    foreach ($srcArr["data"] as $key => $row)
    {

        if(deep_in_array($row['id'], $id_list)==false){
        $count++;
        $id_list[$count]=$row['id'];
        $item["data"][$count]["id"]= $row['id'];
        $item["data"][$count]["current_price"]= $row['current_price'];
        $item["data"][$count]["market_price"]= $row['market_price'];
        $item["data"][$count]["name"]= $row['name'];
        $item["data"][$count]["images"]= $row['images'];

        $item["data"][$count]["branches"]= $row['branches'];
        $item["data"][$count]["bargain_count"]= $row['bargain_count'];
        $item["data"][$count]["expired"]= $row['redeem_period'];

        $item["data"][$count]["is_new"]= $row['is_new'];
        $item["data"][$count]["view"]= $row['like'];
        $item["data"][$count]["bargain_count"]= $row['bargain_count'];
        $item["data"][$count]["distance"]= $row['distance'];
        $item["data"][$count]["loc"]= $row['loc'];
        $item["data"][$count]["left"]= $row['left'];
        $item["data"][$count]["ico"]= $row['ico'];
    }
       }

    $page++;


}
$ids=null;
foreach ($item["data"] as $key => $row)
{
    $ids[$key]= $row['current_price'];
}
array_multisort($ids, SORT_ASC, $item["data"]);

echo json_encode($item);
/*$len = count( $item["data"]);
for($i=0;$i<$len;$i++)
{
    if($item["data"][$i]["left"]==0)
    {
        echo $item["data"][$i]["current_price"]." ".$item["data"][$i]["name"]." 已抢光"."\n";
    }else
    {
        echo $item["data"][$i]["current_price"]." ".$item["data"][$i]["name"]."\n";
    }

}
*/





function deep_in_array($value, $array) {
  foreach(@$array as $item) {
      if (!is_array($item)) {
          if ($item == $value) {
              return true;
          } else {
              continue;
          }
      }

    if(in_array($value, $item)) {
      return true;  
    } else if(deep_in_array($value, $item)) {
      return true;  
    }
  } 
  return false; 
}
 
