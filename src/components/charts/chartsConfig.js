export default {
	expenditure : {
		title: 'Budgeted Expenditure',
		type: 'bar',
		width: '500',
		options: {
			chart: {
			  	id: 'expenditure-stacked',
			  	stacked: true
			},
			xaxis: {
	            categories: ['2012', '2013', '2014', '2015',
	              '2016', '2017'
	            ],
			}
		},
		series: []
	},
	unionTotal : {
		title: 'Union Total Budget',
		type: 'pie',
		width: '380',
		series: [],
        options: {
          labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
	}
}
