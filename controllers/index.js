const awesomeFunction = (req, res, next) => {res.json('Elena Rogers');};

const anotherPerson = (req, res, next) => { res.json('Micah Pearce')}

module.exports = {awesomeFunction, anotherPerson};