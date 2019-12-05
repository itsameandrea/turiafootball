const middleware = {}

middleware['redirectIfAuthenticated'] = require('../../middleware/redirectIfAuthenticated.js')
middleware['redirectIfAuthenticated'] = middleware['redirectIfAuthenticated'].default || middleware['redirectIfAuthenticated']

middleware['redirectIfNotAuthenticated'] = require('../../middleware/redirectIfNotAuthenticated.js')
middleware['redirectIfNotAuthenticated'] = middleware['redirectIfNotAuthenticated'].default || middleware['redirectIfNotAuthenticated']

export default middleware
