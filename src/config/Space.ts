export interface Space {
	id: '1280032';
	name: 'T.I.M.E Bots';
	private: false;
	statuses: [
		{
			id: 'p1280032_97Guz5HN';
			status: 'Open';
			type: 'open';
			orderindex: 0;
			color: '#d3d3d3';
		},
		{
			id: 'p1280032_JCrDkZdr';
			status: 'new';
			type: 'custom';
			orderindex: 1;
			color: '#50e3c2';
		},
		{
			id: 'p1280032_2uOwXWZp';
			status: 'in progress';
			type: 'custom';
			orderindex: 2;
			color: '#ffcf00';
		},
		{
			id: 'p1280032_F5yEWrPn';
			status: 'complete';
			type: 'custom';
			orderindex: 3;
			color: '#38f533';
		},
		{
			id: 'p1280032_ybx6JKtd';
			status: 'review';
			type: 'custom';
			orderindex: 4;
			color: '#81B1FF';
		},
		{
			id: 'p1280032_glIwkQ2l';
			status: 'notes';
			type: 'custom';
			orderindex: 5;
			color: '#b5bcc2';
		},
		{
			id: 'p1280032_9Gpn2uIF';
			status: 'Closed';
			type: 'closed';
			orderindex: 6;
			color: '#6bc950';
		}
	];
	multiple_assignees: true;
	features: {
		due_dates: {
			enabled: true;
			start_date: true;
			remap_due_dates: true;
			remap_closed_due_date: false;
		};
		sprints: { enabled: false };
		time_tracking: { enabled: true; harvest: false; rollup: true };
		points: { enabled: false };
		priorities: { enabled: true; priorities: [] };
		tags: { enabled: true };
		time_estimates: { enabled: true; rollup: true; per_assignee: false };
		check_unresolved: {
			enabled: true;
			subtasks: true;
			checklists: false;
			comments: false;
		};
		zoom: { enabled: true };
		milestones: { enabled: false };
		custom_fields: { enabled: true };
		remap_dependencies: { enabled: true };
		dependency_warning: { enabled: true };
		multiple_assignees: { enabled: true };
	};
	archived: false;
}
