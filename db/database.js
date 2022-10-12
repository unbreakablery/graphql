const mongo = require("mongodb").MongoClient;
const collectionName = "courses";

const courses = [
    {
        courseCode: "DV1612",
        name: "JavaScript-baserade webbramverk",
        credits: 7.5,
        teachers: [
            {
                name: "Emil Folino",
                acronym: "efo",
            }
        ],
        students: [
            {
                name: "Pelle",
                acronym: "pepl19",
                grades: [
                    {
                        name: "Assignment 1",
                        grade: "G"
                    },
                    {
                        name: "Assignment 2",
                        grade: "B"
                    },
                ]
            },
            {
                name: "Karin",
                acronym: "kapl20",
                grades: [
                    {
                        name: "Assignment 1",
                        grade: "G"
                    },
                    {
                        name: "Assignment 2",
                        grade: "A"
                    },
                ]
            }
        ]
    },
    {
        courseCode: "DV1531",
        name: "Programmering och problemlösning med Python",
        credits: 7.5,
        teachers: [
            {
                name: "Andreas Arnesson",
                acronym: "aar",
            },
            {
                name: "Emil Folino",
                acronym: "efo",
            }
        ],
        students: [
            {
                name: "Kalle",
                acronym: "kapl21",
                grades: [
                    {
                        name: "Assignment 1",
                        grade: "G"
                    },
                    {
                        name: "Assignment 2",
                        grade: "B"
                    },
                ]
            },
            {
                name: "Åse",
                acronym: "aspl21",
                grades: [
                    {
                        name: "Assignment 1",
                        grade: "G"
                    },
                    {
                        name: "Assignment 2",
                        grade: "A"
                    },
                ]
            }
        ]
    },
];



const database = {
    getDb: async function getDb () {
        let dsn = `mongodb://localhost:27017/courses`;

        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/test";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    },

    resetCollection: async function resetCollection() {
        const db = await database.getDb();

        db.db.listCollections(
            { name: collectionName }
        )
            .next()
            .then(async function(info) {
                if (info) {
                    await db.collection.drop();
                }
            })
            .catch(function(err) {
                console.error(err);
            })
            .finally(async function() {
                await db.collection.insertMany(courses);
                await db.client.close();
            });
    }
};

module.exports = database;
