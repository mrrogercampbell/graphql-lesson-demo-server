const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;


let characters = [
    { id: '1', name: 'Mace Windu', universe: 'Star Wars' },
    { id: '2', name: "Teal'c", universe: 'Stargate SG- 1' },
    { id: '3', name: 'Tyr Anasazi', universe: 'Andromeda' },
];

var weapons = [
    { id: 1, character_id: 1, type: 'Light Saber' },
    { id: 2, character_id: 2, type: "Ma'Tok Staff" },
    { id: 3, character_id: 3, type: 'Gauss Gun' }
];

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        universe: { type: GraphQLString }
    })
});

const WeaponType = new GraphQLObjectType({
    name: 'Weapon',
    fields: () => ({
        id: { type: GraphQLID },
        character_id: { type: GraphQLID },
        type: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        character: {
            type: CharacterType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(characters, { id: args.id });
            }
        },
        weapon: {
            type: WeaponType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(weapons, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});