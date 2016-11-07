/**
 * @fileoverview disable bad loops
 * @author aretecode
 */


//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex')

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules')


// import processors
// module.exports.processors = {
//  // add your processors here
// }
