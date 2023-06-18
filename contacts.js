const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error", error.massage);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactToRemove = contacts.find(
      (contact) => contact.id === contactId
    );

    if (!contactToRemove) {
      return null;
    }
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf-8"
    );

    return contactToRemove;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return newContact;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
