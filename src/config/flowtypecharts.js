export default {
	income_flowtype : {
		display: true,
		title : 'Income by Budget Classification',
		chart_type : 'donut',
        series: [],
        chartOptions: {
        	labels: [],
        	dataLabels: {
				enabled: false
			},
        	expandOnClick: true,
        	legend: {
	            position: 'bottom'
	        },
	        tooltip: {
	          y: {
	            formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
	              return value + " millions kyats"
	            }
	          }
	        }
    	}
	},
	expenditure_flowtype : {
		display: true,
		title : 'Expenditure by Budget Classification',
		chart_type : 'donut',
        series: [],
        chartOptions: {
        	labels: [],
        	dataLabels: {
				enabled: false
			},
			legend: {
	            position: 'bottom'
	        },
        	expandOnClick: true,
        	tooltip: {
        	  y: {
        	    formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
        	      return value + " millions kyats"
        	    }
        	  }
        	}
    	}
    },
	expenditure_by_year : {
		title: 'Expenditure by Budget Classification',
		type: 'bar',
		width: '500',
		height: '400',
		position: 'left',
		options: {
			chart: {
				id: 'expenditure-stacked',
				stacked: true
			},
			dataLabels: {
				enabled: false
			},
			yaxis: {
				decimalsInFloat: 2
			},
			tooltip: {
			  y: {
			    formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
			      return value + " millions kyats"
			    }
			  }
			}
		},
		series: [],
		viz_desc: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.</p>'
	},
	income_by_year : {
		title: 'Income by Budget Classification',
		type: 'bar',
		width: '500',
		height: '400',
		position: 'left',
		options: {
			chart: {
				id: 'income-stacked',
				stacked: true
			},
			dataLabels: {
				enabled: false
			},
			yaxis: {
				decimalsInFloat: 2
			},
			tooltip: {
			  y: {
			    formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
			      return value + " millions kyats"
			    }
			  }
			}
		},
		series: [],
		viz_desc: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.</p>'
	}
}
