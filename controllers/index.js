const returnName = (req, res, next) => {res.json('Elena Rogers');};
const getContacts = async (req, res) => {
    try {
        console.log(res)
        const allContacts = await contactDB.find({});
        res.json(allContacts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

const singleContact = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('user').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]); 
    });
};

module.exports = { returnName, getContacts, singleContact };
