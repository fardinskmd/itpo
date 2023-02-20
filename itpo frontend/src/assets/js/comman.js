function isAskSubmit(e){
	Swal({
  		title: 'Are you sure?',
  		type: 'warning',
  		showCancelButton: true,
  		confirmButtonColor: '#30cc55',
  		cancelButtonColor: '#d33',
  		confirmButtonText: 'Yes, Go!'
	}).then((result) => {
  		if (result.value) {
		    Swal(
		      'Deleted!',
		      'Your file has been deleted.',
		      'success'
		    )
  		}
  		return false;
	})
	return false;
}
