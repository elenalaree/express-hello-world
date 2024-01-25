const contacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.json(contacts);
    }
    catch (error){
        console.error(error);
        res.status(500).json({ error: 'Server Error'});
    }
}

const contact = async(req, res) => {
    try {
        const contact = await contact.findById(req.params.id);
        if(!contact) {
            return res.status(404).json({ error: 'contact not found' });
        }
        res.json(contact);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Server Error'});
    }}

module.exports = { contacts, contact };