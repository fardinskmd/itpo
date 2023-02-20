$(document).on('click', '.select-all', function(){
	if($(this).is(":checked")){
		$(this).parents('tr').find('input[type="checkbox"]').prop('checked', true);
	}
	if(!$(this).is(":checked")){
		$(this).parents('tr').find('input[type="checkbox"]').prop('checked', false);
	}
});


$(document).on('click', '.select-all-checkbox', function(){
	if($(this).is(":checked")){
		$(this).parents('table').find('input[type="checkbox"]').prop('checked', true);
	}
	if(!$(this).is(":checked")){
		$(this).parents('table').find('input[type="checkbox"]').prop('checked', false);
	}
});
$(document).on('click', '.select-all-checkbox-vehicle', function(){
	if($(this).is(":checked")){
		$(this).parents('table').find('input[type="checkbox"]').prop('checked', true);
		$('#selected_checkbox_count_vehicle').html($(this).parents('table').find('input[type="checkbox"]').length-1)	
	}
	if(!$(this).is(":checked")){
		$(this).parents('table').find('input[type="checkbox"]').prop('checked', false);
		$('#selected_checkbox_count_vehicle').html('0')
	}
});

$(document).on('click', '.select-single-checkbox-vehicle', function(){
	count = 0;
	if($(this).is(":checked")){
		$(this).parents('tr').find('input[type="checkbox"]').prop('checked', true);
	}
	if(!$(this).is(":checked")){
		$(this).parents('tr').find('input[type="checkbox"]').prop('checked', false);
	}
	$(this).parents('table').find('input[type="checkbox"]').each(function(key){
		if(!$(this).hasClass('select-all-checkbox-vehicle')){
			if($(this).is(":checked")){
				count++;
			}			
		}
	})
	$('#selected_checkbox_count_vehicle').html(count)
});

// $(document).on('click', '.first_table tbody tr:nth-child(2)', function(){
// 	alert('sfj')
// 	// if($(this).is(":checked")){
// 	// 	$(this).parents('tr').find('input[type="checkbox"]').prop('checked', true);
// 	// }
// 	// if(!$(this).is(":checked")){
// 	// 	$(this).parents('tr').find('input[type="checkbox"]').prop('checked', false);
// 	// }
// });

