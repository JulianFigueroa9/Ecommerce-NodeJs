const { normalize, denormalize, schema } = require('normalizr')
const fs = require('fs');
const nonNormalizedMessages = require('./nonNormalizedMessages.json');

const messages = nonNormalizedMessages

const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });
const commentSchema = new schema.Entity("message");
const messageSchema = [
	{
		author: authorSchema,
		text: commentSchema
	}
]

const normalizedMessages = normalize(messages, messageSchema);

fs.writeFileSync('./utils/chat/normalizedMessages.json', JSON.stringify(normalizedMessages.result))


const denormalizedMessages = denormalize(normalizedMessages.result, messageSchema, normalizedMessages.entities )
const normalizedSize = JSON.stringify(normalizedMessages).length
const denormalizedSize = JSON.stringify(denormalizedMessages).length

 const compression = (normalizedSize, denormalizedSize) => {
    return (1-(denormalizedSize/normalizedSize))*100
}

console.log(compression(normalizedSize, denormalizedSize))

module.exports = compression 