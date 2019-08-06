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
			}
		},
		series: [],
		viz_desc: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.</p>'
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
			}
		},
		series: [],
		viz_desc: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid excepturi minima sed? Nostrum tenetur libero eligendi. Autem harum culpa, eveniet laborum voluptatibus, amet porro officia, corporis soluta ab, dolor dolores.</p>'
	},
	unionTotal : {
		title: 'Union Total Budget',
		type: 'pie',
		width: '380',
		position: 'right',
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
