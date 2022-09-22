const normalizr = require('normalizr')
const { normalize, denormalize, schema } = normalizr

const authorSchema = new schema.Entity('author', {}, {idAttribute: "id"});
const messageSchema = new schema.Entity('message');
const postSchema =[{
    author: authorSchema,
    message: messageSchema
}];
 
const normalizedBlogposts = normalize(postSchema);
const denormalizedBlogspot = denormalize(normalizedBlogposts.result, postSchema, normalizedBlogposts.entities )
const normalizedSize = JSON.stringify(normalizedBlogposts).length
const denormalizedSize = JSON.stringify(denormalizedBlogspot).length

const compression = (normalizedSize, denormalizedSize) => {
    return (denormalizedSize/normalizedSize)*100
}

console.log(compression(normalizedSize, denormalizedSize))

module.exports = compression