<?php
/**
 * Created by PhpStorm.
 * User: MC_Myth
 * Date: 2019/3/23
 * Time: 21:39
 */
@$itemid=$_GET["id"];
$ch = curl_init();
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);    //禁止 cURL 验证对等证书
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);    //是否检测服务器的域名与证书上的是否一致
curl_setopt($ch,CURLOPT_URL,"https://api.v3.iqianggou.com/api/item/$itemid?channel=h5&itemI d=$itemid");
$src = curl_exec($ch);
echo $src;