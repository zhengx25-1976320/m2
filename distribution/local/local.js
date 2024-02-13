const http = require('http');

const serialization = require('../util/serialization');
const id = require('../util/id');

const node = global.config;

/*

Service  Description                           Methods
status   statusrmation about the current node  get
routes   A mapping from names to functions     get, put
comm     A message communication interface     send

*/


