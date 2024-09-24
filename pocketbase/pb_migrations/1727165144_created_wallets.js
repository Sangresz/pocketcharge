/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "e93z976q1akvt2v",
    "created": "2024-09-24 08:05:44.433Z",
    "updated": "2024-09-24 08:05:44.433Z",
    "name": "wallets",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "w0twi8zl",
        "name": "name",
        "type": "text",
        "required": true,
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
        "id": "rc8dkc77",
        "name": "icon",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "icon_bank",
            "icon_bitcoin",
            "icon_contactless_payment",
            "icon_credit_card",
            "icon_gift_box",
            "icon_investment",
            "icon_money_bag",
            "icon_piggy",
            "icon_safe",
            "icon_vista",
            "icon_wallet"
          ]
        }
      },
      {
        "system": false,
        "id": "5qrmtqiz",
        "name": "currency",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 1,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "b4po9eeh",
        "name": "balance",
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
        "id": "mnimnfpq",
        "name": "user_id",
        "type": "relation",
        "required": true,
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
    "listRule": "user_id = @request.auth.id",
    "viewRule": "user_id = @request.auth.id",
    "createRule": "user_id = @request.auth.id",
    "updateRule": "user_id = @request.auth.id",
    "deleteRule": "user_id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("e93z976q1akvt2v");

  return dao.deleteCollection(collection);
})
