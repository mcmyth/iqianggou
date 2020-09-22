var page =0;
var src = null;
var lat=null;
var lng=null;
var address=null;
var xhr;
function start()
{
    GetLocation();

}
function GetItem(address){
    document.getElementById("loading_container").style.display="block";
    var url;
    if(lat ==null|| lng ==null)
        url="iqianggou.php";
    else
        url="iqianggou.php?lng="+lng+"&lat="+lat;


    if(address!=null)
        url="iqianggou.php?address="+address;
    console.log(lng);
    console.log(lat);
    if(src != null)
    {
        AddItem();
    }else
    {
        xhr =   $.ajax({
        url:url,
        type:"get",
        dataType:"json",
        success: function(data) {
          //  console.log( data["data"].length);
           // console.log(data);
            src=data;
            AddItem();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },
    })
    }
}

function AddItem()
{
    var count=20;
    var left = null;
    var left_text="";
    for (var i=0;i< count;i++)
    {
        left = src["data"][page]["left"];
        if(left==0)
            left_text="已抢光";
        else
            left_text="剩余"+left+"个";
        if(document.getElementById("hide_item").checked)
        {

            if(left==0) {
                page++;
                count++;
                continue;
            }

        }

        //     document.getElementById("container").write("<div class=\"item\">"+data["data"][i]["name"]+"</div>");
        $("#container").append(" <div class=\"item_container\">\n" +
            "<div class=\"item\">\n" +
            "    <div class=\"img \" ><img class=\"preview img-rounded\" src=\""+src["data"][page]["branches"][0]["logo"]+"\"></div>\n" +
            "    <div class=\"title\">"+src["data"][page]["name"]+"</div>\n" +
            "    <div class=\"price\">￥"+src["data"][page]["current_price"]+" <del>￥"+src["data"][page]["market_price"]+"</del></div>\n" +
            "    <div class=\"desc\">"+left_text+" 有效期:"+src["data"][page]["expired"]+"天 兑换时间："+src["data"][page]["branches"][0]["redeem_time"] +
            "<br/><div class='info'>"+src["data"][page]["branches"][0]["name"]+" "+src["data"][page]["distance"] / 1000 +"公里</div></div>\n"+
            "    <details onclick='GetDet(this);' item_id='"+src["data"][page]["id"]+"'>\n" +
            "        <summary>\n" +
            "            <span>店铺信息</span>\n" +
            "        </summary>\n" +
            "        <section>" +
            "加载中..." +
            "</section>\n" +
            "    </details>\n" +
            "</div>\n" +
            "</div>");
        page++;
    }
    document.getElementById("loading_container").style.display="none";
    $('.img-rounded').zoomify();
}

var aa=null;
function GetDet(e) {
    if(e.childNodes.item(3).innerText=="加载中...")
    {


   var id =  e.getAttribute("item_id");

        $.ajax({
            url:"item.php?id="+id,
            type:"get",
            dataType:"json",
            success: function(data) {
                var image ="";
                var menu="";

                try {
                    var len = data["data"]["menus"][0]["items"].length;
                    for(var i=0;i<len;i++)
                    {
                        if(data["data"]["menus"][0]["items"][i]["price"]=="")
                        {
                            menu+=data["data"]["menus"][0]["items"][i]["name"]+"<br/>"
                        }else
                        {
                            menu+=data["data"]["menus"][0]["items"][i]["name"]+"----------"+data["data"]["menus"][0]["items"][i]["price"]+"<br/>"
                        }
                    }

                }catch(err) {
                    menu="";
                }
                len = data["data"]["images"].length;
                try {
                    for (var i = 0; i < len; i++) {
                        image += "<img class='image_view img-rounded' src='" + data["data"]["images"][i] + "'>";
                    }
                }catch(err) {

                }
             aa=data;
                var redeem_period="";
                var need_book="";
                var refund_type="";
                var allow_take_out="";

                try {redeem_period=data["data"]["special_tips_array"][0]["text"]}catch(err) {}
                try {need_book=data["data"]["special_tips_array"][1]["text"]}catch(err) {}
                try {refund_type=data["data"]["special_tips_array"][2]["text"]}catch(err) {}
                try {allow_take_out=data["data"]["special_tips_array"][3]["text"]}catch(err) {}



                e.childNodes.item(3).innerHTML=" <h4>商品详情</h4>\n" +
                  "<div class='image_view_container'>"+  image+"</div><br/>"+
                    "            <p>"+data["data"]["name"]+"</p>\n" +
                    "            <hr>\n" +
                    "            <h4>菜单</h4>\n" +
                    "            <p>"+menu+"</p>\n" +
                    "            <p class='description'>"+data["data"]["description"].replace(/\n/g, "<br/>")+"</p>\n" +
                    "            <h4>"+data["data"]["branches"][0]["name"]+"</h4>\n" +
                    "            <p>"+data["data"]["branches"][0]["address"]+"</p><br/>电话:"+data["data"]["branches"][0]["tel"]+"\n" +
                    "            <hr>\n" +
                    "            <h4>特别提示</h4>\n" +
                    "            <p class='tips' style='font-weight: bold;'>"+redeem_period+" "+ need_book +" "+refund_type+" "+allow_take_out+"</p>"+
                    "            <p class='tips'>"+data["data"]["tips"]+"</p>";
                $('.img-rounded').zoomify();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            },
        })

    }
}

var ISedit = false;
function edit(element){

    if(ISedit) return;
    ISedit=true;
    var oldhtml = element.innerHTML;//获得元素之前的内容
    var newobj = document.createElement('input');//创建一个input元素

    if(newobj===this) return;
    console.log(this);

    newobj.style.background="transparent";
    newobj.style.color="#fff";
    newobj.style.border="none";
    newobj.style.outline="none";
    newobj.style.textAlign="center";
    newobj.type = 'text';//为newobj元素添加类型
    newobj.value=oldhtml;
    element.innerHTML = '';　　 //设置元素内容为空
    element.appendChild(newobj);//添加子元素
    newobj.focus();//获得焦点
    //设置newobj失去焦点的事件

    newobj.onkeypress=function(event){
        var text = this.value ? this.value : oldhtml;
        if(event.keyCode==13){

            document.activeElement.blur();
        }
    };

    newobj.onblur = function(){
        //下面应该判断是否做了修改并使用ajax代码请求服务端将id与修改后的数据提交
        //alert(element.id);
       // alert(this.value);
        //当触发时判断newobj的值是否为空，为空则不修改，并返回oldhtml
        page=0;
        src=null;
        var text = this.value ? this.value : oldhtml;
        element.innerHTML = text;
        page=0;
        src=null;
        document.getElementById("container").innerHTML="";
       GetItem(text);
       ISedit = false;
    };

}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
     GetItem();
    }
};