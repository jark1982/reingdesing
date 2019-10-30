const mongoose = require("mongoose");
const { Schema } = mongoose;

const ModelSchema = new Schema(
    {
        "hits": {
          "type": [
            "Mixed"
          ]
        },
        "nbHits": {
          "type": "Number"
        },
        "page": {
          "type": "Number"
        },
        "nbPages": {
          "type": "Number"
        },
        "hitsPerPage": {
          "type": "Number"
        },
        "exhaustiveNbHits": {
          "type": "Boolean"
        },
        "query": {
          "type": "String"
        },
        "params": {
          "type": "String"
        },
        "processingTimeMS": {
          "type": "Number"
        }
      }
);

module.exports = mongoose.model('Model', ModelSchema);
