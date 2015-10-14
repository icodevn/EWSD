$(function() {
	displayTable();
	$(".dateInput").datepicker();
	$("#newItemForm").validate({
		rules : {
			customerName:{
				required:true
			},
			customerBirthDay:{
				required:true
			},
			customerEmail:{
				required:true
			},
			customerAddress:{
				required:true
			},
			customerPhone:{
				required:true
			}
		},
		messages : {
			customerName:{
				required:"Name không được để trống"
			},
			customerPosition:{
				required:"Diễn giải không được để trống"
			}
		},
		submitHandler : function(form) {
			form.submit();
		}
	});
	
	$("#updateItemForm").validate({
		rules : {
			customerName:{
				required:"Tên không được để trống"
			},
			customerBirthDay:{
				required:"Ngày sinh không được để trống"
			},
			customerEmail:{
				required:"Email không được để trống"
			},
			customerAddress:{
				required:"Địa chỉ không được để trống"
			},
			customerPhone:{
				required:"Điện thoại không được để trống"
			}
		},
		messages : {
			customerName:{
				required:"Tên không được để trống"
			},
			customerBirthDay:{
				required:"Ngày sinh không được để trống"
			},
			customerEmail:{
				required:"Email không được để trống"
			},
			customerAddress:{
				required:"Địa chỉ không được để trống"
			},
			customerPhone:{
				required:"Điện thoại không được để trống"
			}
		},
		submitHandler : function(form) {
			form.submit();
		}
	});
});

function displayTable() {
	var dataDepartments = [];
	$.ajax({
		url : "/ewsd/customer/getAll",
		type : "GET",
		dataType : "JSON",
		success : function(response) {
			var i = 0;
			$.each(response, function(key, value) {
				i++;
				dataDepartments.push([
						i,
						value.name,value.birthDate,value.email,value.address,value.phone,
						"<button class='btn btn-sm btn-primary' onclick='editItem("
								+ value.id + ")' >Sửa</button>",
						"<button class='btn btn-sm btn-danger' onclick='deleteItem("
								+ value.id + ")'>Xoá</button>" ]);
			});
			$('#tblDepartment').dataTable({
				"bDestroy" : true,
				"bSort" : true,
				"bFilter" : true,
				"bLengthChange" : true,
				"bPaginate" : true,
				"sDom" : '<"top">rt<"bottom"flp><"clear">',
				"aaData" : dataDepartments,
				"aaSorting" : [],
				"aoColumns" : [ {
					"sTitle" : "STT"
				}, {
					"sTitle" : "Tên"
				}, {
					"sTitle" : "Ngày sinh"
				}, {
					"sTitle" : "Email"
				}, {
					"sTitle" : "Địa chỉ"
				}, {
					"sTitle" : "ĐT"
				}, {
					"sTitle" : "Sửa"
				}, {
					"sTitle" : "Xoá"
				} ]
			});
		}
	});
}

function editItem(id) {
	$.ajax({
		url : "/ewsd/customer/get",
		type : "GET",
		data : {
			itemId : id
		},
		dataType : "JSON",
		success : function(response) {
			$("#updateItemForm .customerId").val(response.id);
			$("#updateItemForm .customerName").val(response.name);
			$("#updateItemForm .customerBirthDay").val(response.birthDate);
			$("#updateItemForm .customerEmail").val(response.email);
			$("#updateItemForm .customerAddress").val(response.address);
			$("#updateItemForm .customerPhone").val(response.phone);
			$("#updateItem").modal("show");
		}
	});
}

function deleteItem(id) {
	if (confirm("Are you sure you want to proceed?") == true) {
		$.ajax({
			url : "/ewsd/customer/delete",
			type : "POST",
			data : {
				itemId : id
			},
			dataType : "JSON",
			success : function(response) {
				displayTable();
			}
		});
	}
}

function editedItem() {
	if($("#updateItemForm").valid()){
		var customerId = $("#updateItemForm .customerId").val();
		var customerName = $("#updateItemForm .customerName").val();
		var customerBirthDay = $("#updateItemForm .customerBirthDay").val();
		var customerEmail = $("#updateItemForm .customerEmail").val();
		var customerAddress = $("#updateItemForm .customerAddress").val();
		var customerPhone = $("#updateItemForm .customerPhone").val();
		$.ajax({
			url : "/ewsd/customer/update",
			type : "POST",
			data : {
				customerId : customerId,
				customerName : customerName,
				customerBirthDay : customerBirthDay,
				customerEmail : customerEmail,
				customerAddress : customerAddress,
				customerPhone : customerPhone
			},
			dataType : "JSON",
			success : function(response) {
				displayTable();
			}
		});
	}
	$("#updateItemForm .customerId").val(" ");
	$("#updateItemForm .customerName").val(" ");
	$("#updateItemForm .customerBirthDay").val(" ");
	$("#updateItemForm .customerEmail").val(" ");
	$("#updateItemForm .customerAddress").val(" ");
	$("#updateItemForm .customerPhone").val(" ");
	$("#updateItem").modal("hide");
}

function insertItem() {
	
	if($("#newItemForm").valid()){
		var customerName = $("#customerName").val();
		var customerBirthDay = $("#customerBirthDay").val();
		var customerEmail = $("#customerEmail").val();
		var customerAddress = $("#customerAddress").val();
		var customerPhone = $("#customerPhone").val();
		$.ajax({
			url : "/ewsd/customer/new",
			type : "POST",
			data : {
				customerName : customerName,
				customerBirthDay : customerBirthDay,
				customerEmail : customerEmail,
				customerAddress : customerAddress,
				customerPhone : customerPhone
			},
			dataType : "JSON",
			success : function(response) {
				displayTable();
			}
		});
	}
	$("#newItem").modal("hide");
	$("#customerName").val("");
	$("#customerBirthDay").val("");
	$("#customerEmail").val("");
	$("#customerAddress").val("");
	$("#customerPhone").val("");
}
