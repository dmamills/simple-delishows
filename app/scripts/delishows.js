(function() {
	var forEach = Array.prototype.forEach;

	//pulls out the data for each title from the default layout
	function extractFromTable(tableEl) {
		var result = {},
	   		keys = ['show_name','episode_num','episode_name','air_date','added_on','episode_summary'];

	   for(var i =0; i < tableEl.children.length;i++) {
	   		if(i == 2) { //index two contains the url to the episode
	   		   result['url'] = tableEl.children[i].children[1].children[0].href;
	   		}

	   	    result[keys[i]] = tableEl.children[i].children[1].innerText;
		} 

	       var d = Date.parse(result.air_date);
console.log(d);
		   if(d) result.air_date = d.toString('MM/dd/yyyy');

	   return result;
	}
	
	//selects the tbodys and iterates through converting to objects
	function createTitles() {

		var els = $('tbody'),
			titles = [];
	
		els.each(function(i,el) {
			titles.push(extractFromTable(el));
		});
	
		titles.splice(titles.length-2);		
		return titles;
	}

	//converts the titles into the new style
	function convertToNewStyle(titles) {
		var els = [];
		forEach.call(titles,function(title) {

			var rootEl = document.createElement('tr');
			rootEl.onclick = function() { window.location = title.url;}
			rootEl.className = 'title-listing';
			rootEl.innerHTML = '<td><strong>'+title.show_name + '</strong></td>' +
							   '<td>' + title.air_date + '</td>' +
							   '<td>' + title.episode_num + ' - ' +title.episode_name +  '</td>';

			els.push(rootEl);
		});

		return els;
	}

	//inserts the new style elements onto the page
	function insertToDom(els) {
		var s = document.getElementsByTagName('section')[0];
		var p = document.getElementsByClassName('pagination')[0];
		s.innerHTML = '<h3>New Shows</h3><hr>';

		var tEl = document.createElement('table');
		tEl.className = "table title-table table-bordered";
		tEl.innerHTML = '<tr><th>Show</th><th>Air Date</th><th>Episode Name</th></tr>';
		
		forEach.call(els,function(el){
			tEl.children[0].appendChild(el);
		});

		s.appendChild(tEl);
		s.appendChild(p);
	};


	insertToDom(convertToNewStyle(createTitles()));
	//var titles = createTitles();
	//var els = convertToNewStyle(titles);
	//insertToDom(els);
	console.log('simple-deli-shows executed');

}).call(this);
