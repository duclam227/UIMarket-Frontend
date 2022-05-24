export const errors = {
	auth: {
		'account-inactivated': 'accountInactive',
		'email-existed': 'emailExisted',
		'invalid-authentication': 'invalidAuthentication',
		'missing-req-body': 'actionFailed',
		'validation-failed': 'actionFailed',
		'invalid-googleid': 'actionFailed',
		'action-failed': 'actionFailed',
	},
	answer: {
		'invalid-question-id': 'actionFailed',
		'invalid-answer-id': 'actionFailed',
		'invalid-credentials': 'notPriviledged',
		failed: 'actionFailed',
		'already-gone': 'answerDeleted',
	},
	comment: {
		'invalid-question-id': 'actionFailed',
		'invalid-answer-id': 'actionFailed',
		'invalid-root-id': 'actionFailed',
		'invalid-comment-id': 'actionFailed',
		'invalid-credentials': 'notPriviledged',
		failed: 'actionFailed',
		'already-gone': 'commentDeleted',
		'missing-req-body': 'actionFailed',
	},
	product: {
		'invalid-category-id': 'actionFailed',
		'invalid-shop-id': 'actionFailed',
		'invalid-product-id': 'actionFailed',
	},
	question: {
		'invalid-question-id': 'questionNotFound',
		'missing-req-body': 'actionFailed',
		'invalid-answer-id': 'actionFailed',
		'invalid-credentials': 'notPriviledged',
		failed: 'actionFailed',
		'already-gone': 'actionFailed',
		'invalid-tag-id': 'actionFailed',
	},
	shop: {
		'invalid-authentication': 'notPriviledged',
		'invalid-shop-id': 'shopNotFound',
		'invalid-product-id': 'productNotFound',
		'invalid-credentials': 'notPriviledged',
		failed: 'actionFailed',
		'already-gone': 'actionFailed',
	},
	user: {
		'invalid-user-id': 'userNotFound',
	},
};
