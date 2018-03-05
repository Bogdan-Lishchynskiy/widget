var data = [
	{name:"Dinner", amount: 23.50},
	{name:"Lunch", amount: 17.99},
	{name:"Space Hulk", amount: 12.99},
	{name:"Coffee", amount: 7},
];

var sortedColumnId = '';


$(document).ready(function(){
	showDataTable(data);

	$('#show_hide').click(function() { //  show/hide vidget
		$(this).find('span').toggleClass('glyphicon-collapse-down glyphicon-collapse-up');
		$('#content').slideToggle();
	});

	$('#add_row').click(function() { // add new row into table
		var newRow={};	
		newRow.name = $('#newName').val();
		newRow.amount = Number($('#newAmount').val());		
		data.push(newRow);
		showDataTable(data);
	});

});

Number.prototype.formatMoney = function(c, d, t){ // just for show number in money format
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
 
 function sortByKey(array, key) {
	return array.sort(function(a, b) {
		var x = a[key];
		var y = b[key];
		
		if (typeof x == "string")
		{
			x = (""+x).toLowerCase(); 
		}
		if (typeof y == "string")
		{
			y = (""+y).toLowerCase();
		}
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}
 
function isSorted(nameKey) { // add "sorted" class to table header
	return sortedColumnId == nameKey ? "sorted" : "";
}
 
 
function showDataTable(data){ // repaint table with data
	var tableDiv = $('#data-table-div');
	var totalAmount = 0;;

	tableDiv.empty().append('<table id="data-table" class="table data-table"><thead><tr><th class="col-xs-8 '+isSorted('name')+'" id="name">Name</th><th class="col-xs-4 txtright '+isSorted('amount')+'" id="amount">Amount</th></tr></thead><tbody>');	
	var tableContent = $('#data-table-div table');
	
	$.each(data, function(i, v){
		tableContent.append('<tr><td class="col-xs-8">'+v.name+'</td><td class="col-xs-4 txtright">'+v.amount.formatMoney(2, '.', ' ')+'</td></tr>');	
		totalAmount +=v.amount;
	});
	
	$('#summary-info').html('<div class="left"><b>Total:<b></div><div class="right">'+totalAmount.formatMoney(2, '.', ' ')+'</div>');
	
	$myTable = $("#data-table");
	$("thead > tr > th", $myTable).click(function() { // click on the table header
		sortedColumnId = $(this)[0].id;
		var dataSort = sortByKey(data, $(this)[0].id);
		showDataTable(dataSort);
	});
}


