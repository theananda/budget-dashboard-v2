import numeral from 'numeral';

export default {
	expenditure : {
		title: 'Expenditure by Budget Classification',
		type: 'bar',
		width: '100%',
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
			      return numeral(value).format('0,0.00') + " millions kyats"
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
		width: '100%',
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
			      return numeral(value).format('0,0.00') + " millions kyats"
			    }
			  }
			}
		},
		series: [],
		viz_desc: ''
	}
}
