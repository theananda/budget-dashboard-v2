export default {
	expenditure : {
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
			tooltip: {
			  y: {
			    formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
			      return value + " millions kyats"
			    }
			  }
			}
		},
		series: [],
		viz_desc: ''
	},
	income : {
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
			tooltip: {
			  y: {
			    formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
			      return value + " millions kyats"
			    }
			  }
			}
		},
		series: [],
		viz_desc: ''
	}
}
