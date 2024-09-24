/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ymtywip53ugbhhh",
    "created": "2024-09-24 08:05:44.432Z",
    "updated": "2024-09-24 08:05:44.432Z",
    "name": "charges",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2picaq5w",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "bdn81qn9",
        "name": "amount",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "hb2edm6i",
        "name": "is_expense",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "d2ytzdrx",
        "name": "user_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "user_id =@request.auth.id",
    "viewRule": "user_id = @request.auth.id",
    "createRule": "user_id = @request.auth.id",
    "updateRule": "user_id = @request.auth.id",
    "deleteRule": "user_id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ymtywip53ugbhhh");

  return dao.deleteCollection(collection);
})
