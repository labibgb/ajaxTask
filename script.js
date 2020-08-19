function loadData(){
    let URL = "http://192.168.10.116:8000/product/api/";
    $.ajax({
            type: 'GET',
            url: URL,
            success: function(response){
                let data = response.rows;
                let str = "";
                let tot = "";
                data.sort((a,b)=>{return parseInt(a.product_id)-parseInt(b.product_id)});
                for( let i = 0 ; i < data.length; i++ )
                {
                    str = "";
                    str += "<tr>";
                    str += "<td>"; str += data[i].product_id; str += "</td>";
                    str += "<td>"; str += data[i].code; str += "</td>";
                    str += "<td>"; str += data[i].product_name; str += "</td>";
                    str += "<td>"; str += data[i].carton_capacity; str += "</td>";
                    str += "<td>"; str += data[i].max_order_qty; str += "</td>";
                    str += "<td>"; str += data[i].min_order_qty; str += "</td>";
                    str += "<td>"; str += data[i].movement_tenure; str += "</td>";
                    str += "<td>"; str += data[i].sub_category_name; str += "</td>";
                    str += "</tr>"
                    tot += str;

                }
                $("#tbdy").html(tot);
                
            },
            error: function(response, status, error){
                console.log(status);
            },
            complete: function(){
                
            }
    });

}
function sendData(){
    $("#submit").click(function(event){
        event.preventDefault();
      let URL = "http://192.168.10.116:8000/product/add/";
      let dt = {
        'Product.name' : $("#name").val(),
        'Product.code' : $("#code").val(),
        'Product.sub_category_id' : parseInt($("#sub_category_id").val()),
        'Product.step_size' : parseFloat($("#step_size").val()),
        'Product.purchase_price' : parseFloat($("#purchase_price").val()),
        'Product.finished' : 1
    };
    console.log(dt);
      $.ajax({
            type: 'POST',
            url : URL,
            data: dt,
            success: function(response){
                loadData();
                console.log(response);
            },
            error: function(response, status, error){
                console.log(status);
                console.log(response);
            },
            complete: function(){
               
                clear();
                
                 
            }

      });
  });
}
function clear(){
    $("#name").val("");
    $("#code").val("");
    $("#sub_category_id").val("");
    $("#step_size").val("");
    $("#purchase_price").val("");
    $("#name").focus();

}
$(document).ready(function(){
    loadData();
    sendData();
  
});