<?php
/**
 * Created by PhpStorm.
 * User: MC_Myth
 * Date: 2019/3/22
 * Time: 20:51
 */

?>
<!doctype html>
<html lang="en">
<head>
    <script src="js/jquery-1.7.1.min.js"></script>
    <script src="js/Main.js"></script>
    <link rel="stylesheet" href="style/style.css">
    <link rel="stylesheet" href="dist/zoomify.min.css">
    <meta charset="UTF-8">
    <meta name="viewport"  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>爱抢购</title>
</head>
<body onload="start();">
<div id="allmap"></div>
<div id="header"><div id="title">爱抢购<div id="hide_item_container"><input onclick="document.getElementById('container').innerHTML='';page=0;AddItem();" id="hide_item" name="hide_item" type="checkbox" value="" />隐藏抢光</div></div><div id="location" onclick="edit(this);">获取位置中...</div></div>
<!--<button onclick="GetItem()">Deubg</button>-->
<div class="item" id="loading_container">
    <div class="img"><img class="preview loading loading_image"></div>
    <div class="title loading loading_title" style=" margin-top: 10px; padding: 10px 5px;color: #fff;">加载中...</div>
    <div class="price loading loading_title" style="margin-top:10px;display: block;font-size: 13px;color: #fff; padding: 10px 5px; word-wrap: break-word;word-break: break-all; white-space:normal;">由于需要获取完爱抢购的所有数据因此加载时间可能会较长，如长时间获取不到位置可点击标题地址手动编辑。<del></del></div>
    <div class="desc loading"></div>
    <details class="loading">
        <summary class="loading">
            <span></span>
        </summary>

    </details>
</div>
<div id="container">
<!--<div class="item">
    <div class="img"><img class="preview" src="http://img-agc.iqianggou.com/7748512aea5a66473109b961af1c8b5a!180x180"></div>
    <div class="title">xxx</div>
    <div class="price">￥10 <del>￥100</del></div>
    <div class="desc">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
    <details>
        <summary>
            <span>店铺信息</span>
        </summary>
        <section>
            <h4>商品详情</h4>
            <p>xxx</p>
            <hr>
            <h4>xxx店</h4>
            <p>地址</p>
            <hr>
            <h4>特别提示</h4>
            <p>xxx</p>

        </section>
    </details>
</div>-->

</div>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=fgOYMhzeFGT1tIy745aXKmyzTGqABU6h"></script>
<script src="js/Location.js"></script>
<script src="dist/zoomify.min.js"></script>
<script type="text/javascript">

</script>
</body>
</html>
